export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Faculties", href: "#faculties" },
  { label: "Exhibitions", href: "#exhibitions" },
  { label: "Networks", href: "#networks" },
] as const;

// TODO: 실제 채널 주소로 교체
export const SOCIAL_LINKS = {
  youtube: "#",
  instagram: "#",
  email: "#",
  hgu: "https://www.handong.edu",
} as const;

/**
 * 커리큘럼 섹션 링크
 * - download: 파일 다운로드 (↓ 아이콘)
 * - external: 새 탭으로 열기 (↗ 아이콘, 밑줄)
 */
export const DOWNLOADS = [
  // TODO: 입학안내 책자 PDF 경로로 교체 (예: /files/admission-guide.pdf)
  { label: "입학안내 책자", href: "#", kind: "download" },
  {
    label: "커리큘럼 상세",
    href: "https://www.handong.edu/ext/bbs/pdf.dcp?doc=/dcp/editor/files/2026-2_08_CCD.pdf",
    kind: "external",
  },
] as const;

export const NETWORKS_HREF = "#";

export const ADDRESS = {
  en: "2F, Nehemiah Hall, 558 Handong-ro, Heunghae-eup, Buk-gu, Pohang-si, Gyeongsangbuk-do, Republic of Korea",
  ko: "경상북도 포항시 북구 흥해읍 한동로 558, 느헤미야홀 2층",
} as const;
