import type { DominioId, Questao } from "../types";
import { BANCO_GERAL } from "./banco-geral";
import { QUESTOES_S01 } from "./s01";
import { QUESTOES_S02 } from "./s02";
import { QUESTOES_S03 } from "./s03";
import { QUESTOES_S04 } from "./s04";

export const QUESTOES: Questao[] = [
  ...QUESTOES_S01,
  ...QUESTOES_S02,
  ...QUESTOES_S03,
  ...QUESTOES_S04,
  ...BANCO_GERAL,
];

export const QUESTOES_GRATIS = QUESTOES.filter((q) => q.gratis);

export function questoesPorDominio(dominio: DominioId): Questao[] {
  return QUESTOES.filter((q) => q.dominio === dominio);
}

export function questoesPorSecao(secaoId: string): Questao[] {
  return QUESTOES.filter((q) => q.secaoId === secaoId);
}

/** Embaralha uma cópia do array (Fisher-Yates). */
export function embaralhar<T>(itens: T[]): T[] {
  const copia = [...itens];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
