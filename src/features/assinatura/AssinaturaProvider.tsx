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

type SessaoServidor = {
  contasAtivas: boolean;
  logado: boolean;
  email: string | null;
  liberado: boolean;
};

type EstadoAssinatura = {
  /** false até a primeira leitura no cliente (evita flash de paywall). */
  pronto: boolean;
  assinatura: Assinatura;
  ativa: boolean;
  /** true quando o app já tem contas de verdade (Supabase configurado). */
  contasAtivas: boolean;
  logado: boolean;
  email: string | null;
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
  const [sessao, setSessao] = useState<SessaoServidor | null>(null);

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

  // Quando existem contas de verdade, quem manda é o servidor. O estado local
  // continua valendo apenas enquanto essa infraestrutura não está configurada.
  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const resposta = await fetch("/api/sessao", { cache: "no-store" });
        if (!resposta.ok) return;
        const dado = (await resposta.json()) as SessaoServidor;
        if (!cancelado) setSessao(dado);
      } catch {
        // Offline ou endpoint indisponível: seguimos com o estado local.
      }
    })();

    return () => {
      cancelado = true;
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

  const valor = useMemo<EstadoAssinatura>(() => {
    const comContas = sessao?.contasAtivas ?? false;

    return {
      pronto,
      assinatura,
      ativa: comContas ? sessao!.liberado : pronto && assinatura.ativa,
      contasAtivas: comContas,
      logado: sessao?.logado ?? false,
      email: sessao?.email ?? assinatura.email,
      ativar,
      remover,
    };
  }, [pronto, assinatura, sessao, ativar, remover]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}
