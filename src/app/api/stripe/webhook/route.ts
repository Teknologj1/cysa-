import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { supabaseConfigurado } from "@/server/db/supabase";
import {
  type StatusAssinatura,
  atualizarPorSubscriptionId,
  salvarAssinatura,
} from "@/server/db/assinaturas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Fim do período pago. A partir da versão atual da API, o campo vive no item
 * da assinatura, não na assinatura em si.
 */
function periodoFimDe(assinatura: Stripe.Subscription): string | null {
  const item = assinatura.items?.data?.[0];
  if (!item?.current_period_end) return null;
  return new Date(item.current_period_end * 1000).toISOString();
}

function planoDe(assinatura: Stripe.Subscription): string | null {
  return (assinatura.metadata?.planoId as string | undefined) ?? null;
}

/** O e-mail é a chave que liga a compra à conta do aluno. */
async function emailDe(
  stripe: Stripe,
  assinatura: Stripe.Subscription
): Promise<string | null> {
  const cliente = assinatura.customer;

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

async function registrarAssinatura(
  stripe: Stripe,
  assinatura: Stripe.Subscription,
  checkoutSessionId?: string
) {
  const email = await emailDe(stripe, assinatura);
  if (!email) {
    console.error(
      `[stripe] assinatura ${assinatura.id} sem e-mail de cliente — acesso não registrado`
    );
    return;
  }

  await salvarAssinatura({
    email,
    stripeCustomerId:
      typeof assinatura.customer === "string"
        ? assinatura.customer
        : assinatura.customer.id,
    stripeSubscriptionId: assinatura.id,
    stripeCheckoutSessionId: checkoutSessionId ?? null,
    planoId: planoDe(assinatura),
    status: assinatura.status as StatusAssinatura,
    periodoFim: periodoFimDe(assinatura),
  });

  console.log(
    `[stripe] acesso registrado para ${email} (${assinatura.status})`
  );
}

/**
 * Webhook do Stripe — fonte da verdade do direito de acesso.
 *
 * Os eventos são idempotentes: a gravação usa o ID da assinatura como chave,
 * então reentregas não duplicam registro.
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

  // Sem banco configurado, apenas registramos: o app segue no modo local.
  if (!supabaseConfigurado()) {
    console.log(
      `[stripe] evento ${evento.type} recebido; banco não configurado, nada gravado`
    );
    return NextResponse.json({ recebido: true, persistido: false });
  }

  try {
    switch (evento.type) {
      case "checkout.session.completed": {
        const sessao = evento.data.object;
        if (!sessao.subscription) break;

        const idAssinatura =
          typeof sessao.subscription === "string"
            ? sessao.subscription
            : sessao.subscription.id;

        const assinatura = await stripe.subscriptions.retrieve(idAssinatura);
        await registrarAssinatura(stripe, assinatura, sessao.id);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await registrarAssinatura(stripe, evento.data.object);
        break;
      }

      case "customer.subscription.deleted": {
        const assinatura = evento.data.object;
        await atualizarPorSubscriptionId(assinatura.id, {
          status: "canceled",
          periodoFim: periodoFimDe(assinatura),
        });
        console.log(`[stripe] assinatura ${assinatura.id} encerrada`);
        break;
      }

      case "invoice.payment_failed": {
        // O status novo chega em customer.subscription.updated; aqui só o registro.
        console.warn(`[stripe] pagamento recusado: ${evento.id}`);
        break;
      }

      default:
        break;
    }
  } catch (erro) {
    console.error(`[stripe] falha ao processar ${evento.type}`, erro);
    // 500 faz o Stripe reentregar o evento, o que é o comportamento desejado.
    return NextResponse.json(
      { erro: "Falha ao processar o evento" },
      { status: 500 }
    );
  }

  return NextResponse.json({ recebido: true, persistido: true });
}
