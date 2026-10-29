import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { GoTopButton } from "@/components/ui/GoTopButton";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { ExhibitionArchive } from "@/components/exhibitions/ExhibitionArchive";
import { getExhibitions } from "@/lib/api/exhibitions";

export const metadata: Metadata = {
  title: "Exhibition Archive | HGU CCD",
  description: "한동대학교 콘텐츠융합디자인학부 졸업 작품전 아카이브",
};

/** 전체 전시 목록 + 검색 — Figma PC 6:1202 / 모바일 452:2362 · 480:2830 (필터 제외) */
export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions();

  return (
    <>
      {/* 페이지 맨 위 기준점 — 링크로 들어오면 여기(0)로 스크롤 (sticky 헤더가 첫 요소면 헤더 높이만큼 내려간 채로 열림) */}
      <div id="top" />
      <Header tone="light" />
      <main className="flex-1">
        <Container>
          <ExhibitionArchive items={exhibitions} />
        </Container>
      </main>
      <GoTopButton />
      <Footer />
    </>
  );
}
