import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLicao } from "@/content/secoes";
import { acessoDoUsuario } from "@/server/auth/sessao";
import { podeEntregarConteudo } from "@/lib/acesso";
import LicaoView from "@/features/curso/components/LicaoView";
import Markdown from "@/components/ui/Markdown";

type Props = { params: Promise<{ secaoId: string; licaoId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { secaoId, licaoId } = await params;
  const encontrada = getLicao(secaoId, licaoId);
  if (!encontrada) return { title: "Lição não encontrada" };
  return {
    title: encontrada.licao.titulo,
    description: encontrada.licao.resumo,
  };
}

export default async function LicaoPage({ params }: Props) {
  const { secaoId, licaoId } = await params;
  const encontrada = getLicao(secaoId, licaoId);
  if (!encontrada) notFound();

  const { secao, licao } = encontrada;
  const acesso = await acessoDoUsuario();

  /**
   * A decisão acontece aqui, no servidor. Sem direito de acesso, o corpo da
   * lição simplesmente não é renderizado — ele não chega ao navegador, em vez
   * de ficar escondido por CSS.
   *
   * Enquanto o Supabase não estiver configurado, `contasAtivas` é false e a
   * verificação continua sendo feita no cliente, como antes.
   */
  const entregarConteudo = podeEntregarConteudo({
    contasAtivas: acesso.contasAtivas,
    liberado: acesso.liberado,
    gratis: Boolean(licao.gratis),
  });

  return (
    <LicaoView
      secao={secao}
      licao={licao}
      acesso={{
        contasAtivas: acesso.contasAtivas,
        liberado: acesso.liberado,
        logado: Boolean(acesso.usuario),
      }}
      conteudo={
        licao.conteudo && entregarConteudo ? (
          <Markdown>{licao.conteudo}</Markdown>
        ) : undefined
      }
    />
  );
}
