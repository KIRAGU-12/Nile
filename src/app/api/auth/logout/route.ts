import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRequestHandlerClient } from "@/lib/supabase/server";
import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  // After a full sign-out, land on the public welcome page ("/").
  // If NEXT_PUBLIC_SITE_URL is configured (the real deployed site), always go
  // there so logout never ends up on a local/tunnel host. Otherwise stay on the
  // same host the user is already on.
  const siteUrl = env.siteUrl?.trim();
  const response = NextResponse.redirect(
    new URL("/", siteUrl || request.url),
    303
  );
  try {
    const supabase = createRequestHandlerClient(request, response);
    await supabase.auth.signOut();
  } catch {
    // Ignore — the forced cookie clearing below still logs the user out even if
    // revoking the session hiccups (e.g. an invalid key on Render).
  }
  // Belt-and-braces: always wipe any Supabase auth cookies so the user is fully
  // signed out even when signOut() fails (e.g. stale/wrong API key on Render,
  // which otherwise leaves the session cookie behind and keeps the user logged in).
  for (const { name } of request.cookies.getAll()) {
    const lower = name.toLowerCase();
    if (lower.startsWith("sb-") && lower.endsWith("-auth-token")) {
      response.cookies.set(name, "", { maxAge: 0, path: "/" });
    }
  }
  return response;
}

export async function GET(request: NextRequest) {
  return POST(request);
}
