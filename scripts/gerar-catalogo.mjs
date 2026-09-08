#!/usr/bin/env node
/**
 * Gera `src/content/catalogo.ts` a partir do conteúdo real.
 *
 * Motivo: tudo que um Client Component importa vai para o JavaScript público.
 * Importar `@/content/secoes` da interface embutiria o corpo das lições — e o
 * banco de questões, com gabarito — em um arquivo que qualquer visitante
 * baixa. O catálogo carrega só o que pode ser público: metadados.
 *
 * Rode `npm run gerar:catalogo` (o build já faz isso sozinho).
 */
import { writeFileSync } from "node:fs";
import { SECOES } from "../src/content/secoes/index.ts";
import { QUESTOES } from "../src/content/questoes/index.ts";

const CAMPOS_PUBLICOS = [
  "id",
  "titulo",
  "resumo",
  "minutos",
  "tipo",
  "objetivo",
  "gratis",
  "rota",
];

function licaoPublica(licao) {
  const saida = {};
  for (const campo of CAMPOS_PUBLICOS) {
    if (licao[campo] !== undefined) saida[campo] = licao[campo];
  }
  return saida;
}

const secoes = SECOES.map((secao) => ({
  id: secao.id,
  numero: secao.numero,
  titulo: secao.titulo,
  fase: secao.fase,
  dominio: secao.dominio,
  descricao: secao.descricao,
  objetivos: secao.objetivos,
  licoes: secao.licoes.map(licaoPublica),
}));

const secoesComCheckpoint = SECOES.filter((secao) =>
  QUESTOES.some((questao) => questao.secaoId === secao.id)
).map((secao) => ({ id: secao.id, numero: secao.numero, titulo: secao.titulo }));

const arquivo = `// GERADO POR scripts/gerar-catalogo.mjs — NÃO EDITE À MÃO.
//
// Metadados do curso seguros para o navegador. O corpo das lições e o banco de
// questões ficam fora daqui de propósito: eles só saem do servidor para quem
// tem direito de acesso.
import type { SecaoPublica } from "@/features/curso/lib/publico";

export const SECOES_CATALOGO: SecaoPublica[] = ${JSON.stringify(secoes, null, 2)};

/** Seções que possuem checkpoint, para o seletor do simulado. */
export const SECOES_COM_CHECKPOINT: {
  id: string;
  numero: number;
  titulo: string;
}[] = ${JSON.stringify(secoesComCheckpoint, null, 2)};

export const TOTAL_LICOES_CATALOGO = ${SECOES.reduce((n, s) => n + s.licoes.length, 0)};
export const TOTAL_QUESTOES = ${QUESTOES.length};
export const TOTAL_QUESTOES_GRATIS = ${QUESTOES.filter((q) => q.gratis).length};

export function getSecaoCatalogo(id: string): SecaoPublica | undefined {
  return SECOES_CATALOGO.find((secao) => secao.id === id);
}

export function minutosDaSecaoCatalogo(secao: SecaoPublica): number {
  return secao.licoes.reduce((total, licao) => total + licao.minutos, 0);
}
`;

writeFileSync(new URL("../src/content/catalogo.ts", import.meta.url), arquivo);
console.log(
  `catálogo gerado: ${secoes.length} seções, ${arquivo.length} bytes (sem corpo de lição nem questões)`
);
