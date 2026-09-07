import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  type AssinaturaSalva,
  assinaturaPorEmail,
  temAcesso,
} from "@/server/db/assinaturas";

export function autenticacaoConfigurada(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Cliente do Supabase ligado aos cookies da requisição. Usa a chave anônima:
 * ele enxerga apenas o que a sessão do próprio usuário permite.
 */
export async function clienteDaSessao(): Promise<SupabaseClient | null> {
  if (!autenticacaoConfigurada()) return null;

  const armazemDeCookies = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll() {
          return armazemDeCookies.getAll();
        },
        setAll(novos) {
          try {
            for (const { name, value, options } of novos) {
              armazemDeCookies.set(name, value, options);
            }
          } catch {
            // Server Components não podem gravar cookies; o middleware cuida
            // da renovação da sessão.
          }
        },
      },
    }
  );
}

export type UsuarioAtual = { id: string; email: string } | null;

export async function usuarioAtual(): Promise<UsuarioAtual> {
  const supabase = await clienteDaSessao();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;
  return { id: user.id, email: user.email };
}

export type AcessoDoUsuario = {
  /** false quando o Supabase ainda não está configurado no ambiente. */
  contasAtivas: boolean;
  usuario: UsuarioAtual;
  assinatura: AssinaturaSalva | null;
  liberado: boolean;
};

/**
 * Fonte da verdade do direito de acesso, avaliada no servidor.
 *
 * Sem Supabase configurado, `contasAtivas` volta false e as telas caem no
 * comportamento anterior, guardado no próprio aparelho — o app continua de pé
 * enquanto a infraestrutura de contas não existe.
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
