import type { FaseId } from "./types";

/**
 * Seções ainda em produção, agrupadas por fase. Os intervalos seguem o
 * roadmap do curso; os títulos definitivos entram em `src/content/secoes`
 * conforme o conteúdo de cada seção é escrito.
 */
export type BlocoRoadmap = {
  fase: FaseId;
  intervalo: string;
  temas: string[];
};

export const ROADMAP: BlocoRoadmap[] = [
  {
    fase: "f1",
    intervalo: "Seções 6 a 10",
    temas: [
      "Segurança de sistemas operacionais",
      "Conceitos e análise de logging",
      "Identidade e gestão de acesso",
      "Proteção de dados",
    ],
  },
  {
    fase: "f2",
    intervalo: "Seções 11 a 26",
    temas: [
      "Indicadores de comprometimento",
      "Threat intelligence com MISP e OpenCTI",
      "MITRE ATT&CK aplicado",
      "Threat hunting orientado a hipótese",
      "Captura de pacotes com Wireshark e tcpdump",
      "Correlação de logs no SIEM",
      "Análise de arquivos e sandboxing",
      "Scripting para automação de segurança",
    ],
  },
  {
    fase: "f3",
    intervalo: "Seções 27 a 41",
    temas: [
      "Descoberta e varredura de vulnerabilidades",
      "Priorização com CVSS e EPSS",
      "Remediação e validação",
      "Gestão de superfície de ataque",
      "Ciclo completo de resposta a incidentes",
    ],
  },
  {
    fase: "f4",
    intervalo: "Seções 42 e 43",
    temas: [
      "Relatório de vulnerabilidades",
      "Comunicação de incidentes",
      "Métricas e KPIs",
      "Recomendações acionáveis",
    ],
  },
];
