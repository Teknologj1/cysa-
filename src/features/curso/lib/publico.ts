import type { Licao, Secao } from "@/content/types";

/**
 * Recorte do conteúdo que pode ir para o navegador.
 *
 * Toda propriedade passada a um Client Component é serializada no HTML da
 * página. Mandar a lição inteira significaria entregar o corpo pago junto,
 * mesmo sem renderizá-lo — por isso o servidor monta explicitamente o que sai
 * daqui.
 */

export type LicaoPublica = Pick<
  Licao,
  "id" | "titulo" | "resumo" | "minutos" | "tipo" | "objetivo" | "gratis" | "rota"
>;

/** Material de apoio da lição: só acompanha quem tem direito de acesso. */
export type LicaoExtras = Pick<
  Licao,
  "pontosChave" | "dicaExame" | "tarefa" | "recursos" | "roteiro"
>;

export type SecaoPublica = Omit<Secao, "licoes"> & { licoes: LicaoPublica[] };

export function paraLicaoPublica(licao: Licao): LicaoPublica {
  return {
    id: licao.id,
    titulo: licao.titulo,
    resumo: licao.resumo,
    minutos: licao.minutos,
    tipo: licao.tipo,
    objetivo: licao.objetivo,
    gratis: licao.gratis,
    rota: licao.rota,
  };
}

export function extrasDaLicao(licao: Licao): LicaoExtras {
  return {
    pontosChave: licao.pontosChave,
    dicaExame: licao.dicaExame,
    tarefa: licao.tarefa,
    recursos: licao.recursos,
    roteiro: licao.roteiro,
  };
}

export function paraSecaoPublica(secao: Secao): SecaoPublica {
  return { ...secao, licoes: secao.licoes.map(paraLicaoPublica) };
}
