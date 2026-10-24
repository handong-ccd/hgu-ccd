import type { Metadata } from "next";
import "@fontsource/nanum-myeongjo/400.css";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "HGU CCD | 한동대학교 콘텐츠융합디자인학부",
  description:
    "한동대학교 콘텐츠융합디자인학부는 국제적 감각과 창의적 문제 해결 능력을 갖춘 크리스천 디자인 리더를 양성합니다.",
};

/**
 * 1280~1919px 화면에서는 1920 시안을 화면 너비에 맞춰 비율 그대로 축소 (html zoom).
 * 첫 화면이 그려지기 전에 적용되도록 <head> 에서 바로 실행.
 * 1920px 이상은 여백만 늘어나고, 1280px 미만은 반응형 레이아웃 그대로.
 */
const FIT_DESIGN_SCRIPT = `(function(){
  var MIN = 1280, DESIGN = 1920, d = document.documentElement;
  function fit(){
    var w = window.innerWidth;
    d.style.removeProperty("zoom"); // zoom 이 걸린 상태의 clientWidth 는 축소 전 값이 아니므로 먼저 해제
    if (w >= MIN && w < DESIGN) d.style.zoom = String(d.clientWidth / DESIGN);
  }
  fit();
  window.addEventListener("resize", fit);
  document.addEventListener("DOMContentLoaded", fit);
  window.addEventListener("load", fit);
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // 스크립트가 html style(zoom)을 바꾸므로 hydration 경고 무시
    <html lang="ko" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FIT_DESIGN_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
