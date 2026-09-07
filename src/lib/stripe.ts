import Stripe from "stripe";

/**
 * Cliente Stripe do servidor. Retorna null quando a chave não está
 * configurada — nesse caso o app funciona em modo demonstração.
 */
export function getStripe(): Stripe | null {
  const chave = process.env.STRIPE_SECRET_KEY;
  if (!chave) return null;
  return new Stripe(chave);
}

/**
 * URL usada nas voltas do checkout, no sitemap e nos metadados.
 *
 * A alternativa `VERCEL_URL` aponta para o deploy específico, que muda a cada
 * publicação: serve de rede de segurança, não de configuração. Em produção,
 * `NEXT_PUBLIC_SITE_URL` deve conter o domínio estável.
 */
export function urlDoSite(): string {
  const configurada = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configurada) return configurada;

  if (process.env.VERCEL_URL) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[config] NEXT_PUBLIC_SITE_URL não definida — usando a URL do deploy " +
          "(muda a cada publicação). Defina o domínio estável nas variáveis de ambiente."
      );
    }
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
