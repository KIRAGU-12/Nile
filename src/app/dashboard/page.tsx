import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { requireSession } from "@/lib/auth";
import { getCoursesByYear, CURRICULUM_META, coursePath } from "@/lib/curriculum";
import ProgressToggle from "@/components/ProgressToggle";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

async function getCompleted(
  supabase: SupabaseClient,
  userId: string
): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("progress")
    .select("course_code")
    .eq("user_id", userId)
    .eq("completed", true);
  if (error) return new Set();
  return new Set((data ?? []).map((d) => d.course_code));
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-4 text-center shadow-sm">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </div>
  );
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const session = await requireSession(supabase);
  const completed = await getCompleted(supabase, session.userId);

  const { data: profile } = await supabase
    .from("profiles")
    .select("current_year")
    .eq("id", session.userId)
    .maybeSingle();
  const currentYear =
    typeof profile?.current_year === "number" ? profile.current_year : null;

  const years = [1, 2, 3, 4] as const;
  let total = 0;
  let done = 0;
  for (const y of years) {
    const courses = getCoursesByYear(Number(y));
    total += courses.length;
    for (const c of courses) {
      if (completed.has(c.code)) done += 1;
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            Welcome{session.name ? `, ${session.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {CURRICULUM_META.program}. Track your progress across the four years.
            Total units: {total}.
          </p>
        </div>
      </header>

      <section className="grid gap-2 sm:grid-cols-3">
        <Stat label="Units reviewed" value={`${done}/${total}`} />
        <Stat
          label="Completion"
          value={`${total ? Math.round((done / total) * 100) : 0}%`}
        />
        <Stat
          label="Current year"
          value={currentYear ? `Year ${currentYear}` : "Not set"}
        />
      </section>

      <section className="flex flex-col gap-6">
        {years.map((y) => {
          const courses = getCoursesByYear(Number(y));
          const doneInYear = courses.filter((c) => completed.has(c.code)).length;
          const isCurrent = y === currentYear;
          return (
            <details
              key={y}
              className="group border-b pb-3"
              open={isCurrent || (currentYear === null && y === 1)}
            >
              <summary className="flex cursor-pointer items-center justify-between py-2 text-lg font-semibold list-none">
                <span className="flex items-center gap-2">
                  Year {y}
                  {isCurrent && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      Your current year
                    </span>
                  )}
                </span>
                <span className="text-sm font-normal text-slate-500">
                  {doneInYear}/{courses.length} reviewed
                </span>
              </summary>
              <div className="grid gap-2 pt-1 sm:grid-cols-2">
                {courses.map((c) => (
                  <div
                    key={c.code}
                     className="flex items-center justify-between rounded-md border bg-card p-3 shadow-sm"
                  >
                    <Link
                      href={coursePath(c.code)}
                      className="flex items-center gap-2"
                    >
                      <BookOpen size={16} className="text-primary" />
                      <span>
                        <span className="font-medium">{c.code}</span> —{" "}
                        <span className="text-slate-600 dark:text-slate-300">{c.title}</span>
                      </span>
                    </Link>
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">
                        Y{y} · S{c.semester}
                      </span>
                      <ProgressToggle courseCode={c.code} initial={completed.has(c.code)} />
                    </span>
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </section>
    </div>
  );
}
