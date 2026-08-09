import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

export function createSupabaseAdmin() {
  if (!env.supabaseUrl || !env.supabaseSecret) {
    throw new Error("Supabase URL or service role key is not configured");
  }
  return createClient(env.supabaseUrl, env.supabaseSecret, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    db: { schema: "public" },
  });
}
