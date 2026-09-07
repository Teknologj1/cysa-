import type { Metadata } from "next";
import ContaView from "@/features/assinatura/components/ContaView";

export const metadata: Metadata = {
  title: "Minha conta",
  description: "Status da assinatura, dados de acesso e preferências do app.",
};

export default function ContaPage() {
  return <ContaView />;
}
