import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLicao } from "@/content/secoes";
import { acessoDoUsuario } from "@/server/auth/sessao";
import { podeEntregarConteudo } from "@/lib/acesso";
import {
  extrasDaLicao,
  paraLicaoPublica,
  paraSecaoPublica,
} from "@/features/curso/lib/publico";
import LicaoView from "@/features/curso/components/LicaoView";
import Markdown from "@/components/ui/Markdown";

type Props = { params: Promise<{ secaoId: string; licaoId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { secaoId, licaoId } = await params;
  const encontrada = getLicao(secaoId, licaoId);
  if (!encontrada) return { title: "Lição não encontrada" };
  return {
    title: encontrada.licao.titulo,
    description: encontrada.licao.resumo,
  };
}

export default async function LicaoPage({ params }: Props) {
  const { secaoId, licaoId } = await params;
  const encontrada = getLicao(secaoId, licaoId);
  if (!encontrada) notFound();

  const { secao, licao } = encontrada;
  const acesso = await acessoDoUsuario();

  /**
   * A decisão acontece aqui, no servidor. Sem direito de acesso, nem o corpo
   * nem o material de apoio saem daqui — não basta não renderizar, é preciso
   * não enviar.
   *
   * Enquanto as contas não estiverem configuradas, `contasAtivas` é false e a
   * verificação continua sendo feita no cliente, como antes.
   */
  const entregar = podeEntregarConteudo({
    contasAtivas: acesso.contasAtivas,
    liberado: acesso.liberado,
    gratis: Boolean(licao.gratis),
  });

  return (
    <LicaoView
      secao={paraSecaoPublica(secao)}
      licao={paraLicaoPublica(licao)}
      extras={entregar ? extrasDaLicao(licao) : null}
      conteudo={
        entregar && licao.conteudo ? <Markdown>{licao.conteudo}</Markdown> : undefined
      }
      acesso={{
        contasAtivas: acesso.contasAtivas,
        liberado: acesso.liberado,
        logado: Boolean(acesso.usuario),
      }}
    />
  );
}
