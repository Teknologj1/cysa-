/**
 * Liberação progressiva das seções.
 *
 * Regra do curso: nos primeiros 7 dias de assinatura o aluno estuda as seções
 * 1 e 2. A partir do 8º dia todas as demais abrem. A intenção é pedagógica —
 * fundamentos antes de conteúdo técnico — e evita que alguém assine, baixe
 * tudo num fim de semana e cancele.
 *
 * O relógio começa na criação da assinatura no Stripe, que já é a fonte da
 * verdade do acesso. Nada disso exige banco.
 */

/** Dias de assinatura exigidos por uma seção que não abre na entrada. */
export const DIAS_DE_CARENCIA = 7;

const UM_DIA_MS = 24 * 60 * 60 * 1000;

/**
 * Dias **completos** desde o início da assinatura. `null` quando não há
 * assinatura ou a data é inválida.
 *
 * Dia da compra = 0. O 8º dia de acesso corresponde a 7 dias completos, que é
 * exatamente o valor de `DIAS_DE_CARENCIA`.
 */
export function diasDeAssinatura(
  inicio: string | null | undefined,
  agora: number = Date.now()
): number | null {
  if (!inicio) return null;

  const instante = new Date(inicio).getTime();
  if (!Number.isFinite(instante)) return null;

  const dias = Math.floor((agora - instante) / UM_DIA_MS);
  // Data no futuro (relógio fora de sincronia) conta como o primeiro dia.
  return dias < 0 ? 0 : dias;
}

/**
 * Dias exigidos pela seção. A ausência do campo significa carência — assim uma
 * seção nova nunca abre antes do prazo por esquecimento de quem a escreveu.
 */
export function diasParaLiberarSecao(secao: {
  diasParaLiberar?: number;
}): number {
  return secao.diasParaLiberar ?? DIAS_DE_CARENCIA;
}

export type ContextoDeLiberacao = {
  /** Dias completos de assinatura para a seção abrir. 0 = abre na entrada. */
  diasParaLiberar: number;
  /** Dias completos desde o início da assinatura; null sem assinatura. */
  diasDecorridos: number | null;
  /** Cortesia (equipe, revisão) entra sem carência. */
  cortesia: boolean;
};

export function secaoLiberada(contexto: ContextoDeLiberacao): boolean {
  if (contexto.cortesia) return true;
  if (contexto.diasParaLiberar <= 0) return true;
  if (contexto.diasDecorridos === null) return false;
  return contexto.diasDecorridos >= contexto.diasParaLiberar;
}

/** Quantos dias ainda faltam. 0 quando a seção já está liberada. */
export function diasAteLiberar(contexto: ContextoDeLiberacao): number {
  if (secaoLiberada(contexto)) return 0;
  if (contexto.diasDecorridos === null) return contexto.diasParaLiberar;
  return Math.max(0, contexto.diasParaLiberar - contexto.diasDecorridos);
}

/** Texto curto para o selo da interface. */
export function rotuloDeLiberacao(dias: number): string {
  if (dias <= 0) return "liberada";
  if (dias === 1) return "abre amanhã";
  return `abre em ${dias} dias`;
}
