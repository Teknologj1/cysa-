import type { Metadata } from "next";
import { EMPRESA, NOME_PRODUTO, dataLegalFormatada } from "@/content/empresa";
import AvisoDocumentoIncompleto from "@/components/ui/AvisoDocumentoIncompleto";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como o ${NOME_PRODUTO} trata os seus dados pessoais.`,
};

export default function PrivacidadePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">
        Política de privacidade
      </h1>
      <p className="mt-2 text-sm text-mutedFg">
        Última atualização: {dataLegalFormatada()}
      </p>

      <AvisoDocumentoIncompleto />

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-mutedFg">
        <section>
          <h2 className="text-base font-semibold text-foreground">
            1. Controlador
          </h2>
          <p className="mt-2">
            {EMPRESA.razaoSocial}, inscrita sob o nº {EMPRESA.documento}, é a
            controladora dos dados pessoais tratados neste serviço. Encarregado
            de proteção de dados: {EMPRESA.emailEncarregado}.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            2. Dados que tratamos
          </h2>
          <p className="mt-2">
            Para processar a assinatura, tratamos o e-mail informado no checkout
            e os dados de cobrança necessários à transação. Os dados do cartão
            são coletados e armazenados diretamente pela Stripe — este aplicativo
            não recebe nem guarda número de cartão.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            3. Dados guardados no seu aparelho
          </h2>
          <p className="mt-2">
            O progresso das lições, o histórico de simulados e a data-alvo da
            prova ficam armazenados localmente no seu navegador (armazenamento
            local) e não são enviados aos nossos servidores. Você pode apagá-los
            a qualquer momento na tela de progresso.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            4. Base legal e finalidade
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
            5. Compartilhamento
          </h2>
          <p className="mt-2">
            Compartilhamos dados apenas com operadores necessários à prestação do
            serviço, limitados à finalidade descrita nesta política:
          </p>
          <ul className="mt-2 ml-5 list-disc space-y-1">
            <li>
              <strong className="text-foreground">Stripe</strong> — processamento
              de pagamentos e gestão da assinatura
            </li>
            <li>
              <strong className="text-foreground">Vercel</strong> — hospedagem da
              aplicação e entrega do conteúdo
            </li>
          </ul>
          <p className="mt-2">
            Esses operadores podem tratar dados fora do Brasil. Nesses casos, a
            transferência internacional observa as salvaguardas previstas nos
            arts. 33 e seguintes da LGPD.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            6. Retenção
          </h2>
          <p className="mt-2">
            Mantemos os dados de cobrança pelo prazo exigido pela legislação
            fiscal e os dados de contato enquanto a assinatura estiver ativa e
            pelo período necessário ao cumprimento de obrigações legais.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            7. Cookies e medição
          </h2>
          <p className="mt-2">
            Utilizamos apenas o armazenamento local necessário ao funcionamento
            do aplicativo — preferência de tema, progresso de estudo e estado da
            assinatura neste aparelho. Caso passemos a usar ferramentas de
            medição de audiência, elas só serão ativadas mediante consentimento.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            8. Seus direitos
          </h2>
          <p className="mt-2">
            Você pode solicitar confirmação de tratamento, acesso, correção,
            portabilidade, anonimização ou eliminação dos seus dados, além de
            revogar consentimentos, escrevendo para {EMPRESA.emailEncarregado}.
            Responderemos nos prazos previstos na LGPD.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            9. Segurança
          </h2>
          <p className="mt-2">
            O serviço é entregue exclusivamente por HTTPS, com cabeçalhos de
            segurança e política de conteúdo restritiva. Ainda assim, nenhum
            sistema é imune a incidentes: em caso de violação com risco relevante
            aos titulares, comunicaremos a Autoridade Nacional de Proteção de
            Dados e os afetados, conforme o art. 48 da LGPD.
          </p>
        </section>
      </div>
    </article>
  );
}
