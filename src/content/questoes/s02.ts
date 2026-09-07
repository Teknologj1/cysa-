import type { Questao } from "../types";

/** Checkpoint da seção 2 — fundamentos de operações de segurança. */
export const QUESTOES_S02: Questao[] = [
  {
    id: "s02q1",
    secaoId: "s02",
    dominio: "d1",
    objetivo: "1.5",
    enunciado:
      "Uma organização de médio porte mantém analistas de tier 1 e tier 2 internos, mas contrata um provedor externo para o monitoramento fora do horário comercial. Que modelo de SOC é esse?",
    alternativas: ["Interno", "Gerenciado (MSSP)", "Híbrido", "Virtual"],
    correta: 2,
    explicacao:
      "O modelo híbrido combina equipe interna com um MSSP cobrindo parte da operação — normalmente a madrugada e os fins de semana. É a escolha comum quando a organização quer controle sem bancar três turnos próprios.",
    gratis: true,
  },
  {
    id: "s02q2",
    secaoId: "s02",
    dominio: "d1",
    objetivo: "1.5",
    enunciado:
      "O SOC quer reduzir a carga de trabalho dos analistas automatizando o enriquecimento e o fechamento de alertas rotineiros de phishing. Qual plataforma atende a essa necessidade?",
    alternativas: [
      "SIEM, ampliando as regras de correlação",
      "SOAR, executando um runbook de resposta",
      "EDR, aumentando a retenção de telemetria",
      "Scanner de vulnerabilidades, agendando varreduras",
    ],
    correta: 1,
    explicacao:
      "SIEM coleta, correlaciona e detecta; SOAR automatiza e responde. Redução de carga por automação é sempre SOAR — o SIEM continua sendo a origem do alerta.",
  },
  {
    id: "s02q3",
    secaoId: "s02",
    dominio: "d1",
    enunciado:
      "Um SOC apresenta MTTD elevado. Qual medida tende a reduzir mais esse indicador?",
    alternativas: [
      "Contratar mais analistas de tier 1",
      "Melhorar a cobertura de detecção: tuning das regras de correlação e ingestão de log mais completa",
      "Aumentar o tempo de retenção do case management",
      "Trocar a ferramenta de abertura de chamados",
    ],
    correta: 1,
    explicacao:
      "MTTD mede o tempo até perceber a ameaça. Só melhora com melhor detecção: cobertura de fontes de log, regras ajustadas e menos ruído. Mais gente ajuda na fila, não na visibilidade.",
  },
  {
    id: "s02q4",
    secaoId: "s02",
    dominio: "d1",
    enunciado:
      "Qual é a diferença entre playbook e runbook no contexto de operações de segurança?",
    alternativas: [
      "Playbook é o guia legível por humano; runbook é o mesmo processo automatizado no SOAR",
      "Playbook é gerado pelo SIEM; runbook é escrito pelo analista",
      "São sinônimos usados por fabricantes diferentes",
      "Playbook trata de vulnerabilidades; runbook trata de incidentes",
    ],
    correta: 0,
    explicacao:
      "Playbook orienta a pessoa passo a passo. Runbook é esse mesmo processo executado automaticamente pelo SOAR via integrações de API. A prova usa os dois termos e cobra a distinção.",
    gratis: true,
  },
  {
    id: "s02q5",
    secaoId: "s02",
    dominio: "d1",
    objetivo: "1.5",
    enunciado:
      "Analistas de tier 1 vêm escalando praticamente todos os alertas para o tier 2, sobrecarregando o time sênior. Qual é a causa raiz mais provável?",
    alternativas: [
      "Falta de licenças do SIEM",
      "Critérios de escalonamento vagos ou não documentados",
      "Retenção de log insuficiente",
      "Ausência de um threat intelligence analyst",
    ],
    correta: 1,
    explicacao:
      "Critério de escalonamento indefinido produz um de dois extremos: escalonamento em excesso, que soterra o time sênior, ou de menos, que deixa ameaça séria sem atenção. Os gatilhos precisam ser objetivos e definidos antes.",
  },
  {
    id: "s02q6",
    secaoId: "s02",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma organização foi comprometida por uma chave de acesso IAM roubada, usada para criar usuários privilegiados e exfiltrar dados de um bucket S3. A investigação não conseguiu reconstruir as ações do atacante. Qual lacuna de monitoramento explica isso?",
    alternativas: [
      "Ausência de coleta do AWS CloudTrail",
      "Ausência de IDS na rede local",
      "Retenção curta de logs de firewall",
      "Falta de varredura credenciada nos servidores",
    ],
    correta: 0,
    explicacao:
      "CloudTrail registra toda chamada de API na AWS: quem fez, de onde e o quê. Sem ele não existe trilha da atividade no plano de gerenciamento, por mais completo que seja o monitoramento de rede.",
  },
  {
    id: "s02q7",
    secaoId: "s02",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual evento do Windows registra a criação de processo com a linha de comando completa, permitindo ver que o Word iniciou um PowerShell com comando codificado?",
    alternativas: ["4624", "4688", "4768", "5140"],
    correta: 1,
    explicacao:
      "O event ID 4688 registra criação de processo e, com a auditoria de linha de comando habilitada, mostra os argumentos. A relação pai-filho entre Word e PowerShell é o primeiro pivô analítico.",
  },
  {
    id: "s02q8",
    secaoId: "s02",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Por que um EDR com analítica comportamental detecta ataques de living off the land que o antivírus tradicional não detecta?",
    alternativas: [
      "Porque bloqueia todo uso de PowerShell por padrão",
      "Porque avalia comportamento e relação entre processos, e não apenas assinatura de arquivo malicioso",
      "Porque inspeciona tráfego cifrado na borda da rede",
      "Porque exige autenticação multifator para executar binários do sistema",
    ],
    correta: 1,
    explicacao:
      "Living off the land abusa de binários legítimos e assinados, como PowerShell, WMI e certutil. Não há assinatura de malware a detectar — o que denuncia é o comportamento e o encadeamento de processos.",
  },
  {
    id: "s02q9",
    secaoId: "s02",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma equipe quer detectar autenticação anômala, mas não documentou horários, locais e volumes típicos de acesso dos usuários. Qual é a consequência direta?",
    alternativas: [
      "As regras de detecção ficam sem baseline e passam a gerar decisões arbitrárias",
      "O SIEM deixa de ingerir logs de identidade",
      "O MFA para de funcionar para contas privilegiadas",
      "A retenção de log precisa ser reduzida",
    ],
    correta: 0,
    explicacao:
      "Sem baseline do que é normal não existe definição de anômalo. As regras passam a adivinhar, gerando falso positivo em excesso e deixando passar o desvio real.",
  },
  {
    id: "s02q10",
    secaoId: "s02",
    dominio: "d4",
    objetivo: "4.2",
    enunciado:
      "O analista da madrugada reinvestiga do zero um endpoint que o turno do dia já havia confirmado como malicioso, duplicando horas de trabalho. Qual é a causa raiz?",
    alternativas: [
      "Falta de licença do EDR para o turno da noite",
      "Handover sem documentação escrita do status dos casos ativos",
      "Regra de correlação do SIEM mal ajustada",
      "Ausência de MFA na conta comprometida",
    ],
    correta: 1,
    explicacao:
      "Continuidade entre turnos depende de handover documentado, com status de cada caso aberto e próximo passo. Handover puramente verbal cria ponto único de falha e degrada MTTD e MTTR.",
  },
  {
    id: "s02q11",
    secaoId: "s02",
    dominio: "d4",
    objetivo: "4.2",
    enunciado:
      "Durante um incidente grave, existe suspeita de que a infraestrutura corporativa de comunicação esteja comprometida. Como a equipe deve conduzir o handover?",
    alternativas: [
      "Pelo e-mail corporativo, marcando as mensagens como confidenciais",
      "Por canais out-of-band definidos previamente no plano de comunicação de incidente",
      "Somente verbalmente, sem registro, para não deixar rastros",
      "Publicando o status no canal geral da equipe para agilizar",
    ],
    correta: 1,
    explicacao:
      "O plano de comunicação de incidente deve prever canais out-of-band — mensageria com criptografia ponta a ponta ou canais dedicados — quando a infraestrutura corporativa pode estar sob controle do adversário. Isso não dispensa o registro no case management.",
  },
  {
    id: "s02q12",
    secaoId: "s02",
    dominio: "d1",
    enunciado:
      "O SOC está soterrado por alertas de baixa qualidade e os analistas mostram sinais de alert fatigue. Qual abordagem ataca o problema na origem?",
    alternativas: [
      "Aumentar o limite de alertas por analista por turno",
      "Ajustar as regras de detecção e adotar alerta baseado em risco, agregando eventos em um alerta de maior qualidade",
      "Reduzir a retenção de logs para diminuir o volume analisado",
      "Encaminhar todos os alertas diretamente ao tier 3",
    ],
    correta: 1,
    explicacao:
      "Risk-based alerting soma pontuação de risco por usuário ou host e só dispara quando o total cruza um limiar. Combinado com tuning, reduz volume mantendo cobertura — a resposta não é aumentar a cota humana.",
  },
];
