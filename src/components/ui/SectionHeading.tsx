import type { ReactNode } from "react";

/** 섹션 타이틀 + 하단 구분선 (PC 40px / Mo 32px) */
export function SectionHeading({
  id,
  title,
  aside,
  below,
  asideAlign = "center",
  className = "",
}: {
  id?: string;
  title: string;
  /** 타이틀 오른쪽 (More 링크, PC 다운로드 버튼 등) */
  aside?: ReactNode;
  /** 구분선 아래 (모바일 다운로드 버튼 등) */
  below?: ReactNode;
  /** aside 세로 정렬 — "end" 면 타이틀 아래선(구분선 바로 위)에 붙임 */
  asideAlign?: "center" | "end";
  className?: string;
}) {
  return (
    <div className={`flex w-full flex-col gap-2 ${className}`}>
      <div className={`flex w-full gap-2 ${asideAlign === "end" ? "items-end" : "items-center"}`}>
        <h2
          id={id}
          className="min-w-0 flex-1 font-telegraf text-[32px] leading-none tracking-[-0.03em] md:text-[40px]"
        >
          {title}
        </h2>
        {aside}
      </div>
      <hr className="w-full border-0 border-t border-line" />
      {below}
    </div>
  );
}
