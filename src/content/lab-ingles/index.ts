/**
 * SOC English Lab — treino de listening e pronúncia com o vocabulário que
 * aparece no exame e na operação. As passagens ficam em inglês de propósito:
 * o objetivo é justamente treinar o idioma técnico.
 */

export type PerguntaLab = {
  pergunta: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
};

export type PassagemLab = {
  id: string;
  titulo: string;
  /** Texto em inglês, lido pela síntese de voz do navegador. */
  texto: string;
  perguntas: PerguntaLab[];
};

export type TermoLab = {
  termo: string;
  ipa: string;
  nota: string;
};

export const PASSAGENS: PassagemLab[] = [
  {
    id: "p1",
    titulo: "Alert triage — monólogo de tier 1",
    texto:
      "It's just past midnight and the alert queue already has forty-two open items. Most of them are noise — a failed login here, a routine scan there. But one entry catches my eye: the same user account authenticated from two countries seven minutes apart. That's physically impossible, so I pull the raw log, check the source IP, and pivot into the EDR tool to see what that endpoint was doing at the same time. Within two minutes I've made the call: this is a true positive, and it needs to go to tier two right now.",
    perguntas: [
      {
        pergunta: "What made the analyst suspicious about the alert?",
        alternativas: [
          "The user logged in from two countries seven minutes apart",
          "The queue had forty-two items",
          "A scan failed twice",
          "The EDR tool went offline",
        ],
        correta: 0,
        explicacao:
          "Impossible travel — dois logins de países diferentes com poucos minutos de intervalo — é sinal clássico de true positive.",
      },
      {
        pergunta: "What did the analyst do after noticing the alert?",
        alternativas: [
          "Closed it as a false positive immediately",
          "Pulled the log and pivoted into the EDR tool",
          "Escalated straight to the SOC manager",
          "Ignored it until the next shift",
        ],
        correta: 1,
        explicacao:
          "“Pivot into” a ferramenta de EDR significa ir checar a telemetria de endpoint para confirmar o que está realmente acontecendo.",
      },
    ],
  },
  {
    id: "p2",
    titulo: "SIEM vs SOAR — explicação curta",
    texto:
      "People mix these two up all the time, so let's separate them clearly. A SIEM collects logs from your firewalls, endpoints, and cloud services, then correlates that data and fires an alert when something matches a rule. It's a detection and correlation engine. A SOAR sits on top of that. When an alert fires, the SOAR can automatically check a suspicious IP address against threat intelligence, quarantine an infected device, and open a ticket, all without a human touching a keyboard. So remember it this way: the SIEM detects, and the SOAR responds.",
    perguntas: [
      {
        pergunta: "According to the explainer, what does a SIEM primarily do?",
        alternativas: [
          "Automates ticket creation only",
          "Collects and correlates logs, then fires alerts",
          "Physically blocks malicious IP addresses",
          "Replaces the incident response team",
        ],
        correta: 1,
        explicacao:
          "O SIEM é descrito como motor de detecção e correlação. Automatizar a resposta é papel do SOAR.",
      },
      {
        pergunta: "What can a SOAR do automatically, according to the passage?",
        alternativas: [
          "Hire new analysts",
          "Check an IP against threat intel, quarantine a device, and open a ticket",
          "Write the exam objectives",
          "Delete the SIEM's correlation rules",
        ],
        correta: 1,
        explicacao:
          "Essa cadeia de ações automáticas — enriquecer, colocar em quarentena e abrir chamado — é exatamente o trabalho do SOAR.",
      },
    ],
  },
  {
    id: "p3",
    titulo: "Shift handover — uma cena curta",
    texto:
      "The overnight analyst walks in at eleven, coffee in hand, and opens the handover document before touching the alert queue. The day shift left a clear note: a suspicious PowerShell execution on a finance workstation, already confirmed malicious, currently being contained. There's also a watch item — a spike in failed logins from one subnet, nothing serious yet, but worth another look. Because the handover was written down, not just mentioned in passing, the overnight analyst picks up exactly where the last shift left off, instead of starting from zero.",
    perguntas: [
      {
        pergunta: "Why could the overnight analyst continue the investigation smoothly?",
        alternativas: [
          "Because the day shift left a written handover document",
          "Because the SIEM sent an automatic summary email",
          "Because the SOC manager called them personally",
          "Because the alert queue was empty",
        ],
        correta: 0,
        explicacao:
          "Handover escrito é o que preserva o contexto entre turnos. Menção de passagem não sobrevive à fila de alertas do turno seguinte.",
      },
      {
        pergunta: "What was listed as a watch item?",
        alternativas: [
          "A confirmed ransomware infection",
          "A spike in failed logins from one subnet",
          "A new SOAR runbook",
          "A change in shift schedule",
        ],
        correta: 1,
        explicacao:
          "Watch items são coisas que merecem acompanhamento mas ainda não chegaram ao nível de caso formal.",
      },
    ],
  },
];

export const TERMOS: TermoLab[] = [
  {
    termo: "queue",
    ipa: "/kjuː/",
    nota: "Soa exatamente como a letra Q — não é “kwê” nem “kiú-ê”.",
  },
  {
    termo: "escalate",
    ipa: "/ˈɛs.kə.leɪt/",
    nota: "Tônica na primeira sílaba: ES-ca-late.",
  },
  {
    termo: "breach",
    ipa: "/briːtʃ/",
    nota: "Rima com “teach”. Uma sílaba só.",
  },
  {
    termo: "dwell time",
    ipa: "/dwɛl taɪm/",
    nota: "Quanto tempo o atacante permanece sem ser detectado dentro da rede.",
  },
  {
    termo: "triage",
    ipa: "/triˈɑːʒ/",
    nota: "Vem do francês — o final soa “ázh”, não “êidj”.",
  },
  {
    termo: "pivot into",
    ipa: "/ˈpɪv.ət ˈɪn.tuː/",
    nota: "Phrasal verb: mudar o foco para outra ferramenta ou fonte de dados.",
  },
  {
    termo: "dig into",
    ipa: "/dɪɡ ˈɪn.tuː/",
    nota: "Investigar algo a fundo.",
  },
  {
    termo: "exfiltrate",
    ipa: "/ˈɛks.fɪl.treɪt/",
    nota: "Roubar dados para fora da rede. Tônica na primeira sílaba.",
  },
  {
    termo: "vulnerability",
    ipa: "/ˌvʌl.nər.əˈbɪl.ə.ti/",
    nota: "Cinco sílabas, tônica em “-BIL-”.",
  },
  {
    termo: "eventually",
    ipa: "/ɪˈvɛn.tʃu.ə.li/",
    nota: "Falso cognato: significa “no fim das contas”, não “eventualmente”.",
  },
];
