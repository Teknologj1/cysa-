import { NextResponse } from "next/server";
import {
  VALIDADE_LINK_MS,
  criarToken,
  segredoConfigurado,
} from "@/server/auth/token";
import { emailConfigurado, enviarLinkDeAcesso } from "@/server/email/enviar";
import { urlDoSite } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Envia o link de acesso.
 *
 * A resposta é sempre a mesma, tenha o e-mail comprado ou não: descobrir quem
 * é cliente a partir daqui seria vazamento de informação.
 */
export async function POST(request: Request) {
  if (!segredoConfigurado()) {
    return NextResponse.json(
      { erro: "Contas não habilitadas neste ambiente" },
      { status: 503 }
    );
  }
  if (!emailConfigurado()) {
    return NextResponse.json(
      { erro: "Envio de e-mail não configurado" },
      { status: 503 }
    );
  }

  let email = "";
  let proximo = "/curso";
  try {
    const corpo = (await request.json()) as { email?: string; proximo?: string };
    email = (corpo.email ?? "").trim().toLowerCase();
    if (corpo.proximo?.startsWith("/")) proximo = corpo.proximo;
  } catch {
    return NextResponse.json({ erro: "Corpo inválido" }, { status: 400 });
  }

  if (!FORMATO_EMAIL.test(email)) {
    return NextResponse.json({ erro: "E-mail inválido" }, { status: 400 });
  }

  const token = criarToken(email, "link", VALIDADE_LINK_MS);
  const url = `${urlDoSite()}/auth/entrar?token=${encodeURIComponent(token)}&proximo=${encodeURIComponent(proximo)}`;

  const resultado = await enviarLinkDeAcesso(email, url);
  if (!resultado.ok) {
    return NextResponse.json({ erro: resultado.erro }, { status: 502 });
  }

  return NextResponse.json({ enviado: true });
}
