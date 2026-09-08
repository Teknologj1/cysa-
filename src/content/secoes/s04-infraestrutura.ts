import type { Secao } from "../types";

export const s04: Secao = {
  id: "s04",
  numero: 4,
  titulo: "Conceitos de infraestrutura de sistemas",
  fase: "f1",
  dominio: "d1",
  descricao:
    "O terreno que você defende: on-premise, nuvem, híbrido, virtualização, containers, APIs e dispositivos. Sem esse mapa, você não sabe o que é normal — e o que não é passa despercebido.",
  objetivos: [
    "Comparar arquiteturas on-premise, cloud e híbrida do ponto de vista de monitoramento",
    "Aplicar o modelo de responsabilidade compartilhada a um cenário de nuvem",
    "Distinguir hypervisor tipo 1 de tipo 2 e explicar o risco de VM escape",
    "Identificar os principais riscos de segurança em Docker e Kubernetes",
    "Reconhecer enumeração de API e credential stuffing em logs de acesso",
    "Diferenciar MDM, MAM e UEM e explicar o ponto cego de dispositivos não gerenciados",
  ],
  licoes: [
    {
      id: "s04l01",
      titulo: "Infraestrutura e arquitetura de sistemas",
      resumo:
        "On-premise, nuvem, híbrido, SDN e IAM: onde ficam os logs, onde ficam as fronteiras de confiança e por onde um atacante pivota.",
      minutos: 18,
      tipo: "aula",
      objetivo: "1.1",
      gratis: true,
      conteudo: `
## Você não detecta o que não entende

Se você não sabe como a infraestrutura da sua organização foi construída, não
sabe **como é o normal**. E quem não conhece o normal deixa passar ataque todo
santo dia.

Imagine que você está no SOC e chega um alerta de tráfego de saída incomum. É um
servidor web fazendo uma chamada de API que ele deve mesmo fazer, ou é um
endpoint comprometido conversando com um servidor de command and control? Não dá
para responder isso sem conhecer a infraestrutura.

Este é o domínio 1 — operações de segurança — e ele é cobrado com peso na prova,
inclusive em questões baseadas em desempenho (*performance-based questions*), em
que você aplica esses conceitos a um cenário concreto.

## Arquitetura on-premise

O modelo tradicional: servidores, equipamento de rede e armazenamento fisicamente
no seu data center ou sala de servidores. Você controla tudo, do hardware para
cima.

Do ponto de vista de segurança, on-premise dá **visibilidade total**: seus logs,
seu tráfego de rede, seus endpoints. Mas também joga em cima de você **toda a
responsabilidade**: patching, hardening, monitoramento, o pacote completo.

A maioria das organizações ainda tem alguma pegada on-premise, mesmo tendo levado
muita coisa para a nuvem. Você precisa estar confortável nesse ambiente.

## Arquitetura em nuvem

Nuvem — AWS, Azure ou GCP — transfere boa parte da responsabilidade de
infraestrutura para o provedor. Você trabalha com máquinas virtuais, serviços
gerenciados e infraestrutura compartilhada, e o modelo de segurança muda bastante.

O conceito central aqui é o **modelo de responsabilidade compartilhada**
(*shared responsibility model*): o provedor protege a infraestrutura física e a
plataforma subjacente; **você** protege o que constrói em cima dela — suas cargas
de trabalho, seus dados, suas configurações de identidade e acesso e seu
monitoramento de segurança.

> Essa é uma pegadinha clássica de prova. Na nuvem, segurança é responsabilidade
> **compartilhada**, nunca só do provedor.

Para a prova, saiba as fontes de log de nuvem que você consulta primeiro:

| Fonte | Para que serve |
| --- | --- |
| AWS CloudTrail | Atividade de API: quem chamou o quê, de onde, quando |
| AWS GuardDuty | Detecção de ameaças com machine learning |
| Azure Monitor | Agregação de logs |
| Microsoft Sentinel | SIEM nativo de nuvem |

Elas substituem ou complementam as fontes on-premise que você consultaria no
Splunk.

## Arquitetura híbrida

No mundo real, quase ninguém é 100% on-premise nem 100% nuvem. Roda-se os dois.
Isso é **híbrido**, e é o modelo dominante hoje.

Como analista num ambiente híbrido, você precisa:

- monitorar dois conjuntos completamente diferentes de fontes de log
- correlacionar eventos entre os dois ambientes
- entender como o atacante se move **entre** eles

Esse último ponto é o crítico. Quem compromete um sistema on-premise pode pivotar
para recursos de nuvem se as relações de confiança não estiverem bem controladas
— e o caminho inverso também existe.

É aqui que entra **segmentação de rede**, que limita até onde o atacante consegue
ir depois que já está dentro. Temos uma seção inteira sobre isso mais à frente;
por ora, guarde que segmentação é uma das defesas mais poderosas que você tem.

## Software defined networking (SDN)

SDN separa o **control plane** — onde as decisões são tomadas — do **data plane**,
que é o encaminhamento efetivo do tráfego. Isso permite gerenciar a rede por
software e APIs em vez de configurar cada equipamento individualmente.

Para segurança, SDN dá visibilidade centralizada e a capacidade de empurrar
mudanças de política rapidamente por toda a rede. Isso pesa muito em resposta a
incidente: se você precisa isolar um segmento comprometido **agora**, SDN deixa
fazer isso programaticamente, em vez de reconfigurar switches na mão.

> Decore os três planos: **control** (decisão), **data** (encaminhamento) e
> **management** (administração). A prova adora testar isso.

## Identity and access management (IAM)

IAM é o arcabouço que controla **quem acessa o quê** no seu ambiente — usuários,
serviços e aplicações; tudo que precisa se autenticar e ser autorizado.

Os conceitos de IAM que a prova cobra:

- **MFA** — autenticação multifator
- **SSO** — single sign-on
- **Federação** — confiança entre domínios de identidade distintos
- **PAM** — privileged access management
- **CASB** — cloud access security broker

E aqui está o ponto que muda tudo:

> Na nuvem, **a identidade é o perímetro**.

Se um atacante compromete um papel IAM privilegiado na AWS, ele sobe recursos,
exfiltra dados e destrói evidência sem jamais encostar na sua rede on-premise.
Por isso você usa o AWS CloudTrail e os logs de sign-in do Azure Active Directory
para caçar eventos de *impossible travel*, escalonamento de privilégio e chamadas
de API anômalas.

Vamos muito mais fundo em IAM numa lição dedicada mais adiante no curso.

## O que a prova está realmente perguntando

Questões costumam apresentar um cenário com sistemas on-premise e de nuvem
misturados e pedir a abordagem correta de monitoramento ou o vetor de ataque mais
provável. A resposta quase sempre depende de você entender as **fronteiras
arquiteturais** entre os ambientes.

Não olhe a tecnologia isolada. Pergunte sempre: *onde está a superfície de ataque
nesta arquitetura?*
`.trim(),
      pontosChave: [
        "On-premise: controle e visibilidade totais, e responsabilidade total pela segurança",
        "Nuvem: o provedor cuida da infraestrutura física; você cuida de cargas, dados e IAM",
        "O modelo de responsabilidade compartilhada não é opcional — é pegadinha frequente",
        "Híbrido é a norma real: correlacionar dois conjuntos de log e entender o pivô entre eles",
        "SDN separa control plane de data plane; saiba os três planos (control, data, management)",
        "Na nuvem e no híbrido, identidade é o perímetro: credencial comprometida vale tanto quanto endpoint comprometido",
      ],
      dicaExame:
        "Espere questões baseadas em desempenho que pedem para mapear um evento de segurança ao componente arquitetural certo, ou escolher a ferramenta de monitoramento adequada a um ambiente. Se o cenário é de nuvem e a pergunta é sobre atividade de API, a resposta passa por CloudTrail (AWS) ou Azure Monitor/Sentinel.",
      tarefa:
        "Desenhe um diagrama rápido de um ambiente híbrido que você conhece ou já viu em laboratório. Marque três coisas: onde estão as fontes de log, onde estão as fronteiras de confiança e por onde um atacante tentaria pivotar.",
      recursos: [
        {
          titulo: "AWS — Shared Responsibility Model",
          url: "https://aws.amazon.com/compliance/shared-responsibility-model/",
        },
      ],
    },
    {
      id: "s04l02",
      titulo: "Arquitetura cloud native",
      resumo:
        "Microsserviços, serverless, infraestrutura como código e as fontes de log que substituem o SIEM tradicional.",
      minutos: 20,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## Cloud native não é o futuro, é o presente

A maioria das organizações já é cloud native ou está construindo nessa direção, e
a prova reflete isso.

Do ponto de vista de segurança, num ambiente cloud native **tudo se move mais
rápido**: infraestrutura sobe e desce em segundos, e a aplicação é quebrada em
dezenas de serviços pequenos. Ferramentas de segurança tradicionais muitas vezes
não acompanham esse ritmo.

## O que "cloud native" significa de fato

Cloud native é construir e rodar aplicações explorando de verdade as vantagens da
computação em nuvem. Não é pegar uma aplicação tradicional e movê-la como está —
isso se chama **lift and shift**. Cloud native é a aplicação ter sido **desenhada
para rodar na nuvem**:

- microsserviços em vez de aplicação monolítica
- containers em vez de máquinas virtuais tradicionais
- funções serverless para processamento orientado a evento
- APIs conectando tudo

O problema de segurança que isso cria: a superfície de ataque fica **distribuída**
entre muitos componentes pequenos. Não existe um perímetro único para defender. E
o tráfego entre serviços internos — chamado **east-west** — passa a ser tão
volumoso quanto o que entra de fora.

> Monitorar uma aplicação web tradicional é olhar um servidor, um banco, talvez um
> load balancer. Você sabe exatamente o que deveria conversar com o quê. Agora
> imagine a mesma aplicação reconstruída como 40 microsserviços, cada um no seu
> container, chamando uns aos outros por APIs internas, subindo e descendo
> conforme a carga. Como você sabe o que é normal?

## Microsserviços

Uma arquitetura de microsserviços quebra a aplicação em serviços pequenos e
independentes, cada um responsável por uma função. Em vez de uma aplicação grande
cuidando de autenticação, cobrança, notificações e perfil de usuário, você tem
quatro serviços separados conversando por API.

**A favor:** se um serviço é comprometido, o atacante não ganha automaticamente a
aplicação inteira.

**Contra:** você passa a ter muito mais componentes para monitorar e muito mais
chamadas de API para acompanhar.

Ao investigar atividade suspeita nesse ambiente, você olha as chamadas de API
**serviço a serviço** e as rastreia com ferramentas como o AWS X-Ray ou
plataformas de *distributed tracing*. Movimento lateral incomum costuma aparecer
como chamada de API inesperada entre componentes que normalmente não se falam.

## Serverless

Serverless não quer dizer que não há servidores — há. Quer dizer que **você não os
gerencia**. Você escreve uma função, publica numa plataforma como AWS Lambda ou
Azure Functions, e o provedor cuida do resto.

O desafio de segurança aqui é **visibilidade**: funções executam e terminam em
milissegundos. Se um atacante explora uma função serverless, o evento pode ter
desaparecido antes de você saber que aconteceu. Por isso o AWS CloudWatch Logs
(para Lambda) e o Azure Application Insights são críticos — é preciso capturar e
reter o log antes que o contexto de execução suma.

O risco mais cobrado é o de **permissões excessivas na role de execução**. Uma
role de Lambda com acesso a buckets S3 e tabelas DynamoDB é um vetor sério: se a
função for comprometida, o atacante **herda todas essas permissões**. Isso amarra
direto no princípio do menor privilégio.

## Infraestrutura como código (IaC)

Em ambientes cloud native a infraestrutura costuma ser definida em código, com
Terraform, AWS CloudFormation ou Ansible. Você escreve um template dizendo "suba
três instâncias EC2, associe a este security group, conecte este bucket S3" e a
nuvem provisiona sozinha.

É poderoso — e é um problema de segurança sério, porque **uma configuração errada
que entra no template é implantada em todo lugar onde aquele template é usado**.
Uma linha ruim pode criar centenas de recursos mal configurados.

Ferramentas como **Checkov**, **Bridgecrew** e **Prisma Cloud** varrem templates
de IaC antes do deploy, pegando o erro antes que ele vire vulnerabilidade em
produção. E, ao investigar um incidente de nuvem, rastrear a causa raiz até um
template de IaC é um caminho cada vez mais comum.

## Monitoramento cloud native

É aqui que o seu trabalho como analista acontece. As fontes de log são
completamente diferentes das de um ambiente tradicional:

| Provedor | Fontes |
| --- | --- |
| AWS | CloudTrail (API), VPC Flow Logs (rede), GuardDuty (ameaças), Security Hub (agregação) |
| Azure | Microsoft Sentinel (SIEM), Defender for Cloud (proteção de carga), Monitor (logs) |
| GCP | Security Command Center, Chronicle |

Num incidente de nuvem, o **primeiro movimento** é puxar o CloudTrail (ou
equivalente) e olhar quais ações de API foram executadas, por quem, de qual
endereço IP e quando. É o equivalente em nuvem dos eventos de autenticação e
privilégio do Windows.

E se você vir chamadas \`AssumeRole\` vindas de um IP ou de uma geografia
incomum, isso é bandeira vermelha para investigar imediatamente.

## MITRE ATT&CK para nuvem

O MITRE ATT&CK tem uma matriz específica de nuvem em attack.mitre.org. Táticas
como acesso inicial por phishing de credencial de nuvem, escalonamento de
privilégio por manipulação de IAM e exfiltração por transferência de dados de
bucket S3 têm entradas próprias. Ao investigar um incidente de nuvem, essa matriz
é o seu mapa do que o atacante pode estar fazendo.
`.trim(),
      pontosChave: [
        "Cloud native = microsserviços + serverless + containers + APIs; superfície de ataque distribuída",
        "O modelo de responsabilidade compartilhada continua valendo: cargas e configurações são suas",
        "Role de execução serverless com permissão demais é vetor central — menor privilégio sempre",
        "Erro em template de IaC se replica em todo deploy; varra com Checkov ou Prisma Cloud antes",
        "Saiba as fontes por provedor: CloudTrail/VPC Flow Logs/GuardDuty, Sentinel/Defender, Chronicle",
        "A matriz de nuvem do MITRE ATT&CK é a referência tática para mapear o incidente",
      ],
      dicaExame:
        "Em questão baseada em desempenho, espere um cenário de arquitetura de nuvem em que você precisa apontar o risco de segurança E a ferramenta de monitoramento certa. Se a pergunta é 'qual ação de API foi executada e por quem', a resposta é o log de auditoria (CloudTrail); se é 'qual tráfego de rede houve', é VPC Flow Logs.",
      tarefa:
        "Vá em attack.mitre.org, abra a Enterprise Matrix, filtre por plataforma e escolha AWS ou Azure. Pegue uma técnica, leia a descrição e a orientação de detecção, e anote qual fonte de log você usaria para detectá-la.",
      recursos: [
        { titulo: "MITRE ATT&CK — matriz de nuvem", url: "https://attack.mitre.org/matrices/enterprise/cloud/" },
      ],
    },
    {
      id: "s04l03",
      titulo: "Virtualização e segurança",
      resumo:
        "Hypervisor tipo 1 e tipo 2, VM escape, VM sprawl, abuso de snapshot e o ponto cego do tráfego east-west.",
      minutos: 18,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## Antes da nuvem veio a virtualização

E ela não foi embora: praticamente todo data center moderno e todo ambiente de
nuvem roda sobre tecnologia de virtualização.

O que torna isso crítico para você: a virtualização introduz uma **camada de
abstração** entre o hardware e os sistemas operacionais. Essa camada tem
superfície de ataque própria, logs próprios e preocupações de segurança próprias.
Quem não entende como ela funciona perde ataques que acontecem exatamente ali.

## O que muda no raio de alcance

Num ambiente tradicional, comprometer um servidor te dá **um servidor**. Num
ambiente virtualizado, um host físico pode rodar dezenas de máquinas virtuais.
Comprometer o **hypervisor** significa acesso potencial a **todas** as VMs
daquele host.

Essa diferença de *blast radius* é a razão de a camada de virtualização merecer
atenção especial.

## Tipos de hypervisor

A prova testa essa distinção diretamente.

**Tipo 1 — bare metal.** Roda direto no hardware físico, sem sistema operacional
hospedeiro no meio. O próprio hypervisor gerencia os recursos e roda as VMs em
cima. Exemplos: VMware ESXi, Microsoft Hyper-V, Citrix XenServer. É o que você
encontra em data center corporativo e na infraestrutura dos provedores de nuvem —
a AWS roda sobre Xen e Nitro, o Azure sobre Hyper-V.

**Tipo 2 — hospedado.** Roda **em cima** de um sistema operacional. O hypervisor é
uma aplicação que roda no Windows ou no Linux, e as VMs rodam dentro dela.
Exemplos: VMware Workstation, VirtualBox, Parallels. É o que você usa em
laboratório. Não costuma aparecer em produção, porque o sistema hospedeiro
acrescenta sobrecarga e superfície de ataque.

> Tipo 1 roda em bare metal. Tipo 2 roda sobre um sistema operacional hospedeiro.
> Isso importa para segurança: num ambiente tipo 2, um sistema hospedeiro
> comprometido coloca o hypervisor **e todas as VMs** em risco.

## VM escape

O risco mais grave da virtualização. **VM escape** é quando o atacante rompe o
isolamento da máquina virtual e alcança o hypervisor ou outras VMs do mesmo host.

Pense por que isso é tão perigoso: você isolou uma VM comprometida achando que
está contida; se o atacante escapa para o hypervisor, a contenção acabou e toda
VM naquele host passa a ser potencialmente acessível.

Vulnerabilidades de VM escape são raras, mas acontecem. É por isso que **patching
de hypervisor é crítico** e por isso você precisa monitorar logs **no nível do
hypervisor**, não só os do sistema operacional convidado.

## VM sprawl

*VM sprawl* é quando a organização cria máquinas virtuais e depois se esquece
delas. Uma VM subida para um projeto de teste seis meses atrás, nunca
descomissionada, rodando um sistema operacional sem patch e com credencial
padrão.

Essas VM esquecidas viram alvo fácil. Quem encontra uma tem um ponto de apoio no
ambiente: ela está na sua rede, provavelmente é confiada por outros sistemas e não
é monitorada por ninguém.

Scanners de vulnerabilidade como **Nessus Essentials** e **Tenable.io** conseguem
inventariar o ambiente e achar essas VMs paradas. Quando a varredura mostra
sistemas sem atualização há meses, é bandeira vermelha. A prática correta é
cruzar o inventário de ativos com a lista de VMs ativas periodicamente.

## Abuso de snapshot

VMs podem tirar **snapshots**, capturas do estado da máquina num ponto no tempo.
São ótimos para rollback e teste. E são risco de segurança:

- snapshots não removidos persistem por meses e contêm **credenciais em cache**,
  dados sensíveis ou um estado de sistema operacional mais antigo e vulnerável
- quem tem acesso ao armazenamento de snapshots pode restaurar um e acessar tudo
  aquilo
- se havia malware ativo antes do snapshot, reverter para ele **restaura o
  malware junto**

Ao investigar um possível comprometimento em ambiente virtualizado, **cheque o
histórico de snapshots**. Uma criação súbita de snapshot pouco antes de um evento
suspeito pode indicar um atacante montando um plano B — ou uma ameaça interna
criando mecanismo de persistência.

## Tráfego east-west: o ponto cego

VMs conversam por switches e redes virtuais gerenciados pelo hypervisor. Esse é o
tráfego **east-west**: movimento lateral entre VMs, em vez de entrada e saída do
data center.

> Firewalls de perímetro tradicionais **não veem esse tráfego**.

Se o atacante compromete uma VM e pivota para outra VM no mesmo host, todo esse
movimento lateral acontece no switch virtual e nunca toca o firewall de perímetro.
É uma lacuna de detecção enorme.

A resposta é **microssegmentação**. Você precisa de visibilidade do tráfego
east-west em ambientes virtualizados, não só do north-south de perímetro.
Plataformas como VMware NSX aplicam política de segurança no nível do switch
virtual e devolvem essa visibilidade.
`.trim(),
      pontosChave: [
        "Tipo 1 roda em bare metal (ESXi, Hyper-V, XenServer); tipo 2 roda sobre SO hospedeiro (Workstation, VirtualBox)",
        "VM escape é o ataque mais grave específico de virtualização: rompe o isolamento e expõe todo o host",
        "VM sprawl cria sistemas esquecidos e sem patch — inventarie e cruze com a lista de VMs ativas",
        "Snapshots guardam credencial em cache e podem restaurar malware; monitore eventos de criação",
        "Tráfego east-west entre VMs não cruza o firewall de perímetro — é ponto cego de detecção",
        "Microssegmentação (ex.: VMware NSX) devolve visibilidade na camada de rede virtual",
      ],
      dicaExame:
        "Um cenário comum de questão baseada em desempenho descreve um atacante que comprometeu várias VMs num ambiente aparentemente isolado. O que está sendo testado é se você entende que o tráfego east-west contorna o controle de perímetro. A resposta certa costuma envolver microssegmentação ou visibilidade na camada do hypervisor.",
      tarefa:
        "Pense em uma coisa que suas ferramentas atuais provavelmente não veem num ambiente virtualizado — atividade de snapshot, tráfego east-west, criação de VM. Anote qual ferramenta ou fonte de log fecharia essa lacuna.",
    },
    {
      id: "s04l04",
      titulo: "Containers: Docker e Kubernetes",
      resumo:
        "Kernel compartilhado, imagem envenenada, RBAC mal configurado, API server exposta e as duas ferramentas que dão visibilidade: Falco e o audit log.",
      minutos: 20,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## Container não é VM

A virtualização mudou como pensamos servidores. A conteinerização mudou como
pensamos aplicações — e hoje container está em toda parte.

A realidade de segurança: containers são rápidos e leves, o que é ótimo para quem
desenvolve. Mas essa mesma velocidade significa que eles **sobem e somem antes de
a ferramenta de segurança tradicional saber que existiram**. Atacantes aprenderam
a explorar isso: escape de container, cluster Kubernetes mal configurado, imagem
envenenada — são vetores ativos e reais.

## A diferença que explica todo o resto

Uma **máquina virtual** virtualiza a pilha inteira de hardware; cada VM roda seu
próprio sistema operacional completo.

Um **container** virtualiza no nível do sistema operacional: containers
**compartilham o kernel do host** e rodam como processos isolados em espaço de
usuário. É isso que os torna muito mais leves e rápidos.

> Uma VM é como alugar um apartamento inteiro: cozinha própria, paredes próprias,
> tudo próprio — isolamento completo, custo alto de recursos. Um container é como
> alugar um quarto numa casa compartilhada: seu espaço é seu, mas o encanamento, a
> elétrica e a fundação são de todo mundo.

Essa fundação compartilhada é o **kernel do sistema operacional**. E é exatamente
ela que cria os riscos mais perigosos do ambiente de containers.

## Docker e a segurança da imagem

O Docker empacota a aplicação e todas as suas dependências numa **imagem de
container**, que roda igual em qualquer lugar onde o Docker esteja instalado —
laptop de dev, servidor de teste ou instância de nuvem.

O conceito de segurança central aqui é a própria imagem. Imagens são construídas
em **camadas**: sistema operacional base, dependências, configuração, código.

> Se qualquer camada da imagem estiver comprometida ou contiver vulnerabilidade,
> **todo container que roda aquela imagem herda o problema**.

É o que se chama de **poisoned image attack**. Um atacante que consegue colocar
uma imagem maliciosa no seu registry empurra essa imagem para centenas de
containers em execução de uma vez.

Ferramentas como **Trivy**, **Snyk** e **Prisma Cloud** varrem imagens em busca de
vulnerabilidades conhecidas antes do deploy. Ao investigar um container suspeito
em produção, a primeira pergunta é sempre: *de onde veio esta imagem e o que tem
dentro dela?*

Para a prova: saiba o risco de usar imagens base não verificadas. Puxar de
registries públicos como o Docker Hub sem varredura introduz **risco de cadeia de
suprimentos** significativo.

## Kubernetes

Se o Docker gerencia containers individuais, o **Kubernetes** (K8s) gerencia
containers em escala: decide quais containers rodam onde, faz escalonamento,
reinicia containers que falharam e gerencia a rede entre eles.

Kubernetes é poderoso e é complexo — e complexidade é inimiga da segurança. Os
problemas mais comuns:

- configurações de **RBAC** (role-based access control) permissivas demais
- **API server exposta** sem autenticação
- containers rodando **como root**
- **secrets em texto claro** em arquivos de configuração

Sobre a API server: ela é a interface de administração do cluster inteiro. Se
estiver exposta à internet sem autenticação adequada e sem patch, atacantes vão
encontrá-la. E quando encontram, fazem de tudo — desde implantar cargas maliciosas
até exfiltrar secrets do cluster. Há casos reais de empresas que deixaram a API
server exposta e tiveram mineradores de criptomoeda implantados no cluster inteiro
minutos depois de a exposição ser descoberta.

## As ferramentas do analista

Num ambiente conteinerizado, suas fontes de log são diferentes das de um servidor
tradicional.

**Falco** é uma ferramenta open source de segurança em tempo de execução. Ela
observa as *system calls* feitas pelos containers e alerta quando um container faz
algo inesperado: abrir um shell, ler arquivo sensível, fazer conexão de rede de
saída que não deveria fazer. Pense no Falco como o **IDS dos containers**.

> Um alerta do Falco dizendo que um container abriu um shell é indicador
> significativo. Container em produção não precisa de shell interativo. Se você
> vê acesso a shell num container que roda uma aplicação web, trate como
> potencial incidente.

**Kubernetes Audit Log** captura todas as requisições à API server: quem fez, o
que pediu e qual foi o resultado. É o equivalente ao CloudTrail para Kubernetes.

Juntar Falco e o audit log num SIEM como Splunk ou Azure Sentinel dá visibilidade
sólida do ambiente de containers.

## Menor privilégio em containers

Containers rodam como processos. **Por padrão, no Docker, containers rodam como
root**, a menos que você configure o contrário.

Rodar como root dentro do container é perigoso porque, se o container for
comprometido e o atacante explorar uma vulnerabilidade de escape, ele **emerge no
host como root**. É o pior cenário possível.

Endurecimento mínimo:

- configure containers para rodar como usuário **não-root**
- aplique sistema de arquivos **somente leitura** onde for possível
- **remova capabilities** do Linux que não sejam necessárias
`.trim(),
      pontosChave: [
        "Containers compartilham o kernel do host — esse kernel compartilhado é o risco central",
        "Imagem comprometida contamina todo container que a executa: varra com Trivy ou Prisma Cloud antes do deploy",
        "Nunca puxe imagem base de registry público sem varredura — é risco de cadeia de suprimentos",
        "Top vetores em Kubernetes: RBAC permissivo, API server exposta, container como root, secret em texto claro",
        "Falco é o IDS de runtime dos containers; o Kubernetes Audit Log é o CloudTrail do cluster",
        "Container em produção não abre shell interativo — alerta de shell é indicador de comprometimento",
      ],
      dicaExame:
        "Questões de container costumam apresentar uma configuração com privilégio excessivo e pedir o risco ou a remediação. Saiba a diferença entre container rodando como root e como usuário não-root, e quais capabilities restringir. Em cenário de detecção, Falco responde 'o que o container fez' e o audit log responde 'quem pediu o quê à API'.",
      tarefa:
        "Vá em hub.docker.com e procure uma imagem popular, como ubuntu ou nginx. Olhe o resultado do scan de segurança quando disponível e repare que mesmo imagens oficiais e amplamente usadas costumam ter vulnerabilidades conhecidas. É essa a realidade da segurança de imagens.",
      recursos: [{ titulo: "Falco", url: "https://falco.org" }],
    },
    {
      id: "s04l05",
      titulo: "Conceitos de API",
      resumo:
        "REST, OWASP API Security Top 10, autenticação por chave e OAuth, e o que enumeração e credential stuffing parecem num log.",
      minutos: 18,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## APIs são o tecido conectivo

Todo microsserviço se comunica por API. Todo serviço de nuvem expõe API. Todo app
de celular, toda plataforma SaaS, todo pipeline de CI/CD. APIs estão em toda
parte.

E é por isso que APIs são também **uma das superfícies mais atacadas** hoje.
Ataques a API já respondem por parcela significativa dos vazamentos de dados, e a
tendência acelera à medida que organizações expõem mais endpoints à internet.

## O que é uma API

Uma *application programming interface* é um conjunto de regras que permite duas
aplicações conversarem. Quando o app de clima do seu celular puxa a temperatura,
é uma chamada de API. Quando o Splunk ingere logs da AWS, é API. Quando o SOAR
abre um chamado no ServiceNow automaticamente, é API também.

O estilo mais comum é **REST** (*representational state transfer*), que usa os
métodos HTTP que você já conhece:

| Método | Ação |
| --- | --- |
| GET | Recuperar dado |
| POST | Criar dado |
| PUT | Atualizar dado |
| DELETE | Remover dado |

Requisições e respostas normalmente em JSON.

> Do ponto de vista de segurança, o incômodo é este: **API REST parece tráfego web
> normal**. Um atacante abusando de uma API se parece com um cliente legítimo. É o
> que torna ataque de API tão difícil de detectar com ferramenta tradicional.

## OWASP API Security Top 10

Referência fundamental e diretamente relevante para a prova, em
owasp.org/api-security. Os riscos principais incluem *broken object level
authorization*, *broken authentication*, exposição excessiva de dados, ausência de
*rate limiting* e configuração incorreta de segurança.

### Broken object level authorization (BOLA)

Acontece quando o endpoint não verifica se **aquele** usuário pode acessar
**aquele** objeto específico.

Se existe um endpoint em \`/api/users/12345/profile\` e você troca o ID para
\`12346\` e recebe o perfil de outra pessoa, isso é BOLA. É a vulnerabilidade de
API mais comum e é responsável por vazamentos enormes.

### Ausência de rate limiting

Quando a API não limita quantas requisições um cliente pode fazer num intervalo.
Dois problemas:

1. **Credential stuffing fica trivial** — o atacante testa milhares de combinações
   de usuário e senha contra o endpoint de login sem qualquer freio.
2. Abre porta para **negação de serviço**.

## Como isso aparece no log

Ao investigar atividade suspeita de API, puxe os logs do gateway e procure
padrões:

- **um mesmo IP batendo no mesmo endpoint centenas de vezes por minuto** →
  scraping ou credential stuffing
- **IDs de objeto sendo requisitados em sequência** → enumeração, tentativa de
  colher dados incrementando identificadores

## Autenticação de API

A maioria das APIs modernas usa **API keys** ou tokens **OAuth 2.0**.

**API keys** são strings simples que identificam a aplicação chamadora. Fáceis de
usar e fáceis de vazar: aparecem em repositório do GitHub, em binário de app
móvel, nas ferramentas de desenvolvedor do navegador. Chave vazada dá ao atacante
acesso total ao que aquela chave autoriza.

**OAuth 2.0** é um framework de autorização mais sofisticado, que emite tokens de
acesso temporários — mas pode ser mal configurado de formas tão ruins quanto uma
chave vazada.

Monitorar abuso de chave significa procurar suas chaves sendo usadas a partir de
IPs, geografias ou *user agents* inesperados.

> Se a chave de API do seu app móvel de repente começa a fazer requisições de um
> IP de data center em outro país, essa chave provavelmente foi extraída e está
> sendo abusada.

O AWS CloudTrail registra uso de chave para APIs da AWS; para as suas próprias
APIs, os logs do gateway de aplicação (AWS API Gateway, Kong) cumprem esse papel.

## Ferramentas: o gateway é o seu ponto de visibilidade

Um **API gateway** fica na frente das suas APIs e cuida de autenticação,
autorização, rate limiting e logging. AWS API Gateway, Kong e Apigee são os mais
comuns.

Para monitoramento, o gateway é a sua melhor fonte de telemetria: toda chamada que
passa por ele é registrada com endpoint, chamador, código de resposta e tempo. O
que você quer observar:

- falhas de autenticação
- padrões de requisição incomuns
- requisições a endpoints **não documentados**
- transferências grandes de dados em respostas de API

**WAFs** também podem ficar na frente de APIs, detectando e bloqueando padrões
como SQL injection em parâmetro de API ou payload anormalmente grande.

## Amarrando com o ATT&CK

O OWASP API Top 10 conversa bem com o MITRE ATT&CK: roubo de credencial de API
mapeia para *credential access*; enumeração de API mapeia para *discovery*. Saber
os dois frameworks ajuda você a falar a língua das equipes de desenvolvimento e de
segurança durante a investigação.
`.trim(),
      pontosChave: [
        "API REST sobre HTTP parece tráfego web normal — por isso ataque de API escapa de ferramenta tradicional",
        "BOLA é a falha de API mais comum: trocar o ID do objeto e receber o dado de outra pessoa",
        "Sem rate limiting, credential stuffing e negação de serviço ficam triviais",
        "Chave de API vaza em repositório, binário de app e devtools; monitore uso de origem inesperada",
        "O API gateway é o seu ponto primário de visibilidade e controle",
        "No log, procure alto volume por IP, falhas de autenticação e IDs requisitados em sequência",
      ],
      dicaExame:
        "O exame liga conceitos de API ao monitoramento de operações de segurança. Um cenário típico descreve atividade incomum de API e pede o tipo de ataque ou a resposta adequada. Reconheça pelo padrão: mesmo IP + muitas senhas = credential stuffing; mesmo IP + IDs sequenciais = enumeração.",
      tarefa:
        "Vá em owasp.org/api-security e leia a descrição dos três primeiros itens do Top 10. Para cada um, pense em como ele apareceria num log de acesso de API e qual padrão te alertaria de que aquilo está acontecendo.",
      recursos: [
        { titulo: "OWASP API Security Top 10", url: "https://owasp.org/API-Security/" },
      ],
    },
    {
      id: "s04l06",
      titulo: "Lab: enumeração de API em logs de acesso",
      resumo:
        "Comparar tráfego normal com enumeração num log real, e praticar a disciplina de não concluir mais do que a evidência sustenta.",
      minutos: 25,
      tipo: "lab",
      objetivo: "1.1",
      conteudo: `
## O objetivo deste lab

Não é explorar a API. É **revisar a evidência** e decidir se a atividade parece
normal, suspeita ou maliciosa. Esse julgamento é o trabalho do analista.

O cenário original usa duas máquinas virtuais: uma **Ubuntu** hospedando uma API
simples e uma **Kali** gerando o tráfego. Se você não tem laboratório montado,
acompanhe pela leitura — o raciocínio é o que a prova cobra, não os comandos.

## Montagem

Na Ubuntu, descubra o IP da máquina:

\`\`\`bash
ip addr
\`\`\`

No exemplo, o servidor está em \`192.168.56.63\` e o cliente Kali em
\`192.168.56.60\`.

Entre no diretório da aplicação e leia o código:

\`\`\`bash
cd ~/api-demo
cat app.py
\`\`\`

A API contém dados de perfil e permite requisitar registros individuais pelo ID
do usuário. Há cinco IDs cadastrados: **1001 a 1005**.

Suba a aplicação:

\`\`\`bash
python3 app.py
\`\`\`

Ela passa a escutar em localhost na porta 5000.

## Parte 1 — como é o tráfego normal

Na Kali, requisite um perfil:

\`\`\`bash
curl http://192.168.56.63:5000/api/users/1001/profile
\`\`\`

Volta o registro — nome Alice Johnson, papel *employee*. Repita a mesma requisição
algumas vezes para gerar atividade.

Agora, na Ubuntu, abra outra aba e leia o log:

\`\`\`bash
cat api_access.log
\`\`\`

Repare no que está acontecendo: **o mesmo cliente requisitando o mesmo recurso
repetidamente**. São várias requisições, mas todas para exatamente o mesmo perfil.

Não há aqui nenhuma evidência de que o cliente esteja tentando **descobrir**
recursos adicionais ou explorar a aplicação. Esse tipo de atividade é
completamente normal: aplicações pedem o mesmo dado várias vezes conforme o
usuário atualiza a página, revisita conteúdo ou executa ações de rotina.

> Repetitivo, mas não suspeito. Guarde essa distinção.

## Parte 2 — como é a enumeração

Ainda na Kali, gere uma série de requisições com IDs **sequenciais**:

\`\`\`bash
for id in 1001 1002 1003 1004 1005; do
  curl -s "http://192.168.56.63:5000/api/users/$id/profile"
  echo
done
\`\`\`

O laço percorre todos os IDs e traz o perfil de cada um. Isso simula alguém
**incrementando o identificador de objeto** só para ver que tipo de dado volta.
Repare que a única coisa que muda na requisição é o ID; todo o resto permanece
igual.

Volte ao log da Ubuntu:

\`\`\`bash
cat api_access.log
\`\`\`

## O padrão que importa

Acesso a API, por si só, é normal — já estabelecemos isso na parte 1. O padrão que
interessa aqui é outro:

> **IDs de objeto incrementando, vindos da mesma origem.**

O IP requisitante nunca muda, e o perfil pedido sobe de um em um. Esse padrão é
classicamente associado a **enumeração**, porque o requisitante parece estar
explorando sistematicamente os recursos disponíveis. Em vez de pedir o mesmo
registro várias vezes, ele está **caminhando por uma série de identificadores**
para ver o que existe.

É aqui que a sua atenção deve subir. Enumeração costuma ser um dos primeiros
passos do atacante depois de descobrir uma API e antes de conseguir acessar dado
sensível — ele precisa aprender quais recursos existem e como são identificados.

## A parte difícil: não concluir demais

Ver a enumeração levanta uma pergunta legítima: *por que este usuário está pedindo
todos esses perfis, e ele deveria poder acessá-los?*

Isso nos leva a **broken object level authorization**, que ocorre quando a
aplicação não verifica se o usuário está autorizado a acessar aquele objeto
específico. Se eu só deveria acessar o meu perfil (1001) mas troco o ID na URL e
recebo o perfil de outra pessoa, isso é BOLA.

**Mas cuidado para não pular para essa conclusão aqui.**

Com base nos logs, podemos afirmar com confiança que há **evidência de
enumeração**: mesmo IP, perfis requisitados em sequência crescente. O que **não**
dá para determinar só por esses logs é se a aplicação expôs dado indevidamente.
Provar BOLA exigiria evidência adicional mostrando que o requisitante **não estava
autorizado** àqueles perfis e que a aplicação **ainda assim devolveu o dado**.

> Enumeração diz que alguém está **olhando**. BOLA diria que essa pessoa
> **conseguiu acessar** algo que não deveria.

Essa distinção separa o analista bom do analista apressado: bons analistas se
prendem ao que a evidência de fato sustenta. Os logs aqui sustentam enumeração —
e, sozinhos, não provam broken object level authorization.
`.trim(),
      pontosChave: [
        "Requisições repetidas ao mesmo recurso, de um mesmo cliente, são normalmente atividade legítima",
        "O indicador de enumeração é o ID de objeto incrementando a partir da mesma origem",
        "Enumeração costuma preceder o acesso a dado sensível: o atacante mapeia o que existe",
        "Enumeração prova que alguém está olhando; não prova que alguém acessou o que não devia",
        "Afirmar BOLA exige evidência de que o requisitante não estava autorizado e mesmo assim recebeu o dado",
        "Relate o que a evidência sustenta — e diga explicitamente o que ainda falta para concluir mais",
      ],
      dicaExame:
        "Quando o enunciado mostrar um trecho de log de API, leia duas coisas antes de responder: a origem (muda ou não?) e o recurso (repete ou incrementa?). Repetição do mesmo recurso tende a ser normal; incremento sequencial é enumeração. E desconfie da alternativa que afirma vulnerabilidade explorada quando o log só mostra tentativa.",
      tarefa:
        "Escreva a nota de investigação que você entregaria ao seu líder de turno sobre este caso, em três frases: o que a evidência mostra, o que ela não permite afirmar e qual evidência adicional você pediria.",
    },
    {
      id: "s04l07",
      titulo: "Gestão de dispositivos",
      resumo:
        "MDM, MAM, UEM, EDR, zero trust e IoT: por que dispositivo não gerenciado é ponto cego de monitoramento.",
      minutos: 18,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## Um problema maior do que parece

Celulares, notebooks, tablets, sensores de IoT, TVs de sala de reunião,
funcionários conectando aparelho pessoal no Wi-Fi corporativo. **Cada um deles é
porta de entrada potencial** se não for gerenciado e monitorado.

Gestão de dispositivos é controlar, configurar, monitorar e proteger os aparelhos
que se conectam à rede e acessam os recursos da organização. Isso inclui o
notebook corporativo tradicional, mas também celular, tablet, dispositivo de IoT e
endpoint de trabalho remoto.

> Você está no SOC e recebe alerta de autenticação incomum. Rastreia até um
> dispositivo. É um endpoint corporativo gerenciado, com toda a sua ferramenta de
> segurança instalada? Ou é um celular pessoal que entrou no Wi-Fi corporativo e
> não tem controle nenhum? **A sua resposta muda completamente conforme a
> resposta a essa pergunta.**

Por isso gestão de dispositivos não é só problema de TI: é problema de operações
de segurança.

## MDM, MAM e UEM

A prova testa essa distinção diretamente.

**MDM — mobile device management.** Gerencia o **dispositivo inteiro**. Permite
empurrar configuração, aplicar política, apagar remotamente e acompanhar
localização e estado. Se um aparelho com e-mail corporativo é perdido ou roubado, é
o MDM que permite apagar aquilo antes que alguém leia os e-mails. Exemplos:
Microsoft Intune, Jamf (para Apple), VMware Workspace ONE.

**MAM — mobile application management.** Gerencia **apenas as aplicações e os
dados corporativos** no dispositivo. É a abordagem certa para **BYOD** (*bring your
own device*): o funcionário mantém o controle do celular pessoal, mas os apps e
dados da empresa continuam gerenciados e protegidos.

**UEM — unified endpoint management.** A evolução moderna do MDM: gerencia o
**ecossistema inteiro** — notebooks, desktops, celulares, tablets e IoT — a partir
de um console único. Exemplos: Microsoft Intune, VMware Workspace ONE, IBM MaaS360.

| Plataforma | Escopo |
| --- | --- |
| MDM | O dispositivo inteiro |
| MAM | Somente aplicações e dados corporativos |
| UEM | Toda a frota, de todos os tipos, num console só |

Para o analista, o UEM é a **fonte única de verdade** sobre inventário e
conformidade: é onde você começa quando precisa saber se um dispositivo é
gerenciado, que sistema operacional roda, quais ferramentas de segurança tem e se
está em conformidade com a política.

Do lado do MDM, plataformas como o Intune geram logs de conformidade e de
inscrição que fluem para o SIEM. Ao investigar um dispositivo móvel suspeito, você
confere no console se ele está inscrito, se está em conformidade e quais apps tem
instalados. Um aparelho **não conforme** ou com **jailbreak** é bandeira vermelha
imediata.

## EDR e o ponto cego

**EDR** (*endpoint detection and response*) é a sua ferramenta principal de
visibilidade de endpoint. Agentes rodam em notebooks e estações e mostram em tempo
real o que acontece: processos em execução, conexões de rede, arquivos criados ou
modificados, mudanças de registro. Plataformas modernas: CrowdStrike Falcon,
SentinelOne, Microsoft Defender for Endpoint.

E aqui está o detalhe que amarra este tópico à sua estratégia de monitoramento:

> **EDR só enxerga dispositivos gerenciados e inscritos.**

Se um aparelho pessoal, não gerenciado, se conecta à rede e é usado para acessar
recursos corporativos, você tem **zero telemetria de EDR** sobre ele. Isso é ponto
cego — e atacantes sabem disso.

**Dispositivo não gerenciado é lacuna de monitoramento.** Essa frase é,
literalmente, um tema de prova.

## Zero trust e acesso condicional

No modelo de rede tradicional, uma vez que o dispositivo está na rede corporativa,
ele é confiável. No modelo **zero trust**, nenhum dispositivo é confiável por
padrão: a confiança é verificada continuamente com base na **postura do
dispositivo**.

Políticas de **acesso condicional** — geridas em plataformas como Microsoft Entra
ID ou Okta — checam a conformidade antes de liberar acesso:

- o dispositivo está inscrito no MDM?
- roda sistema operacional aprovado?
- tem proteção de endpoint habilitada?

Só se as condições forem atendidas o acesso é concedido.

Ao investigar uma anomalia de acesso, consulte os **logs de acesso condicional** da
sua plataforma de identidade: eles dizem se o dispositivo passou ou falhou nas
checagens de conformidade no momento do acesso.

> Autenticação bem-sucedida a partir de um dispositivo **não conforme** merece ser
> sinalizada: o acesso condicional deveria ter bloqueado, então ou a política está
> mal configurada, ou algo mais sério está acontecendo.

## IoT

Dispositivos de IoT — câmeras inteligentes, sensores de HVAC, leitores de crachá,
TVs — estão em toda organização moderna e são, na média, péssimos do ponto de
vista de segurança:

- rodam firmware embarcado que nunca é atualizado
- usam credenciais padrão
- normalmente não conseguem rodar agente de endpoint
- costumam estar na **mesma rede** dos seus sistemas críticos

Quem compromete a TV inteligente da sala de reunião pode usá-la como ponto de
apoio para pivotar na rede corporativa. Isso já aconteceu.

Cenário comum de prova: um diagrama de rede com dispositivos de IoT e a pergunta
sobre o risco de segurança ou a abordagem correta de segmentação. A resposta quase
sempre envolve **isolar os dispositivos de IoT num segmento de rede ou VLAN
separada**, onde eles não conversem diretamente com os sistemas corporativos.
`.trim(),
      pontosChave: [
        "MDM gerencia o dispositivo inteiro; MAM gerencia só app e dado corporativo (a escolha certa para BYOD)",
        "UEM gerencia toda a frota num console e é a fonte de verdade de inventário e conformidade",
        "EDR só dá visibilidade em dispositivo gerenciado e inscrito — o não gerenciado é ponto cego",
        "Zero trust verifica postura continuamente; acesso condicional checa conformidade antes de liberar",
        "Autenticação bem-sucedida de dispositivo não conforme é sinal de política errada ou de algo pior",
        "IoT roda firmware sem patch e credencial padrão: a resposta é segmentar em VLAN dedicada",
      ],
      dicaExame:
        "Saiba distinguir MDM, MAM e UEM — a pergunta costuma vir disfarçada de cenário de BYOD, e nesse caso a resposta é MAM. Em cenário com IoT, a remediação correta quase sempre é segmentação de rede, não instalação de agente (esses dispositivos normalmente não suportam agente).",
      tarefa:
        "Olhe o seu próprio ambiente — laboratório, trabalho ou setup de teste — e identifique um dispositivo que estaria fora do alcance da sua ferramenta de segurança padrão. Que visibilidade você tem do comportamento dele, e o que você faria se ele fosse usado como vetor de ataque?",
    },
    {
      id: "s04l08",
      titulo: "Checkpoint: infraestrutura de sistemas",
      resumo:
        "Consolidação das sete lições: arquiteturas, responsabilidade compartilhada, virtualização, containers, APIs e gestão de dispositivos.",
      minutos: 20,
      tipo: "checkpoint",
      rota: "/simulado?secao=s04",
    },
  ],
};
