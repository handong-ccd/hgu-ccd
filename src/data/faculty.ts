// 더미 데이터 — USE_MOCK 모드에서 src/lib/api 가 반환. 백엔드 연결 후엔 참고용.
// 사진: 드라이브 '교수진 사진/정리본' (3:4, 1200×1600으로 리사이즈)
import type { Faculty } from "@/types/faculty";

export const FACULTY: Faculty[] = [
  { nameEn: "Joongsup Lee", nameKo: "이중섭", role: "교수, 시각디자인", image: "/images/faculty/lee-joongsup.jpg" },
  { nameEn: "Chansong Park", nameKo: "박찬송", role: "교수, 제품디자인", image: "/images/faculty/park-chansong.jpg" },
  { nameEn: "Eunjong Lee", nameKo: "이은종", role: "교수, 제품디자인", image: "/images/faculty/lee-eunjong.jpg" },
  { nameEn: "Jaesun Yi", nameKo: "이재선", role: "교수, 시각디자인", image: "/images/faculty/yi-jaesun.jpg" },
  { nameEn: "Joohyun Lee", nameKo: "이주현", role: "교수, 시각디자인", image: "/images/faculty/lee-joohyun.jpg" },
  { nameEn: "Jingu Lee", nameKo: "이진구", role: "명예교수, 시각디자인", image: "/images/faculty/lee-jingu.jpg" },
  { nameEn: "Wonchol Cho", nameKo: "조원철", role: "명예교수, 제품디자인", image: "/images/faculty/cho-wonchol.jpg" },
  { nameEn: "Youngmin Ju", nameKo: "주영민", role: "교수, 시각디자인", image: "/images/faculty/ju-youngmin.jpg" },
  { nameEn: "Inwook Choi", nameKo: "최인욱", role: "교수, 제품디자인", image: "/images/faculty/choi-inwook.jpg" },
  { nameEn: "Yunsang Pyeon", nameKo: "편윤생", role: "강사, 시각디자인", image: "/images/faculty/pyeon-yunsang.jpg" },
  { nameEn: "Yena Park", nameKo: "박예나", role: "강사, 시각디자인", image: "/images/faculty/park-yena.jpg" },
  { nameEn: "Jangho Park", nameKo: "박장호", role: "강사, 시각디자인", image: "/images/faculty/park-jangho.jpg" },
  { nameEn: "Sungchan Son", nameKo: "손성찬", role: "강사, 시각디자인", image: "/images/faculty/son-sungchan.jpg" },
  { nameEn: "Youngsuk Lee", nameKo: "이용석", role: "강사, 제품디자인", image: "/images/faculty/lee-youngsuk.jpg" },
  { nameEn: "Junghoon Lee", nameKo: "이정훈", role: "강사, 제품디자인", image: "/images/faculty/lee-junghoon.jpg" },
  { nameEn: "Hye Hwang", nameKo: "황혜", role: "강사, 제품디자인", image: "/images/faculty/hwang-hye.jpg" },
  // TODO: 아래 교수님들 사진은 public/images/faculty 에 있음 — 영문 이름·직함 확인 후 추가
  // 김온유(kim-onyu) 김형수(kim-hyungsoo) 송예은(song-yeeun) 신원석(shin-wonseok) 장인희(jang-inhee)
  // 장형규(jang-hyunggyu) 정경일(jung-kyungil) 최찬구(choi-changu) 홍승표(hong-seungpyo)
];
