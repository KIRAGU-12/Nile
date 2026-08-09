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
 * unit notes. Uses DeepSeek (with one retry); any question the AI does not
 * answer is filled with the best matching excerpt from the notes, so the PDF
 * always has an answer for every question and never fails.
 */
async function generateAnswers(
  courseCode: string,
  questions: PracticeQuestion[]
): Promise<string[]> {
  if (!env.deepseekKey || !questions.length) return questions.map(() => "");

  const notes = getUnitNotes(courseCode) ?? "";
  const retrievedText = retrieveRelevant(
    questions.map((q) => q.text).join(" "),
    8,
    courseCode
  )
    .map(
      (c) =>
        `[${c.courseCode} ${c.title}${c.section ? ` · ${c.section}` : ""}]: ${c.text}`
    )
    .join("\n\n");
  const context = (retrievedText + "\n\n" + notes.slice(0, 9000)).slice(0, 14000);

  const questionList = questions
    .map(
      (q, i) =>
        `${i + 1}. [${categoryLabel(q.category)}] ${q.text}${
          q.marks ? ` (${q.marks} marks)` : ""
        }`
    )
    .join("\n");

  const prompt = `Unit: ${courseCode}\n\nReference material from the unit notes (use ONLY this):\n${context}\n\nPractice questions:\n${questionList}\n\nWrite a concise model answer for EACH question, grounded in the notes above. Short answer / objective: 2–3 sentences. Essays: a short paragraph (3–5 sentences). Do not invent facts outside the notes. Respond with ONLY valid JSON, no markdown, in exactly this shape: {"answers":[{"index":0,"answer":"..."}]}`;

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
            "You are Nile, a tutor for the Bachelor of Education (Arts) in English and Literature programme at a Kenyan university. You write accurate, concise model answers using only the provided unit notes.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 2500,
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

  let answers: string[] = [];
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      answers = await callAi();
    } catch (e) {
      console.error(`[pdf] answer generation failed (attempt ${attempt})`, e);
    }
    if (!answers.length) answers = questions.map(() => "");
    if (answers.every((a) => a)) break;
  }

  // Fill any remaining gaps with the best matching excerpt from the notes.
  const fallback = (q: PracticeQuestion): string => {
    const top = retrieveRelevant(q.text, 1, courseCode)[0];
    if (top) {
      const t = top.text.replace(/\s+/g, " ").trim();
      return t.length > 260
        ? `From the unit notes: ${t.slice(0, 260).trimEnd()}…`
        : `From the unit notes: ${t}`;
    }
    return "See the Detailed notes section of this document for the model answer.";
  };
  return answers.map((a, i) =>
    a && a.trim() ? a.trim() : fallback(questions[i])
  );
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
