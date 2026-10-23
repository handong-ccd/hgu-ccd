import { cacheLife, cacheTag } from "next/cache";
import { FACULTY } from "@/data/faculty";
import type { Faculty } from "@/types/faculty";
import { USE_MOCK, apiGet } from "./client";

// TODO(백엔드): 엔드포인트 경로·응답 필드명 백엔드와 맞추기
export async function getFaculty(): Promise<Faculty[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("faculty");

  if (USE_MOCK) return FACULTY;
  return apiGet<Faculty[]>("/faculty");
}
