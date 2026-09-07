import type { Metadata } from "next";
import { EMPRESA, NOME_PRODUTO, dataLegalFormatada } from "@/content/empresa";
import { EXAME } from "@/content/exame";
import { PLANOS, formatarBRL } from "@/content/planos";
import AvisoDocumentoIncompleto from "@/components/ui/AvisoDocumentoIncompleto";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: `Condições de uso e de assinatura do ${NOME_PRODUTO}.`,
};

export default function TermosPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Termos de uso</h1>
      <p className="mt-2 text-sm text-mutedFg">
        Última atualização: {dataLegalFormatada()}
      </p>

      <AvisoDocumentoIncompleto />

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-mutedFg">
        <section>
          <h2 className="text-base font-semibold text-foreground">1. Quem somos</h2>
          <p className="mt-2">
            O {NOME_PRODUTO} é um serviço digital de assinatura que dá
            acesso a material de preparação para a certificação CompTIA CySA+
            (exame {EXAME.codigo}), operado por {EMPRESA.razaoSocial}, inscrita
            sob o nº {EMPRESA.documento}, com sede em {EMPRESA.endereco}.
            Contato: {EMPRESA.emailContato}.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            2. O que está incluído
          </h2>
          <p className="mt-2">
            A assinatura dá acesso às seções publicadas do curso, aos
            laboratórios, ao banco de questões e aos simulados, incluindo o
            conteúdo publicado durante a vigência do plano. O serviço é entregue
            pela internet, sem envio de material físico.
          </p>
          <p className="mt-2">
            A assinatura <strong>não inclui</strong> o voucher do exame, que é
            adquirido separadamente junto à CompTIA ou a revendedor autorizado.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            3. Planos, cobrança e renovação
          </h2>
          <p className="mt-2">Os planos vigentes e seus valores são:</p>
          <ul className="mt-2 ml-5 list-disc space-y-1">
            {PLANOS.map((plano) => (
              <li key={plano.id}>
                <strong className="text-foreground">{plano.nome}</strong> —{" "}
                {formatarBRL(plano.precoCentavos)} a cada {plano.intervalo}
              </li>
            ))}
          </ul>
          <p className="mt-2">
            A assinatura é recorrente e renovada automaticamente ao fim de cada
            período contratado, pelo valor vigente na data da renovação.
            Alterações de preço são comunicadas com pelo menos 30 dias de
            antecedência e só valem para os ciclos seguintes.
          </p>
          <p className="mt-2">
            O processamento do pagamento é feito pela Stripe. Não recebemos nem
            armazenamos dados do seu cartão.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            4. Cancelamento
          </h2>
          <p className="mt-2">
            O cancelamento pode ser solicitado a qualquer momento e interrompe as
            renovações seguintes, sem multa. O acesso permanece disponível até o
            fim do período já pago.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            5. Direito de arrependimento
          </h2>
          <p className="mt-2">
            Nos termos do art. 49 do Código de Defesa do Consumidor, a
            contratação feita fora do estabelecimento comercial pode ser
            desfeita em até 7 (sete) dias corridos contados da contratação, com
            devolução integral do valor pago. Basta escrever para{" "}
            {EMPRESA.emailContato}.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            6. Uso do conteúdo
          </h2>
          <p className="mt-2">
            O acesso é pessoal e intransferível. É vedada a reprodução,
            redistribuição, revenda, exibição pública ou compartilhamento das
            credenciais e do material com terceiros. O conteúdo é protegido pela
            Lei nº 9.610/1998.
          </p>
          <p className="mt-2">
            O descumprimento pode acarretar a suspensão ou o encerramento do
            acesso, sem prejuízo das medidas cabíveis.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            7. Disponibilidade do serviço
          </h2>
          <p className="mt-2">
            Empregamos esforços razoáveis para manter o serviço disponível, mas
            ele pode ficar indisponível por manutenção, falha de terceiros ou
            caso fortuito. Interrupções prolongadas e imputáveis a nós geram
            prorrogação equivalente do período contratado.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            8. Ausência de garantia de aprovação
          </h2>
          <p className="mt-2">
            O material é preparatório e não garante aprovação no exame. O
            resultado depende do estudo, da experiência prévia e do desempenho
            individual no dia da prova.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            9. Marcas de terceiros
          </h2>
          <p className="mt-2">
            CompTIA®, CySA+® e a designação {EXAME.codigo} são marcas de
            titularidade da CompTIA. Este produto é independente e não possui
            vínculo, patrocínio, endosso ou certificação oficial da CompTIA.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            10. Alterações destes termos
          </h2>
          <p className="mt-2">
            Podemos atualizar estes termos. Mudanças relevantes são comunicadas
            por e-mail ou no próprio app com antecedência razoável, e o uso
            continuado após a vigência representa concordância.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            11. Foro e contato
          </h2>
          <p className="mt-2">
            Estes termos são regidos pela legislação brasileira. Fica eleito o
            foro do domicílio do consumidor para dirimir controvérsias. Dúvidas e
            solicitações: {EMPRESA.emailContato}.
          </p>
        </section>
      </div>
    </article>
  );
}
