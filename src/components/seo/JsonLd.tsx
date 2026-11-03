/** JSON-LD 구조화 데이터 — 검색엔진·AI 검색이 학부·교수·전시 정보를 정확히 읽도록 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // </script> 등이 데이터에 섞여도 태그가 끊기지 않게 < 를 이스케이프
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
