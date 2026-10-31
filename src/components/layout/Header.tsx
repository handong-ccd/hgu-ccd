"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/data/site";
import { LineReveal } from "@/components/motion/LineReveal";
import { REDUCED_MOTION } from "@/components/motion/motion";
import { Container } from "@/components/ui/Container";
import { LogoCcd } from "@/components/ui/LogoCcd";
import "./header.css";

const linkText = "font-pretendard text-[14px] uppercase leading-none tracking-[-0.02em]";

/** dark: 검정 배경(기본, 메인·전시 상세) / light: 흰 배경(전시 목록) */
type Tone = "dark" | "light";

/** 헤더 높이만큼은 항상 보이고, 그 아래에서 아래로 스크롤하면 숨기고 위로 스크롤하면 다시 보임 */
function useHideOnScrollDown() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 82) setHidden(false);
      else if (y > last + 4) setHidden(true);
      else if (y < last - 4) setHidden(false);
      if (Math.abs(y - last) > 4 || y < 82) last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return hidden;
}

export function Header({ tone = "dark" }: { tone?: Tone }) {
  const light = tone === "light";
  const [open, setOpen] = useState(false);
  const hidden = useHideOnScrollDown() && !open;
  // 닫기 X 호버 회전 (한 번 돌고 끝나면 해제)
  const [spinning, setSpinning] = useState(false);
  const close = () => {
    setOpen(false);
    setSpinning(false);
  };

  useEffect(() => {
    if (!open) return;
    const shut = () => {
      setOpen(false);
      setSpinning(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && shut();
    const onResize = () => window.innerWidth >= 1080 && shut();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    // 모든 페이지 공통: 화면 위에 붙어 있고(sticky), 아래로 스크롤하면 숨김 → 위로 스크롤하면 다시 나타남 (header.css)
    <header
      data-header-hidden={hidden ? "true" : undefined}
      className={`site-header sticky top-0 z-50 ${light ? "bg-white text-black" : "bg-black text-white"}`}
    >
      {/* Desktop (≥1080) */}
      <Container className="hidden h-[82px] items-center lg:flex">
        <div className="flex items-center gap-[60px]">
          <Link href="/" aria-label="HGU CCD 홈" className="text-current">
            <LogoCcd width={55.4848} />
          </Link>
          <nav aria-label="주요 메뉴">
            <ul className="flex items-center gap-[30px]">
              {/* 메뉴 등장 — 항목마다 100ms 차이로 아래에서 올라옴 */}
              {NAV_ITEMS.map((item, index) => (
                <li key={item.href}>
                  <a href={item.href} className={`block ${linkText} whitespace-nowrap hover:opacity-60`}>
                    <LineReveal as="span" index={index} className="block">
                      {item.label}
                    </LineReveal>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      {/* Mobile / Tablet (<1080) */}
      <div className="flex h-[60px] items-center justify-between px-[23px] md:px-[60px] lg:hidden">
        <Link href="/" aria-label="HGU CCD 홈" className="text-current">
          <LogoCcd width={44.3855} />
        </Link>
        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => (open ? close() : setOpen(true))}
          onPointerEnter={(e) => {
            if (open && e.pointerType !== "touch" && !matchMedia(REDUCED_MOTION).matches) setSpinning(true);
          }}
          onAnimationEnd={(e) => e.animationName === "close-spin" && setSpinning(false)}
          data-spinning={spinning ? "true" : undefined}
          className="-m-2 grid size-[41px] place-items-center"
        >
          {open ? (
            <svg aria-hidden viewBox="0 0 25 25" fill="none" className="menu-close-icon block size-[25px]">
              <line className="menu-close-backslash" x1="3.66" y1="3.66" x2="21.34" y2="21.34" stroke="currentColor" strokeWidth="2" pathLength={1} />
              <line className="menu-close-slash" x1="21.34" y1="3.66" x2="3.66" y2="21.34" stroke="currentColor" strokeWidth="2" pathLength={1} />
            </svg>
          ) : (
            // 햄버거 — menu.svg 와 같은 25×22, 2px 선 3개 (색은 헤더 글자색)
            <span aria-hidden className="flex h-[22px] w-[25px] flex-col justify-between">
              <span className="h-0.5 w-full bg-current" />
              <span className="h-0.5 w-full bg-current" />
              <span className="h-0.5 w-full bg-current" />
            </span>
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          data-lenis-prevent
          className={`fixed inset-x-0 top-[60px] bottom-0 overflow-y-auto lg:hidden ${light ? "bg-white" : "bg-black"}`}
        >
          <nav aria-label="주요 메뉴" className="px-4 pt-6 pb-10 md:px-[60px]">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.href} className={`border-b ${light ? "border-black/20" : "border-white/20"}`}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="block py-4 font-telegraf text-[32px] leading-none tracking-[-0.03em] uppercase"
                  >
                    <LineReveal as="span" index={index} className="block">
                      {item.label}
                    </LineReveal>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
