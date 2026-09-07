import type { Metadata } from "next";
import CursoLista from "@/features/curso/components/CursoLista";

export const metadata: Metadata = {
  title: "Curso CS0-004",
  description:
    "Todas as seções do curso preparatório CySA+ com acompanhamento de progresso.",
};

export default function CursoPage() {
  return <CursoLista />;
}
