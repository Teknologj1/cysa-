import Link from "next/link";
import {
  DOMINIOS,
  MODULOS,
  TOTAL_AULAS,
  TOTAL_MINUTOS,
  getDominio,
} from "@/content/curriculum";
import { PLANOS } from "@/content/plans";
import { QUESTOES } from "@/content/questions";
import { FAQ } from "@/content/faq";
import PlanCard from "@/components/PlanCard";

const HORAS = Math.round(TOTAL_MINUTOS / 60);

const DIFERENCIAIS = [
  {
    icone: "◈",
    titulo: "Simulados que explicam o erro",
    texto:
      "Cada questão traz o raciocínio da resposta certa e por que as outras alternativas falham — é aí que a nota sobe.",
  },
  {
    icone: "▤",
    titulo: "Peso de domínio respeitado",
    texto:
      "O plano de estudos distribui seu tempo na mesma proporção da prova, em vez de gastar semanas no domínio de menor peso.",
  },
  {
    icone: "⬇",
    titulo: "Funciona offline, no celular",
    texto:
      "Instale como app e continue estudando no transporte, no intervalo ou onde a conexão não chega.",
  },
  {
    icone: "▲",
    titulo: "Progresso por domínio",
    texto:
      "Relatório de desempenho por domínio depois de cada simulado, para você saber exatamente o que revisar.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="grade-cyber border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs text-mutedFg">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Atualizado para o exame CS0-003
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Passe no CompTIA CySA+ estudando pelo celular
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-mutedFg">
            Curso preparatório completo para o CS0-003: {MODULOS.length} módulos,{" "}
            {TOTAL_AULAS} aulas, laboratórios de triagem e simulados
            cronometrados com correção comentada. Instale o app e estude offline.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/planos"
              className="rounded-xl bg-primary px-6 py-3 text-center text-sm font-semibold text-primaryFg transition hover:opacity-90"
            >
              Ver planos de assinatura
            </Link>
            <Link
              href="/curso"
              className="rounded-xl border border-border px-6 py-3 text-center text-sm font-medium transition hover:bg-muted"
            >
              Começar pelas aulas grátis
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { valor: `${MODULOS.length}`, rotulo: "módulos" },
              { valor: `${TOTAL_AULAS}`, rotulo: "aulas e labs" },
              { valor: `${HORAS}h`, rotulo: "de conteúdo" },
              { valor: `${QUESTOES.length}+`, rotulo: "questões comentadas" },
            ].map((item) => (
              <div
                key={item.rotulo}
                className="rounded-xl border border-border bg-background/60 p-4"
              >
                <dt className="text-2xl font-bold tracking-tight">
                  {item.valor}
                </dt>
                <dd className="mt-1 text-xs text-mutedFg">{item.rotulo}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Domínios */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Os 4 domínios da prova, na proporção certa
        </h2>
        <p className="mt-3 max-w-2xl text-mutedFg">
          A CompTIA publica o peso de cada domínio no CS0-003. O curso segue
          exatamente essa distribuição — inclusive no simulado final.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {DOMINIOS.filter((d) => d.peso > 0).map((dominio) => (
            <div
              key={dominio.id}
              className="rounded-2xl border border-border bg-muted/30 p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold">
                  <span className="text-mutedFg">{dominio.codigo}</span>{" "}
                  {dominio.nome}
                </h3>
                <span className="text-sm font-semibold" style={{ color: dominio.cor }}>
                  {dominio.peso}%
                </span>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${dominio.peso}%`,
                    backgroundColor: dominio.cor,
                  }}
                />
              </div>
              <p className="mt-3 text-sm text-mutedFg">
                {(() => {
                  const n = MODULOS.filter(
                    (m) => m.dominio === dominio.id
                  ).length;
                  return `${n} módulo${n === 1 ? "" : "s"} dedicado${n === 1 ? "" : "s"}`;
                })()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Feito para quem estuda no tempo que sobra
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {DIFERENCIAIS.map((item) => (
              <div
                key={item.titulo}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400"
                >
                  {item.icone}
                </span>
                <h3 className="mt-4 font-semibold">{item.titulo}</h3>
                <p className="mt-2 text-sm text-mutedFg">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ementa */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ementa completa
            </h2>
            <p className="mt-3 max-w-2xl text-mutedFg">
              Do formato da prova até a revisão final, na ordem em que faz
              sentido estudar.
            </p>
          </div>
          <Link
            href="/curso"
            className="text-sm font-medium text-primary hover:underline"
          >
            Abrir o curso →
          </Link>
        </div>

        <ol className="mt-8 space-y-3">
          {MODULOS.map((modulo) => {
            const dominio = getDominio(modulo.dominio);
            const minutos = modulo.aulas.reduce((s, a) => s + a.minutos, 0);
            const temGratis = modulo.aulas.some((a) => a.gratis);
            return (
              <li
                key={modulo.id}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-border bg-muted/20 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                  {modulo.numero}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{modulo.titulo}</h3>
                  <p className="mt-0.5 text-sm text-mutedFg">
                    {modulo.aulas.length} aulas · {Math.round(minutos / 60 * 10) / 10}h
                  </p>
                </div>
                {temGratis && (
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                    amostra grátis
                  </span>
                )}
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                  style={{
                    color: dominio.cor,
                    backgroundColor: `${dominio.cor}1f`,
                  }}
                >
                  {dominio.codigo === "—" ? "Preparação" : `Domínio ${dominio.codigo}`}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Planos */}
      <section id="planos" className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Escolha o seu plano
          </h2>
          <p className="mt-3 max-w-2xl text-mutedFg">
            Todos os planos dão acesso ao curso inteiro. A diferença está no
            tempo de acesso, nos laboratórios e no acompanhamento.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PLANOS.map((plano) => (
              <PlanCard key={plano.id} plano={plano} />
            ))}
          </div>

          <p className="mt-6 text-xs text-mutedFg">
            Pagamento processado pelo Stripe. Cancele quando quiser — o acesso
            continua até o fim do período pago.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Perguntas frequentes
        </h2>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border">
          {FAQ.map((item) => (
            <details key={item.pergunta} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {item.pergunta}
                <span
                  aria-hidden
                  className="text-mutedFg transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-mutedFg">{item.resposta}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-muted/30 p-8 text-center">
          <h3 className="text-xl font-semibold">
            Comece hoje e marque sua prova com confiança
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-mutedFg">
            Instale o app, faça o diagnóstico inicial e siga o plano de 12
            semanas.
          </p>
          <Link
            href="/planos"
            className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primaryFg transition hover:opacity-90"
          >
            Assinar o CySA+ Prep
          </Link>
        </div>
      </section>
    </>
  );
}
