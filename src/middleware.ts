import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Renova a sessão do Supabase a cada navegação. Server Components não podem
 * gravar cookies, então a rotação do token acontece aqui.
 *
 * Sem Supabase configurado, o middleware apenas deixa a requisição passar.
 */
export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const chave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !chave) return NextResponse.next();

  let resposta = NextResponse.next({ request });

  const supabase = createServerClient(url, chave, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(novos) {
        for (const { name, value } of novos) {
          request.cookies.set(name, value);
        }
        resposta = NextResponse.next({ request });
        for (const { name, value, options } of novos) {
          resposta.cookies.set(name, value, options);
        }
      },
    },
  });

  // Chamada obrigatória: é ela que dispara a renovação do token.
  await supabase.auth.getUser();

  return resposta;
}

export const config = {
  matcher: [
    /*
     * Todas as rotas, exceto arquivos estáticos, imagens e os artefatos do
     * PWA — o service worker não deve passar por aqui.
     */
    "/((?!_next/static|_next/image|favicon.ico|icons/|manifest.json|sw.js|workbox-|fallback-|offline.html).*)",
  ],
};
