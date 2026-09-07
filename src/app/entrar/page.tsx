import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { autenticacaoConfigurada, usuarioAtual } from "@/server/auth/sessao";
import FormularioEntrada from "@/features/conta/components/FormularioEntrada";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Acesse sua conta do CySA+ Prep pelo link enviado por e-mail.",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ proximo?: string }> };

export default async function EntrarPage({ searchParams }: Props) {
  const { proximo } = await searchParams;

  if (!autenticacaoConfigurada()) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Contas ainda não habilitadas
        </h1>
        <p className="mt-3 text-sm text-mutedFg">
          O acesso por e-mail será liberado em breve. Por enquanto, a assinatura
          fica registrada neste aparelho.
        </p>
        <Link
          href="/curso"
          className="mt-6 inline-block rounded-xl border border-border px-5 py-2.5 text-sm transition hover:bg-muted"
        >
          Ir para o curso
        </Link>
      </div>
    );
  }

  // Já logado: não há motivo para ver a tela de entrada.
  const usuario = await usuarioAtual();
  if (usuario) redirect(proximo || "/curso");

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Entrar</h1>
      <p className="mt-3 text-mutedFg">
        Você recebe um link de acesso por e-mail. Não existe senha.
      </p>

      <div className="mt-8">
        <FormularioEntrada proximo={proximo || "/curso"} />
      </div>
    </div>
  );
}
