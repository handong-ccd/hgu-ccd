import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ExhibitionDetail } from "@/components/exhibitions/ExhibitionDetail";
import { ExhibitionPager } from "@/components/exhibitions/ExhibitionPager";
import { getExhibition, getExhibitions } from "@/lib/api/exhibitions";

export async function generateStaticParams() {
  const exhibitions = await getExhibitions();
  return exhibitions.map((e) => ({ year: String(e.year) }));
}

export async function generateMetadata({ params }: PageProps<"/exhibitions/[year]">): Promise<Metadata> {
  const { year } = await params;
  const item = await getExhibition(Number(year));
  if (!item) return {};
  return {
    title: `${item.name} (${item.year}) | HGU CCD`,
    description: `${item.subtitle[0]} — ${item.subtitle[1]}`,
  };
}

export default async function ExhibitionPage({ params }: PageProps<"/exhibitions/[year]">) {
  const { year } = await params;
  const item = /^\d{4}$/.test(year) ? await getExhibition(Number(year)) : null;
  if (!item) notFound();

  // 목록(최신순)에서 앞뒤 전시 — 좌우 플로팅 버튼
  const list = await getExhibitions();
  const i = list.findIndex((e) => e.year === item.year);
  const pick = (e?: (typeof list)[number]) => (e ? { year: e.year, name: e.name } : undefined);

  return (
    <>
      {/* 페이지 맨 위 기준점 — 링크로 들어오면 여기(0)로 스크롤 (sticky 헤더가 첫 요소면 헤더 높이만큼 내려간 채로 열림) */}
      <div id="top" />
      <Header />
      <main className="flex-1 bg-black">
        <ExhibitionDetail item={item} />
        <ExhibitionPager prev={pick(list[i - 1])} next={pick(list[i + 1])} />
      </main>
      <Footer dark />
      {/* 모바일: 화면 아래 떠 있는 좌우 버튼이 푸터를 가리지 않게 여백 */}
      {/* (버튼 54px + 아래 16px + 여유 16px) */}
      <div aria-hidden className="h-[86px] bg-black lg:hidden" />
    </>
  );
}
