import Link from "next/link";
import { NileLogo } from "@/components/NileLogo";
import { BookOpen, GraduationCap, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
      <section className="flex flex-col items-center gap-6 rounded-2xl border border-slate-100 bg-gradient-to-br from-primary/5 to-transparent px-6 py-12 text-center shadow-lg dark:border-slate-800">
        <NileLogo />
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Learn English &amp; Literature
        </h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Nile is a revision and learning platform built for Kenyan students
          studying the Bachelor of Education (Arts) in English and Literature.
          Get the full four-year curriculum, lecture notes, set books, authors
          and stories — plus an AI study assistant that only ever talks about
          your course.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/register"
            className="rounded-md bg-primary px-6 py-2.5 font-medium text-primary-foreground hover:bg-primary-hover"
          >
            Get started
          </Link>
          <Link
            href="/login"
            className="rounded-md border border-slate-300 px-6 py-2.5 font-medium hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            Login
          </Link>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        <Feature
          icon={<BookOpen className="text-primary" size={28} />}
          title="Full curriculum"
          description="All 4 years, all units — notes, set texts, reading lists, key authors and stories, organised by semester."
        />
        <Feature
          icon={<GraduationCap className="text-primary" size={28} />}
          title="Course-scoped AI"
          description="Ask Nile anything about your notes. The assistant is grounded only on your English & Literature course material."
        />
        <Feature
          icon={<MessageCircle className="text-primary" size={28} />}
          title="Always with you"
          description="Study on web. Pick up where you left off. Continue with email/password or Google."
        />
      </section>

      <section className="rounded-lg border bg-card p-6 shadow-lg">
        <h2 className="mb-3 text-xl font-semibold">One programme, one focus</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Nile covers <strong>Bachelor of Education (Arts) in English and Literature</strong>{" "}
          — the programme taught in Kenyan universities. From Old English and the
          History of the English Language to Modernism, Postcolonial African
          literature, Applied Linguistics, and teaching methodology, every unit
          you study is here. The AI assistant is hard-wired to answer only
          questions about this course.
        </p>
      </section>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border bg-card p-6 text-center shadow-lg">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}
