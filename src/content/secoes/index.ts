import type { Licao, Secao } from "../types";
import { s01 } from "./s01-comecando";
import { s02 } from "./s02-fundamentos-soc";
import { s03 } from "./s03-risco-controles";
import { s04 } from "./s04-infraestrutura";
import { s05 } from "./s05-arquitetura-rede";
import { s06 } from "./s06-infraestrutura-critica";

/** Registro ordenado das seções publicadas. Adicione novas seções aqui. */
export const SECOES: Secao[] = [s01, s02, s03, s04, s05, s06];

export const TOTAL_LICOES = SECOES.reduce((n, s) => n + s.licoes.length, 0);

export const TOTAL_MINUTOS = SECOES.reduce(
  (n, s) => n + s.licoes.reduce((soma, l) => soma + l.minutos, 0),
  0
);

/** Todas as lições em ordem de curso, com a seção de origem. */
export const LICOES_EM_ORDEM: { secao: Secao; licao: Licao }[] = SECOES.flatMap(
  (secao) => secao.licoes.map((licao) => ({ secao, licao }))
);

export function getSecao(id: string): Secao | undefined {
  return SECOES.find((s) => s.id === id);
}

export function getLicao(
  secaoId: string,
  licaoId: string
): { secao: Secao; licao: Licao } | undefined {
  const secao = getSecao(secaoId);
  const licao = secao?.licoes.find((l) => l.id === licaoId);
  if (!secao || !licao) return undefined;
  return { secao, licao };
}

export function minutosDaSecao(secao: Secao): number {
  return secao.licoes.reduce((n, l) => n + l.minutos, 0);
}

/** Lição anterior e próxima, atravessando as fronteiras de seção. */
export function vizinhas(licaoId: string) {
  const indice = LICOES_EM_ORDEM.findIndex((item) => item.licao.id === licaoId);
  if (indice < 0) return { anterior: undefined, proxima: undefined };
  return {
    anterior: indice > 0 ? LICOES_EM_ORDEM[indice - 1] : undefined,
    proxima:
      indice < LICOES_EM_ORDEM.length - 1
        ? LICOES_EM_ORDEM[indice + 1]
        : undefined,
  };
}

export function licaoEhGratis(licaoId: string): boolean {
  return Boolean(
    LICOES_EM_ORDEM.find((item) => item.licao.id === licaoId)?.licao.gratis
  );
}

export const LICOES_GRATIS = LICOES_EM_ORDEM.filter((item) => item.licao.gratis);

export { s01, s02, s03, s04, s05, s06 };
