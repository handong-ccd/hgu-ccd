import Image from "next/image";
import Link from "next/link";
import type { Exhibition } from "@/types/exhibition";
import { DEFAULT_SIZE } from "@/components/sections/ExhibitionMobileCard";
import { dateVenue } from "@/lib/exhibition";

export function exhibitionHref(year: number) {
  return `/exhibitions/${year}`;
}

/**
 * 전시 목록 PC 한 행 — Figma 6:1231 등. 글은 왼쪽(650px) / 포스터는 오른쪽(최대 560px) 고정, 아래 구분선.
 * 제목 → (80px) → 부제 2줄 → (24px) → 소개. 제목·포스터를 누르면 전시 상세로
 */
export function ExhibitionRow({ item, eager = false }: { item: Exhibition; eager?: boolean }) {
  const { width, height } = item.size ?? DEFAULT_SIZE;
  const paragraphs = item.body.filter((p) => !p.emphasis);
  const href = exhibitionHref(item.year);

  return (
    <article className="flex items-start justify-between gap-10 border-b border-line py-10">
      <div className="flex w-1/2 max-w-[650px] min-w-0 flex-col gap-10 2xl:gap-20">
        <h2 className="font-telegraf text-[40px] leading-none uppercase 2xl:text-[72px]">
          <Link href={href} className="hover:opacity-70">
            {item.name}
            {dateVenue(item) && (
              <>
                <br />
                {dateVenue(item)}
              </>
            )}
          </Link>
        </h2>
        <div className="flex flex-col gap-6">
          <p className="text-[20px] leading-normal font-medium tracking-[-0.02em] 2xl:text-[24px]">
            {item.subtitle[0]}
            <br />
            {item.subtitle[1]}
          </p>
          {paragraphs.map((p) => (
            <p key={p.text} className="text-[16px] leading-[1.4] 2xl:text-[18px]">
              {p.text}
            </p>
          ))}
        </div>
      </div>
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="group relative block w-[40%] max-w-[560px] shrink-0 overflow-hidden bg-neutral-100"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 560px, 40vw"
          loading={eager ? "eager" : undefined}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>
    </article>
  );
}
