"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type Assinatura,
  SEM_ASSINATURA,
  criarAssinatura,
  lerAssinatura,
  limparAssinatura,
  salvarAssinatura,
} from "@/lib/assinatura";
import {
  type Progresso,
  type TentativaSimulado,
  PROGRESSO_VAZIO,
  lerProgresso,
  salvarProgresso,
} from "@/lib/progresso";
import type { PlanId } from "@/content/plans";

type AppState = {
  /** false até o primeiro carregamento no cliente (evita flash de paywall). */
  pronto: boolean;
  assinatura: Assinatura;
  progresso: Progresso;
  ativarAssinatura: (
    planoId: PlanId,
    origem: "stripe" | "demo",
    email: string | null,
    stripeSessionId?: string
  ) => void;
  cancelarAssinatura: () => void;
  alternarAula: (aulaId: string) => void;
  aulaConcluida: (aulaId: string) => boolean;
  registrarTentativa: (tentativa: TentativaSimulado) => void;
  definirDataProva: (isoOuNull: string | null) => void;
  limparProgresso: () => void;
};

const Contexto = createContext<AppState | undefined>(undefined);

export function useApp(): AppState {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useApp precisa estar dentro de AppStateProvider");
  }
  return contexto;
}

export default function AppStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pronto, setPronto] = useState(false);
  const [assinatura, setAssinatura] = useState<Assinatura>(SEM_ASSINATURA);
  const [progresso, setProgresso] = useState<Progresso>(PROGRESSO_VAZIO);

  // Hidrata do localStorage e mantém sincronizado entre abas.
  useEffect(() => {
    const sincronizar = () => {
      setAssinatura(lerAssinatura());
      setProgresso(lerProgresso());
    };
    sincronizar();
    setPronto(true);

    window.addEventListener("cysa:assinatura-alterada", sincronizar);
    window.addEventListener("cysa:progresso-alterado", sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener("cysa:assinatura-alterada", sincronizar);
      window.removeEventListener("cysa:progresso-alterado", sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const ativarAssinatura = useCallback(
    (
      planoId: PlanId,
      origem: "stripe" | "demo",
      email: string | null,
      stripeSessionId?: string
    ) => {
      const nova = criarAssinatura(planoId, origem, email, stripeSessionId);
      salvarAssinatura(nova);
      setAssinatura(nova);
    },
    []
  );

  const cancelarAssinatura = useCallback(() => {
    limparAssinatura();
    setAssinatura(SEM_ASSINATURA);
  }, []);

  const atualizarProgresso = useCallback(
    (atualizador: (anterior: Progresso) => Progresso) => {
      setProgresso((anterior) => {
        const novo = atualizador(anterior);
        salvarProgresso(novo);
        return novo;
      });
    },
    []
  );

  const alternarAula = useCallback(
    (aulaId: string) => {
      atualizarProgresso((anterior) => {
        const jaTem = anterior.aulasConcluidas.includes(aulaId);
        return {
          ...anterior,
          aulasConcluidas: jaTem
            ? anterior.aulasConcluidas.filter((id) => id !== aulaId)
            : [...anterior.aulasConcluidas, aulaId],
        };
      });
    },
    [atualizarProgresso]
  );

  const aulaConcluida = useCallback(
    (aulaId: string) => progresso.aulasConcluidas.includes(aulaId),
    [progresso.aulasConcluidas]
  );

  const registrarTentativa = useCallback(
    (tentativa: TentativaSimulado) => {
      atualizarProgresso((anterior) => ({
        ...anterior,
        tentativas: [tentativa, ...anterior.tentativas].slice(0, 30),
      }));
    },
    [atualizarProgresso]
  );

  const definirDataProva = useCallback(
    (isoOuNull: string | null) => {
      atualizarProgresso((anterior) => ({ ...anterior, dataProva: isoOuNull }));
    },
    [atualizarProgresso]
  );

  const limparProgresso = useCallback(() => {
    salvarProgresso(PROGRESSO_VAZIO);
    setProgresso(PROGRESSO_VAZIO);
  }, []);

  const valor = useMemo<AppState>(
    () => ({
      pronto,
      assinatura,
      progresso,
      ativarAssinatura,
      cancelarAssinatura,
      alternarAula,
      aulaConcluida,
      registrarTentativa,
      definirDataProva,
      limparProgresso,
    }),
    [
      pronto,
      assinatura,
      progresso,
      ativarAssinatura,
      cancelarAssinatura,
      alternarAula,
      aulaConcluida,
      registrarTentativa,
      definirDataProva,
      limparProgresso,
    ]
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}
