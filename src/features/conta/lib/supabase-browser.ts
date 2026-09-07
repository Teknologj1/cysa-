"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente do Supabase no navegador, com a chave anônima. Só é criado quando o
 * ambiente está configurado — caso contrário as telas de conta ficam ocultas.
 */
let cliente: SupabaseClient | null = null;

export function autenticacaoDisponivel(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getSupabaseNavegador(): SupabaseClient | null {
  if (!autenticacaoDisponivel()) return null;
  if (cliente) return cliente;

  cliente = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  return cliente;
}
