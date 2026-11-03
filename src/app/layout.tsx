import type { Metadata } from "next";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "@fontsource/nanum-myeongjo/400.css";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL, siteJsonLd } from "@/lib/seo";

/**
 * 공유 미리보기(OG) — 이미지는 app/opengraph-image.png (Figma 337:8027, 1200×630),
 * 파비콘은 app/favicon.ico(16·32·48) · icon.png(64) · apple-icon.png(180) (Figma 337:7897 등)
 * 기준 도메인·공통 문구는 lib/seo.ts (SITE_URL 환경변수 → Vercel 주소 → ccd.handong.edu)
 * 검색 서비스 소유권 확인: GOOGLE_SITE_VERIFICATION · NAVER_SITE_VERIFICATION 환경변수 (값만, 따옴표 없이)
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_TITLE,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: "한동대학교",
  category: "education",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_TITLE,
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION && { google: process.env.GOOGLE_SITE_VERIFICATION }),
    ...(process.env.NAVER_SITE_VERIFICATION && {
      other: { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION },
    }),
  },
  formatDetection: { telephone: false, email: false, address: false },
};

/**
 * 1280~1919px 화면에서는 1920 시안을 화면 너비에 맞춰 비율 그대로 축소.
 * <html> 에 zoom 을 걸면 일부 Chrome 에서 미디어 쿼리까지 축소된 너비로 계산돼서
 * 2xl 스타일이 빠지므로, <head> 에서는 CSS 변수(--page-zoom)만 정하고 zoom 은 <body> 에 건다 (globals.css).
 * 1920px 이상은 여백만 늘어나고, 1280px 미만은 반응형 레이아웃 그대로.
 */
const FIT_DESIGN_SCRIPT = `(function(){
  var MIN = 1280, DESIGN = 1920, d = document.documentElement;
  function fit(){
    var w = window.innerWidth;
    if (w >= MIN && w < DESIGN) d.style.setProperty("--page-zoom", String(d.clientWidth / DESIGN));
    else d.style.removeProperty("--page-zoom");
  }
  fit();
  window.addEventListener("resize", fit);
  document.addEventListener("DOMContentLoaded", fit);
  window.addEventListener("load", fit);
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // 스크립트가 html style(--page-zoom)을 바꾸므로 hydration 경고 무시
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FIT_DESIGN_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        {/* 휠 스크롤을 부드럽게 (Lenis) — 동작 줄이기 설정이면 꺼짐 */}
        <SmoothScroll />
        <JsonLd data={siteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
