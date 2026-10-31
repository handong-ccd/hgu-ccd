/**
 * GNB — Figma 6:1202. 메인 섹션은 서브 페이지에서도 이동하도록 "/#id" 형태
 * About 은 커리큘럼 위 트랙 소개(About) 영역, Exhibition Archive 는 전체 목록 페이지
 */
export const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Curriculum", href: "/#curriculum" },
  { label: "Faculty", href: "/#faculties" },
  { label: "Exhibition Archive", href: "/exhibitions" },
] as const;

// TODO: 실제 채널 주소로 교체
export const SOCIAL_LINKS = {
  youtube: "https://www.youtube.com/channel/UCVdPrSGA4SpK6hoLPzjQg0Q",
  instagram: "https://www.instagram.com/design_hgu/",
  email: "#",
  hgu: "https://www.handong.edu",
  // 학교 공식 채널 — 한동대 영문 홈페이지(handong.edu/eng) 하단 링크 기준
  hguAdmissions: "https://admissions.handong.edu",
  hguInstagram: "https://www.instagram.com/handongglobaluniversity/",
  hguYoutube: "https://www.youtube.com/@HandongGlobalUniversity",
} as const;

/** 푸터 Related Links — Figma 6:639 / 393:1279 (모두 새 탭) */
export const RELATED_LINKS = [
  { label: "HGU Official", href: SOCIAL_LINKS.hgu },
  { label: "HGU Admissions", href: SOCIAL_LINKS.hguAdmissions },
  { label: "HGU Instagram", href: SOCIAL_LINKS.hguInstagram },
  { label: "HGU YouTube", href: SOCIAL_LINKS.hguYoutube },
] as const;

/**
 * 커리큘럼 섹션 링크 — 둘 다 새 탭으로 열림 (href 가 "#" 이면 비활성)
 * - download: ↓ 아이콘 (PDF 파일)
 * - external: ↗ 아이콘, 밑줄
 */
export const DOWNLOADS = [
  // TODO: 입학안내 책자 PDF 경로로 교체 (예: /files/admission-guide.pdf)
  { label: "입학안내 책자", href: "#", kind: "download" },
  {
    label: "커리큘럼 상세",
    // 학교 홈페이지 교육과정 PDF (Figma 6:385 링크)
    href: "https://www.handong.edu/ext/bbs/pdf.dcp?doc=/dcp/editor/files/2026-2_08_CCD.pdf",
    kind: "external",
  },
] as const;

export const NETWORKS_HREF = "/networks";

/**
 * 네트웍스 페이지 링크 허브 — Figma 6:817
 * TODO: 주소가 "#" 인 항목은 실제 링크 받으면 교체
 */
export const NETWORK_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Official",
    links: [
      { label: "CCD Instagram", href: SOCIAL_LINKS.instagram },
      { label: "CCD YouTube", href: SOCIAL_LINKS.youtube },
      { label: "Contact CCD", href: SOCIAL_LINKS.email },
    ],
  },
  {
    title: "Archive",
    links: [
      { label: "Graduation Exhibition", href: "/exhibitions" },
      { label: "Seoul Design Festival", href: "#" },
      { label: "Student Projects", href: "#" },
      { label: "Regional Collaboration", href: "#" },
    ],
  },
  {
    title: "About the School",
    links: [
      { label: "HGU Official", href: SOCIAL_LINKS.hgu },
      { label: "HGU Admissions", href: SOCIAL_LINKS.hguAdmissions },
      { label: "HGU Alumni", href: "#" },
      { label: "HGU Instagram", href: SOCIAL_LINKS.hguInstagram },
      { label: "HGU YouTube", href: SOCIAL_LINKS.hguYoutube },
    ],
  },
];

export const ADDRESS = {
  en: "2F, Nehemiah Hall, 558 Handong-ro, Heunghae-eup, Buk-gu, Pohang-si, Gyeongsangbuk-do, Republic of Korea",
  ko: "경상북도 포항시 북구 흥해읍 한동로 558, 느헤미야홀 2층",
} as const;
