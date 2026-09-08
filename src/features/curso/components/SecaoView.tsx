"use client";

import Link from "next/link";
import { SECOES_CATALOGO, minutosDaSecaoCatalogo } from "@/content/catalogo";
import { getDominio, rotuloDominio } from "@/content/dominios";
import type { Licao } from "@/content/types";
import type { LicaoPublica, SecaoPublica } from "../lib/publico";
import { useProgresso } from "@/features/progresso/ProgressoProvider";
import { useAssinatura } from "@/features/assinatura/AssinaturaProvider";
import ProgressBar from "@/components/ui/ProgressBar";
import { formatarDuracao, progressoDaSecao } from "../lib/navegacao";

const ROTULO_TIPO: Record<Licao["tipo"], string> = {
  aula: "Aula",
  leitura: "Leitura",
  lab: "Laboratório",
  checkpoint: "Checkpoint",
};

const ICONE_TIPO: Record<Licao["tipo"], string> = {
  aula: "▶",
  leitura: "▤",
  lab: "⚙",
  checkpoint: "◈",
};

export default function SecaoView({ secao }: { secao: SecaoPublica }) {
  const { progresso } = useProgresso();
  const { ativa, pronto } = useAssinatura();

  const cor = secao.dominio ? getDominio(secao.dominio).cor : "#94a3b8";
  const parcial = progressoDaSecao(secao, progresso.licoesConcluidas);

  const indice = SECOES_CATALOGO.findIndex((s) => s.id === secao.id);
  const anterior = indice > 0 ? SECOES_CATALOGO[indice - 1] : null;
  const proxima =
    indice < SECOES_CATALOGO.length - 1 ? SECOES_CATALOGO[indice + 1] : null;

  const liberada = (licao: LicaoPublica) => Boolean(licao.gratis) || (pronto && ativa);

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
          style={{ color: cor, backgroundColor: `${cor}1f` }}
        >
          {secao.dominio
            ? `${rotuloDominio(secao.dominio)} · ${getDominio(secao.dominio).nome}`
            : "Introdução ao curso"}
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Seção {secao.numero}: {secao.titulo}
        </h1>
        <p className="mt-3 text-mutedFg">{secao.descricao}</p>

        {secao.objetivos && secao.objetivos.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-muted/20 p-5">
            <h2 className="text-sm font-medium">Ao final desta seção você será capaz de</h2>
            <ul className="mt-3 space-y-2 text-sm text-mutedFg">
              {secao.objetivos.map((objetivo) => (
                <li key={objetivo} className="flex gap-2">
                  <span aria-hidden className="mt-0.5 text-primary">
                    ✓
                  </span>
                  <span>{objetivo}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 rounded-2xl border border-border bg-muted/20 p-4">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">Progresso da seção</span>
            <span className="text-mutedFg">
              {parcial.feitas}/{parcial.total} ·{" "}
              {formatarDuracao(minutosDaSecaoCatalogo(secao))}
            </span>
          </div>
          <ProgressBar
            valor={parcial.percentual}
            cor={cor}
            className="mt-3"
            rotulo="Progresso da seção"
          />
        </div>
      </header>

      <ol className="mt-8 space-y-3">
        {secao.licoes.map((licao, i) => {
          const feita = progresso.licoesConcluidas.includes(licao.id);
          const podeAbrir = liberada(licao);
          const destino = licao.rota ?? `/curso/${secao.id}/${licao.id}`;

          const conteudoItem = (
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs ${
                  feita
                    ? "border-emerald-500 bg-emerald-500 text-slate-950"
                    : "border-border text-mutedFg"
                }`}
              >
                {feita ? "✓" : i + 1}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">{licao.titulo}</h3>
                  {licao.gratis && (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                      grátis
                    </span>
                  )}
                  {licao.objetivo && (
                    <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[11px] text-mutedFg">
                      OBJ {licao.objetivo}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-mutedFg">{licao.resumo}</p>
                <p className="mt-1.5 text-xs text-mutedFg">
                  <span aria-hidden>{ICONE_TIPO[licao.tipo]}</span>{" "}
                  {ROTULO_TIPO[licao.tipo]} · {licao.minutos} min
                  {!podeAbrir && " · exclusivo para assinantes"}
                </p>
              </div>
            </div>
          );

          return (
            <li key={licao.id}>
              {podeAbrir ? (
                <Link
                  href={destino}
                  className={`block rounded-2xl border p-4 transition ${
                    feita
                      ? "border-emerald-500/40 bg-emerald-500/[0.05]"
                      : "border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40"
                  }`}
                >
                  {conteudoItem}
                </Link>
              ) : (
                <div className="rounded-2xl border border-border bg-muted/10 p-4 opacity-70">
                  {conteudoItem}
                  <Link
                    href="/planos"
                    className="mt-3 inline-block text-sm text-primary hover:underline"
                  >
                    🔒 Assinar para desbloquear
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <nav className="mt-10 flex justify-between gap-4 border-t border-border pt-6 text-sm">
        {anterior ? (
          <Link
            href={`/curso/${anterior.id}`}
            className="text-mutedFg transition hover:text-foreground"
          >
            ← Seção {anterior.numero}
          </Link>
        ) : (
          <span />
        )}
        {proxima && (
          <Link
            href={`/curso/${proxima.id}`}
            className="text-right text-mutedFg transition hover:text-foreground"
          >
            Seção {proxima.numero}: {proxima.titulo} →
          </Link>
        )}
      </nav>
    </div>
  );
}
