-- Assinaturas do CySA+ Prep.
--
-- A assinatura é vinculada ao e-mail usado no checkout do Stripe. O aluno
-- prova a posse desse e-mail entrando por link mágico, e é assim que a compra
-- se liga à conta — sem exigir cadastro antes de pagar.

create table if not exists public.assinaturas (
  id uuid primary key default gen_random_uuid(),

  -- Sempre gravado em minúsculas; ver o gatilho abaixo.
  email text not null,

  stripe_customer_id text,
  stripe_subscription_id text unique,
  stripe_checkout_session_id text,

  -- Corresponde a PlanId em src/content/planos.ts.
  plano_id text,

  -- Espelha o status da assinatura no Stripe: active, trialing, past_due,
  -- canceled, incomplete, incomplete_expired, unpaid, paused.
  status text not null,

  -- Fim do período pago. O acesso vale até esta data mesmo após o cancelamento.
  periodo_fim timestamptz,

  criada_em timestamptz not null default now(),
  atualizada_em timestamptz not null default now()
);

-- Consulta quente: "este e-mail tem acesso agora?"
create index if not exists assinaturas_email_idx
  on public.assinaturas (lower(email));

create index if not exists assinaturas_status_idx
  on public.assinaturas (status);

-- Normaliza o e-mail e mantém a data de atualização.
create or replace function public.assinaturas_antes_de_gravar()
returns trigger
language plpgsql
as $$
begin
  new.email := lower(trim(new.email));
  new.atualizada_em := now();
  return new;
end;
$$;

drop trigger if exists assinaturas_antes_de_gravar on public.assinaturas;
create trigger assinaturas_antes_de_gravar
  before insert or update on public.assinaturas
  for each row execute function public.assinaturas_antes_de_gravar();

-- RLS ligada e sem política nenhuma: a tabela fica inacessível pelas chaves
-- anônima e de usuário. Só a service role, usada no servidor, atravessa.
-- É de propósito: quem decide o acesso é o nosso código, não o cliente.
alter table public.assinaturas enable row level security;

comment on table public.assinaturas is
  'Assinaturas espelhadas do Stripe. Fonte da verdade: eventos do webhook.';
