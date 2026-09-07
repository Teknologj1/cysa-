import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MODULOS, getModulo } from "@/content/curriculum";
import ModuloView from "@/components/ModuloView";

type Props = { params: Promise<{ moduloId: string }> };

export function generateStaticParams() {
  return MODULOS.map((m) => ({ moduloId: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduloId } = await params;
  const modulo = getModulo(moduloId);
  if (!modulo) return { title: "Módulo não encontrado" };
  return { title: modulo.titulo, description: modulo.descricao };
}

export default async function ModuloPage({ params }: Props) {
  const { moduloId } = await params;
  const modulo = getModulo(moduloId);
  if (!modulo) notFound();

  return <ModuloView modulo={modulo} />;
}
