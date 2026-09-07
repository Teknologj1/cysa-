import type { Secao } from "../types";

export const s02: Secao = {
  id: "s02",
  numero: 2,
  titulo: "Fundamentos de operações de segurança",
  fase: "f1",
  dominio: "d1",
  descricao:
    "O que é um SOC, quem trabalha nele, como o trabalho flui da detecção à resolução e o que precisa ser monitorado o tempo todo.",
  objetivos: [
    "Descrever os três modelos de SOC e suas trocas",
    "Atribuir uma ação de análise ao tier correto",
    "Sequenciar o fluxo de alerta até resolução",
    "Identificar lacunas de monitoramento em um ambiente descrito",
    "Reconhecer falhas de handover como causa raiz de problemas operacionais",
  ],
  licoes: [
    {
      id: "s02l01",
      titulo: "Introdução ao Security Operations Center",
      resumo:
        "O que um SOC é, os três modelos de operação, as quatro funções centrais e a diferença entre SIEM e SOAR.",
      minutos: 18,
      tipo: "aula",
      objetivo: "1.5",
      gratis: true,
      conteudo: `
## O que é um SOC

Um **Security Operations Center** é uma equipe e um ambiente tecnológico
centralizados, dedicados a monitorar, detectar, analisar e responder a ameaças
**24 horas por dia**.

Essa última parte importa. Atacante não limita expediente. Às 2h de um domingo é
excelente hora para movimentar lateralmente pela rede — tem menos gente olhando.

Pense em uma instituição financeira grande: milhares de endpoints, dezenas de
workloads em AWS e Azure, usuários remotos por VPN, fornecedores acessando
sistemas internos. Cada um desses é um ponto de entrada possível. O SOC observa
tudo isso, correlaciona os sinais e separa ameaça real de ruído.

Sem SOC, a organização vive em modo reativo — e descobre a violação semanas
depois, quando um cliente liga ou um jornalista publica. O SOC é o que muda a
postura de **reativa para proativa**.

## Os três modelos de SOC

| Modelo | Como funciona | Costuma ser adotado por |
| --- | --- | --- |
| **Interno** | Equipe, ferramentas e gestão próprias | Grandes empresas e governo, quando o controle sobre dado sensível é crítico |
| **Gerenciado (MSSP)** | Funções terceirizadas para um provedor que monitora remotamente | Organizações menores, que precisam de cobertura 24/7 sem montar o time |
| **Híbrido** | Tier 1 e 2 internos, monitoramento fora do horário no MSSP | Organizações de médio porte |

Entender as trocas — custo, controle e cobertura — ajuda a responder questões
sobre decisões organizacionais, alocação de recursos e por que certas lacunas de
cobertura existem.

## As quatro funções centrais

**1. Monitoramento contínuo.** O SIEM ingere logs de firewalls, endpoints,
workloads de nuvem e aplicações, reunindo tudo em um lugar onde dá para
enxergar padrão. O SIEM é o sistema nervoso central do SOC: coleta, correlaciona
e alerta.

**2. Triagem e investigação de alertas.** Quando o SIEM gera um alerta, alguém
precisa avaliar: é ameaça real ou false positive? Qual o escopo? Que sistemas
foram afetados? Na prática você **pivota** do SIEM para o EDR (CrowdStrike
Falcon, SentinelOne) para ver execução de processo, alteração de arquivo e
conexões de rede naquele host, na mesma janela de tempo. O cruzamento das duas
visões é o que dá o quadro completo.

**3. Coordenação da resposta a incidentes.** Confirmada a ameaça, o SOC dispara o
fluxo de resposta: contenção, erradicação, recuperação e comunicação com
stakeholders.

**4. Métricas e reporting.** O SOC acompanha três medidas que a prova cobra:

- **MTTD** (*mean time to detect*) — tempo entre a ameaça aparecer e o SOC percebê-la
- **MTTR** (*mean time to respond*) — tempo para agir sobre o incidente confirmado
- **Mean time to remediate** — tempo para resolver completamente, não só responder

> Cenário típico de prova: um SOC com MTTD alto. Qual controle mais reduz esse
> tempo? Resposta: melhor cobertura de detecção — regras de correlação ajustadas
> e ingestão de log mais completa e eficiente.

## SIEM e SOAR não são a mesma coisa

O **SIEM** (Security Information and Event Management) é o motor de coleta e
correlação. Pode ser Splunk on-premise ou, em SOC voltado para nuvem, Microsoft
Sentinel ou Splunk Cloud, com armazenamento elástico e modelos de machine
learning que sinalizam anomalia comportamental que o tuning manual não pegaria.

O **SOAR** (Security Orchestration, Automation and Response) fica **em cima** do
SIEM e automatiza a resposta. Disparado o alerta, o SOAR percorre um runbook
sozinho: consulta o IP numa feed de threat intelligence, coloca o endpoint em
quarentena via API do EDR e abre o chamado — sem humano no meio.

Isso importa porque **alert fatigue** é real: um SOC movimentado vê centenas de
alertas por dia, e sem automação o analista queima tentando triar tudo na mão. O
SOAR cuida do repetitivo e bem definido; o analista fica com os casos ambíguos,
que exigem interpretação.

> Se um analista passa o turno fechando alertas de password spray um a um, o SOAR
> não está configurado direito.
`.trim(),
      pontosChave: [
        "SOC é a função centralizada de monitorar, detectar, analisar e responder — 24/7",
        "Três modelos: interno, gerenciado (MSSP) e híbrido, com trocas de custo, controle e cobertura",
        "Quatro funções: monitoramento contínuo, triagem e investigação, coordenação da resposta, métricas e reporting",
        "Três métricas: MTTD, MTTR e mean time to remediate — saiba distinguir",
        "SIEM coleta e correlaciona; SOAR automatiza e responde",
        "MITRE ATT&CK é a linguagem comum do SOC moderno",
      ],
      dicaExame:
        "Se a questão fala em reduzir carga do analista por automação, a resposta é SOAR. Se fala em centralizar coleta de log e definir regras de detecção, a resposta é SIEM. Não confunda as funções.",
      tarefa:
        "Volte ao attack.mitre.org e escolha uma técnica da matriz Enterprise. Leia o que ela faz, veja a orientação de detecção e pense: qual log source eu precisaria ter no SIEM para pegar isso?",
      recursos: [{ titulo: "MITRE ATT&CK", url: "https://attack.mitre.org" }],
    },
    {
      id: "s02l02",
      titulo: "Papéis e responsabilidades no SOC",
      resumo:
        "A estrutura de tiers, o que cada nível realmente faz e os papéis especialistas que sustentam a equipe.",
      minutos: 16,
      tipo: "aula",
      objetivo: "1.5",
      conteudo: `
## Ferramenta boa com papel confuso não salva ninguém

Você pode ter o melhor SIEM do mercado, um SOAR inteiro configurado e todas as
feeds de threat intelligence que o dinheiro compra. Se as pessoas certas não
estiverem nos papéis certos fazendo o trabalho certo, nada disso importa:
ameaças passam, incidentes escalam e a equipe queima.

O SOC não é uma organização plana. Ele é estruturado em **tiers** por um motivo
específico: nem todo alerta precisa do mesmo nível de especialidade. Se o seu
analista mais sênior passa o dia fechando falso positivo de senha, isso é
desperdício de talento **e** lacuna de cobertura.

> Pense num pronto-socorro. A enfermeira de triagem faz a avaliação inicial e
> decide quem vê o médico agora. O médico atende os casos complexos. O
> especialista é chamado quando algo foge do escopo. O SOC funciona igual — e,
> como no PS, tudo desanda se as pessoas não sabem seu papel ou se o handoff
> quebra.

## Tier 1 — triagem e monitoramento

Primeira linha. Você acompanha o painel do SIEM, trabalha a fila de alertas e
decide rápido o que é real e o que é ruído. Seu trabalho **não** é forense
profundo: é olhar o alerta, juntar contexto suficiente, classificar como true ou
false positive, definir severidade e então fechar com documentação ou escalar.

O volume alto é o que torna **alert fatigue** um problema concreto. Vendo
centenas de alertas por turno, a tendência humana é começar a reconhecer padrão
rápido demais e descartar o que parece familiar. É exatamente assim que ameaça
real passa.

> Aquele alerta que parece o mesmo evento benigno de PowerShell que você viu 50
> vezes na semana é justamente o que merece o segundo olhar. Adversários sabem
> como são as suas regras de detecção e moldam a atividade para se misturar ao
> ruído.

## Tier 2 — investigação e análise

Aqui entra profundidade. Você recebe os casos que o tier 1 já confirmou como
reais. Não está mais confirmando que algo aconteceu: está descobrindo **o quê**,
**até onde** se espalhou, **quais** sistemas estão envolvidos e o que o
adversário efetivamente fez.

Correlação mais funda no SIEM, pivô para o EDR, tráfego de rede para rastrear
movimento lateral. E a primeira determinação sobre se isso é um incidente contido
ou algo maior, que precisa do tier 3 e talvez da liderança.

> Investigando suspeita de comprometimento de conta, você puxa logs de
> autenticação do SIEM, checa a atividade do endpoint no EDR na mesma janela e
> cruza com logs de acesso de nuvem do Azure AD ou do AWS CloudTrail, procurando
> impossible travel, uso de credencial em local inesperado e padrão de movimento
> lateral. Cada fonte é uma peça; você monta o quadro.

## Tier 3 — threat hunting e investigação avançada

Você não espera alerta. Constrói hipóteses de caça a partir de threat
intelligence, roda queries sobre dado histórico no SIEM e procura padrões de
comportamento que as regras de detecção ainda não pegam.

Também é quem o time chama quando o incidente é grave ou tecnicamente complexo
demais para o tier 2. Trabalha com MITRE ATT&CK para mapear indicadores
observados a táticas conhecidas e **identificar lacunas de detecção**. Quando um
grupo novo aparece nas manchetes, é o tier 3 que pega os TTPs conhecidos, mapeia
para o ambiente e pergunta: *nós pegaríamos isso? Se não, o que precisa mudar?*

Em muitas organizações é aqui que vive a **detection engineering** — escrever e
ajustar as regras de correlação das quais todo o resto do SOC depende.

## SOC manager

Líder operacional. Normalmente não está na fila de alertas: gerencia a equipe,
aloca recursos, acompanha métricas e é o ponto de escalonamento quando o
incidente chega ao nível em que a liderança de negócio precisa participar.

É quem coordena entre TI, jurídico, comunicação e alta liderança durante um
incidente grande.

## Dois papéis especialistas

**Threat intelligence analyst** — foco no cenário externo. Acompanha grupos de
ameaça, monitora feeds e plataformas como MISP e OpenCTI, e traduz esse contexto
externo em orientação acionável para o resto do SOC. Sem esse papel, o SOC só
reage ao que vê dentro de casa.

**Incident responder** — em organizações maiores, a resposta é função separada.
Confirmado o incidente grave no tier 2, o caso é entregue a um responder ou a um
time de IR, dono da contenção, erradicação e recuperação. Em SOCs menores, tier 2
e tier 3 vestem esse chapéu.

## Por que isso é seu problema

Saber onde você está na estrutura diz em quais ferramentas você precisa ser
especialista, quais decisões são suas e quando você precisa passar adiante. Um
tier 1 que insiste em escavar um incidente complexo em vez de escalar é um
gargalo — e um tier 3 que microgerencia triagem também é problema.
`.trim(),
      pontosChave: [
        "A estrutura de tiers roteia o trabalho para o nível de habilidade certo",
        "Alert fatigue é risco real do tier 1: triagem disciplinada vale mais que velocidade pura",
        "Tier 2 é o tecido conectivo entre detecção inicial e resposta séria; correlação multi-fonte é a habilidade central",
        "Tier 3 é proativo e orientado a inteligência, não reativo",
        "SOC manager é dono da função e das métricas, não da fila de alertas",
        "Threat intelligence traduz contexto externo; incident responder assume a resposta técnica confirmada",
      ],
      dicaExame:
        "Espere PBQs que descrevem uma ação de analista e pedem para identificar o tier ou o papel apropriado. Correlação multi-fonte com construção de timeline é tier 2; caça sem alerta prévio é tier 3.",
      tarefa:
        "Se você fosse tier 1 e recebesse um alerta de execução suspeita de PowerShell em uma estação, quais seriam as três primeiras perguntas antes de decidir escalar? Escreva no seu study tracker.",
    },
    {
      id: "s02l03",
      titulo: "Workflows e processos de operações de segurança",
      resumo:
        "Do alerta à resolução: priorização por severidade, triagem, playbooks, runbooks, escalonamento e case management.",
      minutos: 17,
      tipo: "aula",
      objetivo: "1.5",
      conteudo: `
## Por que workflow existe

Workflow é a sequência definida de passos que o SOC segue para ir da detecção
até a resolução. O motivo é **consistência**.

Dois analistas olhando o mesmo tipo de alerta sem processo definido: um passa uma
hora escavando, o outro descarta em dois minutos. Mesmo alerta, resultados
opostos. Workflow padronizado corrige isso — os passos certos acontecem sempre,
na ordem certa, pela pessoa certa.

## Detecção e priorização

O SIEM ingere logs, roda regras de correlação e dispara o alerta quando algo bate
com a regra. Mas nem todo alerta é igual, e por isso existe classificação de
severidade: **critical, high, medium e low**.

- **Critical** vai para o topo da fila imediatamente — indicadores de ransomware,
  exfiltração ativa, comprometimento de conta privilegiada.
- **High** e **medium** são trabalhados em ordem.
- **Low** costuma ser tratado em lote, em períodos mais calmos.

### Risk-based alerting

No Splunk dá para montar um framework de alerta baseado em risco: em vez de
disparar alerta toda vez que alguém executa PowerShell, o evento **soma pontos de
risco** ao usuário ou host. Quando o total cruza um limiar, dispara **um** alerta
de qualidade. Isso reduz drasticamente o volume e faz emergir os casos que
realmente merecem atenção.

> Cenário de prova: SOC soterrado de alertas. O que mais reduz o problema? Não é
> "contratar mais analistas" — é ajustar as regras de detecção e usar alerta
> baseado em risco ou comportamento para cortar falso positivo.

## Triagem

Triagem é a avaliação inicial, e ela é rápida. Você responde três perguntas:

1. Isso é real?
2. Qual o impacto potencial?
3. Eu preciso de ajuda?

Você olha o alerta bruto, checa o ativo afetado, puxa contexto do SIEM e talvez
faça um pivô rápido para o EDR. **Não é investigação profunda ainda.** O objetivo
é classificar como true ou false positive e priorizar.

- **False positive** → fecha e documenta o porquê. Essa documentação alimenta o
  tuning ao longo do tempo.
- **True positive** → abre um caso no case management (ServiceNow, TheHive) e a
  investigação começa.

## Playbook e runbook não são a mesma coisa

**Playbook** é um guia legível por humano, passo a passo, de como responder a um
tipo específico de incidente. Alerta de phishing tem playbook. Atividade suspeita
em domain controller tem playbook. Eles tiram o achismo e garantem que o tier 1
às 3h da manhã trate o alerta como o sênior trataria às 9h.

**Runbook** é o que acontece quando você automatiza o playbook dentro de um SOAR.
Em vez de um humano ler e executar, o SOAR executa os mesmos passos via
integrações de API.

> Um runbook de phishing maduro extrai o link suspeito do e-mail, detona em
> sandbox, puxa a reputação no VirusTotal, verifica se algum usuário clicou e cria
> um chamado enriquecido no ServiceNow — tudo antes de o analista abrir o caso.

**Playbook é para humano. Runbook é playbook automatizado no SOAR.** A prova usa
os dois termos e confundi-los custa ponto.

## Escalonamento

Escalonamento é o que acontece quando o analista determina que o incidente passou
do seu escopo, precisa de mais especialidade ou tem impacto de negócio que exige
ciência da liderança.

O ponto crítico: os critérios precisam estar **definidos antes de serem
necessários**. Critério vago produz um de dois desastres — escalonamento em
excesso, que soterra o time sênior em ruído, ou escalonamento de menos, e aí a
ameaça séria não recebe atenção a tempo.

Bons gatilhos são objetivos:

- O ativo afetado é infraestrutura crítica
- Há conta privilegiada envolvida
- Múltiplos sistemas mostram os mesmos indicadores ao mesmo tempo
- Há atividade relacionada a ransomware

## Case management

A plataforma de casos é o **registro único da verdade**: cada ação tomada, cada
artefato coletado, cada decisão fica logada ali. Isso dá rastreabilidade,
sustenta eventual ação legal e é o que faz a passagem de turno funcionar sem
perder o fio da investigação.
`.trim(),
      pontosChave: [
        "Workflow existe para dar consistência, eficiência e rastreabilidade ao SOC",
        "Severidade critical → low define a ordem da fila; risk-based alerting reduz ruído",
        "Triagem é avaliação rápida: classificar, priorizar e abrir caso se for real",
        "Playbook guia humano; runbook automatiza os mesmos passos no SOAR",
        "Escalonamento precisa de gatilhos objetivos, não só julgamento do analista",
        "Case management é o registro da verdade da investigação",
      ],
      dicaExame:
        "São comuns PBQs que pedem para sequenciar passos do workflow, identificar o que falhou em um processo descrito ou escolher a ferramenta certa para uma função. Padrão frequente no domínio 1.",
      tarefa:
        "Do fluxo alerta → resolução, qual passo você acha mais provável de falhar num SOC real? Escreva qual e por quê.",
    },
    {
      id: "s02l04",
      titulo: "Conceitos de monitoramento contínuo",
      resumo:
        "As cinco categorias de fonte de dados, o que cada uma enxerga e por que lacuna de monitoramento é o ponto cego que o atacante usa.",
      minutos: 20,
      tipo: "aula",
      objetivo: "1.1",
      conteudo: `
## O que é monitoramento contínuo

É a coleta, análise e interpretação **contínuas** de dados relevantes de
segurança em todo o ambiente, para manter consciência do estado atual a qualquer
momento. A palavra-chave é *contínuo*: não é varredura trimestral nem revisão
semanal de log.

Por que importa: ataques bem-sucedidos raramente são eventos únicos e explosivos.
Eles se desenrolam no tempo — acesso inicial, período quieto, reconhecimento
interno, movimento lateral, e só então exfiltração ou ransomware. O **dwell time**
médio ainda se mede em semanas.

Monitoramento contínuo é como você comprime esse tempo. Se coleta o dado certo
dos lugares certos e sabe como é o normal, tem chance de pegar o atacante na fase
de movimento lateral, antes do objetivo. Se falta uma fonte, existe um ponto
cego — e atacantes procuram esses pontos cegos deliberadamente.

## As cinco categorias de fonte

### 1. Rede

Firewall (conexões permitidas e negadas), IDS/IPS como Snort ou Suricata,
**NetFlow** (volume e metadado de fluxo, sem conteúdo) e **DNS**.

Log de DNS é das fontes mais subutilizadas e das mais valiosas: quase todo ataque
passa por DNS, seja em callback de command and control, exfiltração sobre DNS ou
atividade de DGA. Host gerando muitas consultas para domínios registrados
recentemente ou com nomes de alta entropia é sinal que merece perseguição.
Ferramentas como Zeek analisam DNS em escala.

Em nuvem muda a figura: **VPC Flow Logs** na AWS, Azure Network Watcher. Não há
perímetro tradicional, então o foco vira tráfego **east-west** entre workloads,
padrões incomuns de chamada de API e conexões de saída inesperadas.

### 2. Endpoint

Logs de evento do sistema operacional — Windows Security Event Log e syslog no
Linux — cobrindo autenticação, uso de privilégio, criação de processo, acesso a
arquivo e mudança de configuração.

O **EDR** (CrowdStrike Falcon, SentinelOne) acrescenta uma camada muito mais rica:
árvore de execução de processos, relação pai-filho, mudanças em arquivo e
registro, e conexões de rede feitas por processo específico. Usa analítica
comportamental para sinalizar comportamento suspeito mesmo sem assinatura de
malware conhecida.

Isso importa porque atacantes modernos usam **living off the land**: abusam de
ferramentas legítimas como PowerShell, WMI ou certutil. Antivírus tradicional
nunca vai sinalizar isso. O monitoramento comportamental do EDR, sim.

> Investigando um host Windows, você puxa o **event ID 4688**, que registra
> criação de processo com a linha de comando completa. PowerShell iniciado pelo
> Word com comando codificado é bandeira vermelha — essa relação pai-filho é o
> seu primeiro pivô analítico.

### 3. Nuvem

É onde as organizações mais têm lacuna. Fontes críticas: **AWS CloudTrail** (toda
chamada de API — quem fez, de onde, o quê), **Azure Audit Logs** e **Azure AD
Sign-In Logs**, mais detecção nativa com **AWS GuardDuty** ou Microsoft Defender
for Cloud.

> Sem CloudTrail, uma chave de acesso IAM comprometida poderia subir instâncias
> de mineração, exfiltrar bucket S3 ou criar usuários privilegiados — e você não
> teria registro de nada disso. CloudTrail é inegociável.

### 4. Aplicação

Logs de aplicação web (autenticação, falha de validação de entrada, códigos de
erro, sessão), auditoria de banco de dados (quem consultou qual dado — relevante
para insider threat e tentativa de SQL injection) e logs de WAF, que mostram
tentativas que nem chegaram à aplicação.

Aplicações modernas, principalmente microsserviços, geram log estruturado em JSON,
mais fácil de correlacionar no SIEM que arquivo plano. Em Kubernetes, você consulta
logs de pod e eventos de cluster, com formato e coleta próprios.

### 5. Identidade

Em ambiente de nuvem e híbrido, **identidade é o perímetro**. Quando o atacante
compromete credencial, muitas vezes ele não precisa explorar vulnerabilidade
nenhuma: ele simplesmente entra.

Fontes: autenticação do Active Directory e do Azure AD (login com sucesso e
falha, eventos de MFA, escalonamento de privilégio, criação e alteração de conta),
logs de PAM (CyberArk, BeyondTrust) mostrando o que a conta privilegiada fez na
sessão, e logs de federação no SSO.

**Impossible travel** é dos indicadores comportamentais mais confiáveis: usuário
autentica em Nova York às 9h e em Singapura às 10h. SIEMs modernos sinalizam
automaticamente, mas mesmo sem ML uma query simples comparando localização de
sign-in com a baseline resolve.

## Baselines

Uma baseline é o retrato documentado do que é **normal** no seu ambiente: horários
e locais típicos de autenticação, volume e destino usuais de tráfego de saída,
processos esperados em cada tipo de servidor, volume padrão de chamadas de API.

Sem baseline você não consegue definir anômalo. E sem anômalo, suas regras de
detecção estão adivinhando. Estabelecer baseline é processo contínuo: o ambiente
muda, aplicações novas entram, comportamento de usuário muda.

O NIST Cybersecurity Framework coloca o monitoramento contínuo como componente
central da função **Detect** — não é opcional, é a capacidade fundacional.
`.trim(),
      pontosChave: [
        "Monitoramento contínuo é coleta e análise persistentes, não periódicas",
        "Cinco categorias de fonte: rede, endpoint, nuvem, aplicação e identidade",
        "DNS e NetFlow são fontes de rede subutilizadas e muito valiosas",
        "EDR comportamental pega living off the land que assinatura não pega",
        "CloudTrail e Azure Audit Logs são inegociáveis em ambiente de nuvem",
        "Identidade é o perímetro moderno; impossible travel é indicador forte",
        "Sem baseline não existe anômalo — as regras passam a adivinhar",
      ],
      dicaExame:
        "Questões sobre lacuna de monitoramento são comuns: identifique qual categoria de fonte está faltando no ambiente descrito e essa quase sempre é a resposta. Sem log de nuvem? É a resposta. Sem monitoramento de identidade? É a resposta.",
      tarefa:
        "Escolha uma das cinco categorias e anote duas fontes de log específicas que o seu ambiente atual (ou o desejado) coletaria, e que ameaças elas ajudariam a detectar.",
      recursos: [
        { titulo: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
      ],
    },
    {
      id: "s02l05",
      titulo: "Operação em turnos e procedimentos de handover",
      resumo:
        "Como o SOC mantém continuidade 24/7 e por que handover quebrado transforma evento gerenciável em incidente.",
      minutos: 15,
      tipo: "aula",
      objetivo: "4.2",
      conteudo: `
## O que é handover

Handover é a **transferência estruturada** de consciência operacional, carga de
trabalho ativa e conhecimento contextual de um time de analistas para o próximo,
ao fim de um período de trabalho.

Estruturada. Não é conversa rápida no corredor nem post-it no teclado.

A maioria dos SOCs opera em turnos de 8 ou 12 horas. Alguns usam modelo *follow
the sun* entre fusos: Londres passa para Singapura, que passa para Chicago. Nesse
modelo, o documento de handover costuma ser o **único artefato compartilhado**
que conecta os três times ao mesmo quadro operacional.

> É meia-noite e um alerta crítico dispara para movimento lateral em um domain
> controller. O analista da madrugada não sabe que o turno do dia já investigou o
> mesmo endpoint três horas antes, confirmou que era malicioso e estava no meio da
> investigação ao sair. Ele começa do zero. Horas de trabalho duplicadas — e a
> ameaça continua se espalhando nesse intervalo. Não é problema de tecnologia, é
> problema de processo. E é totalmente evitável.

## Os três componentes de um handover completo

### 1. Resumo do turno

Visão geral do que aconteceu: ambiente de ameaça no período, eventos notáveis,
alertas significativos e seus desfechos, e mudanças operacionais — nova regra de
detecção publicada, fonte de monitoramento que caiu, alteração de cobertura.

Não precisa ser longo. Precisa ser preciso e escaneável: o analista que chega lê
em dois minutos e sabe em que tipo de turno está entrando.

### 2. Status dos casos ativos

A parte mais crítica. Para cada caso aberto:

- ID do caso e link na plataforma de case management
- Resumo do que foi encontrado e do que já foi investigado
- Status atual e **qual é o próximo passo**
- Bloqueios ou dependências
- Prioridade e responsável

A plataforma de casos deve ser a fonte única da verdade, alimentada **em tempo
real durante o turno**, não resumida no fim. Assim o handover referencia os
registros em vez de tentar re-resumir tudo, e o analista que entra clica no caso e
vê o quadro completo — não só o que o colega lembrou de escrever.

### 3. Watch items

Coisas que o time que entra precisa acompanhar e que ainda não viraram caso
formal. Um aumento de falhas de autenticação vindas de uma subnet específica. Um
relatório novo de threat intelligence sobre campanha mirando o seu setor.

Watch items são o alerta antecipado — transformam um handover passivo em um
briefing ativo.

## Escrito primeiro, verbal depois

O debate "documento escrito ou briefing verbal" tem uma resposta: **os dois, nessa
ordem**.

A documentação escrita vem primeiro — fica numa plataforma compartilhada, é
pesquisável, tem carimbo de tempo e sobrevive quando o analista que saiu não está
mais acessível. O briefing verbal acrescenta a nuance que o documento não captura:
tirar dúvida, esclarecer ambiguidade, sinalizar o que não era sério o bastante
para documentar.

Mas verbal **não substitui** documentação. Handover puramente verbal cria ponto
único de falha: terminada a conversa, o que não foi escrito existe só na memória —
e memória degrada rápido quando o novo turno começa a lidar com a própria fila.

## Segurança operacional no handover

Durante incidente ativo, o próprio processo de handover pode ser risco. Discutir
detalhes do caso em canal não seguro pode alertar um insider ou expor informação
sensível se o adversário já comprometeu a infraestrutura de comunicação.

Por isso o plano de comunicação de incidente deve definir canais **out-of-band**:
mensageria com criptografia ponta a ponta, canais dedicados por incidente ou até
ligação por dispositivo pessoal quando a infraestrutura corporativa pode estar
comprometida.

## Handover e SLO

Service level objectives incluem MTTD, MTTR e mean time to remediate. Handover
ruim degrada esses números diretamente: se o analista gasta os primeiros 45
minutos reconstruindo contexto, são 45 minutos de tempo de detecção e resposta
queimados antes de começar. Multiplique por turno, por dia, em operação de três
turnos, e vira problema mensurável de performance.

O modelo a perseguir: SOCs maduros geram **relatório automático de turno** a
partir do SIEM e do case management, com casos abertos, status e resumo da fila
entregues ao analista que entra antes mesmo de ele sentar. O humano só acrescenta
o contexto qualitativo por cima.
`.trim(),
      pontosChave: [
        "Handover é transferência estruturada de consciência operacional, não conversa informal",
        "Três componentes: resumo do turno, status dos casos ativos e watch items",
        "Documentação escrita vem primeiro; briefing verbal complementa e nunca substitui",
        "A plataforma de case management é a fonte da verdade, alimentada em tempo real",
        "Segurança operacional se aplica ao handover: use canais out-of-band em incidente ativo",
        "Handover bom sustenta SLO ao reduzir o tempo gasto reconstruindo contexto",
      ],
      dicaExame:
        "Handover de turno e de incidente está explicitamente no objetivo 4.2, junto com planos de comunicação e métricas. Em cenário de falha operacional ou degradação de SLO, verifique se a causa raiz é handover antes de partir para resposta baseada em ferramenta.",
      tarefa:
        "Escreva um watch item de um parágrafo para um handover fictício, baseado num cenário comum — campanha de phishing ou pico de falhas de autenticação. Pratique colocar a informação certa no formato certo.",
    },
    {
      id: "s02l06",
      titulo: "Lab: inglês para o SOC",
      resumo:
        "Treino de listening e pronúncia com o vocabulário que aparece no exame e no dia a dia da operação.",
      minutos: 20,
      tipo: "lab",
      rota: "/lab-ingles",
      roteiro: [
        "Listening com três passagens do cotidiano do SOC",
        "Perguntas de compreensão com explicação",
        "Pronúncia de dez termos que costumam sair errado",
      ],
    },
    {
      id: "s02l07",
      titulo: "Checkpoint: fundamentos de operações de segurança",
      resumo:
        "Consolidação das cinco lições: estrutura do SOC, papéis, workflows, monitoramento contínuo e handover.",
      minutos: 15,
      tipo: "checkpoint",
      rota: "/simulado?secao=s02",
    },
  ],
};
