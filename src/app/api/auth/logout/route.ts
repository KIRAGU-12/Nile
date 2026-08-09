import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRequestHandlerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  // After a full sign-out, land on the public welcome page ("/").
  const response = NextResponse.redirect(new URL("/", request.url), 303);
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
