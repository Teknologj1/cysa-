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

export function urlDoSite(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000"
  );
}
