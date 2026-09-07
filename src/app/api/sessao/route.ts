import { NextResponse } from "next/server";
import { acessoDoUsuario } from "@/server/auth/sessao";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Estado da sessão para a interface. A decisão de acesso continua sendo
 * tomada no servidor, a cada página protegida — isto aqui só evita que a
 * interface mostre cadeado para quem já pagou (ou o contrário).
 */
export async function GET() {
  const acesso = await acessoDoUsuario();

  return NextResponse.json(
    {
      contasAtivas: acesso.contasAtivas,
      logado: Boolean(acesso.usuario),
      email: acesso.usuario?.email ?? null,
      liberado: acesso.liberado,
      assinatura: acesso.assinatura
        ? {
            planoId: acesso.assinatura.planoId,
            status: acesso.assinatura.status,
            periodoFim: acesso.assinatura.periodoFim,
          }
        : null,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
