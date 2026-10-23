import { cacheLife, cacheTag } from "next/cache";
import { EXHIBITIONS } from "@/data/exhibitions";
import type { Exhibition } from "@/types/exhibition";
import { USE_MOCK, apiGet } from "./client";

// TODO(백엔드): 엔드포인트 경로·응답 필드명 백엔드와 맞추기
export async function getExhibitions(): Promise<Exhibition[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("exhibitions");

  if (USE_MOCK) return EXHIBITIONS;
  return apiGet<Exhibition[]>("/exhibitions");
}

export async function getExhibition(year: number): Promise<Exhibition | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("exhibitions", `exhibition-${year}`);

  if (USE_MOCK) return EXHIBITIONS.find((e) => e.year === year) ?? null;
  // TODO(백엔드): 404 처리 방식 맞추기
  return apiGet<Exhibition>(`/exhibitions/${year}`).catch(() => null);
}
