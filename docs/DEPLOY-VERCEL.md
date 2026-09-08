# Lançamento na Vercel (Fase A)

Roteiro do que falta para o app estar no ar vendendo. O repositório já está
conectado à Vercel e a conta Stripe já existe, então a sequência abaixo é curta.

Ao final, `npm run verificar:deploy` confere tudo sozinho.

---

## 1. Preencher os dados do responsável legal

Edite **`src/content/empresa.ts`** — é a fonte única usada pelos termos de uso,
pela política de privacidade e pelo rodapé:

```ts
export const NOME_PRODUTO = "CySA+ Prep";   // nome exibido no app

export const EMPRESA = {
  nomeFantasia: "…",         // nome fantasia da empresa
  razaoSocial: "…",          // razão social ou seu nome completo
  documento: "…",            // CNPJ ou CPF
  endereco: "…",             // endereço completo (exigido pelo CDC)
  emailContato: "…",         // atendimento ao cliente
  emailEncarregado: "…",     // encarregado de dados (LGPD)
} as const;
```

O domínio público não fica aqui: ele vem de `NEXT_PUBLIC_SITE_URL`, para não
haver dois lugares dizendo onde o app está publicado.

Enquanto houver campo com `[COLCHETES]`, as páginas legais exibem um aviso de
documento não finalizado — de propósito, para nenhum contrato ir ao ar
incompleto. O aviso some sozinho quando os campos forem preenchidos.

> Os textos de `/termos` e `/privacidade` são modelos consistentes com o CDC e a
> LGPD, mas **precisam de revisão jurídica** antes de você começar a cobrar.

## 2. Criar produto e preços no Stripe

O script lê os planos de `src/content/planos.ts` — a mesma fonte que a landing
usa — e cria o produto e os três preços recorrentes em BRL:

```bash
echo "STRIPE_SECRET_KEY=sk_test_…" > .env.local

npm run stripe:setup -- --dry-run   # confere o que seria criado
npm run stripe:setup                # cria de verdade
```

Ele imprime as variáveis prontas para colar na Vercel:

```
STRIPE_PRICE_MENSAL=price_…
STRIPE_PRICE_TRIMESTRAL=price_…
STRIPE_PRICE_ANUAL=price_…
```

O script é idempotente: rodar de novo reaproveita o produto e os preços já
criados com o mesmo valor e recorrência, em vez de duplicar. Rode uma vez com a
chave de teste (`sk_test_…`) e, quando for cobrar de verdade, outra com a chave
de produção (`sk_live_…`) — os IDs de preço são diferentes em cada ambiente.

## 3. Cadastrar as variáveis na Vercel

Em **Project → Settings → Environment Variables**, para *Production* e *Preview*:

| Variável | Valor |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | domínio **estável** do projeto, sem barra no fim (ex.: `https://cysa-prep.vercel.app`) |
| `STRIPE_SECRET_KEY` | `sk_live_…` em produção, `sk_test_…` em preview |
| `STRIPE_PRICE_MENSAL` | saída do passo 2 |
| `STRIPE_PRICE_TRIMESTRAL` | saída do passo 2 |
| `STRIPE_PRICE_ANUAL` | saída do passo 2 |
| `STRIPE_WEBHOOK_SECRET` | passo 4 |

Sem `STRIPE_SECRET_KEY` o app sobe em **modo demonstração**: o checkout libera o
acesso localmente, útil para validar a experiência antes de plugar o pagamento.

> Variáveis novas só entram em um build novo — faça **redeploy** depois de
> cadastrar.

**Não deixe `NEXT_PUBLIC_SITE_URL` em branco.** Sem ela o app cai na `VERCEL_URL`,
que aponta para o deploy específico (`cysa-mdbqezosv-….vercel.app`) e muda a cada
publicação. O cliente voltaria do Stripe para uma URL descartável em vez do seu
domínio. O log de produção avisa quando isso acontece.

## 4. Webhook do Stripe

1. Stripe → **Developers → Webhooks → Add endpoint**
2. URL: `https://SEU-DOMINIO/api/stripe/webhook`
3. Eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copie o *signing secret* para `STRIPE_WEBHOOK_SECRET` e faça o redeploy.

Para testar antes: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

> Hoje o webhook valida a assinatura dos eventos e os registra no log. Ele é o
> ponto de extensão para persistir o acesso quando houver banco — ver a Fase B em
> [`PLANO-E2E.md`](PLANO-E2E.md).

## 5. Domínio

Em **Settings → Domains**, adicione o domínio e siga as instruções de DNS
(registro `A` para o apex, `CNAME` para subdomínio). Depois que propagar,
atualize `NEXT_PUBLIC_SITE_URL` e faça o redeploy — é essa
URL que o Stripe usa para trazer o cliente de volta depois do pagamento.

## 6. Conferir o deploy

```bash
npm run verificar:deploy -- https://seu-dominio.com.br
```

O script checa, sem alterar nada:

- as páginas principais e uma lição grátis
- manifesto, ícones (incluindo maskable), service worker e página offline
- imagem de compartilhamento, sitemap e robots
- CSP, HSTS, X-Content-Type-Options, X-Frame-Options e Referrer-Policy
- o endpoint de checkout, avisando se ainda está em modo demonstração

Sai com código 1 se algo falhar, então serve em CI.

### O que conferir na mão depois

- [ ] Instalar o app pelo celular e abrir em modo avião
- [ ] Fazer uma compra de teste com o cartão `4242 4242 4242 4242`
- [ ] Confirmar que `/sucesso` libera o conteúdo
- [ ] Ver a entrega 200 do webhook no painel do Stripe
- [ ] Compartilhar o link no WhatsApp e ver o card de pré-visualização

---

## Observações

- `vercel.json` fixa as funções em `gru1` (São Paulo) e dá 30 s ao webhook.
- O service worker é gerado no build pelo `next-pwa`; os arquivos gerados estão
  no `.gitignore` e no `.vercelignore` de propósito.
- A imagem de compartilhamento é gerada pelo próprio Next em
  `src/app/opengraph-image.tsx`, a partir dos pesos dos domínios — ela nunca fica
  desatualizada.
- Ao adicionar analytics ou fontes externas, libere o domínio na CSP em
  `next.config.ts`.
