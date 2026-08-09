import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { createRequestHandlerClient } from "@/lib/supabase/server";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

const patchSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be 80 characters or fewer")
    .optional(),
  currentYear: z.number().int().min(1).max(4).nullable().optional(),
});

export async function GET(request: NextRequest) {
  const response = NextResponse.json({});
  const supabase = createRequestHandlerClient(request, response);
  const session = await getSession(supabase);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const admin = createSupabaseAdmin();
  const { data } = await admin
    .from("profiles")
    .select("full_name, current_year")
    .eq("id", session.userId)
    .maybeSingle();

  return NextResponse.json({
    name: data?.full_name ?? session.name ?? "",
    email: session.email,
    currentYear:
      typeof data?.current_year === "number" ? data.current_year : null,
  });
}

export async function PATCH(request: NextRequest) {
  const response = NextResponse.json({});
  const supabase = createRequestHandlerClient(request, response);
  const session = await getSession(supabase);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join("; ") },
      { status: 400 }
    );
  }

  const { name, currentYear } = parsed.data;
  const updates: Record<string, unknown> = {};
  if (name !== undefined) updates.full_name = name;
  if (currentYear !== undefined) updates.current_year = currentYear;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const admin = createSupabaseAdmin();
  const { error } = await admin
    .from("profiles")
    .update(updates)
    .eq("id", session.userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Keep the auth user metadata in sync so the name survives future lookups.
  if (name !== undefined && name.trim()) {
    await admin.auth.admin
      .updateUserById(session.userId, { user_metadata: { full_name: name } })
      .catch(() => {});
  }

  return NextResponse.json({
    name: name !== undefined ? name : session.name ?? "",
    email: session.email,
    currentYear: currentYear !== undefined ? currentYear : null,
  });
}
