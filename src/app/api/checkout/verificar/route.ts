import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Confirma no Stripe se a sessão de checkout foi realmente paga.
 * O front-end só libera o acesso depois desta confirmação.
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

    return NextResponse.json({
      modo: "stripe",
      pago,
      planoId: (sessao.metadata?.planoId as string | undefined) ?? null,
      email: sessao.customer_details?.email ?? null,
    });
  } catch (erro) {
    console.error("[checkout/verificar] sessão inválida", erro);
    return NextResponse.json({ erro: "Sessão não encontrada" }, { status: 404 });
  }
}
