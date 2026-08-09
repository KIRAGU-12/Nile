import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { createRequestHandlerClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";

const toggleSchema = z.object({
  courseCode: z.string(),
  completed: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  const response = NextResponse.json({});
  const supabase = createRequestHandlerClient(request, response);
  const session = await getSession(supabase);
  if (!session) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("progress")
    .select("course_code")
    .eq("user_id", session.userId)
    .eq("completed", true);
  if (error) {
    return NextResponse.json({ error: "Could not load progress" }, { status: 500 });
  }
  return NextResponse.json({ completed: (data ?? []).map((d) => d.course_code) });
}

export async function POST(request: NextRequest) {
  const response = NextResponse.json({});
  const supabase = createRequestHandlerClient(request, response);
  const session = await getSession(supabase);
  if (!session) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const parsed = toggleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { courseCode, completed } = parsed.data;
  const { error } = await supabase
    .from("progress")
    .upsert(
      {
        user_id: session.userId,
        course_code: courseCode,
        completed: completed ?? true,
      },
      { onConflict: "user_id,course_code" }
    )
    .select();
  if (error) {
    return NextResponse.json({ error: "Could not save progress" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
