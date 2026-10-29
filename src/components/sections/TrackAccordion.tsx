"use client";

/* eslint-disable @next/next/no-img-element -- 아이콘 SVG */
import { useId, useState, type ReactNode } from "react";

/**
 * 모바일 커리큘럼 트랙 — 제목 줄(트랙명 + ∨) 을 누르면 학년별 과목 펼치기. 기본은 접힘
 * Figma 6:2130 (514:2129 화살표 21px)
 */
export function TrackAccordion({ name, children }: { name: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <h3>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between text-left text-[16px] leading-[1.2] font-medium"
          >
            {name}
            {/* › 모양 에셋 — 접힘 90°(∨) / 펼침 -90°(∧) */}
            <span aria-hidden className="flex size-[21px] shrink-0 items-center justify-center">
              <img
                src="/icons/chevron-down.svg"
                alt=""
                width={9.06066}
                height={16.7071}
                className={`block transition-transform duration-300 ${open ? "-rotate-90" : "rotate-90"}`}
              />
            </span>
          </button>
        </h3>
        <hr className="border-0 border-t border-line" />
      </div>
      <div id={id} hidden={!open}>
        {children}
      </div>
    </div>
  );
}
