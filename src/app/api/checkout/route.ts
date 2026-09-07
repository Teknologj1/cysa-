import { NextResponse } from "next/server";
import { getPlano } from "@/content/planos";
import { getStripe, urlDoSite } from "@/lib/stripe";
import { usuarioAtual } from "@/server/auth/sessao";

export const runtime = "nodejs";

type Corpo = { planoId?: string; email?: string };

export async function POST(request: Request) {
  let corpo: Corpo;
  try {
    corpo = (await request.json()) as Corpo;
  } catch {
    return NextResponse.json({ erro: "Corpo inválido" }, { status: 400 });
  }

  const plano = corpo.planoId ? getPlano(corpo.planoId) : undefined;
  if (!plano) {
    return NextResponse.json({ erro: "Plano desconhecido" }, { status: 400 });
  }

  const stripe = getStripe();
  const priceId = process.env[plano.stripePriceEnv];

  // Se a pessoa já está logada, o checkout usa o e-mail da conta: a compra
  // nasce ligada a ela, sem depender de digitar o mesmo endereço de novo.
  const usuario = await usuarioAtual();
  const email = usuario?.email || corpo.email || undefined;

  // 1) Caminho preferido: Checkout Session criada no servidor.
  if (stripe && priceId) {
    try {
      const sessao = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        customer_email: email,
        allow_promotion_codes: true,
        locale: "pt-BR",
        success_url: `${urlDoSite()}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${urlDoSite()}/planos?cancelado=1`,
        metadata: { planoId: plano.id },
        subscription_data: { metadata: { planoId: plano.id } },
      });

      if (sessao.url) {
        return NextResponse.json({ modo: "stripe", url: sessao.url });
      }
      return NextResponse.json(
        { erro: "Stripe não retornou URL de checkout" },
        { status: 502 }
      );
    } catch (erro) {
      console.error("[checkout] falha ao criar sessão Stripe", erro);
      return NextResponse.json(
        { erro: "Não foi possível iniciar o pagamento" },
        { status: 502 }
      );
    }
  }

  // 2) Alternativa sem backend de pagamento: Payment Link do Stripe.
  const link = process.env[plano.paymentLinkEnv];
  if (link) {
    return NextResponse.json({ modo: "link", url: link });
  }

  // 3) Sem credenciais: modo demonstração, para avaliar a experiência.
  return NextResponse.json({ modo: "demo", planoId: plano.id });
}
