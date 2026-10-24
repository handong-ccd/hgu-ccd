import Image from "next/image";
import type { Exhibition } from "@/types/exhibition";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { Container } from "@/components/ui/Container";
import { DEFAULT_SIZE } from "@/components/sections/ExhibitionMobileCard";

/** 온라인 전시로 가는 버튼 — archiveUrl 이 있을 때만 */
function ArchiveLink({ href, tone }: { href: string; tone: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-[5.714px] border px-5 py-4 transition-opacity hover:opacity-70 ${
        dark ? "self-start border-white" : "w-full border-black"
      }`}
    >
      <span
        className={`font-telegraf leading-none uppercase [text-box:trim-both_cap_alphabetic] ${dark ? "text-[22.857px]" : "text-[20px]"}`}
      >
        Go to archive
      </span>
      <ArrowUpRight size={20} color={dark ? "white" : "black"} />
      <span className="sr-only">(온라인 전시, 새 탭에서 열림)</span>
    </a>
  );
}

/** Alumni — Figma 251:1807. 트랙별 지도교수 + 졸업생 4열 */
function Alumni({ alumni }: { alumni: NonNullable<Exhibition["alumni"]> }) {
  return (
    <section className="flex flex-col gap-1.5">
      <h2 className="font-telegraf text-[40px] leading-none tracking-[-0.03em]">Alumni</h2>
      {alumni.map((group) => (
        <div key={group.track} className="flex flex-col gap-1.5 border-t border-white/50 pt-1.5">
          <h3 className="border-b border-white/50 pb-1.5 font-telegraf text-[22px] leading-[1.4]">{group.track}</h3>
          <div className="flex gap-5 text-[16px] leading-[1.6]">
            <div className="flex w-[180px] shrink-0 flex-col gap-1.5">
              <p className="border-b border-white/30 pb-1.5">지도교수</p>
              <ul>
                {group.advisors.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <p className="border-b border-white/30 pb-1.5">졸업생</p>
              <ul className="grid grid-cols-4 gap-x-1.5">
                {group.graduates.map((name, i) => (
                  <li key={`${name}-${i}`}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

/** 전시 상세 — Figma PC 46:8026(링크 있음) / 46:8183(링크 없음), 모바일 6:1937 */
export function ExhibitionDetail({ item }: { item: Exhibition }) {
  const { width, height } = item.size ?? DEFAULT_SIZE;
  const paragraphs = item.body.filter((p) => !p.emphasis);
  const alt = `${item.year} 졸업 작품전 ${item.name} 포스터`;

  return (
    <>
      {/* Mobile / Tablet (<1080): 흰 배경 */}
      <article className="lg:hidden">
        <div className="relative w-full bg-neutral-100" style={{ aspectRatio: `${width} / ${height}` }}>
          <Image src={item.image} alt={alt} fill sizes="100vw" className="object-cover" priority />
        </div>
        <Container className="flex flex-col gap-[51px] py-10">
          <header className="flex flex-col gap-4 border-b border-line pb-4">
            <h1 className="font-telegraf text-[40px] leading-none uppercase">
              {item.name}
              <br />
              {item.date}, {item.venue}
            </h1>
            <div className="flex flex-col gap-2 font-telegraf">
              <p className="text-[14px] tracking-[-0.02em]">{item.subtitle[0]}</p>
              <p className="text-[20px] leading-[1.2] tracking-[-0.02em] uppercase">{item.subtitle[1]}</p>
            </div>
          </header>
          {item.verse && (
            <div className="flex flex-col gap-5">
              {item.verse.en && (
                <div className="flex flex-col gap-1.5 font-telegraf uppercase">
                  <p className="text-[12px] leading-none">{item.verse.en.ref}</p>
                  <p className="text-[22px] leading-[1.2]">{item.verse.en.text}</p>
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <p className="text-[12px] leading-none font-light">{item.verse.ref}</p>
                <p className="text-[14px] leading-[1.4] whitespace-pre-line">{item.verse.text}</p>
              </div>
            </div>
          )}
          {paragraphs.map((p) => (
            <p key={p.text} className="text-[16px] leading-[1.6] tracking-[-0.02em]">
              {p.text}
            </p>
          ))}
          {item.archiveUrl && <ArchiveLink href={item.archiveUrl} tone="light" />}
        </Container>
      </article>

      {/* Desktop (≥1080): 검정 배경 */}
      <article className="hidden bg-black text-white lg:block">
        <Container className="flex items-start justify-between gap-10 py-[100px]">
          <div className="flex w-1/2 max-w-[600px] min-w-0 flex-col gap-[100px]">
            <div className="flex flex-col gap-10">
              <h1 className="font-telegraf text-[48px] leading-none uppercase 2xl:text-[72px]">
                {item.name}
                <br />
                {item.date}, {item.venue}
              </h1>
              <p className="font-helvetica text-[20px] leading-[1.2] font-medium tracking-[-0.02em] 2xl:text-[24px]">
                {item.subtitle[0]}
                <br />
                {item.subtitle[1]}
              </p>
              {item.verse && (
                <p className="text-[16px] leading-[1.4] font-medium 2xl:text-[18px]">
                  {item.verse.text} ({item.verse.ref})
                </p>
              )}
              {item.verse?.en && (
                <p className="text-[16px] leading-[1.4] font-medium 2xl:text-[18px]">“{item.verse.en.text}”</p>
              )}
              {paragraphs.map((p) => (
                <p key={p.text} className="text-[16px] leading-[1.4] 2xl:text-[18px]">
                  {p.text}
                </p>
              ))}
              {item.archiveUrl && <ArchiveLink href={item.archiveUrl} tone="dark" />}
            </div>
            {item.alumni?.length ? <Alumni alumni={item.alumni} /> : null}
          </div>
          <div
            className="relative w-1/2 max-w-[600px] shrink-0 bg-neutral-900"
            style={{ aspectRatio: `${width} / ${height}` }}
          >
            <Image src={item.image} alt={alt} fill sizes="(min-width: 1280px) 600px, 50vw" className="object-cover" />
          </div>
        </Container>
      </article>
    </>
  );
}
