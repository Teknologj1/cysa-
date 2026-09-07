import type { Dominio, DominioId } from "./types";

/**
 * Domínios do CS0-004 com os pesos oficiais. A soma é 100%.
 * Atenção: os pesos mudaram em relação ao CS0-003 (33/30/20/17).
 */
export const DOMINIOS: Dominio[] = [
  {
    id: "d1",
    codigo: "1.0",
    nome: "Operações de Segurança",
    peso: 34,
    descricao:
      "O dia a dia do SOC: arquitetura, indicadores de atividade maliciosa, ferramentas de análise, threat intelligence e melhoria de processo.",
    cor: "#22d3ee",
  },
  {
    id: "d2",
    codigo: "2.0",
    nome: "Gestão de Vulnerabilidades",
    peso: 26,
    descricao:
      "Ciclo completo: descoberta, varredura, interpretação de resultados, priorização por contexto e acompanhamento da correção.",
    cor: "#a78bfa",
  },
  {
    id: "d3",
    codigo: "3.0",
    nome: "Resposta e Gestão de Incidentes",
    peso: 24,
    descricao:
      "Do preparo à atividade pós-incidente, com ferramentas de resposta, análise de artefatos e conceitos forenses.",
    cor: "#fbbf24",
  },
  {
    id: "d4",
    codigo: "4.0",
    nome: "Relatórios e Comunicação",
    peso: 16,
    descricao:
      "Comunicar achados de vulnerabilidade e de incidente ao público certo, com métricas, causa raiz e recomendações acionáveis.",
    cor: "#34d399",
  },
];

export function getDominio(id: DominioId): Dominio {
  return DOMINIOS.find((d) => d.id === id) ?? DOMINIOS[0];
}

export function rotuloDominio(id: DominioId | null): string {
  if (!id) return "Introdução";
  return `Domínio ${getDominio(id).codigo}`;
}

/** Distribui `total` questões entre os domínios conforme o peso do exame. */
export function distribuirPorPeso(total: number): Record<DominioId, number> {
  const bruto = DOMINIOS.map((d) => ({
    id: d.id,
    exato: (total * d.peso) / 100,
  }));
  const resultado = {} as Record<DominioId, number>;
  let somados = 0;

  for (const item of bruto) {
    resultado[item.id] = Math.floor(item.exato);
    somados += resultado[item.id];
  }

  // Distribui a sobra pelos maiores restos, preservando o total pedido.
  const restos = bruto
    .map((item) => ({ id: item.id, resto: item.exato - Math.floor(item.exato) }))
    .sort((a, b) => b.resto - a.resto);

  let i = 0;
  while (somados < total && restos.length > 0) {
    resultado[restos[i % restos.length].id] += 1;
    somados += 1;
    i += 1;
  }

  return resultado;
}
