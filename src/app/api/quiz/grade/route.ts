import { NextResponse } from "next/server";
import OpenAI from "openai";
import { env } from "@/lib/env";
import { getCourse, getCourseBySlug } from "@/lib/curriculum";
import { getUnitNotes } from "@/lib/curriculum/units";
import { retrieveRelevant } from "@/lib/ai/knowledge";

export const runtime = "nodejs";

const GRADE_SYSTEM = `You are Nile, an examiner for the Bachelor of Education (Arts) in English and Literature programme at a Kenyan university. You grade student answers to practice questions taken directly from the unit lecture notes.

Grading rules:
- Determine the correct answer ONLY from the unit notes and curriculum context provided.
- Award FULL marks only when the answer is accurate, complete and uses the correct concepts and terminology from the notes.
- Award PARTIAL marks when the answer is partly correct or underdeveloped.
- Award 0 marks when the answer is wrong, irrelevant or empty.
- For objective / multiple-choice questions, "correctAnswer" must state the correct option and a one-line justification.
- Set "correct" to true only when the awarded score is at least half of the marks.
- Keep "feedback" short (1-3 sentences), specific, encouraging and tied to what the student got right or wrong.
- Always provide a concise "correctAnswer" derived from the notes, even when the student is correct, so they can confirm their answer.`;

function normalizeBaseUrl(url?: string): string {
  if (!url) return "https://api.deepseek.com/v1";
  const trimmed = url.replace(/\/+$/, "");
  return trimmed.endsWith("/v1") ? trimmed : `${trimmed}/v1`;
}

function extractJson(text: string): Record<string, unknown> {
  const cleaned = text.replace(/```(?:json)?/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end <= start) return {};
  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
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
    const rawMarks = typeof body.marks === "number" ? body.marks : NaN;

    if (!question.trim() || !studentAnswer.trim()) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const course = courseCode
      ? getCourse(courseCode) ?? getCourseBySlug(courseCode)
      : undefined;
    const marks = Number.isFinite(rawMarks) && rawMarks > 0 ? Math.round(rawMarks) : 5;
    const unitLabel = course ? `${course.code} — ${course.title}` : "this unit";
    const notes = course ? getUnitNotes(course.code) : null;

    const chunks = retrieveRelevant(question, 6, courseCode);
    const retrieved = chunks
      .map((c) => `[${c.courseCode} ${c.title}]: ${c.text}`)
      .join("\n\n");
    const unitContext = notes ? notes.slice(0, 8000) : retrieved.slice(0, 8000);

    const userPrompt = `Unit: ${unitLabel}
Question (${marks} ${marks === 1 ? "mark" : "marks"}): ${question}

Student's answer:
${studentAnswer}

Reference material from the unit notes (use this to judge the answer):
${unitContext}

Respond with ONLY valid JSON, no markdown, matching exactly this shape:
{"correct": true or false, "score": number, "marks": ${marks}, "correctAnswer": "concise model answer", "feedback": "short feedback"}`;

    const oa = new OpenAI({
      apiKey: env.deepseekKey,
      baseURL: normalizeBaseUrl(env.deepseekBaseUrl),
    });

    const completion = await oa.chat.completions.create({
      model: env.deepseekChatModel,
      messages: [
        { role: "system", content: GRADE_SYSTEM },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 900,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const parsed = extractJson(raw);
    const scoreNum = Number(parsed.score);
    const score = Number.isFinite(scoreNum)
      ? Math.max(0, Math.min(marks, Math.round(scoreNum)))
      : 0;
    const correct =
      typeof parsed.correct === "boolean" ? parsed.correct : score >= Math.ceil(marks / 2);

    return NextResponse.json({
      correct,
      score,
      marks,
      correctAnswer:
        typeof parsed.correctAnswer === "string" && parsed.correctAnswer.trim()
          ? parsed.correctAnswer.trim()
          : "See the unit notes for the model answer.",
      feedback:
        typeof parsed.feedback === "string" && parsed.feedback.trim()
          ? parsed.feedback.trim()
          : correct
            ? "Great work — keep it up!"
            : "Review the unit notes and try again.",
    });
  } catch (e) {
    console.error("[quiz] grade error", e);
    return NextResponse.json({ error: "Grading failed. Please try again." }, { status: 500 });
  }
}
