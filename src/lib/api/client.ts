/**
 * 데이터 소스 스위치
 * - API_BASE_URL 이 없거나 USE_MOCK=true 면 src/data 의 더미 데이터 사용
 * - 백엔드 붙으면 .env.local 에 API_BASE_URL 넣고 USE_MOCK=false
 * (서버 컴포넌트에서만 호출하므로 NEXT_PUBLIC_ 접두사 불필요)
 */
export const USE_MOCK = process.env.USE_MOCK !== "false" || !process.env.API_BASE_URL;

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${process.env.API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API ${path} 요청 실패: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}
