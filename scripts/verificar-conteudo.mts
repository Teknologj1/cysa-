#!/usr/bin/env tsx
/**
 * Confere a integridade do conteúdo antes do build.
 *
 * Erros de conteúdo não quebram compilação: um ID de lição repetido faz o
 * progresso de duas lições virar um só, e um gabarito fora do intervalo faz a
 * questão nunca ter resposta certa. Este verificador pega os dois.
 */
import { SECOES, TOTAL_LICOES, TOTAL_MINUTOS } from "@/content/secoes";
import { QUESTOES } from "@/content/questoes";

const problemas: string[] = [];

// IDs de lição precisam ser únicos: o progresso do aluno é gravado por ID.
const idsLicao = SECOES.flatMap((secao) => secao.licoes.map((l) => l.id));
const repetidos = idsLicao.filter((id, i) => idsLicao.indexOf(id) !== i);
if (repetidos.length > 0) {
  problemas.push(`IDs de lição repetidos: ${[...new Set(repetidos)].join(", ")}`);
}

const idsQuestao = QUESTOES.map((q) => q.id);
const questoesRepetidas = idsQuestao.filter((id, i) => idsQuestao.indexOf(id) !== i);
if (questoesRepetidas.length > 0) {
  problemas.push(
    `IDs de questão repetidos: ${[...new Set(questoesRepetidas)].join(", ")}`
  );
}

for (const questao of QUESTOES) {
  if (questao.correta < 0 || questao.correta >= questao.alternativas.length) {
    problemas.push(
      `${questao.id}: gabarito ${questao.correta} fora das ${questao.alternativas.length} alternativas`
    );
  }
  if (questao.alternativas.length < 2) {
    problemas.push(`${questao.id}: menos de duas alternativas`);
  }
  if (new Set(questao.alternativas).size !== questao.alternativas.length) {
    problemas.push(`${questao.id}: alternativas repetidas`);
  }
}

for (const secao of SECOES) {
  const temCheckpoint = secao.licoes.some((l) => l.tipo === "checkpoint");
  const questoesDaSecao = QUESTOES.filter((q) => q.secaoId === secao.id).length;
  if (temCheckpoint && questoesDaSecao === 0) {
    problemas.push(`${secao.id} tem lição de checkpoint mas nenhuma questão`);
  }
  for (const licao of secao.licoes) {
    if (!licao.conteudo && !licao.roteiro && !licao.rota) {
      problemas.push(`${licao.id} não tem conteúdo, roteiro nem rota`);
    }
  }
}

if (problemas.length > 0) {
  console.error("\n✕ PROBLEMAS NO CONTEÚDO\n");
  for (const problema of problemas) console.error(`  • ${problema}`);
  console.error("");
  process.exit(1);
}

const gratis = SECOES.flatMap((s) => s.licoes).filter((l) => l.gratis).length;
console.log(
  `✓ conteúdo íntegro: ${SECOES.length} seções, ${TOTAL_LICOES} lições ` +
    `(${gratis} grátis), ${Math.round(TOTAL_MINUTOS / 60)}h, ${QUESTOES.length} questões`
);
