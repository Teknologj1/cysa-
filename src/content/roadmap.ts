import type { FaseId } from "./types";

/**
 * Seções ainda em produção, agrupadas por fase. Os temas saem do documento
 * oficial de objetivos do CS0-004 (ver `objetivos.ts`), para o roadmap
 * prometer exatamente o que a prova cobra — nem mais, nem menos.
 *
 * Os títulos definitivos entram em `src/content/secoes` conforme cada seção
 * é escrita.
 */
export type BlocoRoadmap = {
  fase: FaseId;
  intervalo: string;
  temas: string[];
};

export const ROADMAP: BlocoRoadmap[] = [
  {
    fase: "f1",
    intervalo: "Seções 7 a 11",
    temas: [
      "Segurança de sistemas operacionais e hardening",
      "Logging: ingestão, integridade, sincronização e retenção",
      "Identidade e acesso: PAM e secrets management",
      "Técnicas de criptografia",
      "Proteção de dados",
    ],
  },
  {
    fase: "f2",
    intervalo: "Seções 12 a 26",
    temas: [
      "Indicadores de rede, host, aplicação e nuvem",
      "Indicadores de identidade e ataques por e-mail",
      "Threat intelligence com MISP e OpenCTI",
      "MITRE ATT&CK, Pyramid of Pain e modelagem com STRIDE",
      "Threat hunting orientado a hipótese",
      "Captura de pacotes com Wireshark, tcpdump, Zeek e Suricata",
      "Correlação de logs no SIEM e UEBA",
      "Análise de arquivos, YARA e sandboxing",
      "Scripting com Python, PowerShell e shell",
      "SOAR, automação e tuning de alertas",
      "IA em operações de segurança: riscos, governança e casos de uso",
    ],
  },
  {
    fase: "f3",
    intervalo: "Seções 27 a 41",
    temas: [
      "Métodos de varredura e inventário de ativos",
      "Ferramentas: Nmap, Nessus, OpenVAS, Burp Suite e ZAP",
      "Avaliação de nuvem e IaC: Prowler, ScoutSuite, Trivy e Checkov",
      "Priorização com CVSS e EPSS",
      "Remediação, exceções, controles compensatórios e validação",
      "Risco de terceiros: cadeia de suprimentos, SCA e SBOM",
      "Frameworks de ataque: Cyber Kill Chain e Diamond Model",
      "Ciclo completo de resposta a incidentes",
      "Evidência, cadeia de custódia e causa raiz",
    ],
  },
  {
    fase: "f4",
    intervalo: "Seções 42 e 43",
    temas: [
      "Relatório de vulnerabilidades e risk scorecards",
      "Inibidores da remediação e planos de ação",
      "Comunicação de incidentes e sumário executivo",
      "Métricas e KPIs: MTTD, MTTR e taxa de falso positivo",
      "Handover de turno e relatório pós-incidente",
    ],
  },
];
