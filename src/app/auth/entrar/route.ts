import { NextResponse, type NextRequest } from "next/server";
import { lerToken } from "@/server/auth/token";
import { definirSessao } from "@/server/auth/sessao";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Destino do link de acesso: valida o token assinado e abre a sessão.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const conteudo = lerToken(searchParams.get("token") ?? undefined, "link");

  if (!conteudo) {
    return NextResponse.redirect(`${origin}/entrar?erro=link_invalido`);
  }

  await definirSessao(conteudo.email);

  const proximo = searchParams.get("proximo");
  const destino = proximo?.startsWith("/") ? proximo : "/curso";
  return NextResponse.redirect(`${origin}${destino}`);
}
