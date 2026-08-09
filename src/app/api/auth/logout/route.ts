import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRequestHandlerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  const supabase = createRequestHandlerClient(request, response);
  try {
    await supabase.auth.signOut();
  } catch {
    // Always send the user to /login even if revoking the session hiccups
    // (e.g. an invalid key) — they should never be stuck on a broken logout.
  }
  return response;
}

export async function GET(request: NextRequest) {
  return POST(request);
}
