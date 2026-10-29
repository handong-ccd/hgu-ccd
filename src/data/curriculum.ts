// 더미 데이터 — USE_MOCK 모드에서 src/lib/api 가 반환. 백엔드 연결 후엔 참고용.
// 과목 배치: Figma 6:364 (트랙별 1~4학년 4열 + 융합교과목)
import type { Track } from "@/types/curriculum";

// TODO: 제품디자인 트랙 소개 문구로 교체 (현재 Figma 시안의 공통 문구)
const COMMON_SUMMARY =
  "졸업 후 진출분야로는 방송국, 전문디자인 회사, 기업 연구소, 뉴미디어 분야, 광고업계, 영상분야 등의 디자인과 직접 관련된 분야뿐 아니라 간접적으로 관련된 다양한 분야 등 그 수요는 점차 증가하고 있습니다. 졸업 후 보다 원활한 사회진출을 위하여 본 학부에서는 디자인 연구소의 설립과 국제적인 디자인 교류를 추진 중에 있습니다.";

export const TRACKS: Track[] = [
  {
    name: "시각디자인",
    summary: [
      "시각디자인 트랙은 시각언어와 창의적 사고를 바탕으로 브랜드와 서비스, 사회의 다양한 문제를 해결하는 디자인 인재를 양성합니다. 브랜드경험(BX)디자인, 그래픽디자인, 편집디자인, 타이포그래피, 영상디자인 및 AX기반 서비스경험디자인, 디자인씽킹 등을 배우며 기업 연계 산학 캡스톤디자인을 통해 실무 역량을 기릅니다. 졸업 후 국내외 대기업과 스타트업의 브랜드·홍보마케팅·서비스전략 분야, 공공서비스디자인, 브랜드 컨설턴시, 그래픽·웹 에이전시 등 다양한 전문 분야로 진출할 수 있습니다.",
      COMMON_SUMMARY,
    ].join("\n\n"),
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
    summary: COMMON_SUMMARY,
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
