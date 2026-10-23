export type Faculty = {
  /** URL·이미지 파일명에 쓰는 고유 키 (예: lee-joongsup) */
  slug: string;
  nameEn: string;
  nameKo: string;
  /** 직함 — 카드에 "국문명, 직함" 으로 표시. 없으면 국문명만 */
  position?: string;
  /** 대표 학력/경력 한 줄 */
  education: string;
  /** 프로필 사진 URL — 더미는 /images/..., 백엔드 연결 후엔 서버가 주는 URL */
  image: string;
  /** [프론트 전용] 사진 위치 보정 (object-position) */
  objectPosition?: string;
};
