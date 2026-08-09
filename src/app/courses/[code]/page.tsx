import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";
import { getCourseBySlug, ALL_COURSES, courseSlug } from "@/lib/curriculum";
import { getUnitNotes } from "@/lib/curriculum/units";
import { parsePracticeQuestions, stripPracticeSection } from "@/lib/curriculum/practice";
import Markdown from "@/components/Markdown";
import ProgressToggle from "@/components/ProgressToggle";
import AgentChat from "@/components/AgentChat";
import UnitIntro from "@/components/UnitIntro";
import UnitQuiz from "@/components/UnitQuiz";
import { ArrowLeft, BookOpen, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return ALL_COURSES.map((c) => ({ code: courseSlug(c.code) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const course = getCourseBySlug(code);
  if (!course) return { title: "Course not found — Nile" };
  return {
    title: `${course.code} ${course.title} — Nile`,
    description: course.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const course = getCourseBySlug(code);
  if (!course) notFound();

  const unitNotes = getUnitNotes(course.code);
  const practiceQuestions = unitNotes ? parsePracticeQuestions(unitNotes) : [];

  const supabase = await createClient();
  const session = await getSession(supabase);
  const completed = new Set<string>();
  if (session) {
    const { data } = await supabase
      .from("progress")
      .select("course_code")
      .eq("user_id", session.userId)
      .eq("completed", true);
    for (const d of data ?? []) completed.add(d.course_code);
  }

  return (
    <article className="prose prose-slate dark:prose-invert mx-auto max-w-4xl">
      <AgentChat courseCode={course.code} />
      <Link
        href="/curriculum"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:underline"
      >
        <ArrowLeft size={14} /> Back to curriculum
      </Link>

      <header className="not-prose">
        <div className="flex items-baseline justify-between gap-2">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">{course.code}</span> — {course.title}
          </h1>
          {session && (
            <ProgressToggle
              courseCode={course.code}
              initial={completed.has(course.code)}
            />
          )}
        </div>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Year {course.year}, Semester {course.semester} · {course.credits} credits
        </p>
        <div className="not-prose mt-4 flex flex-wrap items-center gap-3">
          <a
            href={`/api/unit/pdf?code=${code}`}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-hover"
          >
            <Download size={16} /> Download unit PDF
          </a>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Full notes + practice questions with model answers (PDF)
          </span>
        </div>
      </header>

      <UnitIntro
        code={course.code}
        title={course.title}
        description={course.description}
        learningOutcomes={course.learningOutcomes}
        questionCount={practiceQuestions.length}
      />

      <h2>Overview</h2>
      <p>{course.description}</p>

      {course.learningOutcomes.length > 0 && (
        <>
          <h2>Learning outcomes</h2>
          <ul>
            {course.learningOutcomes.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ul>
        </>
      )}

      {course.setBooks.length > 0 && (
        <>
          <h2>Set texts and books</h2>
          <ul>
            {course.setBooks.map((b, i) => (
              <li key={i}>
                <strong>{b.title}</strong> by {b.author}
                {b.edition ? ` (${b.edition})` : ""}
                {b.note ? ` — ${b.note}` : ""}
              </li>
            ))}
          </ul>
        </>
      )}

      {course.keyAuthors.length > 0 && (
        <>
          <h2>Key authors and figures</h2>
          <div className="space-y-4">
            {course.keyAuthors.map((a) => (
              <div key={a.name}>
                <h3 className="font-semibold">{a.name}</h3>
                <p className="text-sm italic text-slate-600 dark:text-slate-300">
                  {a.lifespan ? a.lifespan : ""}
                  {a.nationality ? `, ${a.nationality}` : ""}
                </p>
                {a.notableWorks && a.notableWorks.length > 0 && (
                  <p className="text-sm">Notable works: {a.notableWorks.join(", ")}</p>
                )}
                <p className="text-sm">{a.bio}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {unitNotes ? (
        <div>
          <Markdown source={stripPracticeSection(unitNotes)} />
          <UnitQuiz
            courseCode={course.code}
            courseTitle={course.title}
            questions={practiceQuestions}
            notes={unitNotes}
          />
        </div>
      ) : (
        <>
          <h2>
            <span className="flex items-center gap-2">
              <BookOpen size={18} /> Lecture notes
            </span>
          </h2>
          {course.notes ? (
            <div className="not-prose">
              <Markdown source={course.notes} />
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Detailed notes for this unit are being prepared. Consult the set
              texts and topics below, then ask Nile any question about this
              course.
            </p>
          )}
        </>
      )}

      {course.topics.length > 0 && (
        <>
          <h2>Topics</h2>
          <div className="space-y-6">
            {course.topics.map((t) => (
              <div key={t.title}>
                <h3 className="font-semibold">{t.title}</h3>
                {t.notes ? (
                  <div className="not-prose pt-2">
                    <Markdown source={t.notes} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
