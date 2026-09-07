import { NextResponse, type NextRequest } from "next/server";
import { clienteDaSessao } from "@/server/auth/sessao";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const supabase = await clienteDaSessao();
  if (supabase) await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
