import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export interface SessionPayload {
  userId: string;
  email: string;
  name?: string;
  image?: string;
  role: "student" | "teacher" | "admin";
}

export async function getSession(
  client?: SupabaseClient
): Promise<SessionPayload | null> {
  const supabase = client ?? (await createClient());
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, avatar_url")
    .eq("id", user.id)
    .maybeSingle<{
      role: string | null;
      full_name: string | null;
      avatar_url: string | null;
    }>();

  const meta = user.user_metadata ?? {};
  const role: SessionPayload["role"] =
    profile?.role === "teacher"
      ? "teacher"
      : profile?.role === "admin"
        ? "admin"
        : "student";

  return {
    userId: user.id,
    email: user.email ?? "",
    name: profile?.full_name ?? meta.full_name ?? meta.name ?? undefined,
    image: profile?.avatar_url ?? meta.avatar_url ?? undefined,
    role,
  };
}

export async function requireSession(
  client?: SupabaseClient
): Promise<SessionPayload> {
  const session = await getSession(client);
  if (!session) redirect("/login");
  return session;
}
