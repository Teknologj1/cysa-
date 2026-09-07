"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "./AppStateProvider";
import { useToast } from "./Toast";
import type { PlanId } from "@/content/plans";

type Resposta =
  | { modo: "stripe" | "link"; url: string }
  | { modo: "demo"; planoId: PlanId }
  | { erro: string };

export default function CheckoutButton({
  planoId,
  rotulo = "Assinar agora",
  variante = "primario",
  className = "",
}: {
  planoId: PlanId;
  rotulo?: string;
  variante?: "primario" | "secundario";
  className?: string;
}) {
  const [carregando, setCarregando] = useState(false);
  const { ativarAssinatura } = useApp();
  const { addToast } = useToast();
  const router = useRouter();

  const estilos =
    variante === "primario"
      ? "bg-primary text-primaryFg hover:opacity-90"
      : "border border-border text-foreground hover:bg-muted";

  async function assinar() {
    setCarregando(true);
    try {
      const resposta = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planoId }),
      });
      const dado = (await resposta.json()) as Resposta;

      if ("erro" in dado) {
        addToast({
          type: "error",
          title: "Não foi possível iniciar o checkout",
          message: dado.erro,
        });
        return;
      }

      if (dado.modo === "demo") {
        // Sem credenciais do Stripe: libera o acesso em modo demonstração.
        ativarAssinatura(planoId, "demo", null);
        router.push("/sucesso?demo=1");
        return;
      }

      window.location.href = dado.url;
    } catch {
      addToast({
        type: "error",
        title: "Falha de conexão",
        message: "Verifique sua internet e tente novamente.",
      });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <button
      onClick={assinar}
      disabled={carregando}
      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition disabled:opacity-60 ${estilos} ${className}`}
    >
      {carregando ? "Redirecionando…" : rotulo}
    </button>
  );
}
