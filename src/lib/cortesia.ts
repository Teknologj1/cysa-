/**
 * Acesso de cortesia: e-mails que liberam o conteúdo pago sem passar pelo
 * Stripe. Serve para a equipe, para revisão de conteúdo e para acesso de
 * demonstração.
 *
 * A lista vive na variável de ambiente `ACESSO_CORTESIA`, lida apenas no
 * servidor — ela nunca é enviada ao navegador. Só o booleano resultante sai
 * daqui para a interface.
 */

/** Separadores aceitos na lista: vírgula, ponto e vírgula ou espaço. */
const SEPARADORES = /[,;\s]+/;

export function normalizarEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Quebra a variável de ambiente em e-mails normalizados, ignorando vazios. */
export function listaDeCortesia(bruto: string | undefined): string[] {
  if (!bruto) return [];
  return bruto
    .split(SEPARADORES)
    .map(normalizarEmail)
    .filter((email) => email.length > 0);
}

/**
 * `true` quando o e-mail está na lista de cortesia. Comparação exata sobre o
 * e-mail normalizado — sem curinga e sem casar por domínio, para que um erro
 * de digitação na variável não libere mais gente do que o pretendido.
 */
export function temCortesia(
  email: string | null | undefined,
  bruto: string | undefined
): boolean {
  if (!email) return false;
  const alvo = normalizarEmail(email);
  if (!alvo) return false;
  return listaDeCortesia(bruto).includes(alvo);
}
