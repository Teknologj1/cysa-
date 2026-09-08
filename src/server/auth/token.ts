import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Tokens assinados por HMAC, usados no link de acesso e na sessão.
 *
 * Não guardamos nada: a assinatura criptográfica é o que prova que o token
 * saiu daqui e não foi adulterado. Isso dispensa banco para autenticar.
 */

const SEPARADOR = ".";

export function segredoConfigurado(): boolean {
  return Boolean(process.env.AUTH_SECRET);
}

function segredo(): string {
  const valor = process.env.AUTH_SECRET;
  if (!valor) throw new Error("AUTH_SECRET não definida");
  return valor;
}

function base64url(dado: string | Buffer): string {
  return Buffer.from(dado).toString("base64url");
}

function assinar(conteudo: string): string {
  return createHmac("sha256", segredo()).update(conteudo).digest("base64url");
}

export type Conteudo = {
  /** E-mail do dono do token, sempre em minúsculas. */
  email: string;
  /** Instante de expiração, em milissegundos. */
  exp: number;
  /** Diferencia link de acesso de cookie de sessão. */
  tipo: "link" | "sessao";
};

export function criarToken(
  email: string,
  tipo: Conteudo["tipo"],
  duracaoMs: number
): string {
  const conteudo: Conteudo = {
    email: email.trim().toLowerCase(),
    exp: Date.now() + duracaoMs,
    tipo,
  };

  const carga = base64url(JSON.stringify(conteudo));
  return `${carga}${SEPARADOR}${assinar(carga)}`;
}

/** Retorna o conteúdo quando o token é autêntico e está no prazo. */
export function lerToken(
  token: string | undefined,
  tipoEsperado: Conteudo["tipo"]
): Conteudo | null {
  if (!token || !segredoConfigurado()) return null;

  const [carga, assinatura] = token.split(SEPARADOR);
  if (!carga || !assinatura) return null;

  const esperada = Buffer.from(assinar(carga));
  const recebida = Buffer.from(assinatura);

  // Comparação em tempo constante: evita descobrir a assinatura byte a byte.
  if (esperada.length !== recebida.length) return null;
  if (!timingSafeEqual(esperada, recebida)) return null;

  try {
    const conteudo = JSON.parse(
      Buffer.from(carga, "base64url").toString("utf8")
    ) as Conteudo;

    if (conteudo.tipo !== tipoEsperado) return null;
    if (typeof conteudo.exp !== "number" || conteudo.exp < Date.now()) {
      return null;
    }
    if (!conteudo.email) return null;

    return conteudo;
  } catch {
    return null;
  }
}

/** O link de acesso vale por pouco tempo: é enviado e usado na hora. */
export const VALIDADE_LINK_MS = 30 * 60 * 1000;

/** A sessão dura o suficiente para não pedir login toda semana. */
export const VALIDADE_SESSAO_MS = 30 * 24 * 60 * 60 * 1000;

export const COOKIE_SESSAO = "cysa_sessao";
