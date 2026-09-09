import type { Secao } from "../types";

export const s06: Secao = {
  id: "s06",
  numero: 6,
  titulo: "Infraestrutura crítica: OT, ICS e SCADA",
  fase: "f1",
  dominio: "d1",
  descricao:
    "Onde a falha deixa de ser vazamento de dado e vira consequência física. Rede elétrica, tratamento de água, hospitais — e por que aqui a tríade CIA inverte para AIC.",
  objetivos: [
    "Explicar o que é infraestrutura crítica e o papel de CISA e ISACs",
    "Distinguir OT de TI e descrever as camadas do modelo Purdue",
    "Diferenciar ICS, DCS e SCADA, e saber quando cada um se aplica",
    "Reconhecer indicadores de comprometimento específicos de OT",
    "Escolher controles compensatórios quando não é possível aplicar patch",
    "Justificar por que a resposta em OT é passiva e coordenada com a operação",
  ],
  licoes: [
    {
      id: "s06l01",
      titulo: "Introdução à infraestrutura crítica",
      resumo:
        "Os 16 setores da CISA, o papel dos ISACs no compartilhamento de inteligência e a inversão da tríade CIA que a prova adora cobrar.",
      minutos: 18,
      tipo: "aula",
      objetivo: "1.1",
      gratis: true,
      conteudo: `
## Quando a falha machuca gente de verdade

Tudo que você aprendeu até aqui sobre arquitetura e operações de segurança
continua valendo. O que muda é a consequência.

> Imagine acordar amanhã sem energia na cidade, sem água na torneira, sem acesso
> à conta bancária e sem atendimento de emergência. É isso que um ataque
> bem-sucedido a infraestrutura crítica produz.

E não é hipótese. Em 2021, o ransomware contra a **Colonial Pipeline** parou a
distribuição de combustível no sudeste dos Estados Unidos, gerando
desabastecimento, compra por pânico e declaração de emergência nacional — tudo a
partir de um ataque a uma empresa de dutos.

**Infraestrutura crítica** é o conjunto de sistemas, ativos e redes tão essenciais
à segurança nacional, à saúde pública, à estabilidade econômica e à vida cotidiana
que sua interrupção ou destruição traria consequências graves para a sociedade.

## Isso não é problema só de governo

É o ponto que pega muito analista desprevenido: **a maior parte da infraestrutura
crítica é de propriedade e operação privada**. Ou seja, analista de SOC do setor
privado — não só agência de governo — está na linha de frente.

Se você trabalha com energia, utilities, saúde, transporte ou serviços
financeiros, este é o seu mundo.

## Os 16 setores

A CISA (*Cybersecurity and Infrastructure Security Agency*) identifica
oficialmente **16 setores** de infraestrutura crítica. Para a prova você não
precisa decorar os 16, mas precisa entender o conceito e por que eles recebem
atenção especial. Os mais cobrados:

**Energia** — geração e distribuição elétrica, dutos de óleo e gás. Está no topo
porque um ataque aqui cascateia para todos os outros setores quase imediatamente.

**Água e esgoto** — em 2021, um atacante acessou a estação de tratamento de água
de **Oldsmar, na Flórida**, e elevou brevemente o nível de hidróxido de sódio a
concentrações perigosas, até um operador perceber. Não é roteiro de filme:
aconteceu.

**Saúde** — ransomware em hospital não custa só dinheiro. Cirurgia adiada,
prontuário indisponível e dispositivo médico desabilitado colocam paciente em
risco físico direto.

**Serviços financeiros**, **transporte** e **comunicações** completam os setores
mais referenciados na prova.

## ISACs: como o setor compartilha inteligência

Cada setor tem um **ISAC** (*Information Sharing and Analysis Center*):
organizações onde empresas do mesmo setor compartilham threat intelligence,
indicadores de comprometimento e boas práticas defensivas.

| ISAC | Setor |
| --- | --- |
| **E-ISAC** | Energia elétrica |
| **H-ISAC** | Saúde |
| **FS-ISAC** | Serviços financeiros |

Como analista atuando num desses setores, você provavelmente vai consumir os feeds
do ISAC direto no SIEM ou na plataforma de threat intelligence.

> A inteligência do ISAC é **específica do setor** — muito mais direcionada ao seu
> ambiente do que feed comercial genérico. Vale checar se a sua organização é
> membro e se os feeds estão sendo ingeridos no Microsoft Sentinel ou no Splunk.

## Por que proteger isso é diferente

Quase tudo que você estudou até aqui se aplica a ambientes de **TI**: servidores,
endpoints, cargas de nuvem, equipamentos de rede.

Infraestrutura crítica é diferente porque mistura TI com **tecnologia operacional
(OT)**. Sistemas de OT controlam processos físicos no mundo real: sensores,
atuadores e controladores gerenciando reguladores de tensão, pressão de água,
maquinário industrial.

Esses sistemas foram construídos décadas atrás, muitas vezes **antes de
cibersegurança ser uma consideração de projeto**, e boa parte nunca foi pensada
para estar conectada à internet. Hoje está. É aí que mora o risco real.

Essa **convergência TI/OT** é um dos desafios definidores da era atual, e é o fio
condutor das próximas cinco lições.

## MITRE ATT&CK for ICS

O framework tem uma matriz específica para ambientes de sistemas de controle
industrial, em attack.mitre.org/matrices/ics. Ela mapeia táticas e técnicas
próprias de OT — inibir funções de resposta, manipular lógica de controle, causar
dano físico.

Ao investigar incidente em ambiente conectado a OT, abra essa matriz e mapeie o
que você está vendo. Ela diz em que ponto da cadeia o adversário está e o que ele
provavelmente fará em seguida.

## A virada de mentalidade

Em segurança de TI, priorizamos **confidencialidade, integridade e
disponibilidade** — a tríade CIA.

> Em OT e infraestrutura crítica, essa ordem se inverte: **AIC**.
> **Disponibilidade vem primeiro**, porque indisponibilidade significa
> consequência física.

Essa distinção o exame adora testar.
`.trim(),
      pontosChave: [
        "Infraestrutura crítica é o que, se parar, ameaça segurança nacional, saúde pública ou economia",
        "A maior parte é privada: analista de SOC do setor privado está na linha de frente",
        "A CISA identifica 16 setores; energia, água, saúde, finanças e transporte são os mais cobrados",
        "ISACs compartilham inteligência por setor: E-ISAC, H-ISAC e FS-ISAC pelo nome",
        "Convergência TI/OT é o desafio central: sistemas legados expostos ao cenário de ameaças moderno",
        "Em OT a tríade CIA vira AIC — disponibilidade primeiro, porque parar tem consequência física",
      ],
      dicaExame:
        "Cenários perguntam qual organização uma entidade de infraestrutura crítica acionaria ou qual mecanismo de compartilhamento usaria: a resposta quase sempre aponta para o ISAC do setor ou para a CISA. E esteja pronto para distinguir prioridades de segurança de TI das de OT.",
      tarefa:
        "Abra a página de setores da CISA, escolha um setor que você conhece menos e pergunte a si mesmo como seria um ataque bem-sucedido contra ele no mundo real. É exatamente esse tipo de raciocínio que a prova testa.",
      recursos: [
        {
          titulo: "CISA — Critical Infrastructure Sectors",
          url: "https://www.cisa.gov/topics/critical-infrastructure-security-and-resilience/critical-infrastructure-sectors",
        },
        { titulo: "MITRE ATT&CK for ICS", url: "https://attack.mitre.org/matrices/ics/" },
      ],
    },
    {
      id: "s06l02",
      titulo: "Fundamentos de tecnologia operacional (OT)",
      resumo:
        "TI processa dado, OT controla coisa. O modelo Purdue, PLCs, HMIs, historiadores — e o air gap que deixou de existir.",
      minutos: 20,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## TI processa dado. OT controla coisa.

**Tecnologia operacional** é o hardware e o software que monitora e controla
dispositivos, processos e eventos físicos no mundo real. Não máquina virtual, não
carga de nuvem — coisa física: válvulas, bombas, turbinas, esteiras, disjuntores.

> Seu SIEM processa dado. O sistema de controle que regula a pressão num duto de
> gás natural aciona uma válvula física no mundo real. São trabalhos
> fundamentalmente diferentes, e essa diferença dirige todo desafio de segurança
> daqui para a frente.

## O modelo Purdue

Ambientes de OT são construídos em camadas, descritas pelo **modelo Purdue**
(*Purdue Enterprise Reference Architecture*). Mesmo sendo revisitado em ambientes
modernos, ele continua aparecendo na prova e na documentação de fornecedor.

### Sensores e atuadores

No nível mais baixo está o processo físico. **Sensores** medem condições reais —
temperatura, pressão, vazão, tensão — e mandam esse dado para cima.
**Atuadores** ficam do lado da saída: recebem comando e fazem algo físico
acontecer, como abrir uma válvula, ligar um motor ou acionar um relé.

### PLCs

Entre sensores, atuadores e os sistemas de controle acima estão os
**controladores lógicos programáveis (PLCs)**: computadores industriais
especializados, robustos, confiáveis, que respondem a entradas e saídas em tempo
real.

O PLC lê o sensor, roda sua lógica e manda o comando ao atuador — num laço que se
repete muitas vezes por segundo. São programados em linguagens como **Ladder
Logic**, que parece esquema elétrico de relé porque foi desenhada por engenheiros,
não por desenvolvedores de software.

> Não são computadores de propósito geral. Rodam um trabalho só, continuamente.

**Para investigação isso importa:** PLCs têm capacidade de log **extremamente
limitada** comparada a sistemas de TI. Ao investigar incidente em OT, você
frequentemente descobre que o próprio PLC não gera o log detalhado a que você está
acostumado. É por isso que plataformas de monitoramento de nível mais alto e
análise de tráfego de rede se tornam críticas.

### HMIs

**Human-Machine Interfaces** são as telas e painéis que o operador usa para
monitorar e interagir com o ambiente. Pode ser um painel *touchscreen* no chão de
fábrica, ou software rodando numa estação Windows na sala de controle.

**Esse segundo caso é uma preocupação séria de segurança.** HMI em estação Windows
é um sistema de TI fortemente acoplado a processos de OT. Precisa conversar com
PLCs e costuma rodar versão antiga e sem patch do Windows — porque aplicar patch
em OT é complicado e arriscado.

> Aplicar patch num servidor web custa alguns minutos de indisponibilidade numa
> janela de manutenção. Aplicar patch num sistema de controle ligado ao circuito
> de refrigeração de uma usina nuclear exige coordenação com engenheiros de
> segurança operacional, times de operação e reguladores. Pode acontecer uma vez
> por ano.

Quando patch não é viável, controles compensatórios — segmentação de rede,
*application whitelisting* e inspeção profunda de pacotes — viram a defesa
primária. A lição 6 desta seção trata deles em detalhe.

### Servidores de controle e historiadores

Acima dos HMIs ficam os **servidores de controle**, que coordenam a operação geral
e gerenciam o fluxo de comandos e dados entre a rede de negócio e a rede de OT.

O **data historian** é um banco especializado que guarda todo o dado operacional
histórico gerado pelo laço de controle. É o banco de séries temporais do OT:
registra leituras de pressão, logs de temperatura, taxas de produção — cada saída
de cada sensor ao longo do tempo.

> Numa investigação de incidente em OT, **o historiador pode ser o seu melhor
> amigo**. Com acesso a ele, você olha os valores de processo ao longo do tempo e
> identifica anomalias — um pico súbito de pressão, um movimento incomum de
> válvula — que precederam o incidente. É o equivalente em OT a revisar logs no
> SIEM para montar a linha do tempo.

## O air gap que sumiu

Historicamente, redes de OT eram **fisicamente isoladas** da rede corporativa e da
internet. Esse era o controle de segurança primário: sem conexão de rede, não há
superfície de ataque remota.

Essa era acabou, em larga medida. Ambientes modernos estão cada vez mais conectados
à rede corporativa por razões de negócio — monitoramento remoto, manutenção
preditiva, integração com cadeia de suprimentos, analytics em nuvem.

> Quando você conecta uma rede de OT que foi projetada **assumindo air gap** a uma
> rede corporativa de TI, você herda todas as ameaças dela num ambiente que nunca
> foi desenhado para lidar com elas.

Esse é o desafio fundamental da segurança de OT hoje.

## Uma cultura, não só uma técnica

Disponibilidade é a prioridade máxima porque parada em OT significa consequência
física. Uma planta química que para no meio do processo pode gerar reação
perigosa; uma rede elétrica que cai no inverno pode custar vidas.

Por isso operadores de OT resistem fortemente a qualquer coisa que possa
interromper a operação — incluindo varredura de segurança, patch e mudança. Como
analista, você precisa entender e respeitar essa dinâmica: não é só um desafio
técnico, é uma **cultura operacional onde uptime é sagrado**.
`.trim(),
      pontosChave: [
        "TI processa dado; OT controla processo físico — a distinção dirige toda decisão de segurança",
        "Modelo Purdue: sensores e atuadores, PLCs, HMIs, servidores de controle, historiador, rede corporativa",
        "PLC roda laço sense-compare-act contínuo e gera pouquíssimo log",
        "HMI em estação Windows legada é a maior preocupação de segurança da camada",
        "O data historian é o banco de séries temporais do OT e recurso forense central",
        "O air gap acabou: convergência TI/OT expôs ambientes projetados para isolamento",
      ],
      dicaExame:
        "Uma pergunta muito comum é por que sistemas de OT são difíceis de aplicar patch e qual o controle compensatório correto. A resposta nunca é simplesmente 'aplicar o patch'. E lembre do modelo Purdue pelo nome e pela estrutura.",
      tarefa:
        "Desenhe o modelo Purdue de memória. Depois percorra cada nível e pergunte: por onde um atacante tentaria entrar, e o que ele faria depois de estar ali?",
    },
    {
      id: "s06l03",
      titulo: "Sistemas de controle industrial (ICS)",
      resumo:
        "A implementação concreta do OT: componentes, DCS contra SCADA, protocolos sem segurança nativa e por que varredura ativa é proibida.",
      minutos: 20,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## OT é a categoria, ICS é a implementação

Um **sistema de controle industrial** é um conjunto de hardware e software que
automatiza fluxos e processos industriais, controlando o maquinário usado em usinas
de energia, estações de tratamento de água, refinarias e linhas de manufatura.

> Pense no termostato da sua casa: ele lê a temperatura, compara com o valor
> desejado e liga ou desliga o aquecimento. Um laço de controle simples —
> **sentir, comparar, agir**. Agora escale isso para um sistema gerenciando 500
> válvulas numa refinaria química, coordenando milhares de sensores e atuadores em
> várias instalações, tudo simultaneamente. Isso é um ICS.

## Os componentes

**PLC** — o dispositivo de controle de linha de frente. Roda a lógica dos processos
individuais: lê entradas de sensor, executa as instruções programadas e envia
comandos aos atuadores, no laço contínuo.

**Servidor de controle** — fica acima dos PLCs e governa o sistema de automação
como um todo. Gerencia o estado do processo, coordena entre PLCs e dá visibilidade
aos operadores. É o cérebro que amarra os PLCs individuais num processo industrial
coerente.

**HMI** — a interface que o operador usa para monitorar, ajustar parâmetros e
intervir quando algo dá errado. Pode ser hardware industrial dedicado no chão de
fábrica ou aplicação rodando em estação Windows na sala de controle.

**Data historian** — o banco de séries temporais que guarda todo dado operacional:
cada leitura de sensor, cada valor de processo, cada ação de operador.

> O historiador é **mina de ouro forense**. Investigando anomalia num ICS, você
> consulta valores históricos e procura desvio de baseline: *uma válvula atuou fora
> da sua programação normal? as leituras mudaram no mesmo instante em que um evento
> de rede suspeito foi registrado?* Correlacionar historiador com log de rede monta
> a linha do tempo e revela se o processo foi manipulado.

## DCS e SCADA

Quando um ICS gerencia automação **dentro de um único site**, chama-se
**DCS** (*distributed control system*). O "distribuído" se refere ao controle estar
espalhado por muitos PLCs e controladores locais pela instalação, em vez de
centralizado num único computador. É típico de operação grande de site único:
refinaria, planta química, usina de geração.

Quando é preciso gerenciar operações em **múltiplos sites geograficamente
distribuídos**, entra o **SCADA** — tema da próxima lição.

> A distinção que a prova cobra: **DCS gerencia um site. SCADA gerencia vários
> sites por rede de longa distância.**

## Protocolos industriais

Sistemas de TI usam TCP/IP, HTTP, TLS. Ambientes de ICS usam protocolos
industriais especializados, projetados para confiabilidade e temporização
determinística — **não para segurança**.

| Protocolo | Característica |
| --- | --- |
| **Modbus** | Dos mais antigos e usados. **Sem autenticação, sem criptografia** — quem tem acesso à rede envia comando |
| **DNP3** | Forte em utilities, energia e água. Tem alguns recursos de autenticação, mas segurança não era objetivo primário |
| **EtherNet/IP** e **PROFINET** | Ethernet industrial moderno; integram melhor com TI, mas ainda carregam premissas legadas |

**Por que isso importa para você:** monitorando tráfego num ambiente de ICS, você
está olhando protocolos fundamentalmente diferentes daqueles para os quais as
regras do seu SIEM foram escritas. **Comando Modbus anômalo não dispara regra de
detecção de TI.**

## Ferramentas que entendem OT

É aqui que entram plataformas construídas para visibilidade de rede em ICS:
**Claroty**, **Dragos** e **Nozomi Networks**. Elas entendem os protocolos
industriais, fazem baseline das comunicações normais de processo e alertam no
desvio.

Não dá para simplesmente jogar um IDS de rede padrão no ambiente e considerar
resolvido. É preciso monitoramento que saiba interpretar protocolo industrial.

## Varredura ativa é proibida

Ponto que a prova cobra e que vale gravar: **varredura ativa do tipo que você faz
com Nessus em TI costuma ser proibida em ICS**, porque enviar pacotes inesperados a
PLCs e sistemas de controle pode derrubá-los.

Dragos Platform e Nozomi Networks Guardian oferecem inventário de ativos, detecção
de anomalia de protocolo e **monitoramento passivo**, que não perturba o ICS. A
lição 6 volta a esse ponto.
`.trim(),
      pontosChave: [
        "ICS é a categoria de OT que automatiza processo industrial: PLCs, servidor de controle, HMI e historiador",
        "PLC roda o laço local; servidor de controle coordena; HMI é a interface; historiador guarda a série temporal",
        "DCS gerencia um único site; SCADA gerencia múltiplos sites — distinção cobrada diretamente",
        "Modbus não tem autenticação nem criptografia; DNP3 tem pouco; OPC-UA é o moderno com segurança",
        "Ferramentas de TI não entendem protocolo industrial: use Dragos, Nozomi ou Claroty",
        "Varredura ativa é tipicamente proibida em ICS porque pode derrubar dispositivo de campo",
      ],
      dicaExame:
        "Cenário com HMI vulnerável rodando Windows: a resposta correta quase nunca é aplicar patch imediatamente, e sim compensar com controle de rede, application whitelisting e monitoramento reforçado. Disponibilidade é a prioridade máxima em ICS.",
      tarefa:
        "Pense neste cenário: se um atacante obtivesse acesso a um HMI numa rede DCS, o que ele conseguiria fazer, e que indicadores você veria no historiador ou na rede?",
    },
    {
      id: "s06l04",
      titulo: "SCADA",
      resumo:
        "Controle supervisório em escala regional: MTU, RTUs, protocolos de longa distância, e o Stuxnet como modelo de ameaça definidor.",
      minutos: 20,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## Um dos temas mais cobrados da seção

**SCADA** (*supervisory control and data acquisition*) é um sistema de controle
industrial de larga escala que gerencia e monitora processos físicos em **múltiplos
sites geograficamente distribuídos**, às vezes cobrindo estados ou regiões
inteiras por rede de longa distância.

> Uma refinaria usa **DCS** para gerenciar os processos automatizados dentro da
> planta. A empresa de dutos que move petróleo de dezenas de poços, em vários
> estados, até aquela refinaria usa **SCADA** para monitorar e controlar todas as
> estações de bombeamento, válvulas e sensores ao longo do corredor inteiro.

**DCS: um site, controle local. SCADA: muitos sites, controle supervisório remoto
sobre WAN.**

## A arquitetura

### Servidor SCADA (MTU)

No topo está o servidor SCADA, também chamado **master terminal unit (MTU)**. É o
sistema central de gerenciamento: coleta dado de todos os dispositivos de campo,
processa e dá ao operador uma visão centralizada da operação inteira. Também envia
comandos supervisórios para o campo.

> A palavra **supervisório** importa. O SCADA tipicamente **não** envia comando de
> baixo nível direto ao PLC, como faz o servidor de controle de um DCS. Ele envia
> comando de nível mais alto, e os dispositivos de campo locais cuidam do detalhe.
> **A prova testa essa distinção.**

### RTUs

Em cada site remoto há uma **remote terminal unit (RTU)**. São parecidas com PLCs,
mas projetadas para ambiente remoto e distribuído: operam em condições severas, com
manutenção local mínima, e se comunicam de volta ao servidor SCADA por enlaces de
longa distância.

SCADA antigo usava comunicação serial, rádio e até enlace por satélite. SCADA
moderno usa cada vez mais redes celulares e comunicação sobre IP.

> **É exatamente nessa transição que o risco escala.** Quando a comunicação sai de
> enlaces seriais e de rádio dedicados para conexões celulares ou de internet, a
> superfície de ataque se expande muito: o atacante não precisa mais de acesso
> físico à estação de bombeamento remota, ataca o canal de comunicação IP.

Ao revisar arquitetura SCADA, uma das primeiras coisas a verificar é **como o
servidor e as RTUs se comunicam**. Comunicação celular ou pela internet sem
criptografia e autenticação adequadas é vulnerabilidade crítica. Procure túnel VPN,
criptografia e autenticação por certificado nos enlaces WAN — **a ausência disso é
um achado**.

### HMI

Como no DCS, o operador monitora e controla por um HMI. Os HMIs de SCADA costumam
exibir **diagramas mímicos**: representação visual dinâmica do processo físico —
quais válvulas estão abertas, quais as leituras de pressão, quais alarmes estão
ativos.

E aqui está o desafio: **estações de HMI SCADA frequentemente rodam sistemas
operacionais obsoletos** — Windows 7, em casos extremos Windows XP — porque o
fornecedor do software SCADA às vezes não suporta versões mais novas, e o operador
não atualiza se a atualização puder quebrar a aplicação.

> Há uma restrição operacional real aqui. **Não é negligência** — mas cria
> exposição séria a vulnerabilidade.

## Protocolos de SCADA

Além dos protocolos de ICS da lição anterior:

| Protocolo | Uso |
| --- | --- |
| **DNP3** | Extremamente comum em SCADA de energia e água; suporta *polling* distribuído, com o servidor requisitando dado das RTUs periodicamente |
| **OPC-UA** | Mais moderno, com autenticação e criptografia embutidas. Cada vez mais usado em implantações novas — é sinal de progresso |
| **ICCP** | Comunicação **entre centros de controle** de utilities. Quando duas concessionárias trocam dado operacional, costuma ser por ICCP |

> Comunicação SCADA é **altamente repetitiva e previsível**. Por isso, desvio de
> baseline é significativo: comando enviado em horário atípico ou vindo de endereço
> de origem inesperado é indicador forte de possível manipulação. Claroty e Dragos
> fazem esse baseline automaticamente.

## Stuxnet: o modelo de ameaça

Descoberto em **2010**, o Stuxnet foi malware sofisticado desenhado especificamente
para atacar sistemas SCADA que controlavam centrífugas de enriquecimento de urânio
no Irã.

O que o tornou notável foi a **precisão**: mirava uma configuração SCADA Siemens
específica, ligada a um tipo específico de PLC, rodando um processo específico.

E o que ele fez é o ponto central para você:

> Ele **manipulou a lógica de controle da velocidade das centrífugas enquanto
> devolvia leituras falsas de normalidade ao HMI**. Os operadores não viam nada de
> errado. Enquanto isso, as centrífugas giravam em velocidades destrutivas.
> Equipamento físico foi destruído, e a operação não fazia ideia.

É este o modelo de ameaça que a segurança de SCADA existe para prevenir: **quem
entra pode manipular o processo físico enquanto esconde o que está fazendo dos
operadores**.

O MITRE ATT&CK for ICS cobre isso sob as táticas **Impair Process Control** e
**Inhibit Response Function**.

### Spoofing de valor de processo

Você não precisa de todo detalhe técnico do Stuxnet, mas precisa do conceito. Fique
atento a questões que apresentem cenário onde **as leituras de processo parecem
normais mas o equipamento físico se comporta de forma inesperada**.

> A conclusão analítica correta é que **o dado de processo pode ter sido
> falsificado pelo atacante**. Isso se chama *spoofed process value attack*, e é
> conceito-chave de ameaça em SCADA.
`.trim(),
      pontosChave: [
        "SCADA cobre múltiplos sites por WAN; DCS cobre um site localmente",
        "Arquitetura: servidor SCADA (MTU), comunicação WAN, RTUs em campo e HMI de operador",
        "SCADA envia comando supervisório de alto nível; o DCS envia comando direto de baixo nível ao PLC",
        "A migração de serial e rádio para IP e celular expandiu muito a superfície de ataque",
        "HMI SCADA em SO legado é restrição operacional real, não negligência — mas é exposição",
        "Stuxnet define o modelo: manipular o processo físico enquanto devolve leitura normal ao operador",
      ],
      dicaExame:
        "Se o cenário disser que as leituras estão normais mas o equipamento se comporta de forma estranha, a resposta é spoofing de valor de processo — o dado foi falsificado. E não confunda MTU (servidor central) com RTU (dispositivo de campo remoto).",
      tarefa:
        "Procure a tática Impair Process Control no MITRE ATT&CK for ICS e leia as técnicas listadas. Pense em como cada uma se manifestaria num ambiente SCADA e que indicadores geraria.",
      recursos: [
        {
          titulo: "MITRE ATT&CK for ICS — matriz",
          url: "https://attack.mitre.org/matrices/ics/",
        },
      ],
    },
    {
      id: "s06l05",
      titulo: "Cenário de ameaças em OT, ICS e SCADA",
      resumo:
        "Quem ataca, por onde entra e o que faz depois — e os indicadores de comprometimento que só existem em ambiente industrial.",
      minutos: 20,
      tipo: "aula",
      objetivo: "1.2",
      conteudo: `
## Pré-posicionamento: um modelo de ameaça diferente

Atores estatais miram infraestrutura crítica há anos, e já não é só espionagem.

> Estados-nação estão **se pré-posicionando** dentro de redes de infraestrutura
> crítica especificamente para ter a **capacidade** de causar disrupção ou dano
> físico quando as condições geopolíticas exigirem.

Ou seja: adversários podem já estar sentados dentro da rede elétrica, da água ou de
dutos, sem fazer nada, **esperando**. É um modelo de ameaça fundamentalmente
diferente do de um ambiente de TI padrão.

Operadores de ransomware, por sua vez, descobriram que organizações de
infraestrutura crítica **pagam rápido**, porque a parada tem consequência imediata
e severa.

> No caso da Colonial Pipeline, os atacantes **nem chegaram a violar a rede de
> OT**. Atingiram o lado de TI, e a Colonial parou a operação preventivamente, por
> precaução. É o tamanho do medo de disrupção em OT: a mera possibilidade bastou
> para interromper tudo.

## Quem ataca

### Atores estatais

Os mais sofisticados e perigosos. Grupos atribuídos a Rússia, China, Irã e Coreia
do Norte conduziram operações contra infraestrutura crítica.

**Sandworm**, atribuído ao GRU russo, é responsável pelos ataques à rede elétrica
ucraniana em **2015 e 2016**, que causaram apagões reais afetando centenas de
milhares de pessoas — os primeiros ataques cibernéticos confirmados a causar
interrupção de energia.

**Volt Typhoon**, atribuído à China, foi documentado se pré-posicionando dentro de
infraestrutura crítica americana, incluindo sistemas de energia e água,
especificamente para preservar a capacidade de disrupção num conflito futuro. É o
modelo *living off the land* em escala nacional: usar ferramentas legítimas e o
acesso já existente para evitar detecção.

### Grupos de ransomware

Motivação financeira, impacto igualmente severo. O ataque de 2021 à Colonial
Pipeline, pelo grupo **DarkSide**, causou desabastecimento de combustível no
sudeste dos Estados Unidos.

O incidente de **Oldsmar** no mesmo ano mostra o quanto alguns sistemas de OT se
tornaram acessíveis: o atacante entrou pelo **TeamViewer instalado num HMI**.

### Hacktivistas e atores disruptivos

Menos sofisticados, mas capazes de dano real — especialmente contra sistemas de OT
expostos à internet com autenticação fraca.

## Por onde entram

### Pela rede de TI

O vetor de acesso inicial mais comum. Por causa da convergência, o atacante viola
o ambiente de TI primeiro e depois pivota para OT: compromete um ativo de TI, move
lateralmente pela rede corporativa, atravessa uma fronteira TI/OT mal protegida e
começa a mirar ativos de OT.

> Em ambiente híbrido, **monitore intensamente o tráfego da fronteira TI/OT**. No
> Sentinel ou no Splunk, crie regras de detecção para tráfego incomum cruzando do
> segmento de TI para a sub-rede de OT. **Qualquer sistema de TI se comunicando
> diretamente com PLC ou servidor SCADA fora de um caminho aprovado é alerta de
> prioridade alta.**

### Por acesso remoto

Sistemas de SCADA e ICS usam cada vez mais acesso remoto para suporte de
fornecedor, monitoramento e flexibilidade operacional. Quando esse acesso não é
protegido adequadamente, é explorado: RDP exposto, VPN sem criptografia, software
de acesso remoto inseguro — como o TeamViewer de Oldsmar.

> Na prova, a abordagem correta sempre inclui **VPN com MFA, controle de acesso
> baseado em papel, log de sessão e acesso remoto limitado a jump servers
> designados**. Acesso remoto direto da internet a sistema de OT **nunca** é a
> resposta certa.

## Living off the land em OT

Assim como em TI, o atacante sofisticado prefere usar ferramentas e protocolos
legítimos já presentes. Numa rede de OT isso pode significar usar **comandos Modbus
legítimos de leitura e escrita** para consultar e manipular PLCs, em vez de
implantar malware customizado.

O problema é que esse tráfego **se parece com operação normal**. Sua detecção
precisa ser **comportamental**, não baseada em assinatura.

> Faça baseline dos padrões de comunicação. Nozomi ou Claroty aprendem como são as
> comunicações normais de Modbus, DNP3 e SCADA no seu ambiente. Aí, quando aparece
> uma sequência de comando autenticada mas incomum — como um **comando de escrita
> num registrador de PLC que normalmente nunca recebe escrita** — isso é anomalia
> que merece investigação, **mesmo que o comando seja tecnicamente válido**.

## Os indicadores próprios de OT

Os indicadores aqui são diferentes dos de TI, e a prova testa isso.

**Dispositivos rogue na rede de OT.** Redes de OT devem ser rigidamente
controladas. Qualquer dispositivo novo que aparece sem passar por gestão de mudança
é suspeito. Ferramentas de descoberta de ativos com consciência de OT alertam
quando um dispositivo se comunica na rede pela primeira vez.

**Comandos de escrita Modbus ou DNP3 inesperados.** Na operação normal, a maior
parte do tráfego é **leitura** — o servidor SCADA ou o HMI consultando RTUs e PLCs
por valores de processo. Escrita inesperada, especialmente em registradores que
normalmente não mudam, merece investigação imediata.

**Anomalias em valores de processo.** Se leituras de sensor desviam do baseline
histórico de formas que não correspondem às condições físicas, considere a
possibilidade de que estejam sendo **manipuladas** — o cenário Stuxnet.

**Anomalias de login em HMI.** Falhas de autenticação, logins em horários atípicos
ou de endereços de origem inesperados em sistemas HMI.

## Responder em OT é diferente

Ponto crítico para a prova:

> Em ambientes de OT você quase sempre adota uma abordagem **passiva, de observar e
> alertar**, em vez de **bloquear e responder** ativamente.

Em TI, ao detectar ameaça você isola um host, bloqueia uma conexão, mata um
processo. Em OT, fazer isso sem coordenação com a operação pode causar **paradas
descontroladas de processo, mais perigosas que o próprio ataque**. Parada não
controlada de processo em planta química pode gerar acúmulo de pressão ou reação
descontrolada.

Por isso resposta a incidente em OT exige coordenação estreita com **engenheiros de
operação**, não a equipe de segurança agindo sozinha.

## MITRE ATT&CK for ICS

Táticas que valem saber pelo nome:

- **Inhibit Response Function** — impedir sistemas de segurança de funcionar
- **Impair Process Control** — manipular a lógica de controle
- **Impact** — capacidades de dano físico

Mapeando indicador observado a comportamento, você prevê o próximo passo do
adversário.
`.trim(),
      pontosChave: [
        "Estados-nação se pré-posicionam para ter capacidade de disrupção futura, sem agir agora",
        "Sandworm causou os apagões na Ucrânia em 2015 e 2016; Volt Typhoon se pré-posicionou nos EUA",
        "O vetor mais comum é pivotar da rede de TI para a de OT pela fronteira mal protegida",
        "Acesso remoto inseguro é o segundo vetor: Oldsmar entrou por TeamViewer num HMI",
        "Indicadores de OT: dispositivo rogue, escrita Modbus/DNP3 inesperada, valor de processo anômalo, login atípico em HMI",
        "Resposta em OT é passiva e coordenada com a operação — isolar por conta própria pode ser pior que o ataque",
      ],
      dicaExame:
        "Se o cenário perguntar o que fazer ao detectar ameaça em ambiente de OT, a resposta correta envolve notificar a operação, trabalhar dentro da gestão de mudança e usar controles compensatórios. Nunca será isolar dispositivos imediatamente ou disparar contramedida agressiva.",
      tarefa:
        "Escolha uma técnica do MITRE ATT&CK for ICS, procure na matriz e identifique um método de detecção e uma mitigação para ela.",
    },
    {
      id: "s06l06",
      titulo: "Segurança para infraestrutura crítica",
      resumo:
        "IDMZ, data diodes, controles compensatórios no lugar do patch, monitoramento passivo, acesso remoto por jump server e sistemas instrumentados de segurança.",
      minutos: 22,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## Aplicar segurança de TI em OT pode causar dano

A abordagem certa **respeita as restrições operacionais** enquanto constrói defesas
em camadas que funcionam dentro delas.

O desafio central se resume a uma tensão:

> **Segurança quer mudar** — aplicar patch, atualizar, monitorar, bloquear.
> **Operação quer estabilidade** — manter rodando, não mexer no que funciona,
> evitar parada a qualquer custo.

Os dois objetivos são legítimos. Seu trabalho é encontrar medidas que reduzam risco
**sem violar os requisitos operacionais**. Isso exige um repertório diferente do de
um ambiente corporativo padrão.

## Segmentação: a IDMZ

Em OT a segmentação é ainda mais crítica que em TI, porque uma violação que alcança
PLCs tem consequência física, não só digital.

O padrão-ouro é a **DMZ industrial (IDMZ)**: uma zona controlada entre a rede
corporativa de TI e a rede de controle de OT. **Toda** comunicação entre TI e OT
precisa passar por ela. Nada vai direto da rede corporativa a um PLC.

### Data diodes

Dentro da IDMZ costumam existir **data diodes**: dispositivos de hardware que
permitem o fluxo de dados em **uma única direção**.

> O dado pode fluir de OT para TI, para relatório e inteligência de negócio. Mas
> **comando não pode fluir de TI de volta para OT**.

É um controle compensatório poderoso para quem precisa compartilhar dado
operacional com o negócio sem criar um caminho de comando de volta para OT.

Ao revisar arquitetura de OT, procure a presença e a configuração correta da IDMZ.
**Se você encontrar sistemas de TI se comunicando diretamente com sistemas de
controle sem passar pela IDMZ, isso é achado crítico**: qualquer comprometimento do
lado de TI tem caminho direto para OT.

## Patch e o que fazer quando não dá

Sistemas de OT muitas vezes não podem seguir o calendário de patch de TI porque:

- o fornecedor precisa **certificar** que o patch não quebra o software de controle
  — testar um patch em sistema de controle de usina nuclear leva meses, não horas
- alguns sistemas estão em **fim de vida** e simplesmente não têm patch
- alguns processos **não podem parar** para janela de manutenção

**Isso não significa aceitar a vulnerabilidade e seguir em frente.** Significa
aplicar controles compensatórios que reduzam o risco de exploração.

### Os controles compensatórios que a prova cobra

**Application whitelisting** é dos mais eficazes. Microsoft AppLocker ou soluções
de controle de aplicação próprias de OT restringem um HMI ou estação de controle a
executar **apenas aplicações aprovadas**. Mesmo com o sistema operacional sem
patch, um exploit de dia zero que tente rodar um executável não autorizado é
bloqueado.

**Segmentação de rede** limita a exposição, garantindo que o sistema sem patch não
seja alcançável de rede não confiável.

**Firewall de host** nas estações de HMI restringe com quem elas se comunicam,
mesmo sem poder atualizar o sistema operacional.

> Uma questão muito comum apresenta um sistema de OT que não pode receber patch e
> pede o melhor controle compensatório. A resposta certa é sempre desse tipo:
> whitelisting, isolamento de rede, monitoramento. **Nunca escolha "aplicar os
> patches imediatamente"** num cenário de OT sem reconhecer as restrições
> operacionais.

## Monitoramento passivo

Em OT, **passivo é o padrão**. Varredura ativa pode derrubar PLC, interromper laço
de controle e causar mudança não intencional de processo. Alguns PLCs são tão
sensíveis a tráfego inesperado que **um simples ping pode perturbar a operação**.

Ferramentas passivas — **Dragos Platform**, **Nozomi Networks Guardian**, **Claroty
Continuous Threat Detection** — capturam e analisam o tráfego em vez de enviar
sondas. Elas montam inventário de ativos observando as comunicações, fazem baseline
dos padrões normais e alertam nos desvios.

> Quando você recebe alerta de que um PLC recebeu comando de escrita inesperado,
> ele veio de um sensor **passivo** na rede de OT — não de varredura ativa nem de
> agente no PLC. Esse dado passivo, somado ao historiador e ao syslog disponível de
> servidores de controle e HMIs, é o seu conjunto de investigação.

## Acesso remoto

Uma das superfícies mais exploradas. A abordagem precisa ser estrita:

- todo acesso remoto passa por **jump server** ou bastion na IDMZ, nunca direto da
  internet para o sistema de OT
- **MFA é obrigatório** — fator único em qualquer coisa que toque OT é inaceitável
- toda sessão remota deve ser **registrada e, idealmente, gravada** para auditoria
- acesso de fornecedor deve ser **limitado no tempo**, específico por papel e
  revogado imediatamente ao fim da manutenção — é o princípio de acesso
  *just-in-time* aplicado à gestão de fornecedores

> Em investigação forense envolvendo acesso remoto em OT, **cheque primeiro os logs
> e as gravações de sessão do jump server**. Eles dão o quadro completo de quem
> acessou o quê, quando e quais comandos rodou. Se havia sessão de fornecedor ativa
> na janela do incidente, esses logs são evidência crítica.

## Sistemas instrumentados de segurança (SIS)

Aqui a segurança de OT diverge da de TI de forma específica e de altíssimo risco.

Muitos ambientes têm **safety instrumented systems** independentes, projetados para
assumir o controle e desligar um processo com segurança se ele sair dos parâmetros
seguros. Pense numa válvula de alívio que abre automaticamente se a pressão sobe
demais.

Ataques no estilo Stuxnet miram justamente a capacidade de **inibir a resposta do
sistema de segurança**. Se o atacante impede o SIS de disparar quando os valores
saem da faixa segura, ele pode causar dano físico ou incidente de segurança que o
sistema existia para prevenir. É a tática **Inhibit Response Function**.

Por isso a segurança da rede do SIS é **separada da rede de controle operacional e
pelo menos tão importante quanto**.

> Se um cenário mencionar sistema de segurança ou SIS sendo alvo ou contornado,
> trate como severidade extremamente alta, exigindo escalonamento imediato e
> coordenação com operação e engenharia de segurança operacional. **Não é só
> incidente de segurança da informação: é potencial incidente de segurança
> física.**

## Governança e normas

| Norma | Escopo |
| --- | --- |
| **NIST SP 800-82** | Guia de segurança de OT: gestão de risco, arquitetura de rede, controle de acesso e resposta a incidentes para OT |
| **IEC 62443** | Norma internacional de cibersegurança industrial, para automação e sistemas de controle |

Você não precisa de detalhe delas, mas precisa saber que existem e o que cobrem —
elas aparecem em questões perguntando qual framework se aplica a um cenário de
segurança de sistema de controle industrial.
`.trim(),
      pontosChave: [
        "A tensão central é segurança querendo mudar contra operação querendo estabilidade — ambas legítimas",
        "IDMZ é o controle arquitetural fundamental: nenhuma comunicação direta entre TI e controle de OT",
        "Data diode força fluxo unidirecional, impedindo caminho de comando de volta para OT",
        "Sem patch possível, compensar com application whitelisting, isolamento de rede e monitoramento",
        "Monitoramento é passivo: varredura ativa pode derrubar PLC — às vezes um ping basta",
        "Acesso remoto só por jump server na IDMZ, com MFA, log de sessão e acesso de fornecedor temporário",
        "Ataque a sistema instrumentado de segurança (SIS) é a severidade máxima em OT",
        "NIST SP 800-82 e IEC 62443 são as normas de governança de segurança em OT",
      ],
      dicaExame:
        "O padrão se repete: sistema de OT que não pode ser atualizado + pergunta sobre o melhor controle. A resposta é sempre compensatória. E se aparecer SIS sendo alvo ou contornado, é escalonamento imediato — trate como incidente de segurança física, não só de informação.",
      tarefa:
        "Trabalhe este cenário do começo ao fim: o SOC recebe alerta de que uma estação Windows na rede de OT acabou de fazer conexão de saída para um IP externo. Qual é o seu processo de análise, quem você notifica e quais controles compensatórios se aplicam enquanto investiga?",
      recursos: [
        {
          titulo: "NIST SP 800-82 — Guide to OT Security",
          url: "https://csrc.nist.gov/pubs/sp/800/82/r3/final",
        },
      ],
    },
    {
      id: "s06l07",
      titulo: "Checkpoint: infraestrutura crítica",
      resumo:
        "Consolidação das seis lições: setores e ISACs, modelo Purdue, ICS, DCS e SCADA, indicadores de OT e controles compensatórios.",
      minutos: 20,
      tipo: "checkpoint",
      rota: "/simulado?secao=s06",
    },
  ],
};
