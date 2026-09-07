export type DominioId = "d1" | "d2" | "d3" | "d4" | "extra";

export type Dominio = {
  id: DominioId;
  codigo: string;
  nome: string;
  /** Peso do domínio no exame CS0-003 (%). */
  peso: number;
  cor: string;
};

export type TipoAula = "video" | "leitura" | "lab" | "quiz";

export type Aula = {
  id: string;
  titulo: string;
  resumo: string;
  minutos: number;
  tipo: TipoAula;
  /** Aulas gratuitas ficam liberadas sem assinatura (amostra do curso). */
  gratis?: boolean;
};

export type Modulo = {
  id: string;
  numero: number;
  titulo: string;
  dominio: DominioId;
  descricao: string;
  aulas: Aula[];
};

export const DOMINIOS: Dominio[] = [
  {
    id: "d1",
    codigo: "1.0",
    nome: "Operações de Segurança",
    peso: 33,
    cor: "#22d3ee",
  },
  {
    id: "d2",
    codigo: "2.0",
    nome: "Gestão de Vulnerabilidades",
    peso: 30,
    cor: "#a78bfa",
  },
  {
    id: "d3",
    codigo: "3.0",
    nome: "Resposta e Gestão de Incidentes",
    peso: 20,
    cor: "#fbbf24",
  },
  {
    id: "d4",
    codigo: "4.0",
    nome: "Relatórios e Comunicação",
    peso: 17,
    cor: "#34d399",
  },
  {
    id: "extra",
    codigo: "—",
    nome: "Preparação para a prova",
    peso: 0,
    cor: "#94a3b8",
  },
];

export function getDominio(id: DominioId): Dominio {
  return DOMINIOS.find((d) => d.id === id) ?? DOMINIOS[DOMINIOS.length - 1];
}

export const MODULOS: Modulo[] = [
  {
    id: "m01",
    numero: 1,
    titulo: "Entendendo o exame CS0-003",
    dominio: "extra",
    descricao:
      "Como a prova é estruturada, o que ela cobra de verdade e como montar um plano de estudos realista.",
    aulas: [
      {
        id: "m01a1",
        titulo: "O que é o CySA+ e para quem ele serve",
        resumo:
          "Posicionamento da certificação entre Security+ e CASP+, cargos que a exigem e expectativa de conhecimento prévio.",
        minutos: 12,
        tipo: "video",
        gratis: true,
      },
      {
        id: "m01a2",
        titulo: "Formato da prova: 85 questões, 165 minutos, PBQs",
        resumo:
          "Questões baseadas em desempenho (PBQ), múltipla escolha, pontuação 100–900 e nota de corte 750.",
        minutos: 10,
        tipo: "video",
        gratis: true,
      },
      {
        id: "m01a3",
        titulo: "Os 4 domínios e seus pesos",
        resumo:
          "Como distribuir seu tempo de estudo proporcionalmente a 33% / 30% / 20% / 17%.",
        minutos: 9,
        tipo: "leitura",
        gratis: true,
      },
      {
        id: "m01a4",
        titulo: "Montando seu plano de 12 semanas",
        resumo:
          "Cronograma semanal, checkpoints de simulado e critérios objetivos para marcar a prova.",
        minutos: 14,
        tipo: "leitura",
      },
    ],
  },
  {
    id: "m02",
    numero: 2,
    titulo: "Fundamentos de sistemas e rede para o analista",
    dominio: "d1",
    descricao:
      "A base que o exame assume: arquitetura de rede, identidade, logs e onde a telemetria nasce.",
    aulas: [
      {
        id: "m02a1",
        titulo: "Arquitetura de rede: segmentação, zonas e Zero Trust",
        resumo:
          "VLANs, DMZ, microsegmentação, SDN e por que o desenho da rede muda a sua triagem.",
        minutos: 22,
        tipo: "video",
        gratis: true,
      },
      {
        id: "m02a2",
        titulo: "Identidade e acesso: SSO, MFA, federação e privilégios",
        resumo:
          "Kerberos, SAML, OAuth, contas de serviço e os abusos mais cobrados na prova.",
        minutos: 20,
        tipo: "video",
      },
      {
        id: "m02a3",
        titulo: "Fontes de log: endpoint, rede, nuvem e aplicação",
        resumo:
          "O que cada fonte enxerga, o que ela não enxerga e como isso cria pontos cegos.",
        minutos: 18,
        tipo: "leitura",
      },
      {
        id: "m02a4",
        titulo: "Lab: normalizando eventos em um SIEM",
        resumo:
          "Ingestão, parsing, enriquecimento e por que o campo errado destrói uma correlação.",
        minutos: 30,
        tipo: "lab",
      },
      {
        id: "m02a5",
        titulo: "Checkpoint do módulo",
        resumo: "10 questões no estilo da prova sobre fundamentos de operações.",
        minutos: 15,
        tipo: "quiz",
      },
    ],
  },
  {
    id: "m03",
    numero: 3,
    titulo: "Análise de indicadores maliciosos",
    dominio: "d1",
    descricao:
      "Reconhecer atividade suspeita em rede, host e aplicação — o coração do domínio 1.",
    aulas: [
      {
        id: "m03a1",
        titulo: "Indicadores de rede: beaconing, DNS e exfiltração",
        resumo:
          "Tráfego periódico, DGA, tunelamento DNS/ICMP e picos de saída fora do padrão.",
        minutos: 24,
        tipo: "video",
      },
      {
        id: "m03a2",
        titulo: "Indicadores de host: processos, persistência e memória",
        resumo:
          "Processos órfãos, injeção, LOLBins, tarefas agendadas e chaves de execução.",
        minutos: 26,
        tipo: "video",
      },
      {
        id: "m03a3",
        titulo: "Indicadores de aplicação: injeção, SSRF e abuso de sessão",
        resumo:
          "Como esses ataques aparecem nos logs do servidor web e do WAF.",
        minutos: 21,
        tipo: "video",
      },
      {
        id: "m03a4",
        titulo: "Lab: triagem de um alerta de PowerShell ofuscado",
        resumo:
          "Do alerta bruto à conclusão: comando decodificado, escopo e ação recomendada.",
        minutos: 35,
        tipo: "lab",
      },
      {
        id: "m03a5",
        titulo: "Checkpoint do módulo",
        resumo: "12 questões de análise de indicadores com explicação comentada.",
        minutos: 18,
        tipo: "quiz",
      },
    ],
  },
  {
    id: "m04",
    numero: 4,
    titulo: "Threat intelligence e caça a ameaças",
    dominio: "d1",
    descricao:
      "Transformar inteligência em hipóteses de caça e em detecções que sobrevivem ao tempo.",
    aulas: [
      {
        id: "m04a1",
        titulo: "Ciclo de inteligência, TTPs e a pirâmide da dor",
        resumo:
          "Por que bloquear hash é barato para o atacante e caçar TTP é caro.",
        minutos: 19,
        tipo: "video",
      },
      {
        id: "m04a2",
        titulo: "MITRE ATT&CK, Cyber Kill Chain e Diamond Model",
        resumo: "Quando usar cada framework — e o que a prova espera de cada um.",
        minutos: 23,
        tipo: "video",
      },
      {
        id: "m04a3",
        titulo: "Threat hunting orientado a hipótese",
        resumo:
          "Formular, testar e encerrar uma caça; converter achado em detecção.",
        minutos: 20,
        tipo: "leitura",
      },
      {
        id: "m04a4",
        titulo: "Automação: SOAR, playbooks e enriquecimento",
        resumo:
          "O que automatizar primeiro e como medir ganho real de tempo de triagem.",
        minutos: 17,
        tipo: "video",
      },
      {
        id: "m04a5",
        titulo: "Checkpoint do módulo",
        resumo: "10 questões sobre inteligência, frameworks e caça.",
        minutos: 15,
        tipo: "quiz",
      },
    ],
  },
  {
    id: "m05",
    numero: 5,
    titulo: "Descoberta e varredura de vulnerabilidades",
    dominio: "d2",
    descricao:
      "Inventário, escopo, tipos de varredura e como não derrubar produção fazendo scan.",
    aulas: [
      {
        id: "m05a1",
        titulo: "Inventário de ativos e superfície de ataque",
        resumo:
          "Descoberta ativa e passiva, shadow IT e o que fazer com ativo sem dono.",
        minutos: 18,
        tipo: "video",
      },
      {
        id: "m05a2",
        titulo: "Tipos de varredura: credenciada, agente, rede e nuvem",
        resumo:
          "Trade-offs de precisão, ruído e impacto — e quando cada uma é exigida.",
        minutos: 22,
        tipo: "video",
      },
      {
        id: "m05a3",
        titulo: "Análise estática, dinâmica e composição de software",
        resumo: "SAST, DAST, IAST e SCA/SBOM aplicados ao pipeline.",
        minutos: 20,
        tipo: "video",
      },
      {
        id: "m05a4",
        titulo: "Lab: lendo um relatório de scanner sem se enganar",
        resumo:
          "Separar falso positivo, falso negativo e achado sem contexto de exposição.",
        minutos: 30,
        tipo: "lab",
      },
      {
        id: "m05a5",
        titulo: "Checkpoint do módulo",
        resumo: "10 questões sobre descoberta e varredura.",
        minutos: 15,
        tipo: "quiz",
      },
    ],
  },
  {
    id: "m06",
    numero: 6,
    titulo: "Priorização, análise e resposta a vulnerabilidades",
    dominio: "d2",
    descricao:
      "CVSS na prática, contexto de negócio, controles compensatórios e validação da correção.",
    aulas: [
      {
        id: "m06a1",
        titulo: "CVSS v3.1: métricas base, temporal e ambiental",
        resumo:
          "Interpretar o vetor, e por que a nota base sozinha prioriza errado.",
        minutos: 26,
        tipo: "video",
      },
      {
        id: "m06a2",
        titulo: "Contexto que muda a prioridade: EPSS, KEV e exposição",
        resumo:
          "Probabilidade de exploração, exploração ativa conhecida e criticidade do ativo.",
        minutos: 21,
        tipo: "video",
      },
      {
        id: "m06a3",
        titulo: "Resposta: correção, mitigação, aceite e controles compensatórios",
        resumo:
          "Janela de manutenção, exceção formal, risco residual e quem assina.",
        minutos: 19,
        tipo: "leitura",
      },
      {
        id: "m06a4",
        titulo: "Lab: priorizando 40 achados com recurso limitado",
        resumo:
          "Construir a fila de correção defensável diante da diretoria.",
        minutos: 35,
        tipo: "lab",
      },
      {
        id: "m06a5",
        titulo: "Checkpoint do módulo",
        resumo: "12 questões de priorização e resposta.",
        minutos: 18,
        tipo: "quiz",
      },
    ],
  },
  {
    id: "m07",
    numero: 7,
    titulo: "Resposta a incidentes: do preparo à recuperação",
    dominio: "d3",
    descricao:
      "As fases do ciclo de IR, contenção sem destruir evidência e coordenação sob pressão.",
    aulas: [
      {
        id: "m07a1",
        titulo: "Preparação: plano, papéis, runbooks e exercícios",
        resumo:
          "O que precisa estar pronto antes do incidente para a resposta não improvisar.",
        minutos: 20,
        tipo: "video",
      },
      {
        id: "m07a2",
        titulo: "Detecção, análise e classificação de severidade",
        resumo:
          "Critérios de escalonamento, impacto e por que classificar cedo importa.",
        minutos: 22,
        tipo: "video",
      },
      {
        id: "m07a3",
        titulo: "Contenção, erradicação e recuperação",
        resumo:
          "Isolar sem alertar o atacante, remover persistência e validar o retorno.",
        minutos: 24,
        tipo: "video",
      },
      {
        id: "m07a4",
        titulo: "Forense e cadeia de custódia",
        resumo:
          "Ordem de volatilidade, aquisição de memória e disco, hashing e documentação.",
        minutos: 23,
        tipo: "video",
      },
      {
        id: "m07a5",
        titulo: "Lab: linha do tempo de um comprometimento",
        resumo:
          "Reconstruir o incidente a partir de logs de EDR, proxy e autenticação.",
        minutos: 40,
        tipo: "lab",
      },
      {
        id: "m07a6",
        titulo: "Checkpoint do módulo",
        resumo: "12 questões sobre o ciclo de resposta a incidentes.",
        minutos: 18,
        tipo: "quiz",
      },
    ],
  },
  {
    id: "m08",
    numero: 8,
    titulo: "Relatórios, métricas e comunicação",
    dominio: "d4",
    descricao:
      "O domínio mais subestimado: escrever para quem decide e reportar a quem cobra.",
    aulas: [
      {
        id: "m08a1",
        titulo: "Relatório de vulnerabilidades que gera ação",
        resumo:
          "Estrutura, priorização, dono, prazo e a diferença entre achado e recomendação.",
        minutos: 18,
        tipo: "video",
      },
      {
        id: "m08a2",
        titulo: "Relatório de incidente e lições aprendidas",
        resumo:
          "Cronologia, impacto, causa raiz e ações corretivas com responsável.",
        minutos: 19,
        tipo: "video",
      },
      {
        id: "m08a3",
        titulo: "Métricas e KPIs: MTTD, MTTR, SLA e cobertura",
        resumo:
          "Métrica que muda decisão versus métrica que só enfeita dashboard.",
        minutos: 17,
        tipo: "leitura",
      },
      {
        id: "m08a4",
        titulo: "Stakeholders, compliance e comunicação de crise",
        resumo:
          "Jurídico, RP, regulador e cliente: quem é avisado, quando e por quem.",
        minutos: 20,
        tipo: "video",
      },
      {
        id: "m08a5",
        titulo: "Checkpoint do módulo",
        resumo: "10 questões sobre relatórios e comunicação.",
        minutos: 15,
        tipo: "quiz",
      },
    ],
  },
  {
    id: "m09",
    numero: 9,
    titulo: "Reta final: simulados e revisão dirigida",
    dominio: "extra",
    descricao:
      "Últimas duas semanas: simulado em modo prova, análise de erro e revisão por peso de domínio.",
    aulas: [
      {
        id: "m09a1",
        titulo: "Como resolver PBQs sem perder tempo",
        resumo:
          "Estratégia de ordem, marcação para revisão e gestão dos 165 minutos.",
        minutos: 16,
        tipo: "video",
      },
      {
        id: "m09a2",
        titulo: "Simulado completo em modo prova",
        resumo: "85 questões cronometradas, com relatório por domínio ao final.",
        minutos: 165,
        tipo: "quiz",
      },
      {
        id: "m09a3",
        titulo: "Análise de erro: transformando falha em revisão",
        resumo:
          "Classificar o erro (conteúdo, leitura ou tempo) e agir sobre a causa.",
        minutos: 18,
        tipo: "leitura",
      },
      {
        id: "m09a4",
        titulo: "Checklist final e dia da prova",
        resumo: "Agendamento, ambiente do teste online e o que revisar na véspera.",
        minutos: 12,
        tipo: "leitura",
      },
    ],
  },
];

export const TOTAL_AULAS = MODULOS.reduce((n, m) => n + m.aulas.length, 0);

export const TOTAL_MINUTOS = MODULOS.reduce(
  (n, m) => n + m.aulas.reduce((s, a) => s + a.minutos, 0),
  0
);

export function getModulo(id: string): Modulo | undefined {
  return MODULOS.find((m) => m.id === id);
}

export function aulaEhGratis(aulaId: string): boolean {
  for (const m of MODULOS) {
    const a = m.aulas.find((x) => x.id === aulaId);
    if (a) return Boolean(a.gratis);
  }
  return false;
}
