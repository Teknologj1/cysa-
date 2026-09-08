"use client";

import { useCallback, useMemo } from "react";
import { useAssinatura } from "@/features/assinatura/AssinaturaProvider";
import {
  diasAteLiberar,
  diasDeAssinatura,
  diasParaLiberarSecao,
  secaoLiberada,
} from "@/lib/liberacao";

/**
 * Estado de liberação das seções para a interface.
 *
 * Isto é apresentação, não controle de acesso: quem decide o que sai do
 * servidor é a página da lição e a API do simulado. Aqui é só para o aluno
 * ver o prazo antes de clicar.
 */
export function useLiberacao() {
  const { contasAtivas, inicioAssinatura, cortesia } = useAssinatura();

  const diasDecorridos = useMemo(
    () => diasDeAssinatura(inicioAssinatura),
    [inicioAssinatura]
  );

  return useCallback(
    (secao: { diasParaLiberar?: number }) => {
      // Sem contas de verdade não há assinatura para datar: tudo aberto.
      if (!contasAtivas) return { liberada: true, dias: 0 };

      const contexto = {
        diasParaLiberar: diasParaLiberarSecao(secao),
        diasDecorridos,
        cortesia,
      };

      return {
        liberada: secaoLiberada(contexto),
        dias: diasAteLiberar(contexto),
      };
    },
    [contasAtivas, diasDecorridos, cortesia]
  );
}
