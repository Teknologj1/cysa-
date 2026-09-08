"use client";

import Link from "next/link";
import { useAssinatura } from "../AssinaturaProvider";

/**
 * Libera o conteúdo para assinantes. `liberado` permite abrir conteúdo
 * de amostra (lições e questões gratuitas) sem assinatura.
 */
export default function PaywallGate({
  children,
  liberado = false,
  aguardando,
  mostrarEntrar = false,
  espera = null,
  titulo = "Conteúdo exclusivo para assinantes",
  descricao = "Assine para desbloquear todas as seções, laboratórios e simulados do CS0-004.",
}: {
  children: React.ReactNode;
  liberado?: boolean;
  /** Espera a hidratação antes de decidir. Quando o servidor já decidiu, false. */
  aguardando?: boolean;
  /** Oferece o login para quem já comprou e está apenas deslogado. */
  mostrarEntrar?: boolean;
  /**
   * Conteúdo retido por carência, não por falta de pagamento. Tem precedência
   * sobre a assinatura ativa: quem pagou não pode receber "assine agora".
   */
  espera?: { dias: number } | null;
  titulo?: string;
  descricao?: string;
}) {
  const { ativa, pronto } = useAssinatura();
  const esperando = aguardando ?? !pronto;

  if (esperando) {
    return (
      <div
        className="h-40 animate-pulse rounded-2xl border border-border bg-muted/40"
        aria-hidden
      />
    );
  }

  if (liberado) {
    return <>{children}</>;
  }

  if (espera) {
    return (
      <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-lg">
          🗓️
        </div>
        <h3 className="mt-4 text-base font-semibold">
          {espera.dias === 1
            ? "Esta seção abre amanhã"
            : `Esta seção abre em ${espera.dias} dias`}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-mutedFg">
          Na primeira semana o curso libera as seções 1 e 2, os fundamentos que
          sustentam todo o resto. A partir do 8º dia de assinatura as demais
          seções abrem de uma vez.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            href="/curso"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primaryFg transition hover:opacity-90"
          >
            Voltar ao curso
          </Link>
          <Link
            href="/simulado"
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            Praticar o que já abriu
          </Link>
        </div>
      </div>
    );
  }

  if (ativa) {
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
        {mostrarEntrar ? (
          <Link
            href="/entrar"
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            Já assinei — entrar
          </Link>
        ) : (
          <Link
            href="/simulado"
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            Testar questões grátis
          </Link>
        )}
      </div>
    </div>
  );
}
