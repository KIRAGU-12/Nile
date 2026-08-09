import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { createRequestHandlerClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues.map((i) => i.message).join("; ") },
      { status: 400 }
    );
  }
  const { email, password } = result.data;

  const response = NextResponse.json({ ok: true });
  const supabase = createRequestHandlerClient(request, response);
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "Invalid email or password" },
      { status: 401 }
    );
  }

  return response;
}
