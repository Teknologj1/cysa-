import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente com a service role, usado apenas no servidor. Ele atravessa a RLS,
 * então nunca deve ser exposto ao navegador nem importado por componente de
 * cliente.
 */
let cliente: SupabaseClient | null = null;

export function supabaseConfigurado(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!supabaseConfigurado()) return null;
  if (cliente) return cliente;

  cliente = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
  return cliente;
}
