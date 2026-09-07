import type { PlanId } from "@/content/planos";
import { getSupabaseAdmin } from "./supabase";

export type StatusAssinatura =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid"
  | "paused";

export type AssinaturaSalva = {
  id: string;
  email: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  planoId: PlanId | null;
  status: StatusAssinatura;
  periodoFim: string | null;
  criadaEm: string;
};

/** Status que dão acesso ao conteúdo pago. */
const STATUS_COM_ACESSO: StatusAssinatura[] = ["active", "trialing", "past_due"];

type LinhaAssinatura = {
  id: string;
  email: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plano_id: string | null;
  status: string;
  periodo_fim: string | null;
  criada_em: string;
};

function paraDominio(linha: LinhaAssinatura): AssinaturaSalva {
  return {
    id: linha.id,
    email: linha.email,
    stripeCustomerId: linha.stripe_customer_id,
    stripeSubscriptionId: linha.stripe_subscription_id,
    planoId: (linha.plano_id as PlanId | null) ?? null,
    status: linha.status as StatusAssinatura,
    periodoFim: linha.periodo_fim,
    criadaEm: linha.criada_em,
  };
}

export function temAcesso(assinatura: AssinaturaSalva | null): boolean {
  if (!assinatura) return false;
  if (STATUS_COM_ACESSO.includes(assinatura.status)) return true;

  // Cancelou mas o período pago ainda não acabou: o acesso continua.
  if (assinatura.periodoFim) {
    return new Date(assinatura.periodoFim).getTime() > Date.now();
  }
  return false;
}

export type DadosAssinatura = {
  email: string;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeCheckoutSessionId?: string | null;
  planoId?: string | null;
  status: StatusAssinatura;
  periodoFim?: string | null;
};

/**
 * Grava ou atualiza a assinatura. A chave é o ID da assinatura no Stripe, o
 * que torna a operação idempotente — webhooks reentregues não duplicam linha.
 */
export async function salvarAssinatura(
  dados: DadosAssinatura
): Promise<AssinaturaSalva | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const registro = {
    email: dados.email,
    stripe_customer_id: dados.stripeCustomerId ?? null,
    stripe_subscription_id: dados.stripeSubscriptionId ?? null,
    stripe_checkout_session_id: dados.stripeCheckoutSessionId ?? null,
    plano_id: dados.planoId ?? null,
    status: dados.status,
    periodo_fim: dados.periodoFim ?? null,
  };

  const consulta = dados.stripeSubscriptionId
    ? supabase
        .from("assinaturas")
        .upsert(registro, { onConflict: "stripe_subscription_id" })
        .select()
        .single()
    : supabase.from("assinaturas").insert(registro).select().single();

  const { data, error } = await consulta;

  if (error) {
    console.error("[assinaturas] falha ao salvar", error.message);
    return null;
  }
  return paraDominio(data as LinhaAssinatura);
}

/** Atualiza apenas o que mudou em um evento de ciclo de vida. */
export async function atualizarPorSubscriptionId(
  stripeSubscriptionId: string,
  mudancas: { status: StatusAssinatura; periodoFim?: string | null }
): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const { error } = await supabase
    .from("assinaturas")
    .update({
      status: mudancas.status,
      periodo_fim: mudancas.periodoFim ?? null,
    })
    .eq("stripe_subscription_id", stripeSubscriptionId);

  if (error) {
    console.error("[assinaturas] falha ao atualizar", error.message);
  }
}

/** Assinatura mais recente do e-mail, independente do status. */
export async function assinaturaPorEmail(
  email: string
): Promise<AssinaturaSalva | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("assinaturas")
    .select("*")
    .eq("email", email.trim().toLowerCase())
    .order("criada_em", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[assinaturas] falha ao consultar", error.message);
    return null;
  }
  return data ? paraDominio(data as LinhaAssinatura) : null;
}
