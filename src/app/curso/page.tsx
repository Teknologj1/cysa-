import type { Metadata } from "next";
import CursoLista from "@/components/CursoLista";

export const metadata: Metadata = {
  title: "Curso CS0-003",
  description:
    "Todos os módulos do curso preparatório CySA+ com acompanhamento de progresso.",
};

export default function CursoPage() {
  return <CursoLista />;
}
