import Image from "next/image";
import { Fragment } from "react";
import { getExhibitions } from "@/lib/api/exhibitions";
import type { Exhibition as ExhibitionItem } from "@/types/exhibition";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExhibitionRail } from "./ExhibitionRail";

const MORE_HREF = "#"; // TODO: 전시 아카이브 페이지

/** 백엔드 응답에 size 가 없을 때 쓰는 기본 포스터 크기 */
const DEFAULT_SIZE = { width: 480, height: 680 };

function Body({ body }: { body: ExhibitionItem["body"] }) {
  if (body.length === 1) {
    return <p className="text-[14px] leading-normal">{body[0].text}</p>;
  }
  return (
    <div className="flex flex-col gap-2 text-[14px] leading-[1.4]">
      {body.map((p) => (
        <p key={p.text} className={p.emphasis ? "font-medium" : undefined}>
          {p.text}
        </p>
      ))}
    </div>
  );
}

function DesktopCard({ item }: { item: ExhibitionItem }) {
  const { width, height } = item.size ?? DEFAULT_SIZE;
  return (
    <article className="flex shrink-0 flex-col gap-4" style={{ width }}>
      <div className="relative shrink-0 overflow-hidden bg-neutral-100" style={{ width, height }}>
        <Image
          src={item.image}
          alt={`${item.year} 졸업 작품전 ${item.name} 포스터`}
          fill
          sizes={`${width}px`}
          className="pointer-events-none object-cover"
          draggable={false}
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-telegraf text-[44px] leading-none uppercase 2xl:text-[48px]">
            {item.name}
            <br />
            {item.venueOnNewLine ? (
              <>
                {item.date}
                <br />
                {item.venue}
              </>
            ) : (
              `${item.date}, ${item.venue}`
            )}
          </h3>
          <p className="font-helvetica text-[18px] leading-normal font-medium tracking-[-0.02em]">
            {item.subtitle[0]}
            <br />
            {item.subtitle[1]}
          </p>
        </div>
        <Body body={item.body} />
      </div>
    </article>
  );
}

function MobileCard({ item, compact }: { item: ExhibitionItem; compact: boolean }) {
  return (
    <article className={compact ? "flex gap-4" : "flex flex-col gap-4"}>
      <div
        className={`relative shrink-0 overflow-hidden bg-black/20 ${compact ? "h-[244px] w-[144px]" : "h-[414px] w-full"}`}
      >
        <Image
          src={item.image}
          alt={`${item.year} 졸업 작품전 ${item.name} 포스터`}
          fill
          sizes={compact ? "144px" : "100vw"}
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-telegraf text-[36px] leading-none uppercase">
            {item.name}
            <br />
            {item.date}
          </h3>
          <p className="font-helvetica text-[18px] leading-normal font-medium tracking-[-0.02em]">
            {item.subtitle[1]}
          </p>
        </div>
        <Body body={item.body} />
      </div>
    </article>
  );
}

export async function Exhibition() {
  const exhibitions = await getExhibitions();

  return (
    <section aria-labelledby="exhibitions" className="scroll-mt-4">
      <SectionHeading
        id="exhibitions"
        title="Exhibition"
        aside={
          <a href={MORE_HREF} className="flex shrink-0 items-center gap-1 hover:opacity-70 md:gap-[5.714px]">
            <span className="font-telegraf text-[16px] leading-none text-black uppercase [text-box:trim-both_cap_alphabetic] md:text-[22.857px] md:text-accent">
              More
            </span>
            <span className="flex md:hidden">
              <ArrowUpRight size={14} color="black" />
            </span>
            <span className="hidden md:flex">
              <ArrowUpRight size={20} color="accent" />
            </span>
          </a>
        }
      />

      {/* Mobile: 최근 3개 세로 리스트 */}
      <div className="mt-3 flex flex-col gap-3 md:hidden">
        {exhibitions.slice(0, 3).map((item, i) => (
          <Fragment key={item.year}>
            {i > 0 && <hr className="border-0 border-t border-line" />}
            <MobileCard item={item} compact={i === 0} />
          </Fragment>
        ))}
      </div>

      {/* Tablet+: 가로 스크롤 */}
      <div className="mt-5 hidden md:block">
        <ExhibitionRail>
          {exhibitions.map((item, i) => (
            <Fragment key={item.year}>
              {i > 0 && <span aria-hidden className="w-px shrink-0 self-stretch bg-line-soft" />}
              <DesktopCard item={item} />
            </Fragment>
          ))}
        </ExhibitionRail>
      </div>
    </section>
  );
}
