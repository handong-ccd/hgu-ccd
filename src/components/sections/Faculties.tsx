import Image from "next/image";
import { getFaculty } from "@/lib/api/faculty";
import type { Faculty } from "@/types/faculty";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SIZES = "(min-width: 1699px) 376px, (min-width: 768px) 33vw, 50vw";

function FacultyCard({ person }: { person: Faculty }) {
  return (
    <article className="flex flex-col gap-2 md:gap-4">
      <div className="relative aspect-[1122/1402] w-full overflow-hidden bg-neutral-100">
        <Image
          src={person.image}
          alt={`${person.nameKo} ${person.position ?? ""}`.trim()}
          fill
          sizes={SIZES}
          className="object-cover"
          style={{ objectPosition: person.objectPosition ?? "center" }}
        />
      </div>
      <div className="flex flex-col gap-2 text-left leading-normal">
        <div className="flex flex-col gap-1">
          <p className="font-telegraf text-[16px] md:text-[24px]">{person.nameEn}</p>
          <p className="text-[14px] font-medium md:text-[20px]">
            {person.position ? `${person.nameKo}, ${person.position}` : person.nameKo}
          </p>
        </div>
        <p className="text-[12px] font-medium md:text-[16px]">{person.education}</p>
      </div>
    </article>
  );
}

export async function Faculties() {
  const faculty = await getFaculty();

  return (
    <section aria-labelledby="faculties" className="scroll-mt-4">
      <SectionHeading id="faculties" title="Faculties" />
      <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-8 md:mt-6 md:grid-cols-3 md:gap-x-6 md:gap-y-10 2xl:grid-cols-4">
        {faculty.map((person) => (
          <li key={person.slug}>
            <FacultyCard person={person} />
          </li>
        ))}
      </ul>
    </section>
  );
}
