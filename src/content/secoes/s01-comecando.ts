import type { Secao } from "../types";

export const s01: Secao = {
  id: "s01",
  numero: 1,
  titulo: "Começando: o analista, o exame e o percurso",
  fase: "f0",
  dominio: null,
  // Fundamentos: abrem no primeiro dia de assinatura.
  diasParaLiberar: 0,
  descricao:
    "Quem você está se tornando, qual prova você vai enfrentar e como este curso está organizado para te levar até lá.",
  objetivos: [
    "Descrever o que um cybersecurity analyst faz no dia a dia",
    "Explicar a estrutura de tiers de um SOC",
    "Conhecer o formato do CS0-004 e o peso de cada domínio",
    "Montar um study tracker e usar o ritmo learn → checkpoint → lab → review",
  ],
  licoes: [
    {
      id: "s01l01",
      titulo: "Boas-vindas: o que é este curso e como aproveitá-lo",
      resumo:
        "O que você encontra aqui, o que esperar de cada seção e como tirar o máximo do seu tempo de estudo.",
      minutos: 8,
      tipo: "aula",
      gratis: true,
      roteiro: [
        "O que este curso é e o que ele não é",
        "Para quem foi desenhado",
        "Como usar os checkpoints e os labs",
        "Compromisso de tempo semanal sugerido",
      ],
    },
    {
      id: "s01l02",
      titulo: "O papel do cybersecurity analyst",
      resumo:
        "O que o analista faz de verdade, como o SOC se organiza em tiers e onde a sua responsabilidade começa e termina.",
      minutos: 14,
      tipo: "aula",
      objetivo: "1.5",
      gratis: true,
      conteudo: `
## O CySA+ não é "mais um cert de TI"

Muita gente acha que o CySA+ é só um Security+ mais difícil. Não é. O Security+
diz que você entende conceitos e controles. O CySA+ diz outra coisa:

> Você é capaz de **detectar ameaças, analisar ataques e responder a incidentes**
> dentro de uma operação de segurança real.

Isso é um conjunto de habilidades fundamentalmente diferente de configurar
firewall e rodar scanner.

## O que faz um cybersecurity analyst

No nível mais básico, o analista é a pessoa responsável por **monitorar** o
ambiente, **detectar** ameaças, **analisar** atividade suspeita e **conduzir a
resposta** quando algo dá errado.

- Você não escreve as regras do firewall — você observa o tráfego que passa por ele.
- Você não redige a política de vulnerabilidades — você faz a varredura e reporta o que encontrou.

### A cena que define o trabalho

São 23h no SOC e um alerta dispara no SIEM. A mesma conta de usuário autenticou
em Nova York às 22h45 e em Londres às 22h52. Sete minutos de diferença —
fisicamente impossível.

Neste momento, **você** é a pessoa responsável por descobrir o que aconteceu,
qual o tamanho do problema e o que fazer em seguida. Esse é o papel do analista:
você é o detetive. Todo o resto do curso existe para te deixar melhor nisso.

## Como o trabalho se organiza: os tiers

A maioria das equipes de operações de segurança se organiza em **tiers 1 a 3**.
Isso cai na prova e existe no trabalho, porque define o seu escopo de
responsabilidade.

### Tier 1 — alert monitoring e triage

Você acompanha a fila do SIEM, olha alertas, decide o que merece escalar e
resolve o que é rotina. É o primeiro par de olhos em tudo que chega. O volume é
alto e a maior parte é ruído: seu trabalho é achar o sinal no ruído, **rápido**.

Na prova, questões que pedem para priorizar alertas são pensamento de tier 1 —
velocidade e precisão de triagem, e saber separar *true positive* de
*false positive* em pouco tempo.

### Tier 2 — investigação de incidentes

O chamado chega do tier 1 porque algo não fechou. Aqui você faz o mergulho:
correlaciona eventos entre várias fontes de log, olha telemetria de endpoint no
EDR e responde três perguntas:

1. Isso é mesmo um ataque?
2. Até onde se espalhou?
3. No que o atacante tocou?

É onde ferramentas como o Splunk viram sua melhor amiga — você escreve queries,
correlaciona eventos e monta a **timeline** do que aconteceu. E começa a aplicar
frameworks como o **MITRE ATT&CK** (attack.mitre.org), que mapeia comportamento
de adversário para táticas e técnicas.

> Exemplo: um alerta mostra execução de PowerShell com comando codificado e, em
> seguida, uma conexão de saída para um IP incomum. Você mapeia isso para as
> táticas de *Execution* e *Command and Control* no ATT&CK. Esse mapeamento diz
> o que procurar em seguida e dá linguagem comum para comunicar o achado.

### Tier 3 — threat hunting e investigação avançada

São os analistas mais experientes. Aqui você **não espera o alerta**: sai
procurando ameaças que ainda não fizeram barulho. Constrói o caso a partir de
threat intelligence e caça evidência no ambiente.

Quando um relatório diz que um grupo está usando técnicas de *living off the
land* — abusando de ferramentas legítimas do Windows como WMI, certutil ou
PowerShell em vez de largar malware — você leva isso para o EDR (CrowdStrike
Falcon, Microsoft Defender for Endpoint) e caça esses comportamentos de forma
proativa. Você procura **ferramentas legítimas fazendo coisas ilegítimas**.

### E o "tier 4"

Muitos SOCs têm ainda uma função de **security engineering**: constrói as regras
de detecção, faz o tuning do SIEM e mantém o ferramental. São eles que garantem
que tier 1 e tier 2 tenham os alertas certos para trabalhar.

## O ambiente moderno do analista

Este trabalho é diferente do que era há cinco anos. Hoje o analista opera em
ambiente **híbrido**: de manhã monitora infraestrutura on-premise, de tarde
investiga a execução suspeita de uma função Lambda na AWS.

| Nuvem | Onde você olha |
| --- | --- |
| AWS | CloudTrail para atividade de API, GuardDuty para detecção automatizada |
| Azure | Microsoft Sentinel como SIEM **e** SOAR, com ML que sinaliza sign-in anômalo |

O papel expandiu: você não monitora só log de rede — monitora **identidades,
recursos de nuvem, containers e endpoints** ao mesmo tempo.

E os SOCs usam cada vez mais plataformas **SOAR** (Security Orchestration,
Automation and Response), como Palo Alto XSOAR ou Splunk SOAR, para automatizar
o repetitivo. Um alerta rotineiro de phishing pode ser enriquecido com threat
intelligence e fechado ou escalado sem ninguém tocar no teclado. A automação
não substitui o analista: **libera você para o que exige julgamento humano**.
`.trim(),
      pontosChave: [
        "O analista monitora, detecta, analisa e responde — essa é a missão central",
        "Tier 1 faz triagem e resposta inicial; tier 2, investigação profunda; tier 3, threat hunting proativo",
        "SIEM (Splunk, Sentinel) é a plataforma de análise; EDR (CrowdStrike, Defender) dá visibilidade de endpoint",
        "MITRE ATT&CK é o framework para entender comportamento de adversário e caçar técnicas específicas",
        "O analista moderno trabalha em ambiente híbrido: on-premise mais AWS e Azure",
        "SOAR automatiza o repetitivo e devolve tempo para a investigação complexa",
      ],
      dicaExame:
        "Espere questões de cenário como: “um analista de tier 1 recebe um alerta de autenticação de dois locais geograficamente impossíveis — qual o melhor primeiro passo?”. A resposta gira em torno de triagem e escalonamento, não de remediação imediata. Conheça as fronteiras de responsabilidade de cada tier.",
      tarefa:
        "Abra attack.mitre.org e passe 10 minutos navegando pelo framework: veja algumas táticas e as técnicas abaixo delas. Familiarize-se com a estrutura — ela aparece o curso inteiro.",
      recursos: [
        { titulo: "MITRE ATT&CK", url: "https://attack.mitre.org" },
      ],
    },
    {
      id: "s01l03",
      titulo: "Estrutura do exame CS0-004 e os quatro domínios",
      resumo:
        "Formato da prova, tipos de questão, PBQs e o peso de cada domínio — a base para decidir onde gastar seu tempo.",
      minutos: 16,
      tipo: "aula",
      gratis: true,
      conteudo: `
## O que o CS0-004 testa

O CS0-004 é a versão atualizada da certificação de analista da CompTIA e
**sucede o CS0-003**, refletindo como o papel evoluiu. A experiência recomendada
é de cerca de **4 anos** em função de analista de SOC nível 2 ou analista de
vulnerabilidades.

Você pode ainda não ter esses quatro anos — tudo bem. Mas a recomendação diz
algo importante sobre a profundidade da prova: **não é conteúdo de superfície**.

## Dois tipos de questão

- **Múltipla escolha** — o que você espera.
- **PBQ (performance-based question)** — coloca você em um ambiente simulado e
  pede para completar uma tarefa: analisar um conjunto de logs, configurar uma
  ferramenta, conduzir um cenário de incidente. Testam se você **faz**, não se
  você descreve.

## Os quatro domínios e seus pesos

| Domínio | Peso | O que cobra |
| --- | --- | --- |
| 1.0 Security Operations | **34%** | Arquitetura, indicadores maliciosos, ferramentas, threat intel e melhoria de processo |
| 2.0 Vulnerability Management | **26%** | Ciclo de vulnerabilidades, leitura de scan, CVSS e priorização |
| 3.0 Incident Response and Management | **24%** | Ciclo de IR, ferramentas de resposta, artefatos e forense |
| 4.0 Reporting and Communication | **16%** | Relatórios, públicos distintos, causa raiz e recomendações |

### Domínio 1 — Security Operations (34%)

O maior pedaço. É o trabalho diário de operar segurança: arquitetura de sistemas
e rede, análise de indicadores de atividade potencialmente maliciosa, uso das
ferramentas certas para decidir se algo é realmente malicioso, threat
intelligence, threat hunting e eficiência de processo.

A pergunta de fundo é: *você consegue olhar um processo suspeito, uma conexão
estranha ou uma autenticação anômala e descobrir o que está acontecendo?* É aqui
que suas habilidades de SIEM pesam mais.

### Domínio 2 — Vulnerability Management (26%)

Não é só rodar scanner e entregar relatório. A prova testa **interpretar** a
saída e **decidir**. Se um scan traz 200 achados, ela quer saber em quais você
age primeiro e por quê.

CVSS importa — mas contexto manda: um **9.8 em ambiente de teste isolado** pode
importar menos que um **6.5 em produção exposta à internet**.

### Domínio 3 — Incident Response and Management (24%)

Cobre o ciclo de resposta da detecção à atividade pós-incidente, mais
ferramentas de resposta, análise de artefatos e conceitos forenses.

As PBQs desse domínio costumam ser as mais difíceis da prova, porque simulam
cenários de vários passos em que a sua decisão no passo 1 muda o que precisa ser
feito no passo 3.

### Domínio 4 — Reporting and Communication (16%)

O domínio que surpreende. Parece "mais leve" que os outros — e é exatamente
onde muita gente perde ponto sem esperar. Cobra comunicar achados ao público
certo (relatório técnico ≠ sumário executivo), apoiar análise de causa raiz,
tratar evidência e cadeia de custódia de forma defensável e dar recomendações
acionáveis.

## Os domínios formam um fluxo

1. Você **opera** um ambiente de segurança todo dia — domínio 1
2. Você **identifica e gerencia vulnerabilidades** nele — domínio 2
3. Quando há incidente, você **responde** de forma sistemática — domínio 3
4. E o tempo todo você **comunica** achados e apoia decisões — domínio 4

Este curso segue o mesmo fluxo. Ao estudar, marque mentalmente cada conteúdo com
o seu domínio: isso torna muito mais fácil enxergar lacunas perto da prova.

> A ordem das fases do IR é cobrada como **sequência**, não só como
> reconhecimento: preparação → detecção e análise → contenção → erradicação →
> recuperação → atividade pós-incidente.
`.trim(),
      pontosChave: [
        "Pesos do CS0-004: 34% operações, 26% vulnerabilidades, 24% resposta a incidentes, 16% relatórios",
        "PBQs são tarefas em ambiente simulado e aparecem nos quatro domínios",
        "Priorize domínios 1 e 2 em tempo bruto de estudo, mas não abandone o domínio 4",
        "Priorização de vulnerabilidade é contexto, não só nota CVSS",
        "Saiba as fases do IR na ordem — a prova cobra sequência",
      ],
      dicaExame:
        "Quando o objetivo oficial começa com “given a scenario…”, é sinal de que a CompTIA vai pedir para executar a tarefa, não para defini-la. Trate esses objetivos como lista de prática prática.",
      tarefa:
        "Baixe os objetivos oficiais do CS0-004 no site da CompTIA e deixe o PDF aberto enquanto avança no curso. Cada lição aponta para um objetivo.",
      recursos: [
        {
          titulo: "Objetivos oficiais do exame (CompTIA)",
          url: "https://www.comptia.org/certifications/cybersecurity-analyst",
        },
        {
          titulo: "NIST Cybersecurity Framework",
          url: "https://www.nist.gov/cyberframework",
        },
      ],
    },
    {
      id: "s01l04",
      titulo: "Roadmap do curso: as quatro fases",
      resumo:
        "Por que o curso não segue a ordem dos objetivos da CompTIA e como usar o ritmo learn → checkpoint → lab → review.",
      minutos: 12,
      tipo: "aula",
      gratis: true,
      conteudo: `
## O curso é a rota, não o destino

Se os objetivos do CS0-004 são o destino, este curso é a rota. E, como todo bom
GPS, ele nem sempre pega o caminho mais direto: pega o **melhor** caminho.

Os objetivos da CompTIA são organizados por domínio **para fins de prova**, não
para ensinar alguém a pensar como analista. Seguir aquela ordem faria você pular
de threat intelligence para varredura de vulnerabilidade e para relatório sem
conectar os conceitos.

## As quatro fases

**Fase 1 — Seu ambiente de operação.** Antes de detectar qualquer coisa, é
preciso entender o que você está olhando: o SOC, arquitetura de rede e sistemas,
segurança de sistema operacional, logging, identidade e proteção de dados. Você
precisa saber como é o **normal** antes de reconhecer o anormal.

**Fase 2 — Detecção e análise.** Aqui o conhecimento do ambiente começa a
trabalhar: indicadores de comprometimento, plataformas de threat intelligence
como MISP e OpenCTI, MITRE ATT&CK, caça proativa e as ferramentas de análise —
captura de pacotes com Wireshark e tcpdump, correlação no SIEM, análise de
arquivos e sandbox, scripting.

**Fase 3 — Vulnerabilidades e resposta a incidentes.** Ciclo completo de
vulnerabilidades, da descoberta à priorização com CVSS e EPSS, remediação e
gestão de superfície de ataque. Depois, o ciclo de resposta a incidentes inteiro.

**Fase 4 — Relatórios e comunicação.** Combater ameaça é metade do trabalho.
Comunicar achado para público técnico e não técnico é a outra metade.

Quando você chega a um conceito da fase 3, já tem a base das fases 1 e 2 para
entendê-lo na hora. É esse pensamento conectado que a prova cobra.

## As tags de objetivo

Cada lição traz a referência do objetivo oficial no formato **OBJ 1.5** ou
**OBJ 3.2**. O primeiro número é o domínio:

1. Security Operations
2. Vulnerability Management
3. Incident Response and Management
4. Reporting and Communication

Assim você sempre sabe onde está no blueprint da prova e o que ainda falta.

## O ritmo: learn → checkpoint → lab → review

1. **Learn** — avance pelas lições da seção.
2. **Checkpoint** — toda seção termina em um checkpoint. Ele não é recapitulação:
   é consolidação. Se algo ficou nebuloso ali, esse é o sinal de voltar. Empurrar
   por cima da lacuna não fecha a lacuna: só deixa a próxima seção mais difícil.
3. **Lab** — pratique nas ferramentas enquanto o conceito está fresco. É isso que
   fixa o reconhecimento de padrão que as PBQs exigem.
4. **Review** — antes de começar uma seção nova, gaste cinco minutos revendo as
   anotações da anterior. Repetição espaçada é das técnicas mais bem sustentadas
   por pesquisa, e custa cinco minutos.

## Monte seu study tracker

Caderno de papel, Google Docs, Notion, OneNote, app de notas — o que funcionar.
Registre o que aprendeu, o que te surpreendeu, quais conceitos ficaram frágeis e
quais objetivos você já cobriu. Isso transforma assistir passivo em
aprendizado ativo.
`.trim(),
      pontosChave: [
        "O curso segue quatro fases: ambiente, detecção e análise, vulnerabilidades e resposta, relatórios",
        "Cada lição traz a tag do objetivo oficial (OBJ x.y) para você rastrear o blueprint",
        "Ritmo recomendado: learn → checkpoint → lab → review",
        "Checkpoint nebuloso é sinal de voltar, não de seguir",
        "Study tracker transforma assistir em aprender",
      ],
      dicaExame:
        "Usar as tags de objetivo de forma consistente é a maneira mais eficaz de garantir que nada escapou antes do dia da prova.",
      tarefa:
        "Crie agora a primeira entrada do seu study tracker com o título “CS0-004 — Roadmap”. Anote os quatro domínios e seus pesos, uma fase pela qual você está ansioso e uma que parece desconfortável. A desconfortável é de onde vem a sua nota.",
    },
  ],
};
