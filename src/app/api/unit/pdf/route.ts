import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import OpenAI from "openai";
import { env } from "@/lib/env";
import { getCourseBySlug } from "@/lib/curriculum";
import { getUnitNotes } from "@/lib/curriculum/units";
import {
  parsePracticeQuestions,
  stripPracticeSection,
  type PracticeQuestion,
} from "@/lib/curriculum/practice";
import { retrieveRelevant } from "@/lib/ai/knowledge";
import { generateUnitPdf } from "@/lib/pdf/generateUnitPdf";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function normalizeBaseUrl(url?: string): string {
  if (!url) return "https://api.deepseek.com/v1";
  const trimmed = url.replace(/\/+$/, "");
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}

function categoryLabel(cat: PracticeQuestion["category"]): string {
  if (cat === "short") return "Short Answer";
  if (cat === "essay") return "Essay";
  return "Objective / Passage";
}

/**
 * Model answers, cached per unit so PDF downloads are fast after the first
 * time. Checks an in-memory cache, then the unit_pdf_answers table (if it
 * exists), and only calls DeepSeek when there is no cached copy yet. Any
 * question the AI leaves unanswered is filled with the best matching excerpt
 * from the notes, so the PDF always has an answer for every question.
 */
const memCache = new Map<string, string[]>();

async function readCachedAnswers(courseCode: string): Promise<string[] | null> {
  if (memCache.has(courseCode)) return memCache.get(courseCode)!;
  try {
    const supabase = createSupabaseAdmin();
    const { data } = await supabase
      .from("unit_pdf_answers")
      .select("answers")
      .eq("course_code", courseCode)
      .maybeSingle();
    if (data && Array.isArray(data.answers)) {
      const arr = data.answers as string[];
      memCache.set(courseCode, arr);
      return arr;
    }
  } catch (e) {
    console.warn(
      "[pdf] cache read skipped (unit_pdf_answers table may not exist yet)",
      e
    );
  }
  return null;
}

async function saveCachedAnswers(courseCode: string, answers: string[]) {
  memCache.set(courseCode, answers);
  try {
    const supabase = createSupabaseAdmin();
    await supabase
      .from("unit_pdf_answers")
      .upsert(
        { course_code: courseCode, answers, updated_at: new Date().toISOString() },
        { onConflict: "course_code" }
      );
  } catch (e) {
    console.warn(
      "[pdf] cache save skipped (unit_pdf_answers table may not exist yet)",
      e
    );
  }
}

function fallbackAnswer(question: PracticeQuestion, courseCode: string): string {
  const top = retrieveRelevant(question.text, 1, courseCode)[0];
  if (top) {
    const t = top.text.replace(/\s+/g, " ").trim();
    return t.length > 240
      ? `From the unit notes: ${t.slice(0, 240).trimEnd()}…`
      : `From the unit notes: ${t}`;
  }
  return "See the Detailed notes section of this document for the model answer.";
}

async function generateAnswers(
  courseCode: string,
  questions: PracticeQuestion[]
): Promise<string[]> {
  if (!questions.length) return [];

  const cached = await readCachedAnswers(courseCode);
  if (cached && cached.length === questions.length) return cached;

  if (!env.deepseekKey) {
    return questions.map((q) => fallbackAnswer(q, courseCode));
  }

  const notes = getUnitNotes(courseCode) ?? "";
  const retrievedText = retrieveRelevant(
    questions.map((q) => q.text).join(" "),
    6,
    courseCode
  )
    .map(
      (c) =>
        `[${c.courseCode} ${c.title}${c.section ? ` · ${c.section}` : ""}]: ${c.text}`
    )
    .join("\n\n");
  const context = (retrievedText + "\n\n" + notes.slice(0, 6000)).slice(0, 10000);

  const questionList = questions
    .map(
      (q, i) =>
        `${i + 1}. [${categoryLabel(q.category)}] ${q.text}${
          q.marks ? ` (${q.marks} marks)` : ""
        }`
    )
    .join("\n");

  const prompt = `Unit: ${courseCode}\n\nNotes (use ONLY this):\n${context}\n\nQuestions:\n${questionList}\n\nWrite one short model answer per question (1–3 sentences for short/objective, 2–4 for essays), grounded in the notes. Respond with ONLY valid JSON, no markdown, in exactly this shape: {"answers":[{"index":0,"answer":"..."}]}`;

  const callAi = async (): Promise<string[]> => {
    const oa = new OpenAI({
      apiKey: env.deepseekKey,
      baseURL: normalizeBaseUrl(env.deepseekBaseUrl),
    });
    const completion = await oa.chat.completions.create({
      model: env.deepseekChatModel,
      messages: [
        {
          role: "system",
          content:
            "You are Nile, a tutor for the Bachelor of Education (Arts) in English and Literature programme at a Kenyan university. Write accurate, concise model answers using only the provided unit notes.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 1200,
      response_format: { type: "json_object" },
    });
    const raw = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!raw) return questions.map(() => "");
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed.answers) ? parsed.answers : [];
    const out = questions.map(() => "");
    for (const a of arr) {
      const idx = Number(a?.index);
      if (
        Number.isInteger(idx) &&
        idx >= 0 &&
        idx < out.length &&
        typeof a?.answer === "string" &&
        a.answer.trim()
      ) {
        out[idx] = a.answer.trim();
      }
    }
    return out;
  };

  let ai: string[] = [];
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      ai = await callAi();
    } catch (e) {
      console.error(`[pdf] answer generation failed (attempt ${attempt})`, e);
    }
    if (!ai.length) ai = questions.map(() => "");
    if (ai.every((a) => a)) break;
  }

  const answers = questions.map((q, i) =>
    ai[i] && ai[i].trim() ? ai[i].trim() : fallbackAnswer(q, courseCode)
  );
  await saveCachedAnswers(courseCode, answers);
  return answers;
}

export async function GET(req: NextRequest) {
  try {
    const code = new URL(req.url).searchParams.get("code") ?? "";
    const course = getCourseBySlug(code);
    if (!course) {
      return NextResponse.json({ error: "Unit not found" }, { status: 404 });
    }

    const notes = getUnitNotes(course.code) ?? "";
    const notesForPdf = stripPracticeSection(notes);
    const questions = parsePracticeQuestions(notes);
    const answers = await generateAnswers(course.code, questions);

    const pdf = await generateUnitPdf({
      course,
      notes: notesForPdf,
      questions,
      answers,
    });

    const slug = code.toLowerCase().replace(/\s+/g, "-");
    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}-nile-notes.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[pdf] route error", e);
    return NextResponse.json(
      { error: "Could not generate the PDF. Please try again." },
      { status: 500 }
    );
  }
}
