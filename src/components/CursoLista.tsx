"use client";

import Link from "next/link";
import { MODULOS, TOTAL_AULAS, getDominio } from "@/content/curriculum";
import { useApp } from "./AppStateProvider";
import ProgressBar from "./ProgressBar";
import { percentual } from "@/lib/progresso";

export default function CursoLista() {
  const { progresso, assinatura, pronto } = useApp();

  const concluidas = progresso.aulasConcluidas.length;
  const geral = percentual(concluidas, TOTAL_AULAS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Curso CS0-003</h1>
        <p className="mt-3 text-mutedFg">
          {MODULOS.length} módulos organizados na ordem de estudo recomendada.
          Marque as aulas concluídas para acompanhar seu avanço.
        </p>
      </header>

      <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-medium">Progresso geral</span>
          <span className="text-sm text-mutedFg">
            {concluidas} de {TOTAL_AULAS} aulas · {geral}%
          </span>
        </div>
        <ProgressBar valor={geral} className="mt-3" rotulo="Progresso geral do curso" />
        {pronto && !assinatura.ativa && (
          <p className="mt-4 text-xs text-mutedFg">
            Você está no acesso de amostra. As aulas marcadas como{" "}
            <span className="text-emerald-400">grátis</span> estão liberadas.{" "}
            <Link href="/planos" className="text-primary hover:underline">
              Ver planos
            </Link>
          </p>
        )}
      </div>

      <ol className="mt-8 space-y-4">
        {MODULOS.map((modulo) => {
          const dominio = getDominio(modulo.dominio);
          const doModulo = modulo.aulas.filter((a) =>
            progresso.aulasConcluidas.includes(a.id)
          ).length;
          const pct = percentual(doModulo, modulo.aulas.length);
          const minutos = modulo.aulas.reduce((s, a) => s + a.minutos, 0);
          const gratis = modulo.aulas.filter((a) => a.gratis).length;

          return (
            <li key={modulo.id}>
              <Link
                href={`/curso/${modulo.id}`}
                className="block rounded-2xl border border-border bg-muted/20 p-5 transition hover:border-primary/50 hover:bg-muted/40"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                    {modulo.numero}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold">{modulo.titulo}</h2>
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                        style={{
                          color: dominio.cor,
                          backgroundColor: `${dominio.cor}1f`,
                        }}
                      >
                        {dominio.codigo === "—"
                          ? "Preparação"
                          : `Domínio ${dominio.codigo}`}
                      </span>
                      {gratis > 0 && (
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                          {gratis} grátis
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm text-mutedFg">
                      {modulo.descricao}
                    </p>
                    <p className="mt-2 text-xs text-mutedFg">
                      {modulo.aulas.length} aulas ·{" "}
                      {Math.round((minutos / 60) * 10) / 10}h · {doModulo}{" "}
                      concluída{doModulo === 1 ? "" : "s"}
                    </p>
                    <ProgressBar
                      valor={pct}
                      cor={dominio.cor}
                      className="mt-3"
                      rotulo={`Progresso do módulo ${modulo.numero}`}
                    />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
