import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createRequestHandlerClient } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const response = NextResponse.json({});
  const supabase = createRequestHandlerClient(request, response);
  const session = await getSession(supabase);
  if (!session) {
    return NextResponse.json({ session: null });
  }
  return NextResponse.json({ session });
}
