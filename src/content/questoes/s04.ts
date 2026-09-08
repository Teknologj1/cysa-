import type { Questao } from "../types";

/** Checkpoint da seção 4 — conceitos de infraestrutura de sistemas. */
export const QUESTOES_S04: Questao[] = [
  {
    id: "s04q1",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma organização migra parte das cargas para a AWS. Sob o modelo de responsabilidade compartilhada, qual item permanece responsabilidade do cliente?",
    alternativas: [
      "A segurança física dos data centers da região",
      "A configuração de permissões IAM das cargas implantadas",
      "O patching do hypervisor que executa as instâncias",
      "A manutenção da infraestrutura de rede entre zonas de disponibilidade",
    ],
    correta: 1,
    explicacao:
      "O provedor protege a infraestrutura física e a plataforma subjacente — data center, hypervisor, rede entre zonas. O cliente responde pelo que constrói em cima: cargas de trabalho, dados, configuração de identidade e acesso e monitoramento.",
    gratis: true,
  },
  {
    id: "s04q2",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um analista precisa determinar quais ações de API foram executadas numa conta AWS, por qual identidade e a partir de qual endereço IP. Qual fonte responde a isso?",
    alternativas: ["VPC Flow Logs", "AWS CloudTrail", "AWS GuardDuty", "Amazon CloudFront logs"],
    correta: 1,
    explicacao:
      "O CloudTrail é o log de auditoria de chamadas de API da AWS: registra quem chamou o quê, de onde e quando. VPC Flow Logs mostram tráfego de rede, não ações de API; o GuardDuty gera achados de ameaça, não o registro bruto de auditoria.",
  },
  {
    id: "s04q3",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "No contexto de software defined networking, qual plano é responsável pelo encaminhamento efetivo dos pacotes?",
    alternativas: ["Control plane", "Data plane", "Management plane", "Application plane"],
    correta: 1,
    explicacao:
      "O data plane encaminha o tráfego. O control plane toma as decisões de roteamento e política, e o management plane é a interface administrativa. A separação entre control e data plane é o que caracteriza SDN.",
  },
  {
    id: "s04q4",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma função AWS Lambda que processa uploads recebeu uma role de execução com acesso amplo a buckets S3 e tabelas DynamoDB. Qual é o risco principal dessa configuração?",
    alternativas: [
      "A função ficará mais lenta por avaliar mais políticas a cada invocação",
      "Se a função for comprometida, o atacante herda todas as permissões da role",
      "A função não conseguirá escrever logs no CloudWatch",
      "O provedor passa a ser responsável pela segurança dos dados acessados",
    ],
    correta: 1,
    explicacao:
      "Permissão excessiva em role de execução é um dos vetores centrais em serverless: o código comprometido executa com todo o privilégio concedido à role. A remediação é aplicar o princípio do menor privilégio, restringindo a role aos recursos estritamente necessários.",
  },
  {
    id: "s04q5",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Após um incidente, a equipe descobre que dezenas de recursos de nuvem subiram com o mesmo security group permissivo. Qual causa raiz é mais provável?",
    alternativas: [
      "Falha de sincronização de relógio entre as regiões",
      "Um erro de configuração em um template de infraestrutura como código reutilizado",
      "Ausência de multifator na conta raiz",
      "Rotação automática de chaves de acesso desabilitada",
    ],
    correta: 1,
    explicacao:
      "Uma configuração incorreta gravada num template de IaC é replicada em todo deploy que usa aquele template — uma linha ruim gera dezenas de recursos mal configurados. Varreduras com Checkov, Bridgecrew ou Prisma Cloud pegam esse erro antes do provisionamento.",
  },
  {
    id: "s04q6",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual das opções descreve corretamente um hypervisor de tipo 1?",
    alternativas: [
      "Executa como aplicação sobre um sistema operacional hospedeiro",
      "Executa diretamente sobre o hardware físico, sem sistema operacional hospedeiro",
      "Executa dentro de um container gerenciado pelo Kubernetes",
      "Executa apenas em estações de trabalho de laboratório",
    ],
    correta: 1,
    explicacao:
      "Tipo 1 é bare metal: roda direto no hardware (VMware ESXi, Hyper-V, XenServer) e é o que se usa em data center e em provedor de nuvem. Tipo 2 roda sobre um sistema operacional hospedeiro (VMware Workstation, VirtualBox) e é típico de laboratório.",
  },
  {
    id: "s04q7",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual ataque específico de ambientes virtualizados rompe o isolamento da máquina virtual e alcança o hypervisor ou outras VMs do mesmo host?",
    alternativas: ["VM sprawl", "VM escape", "Snapshot rollback", "Overcommit de memória"],
    correta: 1,
    explicacao:
      "VM escape é o ataque de maior severidade nesse contexto porque anula a contenção que a virtualização deveria garantir: uma VM comprometida passa a alcançar o hypervisor e, por ele, as demais VMs do host. Por isso o patching do hypervisor é crítico.",
  },
  {
    id: "s04q8",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma varredura encontra várias máquinas virtuais ativas sem atualização há mais de um ano, sem agente de segurança e com credenciais padrão, criadas para projetos já encerrados. Qual problema isso caracteriza?",
    alternativas: ["VM escape", "VM sprawl", "Abuso de snapshot", "Tráfego east-west não monitorado"],
    correta: 1,
    explicacao:
      "VM sprawl é a proliferação de máquinas virtuais criadas e depois esquecidas. Elas se tornam alvo fácil por estarem na rede, serem confiadas por outros sistemas e não serem monitoradas. A prática correta é cruzar o inventário de ativos com a lista de VMs ativas periodicamente.",
  },
  {
    id: "s04q9",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Durante uma investigação, o analista observa que um atacante comprometeu três máquinas virtuais no mesmo host físico, mas o firewall de perímetro não registrou nenhum tráfego entre elas. Qual explicação é a correta?",
    alternativas: [
      "O firewall estava com as regras de log desativadas",
      "O tráfego east-west entre VMs trafega pelo switch virtual e não cruza o perímetro",
      "As máquinas virtuais usavam criptografia ponta a ponta que o firewall não inspeciona",
      "O atacante usou tunelamento DNS para contornar o firewall",
    ],
    correta: 1,
    explicacao:
      "Movimento lateral entre VMs do mesmo host acontece no switch virtual gerenciado pelo hypervisor e nunca chega ao firewall de perímetro. Fechar essa lacuna exige visibilidade na camada de rede virtual, por microssegmentação com plataformas como VMware NSX.",
  },
  {
    id: "s04q10",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual é a diferença fundamental entre um container e uma máquina virtual?",
    alternativas: [
      "O container virtualiza a pilha de hardware; a VM virtualiza o sistema operacional",
      "O container compartilha o kernel do host; a VM executa seu próprio sistema operacional completo",
      "O container só executa em nuvem pública; a VM só executa on-premise",
      "O container inclui um hypervisor próprio; a VM depende do hypervisor do host",
    ],
    correta: 1,
    explicacao:
      "Containers virtualizam no nível do sistema operacional e compartilham o kernel do host, rodando como processos isolados — daí serem mais leves e rápidos. VMs virtualizam a pilha de hardware e cada uma carrega um sistema operacional inteiro. O kernel compartilhado é a origem dos riscos específicos de container.",
  },
  {
    id: "s04q11",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma equipe puxa imagens base diretamente de um registry público, sem varredura, e as usa em produção. Qual risco isso introduz de forma mais direta?",
    alternativas: [
      "Consumo excessivo de largura de banda no cluster",
      "Risco de cadeia de suprimentos: vulnerabilidade ou código malicioso herdado por todo container que rode a imagem",
      "Impossibilidade de aplicar limites de CPU e memória",
      "Perda da capacidade de escalonar horizontalmente",
    ],
    correta: 1,
    explicacao:
      "Imagens são construídas em camadas, e um problema em qualquer camada é herdado por todo container que executa aquela imagem. É o poisoned image attack. Ferramentas como Trivy, Snyk e Prisma Cloud varrem a imagem antes do deploy.",
  },
  {
    id: "s04q12",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um alerta indica que um container que executa uma aplicação web abriu um shell interativo. Qual ferramenta gera esse tipo de alerta e como o analista deve tratá-lo?",
    alternativas: [
      "Kubernetes Audit Log; é atividade administrativa esperada",
      "Falco; container em produção não precisa de shell, então trate como potencial incidente",
      "Trivy; é resultado de varredura de vulnerabilidade da imagem",
      "VPC Flow Logs; indica conexão de rede não autorizada",
    ],
    correta: 1,
    explicacao:
      "O Falco monitora as system calls em tempo de execução e alerta quando o container faz algo fora do baseline, como abrir shell, ler arquivo sensível ou abrir conexão de saída inesperada. O Kubernetes Audit Log responde a outra pergunta: quem pediu o quê à API server.",
  },
  {
    id: "s04q13",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual configuração representa a maior falha de menor privilégio em um ambiente Docker de produção?",
    alternativas: [
      "Containers com sistema de arquivos somente leitura",
      "Containers executando como root por padrão",
      "Containers com capabilities do Linux removidas",
      "Containers com limite de memória definido",
    ],
    correta: 1,
    explicacao:
      "Por padrão o Docker executa containers como root. Se o container for comprometido e o atacante explorar uma falha de escape, ele emerge no host como root. As outras três opções são justamente medidas de endurecimento corretas.",
  },
  {
    id: "s04q14",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um endpoint de API responde a /api/users/12345/profile. Ao trocar o identificador para 12346, um usuário autenticado recebe o perfil de outra pessoa. Qual falha do OWASP API Security Top 10 é essa?",
    alternativas: [
      "Ausência de rate limiting",
      "Broken object level authorization",
      "Exposição excessiva de dados",
      "Configuração incorreta de segurança",
    ],
    correta: 1,
    explicacao:
      "Broken object level authorization ocorre quando o endpoint não verifica se aquele usuário está autorizado àquele objeto específico. É a vulnerabilidade de API mais comum e responde por vazamentos de grande escala.",
  },
  {
    id: "s04q15",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Nos logs do API gateway, um único endereço IP faz milhares de requisições POST ao endpoint de login em poucos minutos, com pares distintos de usuário e senha e alta taxa de respostas 401. Qual atividade isso indica?",
    alternativas: [
      "Enumeração de objetos",
      "Credential stuffing favorecido pela ausência de rate limiting",
      "Broken object level authorization",
      "Exfiltração de dados por resposta de API",
    ],
    correta: 1,
    explicacao:
      "Volume alto de tentativas de autenticação com credenciais variadas a partir de uma origem é o padrão de credential stuffing, viabilizado quando a API não limita a taxa de requisições. Enumeração se caracteriza por identificadores de objeto em sequência, não por pares de credencial.",
  },
  {
    id: "s04q16",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um log de acesso mostra o mesmo IP requisitando /api/users/1001/profile, depois 1002, 1003, 1004 e 1005, todas com resposta 200. Qual conclusão a evidência sustenta?",
    alternativas: [
      "Há enumeração de identificadores; ainda não é possível afirmar que houve acesso não autorizado",
      "Está comprovada uma exploração de broken object level authorization",
      "É atividade normal de cache da aplicação cliente",
      "É um ataque de negação de serviço em andamento",
    ],
    correta: 0,
    explicacao:
      "O padrão de identificadores incrementando a partir da mesma origem sustenta enumeração. Para afirmar broken object level authorization seria preciso evidência adicional de que o requisitante não estava autorizado àqueles perfis e mesmo assim recebeu o dado. Enumeração mostra que alguém está olhando; não prova que conseguiu o que não devia.",
  },
  {
    id: "s04q17",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "A chave de API usada pelo aplicativo móvel da empresa começa a ser utilizada a partir de um IP de data center em outro país, com user agent diferente do app. Qual é a interpretação mais provável?",
    alternativas: [
      "O provedor de nuvem migrou o serviço para outra região",
      "A chave foi extraída do aplicativo e está sendo abusada por terceiro",
      "O rate limiting do gateway está mal configurado",
      "O token OAuth expirou e o cliente refez a autenticação",
    ],
    correta: 1,
    explicacao:
      "Chaves de API são fáceis de vazar — aparecem em repositórios, em binários de app móvel e em ferramentas de desenvolvedor. Uso a partir de IP, geografia ou user agent inesperados é o indicador clássico de chave extraída e em abuso.",
  },
  {
    id: "s04q18",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma organização adota BYOD e precisa proteger e-mail e documentos corporativos sem assumir o controle do aparelho pessoal do funcionário. Qual abordagem atende ao requisito?",
    alternativas: [
      "MDM, aplicando política e apagamento remoto ao dispositivo inteiro",
      "MAM, gerenciando apenas as aplicações e os dados corporativos",
      "EDR, instalando agente de detecção no aparelho pessoal",
      "UEM, inscrevendo o aparelho como ativo corporativo",
    ],
    correta: 1,
    explicacao:
      "MAM gerencia somente as aplicações e os dados corporativos, deixando o restante do dispositivo pessoal sob controle do funcionário. MDM gerencia o dispositivo inteiro, o que costuma ser inaceitável em cenário de BYOD.",
  },
  {
    id: "s04q19",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um usuário acessou um recurso corporativo a partir de um notebook pessoal não inscrito no gerenciamento. O analista não encontra telemetria de processos nem de conexões daquele acesso. Por quê?",
    alternativas: [
      "O EDR só coleta telemetria de dispositivos gerenciados e inscritos",
      "O EDR retém telemetria por apenas 24 horas",
      "O acesso foi criptografado, o que impede a coleta do EDR",
      "O EDR não coleta telemetria de dispositivos fora do horário comercial",
    ],
    correta: 0,
    explicacao:
      "O EDR depende de agente instalado no endpoint gerenciado. Dispositivo não gerenciado não roda agente e, portanto, não gera telemetria — é exatamente o ponto cego de monitoramento que a gestão de dispositivos existe para reduzir.",
  },
  {
    id: "s04q20",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Os logs de identidade mostram uma autenticação bem-sucedida a partir de um dispositivo marcado como não conforme, num ambiente que aplica acesso condicional. Qual é a leitura correta desse evento?",
    alternativas: [
      "É comportamento esperado, já que a autenticação usou multifator",
      "Merece investigação: ou a política de acesso condicional está mal configurada, ou houve contorno do controle",
      "Indica apenas que o dispositivo está com o agente de conformidade desatualizado",
      "Confirma que o dispositivo passou pela verificação de postura",
    ],
    correta: 1,
    explicacao:
      "O acesso condicional deveria ter bloqueado o acesso de um dispositivo não conforme. Sucesso nessas condições aponta política mal configurada ou contorno do controle — em qualquer dos casos, é evento a ser sinalizado e investigado.",
  },
  {
    id: "s04q21",
    secaoId: "s04",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um diagrama mostra câmeras IP e sensores de HVAC na mesma VLAN dos servidores de aplicação. Os dispositivos rodam firmware sem atualização e não suportam agente de endpoint. Qual é a remediação mais apropriada?",
    alternativas: [
      "Instalar agente de EDR nos dispositivos de IoT",
      "Isolar os dispositivos de IoT em VLAN ou segmento de rede dedicado",
      "Exigir multifator no acesso administrativo às câmeras",
      "Aumentar a retenção de logs do switch de acesso",
    ],
    correta: 1,
    explicacao:
      "Dispositivos de IoT normalmente não suportam agente de endpoint, o que elimina a primeira opção. A resposta padrão para esse cenário é segmentação: colocá-los em VLAN dedicada, sem comunicação direta com os sistemas corporativos, limitando o pivô a partir de um dispositivo comprometido.",
  },
];
