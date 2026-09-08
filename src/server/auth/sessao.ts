import { cookies } from "next/headers";
import {
  COOKIE_SESSAO,
  VALIDADE_SESSAO_MS,
  criarToken,
  lerToken,
  segredoConfigurado,
} from "./token";
import {
  type AssinaturaDoCliente,
  assinaturaPorEmail,
  temAcesso,
} from "@/server/assinatura/stripe";

/**
 * Contas só existem quando há segredo para assinar a sessão e Stripe para
 * consultar a assinatura. Sem isso, o app cai no modo anterior, com o acesso
 * registrado apenas no aparelho.
 */
export function autenticacaoConfigurada(): boolean {
  return segredoConfigurado() && Boolean(process.env.STRIPE_SECRET_KEY);
}

export type UsuarioAtual = { email: string } | null;

export async function usuarioAtual(): Promise<UsuarioAtual> {
  if (!autenticacaoConfigurada()) return null;

  const armazem = await cookies();
  const conteudo = lerToken(armazem.get(COOKIE_SESSAO)?.value, "sessao");
  return conteudo ? { email: conteudo.email } : null;
}

/** Grava a sessão. Só pode ser chamada de Route Handler ou Server Action. */
export async function definirSessao(email: string): Promise<void> {
  const armazem = await cookies();

  armazem.set(COOKIE_SESSAO, criarToken(email, "sessao", VALIDADE_SESSAO_MS), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(VALIDADE_SESSAO_MS / 1000),
  });
}

export async function limparSessao(): Promise<void> {
  const armazem = await cookies();
  armazem.delete(COOKIE_SESSAO);
}

export type AcessoDoUsuario = {
  /** false quando ainda não existem contas de verdade neste ambiente. */
  contasAtivas: boolean;
  usuario: UsuarioAtual;
  assinatura: AssinaturaDoCliente | null;
  liberado: boolean;
};

/**
 * Fonte da verdade do direito de acesso, avaliada no servidor a cada página
 * protegida. A assinatura vem do próprio Stripe.
 */
export async function acessoDoUsuario(): Promise<AcessoDoUsuario> {
  if (!autenticacaoConfigurada()) {
    return {
      contasAtivas: false,
      usuario: null,
      assinatura: null,
      liberado: false,
    };
  }

  const usuario = await usuarioAtual();
  if (!usuario) {
    return {
      contasAtivas: true,
      usuario: null,
      assinatura: null,
      liberado: false,
    };
  }

  const assinatura = await assinaturaPorEmail(usuario.email);
  return {
    contasAtivas: true,
    usuario,
    assinatura,
    liberado: temAcesso(assinatura),
  };
}
