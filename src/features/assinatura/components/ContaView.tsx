"use client";

import Link from "next/link";
import { useState } from "react";
import { useAssinatura } from "../AssinaturaProvider";
import { useToast } from "@/components/ui/Toast";
import { getPlano, formatarBRL } from "@/content/planos";
import type { PlanId } from "@/content/planos";

export type AssinaturaDoServidor = {
  planoId: PlanId | null;
  status: string;
  periodoFim: string | null;
  criadaEm: string;
  temClienteStripe: boolean;
};

export type EstadoServidor = {
  contasAtivas: boolean;
  logado: boolean;
  email: string | null;
  liberado: boolean;
  assinatura: AssinaturaDoServidor | null;
};

const ROTULO_STATUS: Record<string, string> = {
  active: "Ativa",
  trialing: "Em teste",
  past_due: "Pagamento pendente",
  canceled: "Cancelada",
  unpaid: "Não paga",
  incomplete: "Incompleta",
  incomplete_expired: "Expirada",
  paused: "Pausada",
};

function formatarData(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ContaView({ servidor }: { servidor: EstadoServidor }) {
  const { assinatura: local, remover, pronto } = useAssinatura();
  const { addToast } = useToast();
  const [abrindoPortal, setAbrindoPortal] = useState(false);

  async function abrirPortal() {
    setAbrindoPortal(true);
    try {
      const resposta = await fetch("/api/portal", { method: "POST" });
      const dado = (await resposta.json()) as { url?: string; erro?: string };

      if (dado.url) {
        window.location.href = dado.url;
        return;
      }
      addToast({
        type: "error",
        title: "Não foi possível abrir o portal",
        message: dado.erro,
      });
    } catch {
      addToast({ type: "error", title: "Falha de conexão" });
    } finally {
      setAbrindoPortal(false);
    }
  }

  // ------------------------------------------------ contas ainda desativadas
  if (!servidor.contasAtivas) {
    if (!pronto) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-10">
          <div className="h-48 animate-pulse rounded-2xl border border-border bg-muted/40" />
        </div>
      );
    }

    const plano = local.planoId ? getPlano(local.planoId) : undefined;

    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Minha conta</h1>

        <section className="mt-8 rounded-2xl border border-border bg-muted/20 p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-medium">Assinatura neste aparelho</h2>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                local.ativa
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-muted text-mutedFg"
              }`}
            >
              {local.ativa ? "Ativa" : "Sem assinatura"}
            </span>
          </div>

          {local.ativa && plano ? (
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-mutedFg">Plano</dt>
                <dd className="text-right font-medium">
                  {plano.nome} — {formatarBRL(plano.precoCentavos)} /{" "}
                  {plano.intervalo}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-mutedFg">Renova em</dt>
                <dd className="text-right">{formatarData(local.fim)}</dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm text-mutedFg">
              Você ainda não tem uma assinatura ativa neste aparelho.
            </p>
          )}

          <div className="mt-6">
            {local.ativa ? (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Remover o acesso deste aparelho?")) {
                    remover();
                  }
                }}
                className="rounded-xl border border-border px-4 py-2.5 text-sm transition hover:bg-muted"
              >
                Remover acesso deste aparelho
              </button>
            ) : (
              <Link
                href="/planos"
                className="inline-block rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primaryFg transition hover:opacity-90"
              >
                Ver planos
              </Link>
            )}
          </div>
        </section>
      </div>
    );
  }

  // ----------------------------------------------------- não está logado
  if (!servidor.logado) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Minha conta</h1>
        <p className="mx-auto mt-3 max-w-md text-mutedFg">
          Entre com o e-mail que você usou na compra para ver sua assinatura e
          liberar o conteúdo em qualquer aparelho.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/entrar?proximo=/conta"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primaryFg transition hover:opacity-90"
          >
            Entrar
          </Link>
          <Link
            href="/planos"
            className="rounded-xl border border-border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            Ver planos
          </Link>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------- logado
  const assinatura = servidor.assinatura;
  const plano = assinatura?.planoId ? getPlano(assinatura.planoId) : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Minha conta</h1>
      <p className="mt-2 text-sm text-mutedFg">{servidor.email}</p>

      <section className="mt-8 rounded-2xl border border-border bg-muted/20 p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-medium">Assinatura</h2>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              servidor.liberado
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-muted text-mutedFg"
            }`}
          >
            {assinatura
              ? (ROTULO_STATUS[assinatura.status] ?? assinatura.status)
              : "Sem assinatura"}
          </span>
        </div>

        {assinatura ? (
          <dl className="mt-5 space-y-3 text-sm">
            {plano && (
              <div className="flex justify-between gap-4">
                <dt className="text-mutedFg">Plano</dt>
                <dd className="text-right font-medium">
                  {plano.nome} — {formatarBRL(plano.precoCentavos)} /{" "}
                  {plano.intervalo}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="text-mutedFg">Início</dt>
              <dd className="text-right">{formatarData(assinatura.criadaEm)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mutedFg">
                {assinatura.status === "canceled" ? "Acesso até" : "Renova em"}
              </dt>
              <dd className="text-right">{formatarData(assinatura.periodoFim)}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-4 text-sm text-mutedFg">
            Não encontramos nenhuma assinatura para <strong>{servidor.email}</strong>.
            Se você comprou com outro e-mail, entre com ele.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {assinatura?.temClienteStripe ? (
            <button
              type="button"
              onClick={abrirPortal}
              disabled={abrindoPortal}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primaryFg transition hover:opacity-90 disabled:opacity-60"
            >
              {abrindoPortal ? "Abrindo…" : "Gerenciar assinatura"}
            </button>
          ) : (
            <Link
              href="/planos"
              className="rounded-xl bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primaryFg transition hover:opacity-90"
            >
              Ver planos
            </Link>
          )}

          <form action="/auth/sair" method="post">
            <button
              type="submit"
              className="w-full rounded-xl border border-border px-4 py-2.5 text-sm transition hover:bg-muted"
            >
              Sair
            </button>
          </form>
        </div>

        {assinatura?.temClienteStripe && (
          <p className="mt-4 text-xs text-mutedFg">
            No portal do Stripe você troca o cartão, baixa faturas e cancela a
            assinatura. O acesso continua até o fim do período já pago.
          </p>
        )}
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-muted/20 p-5">
        <h2 className="text-sm font-medium">Estudo offline</h2>
        <p className="mt-3 text-sm text-mutedFg">
          Instale o CySA+ Prep na tela de início do seu celular para estudar sem
          conexão. No Android e no desktop, use o convite de instalação ou o menu
          do navegador; no iPhone, toque em Compartilhar e depois em “Adicionar à
          Tela de Início”.
        </p>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-muted/20 p-5">
        <h2 className="text-sm font-medium">Privacidade dos seus dados</h2>
        <p className="mt-3 text-sm text-mutedFg">
          Seu progresso e o histórico de simulados ficam no seu aparelho e, se
          você estiver logado, sincronizados com a sua conta. Os dados de
          pagamento são processados pelo Stripe e não passam por este app.{" "}
          <Link href="/privacidade" className="text-primary hover:underline">
            Política de privacidade
          </Link>
        </p>
      </section>
    </div>
  );
}
