# CySA+ Prep — PWA de assinatura do curso preparatório CS0-003

Aplicativo web progressivo (PWA) para **vender a assinatura** e **entregar o
conteúdo** de um curso preparatório para a certificação CompTIA CySA+
(exame CS0-003).

A base técnica segue o mesmo modelo do projeto `my-motogp-pwa`: Next.js 15
(App Router) + Tailwind CSS v4 + `next-pwa` + `next-themes`, com service worker
customizado, página offline, manifesto instalável e headers de segurança.

## O que já está pronto

**Vitrine e conversão**
- Landing page com proposta de valor, pesos dos 4 domínios do exame, ementa
  completa, comparativo de planos e FAQ.
- Três planos de assinatura (mensal, trimestral e anual) com checkout.
- Páginas de termos de uso e privacidade (modelos a revisar juridicamente).

**Área do aluno**
- 9 módulos e 44 aulas mapeadas aos domínios oficiais (33% / 30% / 20% / 17%).
- Marcação de aulas concluídas e progresso por módulo e por domínio.
- Simulados com filtro por domínio, cronômetro, correção comentada e
  relatório de desempenho.
- Data-alvo da prova com contagem regressiva e histórico de tentativas.
- Amostra grátis: aulas e questões liberadas sem assinatura, para conversão.

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

Outros comandos: `npm run build`, `npm start`, `npm run lint`,
`npm run typecheck`.

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

1. No painel do Stripe, crie um produto e três **preços recorrentes**
   (mensal, trimestral e anual) em BRL.
2. Preencha no `.env.local`:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_MENSAL`, `STRIPE_PRICE_TRIMESTRAL`, `STRIPE_PRICE_ANUAL`
   - `NEXT_PUBLIC_SITE_URL` (usado nas URLs de retorno do checkout)
3. Cadastre o webhook apontando para `/api/stripe/webhook` e preencha
   `STRIPE_WEBHOOK_SECRET`.

Após o pagamento, o usuário volta para `/sucesso?session_id=...`; o app
confirma o pagamento em `/api/checkout/verificar` antes de liberar o conteúdo.

### Limite conhecido desta versão

Não há backend de contas: o acesso liberado após o pagamento é gravado **no
aparelho** (armazenamento local do navegador), então não acompanha o aluno
entre dispositivos e não é uma barreira de segurança. O caminho natural de
evolução é adicionar autenticação e persistir a assinatura no banco, usando o
webhook do Stripe (`/api/stripe/webhook`) como fonte da verdade — o handler já
está pronto para receber os eventos do ciclo de vida da assinatura.

## Estrutura

```
src/
  app/
    page.tsx                 landing de vendas
    planos/                  planos e comparativo
    curso/                   lista de módulos
    curso/[moduloId]/        aulas do módulo
    simulado/                simulados e correção
    progresso/               progresso e histórico
    conta/                   status da assinatura
    sucesso/                 retorno do checkout
    api/checkout/            criação e verificação da sessão Stripe
    api/stripe/webhook/      webhook de assinaturas
  components/                UI, PWA, estado e paywall
  content/                   currículo, planos, questões e FAQ
  lib/                       assinatura, progresso e cliente Stripe
public/                      manifesto, ícones, página offline, SW customizado
```

Todo o conteúdo do curso vive em `src/content/` — currículo em
`curriculum.ts`, banco de questões em `questions.ts`, planos e preços em
`plans.ts`.

## Aviso de marcas

CompTIA®, CySA+® e a designação CS0-003 são marcas da CompTIA. Este projeto é
independente e não possui vínculo, patrocínio ou endosso da CompTIA.
