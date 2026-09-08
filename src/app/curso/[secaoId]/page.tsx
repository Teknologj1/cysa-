import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECOES, getSecao } from "@/content/secoes";
import SecaoView from "@/features/curso/components/SecaoView";
import { paraSecaoPublica } from "@/features/curso/lib/publico";

type Props = { params: Promise<{ secaoId: string }> };

export function generateStaticParams() {
  return SECOES.map((s) => ({ secaoId: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { secaoId } = await params;
  const secao = getSecao(secaoId);
  if (!secao) return { title: "Seção não encontrada" };
  return { title: secao.titulo, description: secao.descricao };
}

export default async function SecaoPage({ params }: Props) {
  const { secaoId } = await params;
  const secao = getSecao(secaoId);
  if (!secao) notFound();

  return <SecaoView secao={paraSecaoPublica(secao)} />;
}
