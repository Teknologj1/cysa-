/**
 * Identidade do produto e dados do responsável legal. Fonte única para os
 * termos de uso, a política de privacidade, o rodapé e a imagem social.
 *
 * Enquanto houver campo com placeholder, as páginas legais exibem um aviso de
 * documento não finalizado — de propósito, para que nenhum contrato vá ao ar
 * incompleto.
 */

/** Nome do produto, exibido no app, no rodapé e na imagem de compartilhamento. */
export const NOME_PRODUTO = "CySA+ Prep";

export const EMPRESA = {
  /** Nome fantasia da empresa responsável. */
  nomeFantasia: "Teknologji",
  /** Razão social do responsável pelo serviço. */
  razaoSocial: "Teknologji LTDA",
  /** CNPJ ou CPF do responsável. */
  documento: "52.513.867/0001-44",
  /** Endereço completo, exigido pelo Código de Defesa do Consumidor. */
  endereco: "SCN Qd 2, Bloco D, Torre B, sala 403",
  /** E-mail de atendimento ao cliente. */
  emailContato: "contato@teknologji.com.br",
  /** E-mail do encarregado de dados (DPO), exigido pela LGPD. */
  emailEncarregado: "contato@teknologji.com.br",
} as const;

/** Campos ainda não preenchidos. Vazio significa documentação pronta. */
export const CAMPOS_PENDENTES = Object.entries(EMPRESA)
  .filter(([, valor]) => valor.startsWith("["))
  .map(([campo]) => campo);

export const EMPRESA_CONFIGURADA = CAMPOS_PENDENTES.length === 0;

/**
 * Domínio público do serviço. Deriva de NEXT_PUBLIC_SITE_URL para não haver
 * dois lugares dizendo onde o app está publicado.
 */
export function dominioPublico(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url) return "";
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
}

/** Data da última revisão dos documentos legais, exibida no topo deles. */
export const ATUALIZACAO_LEGAL = "2026-09-07";

export function dataLegalFormatada(): string {
  return new Date(`${ATUALIZACAO_LEGAL}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
