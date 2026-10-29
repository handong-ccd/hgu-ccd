/* eslint-disable @next/next/no-img-element */
import { getTracks } from "@/lib/api/curriculum";
import { DOWNLOADS } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Figma 6:371 — ↓ 다운로드 아이콘 (17.846 × 16) */
function DownloadIcon({ k }: { k: number }) {
  return (
    <img
      src="/icons/download.svg"
      alt=""
      aria-hidden
      className="block shrink-0"
      width={17.846 * k}
      height={16.615 * k}
    />
  );
}

/** Figma 171:6900 — 가로 화살표를 -45° 회전시킨 ↗ 아이콘 (17.846 × 16 박스) */
function ExternalIcon({ k }: { k: number }) {
  return (
    <span aria-hidden className="relative block shrink-0" style={{ width: 17.846 * k, height: 16 * k }}>
      <span
        className="absolute flex items-center justify-center"
        style={{ left: -2.86 * k, top: -3.07 * k, width: 23.634 * k, height: 23.634 * k }}
      >
        <span className="relative block -rotate-45" style={{ width: 16.323 * k, height: 17.101 * k }}>
          <img
            src="/icons/arrow-right-red.svg"
            alt=""
            className="absolute block max-w-none"
            style={{ left: 0, top: "-2.54%", width: "105.32%", height: "105.09%" }}
          />
        </span>
      </span>
    </span>
  );
}

function DownloadLinks({ variant }: { variant: "desktop" | "mobile" }) {
  const desktop = variant === "desktop";
  const k = desktop ? 1 : 0.8125;
  return (
    <ul className={desktop ? "hidden shrink-0 items-start gap-12 md:flex" : "flex flex-wrap items-start gap-x-5 gap-y-2 md:hidden"}>
      {DOWNLOADS.map((item) => {
        const external = item.kind === "external";
        const ready = item.href !== "#";
        const className = `flex items-center gap-1 leading-[1.4] font-medium whitespace-nowrap text-accent ${
          desktop ? "text-[16px]" : "text-[14px]"
        }`;
        const content = (
          <>
            <span className={external ? "underline decoration-from-font" : undefined}>{item.label}</span>
            {external ? <ExternalIcon k={k} /> : <DownloadIcon k={k} />}
          </>
        );
        return (
          <li key={item.label}>
            {ready ? (
              // 파일도 강제 다운로드하지 않고 새 탭에서 열기
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={`${className} hover:opacity-70`}>
                {content}
                <span className="sr-only">(새 탭에서 열림)</span>
              </a>
            ) : (
              // 파일 주소가 아직 없으면 링크 비활성 (예전엔 "#" + download 로 페이지 HTML이 받아졌음)
              <span aria-disabled="true" title="준비 중" className={`${className} cursor-default`}>
                {content}
                <span className="sr-only">(준비 중)</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** 트랙 소개 문단 — 빈 줄로 나눈 문단 사이 32px */
function Summary({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-8 font-myeongjo text-[14px] leading-[1.6]">
      {text.split(/\n\s*\n/).map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

/** 트랙 이름 + 아래 구분선 (Mo 16px / PC 20px) */
function TrackTitle({ name }: { name: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-[16px] leading-[1.2] font-medium md:text-[20px] md:leading-[1.4]">{name}</h3>
      <hr className="border-0 border-t border-line" />
    </div>
  );
}

/**
 * 커리큘럼 위 트랙 소개 — GNB "About" 이 이동하는 곳 (id="about")
 * Figma PC 419:998 (2열) / 모바일 6:2109 (세로). 소개 문구가 있는 트랙만
 */
export async function TrackAbout() {
  const tracks = (await getTracks()).filter((t) => t.summary);
  if (!tracks.length) return null;

  return (
    <section id="about" aria-labelledby="track-about" className="flex scroll-mt-4 flex-col gap-6 md:gap-8">
      <SectionHeading id="track-about" title="About" />
      <div className="flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-[100px]">
        {tracks.map((track) => (
          <div key={track.name} className="flex min-w-0 flex-col gap-2 md:flex-1 md:gap-5">
            <TrackTitle name={track.name} />
            <Summary text={track.summary} />
          </div>
        ))}
      </div>
    </section>
  );
}

export async function Curriculum() {
  const tracks = await getTracks();

  return (
    <section aria-labelledby="curriculum" className="scroll-mt-4">
      <SectionHeading
        id="curriculum"
        title="Curriculum"
        // Figma 6:367 — 다운로드 링크는 오른쪽 아래(구분선 위)에 붙임
        asideAlign="end"
        aside={<DownloadLinks variant="desktop" />}
        below={<DownloadLinks variant="mobile" />}
      />

      {/* Mobile: 트랙별 학년 줄 (학년 50px + 과목) — Figma 6:2130. 과목 없는 학년은 생략 */}
      <div className="mt-6 flex flex-col gap-6 md:hidden">
        {tracks.map((track) => (
          <div key={track.name} className="flex flex-col gap-2">
            <TrackTitle name={track.name} />
            <dl className="flex flex-col gap-3 text-[12px] leading-[1.4]">
              {track.columns
                .flat()
                .filter((group) => group.courses.length > 0)
                .map((group) => (
                  <div key={group.label} className="flex gap-1">
                    <dt className="w-[50px] shrink-0">{group.label}</dt>
                    <dd className="min-w-0 flex-1 font-telegraf">
                      <ul>
                        {group.courses.map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Tablet+: 트랙별 1~4학년 과목 (Figma 6:365) */}
      <div className="mt-6 hidden flex-col gap-6 md:flex">
        {tracks.map((track) => (
          <div key={track.name} className="flex flex-col gap-5">
            <TrackTitle name={track.name} />
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 leading-[1.4] lg:grid-cols-4">
              {track.columns.map((column, i) => (
                <div key={i} className="flex min-w-0 flex-col gap-8">
                  {column.map((group) => (
                    <div key={group.label} className="flex flex-col gap-1">
                      <h4 className="text-[18px] font-semibold">{group.label}</h4>
                      {group.courses.length > 0 && (
                        <ul className="flex flex-col gap-1 font-telegraf text-[15px]">
                          {group.courses.map((course) => (
                            <li key={course}>{course}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
