/**
 * Gera um link de acesso sem passar pelo envio de e-mail.
 *
 * Serve para quando o Resend está fora do ar ou o domínio remetente ainda não
 * foi verificado, e para suporte ("o cliente não recebeu o e-mail"). Produz
 * exatamente o mesmo token que /api/auth/link enviaria — nada aqui contorna a
 * verificação de acesso: o link só prova quem é o dono do e-mail, e o direito
 * de ver o conteúdo continua vindo do Stripe ou da lista de cortesia.
 *
 * Uso:
 *   AUTH_SECRET='...' NEXT_PUBLIC_SITE_URL='https://...' \
 *     node scripts/gerar-link.mjs contato@teknologji.com.br
 *
 * O AUTH_SECRET é o mesmo valor que está na Vercel. Rode isto na sua máquina:
 * o segredo não deve ser colado em chat, ticket nem commit.
 */

import { createHmac } from "node:crypto";

const VALIDADE_LINK_MS = 30 * 60 * 1000;

function base64url(dado) {
  return Buffer.from(dado).toString("base64url");
}

function criarToken(email, segredo) {
  const conteudo = {
    email: email.trim().toLowerCase(),
    exp: Date.now() + VALIDADE_LINK_MS,
    tipo: "link",
  };

  const carga = base64url(JSON.stringify(conteudo));
  const assinatura = createHmac("sha256", segredo)
    .update(carga)
    .digest("base64url");

  return `${carga}.${assinatura}`;
}

function main() {
  const email = process.argv[2];
  const segredo = process.env.AUTH_SECRET;
  const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  const proximo = process.argv[3] ?? "/curso";

  const faltando = [];
  if (!email) faltando.push("o e-mail como primeiro argumento");
  if (!segredo) faltando.push("a variável AUTH_SECRET");
  if (!site) faltando.push("a variável NEXT_PUBLIC_SITE_URL");

  if (faltando.length > 0) {
    console.error(`Faltou ${faltando.join(", ")}.\n`);
    console.error("Exemplo:");
    console.error(
      "  AUTH_SECRET='...' NEXT_PUBLIC_SITE_URL='https://cysa-prep.vercel.app' \\"
    );
    console.error("    node scripts/gerar-link.mjs contato@teknologji.com.br");
    process.exit(1);
  }

  const token = criarToken(email, segredo);
  const url = `${site}/auth/entrar?token=${encodeURIComponent(token)}&proximo=${encodeURIComponent(proximo)}`;

  console.log(`\nLink de acesso para ${email.trim().toLowerCase()}:\n`);
  console.log(url);
  console.log(`\nVale por 30 minutos. Abra no navegador onde quer ficar logado.`);
  console.log(
    "Ele dá sessão, não assinatura: o acesso ao conteúdo pago continua vindo"
  );
  console.log("do Stripe ou da lista ACESSO_CORTESIA.\n");
}

main();
