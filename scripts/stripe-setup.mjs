#!/usr/bin/env node
/**
 * Cria (ou reaproveita) o produto e os preços recorrentes da assinatura na sua
 * conta Stripe, a partir de src/content/planos.ts — a mesma fonte que o app usa
 * para exibir os valores. Ao final imprime as variáveis prontas para colar na
 * Vercel.
 *
 *   npm run stripe:setup -- --dry-run    # só mostra o que faria
 *   npm run stripe:setup                 # cria de verdade
 *
 * A chave vem de STRIPE_SECRET_KEY (o npm script lê .env.local se existir).
 * Use sk_test_… para validar e sk_live_… para produção.
 */
import Stripe from "stripe";
import { PLANOS, formatarBRL } from "../src/content/planos.ts";

const ETIQUETA = "cysa-prep";
const NOME_PRODUTO = "CySA+ Prep — assinatura";
const simulacao = process.argv.includes("--dry-run");

const chave = process.env.STRIPE_SECRET_KEY;
if (!chave) {
  console.error(
    "\n✕ STRIPE_SECRET_KEY não definida.\n" +
      "  Defina no .env.local (STRIPE_SECRET_KEY=sk_test_…) ou no ambiente.\n"
  );
  process.exit(1);
}

const ambiente = chave.startsWith("sk_live_") ? "PRODUÇÃO" : "teste";
const stripe = new Stripe(chave);

console.log(`\nConta Stripe em modo ${ambiente}.`);
if (simulacao) console.log("Modo simulação: nada será criado.\n");

/** Reaproveita o produto marcado com a nossa etiqueta, se já existir. */
async function obterProduto() {
  const busca = await stripe.products.search({
    query: `active:'true' AND metadata['app']:'${ETIQUETA}'`,
    limit: 1,
  });

  if (busca.data.length > 0) {
    console.log(`• Produto existente reaproveitado: ${busca.data[0].id}`);
    return busca.data[0];
  }

  if (simulacao) {
    console.log(`• Criaria o produto "${NOME_PRODUTO}"`);
    return { id: "prod_SIMULADO" };
  }

  const produto = await stripe.products.create({
    name: NOME_PRODUTO,
    description:
      "Acesso ao curso preparatório para a certificação CompTIA CySA+ (CS0-004).",
    metadata: { app: ETIQUETA },
  });
  console.log(`• Produto criado: ${produto.id}`);
  return produto;
}

/** Procura um preço ativo com o mesmo plano, valor e recorrência. */
async function obterPreco(produtoId, plano) {
  if (produtoId !== "prod_SIMULADO") {
    const existentes = await stripe.prices.list({
      product: produtoId,
      active: true,
      limit: 100,
    });

    const igual = existentes.data.find(
      (preco) =>
        preco.metadata?.planoId === plano.id &&
        preco.unit_amount === plano.precoCentavos &&
        preco.currency === "brl" &&
        preco.recurring?.interval === plano.recorrencia.intervalo &&
        preco.recurring?.interval_count === plano.recorrencia.contagem
    );

    if (igual) {
      console.log(`  ${plano.nome}: preço existente ${igual.id}`);
      return igual;
    }
  }

  const descricao = `${formatarBRL(plano.precoCentavos)} a cada ${plano.intervalo}`;

  if (simulacao) {
    console.log(`  ${plano.nome}: criaria preço de ${descricao}`);
    return { id: `price_SIMULADO_${plano.id}` };
  }

  const preco = await stripe.prices.create({
    product: produtoId,
    currency: "brl",
    unit_amount: plano.precoCentavos,
    nickname: `${plano.nome} — ${descricao}`,
    recurring: {
      interval: plano.recorrencia.intervalo,
      interval_count: plano.recorrencia.contagem,
    },
    metadata: { app: ETIQUETA, planoId: plano.id },
  });
  console.log(`  ${plano.nome}: preço criado ${preco.id} (${descricao})`);
  return preco;
}

const produto = await obterProduto();
console.log("\nPreços:");

const variaveis = [];
for (const plano of PLANOS) {
  const preco = await obterPreco(produto.id, plano);
  variaveis.push(`${plano.stripePriceEnv}=${preco.id}`);
}

console.log("\n─────────────────────────────────────────────");
console.log("Cole estas variáveis na Vercel (Settings → Environment Variables):\n");
console.log(variaveis.join("\n"));
console.log(`\nE não esqueça de STRIPE_SECRET_KEY (a chave ${ambiente}),`);
console.log("STRIPE_WEBHOOK_SECRET e NEXT_PUBLIC_SITE_URL.");
console.log("─────────────────────────────────────────────\n");

if (simulacao) {
  console.log("Simulação concluída — rode sem --dry-run para criar de verdade.\n");
}
