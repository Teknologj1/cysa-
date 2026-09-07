import Link from "next/link";
import { DOMINIOS } from "@/content/dominios";
import { EXAME } from "@/content/exame";
import { FASES } from "@/content/fases";
import { SECOES, TOTAL_LICOES, TOTAL_MINUTOS, minutosDaSecao } from "@/content/secoes";
import { ROADMAP } from "@/content/roadmap";
import { QUESTOES } from "@/content/questoes";
import { PLANOS } from "@/content/planos";
import { FAQ } from "@/content/faq";
import PlanoCard from "@/features/assinatura/components/PlanoCard";

const HORAS = Math.max(1, Math.round(TOTAL_MINUTOS / 60));

const DIFERENCIAIS = [
  {
    icone: "◈",
    titulo: "Simulados que explicam o erro",
    texto:
      "Cada questão traz o raciocínio da resposta certa e por que as outras falham. O simulado em modo prova sorteia as questões respeitando os pesos oficiais.",
  },
  {
    icone: "▤",
    titulo: "Cada lição amarrada a um objetivo",
    texto:
      "As lições trazem a tag do objetivo oficial (OBJ 1.5, OBJ 4.2). Você sempre sabe onde está no blueprint e o que ainda falta.",
  },
  {
    icone: "◍",
    titulo: "SOC English Lab",
    texto:
      "A prova é em inglês e a operação também. Treine listening com cenas do dia a dia do SOC e a pronúncia dos termos que mais saem errado.",
  },
  {
    icone: "⬇",
    titulo: "Funciona offline, no celular",
    texto:
      "Instale como app e continue estudando no transporte, no intervalo ou onde a conexão não chega. Seu progresso fica no aparelho.",
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
            Atualizado para o exame {EXAME.codigo}, que sucede o {EXAME.substitui}
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            Passe no CompTIA CySA+ estudando pelo celular
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-mutedFg">
            Curso preparatório para o {EXAME.codigo} organizado na ordem em que um
            analista constrói a habilidade — do ambiente que você opera até
            relatórios e comunicação — com simulados comentados e laboratório de
            inglês para SOC.
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
              Começar pelas lições grátis
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { valor: `${EXAME.questoes}`, rotulo: "questões na prova real" },
              { valor: `${EXAME.minutos} min`, rotulo: "de duração do exame" },
              { valor: `${TOTAL_LICOES}`, rotulo: "lições publicadas" },
              { valor: `${QUESTOES.length}+`, rotulo: "questões comentadas" },
            ].map((item) => (
              <div
                key={item.rotulo}
                className="rounded-xl border border-border bg-background/60 p-4"
              >
                <dt className="text-2xl font-bold tracking-tight">{item.valor}</dt>
                <dd className="mt-1 text-xs text-mutedFg">{item.rotulo}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Domínios */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Os quatro domínios, na proporção certa
        </h2>
        <p className="mt-3 max-w-2xl text-mutedFg">
          A CompTIA publica o peso de cada domínio no {EXAME.codigo}. O curso e o
          simulado em modo prova seguem exatamente essa distribuição — inclusive
          o domínio 4, onde quem chega despreparado perde ponto sem esperar.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {DOMINIOS.map((dominio) => (
            <div
              key={dominio.id}
              className="rounded-2xl border border-border bg-muted/30 p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-semibold">
                  <span className="text-mutedFg">{dominio.codigo}</span>{" "}
                  {dominio.nome}
                </h3>
                <span
                  className="text-sm font-semibold"
                  style={{ color: dominio.cor }}
                >
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
              <p className="mt-3 text-sm text-mutedFg">{dominio.descricao}</p>
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

      {/* Estrutura do curso */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              O curso em quatro fases
            </h2>
            <p className="mt-3 max-w-2xl text-mutedFg">
              A ordem não é a da lista de objetivos da CompTIA: é a ordem em que
              um analista constrói a habilidade. Cada fase apoia a seguinte.
            </p>
          </div>
          <Link
            href="/curso"
            className="text-sm font-medium text-primary hover:underline"
          >
            Abrir o curso →
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          {FASES.map((fase) => {
            const publicadas = SECOES.filter((s) => s.fase === fase.id);
            const planejadas = ROADMAP.find((b) => b.fase === fase.id);

            return (
              <div
                key={fase.id}
                className="rounded-2xl border border-border bg-muted/20 p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-semibold">
                    {fase.numero > 0 && (
                      <span className="text-mutedFg">Fase {fase.numero} · </span>
                    )}
                    {fase.titulo}
                  </h3>
                  <span className="text-xs text-mutedFg">
                    {publicadas.length > 0
                      ? `${publicadas.length} seção${publicadas.length === 1 ? "" : "es"} publicada${publicadas.length === 1 ? "" : "s"}`
                      : planejadas?.intervalo}
                  </span>
                </div>
                <p className="mt-2 text-sm text-mutedFg">{fase.descricao}</p>

                {publicadas.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {publicadas.map((secao) => (
                      <li key={secao.id}>
                        <Link
                          href={`/curso/${secao.id}`}
                          className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg px-2 py-1.5 text-sm transition hover:bg-muted"
                        >
                          <span className="text-mutedFg">{secao.numero}.</span>
                          <span className="font-medium">{secao.titulo}</span>
                          <span className="text-xs text-mutedFg">
                            {secao.licoes.length} lições ·{" "}
                            {Math.round(minutosDaSecao(secao) / 6) / 10}h
                          </span>
                          {secao.licoes.some((l) => l.gratis) && (
                            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                              amostra grátis
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-mutedFg">
          {TOTAL_LICOES} lições publicadas ({HORAS}h de conteúdo) e novas seções
          entrando conforme são produzidas — todas incluídas na assinatura.
        </p>
      </section>

      {/* Planos */}
      <section id="planos" className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Escolha o seu plano
          </h2>
          <p className="mt-3 max-w-2xl text-mutedFg">
            Todos os planos dão acesso ao curso inteiro, incluindo as seções que
            entram depois. A diferença está no tempo de acesso, nos laboratórios e
            no acompanhamento.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PLANOS.map((plano) => (
              <PlanoCard key={plano.id} plano={plano} />
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
            Instale o app, faça o diagnóstico inicial e siga o percurso das quatro
            fases.
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
