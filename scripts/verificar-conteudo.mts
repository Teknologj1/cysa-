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
import { questoesDisponiveis } from "@/server/simulado/selecao";
import { DIAS_DE_CARENCIA, diasParaLiberarSecao } from "@/lib/liberacao";
import { OBJETIVOS, objetivoExiste } from "@/content/objetivos";

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

/**
 * As marcações de objetivo precisam existir no documento oficial do CS0-004.
 * Um código inventado engana o aluno sobre o que ele está estudando e some
 * silenciosamente do mapa de cobertura.
 */
const marcacoes: { onde: string; codigo: string }[] = [
  ...SECOES.flatMap((secao) =>
    secao.licoes
      .filter((l) => l.objetivo)
      .map((l) => ({ onde: l.id, codigo: l.objetivo! }))
  ),
  ...QUESTOES.filter((q) => q.objetivo).map((q) => ({
    onde: q.id,
    codigo: q.objetivo!,
  })),
];

for (const { onde, codigo } of marcacoes) {
  if (!objetivoExiste(codigo)) {
    problemas.push(`${onde}: objetivo "${codigo}" não existe no CS0-004`);
  }
}

/**
 * A carência de liberação é regra de negócio com dinheiro em jogo, e a API do
 * simulado devolve gabarito em JSON. Vale conferir o gate contra o conteúdo
 * real, para uma seção nova não vazar por esquecimento de um campo.
 */
const pagasEmCarencia = (dias: number) =>
  questoesDisponiveis({ assinante: true, diasDecorridos: dias, cortesia: false })
    .filter((q) => !q.gratis)
    .filter((q) => {
      const secao = SECOES.find((s) => s.id === q.secaoId);
      return secao ? diasParaLiberarSecao(secao) > dias : false;
    });

for (const dia of [0, DIAS_DE_CARENCIA - 1]) {
  const vazadas = pagasEmCarencia(dia);
  if (vazadas.length > 0) {
    problemas.push(
      `carência furada no dia ${dia}: ${vazadas.length} questões pagas de seção fechada ` +
        `(${[...new Set(vazadas.map((q) => q.secaoId))].join(", ")})`
    );
  }
}

// E o inverso: passada a carência, tudo precisa abrir.
const noOitavoDia = questoesDisponiveis({
  assinante: true,
  diasDecorridos: DIAS_DE_CARENCIA,
  cortesia: false,
});
if (noOitavoDia.length !== QUESTOES.length) {
  problemas.push(
    `após a carência deveriam abrir as ${QUESTOES.length} questões, mas abriram ${noOitavoDia.length}`
  );
}

// Assinante em carência nunca pode ver menos que um visitante.
const doVisitante = questoesDisponiveis({
  assinante: false,
  diasDecorridos: null,
  cortesia: false,
});
const noPrimeiroDia = new Set(
  questoesDisponiveis({ assinante: true, diasDecorridos: 0, cortesia: false }).map(
    (q) => q.id
  )
);
const perdidas = doVisitante.filter((q) => !noPrimeiroDia.has(q.id));
if (perdidas.length > 0) {
  problemas.push(
    `assinante no dia 1 vê menos que visitante: ${perdidas.map((q) => q.id).join(", ")}`
  );
}

if (problemas.length > 0) {
  console.error("\n✕ PROBLEMAS NO CONTEÚDO\n");
  for (const problema of problemas) console.error(`  • ${problema}`);
  console.error("");
  process.exit(1);
}

const gratis = SECOES.flatMap((s) => s.licoes).filter((l) => l.gratis).length;
const naEntrada = SECOES.filter((s) => diasParaLiberarSecao(s) === 0);

console.log(
  `✓ conteúdo íntegro: ${SECOES.length} seções, ${TOTAL_LICOES} lições ` +
    `(${gratis} grátis), ${Math.round(TOTAL_MINUTOS / 60)}h, ${QUESTOES.length} questões`
);
console.log(
  `✓ liberação: ${naEntrada.map((s) => s.id).join(", ")} na entrada; ` +
    `as demais no dia ${DIAS_DE_CARENCIA + 1}`
);

const cobertos = new Set(marcacoes.map((m) => m.codigo));
const faltando = OBJETIVOS.filter((o) => !cobertos.has(o.codigo));
console.log(
  `✓ objetivos: ${cobertos.size} de ${OBJETIVOS.length} com conteúdo` +
    (faltando.length > 0
      ? ` (faltam ${faltando.map((o) => o.codigo).join(", ")})`
      : "")
);
