# Deploy na Vercel

O projeto é um Next.js 15 padrão — a Vercel detecta tudo sozinha. O que exige
atenção são as variáveis de ambiente do Stripe e o webhook.

## 1. Primeiro deploy

1. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório
   `Teknologj1/cysa-`.
2. Em **Branch**, escolha a branch que você quer publicar
   (`claude/pwa-cysa-subscription-yx5gxn` enquanto o merge não acontece).
3. Framework: **Next.js** (detectado automaticamente). Build command, output e
   install command ficam no padrão.
4. Clique em **Deploy**. O primeiro build leva cerca de dois minutos.

> Pelo terminal, o equivalente é `npx vercel` (preview) e `npx vercel --prod`
> (produção), a partir da raiz do projeto.

## 2. Variáveis de ambiente

Em **Project → Settings → Environment Variables**, cadastre para *Production* e
*Preview*:

| Variável | Obrigatória | Para que serve |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | sim | URL pública do app. Usada nas URLs de retorno do checkout, no sitemap e nos metadados |
| `STRIPE_SECRET_KEY` | para vender | Chave secreta da conta Stripe (`sk_live_…` em produção) |
| `STRIPE_PRICE_MENSAL` | para vender | ID do preço recorrente mensal (`price_…`) |
| `STRIPE_PRICE_TRIMESTRAL` | para vender | ID do preço recorrente trimestral |
| `STRIPE_PRICE_ANUAL` | para vender | ID do preço recorrente anual |
| `STRIPE_WEBHOOK_SECRET` | para vender | Segredo do endpoint de webhook (`whsec_…`) |

Sem `STRIPE_SECRET_KEY` o app sobe em **modo demonstração**: o checkout libera o
acesso localmente, o que é útil para validar a experiência antes de plugar o
pagamento.

Depois de cadastrar as variáveis, faça um **redeploy** — variáveis novas só
entram em um build novo.

## 3. Webhook do Stripe

1. No painel do Stripe, vá em **Developers → Webhooks → Add endpoint**.
2. URL: `https://SEU-DOMINIO/api/stripe/webhook`.
3. Eventos a assinar:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copie o *signing secret* para `STRIPE_WEBHOOK_SECRET` e faça o redeploy.

Para testar localmente: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

## 4. Domínio

Em **Settings → Domains**, adicione o domínio e siga as instruções de DNS
(registro `A` para apex ou `CNAME` para subdomínio). Assim que o domínio
propagar, atualize `NEXT_PUBLIC_SITE_URL` para ele e faça o redeploy — o
checkout do Stripe volta para essa URL depois do pagamento.

## 5. Conferência pós-deploy

- [ ] A home abre e o tema escuro/claro alterna
- [ ] `/manifest.json` responde e o navegador oferece instalar o app
- [ ] O service worker registra (DevTools → Application → Service Workers)
- [ ] O modo avião mantém as páginas já visitadas acessíveis
- [ ] O checkout redireciona para o Stripe (ou libera o modo demo)
- [ ] Após pagar, `/sucesso?session_id=…` confirma e libera o conteúdo
- [ ] O webhook aparece com entrega 200 no painel do Stripe

## Observações

- `vercel.json` fixa a região das funções em `gru1` (São Paulo), reduzindo a
  latência para o público brasileiro, e dá 30 s ao webhook.
- O service worker é gerado no build pelo `next-pwa`; os arquivos gerados estão
  no `.gitignore` e no `.vercelignore` de propósito.
- O `next.config.ts` já envia CSP, HSTS e demais cabeçalhos de segurança. Ao
  adicionar analytics ou fontes externas, libere o domínio na CSP.
