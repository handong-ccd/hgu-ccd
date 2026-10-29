"use client";

/* eslint-disable @next/next/no-img-element -- 아이콘 SVG */
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { Exhibition } from "@/types/exhibition";
import { ExhibitionMobileCard } from "@/components/sections/ExhibitionMobileCard";
import { ExhibitionRow, exhibitionHref } from "./ExhibitionRow";

/** 모바일에서 처음 / MORE 한 번에 보여줄 개수 */
const PAGE = 12;

/** 대소문자·띄어쓰기 무시 */
const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, "");

/** 검색 대상 — 연도·제목·부제·기간·장소·소개·지도교수·졸업생 이름 */
function searchText(item: Exhibition) {
  return normalize(
    [
      item.year,
      item.name,
      ...item.subtitle,
      item.date,
      item.venue,
      ...item.body.map((p) => p.text),
      ...(item.advisors ?? []),
      ...(item.alumni ?? []).flatMap((g) => [g.track, ...g.advisors, ...g.graduates]),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

/** 검색창 — Figma 480:3105 (회색 둥근 상자 + 돋보기). 필터는 제외 */
function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="flex h-11 w-full items-center gap-2.5 rounded-full bg-[#f2f2f2] px-4 md:max-w-[420px]"
    >
      <label htmlFor="exhibition-search" className="sr-only">
        전시 검색
      </label>
      <input
        id="exhibition-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="전시 정보를 검색하세요"
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-[14px] leading-none tracking-[-0.02em] outline-none placeholder:text-black/50 [&::-webkit-search-cancel-button]:hidden"
      />
      {value ? (
        <button type="button" onClick={() => onChange("")} aria-label="검색어 지우기" className="text-[18px] leading-none">
          ×
        </button>
      ) : null}
      <img src="/icons/search.svg" alt="" width={24} height={24} className="block shrink-0" />
    </form>
  );
}

/**
 * 전시 목록 — 검색 + 목록. 모바일 Figma 452:2362 / 480:2830, PC 행은 6:1202
 * 검색어가 바뀌면 모바일 MORE 개수는 처음으로
 */
export function ExhibitionArchive({ items }: { items: Exhibition[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState({ query: "", count: PAGE });
  const deferred = useDeferredValue(query);

  const index = useMemo(() => items.map((item) => ({ item, text: searchText(item) })), [items]);
  const q = normalize(deferred);
  const results = q ? index.filter((e) => e.text.includes(q)).map((e) => e.item) : items;
  const count = page.query === q ? page.count : PAGE;

  return (
    <div className="flex flex-col gap-8 pt-10 pb-[100px] md:gap-0 md:pt-10 md:pb-0">
      {/* 제목 + 검색 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10 md:border-b md:border-line md:pb-6">
        <div className="flex flex-col gap-2 md:gap-0">
          <h1 className="font-telegraf text-[32px] leading-none tracking-[-0.03em] md:text-[40px]">Exhibition Archive</h1>
          <hr className="border-0 border-t-[0.5px] border-black md:hidden" />
        </div>
        <SearchBox value={query} onChange={setQuery} />
      </div>

      <p aria-live="polite" className="sr-only">
        {q ? `검색 결과 ${results.length}개` : ""}
      </p>

      {results.length === 0 ? (
        <p className="py-10 text-center text-[14px] text-black/60 md:py-[100px] md:text-[16px]">
          ‘{deferred.trim()}’에 맞는 전시가 없습니다.
        </p>
      ) : (
        <>
          {/* Mobile */}
          <div className="flex flex-col gap-5 md:hidden">
            <ul className="flex flex-col gap-5">
              {results.slice(0, count).map((item, i) => (
                <li key={item.year} className="border-b-[0.5px] border-line pb-5">
                  <Link href={exhibitionHref(item.year)} className="block">
                    <ExhibitionMobileCard item={item} eager={i === 0} />
                  </Link>
                </li>
              ))}
            </ul>
            {count < results.length && (
              <button
                type="button"
                onClick={() => setPage({ query: q, count: count + PAGE })}
                className="flex w-full items-center justify-center border border-black px-5 py-4 font-telegraf text-[20px] leading-none uppercase [text-box:trim-both_cap_alphabetic]"
              >
                more
              </button>
            )}
          </div>

          {/* Tablet+ */}
          <div className="hidden md:block">
            {results.map((item, i) => (
              <ExhibitionRow key={item.year} item={item} eager={i === 0} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
