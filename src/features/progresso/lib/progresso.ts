import type { DominioId } from "@/content/types";

export const CHAVE_PROGRESSO = "cysa:progresso";

export type TentativaSimulado = {
  id: string;
  /** ISO 8601 */
  data: string;
  acertos: number;
  total: number;
  /** Acertos e total por domínio, para o relatório de desempenho. */
  porDominio: Partial<Record<DominioId, { acertos: number; total: number }>>;
  segundos: number;
};

export type Progresso = {
  licoesConcluidas: string[];
  tentativas: TentativaSimulado[];
  /** ISO 8601 da data-alvo da prova, definida pelo aluno. */
  dataProva: string | null;
};

export const PROGRESSO_VAZIO: Progresso = {
  licoesConcluidas: [],
  tentativas: [],
  dataProva: null,
};

export function lerProgresso(): Progresso {
  if (typeof window === "undefined") return PROGRESSO_VAZIO;
  try {
    const bruto = window.localStorage.getItem(CHAVE_PROGRESSO);
    if (!bruto) return PROGRESSO_VAZIO;
    const dado = JSON.parse(bruto) as Partial<Progresso>;
    return {
      licoesConcluidas: Array.isArray(dado.licoesConcluidas)
        ? dado.licoesConcluidas
        : [],
      tentativas: Array.isArray(dado.tentativas) ? dado.tentativas : [],
      dataProva: typeof dado.dataProva === "string" ? dado.dataProva : null,
    };
  } catch {
    return PROGRESSO_VAZIO;
  }
}

export function salvarProgresso(progresso: Progresso): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));
  window.dispatchEvent(new Event("cysa:progresso-alterado"));
}

export function percentual(concluidas: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((concluidas / total) * 100);
}
