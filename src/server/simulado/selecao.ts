import { QUESTOES, embaralhar } from "@/content/questoes";
import { distribuirPorPeso } from "@/content/dominios";
import type { DominioId, Questao } from "@/content/types";
import type {
  FiltroSimulado,
  QuestaoDoSimulado,
} from "@/features/simulado/lib/simulado";

/**
 * Seleção das questões — só no servidor.
 *
 * O banco inteiro, com gabarito e explicação, é o principal ativo do produto:
 * ele não pode viajar para o navegador de quem não assinou.
 */

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
 * Sorteia as questões. No modo prova a distribuição respeita o peso oficial de
 * cada domínio; nos demais, sorteia dentro do filtro.
 */
export function sortearQuestoes(
  questoes: Questao[],
  filtro: FiltroSimulado,
  quantidade: number
): Questao[] {
  const alvo = Math.min(quantidade, questoes.length);

  if (filtro.tipo !== "modoProva") {
    return embaralhar(questoes).slice(0, alvo);
  }

  const cotas = distribuirPorPeso(quantidade);
  const selecionadas: Questao[] = [];

  for (const [dominio, cota] of Object.entries(cotas)) {
    const doDominio = embaralhar(
      questoes.filter((q) => q.dominio === (dominio as DominioId))
    );
    selecionadas.push(...doDominio.slice(0, cota));
  }

  // Completa quando algum domínio não tinha questões suficientes.
  if (selecionadas.length < alvo) {
    const restantes = embaralhar(
      questoes.filter((q) => !selecionadas.includes(q))
    );
    selecionadas.push(...restantes.slice(0, alvo - selecionadas.length));
  }

  return embaralhar(selecionadas);
}

export function paraQuestaoDoSimulado(questao: Questao): QuestaoDoSimulado {
  return {
    id: questao.id,
    dominio: questao.dominio,
    secaoId: questao.secaoId,
    objetivo: questao.objetivo,
    enunciado: questao.enunciado,
    alternativas: questao.alternativas,
    correta: questao.correta,
    explicacao: questao.explicacao,
  };
}

/** Quantas questões o filtro tem disponíveis para este aluno. */
export function contarDisponiveis(
  assinante: boolean,
  filtro: FiltroSimulado
): number {
  return aplicarFiltro(questoesDisponiveis(assinante), filtro).length;
}
