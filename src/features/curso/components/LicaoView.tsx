"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { vizinhas } from "@/content/secoes";
import { getDominio, rotuloDominio } from "@/content/dominios";
import type { Licao, Secao } from "@/content/types";
import { useProgresso } from "@/features/progresso/ProgressoProvider";
import { useAssinatura } from "@/features/assinatura/AssinaturaProvider";
import PaywallGate from "@/features/assinatura/components/PaywallGate";

export default function LicaoView({
  secao,
  licao,
  conteudo,
}: {
  secao: Secao;
  licao: Licao;
  /** Markdown já renderizado no servidor (Server Component). */
  conteudo?: React.ReactNode;
}) {
  const { progresso, alternarLicao, marcarLicao } = useProgresso();
  const { ativa, pronto } = useAssinatura();
  const router = useRouter();

  const feita = progresso.licoesConcluidas.includes(licao.id);
  const { anterior, proxima } = vizinhas(licao.id);
  const cor = secao.dominio ? getDominio(secao.dominio).cor : "#94a3b8";

  function concluirEAvancar() {
    marcarLicao(licao.id);
    if (proxima) {
      router.push(`/curso/${proxima.secao.id}/${proxima.licao.id}`);
    }
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-mutedFg">
        <Link href="/curso" className="transition hover:text-foreground">
          Curso
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/curso/${secao.id}`}
          className="transition hover:text-foreground"
        >
          Seção {secao.numero}
        </Link>
      </nav>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ color: cor, backgroundColor: `${cor}1f` }}
          >
            {rotuloDominio(secao.dominio)}
          </span>
          {licao.objetivo && (
            <span className="rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] text-mutedFg">
              OBJ {licao.objetivo}
            </span>
          )}
          <span className="text-xs text-mutedFg">{licao.minutos} min</span>
          {licao.gratis && (
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
              grátis
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">{licao.titulo}</h1>
        <p className="mt-3 text-mutedFg">{licao.resumo}</p>
      </header>

      <div className="mt-8">
        <PaywallGate
          liberado={Boolean(licao.gratis)}
          titulo="Esta lição é para assinantes"
          descricao="Assine para liberar todas as lições, laboratórios e checkpoints do CS0-004."
        >
          {conteudo ? (
            conteudo
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-6">
              <h2 className="text-sm font-medium">Conteúdo em produção</h2>
              <p className="mt-2 text-sm text-mutedFg">
                O texto completo desta lição está sendo escrito. Enquanto isso,
                este é o roteiro do que ela cobre:
              </p>
              {licao.roteiro && (
                <ul className="mt-4 space-y-2 text-sm text-mutedFg">
                  {licao.roteiro.map((topico) => (
                    <li key={topico} className="flex gap-2">
                      <span aria-hidden className="mt-0.5 text-primary">
                        ›
                      </span>
                      <span>{topico}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {licao.pontosChave && licao.pontosChave.length > 0 && (
            <section className="mt-10 rounded-2xl border border-border bg-muted/30 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-mutedFg">
                O que precisa ficar
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {licao.pontosChave.map((ponto) => (
                  <li key={ponto} className="flex gap-2.5">
                    <span aria-hidden className="mt-0.5 text-primary">
                      ▪
                    </span>
                    <span>{ponto}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {licao.dicaExame && (
            <section className="mt-5 rounded-2xl border border-amber-500/40 bg-amber-500/[0.06] p-5">
              <h2 className="text-sm font-semibold text-amber-400">
                Na prova
              </h2>
              <p className="mt-2 text-sm text-mutedFg">{licao.dicaExame}</p>
            </section>
          )}

          {licao.tarefa && (
            <section className="mt-5 rounded-2xl border border-cyan-500/40 bg-cyan-500/[0.06] p-5">
              <h2 className="text-sm font-semibold text-cyan-400">
                Antes da próxima lição
              </h2>
              <p className="mt-2 text-sm text-mutedFg">{licao.tarefa}</p>
            </section>
          )}

          {licao.recursos && licao.recursos.length > 0 && (
            <section className="mt-5 rounded-2xl border border-border p-5">
              <h2 className="text-sm font-semibold">Recursos</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {licao.recursos.map((recurso) => (
                  <li key={recurso.url}>
                    <a
                      href={recurso.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:no-underline"
                    >
                      {recurso.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Conclusão e avanço */}
          {pronto && (Boolean(licao.gratis) || ativa) && (
            <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
              <button
                type="button"
                onClick={concluirEAvancar}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primaryFg transition hover:opacity-90"
              >
                {proxima
                  ? "Concluir e ir para a próxima"
                  : "Concluir esta lição"}
              </button>
              <button
                type="button"
                onClick={() => alternarLicao(licao.id)}
                className="rounded-xl border border-border px-4 py-3 text-sm transition hover:bg-muted"
                aria-pressed={feita}
              >
                {feita ? "Desmarcar como concluída" : "Só marcar como concluída"}
              </button>
            </div>
          )}
        </PaywallGate>
      </div>

      <nav className="mt-10 flex justify-between gap-4 border-t border-border pt-6 text-sm">
        {anterior ? (
          <Link
            href={`/curso/${anterior.secao.id}/${anterior.licao.id}`}
            className="max-w-[45%] text-mutedFg transition hover:text-foreground"
          >
            ← {anterior.licao.titulo}
          </Link>
        ) : (
          <span />
        )}
        {proxima && (
          <Link
            href={`/curso/${proxima.secao.id}/${proxima.licao.id}`}
            className="max-w-[45%] text-right text-mutedFg transition hover:text-foreground"
          >
            {proxima.licao.titulo} →
          </Link>
        )}
      </nav>
    </article>
  );
}
