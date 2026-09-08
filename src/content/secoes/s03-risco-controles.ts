import type { Secao } from "../types";

export const s03: Secao = {
  id: "s03",
  numero: 3,
  titulo: "Gestão de risco e controles de segurança",
  fase: "f1",
  dominio: "d2",
  descricao:
    "Por que cada controle existe: risco, como medi-lo, as quatro respostas possíveis e como escolher controles que o negócio entende e financia.",
  objetivos: [
    "Explicar risco como interseção de ameaça, vulnerabilidade e impacto",
    "Calcular ALE e SLE em uma questão baseada em desempenho",
    "Distinguir risco inerente, residual, apetite e tolerância",
    "Escolher entre aceitar, transferir, evitar e mitigar conforme o contexto",
    "Classificar um controle por tipo e por função",
    "Alinhar a seleção de controles ao que o negócio precisa proteger",
  ],
  licoes: [
    {
      id: "s03l01",
      titulo: "O que é risco em cibersegurança",
      resumo:
        "A interseção de ameaça, vulnerabilidade e impacto, e como medir risco por probabilidade e severidade.",
      minutos: 16,
      tipo: "aula",
      objetivo: "2.4",
      conteudo: `
## Tudo volta para o risco

Cada controle que você configura, cada alerta que investiga e cada política que
a organização publica existe por causa de risco. A prova não quer só que você
saiba operar ferramentas: quer que você entenda **por que** aquela decisão de
segurança foi tomada. E a resposta é sempre risco.

> Risco é a possibilidade de uma **ameaça** explorar uma **vulnerabilidade** e
> causar dano à organização.

Definição simples, mas o exame cobra cada pedaço dela separadamente.

## Os três componentes

**Ameaça** — qualquer coisa capaz de causar dano: um grupo de ransomware, um
insider descontente, uma campanha de phishing, um desastre natural que derruba o
data center.

**Vulnerabilidade** — a fraqueza que a ameaça exploraria: servidor sem patch,
bucket de armazenamento mal configurado, usuário que pulou o treinamento.

**Impacto** — o que acontece de fato se der certo: dado roubado, sistema fora do
ar, multa regulatória.

Risco vive na **interseção** dos três. Falta um, não há risco: vulnerabilidade
sem ameaça que a explore, ou ameaça sem vulnerabilidade correspondente, não
compõem risco.

## A cena que define a habilidade

Você trabalha no SOC de uma financeira de médio porte. O scanner volta com **400
achados**. Alguns críticos, muitos de severidade baixa. Ninguém corrige 400
coisas de uma vez.

Como decidir o que vem primeiro? Pensando em risco:

- Qual vulnerabilidade tem chance real de ser explorada?
- Quais ativos valem mais para o negócio?
- Qual o raio de alcance se aquilo der errado?

É exatamente isso que a prova testa ao te jogar num cenário de priorização.

## Como o risco é medido

\`\`\`
risco = probabilidade × impacto
\`\`\`

**Probabilidade** é a chance de a ameaça realmente explorar a vulnerabilidade.
**Impacto** é a severidade do dano se isso acontecer. As organizações costumam
cruzar as duas dimensões numa **matriz de risco** (ou *heat map*): baixa
probabilidade com baixo impacto fica verde e não tira o sono de ninguém; alta com
alta fica vermelho e é o que mantém o CISO acordado.

Quando você faz triagem no SIEM, está rodando uma versão mental dessa matriz em
tempo real: *qual a chance de este alerta ser ameaça real, e qual o impacto no
negócio se for?*

## Análise quantitativa: os números que a prova cobra

Análise quantitativa põe **valor em reais** no risco. Duas fórmulas precisam
estar automáticas:

\`\`\`
SLE = valor do ativo × fator de exposição
ALE = SLE × ARO
\`\`\`

- **SLE** (*single loss expectancy*) — quanto custa **um** incidente
- **ARO** (*annualized rate of occurrence*) — quantas vezes por ano ele ocorre
- **ALE** (*annual loss expectancy*) — o custo esperado por ano

### Exemplo resolvido

Um servidor de banco de dados vale **R$ 100.000**. Você estima que um ataque
bem-sucedido comprometeria **40%** desse valor — o fator de exposição é 0,4.

\`\`\`
SLE = 100.000 × 0,4 = 40.000
\`\`\`

Se o incidente acontece uma vez a cada cinco anos, o ARO é **0,2**:

\`\`\`
ALE = 40.000 × 0,2 = 8.000 por ano
\`\`\`

Agora existe argumento de negócio: um controle que custa R$ 3.000 por ano e
reduz esse risco se paga. Um que custa R$ 30.000 por ano, não.

> **Atenção ao enunciado.** A prova às vezes dá o custo de recuperação direto
> (já é o SLE) e às vezes dá valor do ativo mais fator de exposição (você
> calcula o SLE antes). Leia qual dos dois está na mesa.

## Análise qualitativa

Nem sempre existe dado financeiro preciso para cada ativo e cada ameaça. A
análise qualitativa usa categorias descritivas — **alto, médio, baixo** —
apoiadas no julgamento de quem tem experiência. A maioria das avaliações reais
mistura as duas abordagens.

## Onde isso entra no NIST CSF

O NIST Cybersecurity Framework organiza a segurança em cinco funções:
**identify, protect, detect, respond, recover**. A avaliação de risco fica
firmemente em **identify** — antes de proteger, detectar ou responder, é preciso
saber quais são seus ativos, como são as ameaças e quanto risco você carrega.

Em nuvem, ferramentas como AWS Security Hub e Microsoft Defender for Cloud dão
uma visão contínua de postura de risco, pontuando o ambiente contra benchmarks
conhecidos. Em vez de avaliação pontual, um painel vivo.
`.trim(),
      pontosChave: [
        "Risco é a interseção de ameaça, vulnerabilidade e impacto — os três precisam existir",
        "Risco se mede em duas dimensões: probabilidade e impacto",
        "SLE = valor do ativo × fator de exposição",
        "ALE = SLE × ARO — saiba as duas de cor",
        "Análise qualitativa usa alto/médio/baixo; a maioria das organizações mistura as duas",
        "No NIST CSF, avaliação de risco fica na função identify, antes de tudo",
      ],
      dicaExame:
        "Esteja pronto para calcular ALE em uma questão baseada em desempenho e para recomendar a resposta ao risco conforme o nível encontrado. As duas fórmulas caem, e precisam sair sem hesitação.",
      tarefa:
        "Escolha um ativo do seu ambiente ou laboratório — um servidor web, um bucket de armazenamento. Escreva: qual a ameaça mais realista a ele, qual vulnerabilidade essa ameaça exploraria e qual o impacto se der certo. Esse exercício de três partes é o começo de uma avaliação de risco real.",
      recursos: [
        { titulo: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" },
      ],
    },
    {
      id: "s03l02",
      titulo: "Risco inerente, residual, apetite e tolerância",
      resumo:
        "Os quatro conceitos que estruturam toda conversa de risco — e a armadilha do risco zero.",
      minutos: 15,
      tipo: "aula",
      objetivo: "2.4",
      conteudo: `
## Risco não vai a zero

Todo sistema que você opera, toda aplicação que publica, todo acesso que
concede carrega algum risco. A pergunta nunca é *como zerar*. É **quanto risco a
organização aceita carregar** e como se manter dentro desse limite.

Três conceitos respondem isso, e eles se encaixam em sequência.

## Risco inerente

É o risco que existe **antes de qualquer controle**. Risco cru.

Pense numa aplicação web exposta à internet: antes do WAF, antes da validação de
entrada, antes de qualquer log ou monitoramento — quanto risco existe ali? Isso
é inerente. Ele se calcula pela natureza do ativo, pelo cenário de ameaças e
pelas vulnerabilidades conhecidas, sem contar nada que a equipe de segurança
tenha feito.

Serve para decidir **onde concentrar controle**: ativo de alto risco inerente
pede mais controle, mais monitoramento, mais atenção.

## Risco residual

É o que **sobra depois dos controles**. Você publicou o firewall, aplicou os
patches, instalou EDR, treinou os usuários contra phishing. Mesmo assim algum
risco permanece — sempre há a chance de um zero day, de um clique errado, de uma
configuração que escapou.

> **A armadilha da prova.** Um cenário descreve controles aplicados e pergunta o
> que resta. A resposta é sempre **risco residual**, nunca risco zero. Se alguma
> alternativa disser que o risco foi *eliminado*, é isca. Risco é gerenciado, não
> eliminado.

## Apetite de risco

É **quanto risco a organização aceita** em busca dos seus objetivos. Decisão de
negócio, não técnica — quem define é a liderança: conselho, CISO, diretoria. Ela
depende do setor, do ambiente regulatório e da tolerância a interrupção.

Startups costumam ter apetite alto: travar tudo mataria a vantagem competitiva.
Hospital, usina nuclear e instituição financeira têm apetite baixo, porque o
impacto de uma violação é severo demais.

Isso aparece direto na sua fila de trabalho: com apetite baixo, o SLA de
remediação é agressivo — achado crítico com 24 horas para corrigir. Com apetite
maior, o mesmo achado pode ter 30 dias. **Conhecer o apetite da sua organização
diz com que urgência escalar.**

## Tolerância a risco

É a **variação aceitável em torno do apetite** — a zona de amortecimento. Se o
apetite diz "aceitamos risco médio", a tolerância define quanto acima ou abaixo
disso ainda é aceitável antes de a liderança precisar intervir.

O exame às vezes oferece apetite e tolerância como alternativas na mesma questão.
**Apetite é a decisão estratégica** sobre quanto risco aceitar no geral;
**tolerância é o limiar específico** em torno dele. Escolha o que couber no
escopo do cenário.

## Como os quatro trabalham juntos

1. Identifique o ativo e avalie seu **risco inerente**
2. Aplique **controles** desenhados para reduzi-lo
3. Meça o **risco residual** que ficou
4. Compare com o **apetite**

Dentro do apetite, a operação está aceitável. Acima dele, é preciso mais
controle, outra estratégia ou uma conversa com a liderança.

O **NIST Risk Management Framework** formaliza isso em seis passos: *categorize,
select, implement, assess, authorize, monitor*. Você não precisa decorá-los em
profundidade, mas saber que o RMF é o framework federal padrão ajuda em questões
de cenário.
`.trim(),
      pontosChave: [
        "Risco inerente é o risco cru, antes de qualquer controle",
        "Risco residual é o que sobra depois dos controles — e nunca chega a zero",
        "Apetite de risco é decisão da liderança, não da equipe de segurança",
        "Tolerância é a variação aceitável em torno do apetite",
        "O objetivo dos controles é levar o risco inerente a um residual dentro do apetite",
        "RMF: categorize, select, implement, assess, authorize, monitor",
      ],
      dicaExame:
        "Esteja pronto para identificar qual tipo de risco o cenário descreve e para recomendar se mais controles são necessários — a régua é se o risco residual excede o apetite. Alternativa que fala em risco eliminado está errada.",
      tarefa:
        "Pegue um sistema que você conhece e responda: qual o risco inerente dele, quais controles existem hoje e o risco residual está dentro do que você consideraria aceitável?",
      recursos: [
        {
          titulo: "NIST Risk Management Framework",
          url: "https://csrc.nist.gov/projects/risk-management",
        },
      ],
    },
    {
      id: "s03l03",
      titulo: "As quatro estratégias de resposta ao risco",
      resumo:
        "Aceitar, transferir, evitar e mitigar — quando cada uma é a resposta certa, e o papel da exceção formal.",
      minutos: 17,
      tipo: "aula",
      objetivo: "2.4",
      conteudo: `
## A resposta nem sempre é "corrigir agora"

Isso surpreende quem está começando. No mundo real existe orçamento limitado,
tempo limitado e prioridades concorrentes — então a organização toma decisões
**deliberadas e documentadas** sobre cada risco.

São quatro estratégias, e elas estão listadas nos objetivos do exame: **aceitar,
transferir, evitar, mitigar**.

> Terça à tarde, o scanner aponta vulnerabilidade crítica num servidor interno de
> desenvolvimento. Ele não tem acesso à internet, não guarda dado sensível e será
> desativado em duas semanas. Você larga tudo para corrigir? Talvez não. Aceitar
> aquele risco por duas semanas pode ser a decisão certa — e, documentada, não é
> negligência: é alocação inteligente de recurso.

## Aceitar

A organização avaliou o risco e decidiu conscientemente seguir operando sem
mudar nada. **Não é ignorar** — essa distinção é crítica. Aceitação é escolha
documentada e deliberada: você conhece o risco, avaliou probabilidade e impacto e
concluiu que o custo de tratar supera o benefício, ou que ele cabe no apetite.

Cabe quando a severidade é baixa e a mitigação é desproporcionalmente cara,
quando o sistema será aposentado em breve, ou quando já existem controles
compensatórios reduzindo o risco a nível aceitável.

## Transferir

Desloca o **impacto financeiro** para um terceiro. A forma mais comum é o
**seguro cibernético**: a apólice cobre custos de violação, ransomware ou
interrupção de negócio.

Também há transferência ao terceirizar uma função para um MSSP — se ele é
contratualmente responsável por monitorar e detectar, parte da responsabilidade
se desloca, conforme o acordo de serviço.

> Transferência **não elimina** o risco. A ameaça continua existindo, a
> vulnerabilidade continua lá, seu dado ainda pode ser roubado. Alguém apenas
> ajuda a pagar a conta.

Efeito colateral útil de conhecer: seguradoras exigem controles específicos como
condição de cobertura — MFA, EDR, backups regulares. Quando chega uma lista de
requisitos do seguro, você está olhando controles obrigatórios por contrato,
movidos por uma estratégia de transferência.

## Evitar

Elimina o risco **interrompendo a atividade que o cria**. É a estratégia mais
agressiva e nem sempre é prática.

Uma aplicação legada de 2008, sem atualização há anos, com dezenas de achados
críticos, usada por três pessoas, e com substituto pronto: a jogada esperta pode
não ser corrigir, e sim **desativar**. Sem aplicação, sem superfície de ataque,
sem risco.

Vale também para atividade planejada: se a avaliação de uma integração nova
revela problemas sérios que não dá para mitigar, a resposta certa pode ser não
seguir com a integração.

## Mitigar

Reduz probabilidade ou impacto **aplicando controles**. É o feijão com arroz das
operações de segurança e o que você mais executa: aplicar patch reduz a
probabilidade de exploração; publicar MFA reduz o impacto de uma senha roubada;
segmentar a rede limita o raio de alcance.

Mitigação não zera o risco — o residual permanece — mas o traz para dentro do
apetite.

## Exceção de risco

Às vezes não dá para mitigar: o patch quebra uma aplicação crítica, o fabricante
ainda não publicou correção, o custo é proibitivo agora. Nesses casos a
organização registra uma **exceção formal**, dizendo: conhecemos o risco,
avaliamos, não conseguimos tratar por estes motivos, e aceitamos a exposição
temporária.

Ela precisa de três coisas para valer:

1. **Prazo** de resolução
2. **Assinatura** do nível de liderança adequado
3. **Data de revisão**

Risco identificado sem resposta documentada é problema. Com exceção formal, é
gestão.

A **ISO 31000** é a referência global de processos de gestão de risco, útil de
conhecer para questões que perguntam qual framework se aplica à gestão de risco
corporativo.
`.trim(),
      pontosChave: [
        "Quatro estratégias: aceitar, transferir, evitar e mitigar",
        "Aceitar é decisão documentada e intencional — não é ignorar",
        "Transferir desloca a consequência financeira, geralmente por seguro, sem eliminar o risco",
        "Evitar elimina o risco parando a atividade; é a opção mais agressiva",
        "Mitigar reduz probabilidade ou impacto com controles — é o que você faz no dia a dia",
        "Exceção de risco exige aprovação, documentação e data de revisão",
      ],
      dicaExame:
        "Leia o cenário inteiro antes de escolher: a estratégia certa vem do contexto, não da severidade isolada. Quando todas as opções de mitigação estão indisponíveis ou são proibitivas, a resposta é aceitação documentada — nunca omissão.",
      tarefa:
        "Pense num risco que você encontrou ou leu a respeito recentemente. Ele poderia ter sido aceito, transferido, evitado ou mitigado? Como cada resposta ficaria na prática?",
      recursos: [{ titulo: "ISO 31000", url: "https://www.iso.org/iso-31000-risk-management.html" }],
    },
    {
      id: "s03l04",
      titulo: "Tipos de controle: administrativo, técnico e físico",
      resumo:
        "As três categorias, o papel dos controles compensatórios e por que classificar pela natureza, não pelo meio.",
      minutos: 15,
      tipo: "aula",
      objetivo: "2.4",
      conteudo: `
## Três ângulos para o mesmo risco

Nem todo risco se resolve do mesmo jeito. Alguns se gerenciam por política e
processo, outros por tecnologia, outros por barreira física. Por isso existem
três tipos de controle — e os programas mais fortes empilham os três.

> Para proteger uma sala de servidores: você escreve uma política dizendo que só
> pessoal autorizado entra (**administrativo**), instala leitor de crachá com log
> de acesso na porta (**técnico**) e coloca fechadura e câmera (**físico**). Tire
> qualquer um dos três e aparece uma lacuna. Essa sobreposição é **defense in
> depth**.

## Administrativos

São baseados em política, orientados a processo e focados em pessoas. Não
envolvem hardware nem software: são regras escritas, treinamento, procedimentos e
decisões de governança.

Exemplos: política de segurança da informação, política de uso aceitável,
treinamento de conscientização, exigência de verificação de antecedentes,
segregação de funções, plano de resposta a incidentes.

Eles importam mais do que parece. A maioria das violações tem componente humano
em algum ponto — phishing, engenharia social, insider, senha fraca, erro de
configuração. Controle administrativo é o que trata dessa camada.

Na investigação, eles são o seu **quadro de autoridade**: a política de uso
aceitável diz o que era permitido; o procedimento de gestão de acesso diz que
acesso a pessoa deveria ter; o plano de resposta diz qual é o escalonamento
correto.

> Materiais mais antigos chamam esses controles de **managerial**. O CySA+ usa
> *administrativo*; se aparecer "managerial" numa alternativa, trate como a mesma
> categoria.

## Técnicos

São as salvaguardas baseadas em tecnologia, embutidas em sistemas, aplicações e
infraestrutura. É onde o analista passa a maior parte do tempo: firewalls,
IDS/IPS, antivírus e EDR, criptografia, MFA, listas de controle de acesso,
plataformas de SIEM, scanners de vulnerabilidade.

São poderosos porque operam continuamente, em escala, sem intervenção humana
depois de configurados.

Em nuvem eles são cada vez mais nativos: security groups e NACLs na AWS são
controles técnicos; logs do CloudTrail e detecções do GuardDuty também; políticas
do Defender for Cloud que forçam criptografia e bloqueiam acesso público são
controles técnicos embutidos na plataforma.

No SOC, são eles que geram a sua telemetria — todo alerta que você investiga
remonta a um controle técnico que detectou alguma coisa.

### Controles compensatórios

É a alternativa técnica usada quando o controle ideal não pode ser aplicado.
Acontece com sistema legado que não recebe patch ou software de terceiro sem
suporte a recurso moderno.

Se um sistema de controle industrial antigo não suporta MFA porque o fabricante
não oferece, você compensa colocando-o em segmento de rede isolado, com regras
estritas de firewall e monitoramento reforçado. Não dá para aplicar o controle
primário, então você empilha alternativas em volta do ativo para reduzir a
exposição.

## Físicos

São as barreiras tangíveis que protegem ativos no mundo real: fechaduras, crachá,
vigilante, biometria, CFTV, gaiolas em racks, supressão de incêndio, controle de
temperatura, cadeado de cabo em estação de trabalho.

Por que isso importa num curso de segurança digital? Porque **se o atacante
alcança o hardware fisicamente, a maior parte dos seus controles técnicos vira
irrelevante**. Ele pode levar um disco, dar boot por mídia externa ou plugar um
dispositivo que passa por cima da rede.

> O servidor mais endurecido do mundo, com firewall perfeito e disco totalmente
> criptografado, perde valor quando a porta da sala fica escorada com uma cadeira
> porque a equipe de limpeza insiste.

Na prática investigativa: log de crachá é evidência em caso de insider; imagem de
CFTV é dado forense em furto de hardware. Segurança física e digital se cruzam o
tempo todo.

## A armadilha da classificação

O exame adora dar um cenário e perguntar qual **tipo** de controle trata melhor
determinado risco.

Treinamento de conscientização *parece* técnico, porque é entregue por
plataforma digital. Mas é **administrativo**, porque o propósito é mudar
comportamento humano por política e educação.

**Classifique pela natureza e pelo propósito do controle, nunca pelo meio de
entrega.**

## Memória: ATP

- **A**dministrativo → pessoas e política
- **T**écnico → tecnologia e ferramentas
- **P**hísico → lugares e barreiras
`.trim(),
      pontosChave: [
        "Administrativos são política, processo e pessoas — às vezes chamados de managerial",
        "Técnicos são salvaguardas de tecnologia: firewall, EDR, SIEM, MFA, criptografia",
        "Físicos são barreiras tangíveis; acesso físico ao hardware anula controle técnico",
        "Compensatórios são substituições técnicas documentadas quando o controle primário não é possível",
        "Classifique pela natureza e propósito, não pelo meio de entrega",
        "Empilhar os três tipos é defense in depth",
      ],
      dicaExame:
        "Treinamento é administrativo mesmo entregue por plataforma digital. Regra de firewall é técnico. Fechadura é físico. Use ATP: pessoas, ferramentas, lugares.",
      tarefa:
        "Faça um inventário rápido do seu ambiente ou laboratório: cite um controle administrativo, um técnico e um físico em vigor. Se alguma categoria ficar vazia, essa é a sua lacuna.",
    },
    {
      id: "s03l05",
      titulo: "Funções de controle: preventivo, detectivo, responsivo e corretivo",
      resumo:
        "A segunda dimensão — não o que o controle é, mas o que ele faz — e como tipo e função se combinam na prova.",
      minutos: 16,
      tipo: "aula",
      objetivo: "2.4",
      conteudo: `
## A outra metade da história

Saber o **tipo** de um controle conta metade. A outra metade é o que ele **faz**
na sua arquitetura. São quatro funções: **preventivo, detectivo, responsivo e
corretivo**.

> Pense em como um banco protege o cofre. Portas trancadas, vigilantes e
> exigência de identificação existem para **impedir** o assalto. Sensores de
> movimento, câmeras e alarmes **detectam** quem tentar assim mesmo. Disparado o
> alarme, a segurança **responde**, contém a situação e aciona a polícia. Depois,
> o banco revisa as imagens, fecha a falha no perímetro e melhora o procedimento:
> **correção**.

Se o seu programa só cobre uma dessas funções, existe lacuna séria.

## Preventivos

Impedem o incidente de acontecer. Reduzem **probabilidade**, bloqueando na
origem.

Firewall que barra tráfego não autorizado, MFA que impede acesso mesmo com senha
roubada, criptografia que torna o dado roubado ilegível, treinamento que reduz a
chance do clique em phishing, controle de acesso que limita o que cada perfil
faz.

São a primeira linha — e nunca são perfeitos. Zero day passa por patch, phishing
sofisticado passa por treinamento, malware avançado passa por antivírus de
assinatura. É por isso que existe a camada detectiva: você previne o quanto dá e
**assume que algo vai passar**.

## Detectivos

Identificam e alertam sobre o incidente em curso ou já ocorrido. **Não bloqueiam
— enxergam.** Muita gente confunde com preventivo porque ambos parecem
"ferramenta de segurança". A diferença é momento e propósito: preventivo age
antes ou durante para barrar; detectivo observa e reporta.

IDS, plataformas de SIEM, EDR, monitoramento e análise de log, integridade de
arquivo, UEBA.

Para o analista de SOC, são a **fonte primária de trabalho**. Todo alerta que
você tria, toda busca que faz, toda anomalia que investiga começa num controle
detectivo. Escrever SPL no Splunk, KQL no Sentinel, revisar telemetria no
CrowdStrike Falcon — tudo é saída de controle detectivo.

SIEMs modernos somam machine learning à detecção por regra, criando baseline de
comportamento normal e sinalizando desvios que regra estática não pegaria.

## Responsivos

Limitam o dano de um incidente **já em andamento**. Função de contenção e reação
imediata.

Isolar um endpoint comprometido da rede, bloquear no firewall um IP já
identificado, desabilitar uma conta comprometida, disparar um runbook de SOAR que
coloca o dispositivo em quarentena e abre o chamado, ativar procedimentos de
continuidade.

Aqui **velocidade é tudo**. Num cenário de ransomware, cada segundo entre a
detecção e o isolamento é mais um sistema possivelmente sendo criptografado. EDRs
permitem isolar endpoint com um clique; plataformas de SOAR vão além e disparam o
isolamento sozinhas quando o limiar de detecção é cruzado — resposta em velocidade
de máquina para ameaça em velocidade de máquina.

## Corretivos

Restauram a operação **depois** do incidente e tratam a causa raiz para não
repetir. Função de recuperação e melhoria.

Restaurar de backup limpo após ransomware, aplicar o patch da vulnerabilidade
explorada, atualizar regra de firewall para o vetor usado, revisar política que
se mostrou inadequada, conduzir a revisão pós-incidente.

Repare que corretivo olha para **trás e para frente**: conserta o dano imediato e
fecha a lacuna que permitiu o incidente. Restaurar backup é corretivo porque
devolve a operação; aplicar o patch da falha explorada também é, porque trata a
causa.

A **revisão pós-incidente** é das atividades corretivas mais valiosas — e das
mais puladas. Dela saem regra nova de detecção no SIEM, runbook atualizado,
mudança de configuração no EDR e, às vezes, controle administrativo novo.

## Tipo × função

Todo controle tem **os dois**, e o exame cobra a combinação:

| Controle | Tipo | Função |
| --- | --- | --- |
| Firewall | Técnico | Preventivo |
| IDS | Técnico | Detectivo |
| Treinamento de conscientização | Administrativo | Preventivo |
| Porta trancada da sala de servidores | Físico | Preventivo |
| Isolamento de endpoint pelo EDR | Técnico | Responsivo |
| Restauração de backup | Técnico | Corretivo |

## Memória: PDRC

**P**revenir, **D**etectar, **R**esponder, **C**orrigir.
`.trim(),
      pontosChave: [
        "Preventivo impede o incidente e reduz probabilidade",
        "Detectivo identifica o incidente em curso ou ocorrido — observa e alerta, não bloqueia",
        "Responsivo limita o dano durante o incidente: contém e isola",
        "Corretivo restaura a operação e trata a causa raiz depois do incidente",
        "Todo controle tem tipo e função, e a prova cobra as duas dimensões",
        "PDRC: prevenir, detectar, responder, corrigir",
      ],
      dicaExame:
        "Identifique em que estágio do ciclo do ataque o cenário está: antes do incidente é preventivo; durante a detecção é detectivo; no comprometimento ativo é responsivo; depois é corretivo.",
      tarefa:
        "Pegue três ferramentas que você conhece — um firewall, um IDS e um sistema de backup são um bom começo — e classifique cada uma por tipo e por função. Se alguma combinação te surpreender, vale revisar.",
    },
    {
      id: "s03l06",
      titulo: "Políticas, governança e SLOs",
      resumo:
        "A moldura administrativa que decide quais controles existem, quem responde por eles e o que conta como bom desempenho.",
      minutos: 16,
      tipo: "aula",
      objetivo: "4.2",
      conteudo: `
## Controle nenhum se instala sozinho

Alguém decidiu que aquele controle precisava existir. Alguém escreveu que ele era
obrigatório. Alguém definiu como seria medido. E alguém responde se ele falhar.
Isso é governança — e é o que transforma segurança de uma coleção de ferramentas
em um programa estruturado.

> São 2h da manhã, você é tier 1, recebe um alerta crítico, investiga, confirma
> que é incidente real e escala. Ninguém responde. Por quê? Não existe política de
> sobreaviso documentada, nem SLO dizendo que incidente crítico deve ser
> reconhecido em 15 minutos, nem estrutura de governança cobrando cobertura fora
> do horário do tier 2. **A detecção técnica funcionou perfeitamente e o programa
> falhou**, porque faltava a moldura administrativa em volta.

## A hierarquia dos documentos

| Nível | O que é |
| --- | --- |
| **Política** | Regras amplas e obrigatórias, definidas pela liderança |
| **Padrão** | Requisitos específicos e mensuráveis que sustentam a política |
| **Procedimento** | Instruções passo a passo para executar a tarefa |
| **Diretriz** | Recomendação, não exigência |

Política diz **o que deve ser feito e por quê**; o **como** desce para padrão,
procedimento e diretriz.

Exemplos de política: uso aceitável, segurança da informação, senhas, resposta a
incidentes, classificação de dados.

Para o analista, políticas são o **quadro de autoridade**. Ao investigar suspeita
de insider e precisar puxar logs de e-mail de um usuário, é a política de uso
aceitável que define se aquele monitoramento foi informado e se o seu acesso ao
dado é autorizado. Ao decidir isolar um sistema de produção durante incidente
ativo, é a política de resposta que diz qual é a sua autoridade e que aprovações
são necessárias.

## Governança

É o sistema de regras, práticas e processos pelo qual a organização dirige e
controla suas operações. Em segurança, garante que as atividades estejam
alinhadas aos objetivos do negócio, que a responsabilidade esteja atribuída e que
as decisões cheguem ao nível certo de liderança.

- **Conselho e diretoria** — definem apetite de risco, aprovam investimento e
  cobram o CISO pelo desempenho do programa
- **Gestão** — traduz a direção executiva em política e padrão, fiscaliza
  conformidade e aloca recurso
- **Operação**, onde você vive — segue política e procedimento, documenta ações e
  escala quando algo sai do previsto

Falhas de governança são das razões mais comuns para um programa não funcionar:
sem priorização no conselho, ferramenta e equipe não são financiadas; sem
fiscalização consistente, usuários criam contornos que geram risco; sem
documentação na operação, não há trilha de auditoria durante a investigação.

Governança também é o mecanismo que resolve **conflito**. Um patch crítico
precisa ser aplicado, mas o dono do sistema resiste porque a janela de manutenção
afetaria o SLA dele com clientes. O que resolve? Um processo definido de
escalonamento, com decisão documentada sobre se o risco de adiar é aceitável.

## SLOs

Um **service level objective** é uma meta específica e mensurável de desempenho.
Ele pega o requisito abstrato da política e o transforma em número que a equipe
persegue.

Comuns em operações de segurança:

- Alerta crítico triado em até 15 minutos
- Vulnerabilidade de alta severidade remediada em até 30 dias
- Resposta a incidente iniciada em até 1 hora da confirmação
- 95% de conformidade de patch em até 14 dias do lançamento crítico

Por que importam para você: **definem sua expectativa de desempenho** (se o SLO
diz 15 minutos e você leva 45 sistematicamente, isso precisa ser escalado);
**dirigem priorização** (com 50 achados abertos e tempo limitado, o SLO diz o que
é para hoje); e **criam responsabilidade** entre segurança e as áreas de negócio
— quando o dono de um sistema quer adiar um patch, o SLO é o documento que
explica por que aquilo vira problema de conformidade.

O acompanhamento hoje é automatizado: dá para montar painel calculando MTTD, MTTR
e tempo de remediação em tempo real contra as metas.

## Frameworks de conformidade

Muitas organizações não desenham política e governança do zero: alinham a
frameworks estabelecidos — **PCI DSS** para ambiente de cartões, **HIPAA** para
dado de saúde, **SOC 2** para prestadores de serviço, **ISO 27001** para gestão
de segurança da informação.

Seu trabalho encosta neles com frequência: achados de varredura com prazo de
remediação definido por PCI DSS, retenção de log ditada por exigência regulatória,
prazos de resposta que precisam atender notificação obrigatória.

> **Na prova.** Cenários mostram uma equipe querendo agir enquanto governança ou
> política impõem restrição — uma varredura agressiva violaria SLA com parceiro,
> um controle novo exige política ainda não aprovada. A resposta correta quase
> sempre é **escalar pelo processo de governança**, não agir por conta própria.
`.trim(),
      pontosChave: [
        "Hierarquia: política, padrão, procedimento, diretriz",
        "Política diz o que fazer e por quê; o como desce para os níveis abaixo",
        "Governança atribui responsabilidade e alinha segurança aos objetivos do negócio",
        "SLOs transformam política em meta mensurável e dirigem priorização",
        "Frameworks como PCI DSS, HIPAA e ISO 27001 moldam política de fora para dentro",
        "Falha de governança gera risco de segurança real, mesmo com detecção técnica funcionando",
      ],
      dicaExame:
        "Quando restrição de governança bloqueia uma ação de segurança, a resposta correta é escalonamento pelos canais adequados — nunca ação unilateral.",
      tarefa:
        "Encontre uma política de segurança na sua organização, ou um conjunto público de exemplo. Consegue identificar as camadas de política, padrão, procedimento e diretriz? Consegue apontar algum SLO embutido nesses documentos?",
    },
    {
      id: "s03l07",
      titulo: "Alinhando controles ao risco do negócio",
      resumo:
        "BIA, as três perguntas da seleção de controle, lacunas documentadas e como traduzir risco técnico em linguagem de negócio.",
      minutos: 18,
      tipo: "aula",
      objetivo: "4.1",
      conteudo: `
## A habilidade que muda a carreira

Você pode dominar tipo de controle, função de controle, estratégia de risco e
governança. Mas se não conectar isso ao que o negócio realmente valoriza, o
programa vive brigando por orçamento e correndo atrás do prejuízo.

Toda organização tem recurso limitado. Não dá para instalar todo controle
possível em todo lugar ao mesmo tempo — é preciso escolher. E a forma certa de
escolher é **alinhar ao risco do negócio**.

Parece óbvio dito em voz alta. Na prática, programas se desalinham o tempo todo:
compra-se um controle porque o fornecedor vendeu bem, porque um concorrente sofreu
violação, ou porque um checkbox de framework exigiu — sem nunca perguntar se
aquilo trata os riscos que importam para **aquela** organização.

> Um provedor de saúde tem como ativo mais crítico o prontuário eletrônico. A
> equipe passou três meses e boa parte do orçamento anual publicando uma solução
> avançada de análise de tráfego para ambiente OT — enquanto ninguém revisa o
> controle de acesso ao prontuário há dois anos. O controle instalado é
> tecnicamente válido e **não trata o risco que mais importa**.

## Business Impact Analysis

O alinhamento começa na **BIA**: avaliação estruturada que identifica quais
funções, sistemas e dados são mais críticos para a operação. Ela responde o que
acontece se o sistema cair por uma hora, um dia, uma semana — e qual o impacto
financeiro, regulatório e reputacional.

A saída é uma visão priorizada dos ativos mais críticos, ordenada pelo impacto
que a perda deles causaria. Sabendo disso, você sabe onde concentrar os controles
mais robustos, o monitoramento mais sensível e os SLOs mais agressivos. Ativos
menos críticos recebem controles proporcionais ao seu valor.

Na prática, a BIA aparece como **etiqueta de criticidade** no inventário de
ativos e como rótulo de prioridade na plataforma de vulnerabilidades. Quando o
scanner devolve centenas de achados, é essa criticidade que os ordena — e é por
isso que uma vulnerabilidade **média** num banco de prontuários pode ter
prioridade acima de uma **alta** num servidor de teste em desativação.

## As três perguntas da seleção

1. **Este controle reduz risco de um ativo que importa ao negócio?** Se não trata
   ameaça real a ativo real, provavelmente não é a prioridade agora.
2. **Ele é proporcional ao valor do ativo e à severidade do risco?** Gastar
   R$ 100 mil por ano para proteger um ativo de R$ 50 mil não fecha a conta.
3. **Ele conversa com a arquitetura que já existe?** Defense in depth é empilhar
   controles que se complementam, não acumular ferramentas que tratam a mesma
   ameaça do mesmo jeito.

## Equilíbrio pelo NIST CSF

Mapear os controles nas cinco funções — identify, protect, detect, respond,
recover — evita um programa torto. Um programa bem alinhado tem: capacidade forte
de *identify* (você conhece seus ativos e riscos), controles de *protect*
escalados pela criticidade, *detect* robusto sobre os sistemas mais críticos,
*respond* com procedimentos e SLOs definidos, e *recover* testado contra o tempo
máximo de indisponibilidade que a BIA apontou.

Se uma dessas áreas está muito mais fraca que as outras, essa lacuna é risco de
negócio não gerenciado.

## Lacunas de controle

Mesmo em organizações bem estruturadas haverá controles que não dá para instalar
agora — orçamento, sistema legado, requisito operacional conflitante. Quando
existe distância entre o controle que a avaliação pede e o que você tem, há duas
opções responsáveis:

- **Escalar** a lacuna à liderança com um caso de negócio para fechá-la
- **Documentar formalmente uma aceitação de risco**, explicando por que ela
  existe, quem responde por ela e quando será revista

O que nunca se faz é deixar a lacuna sem registro e torcer. Isso não é aceitação
de risco: é negligência.

Ao encontrar uma lacuna, documente com clareza qual controle falta, que risco
isso cria, quais controles compensatórios existem e qual a remediação recomendada.

## Traduzir para linguagem de negócio

Liderança não pensa em CVE nem em nota CVSS. Pensa em receita, reputação,
exposição regulatória e confiança do cliente.

Compare:

> "Temos uma vulnerabilidade crítica com CVSS 9.8 na aplicação web."

Isso não significa quase nada para um diretor financeiro. Agora:

> "Nossa aplicação voltada ao cliente tem uma falha explorável conhecida que
> permitiria a um atacante acessar dados de pagamento. Pelo nosso volume de
> transações, um vazamento nos exporia a multa sob PCI DSS, a risco de ação
> coletiva e a perda de clientes. Recomendamos aplicar o patch neste fim de
> semana: custa cerca de quatro horas de janela de manutenção e algum tempo de
> desenvolvimento. A alternativa é manter a exposição aberta."

Mesmo risco, enquadramento completamente diferente. **O segundo é o que gera
ação.**
`.trim(),
      pontosChave: [
        "A BIA identifica quais ativos e funções são mais críticos e ordena a prioridade",
        "Criticidade do ativo pode colocar um achado médio à frente de um alto",
        "Seleção de controle: trata risco real? é proporcional? complementa a arquitetura?",
        "O NIST CSF ajuda a equilibrar o programa nas cinco funções",
        "Lacuna de controle exige escalonamento ou aceitação formal — nunca silêncio",
        "Para a liderança, traduza achado técnico em receita, reputação e exposição regulatória",
      ],
      dicaExame:
        "Em cenários que pedem a abordagem de comunicação de um achado, a resposta correta quase sempre favorece o enquadramento por impacto de negócio quando o público é liderança ou não técnico. E a recomendação certa é a que melhor alinha investimento ao risco, não a que instala a ferramenta mais impressionante.",
      tarefa:
        "Pegue um achado técnico real ou fictício e escreva duas versões do mesmo alerta: uma para a equipe de segurança e outra para a diretoria. Compare o que precisou mudar.",
    },
    {
      id: "s03l08",
      titulo: "Checkpoint: gestão de risco e controles",
      resumo:
        "Consolidação das sete lições: risco, cálculo de perda esperada, estratégias de resposta, tipos e funções de controle, governança e alinhamento ao negócio.",
      minutos: 20,
      tipo: "checkpoint",
      rota: "/simulado?secao=s03",
    },
  ],
};
