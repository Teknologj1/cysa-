import type { Fase } from "./types";

/**
 * O curso não segue a ordem em que a CompTIA lista os objetivos: segue a ordem
 * em que um analista constrói a habilidade. Cada fase depende da anterior.
 */
export const FASES: Fase[] = [
  {
    id: "f0",
    numero: 0,
    titulo: "Começando",
    descricao:
      "O papel do analista, o formato do exame e como percorrer o curso sem deixar lacuna.",
  },
  {
    id: "f1",
    numero: 1,
    titulo: "Seu ambiente de operação",
    descricao:
      "Antes de detectar qualquer coisa é preciso saber o que se está olhando: SOC, arquitetura, sistemas, logs, identidade e proteção de dados.",
  },
  {
    id: "f2",
    numero: 2,
    titulo: "Detecção e análise",
    descricao:
      "Indicadores de comprometimento, threat intelligence, MITRE ATT&CK, caça a ameaças e as ferramentas de análise do dia a dia.",
  },
  {
    id: "f3",
    numero: 3,
    titulo: "Vulnerabilidades e resposta a incidentes",
    descricao:
      "Ciclo completo de gestão de vulnerabilidades e o ciclo de resposta a incidentes, da detecção à atividade pós-incidente.",
  },
  {
    id: "f4",
    numero: 4,
    titulo: "Relatórios e comunicação",
    descricao:
      "Traduzir achado técnico em decisão: relatórios, métricas, comunicação com stakeholders e recomendações que movem a organização.",
  },
];

export function getFase(id: string): Fase | undefined {
  return FASES.find((f) => f.id === id);
}
