/* eslint-disable @next/next/no-img-element -- 아이콘 SVG */
import Link from "next/link";
import type { Exhibition } from "@/types/exhibition";
import { exhibitionHref } from "./ExhibitionRow";

type Side = "prev" | "next";
type Target = Pick<Exhibition, "year" | "name">;

const label = (side: Side, t: Target) => `${side === "prev" ? "이전" : "다음"} 전시: ${t.year} ${t.name}`;

/** PC: 큰 화살표 아이콘만 (Figma 480:1631 / 480:1648, 62px) */
function DesktopArrow({ side, target }: { side: Side; target: Target }) {
  return (
    <Link
      href={exhibitionHref(target.year)}
      aria-label={label(side, target)}
      className={`fixed top-1/2 z-40 hidden size-[62px] -translate-y-1/2 items-center justify-center transition-opacity hover:opacity-60 lg:flex ${
        side === "prev" ? "left-4 2xl:left-[53px]" : "right-4 2xl:right-[53px]"
      }`}
    >
      {/* ┘ 모양 에셋 — 이전 135°(‹) / 다음 -45°(›) */}
      <img
        src={`/icons/arrow-${side}-large.svg`}
        alt=""
        width={39.4566}
        height={39.4566}
        className={`block ${side === "prev" ? "rotate-[135deg]" : "-rotate-45"}`}
      />
    </Link>
  );
}

/** 모바일·태블릿: 흰 테두리 검정 상자 (Figma 483:3202 / 483:3214) — 화면 아래 양쪽에 떠 있음 */
function MobileArrow({ side, target }: { side: Side; target: Target }) {
  return (
    <Link
      href={exhibitionHref(target.year)}
      aria-label={label(side, target)}
      className={`fixed bottom-4 z-40 flex h-[54px] w-[62px] items-center justify-center border border-white bg-black lg:hidden ${
        side === "prev" ? "left-4" : "right-4"
      }`}
    >
      <span aria-hidden className="flex size-5 items-center justify-center">
        <img
          src="/icons/chevron-white.svg"
          alt=""
          width={14.1366}
          height={14.1366}
          className={`block ${side === "prev" ? "rotate-[135deg]" : "-rotate-45"}`}
        />
      </span>
    </Link>
  );
}

/**
 * 전시 상세 좌우 이동 — 왼쪽 = 이전(더 최근) 전시, 오른쪽 = 다음(더 오래된) 전시. 끝이면 그쪽 버튼 없음
 */
export function ExhibitionPager({ prev, next }: { prev?: Target; next?: Target }) {
  return (
    <nav aria-label="다른 전시 보기">
      {prev && <DesktopArrow side="prev" target={prev} />}
      {next && <DesktopArrow side="next" target={next} />}
      {prev && <MobileArrow side="prev" target={prev} />}
      {next && <MobileArrow side="next" target={next} />}
    </nav>
  );
}
