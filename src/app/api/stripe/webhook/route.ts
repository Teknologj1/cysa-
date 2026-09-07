import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Webhook do Stripe. Hoje registra os eventos do ciclo de vida da
 * assinatura; é o ponto de extensão para persistir o acesso quando
 * houver banco de dados.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const segredo = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !segredo) {
    return NextResponse.json(
      { erro: "Webhook não configurado" },
      { status: 503 }
    );
  }

  const assinatura = request.headers.get("stripe-signature");
  if (!assinatura) {
    return NextResponse.json({ erro: "Assinatura ausente" }, { status: 400 });
  }

  const corpoBruto = await request.text();

  try {
    const evento = stripe.webhooks.constructEvent(
      corpoBruto,
      assinatura,
      segredo
    );

    switch (evento.type) {
      case "checkout.session.completed":
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
      case "invoice.payment_failed":
        console.log(`[stripe] evento recebido: ${evento.type}`, evento.id);
        break;
      default:
        break;
    }

    return NextResponse.json({ recebido: true });
  } catch (erro) {
    console.error("[stripe] falha ao validar webhook", erro);
    return NextResponse.json({ erro: "Assinatura inválida" }, { status: 400 });
  }
}
