import { ADDRESS, NETWORK_GROUPS, SOCIAL_LINKS } from "@/data/site";
import { getTracks } from "@/lib/api/curriculum";
import { getExhibitions } from "@/lib/api/exhibitions";
import { getFaculty } from "@/lib/api/faculty";
import { SITE_DESCRIPTION, SITE_NAME, SITE_NAME_EN, SITE_URL, trackLabel } from "@/lib/seo";

/**
 * /llms.txt — AI 검색·챗봇이 사이트 핵심 정보를 한 번에 읽을 수 있게 마크다운으로 요약 (llmstxt.org 형식)
 * 트랙·교수진·전시는 화면과 같은 데이터(API/더미)에서 생성
 */
export async function GET() {
  const [tracks, faculty, exhibitions] = await Promise.all([getTracks(), getFaculty(), getExhibitions()]);

  const lines: string[] = [
    `# ${SITE_NAME} (${SITE_NAME_EN})`,
    "",
    `> ${SITE_DESCRIPTION} 졸업생들은 방송, 디자인, 뉴미디어, 광고, 영상 제작 등 다양한 분야로 진출하며, 학부는 디자인 연구와 국제 교류를 통해 학생들의 성장을 지원합니다.`,
    "",
    "The School of Content Convergence Design at Handong Global University (HGU CCD) cultivates Christian design leaders with global perspectives, interdisciplinary expertise, and creative problem-solving skills. The school offers two tracks: Visual Communication Design and Product Design.",
    "",
    `- 공식 사이트: ${SITE_URL}`,
    `- 소속: 한동대학교 (Handong Global University, ${SOCIAL_LINKS.hgu})`,
    `- 주소: ${ADDRESS.ko} (${ADDRESS.en})`,
    `- Instagram: ${SOCIAL_LINKS.instagram}`,
    `- YouTube: ${SOCIAL_LINKS.youtube}`,
    "",
    "## 트랙 및 교육과정 (Tracks & Curriculum)",
    "",
  ];

  for (const track of tracks) {
    lines.push(`### ${trackLabel(track)}`, "");
    if (track.summary) lines.push(track.summary, "");
    for (const group of track.columns.flat()) {
      if (group.courses.length) lines.push(`- ${group.label}: ${group.courses.join(", ")}`);
    }
    lines.push("");
  }
  lines.push(`- 교육과정 상세: ${SITE_URL}/#curriculum`, "");

  lines.push("## 교수진 (Faculty)", "");
  for (const p of faculty) {
    const d = p.detail;
    const parts = [
      `${p.nameKo} (${p.nameEn})${p.position ? ` — ${p.position}` : ""}`,
      p.education,
      d?.researchInterest && `연구 분야: ${d.researchInterest}`,
      d?.contact?.email && `이메일: ${d.contact.email}`,
    ].filter(Boolean);
    lines.push(`- ${parts.join(" · ")}`);
  }
  lines.push("");

  lines.push("## 졸업 작품전 (Graduation Exhibitions)", "");
  for (const e of exhibitions) {
    const meta = [e.date, e.venue].filter(Boolean).join(", ");
    lines.push(`- [${e.year} ${e.name}](${SITE_URL}/exhibitions/${e.year}): ${e.subtitle.join(" — ")}${meta ? ` (${meta})` : ""}`);
  }
  lines.push(`- 전체 아카이브: ${SITE_URL}/exhibitions`, "");

  lines.push("## 관련 링크 (Links)", "");
  const seen = new Set<string>();
  for (const group of NETWORK_GROUPS) {
    for (const link of group.links) {
      if (link.href === "#" || seen.has(link.href)) continue;
      seen.add(link.href);
      lines.push(`- [${link.label}](${link.href.startsWith("/") ? SITE_URL + link.href : link.href})`);
    }
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
