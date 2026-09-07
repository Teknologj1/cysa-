import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-mono text-sm text-mutedFg">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">
        Página não encontrada
      </h1>
      <p className="mt-3 text-mutedFg">
        O endereço não existe ou o conteúdo foi movido.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primaryFg transition hover:opacity-90"
        >
          Ir para o início
        </Link>
        <Link
          href="/curso"
          className="rounded-xl border border-border px-6 py-3 text-sm font-medium transition hover:bg-muted"
        >
          Abrir o curso
        </Link>
      </div>
    </div>
  );
}
