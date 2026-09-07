"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { PlanId } from "@/content/planos";
import {
  type Assinatura,
  type OrigemAssinatura,
  SEM_ASSINATURA,
  criarAssinatura,
  lerAssinatura,
  limparAssinatura,
  salvarAssinatura,
} from "./lib/assinatura";

type EstadoAssinatura = {
  /** false até a primeira leitura no cliente (evita flash de paywall). */
  pronto: boolean;
  assinatura: Assinatura;
  ativa: boolean;
  ativar: (
    planoId: PlanId,
    origem: OrigemAssinatura,
    email: string | null,
    stripeSessionId?: string
  ) => void;
  remover: () => void;
};

const Contexto = createContext<EstadoAssinatura | undefined>(undefined);

export function useAssinatura(): EstadoAssinatura {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useAssinatura precisa estar dentro de AssinaturaProvider");
  }
  return contexto;
}

export default function AssinaturaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pronto, setPronto] = useState(false);
  const [assinatura, setAssinatura] = useState<Assinatura>(SEM_ASSINATURA);

  useEffect(() => {
    const sincronizar = () => setAssinatura(lerAssinatura());
    sincronizar();
    setPronto(true);

    window.addEventListener("cysa:assinatura-alterada", sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener("cysa:assinatura-alterada", sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const ativar = useCallback(
    (
      planoId: PlanId,
      origem: OrigemAssinatura,
      email: string | null,
      stripeSessionId?: string
    ) => {
      const nova = criarAssinatura(planoId, origem, email, stripeSessionId);
      salvarAssinatura(nova);
      setAssinatura(nova);
    },
    []
  );

  const remover = useCallback(() => {
    limparAssinatura();
    setAssinatura(SEM_ASSINATURA);
  }, []);

  const valor = useMemo<EstadoAssinatura>(
    () => ({
      pronto,
      assinatura,
      ativa: pronto && assinatura.ativa,
      ativar,
      remover,
    }),
    [pronto, assinatura, ativar, remover]
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}
