import type { Questao } from "../types";

/** Checkpoint da seção 1 — o analista, o exame e o percurso. */
export const QUESTOES_S01: Questao[] = [
  {
    id: "s01q1",
    secaoId: "s01",
    dominio: "d1",
    objetivo: "1.5",
    enunciado:
      "Um analista de tier 1 recebe um alerta indicando que a mesma conta autenticou em dois países com sete minutos de diferença. Qual é o melhor primeiro passo?",
    alternativas: [
      "Bloquear a conta e reinstalar a estação do usuário",
      "Fazer a triagem do alerta, reunir contexto e escalar para o tier 2 se confirmado",
      "Encerrar o alerta como false positive, já que VPNs causam esse efeito",
      "Iniciar aquisição forense de memória do endpoint",
    ],
    correta: 1,
    explicacao:
      "Impossible travel é sinal clássico de true positive, mas a responsabilidade do tier 1 é triagem e escalonamento: reunir contexto suficiente, classificar e passar adiante. Remediação e forense são de outros níveis.",
    gratis: true,
  },
  {
    id: "s01q2",
    secaoId: "s01",
    dominio: "d1",
    objetivo: "1.5",
    enunciado:
      "Um analista roda queries sobre dados históricos do SIEM procurando técnicas de living off the land descritas em um relatório de threat intelligence, sem que nenhum alerta tenha disparado. Em que tier esse trabalho se encaixa?",
    alternativas: ["Tier 1", "Tier 2", "Tier 3", "SOC manager"],
    correta: 2,
    explicacao:
      "Caça proativa, orientada a inteligência e sem alerta prévio, é trabalho de tier 3. Tier 1 faz triagem; tier 2 investiga casos já confirmados; o SOC manager cuida da operação e das métricas.",
  },
  {
    id: "s01q3",
    secaoId: "s01",
    dominio: "d1",
    enunciado:
      "Qual domínio do CS0-004 tem o maior peso na prova?",
    alternativas: [
      "1.0 Security Operations, com 34%",
      "2.0 Vulnerability Management, com 26%",
      "3.0 Incident Response and Management, com 24%",
      "4.0 Reporting and Communication, com 16%",
    ],
    correta: 0,
    explicacao:
      "Os pesos do CS0-004 são 34% / 26% / 24% / 16%. Conhecer essa distribuição é o que permite distribuir o tempo de estudo de forma proporcional ao retorno na prova.",
    gratis: true,
  },
  {
    id: "s01q4",
    secaoId: "s01",
    dominio: "d3",
    enunciado:
      "Uma PBQ apresenta um incidente ativo e pergunta qual é a próxima ação. Qual sequência de fases o candidato deve seguir?",
    alternativas: [
      "Detecção, preparação, erradicação, contenção, recuperação",
      "Preparação, detecção e análise, contenção, erradicação, recuperação, atividade pós-incidente",
      "Contenção, preparação, detecção, recuperação, auditoria",
      "Preparação, contenção, erradicação, detecção, recuperação",
    ],
    correta: 1,
    explicacao:
      "A prova cobra sequência, não apenas reconhecimento. A armadilha comum é pular para remediação antes da contenção — a ordem correta começa na preparação e termina na atividade pós-incidente.",
  },
  {
    id: "s01q5",
    secaoId: "s01",
    dominio: "d2",
    enunciado:
      "Duas vulnerabilidades aparecem no mesmo relatório: uma com CVSS 9.8 em um host isolado de laboratório e outra com CVSS 6.5 em um servidor de produção exposto à internet. O que a prova espera como raciocínio de priorização?",
    alternativas: [
      "Sempre tratar primeiro a de maior nota base",
      "Considerar o contexto: exposição e criticidade podem tornar a 6.5 mais urgente",
      "Tratar as duas com a mesma prioridade, por estarem no mesmo relatório",
      "Adiar as duas até a próxima janela de manutenção",
    ],
    correta: 1,
    explicacao:
      "Priorização é contexto, não só nota. Exposição à internet, criticidade do ativo e evidência de exploração ativa podem colocar um achado de severidade média à frente de um crítico isolado.",
  },
];
