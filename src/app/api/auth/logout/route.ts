import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRequestHandlerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  const supabase = createRequestHandlerClient(request, response);
  await supabase.auth.signOut();
  return response;
}

export async function GET(request: NextRequest) {
  return POST(request);
}
