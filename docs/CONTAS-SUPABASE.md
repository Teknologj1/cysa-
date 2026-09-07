# Contas e assinaturas (Fase B)

Como ligar as contas de verdade: assinatura gravada no banco, login por link
mágico e verificação do acesso no servidor.

**Enquanto estas variáveis não existirem, o app continua funcionando como
antes** — a assinatura fica registrada no aparelho. Nada quebra durante a
configuração.

## O que muda quando ligar

| | Antes | Depois |
| --- | --- | --- |
| Onde mora o acesso | `localStorage` do navegador | Postgres, alimentado pelo webhook do Stripe |
| Vale em outro aparelho | não | sim |
| Cancelou, perde acesso | não, até a data gravada localmente | sim, no fim do período pago |
| Conteúdo pago | escondido no cliente | **não é enviado** sem direito de acesso |
| Trocar cartão, ver fatura | não tinha | portal do Stripe em `/conta` |

## 1. Criar o projeto no Supabase

1. [supabase.com](https://supabase.com) → **New project**
2. Region: **South America (São Paulo)** — menor latência para o público brasileiro
3. Guarde a senha do banco que ele gerar (você não vai precisar dela aqui, mas
   não dá para recuperar depois)

## 2. Rodar a migração

No painel do Supabase, **SQL Editor → New query**, cole o conteúdo de
[`supabase/migrations/0001_assinaturas.sql`](../supabase/migrations/0001_assinaturas.sql)
e execute.

Ela cria a tabela `assinaturas` com RLS ligada **e nenhuma política** — ou seja,
inacessível pelas chaves públicas. Só a service role, usada no nosso servidor,
enxerga os dados. É de propósito: quem decide o acesso é o código, não o
cliente.

## 3. Configurar a autenticação

Em **Authentication → Providers**, deixe **Email** habilitado e desligue
"Confirm password" (usamos apenas link mágico, sem senha).

Em **Authentication → URL Configuration**:

- **Site URL:** `https://cysa-tau.vercel.app`
- **Redirect URLs:** adicione `https://cysa-tau.vercel.app/auth/callback`

Sem isso o link do e-mail volta para `localhost` e não funciona.

> O Supabase envia os e-mails por um serviço compartilhado, com limite baixo e
> entrega irregular. Antes de abrir a venda, configure um SMTP próprio em
> **Authentication → SMTP Settings** (Resend, Postmark ou SendGrid). E-mail de
> login que cai em spam é assinante perdido.

## 4. Cadastrar as variáveis na Vercel

Em **Settings → API** do Supabase, copie:

| Variável | Onde achar | Type na Vercel |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL | Config |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / public key | Config |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key | **Secret** |

A service role atravessa a RLS: ela nunca vai para o navegador, nunca para o
git, e na Vercel entra como Secret. As duas primeiras são públicas por natureza
(vão no bundle do cliente) e por isso são Config.

Depois de salvar: **redeploy**.

## 5. Testar o fluxo completo

1. Compre pelo checkout com um e-mail que você acessa
2. No Supabase, **Table Editor → assinaturas** — deve aparecer uma linha com
   `status = active` e o `periodo_fim` preenchido
3. Em `/entrar`, peça o link com **o mesmo e-mail** e clique nele no e-mail
4. Abra uma lição paga: deve abrir
5. Abra a mesma lição numa janela anônima, sem login: deve mostrar o paywall
6. Em `/conta`, clique em **Gerenciar assinatura** — abre o portal do Stripe
7. Cancele pelo portal e confira em `/conta` que passou a exibir "Acesso até"

O passo 5 é o que prova que a proteção é real: sem sessão válida, o corpo da
lição não é sequer renderizado no servidor.

## Como o acesso é decidido

```
Stripe (fonte da verdade)
   │  webhook: checkout.session.completed, customer.subscription.*
   ▼
tabela assinaturas  (chave: e-mail da compra)
   │
   │  o aluno prova a posse do e-mail entrando por link mágico
   ▼
acessoDoUsuario()  →  a página decide, no servidor, o que renderizar
```

Não exigimos cadastro antes de pagar: a compra é registrada pelo e-mail do
checkout, e o login apenas prova que aquele e-mail é seu. Menos atrito na venda,
mesmo resultado.

Status que dão acesso: `active`, `trialing` e `past_due` (pagamento em nova
tentativa). Cancelamento mantém o acesso até `periodo_fim`, como manda o
contrato.

## Limites conhecidos

- **Progresso ainda é local.** Lições concluídas e simulados continuam no
  aparelho, não na conta. É a próxima peça natural.
- **Conteúdo já baixado continua offline.** O service worker guarda as páginas
  visitadas; quem cancela mantém no cache o que já abriu, até o cache expirar.
  Rotas de sessão e pagamento nunca são cacheadas.
- **E-mail trocado no Stripe** não migra a assinatura sozinho: a linha continua
  no e-mail original. Ajuste na tabela se acontecer.
