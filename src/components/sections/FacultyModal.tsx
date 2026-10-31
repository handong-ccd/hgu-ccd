"use client";

/* eslint-disable @next/next/no-img-element -- 아이콘 SVG */
import Image from "next/image";
import Lenis from "lenis";
import { Children, useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { CvEntry, Faculty, FacultyDetail } from "@/types/faculty";
import { BlockReveal } from "@/components/motion/BlockReveal";
import { REDUCED_MOTION, SMOOTH_SCROLL_OPTIONS } from "@/components/motion/motion";
import { Container } from "@/components/ui/Container";
import { LogoCcd } from "@/components/ui/LogoCcd";

/** 본문 글자 — Mo 14px / PC 16px, 행간 140% (시안 419:1296 / 44:2926) */
const BODY = "text-[14px] leading-[1.4] md:text-[16px]";

/** 글 속 주소(https://…)를 새 탭 링크로. 끝에 붙은 마침표·괄호는 링크에서 뺌 */
const URL_RE = /(https?:\/\/[^\s]+[^\s.,;:)\]'"’”])/g;
function Linkify({ text }: { text: string }) {
  const parts = text.split(URL_RE);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all underline decoration-from-font underline-offset-auto hover:opacity-70"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}

/** 섹션 제목 + 하단 구분선 (PC 26px·0.5px 흰 선 / Mo 22px·1px 50% 선) */
function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 md:gap-2">
      <div className="faculty-reveal-mask">
        <div className="faculty-reveal-item faculty-section-heading flex items-center gap-1.5 md:gap-2">
          <h3 className="flex-1 font-telegraf text-[22px] leading-normal md:text-[26px] md:leading-[1.4]">{children}</h3>
          {aside}
        </div>
      </div>
      <hr className="faculty-section-rule border-0 border-t border-white/50 md:border-t-[0.5px] md:border-white" />
    </div>
  );
}

/**
 * 왼쪽 연도 칸(Mo 52px / PC 100px) + 내용 (간격 12px), 항목 사이 8px.
 * 시트에서 연도가 빈 줄(위 연도에 이어지는 항목)도 위 연도를 그대로 붙여서 모든 줄에 연도 표시 (시안 44:3362)
 */
function withYears(entries: CvEntry[]): CvEntry[] {
  let year: string | undefined;
  return entries.map((e) => {
    if (e.year) year = e.year;
    return { year, text: e.text };
  });
}

/** 보여줄 항목 범위 [from, to) — 접힌 섹션은 앞 LIMIT 개 / 나머지(펼침 영역)로 나눠 그림 */
type Range = { from: number; to?: number };

/** 한 줄(블록)씩 아래에서 올라오는 등장 효과 단위 (block-reveal.css) */
function Reveal({ as: Tag = "div", className = "", children }: { as?: "div" | "li"; className?: string; children: ReactNode }) {
  return (
    <Tag className="faculty-reveal-mask">
      <div className={`faculty-reveal-item ${className}`}>{children}</div>
    </Tag>
  );
}

function EntryList({ entries, from = 0, to }: { entries: CvEntry[] } & Partial<Range>) {
  // 연도 이어 붙이기는 전체 목록 기준으로 한 뒤에 자름
  const rows = withYears(entries).slice(from, to);
  if (!rows.length) return null;
  return (
    <ul className={`flex flex-col gap-2 ${BODY}`}>
      {rows.map((e, i) => (
        <Reveal key={from + i} as="li" className="flex gap-3">
          <span className="w-[52px] shrink-0 md:w-[100px]">{e.year}</span>
          <span className="min-w-0 flex-1">
            <Linkify text={e.text} />
          </span>
        </Reveal>
      ))}
    </ul>
  );
}

/** 처음 보여줄 항목 수 — 넘으면 제목 오른쪽 화살표로 나머지 펼치기 (Figma 6:198) */
const LIMIT = 5;

/** 드롭다운 아이콘 회전 — 1s ease-in-out (Figma 486:1365) */
const ICON_TURN = "transition-transform duration-1000 ease-[cubic-bezier(.45,0,.2,1)] motion-reduce:transition-none";

/** ∨ 화살표 — 펼치면 위로 뒤집힘 */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 26 14"
      fill="none"
      aria-hidden
      className={`block w-[20.8px] md:w-[26px] ${ICON_TURN} ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l12 12L25 1" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

/**
 * CV 섹션. 항목(total)이 LIMIT 를 넘으면 처음엔 LIMIT 개만 보여주고, 화살표 버튼으로 나머지를 펼침.
 * 나머지는 처음부터 그려 두고 grid 행 0fr → 1fr 로 부드럽게 펼침 (block-reveal.css .faculty-expand).
 * children 은 보여줄 항목 범위를 받아서 그림
 */
function Section({
  title,
  total = 0,
  bodyClassName = "gap-2",
  children,
}: {
  title: string;
  total?: number;
  /** 내용 묶음 사이 간격 — Publications 소분류 사이는 PC 40px */
  bodyClassName?: string;
  children: ReactNode | ((range: Range) => ReactNode);
}) {
  const [open, setOpen] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastItem = useRef<Element | null>(null);
  const id = useId();
  const foldable = total > LIMIT;
  const render = (range: Range) => (typeof children === "function" ? children(range) : children);

  const toggle = () => {
    const next = !open;
    // 펼칠 때 나머지 항목도 위에서부터 55ms 간격으로 올라오게
    const items = panelRef.current?.querySelectorAll<HTMLElement>(".faculty-reveal-item") ?? [];
    items.forEach((item, i) => item.style.setProperty("--expanded-item-delay", `${i * 55}ms`));
    lastItem.current = items.length ? items[items.length - 1] : null;
    setRevealing(next && items.length > 0 && !matchMedia(REDUCED_MOTION).matches);
    setOpen(next);
  };

  return (
    <section className="flex flex-col gap-2">
      <SectionTitle
        aside={
          foldable && (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={id}
              aria-label={`${title} ${open ? "접기" : `전체 ${total}개 펼치기`}`}
              onClick={toggle}
              className="flex size-8 shrink-0 items-center justify-center hover:opacity-70 md:size-10"
            >
              <Chevron open={open} />
            </button>
          )
        }
      >
        {title}
      </SectionTitle>
      <div className={`flex flex-col ${bodyClassName}`}>{render({ from: 0, to: foldable ? LIMIT : undefined })}</div>
      {foldable && (
        <div
          id={id}
          ref={panelRef}
          data-expanded={open}
          data-expanded-reveal={revealing || undefined}
          className="faculty-expand -mt-2"
          onAnimationEnd={(e) => {
            if (e.target === lastItem.current && e.animationName === "faculty-line-reveal") setRevealing(false);
          }}
        >
          <div className="faculty-expand-inner">
            <div className={`flex flex-col pt-2 ${bodyClassName}`}>{render({ from: LIMIT })}</div>
          </div>
        </div>
      )}
    </section>
  );
}

/** Publications — 소분류(group)를 가로질러 전체 순서 기준 [from, to) 범위만 */
function Publications({ groups, from, to = Infinity }: { groups: NonNullable<FacultyDetail["publications"]> } & Range) {
  let start = 0;
  return groups.map((group, i) => {
    const groupStart = start;
    const groupEnd = (start += group.entries.length);
    const a = Math.max(from, groupStart);
    const b = Math.min(to, groupEnd);
    if (a >= b) return null;
    // 펼침 영역이 소분류 경계에서 시작하면 소분류 사이 간격(PC 40px)을 맞춤
    const boundary = from > 0 && a === groupStart && a === from;
    return (
      <div key={group.label ?? i} className={`flex flex-col gap-2 ${boundary ? "md:pt-8" : ""}`}>
        {group.label && a === groupStart && (
          <Reveal>
            <h4 className="font-telegraf text-[16px] leading-[1.4] uppercase md:text-[18px]">{group.label}</h4>
          </Reveal>
        )}
        <EntryList entries={group.entries} from={a - groupStart} to={b - groupStart} />
        {b === groupEnd && group.note && (
          <Reveal>
            <p className={BODY}>
              <Linkify text={group.note} />
            </p>
          </Reveal>
        )}
      </div>
    );
  });
}

/** 모바일 소개 펼치기 화살표 (∨ / 펼치면 ∧) — Figma 419:1472 / 419:2113 */
function IntroToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-label={open ? "영문 소개 접기" : "영문 소개 펼치기"}
      onClick={onClick}
      className="flex h-8 w-full items-center justify-center md:hidden"
    >
      <img
        src="/icons/chevron-thin.svg"
        alt=""
        width={10.6607}
        height={19.9071}
        className={`block ${ICON_TURN} ${open ? "-rotate-90" : "rotate-90"}`}
      />
    </button>
  );
}

/** 오른쪽 CV — 첫 섹션이 화면에 보이면 섹션마다 차례로 등장 (BlockReveal) */
function CvColumn({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const first = ref.current?.firstElementChild;
    if (!first) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setStart(true);
        io.disconnect();
      }
    });
    io.observe(first);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex min-w-0 flex-1 flex-col gap-10 md:gap-[60px]">
      {Children.toArray(children).map((section, i) => (
        <BlockReveal key={i} index={i} start={start}>
          {section}
        </BlockReveal>
      ))}
    </div>
  );
}

/**
 * 닫기 X — 열릴 때 두 획이 차례로 그려지고, 마우스를 올리면 반 바퀴 회전 (Figma 486:1365)
 * PC 52px·2.2px 선 / 모바일 32px (시안 닫기 아이콘과 같은 크기·굵기)
 */
function CloseButton({ onClose, mobile = false, className }: { onClose: () => void; mobile?: boolean; className: string }) {
  const [spinning, setSpinning] = useState(false);
  const [a, b, size, stroke] = mobile ? [6.2, 25.8, 32, 2.55] : [10, 42, 52, 2.2];
  return (
    <button
      type="button"
      onClick={onClose}
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch" && !matchMedia(REDUCED_MOTION).matches) setSpinning(true);
      }}
      onAnimationEnd={(e) => e.animationName === "close-spin" && setSpinning(false)}
      data-spinning={spinning || undefined}
      aria-label="닫기"
      className={className}
    >
      <svg viewBox={`0 0 ${size} ${size}`} fill="none" aria-hidden className="block size-full">
        <line className="faculty-close-backslash" x1={a} y1={a} x2={b} y2={b} stroke="#F3183D" strokeWidth={stroke} pathLength={1} />
        <line className="faculty-close-slash" x1={b} y1={a} x2={a} y2={b} stroke="#F3183D" strokeWidth={stroke} pathLength={1} />
      </svg>
    </button>
  );
}

function Detail({ person }: { person: Faculty }) {
  const d = person.detail ?? {};
  const [introOpen, setIntroOpen] = useState(false);
  const contact = d.contact
    ? ([
        ["연구실", d.contact.office],
        ["전화", d.contact.phone],
        ["E-mail", d.contact.email],
      ].filter(([, v]) => v) as [string, string][])
    : [];

  return (
    <div className="flex flex-col gap-[60px] md:gap-[100px] lg:flex-row lg:items-start lg:gap-[60px] 2xl:gap-[180px]">
      {/* 왼쪽: 프로필 (항목 사이 Mo 32px / PC 40px) */}
      <div className="flex w-full flex-col gap-8 md:gap-10 lg:w-[320px] lg:shrink-0 2xl:w-[420px]">
        <div className="flex flex-col gap-[22.873px]">
          <div className="relative aspect-[1122/1402] w-full overflow-hidden bg-neutral-800">
            {person.image && (
              <Image
                src={person.image}
                alt=""
                fill
                sizes="(min-width: 1280px) 420px, (min-width: 1080px) 320px, 100vw"
                className="object-cover"
                style={{ objectPosition: person.objectPosition ?? "center" }}
              />
            )}
          </div>
          <div className="flex flex-col gap-3 leading-[1.2]">
            <div className="flex flex-col gap-1">
              <h2 className="font-telegraf text-[28px] leading-[1.06] md:text-[34px]">{person.nameEn}</h2>
              <p className="text-[24px] font-medium">{person.nameKo}</p>
            </div>
            {(d.title ?? person.position) && (
              <p className="text-[16px] font-medium md:text-[20px]">{d.title ?? person.position}</p>
            )}
          </div>
        </div>

        {contact.length > 0 && (
          <dl className="grid grid-cols-[auto_1fr] gap-x-10 text-[16px] leading-[1.4] text-[#a2a2a2] md:text-[18px]">
            {contact.map(([label, value]) => (
              <div key={label} className="contents">
                <dt>{label}</dt>
                <dd className="min-w-0 break-all">
                  {label === "E-mail" ? (
                    <a href={`mailto:${value}`} className="underline decoration-from-font hover:text-white">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {/* 소개 — 국문 14px/160%, 영문 14px/140% (시안 44:3598 등), 모바일 13px.
            모바일은 국문만 보이고 아래 화살표로 영문 펼치기 (419:1296 / 419:1959), PC 는 항상 둘 다 */}
        {(d.intro || d.introEn) && (
          <div className="flex flex-col gap-1 md:contents">
            <div className="flex flex-col gap-3 md:contents">
              {d.intro && (
                <p className="text-[13px] leading-[1.6] tracking-[-0.02em] whitespace-pre-line md:text-[14px] md:tracking-normal">
                  <Linkify text={d.intro} />
                </p>
              )}
              {d.introEn && (
                // 모바일은 화살표로 부드럽게 펼침 / 태블릿 이상은 항상 보임 (md-open)
                <div data-expanded={introOpen || !d.intro} className="faculty-expand md-open">
                  <div className="faculty-expand-inner">
                    <p
                      lang="en"
                      // 영문 소개: PC 는 회색 #949494 (시안 44:3019), 모바일은 흰색 (419:2112)
                      className="text-[13px] leading-[1.4] tracking-[-0.02em] whitespace-pre-line md:text-[14px] md:tracking-normal md:text-[#949494]"
                    >
                      <Linkify text={d.introEn} />
                    </p>
                  </div>
                </div>
              )}
            </div>
            {d.intro && d.introEn && <IntroToggle open={introOpen} onClick={() => setIntroOpen((v) => !v)} />}
          </div>
        )}
      </div>

      {/* 오른쪽: CV */}
      <CvColumn>
        {/* Major → Biography → Awards → Publications → Works → Patent → Research Interest → (기타)
            시안 44:2927·44:3598 등 순서. 모든 항목은 5개까지 보이고, 넘으면 화살표로 펼치기 (Figma 6:198) */}
        <Section title="Major" total={d.major?.length}>
          {(r) =>
            d.major?.length ? (
              d.major.some((m) => m.year) ? (
                <EntryList entries={d.major} {...r} />
              ) : (
                <ul className={BODY}>
                  {d.major.slice(r.from, r.to).map((m) => (
                    <Reveal key={m.text} as="li">
                      <Linkify text={m.text} />
                    </Reveal>
                  ))}
                </ul>
              )
            ) : (
              r.from === 0 && (
                <Reveal>
                  <p className={BODY}>{person.education}</p>
                </Reveal>
              )
            )
          }
        </Section>
        {d.biography?.length ? (
          <Section title="Biography" total={d.biography.length}>
            {(r) => <EntryList entries={d.biography!} {...r} />}
          </Section>
        ) : null}
        {d.awards?.length ? (
          <Section title="Awards" total={d.awards.length}>
            {(r) => <EntryList entries={d.awards!} {...r} />}
          </Section>
        ) : null}
        {d.publications?.length ? (
          <Section
            title={d.publicationsTitle ?? "Publications"}
            total={d.publications.reduce((n, g) => n + g.entries.length, 0)}
            bodyClassName="gap-2 md:gap-10"
          >
            {(r) => <Publications groups={d.publications!} {...r} />}
          </Section>
        ) : null}
        {d.works?.length ? (
          <Section title={d.worksTitle ?? "Works"} total={d.works.length}>
            {(r) => <EntryList entries={d.works!} {...r} />}
          </Section>
        ) : null}
        {d.patents?.length ? (
          <Section title="Patent" total={d.patents.length}>
            {(r) => <EntryList entries={d.patents!} {...r} />}
          </Section>
        ) : null}
        {d.researchInterest && (
          <Section title="Research Interest">
            <Reveal>
              <p className={BODY}>
                <Linkify text={d.researchInterest} />
              </p>
            </Reveal>
          </Section>
        )}
        {d.extra?.map((sec) => (
          <Section key={sec.title} title={sec.title} total={sec.entries.length}>
            {(r) => <EntryList entries={sec.entries} {...r} />}
          </Section>
        ))}
      </CvColumn>
    </div>
  );
}

/**
 * 교수 상세 모달 — Figma PC 44:2926·44:3362 / 6:198(전체 펼침), 모바일 419:1296(소개 접힘)·419:1959(펼침)
 * <dialog> 로 포커스 가두기·ESC 닫기를 브라우저에 맡김
 */
export function FacultyModal({ person, onClose }: { person: Faculty | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (person && !el.open) {
      el.showModal();
      el.scrollTop = 0;
      // 열릴 때 닫기 버튼 대신 모달 자체에 포커스 (닫기 버튼에 포커스 테두리가 생기지 않게)
      el.focus();
    }
    if (!person && el.open) el.close();
  }, [person]);

  // 상세 창 안에서도 페이지와 같은 스무스 스크롤 (배경 페이지 스크롤은 잠김)
  useEffect(() => {
    const wrapper = ref.current;
    const content = contentRef.current;
    if (!person || !wrapper || !content) return;
    const reduce = matchMedia(REDUCED_MOTION);
    let lenis: Lenis | undefined;
    const sync = () => {
      lenis?.destroy();
      lenis = reduce.matches ? undefined : new Lenis({ ...SMOOTH_SCROLL_OPTIONS, wrapper, content });
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      lenis?.destroy();
    };
  }, [person]);

  // 열려 있는 동안 배경 스크롤 잠금
  useEffect(() => {
    if (!person) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [person]);

  return (
    <dialog
      ref={ref}
      // 페이지 스무스 스크롤이 상세 창 휠 입력을 가로채지 않게
      data-lenis-prevent
      tabIndex={-1}
      aria-label={person ? `${person.nameKo} 교수 상세` : undefined}
      onClose={onClose}
      className="inset-0 m-0 h-full max-h-none w-full outline-none max-w-none overflow-y-auto overscroll-contain bg-black p-0 text-white backdrop:bg-black/60"
    >
      {person && (
        <div ref={contentRef}>
          {/* Mobile: 상단 바 (로고 + 닫기) */}
          <div className="sticky top-0 z-10 flex h-[60px] items-center justify-between bg-black px-[23px] md:hidden">
            <LogoCcd width={44.386} className="text-white" />
            <CloseButton onClose={onClose} mobile className="size-8" />
          </div>
          {/* Tablet+: 오른쪽 위 닫기 */}
          <CloseButton onClose={onClose} className="fixed top-10 right-10 z-10 hidden size-[52px] md:block" />

          <Container className="pt-0 pb-[90px] md:pt-[124px] md:pb-[100px]">
            <Detail key={person.slug} person={person} />
          </Container>
        </div>
      )}
    </dialog>
  );
}
