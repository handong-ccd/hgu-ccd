import { cacheLife, cacheTag } from "next/cache";
import { TRACKS } from "@/data/curriculum";
import type { Track } from "@/types/curriculum";
import { USE_MOCK, apiGet } from "./client";

// TODO(백엔드): 엔드포인트 경로·응답 필드명 백엔드와 맞추기
export async function getTracks(): Promise<Track[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("curriculum");

  if (USE_MOCK) return TRACKS;
  return apiGet<Track[]>("/curriculum");
}
