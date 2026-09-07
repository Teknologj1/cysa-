"use client";

import Link from "next/link";
import { useAssinatura } from "../AssinaturaProvider";
import { useToast } from "@/components/ui/Toast";
import { getPlano, formatarBRL } from "@/content/planos";

function formatarData(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ContaView() {
  const { assinatura, remover, pronto } = useAssinatura();
  const { addToast } = useToast();

  if (!pronto) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="h-48 animate-pulse rounded-2xl border border-border bg-muted/40" />
      </div>
    );
  }

  const plano = assinatura.planoId ? getPlano(assinatura.planoId) : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Minha conta</h1>

      <section className="mt-8 rounded-2xl border border-border bg-muted/20 p-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-medium">Assinatura</h2>
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
              assinatura.ativa
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-muted text-mutedFg"
            }`}
          >
            {assinatura.ativa ? "Ativa" : "Sem assinatura"}
          </span>
        </div>

        {assinatura.ativa && plano ? (
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-mutedFg">Plano</dt>
              <dd className="text-right font-medium">
                {plano.nome} — {formatarBRL(plano.precoCentavos)} /{" "}
                {plano.intervalo}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mutedFg">Início</dt>
              <dd className="text-right">{formatarData(assinatura.inicio)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-mutedFg">Renova em</dt>
              <dd className="text-right">{formatarData(assinatura.fim)}</dd>
            </div>
            {assinatura.email && (
              <div className="flex justify-between gap-4">
                <dt className="text-mutedFg">E-mail</dt>
                <dd className="text-right break-all">{assinatura.email}</dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt className="text-mutedFg">Origem</dt>
              <dd className="text-right">
                {assinatura.origem === "stripe"
                  ? "Pagamento via Stripe"
                  : "Modo demonstração"}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-4 text-sm text-mutedFg">
            Você ainda não tem uma assinatura ativa. Com ela, todas as seções,
            laboratórios e simulados ficam liberados.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {assinatura.ativa ? (
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "Remover o acesso deste aparelho? Para encerrar a cobrança recorrente, cancele também no portal do Stripe."
                  )
                ) {
                  remover();
                  addToast({
                    type: "info",
                    title: "Acesso removido deste aparelho",
                    message:
                      "A cobrança recorrente é gerenciada pelo Stripe e deve ser cancelada por lá.",
                  });
                }
              }}
              className="rounded-xl border border-border px-4 py-2.5 text-sm transition hover:bg-muted"
            >
              Remover acesso deste aparelho
            </button>
          ) : (
            <Link
              href="/planos"
              className="rounded-xl bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primaryFg transition hover:opacity-90"
            >
              Ver planos
            </Link>
          )}
        </div>
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
          Seu progresso e o histórico de simulados ficam gravados apenas neste
          aparelho. Os dados de pagamento são processados pelo Stripe e não
          passam por este app.{" "}
          <Link href="/privacidade" className="text-primary hover:underline">
            Política de privacidade
          </Link>
        </p>
      </section>
    </div>
  );
}
