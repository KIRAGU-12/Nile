"use client";

import { Bot, Sparkles, ListChecks } from "lucide-react";

interface UnitIntroProps {
  code: string;
  title: string;
  description: string;
  learningOutcomes: string[];
  questionCount: number;
}

export default function UnitIntro({
  code,
  title,
  description,
  learningOutcomes,
  questionCount,
}: UnitIntroProps) {
  function askNile() {
    window.dispatchEvent(new CustomEvent("nile:open-chat"));
  }

  function startPractice() {
    document
      .getElementById("practice-quiz")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="not-prose mt-6 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/5 via-transparent to-transparent p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-primary p-2.5 text-primary-foreground shadow-sm">
          <Bot size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Nile knows this unit
          </p>
          <h2 className="mt-0.5 text-lg font-bold leading-tight">
            {code} — {title}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {description}
          </p>

          {learningOutcomes.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                By the end of this unit you should be able to:
              </p>
              <ul className="mt-1 space-y-1">
                {learningOutcomes.slice(0, 4).map((o, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <Sparkles size={13} className="mt-1 shrink-0 text-primary" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              onClick={askNile}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
            >
              <Bot size={15} />
              Ask Nile about this unit
            </button>
            {questionCount > 0 && (
              <button
                onClick={startPractice}
                className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <ListChecks size={15} />
                Try the practice questions ({questionCount})
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
