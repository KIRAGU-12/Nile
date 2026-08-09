import { NextResponse } from "next/server";
import OpenAI from "openai";
import { env } from "@/lib/env";
import { retrieveRelevant } from "@/lib/ai/knowledge";
import { getCourse, getCourseBySlug } from "@/lib/curriculum";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are **Nile**, an AI study assistant built exclusively for the Bachelor of Education (Arts) in English and Literature programme (a Kenyan university curriculum).

Your purpose is to help students understand the lecture notes, set texts, authors, stories, themes, theories and teaching methods that appear in the Nile English and Literature course.

Rules:
- You may ONLY answer questions about the English and Literature curriculum covered on the Nile platform.
- If a question is about anything outside this curriculum — other subjects, current events, personal matters, general world knowledge not tied to a course unit, coding, maths, etc. — you must politely decline and say: "I can only help with questions about the English and Literature course at Nile."
- Ground your answers in the course material provided in the context, but answer naturally, clearly and conversationally, as a helpful tutor would.
- Do NOT add citations, course codes in brackets, or lists of references unless the student explicitly asks for them (for example, asks for sources, references, or further reading). When the student asks for references, then provide them.
- If you are not certain, say so and point the student to the relevant unit's notes or a lecturer. Always prefer quoting or closely paraphrasing the course notes over inventing details.
- When a student cannot understand a word or concept in the notes, explain it using plain language and then connect it back to the course context.`;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

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

    const messages: ChatMessage[] = Array.isArray(body.messages) ? body.messages : [];
    const question: string =
      typeof body.question === "string"
        ? body.question
        : messages.length
          ? String(messages[messages.length - 1].content)
          : "";

    if (!question.trim()) {
      return NextResponse.json({ error: "No question provided" }, { status: 400 });
    }

    // Recognise which unit the student is currently viewing, so Nile's answer
    // is anchored to that unit's content.
    const courseCode: string | undefined =
      typeof body.courseCode === "string" ? body.courseCode : undefined;
    const course = courseCode
      ? getCourse(courseCode) ?? getCourseBySlug(courseCode)
      : undefined;
    const unitContext = course
      ? `The student is currently viewing the unit ${course.code} — ${course.title} (Year ${course.year}, Semester ${course.semester}).\nUnit description: ${course.description}\nLearning outcomes: ${course.learningOutcomes.join("; ")}`
      : "";

    const chunks = retrieveRelevant(question, 8, courseCode);
    const context = chunks
      .map((c) => `- [${c.courseCode} ${c.title}]: ${c.text}`)
      .join("\n\n");

    // Accept either a full `messages` history (preferred) or a single `question`.
    const finalMessages: ChatMessage[] = messages.length
      ? messages
      : question
        ? [{ role: "user", content: question }]
        : [];

    const oa = new OpenAI({
      apiKey: env.deepseekKey,
      baseURL: normalizeBaseUrl(env.deepseekBaseUrl),
    });

    const completion = await oa.chat.completions.create({
      model: env.deepseekChatModel,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...(unitContext
          ? [{ role: "system", content: unitContext } as ChatMessage]
          : []),
        {
          role: "system",
          content: context
            ? `Use ONLY the following Nile course material as context. If the question is outside the curriculum, refuse. Otherwise answer using this material.\n\nContext:\n${context}`
            : "No matching course material was found in the Nile curriculum. If the question is outside the English and Literature curriculum, refuse. If it is in scope but no material was retrieved, say that you do not have information on that specific topic and suggest consulting the course notes or a lecturer.",
        },
        ...finalMessages,
      ],
      temperature: 0.5,
      max_tokens: 1600,
    });

    const answer = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({
      answer,
      sources: chunks.map((c) => ({
        courseCode: c.courseCode,
        title: c.title,
        year: c.year,
        semester: c.semester,
        excerpt: c.text.slice(0, 200),
        score: Math.round(c.score * 1000) / 1000,
      })),
    });
  } catch (e) {
    const sdk = e as {
      message?: string;
      code?: string;
      status?: number;
      error?: { message?: string };
    };
    console.error("[agent] chat error", e);
    const status = typeof sdk?.status === "number" ? sdk.status : 500;
    const message =
      sdk?.message ??
      sdk?.error?.message ??
      "Agent error. Please try again.";
    const code = sdk?.code;
    return NextResponse.json({ error: message, code }, { status });
  }
}
