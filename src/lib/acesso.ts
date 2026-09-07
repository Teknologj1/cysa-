/**
 * Decisão de entrega do conteúdo pago, isolada em função pura para poder ser
 * testada sem servidor, banco ou rede.
 */

export type ContextoDeAcesso = {
  /** true quando o Supabase está configurado e há contas de verdade. */
  contasAtivas: boolean;
  /** Assinatura ativa confirmada no banco, para o usuário da sessão. */
  liberado: boolean;
  /** A lição é amostra gratuita. */
  gratis: boolean;
};

/**
 * Com contas ativas, o servidor só entrega o corpo da lição a quem tem direito.
 * Sem elas, a verificação continua no cliente (comportamento anterior), então o
 * conteúdo é entregue e a interface decide o que mostrar.
 */
export function podeEntregarConteudo(contexto: ContextoDeAcesso): boolean {
  if (!contexto.contasAtivas) return true;
  return contexto.gratis || contexto.liberado;
}

/** O que a interface deve mostrar: conteúdo ou paywall. */
export function podeVerConteudo(contexto: ContextoDeAcesso): boolean {
  return contexto.gratis || contexto.liberado;
}
