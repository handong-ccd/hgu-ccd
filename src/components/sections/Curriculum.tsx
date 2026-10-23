/* eslint-disable @next/next/no-img-element */
import { getTracks } from "@/lib/api/curriculum";
import { DOWNLOADS } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

function DownloadLinks({ variant }: { variant: "desktop" | "mobile" }) {
  const desktop = variant === "desktop";
  return (
    <ul className={desktop ? "hidden shrink-0 items-start gap-12 md:flex" : "flex flex-col items-start gap-2 md:hidden"}>
      {DOWNLOADS.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            download
            className={`flex items-center font-medium whitespace-nowrap text-accent hover:opacity-70 ${
              desktop ? "gap-2 text-[16px] leading-[1.4]" : "gap-1.5 text-[14px] leading-[1.4]"
            }`}
          >
            <img
              src="/icons/download.svg"
              alt=""
              className="block shrink-0"
              width={desktop ? 17.846 : 14.5}
              height={desktop ? 16.615 : 13.5}
            />
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export async function Curriculum() {
  const tracks = await getTracks();

  return (
    <section aria-labelledby="curriculum" className="scroll-mt-4">
      <SectionHeading
        id="curriculum"
        title="Curriculum"
        aside={<DownloadLinks variant="desktop" />}
        below={<DownloadLinks variant="mobile" />}
      />

      {/* Mobile: 트랙 소개 문단 */}
      <div className="mt-12 flex flex-col gap-[46px] md:hidden">
        {tracks.map((track) => (
          <div key={track.name} className="flex flex-col gap-3">
            <h3 className="text-[16px] leading-[1.2] font-medium">{track.name}</h3>
            <p className="font-myeongjo text-[14px] leading-[1.6]">{track.summary}</p>
          </div>
        ))}
      </div>

      {/* Tablet+: 학년별 과목 */}
      <div className="mt-6 hidden flex-col gap-6 md:flex">
        {tracks.map((track) => (
          <div key={track.name} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] leading-[1.4] font-medium">{track.name}</h3>
              <hr className="border-0 border-t border-line" />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 leading-[1.4] lg:grid-cols-4">
              {track.columns.map((column, i) => (
                <div key={i} className="flex min-w-0 flex-col gap-8">
                  {column.map((group) => (
                    <div key={group.label} className="flex flex-col gap-1">
                      <h4 className="text-[18px] font-semibold">{group.label}</h4>
                      <ul className="flex flex-col gap-1 font-telegraf text-[15px]">
                        {group.courses.map((course) => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
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
