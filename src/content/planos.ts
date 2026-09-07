export type PlanId = "mensal" | "trimestral" | "anual";

export type Plan = {
  id: PlanId;
  nome: string;
  descricao: string;
  precoCentavos: number;
  /** Preço "cheio" para exibir riscado (opcional). */
  precoDeCentavos?: number;
  intervalo: "mês" | "3 meses" | "ano";
  /** Equivalente mensal, para comparação honesta entre os planos. */
  equivalenteMensalCentavos: number;
  destaque?: boolean;
  selo?: string;
  beneficios: string[];
  /** ID do Price recorrente no Stripe (definido por variável de ambiente). */
  stripePriceEnv: string;
  /** Payment Link do Stripe (alternativa sem backend). */
  paymentLinkEnv: string;
};

export const PLANOS: Plan[] = [
  {
    id: "mensal",
    nome: "Mensal",
    descricao: "Para quem quer começar hoje e avaliar sem compromisso.",
    precoCentavos: 4990,
    intervalo: "mês",
    equivalenteMensalCentavos: 4990,
    beneficios: [
      "Acesso a todas as seções publicadas do CS0-004",
      "Banco de questões com explicação comentada",
      "Simulados cronometrados por domínio e por seção",
      "Estudo offline no celular (PWA instalável)",
      "Cancele quando quiser",
    ],
    stripePriceEnv: "STRIPE_PRICE_MENSAL",
    paymentLinkEnv: "NEXT_PUBLIC_STRIPE_LINK_MENSAL",
  },
  {
    id: "trimestral",
    nome: "Trimestral",
    descricao: "O ciclo típico de preparação para a prova, com desconto.",
    precoCentavos: 12990,
    precoDeCentavos: 14970,
    intervalo: "3 meses",
    equivalenteMensalCentavos: 4330,
    destaque: true,
    selo: "Mais escolhido",
    beneficios: [
      "Tudo do plano Mensal",
      "Plano de estudos de 12 semanas",
      "Simulado em modo prova, com 85 questões ponderadas pelos pesos oficiais",
      "Revisão final por domínio ponderada pelo peso do exame",
      "Relatório de desempenho por domínio",
    ],
    stripePriceEnv: "STRIPE_PRICE_TRIMESTRAL",
    paymentLinkEnv: "NEXT_PUBLIC_STRIPE_LINK_TRIMESTRAL",
  },
  {
    id: "anual",
    nome: "Anual",
    descricao: "Melhor custo por mês e cobertura até o dia da prova, com as seções novas incluídas.",
    precoCentavos: 39700,
    precoDeCentavos: 59880,
    intervalo: "ano",
    equivalenteMensalCentavos: 3308,
    selo: "Melhor valor",
    beneficios: [
      "Tudo do plano Trimestral",
      "Laboratórios guiados (SIEM, triagem, resposta e inglês para SOC)",
      "Novas seções publicadas durante todo o ano",
      "Modelos de relatório de incidente e de vulnerabilidades",
      "Acesso à comunidade e sessões de dúvidas",
    ],
    stripePriceEnv: "STRIPE_PRICE_ANUAL",
    paymentLinkEnv: "NEXT_PUBLIC_STRIPE_LINK_ANUAL",
  },
];

export function getPlano(id: string): Plan | undefined {
  return PLANOS.find((p) => p.id === id);
}

export function formatarBRL(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
