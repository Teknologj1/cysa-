import type { Metadata } from "next";
import ProgressoView from "@/components/ProgressoView";

export const metadata: Metadata = {
  title: "Meu progresso",
  description:
    "Acompanhe aulas concluídas, desempenho por domínio e histórico de simulados.",
};

export default function ProgressoPage() {
  return <ProgressoView />;
}
