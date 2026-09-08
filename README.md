# CySA+ Prep — PWA de assinatura do curso preparatório CS0-004

Aplicativo web progressivo (PWA) para **vender a assinatura** e **entregar o
conteúdo** de um curso preparatório para a certificação CompTIA CySA+
(exame CS0-004, que sucede o CS0-003).

A base técnica segue o mesmo modelo do projeto `my-motogp-pwa`: Next.js 15
(App Router) + Tailwind CSS v4 + `next-pwa` + `next-themes`, com service worker
customizado, página offline, manifesto instalável e headers de segurança.

## O que já está pronto

**Vitrine e conversão**
- Landing page com proposta de valor, pesos dos 4 domínios do exame, estrutura
  em quatro fases, comparativo de planos e FAQ.
- Três planos de assinatura (mensal, trimestral e anual) com checkout.
- Páginas de termos de uso e privacidade (modelos a revisar juridicamente).

**Área do aluno**
- Curso organizado em fases → seções → lições, com a tag do objetivo oficial
  (OBJ 1.5, OBJ 4.2) em cada lição.
- Páginas de lição com conteúdo em Markdown, pontos-chave, dica de prova e
  tarefa prática; marcação de conclusão e avanço para a próxima.
- Simulados por domínio, por seção (checkpoint) e em modo prova, este último
  sorteando as questões pelos pesos oficiais (34% / 26% / 24% / 16%).
- Relatório de desempenho por domínio com sugestão de foco ponderada pelo peso.
- SOC English Lab: listening com síntese de voz e treino de pronúncia.
- Data-alvo da prova com contagem regressiva e histórico de tentativas.
- Amostra grátis: lições e questões liberadas sem assinatura, para conversão.

**PWA**
- Instalável (Android, iOS e desktop) com convite de instalação próprio.
- Funciona offline: páginas visitadas ficam em cache e o progresso é gravado
  no aparelho.
- Tema claro/escuro com preferência persistida.

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # opcional: sem isso, roda em modo demonstração
npm run dev                  # http://localhost:3000
```

Antes de vender, preencha os dados do responsável legal em
`src/content/empresa.ts` — é a fonte única dos termos de uso, da política de
privacidade e do rodapé. Enquanto houver campo pendente, as páginas legais
exibem um aviso de documento não finalizado.

Outros comandos:

| Comando | O que faz |
| --- | --- |
| `npm run build` / `npm start` | build de produção e servidor |
| `npm run lint` / `npm run typecheck` | qualidade e tipos |
| `npm test` | testes da decisão de acesso e da mesclagem de progresso |
| `npm run gerar:catalogo` | regenera `content/catalogo.ts` (metadados seguros para o cliente); roda antes de todo build |
| `npm run verificar:bundle` | falha se conteúdo pago aparecer no JavaScript público; roda depois de todo build |
| `npm run stripe:setup` | cria produto e preços recorrentes na sua conta Stripe a partir de `content/planos.ts` (aceita `-- --dry-run`) |
| `npm run verificar:deploy -- <url>` | confere um deploy publicado: rotas, PWA, cabeçalhos de segurança e checkout |

> O service worker é desativado em desenvolvimento (`next-pwa`). Para testar o
> comportamento offline, use `npm run build && npm start`.

## Integração com o Stripe

O checkout tem três modos, escolhidos automaticamente pelas variáveis de
ambiente presentes:

| Modo | Quando é usado | O que acontece |
| --- | --- | --- |
| **Checkout Session** | `STRIPE_SECRET_KEY` + `STRIPE_PRICE_*` definidos | O servidor cria a sessão e redireciona para o Stripe |
| **Payment Link** | Apenas `NEXT_PUBLIC_STRIPE_LINK_*` definidos | Redireciona para o link de pagamento |
| **Demonstração** | Nenhuma credencial definida | Libera o acesso localmente, para avaliar a experiência |

### Configuração

1. Coloque `STRIPE_SECRET_KEY` no `.env.local`.
2. Rode `npm run stripe:setup` — ele cria o produto e os três preços recorrentes
   em BRL e imprime os `STRIPE_PRICE_*` prontos para colar.
3. Preencha também `NEXT_PUBLIC_SITE_URL` (usado nas URLs de retorno do
   checkout).
4. Cadastre o webhook apontando para `/api/stripe/webhook` e preencha
   `STRIPE_WEBHOOK_SECRET`.

O passo a passo completo do lançamento está em
[`docs/DEPLOY-VERCEL.md`](docs/DEPLOY-VERCEL.md).

Após o pagamento, o usuário volta para `/sucesso?session_id=...`; o app
confirma o pagamento em `/api/checkout/verificar` antes de liberar o conteúdo.

## Contas e direito de acesso

Não há banco de dados: o **Stripe é a fonte da verdade** sobre quem pagou, e é
consultado direto, com cache curto em memória. A identidade vem de um cookie
assinado por HMAC, e o aluno prova a posse do e-mail pelo link de acesso — o
mesmo e-mail do checkout, sem exigir cadastro antes de pagar.

A decisão acontece no servidor: o corpo da lição paga não é renderizado nem
enviado a quem não tem direito. Sem `AUTH_SECRET`, o app funciona como antes,
com a assinatura registrada no próprio aparelho. Passo a passo em
[`docs/CONTAS.md`](docs/CONTAS.md).

## Estrutura

O código é organizado por **feature**: cada área do produto é dona dos seus
componentes, do seu estado e da sua lógica.

```
src/
  app/                       rotas finas — só compõem as features
    page.tsx                 landing de vendas
    planos/                  planos e comparativo
    curso/                   fases e seções
    curso/[secaoId]/         lições da seção
    curso/[secaoId]/[licaoId]/  a lição
    simulado/                simulados e correção
    lab-ingles/              SOC English Lab
    progresso/  conta/  sucesso/  termos/  privacidade/
    api/checkout/            criação e verificação da sessão Stripe
    api/stripe/webhook/      webhook de assinaturas
  features/
    assinatura/              provider, checkout, paywall, conta
    curso/                   lista, seção, lição e navegação
    simulado/                execução, sorteio e resultado
    progresso/               provider, relatório e histórico
    lab-ingles/              listening e pronúncia
    pwa/                     convite de instalação
  components/
    layout/                  header, footer, bottom nav, safe area
    ui/                      toast, tema, barra de progresso, markdown
  providers/                 composição de providers e tema
  server/                    só roda no servidor
    auth/                    tokens assinados e sessão
    assinatura/              consulta da assinatura no Stripe
    email/                   envio do link de acesso
    progresso/               progresso do aluno no Upstash Redis
    simulado/                seleção das questões, com gabarito
  content/                   currículo, questões, planos, FAQ, lab e empresa
    catalogo.ts              GERADO: metadados seguros para o navegador
  lib/                       cliente Stripe (servidor)
public/                      manifesto, ícones, página offline, SW customizado
scripts/                     setup do Stripe e verificação de deploy
```

Todo o conteúdo do curso vive em `src/content/` — uma seção por arquivo em
`secoes/`, questões em `questoes/`, planos e preços em `planos.ts`. O guia para
adicionar conteúdo está em [`docs/CONTEUDO.md`](docs/CONTEUDO.md).

## Documentação

- [`docs/PLANO-E2E.md`](docs/PLANO-E2E.md) — o funil da landing até o checkpoint,
  o que já funciona e o que falta para produção
- [`docs/DEPLOY-VERCEL.md`](docs/DEPLOY-VERCEL.md) — deploy, variáveis de
  ambiente, webhook e domínio
- [`docs/CONTAS.md`](docs/CONTAS.md) — contas, direito de acesso consultado no
  Stripe e verificação no servidor
- [`docs/CONTEUDO.md`](docs/CONTEUDO.md) — como enviar e publicar o conteúdo de
  cada seção e lição

## Aviso de marcas

CompTIA®, CySA+® e a designação CS0-004 são marcas da CompTIA. Este projeto é
independente e não possui vínculo, patrocínio ou endosso da CompTIA.
