"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/data/site";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { Container } from "@/components/ui/Container";
import { LogoCcd } from "@/components/ui/LogoCcd";

const linkText = "font-pretendard text-[14px] uppercase leading-none tracking-[-0.02em] text-white";

function ExternalLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-[30px] ${className}`}>
      <li>
        <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className={`${linkText} hover:opacity-60`}>
          Youtube
        </a>
      </li>
      <li>
        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className={`${linkText} hover:opacity-60`}>
          Instagram
        </a>
      </li>
      <li>
        <a
          href={SOCIAL_LINKS.hgu}
          target="_blank"
          rel="noreferrer"
          className={`${linkText} flex items-center gap-1 hover:opacity-60`}
        >
          HGU
          <ArrowUpRight color="white" />
        </a>
      </li>
    </ul>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1080 && setOpen(false);
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
    <header className="relative z-50 bg-black text-white">
      {/* Desktop (≥1080) */}
      <Container className="hidden h-[82px] items-center justify-between lg:flex">
        <div className="flex items-center gap-[60px]">
          <a href="#top" aria-label="HGU CCD 홈" className="text-white">
            <LogoCcd width={55.4848} />
          </a>
          <nav aria-label="주요 메뉴">
            <ul className="flex items-center gap-[30px]">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={`${linkText} hover:opacity-60`}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <ExternalLinks />
      </Container>

      {/* Mobile / Tablet (<1080) */}
      <div className="flex h-[72px] items-center justify-between px-[23px] md:px-[60px] lg:hidden">
        <a href="#top" aria-label="HGU CCD 홈" className="text-white">
          <LogoCcd width={44.3855} />
        </a>
        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="-m-2 grid size-[41px] place-items-center"
        >
          {open ? (
            <span aria-hidden className="relative block h-5 w-[25px]">
              <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 rotate-45 bg-white" />
              <span className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 -rotate-45 bg-white" />
            </span>
          ) : (
            <img src="/icons/menu.svg" alt="" width={25} height={22} className="block h-[22px] w-[25px]" />
          )}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-black lg:hidden">
          <nav aria-label="주요 메뉴" className="px-4 pt-6 pb-10 md:px-[60px]">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="border-b border-white/20">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-telegraf text-[32px] leading-none tracking-[-0.03em] uppercase"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <ExternalLinks className="mt-8" />
          </nav>
        </div>
      )}
    </header>
  );
}
