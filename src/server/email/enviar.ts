import { EMPRESA, NOME_PRODUTO } from "@/content/empresa";

/**
 * Envio de e-mail pela API do Resend, por HTTP direto — não precisamos de
 * mais uma dependência para uma única chamada.
 */

export function emailConfigurado(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_REMETENTE);
}

type Resultado = { ok: true } | { ok: false; erro: string };

async function enviar(para: string, assunto: string, html: string): Promise<Resultado> {
  if (!emailConfigurado()) {
    return { ok: false, erro: "Envio de e-mail não configurado" };
  }

  try {
    const resposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_REMETENTE,
        to: [para],
        subject: assunto,
        html,
      }),
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      console.error("[email] Resend recusou o envio", resposta.status, detalhe);
      return { ok: false, erro: "Falha no envio" };
    }
    return { ok: true };
  } catch (erro) {
    console.error("[email] falha de rede ao enviar", erro);
    return { ok: false, erro: "Falha no envio" };
  }
}

/** Escapa texto que vai para dentro do HTML do e-mail. */
function escapar(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function enviarLinkDeAcesso(
  para: string,
  url: string
): Promise<Resultado> {
  const urlSegura = escapar(url);

  const html = `
<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;background:#f5f7fa;padding:32px 16px;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#0b1220">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:480px;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:32px">
            <tr>
              <td>
                <p style="margin:0 0 4px;font-size:13px;color:#52627a">${escapar(NOME_PRODUTO)}</p>
                <h1 style="margin:0 0 16px;font-size:20px">Seu link de acesso</h1>
                <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#52627a">
                  Clique no botão abaixo para entrar. O link vale por 30 minutos
                  e serve só para este e-mail.
                </p>
                <a href="${urlSegura}"
                   style="display:inline-block;background:#0e7490;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:600">
                  Entrar no ${escapar(NOME_PRODUTO)}
                </a>
                <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#52627a">
                  Se o botão não funcionar, copie e cole este endereço no
                  navegador:<br />
                  <span style="word-break:break-all;color:#0e7490">${urlSegura}</span>
                </p>
                <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#8a97ad">
                  Não foi você que pediu? Pode ignorar este e-mail — sem clicar
                  no link, nada acontece.
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#8a97ad">
            ${escapar(EMPRESA.razaoSocial)}
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();

  return enviar(para, `Seu link de acesso ao ${NOME_PRODUTO}`, html);
}
