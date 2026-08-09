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
 * Generate a concise model answer for every practice question, grounded in the
 * unit notes. Uses one DeepSeek call; returns an array parallel to `questions`.
 * On any failure it returns empty strings so the PDF still builds (answers then
 * fall back to a "see the notes" note).
 */
async function generateAnswers(
  courseCode: string,
  questions: PracticeQuestion[]
): Promise<string[]> {
  const empty = questions.map(() => "");
  if (!env.deepseekKey || !questions.length) return empty;

  try {
    const notes = getUnitNotes(courseCode) ?? "";
    const retrieved = retrieveRelevant(
      questions.map((q) => q.text).join(" "),
      8,
      courseCode
    )
      .map(
        (c) =>
          `[${c.courseCode} ${c.title}${c.section ? ` · ${c.section}` : ""}]: ${c.text}`
      )
      .join("\n\n");
    const context = (retrieved + "\n\n" + notes.slice(0, 12000)).slice(0, 16000);

    const questionList = questions
      .map(
        (q, i) =>
          `${i + 1}. [${categoryLabel(q.category)}] ${q.text}${
            q.marks ? ` (${q.marks} marks)` : ""
          }`
      )
      .join("\n");

    const prompt = `Unit: ${courseCode}\n\nReference material from the unit notes (use ONLY this):\n${context}\n\nPractice questions:\n${questionList}\n\nWrite a concise model answer for EACH question, grounded in the notes above. Short answer / objective: 2–3 sentences. Essays: a short paragraph (3–5 sentences) hitting the key points. Do not invent facts outside the notes. Respond with ONLY valid JSON, no markdown, in exactly this shape: {"answers":[{"index":0,"answer":"..."}]}`;

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
            "You are Nile, a tutor for the Bachelor of Education (Arts) in English and Literature programme at a Kenyan university. You write accurate, concise model answers using only the provided unit notes.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
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
  } catch (e) {
    console.error("[pdf] answer generation failed", e);
    return empty;
  }
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
