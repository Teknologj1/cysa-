import type { Questao } from "../types";

/** Checkpoint da seção 3 — gestão de risco e controles de segurança. */
export const QUESTOES_S03: Questao[] = [
  {
    id: "s03q1",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "Um servidor de banco de dados está avaliado em R$ 250.000. A equipe estima que um ataque bem-sucedido comprometeria 30% desse valor. Qual é a single loss expectancy (SLE)?",
    alternativas: ["R$ 7.500", "R$ 75.000", "R$ 83.333", "R$ 175.000"],
    correta: 1,
    explicacao:
      "SLE = valor do ativo × fator de exposição = 250.000 × 0,3 = R$ 75.000. O fator de exposição é a fração do valor perdida em um único incidente, não a probabilidade de ele ocorrer.",
    gratis: true,
  },
  {
    id: "s03q2",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "A SLE de um incidente de ransomware é R$ 40.000 e a equipe estima que ele ocorra uma vez a cada quatro anos. Qual é a annual loss expectancy (ALE)?",
    alternativas: ["R$ 4.000", "R$ 10.000", "R$ 40.000", "R$ 160.000"],
    correta: 1,
    explicacao:
      "Uma vez a cada quatro anos significa ARO = 0,25. ALE = SLE × ARO = 40.000 × 0,25 = R$ 10.000 por ano. O erro comum é multiplicar por 4 em vez de dividir.",
  },
  {
    id: "s03q3",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "Um ativo vale R$ 500.000, o fator de exposição estimado é 0,2 e o evento ocorre em média uma vez a cada dois anos. Um controle proposto custa R$ 60.000 por ano. A matemática sustenta o investimento?",
    alternativas: [
      "Sim: a ALE é R$ 100.000, acima do custo do controle",
      "Não: a ALE é R$ 50.000, abaixo do custo do controle",
      "Sim: a ALE é R$ 250.000, muito acima do custo",
      "Não é possível decidir sem o valor da apólice de seguro",
    ],
    correta: 1,
    explicacao:
      "SLE = 500.000 × 0,2 = 100.000. ARO = 0,5. ALE = 100.000 × 0,5 = R$ 50.000 por ano. Um controle de R$ 60.000 anuais custa mais do que a perda esperada — a análise quantitativa não sustenta o gasto nesse formato.",
  },
  {
    id: "s03q4",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "Uma organização aplicou firewall, patches, EDR e treinamento de conscientização sobre um sistema crítico. O que existe depois desses controles?",
    alternativas: [
      "Risco residual",
      "Risco inerente",
      "Risco eliminado",
      "Risco transferido",
    ],
    correta: 0,
    explicacao:
      "O que resta depois dos controles é risco residual, e ele nunca chega a zero. Alternativa que fale em risco eliminado é isca: risco é gerenciado, não eliminado.",
    gratis: true,
  },
  {
    id: "s03q5",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "Uma aplicação web será exposta à internet. Antes de qualquer WAF, validação de entrada ou monitoramento, a equipe avalia o risco. Que tipo de risco está sendo medido?",
    alternativas: [
      "Risco residual",
      "Risco inerente",
      "Risco de tolerância",
      "Risco compensado",
    ],
    correta: 1,
    explicacao:
      "Risco inerente é o risco cru, antes de qualquer controle. Ele é calculado pela natureza do ativo, pelo cenário de ameaças e pelas vulnerabilidades conhecidas, e serve para decidir onde concentrar controle.",
  },
  {
    id: "s03q6",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado: "Quem define o apetite de risco de uma organização?",
    alternativas: [
      "A equipe de segurança, a partir dos achados de varredura",
      "A liderança — conselho, diretoria e CISO",
      "O provedor de nuvem, conforme o modelo de responsabilidade compartilhada",
      "O auditor externo, durante a certificação",
    ],
    correta: 1,
    explicacao:
      "Apetite de risco é decisão de negócio, tomada pela liderança conforme setor, ambiente regulatório e tolerância a interrupção. A equipe de segurança opera dentro dele — inclusive nos prazos de SLA que ele determina.",
  },
  {
    id: "s03q7",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "Um scanner aponta vulnerabilidade crítica em um servidor interno de desenvolvimento, sem acesso à internet, sem dado sensível e com desativação agendada para duas semanas. A liderança avalia e decide não corrigir. Que estratégia é essa?",
    alternativas: [
      "Negligência, por não corrigir achado crítico",
      "Aceitação de risco documentada",
      "Transferência de risco",
      "Mitigação por controle compensatório",
    ],
    correta: 1,
    explicacao:
      "Aceitação é decisão consciente e documentada de seguir operando sem mudar nada, cabível quando a exposição é baixa e o prazo de vida do sistema é curto. O que separa aceitação de negligência é justamente o registro da decisão.",
  },
  {
    id: "s03q8",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "A organização contratou seguro cibernético cobrindo custos de violação de dados. Qual é o efeito real dessa decisão sobre o risco?",
    alternativas: [
      "A ameaça e a vulnerabilidade deixam de existir",
      "Apenas a consequência financeira é deslocada para o terceiro",
      "O risco residual passa a ser zero",
      "A responsabilidade regulatória passa integralmente à seguradora",
    ],
    correta: 1,
    explicacao:
      "Transferência desloca o impacto financeiro, não o risco. A ameaça continua, a vulnerabilidade continua e o dado ainda pode ser roubado — alguém apenas ajuda a pagar a conta. Seguradoras costumam, inclusive, exigir controles como condição de cobertura.",
  },
  {
    id: "s03q9",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "Uma aplicação legada de 2008, sem atualização há anos e com dezenas de achados críticos, é usada por três pessoas. Um substituto moderno está pronto para entrar. Qual é a resposta ao risco mais adequada?",
    alternativas: [
      "Mitigar, aplicando patches virtuais no WAF",
      "Aceitar, já que apenas três pessoas usam",
      "Evitar, desativando a aplicação",
      "Transferir, ampliando a cobertura do seguro",
    ],
    correta: 2,
    explicacao:
      "Evitar elimina o risco interrompendo a atividade que o cria. Com substituto pronto, desativar remove a superfície de ataque inteira — resultado que nenhuma mitigação sobre um sistema legado alcançaria.",
  },
  {
    id: "s03q10",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "Um programa de treinamento de conscientização em segurança é entregue por uma plataforma digital, com módulos e simulações de phishing. Como esse controle é classificado?",
    alternativas: [
      "Técnico, porque é entregue por plataforma digital",
      "Administrativo, porque muda comportamento humano por política e educação",
      "Físico, porque ocorre nas instalações da empresa",
      "Compensatório, porque substitui filtros de e-mail",
    ],
    correta: 1,
    explicacao:
      "Classifique pela natureza e pelo propósito do controle, nunca pelo meio de entrega. O objetivo é mudar comportamento das pessoas, então é administrativo — a plataforma é só o canal.",
  },
  {
    id: "s03q11",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "Um sistema de controle industrial legado não suporta MFA porque o fabricante não oferece o recurso. A equipe o coloca em segmento isolado, com regras estritas de firewall e monitoramento reforçado. Como se chama essa abordagem?",
    alternativas: [
      "Controle compensatório",
      "Aceitação de risco",
      "Controle corretivo",
      "Transferência de risco",
    ],
    correta: 0,
    explicacao:
      "Controle compensatório é a alternativa usada quando o controle primário não pode ser aplicado. Ele não substitui o ideal em qualidade: reduz a exposição enquanto o primário permanece inviável, e deve ser documentado.",
  },
  {
    id: "s03q12",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "2.4",
    enunciado:
      "Um IDS analisa o tráfego de rede e gera alerta quando identifica padrão de ataque, sem bloquear a conexão. Qual é o tipo e a função desse controle?",
    alternativas: [
      "Técnico e preventivo",
      "Técnico e detectivo",
      "Administrativo e detectivo",
      "Técnico e responsivo",
    ],
    correta: 1,
    explicacao:
      "É técnico porque é uma salvaguarda baseada em tecnologia, e detectivo porque observa e alerta sem bloquear. Se bloqueasse — como um IPS — a função passaria a preventiva.",
  },
  {
    id: "s03q13",
    secaoId: "s03",
    dominio: "d3",
    objetivo: "2.4",
    enunciado:
      "Depois de conter um incidente, a equipe restaura os sistemas a partir de backup limpo e aplica o patch da vulnerabilidade que foi explorada. Qual é a função desses controles?",
    alternativas: ["Preventiva", "Detectiva", "Responsiva", "Corretiva"],
    correta: 3,
    explicacao:
      "Controles corretivos restauram a operação e tratam a causa raiz. Eles olham para trás, consertando o dano, e para frente, fechando a lacuna que permitiu o incidente.",
  },
  {
    id: "s03q14",
    secaoId: "s03",
    dominio: "d1",
    objetivo: "2.4",
    enunciado:
      "Detectado um endpoint comprometido, o analista o isola da rede com um clique no console do EDR, impedindo que a infecção se espalhe. Qual é a função desse controle?",
    alternativas: ["Preventiva", "Detectiva", "Responsiva", "Corretiva"],
    correta: 2,
    explicacao:
      "Controles responsivos limitam o dano de um incidente já em andamento: contêm e isolam. A detecção veio antes; a restauração e o tratamento da causa raiz virão depois, como correção.",
  },
  {
    id: "s03q15",
    secaoId: "s03",
    dominio: "d4",
    objetivo: "4.2",
    enunciado:
      "A equipe de segurança quer executar uma varredura agressiva que violaria o SLA acordado com um parceiro de negócio. Qual é a conduta correta?",
    alternativas: [
      "Executar a varredura fora do horário comercial, sem avisar",
      "Escalar o conflito pelo processo de governança para decisão documentada",
      "Cancelar a varredura e registrar o ativo como fora de escopo",
      "Reduzir a intensidade até que não viole o SLA, sem informar ninguém",
    ],
    correta: 1,
    explicacao:
      "Restrições de governança são reais e existem por acordo. O caminho é o escalonamento pelo processo definido, com decisão registrada sobre o risco de agir ou de adiar — nunca ação unilateral.",
  },
  {
    id: "s03q16",
    secaoId: "s03",
    dominio: "d2",
    objetivo: "4.1",
    enunciado:
      "O scanner retorna uma vulnerabilidade de severidade média em um banco de prontuários eletrônicos e uma de severidade alta em um servidor de teste marcado para desativação. O que a análise de impacto ao negócio indica?",
    alternativas: [
      "Tratar primeiro a alta, porque a severidade técnica é maior",
      "Tratar primeiro a média, pela criticidade do ativo para o negócio",
      "Tratar as duas na mesma janela, para simplificar o processo",
      "Adiar as duas até a próxima reavaliação de risco",
    ],
    correta: 1,
    explicacao:
      "A criticidade que vem da BIA é o que ordena a fila. Um achado médio em ativo essencial ao negócio, com dado regulado, supera um achado alto em servidor de teste que será desligado.",
  },
  {
    id: "s03q17",
    secaoId: "s03",
    dominio: "d4",
    objetivo: "4.2",
    enunciado:
      "Em uma organização, qual documento estabelece requisitos específicos e mensuráveis que sustentam uma política, sem chegar ao passo a passo de execução?",
    alternativas: ["Diretriz", "Padrão", "Procedimento", "Exceção de risco"],
    correta: 1,
    explicacao:
      "A hierarquia é política, padrão, procedimento e diretriz. A política diz o que deve ser feito; o padrão define os requisitos mensuráveis; o procedimento traz o passo a passo; a diretriz é recomendação, não exigência.",
  },
];
