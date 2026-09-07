import CheckoutButton from "./CheckoutButton";
import { type Plan, formatarBRL } from "@/content/plans";

export default function PlanCard({ plano }: { plano: Plan }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 ${
        plano.destaque
          ? "border-cyan-500/60 bg-cyan-500/[0.04] shadow-lg shadow-cyan-500/5"
          : "border-border bg-muted/30"
      }`}
    >
      {plano.selo && (
        <span
          className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[11px] font-semibold ${
            plano.destaque
              ? "bg-cyan-500 text-slate-950"
              : "bg-muted text-mutedFg ring-1 ring-border"
          }`}
        >
          {plano.selo}
        </span>
      )}

      <h3 className="text-lg font-semibold">{plano.nome}</h3>
      <p className="mt-1 text-sm text-mutedFg">{plano.descricao}</p>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-3xl font-bold tracking-tight">
          {formatarBRL(plano.precoCentavos)}
        </span>
        <span className="pb-1 text-sm text-mutedFg">/ {plano.intervalo}</span>
      </div>

      <p className="mt-1 text-xs text-mutedFg">
        {plano.precoDeCentavos && (
          <span className="mr-2 line-through">
            {formatarBRL(plano.precoDeCentavos)}
          </span>
        )}
        equivale a {formatarBRL(plano.equivalenteMensalCentavos)} por mês
      </p>

      <ul className="mt-6 flex-1 space-y-2.5 text-sm">
        {plano.beneficios.map((beneficio) => (
          <li key={beneficio} className="flex gap-2">
            <span aria-hidden className="mt-0.5 text-cyan-400">
              ✓
            </span>
            <span className="text-mutedFg">{beneficio}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <CheckoutButton
          planoId={plano.id}
          variante={plano.destaque ? "primario" : "secundario"}
        />
      </div>
    </div>
  );
}
