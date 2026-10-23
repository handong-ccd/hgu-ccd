import { cacheLife, cacheTag } from "next/cache";
import { BANNER_VIDEOS } from "@/data/banner";
import type { BannerVideo } from "@/types/banner";
import { USE_MOCK, apiGet } from "./client";

// TODO(백엔드): 엔드포인트 경로·응답 필드명 백엔드와 맞추기
export async function getBannerVideos(): Promise<BannerVideo[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("banner");

  if (USE_MOCK) return BANNER_VIDEOS;
  return apiGet<BannerVideo[]>("/banner");
}
