"use client";

import Link from "next/link";
import { useApp } from "./AppStateProvider";

/**
 * Libera o conteúdo para assinantes. `liberado` permite abrir conteúdo
 * de amostra (aulas e questões gratuitas) sem assinatura.
 */
export default function PaywallGate({
  children,
  liberado = false,
  titulo = "Conteúdo exclusivo para assinantes",
  descricao = "Assine para desbloquear todos os módulos, laboratórios e simulados do CS0-003.",
}: {
  children: React.ReactNode;
  liberado?: boolean;
  titulo?: string;
  descricao?: string;
}) {
  const { assinatura, pronto } = useApp();

  if (!pronto) {
    return (
      <div
        className="h-40 animate-pulse rounded-2xl border border-border bg-muted/40"
        aria-hidden
      />
    );
  }

  if (liberado || assinatura.ativa) {
    return <>{children}</>;
  }

  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-lg">
        🔒
      </div>
      <h3 className="mt-4 text-base font-semibold">{titulo}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-mutedFg">{descricao}</p>
      <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
        <Link
          href="/planos"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primaryFg transition hover:opacity-90"
        >
          Ver planos
        </Link>
        <Link
          href="/simulado"
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
        >
          Testar questões grátis
        </Link>
      </div>
    </div>
  );
}
