import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { ExhibitionListMobile } from "@/components/exhibitions/ExhibitionListMobile";
import { ExhibitionRow } from "@/components/exhibitions/ExhibitionRow";
import { getExhibitions } from "@/lib/api/exhibitions";

export const metadata: Metadata = {
  title: "Exhibition Archive | HGU CCD",
  description: "한동대학교 콘텐츠융합디자인학부 졸업 작품전 아카이브",
};

/** 전체 전시 목록 — Figma PC 6:1202 (포스터 오른쪽 고정) / 모바일 카드 6:2071 */
export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions();

  return (
    <>
      <Header tone="light" />
      <main className="flex-1">
        <Container>
          {/* Mobile */}
          <div className="flex flex-col gap-5 pt-10 pb-10 md:hidden">
            <div className="flex flex-col gap-3 border-b border-line pb-0">
              <h1 className="font-telegraf text-[34px] leading-none tracking-[-0.03em]">Exhibition Archive</h1>
              <p className="pb-3 text-[16px] leading-none tracking-[-0.03em]">한동대학교 콘텐츠융합디자인학부 졸업 작품전</p>
            </div>
            <ExhibitionListMobile items={exhibitions} />
          </div>

          {/* Tablet+ */}
          <div className="hidden md:block">
            <h1 className="sr-only">Exhibition Archive — 한동대학교 콘텐츠융합디자인학부 졸업 작품전</h1>
            {exhibitions.map((item) => (
              <ExhibitionRow key={item.year} item={item} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
