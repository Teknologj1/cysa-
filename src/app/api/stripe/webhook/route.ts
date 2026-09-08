import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { limparCacheDeAssinatura } from "@/server/assinatura/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Webhook do Stripe.
 *
 * O direito de acesso é consultado no próprio Stripe a cada verificação, então
 * não há nada para gravar aqui. O papel deste endpoint é derrubar o cache de
 * curta duração assim que algo muda — sem ele, uma compra ou um cancelamento
 * levariam alguns minutos para refletir.
 */

async function emailDoEvento(
  stripe: Stripe,
  evento: Stripe.Event
): Promise<string | null> {
  const objeto = evento.data.object as
    | Stripe.Checkout.Session
    | Stripe.Subscription
    | Stripe.Invoice;

  // O checkout já traz o e-mail informado pelo cliente.
  if ("customer_details" in objeto && objeto.customer_details?.email) {
    return objeto.customer_details.email;
  }

  const cliente = (objeto as Stripe.Subscription).customer;
  if (!cliente) return null;

  if (typeof cliente !== "string") {
    return cliente.deleted ? null : (cliente.email ?? null);
  }

  try {
    const carregado = await stripe.customers.retrieve(cliente);
    return carregado.deleted ? null : (carregado.email ?? null);
  } catch (erro) {
    console.error("[stripe] falha ao carregar o cliente", erro);
    return null;
  }
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const segredo = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !segredo) {
    return NextResponse.json(
      { erro: "Webhook não configurado" },
      { status: 503 }
    );
  }

  const assinaturaDoCabecalho = request.headers.get("stripe-signature");
  if (!assinaturaDoCabecalho) {
    return NextResponse.json({ erro: "Assinatura ausente" }, { status: 400 });
  }

  const corpoBruto = await request.text();

  let evento: Stripe.Event;
  try {
    evento = stripe.webhooks.constructEvent(
      corpoBruto,
      assinaturaDoCabecalho,
      segredo
    );
  } catch (erro) {
    console.error("[stripe] falha ao validar webhook", erro);
    return NextResponse.json({ erro: "Assinatura inválida" }, { status: 400 });
  }

  switch (evento.type) {
    case "checkout.session.completed":
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
    case "invoice.payment_failed": {
      const email = await emailDoEvento(stripe, evento);
      if (email) {
        limparCacheDeAssinatura(email);
        console.log(`[stripe] ${evento.type} — acesso reavaliado para ${email}`);
      } else {
        console.warn(`[stripe] ${evento.type} sem e-mail identificável`);
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ recebido: true });
}
