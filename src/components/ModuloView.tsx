"use client";

import Link from "next/link";
import { useState } from "react";
import { type Aula, type Modulo, MODULOS, getDominio } from "@/content/curriculum";
import { useApp } from "./AppStateProvider";
import ProgressBar from "./ProgressBar";
import PaywallGate from "./PaywallGate";
import { percentual } from "@/lib/progresso";

const ROTULO_TIPO: Record<Aula["tipo"], string> = {
  video: "Vídeo",
  leitura: "Leitura",
  lab: "Laboratório",
  quiz: "Quiz",
};

const ICONE_TIPO: Record<Aula["tipo"], string> = {
  video: "▶",
  leitura: "▤",
  lab: "⚙",
  quiz: "◈",
};

export default function ModuloView({ modulo }: { modulo: Modulo }) {
  const { progresso, alternarAula, assinatura, pronto } = useApp();
  const [aberta, setAberta] = useState<string | null>(null);

  const dominio = getDominio(modulo.dominio);
  const concluidas = modulo.aulas.filter((a) =>
    progresso.aulasConcluidas.includes(a.id)
  ).length;
  const pct = percentual(concluidas, modulo.aulas.length);

  const indice = MODULOS.findIndex((m) => m.id === modulo.id);
  const anterior = indice > 0 ? MODULOS[indice - 1] : null;
  const proximo = indice < MODULOS.length - 1 ? MODULOS[indice + 1] : null;

  const temAcesso = (aula: Aula) =>
    Boolean(aula.gratis) || (pronto && assinatura.ativa);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/curso"
        className="text-sm text-mutedFg transition hover:text-foreground"
      >
        ← Voltar para o curso
      </Link>

      <header className="mt-6">
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{ color: dominio.cor, backgroundColor: `${dominio.cor}1f` }}
        >
          {dominio.codigo === "—"
            ? "Preparação para a prova"
            : `Domínio ${dominio.codigo} · ${dominio.nome}`}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          {modulo.numero}. {modulo.titulo}
        </h1>
        <p className="mt-3 text-mutedFg">{modulo.descricao}</p>

        <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-4">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">Progresso do módulo</span>
            <span className="text-mutedFg">
              {concluidas}/{modulo.aulas.length} · {pct}%
            </span>
          </div>
          <ProgressBar
            valor={pct}
            cor={dominio.cor}
            className="mt-3"
            rotulo="Progresso do módulo"
          />
        </div>
      </header>

      <ol className="mt-8 space-y-3">
        {modulo.aulas.map((aula, i) => {
          const feita = progresso.aulasConcluidas.includes(aula.id);
          const liberada = temAcesso(aula);
          const expandida = aberta === aula.id;

          return (
            <li
              key={aula.id}
              className={`rounded-2xl border p-4 transition ${
                feita
                  ? "border-emerald-500/40 bg-emerald-500/[0.05]"
                  : "border-border bg-muted/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => liberada && alternarAula(aula.id)}
                  disabled={!liberada}
                  aria-pressed={feita}
                  aria-label={
                    feita ? "Marcar como não concluída" : "Marcar como concluída"
                  }
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs transition ${
                    feita
                      ? "border-emerald-500 bg-emerald-500 text-slate-950"
                      : "border-border text-transparent hover:border-primary"
                  } ${liberada ? "" : "cursor-not-allowed opacity-40"}`}
                >
                  ✓
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-medium">
                      {modulo.numero}.{i + 1} {aula.titulo}
                    </h2>
                    {aula.gratis && (
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                        grátis
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-mutedFg">
                    <span aria-hidden>{ICONE_TIPO[aula.tipo]}</span>{" "}
                    {ROTULO_TIPO[aula.tipo]} · {aula.minutos} min
                  </p>

                  {liberada ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setAberta(expandida ? null : aula.id)}
                        className="mt-2 text-sm text-primary hover:underline"
                      >
                        {expandida ? "Fechar" : "Ver o que você aprende"}
                      </button>
                      {expandida && (
                        <div className="mt-3 rounded-xl border border-border bg-background p-4">
                          <p className="text-sm text-mutedFg">{aula.resumo}</p>
                          {aula.tipo === "quiz" && (
                            <Link
                              href={`/simulado?dominio=${modulo.dominio}`}
                              className="mt-3 inline-block rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primaryFg"
                            >
                              Fazer o checkpoint
                            </Link>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="mt-2 text-sm text-mutedFg">
                      🔒 Disponível para assinantes.{" "}
                      <Link href="/planos" className="text-primary hover:underline">
                        Ver planos
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {pronto && !assinatura.ativa && (
        <div className="mt-8">
          <PaywallGate
            titulo="Desbloqueie o módulo inteiro"
            descricao="Assine para liberar todas as aulas, laboratórios e checkpoints deste e dos demais módulos."
          >
            <></>
          </PaywallGate>
        </div>
      )}

      <nav className="mt-10 flex justify-between gap-4 border-t border-border pt-6 text-sm">
        {anterior ? (
          <Link
            href={`/curso/${anterior.id}`}
            className="text-mutedFg transition hover:text-foreground"
          >
            ← {anterior.numero}. {anterior.titulo}
          </Link>
        ) : (
          <span />
        )}
        {proximo && (
          <Link
            href={`/curso/${proximo.id}`}
            className="text-right text-mutedFg transition hover:text-foreground"
          >
            {proximo.numero}. {proximo.titulo} →
          </Link>
        )}
      </nav>
    </div>
  );
}
