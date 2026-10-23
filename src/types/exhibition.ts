export type Exhibition = {
  year: number;
  name: string;
  date: string;
  venue: string;
  /** 부제 2줄 (Helvetica Neue Medium) */
  subtitle: [string, string];
  /** 주제 성경 구절 (모바일 카드에 표시) */
  verse?: { ref: string; text: string };
  /** 본문. emphasis = Pretendard Medium (성경 구절 등) */
  body: { text: string; emphasis?: boolean }[];
  /** 포스터 이미지 URL — 더미는 /images/..., 백엔드 연결 후엔 서버가 주는 URL */
  image: string;
  /**
   * [프론트 전용] 데스크톱 가로 스크롤 이미지 크기(px) — Figma 시안 값.
   * 백엔드 응답에 없으면 기본 크기로 표시됨.
   */
  size?: { width: number; height: number };
  /** [프론트 전용] 날짜와 장소를 줄바꿈으로 분리 (2016 시안) */
  venueOnNewLine?: boolean;
};
