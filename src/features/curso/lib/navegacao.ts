import {
  SECOES_CATALOGO,
  TOTAL_LICOES_CATALOGO,
  minutosDaSecaoCatalogo,
} from "@/content/catalogo";
import { FASES } from "@/content/fases";
import type { Fase } from "@/content/types";
import type { LicaoPublica, SecaoPublica } from "./publico";

/**
 * Navegação do curso a partir do catálogo — metadados sem corpo de lição, o
 * que permite usar isto na interface sem levar conteúdo pago para o navegador.
 */

export function secoesPorFase(): { fase: Fase; secoes: SecaoPublica[] }[] {
  return FASES.map((fase) => ({
    fase,
    secoes: SECOES_CATALOGO.filter((s) => s.fase === fase.id),
  })).filter((grupo) => grupo.secoes.length > 0);
}

export function percentual(concluidas: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((concluidas / total) * 100);
}

export function progressoDaSecao(secao: SecaoPublica, concluidas: string[]) {
  const feitas = secao.licoes.filter((l) => concluidas.includes(l.id)).length;
  return {
    feitas,
    total: secao.licoes.length,
    percentual: percentual(feitas, secao.licoes.length),
  };
}

export function progressoGeral(concluidas: string[]) {
  const validas = concluidas.filter((id) =>
    SECOES_CATALOGO.some((s) => s.licoes.some((l) => l.id === id))
  );
  return {
    feitas: validas.length,
    total: TOTAL_LICOES_CATALOGO,
    percentual: percentual(validas.length, TOTAL_LICOES_CATALOGO),
  };
}

/** Todas as lições em ordem de curso, com a seção de origem. */
export function licoesEmOrdem(): { secao: SecaoPublica; licao: LicaoPublica }[] {
  return SECOES_CATALOGO.flatMap((secao) =>
    secao.licoes.map((licao) => ({ secao, licao }))
  );
}

/** Lição anterior e próxima, atravessando as fronteiras de seção. */
export function vizinhas(licaoId: string) {
  const ordem = licoesEmOrdem();
  const indice = ordem.findIndex((item) => item.licao.id === licaoId);
  if (indice < 0) return { anterior: undefined, proxima: undefined };
  return {
    anterior: indice > 0 ? ordem[indice - 1] : undefined,
    proxima: indice < ordem.length - 1 ? ordem[indice + 1] : undefined,
  };
}

/** Próxima lição não concluída — alvo do botão "continuar de onde parei". */
export function proximaLicaoPendente(concluidas: string[]) {
  const ordem = licoesEmOrdem();
  return ordem.find((item) => !concluidas.includes(item.licao.id)) ?? ordem[0];
}

export function formatarDuracao(minutos: number): string {
  if (minutos < 60) return `${minutos} min`;
  const horas = minutos / 60;
  return `${Math.round(horas * 10) / 10}h`.replace(".", ",");
}

export { minutosDaSecaoCatalogo as minutosDaSecao };
