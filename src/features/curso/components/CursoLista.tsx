"use client";

import Link from "next/link";
import {
  TOTAL_LICOES_CATALOGO,
  minutosDaSecaoCatalogo,
} from "@/content/catalogo";
import { ROADMAP } from "@/content/roadmap";
import { FASES } from "@/content/fases";
import { getDominio, rotuloDominio } from "@/content/dominios";
import { useProgresso } from "@/features/progresso/ProgressoProvider";
import { useAssinatura } from "@/features/assinatura/AssinaturaProvider";
import ProgressBar from "@/components/ui/ProgressBar";
import { useLiberacao } from "../lib/useLiberacao";
import { rotuloDeLiberacao } from "@/lib/liberacao";
import {
  formatarDuracao,
  progressoDaSecao,
  progressoGeral,
  proximaLicaoPendente,
  secoesPorFase,
} from "../lib/navegacao";

export default function CursoLista() {
  const { progresso, pronto } = useProgresso();
  const { ativa } = useAssinatura();
  const liberacaoDa = useLiberacao();

  const geral = progressoGeral(progresso.licoesConcluidas);
  const proxima = proximaLicaoPendente(
    progresso.licoesConcluidas,
    (secao) => liberacaoDa(secao).liberada
  );
  const grupos = secoesPorFase();
  const emCarencia = grupos
    .flatMap((grupo) => grupo.secoes)
    .some((secao) => !liberacaoDa(secao).liberada);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Curso CS0-004</h1>
        <p className="mt-3 text-mutedFg">
          O curso segue quatro fases: primeiro o ambiente que você opera, depois
          detecção e análise, então vulnerabilidades e resposta a incidentes e,
          por fim, relatórios e comunicação.
        </p>
      </header>

      {/* Continuar de onde parou */}
      <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="text-sm font-medium">Seu progresso</span>
          <span className="text-sm text-mutedFg">
            {geral.feitas} de {TOTAL_LICOES_CATALOGO} lições publicadas · {geral.percentual}%
          </span>
        </div>
        <ProgressBar
          valor={geral.percentual}
          className="mt-3"
          rotulo="Progresso geral do curso"
        />

        {pronto && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={`/curso/${proxima.secao.id}/${proxima.licao.id}`}
              className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primaryFg transition hover:opacity-90"
            >
              {geral.feitas === 0 ? "Começar agora" : "Continuar de onde parei"}
            </Link>
            <span className="text-xs text-mutedFg">
              {proxima.secao.numero}.{" "}
              {proxima.licao.titulo}
            </span>
          </div>
        )}

        {pronto && ativa && emCarencia && (
          <p className="mt-4 text-xs text-mutedFg">
            Na primeira semana o curso libera as seções 1 e 2. A partir do 8º dia
            de assinatura as demais abrem de uma vez.
          </p>
        )}

        {pronto && !ativa && (
          <p className="mt-4 text-xs text-mutedFg">
            Você está no acesso de amostra. As lições marcadas como{" "}
            <span className="text-emerald-400">grátis</span> estão liberadas.{" "}
            <Link href="/planos" className="text-primary hover:underline">
              Ver planos
            </Link>
          </p>
        )}
      </div>

      {/* Seções publicadas, agrupadas por fase */}
      {grupos.map(({ fase, secoes }) => (
        <section key={fase.id} className="mt-10">
          <h2 className="text-lg font-semibold">
            {fase.numero > 0 && (
              <span className="text-mutedFg">Fase {fase.numero} · </span>
            )}
            {fase.titulo}
          </h2>
          <p className="mt-1.5 text-sm text-mutedFg">{fase.descricao}</p>

          <ol className="mt-5 space-y-3">
            {secoes.map((secao) => {
              const parcial = progressoDaSecao(secao, progresso.licoesConcluidas);
              const cor = secao.dominio ? getDominio(secao.dominio).cor : "#94a3b8";
              const gratis = secao.licoes.filter((l) => l.gratis).length;
              const liberacao = liberacaoDa(secao);

              return (
                <li key={secao.id}>
                  <Link
                    href={`/curso/${secao.id}`}
                    className="block rounded-2xl border border-border bg-muted/20 p-5 transition hover:border-primary/50 hover:bg-muted/40"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                        {secao.numero}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{secao.titulo}</h3>
                          <span
                            className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                            style={{ color: cor, backgroundColor: `${cor}1f` }}
                          >
                            {rotuloDominio(secao.dominio)}
                          </span>
                          {gratis > 0 && (
                            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                              {gratis} grátis
                            </span>
                          )}
                          {pronto && ativa && !liberacao.liberada && (
                            <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-medium text-amber-400">
                              {rotuloDeLiberacao(liberacao.dias)}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm text-mutedFg">
                          {secao.descricao}
                        </p>
                        <p className="mt-2 text-xs text-mutedFg">
                          {secao.licoes.length} lições ·{" "}
                          {formatarDuracao(minutosDaSecaoCatalogo(secao))} · {parcial.feitas}{" "}
                          concluída{parcial.feitas === 1 ? "" : "s"}
                        </p>
                        <ProgressBar
                          valor={parcial.percentual}
                          cor={cor}
                          className="mt-3"
                          rotulo={`Progresso da seção ${secao.numero}`}
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      {/* Roadmap do que ainda vem */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">Próximas seções</h2>
        <p className="mt-1.5 text-sm text-mutedFg">
          Conteúdo em produção. As seções entram no app conforme são publicadas —
          sua assinatura já inclui todas elas.
        </p>

        <div className="mt-5 space-y-3">
          {ROADMAP.map((bloco) => {
            const fase = FASES.find((f) => f.id === bloco.fase);
            return (
              <div
                key={bloco.intervalo}
                className="rounded-2xl border border-dashed border-border p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-medium">
                    {fase && (
                      <span className="text-mutedFg">Fase {fase.numero} · </span>
                    )}
                    {fase?.titulo}
                  </h3>
                  <span className="text-xs text-mutedFg">{bloco.intervalo}</span>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {bloco.temas.map((tema) => (
                    <li
                      key={tema}
                      className="rounded-full bg-muted px-2.5 py-1 text-xs text-mutedFg"
                    >
                      {tema}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
