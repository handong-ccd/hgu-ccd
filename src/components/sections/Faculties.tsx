import Image from "next/image";
import { getFaculty } from "@/lib/api/faculty";
import type { Faculty } from "@/types/faculty";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SIZES = "(min-width: 1699px) 376px, (min-width: 768px) 33vw, 50vw";

function FacultyPhoto({ person }: { person: Faculty }) {
  const { crop } = person;
  return (
    <div className="relative aspect-[1122/1402] w-full overflow-hidden bg-neutral-100">
      <Image
        src={person.image}
        alt={`${person.nameKo} ${person.role.split(",")[0]}`}
        fill
        sizes={SIZES}
        className={crop ? "max-w-none" : "object-cover"}
        style={
          crop
            ? {
                left: `${crop.left}%`,
                top: `${crop.top}%`,
                width: `${crop.width}%`,
                height: `${crop.height}%`,
                right: "auto",
                bottom: "auto",
              }
            : { objectPosition: person.objectPosition ?? "center" }
        }
      />
    </div>
  );
}

function FacultyCard({ person }: { person: Faculty }) {
  const content = (
    <>
      <FacultyPhoto person={person} />
      <div className="flex flex-col gap-2 text-left leading-normal">
        <div className="flex flex-col gap-1">
          <p className="font-telegraf text-[16px] md:text-[24px]">{person.nameEn}</p>
          <p className="text-[14px] font-medium md:text-[20px]">{person.nameKo}</p>
        </div>
        <p className="text-[12px] font-medium md:text-[16px]">{person.role}</p>
      </div>
    </>
  );

  const className = "flex flex-col gap-2 md:gap-4";
  return person.href ? (
    <a href={person.href} className={`${className} group`}>
      {content}
    </a>
  ) : (
    <article className={className}>{content}</article>
  );
}

export async function Faculties() {
  const faculty = await getFaculty();

  return (
    <section aria-labelledby="faculties" className="scroll-mt-4">
      <SectionHeading id="faculties" title="Faculties" />
      <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-6 md:mt-6 md:grid-cols-3 md:gap-6 2xl:grid-cols-4">
        {faculty.map((person) => (
          <li key={person.nameEn}>
            <FacultyCard person={person} />
          </li>
        ))}
      </ul>
    </section>
  );
}
