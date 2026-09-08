#!/usr/bin/env node
/**
 * Falha o build se conteúdo pago aparecer no JavaScript público.
 *
 * Basta um Client Component importar `@/content/secoes` ou `@/content/questoes`
 * para o corpo das lições e o banco de questões — com gabarito — irem parar em
 * um arquivo que qualquer visitante baixa, sem login e sem pagar. O paywall
 * continua aparecendo na tela, e o vazamento passa despercebido.
 *
 * Este verificador procura os nomes de campo do nosso conteúdo dentro dos
 * chunks gerados. Ele roda sozinho depois de `npm run build`.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const PASTA = ".next/static/chunks";

/**
 * Campos do conteúdo pago, com o valor literal junto.
 *
 * Exigir o literal evita confundir dado com nome de propriedade: o minificador
 * gera `conteudo:h` ao desestruturar props de componente, e isso não é
 * vazamento. `conteudo:"..."` é.
 */
const MARCADORES = [
  { padrao: /explicacao:\s*["'`]/g, descricao: "explicação de questão do simulado" },
  { padrao: /correta:\s*\d/g, descricao: "gabarito de questão do simulado" },
  { padrao: /conteudo:\s*["'`]/g, descricao: "corpo de lição" },
  { padrao: /pontosChave:\s*\[/g, descricao: "pontos-chave de lição" },
  { padrao: /dicaExame:\s*["'`]/g, descricao: "dica de prova de lição" },
];

function arquivosJs(pasta) {
  const encontrados = [];
  for (const item of readdirSync(pasta, { withFileTypes: true })) {
    const caminho = join(pasta, item.name);
    if (item.isDirectory()) encontrados.push(...arquivosJs(caminho));
    else if (item.name.endsWith(".js")) encontrados.push(caminho);
  }
  return encontrados;
}

let arquivos;
try {
  arquivos = arquivosJs(PASTA);
} catch {
  console.error(`\n✕ ${PASTA} não encontrado. Rode "npm run build" antes.\n`);
  process.exit(1);
}

const achados = [];
for (const arquivo of arquivos) {
  const conteudo = readFileSync(arquivo, "utf8");
  for (const marcador of MARCADORES) {
    const ocorrencias = conteudo.match(marcador.padrao)?.length ?? 0;
    if (ocorrencias > 0) {
      achados.push({ arquivo, ...marcador, ocorrencias });
    }
  }
}

if (achados.length === 0) {
  console.log(
    `✓ bundle limpo: nenhum conteúdo pago em ${arquivos.length} arquivos de JavaScript público`
  );
  process.exit(0);
}

console.error("\n✕ CONTEÚDO PAGO NO JAVASCRIPT PÚBLICO\n");
for (const achado of achados) {
  console.error(
    `  ${achado.arquivo}\n    ${achado.ocorrencias}× ${achado.descricao}`
  );
}
console.error(
  "\n  Causa provável: algum componente com \"use client\" importa" +
    "\n  @/content/secoes ou @/content/questoes." +
    "\n\n  Correção: use @/content/catalogo (metadados) na interface e busque o" +
    "\n  conteúdo pelo servidor, como faz /api/simulado.\n"
);
process.exit(1);
