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
  type Progresso,
  type TentativaSimulado,
  PROGRESSO_VAZIO,
  lerProgresso,
  salvarProgresso,
} from "./lib/progresso";

type EstadoProgresso = {
  pronto: boolean;
  progresso: Progresso;
  concluida: (licaoId: string) => boolean;
  alternarLicao: (licaoId: string) => void;
  marcarLicao: (licaoId: string) => void;
  registrarTentativa: (tentativa: TentativaSimulado) => void;
  definirDataProva: (isoOuNull: string | null) => void;
  limpar: () => void;
};

const Contexto = createContext<EstadoProgresso | undefined>(undefined);

export function useProgresso(): EstadoProgresso {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useProgresso precisa estar dentro de ProgressoProvider");
  }
  return contexto;
}

export default function ProgressoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pronto, setPronto] = useState(false);
  const [progresso, setProgresso] = useState<Progresso>(PROGRESSO_VAZIO);

  useEffect(() => {
    const sincronizar = () => setProgresso(lerProgresso());
    sincronizar();
    setPronto(true);

    window.addEventListener("cysa:progresso-alterado", sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener("cysa:progresso-alterado", sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const atualizar = useCallback(
    (atualizador: (anterior: Progresso) => Progresso) => {
      setProgresso((anterior) => {
        const novo = atualizador(anterior);
        salvarProgresso(novo);
        return novo;
      });
    },
    []
  );

  const concluida = useCallback(
    (licaoId: string) => progresso.licoesConcluidas.includes(licaoId),
    [progresso.licoesConcluidas]
  );

  const alternarLicao = useCallback(
    (licaoId: string) => {
      atualizar((anterior) => ({
        ...anterior,
        licoesConcluidas: anterior.licoesConcluidas.includes(licaoId)
          ? anterior.licoesConcluidas.filter((id) => id !== licaoId)
          : [...anterior.licoesConcluidas, licaoId],
      }));
    },
    [atualizar]
  );

  const marcarLicao = useCallback(
    (licaoId: string) => {
      atualizar((anterior) =>
        anterior.licoesConcluidas.includes(licaoId)
          ? anterior
          : {
              ...anterior,
              licoesConcluidas: [...anterior.licoesConcluidas, licaoId],
            }
      );
    },
    [atualizar]
  );

  const registrarTentativa = useCallback(
    (tentativa: TentativaSimulado) => {
      atualizar((anterior) => ({
        ...anterior,
        tentativas: [tentativa, ...anterior.tentativas].slice(0, 30),
      }));
    },
    [atualizar]
  );

  const definirDataProva = useCallback(
    (isoOuNull: string | null) => {
      atualizar((anterior) => ({ ...anterior, dataProva: isoOuNull }));
    },
    [atualizar]
  );

  const limpar = useCallback(() => {
    salvarProgresso(PROGRESSO_VAZIO);
    setProgresso(PROGRESSO_VAZIO);
  }, []);

  const valor = useMemo<EstadoProgresso>(
    () => ({
      pronto,
      progresso,
      concluida,
      alternarLicao,
      marcarLicao,
      registrarTentativa,
      definirDataProva,
      limpar,
    }),
    [
      pronto,
      progresso,
      concluida,
      alternarLicao,
      marcarLicao,
      registrarTentativa,
      definirDataProva,
      limpar,
    ]
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}
