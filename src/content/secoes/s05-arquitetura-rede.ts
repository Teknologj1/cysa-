import type { Secao } from "../types";

export const s05: Secao = {
  id: "s05",
  numero: 5,
  titulo: "Arquitetura de rede",
  fase: "f1",
  dominio: "d1",
  descricao:
    "O perímetro acabou e algo tomou o lugar dele: identidade e segmentação. Zero trust, SASE, rede híbrida, isolamento em incidente e as práticas que separam quem detecta em minutos de quem descobre meses depois.",
  objetivos: [
    "Explicar deperimetrização e os quatro fatores que a causaram",
    "Distinguir zero trust como princípio de SASE como arquitetura",
    "Escolher entre site-to-site VPN e link dedicado num cenário híbrido",
    "Separar segmentação (preventiva) de isolamento (reativa)",
    "Reconhecer beaconing, exfiltração e DNS tunneling em tráfego de saída",
    "Identificar controles ausentes a partir de um cenário de rede",
  ],
  licoes: [
    {
      id: "s05l01",
      titulo: "Fundamentos de arquitetura de rede",
      resumo:
        "Por que o modelo de castelo e fosso morreu, o que tomou o lugar dele e como on-premise, nuvem e híbrido mudam o seu monitoramento.",
      minutos: 18,
      tipo: "aula",
      objetivo: "1.1",
      gratis: true,
      conteudo: `
## Todo alerta tem contexto de rede

Muito analista subestima o quanto arquitetura de rede pesa no SOC. Mas pense:
todo alerta que você investiga tem um contexto de rede, e toda ameaça que você
caça toca a rede de alguma forma. Se você não entende como a rede foi desenhada,
não consegue descobrir como o atacante está se movendo dentro dela.

## O modelo que morreu

Durante quase toda a história da segurança, o modelo era simples: **firewall na
borda, confia em tudo que está dentro, não confia em nada que está fora**. É o
modelo **castelo e fosso**, e as muralhas são o seu perímetro.

O problema é que esse modelo não descreve mais a realidade:

- os dados da organização estão na AWS, no Azure, em algum lugar da nuvem
- os usuários trabalham de casa
- os terceirizados entram de redes que não são suas
- as aplicações SaaS estão hospedadas em fornecedores que você não controla

**Não existe mais muralha.** Essa mudança se chama **deperimetrização**, e
significa que o modelo dentro versus fora ruiu.

## Os quatro fatores

A prova cobra os motivos, não só o nome.

**1. Adoção de nuvem.** A organização não roda mais tudo em hardware próprio. Um
firewall de perímetro no escritório não protege dado que está na AWS.

**2. Trabalho remoto.** Funcionário conectando de casa, de cafeteria ou de wi-fi
de hotel. O tráfego dele nunca toca a rede interna antes de já estar conectado
aos seus sistemas.

**3. Dispositivos móveis.** Celular e tablet são aparelho de trabalho primário
para muita gente. Acessam e-mail, arquivo e sistema corporativo de qualquer
lugar, entrando e saindo de redes confiáveis e não confiáveis o tempo todo.

**4. Terceirização e acesso de terceiros.** Contratados, fornecedores e provedores
de serviço gerenciado precisam de acesso remoto. As redes deles viram porta de
entrada em potencial para a sua.

## O que substituiu o perímetro

Quando o perímetro caiu, duas coisas viraram a nova base da segurança de rede:
**identidade** e **segmentação**.

> Em vez de perguntar *"este tráfego vem de dentro da nossa rede?"*, você passa a
> perguntar: **quem é este usuário? este dispositivo é confiável? esta requisição
> específica deve ser permitida?**

Essa é a virada fundamental que você precisa entender — e ela é a raiz das quatro
lições seguintes desta seção.

## Software defined networking

Em paralelo à mudança arquitetural, uma tecnologia mudou como as redes são
construídas e administradas: **SDN**, que separa o **control plane** do **data
plane**.

Na rede tradicional, cada equipamento toma suas próprias decisões de
encaminhamento. Em SDN, um **controlador centralizado** toma essas decisões por
todos os equipamentos.

Isso importa para você por dois motivos:

**Visibilidade.** Controle centralizado significa log centralizado. Você enxerga
os padrões de tráfego de toda a rede de um lugar só.

**Velocidade de resposta.** Se precisa isolar um segmento comprometido, faz pelo
controlador, em vez de entrar em equipamento por equipamento.

Ao investigar suspeita de movimento lateral, os logs do controlador SDN e os
dados de fluxo são dos primeiros lugares que você olha. Cisco DNA Center e VMware
NSX dão visibilidade do tráfego **east-west** dentro da rede — o tráfego entre
sistemas internos, que é exatamente onde o atacante adora se esconder.

Na nuvem, essa visibilidade east-west vem dos **VPC Flow Logs** (AWS) e dos **NSG
Flow Logs** (Azure). Eles mostram o tráfego **entre** seus recursos de nuvem, não
só o que entra da internet.

## On-premise, nuvem e híbrido

**On-premise puro.** Sistemas, servidores e infraestrutura em data center próprio.
Visibilidade e controle totais — e responsabilidade total por patching, hardening
e monitoramento.

**Nuvem.** Cargas rodando na infraestrutura do provedor. Você ganha escala
elástica e flexibilidade, mas a visibilidade funciona de outro jeito: depende de
ferramenta nativa (CloudTrail para atividade de API, VPC Flow Logs para rede,
GuardDuty para detecção). **Sua ferramenta on-premise não enxerga o que acontece
dentro da nuvem** a menos que você a integre explicitamente.

**Híbrido.** A maioria das organizações hoje. Parte on-premise, parte na nuvem. É
o modelo **mais difícil de monitorar**, porque exige visibilidade dos dois
ambientes ao mesmo tempo.

Num ambiente híbrido, o SIEM precisa ingerir log dos dois mundos. Microsoft
Sentinel ou Splunk Cloud puxam Windows Event Logs, logs de firewall e eventos do
Active Directory on-premise **junto com** CloudTrail, dados do Azure Monitor e
alertas de carga de nuvem. Sem essa visão unificada, você fica cego para ataques
que atravessam os dois ambientes.

## O primeiro passo do trabalho real

Entender a arquitetura da sua organização é o passo zero de qualquer estratégia
de monitoramento. Antes de detectar ameaça, você precisa saber:

- **onde estão os seus dados**
- **como o tráfego flui**
- **onde estão as suas lacunas de visibilidade**
`.trim(),
      pontosChave: [
        "O modelo de perímetro morreu: isso é deperimetrização",
        "Quatro fatores: nuvem, trabalho remoto, dispositivos móveis e acesso de terceiros",
        "Identidade e segmentação substituíram o perímetro como âncoras de confiança",
        "SDN separa control plane de data plane: log centralizado e resposta programática",
        "Tráfego east-west é onde o atacante se esconde; na nuvem, VPC/NSG Flow Logs",
        "Híbrido é o mais comum e o mais complexo: o SIEM precisa dos dois mundos",
      ],
      dicaExame:
        "Espere questões que descrevem um cenário sem controle de perímetro tradicional e pedem qual conceito se aplica — a resposta passa por deperimetrização e por identidade como nova âncora de confiança. Em questão baseada em desempenho, você pode ter que casar controle de segurança com tipo de arquitetura.",
      tarefa:
        "Pense no ambiente onde você trabalha ou no seu laboratório: ele é on-premise, nuvem ou híbrido? Onde estão as lacunas de visibilidade?",
      recursos: [
        {
          titulo: "AWS — VPC Flow Logs",
          url: "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
        },
      ],
    },
    {
      id: "s05l02",
      titulo: "Zero Trust Network Architecture",
      resumo:
        "Nunca confie, sempre verifique: os quatro componentes, por que movimento lateral fica muito mais difícil e por que ZTNA não é VPN.",
      minutos: 20,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## Se não dá para confiar no perímetro, no que se confia?

É exatamente isso que zero trust responde.

> **Nunca confie, sempre verifique.**

No modelo tradicional, uma vez dentro do perímetro você é confiável: entrou por
VPN, ganhou acesso amplo aos sistemas internos; está na rede corporativa, é
confiável por padrão. **Zero trust joga essa premissa fora inteira.** Nada é
confiável por padrão — nem usuário, nem dispositivo, nem localização de rede.
Toda requisição de acesso é verificada, venha de onde vier.

O **NIST SP 800-207** define zero trust como uma abordagem que move as defesas de
perímetros estáticos baseados em rede para o foco em usuários, ativos e recursos.
Vale marcar essa publicação.

## O que isso muda na prática

Se um atacante compromete um notebook na rede corporativa:

- **modelo tradicional** → ele passa a ter acesso interno amplo
- **zero trust** → aquele dispositivo comprometido ainda precisa se autenticar e
  ser autorizado para **cada recurso** que tentar alcançar

Por isso **movimento lateral fica dramaticamente mais difícil**. É esse o poder do
zero trust.

## Os quatro componentes

### 1. Identidade e acesso (IAM)

Em zero trust, **identidade é o novo perímetro**. Todo usuário e toda conta de
serviço precisa se autenticar antes de acessar qualquer coisa. Na prática: MFA,
políticas de acesso condicional e gestão de acesso privilegiado. ZTNA **começa**
pela identidade.

### 2. Confiança no dispositivo

Zero trust não verifica só *quem* você é — verifica também a **saúde e a
conformidade do dispositivo**:

- está inscrito no MDM?
- está com patch em dia?
- tem proteção de endpoint rodando?

Um usuário com credencial válida num dispositivo comprometido é negado ou recebe
acesso restrito. Microsoft Intune, CrowdStrike Falcon e SentinelOne alimentam o
motor de política com esses dados de conformidade.

> Ao investigar um alerta, checar **se o dispositivo estava em conformidade no
> momento do evento** dá contexto importante. Usuário válido entrando de
> dispositivo não conforme é bandeira vermelha.

### 3. Microssegmentação

Um dos conceitos mais importantes de zero trust. Em vez de uma rede grande e
plana onde tudo conversa com tudo, a microssegmentação divide a rede em **zonas
pequenas e isoladas**, cada uma com controle de acesso estrito.

Um servidor da zona financeira não fala com um servidor da zona de engenharia a
menos que exista **política explícita** permitindo. Isso limita o raio de alcance:
se o atacante entra num segmento, a microssegmentação impede que ele alcance todo
o resto.

### 4. Aplicação por política

As decisões de acesso são dirigidas por **política, não por localização de rede**.
O motor avalia continuamente cada requisição contra um conjunto de condições:

- quem é o usuário?
- em que dispositivo está?
- de onde? em que horário?
- que recurso está pedindo?
- como isso se compara ao comportamento normal dele?

É aqui que machine learning aparece no trabalho real do SOC. Plataformas como
Zscaler Private Access e Palo Alto Prisma Access constroem **baseline
comportamental** de usuários e dispositivos. Se alguém começa a acessar sistemas
que nunca tocou, às duas da manhã, o motor pode restringir o acesso ou disparar
alerta **mesmo com credencial válida**.

Isso conecta com **UEBA** (*user and entity behavior analytics*), que tem lição
própria mais à frente. O que importa aqui: aplicação de política em zero trust não
é só baseada em regra, é cada vez mais **baseada em comportamento**.

## Investigando num ambiente zero trust

Ao apurar suspeita de conta comprometida, olhe os logs da plataforma de zero trust
**junto** com o SIEM. Zscaler, Prisma e os logs de acesso condicional do Microsoft
Entra ID mostram **cada decisão de acesso** tomada para aquela conta.

Procure requisições **permitidas** de localização ou horário incomuns, mesmo com
credencial válida. É exatamente esse tipo de evidência que aponta para conta
comprometida que passou pelo MFA por **roubo de token** ou **sequestro de sessão**.

## Zero trust não é VPN

> **VPN dá acesso em nível de rede. Ponto.**
> **Zero trust dá acesso em nível de aplicação, com verificação contínua.**

São modelos muito diferentes, e a prova cobra essa distinção.

## Os quatro benefícios

1. **Controle de acesso melhor** — acesso específico a recurso específico, com
   identidade e saúde do dispositivo verificadas
2. **Governança e conformidade** — cada decisão de acesso é registrada e
   auditável, o que pesa para NIST CSF, HIPAA e PCI DSS
3. **Raio de alcance menor** — uma conta ou endpoint comprometido não alcança tudo
4. **Visibilidade** — logs ricos e granulares de quem acessou o quê, de onde, em
   que dispositivo, e qual foi a decisão de política

Esse último ponto é ouro para o analista: **arquitetura zero trust é mais fácil de
monitorar que rede plana tradicional**, porque os pontos de controle de acesso
geram telemetria detalhada.
`.trim(),
      pontosChave: [
        "Nunca confie, sempre verifique: nada ganha acesso só pela localização de rede",
        "Quatro componentes: identidade, confiança no dispositivo, microssegmentação e política",
        "Deperimetrização é o problema; zero trust é a resposta",
        "Microssegmentação limita movimento lateral exigindo política explícita entre zonas",
        "ZTNA ≠ VPN: VPN dá rede, zero trust dá aplicação com verificação contínua",
        "Acesso permitido de local ou horário incomum com credencial válida sugere roubo de token ou sequestro de sessão",
      ],
      dicaExame:
        "Cenários pedem a arquitetura certa para força de trabalho remota ou ambiente pesado em nuvem. Não confunda: se a pergunta é sobre acesso em nível de aplicação com verificação contínua, é ZTNA; se a alternativa fala em dar acesso à rede inteira, é VPN e está errada.",
      tarefa:
        "Procure Zscaler Private Access ou Palo Alto Prisma Access e leia cinco minutos sobre como eles descrevem a abordagem zero trust. Repare em como falam de identidade, postura do dispositivo e acesso em nível de aplicação.",
      recursos: [
        {
          titulo: "NIST SP 800-207 — Zero Trust Architecture",
          url: "https://csrc.nist.gov/publications/detail/sp/800-207/final",
        },
      ],
    },
    {
      id: "s05l03",
      titulo: "SASE: secure access service edge",
      resumo:
        "Os cinco componentes que a Gartner juntou num serviço só, e por que zero trust e SASE são coisas relacionadas mas diferentes.",
      minutos: 18,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## O problema que o SASE resolve

Zero trust é ótimo — e implementar em organização grande e distribuída é
complexo. Você precisa de SD-WAN para conectividade, CASB para visibilidade de
app de nuvem, secure web gateway para tráfego web, ZTNA para acesso a aplicação e
firewall as a service para aplicar política. São muitas ferramentas separadas para
gerenciar.

**SASE** (*secure access service edge*), definido pela Gartner em 2019, é a
resposta a essa complexidade: uma arquitetura **entregue pela nuvem** que combina
rede de longa distância e segurança de rede num **serviço integrado único**.

O objetivo: dar a **qualquer usuário, em qualquer dispositivo, de qualquer lugar**,
acesso seguro a qualquer aplicação, com política consistente e visibilidade
completa — **sem obrigar o tráfego a voltar para um data center central**.

> Essa última parte importa. Acesso remoto por VPN tradicional roteia todo o
> tráfego de volta para a matriz antes de sair para a internet. Isso cria
> latência, gargalo e lacuna de visibilidade. O SASE roteia por pontos de presença
> na nuvem mais próximos do usuário, aplicando inspeção em linha, sem o tráfego
> precisar encostar na sua infraestrutura on-premise.

## Os cinco componentes

### 1. SD-WAN

Cuida do lado de **rede**. Roteia tráfego de forma inteligente por múltiplos
enlaces — banda larga, LTE, MPLS — escolhendo o melhor caminho por desempenho e
política. Para filial e usuário remoto, substitui circuito WAN dedicado caro.
Para você, dá visibilidade dos fluxos por todos os caminhos de conectividade.

### 2. Secure web gateway (SWG)

Intercepta e inspeciona **todo o tráfego web**: filtragem de URL, varredura de
malware e inspeção SSL para ver dentro do tráfego cifrado. Toda requisição passa
por ele, independentemente de onde o usuário está fisicamente.

> **Log de SWG é dos primeiros lugares que você checa numa investigação de
> phishing ou malware.** Se o usuário clicou num link malicioso ou começou a falar
> com um servidor de command and control, o log mostra a URL, o horário, a
> identidade do usuário e se a conexão foi permitida ou bloqueada.

Zscaler Internet Access e Cisco Umbrella são as plataformas que você encontra.

### 3. Cloud access security broker (CASB)

Visibilidade e controle sobre o uso de aplicações de nuvem — tanto as
homologadas, como o Microsoft 365, quanto as de **shadow IT**. Bloqueia upload de
dado sensível para armazenamento pessoal, aplica política de DLP no tráfego de app
de nuvem e mostra todo serviço de nuvem que seus usuários acessam.

### 4. Firewall as a service (FWaaS)

Em vez de appliance físico em cada local, a política de firewall é aplicada a
partir da nuvem, em pontos de inspeção nativos, de forma consistente para todos os
usuários e locais.

### 5. Zero trust network access (ZTNA)

É a camada de **acesso a aplicação** dentro do SASE. Em vez de dar acesso VPN à
rede inteira, o ZTNA concede acesso a aplicações específicas conforme identidade
verificada e postura do dispositivo.

**Esta é a conexão crítica: o SASE entrega ZTNA em escala de nuvem, sem exigir
infraestrutura on-premise.**

## Zero trust e SASE não são a mesma coisa

A prova cobra isso.

| | O que é |
| --- | --- |
| **Zero trust** | Uma **filosofia** de segurança e um conjunto de princípios |
| **SASE** | Uma **arquitetura** que entrega esses princípios junto com rede de longa distância, num modelo de serviço hospedado na nuvem |

São relacionados, mas não são sinônimos. Zero trust é o princípio; SASE é **um dos
jeitos** de entregar zero trust, junto com outros serviços de segurança.

## O que muda para o analista

Uma palavra: **visibilidade**. Num ambiente SASE, o tráfego de todos os usuários
passa por um ponto de inspeção centralizado na nuvem. Log, detecção e aplicação de
política vêm todos do mesmo lugar, independentemente de onde o usuário está.

Acabam as lacunas de cobertura entre usuário remoto e usuário de escritório, e
acabam os pontos cegos de quando alguém contorna a VPN. **Toda conexão passa pela
plataforma.**

Zscaler Digital Experience e Palo Alto Prisma Access dão log de sessão completo
para cada usuário, cada aplicação e cada conexão, com identidade anexada. Numa
investigação, você puxa o histórico inteiro de um usuário — navegação, acesso a
aplicação e atividade de rede — numa consulta só. Em ambiente Azure híbrido, o
Microsoft Defender for Cloud Apps e a suíte Entra dão capacidades equivalentes.
`.trim(),
      pontosChave: [
        "SASE = SD-WAN + SWG + CASB + FWaaS + ZTNA, entregue como serviço de nuvem",
        "Evita o backhaul: inspeção no ponto de presença mais próximo do usuário",
        "Zero trust é filosofia; SASE é arquitetura que a entrega junto com rede WAN",
        "SWG é a primeira fonte de log em investigação de phishing e malware",
        "CASB cobre app homologado e shadow IT, com DLP no tráfego de nuvem",
        "Para o analista, o ganho é visibilidade centralizada, sem ponto cego por localização",
      ],
      dicaExame:
        "Cenário de força de trabalho distribuída com aplicações pesadas em nuvem pedindo uma arquitetura: a resposta é SASE. E não confunda zero trust (princípio) com SASE (arquitetura) — a alternativa que trata os dois como sinônimos está errada.",
      tarefa:
        "Abra a página de visão geral de arquitetura da Zscaler ou do Palo Alto Prisma Access e tente identificar cada um dos cinco componentes: SD-WAN, SWG, CASB, FWaaS e ZTNA. Os fornecedores publicam isso abertamente.",
    },
    {
      id: "s05l04",
      titulo: "Rede híbrida: conectando on-premise e nuvem",
      resumo:
        "Site-to-site VPN, links dedicados, transit gateways — e por que o atacante procura justamente a costura entre os dois ambientes.",
      minutos: 18,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## Onde as organizações de verdade vivem

Quase nenhuma organização é 100% on-premise, e quase nenhuma é 100% nuvem. A
maioria está no meio: sistema legado crítico em hardware físico e, ao mesmo
tempo, cargas novas em AWS, Azure ou GCP.

Isso importa por um motivo direto: **ataque não respeita fronteira de
infraestrutura**.

> Você está no SOC e recebe alerta de atividade suspeita num servidor. Puxa os
> logs e começa a rastrear, mas a conexão se originou de uma carga de trabalho na
> AWS. O movimento lateral foi daquela carga de nuvem de volta para o seu Active
> Directory on-premise, por um túnel VPN. **Se você só monitorasse o ambiente
> on-premise, jamais veria o quadro completo.**

Ambientes híbridos criam lacunas de cobertura, e atacantes sabem disso. Eles
procuram **as costuras** entre nuvem e on-premise, porque são os pontos de
transição menos monitorados.

## Como os ambientes se conectam

### Site-to-site VPN

O jeito mais comum e mais simples. Um túnel VPN configurado entre o seu roteador
ou firewall on-premise e o gateway VPN do provedor. O tráfego é cifrado, mas
trafega pela **internet pública** — latência inconsistente e banda limitada.

- AWS: **AWS Site-to-Site VPN**
- Azure: **Azure VPN Gateway**

Do ponto de vista de segurança, é uma faca de dois gumes: é um túnel confiável,
mas **se o atacante compromete qualquer uma das duas pontas, ele se move
livremente entre nuvem e on-premise**.

> Ao investigar incidente híbrido, sempre verifique se o caminho do ataque
> atravessou a fronteira de um túnel VPN. Na AWS, olhe VPC Flow Logs e CloudTrail;
> on-premise, logs de firewall e eventos do Active Directory. Correlacionar as
> duas fontes é o que revela o movimento pelo túnel — e o seu SIEM precisa ter as
> duas ingeridas.

### Conectividade privada dedicada

Para quem precisa de mais banda e confiabilidade do que uma VPN pela internet, os
provedores oferecem enlaces privados diretos do data center até a nuvem:

- AWS: **Direct Connect**
- Azure: **ExpressRoute**
- GCP: **Cloud Interconnect**

São circuitos físicos provisionados por uma operadora que **contornam a internet
pública** inteiramente. Mais caro, porém mais rápido, mais confiável, e o tráfego
nunca toca a internet. Para carga sensível ou transferência de alto volume,
costuma ser a escolha certa.

### Arquiteturas de trânsito

Quando a organização usa várias regiões ou vários provedores, ela precisa rotear
o tráfego entre todos eles de forma central, em vez de construir conexões
ponto a ponto por toda parte.

- AWS: **Transit Gateway** — um hub central de roteamento que conecta múltiplas
  VPCs e a rede on-premise por um gateway só
- Azure: **Virtual WAN**

Para o analista, transit gateways importam por dois motivos opostos: são um
**ponto de estrangulamento** por onde passa muito tráfego (ótimo para
visibilidade) e são um **alvo de alto valor** — quem consegue manipular o
roteamento ali redireciona tráfego e amplia dramaticamente o alcance do movimento
lateral.

## O desafio número um: visibilidade unificada

Seu SIEM on-premise pode estar coletando Windows Event Logs, logs de firewall e
eventos do Active Directory com perfeição. Mas se as cargas de nuvem geram
CloudTrail, VPC Flow Logs e achados do GuardDuty que **não estão sendo
ingeridos**, você está cego para metade do ambiente.

Atacantes adoram isso. Usam o seu ambiente de nuvem como área de preparação,
sabendo que a ferramenta on-premise não os verá até cruzarem para dentro.

**A correção é integração de log nativo de nuvem:**

- **AWS Security Hub** agrega achados de GuardDuty, Inspector e Macie num painel
  único dentro da AWS; de lá você encaminha para o SIEM
- **Microsoft Defender for Cloud** faz o equivalente nas cargas Azure
- **Microsoft Sentinel** ingere nativamente fontes Azure **e** AWS

## O fluxo de investigação num incidente híbrido

Quando o incidente atravessa os dois ambientes, o roteiro é:

1. **CloudTrail** — quais chamadas de API a credencial comprometida fez
2. **VPC Flow Logs** — que conexões de rede aquela carga fez
3. **GuardDuty** — o que a detecção nativa da AWS sinalizou
4. **Correlacionar** tudo isso com firewall e Active Directory on-premise, no SIEM

Essa correlação entre ambientes é exatamente o que separa o analista efetivo do
analista que só conhece um mundo.
`.trim(),
      pontosChave: [
        "Site-to-site VPN é simples e barata, mas passa pela internet e liga os dois ambientes",
        "Direct Connect, ExpressRoute e Cloud Interconnect contornam a internet pública",
        "Transit Gateway e Virtual WAN centralizam o roteamento — e viram alvo de alto valor",
        "A maior lacuna de segurança em híbrido é a costura entre nuvem e on-premise",
        "Atacante usa a nuvem como área de preparação sabendo que o SIEM on-premise não vê",
        "A correção é ingerir CloudTrail, VPC Flow Logs e GuardDuty junto com o log on-premise",
      ],
      dicaExame:
        "Espere ter que escolher o método de conectividade para um cenário: VPN quando o critério é simplicidade e custo; link dedicado quando é confiabilidade, banda ou tráfego que não pode passar pela internet pública. E saiba que ambiente híbrido exige ferramenta que cubra os dois lados, não um ou outro.",
      tarefa:
        "Se você tem uma conta AWS free tier, vá em VPC e olhe a configuração de flow logs. Veja quais campos são capturados e pense em como o movimento lateral de um atacante apareceria nesses dados.",
    },
    {
      id: "s05l05",
      titulo: "Segmentação e isolamento",
      resumo:
        "Segmentação é o que você constrói antes; isolamento é o que você faz no meio do incidente. E por que isolar, nunca desligar.",
      minutos: 20,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## Raio de alcance

Segmentação de rede é dividir a rede em zonas menores e isoladas, com o tráfego
entre zonas controlado e restrito. A razão de existir tem nome: **blast radius**.

> Um alerta de ransomware dispara num endpoint de uma rede **completamente plana**.
> Aquela máquina alcança todas as outras, todo compartilhamento de arquivo, todo
> banco de dados, todo servidor. Ransomware **ama** rede plana. Aquele endpoint
> vira centenas de máquinas cifradas antes de você desligar o telefone com o
> comandante do incidente.

Numa rede bem segmentada, a mesma infecção atinge **um segmento e para ali**. Não
alcança os servidores financeiros porque não há rota; não atinge a camada de banco
porque um firewall bloqueia.

**Segmentação é ao mesmo tempo controle preventivo e ferramenta de resposta.** É a
ideia central desta lição.

## Os três tipos de segmentação

### Física

A forma mais antiga: hardware separado de verdade — switches, roteadores e cabos
distintos, sem nenhuma infraestrutura compartilhada. Dá o **isolamento mais
forte**, mas é cara e inflexível: você não reconfigura rapidamente. Hoje aparece
em ambiente de alta segurança ou para isolar completamente sistemas críticos, como
redes **air-gapped**.

### Por VLAN

A forma mais comum em rede corporativa tradicional. Divide a infraestrutura física
de switches em várias redes lógicas. Tráfego entre VLANs exige **roteamento**, e é
nesses pontos de roteamento que você coloca firewall ou listas de controle de
acesso.

Um desenho típico: VLAN de usuários, VLAN de servidores, VLAN de impressoras e
VLAN de IoT — todas nos mesmos switches físicos, logicamente isoladas.

> Configuração de VLAN é algo que você confere durante investigação sempre que vê
> tráfego east-west inesperado. Estação na VLAN de usuários conversando com
> servidor na VLAN de banco de dados é bandeira vermelha. **Tráfego cruzando
> fronteira de VLAN que não deveria cruzar é movimento lateral encontrado.**

### Por firewall

Em vez de depender só do controle no roteamento entre VLANs, coloca-se aplicação
de política de firewall em **cada fronteira de segmento**. Todo tráfego que cruza
de uma zona para outra é inspecionado e explicitamente permitido ou bloqueado.
Cada conexão entre segmentos precisa ser explicitamente permitida; **o resto é
negado por padrão**.

## Isolamento é outra coisa

> **Segmentação** você constrói na arquitetura, com antecedência.
> **Isolamento** você executa reativamente, no meio do incidente.

Ao identificar um sistema comprometido, a prioridade é isolá-lo do resto da rede
antes que o atacante se mova lateralmente ou exfiltre dado.

### Isolamento no nível de rede

Remover o dispositivo da VLAN, colocá-lo numa **VLAN de quarentena** ou bloquear
todo o tráfego dele no firewall mais próximo. Corta o aparelho da rede **mantendo
ele ligado**, o que preserva a evidência forense.

### Isolamento por EDR

É como o SOC moderno faz. CrowdStrike Falcon, SentinelOne e Microsoft Defender for
Endpoint isolam um host **direto do console, num clique**. O agente passa a
bloquear todo o tráfego de rede exceto o canal de volta para a própria plataforma
de EDR — você mantém visibilidade e controle do aparelho isolado mesmo com ele
cortado de todo o resto.

É mais rápido e mais cirúrgico que isolamento na rede, e não exige acordar a
equipe de redes às duas da manhã. Falcon e SentinelOne ainda dão **shell remoto**
para o dispositivo isolado, então você roda comando, puxa artefato e coleta
evidência sem restaurar o acesso de rede.

> **Sempre isole, não desligue.** Desligar um dispositivo comprometido destrói a
> evidência em memória volátil; isolar preserva. Só desligue quando o risco de
> manter o aparelho ligado superar o valor forense.

## Segmentação na nuvem

Funciona de outro jeito. Na AWS, o equivalente a VLANs e firewalls é a combinação
de quatro coisas:

| Recurso | Papel |
| --- | --- |
| **VPC** | Sua rede virtual isolada |
| **Subnets** | Os segmentos dentro da VPC |
| **Security groups** | Firewall de host, controla o que chega a cada instância |
| **Network ACLs** | Firewall tradicional, na fronteira da subnet |

Num ambiente AWS bem desenhado você tem uma subnet pública para servidores web,
uma subnet privada para servidores de aplicação e uma subnet isolada para bancos
de dados, com regras de security group e NACLs controlando o tráfego entre elas.

E quando uma carga AWS é comprometida, o isolamento é feito **alterando o security
group** da instância para bloquear todo o tráfego de entrada e saída, exceto o do
seu bastion de gerenciamento ou das suas ferramentas de segurança.
`.trim(),
      pontosChave: [
        "Segmentação existe para reduzir raio de alcance: é preventiva e também é resposta",
        "Três tipos: física (mais forte, menos flexível), por VLAN (mais comum) e por firewall",
        "Tráfego cruzando fronteira de VLAN que não deveria cruzar é movimento lateral",
        "Isolamento é reativo, no incidente; isolamento por EDR é o padrão moderno",
        "Sempre isole, nunca desligue: desligar destrói a evidência em memória volátil",
        "Na AWS: VPC, subnets, security groups e network ACLs; isolar = alterar o security group",
      ],
      dicaExame:
        "Questões baseadas em desempenho vão pedir a ação de contenção certa num incidente ativo. Saiba separar isolamento no nível de rede, isolamento por EDR e desligamento completo — e lembre que desligar é quase sempre a alternativa errada, porque destrói memória volátil.",
      tarefa:
        "Pense na estrutura de VLANs do seu laboratório ou do seu trabalho: um atacante conseguiria ir de uma estação de trabalho até um servidor sem atravessar firewall ou ACL? Se sim, essa é uma lacuna de segmentação.",
    },
    {
      id: "s05l06",
      titulo: "Boas práticas de segurança de rede",
      resumo:
        "Menor privilégio na rede, defesa em profundidade, NAC, filtragem de saída e baseline — e por que quem não conhece a prática não reconhece a violação.",
      minutos: 20,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## Você precisa saber como é o certo

Ao investigar um alerta, você precisa saber **quais controles deveriam estar no
lugar**, para reconhecer o desvio quando ele aparece.

> Se você não conhece a boa prática, não consegue identificar a violação dela.

E vale lembrar de onde vêm as violações grandes: a maioria dos vazamentos
relevantes **não** acontece por causa de um zero-day exótico que ninguém poderia
ter parado. Acontece porque uma prática fundamental não estava no lugar — sem MFA,
sem filtragem de saída, rede plana sem segmentação, porta aberta que deveria estar
fechada.

## 1. Menor privilégio na camada de rede

No nível de identidade, menor privilégio significa que a conta só recebe o acesso
de que precisa. **Na camada de rede significa a mesma coisa aplicada ao tráfego**:
estações e servidores só podem se comunicar com os sistemas e serviços que
legitimamente precisam alcançar.

Isso é aplicado por regras de firewall e listas de controle de acesso. **Todo
fluxo permitido deve ser justificado; o resto é negado por padrão.**

> Ao auditar regras de firewall e encontrar coisas como \`allow any to any\`, ou
> regras amplas sem restrição de destino, você está vendo violação de menor
> privilégio na camada de rede. É também a brecha por onde o atacante passa sem
> disparar detecção nenhuma.

Ferramentas como **AlgoSec** e **Tufin** automatizam a análise de regras e
sinalizam as permissivas demais, as que não são usadas há meses e as que
conflitam com o desenho de segmentação. Numa revisão pós-incidente, a primeira
coisa a checar é se o caminho do ataque dependeu de uma regra permissiva demais que
deveria ter sido limpa há muito tempo.

## 2. Defesa em profundidade

Não depender de um único controle. Camadas, para que se uma falhar, a próxima
pegue. Na rede:

- firewall de perímetro
- firewalls internos de segmentação
- firewall de host nos endpoints
- IDS e IPS em linha
- EDR em cada host

O atacante que passa pelo perímetro esbarra na segmentação; se passar dela, nos
controles de host; se passar desses, o EDR pega o comportamento.

Para o analista isso tem uma consequência prática: **defesa em profundidade
significa múltiplas fontes de log**. Se você só consulta uma, pode perder um
ataque que foi detido ou detectado em outra camada.

## 3. Network access control (NAC)

Verifica **conformidade e identidade do dispositivo antes** de deixá-lo conectar.
Checa se é membro do domínio, se o antivírus está atualizado, se tem o agente
exigido instalado e se a conta está autorizada.

Quem não passa vai para uma **VLAN de quarentena**, com acesso limitado — o
suficiente para baixar os agentes exigidos ou falar com o suporte.

NAC é a sua defesa contra dispositivo não autorizado: aparelho rogue, dispositivo
pessoal não gerenciado e sistema controlado por atacante batem no NAC antes de
conseguirem se comunicar com qualquer coisa.

## 4. Filtragem de saída (egress filtering)

Controlar o que **sai** da sua rede, não só o que entra.

A maioria das organizações gasta todo o esforço em controle de entrada — firewall,
IPS, gateway de e-mail. Mas o atacante **que já está dentro** usa conexões de
saída para command and control, exfiltração de dado e atualização de malware.

Sem filtragem de saída, ele estabelece canal de C2 para qualquer IP da internet,
exfiltra por HTTPS e baixa ferramenta adicional sem nenhum controle no caminho.

Boa filtragem de saída restringe o tráfego apenas a destinos e serviços esperados:

- consultas **DNS** só para os resolvedores aprovados
- tráfego **web** pelo secure web gateway, para inspeção
- conexões diretas em **portas incomuns** bloqueadas

DNS merece atenção especial, porque muito malware usa DNS para C2 — consultando
domínio malicioso conhecido ou fazendo **DNS tunneling** para mover dado.
Ferramentas como Cisco Umbrella e Infoblox BloxOne monitoram cada consulta de cada
dispositivo e bloqueiam domínio malicioso ou recém-registrado.

> Ao investigar infecção por malware, puxar o log de consultas DNS do resolvedor
> muitas vezes revela o domínio de C2 **antes de qualquer outro indicador ficar
> visível**.

### Os três indicadores que a prova cobra

| Padrão | O que sugere |
| --- | --- |
| **Beaconing** — conexões de saída regulares para o mesmo IP externo, em intervalo consistente | O indicador de C2 mais comum |
| Transferências grandes de saída para destino incomum | Possível exfiltração |
| Consultas DNS para domínios aleatórios ou muito longos | Possível DNS tunneling |

Os três são detectáveis com monitoramento de saída adequado.

## 5. Monitoramento e baseline

**Você não detecta anomalia se não sabe como é o normal.**

Fazer baseline de rede é estabelecer os seus padrões normais de tráfego: uso
típico de banda por hora do dia, padrões esperados de comunicação entre sistemas,
volume normal de consultas DNS e distribuição geográfica esperada das conexões.

Com baseline, **os desvios viram o seu sinal de detecção**.

Microsoft Sentinel e Splunk, junto com ferramentas de NDR dedicadas como Darktrace
e Vectra AI, usam machine learning para construir baselines comportamentais
automaticamente. Quando um dispositivo começa a se comportar de forma diferente —
fazendo conexões que nunca fez, gerando mais tráfego que o normal, falando com IPs
externos novos — a plataforma sinaliza para revisão.
`.trim(),
      pontosChave: [
        "Menor privilégio na rede: todo fluxo permitido justificado, o resto negado por padrão",
        "Regra \`allow any to any\` é violação e é por onde o atacante passa sem detecção",
        "Defesa em profundidade significa múltiplas camadas — e múltiplas fontes de log",
        "NAC verifica conformidade do dispositivo antes de dar acesso; reprovado vai para quarentena",
        "Filtragem de saída corta C2 e exfiltração; DNS é o canal mais explorado",
        "Beaconing é o indicador de C2 mais comum; sem baseline não há como reconhecer desvio",
      ],
      dicaExame:
        "Espere cenários que pedem para identificar o controle ausente ou o padrão de tráfego incomum. Memorize os três indicadores de saída: intervalo consistente para o mesmo destino = beaconing; volume grande para destino incomum = exfiltração; domínio aleatório ou muito longo = DNS tunneling.",
      tarefa:
        "Se você tem laboratório, configure uma regra no roteador ou firewall bloqueando todo DNS de saída exceto para o resolvedor designado. Depois tente consultar outro resolvedor e veja o que aparece no log do firewall.",
    },
    {
      id: "s05l07",
      titulo: "Lab: reconhecendo beaconing no Wireshark",
      resumo:
        "Gerar tráfego periódico controlado, isolá-lo com filtros de exibição e praticar de novo o limite entre o que a evidência mostra e o que ela não prova.",
      minutos: 25,
      tipo: "lab",
      objetivo: "1.1",
      conteudo: `
## O que este lab treina

Beaconing é o indicador de rede mais comum associado a command and control.
Atacante que já entrou num sistema precisa falar com ele remotamente, e essas
comunicações costumam aparecer como **conexões de saída regulares, para o mesmo
destino, em intervalos previsíveis**.

O cenário usa duas máquinas virtuais: **Ubuntu** como o endpoint "comprometido" e
**Kali** como o servidor simulado de C2. Se você não tem laboratório montado,
acompanhe pela leitura — o raciocínio é o que a prova cobra.

> Nada aqui é malware nem framework de C2 de verdade. É um servidor web simples,
> usado só para gerar tráfego previsível para análise.

## Montagem

No **Kali** (IP do exemplo: \`192.168.56.60\`), crie o diretório do servidor
simulado com uma página qualquer e suba um servidor HTTP:

\`\`\`bash
mkdir -p ~/beacon-demo && cd ~/beacon-demo
echo '<h1>my web server</h1>' > index.html
python3 -m http.server 80
\`\`\`

No **Ubuntu** (\`192.168.56.63\`), confirme que os dois se enxergam:

\`\`\`bash
ping -c 3 192.168.56.60
curl http://192.168.56.60
\`\`\`

Voltando o conteúdo da página, a comunicação está funcionando.

## Capturando

No Kali, abra o **Wireshark** e selecione a interface da rede de laboratório (no
exemplo, \`eth1\`). Uma forma prática de confirmar que é a interface certa é
disparar um ping e ver o tráfego aparecer.

Neste momento há pouca coisa passando — o esperado, porque o Ubuntu ainda não está
fazendo nada de incomum.

## Gerando o beacon

No Ubuntu, crie o script que simula o endpoint comprometido checando em com o
servidor remoto:

\`\`\`bash
#!/bin/bash
# beacon.sh — check-in a cada 10 segundos, indefinidamente
while true; do
  curl -s http://192.168.56.60 > /dev/null
  sleep 10
done
\`\`\`

\`\`\`bash
chmod +x beacon.sh
./beacon.sh
\`\`\`

O intervalo fixo é o ponto: é ele que faz o tráfego se parecer com a comunicação
periódica típica de command and control.

## Filtrando até enxergar o padrão

De volta ao Wireshark, vai haver tráfego demais. Refine em três passos:

\`\`\`
ip.addr == 192.168.56.63
\`\`\`

Tudo que envolve o Ubuntu. Ainda é muito. Restrinja a HTTP:

\`\`\`
ip.addr == 192.168.56.63 && http
\`\`\`

Melhor. Agora só o que **parte** do Ubuntu:

\`\`\`
ip.src == 192.168.56.63 && http
\`\`\`

Agora aparecem requisições **HTTP GET repetidas**, com origem \`192.168.56.63\` e
destino \`192.168.56.60\`. O mesmo sistema contatando o mesmo destino, de novo e de
novo.

## Tornando o intervalo óbvio

Olhando o tempo desde o início da captura, os pacotes aparecem em 162, 172, 182,
192 — de dez em dez segundos. Para deixar isso evidente, mude o formato de tempo:

> **View → Time Display Format → Seconds Since Previous Displayed Packet**

Agora cada pacote mostra 10 segundos desde o anterior. O padrão salta aos olhos.

## Pensando como analista

O que se destaca nesse tráfego:

- **mesmo IP de origem** contatando **mesmo IP de destino**
- **mesmo protocolo**
- **mesma requisição**
- e, o mais importante, **intervalo consistente** entre as comunicações

Isso é comportamento de beaconing. Se fossem conexões de saída regulares para um
IP externo em intervalos consistentes, seria um dos indicadores de command and
control mais comuns que um analista encontra.

## O limite da evidência

Com base nesta captura, dá para provar que há malware na máquina?

**Não.**

O que dá para afirmar:

- o tráfego é **consistente com comportamento de beaconing**
- o tráfego é **consistente com possível comunicação de command and control**

O que **não** dá para afirmar só com esta captura:

- que existe malware instalado no sistema
- que houve exfiltração de dados
- que a atividade pertence a um ator de ameaça específico

Para chegar a qualquer uma dessas conclusões seriam necessárias evidências
adicionais: logs de endpoint, informação de processo, threat intelligence ou
artefatos forenses.

> Essa distinção é a mesma do lab da seção 4, e não é coincidência: **bom analista
> se prende ao que a evidência sustenta, não ao que ele suspeita.**
`.trim(),
      pontosChave: [
        "Beaconing: mesma origem, mesmo destino, mesmo protocolo e intervalo consistente",
        "No Wireshark, filtre por ip.src e http para isolar o que parte do host suspeito",
        "Seconds Since Previous Displayed Packet torna a periodicidade visível de imediato",
        "Tráfego periódico sustenta 'consistente com beaconing' e 'possível C2'",
        "A captura sozinha não prova malware instalado, exfiltração nem atribuição",
        "Para concluir mais é preciso log de endpoint, dados de processo, threat intel ou forense",
      ],
      dicaExame:
        "Quando o enunciado descrever conexões de saída em intervalo regular para o mesmo destino externo, a resposta é beaconing e C2 — não exfiltração (que aparece como volume grande) nem DNS tunneling (que aparece como domínio aleatório ou longo). E desconfie de alternativa que afirme malware confirmado quando a evidência é só tráfego.",
      tarefa:
        "Escreva a nota de investigação em três frases: o que a captura mostra, o que ela não permite afirmar e qual evidência adicional você pediria para fechar a conclusão.",
      recursos: [
        { titulo: "Wireshark — filtros de exibição", url: "https://www.wireshark.org/docs/dfref/" },
      ],
    },
    {
      id: "s05l08",
      titulo: "Checkpoint: arquitetura de rede",
      resumo:
        "Consolidação das seis lições e do lab: deperimetrização, zero trust, SASE, rede híbrida, segmentação, isolamento e monitoramento de saída.",
      minutos: 20,
      tipo: "checkpoint",
      rota: "/simulado?secao=s05",
    },
  ],
};
