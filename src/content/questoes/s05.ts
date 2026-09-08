import type { Questao } from "../types";

/** Checkpoint da seção 5 — arquitetura de rede. */
export const QUESTOES_S05: Questao[] = [
  {
    id: "s05q1",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual conjunto de fatores é apontado como causa da deperimetrização?",
    alternativas: [
      "Criptografia de disco, VPN, antivírus e backup em fita",
      "Adoção de nuvem, trabalho remoto, dispositivos móveis e acesso de terceiros",
      "Aumento de largura de banda, IPv6, virtualização e conteinerização",
      "Regulação de dados, auditoria externa, certificação e treinamento",
    ],
    correta: 1,
    explicacao:
      "São esses quatro que dissolveram a fronteira entre dentro e fora: dado na nuvem, usuário em casa, aparelho móvel entrando e saindo de redes não confiáveis, e terceiros com acesso remoto. Um firewall de borda não protege nenhum desses casos.",
    gratis: true,
  },
  {
    id: "s05q2",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Com o colapso do modelo de perímetro, quais dois elementos passaram a ser as âncoras primárias de confiança?",
    alternativas: [
      "Antivírus e backup",
      "Identidade e segmentação",
      "Criptografia e compressão",
      "Largura de banda e redundância",
    ],
    correta: 1,
    explicacao:
      "A pergunta deixou de ser 'este tráfego vem de dentro?' e passou a ser 'quem é este usuário, este dispositivo é confiável e esta requisição deve ser permitida?'. Identidade responde à primeira parte e segmentação limita o alcance quando algo dá errado.",
  },
  {
    id: "s05q3",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um analista precisa enxergar o tráfego entre recursos dentro de uma VPC da AWS, e não apenas o que entra da internet. Qual fonte atende?",
    alternativas: ["AWS CloudTrail", "VPC Flow Logs", "AWS Config", "Amazon Inspector"],
    correta: 1,
    explicacao:
      "VPC Flow Logs registram o tráfego de rede entre recursos — o east-west, que é onde o movimento lateral acontece. O CloudTrail registra chamadas de API, não fluxo de rede. No Azure o equivalente são os NSG Flow Logs.",
  },
  {
    id: "s05q4",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual afirmação descreve corretamente a diferença entre ZTNA e VPN tradicional?",
    alternativas: [
      "A VPN verifica identidade continuamente; o ZTNA verifica apenas na conexão inicial",
      "A VPN concede acesso em nível de rede; o ZTNA concede acesso em nível de aplicação com verificação contínua",
      "São equivalentes: ZTNA é apenas o nome comercial de VPN moderna",
      "O ZTNA dispensa autenticação porque confia na postura do dispositivo",
    ],
    correta: 1,
    explicacao:
      "A VPN entrega acesso à rede e para por aí — uma vez dentro do túnel, o usuário alcança amplamente. O ZTNA concede acesso a aplicações específicas e reavalia cada requisição contra identidade, postura do dispositivo e contexto.",
  },
  {
    id: "s05q5",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Em uma arquitetura zero trust, um usuário apresenta credenciais válidas e MFA, mas o dispositivo está com o agente de proteção desativado e sem os patches exigidos. Qual é o resultado esperado?",
    alternativas: [
      "Acesso concedido normalmente, pois a identidade foi verificada",
      "Acesso negado ou restrito, porque a postura do dispositivo faz parte da decisão",
      "Acesso concedido apenas fora do horário comercial",
      "Acesso concedido com registro em log, sem restrição",
    ],
    correta: 1,
    explicacao:
      "Zero trust verifica quem é o usuário e também a saúde e a conformidade do dispositivo. Credencial válida em dispositivo não conforme resulta em negação ou acesso restrito — é exatamente o cenário que impede que um endpoint comprometido vire acesso amplo.",
  },
  {
    id: "s05q6",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual componente do zero trust divide a rede em zonas pequenas e isoladas, exigindo política explícita para comunicação entre elas?",
    alternativas: [
      "Gestão de acesso privilegiado",
      "Microssegmentação",
      "Federação de identidade",
      "Inspeção SSL",
    ],
    correta: 1,
    explicacao:
      "Microssegmentação é o que limita o raio de alcance: um servidor da zona financeira não fala com um da engenharia sem política explícita. É o principal freio ao movimento lateral dentro de uma arquitetura zero trust.",
  },
  {
    id: "s05q7",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Os logs de acesso condicional mostram autenticações bem-sucedidas de uma conta, com credencial e MFA válidos, mas a partir de uma geografia inédita e às 3h da manhã. Qual hipótese é mais consistente com essa evidência?",
    alternativas: [
      "Erro de sincronização de relógio nos servidores de identidade",
      "Conta comprometida com contorno de MFA por roubo de token ou sequestro de sessão",
      "Falha de licenciamento da plataforma de identidade",
      "Política de acesso condicional configurada de forma restritiva demais",
    ],
    correta: 1,
    explicacao:
      "MFA válido não garante que o usuário legítimo esteja presente: um token ou uma sessão roubada reproduz uma autenticação legítima. Acesso permitido de local e horário atípicos, mesmo com credencial válida, é o padrão que aponta para esse tipo de comprometimento.",
  },
  {
    id: "s05q8",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual afirmação separa corretamente zero trust de SASE?",
    alternativas: [
      "Zero trust é uma arquitetura de rede; SASE é um protocolo de autenticação",
      "Zero trust é uma filosofia e um conjunto de princípios; SASE é uma arquitetura que os entrega junto com rede WAN, como serviço de nuvem",
      "Zero trust substitui o SASE em ambientes com trabalho remoto",
      "São sinônimos, sendo SASE o termo adotado pelo NIST",
    ],
    correta: 1,
    explicacao:
      "Zero trust é o princípio; SASE é um dos jeitos de entregá-lo, combinando o acesso por identidade com conectividade de longa distância e outros serviços de segurança num modelo hospedado na nuvem.",
  },
  {
    id: "s05q9",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Quais componentes compõem uma arquitetura SASE?",
    alternativas: [
      "SIEM, SOAR, EDR, NDR e UEBA",
      "SD-WAN, secure web gateway, CASB, firewall as a service e ZTNA",
      "VPN, proxy reverso, WAF, IDS e balanceador de carga",
      "MDM, MAM, UEM, PAM e CASB",
    ],
    correta: 1,
    explicacao:
      "Esses cinco são o que a Gartner reuniu sob o termo: SD-WAN cobre a conectividade e os outros quatro cobrem a segurança, todos entregues como serviço único a partir da nuvem.",
  },
  {
    id: "s05q10",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual é a vantagem operacional de o SASE inspecionar o tráfego em pontos de presença na nuvem em vez de trazê-lo de volta ao data center central?",
    alternativas: [
      "Elimina a necessidade de autenticar o usuário",
      "Evita o backhaul, reduzindo latência e fechando lacunas de visibilidade de usuários remotos",
      "Dispensa a inspeção de tráfego cifrado",
      "Permite abrir mão da segmentação interna",
    ],
    correta: 1,
    explicacao:
      "A VPN tradicional roteia todo o tráfego do usuário remoto de volta à matriz antes de sair para a internet, o que cria latência, gargalo e ponto cego quando o usuário contorna a VPN. O SASE inspeciona perto do usuário e mantém a política consistente.",
  },
  {
    id: "s05q11",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma organização precisa conectar seu data center à AWS com banda alta, latência previsível e sem que o tráfego trafegue pela internet pública. Qual opção atende?",
    alternativas: [
      "AWS Site-to-Site VPN",
      "AWS Direct Connect",
      "AWS Transit Gateway",
      "Amazon CloudFront",
    ],
    correta: 1,
    explicacao:
      "Direct Connect é um circuito físico provisionado por uma operadora, que entra direto no backbone da AWS sem passar pela internet pública. É mais caro que a VPN, e é a escolha quando confiabilidade, banda ou sigilo do caminho pesam mais que custo. Os equivalentes são Azure ExpressRoute e GCP Cloud Interconnect.",
  },
  {
    id: "s05q12",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual é o principal risco de segurança de um túnel site-to-site VPN entre o ambiente on-premise e a nuvem?",
    alternativas: [
      "O tráfego trafega sem criptografia pela internet",
      "Comprometer qualquer uma das duas pontas permite movimentação livre entre os dois ambientes",
      "O túnel impede a coleta de logs de fluxo de rede",
      "A VPN desabilita a autenticação multifator dos usuários",
    ],
    correta: 1,
    explicacao:
      "O túnel é cifrado, mas é uma relação de confiança entre os ambientes: quem domina uma das pontas atravessa para a outra. Por isso, ao investigar incidente híbrido, vale sempre verificar se o caminho do ataque cruzou a fronteira do túnel.",
  },
  {
    id: "s05q13",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um incidente começa numa carga de trabalho na AWS e termina no Active Directory on-premise. O SIEM só ingere logs on-premise. Qual é a consequência direta e qual a correção?",
    alternativas: [
      "Nenhuma consequência; o log do AD registra toda a cadeia. Nenhuma correção necessária",
      "Metade da cadeia fica invisível; a correção é ingerir CloudTrail, VPC Flow Logs e GuardDuty no SIEM",
      "O SIEM gera falso positivo; a correção é ajustar o limiar dos alertas",
      "O incidente não pode ser investigado; a correção é migrar tudo para on-premise",
    ],
    correta: 1,
    explicacao:
      "Sem os logs nativos de nuvem o analista só vê o trecho final do ataque. É justamente por isso que atacantes usam a nuvem como área de preparação. A correção é integração de log: Security Hub ou Defender for Cloud agregando, e o SIEM ingerindo os dois mundos.",
  },
  {
    id: "s05q14",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Por que um AWS Transit Gateway é considerado alvo de alto valor?",
    alternativas: [
      "Porque armazena as credenciais de todas as contas conectadas",
      "Porque manipular o roteamento nele permite redirecionar tráfego e ampliar muito o alcance do movimento lateral",
      "Porque desabilita os security groups das instâncias conectadas",
      "Porque cifra o tráfego com uma chave compartilhada única",
    ],
    correta: 1,
    explicacao:
      "O transit gateway é um hub central de roteamento: muito tráfego passa por ele, o que ajuda na visibilidade, mas também significa que quem controla suas rotas consegue desviar tráfego entre ambientes e expandir o alcance do ataque.",
  },
  {
    id: "s05q15",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual é a diferença conceitual entre segmentação e isolamento?",
    alternativas: [
      "Segmentação é feita na nuvem e isolamento é feito on-premise",
      "Segmentação é um controle preventivo construído na arquitetura; isolamento é uma ação reativa de contenção durante um incidente",
      "Segmentação se aplica a dispositivos e isolamento se aplica a usuários",
      "Segmentação é temporária e isolamento é permanente",
    ],
    correta: 1,
    explicacao:
      "Segmentação você constrói com antecedência para reduzir o raio de alcance; isolamento você executa no meio do incidente para cortar o host comprometido do restante. A prova cobra essa distinção diretamente.",
  },
  {
    id: "s05q16",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um alerta de EDR confirma atividade maliciosa em uma estação de trabalho. Qual é a ação de contenção mais apropriada?",
    alternativas: [
      "Desligar o equipamento imediatamente para interromper o processo",
      "Isolar o host pelo console de EDR, mantendo-o ligado e com o canal de gestão ativo",
      "Reinstalar o sistema operacional antes de coletar evidências",
      "Remover o cabo de rede e desligar em seguida",
    ],
    correta: 1,
    explicacao:
      "Isolar preserva a memória volátil, que é evidência; desligar destrói. O isolamento por EDR bloqueia todo o tráfego exceto o canal de volta à plataforma, então o analista mantém visibilidade e pode até abrir shell remoto para coletar artefatos.",
  },
  {
    id: "s05q17",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Em uma rede segmentada por VLANs, o analista observa uma estação da VLAN de usuários estabelecendo sessões com um servidor da VLAN de banco de dados. O que isso indica?",
    alternativas: [
      "Comportamento esperado de aplicações corporativas",
      "Tráfego cruzando fronteira de segmento que não deveria cruzar: possível movimento lateral",
      "Falha de configuração de DHCP na VLAN de usuários",
      "Saturação de banda no switch de acesso",
    ],
    correta: 1,
    explicacao:
      "Tráfego east-west atravessando uma fronteira de VLAN sem justificativa é um dos indicadores mais diretos de movimento lateral. Correlacionar tags de VLAN dos logs de firewall e switch com a atividade do usuário é o que confirma a hipótese.",
  },
  {
    id: "s05q18",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma instância EC2 foi comprometida. Qual é a forma correta de isolá-la mantendo a capacidade de investigação?",
    alternativas: [
      "Encerrar a instância para impedir qualquer comunicação",
      "Alterar o security group para bloquear todo o tráfego, exceto o do bastion de gerenciamento e das ferramentas de segurança",
      "Remover a instância da VPC e recriá-la em outra região",
      "Desanexar o volume EBS antes de qualquer outra ação",
    ],
    correta: 1,
    explicacao:
      "Na AWS, o isolamento é feito pelo security group anexado à instância. Encerrar a instância equivale a desligar o equipamento: destrói memória volátil e outras evidências. Manter uma via para o bastion e as ferramentas preserva a capacidade de coletar.",
  },
  {
    id: "s05q19",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Durante uma auditoria, o analista encontra uma regra de firewall do tipo 'permitir qualquer origem para qualquer destino'. Qual princípio está sendo violado?",
    alternativas: [
      "Separação de funções",
      "Menor privilégio na camada de rede",
      "Não repúdio",
      "Segregação de ambientes",
    ],
    correta: 1,
    explicacao:
      "Menor privilégio aplicado à rede significa que todo fluxo permitido precisa ser justificado e o restante negado por padrão. Regras amplas assim são exatamente a brecha por onde o atacante circula sem disparar detecção — e o primeiro item a checar numa revisão pós-incidente.",
  },
  {
    id: "s05q20",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Qual controle verifica a conformidade de um dispositivo antes de permitir que ele se conecte à rede, colocando os reprovados em uma VLAN de quarentena?",
    alternativas: [
      "Network access control (NAC)",
      "Secure web gateway",
      "Sistema de prevenção de intrusão",
      "Data loss prevention",
    ],
    correta: 0,
    explicacao:
      "O NAC checa se o dispositivo é do domínio, se o antivírus está atualizado, se tem o agente exigido e se a conta está autorizada — tudo antes de liberar acesso. É a defesa contra aparelho rogue, dispositivo pessoal não gerenciado e sistema controlado por atacante.",
  },
  {
    id: "s05q21",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma organização investe pesado em controles de entrada, mas não filtra tráfego de saída. Qual risco isso cria?",
    alternativas: [
      "Aumento de latência para os usuários internos",
      "Atacante já presente estabelece canal de C2, exfiltra dados e baixa ferramentas sem qualquer controle no caminho",
      "Impossibilidade de aplicar QoS no tráfego de vídeo",
      "Falha na resolução de nomes internos",
    ],
    correta: 1,
    explicacao:
      "Controle de entrada não faz nada contra quem já está dentro. Sem filtragem de saída, o atacante alcança qualquer IP da internet para command and control, exfiltra por HTTPS e busca ferramentas adicionais sem obstáculo.",
  },
  {
    id: "s05q22",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Um host interno faz conexões de saída para o mesmo endereço IP externo a cada 60 segundos, com payload pequeno e constante. Qual é a interpretação mais provável?",
    alternativas: [
      "Exfiltração de dados em massa",
      "Beaconing, indicador comum de command and control",
      "DNS tunneling",
      "Varredura de portas a partir do host",
    ],
    correta: 1,
    explicacao:
      "Intervalo consistente para o mesmo destino, com payload pequeno, é a assinatura de beaconing. Exfiltração aparece como volume grande de saída; DNS tunneling aparece como consultas a domínios aleatórios ou muito longos.",
  },
  {
    id: "s05q23",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Os logs do resolvedor mostram um host consultando dezenas de subdomínios longos e aparentemente aleatórios em um mesmo domínio pai. O que isso sugere?",
    alternativas: [
      "Beaconing HTTP",
      "DNS tunneling, possivelmente para C2 ou exfiltração",
      "Cache de DNS corrompido",
      "Balanceamento de carga por round-robin DNS",
    ],
    correta: 1,
    explicacao:
      "Codificar dados nos rótulos do subdomínio é como o DNS tunneling move informação, o que produz nomes longos e de aparência aleatória sob um mesmo domínio pai. É por isso que restringir consultas aos resolvedores aprovados e monitorá-las é peça central da filtragem de saída.",
  },
  {
    id: "s05q24",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Uma captura de pacotes mostra requisições HTTP de um host interno para um servidor externo em intervalos exatos de 10 segundos. O que o analista pode afirmar com base apenas nessa captura?",
    alternativas: [
      "Que há malware instalado no host e houve exfiltração de dados",
      "Que o tráfego é consistente com beaconing e possível C2, sem provar malware, exfiltração ou atribuição",
      "Que o host foi comprometido por um ator de ameaça conhecido",
      "Que não há nada de anormal, pois HTTP é tráfego legítimo",
    ],
    correta: 1,
    explicacao:
      "A captura sustenta o padrão, não a causa. Para afirmar malware instalado, exfiltração ou atribuição seriam necessários log de endpoint, informação de processo, threat intelligence ou artefatos forenses. Bom analista relata o que a evidência sustenta.",
  },
  {
    id: "s05q25",
    secaoId: "s05",
    dominio: "d1",
    objetivo: "1.1",
    enunciado:
      "Por que estabelecer um baseline de rede é pré-requisito para detecção de anomalias?",
    alternativas: [
      "Porque reduz o volume de logs armazenados no SIEM",
      "Porque sem saber como é o tráfego normal não há como reconhecer o desvio",
      "Porque substitui a necessidade de regras de correlação",
      "Porque é exigência formal do NIST CSF para certificação",
    ],
    correta: 1,
    explicacao:
      "Baseline é o retrato do normal: banda por hora do dia, padrões de comunicação entre sistemas, volume de consultas DNS e distribuição geográfica das conexões. O desvio em relação a ele é que vira sinal de detecção.",
  },
];
