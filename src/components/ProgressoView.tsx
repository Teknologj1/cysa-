"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  DOMINIOS,
  MODULOS,
  TOTAL_AULAS,
  type DominioId,
} from "@/content/curriculum";
import { useApp } from "./AppStateProvider";
import ProgressBar from "./ProgressBar";
import { percentual } from "@/lib/progresso";

function diasAte(iso: string): number {
  const alvo = new Date(iso).getTime();
  return Math.ceil((alvo - Date.now()) / (1000 * 60 * 60 * 24));
}

export default function ProgressoView() {
  const { progresso, definirDataProva, limparProgresso, pronto } = useApp();

  const concluidas = progresso.aulasConcluidas.length;
  const geral = percentual(concluidas, TOTAL_AULAS);

  // Desempenho acumulado por domínio, somando todas as tentativas.
  const desempenho = useMemo(() => {
    const acumulado: Record<string, { acertos: number; total: number }> = {};
    for (const tentativa of progresso.tentativas) {
      for (const [dominio, dado] of Object.entries(tentativa.porDominio)) {
        if (!dado) continue;
        const atual = acumulado[dominio] ?? { acertos: 0, total: 0 };
        acumulado[dominio] = {
          acertos: atual.acertos + dado.acertos,
          total: atual.total + dado.total,
        };
      }
    }
    return acumulado;
  }, [progresso.tentativas]);

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
        Tudo é salvo neste aparelho — funciona mesmo offline.
      </p>

      {/* Meta da prova */}
      <section className="mt-8 rounded-2xl border border-border bg-muted/20 p-5">
        <h2 className="text-sm font-medium">Data-alvo da prova</h2>
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
          <h2 className="text-sm font-medium">Aulas concluídas</h2>
          <span className="text-sm text-mutedFg">
            {concluidas}/{TOTAL_AULAS} · {geral}%
          </span>
        </div>
        <ProgressBar valor={geral} className="mt-3" rotulo="Progresso geral" />

        <div className="mt-6 space-y-3">
          {MODULOS.map((modulo) => {
            const feitas = modulo.aulas.filter((a) =>
              progresso.aulasConcluidas.includes(a.id)
            ).length;
            const pct = percentual(feitas, modulo.aulas.length);
            return (
              <div key={modulo.id}>
                <div className="flex justify-between text-xs">
                  <span className="truncate pr-3">
                    {modulo.numero}. {modulo.titulo}
                  </span>
                  <span className="shrink-0 text-mutedFg">
                    {feitas}/{modulo.aulas.length}
                  </span>
                </div>
                <ProgressBar valor={pct} className="mt-1.5" />
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
          <div className="mt-4 space-y-4">
            {DOMINIOS.filter((d) => desempenho[d.id]).map((dominio) => {
              const dado = desempenho[dominio.id as DominioId];
              const pct = Math.round((dado.acertos / dado.total) * 100);
              return (
                <div key={dominio.id}>
                  <div className="flex justify-between text-sm">
                    <span>
                      {dominio.codigo} {dominio.nome}
                    </span>
                    <span className="text-mutedFg">
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
      </section>

      {/* Histórico */}
      {progresso.tentativas.length > 0 && (
        <section className="mt-6 rounded-2xl border border-border bg-muted/20 p-5">
          <h2 className="text-sm font-medium">Histórico de simulados</h2>
          <ul className="mt-4 divide-y divide-border text-sm">
            {progresso.tentativas.map((tentativa) => {
              const pct = Math.round(
                (tentativa.acertos / tentativa.total) * 100
              );
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
                      pct >= 75 ? "text-emerald-400" : "text-amber-400"
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
                limparProgresso();
              }
            }}
            className="mt-4 text-xs text-mutedFg underline transition hover:text-danger"
          >
            Apagar progresso deste aparelho
          </button>
        </section>
      )}
    </div>
  );
}
