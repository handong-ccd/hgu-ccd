import type { Metadata } from "next";
import "@fontsource/nanum-myeongjo/400.css";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "HGU CCD | 한동대학교 콘텐츠융합디자인학부",
  description:
    "한동대학교 콘텐츠융합디자인학부는 국제적 감각과 창의적 문제 해결 능력을 갖춘 크리스천 디자인 리더를 양성합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
