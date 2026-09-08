"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type Progresso,
  type TentativaSimulado,
  PROGRESSO_VAZIO,
  comCarimbo,
  lerProgresso,
  salvarProgresso,
} from "./lib/progresso";
import { useAssinatura } from "@/features/assinatura/AssinaturaProvider";
import { mesclarProgresso } from "@/lib/progresso-merge";

type EstadoProgresso = {
  pronto: boolean;
  progresso: Progresso;
  /** true enquanto uma sincronização com o servidor está em andamento. */
  sincronizando: boolean;
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
  const [sincronizando, setSincronizando] = useState(false);

  const { logado } = useAssinatura();
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aplicandoRemoto = useRef(false);

  useEffect(() => {
    const recarregarDoAparelho = () => setProgresso(lerProgresso());
    recarregarDoAparelho();
    setPronto(true);

    window.addEventListener("cysa:progresso-alterado", recarregarDoAparelho);
    window.addEventListener("storage", recarregarDoAparelho);
    return () => {
      window.removeEventListener("cysa:progresso-alterado", recarregarDoAparelho);
      window.removeEventListener("storage", recarregarDoAparelho);
    };
  }, []);

  /**
   * Envia o estado do aparelho, recebe a mesclagem do servidor e a aplica
   * localmente. O localStorage continua sendo a fonte imediata: a rede é um
   * complemento, então falhar aqui não atrapalha o estudo offline.
   */
  const sincronizar = useCallback(async () => {
    if (!logado) return;

    setSincronizando(true);
    try {
      const local = lerProgresso();
      const resposta = await fetch("/api/progresso", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(local),
      });
      if (!resposta.ok) return;

      const dado = (await resposta.json()) as {
        sincroniza?: boolean;
        progresso?: Progresso | null;
      };
      if (!dado.sincroniza || !dado.progresso) return;

      const mesclado = mesclarProgresso(local, dado.progresso) as Progresso;

      aplicandoRemoto.current = true;
      salvarProgresso(mesclado);
      setProgresso(mesclado);
      aplicandoRemoto.current = false;
    } catch {
      // Sem rede: o progresso local continua valendo e sincroniza depois.
    } finally {
      setSincronizando(false);
    }
  }, [logado]);

  /** Agrupa alterações seguidas em um único envio. */
  const agendarSincronizacao = useCallback(() => {
    if (aplicandoRemoto.current) return;
    if (temporizador.current) clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => void sincronizar(), 2000);
  }, [sincronizar]);

  // Ao entrar na conta, traz o que foi estudado em outros aparelhos.
  useEffect(() => {
    if (!pronto || !logado) return;
    void sincronizar();
  }, [pronto, logado, sincronizar]);

  // Uma última tentativa ao sair da página, para não perder o que ficou pendente.
  useEffect(() => {
    return () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, []);

  const atualizar = useCallback(
    (atualizador: (anterior: Progresso) => Progresso) => {
      setProgresso((anterior) => {
        const novo = comCarimbo(atualizador(anterior));
        salvarProgresso(novo);
        agendarSincronizacao();
        return novo;
      });
    },
    [agendarSincronizacao]
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
    const vazio = comCarimbo(PROGRESSO_VAZIO);
    salvarProgresso(vazio);
    setProgresso(vazio);
  }, []);

  const valor = useMemo<EstadoProgresso>(
    () => ({
      pronto,
      progresso,
      sincronizando,
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
      sincronizando,
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
