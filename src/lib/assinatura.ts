import type { PlanId } from "@/content/plans";

export const CHAVE_ASSINATURA = "cysa:assinatura";

export type OrigemAssinatura = "stripe" | "demo";

export type Assinatura = {
  ativa: boolean;
  planoId: PlanId | null;
  email: string | null;
  origem: OrigemAssinatura;
  /** ISO 8601 */
  inicio: string;
  /** ISO 8601 — null significa renovação automática sem fim previsto. */
  fim: string | null;
  stripeSessionId?: string;
};

export const SEM_ASSINATURA: Assinatura = {
  ativa: false,
  planoId: null,
  email: null,
  origem: "demo",
  inicio: "",
  fim: null,
};

function ehAssinatura(valor: unknown): valor is Assinatura {
  if (!valor || typeof valor !== "object") return false;
  const v = valor as Record<string, unknown>;
  return typeof v.ativa === "boolean" && "planoId" in v;
}

export function lerAssinatura(): Assinatura {
  if (typeof window === "undefined") return SEM_ASSINATURA;
  try {
    const bruto = window.localStorage.getItem(CHAVE_ASSINATURA);
    if (!bruto) return SEM_ASSINATURA;
    const dado = JSON.parse(bruto) as unknown;
    if (!ehAssinatura(dado)) return SEM_ASSINATURA;
    // Expiração local: o backend continua sendo a fonte da verdade.
    if (dado.fim && new Date(dado.fim).getTime() < Date.now()) {
      return { ...dado, ativa: false };
    }
    return dado;
  } catch {
    return SEM_ASSINATURA;
  }
}

export function salvarAssinatura(assinatura: Assinatura): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CHAVE_ASSINATURA, JSON.stringify(assinatura));
  window.dispatchEvent(new Event("cysa:assinatura-alterada"));
}

export function limparAssinatura(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CHAVE_ASSINATURA);
  window.dispatchEvent(new Event("cysa:assinatura-alterada"));
}

/** Data de término prevista a partir do plano contratado. */
export function calcularFim(planoId: PlanId, inicio = new Date()): string {
  const fim = new Date(inicio);
  if (planoId === "mensal") fim.setMonth(fim.getMonth() + 1);
  if (planoId === "trimestral") fim.setMonth(fim.getMonth() + 3);
  if (planoId === "anual") fim.setFullYear(fim.getFullYear() + 1);
  return fim.toISOString();
}

export function criarAssinatura(
  planoId: PlanId,
  origem: OrigemAssinatura,
  email: string | null,
  stripeSessionId?: string
): Assinatura {
  const inicio = new Date();
  return {
    ativa: true,
    planoId,
    email,
    origem,
    inicio: inicio.toISOString(),
    fim: calcularFim(planoId, inicio),
    stripeSessionId,
  };
}
