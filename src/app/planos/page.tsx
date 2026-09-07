import type { Metadata } from "next";
import { PLANOS, formatarBRL } from "@/content/planos";
import { SECOES, TOTAL_LICOES } from "@/content/secoes";
import { QUESTOES } from "@/content/questoes";
import { EXAME } from "@/content/exame";
import { FAQ } from "@/content/faq";
import PlanoCard from "@/features/assinatura/components/PlanoCard";

export const metadata: Metadata = {
  title: "Planos e assinatura",
  description:
    "Escolha entre os planos mensal, trimestral e anual do curso preparatório CySA+ (CS0-004). Cancele quando quiser.",
};

const COMPARATIVO: { recurso: string; mensal: boolean; trimestral: boolean; anual: boolean }[] = [
  { recurso: `${SECOES.length} seções e ${TOTAL_LICOES} lições publicadas`, mensal: true, trimestral: true, anual: true },
  { recurso: `${QUESTOES.length}+ questões comentadas`, mensal: true, trimestral: true, anual: true },
  { recurso: "Estudo offline (PWA instalável)", mensal: true, trimestral: true, anual: true },
  { recurso: "Plano de estudos de 12 semanas", mensal: false, trimestral: true, anual: true },
  { recurso: `Simulado em modo prova (${EXAME.questoes} questões ponderadas)`, mensal: false, trimestral: true, anual: true },
  { recurso: "Relatório de desempenho por domínio", mensal: false, trimestral: true, anual: true },
  { recurso: "Laboratórios guiados e SOC English Lab", mensal: false, trimestral: false, anual: true },
  { recurso: "Modelos de relatório profissional", mensal: false, trimestral: false, anual: true },
  { recurso: "Atualizações por 12 meses", mensal: false, trimestral: false, anual: true },
];

export default function PlanosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Planos de assinatura
        </h1>
        <p className="mt-4 text-mutedFg">
          Acesso completo ao curso preparatório do CS0-004, incluindo as seções que entram depois. Sem fidelidade:
          cancele quando quiser e mantenha o acesso até o fim do período pago.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {PLANOS.map((plano) => (
          <PlanoCard key={plano.id} plano={plano} />
        ))}
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-semibold">O que cada plano inclui</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-separate border-spacing-0 text-sm">
            <thead>
              <tr className="text-left">
                <th className="border-b border-border p-3 font-medium text-mutedFg">
                  Recurso
                </th>
                {PLANOS.map((plano) => (
                  <th
                    key={plano.id}
                    className="border-b border-border p-3 text-center font-medium"
                  >
                    {plano.nome}
                    <span className="block text-xs font-normal text-mutedFg">
                      {formatarBRL(plano.precoCentavos)} / {plano.intervalo}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARATIVO.map((linha) => (
                <tr key={linha.recurso}>
                  <td className="border-b border-border p-3 text-mutedFg">
                    {linha.recurso}
                  </td>
                  {(["mensal", "trimestral", "anual"] as const).map((coluna) => (
                    <td
                      key={coluna}
                      className="border-b border-border p-3 text-center"
                    >
                      {linha[coluna] ? (
                        <span className="text-emerald-400" aria-label="incluído">
                          ✓
                        </span>
                      ) : (
                        <span className="text-mutedFg" aria-label="não incluído">
                          —
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16 max-w-3xl">
        <h2 className="text-xl font-semibold">Dúvidas sobre a assinatura</h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border">
          {FAQ.slice(2).map((item) => (
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
      </section>
    </div>
  );
}
