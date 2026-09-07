import { QUESTOES, embaralhar } from "@/content/questoes";
import { distribuirPorPeso } from "@/content/dominios";
import type { DominioId, Questao } from "@/content/types";
import type { TentativaSimulado } from "@/features/progresso/lib/progresso";

export type FiltroSimulado =
  | { tipo: "todos" }
  | { tipo: "dominio"; dominio: DominioId }
  | { tipo: "secao"; secaoId: string }
  | { tipo: "modoProva" };

/** Questões disponíveis conforme o acesso do aluno. */
export function questoesDisponiveis(assinante: boolean): Questao[] {
  return assinante ? QUESTOES : QUESTOES.filter((q) => q.gratis);
}

export function aplicarFiltro(
  questoes: Questao[],
  filtro: FiltroSimulado
): Questao[] {
  switch (filtro.tipo) {
    case "dominio":
      return questoes.filter((q) => q.dominio === filtro.dominio);
    case "secao":
      return questoes.filter((q) => q.secaoId === filtro.secaoId);
    default:
      return questoes;
  }
}

/**
 * Sorteia as questões do simulado. No modo prova a distribuição respeita o
 * peso oficial de cada domínio; nos demais, sorteia dentro do filtro.
 */
export function sortearQuestoes(
  questoes: Questao[],
  filtro: FiltroSimulado,
  quantidade: number
): Questao[] {
  if (filtro.tipo !== "modoProva") {
    return embaralhar(questoes).slice(0, Math.min(quantidade, questoes.length));
  }

  const cotas = distribuirPorPeso(quantidade);
  const selecionadas: Questao[] = [];

  for (const [dominio, cota] of Object.entries(cotas)) {
    const doDominio = embaralhar(
      questoes.filter((q) => q.dominio === (dominio as DominioId))
    );
    selecionadas.push(...doDominio.slice(0, cota));
  }

  // Completa com o que sobrou caso algum domínio ainda não tenha questões suficientes.
  if (selecionadas.length < Math.min(quantidade, questoes.length)) {
    const restantes = embaralhar(
      questoes.filter((q) => !selecionadas.includes(q))
    );
    selecionadas.push(
      ...restantes.slice(0, Math.min(quantidade, questoes.length) - selecionadas.length)
    );
  }

  return embaralhar(selecionadas);
}

export function calcularResultado(
  questoes: Questao[],
  respostas: Record<string, number>,
  segundos: number
): TentativaSimulado {
  const porDominio: TentativaSimulado["porDominio"] = {};
  let acertos = 0;

  for (const questao of questoes) {
    const correta = respostas[questao.id] === questao.correta;
    if (correta) acertos += 1;
    const atual = porDominio[questao.dominio] ?? { acertos: 0, total: 0 };
    porDominio[questao.dominio] = {
      acertos: atual.acertos + (correta ? 1 : 0),
      total: atual.total + 1,
    };
  }

  return {
    id: `t${Date.now()}`,
    data: new Date().toISOString(),
    acertos,
    total: questoes.length,
    porDominio,
    segundos,
  };
}

/** Faixa a partir da qual a aprovação começa a ficar provável. */
export const CORTE_APROVACAO = 75;
