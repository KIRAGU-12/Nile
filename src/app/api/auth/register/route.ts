import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { createRequestHandlerClient } from "@/lib/supabase/server";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const result = registerSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues.map((i) => i.message).join("; ") },
      { status: 400 }
    );
  }
  const { name, email, password } = result.data;

  const admin = createSupabaseAdmin();
  const { data, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: name ? { full_name: name } : {},
  });

  if (createError || !data?.user) {
    const message = createError?.message ?? "Registration failed";
    const status = /already registered|already in use/i.test(message) ? 409 : 400;
    return NextResponse.json({ error: message }, { status });
  }

  // Establish a session for the newly created account.
  const response = NextResponse.json({ ok: true });
  const supabase = createRequestHandlerClient(request, response);
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError) {
    return NextResponse.json({ error: signInError.message }, { status: 401 });
  }
  return response;
}
