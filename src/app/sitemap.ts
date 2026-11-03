import type { MetadataRoute } from "next";
import { getExhibitions } from "@/lib/api/exhibitions";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

/** /sitemap.xml — 검색엔진에 제출하는 페이지 목록 (전시 연도 페이지는 데이터에서 자동 생성) */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const exhibitions = await getExhibitions();
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1, images: [absoluteUrl("/opengraph-image.png")] },
    { url: `${SITE_URL}/exhibitions`, changeFrequency: "monthly", priority: 0.8 },
    ...exhibitions.map((e) => ({
      url: `${SITE_URL}/exhibitions/${e.year}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      ...(e.image && { images: [absoluteUrl(e.image)] }),
    })),
    { url: `${SITE_URL}/networks`, changeFrequency: "yearly", priority: 0.4 },
  ];
}
