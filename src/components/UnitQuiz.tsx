"use client";

import { useState } from "react";
import {
  Send,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  GraduationCap,
  Bot,
} from "lucide-react";
import Markdown from "@/components/Markdown";
import type { PracticeQuestion } from "@/lib/curriculum/practice";

export interface GradeResult {
  correct: boolean;
  score: number;
  marks: number;
  correctAnswer: string;
  feedback: string;
}

interface UnitQuizProps {
  courseCode: string;
  courseTitle: string;
  questions: PracticeQuestion[];
  notes: string;
}

const CATEGORY_LABELS: Record<PracticeQuestion["category"], string> = {
  short: "Short answer",
  essay: "Essay",
  objective: "Objective",
};

const CATEGORY_STYLES: Record<PracticeQuestion["category"], string> = {
  short: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  essay: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  objective: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

export default function UnitQuiz({
  courseCode,
  courseTitle,
  questions,
}: UnitQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, GradeResult>>({});
  const [gradingId, setGradingId] = useState<string | null>(null);
  const [explainingId, setExplainingId] = useState<string | null>(null);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  if (questions.length === 0) return null;

  const answered = Object.keys(results).length;
  const earned = Object.values(results).reduce((s, r) => s + (r.score || 0), 0);
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
  const progress = totalMarks > 0 ? Math.round((earned / totalMarks) * 100) : 0;

  async function grade(q: PracticeQuestion) {
    const answer = (answers[q.id] ?? "").trim();
    if (!answer) return;
    setGradingId(q.id);
    setError(null);
    try {
      const res = await fetch("/api/quiz/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseCode,
          courseTitle,
          question: q.text,
          marks: q.marks,
          studentAnswer: answer,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Could not grade your answer. Please try again.");
      } else {
        setResults((prev) => ({ ...prev, [q.id]: json as GradeResult }));
      }
    } catch {
      setError("Could not reach Nile for grading. Please try again.");
    } finally {
      setGradingId(null);
    }
  }

  async function explain(q: PracticeQuestion) {
    const result = results[q.id];
    if (!result) return;
    setExplainingId(q.id);
    setError(null);
    try {
      const res = await fetch("/api/quiz/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseCode,
          courseTitle,
          question: q.text,
          marks: q.marks,
          studentAnswer: answers[q.id] ?? "",
          correctAnswer: result.correctAnswer,
          feedback: result.feedback,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Nile couldn't explain right now.");
      } else {
        setExplanations((prev) => ({ ...prev, [q.id]: json.explanation || "" }));
      }
    } catch {
      setError("Could not reach Nile. Please try again.");
    } finally {
      setExplainingId(null);
    }
  }

  function reset(q: PracticeQuestion) {
    setResults((prev) => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
    setExplanations((prev) => {
      const next = { ...prev };
      delete next[q.id];
      return next;
    });
  }

  return (
    <section id="practice-quiz" className="not-prose mt-10 scroll-mt-24">
      <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary p-2.5 text-primary-foreground">
            <GraduationCap size={22} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Practice questions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Straight from this unit&apos;s notes. Answer any question and Nile
              will grade it the moment you submit.
            </p>
          </div>
        </div>

        {/* Live score */}
        <div className="mt-4 rounded-xl border bg-slate-50 p-3 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-medium text-slate-600 dark:text-slate-300">
              {answered} of {questions.length} answered ·{" "}
              <span className="font-semibold text-primary">
                {earned} / {totalMarks} marks
              </span>
            </span>
            <span className="text-xs font-medium text-slate-400">
              {progress}% of total marks
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="mt-3 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="mt-5 space-y-5">
          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              index={i + 1}
              q={q}
              answer={answers[q.id] ?? ""}
              result={results[q.id]}
              grading={gradingId === q.id}
              explaining={explainingId === q.id}
              explanation={explanations[q.id]}
              onAnswer={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
              onGrade={() => grade(q)}
              onExplain={() => explain(q)}
              onReset={() => reset(q)}
            />
          ))}
        </div>

        <p className="mt-5 flex items-center gap-1.5 text-xs text-slate-400">
          <Bot size={13} className="text-primary" />
          Grading is powered by Nile and grounded in this unit&apos;s notes.
        </p>
      </div>
    </section>
  );
}

function QuestionCard({
  index,
  q,
  answer,
  result,
  grading,
  explaining,
  explanation,
  onAnswer,
  onGrade,
  onExplain,
  onReset,
}: {
  index: number;
  q: PracticeQuestion;
  answer: string;
  result?: GradeResult;
  grading: boolean;
  explaining: boolean;
  explanation?: string;
  onAnswer: (v: string) => void;
  onGrade: () => void;
  onExplain: () => void;
  onReset: () => void;
}) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-900 px-1.5 text-xs font-bold text-white dark:bg-slate-100 dark:text-slate-900">
          {index}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${CATEGORY_STYLES[q.category]}`}
        >
          {CATEGORY_LABELS[q.category]}
        </span>
        {q.difficulty && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium capitalize text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            {q.difficulty}
          </span>
        )}
        <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {q.marks} {q.marks === 1 ? "mark" : "marks"}
        </span>
      </div>

      {q.parent && (
        <p className="mt-2 text-xs italic text-slate-500 dark:text-slate-400">
          Part of: {q.parent}
        </p>
      )}

      <div className="prose prose-sm prose-slate dark:prose-invert mt-2 max-w-none">
        <Markdown source={q.text} />
      </div>

      {!result ? (
        <div className="mt-3">
          <textarea
            value={answer}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="Write your answer here, then hit Check — Nile grades it instantly."
            rows={3}
            disabled={grading}
            className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm text-foreground outline-none ring-primary focus-within:ring-2 disabled:opacity-60"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              onClick={onGrade}
              disabled={grading || !answer.trim()}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover disabled:opacity-60"
            >
              {grading ? (
                <>
                  <Sparkles size={15} className="animate-spin" />
                  Grading…
                </>
              ) : (
                <>
                  <Send size={15} />
                  Check my answer
                </>
              )}
            </button>
            <span className="text-xs text-slate-400">Graded instantly by Nile</span>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <div
            className={
              "rounded-lg border px-3 py-2.5 " +
              (result.correct
                ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
                : "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/40")
            }
          >
            <div className="flex items-start gap-2">
              {result.correct ? (
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <XCircle size={18} className="mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
              )}
              <div className="min-w-0 flex-1">
                <p
                  className={
                    "font-semibold " +
                    (result.correct
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-red-700 dark:text-red-300")
                  }
                >
                  {result.correct
                    ? `Correct — you earned ${result.score} / ${result.marks} ${result.marks === 1 ? "mark" : "marks"}`
                    : `Not quite — you earned ${result.score} / ${result.marks} ${result.marks === 1 ? "mark" : "marks"}`}
                </p>
                <div className="mt-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Correct answer
                  </p>
                  <div className="prose prose-sm prose-slate dark:prose-invert mt-0.5 max-w-none text-slate-700 dark:text-slate-200">
                    <Markdown source={result.correctAnswer} />
                  </div>
                </div>
                {result.feedback && (
                  <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                    {result.feedback}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={onExplain}
              disabled={explaining}
              className="inline-flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {explaining ? (
                <>
                  <Sparkles size={14} className="animate-spin" />
                  Nile is explaining…
                </>
              ) : (
                <>
                  <HelpCircle size={14} />
                  Not understood? Let Nile explain
                </>
              )}
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RotateCcw size={14} />
              Try again
            </button>
          </div>

          {explanation && (
            <div className="mt-3 rounded-lg border border-primary/30 bg-primary/5 p-3">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                <Bot size={13} />
                Nile&apos;s explanation
              </p>
              <div className="prose prose-sm prose-slate dark:prose-invert mt-1.5 max-w-none">
                <Markdown source={explanation} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
