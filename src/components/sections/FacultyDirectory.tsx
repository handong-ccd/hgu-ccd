"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Faculty } from "@/types/faculty";
import { FacultyModal } from "./FacultyModal";

const SIZES = "(min-width: 1280px) 376px, (min-width: 768px) 33vw, 50vw";
const HASH_PREFIX = "#faculty-";

function FacultyCard({ person, onOpen }: { person: Faculty; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex w-full flex-col gap-2 text-left md:gap-4"
    >
      <span className="relative block aspect-[1122/1402] w-full overflow-hidden bg-neutral-100">
        <Image
          src={person.image}
          alt=""
          fill
          sizes={SIZES}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ objectPosition: person.objectPosition ?? "center" }}
        />
      </span>
      <span className="flex flex-col gap-2 leading-[1.2]">
        <span className="flex flex-col gap-1">
          <span className="font-telegraf text-[16px] leading-[1.06] md:text-[24px]">{person.nameEn}</span>
          <span className="text-[14px] font-medium md:text-[20px]">
            {person.position ? `${person.nameKo}, ${person.position}` : person.nameKo}
          </span>
        </span>
        <span className="text-[12px] font-medium md:text-[16px]">{person.education}</span>
      </span>
    </button>
  );
}

/** 교수진 그리드 + 상세 모달. 열린 교수는 URL 해시(#faculty-slug)로 공유 가능 */
export function FacultyDirectory({ faculty }: { faculty: Faculty[] }) {
  const [slug, setSlug] = useState<string | null>(null);
  const selected = faculty.find((f) => f.slug === slug) ?? null;

  const open = useCallback((next: string) => {
    setSlug(next);
    history.replaceState(null, "", `${HASH_PREFIX}${next}`);
  }, []);

  const close = useCallback(() => {
    setSlug(null);
    if (location.hash.startsWith(HASH_PREFIX)) history.replaceState(null, "", "#faculties");
  }, []);

  // 해시로 들어온 경우 바로 열기
  useEffect(() => {
    const fromHash = () => {
      const h = location.hash;
      if (h.startsWith(HASH_PREFIX)) setSlug(decodeURIComponent(h.slice(HASH_PREFIX.length)));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <>
      <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-8 md:mt-6 md:grid-cols-3 md:gap-x-6 md:gap-y-10 2xl:grid-cols-4">
        {faculty.map((person) => (
          <li key={person.slug}>
            <FacultyCard person={person} onOpen={() => open(person.slug)} />
          </li>
        ))}
      </ul>
      <FacultyModal person={selected} onClose={close} />
    </>
  );
}
