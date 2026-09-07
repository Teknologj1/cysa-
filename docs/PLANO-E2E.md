# Plano ponta a ponta

Da primeira visita na landing até o aluno concluir uma lição e fazer o
checkpoint. Este documento é o mapa do que já funciona e do que falta.

**Em produção:** https://cysa-tau.vercel.app — Vercel, Stripe em modo live e
webhook de assinaturas configurados.

## O funil, passo a passo

| # | Etapa | Onde acontece | Status |
| --- | --- | --- | --- |
| 1 | Visitante chega na landing | `/` | ✅ pronto |
| 2 | Entende a proposta, os domínios e as fases | `/` | ✅ pronto |
| 3 | Experimenta sem pagar (lições e questões grátis) | `/curso`, `/simulado` | ✅ pronto |
| 4 | Compara planos | `/planos` | ✅ pronto |
| 5 | Compra | `/api/checkout` → Stripe Checkout | ✅ em produção |
| 6 | Volta e tem o acesso liberado | `/sucesso` → `/api/checkout/verificar` | ⚠️ liberação é local, no aparelho |
| 7 | Entra na área do aluno | `/curso` | ✅ pronto |
| 8 | Abre uma seção e uma lição | `/curso/[secaoId]/[licaoId]` | ✅ pronto |
| 9 | Estuda, marca como concluída e avança | mesma tela | ✅ pronto |
| 10 | Faz o checkpoint da seção | `/simulado?secao=sNN` | ✅ pronto |
| 11 | Vê o desempenho por domínio e o que revisar | `/progresso` | ✅ pronto |
| 12 | Treina o inglês do SOC | `/lab-ingles` | ✅ pronto |
| 13 | Gerencia a assinatura | `/conta` | ⚠️ sem portal do Stripe |
| 14 | Instala o app e estuda offline | PWA | ✅ pronto |

## O que falta para o fluxo ficar de pé em produção

### Fase A — colocar no ar e vender ✅ concluída

Roteiro completo em [`DEPLOY-VERCEL.md`](DEPLOY-VERCEL.md).

1. ✅ Dados do responsável legal em `src/content/empresa.ts`
2. ✅ Produto e preços no Stripe, em modo live
3. ✅ Projeto na Vercel com as variáveis de ambiente cadastradas
4. ✅ Webhook de assinaturas apontando para `/api/stripe/webhook`
5. ✅ `NEXT_PUBLIC_SITE_URL` no domínio estável
6. ✅ Imagem de Open Graph gerada pelo próprio Next
7. ⏳ **Revisão jurídica** dos termos e da política de privacidade — os textos
   estão escritos e alinhados ao CDC e à LGPD, mas precisam do aval de um
   advogado antes da primeira cobrança real.

> O ciclo completo foi validado em modo teste: checkout, retorno em `/sucesso`,
> liberação do conteúdo e webhook entregando 200.

### Fase B — direito de acesso confiável (bloqueia escala)

Hoje o acesso liberado após o pagamento fica gravado no `localStorage` do
aparelho. Isso valida a experiência, mas **não acompanha o aluno entre
dispositivos e não é barreira de segurança**.

6. **Autenticação** — login por e-mail (magic link) ou provedor social.
   Recomendo Auth.js sobre Postgres da Vercel ou Supabase. *(médio)*
7. **Persistir a assinatura no banco**, usando o webhook do Stripe como fonte da
   verdade: `checkout.session.completed` cria o acesso, `subscription.deleted` e
   `invoice.payment_failed` revogam. O handler já existe em
   `/api/stripe/webhook`, hoje apenas registrando os eventos. *(médio)*
8. **Middleware de rota protegida** — validar a assinatura no servidor antes de
   entregar o conteúdo pago, em vez de esconder no cliente. *(médio)*
9. **Portal do cliente do Stripe** em `/conta`, para o aluno trocar cartão,
   ver faturas e cancelar sozinho. *(pequeno, depois de 6 e 7)*
10. **Sincronizar progresso** com a conta, mantendo o `localStorage` como cache
    offline. *(médio)*

### Fase C — conteúdo e escala

11. **Publicar as seções restantes** conforme o texto chega — ver
    `docs/CONTEUDO.md`. *(contínuo)*
12. **Ampliar o banco de questões** até dar para rodar o simulado em modo prova
    com 85 questões sem repetir. Hoje o modo prova respeita a proporção entre
    domínios mas usa o banco disponível. *(contínuo)*
13. **Labs práticos** (SIEM, Nessus, Sentinel) como os que o roadmap do curso
    promete. *(grande)*
14. **Materiais para download** (guia de estudo, modelos de relatório) — bom
    gancho de captura de e-mail na landing. *(médio)*

### Fase D — crescimento e operação

15. **Analytics com consentimento** (LGPD): banner de consentimento e eventos de
    funil — visitou planos, iniciou checkout, concluiu compra. *(médio)*
16. **E-mail transacional** de boas-vindas e de recuperação de carrinho. *(médio)*
17. **Notificações push** de lembrete de estudo — o service worker já trata
    `push` e `notificationclick` em `public/pwa-custom-sw.js`; falta o backend
    com chaves VAPID. *(médio)*
18. **Cupom e período de teste** — o checkout já aceita códigos promocionais
    (`allow_promotion_codes`), falta criar as campanhas no Stripe. *(pequeno)*

## Ordem sugerida

```
Fase A  →  lançamento com venda real e acesso local
Fase B  →  contas, acesso confiável entre dispositivos
Fase C  →  conteúdo entrando de forma contínua
Fase D  →  crescimento
```

A fase A está concluída: o app vende e entrega. A fase B é o que transforma o
produto em serviço de assinatura de verdade — sem ela, alguém que cancele
continua com o conteúdo liberado naquele aparelho até o fim do período gravado
localmente, e quem comprar no celular não terá acesso no computador.

Enquanto a fase B não vem, a recomendação é vender para um grupo controlado
(pré-venda, lista de espera, turma fechada), onde dá para resolver acesso na
mão, em vez de abrir a venda ao público.
