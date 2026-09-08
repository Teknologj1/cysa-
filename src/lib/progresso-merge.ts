/**
 * Mesclagem de progresso entre aparelhos.
 *
 * Dois dispositivos podem estudar offline e sincronizar depois, então a regra
 * precisa ser resolvida sem perder nada: o que foi concluído em qualquer lugar
 * permanece concluído.
 */

export type TentativaSincronizavel = {
  id: string;
  data: string;
  [chave: string]: unknown;
};

export type ProgressoSincronizavel = {
  licoesConcluidas: string[];
  tentativas: TentativaSincronizavel[];
  dataProva: string | null;
  /** ISO 8601 da última alteração local. Usado só para desempatar. */
  atualizadoEm: string;
};

/** Quantas tentativas de simulado guardamos por aluno. */
export const LIMITE_TENTATIVAS = 30;

function instante(iso: string | undefined): number {
  if (!iso) return 0;
  const valor = new Date(iso).getTime();
  return Number.isNaN(valor) ? 0 : valor;
}

export function mesclarProgresso(
  a: ProgressoSincronizavel,
  b: ProgressoSincronizavel
): ProgressoSincronizavel {
  // Conclusão é irreversível na mesclagem: união dos dois lados. Desmarcar uma
  // lição só vale no aparelho onde foi desmarcada, e é o preço de não perder
  // trabalho de quem estudou offline.
  const licoesConcluidas = [
    ...new Set([...a.licoesConcluidas, ...b.licoesConcluidas]),
  ];

  // Tentativas são imutáveis: basta unir por id e manter as mais recentes.
  const porId = new Map<string, TentativaSincronizavel>();
  for (const tentativa of [...a.tentativas, ...b.tentativas]) {
    if (tentativa?.id) porId.set(tentativa.id, tentativa);
  }
  const tentativas = [...porId.values()]
    .sort((x, y) => instante(y.data) - instante(x.data))
    .slice(0, LIMITE_TENTATIVAS);

  // A data da prova é um valor único: vence a alteração mais recente.
  const aEhMaisNovo = instante(a.atualizadoEm) >= instante(b.atualizadoEm);
  const maisNovo = aEhMaisNovo ? a : b;
  const maisAntigo = aEhMaisNovo ? b : a;
  const dataProva = maisNovo.dataProva ?? maisAntigo.dataProva;

  return {
    licoesConcluidas,
    tentativas,
    dataProva,
    atualizadoEm: new Date(
      Math.max(instante(a.atualizadoEm), instante(b.atualizadoEm))
    ).toISOString(),
  };
}
