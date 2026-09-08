import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { autenticacaoConfigurada, definirSessao } from "@/server/auth/sessao";
import { limparCacheDeAssinatura } from "@/server/assinatura/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Confirma no Stripe se a sessão de checkout foi realmente paga.
 *
 * Quando há contas ativas, esta também é a hora de abrir a sessão: quem acabou
 * de pagar entra direto, sem precisar do link por e-mail. O e-mail só é
 * necessário depois, para voltar em outro aparelho.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ erro: "session_id ausente" }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ modo: "demo", pago: false });
  }

  try {
    const sessao = await stripe.checkout.sessions.retrieve(sessionId);
    const pago =
      sessao.payment_status === "paid" || sessao.status === "complete";
    const email = sessao.customer_details?.email ?? null;

    if (pago && email && autenticacaoConfigurada()) {
      // A compra acabou de acontecer: o cache anterior deste e-mail é velho.
      limparCacheDeAssinatura(email);
      await definirSessao(email);
    }

    return NextResponse.json({
      modo: "stripe",
      pago,
      planoId: (sessao.metadata?.planoId as string | undefined) ?? null,
      email,
      sessaoAberta: pago && Boolean(email) && autenticacaoConfigurada(),
    });
  } catch (erro) {
    console.error("[checkout/verificar] sessão inválida", erro);
    return NextResponse.json({ erro: "Sessão não encontrada" }, { status: 404 });
  }
}
