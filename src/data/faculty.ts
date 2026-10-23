// 더미 데이터 — USE_MOCK 모드에서 src/lib/api 가 반환. 백엔드 연결 후엔 참고용.
// 순서·직함·학력: Figma 메인(6:485) 기준 / 사진: 드라이브 '교수진 사진/정리본' (최수신 교수님은 Figma 원본)
import type { Faculty } from "@/types/faculty";

export const FACULTY: Faculty[] = [
  {
    slug: "lee-joongsup", nameEn: "Joongsup Lee", nameKo: "이중섭", position: "부교수 / 학부장",
    education: "Graphic Design M.F.A., Iowa State Univ., IA, US.",
    image: "/images/faculty/lee-joongsup.jpg",
  },
  {
    slug: "park-chansong", nameEn: "Chansong Park", nameKo: "박찬송", position: "조교수",
    education: "Transportation Design M.F.A., Umeå Inst. of Design, Sweden",
    image: "/images/faculty/park-chansong.jpg",
  },
  {
    slug: "lee-eunjong", nameEn: "Eunjong Lee", nameKo: "이은종", position: "교수 / 디자인연구소장",
    education: "한국과학기술원, 산업디자인, Ph.D. 수료",
    image: "/images/faculty/lee-eunjong.jpg",
  },
  {
    slug: "yi-jaesun", nameEn: "Jaesun Yi", nameKo: "이재선", position: "교수",
    education: "Communication Design, M.S., Pratt Institute, NY, US",
    image: "/images/faculty/yi-jaesun.jpg",
  },
  {
    slug: "choi-inwook", nameEn: "Inwook Choi", nameKo: "최인욱", position: "교수/ HUSS 사업단장",
    education: "Computer Graphic, M.A., Rochester Ins. of Tech., NY, US.",
    image: "/images/faculty/choi-inwook.jpg",
  },
  {
    slug: "ju-youngmin", nameEn: "Youngmin Ju", nameKo: "주영민", position: "부교수",
    education: "홍익대학교 대학원, 산업디자인, M.A.",
    image: "/images/faculty/ju-youngmin.jpg",
  },
  {
    slug: "lee-joohyun", nameEn: "Joohyun Lee", nameKo: "이주현", position: "초빙교수",
    education: "Graphic Design, M.A., Boston university, MA, US.",
    image: "/images/faculty/lee-joohyun.jpg",
  },
  {
    slug: "lee-jingu", nameEn: "Jingu Lee", nameKo: "이진구", position: "명예교수",
    education: "홍익대학교 대학원, 광고홍보학, Ph.D.",
    image: "/images/faculty/lee-jingu.jpg",
  },
  {
    slug: "cho-wonchol", nameEn: "Wonchol Cho", nameKo: "조원철", position: "명예교수",
    education: "Transportation Design M.A., Royal College of Art, U.K.",
    image: "/images/faculty/cho-wonchol.jpg",
  },
  {
    slug: "park-jangho", nameEn: "Park Jangho", nameKo: "박장호", position: "겸임교수",
    education: "Graphic Design M.A., School of the Art Inst. of Chicago, IL, US.",
    image: "/images/faculty/park-jangho.jpg",
  },
  {
    slug: "lee-junghoon", nameEn: "Lee Jeonghun", nameKo: "이정훈", position: "겸임교수",
    education: "Design Management, M.B.A., Aalto University, Finland",
    image: "/images/faculty/lee-junghoon.jpg",
  },
  {
    slug: "choi-sooshin", nameEn: "Sooshin Choi", nameKo: "최수신", position: "겸임교수",
    education: "홍익대학교 대학원, 산업디자인, M.F.A.",
    image: "/images/faculty/choi-sooshin.jpg",
  },
  {
    slug: "kim-onyu", nameEn: "Kim Onyu", nameKo: "김온유", position: "객원교수",
    education: "Graphic Design M.F.A., California Inst. of the Arts, CA, US.",
    image: "/images/faculty/kim-onyu.jpg",
  },
  {
    slug: "shin-wonseok", nameEn: "Shin Wonseok", nameKo: "신원석", position: "객원교수",
    education: "한동대학교 대학원, 문화미디어디자인 M.E.",
    image: "/images/faculty/shin-wonseok.jpg",
  },
  {
    slug: "kim-hyungsoo", nameEn: "Kim Hyungsu", nameKo: "김형수", position: "강사",
    education: "Transportation Design M.F.A., Umeå Inst. of Design, Sweden",
    image: "/images/faculty/kim-hyungsoo.jpg",
  },
  {
    slug: "park-yena", nameEn: "Park Yena", nameKo: "박예나", position: "강사",
    education: "파주타이포그라피 더배곳 (PaTI), 시각디자인",
    image: "/images/faculty/park-yena.jpg",
  },
  {
    slug: "son-sungchan", nameEn: "SeongChan Son", nameKo: "손성찬", position: "강사",
    education: "Landscape Design. Ph.D cand., Polytechnic Univ. of Catalonia, Spain",
    image: "/images/faculty/son-sungchan.jpg",
  },
  {
    slug: "song-yeeun", nameEn: "Song Yeeun", nameKo: "송예은", position: "강사",
    education: "UX Design M.Sc., Technische Hochschule Ingolstadt, German",
    image: "/images/faculty/song-yeeun.jpg",
  },
  {
    slug: "lee-youngsuk", nameEn: "Lee Yongseok", nameKo: "이용석", position: "강사",
    education: "브랜드 전문회사 COVENANT inc., 대표",
    image: "/images/faculty/lee-youngsuk.jpg",
  },
  {
    slug: "jang-inhee", nameEn: "Jang Inhui", nameKo: "장인희", position: "강사",
    education: "홍익대학교 대학원, 회화 Ph.D.",
    image: "/images/faculty/jang-inhee.jpg",
  },
  {
    slug: "jang-hyunggyu", nameEn: "Jang Hyeonggyu", nameKo: "장형규", position: "강사",
    education: "한동대학교 대학원, 문화미디어디자인 M.E.",
    image: "/images/faculty/jang-hyunggyu.jpg",
  },
  {
    slug: "jung-kyungil", nameEn: "Jeong Gyeongil", nameKo: "정경일", position: "강사",
    education: "홍익대학교 대학원, 서비스디자인 M.F.A.",
    image: "/images/faculty/jung-kyungil.jpg",
  },
  {
    slug: "choi-changu", nameEn: "Choi Changu", nameKo: "최찬구", position: "강사",
    education: "미디어영상 디자인, UNGSoft, 대표",
    image: "/images/faculty/choi-changu.jpg",
  },
  {
    slug: "hong-seungpyo", nameEn: "Hong Seungpyo", nameKo: "홍승표", position: "강사",
    education: "계명대학교 디자인대학원. 사진디자인 M.F.A.",
    image: "/images/faculty/hong-seungpyo.jpg",
  },
  {
    slug: "hwang-hye", nameEn: "Hwang Hye", nameKo: "황혜", position: "강사",
    education: "홍익대학교 대학원, 디자인학 박사과정",
    image: "/images/faculty/hwang-hye.jpg",
  },
  {
    slug: "pyeon-yunsang", nameEn: "Yunsang Pyeon", nameKo: "편윤생",
    education: "학사 조교",
    image: "/images/faculty/pyeon-yunsang.jpg",
  },
];
