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
    "diasParaLiberar": 0,
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
    "diasParaLiberar": 0,
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
  },
  {
    "id": "s04",
    "numero": 4,
    "titulo": "Conceitos de infraestrutura de sistemas",
    "fase": "f1",
    "dominio": "d1",
    "descricao": "O terreno que você defende: on-premise, nuvem, híbrido, virtualização, containers, APIs e dispositivos. Sem esse mapa, você não sabe o que é normal — e o que não é passa despercebido.",
    "objetivos": [
      "Comparar arquiteturas on-premise, cloud e híbrida do ponto de vista de monitoramento",
      "Aplicar o modelo de responsabilidade compartilhada a um cenário de nuvem",
      "Distinguir hypervisor tipo 1 de tipo 2 e explicar o risco de VM escape",
      "Identificar os principais riscos de segurança em Docker e Kubernetes",
      "Reconhecer enumeração de API e credential stuffing em logs de acesso",
      "Diferenciar MDM, MAM e UEM e explicar o ponto cego de dispositivos não gerenciados"
    ],
    "licoes": [
      {
        "id": "s04l01",
        "titulo": "Infraestrutura e arquitetura de sistemas",
        "resumo": "On-premise, nuvem, híbrido, SDN e IAM: onde ficam os logs, onde ficam as fronteiras de confiança e por onde um atacante pivota.",
        "minutos": 18,
        "tipo": "aula",
        "objetivo": "1.1",
        "gratis": true
      },
      {
        "id": "s04l02",
        "titulo": "Arquitetura cloud native",
        "resumo": "Microsserviços, serverless, infraestrutura como código e as fontes de log que substituem o SIEM tradicional.",
        "minutos": 20,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s04l03",
        "titulo": "Virtualização e segurança",
        "resumo": "Hypervisor tipo 1 e tipo 2, VM escape, VM sprawl, abuso de snapshot e o ponto cego do tráfego east-west.",
        "minutos": 18,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s04l04",
        "titulo": "Containers: Docker e Kubernetes",
        "resumo": "Kernel compartilhado, imagem envenenada, RBAC mal configurado, API server exposta e as duas ferramentas que dão visibilidade: Falco e o audit log.",
        "minutos": 20,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s04l05",
        "titulo": "Conceitos de API",
        "resumo": "REST, OWASP API Security Top 10, autenticação por chave e OAuth, e o que enumeração e credential stuffing parecem num log.",
        "minutos": 18,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s04l06",
        "titulo": "Lab: enumeração de API em logs de acesso",
        "resumo": "Comparar tráfego normal com enumeração num log real, e praticar a disciplina de não concluir mais do que a evidência sustenta.",
        "minutos": 25,
        "tipo": "lab",
        "objetivo": "1.1"
      },
      {
        "id": "s04l07",
        "titulo": "Gestão de dispositivos",
        "resumo": "MDM, MAM, UEM, EDR, zero trust e IoT: por que dispositivo não gerenciado é ponto cego de monitoramento.",
        "minutos": 18,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s04l08",
        "titulo": "Checkpoint: infraestrutura de sistemas",
        "resumo": "Consolidação das sete lições: arquiteturas, responsabilidade compartilhada, virtualização, containers, APIs e gestão de dispositivos.",
        "minutos": 20,
        "tipo": "checkpoint",
        "rota": "/simulado?secao=s04"
      }
    ]
  },
  {
    "id": "s05",
    "numero": 5,
    "titulo": "Arquitetura de rede",
    "fase": "f1",
    "dominio": "d1",
    "descricao": "O perímetro acabou e algo tomou o lugar dele: identidade e segmentação. Zero trust, SASE, rede híbrida, isolamento em incidente e as práticas que separam quem detecta em minutos de quem descobre meses depois.",
    "objetivos": [
      "Explicar deperimetrização e os quatro fatores que a causaram",
      "Distinguir zero trust como princípio de SASE como arquitetura",
      "Escolher entre site-to-site VPN e link dedicado num cenário híbrido",
      "Separar segmentação (preventiva) de isolamento (reativa)",
      "Reconhecer beaconing, exfiltração e DNS tunneling em tráfego de saída",
      "Identificar controles ausentes a partir de um cenário de rede"
    ],
    "licoes": [
      {
        "id": "s05l01",
        "titulo": "Fundamentos de arquitetura de rede",
        "resumo": "Por que o modelo de castelo e fosso morreu, o que tomou o lugar dele e como on-premise, nuvem e híbrido mudam o seu monitoramento.",
        "minutos": 18,
        "tipo": "aula",
        "objetivo": "1.1",
        "gratis": true
      },
      {
        "id": "s05l02",
        "titulo": "Zero Trust Network Architecture",
        "resumo": "Nunca confie, sempre verifique: os quatro componentes, por que movimento lateral fica muito mais difícil e por que ZTNA não é VPN.",
        "minutos": 20,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s05l03",
        "titulo": "SASE: secure access service edge",
        "resumo": "Os cinco componentes que a Gartner juntou num serviço só, e por que zero trust e SASE são coisas relacionadas mas diferentes.",
        "minutos": 18,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s05l04",
        "titulo": "Rede híbrida: conectando on-premise e nuvem",
        "resumo": "Site-to-site VPN, links dedicados, transit gateways — e por que o atacante procura justamente a costura entre os dois ambientes.",
        "minutos": 18,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s05l05",
        "titulo": "Segmentação e isolamento",
        "resumo": "Segmentação é o que você constrói antes; isolamento é o que você faz no meio do incidente. E por que isolar, nunca desligar.",
        "minutos": 20,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s05l06",
        "titulo": "Boas práticas de segurança de rede",
        "resumo": "Menor privilégio na rede, defesa em profundidade, NAC, filtragem de saída e baseline — e por que quem não conhece a prática não reconhece a violação.",
        "minutos": 20,
        "tipo": "aula",
        "objetivo": "1.1"
      },
      {
        "id": "s05l07",
        "titulo": "Lab: reconhecendo beaconing no Wireshark",
        "resumo": "Gerar tráfego periódico controlado, isolá-lo com filtros de exibição e praticar de novo o limite entre o que a evidência mostra e o que ela não prova.",
        "minutos": 25,
        "tipo": "lab",
        "objetivo": "1.1"
      },
      {
        "id": "s05l08",
        "titulo": "Checkpoint: arquitetura de rede",
        "resumo": "Consolidação das seis lições e do lab: deperimetrização, zero trust, SASE, rede híbrida, segmentação, isolamento e monitoramento de saída.",
        "minutos": 20,
        "tipo": "checkpoint",
        "rota": "/simulado?secao=s05"
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
  },
  {
    "id": "s04",
    "numero": 4,
    "titulo": "Conceitos de infraestrutura de sistemas"
  },
  {
    "id": "s05",
    "numero": 5,
    "titulo": "Arquitetura de rede"
  }
];

export const TOTAL_LICOES_CATALOGO = 35;
export const TOTAL_QUESTOES = 104;
export const TOTAL_QUESTOES_GRATIS = 13;

export function getSecaoCatalogo(id: string): SecaoPublica | undefined {
  return SECOES_CATALOGO.find((secao) => secao.id === id);
}

export function minutosDaSecaoCatalogo(secao: SecaoPublica): number {
  return secao.licoes.reduce((total, licao) => total + licao.minutos, 0);
}
