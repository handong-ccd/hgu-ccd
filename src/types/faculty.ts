/**
 * 사진 크롭 — Figma에서 이미지 레이어를 프레임보다 키우거나 옮긴 값(%)을 그대로 옮긴 것.
 * 없으면 object-cover + objectPosition 으로 채움.
 */
export type ImageCrop = { left: number; top: number; width: number; height: number };

export type Faculty = {
  nameEn: string;
  nameKo: string;
  role: string;
  /** 프로필 사진 URL — 더미는 /images/..., 백엔드 연결 후엔 서버가 주는 URL */
  image: string;
  /** [프론트 전용] 사진 위치 보정 */
  objectPosition?: string;
  /** [프론트 전용] 사진 크롭 보정 */
  crop?: ImageCrop;
  href?: string;
};
