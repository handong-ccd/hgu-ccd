"use client";

import { useRef, type ReactNode } from "react";

/** 가로 스크롤 영역 — 트랙패드/휠은 기본 스크롤, 마우스는 드래그로 이동 */
export function ExhibitionRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });

  return (
    <div
      ref={ref}
      role="region"
      aria-label="졸업 전시 목록 (가로 스크롤)"
      tabIndex={0}
      className="scrollbar-none flex w-full cursor-grab items-stretch gap-4 overflow-x-auto overscroll-x-contain select-none active:cursor-grabbing"
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        drag.current = { active: true, moved: false, startX: e.clientX, startLeft: ref.current.scrollLeft };
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d.active || !ref.current) return;
        const dx = e.clientX - d.startX;
        if (Math.abs(dx) > 4) d.moved = true;
        ref.current.scrollLeft = d.startLeft - dx;
      }}
      onPointerUp={() => (drag.current.active = false)}
      onPointerLeave={() => (drag.current.active = false)}
      onClickCapture={(e) => {
        if (drag.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          drag.current.moved = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
