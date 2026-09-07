import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Condições de uso e de assinatura do CySA+ Prep.",
};

export default function TermosPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Termos de uso</h1>
      <p className="mt-2 text-sm text-mutedFg">
        Modelo inicial — revise com apoio jurídico antes de publicar.
        Substitua [RAZÃO SOCIAL], [CNPJ] e [E-MAIL DE CONTATO].
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-mutedFg">
        <section>
          <h2 className="text-base font-semibold text-foreground">1. Objeto</h2>
          <p className="mt-2">
            O CySA+ Prep é um serviço digital de assinatura que dá acesso a
            material de preparação para a certificação CompTIA CySA+ (CS0-004),
            operado por [RAZÃO SOCIAL], inscrita no CNPJ [CNPJ].
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            2. Assinatura, cobrança e cancelamento
          </h2>
          <p className="mt-2">
            A assinatura é recorrente, renovada automaticamente ao fim de cada
            período contratado, e processada pelo Stripe. O cancelamento pode ser
            solicitado a qualquer momento e interrompe as renovações seguintes; o
            acesso permanece disponível até o fim do período já pago, sem multa.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            3. Direito de arrependimento
          </h2>
          <p className="mt-2">
            Nos termos do art. 49 do Código de Defesa do Consumidor, a compra
            contratada fora do estabelecimento comercial pode ser cancelada em
            até 7 (sete) dias corridos, com devolução integral do valor pago.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            4. Uso do conteúdo
          </h2>
          <p className="mt-2">
            O acesso é pessoal e intransferível. É vedada a reprodução,
            redistribuição, revenda ou compartilhamento das credenciais e do
            material com terceiros.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            5. Ausência de garantia de aprovação
          </h2>
          <p className="mt-2">
            O material é preparatório e não garante aprovação no exame. O
            resultado depende do estudo, da experiência prévia e do desempenho
            individual no dia da prova.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">
            6. Marcas de terceiros
          </h2>
          <p className="mt-2">
            CompTIA®, CySA+® e a designação CS0-004 são marcas de titularidade da
            CompTIA. Este produto é independente e não possui vínculo,
            patrocínio, endosso ou certificação oficial da CompTIA.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground">7. Contato</h2>
          <p className="mt-2">Dúvidas e solicitações: [E-MAIL DE CONTATO].</p>
        </section>
      </div>
    </article>
  );
}
