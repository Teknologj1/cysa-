// GERADO POR scripts/gerar-catalogo.mjs — NÃO EDITE À MÃO.
//
// Metadados do curso seguros para o navegador. O corpo das lições e o banco de
// questões ficam fora daqui de propósito: eles só saem do servidor para quem
// tem direito de acesso.
import type { SecaoPublica } from "@/features/curso/lib/publico";

export const SECOES_CATALOGO: SecaoPublica[] = [
  {
    "id": "s01",
    "numero": 1,
    "titulo": "Começando: o analista, o exame e o percurso",
    "fase": "f0",
    "dominio": null,
    "descricao": "Quem você está se tornando, qual prova você vai enfrentar e como este curso está organizado para te levar até lá.",
    "objetivos": [
      "Descrever o que um cybersecurity analyst faz no dia a dia",
      "Explicar a estrutura de tiers de um SOC",
      "Conhecer o formato do CS0-004 e o peso de cada domínio",
      "Montar um study tracker e usar o ritmo learn → checkpoint → lab → review"
    ],
    "licoes": [
      {
        "id": "s01l01",
        "titulo": "Boas-vindas: o que é este curso e como aproveitá-lo",
        "resumo": "O que você encontra aqui, o que esperar de cada seção e como tirar o máximo do seu tempo de estudo.",
        "minutos": 8,
        "tipo": "aula",
        "gratis": true
      },
      {
        "id": "s01l02",
        "titulo": "O papel do cybersecurity analyst",
        "resumo": "O que o analista faz de verdade, como o SOC se organiza em tiers e onde a sua responsabilidade começa e termina.",
        "minutos": 14,
        "tipo": "aula",
        "objetivo": "1.5",
        "gratis": true
      },
      {
        "id": "s01l03",
        "titulo": "Estrutura do exame CS0-004 e os quatro domínios",
        "resumo": "Formato da prova, tipos de questão, PBQs e o peso de cada domínio — a base para decidir onde gastar seu tempo.",
        "minutos": 16,
        "tipo": "aula",
        "gratis": true
      },
      {
        "id": "s01l04",
        "titulo": "Roadmap do curso: as quatro fases",
        "resumo": "Por que o curso não segue a ordem dos objetivos da CompTIA e como usar o ritmo learn → checkpoint → lab → review.",
        "minutos": 12,
        "tipo": "aula",
        "gratis": true
      }
    ]
  },
  {
    "id": "s02",
    "numero": 2,
    "titulo": "Fundamentos de operações de segurança",
    "fase": "f1",
    "dominio": "d1",
    "descricao": "O que é um SOC, quem trabalha nele, como o trabalho flui da detecção à resolução e o que precisa ser monitorado o tempo todo.",
    "objetivos": [
      "Descrever os três modelos de SOC e suas trocas",
      "Atribuir uma ação de análise ao tier correto",
      "Sequenciar o fluxo de alerta até resolução",
      "Identificar lacunas de monitoramento em um ambiente descrito",
      "Reconhecer falhas de handover como causa raiz de problemas operacionais"
    ],
    "licoes": [
      {
        "id": "s02l01",
        "titulo": "Introdução ao Security Operations Center",
        "resumo": "O que um SOC é, os três modelos de operação, as quatro funções centrais e a diferença entre SIEM e SOAR.",
        "minutos": 18,
        "tipo": "aula",
        "objetivo": "1.5",
        "gratis": true
      },
      {
        "id": "s02l02",
        "titulo": "Papéis e responsabilidades no SOC",
        "resumo": "A estrutura de tiers, o que cada nível realmente faz e os papéis especialistas que sustentam a equipe.",
        "minutos": 16,
        "tipo": "aula",
        "objetivo": "1.5"
      },
      {
        "id": "s02l03",
        "titulo": "Workflows e processos de operações de segurança",
        "resumo": "Do alerta à resolução: priorização por severidade, triagem, playbooks, runbooks, escalonamento e case management.",
        "minutos": 17,
        "tipo": "aula",
        "objetivo": "1.5"
      },
      {
        "id": "s02l04",
        "titulo": "Conceitos de monitoramento contínuo",
        "resumo": "As cinco categorias de fonte de dados, o que cada uma enxerga e por que lacuna de monitoramento é o ponto cego que o atacante usa.",
        "minutos": 20,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s02l05",
        "titulo": "Operação em turnos e procedimentos de handover",
        "resumo": "Como o SOC mantém continuidade 24/7 e por que handover quebrado transforma evento gerenciável em incidente.",
        "minutos": 15,
        "tipo": "aula",
        "objetivo": "4.2"
      },
      {
        "id": "s02l06",
        "titulo": "Lab: inglês para o SOC",
        "resumo": "Treino de listening e pronúncia com o vocabulário que aparece no exame e no dia a dia da operação.",
        "minutos": 20,
        "tipo": "lab",
        "rota": "/lab-ingles"
      },
      {
        "id": "s02l07",
        "titulo": "Checkpoint: fundamentos de operações de segurança",
        "resumo": "Consolidação das cinco lições: estrutura do SOC, papéis, workflows, monitoramento contínuo e handover.",
        "minutos": 15,
        "tipo": "checkpoint",
        "rota": "/simulado?secao=s02"
      }
    ]
  },
  {
    "id": "s03",
    "numero": 3,
    "titulo": "Gestão de risco e controles de segurança",
    "fase": "f1",
    "dominio": "d2",
    "descricao": "Por que cada controle existe: risco, como medi-lo, as quatro respostas possíveis e como escolher controles que o negócio entende e financia.",
    "objetivos": [
      "Explicar risco como interseção de ameaça, vulnerabilidade e impacto",
      "Calcular ALE e SLE em uma questão baseada em desempenho",
      "Distinguir risco inerente, residual, apetite e tolerância",
      "Escolher entre aceitar, transferir, evitar e mitigar conforme o contexto",
      "Classificar um controle por tipo e por função",
      "Alinhar a seleção de controles ao que o negócio precisa proteger"
    ],
    "licoes": [
      {
        "id": "s03l01",
        "titulo": "O que é risco em cibersegurança",
        "resumo": "A interseção de ameaça, vulnerabilidade e impacto, e como medir risco por probabilidade e severidade.",
        "minutos": 16,
        "tipo": "aula",
        "objetivo": "2.4"
      },
      {
        "id": "s03l02",
        "titulo": "Risco inerente, residual, apetite e tolerância",
        "resumo": "Os quatro conceitos que estruturam toda conversa de risco — e a armadilha do risco zero.",
        "minutos": 15,
        "tipo": "aula",
        "objetivo": "2.4"
      },
      {
        "id": "s03l03",
        "titulo": "As quatro estratégias de resposta ao risco",
        "resumo": "Aceitar, transferir, evitar e mitigar — quando cada uma é a resposta certa, e o papel da exceção formal.",
        "minutos": 17,
        "tipo": "aula",
        "objetivo": "2.4"
      },
      {
        "id": "s03l04",
        "titulo": "Tipos de controle: administrativo, técnico e físico",
        "resumo": "As três categorias, o papel dos controles compensatórios e por que classificar pela natureza, não pelo meio.",
        "minutos": 15,
        "tipo": "aula",
        "objetivo": "2.4"
      },
      {
        "id": "s03l05",
        "titulo": "Funções de controle: preventivo, detectivo, responsivo e corretivo",
        "resumo": "A segunda dimensão — não o que o controle é, mas o que ele faz — e como tipo e função se combinam na prova.",
        "minutos": 16,
        "tipo": "aula",
        "objetivo": "2.4"
      },
      {
        "id": "s03l06",
        "titulo": "Políticas, governança e SLOs",
        "resumo": "A moldura administrativa que decide quais controles existem, quem responde por eles e o que conta como bom desempenho.",
        "minutos": 16,
        "tipo": "aula",
        "objetivo": "4.2"
      },
      {
        "id": "s03l07",
        "titulo": "Alinhando controles ao risco do negócio",
        "resumo": "BIA, as três perguntas da seleção de controle, lacunas documentadas e como traduzir risco técnico em linguagem de negócio.",
        "minutos": 18,
        "tipo": "aula",
        "objetivo": "4.1"
      },
      {
        "id": "s03l08",
        "titulo": "Checkpoint: gestão de risco e controles",
        "resumo": "Consolidação das sete lições: risco, cálculo de perda esperada, estratégias de resposta, tipos e funções de controle, governança e alinhamento ao negócio.",
        "minutos": 20,
        "tipo": "checkpoint",
        "rota": "/simulado?secao=s03"
      }
    ]
  }
];

/** Seções que possuem checkpoint, para o seletor do simulado. */
export const SECOES_COM_CHECKPOINT: {
  id: string;
  numero: number;
  titulo: string;
}[] = [
  {
    "id": "s01",
    "numero": 1,
    "titulo": "Começando: o analista, o exame e o percurso"
  },
  {
    "id": "s02",
    "numero": 2,
    "titulo": "Fundamentos de operações de segurança"
  },
  {
    "id": "s03",
    "numero": 3,
    "titulo": "Gestão de risco e controles de segurança"
  }
];

export const TOTAL_LICOES_CATALOGO = 19;
export const TOTAL_QUESTOES = 58;
export const TOTAL_QUESTOES_GRATIS = 11;

export function getSecaoCatalogo(id: string): SecaoPublica | undefined {
  return SECOES_CATALOGO.find((secao) => secao.id === id);
}

export function minutosDaSecaoCatalogo(secao: SecaoPublica): number {
  return secao.licoes.reduce((total, licao) => total + licao.minutos, 0);
}
