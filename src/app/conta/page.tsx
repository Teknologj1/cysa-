import type { Metadata } from "next";
import { acessoDoUsuario } from "@/server/auth/sessao";
import ContaView from "@/features/assinatura/components/ContaView";

export const metadata: Metadata = {
  title: "Minha conta",
  description: "Status da assinatura, dados de acesso e preferências do app.",
};

export default async function ContaPage() {
  const acesso = await acessoDoUsuario();

  return (
    <ContaView
      servidor={{
        contasAtivas: acesso.contasAtivas,
        logado: Boolean(acesso.usuario),
        email: acesso.usuario?.email ?? null,
        liberado: acesso.liberado,
        assinatura: acesso.assinatura
          ? {
              planoId: acesso.assinatura.planoId,
              status: acesso.assinatura.status,
              periodoFim: acesso.assinatura.periodoFim,
              criadaEm: acesso.assinatura.criadaEm,
              temClienteStripe: Boolean(acesso.assinatura.stripeCustomerId),
            }
          : null,
      }}
    />
  );
}
