import { DOMINIOS } from "@/content/dominios";
import type { DominioId } from "@/content/types";
import type { TentativaSimulado } from "@/features/progresso/lib/progresso";

/**
 * Regras do simulado que valem nos dois lados. A seleção das questões fica no
 * servidor (`server/simulado/selecao.ts`): o banco com gabarito não pode ser
 * embutido no JavaScript público.
 */

export type FiltroSimulado =
  | { tipo: "todos" }
  | { tipo: "dominio"; dominio: DominioId }
  | { tipo: "secao"; secaoId: string }
  | { tipo: "modoProva" };

/** Questão como ela chega ao navegador. */
export type QuestaoDoSimulado = {
  id: string;
  dominio: DominioId;
  secaoId?: string;
  objetivo?: string;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
};

export function calcularResultado(
  questoes: QuestaoDoSimulado[],
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

export function desempenhoPorDominio(
  questoes: QuestaoDoSimulado[],
  respostas: Record<string, number>
) {
  return DOMINIOS.filter((d) => questoes.some((q) => q.dominio === d.id)).map(
    (dominio) => {
      const doDominio = questoes.filter((q) => q.dominio === dominio.id);
      const certas = doDominio.filter(
        (q) => respostas[q.id] === q.correta
      ).length;
      return {
        dominio,
        certas,
        total: doDominio.length,
        pct: Math.round((certas / doDominio.length) * 100),
      };
    }
  );
}

/** Faixa a partir da qual a aprovação começa a ficar provável. */
export const CORTE_APROVACAO = 75;
