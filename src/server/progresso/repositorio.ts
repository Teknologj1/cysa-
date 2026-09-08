import { Redis } from "@upstash/redis";
import type { ProgressoSincronizavel } from "@/lib/progresso-merge";

/**
 * Progresso do aluno guardado por e-mail no Upstash Redis.
 *
 * É o único dado do produto que não vive no Stripe: lições concluídas,
 * simulados e data-alvo são nossos, e sem armazenamento eles ficariam presos
 * ao aparelho.
 */

let cliente: Redis | null = null;

export function sincronizacaoConfigurada(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

function getRedis(): Redis | null {
  if (!sincronizacaoConfigurada()) return null;
  if (cliente) return cliente;

  cliente = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL as string,
    token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
  });
  return cliente;
}

function chave(email: string): string {
  return `progresso:${email.trim().toLowerCase()}`;
}

/** Um ano sem acesso e o registro expira sozinho. */
const VALIDADE_SEGUNDOS = 365 * 24 * 60 * 60;

export async function lerProgressoRemoto(
  email: string
): Promise<ProgressoSincronizavel | null> {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const dado = await redis.get<ProgressoSincronizavel>(chave(email));
    if (!dado || !Array.isArray(dado.licoesConcluidas)) return null;
    return dado;
  } catch (erro) {
    console.error("[progresso] falha ao ler", erro);
    return null;
  }
}

export async function salvarProgressoRemoto(
  email: string,
  progresso: ProgressoSincronizavel
): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;

  try {
    await redis.set(chave(email), progresso, { ex: VALIDADE_SEGUNDOS });
    return true;
  } catch (erro) {
    console.error("[progresso] falha ao salvar", erro);
    return false;
  }
}
