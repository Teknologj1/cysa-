import type { Metadata } from "next";
import LabIngles from "@/features/lab-ingles/components/LabIngles";

export const metadata: Metadata = {
  title: "SOC English Lab",
  description:
    "Treino de listening e pronúncia com o vocabulário de SOC que aparece no exame CySA+ e na operação.",
};

export default function LabInglesPage() {
  return <LabIngles />;
}
