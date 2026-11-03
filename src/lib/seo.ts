/**
 * SEO · GEO 공통 — 사이트 주소, 페이지 메타데이터, JSON-LD(구조화 데이터)
 *
 * 기준 도메인: SITE_URL 환경변수 → Vercel 프로덕션 주소 → https://ccd.handong.edu 순
 * (canonical · sitemap · robots · OG 이미지 절대 주소가 모두 이 값을 씀)
 */
import type { Metadata } from "next";
import { ADDRESS, SOCIAL_LINKS } from "@/data/site";
import type { Track } from "@/types/curriculum";
import type { Exhibition } from "@/types/exhibition";
import type { Faculty } from "@/types/faculty";

export const SITE_URL = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://ccd.handong.edu")
).replace(/\/+$/, "");

export const SITE_NAME = "한동대학교 콘텐츠융합디자인학부";
export const SITE_NAME_EN = "School of Content Convergence Design, Handong Global University";
export const SITE_TITLE = "콘텐츠융합디자인학부 | 한동대학교";
export const SITE_DESCRIPTION =
  "한동대학교 콘텐츠융합디자인학부는 국제적 감각과 창의적 문제 해결 능력을 갖춘 크리스천 디자인 리더를 양성합니다.";
export const SITE_KEYWORDS = [
  "한동대학교",
  "한동대",
  "콘텐츠융합디자인학부",
  "콘디",
  "HGU CCD",
  "Handong Global University",
  "Content Convergence Design",
  "시각디자인",
  "제품디자인",
  "UX/UI 디자인",
  "디자인 학부",
  "졸업 작품전",
  "디그리",
];

/** 루트 OG 이미지 (app/opengraph-image.png) — 하위 페이지가 openGraph 를 덮어써도 유지되게 명시 */
const OG_IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630, alt: SITE_TITLE };

/** "시각디자인" → "시각디자인 트랙", "융합교과목" 은 트랙이 아니라 그대로 */
export function trackLabel(track: Track) {
  return track.name.endsWith("교과목") ? track.name : `${track.name} 트랙`;
}

/** 상대 경로(/images/...)를 절대 주소로. 이미 절대 주소면 그대로 */
export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * 하위 페이지 메타데이터 — title 은 layout 템플릿으로 "제목 | 한동대학교 콘텐츠융합디자인학부" 가 됨
 * Next 는 openGraph 를 통째로 덮어쓰므로 공통 값을 매번 다시 채움
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  /** 페이지 대표 이미지 (전시 포스터 등). 없으면 사이트 OG 이미지 */
  image?: { url: string; alt: string };
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const images = image ? [{ url: image.url, alt: image.alt }] : [OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE_TITLE,
      url: path,
      title: fullTitle,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
  };
}

/* ───────── JSON-LD ───────── */

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const HGU_ID = "https://www.handong.edu/#organization";

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "한동로 558, 느헤미야홀 2층",
  addressLocality: "포항시 북구 흥해읍",
  addressRegion: "경상북도",
  postalCode: "37554",
  addressCountry: "KR",
};

/** 교내 전시 장소용 — 건물은 전시마다 달라서 캠퍼스 주소까지만 */
const CAMPUS_ADDRESS = { ...POSTAL_ADDRESS, streetAddress: "한동로 558 (한동대학교)" };

/** 학부(조직) + 웹사이트 — 모든 페이지 공통 (layout) */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        "@id": HGU_ID,
        name: "한동대학교",
        alternateName: ["Handong Global University", "HGU", "한동대"],
        url: SOCIAL_LINKS.hgu,
        sameAs: [SOCIAL_LINKS.hguInstagram, SOCIAL_LINKS.hguYoutube],
      },
      {
        "@type": "EducationalOrganization",
        "@id": ORG_ID,
        name: SITE_NAME,
        alternateName: [SITE_NAME_EN, "HGU CCD", "콘텐츠융합디자인학부", "콘디"],
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        logo: absoluteUrl("/apple-icon.png"),
        image: absoluteUrl("/opengraph-image.png"),
        parentOrganization: { "@id": HGU_ID },
        address: POSTAL_ADDRESS,
        location: { "@type": "Place", name: ADDRESS.ko, address: POSTAL_ADDRESS },
        sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.youtube],
        knowsAbout: ["시각디자인", "제품디자인", "브랜드경험디자인", "UX/UI 디자인", "서비스디자인", "모빌리티디자인"],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_TITLE,
        alternateName: ["HGU CCD", SITE_NAME_EN],
        description: SITE_DESCRIPTION,
        inLanguage: "ko-KR",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** 메인 — 트랙(교육과정) + 교수진 */
export function homeJsonLd(tracks: Track[], faculty: Faculty[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...tracks.map((track) => ({
        "@type": "EducationalOccupationalProgram",
        "@id": `${SITE_URL}/#track-${encodeURIComponent(track.name)}`,
        name: trackLabel(track),
        description: track.summary || undefined,
        provider: { "@id": ORG_ID },
        educationalProgramMode: "full-time",
        inLanguage: ["ko", "en"],
        url: `${SITE_URL}/#curriculum`,
        hasCourse: track.columns
          .flat()
          .flatMap((group) => group.courses)
          .map((name) => ({ "@type": "Course", name, provider: { "@id": ORG_ID } })),
      })),
      ...faculty.map((person) => facultyJsonLd(person)),
    ],
  };
}

function facultyJsonLd(person: Faculty) {
  const d = person.detail;
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#faculty-${person.slug}`,
    name: person.nameKo,
    alternateName: person.nameEn,
    jobTitle: person.position,
    description: d?.intro,
    image: person.image ? absoluteUrl(person.image) : undefined,
    email: d?.contact?.email ? `mailto:${d.contact.email}` : undefined,
    knowsAbout: d?.researchInterest,
    alumniOf: person.education,
    worksFor: { "@id": ORG_ID },
    url: `${SITE_URL}/#faculty-${person.slug}`,
  };
}

/** "2026.11.4—11.15" / "2018.10.17—2019.1.2" → ISO 날짜 */
export function parseExhibitionPeriod(date?: string) {
  const m = date?.match(/^(\d{4})\.(\d{1,2})\.(\d{1,2})(?:\s*[—–-]\s*(?:(\d{4})\.)?(\d{1,2})\.(\d{1,2}))?$/);
  if (!m) return {};
  const iso = (y: string, mo: string, d: string) => `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  const startDate = iso(m[1], m[2], m[3]);
  const endDate = m[5] ? iso(m[4] ?? m[1], m[5], m[6]) : startDate;
  return { startDate, endDate };
}

function exhibitionUrl(year: number) {
  return `${SITE_URL}/exhibitions/${year}`;
}

function exhibitionEventJsonLd(item: Exhibition) {
  const { startDate, endDate } = parseExhibitionPeriod(item.date);
  // 교내 전시(HGU)는 학교 주소, 외부 갤러리는 장소 이름만
  const onCampus = item.venue && /HGU|한동/.test(item.venue);
  return {
    "@type": "ExhibitionEvent",
    "@id": `${exhibitionUrl(item.year)}#event`,
    name: `${item.year} ${item.name}`,
    alternateName: item.subtitle,
    description: item.body.map((b) => b.text).join("\n\n") || item.subtitle.join(" — "),
    url: exhibitionUrl(item.year),
    image: item.image ? absoluteUrl(item.image) : undefined,
    startDate,
    endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: item.venue
      ? { "@type": "Place", name: item.venue, ...(onCampus && { address: CAMPUS_ADDRESS }) }
      : undefined,
    organizer: { "@id": ORG_ID },
    ...(item.archiveUrl && { sameAs: item.archiveUrl }),
  };
}

type Crumb = { name: string; path: string };

function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** 전시 전체 목록 */
export function exhibitionsJsonLd(items: Exhibition[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/exhibitions`,
        url: `${SITE_URL}/exhibitions`,
        name: `Exhibition Archive | ${SITE_NAME}`,
        description: `${SITE_NAME} 역대 졸업 작품전 아카이브`,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: exhibitionUrl(item.year),
            name: `${item.year} ${item.name}`,
          })),
        },
      },
      breadcrumbJsonLd([{ name: "Exhibition Archive", path: "/exhibitions" }]),
    ],
  };
}

/** 전시 상세 */
export function exhibitionJsonLd(item: Exhibition) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      exhibitionEventJsonLd(item),
      breadcrumbJsonLd([
        { name: "Exhibition Archive", path: "/exhibitions" },
        { name: `${item.year} ${item.name}`, path: `/exhibitions/${item.year}` },
      ]),
    ],
  };
}

/** 네트웍스 */
export function networksJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [breadcrumbJsonLd([{ name: "Networks", path: "/networks" }])],
  };
}
