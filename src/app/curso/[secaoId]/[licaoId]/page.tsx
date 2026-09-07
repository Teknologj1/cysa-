import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LICOES_EM_ORDEM, getLicao } from "@/content/secoes";
import LicaoView from "@/features/curso/components/LicaoView";
import Markdown from "@/components/ui/Markdown";

type Props = { params: Promise<{ secaoId: string; licaoId: string }> };

export function generateStaticParams() {
  return LICOES_EM_ORDEM.map(({ secao, licao }) => ({
    secaoId: secao.id,
    licaoId: licao.id,
  }));
}

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

  return (
    <LicaoView
      secao={secao}
      licao={licao}
      conteudo={licao.conteudo ? <Markdown>{licao.conteudo}</Markdown> : undefined}
    />
  );
}
