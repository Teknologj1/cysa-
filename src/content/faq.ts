export type ItemFaq = { pergunta: string; resposta: string };

export const FAQ: ItemFaq[] = [
  {
    pergunta: "O curso cobre a versão atual do exame?",
    resposta:
      "Sim. Todo o conteúdo é organizado sobre os objetivos do CS0-003, respeitando o peso oficial de cada domínio: 33% Operações de Segurança, 30% Gestão de Vulnerabilidades, 20% Resposta a Incidentes e 17% Relatórios e Comunicação.",
  },
  {
    pergunta: "Preciso de experiência prévia?",
    resposta:
      "A CompTIA recomenda Security+ ou equivalente e cerca de 4 anos de experiência prática. O módulo 2 revisa os fundamentos de rede, identidade e logs para quem está vindo direto do Security+.",
  },
  {
    pergunta: "A assinatura inclui o voucher da prova?",
    resposta:
      "Não. A assinatura dá acesso ao material de preparação. O voucher do exame é comprado separadamente na CompTIA ou em um revendedor autorizado.",
  },
  {
    pergunta: "Consigo estudar offline?",
    resposta:
      "Sim. O app é um PWA instalável: depois de instalado, as páginas já visitadas e o banco de questões ficam disponíveis mesmo sem internet, e o seu progresso é gravado no próprio aparelho.",
  },
  {
    pergunta: "Como funciona o cancelamento?",
    resposta:
      "A assinatura é recorrente e pode ser cancelada a qualquer momento pela própria conta. O acesso permanece ativo até o fim do período já pago, sem multa.",
  },
  {
    pergunta: "Quais formas de pagamento são aceitas?",
    resposta:
      "O checkout é processado pelo Stripe, com cartão de crédito e os meios habilitados na sua conta Stripe. Os dados do cartão não passam pelo app.",
  },
  {
    pergunta: "Este curso é oficial da CompTIA?",
    resposta:
      "Não. É um material independente de preparação. CompTIA, CySA+ e CS0-003 são marcas da CompTIA, sem vínculo, patrocínio ou endosso a este produto.",
  },
];
