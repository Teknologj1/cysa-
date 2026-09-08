"use client";

import Link from "next/link";
import { useMemo } from "react";
import { DOMINIOS, getDominio } from "@/content/dominios";
import { SECOES_CATALOGO, TOTAL_LICOES_CATALOGO } from "@/content/catalogo";
import { EXAME } from "@/content/exame";
import type { DominioId } from "@/content/types";
import { useProgresso } from "../ProgressoProvider";
import { useAssinatura } from "@/features/assinatura/AssinaturaProvider";
import ProgressBar from "@/components/ui/ProgressBar";
import { percentual } from "../lib/progresso";
import { CORTE_APROVACAO } from "@/features/simulado/lib/simulado";

function diasAte(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
}

export default function ProgressoView() {
  const { progresso, definirDataProva, limpar, pronto, sincronizando } =
    useProgresso();
  const { contasAtivas, logado } = useAssinatura();

  const concluidas = progresso.licoesConcluidas.length;
  const geral = percentual(concluidas, TOTAL_LICOES_CATALOGO);

  /** Desempenho acumulado por domínio, somando todas as tentativas. */
  const desempenho = useMemo(() => {
    const acumulado: Partial<Record<DominioId, { acertos: number; total: number }>> = {};
    for (const tentativa of progresso.tentativas) {
      for (const [dominio, dado] of Object.entries(tentativa.porDominio)) {
        if (!dado) continue;
        const chave = dominio as DominioId;
        const atual = acumulado[chave] ?? { acertos: 0, total: 0 };
        acumulado[chave] = {
          acertos: atual.acertos + dado.acertos,
          total: atual.total + dado.total,
        };
      }
    }
    return acumulado;
  }, [progresso.tentativas]);

  /** Domínio com pior aproveitamento, ponderado pelo peso na prova. */
  const focoSugerido = useMemo(() => {
    const candidatos = DOMINIOS.map((dominio) => {
      const dado = desempenho[dominio.id];
      if (!dado || dado.total < 3) return null;
      const acerto = dado.acertos / dado.total;
      return { dominio, acerto, prioridade: (1 - acerto) * dominio.peso };
    }).filter((c): c is NonNullable<typeof c> => c !== null);

    if (candidatos.length === 0) return null;
    return candidatos.sort((a, b) => b.prioridade - a.prioridade)[0];
  }, [desempenho]);

  const ultima = progresso.tentativas[0];
  const dias = progresso.dataProva ? diasAte(progresso.dataProva) : null;

  if (!pronto) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="h-64 animate-pulse rounded-2xl border border-border bg-muted/40" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Meu progresso</h1>
      <p className="mt-3 text-mutedFg">
        {logado
          ? "Salvo neste aparelho e sincronizado com a sua conta — funciona offline e acompanha você em qualquer dispositivo."
          : "Salvo neste aparelho — funciona mesmo offline."}
      </p>

      {contasAtivas && !logado && (
        <p className="mt-3 text-sm text-mutedFg">
          <Link href="/entrar?proximo=/progresso" className="text-primary hover:underline">
            Entre na sua conta
          </Link>{" "}
          para o progresso acompanhar você em outros aparelhos.
        </p>
      )}

      {sincronizando && (
        <p className="mt-3 text-xs text-mutedFg">Sincronizando…</p>
      )}

      {/* Meta da prova */}
      <section className="mt-8 rounded-2xl border border-border bg-muted/20 p-5">
        <h2 className="text-sm font-medium">
          Data-alvo do exame {EXAME.codigo}
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            type="date"
            value={progresso.dataProva ? progresso.dataProva.slice(0, 10) : ""}
            onChange={(e) =>
              definirDataProva(
                e.target.value ? new Date(e.target.value).toISOString() : null
              )
            }
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
          />
          {dias !== null && (
            <span className="text-sm text-mutedFg">
              {dias > 0
                ? `faltam ${dias} dia${dias === 1 ? "" : "s"}`
                : dias === 0
                  ? "é hoje — boa prova!"
                  : "data já passou"}
            </span>
          )}
        </div>
      </section>

      {/* Progresso do curso */}
      <section className="mt-6 rounded-2xl border border-border bg-muted/20 p-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-medium">Lições concluídas</h2>
          <span className="text-sm text-mutedFg">
            {concluidas}/{TOTAL_LICOES_CATALOGO} · {geral}%
          </span>
        </div>
        <ProgressBar valor={geral} className="mt-3" rotulo="Progresso geral" />

        <div className="mt-6 space-y-3">
          {SECOES_CATALOGO.map((secao) => {
            const feitas = secao.licoes.filter((l) =>
              progresso.licoesConcluidas.includes(l.id)
            ).length;
            return (
              <div key={secao.id}>
                <div className="flex justify-between text-xs">
                  <Link
                    href={`/curso/${secao.id}`}
                    className="truncate pr-3 transition hover:text-primary"
                  >
                    Seção {secao.numero}. {secao.titulo}
                  </Link>
                  <span className="shrink-0 text-mutedFg">
                    {feitas}/{secao.licoes.length}
                  </span>
                </div>
                <ProgressBar
                  valor={percentual(feitas, secao.licoes.length)}
                  cor={secao.dominio ? getDominio(secao.dominio).cor : undefined}
                  className="mt-1.5"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Desempenho nos simulados */}
      <section className="mt-6 rounded-2xl border border-border bg-muted/20 p-5">
        <h2 className="text-sm font-medium">Desempenho por domínio</h2>

        {progresso.tentativas.length === 0 ? (
          <p className="mt-3 text-sm text-mutedFg">
            Você ainda não fez nenhum simulado.{" "}
            <Link href="/simulado" className="text-primary hover:underline">
              Começar agora →
            </Link>
          </p>
        ) : (
          <>
            <div className="mt-4 space-y-4">
              {DOMINIOS.filter((d) => desempenho[d.id]).map((dominio) => {
                const dado = desempenho[dominio.id];
                if (!dado) return null;
                const pct = Math.round((dado.acertos / dado.total) * 100);
                return (
                  <div key={dominio.id}>
                    <div className="flex justify-between text-sm">
                      <span>
                        {dominio.codigo} {dominio.nome}{" "}
                        <span className="text-mutedFg">({dominio.peso}%)</span>
                      </span>
                      <span
                        className={
                          pct >= CORTE_APROVACAO
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }
                      >
                        {dado.acertos}/{dado.total} · {pct}%
                      </span>
                    </div>
                    <ProgressBar
                      valor={pct}
                      cor={dominio.cor}
                      className="mt-2"
                      rotulo={`Desempenho no domínio ${dominio.codigo}`}
                    />
                  </div>
                );
              })}
            </div>

            {focoSugerido && (
              <div className="mt-5 rounded-xl border border-cyan-500/40 bg-cyan-500/[0.06] p-4">
                <p className="text-sm">
                  <span className="font-medium">Onde focar agora: </span>
                  domínio {focoSugerido.dominio.codigo}{" "}
                  {focoSugerido.dominio.nome} — {focoSugerido.dominio.peso}% da
                  prova e {Math.round(focoSugerido.acerto * 100)}% de acerto seu.
                </p>
                <Link
                  href={`/simulado?dominio=${focoSugerido.dominio.id}`}
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                >
                  Praticar esse domínio →
                </Link>
              </div>
            )}

            {ultima && (
              <p className="mt-5 text-xs text-mutedFg">
                Último simulado:{" "}
                {new Date(ultima.data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                — {ultima.acertos}/{ultima.total} acertos
              </p>
            )}
          </>
        )}
      </section>

      {/* Histórico */}
      {progresso.tentativas.length > 0 && (
        <section className="mt-6 rounded-2xl border border-border bg-muted/20 p-5">
          <h2 className="text-sm font-medium">Histórico de simulados</h2>
          <ul className="mt-4 divide-y divide-border text-sm">
            {progresso.tentativas.map((tentativa) => {
              const pct = Math.round((tentativa.acertos / tentativa.total) * 100);
              return (
                <li
                  key={tentativa.id}
                  className="flex items-center justify-between py-2.5"
                >
                  <span className="text-mutedFg">
                    {new Date(tentativa.data).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span
                    className={
                      pct >= CORTE_APROVACAO
                        ? "text-emerald-400"
                        : "text-amber-400"
                    }
                  >
                    {tentativa.acertos}/{tentativa.total} · {pct}%
                  </span>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Apagar todo o progresso e o histórico de simulados deste aparelho?"
                )
              ) {
                limpar();
              }
            }}
            className="mt-4 text-xs text-mutedFg underline transition hover:text-danger"
          >
            Apagar progresso deste aparelho
          </button>
          {logado && (
            <p className="mt-2 text-xs text-mutedFg">
              O que já foi sincronizado permanece na sua conta e volta na
              próxima sincronização.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
