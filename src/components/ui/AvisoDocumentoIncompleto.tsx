import { CAMPOS_PENDENTES, EMPRESA_CONFIGURADA } from "@/content/empresa";

/**
 * Aviso exibido enquanto os dados do responsável legal não estiverem
 * preenchidos em `src/content/empresa.ts`. Some sozinho quando estiverem.
 */
export default function AvisoDocumentoIncompleto() {
  if (EMPRESA_CONFIGURADA) return null;

  return (
    <div className="mt-6 rounded-2xl border border-amber-500/40 bg-amber-500/[0.06] p-4">
      <p className="text-sm font-medium text-amber-400">
        Documento ainda não finalizado
      </p>
      <p className="mt-2 text-sm text-mutedFg">
        Este é um modelo inicial. Preencha os dados do responsável legal em{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
          src/content/empresa.ts
        </code>{" "}
        e submeta o texto a revisão jurídica antes de começar a vender.
      </p>
      <p className="mt-2 text-xs text-mutedFg">
        Pendente: {CAMPOS_PENDENTES.join(", ")}.
      </p>
    </div>
  );
}
