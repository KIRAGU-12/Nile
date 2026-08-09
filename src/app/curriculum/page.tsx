import Link from "next/link";
import { ALL_COURSES, CURRICULUM_META, SEMESTER_TITLES, coursePath } from "@/lib/curriculum";

export const metadata = {
  title: "Curriculum — Nile",
  description: "The full four-year English and Literature curriculum at Nile.",
};

export default function CurriculumPage() {
  const years = [1, 2, 3, 4];
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Curriculum</h1>
        <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          {CURRICULUM_META.program}. The table below lists every unit across
          the four years. Click any course to read its lecture notes, set texts,
          authors and stories.
        </p>
      </header>

      {years.map((y) => {
        const courses = ALL_COURSES.filter((c) => c.year === y);
        return (
          <section key={y}>
            <h2 className="mb-4 text-xl font-semibold">Year {y}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {courses.map((c) => (
                  <Link
                    key={c.code}
                    href={coursePath(c.code)}
                     className="group flex flex-col gap-1 rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-lg"
                  >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{c.code}</span>
                    <span className="text-xs text-slate-500">
                      S{c.semester} · {c.credits} cr
                    </span>
                  </div>
                  <h3 className="font-semibold group-hover:text-primary">{c.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {SEMESTER_TITLES[c.semester]} • {c.description.slice(0, 110)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
