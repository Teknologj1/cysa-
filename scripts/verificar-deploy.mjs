#!/usr/bin/env node
/**
 * Confere um deploy já publicado: rotas, PWA, cabeçalhos de segurança e o
 * endpoint de checkout. Não altera nada — só lê.
 *
 *   npm run verificar:deploy -- https://seu-dominio.com.br
 *
 * Sem argumento, usa NEXT_PUBLIC_SITE_URL. Sai com código 1 se algo falhar.
 */

const base = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || "")
  .trim()
  .replace(/\/$/, "");

if (!base) {
  console.error(
    "\n✕ Informe a URL: npm run verificar:deploy -- https://seu-dominio.com.br\n"
  );
  process.exit(1);
}

const resultados = [];

function registrar(nivel, titulo, detalhe = "") {
  resultados.push({ nivel, titulo, detalhe });
  const simbolo = nivel === "ok" ? "✓" : nivel === "aviso" ? "!" : "✕";
  const linha = `  ${simbolo} ${titulo}`;
  console.log(detalhe ? `${linha} — ${detalhe}` : linha);
}

async function buscar(caminho, opcoes = {}) {
  try {
    const resposta = await fetch(base + caminho, {
      redirect: "follow",
      ...opcoes,
    });
    return resposta;
  } catch (erro) {
    return { erroRede: String(erro?.message || erro) };
  }
}

async function conferirRota(caminho, { tipo, rotulo } = {}) {
  const resposta = await buscar(caminho);
  const nome = rotulo || caminho;

  if (resposta.erroRede) {
    return registrar("falha", nome, resposta.erroRede);
  }
  if (!resposta.ok) {
    return registrar("falha", nome, `HTTP ${resposta.status}`);
  }
  if (tipo) {
    const recebido = resposta.headers.get("content-type") || "";
    if (!recebido.includes(tipo)) {
      return registrar("aviso", nome, `content-type ${recebido}`);
    }
  }
  registrar("ok", nome, `HTTP ${resposta.status}`);
  return resposta;
}

console.log(`\nVerificando ${base}\n`);

console.log("Páginas");
await conferirRota("/", { tipo: "text/html" });
await conferirRota("/planos", { tipo: "text/html" });
await conferirRota("/curso", { tipo: "text/html" });
await conferirRota("/curso/s01/s01l02", { tipo: "text/html", rotulo: "/curso/s01/s01l02 (lição grátis)" });
await conferirRota("/simulado", { tipo: "text/html" });
await conferirRota("/lab-ingles", { tipo: "text/html" });
await conferirRota("/termos", { tipo: "text/html" });
await conferirRota("/privacidade", { tipo: "text/html" });

console.log("\nPWA e SEO");
const manifesto = await conferirRota("/manifest.json", { tipo: "json" });
if (manifesto && !manifesto.erroRede && manifesto.ok) {
  try {
    const dados = await manifesto.json();
    const icones = dados.icons?.length ?? 0;
    const temMaskable = dados.icons?.some((i) => i.purpose?.includes("maskable"));
    registrar(
      icones >= 2 && temMaskable ? "ok" : "aviso",
      "Ícones do manifesto",
      `${icones} ícones${temMaskable ? ", com maskable" : ", sem maskable"}`
    );
  } catch {
    registrar("aviso", "Manifesto", "não pôde ser interpretado como JSON");
  }
}
await conferirRota("/sw.js", { rotulo: "/sw.js (service worker)" });
await conferirRota("/offline.html", { tipo: "text/html" });
await conferirRota("/icons/icon-192.png", { tipo: "image/png" });
await conferirRota("/opengraph-image", { tipo: "image/png", rotulo: "/opengraph-image (compartilhamento)" });
await conferirRota("/sitemap.xml", { tipo: "xml" });
await conferirRota("/robots.txt", { tipo: "text/plain" });

console.log("\nCabeçalhos de segurança");
const home = await buscar("/");
if (home.erroRede || !home.ok) {
  registrar("falha", "Cabeçalhos", "não foi possível ler a home");
} else {
  const esperados = [
    ["content-security-policy", "CSP"],
    ["strict-transport-security", "HSTS"],
    ["x-content-type-options", "X-Content-Type-Options"],
    ["x-frame-options", "X-Frame-Options"],
    ["referrer-policy", "Referrer-Policy"],
  ];
  for (const [cabecalho, nome] of esperados) {
    const valor = home.headers.get(cabecalho);
    registrar(valor ? "ok" : "falha", nome, valor ? "presente" : "ausente");
  }
  if (!base.startsWith("https://")) {
    registrar("aviso", "HTTPS", "a URL informada não usa https");
  }
}

console.log("\nCheckout");
const checkout = await buscar("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ planoId: "mensal" }),
});

if (checkout.erroRede) {
  registrar("falha", "/api/checkout", checkout.erroRede);
} else if (!checkout.ok) {
  registrar("falha", "/api/checkout", `HTTP ${checkout.status}`);
} else {
  const dados = await checkout.json().catch(() => ({}));
  if (dados.modo === "stripe" || dados.modo === "link") {
    registrar("ok", "Checkout", `modo ${dados.modo}, redireciona para o Stripe`);
  } else if (dados.modo === "demo") {
    registrar(
      "aviso",
      "Checkout",
      "modo demonstração — falta STRIPE_SECRET_KEY e os STRIPE_PRICE_* na Vercel"
    );
  } else {
    registrar("falha", "Checkout", `resposta inesperada: ${JSON.stringify(dados)}`);
  }
}

const falhas = resultados.filter((r) => r.nivel === "falha");
const avisos = resultados.filter((r) => r.nivel === "aviso");

console.log("\n─────────────────────────────────────────────");
console.log(
  `${resultados.length - falhas.length - avisos.length} ok · ${avisos.length} aviso(s) · ${falhas.length} falha(s)`
);

if (falhas.length > 0) {
  console.log("\nFalhas:");
  for (const f of falhas) console.log(`  ✕ ${f.titulo} — ${f.detalhe}`);
}
if (avisos.length > 0) {
  console.log("\nAvisos:");
  for (const a of avisos) console.log(`  ! ${a.titulo} — ${a.detalhe}`);
}
console.log("─────────────────────────────────────────────\n");

process.exit(falhas.length > 0 ? 1 : 0);
