import { Footer } from "@/components/layout/Footer";
import { GoTopButton } from "@/components/ui/GoTopButton";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { IntroScene } from "@/components/motion/IntroScene";
import { Curriculum, TrackAbout } from "@/components/sections/Curriculum";
import { Exhibition } from "@/components/sections/Exhibition";
import { Faculties } from "@/components/sections/Faculties";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { JsonLd } from "@/components/seo/JsonLd";
import { getTracks } from "@/lib/api/curriculum";
import { getFaculty } from "@/lib/api/faculty";
import { homeJsonLd } from "@/lib/seo";

export default async function Home() {
  // 구조화 데이터용 — 섹션과 같은 캐시를 써서 요청이 늘지 않음
  const [tracks, faculty] = await Promise.all([getTracks(), getFaculty()]);

  return (
    <>
      <JsonLd data={homeJsonLd(tracks, faculty)} />
      <div id="top" />
      <Header />
      <main className="flex-1">
        {/* 배너+소개는 스크롤보다 느리게 움직이고, 아래 흰 영역이 위로 덮으며 올라옴 */}
        <IntroScene>
          <Hero />
          <Intro />
        </IntroScene>
        <div className="relative z-[1] bg-white">
          <Container className="flex flex-col gap-20 py-10 md:gap-[100px] md:pt-[60px] md:pb-[100px]">
            {/* About → Curriculum: Mo 48px / PC 100px (Figma 6:2108 / 6:364) */}
            <div className="flex flex-col gap-12 md:gap-[100px]">
              <TrackAbout />
              <Curriculum />
            </div>
            <Faculties />
          </Container>
          <Container className="pt-10 pb-10 md:pt-0 md:pb-[100px]">
            <Exhibition />
          </Container>
        </div>
      </main>
      <GoTopButton />
      <Footer />
    </>
  );
}
