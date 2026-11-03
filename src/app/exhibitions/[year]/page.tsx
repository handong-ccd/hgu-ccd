import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ExhibitionDetail } from "@/components/exhibitions/ExhibitionDetail";
import { ExhibitionPager } from "@/components/exhibitions/ExhibitionPager";
import { getExhibition, getExhibitions } from "@/lib/api/exhibitions";
import { JsonLd } from "@/components/seo/JsonLd";
import { exhibitionJsonLd, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const exhibitions = await getExhibitions();
  return exhibitions.map((e) => ({ year: String(e.year) }));
}

export async function generateMetadata({ params }: PageProps<"/exhibitions/[year]">): Promise<Metadata> {
  const { year } = await params;
  const item = await getExhibition(Number(year));
  if (!item) return {};
  const period = [item.date, item.venue].filter(Boolean).join(", ");
  return pageMetadata({
    title: `${item.name} (${item.year} 졸업 작품전)`,
    description: `${item.subtitle[0]} — ${item.subtitle[1]}${period ? ` (${period})` : ""}`,
    path: `/exhibitions/${item.year}`,
    image: item.image ? { url: item.image, alt: `${item.year} 졸업 작품전 ${item.name} 포스터` } : undefined,
  });
}

export default async function ExhibitionPage({ params }: PageProps<"/exhibitions/[year]">) {
  const { year } = await params;
  const item = /^\d{4}$/.test(year) ? await getExhibition(Number(year)) : null;
  if (!item) notFound();

  // 목록(최신순)에서 앞뒤 전시 — 이전 = 한 해 전(목록 다음 항목), 다음 = 한 해 뒤(목록 앞 항목)
  const list = await getExhibitions();
  const i = list.findIndex((e) => e.year === item.year);
  const pick = (e?: (typeof list)[number]) => (e ? { year: e.year, name: e.name } : undefined);

  return (
    <>
      <JsonLd data={exhibitionJsonLd(item)} />
      {/* 페이지 맨 위 기준점 — 링크로 들어오면 여기(0)로 스크롤 (sticky 헤더가 첫 요소면 헤더 높이만큼 내려간 채로 열림) */}
      <div id="top" />
      <Header />
      <main className="flex-1 bg-black">
        <ExhibitionDetail item={item} />
        <ExhibitionPager prev={pick(list[i + 1])} next={pick(list[i - 1])} />
      </main>
      <Footer dark />
      {/* 모바일: 화면 하단 이전/다음 바(76px)가 푸터를 가리지 않게 여백 */}
      <div aria-hidden className="h-[76px] bg-black lg:hidden" />
    </>
  );
}
