"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAssinatura } from "../AssinaturaProvider";
import type { PlanId } from "@/content/planos";

type Estado = "verificando" | "confirmado" | "demo" | "falhou";

type RespostaVerificacao = {
  modo?: string;
  pago?: boolean;
  planoId?: PlanId | null;
  email?: string | null;
  /** true quando o pagamento já abriu a sessão neste navegador. */
  sessaoAberta?: boolean;
  erro?: string;
};

export default function SucessoView() {
  const parametros = useSearchParams();
  const sessionId = parametros.get("session_id");
  const ehDemo = parametros.get("demo") === "1";

  const { ativar, assinatura, contasAtivas } = useAssinatura();
  const [sessaoAberta, setSessaoAberta] = useState(false);
  const [estado, setEstado] = useState<Estado>(
    ehDemo ? "demo" : sessionId ? "verificando" : "falhou"
  );
  const jaVerificou = useRef(false);

  useEffect(() => {
    if (!sessionId || ehDemo || jaVerificou.current) return;
    jaVerificou.current = true;

    (async () => {
      try {
        const resposta = await fetch(
          `/api/checkout/verificar?session_id=${encodeURIComponent(sessionId)}`
        );
        const dado = (await resposta.json()) as RespostaVerificacao;

        if (dado.pago && dado.planoId) {
          ativar(dado.planoId, "stripe", dado.email ?? null, sessionId);
          setSessaoAberta(Boolean(dado.sessaoAberta));
          setEstado("confirmado");
          return;
        }
        setEstado("falhou");
      } catch {
        setEstado("falhou");
      }
    })();
  }, [sessionId, ehDemo, ativar]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      {estado === "verificando" && (
        <>
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-border border-t-primary" />
          <h1 className="mt-6 text-2xl font-bold">Confirmando seu pagamento…</h1>
          <p className="mt-2 text-mutedFg">Isso leva só alguns segundos.</p>
        </>
      )}

      {(estado === "confirmado" || estado === "demo") && (
        <>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl text-emerald-400">
            ✓
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            {estado === "demo"
              ? "Acesso liberado em modo demonstração"
              : "Assinatura confirmada!"}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-mutedFg">
            {estado === "demo"
              ? "O Stripe ainda não está configurado neste ambiente, então liberamos o conteúdo para você avaliar a experiência completa."
              : "Todas as seções, laboratórios e simulados estão liberados. Bons estudos!"}
          </p>

          {contasAtivas && sessaoAberta && (
            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.06] p-4 text-left">
              <p className="text-sm font-medium text-emerald-400">
                Você já está conectado
              </p>
              <p className="mt-2 text-sm text-mutedFg">
                Para estudar em outro aparelho, é só pedir um link de acesso em{" "}
                <Link href="/entrar" className="text-primary hover:underline">
                  entrar
                </Link>{" "}
                usando este mesmo e-mail.
              </p>
            </div>
          )}

          {contasAtivas && !sessaoAberta && (
            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-cyan-500/40 bg-cyan-500/[0.06] p-4 text-left">
              <p className="text-sm font-medium">Falta um passo</p>
              <p className="mt-2 text-sm text-mutedFg">
                Entre com o mesmo e-mail da compra para o acesso valer em
                qualquer aparelho.
              </p>
              <Link
                href="/entrar?proximo=/curso"
                className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primaryFg"
              >
                Entrar com meu e-mail
              </Link>
            </div>
          )}

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/curso"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primaryFg transition hover:opacity-90"
            >
              Começar o curso
            </Link>
            <Link
              href="/progresso"
              className="rounded-xl border border-border px-6 py-3 text-sm font-medium transition hover:bg-muted"
            >
              Definir data da prova
            </Link>
          </div>

          {assinatura.ativa && (
            <p className="mt-6 text-xs text-mutedFg">
              Dica: instale o app na tela de início para estudar offline.
            </p>
          )}
        </>
      )}

      {estado === "falhou" && (
        <>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-2xl text-amber-400">
            !
          </div>
          <h1 className="mt-6 text-2xl font-bold">
            Não conseguimos confirmar o pagamento
          </h1>
          <p className="mx-auto mt-3 max-w-md text-mutedFg">
            Se a cobrança foi feita, o acesso é liberado assim que o Stripe
            confirmar. Recarregue esta página em alguns instantes ou fale com o
            suporte informando o código da sessão.
          </p>
          {sessionId && (
            <p className="mt-4 break-all font-mono text-xs text-mutedFg">
              {sessionId}
            </p>
          )}
          <Link
            href="/planos"
            className="mt-8 inline-block rounded-xl border border-border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            Voltar para os planos
          </Link>
        </>
      )}
    </div>
  );
}
