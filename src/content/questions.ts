import type { DominioId } from "./curriculum";

export type Questao = {
  id: string;
  dominio: DominioId;
  enunciado: string;
  alternativas: string[];
  /** Índice da alternativa correta em `alternativas`. */
  correta: number;
  explicacao: string;
  /** Questões de amostra, liberadas sem assinatura. */
  gratis?: boolean;
};

export const QUESTOES: Questao[] = [
  {
    id: "q01",
    dominio: "d1",
    enunciado:
      "Um analista observa que uma estação interna abre uma conexão HTTPS para o mesmo endereço externo a cada 61 segundos, com pouca variação e payload de tamanho quase constante. Qual é a hipótese mais provável?",
    alternativas: [
      "Atualização automática do sistema operacional",
      "Beaconing de um implante de comando e controle",
      "Sincronização de horário via NTP sobre TLS",
      "Varredura de portas originada da estação",
    ],
    correta: 1,
    explicacao:
      "Conexões periódicas e de tamanho regular para um mesmo destino externo são o padrão clássico de beaconing de C2. Atualizações e sincronismo de horário não mantêm intervalo tão rígido nem payload constante, e varredura geraria muitos destinos distintos, não um só.",
    gratis: true,
  },
  {
    id: "q02",
    dominio: "d1",
    enunciado:
      "Qual evidência sustenta melhor a hipótese de exfiltração por tunelamento de DNS?",
    alternativas: [
      "Grande volume de consultas TXT com subdomínios longos e codificados para um único domínio",
      "Aumento de consultas NXDOMAIN para domínios populares",
      "Consultas A para o servidor DNS interno durante o horário comercial",
      "Cache DNS local do endpoint com TTL alto",
    ],
    correta: 0,
    explicacao:
      "Tunelamento de DNS empacota dados em rótulos de subdomínio, produzindo nomes longos e codificados, geralmente em registros TXT ou NULL, concentrados em um domínio autoritativo controlado pelo atacante.",
    gratis: true,
  },
  {
    id: "q03",
    dominio: "d1",
    enunciado:
      "Na Pirâmide da Dor, qual indicador impõe o maior custo ao adversário quando é detectado e bloqueado?",
    alternativas: [
      "Hash do arquivo",
      "Endereço IP",
      "Nome de domínio",
      "TTPs (táticas, técnicas e procedimentos)",
    ],
    correta: 3,
    explicacao:
      "Hashes, IPs e domínios são trocados com custo baixo. Mudar TTPs exige que o atacante reformule como opera, o que é caro e lento — por isso detecções baseadas em comportamento têm vida útil muito maior.",
  },
  {
    id: "q04",
    dominio: "d1",
    enunciado:
      "Um processo winword.exe origina um powershell.exe com parâmetro -enc seguido de uma cadeia Base64 longa. Qual é a interpretação correta?",
    alternativas: [
      "Comportamento normal de macro corporativa assinada",
      "Provável execução de comando ofuscado a partir de documento malicioso",
      "Erro de parsing do agente de EDR",
      "Atualização do Office aplicando política de grupo",
    ],
    correta: 1,
    explicacao:
      "Processo filho de suíte de escritório iniciando PowerShell com comando codificado é um padrão consagrado de execução via macro maliciosa. A ação seguinte é decodificar o Base64 e determinar o escopo antes de conter o host.",
  },
  {
    id: "q05",
    dominio: "d1",
    enunciado:
      "Qual técnica do MITRE ATT&CK descreve melhor o abuso de binários legítimos do sistema para executar código malicioso?",
    alternativas: [
      "Living off the Land / System Binary Proxy Execution",
      "Credential Dumping",
      "Data Encrypted for Impact",
      "Network Service Discovery",
    ],
    correta: 0,
    explicacao:
      "Usar binários assinados do próprio sistema (rundll32, mshta, regsvr32) para executar carga maliciosa é o conceito de LOLBins, mapeado como execução por proxy de binário do sistema — evita a introdução de arquivos suspeitos.",
  },
  {
    id: "q06",
    dominio: "d1",
    enunciado:
      "Uma caça a ameaças orientada a hipótese deve começar por:",
    alternativas: [
      "Executar todas as regras de detecção existentes novamente",
      "Formular uma proposição testável sobre comportamento adversário no ambiente",
      "Solicitar um novo feed comercial de indicadores",
      "Isolar preventivamente os ativos mais críticos",
    ],
    correta: 1,
    explicacao:
      "Caça começa com hipótese testável — por exemplo, 'um adversário estaria usando tarefas agendadas para persistência nos servidores de arquivo' — que define quais dados coletar e qual é o critério de encerramento.",
  },
  {
    id: "q07",
    dominio: "d2",
    enunciado:
      "Por que uma varredura credenciada normalmente produz resultados mais confiáveis que uma não credenciada?",
    alternativas: [
      "Porque gera menos tráfego de rede",
      "Porque consulta versões e configurações reais no host, em vez de inferir pelo banner",
      "Porque dispensa a atualização do plugin do scanner",
      "Porque ignora sistemas fora do escopo automaticamente",
    ],
    correta: 1,
    explicacao:
      "Com credenciais, o scanner lê versões de pacote, patches e configurações diretamente no sistema, reduzindo falsos positivos e falsos negativos gerados por inferência a partir de banners e respostas de rede.",
    gratis: true,
  },
  {
    id: "q08",
    dominio: "d2",
    enunciado:
      "O vetor CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H descreve uma vulnerabilidade que:",
    alternativas: [
      "Exige acesso físico e interação do usuário",
      "É explorável remotamente, sem privilégios nem interação, com impacto alto em confidencialidade, integridade e disponibilidade",
      "Só afeta disponibilidade e requer privilégios altos",
      "Tem escopo alterado e impacto apenas em integridade",
    ],
    correta: 1,
    explicacao:
      "AV:N indica vetor de rede, AC:L complexidade baixa, PR:N nenhum privilégio, UI:N nenhuma interação e C/I/A:H impacto alto nos três pilares. É o perfil de uma falha crítica candidata a exploração em massa.",
  },
  {
    id: "q09",
    dominio: "d2",
    enunciado:
      "Duas vulnerabilidades têm CVSS base 9.8. Uma está no catálogo KEV (exploração ativa conhecida) em servidor exposto à internet; a outra está em um host isolado de laboratório. Qual é a priorização correta?",
    alternativas: [
      "Tratar as duas com a mesma urgência, pois a nota base é idêntica",
      "Priorizar a do servidor exposto listado no KEV",
      "Priorizar a do laboratório, por ser ambiente de teste",
      "Aguardar a métrica temporal antes de qualquer ação",
    ],
    correta: 1,
    explicacao:
      "A nota base ignora contexto. Exploração ativa conhecida somada a exposição à internet e criticidade do ativo eleva o risco real — exatamente o que as métricas ambientais e fontes como KEV/EPSS existem para capturar.",
  },
  {
    id: "q10",
    dominio: "d2",
    enunciado:
      "O scanner reporta uma vulnerabilidade em um serviço que, após verificação manual, não está habilitado no host. Como classificar e agir?",
    alternativas: [
      "Falso positivo; documentar a validação e ajustar o plugin ou a exceção",
      "Falso negativo; ampliar o escopo da varredura",
      "Verdadeiro positivo; abrir chamado de correção emergencial",
      "Achado informativo; ignorar sem registro",
    ],
    correta: 0,
    explicacao:
      "Achado que não se confirma na validação é falso positivo. A conduta correta não é apagar: é registrar a evidência da validação e tratar a exceção, para o mesmo ruído não voltar no próximo ciclo.",
  },
  {
    id: "q11",
    dominio: "d2",
    enunciado:
      "Um sistema legado crítico não pode receber o patch dentro do prazo do SLA. Qual é a resposta mais adequada?",
    alternativas: [
      "Aceitar o risco informalmente e seguir para o próximo achado",
      "Desligar o sistema imediatamente",
      "Aplicar controles compensatórios, registrar exceção formal com prazo e dono e reavaliar o risco residual",
      "Remover o ativo do escopo das varreduras",
    ],
    correta: 2,
    explicacao:
      "Quando a correção não é viável no prazo, mitigam-se os riscos com controles compensatórios (segmentação, WAF, monitoramento reforçado) e formaliza-se a exceção, com dono, prazo e aceite explícito do risco residual.",
  },
  {
    id: "q12",
    dominio: "d2",
    enunciado:
      "Qual análise identifica dependências de terceiros vulneráveis em uma aplicação antes do deploy?",
    alternativas: [
      "Fuzzing de protocolo",
      "Análise de composição de software (SCA) com SBOM",
      "Teste de carga",
      "Varredura de portas do host de build",
    ],
    correta: 1,
    explicacao:
      "SCA inventaria bibliotecas e versões — materializadas em um SBOM — e cruza com bases de vulnerabilidades conhecidas, cobrindo o risco de cadeia de suprimentos que SAST e DAST não endereçam bem.",
  },
  {
    id: "q13",
    dominio: "d3",
    enunciado:
      "Qual é a ordem correta das fases do ciclo de resposta a incidentes usado pelo CySA+?",
    alternativas: [
      "Detecção, preparação, contenção, erradicação, recuperação, lições aprendidas",
      "Preparação, detecção e análise, contenção, erradicação, recuperação, atividade pós-incidente",
      "Contenção, detecção, preparação, recuperação, erradicação, auditoria",
      "Preparação, contenção, detecção, recuperação, erradicação, encerramento",
    ],
    correta: 1,
    explicacao:
      "O ciclo começa antes do incidente, na preparação, e termina na atividade pós-incidente, que realimenta a preparação. Inverter contenção e detecção é o erro mais comum nesse tipo de questão.",
    gratis: true,
  },
  {
    id: "q14",
    dominio: "d3",
    enunciado:
      "Durante a coleta forense de um host comprometido e ainda ligado, qual é a ordem de volatilidade correta?",
    alternativas: [
      "Disco, memória, cache da CPU, backups em fita",
      "Cache e registradores, memória, estado de rede, disco, mídia de backup",
      "Backups, disco, memória, cache",
      "Memória, backups, disco, estado de rede",
    ],
    correta: 1,
    explicacao:
      "Coleta-se primeiro o que desaparece mais rápido: registradores e cache, depois RAM e conexões de rede, e só então disco e mídias offline, que são as evidências mais estáveis.",
  },
  {
    id: "q15",
    dominio: "d3",
    enunciado:
      "Um servidor de produção está comprometido e ainda ativo. A prioridade imediata da equipe é preservar evidência para eventual ação legal. Qual ação é a mais apropriada?",
    alternativas: [
      "Reiniciar o servidor para interromper o processo malicioso",
      "Isolar o host da rede mantendo-o ligado e adquirir a memória volátil",
      "Restaurar o backup mais recente por cima do sistema atual",
      "Executar o antivírus em modo de remoção automática",
    ],
    correta: 1,
    explicacao:
      "Reiniciar, restaurar ou remover automaticamente destrói evidência volátil. Isolamento de rede contém o incidente preservando o estado em memória para aquisição, com cadeia de custódia documentada.",
  },
  {
    id: "q16",
    dominio: "d3",
    enunciado:
      "Qual é o objetivo principal da reunião de lições aprendidas após um incidente?",
    alternativas: [
      "Determinar responsabilidade individual pelas falhas",
      "Identificar melhorias de processo, detecção e controles, com ações e responsáveis",
      "Produzir o comunicado de imprensa",
      "Definir o valor do prêmio do seguro cibernético",
    ],
    correta: 1,
    explicacao:
      "A atividade pós-incidente é sobre sistema, não sobre culpa. Ela gera ações corretivas rastreáveis — novas detecções, ajustes de runbook, mudanças de arquitetura — com dono e prazo definidos.",
  },
  {
    id: "q17",
    dominio: "d3",
    enunciado:
      "Contenção de curto prazo difere de erradicação porque:",
    alternativas: [
      "A contenção limita a propagação imediata; a erradicação remove a causa e os artefatos do atacante",
      "A contenção é executada só após a recuperação",
      "A erradicação é sempre automatizada pelo SOAR",
      "Não há diferença prática entre as duas",
    ],
    correta: 0,
    explicacao:
      "Conter é estancar o dano agora (isolar, bloquear conta, cortar rota). Erradicar é remover implantes, persistência e acessos do adversário para que o retorno à operação não recrie o comprometimento.",
  },
  {
    id: "q18",
    dominio: "d4",
    enunciado:
      "Qual métrica mede o tempo entre o início do comprometimento e a identificação do incidente pela equipe?",
    alternativas: ["MTTR", "MTTD", "RTO", "RPO"],
    correta: 1,
    explicacao:
      "MTTD (mean time to detect) mede o tempo até a detecção. MTTR é o tempo até a resposta ou reparo; RTO e RPO são objetivos de continuidade de negócio, não métricas de detecção.",
    gratis: true,
  },
  {
    id: "q19",
    dominio: "d4",
    enunciado:
      "Ao escrever o sumário executivo de um relatório de incidente para a diretoria, o analista deve priorizar:",
    alternativas: [
      "Os hashes e endereços IP observados",
      "Impacto ao negócio, escopo, estado atual e decisões necessárias",
      "A saída completa das ferramentas forenses",
      "As regras de detecção criadas durante a resposta",
    ],
    correta: 1,
    explicacao:
      "O público executivo decide sobre risco e recursos. Detalhe técnico vai para os anexos; o sumário responde o que aconteceu, o que foi afetado, onde estamos e o que precisa ser decidido.",
  },
  {
    id: "q20",
    dominio: "d4",
    enunciado:
      "Um incidente expôs dados pessoais de clientes na União Europeia. Qual consideração de comunicação é obrigatória sob o GDPR?",
    alternativas: [
      "Notificar a autoridade supervisora competente em até 72 horas do conhecimento da violação",
      "Publicar imediatamente todos os detalhes técnicos no site da empresa",
      "Aguardar o encerramento total da investigação antes de qualquer notificação",
      "Notificar apenas se houver prejuízo financeiro comprovado",
    ],
    correta: 0,
    explicacao:
      "O GDPR exige notificação à autoridade supervisora em até 72 horas a partir do conhecimento da violação, e comunicação aos titulares quando houver alto risco aos seus direitos e liberdades.",
  },
  {
    id: "q21",
    dominio: "d4",
    enunciado:
      "Qual é o melhor indicador de que o programa de gestão de vulnerabilidades está amadurecendo?",
    alternativas: [
      "Aumento do número absoluto de achados por varredura",
      "Redução do tempo médio de correção das vulnerabilidades críticas dentro do SLA",
      "Aumento da quantidade de relatórios emitidos por mês",
      "Redução do número de ativos varridos",
    ],
    correta: 1,
    explicacao:
      "Volume de achados e de relatórios mede atividade, não resultado. A redução consistente do tempo de correção do que é crítico, com cobertura estável de ativos, mostra que o processo entrega risco menor.",
  },
  {
    id: "q22",
    dominio: "d1",
    enunciado:
      "Um alerta indica múltiplas falhas de autenticação seguidas de um sucesso, a partir de um IP estrangeiro, para dezenas de contas distintas com a mesma senha. Qual técnica é essa?",
    alternativas: [
      "Password spraying",
      "Pass the hash",
      "Golden ticket",
      "Rainbow table",
    ],
    correta: 0,
    explicacao:
      "Password spraying testa poucas senhas comuns contra muitas contas para evitar bloqueio por tentativa. O sinal é a distribuição horizontal — muitas contas, poucas tentativas cada — e não muitas tentativas em uma conta.",
  },
  {
    id: "q23",
    dominio: "d2",
    enunciado:
      "Qual é o principal risco de executar varredura ativa agressiva contra sistemas de tecnologia operacional (OT/ICS)?",
    alternativas: [
      "Consumo excessivo de licenças do scanner",
      "Indisponibilidade ou comportamento errático dos dispositivos, com risco à operação física",
      "Perda de credenciais administrativas",
      "Invalidação do SBOM da aplicação",
    ],
    correta: 1,
    explicacao:
      "Dispositivos industriais frequentemente têm pilhas de rede frágeis e não toleram tráfego de varredura. Em OT prefere-se descoberta passiva e janelas acordadas com a engenharia, pelo risco de impacto físico.",
  },
  {
    id: "q24",
    dominio: "d3",
    enunciado:
      "Qual documento define, antes do incidente, quem pode declarar um incidente, quem aciona o jurídico e quem fala com a imprensa?",
    alternativas: [
      "Plano de resposta a incidentes com matriz de papéis e escalonamento",
      "Relatório de varredura de vulnerabilidades",
      "Política de senhas",
      "Contrato de nível de serviço com o provedor de nuvem",
    ],
    correta: 0,
    explicacao:
      "Papéis, autoridade de declaração, critérios de escalonamento e comunicação externa são definidos no plano de resposta a incidentes — decidir isso durante a crise é o que faz a resposta atrasar.",
  },
];

export const QUESTOES_GRATIS = QUESTOES.filter((q) => q.gratis);

export function questoesPorDominio(dominio: DominioId): Questao[] {
  return QUESTOES.filter((q) => q.dominio === dominio);
}

/** Embaralha uma cópia do array (Fisher-Yates). */
export function embaralhar<T>(itens: T[]): T[] {
  const copia = [...itens];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
