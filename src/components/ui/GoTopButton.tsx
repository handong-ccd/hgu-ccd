"use client";

/* eslint-disable @next/next/no-img-element -- 아이콘 SVG */
import { useEffect, useState } from "react";

/** 이만큼 내려가면 버튼 등장 (px) */
const SHOW_AFTER = 400;

/**
 * Go to Top — 스크롤하면 화면 오른쪽 아래에 떠 있는 검정 버튼 (Figma 모바일 514:2172 53px / PC 514:2191 55px)
 * 메인·전시 목록 페이지에서 사용
 */
export function GoTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="맨 위로"
      tabIndex={show ? 0 : -1}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className={`fixed right-2 bottom-4 z-40 flex size-[53px] items-center justify-center bg-black transition-[opacity,translate] duration-300 hover:bg-neutral-800 md:right-10 md:bottom-10 md:size-[55px] ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      {/* ┘ 모양 에셋을 -135° 돌려 ∧ */}
      <span aria-hidden className="flex size-5 items-center justify-center">
        <img src="/icons/chevron-white.svg" alt="" width={14.1366} height={14.1366} className="block -rotate-[135deg]" />
      </span>
    </button>
  );
}
