import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como o CySA+ Prep trata os seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">
        Política de privacidade
      </h1>
      <p className="mt-2 text-sm text-mutedFg">
        Modelo inicial — revise com apoio jurídico antes de publicar.
        Substitua [RAZÃO SOCIAL] e [E-MAIL DO ENCARREGADO].
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-mutedFg">
        <section>
          <h2 className="text-base font-semibold text-foreground">
            1. Dados que tratamos
          </h2>
          <p className="mt-2">
            Para processar a assinatura, tratamos o e-mail informado no checkout
            e os dados de cobrança necessários à transação. Os dados do cartão
            são coletados e armazenados diretamente pelo Stripe — este aplicativo
            não recebe nem guarda número de cartão.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            2. Dados guardados no seu aparelho
          </h2>
          <p className="mt-2">
            O progresso das aulas, o histórico de simulados e a data-alvo da
            prova ficam armazenados localmente no seu navegador
            (armazenamento local) e não são enviados aos nossos servidores. Você
            pode apagá-los a qualquer momento na tela de progresso.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            3. Base legal e finalidade
          </h2>
          <p className="mt-2">
            O tratamento se baseia na execução do contrato de assinatura
            (art. 7º, V, da LGPD) e no cumprimento de obrigações legais e
            regulatórias, com a finalidade de fornecer o acesso contratado e
            emitir os documentos fiscais correspondentes.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            4. Compartilhamento
          </h2>
          <p className="mt-2">
            Compartilhamos dados apenas com operadores necessários à prestação do
            serviço, como o Stripe (processamento de pagamentos) e o provedor de
            hospedagem, sempre limitados à finalidade descrita nesta política.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            5. Seus direitos
          </h2>
          <p className="mt-2">
            Você pode solicitar confirmação de tratamento, acesso, correção,
            portabilidade, anonimização ou eliminação dos seus dados, além de
            revogar consentimentos, escrevendo para [E-MAIL DO ENCARREGADO].
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            6. Controlador
          </h2>
          <p className="mt-2">
            [RAZÃO SOCIAL] é a controladora dos dados pessoais tratados no
            contexto deste serviço.
          </p>
        </section>
      </div>
    </article>
  );
}
