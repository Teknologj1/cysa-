import type Stripe from "stripe";
import type { PlanId } from "@/content/planos";
import { getStripe } from "@/lib/stripe";

export type StatusAssinatura =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid"
  | "paused";

export type AssinaturaDoCliente = {
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  planoId: PlanId | null;
  status: StatusAssinatura;
  /** ISO 8601 do fim do período pago. */
  periodoFim: string | null;
  criadaEm: string;
  cancelaNoFim: boolean;
};

/** Status que dão acesso ao conteúdo pago. */
const STATUS_COM_ACESSO: StatusAssinatura[] = ["active", "trialing", "past_due"];

export function temAcesso(assinatura: AssinaturaDoCliente | null): boolean {
  if (!assinatura) return false;
  if (STATUS_COM_ACESSO.includes(assinatura.status)) return true;

  // Cancelada, mas o período pago ainda não acabou: o acesso continua.
  if (assinatura.periodoFim) {
    return new Date(assinatura.periodoFim).getTime() > Date.now();
  }
  return false;
}

/**
 * Fim do período pago. Na versão atual da API o campo vive no item da
 * assinatura, não na assinatura.
 */
function periodoFimDe(assinatura: Stripe.Subscription): string | null {
  const item = assinatura.items?.data?.[0];
  if (!item?.current_period_end) return null;
  return new Date(item.current_period_end * 1000).toISOString();
}

function converter(assinatura: Stripe.Subscription): AssinaturaDoCliente {
  return {
    stripeCustomerId:
      typeof assinatura.customer === "string"
        ? assinatura.customer
        : assinatura.customer.id,
    stripeSubscriptionId: assinatura.id,
    planoId: (assinatura.metadata?.planoId as PlanId | undefined) ?? null,
    status: assinatura.status as StatusAssinatura,
    periodoFim: periodoFimDe(assinatura),
    criadaEm: new Date(assinatura.created * 1000).toISOString(),
    cancelaNoFim: assinatura.cancel_at_period_end,
  };
}

/** A que dá acesso vem primeiro; entre iguais, a mais recente. */
function melhor(assinaturas: AssinaturaDoCliente[]): AssinaturaDoCliente | null {
  if (assinaturas.length === 0) return null;

  return [...assinaturas].sort((a, b) => {
    const acessoA = temAcesso(a) ? 1 : 0;
    const acessoB = temAcesso(b) ? 1 : 0;
    if (acessoA !== acessoB) return acessoB - acessoA;
    return new Date(b.criadaEm).getTime() - new Date(a.criadaEm).getTime();
  })[0];
}

/**
 * Cache curto por instância. Evita uma ida ao Stripe a cada página protegida
 * sem guardar estado de assinatura em lugar nenhum — na pior das hipóteses o
 * acesso demora alguns minutos para refletir uma mudança.
 */
const VALIDADE_CACHE_MS = 5 * 60 * 1000;
const cache = new Map<string, { em: number; valor: AssinaturaDoCliente | null }>();

export function limparCacheDeAssinatura(email?: string): void {
  if (email) cache.delete(email.trim().toLowerCase());
  else cache.clear();
}

/**
 * Assinatura do e-mail, consultada no próprio Stripe — ele é a fonte da
 * verdade, então não existe espelho para ficar desatualizado.
 */
export async function assinaturaPorEmail(
  email: string
): Promise<AssinaturaDoCliente | null> {
  const stripe = getStripe();
  if (!stripe) return null;

  const chave = email.trim().toLowerCase();
  const emCache = cache.get(chave);
  if (emCache && Date.now() - emCache.em < VALIDADE_CACHE_MS) {
    return emCache.valor;
  }

  try {
    const clientes = await stripe.customers.list({ email: chave, limit: 5 });

    const encontradas: AssinaturaDoCliente[] = [];
    for (const cliente of clientes.data) {
      const assinaturas = await stripe.subscriptions.list({
        customer: cliente.id,
        status: "all",
        limit: 10,
      });
      encontradas.push(...assinaturas.data.map(converter));
    }

    const escolhida = melhor(encontradas);
    cache.set(chave, { em: Date.now(), valor: escolhida });
    return escolhida;
  } catch (erro) {
    console.error("[assinatura] falha ao consultar o Stripe", erro);
    // Não gravamos o erro em cache: a próxima requisição tenta de novo.
    return null;
  }
}
