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
