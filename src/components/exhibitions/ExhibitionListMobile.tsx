"use client";

import Link from "next/link";
import { useState } from "react";
import type { Exhibition } from "@/types/exhibition";
import { ExhibitionMobileCard } from "@/components/sections/ExhibitionMobileCard";
import { exhibitionHref } from "./ExhibitionRow";

const PAGE = 12;

/** 전시 목록 모바일 — 카드는 메인과 같은 구조 (Figma 6:2071). 남은 항목이 있을 때만 MORE 버튼 */
export function ExhibitionListMobile({ items }: { items: Exhibition[] }) {
  const [count, setCount] = useState(PAGE);
  return (
    <div className="flex flex-col gap-10">
      <ul className="flex flex-col gap-2">
        {items.slice(0, count).map((item) => (
          <li key={item.year} className="border-b-[0.5px] border-line pb-5">
            <Link href={exhibitionHref(item.year)} className="block">
              <ExhibitionMobileCard item={item} />
            </Link>
          </li>
        ))}
      </ul>
      {count < items.length && (
        <button
          type="button"
          onClick={() => setCount((c) => c + PAGE)}
          className="flex w-full items-center justify-center border border-black px-5 py-4 font-telegraf text-[20px] leading-none uppercase [text-box:trim-both_cap_alphabetic]"
        >
          more
        </button>
      )}
    </div>
  );
}
