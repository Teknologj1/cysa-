import type { Questao } from "../types";

/** Checkpoint da seção 6 — infraestrutura crítica: OT, ICS e SCADA. */
export const QUESTOES_S06: Questao[] = [
  {
    id: "s06q1",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Em ambientes de tecnologia operacional, como fica a ordem de prioridade da tríade clássica de segurança?",
    alternativas: [
      "Permanece confidencialidade, integridade e disponibilidade",
      "Inverte para disponibilidade, integridade e confidencialidade",
      "Passa a considerar apenas integridade e não repúdio",
      "Depende do setor de infraestrutura crítica envolvido",
    ],
    correta: 1,
    explicacao:
      "Em OT a ordem vira AIC. Disponibilidade vem primeiro porque parada de processo tem consequência física: uma planta química interrompida no meio do processo pode gerar reação perigosa, e uma rede elétrica fora do ar no inverno pode custar vidas.",
    gratis: true,
  },
  {
    id: "s06q2",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma concessionária de energia quer receber inteligência de ameaças específica do seu setor. Qual organização atende a essa necessidade?",
    alternativas: ["FS-ISAC", "E-ISAC", "H-ISAC", "NIST CSF"],
    correta: 1,
    explicacao:
      "Os ISACs são centros de compartilhamento por setor: E-ISAC cobre energia elétrica, H-ISAC cobre saúde e FS-ISAC cobre serviços financeiros. A inteligência deles é muito mais direcionada ao ambiente do que um feed comercial genérico.",
  },
  {
    id: "s06q3",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual afirmação sobre a propriedade da infraestrutura crítica é correta e tem impacto direto no trabalho do analista?",
    alternativas: [
      "É majoritariamente estatal, então a defesa cabe a agências de governo",
      "É majoritariamente privada, então analistas de SOC do setor privado estão na linha de frente",
      "É dividida igualmente e a responsabilidade é sempre compartilhada por contrato",
      "É irrelevante para o analista, pois a CISA assume a resposta a incidentes",
    ],
    correta: 1,
    explicacao:
      "A maior parte da infraestrutura crítica é de propriedade e operação privada. Quem trabalha em energia, utilities, saúde, transporte ou serviços financeiros defende infraestrutura crítica na prática, mesmo sem vínculo com governo.",
  },
  {
    id: "s06q4",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual é a diferença essencial entre sistemas de TI e sistemas de OT?",
    alternativas: [
      "TI usa criptografia e OT não",
      "TI processa dados; OT monitora e controla processos físicos no mundo real",
      "TI é local e OT é sempre em nuvem",
      "TI exige conformidade regulatória e OT não",
    ],
    correta: 1,
    explicacao:
      "É a distinção que dirige toda decisão de segurança nesses ambientes. O SIEM processa dado; o sistema que regula pressão num duto aciona uma válvula física. São trabalhos diferentes, com consequências de falha diferentes.",
  },
  {
    id: "s06q5",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual modelo descreve a arquitetura em camadas de ambientes de tecnologia operacional?",
    alternativas: [
      "Modelo OSI",
      "Modelo Purdue",
      "Diamond Model",
      "Modelo TCP/IP",
    ],
    correta: 1,
    explicacao:
      "O modelo Purdue (Purdue Enterprise Reference Architecture) organiza as camadas de OT, do processo físico e dispositivos de campo até PLCs, HMIs, servidores de controle, historiadores e a rede corporativa. Continua sendo referenciado na prova e na documentação de fornecedores.",
  },
  {
    id: "s06q6",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Durante a investigação de um incidente em OT, o analista descobre que os PLCs envolvidos praticamente não geram logs. Qual é a consequência prática?",
    alternativas: [
      "A investigação é inviável e deve ser encerrada",
      "A análise passa a depender de monitoramento de rede e de plataformas de nível mais alto, como o historiador",
      "Os PLCs devem ser reiniciados para regenerar os logs",
      "Deve-se instalar um agente de EDR diretamente nos PLCs",
    ],
    correta: 1,
    explicacao:
      "PLCs têm capacidade de log muito limitada comparada a sistemas de TI e não suportam agentes. Por isso o conjunto de investigação em OT é montado com monitoramento passivo de rede, dados do historiador e syslog dos servidores de controle e HMIs.",
  },
  {
    id: "s06q7",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual componente de um ambiente industrial é a fonte forense mais rica para reconstruir o comportamento do processo ao longo do tempo?",
    alternativas: [
      "O PLC",
      "O data historian",
      "O atuador",
      "O switch de camada 2 da rede de OT",
    ],
    correta: 1,
    explicacao:
      "O historiador é o banco de séries temporais do OT: guarda cada leitura de sensor, cada valor de processo e cada ação de operador. Correlacioná-lo com logs de rede permite montar a linha do tempo e identificar se o processo foi manipulado.",
  },
  {
    id: "s06q8",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Por que a premissa histórica de air gap deixou de proteger a maioria dos ambientes de OT?",
    alternativas: [
      "Porque os protocolos industriais passaram a usar criptografia",
      "Porque os ambientes foram conectados às redes corporativas por razões de negócio, como monitoramento remoto e analytics",
      "Porque os PLCs passaram a rodar sistemas operacionais de propósito geral",
      "Porque a CISA passou a exigir conectividade para reportar incidentes",
    ],
    correta: 1,
    explicacao:
      "A convergência TI/OT foi motivada por necessidades legítimas de negócio: monitoramento remoto, manutenção preditiva, integração com cadeia de suprimentos e analytics em nuvem. O efeito colateral é que um ambiente projetado assumindo isolamento herdou todo o cenário de ameaças da TI.",
  },
  {
    id: "s06q9",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma refinaria automatiza os processos dentro da própria planta. Uma empresa de dutos monitora estações de bombeamento espalhadas por vários estados. Qual par de tecnologias corresponde a esses casos?",
    alternativas: [
      "SCADA na refinaria e DCS nos dutos",
      "DCS na refinaria e SCADA nos dutos",
      "DCS em ambos, com RTUs nos dutos",
      "SCADA em ambos, mudando apenas o protocolo",
    ],
    correta: 1,
    explicacao:
      "DCS gerencia automação de processo dentro de um único site, com controle distribuído entre PLCs locais. SCADA gerencia operações em múltiplos sites geograficamente distribuídos, por rede de longa distância. A prova testa essa distinção diretamente.",
  },
  {
    id: "s06q10",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual característica do protocolo Modbus representa o maior risco de segurança em uma rede de ICS?",
    alternativas: [
      "Consome largura de banda excessiva",
      "Não possui autenticação nem criptografia: quem tem acesso à rede pode enviar comandos",
      "Só funciona sobre enlaces seriais",
      "Exige certificados digitais em cada PLC",
    ],
    correta: 1,
    explicacao:
      "Modbus é um dos protocolos industriais mais antigos e difundidos, projetado para confiabilidade e temporização determinística, não para segurança. Sem autenticação nem criptografia, qualquer um com acesso à rede consegue emitir comandos válidos.",
  },
  {
    id: "s06q11",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual protocolo de ambiente industrial já traz autenticação e criptografia embutidas, sendo sinal de arquitetura mais moderna?",
    alternativas: ["Modbus", "OPC-UA", "DNP3", "ICCP"],
    correta: 1,
    explicacao:
      "OPC-UA inclui recursos de segurança nativos e vem sendo adotado em implantações novas. Modbus não tem segurança nativa, DNP3 tem recursos limitados de autenticação, e ICCP é usado para troca de dados entre centros de controle de utilities.",
  },
  {
    id: "s06q12",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Por que varredura ativa de vulnerabilidades é tipicamente proibida em redes de ICS?",
    alternativas: [
      "Porque gera relatórios que violam requisitos regulatórios",
      "Porque pacotes inesperados podem travar ou perturbar PLCs e dispositivos de campo",
      "Porque os scanners não conseguem autenticar em protocolos industriais",
      "Porque a varredura consome licenças do fornecedor do ICS",
    ],
    correta: 1,
    explicacao:
      "Dispositivos de campo são sensíveis a tráfego inesperado — em alguns casos até um ping pode perturbar a operação. Por isso o padrão em OT é monitoramento passivo, com ferramentas como Dragos, Nozomi Guardian e Claroty, que analisam o tráfego sem sondar.",
  },
  {
    id: "s06q13",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Em uma arquitetura SCADA, qual é o papel da RTU?",
    alternativas: [
      "É o servidor central que consolida os dados e envia comandos supervisórios",
      "É o dispositivo de campo em site remoto, que se comunica com o servidor por enlace de longa distância",
      "É a interface gráfica usada pelo operador na sala de controle",
      "É o banco de dados que armazena a série histórica do processo",
    ],
    correta: 1,
    explicacao:
      "A RTU é semelhante a um PLC, mas projetada para ambientes remotos e distribuídos, com pouca manutenção local. O servidor central é a MTU, a interface do operador é o HMI e a série histórica fica no historiador.",
  },
  {
    id: "s06q14",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual mudança na comunicação SCADA ampliou de forma mais significativa a superfície de ataque desses ambientes?",
    alternativas: [
      "A adoção de diagramas mímicos nos HMIs",
      "A migração de enlaces seriais e de rádio dedicados para comunicação sobre IP e redes celulares",
      "O aumento do número de sensores por site",
      "A padronização do protocolo Modbus",
    ],
    correta: 1,
    explicacao:
      "Com enlaces dedicados, atacar uma estação remota exigia acesso físico. Com comunicação sobre IP, o atacante ataca o canal. Por isso, ao revisar arquitetura SCADA, a ausência de VPN, criptografia e autenticação por certificado nos enlaces WAN é um achado.",
  },
  {
    id: "s06q15",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Estações de HMI em ambientes SCADA frequentemente rodam sistemas operacionais obsoletos. Qual é a leitura correta desse fato?",
    alternativas: [
      "É negligência da equipe de operação e deve ser tratada como violação de política",
      "É uma restrição operacional real, ligada à compatibilidade do software SCADA, que exige controles compensatórios",
      "É irrelevante, pois HMIs não são alcançáveis a partir da rede",
      "É aceitável desde que o antivírus esteja atualizado",
    ],
    correta: 1,
    explicacao:
      "Fornecedores de software SCADA às vezes não suportam versões novas do sistema operacional, e atualizar pode quebrar a aplicação de controle. A exposição é real, mas a resposta é compensar — não culpar a operação nem ignorar o risco.",
  },
  {
    id: "s06q16",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "O Stuxnet manipulou a velocidade de centrífugas enquanto devolvia leituras normais ao HMI. Como se chama essa técnica e o que ela ensina?",
    alternativas: [
      "Negação de serviço; ensina a priorizar redundância",
      "Spoofing de valor de processo; ensina que dado de processo aparentemente normal pode estar falsificado",
      "Ataque de força bruta; ensina a exigir senhas fortes nos HMIs",
      "Envenenamento de cache; ensina a segmentar o DNS da rede de OT",
    ],
    correta: 1,
    explicacao:
      "É o conceito central de ameaça em SCADA: o atacante manipula o processo físico enquanto esconde a manipulação dos operadores. No MITRE ATT&CK for ICS isso cai sob Impair Process Control e Inhibit Response Function.",
  },
  {
    id: "s06q17",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.2",
    enunciado:
      "Os operadores relatam que um equipamento está se comportando de forma inesperada, mas todas as leituras exibidas no HMI estão dentro da faixa normal. Qual é a conclusão analítica mais apropriada?",
    alternativas: [
      "O equipamento apresenta falha mecânica e o caso não é de segurança",
      "Os valores de processo podem ter sido falsificados por um atacante",
      "O HMI precisa ser recalibrado pela equipe de manutenção",
      "Os operadores interpretaram mal os diagramas mímicos",
    ],
    correta: 1,
    explicacao:
      "A divergência entre comportamento físico observado e leitura exibida é a assinatura do ataque de spoofing de valor de processo. Falha mecânica é hipótese concorrente legítima, mas a leitura normal com comportamento anormal é exatamente o padrão que o Stuxnet estabeleceu.",
  },
  {
    id: "s06q18",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.2",
    enunciado:
      "Qual é o vetor de acesso inicial mais comum em ataques a ambientes de OT?",
    alternativas: [
      "Acesso físico às estações remotas de campo",
      "Comprometimento da rede de TI seguido de pivô pela fronteira TI/OT",
      "Exploração direta de vulnerabilidades em PLCs pela internet",
      "Engenharia social contra fornecedores de firmware",
    ],
    correta: 1,
    explicacao:
      "Por causa da convergência, o atacante viola primeiro o ambiente de TI, move-se lateralmente e atravessa uma fronteira TI/OT mal protegida. Por isso qualquer sistema de TI comunicando diretamente com PLC ou servidor SCADA fora de caminho aprovado é alerta de prioridade alta.",
  },
  {
    id: "s06q19",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.2",
    enunciado:
      "O monitoramento passivo registra um comando de escrita Modbus, tecnicamente válido e autenticado, para um registrador de PLC que historicamente só recebe leituras. Como classificar isso?",
    alternativas: [
      "Tráfego normal, já que o comando é válido e autenticado",
      "Anomalia comportamental que merece investigação, típica de living off the land em OT",
      "Falso positivo do sensor passivo, que não interpreta Modbus",
      "Erro de configuração do historiador",
    ],
    correta: 1,
    explicacao:
      "Atacantes sofisticados em OT preferem usar comandos legítimos dos próprios protocolos industriais, o que faz o tráfego parecer operação normal. A detecção precisa ser comportamental: escrita inesperada em registrador que nunca recebe escrita é desvio de baseline, mesmo sendo válida.",
  },
  {
    id: "s06q20",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.2",
    enunciado:
      "O SOC confirma atividade maliciosa em um servidor de controle na rede de OT. Qual é a resposta adequada?",
    alternativas: [
      "Isolar o servidor imediatamente pelo console de EDR, como se faria em TI",
      "Notificar a operação e agir dentro da gestão de mudança, aplicando controles compensatórios durante a investigação",
      "Desligar o servidor para preservar evidência antes de qualquer análise",
      "Bloquear todo o tráfego da sub-rede de OT no firewall de perímetro",
    ],
    correta: 1,
    explicacao:
      "Em OT, isolar ou derrubar por conta própria pode causar parada descontrolada de processo, mais perigosa que o próprio ataque. A abordagem é passiva, de observar e alertar, com coordenação estreita com engenheiros de operação.",
  },
  {
    id: "s06q21",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Durante a revisão de arquitetura, o analista encontra sistemas da rede corporativa se comunicando diretamente com PLCs, sem passar por zona intermediária. Como classificar esse achado?",
    alternativas: [
      "Aceitável, desde que o tráfego seja criptografado",
      "Achado crítico: sem a IDMZ, qualquer comprometimento na TI tem caminho direto para a rede de controle",
      "Achado de baixa severidade, pois PLCs não executam código arbitrário",
      "Fora de escopo, por ser assunto da equipe de automação",
    ],
    correta: 1,
    explicacao:
      "A DMZ industrial é o controle arquitetural fundamental em OT: toda comunicação entre TI e OT precisa atravessá-la, e nada vai direto da rede corporativa a um PLC. Comunicação direta elimina a principal barreira de contenção do ambiente.",
  },
  {
    id: "s06q22",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual dispositivo permite que dados operacionais fluam de OT para TI, para relatórios, sem criar um caminho de comando de volta para a rede de OT?",
    alternativas: [
      "Firewall de próxima geração",
      "Data diode",
      "Jump server",
      "Switch com espelhamento de porta",
    ],
    correta: 1,
    explicacao:
      "O data diode é um dispositivo de hardware que permite fluxo em uma única direção. É um controle compensatório poderoso quando o negócio precisa consumir dado operacional sem que exista rota de comando da TI para o processo físico.",
  },
  {
    id: "s06q23",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um HMI crítico roda um sistema operacional em fim de vida, sem patch disponível, e não pode ser substituído no curto prazo. Qual é o melhor controle compensatório?",
    alternativas: [
      "Aplicar os patches imediatamente na próxima janela",
      "Application whitelisting, restringindo a estação a executar apenas aplicações aprovadas",
      "Instalar um scanner de vulnerabilidades com varredura diária no host",
      "Habilitar atualizações automáticas do sistema operacional",
    ],
    correta: 1,
    explicacao:
      "Whitelisting é dos controles compensatórios mais eficazes nesse cenário: mesmo com o sistema sem patch, um exploit que tente executar binário não autorizado é bloqueado. Combina com isolamento de rede e firewall de host. 'Aplicar patch imediatamente' ignora a restrição operacional.",
  },
  {
    id: "s06q24",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual é a abordagem correta para acesso remoto de fornecedores a sistemas de OT?",
    alternativas: [
      "Acesso direto da internet ao HMI, com senha forte e troca periódica",
      "Jump server na IDMZ, com MFA, log de sessão e acesso temporário revogado ao fim da manutenção",
      "VPN corporativa padrão, com as mesmas permissões dos usuários internos",
      "Software de acesso remoto instalado no HMI, para agilizar o suporte",
    ],
    correta: 1,
    explicacao:
      "É o princípio de acesso just-in-time aplicado a fornecedores. Acesso remoto direto da internet a sistema de OT nunca é a resposta certa — foi por software de acesso remoto num HMI que o atacante entrou na estação de tratamento de Oldsmar.",
  },
  {
    id: "s06q25",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.2",
    enunciado:
      "Um alerta indica que o sistema instrumentado de segurança (SIS) de uma planta pode ter sido contornado. Como tratar?",
    alternativas: [
      "Como incidente de severidade média, a ser tratado na fila normal de triagem",
      "Como severidade extremamente alta, com escalonamento imediato e coordenação com operação e engenharia de segurança operacional",
      "Como falso positivo, já que o SIS opera em rede separada",
      "Como incidente a ser resolvido isolando o SIS da rede",
    ],
    correta: 1,
    explicacao:
      "O SIS existe para desligar o processo com segurança quando ele sai dos parâmetros seguros. Inibir essa resposta é a tática Inhibit Response Function e pode causar exatamente o dano físico que o sistema deveria prevenir — não é só incidente de informação, é potencial incidente de segurança física.",
  },
  {
    id: "s06q26",
    secaoId: "s06",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual norma é a referência do NIST especificamente para segurança de tecnologia operacional?",
    alternativas: [
      "NIST SP 800-53",
      "NIST SP 800-82",
      "NIST SP 800-207",
      "NIST SP 800-61",
    ],
    correta: 1,
    explicacao:
      "A SP 800-82 é o guia de segurança de OT, cobrindo gestão de risco, arquitetura de rede, controle de acesso e resposta a incidentes nesses ambientes. A norma internacional equivalente para automação industrial é a IEC 62443. A SP 800-207 trata de zero trust.",
  },
];
