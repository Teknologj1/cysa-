import { NextResponse, type NextRequest } from "next/server";
import { limparSessao } from "@/server/auth/sessao";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  await limparSessao();
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
