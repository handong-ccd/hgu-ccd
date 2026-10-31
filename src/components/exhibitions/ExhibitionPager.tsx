/* eslint-disable @next/next/no-img-element -- 아이콘 SVG */
import Link from "next/link";
import type { Exhibition } from "@/types/exhibition";
import { exhibitionHref } from "./ExhibitionRow";

type Side = "prev" | "next";
type Target = Pick<Exhibition, "year" | "name">;

const label = (side: Side, t: Target) => `${side === "prev" ? "이전" : "다음"} 전시: ${t.year} ${t.name}`;

/** 검정 배경 버튼 — 마우스 올리거나 키보드 포커스 시 흰 배경 + 아이콘 반전 */
const BUTTON =
  "group flex items-center justify-center bg-black transition-colors hover:bg-white focus-visible:bg-white motion-reduce:transition-none";
const ICON = "block transition-[filter] group-hover:invert group-focus-visible:invert motion-reduce:transition-none";

/** PC(1080+): 화면 세로 가운데 양옆, 검정 정사각형 44px(1280+ 62px) 안에 큰 화살표 (Figma 480:1631 / 480:1648) */
function DesktopArrow({ side, target }: { side: Side; target: Target }) {
  return (
    <Link
      href={exhibitionHref(target.year)}
      aria-label={label(side, target)}
      className={`${BUTTON} fixed top-1/2 z-40 hidden size-11 -translate-y-1/2 lg:flex 2xl:size-[62px] ${
        side === "prev" ? "left-2 2xl:left-[50px]" : "right-2 2xl:right-[53px]"
      }`}
    >
      {/* ┘ 모양 에셋 — 이전 135°(‹) / 다음 -45°(›), 작은 화면은 0.7배 */}
      <span className="scale-70 2xl:scale-100">
        <img
          src={`/icons/arrow-${side}-large.svg`}
          alt=""
          width={39.4566}
          height={39.4566}
          className={`${ICON} ${side === "prev" ? "rotate-[135deg]" : "-rotate-45"}`}
        />
      </span>
    </Link>
  );
}

/** 모바일·태블릿: 화살표 버튼 (60×52) */
function MobileArrow({ side, target }: { side: Side; target: Target }) {
  return (
    <Link href={exhibitionHref(target.year)} aria-label={label(side, target)} className={`${BUTTON} h-[52px] w-[60px]`}>
      <span aria-hidden className="flex size-5 items-center justify-center">
        <img
          src="/icons/chevron-white.svg"
          alt=""
          width={14.1366}
          height={14.1366}
          className={`${ICON} ${side === "prev" ? "rotate-[135deg]" : "-rotate-45"}`}
        />
      </span>
    </Link>
  );
}

/** 모바일 하단 바 높이 (버튼 52 + 위아래 12) — 페이지 맨 아래 여백에도 사용 */
export const PAGER_BAR_HEIGHT = 76;

/**
 * 전시 상세 이전/다음 전시 이동 — 왼쪽 = 이전(한 해 전) 전시, 오른쪽 = 다음(한 해 뒤) 전시. 끝이면 그쪽 버튼 없음
 * - 모바일·태블릿: 화면 하단 전체 폭 검정 바 위에 좌우 버튼 (아이폰 홈 바 영역만큼 아래 여백)
 * - PC: 화면 세로 가운데 양옆 검정 버튼
 */
export function ExhibitionPager({ prev, next }: { prev?: Target; next?: Target }) {
  return (
    <>
      <nav aria-label="이전 및 다음 전시" className="hidden lg:block">
        {prev && <DesktopArrow side="prev" target={prev} />}
        {next && <DesktopArrow side="next" target={next} />}
      </nav>
      <nav
        aria-label="이전 및 다음 전시"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between bg-black px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden"
      >
        {prev ? <MobileArrow side="prev" target={prev} /> : <span />}
        {next ? <MobileArrow side="next" target={next} /> : <span />}
      </nav>
    </>
  );
}
