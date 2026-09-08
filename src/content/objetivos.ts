import type { DominioId } from "./types";

/**
 * Objetivos oficiais do CS0-004 V4, conforme o documento de objetivos da
 * CompTIA (versão 2.0, 2025).
 *
 * Isto é a fonte da verdade das marcações `objetivo` das lições e questões:
 * `scripts/verificar-conteudo.mts` falha o build se algum conteúdo apontar
 * para um código que não existe aqui. Também alimenta o mapa de cobertura.
 *
 * Os títulos estão em PT-BR; os termos técnicos ficam em inglês, como no resto
 * do curso, porque é assim que aparecem na prova.
 */

export type Objetivo = {
  /** Código oficial: "1.1", "2.3"… */
  codigo: string;
  dominio: DominioId;
  titulo: string;
  /** Tópicos listados pela CompTIA sob o objetivo. */
  topicos: string[];
};

export const OBJETIVOS: Objetivo[] = [
  {
    codigo: "1.1",
    dominio: "d1",
    titulo:
      "Explicar conceitos de arquitetura de sistemas e de rede em operações de segurança",
    topicos: [
      "Logging: ingestão, configuração, integridade e segurança, sincronização de tempo, retenção",
      "Sistemas operacionais: hardening, estrutura de arquivos e arquivos críticos, processos",
      "Infraestrutura: cloud native, virtualização, conteinerização, APIs",
      "Gestão de dispositivos: móveis e endpoints",
      "Arquitetura de rede: ZTNA, SASE, nuvem híbrida",
      "IAM: PAM, métodos de autenticação e autorização, secrets management",
      "Técnicas de criptografia",
      "Proteção de dados",
      "Infraestrutura crítica: OT, ICS e SCADA",
    ],
  },
  {
    codigo: "1.2",
    dominio: "d1",
    titulo: "Analisar indicadores de possível atividade maliciosa",
    topicos: [
      "Rede: dispositivos rogue, enumeração, atividade anômala, portas inesperadas",
      "Host: consumo de recursos, software não autorizado, processos suspeitos, LOLBins e scripts, mudanças no sistema de arquivos, exfiltração",
      "Configuração não autorizada",
      "Aplicação: interrupção de serviço e atividade anômala",
      "Nuvem: atividade anômala e comprometimento de recursos",
      "Engenharia social: typosquatting e encurtadores de URL",
      "Identidade: conta IAM comprometida, acesso não autorizado, impossible travel",
      "E-mail: business email compromise (BEC)",
    ],
  },
  {
    codigo: "1.3",
    dominio: "d1",
    titulo: "Usar ferramentas para determinar atividade maliciosa",
    topicos: [
      "Decodificação e parsing: CyberChef",
      "Análise de pacotes: Wireshark, tcpdump, Snort, Suricata, Zeek",
      "Análise de log e SIEM",
      "Threat intelligence: OTX, MISP, OpenCTI",
      "Endpoint: EDR, XDR e MDM",
      "Reputação de domínio e IP: WHOIS, AbuseIPDB, GeoIP",
      "Análise de arquivos: strings, VirusTotal, YARA",
      "Sandboxing: Joe Sandbox e Cuckoo Sandbox",
      "Reconhecimento de padrões: expressões regulares e comandos suspeitos",
      "Análise de e-mail: MXToolbox",
      "UEBA e OpenUBA",
      "Formatos: JSON, XML, YAML, EVTX",
      "Linguagens: Python, PowerShell e shell script",
    ],
  },
  {
    codigo: "1.4",
    dominio: "d1",
    titulo: "Explicar conceitos de threat intelligence e threat hunting",
    topicos: [
      "Atores de ameaça: APT e ameaça interna",
      "TTPs: heat maps, Pyramid of Pain, MITRE ATT&CK, atribuição",
      "Nível de confiança: atualidade, relevância e precisão",
      "Coleta: OSINT, fontes fechadas e compartilhamento de inteligência",
      "IoC: coleta, análise, aplicação e tipos (atômico e comportamental)",
      "Modelagem de ameaças: STRIDE",
      "Mapeamento de ameaças",
      "Cyber deception",
    ],
  },
  {
    codigo: "1.5",
    dominio: "d1",
    titulo:
      "Explicar a importância de eficiência e melhoria de processo em operações de segurança",
    topicos: [
      "Padronização de processos: coordenação da equipe, playbooks e runbooks",
      "Otimização: automação e orquestração com SOAR e IaC",
      "Enriquecimento de dados: tuning de regras e alertas, criação de dashboards",
      "Integração de tecnologia: APIs, webhooks e plug-ins",
    ],
  },
  {
    codigo: "1.6",
    dominio: "d1",
    titulo: "Resumir conceitos do uso de IA em operações de segurança",
    topicos: [
      "Riscos: alucinações, exposição de dados, envenenamento de modelo, prompts maliciosos",
      "Governança: conformidade legal e regulatória, políticas de uso de IA",
      "Casos de uso: comparar artefatos, analisar logs, criar documentos, investigar incidentes, correlacionar eventos, automatizar",
    ],
  },
  {
    codigo: "2.1",
    dominio: "d2",
    titulo: "Implementar o método apropriado de varredura de vulnerabilidades",
    topicos: [
      "Inventário de ativos",
      "Planejamento: agendamento, operação, desempenho, sensibilidade, segmentação, exigência regulatória",
      "Tipos de varredura: interna e externa, com e sem agente, credenciada e não credenciada, passiva e ativa",
      "Descoberta: mapping scans e fingerprinting de dispositivos",
      "Baseline de segurança: PCI DSS, benchmarks CIS, série ISO 27000",
    ],
  },
  {
    codigo: "2.2",
    dominio: "d2",
    titulo: "Analisar a saída de ferramentas de avaliação de vulnerabilidades",
    topicos: [
      "Varredura e mapeamento de rede: Angry IP Scanner e Masscan",
      "Ferramentas multipropósito: Nmap, Metasploit, Maltego, Recon-ng",
      "Scanners de aplicação web: Burp Suite, ZAP, Nikto",
      "Scanners de vulnerabilidade: Nessus, Nuclei, OpenVAS",
      "Avaliação de infraestrutura de nuvem: ScoutSuite, Prowler, Trivy, Checkov",
      "Breach and attack simulation: Atomic Red Team e Caldera",
    ],
  },
  {
    codigo: "2.3",
    dominio: "d2",
    titulo: "Analisar dados para priorizar e mitigar vulnerabilidades",
    topicos: [
      "Critérios: explorabilidade, exploração ativa, valor do ativo, impacto, disponibilidade de correção, falsos positivos e negativos",
      "Pontuação: métricas CVSS e EPSS",
      "Consciência de contexto: interno, externo e isolado",
      "Mitigação: gestão de superfície de ataque, código seguro, patching e configuração, exceções, controles compensatórios",
      "Validação da remediação",
    ],
  },
  {
    codigo: "2.4",
    dominio: "d2",
    titulo:
      "Explicar conceitos de tipos de controle, riscos e gestão de vulnerabilidades",
    topicos: [
      "Tipos de controle: administrativo, técnico e físico",
      "Funções de controle: preventivo, detectivo, responsivo e corretivo",
      "Risco: apetite, risco residual e risco inerente",
      "Estratégias: aceitar, transferir, evitar e mitigar",
      "Políticas, governança e SLOs",
      "Segurança de aplicação: SAST, DAST e SAMM",
      "Risco de terceiros: cadeia de suprimentos, SCA e SBOM",
    ],
  },
  {
    codigo: "3.1",
    dominio: "d3",
    titulo: "Resumir conceitos de frameworks de metodologia de ataque",
    topicos: [
      "Cyber Kill Chain",
      "Diamond Model of Intrusion Analysis",
      "MITRE ATT&CK",
    ],
  },
  {
    codigo: "3.2",
    dominio: "d3",
    titulo: "Resumir o processo de resposta a incidentes",
    topicos: [
      "Preparação",
      "Detecção",
      "Análise",
      "Contenção",
      "Erradicação",
      "Recuperação",
      "Pós-incidente",
    ],
  },
  {
    codigo: "3.3",
    dominio: "d3",
    titulo: "Implementar técnicas de resposta a incidentes",
    topicos: [
      "Planos de resposta e de comunicação; playbooks; definição de papéis",
      "Treinamento: tabletop e simulação",
      "Logs: coleta, correlação, aumento e enriquecimento",
      "Alertas e notificações, triagem, linha do tempo, severidade e priorização",
      "Evidência: cadeia de custódia, validação de integridade, preservação, legal hold",
      "Isolamento de alvos afetados, escalonamento, remediação e verificação",
      "Liberação do isolamento, restauração, análise de causa raiz, ação corretiva",
    ],
  },
  {
    codigo: "4.1",
    dominio: "d4",
    titulo:
      "Explicar a importância do relatório e da comunicação em gestão de vulnerabilidades",
    topicos: [
      "Relatórios de varredura, achados de conformidade e risk scorecards",
      "Planos de ação: escalonamento e dependências",
      "Inibidores da remediação: contrato, governança, interrupção de processo, degradação de função, sistema legado, sistema proprietário, disponibilidade de patch",
      "Identificação e comunicação com stakeholders",
      "Métricas e KPIs: tendências, principais riscos e SLA",
    ],
  },
  {
    codigo: "4.2",
    dominio: "d4",
    titulo:
      "Explicar a importância do relatório e da comunicação em operações de segurança e resposta a incidentes",
    topicos: [
      "Declaração e escalonamento de incidente; sumário executivo",
      "Plano de comunicação: stakeholders, jurídico, relações públicas, órgãos reguladores, autoridades e clientes",
      "Conscientização operacional e canais de comunicação",
      "Relatório pós-incidente: after action report, lições aprendidas, causa raiz",
      "Handover de turno e de incidente",
      "Relatório interno de threat intelligence, adaptado à organização",
      "Métricas e KPIs: volume de alertas, taxa de falso e verdadeiro positivo, MTTC, MTTD, MTTR, MTTRem, taxa de clique em phishing",
    ],
  },
];

const PORCODIGO = new Map(OBJETIVOS.map((o) => [o.codigo, o]));

export function getObjetivo(codigo: string): Objetivo | undefined {
  return PORCODIGO.get(codigo);
}

export function objetivoExiste(codigo: string): boolean {
  return PORCODIGO.has(codigo);
}

export function objetivosDoDominio(dominio: DominioId): Objetivo[] {
  return OBJETIVOS.filter((o) => o.dominio === dominio);
}
