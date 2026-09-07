import { NextResponse } from "next/server";
import { getStripe, urlDoSite } from "@/lib/stripe";
import { acessoDoUsuario } from "@/server/auth/sessao";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Portal do cliente do Stripe: trocar cartão, ver faturas e cancelar.
 * Só abre para quem está logado e tem um cliente registrado no Stripe.
 */
export async function POST() {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ erro: "Stripe não configurado" }, { status: 503 });
  }

  const acesso = await acessoDoUsuario();
  if (!acesso.usuario) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }

  const clienteStripe = acesso.assinatura?.stripeCustomerId;
  if (!clienteStripe) {
    return NextResponse.json(
      { erro: "Nenhuma assinatura encontrada para esta conta" },
      { status: 404 }
    );
  }

  try {
    const sessao = await stripe.billingPortal.sessions.create({
      customer: clienteStripe,
      return_url: `${urlDoSite()}/conta`,
      locale: "pt-BR",
    });
    return NextResponse.json({ url: sessao.url });
  } catch (erro) {
    console.error("[portal] falha ao abrir o portal do cliente", erro);
    return NextResponse.json(
      { erro: "Não foi possível abrir o portal" },
      { status: 502 }
    );
  }
}
