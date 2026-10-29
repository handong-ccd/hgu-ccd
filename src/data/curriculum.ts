// 더미 데이터 — USE_MOCK 모드에서 src/lib/api 가 반환. 백엔드 연결 후엔 참고용.
// 과목 배치: Figma 6:364 (트랙별 1~4학년 4열 + 융합교과목)
import type { Track } from "@/types/curriculum";

// 트랙 소개(About) — Figma 6:2071 (480:1829 / 480:1834)
const VISUAL_SUMMARY =
  "시각디자인 트랙은 시각언어와 창의적 사고를 바탕으로 브랜드와 서비스, 사회의 다양한 문제를 해결하는 디자인 인재를 양성합니다. 브랜드경험(BX)디자인, 그래픽디자인, 편집디자인, 타이포그래피, 영상디자인 및 AX기반 서비스경험디자인, 디자인씽킹 등을 배우며 기업 연계 산학 캡스톤디자인을 통해 실무 역량을 기릅니다. 졸업 후 국내외 대기업과 스타트업의 브랜드·홍보마케팅·서비스전략 분야, 공공서비스디자인, 브랜드 컨설턴시, 그래픽·웹 에이전시 등 다양한 전문 분야로 진출할 수 있습니다.";
const PRODUCT_SUMMARY =
  "제품디자인 트랙은 인간과 기술에 대한 이해를 바탕으로 제품과 디지털 서비스의 형태와 기능, 사용성, 상호작용을 설계하는 디자인 인재를 양성합니다. 사용자경험(UX) 리서치, 사용자인터페이스(UI)디자인, 모빌리티디자인, 스마트디바이스디자인, AX기반 미래시나리오디자인 등을 배우며 기업 연계 산학 캡스톤디자인을 통해 실무 역량을 기릅니다. 졸업 후 국내외 대기업과 스타트업의 UX/UI·제품·모빌리티 디자인 분야, 기업 디자인 연구소, 디지털 제품·서비스 개발 조직 및 전문 디자인 컨설팅 회사 등으로 진출할 수 있습니다.";

export const TRACKS: Track[] = [
  {
    name: "시각디자인",
    summary: VISUAL_SUMMARY,
    columns: [
      // TODO: 1학년 트랙 과목 (시안에 아직 내용 없음)
      [{ label: "1학년", courses: [] }],
      [
        {
          label: "2학년",
          courses: [
            "Fundamentals of Visual Communication Design(English)",
            "Typography Design(English)",
            "Editorial Design(English)",
            "Illustration(English)",
          ],
        },
      ],
      [
        {
          label: "3학년",
          courses: [
            "Advanced Editorial Design",
            "Brand Design Methodology(English)",
            "Graphic Design",
            "Design for Behavioral Change",
            "Digital Motion Graphic Design(English)",
            "Time and Space Design",
          ],
        },
      ],
      [
        {
          label: "4학년",
          courses: [
            "Capstone Design 1 (Communication Design)",
            "Capstone Design 2 (Communication Design)",
            "Capstone Design 1 (Service Design)",
            "Capstone Design 2 (Service Design)",
          ],
        },
      ],
    ],
  },
  {
    name: "제품디자인",
    summary: PRODUCT_SUMMARY,
    columns: [
      // TODO: 1학년 트랙 과목 (시안에 아직 내용 없음)
      [{ label: "1학년", courses: [] }],
      [
        {
          label: "2학년",
          courses: [
            "Product Design Fundamentals 1",
            "Product Design Fundamentals 2",
            "Design Presentation 1",
            "Design Presentation 2",
          ],
        },
      ],
      [
        {
          label: "3학년",
          courses: [
            "3D Modeling Design",
            "Design Studio (English)",
            "AI Convergence Design Project",
            "Human-Centered Design",
            "UX Design",
            "Design Research & Planning 1",
            "Design Research & Planning 2",
          ],
        },
      ],
      [
        {
          label: "4학년",
          courses: [
            "제품 및 서비스 디자인 기획",
            "Capstone Design 1 (제품 및 서비스 디자인) - Product & Service Design",
            "Post Capstone (제품 및 서비스 디자인) - Product & Service Design",
            "Capstone Design 2 (Product Design)",
          ],
        },
      ],
    ],
  },
  {
    name: "융합교과목",
    // 트랙 소개(About)·모바일 소개 문단에는 안 나옴
    summary: "",
    columns: [
      [{ label: "1학년", courses: ["드로잉 기초 1", "드로잉 기초 2", "컴퓨터그래픽 기초"] }],
      [
        {
          label: "2학년",
          courses: [
            "Color Theory and Industrial Color(English)",
            "Design Thinking(English)",
            "Computer Graphic Design 1(English)",
            "Computer Graphic Design 2",
            "Future Literacy and Future Design",
            "3D Modeling & Printing",
            "Digital Photography",
          ],
        },
      ],
      [
        {
          label: "3학년",
          courses: [
            "AI native Design",
            "Smart Interface Design",
            "Smart Interaction Design",
            "Design Career Search",
            "스마트 기술 집중강좌",
            "Individual Research",
          ],
        },
      ],
      [{ label: "4학년", courses: ["Design Practice", "디자인과 신앙", "디자인역사 - Design History"] }],
    ],
  },
];
