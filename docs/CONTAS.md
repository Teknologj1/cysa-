# Contas e direito de acesso (Fase B)

Como o acesso deixa de morar no navegador do aluno e passa a valer em qualquer
aparelho — **sem banco de dados**.

**Enquanto as variáveis abaixo não existirem, o app funciona como antes**, com a
assinatura registrada no próprio aparelho. Nada quebra durante a configuração.

## A ideia

O Stripe já é a fonte da verdade sobre quem pagou. Em vez de manter um banco
espelhando essa informação — e conviver com o espelho desatualizado — o app
pergunta direto para o Stripe.

```
Stripe (fonte da verdade)
   │  consulta por e-mail: customers.list → subscriptions.list
   ▼
acessoDoUsuario()  →  a página decide, no servidor, o que renderizar
   ▲
   │  identidade: cookie assinado por HMAC
   │
o aluno prova a posse do e-mail entrando pelo link de acesso
```

Três consequências:

- **Não existe banco para manter, migrar ou pagar.**
- **Não existe estado para dessincronizar.** Cancelou no Stripe, perdeu o acesso.
- **Nada é armazenado sobre a sessão.** O cookie é assinado; a assinatura
  criptográfica é o que prova que ele saiu daqui.

Um cache em memória de 5 minutos evita ir ao Stripe a cada página. O webhook
derruba esse cache assim que algo muda, então compra e cancelamento refletem na
hora.

## O que muda quando ligar

| | Antes | Depois |
| --- | --- | --- |
| Onde mora o acesso | `localStorage` do navegador | Stripe, consultado no servidor |
| Vale em outro aparelho | não | sim |
| Cancelou, perde acesso | não | sim, no fim do período pago |
| Conteúdo pago | escondido no cliente | **não é enviado** sem direito de acesso |
| Trocar cartão, ver fatura | não tinha | portal do Stripe em `/conta` |

## 1. Gerar o segredo da sessão

```bash
openssl rand -base64 32
```

Cadastre o resultado na Vercel como `AUTH_SECRET`, tipo **Secret**, em
Production e Preview.

É esse segredo que assina o cookie de sessão e o link de acesso. Trocá-lo
desconecta todo mundo — o que também é a forma de encerrar todas as sessões de
uma vez, se algum dia precisar.

Com `AUTH_SECRET` e `STRIPE_SECRET_KEY` presentes, as contas estão ativas: quem
paga entra direto pelo retorno do checkout, sem precisar de e-mail.

## 2. Configurar o envio do link de acesso

Necessário só para quem volta em **outro aparelho** — quem acabou de comprar já
entra pelo retorno do pagamento.

1. Em [resend.com](https://resend.com), crie a API key
2. Verifique o domínio do remetente (Domains → Add domain) e publique os
   registros DNS que ele pedir
3. Cadastre na Vercel:

| Variável | Valor | Type |
| --- | --- | --- |
| `RESEND_SECRET_KEY` | `re_…` | **Secret** |
| `EMAIL_REMETENTE` | `CySA+ Prep <acesso@seudominio.com.br>` | Config |

Sem domínio verificado, o Resend só entrega para o e-mail da própria conta —
serve para testar, não para vender.

Depois de salvar as variáveis: **redeploy**.

## 3. Testar o fluxo completo

1. Compre pelo checkout com um e-mail que você acessa
2. Ao voltar em `/sucesso`, deve aparecer **"Você já está conectado"**
3. Abra uma lição paga: deve abrir
4. Abra a mesma lição numa **janela anônima**, sem login: deve mostrar o paywall
5. Na janela anônima, vá em `/entrar`, peça o link com o mesmo e-mail e clique
   nele no e-mail recebido — a lição deve abrir
6. Em `/conta`, clique em **Gerenciar assinatura** para abrir o portal do Stripe
7. Cancele pelo portal e confira que `/conta` passa a exibir "Acesso até"

O passo 4 é o que prova que a proteção é real: sem sessão válida, o corpo da
lição não é sequer renderizado no servidor.

## O que sai do servidor

Não basta deixar de renderizar o conteúdo pago: **toda propriedade passada a um
Client Component é serializada no HTML da página**. Mandar o objeto da lição
inteiro entregaria o markdown junto, legível em "ver código-fonte", mesmo com o
paywall aparecendo por cima.

Por isso o servidor monta explicitamente o recorte que pode sair
(`features/curso/lib/publico.ts`):

| Sempre | Só com direito de acesso |
| --- | --- |
| id, título, resumo, duração, tipo, objetivo, se é grátis | corpo da lição, pontos-chave, dica de prova, tarefa, recursos |

Vale para a página da lição e para a da seção. Ao criar uma tela nova que
receba conteúdo, passe pelo mesmo recorte.

## Como o acesso é decidido

Status que dão acesso: `active`, `trialing` e `past_due` (pagamento em nova
tentativa). Cancelamento mantém o acesso até o fim do período pago, como manda o
contrato.

Não exigimos cadastro antes de pagar: a compra é registrada pelo e-mail do
checkout, e o login apenas prova que aquele e-mail é seu. Menos atrito na venda,
mesmo resultado.

## Sincronização do progresso

Lições concluídas, histórico de simulados e data-alvo da prova são o único dado
do produto que não vive no Stripe — ele é nosso, e por isso precisa de
armazenamento próprio.

### Configurar

1. Em [upstash.com](https://upstash.com), crie um banco Redis (região São Paulo
   ou us-east-1; o tier gratuito cobre folgadamente esse volume)
2. Copie **REST URL** e **REST Token**
3. Cadastre na Vercel:

| Variável | Type |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | Config |
| `UPSTASH_REDIS_REST_TOKEN` | **Secret** |

Sem elas, o progresso continua funcionando — só não acompanha o aluno entre
aparelhos.

### Como a mesclagem funciona

O `localStorage` continua sendo a fonte imediata: o aparelho grava na hora e
envia ao servidor dois segundos depois da última alteração. Ao entrar na conta,
o app puxa o que existe e mescla com o que está no aparelho.

A mesclagem é feita no servidor, com regras explícitas
(`lib/progresso-merge.ts`, coberto por testes):

| Dado | Regra |
| --- | --- |
| Lições concluídas | **união** dos dois lados — nada se perde |
| Histórico de simulados | união por id, mais recentes primeiro, limite de 30 |
| Data-alvo da prova | vence a alteração mais recente |

A união nas lições tem uma consequência deliberada: **desmarcar uma lição vale
só no aparelho onde foi desmarcada**. É o preço de nunca descartar o estudo de
quem trabalhou offline, e o erro mais barato dos dois.

## Limites conhecidos

- **O link de acesso pode ser reusado dentro dos 30 minutos de validade.**
  Marcar como usado exigiria armazenamento; o prazo curto é a mitigação. Se um
  dia isso incomodar, é o primeiro motivo real para introduzir um banco.
- **O cache de 5 minutos é por instância.** O webhook derruba o cache da
  instância que o recebeu; outra instância pode levar alguns minutos para
  reavaliar. Na prática o efeito é imperceptível.
- **Conteúdo já baixado continua offline.** O service worker guarda as páginas
  visitadas; quem cancela mantém no cache o que já abriu, até o cache expirar.
  Rotas de sessão, pagamento e autenticação nunca são cacheadas.
- **Trocar o e-mail no Stripe** muda a chave de acesso: o aluno passa a entrar
  com o novo endereço.
