import Image from "next/image";
import type { Exhibition } from "@/types/exhibition";

/** 백엔드 응답에 size 가 없을 때 쓰는 기본 포스터 크기 */
export const DEFAULT_SIZE = { width: 480, height: 680 };

/** 부제 "영문 : 국문" 에서 국문 제목만 (국문이 없으면 undefined) */
export function koreanTitle(item: Pick<Exhibition, "subtitle">) {
  const parts = item.subtitle[1].split(/\s*:\s*/);
  const ko = parts.length > 1 ? parts.slice(1).join(" : ").trim() : "";
  return /[가-힣]/.test(ko) ? ko : undefined;
}

/** "20XX 한동대학교 ○○학부 졸업 작품전" — '대학교' 뒤에서 줄바꿈 */
function ShowTitle({ text }: { text: string }) {
  const m = text.match(/^(.*?대학교)\s+(.+)$/);
  if (!m) return text;
  return (
    <>
      {m[1]}
      <br />
      {m[2]}
    </>
  );
}

/**
 * 모바일 전시 카드 — Figma 452:2362 / 6:2071. 메인 Exhibition Archive · 전시 목록 공용
 * 포스터 140×203 + 날짜 / 제목(영문) / 제목(국문) / 20XX 한동대학교 … 졸업 작품전
 */
/** eager: 첫 화면에 보이는 첫 카드 (LCP) 는 바로 불러오기 */
export function ExhibitionMobileCard({ item, eager = false }: { item: Exhibition; eager?: boolean }) {
  const ko = koreanTitle(item);
  return (
    <article className="flex gap-3">
      <div className="relative h-[203px] w-[140px] shrink-0 overflow-hidden bg-black/10">
        <Image
          src={item.image}
          alt={`${item.year} 졸업 작품전 ${item.name} 포스터`}
          fill
          sizes="140px"
          loading={eager ? "eager" : undefined}
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 font-telegraf">
        <div className="flex flex-col gap-0.5 leading-none">
          <p className="text-[13px] tracking-[-0.02em]">{item.date ?? item.year}</p>
          <h3 className="text-[28px] uppercase">{item.name}</h3>
        </div>
        {/* 국문 제목이 없는 해도 같은 높이로 빈 줄 유지 (Figma 452:2468) */}
        <div className="flex flex-col gap-[1.4em] text-[14px] leading-[1.4] tracking-[-0.02em]">
          <p>{ko ?? "\u00a0"}</p>
          <p className="text-[12px]">
            <ShowTitle text={item.subtitle[0]} />
          </p>
        </div>
      </div>
    </article>
  );
}
