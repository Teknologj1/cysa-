import { LICOES_EM_ORDEM, SECOES, TOTAL_LICOES } from "@/content/secoes";
import { FASES } from "@/content/fases";
import type { Fase, Secao } from "@/content/types";

/** Seções agrupadas por fase, na ordem do curso. */
export function secoesPorFase(): { fase: Fase; secoes: Secao[] }[] {
  return FASES.map((fase) => ({
    fase,
    secoes: SECOES.filter((s) => s.fase === fase.id),
  })).filter((grupo) => grupo.secoes.length > 0);
}

export function percentual(concluidas: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((concluidas / total) * 100);
}

export function progressoDaSecao(secao: Secao, concluidas: string[]) {
  const feitas = secao.licoes.filter((l) => concluidas.includes(l.id)).length;
  return {
    feitas,
    total: secao.licoes.length,
    percentual: percentual(feitas, secao.licoes.length),
  };
}

export function progressoGeral(concluidas: string[]) {
  const validas = concluidas.filter((id) =>
    LICOES_EM_ORDEM.some((item) => item.licao.id === id)
  );
  return {
    feitas: validas.length,
    total: TOTAL_LICOES,
    percentual: percentual(validas.length, TOTAL_LICOES),
  };
}

/** Próxima lição não concluída — alvo do botão "continuar de onde parei". */
export function proximaLicaoPendente(concluidas: string[]) {
  return (
    LICOES_EM_ORDEM.find((item) => !concluidas.includes(item.licao.id)) ??
    LICOES_EM_ORDEM[0]
  );
}

export function formatarDuracao(minutos: number): string {
  if (minutos < 60) return `${minutos} min`;
  const horas = minutos / 60;
  return `${Math.round(horas * 10) / 10}h`.replace(".", ",");
}
