import { NextResponse, type NextRequest } from "next/server";
import { clienteDaSessao } from "@/server/auth/sessao";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Destino do link mágico. Troca o código temporário por uma sessão gravada em
 * cookie e devolve o aluno para onde ele estava indo.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const codigo = searchParams.get("code");
  const proximo = searchParams.get("proximo") || "/curso";

  if (!codigo) {
    return NextResponse.redirect(`${origin}/entrar?erro=link_invalido`);
  }

  const supabase = await clienteDaSessao();
  if (!supabase) {
    return NextResponse.redirect(`${origin}/entrar`);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(codigo);
  if (error) {
    console.error("[auth] falha ao trocar o código por sessão", error.message);
    return NextResponse.redirect(`${origin}/entrar?erro=link_expirado`);
  }

  // `proximo` vem da URL: só aceitamos caminhos internos.
  const destino = proximo.startsWith("/") ? proximo : "/curso";
  return NextResponse.redirect(`${origin}${destino}`);
}
