"use client";

/* eslint-disable @next/next/no-img-element -- 아이콘 SVG */
import Image from "next/image";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { CvEntry, Faculty, FacultyDetail } from "@/types/faculty";
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
      <div className="flex items-center gap-1.5 md:gap-2">
        <h3 className="flex-1 font-telegraf text-[22px] leading-normal md:text-[26px] md:leading-[1.4]">{children}</h3>
        {aside}
      </div>
      <hr className="border-0 border-t border-white/50 md:border-t-[0.5px] md:border-white" />
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

function EntryList({ entries, limit }: { entries: CvEntry[]; limit?: number }) {
  const rows = withYears(entries);
  return (
    <ul className={`flex flex-col gap-2 ${BODY}`}>
      {rows.slice(0, limit).map((e, i) => (
        <li key={i} className="flex gap-3">
          <span className="w-[52px] shrink-0 md:w-[100px]">{e.year}</span>
          <span className="min-w-0 flex-1">
            <Linkify text={e.text} />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** 처음 보여줄 항목 수 — 넘으면 제목 오른쪽 화살표로 나머지 펼치기 (Figma 6:198) */
const LIMIT = 5;

/** ∨ 화살표 — 펼치면 위로 뒤집힘 */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 26 14"
      fill="none"
      aria-hidden
      className={`block w-[20.8px] transition-transform duration-300 md:w-[26px] ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 1l12 12L25 1" stroke="currentColor" strokeWidth={1.2} />
    </svg>
  );
}

/**
 * CV 섹션. 항목(total)이 LIMIT 를 넘으면 처음엔 LIMIT 개만 보여주고 화살표 버튼으로 전체 펼치기.
 * children 은 현재 보여줄 개수(limit, 펼치면 undefined = 전체)를 받아서 그림
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
  children: ReactNode | ((limit: number | undefined) => ReactNode);
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const foldable = total > LIMIT;
  const limit = foldable && !open ? LIMIT : undefined;
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
              onClick={() => setOpen((v) => !v)}
              className="flex size-8 shrink-0 items-center justify-center hover:opacity-70 md:size-10"
            >
              <Chevron open={open} />
            </button>
          )
        }
      >
        {title}
      </SectionTitle>
      <div id={id} className={`flex flex-col ${bodyClassName}`}>
        {typeof children === "function" ? children(limit) : children}
      </div>
    </section>
  );
}

/** Publications — 소분류(group)를 가로질러 앞에서부터 limit 개만 */
function Publications({ groups, limit }: { groups: NonNullable<FacultyDetail["publications"]>; limit?: number }) {
  let left = limit ?? Infinity;
  return groups.map((group, i) => {
    const take = Math.min(group.entries.length, left);
    left -= take;
    if (take === 0) return null;
    return (
      <div key={group.label ?? i} className="flex flex-col gap-2">
        {group.label && (
          <h4 className="font-telegraf text-[16px] leading-[1.4] uppercase md:text-[18px]">{group.label}</h4>
        )}
        <EntryList entries={group.entries} limit={take} />
        {take === group.entries.length && group.note && (
          <p className={BODY}>
            <Linkify text={group.note} />
          </p>
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
        className={`block transition-transform duration-300 ${open ? "-rotate-90" : "rotate-90"}`}
      />
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
                <p
                  lang="en"
                  className={`text-[13px] leading-[1.4] tracking-[-0.02em] whitespace-pre-line md:block md:text-[14px] md:tracking-normal ${
                    introOpen || !d.intro ? "" : "hidden"
                  }`}
                >
                  <Linkify text={d.introEn} />
                </p>
              )}
            </div>
            {d.intro && d.introEn && <IntroToggle open={introOpen} onClick={() => setIntroOpen((v) => !v)} />}
          </div>
        )}
      </div>

      {/* 오른쪽: CV */}
      <div className="flex min-w-0 flex-1 flex-col gap-10 md:gap-[60px]">
        {/* Major → Biography → Awards → Publications → Works → Patent → Research Interest → (기타)
            시안 44:2927·44:3598 등 순서. 모든 항목은 5개까지 보이고, 넘으면 화살표로 펼치기 (Figma 6:198) */}
        <Section title="Major" total={d.major?.length}>
          {(limit) =>
            d.major?.length ? (
              d.major.some((m) => m.year) ? (
                <EntryList entries={d.major} limit={limit} />
              ) : (
                <ul className={BODY}>
                  {d.major.slice(0, limit).map((m) => (
                    <li key={m.text}>
                      <Linkify text={m.text} />
                    </li>
                  ))}
                </ul>
              )
            ) : (
              <p className={BODY}>{person.education}</p>
            )
          }
        </Section>
        {d.biography?.length ? (
          <Section title="Biography" total={d.biography.length}>
            {(limit) => <EntryList entries={d.biography!} limit={limit} />}
          </Section>
        ) : null}
        {d.awards?.length ? (
          <Section title="Awards" total={d.awards.length}>
            {(limit) => <EntryList entries={d.awards!} limit={limit} />}
          </Section>
        ) : null}
        {d.publications?.length ? (
          <Section
            title={d.publicationsTitle ?? "Publications"}
            total={d.publications.reduce((n, g) => n + g.entries.length, 0)}
            bodyClassName="gap-2 md:gap-10"
          >
            {(limit) => <Publications groups={d.publications!} limit={limit} />}
          </Section>
        ) : null}
        {d.works?.length ? (
          <Section title="Works" total={d.works.length}>
            {(limit) => <EntryList entries={d.works!} limit={limit} />}
          </Section>
        ) : null}
        {d.patents?.length ? (
          <Section title="Patent" total={d.patents.length}>
            {(limit) => <EntryList entries={d.patents!} limit={limit} />}
          </Section>
        ) : null}
        {d.researchInterest && (
          <Section title="Research Interest">
            <p className={BODY}>
              <Linkify text={d.researchInterest} />
            </p>
          </Section>
        )}
        {d.extra?.map((sec) => (
          <Section key={sec.title} title={sec.title} total={sec.entries.length}>
            {(limit) => <EntryList entries={sec.entries} limit={limit} />}
          </Section>
        ))}
      </div>
    </div>
  );
}

/**
 * 교수 상세 모달 — Figma PC 44:2926·44:3362 / 6:198(전체 펼침), 모바일 419:1296(소개 접힘)·419:1959(펼침)
 * <dialog> 로 포커스 가두기·ESC 닫기를 브라우저에 맡김
 */
export function FacultyModal({ person, onClose }: { person: Faculty | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

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
      tabIndex={-1}
      aria-label={person ? `${person.nameKo} 교수 상세` : undefined}
      onClose={onClose}
      className="inset-0 m-0 h-full max-h-none w-full outline-none max-w-none overflow-y-auto overscroll-contain bg-black p-0 text-white backdrop:bg-black/60"
    >
      {person && (
        <>
          {/* Mobile: 상단 바 (로고 + 닫기) */}
          <div className="sticky top-0 z-10 flex h-[60px] items-center justify-between bg-black px-[23px] md:hidden">
            <LogoCcd width={44.386} className="text-white" />
            <button type="button" onClick={onClose} aria-label="닫기" className="size-8">
              <img src="/icons/close-mobile.svg" alt="" width={32} height={32} className="block size-8" />
            </button>
          </div>
          {/* Tablet+: 오른쪽 위 닫기 */}
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="fixed top-10 right-10 z-10 hidden size-[52px] hover:opacity-70 md:block"
          >
            <img src="/icons/close.svg" alt="" width={52} height={52} className="block size-[52px]" />
          </button>

          <Container className="pt-0 pb-[90px] md:pt-[124px] md:pb-[100px]">
            <Detail key={person.slug} person={person} />
          </Container>
        </>
      )}
    </dialog>
  );
}
