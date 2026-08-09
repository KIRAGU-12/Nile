import { NextResponse } from "next/server";
import OpenAI from "openai";
import { env } from "@/lib/env";
import { getCourse, getCourseBySlug } from "@/lib/curriculum";
import { getUnitNotes } from "@/lib/curriculum/units";
import { retrieveRelevant } from "@/lib/ai/knowledge";

export const runtime = "nodejs";

const EXPLAIN_SYSTEM = `You are Nile, a friendly study tutor for the Bachelor of Education (Arts) in English and Literature programme at a Kenyan university. A student did not fully understand a practice question or its answer and has asked you to explain it more clearly.

Rules:
- Explain in simple, plain language, step by step.
- Start by restating what the question was really asking.
- Explain the correct answer and WHY it is correct, grounded in the unit notes.
- Gently show where the student's answer went wrong, if relevant.
- Connect the explanation back to the unit so it reinforces learning.
- Keep it warm and encouraging, under ~260 words. Use short paragraphs and bullets where helpful.`;

function normalizeBaseUrl(url?: string): string {
  if (!url) return "https://api.deepseek.com/v1";
  const trimmed = url.replace(/\/+$/, "");
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}

export async function POST(req: Request) {
  try {
    if (!env.deepseekKey) {
      return NextResponse.json(
        { error: "AI provider key is not configured on the server." },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const courseCode: string | undefined =
      typeof body.courseCode === "string" ? body.courseCode : undefined;
    const question: string = typeof body.question === "string" ? body.question : "";
    const studentAnswer: string =
      typeof body.studentAnswer === "string" ? body.studentAnswer : "";
    const correctAnswer: string =
      typeof body.correctAnswer === "string" ? body.correctAnswer : "";
    const feedback: string = typeof body.feedback === "string" ? body.feedback : "";

    if (!question.trim()) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const course = courseCode
      ? getCourse(courseCode) ?? getCourseBySlug(courseCode)
      : undefined;
    const unitLabel = course ? `${course.code} — ${course.title}` : "this unit";
    const notes = course ? getUnitNotes(course.code) : null;

    const chunks = retrieveRelevant(question, 5, courseCode);
    const retrieved = chunks
      .map((c) => `[${c.courseCode} ${c.title}]: ${c.text}`)
      .join("\n\n");
    const unitContext = notes ? notes.slice(0, 8000) : retrieved.slice(0, 8000);

    const userPrompt = `Unit: ${unitLabel}
Question: ${question}

Student's answer:
${studentAnswer || "(the student did not provide an answer)"}

Correct answer:
${correctAnswer || "See the unit notes."}

Grading feedback:
${feedback || "None provided."}

Reference material from the unit notes:
${unitContext}

Please explain this answer to me so I truly understand it.`;

    const oa = new OpenAI({
      apiKey: env.deepseekKey,
      baseURL: normalizeBaseUrl(env.deepseekBaseUrl),
    });

    const completion = await oa.chat.completions.create({
      model: env.deepseekChatModel,
      messages: [
        { role: "system", content: EXPLAIN_SYSTEM },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.5,
      max_tokens: 700,
    });

    return NextResponse.json({
      explanation: completion.choices[0]?.message?.content ?? "",
    });
  } catch (e) {
    console.error("[quiz] explain error", e);
    return NextResponse.json(
      { error: "Nile could not explain right now. Please try again." },
      { status: 500 }
    );
  }
}
