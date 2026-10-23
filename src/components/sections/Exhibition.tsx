import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { getExhibitions } from "@/lib/api/exhibitions";
import type { Exhibition as ExhibitionItem } from "@/types/exhibition";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExhibitionRail, RailControls } from "./ExhibitionRail";
import { DEFAULT_SIZE, ExhibitionMobileCard } from "./ExhibitionMobileCard";

const MORE_HREF = "/exhibitions";
const RAIL_ID = "exhibition-rail";


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

export async function Exhibition() {
  const exhibitions = await getExhibitions();

  return (
    <section aria-labelledby="exhibitions" className="scroll-mt-4">
      <SectionHeading
        id="exhibitions"
        title="Exhibition"
        aside={
          <>
            {/* Mobile: MORE ↗ */}
            <Link href={MORE_HREF} className="flex shrink-0 items-center gap-1 hover:opacity-70 md:hidden">
              <span className="font-telegraf text-[16px] leading-none text-accent uppercase [text-box:trim-both_cap_alphabetic]">
                More
              </span>
              <ArrowUpRight size={14} color="accent" />
            </Link>
            {/* Tablet+: ‹ › + MORE 버튼 */}
            <div className="hidden shrink-0 items-center gap-5 md:flex">
              <RailControls target={RAIL_ID} />
              <Link
                href={MORE_HREF}
                className="flex min-w-[160px] items-center justify-center border border-black px-5 py-4 font-telegraf text-[22.857px] leading-none uppercase transition-colors [text-box:trim-both_cap_alphabetic] hover:bg-black hover:text-white"
              >
                more
              </Link>
            </div>
          </>
        }
      />

      {/* Mobile: 최근 5개 세로 리스트 + 전체보기 */}
      <div className="mt-3 flex flex-col gap-6 md:hidden">
        <ul className="flex flex-col gap-2">
          {exhibitions.slice(0, 5).map((item) => (
            <li key={item.year} className="flex flex-col gap-2 border-b border-line pb-2">
              <ExhibitionMobileCard item={item} />
            </li>
          ))}
        </ul>
        <Link
          href={MORE_HREF}
          className="flex w-full items-center justify-center border border-black px-5 py-4 font-telegraf text-[16px] leading-none uppercase [text-box:trim-both_cap_alphabetic]"
        >
          전체보기
        </Link>
      </div>

      {/* Tablet+: 가로 스크롤 */}
      <div className="mt-5 hidden md:block">
        <ExhibitionRail id={RAIL_ID}>
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
