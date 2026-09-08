"use client";

import Link from "next/link";
import { OBJETIVOS } from "@/content/objetivos";
import { SECOES_CATALOGO } from "@/content/catalogo";
import { DOMINIOS } from "@/content/dominios";
import { EXAME } from "@/content/exame";

/**
 * Mapa dos 15 objetivos oficiais do CS0-004 e do que já tem conteúdo.
 *
 * Usa apenas o catálogo (metadados) e a lista de objetivos — nada de corpo de
 * lição nem de questão sai daqui para o navegador.
 */

/** Seções que cobrem cada código de objetivo, pela marcação das lições. */
function secoesPorObjetivo(): Map<string, { id: string; numero: number; titulo: string }[]> {
  const mapa = new Map<string, { id: string; numero: number; titulo: string }[]>();

  for (const secao of SECOES_CATALOGO) {
    const codigos = new Set(
      secao.licoes.map((licao) => licao.objetivo).filter(Boolean) as string[]
    );
    for (const codigo of codigos) {
      const lista = mapa.get(codigo) ?? [];
      lista.push({ id: secao.id, numero: secao.numero, titulo: secao.titulo });
      mapa.set(codigo, lista);
    }
  }

  return mapa;
}

export default function MapaObjetivos() {
  const cobertura = secoesPorObjetivo();
  const cobertos = OBJETIVOS.filter((o) => cobertura.has(o.codigo)).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Objetivos do exame
        </h1>
        <p className="mt-3 text-mutedFg">
          Os {OBJETIVOS.length} objetivos oficiais do {EXAME.codigo}, com o peso
          de cada domínio na prova. O curso é construído sobre esta lista: cada
          lição aponta para o objetivo que cobre.
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-muted/30 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="text-sm font-medium">Cobertura publicada</span>
            <span className="text-sm text-mutedFg">
              {cobertos} de {OBJETIVOS.length} objetivos
            </span>
          </div>
          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={cobertos}
            aria-valuemin={0}
            aria-valuemax={OBJETIVOS.length}
            aria-label="Objetivos com conteúdo publicado"
          >
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(cobertos / OBJETIVOS.length) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-mutedFg">
            Os objetivos sem conteúdo estão em produção e já fazem parte da sua
            assinatura — entram no app conforme são publicados.
          </p>
        </div>
      </header>

      {DOMINIOS.map((dominio) => {
        const doDominio = OBJETIVOS.filter((o) => o.dominio === dominio.id);
        return (
          <section key={dominio.id} className="mt-10">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-lg font-semibold">
                <span style={{ color: dominio.cor }}>{dominio.codigo}</span>{" "}
                {dominio.nome}
              </h2>
              <span
                className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{
                  color: dominio.cor,
                  backgroundColor: `${dominio.cor}1f`,
                }}
              >
                {dominio.peso}% da prova
              </span>
            </div>
            <p className="mt-1.5 text-sm text-mutedFg">{dominio.descricao}</p>

            <ol className="mt-5 space-y-3">
              {doDominio.map((objetivo) => {
                const secoes = cobertura.get(objetivo.codigo) ?? [];
                const coberto = secoes.length > 0;

                return (
                  <li
                    key={objetivo.codigo}
                    className={`rounded-2xl border p-5 ${
                      coberto
                        ? "border-border bg-muted/20"
                        : "border-dashed border-border"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-muted px-2 py-0.5 font-mono text-[11px] text-mutedFg">
                        {objetivo.codigo}
                      </span>
                      {coberto ? (
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                          com conteúdo
                        </span>
                      ) : (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-mutedFg">
                          em produção
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-medium">{objetivo.titulo}</h3>

                    <ul className="mt-3 flex flex-wrap gap-2">
                      {objetivo.topicos.map((topico) => (
                        <li
                          key={topico}
                          className="rounded-full bg-muted px-2.5 py-1 text-xs text-mutedFg"
                        >
                          {topico}
                        </li>
                      ))}
                    </ul>

                    {coberto && (
                      <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                        <span className="text-mutedFg">Estudado em:</span>
                        {secoes.map((secao) => (
                          <Link
                            key={secao.id}
                            href={`/curso/${secao.id}`}
                            className="text-primary hover:underline"
                          >
                            Seção {secao.numero}: {secao.titulo}
                          </Link>
                        ))}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}

      <p className="mt-10 text-xs text-mutedFg">
        Objetivos conforme o documento oficial da CompTIA para o {EXAME.codigo}{" "}
        (versão {EXAME.versaoObjetivos}). {EXAME.questoes} questões, {EXAME.minutos} minutos, nota de
        corte {EXAME.notaMinima}.
      </p>
    </div>
  );
}
