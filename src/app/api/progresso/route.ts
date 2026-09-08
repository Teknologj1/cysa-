import { NextResponse } from "next/server";
import { usuarioAtual } from "@/server/auth/sessao";
import {
  lerProgressoRemoto,
  salvarProgressoRemoto,
  sincronizacaoConfigurada,
} from "@/server/progresso/repositorio";
import {
  type ProgressoSincronizavel,
  mesclarProgresso,
} from "@/lib/progresso-merge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VAZIO: ProgressoSincronizavel = {
  licoesConcluidas: [],
  tentativas: [],
  dataProva: null,
  atualizadoEm: new Date(0).toISOString(),
};

/** Aceita apenas o formato esperado; o corpo vem do navegador. */
function normalizar(dado: unknown): ProgressoSincronizavel {
  const bruto = (dado ?? {}) as Partial<ProgressoSincronizavel>;

  return {
    licoesConcluidas: Array.isArray(bruto.licoesConcluidas)
      ? bruto.licoesConcluidas.filter((id): id is string => typeof id === "string")
      : [],
    tentativas: Array.isArray(bruto.tentativas)
      ? bruto.tentativas.filter(
          (t) => t && typeof t === "object" && typeof t.id === "string"
        )
      : [],
    dataProva: typeof bruto.dataProva === "string" ? bruto.dataProva : null,
    atualizadoEm:
      typeof bruto.atualizadoEm === "string"
        ? bruto.atualizadoEm
        : new Date().toISOString(),
  };
}

export async function GET() {
  if (!sincronizacaoConfigurada()) {
    return NextResponse.json({ sincroniza: false, progresso: null });
  }

  const usuario = await usuarioAtual();
  if (!usuario) {
    return NextResponse.json({ sincroniza: true, progresso: null });
  }

  const progresso = await lerProgressoRemoto(usuario.email);
  return NextResponse.json(
    { sincroniza: true, progresso },
    { headers: { "Cache-Control": "no-store" } }
  );
}

/**
 * Recebe o estado do aparelho, mescla com o que está guardado e devolve o
 * resultado. A mesclagem acontece no servidor para que dois aparelhos que
 * enviem ao mesmo tempo convirjam para o mesmo estado.
 */
export async function PUT(request: Request) {
  if (!sincronizacaoConfigurada()) {
    return NextResponse.json({ sincroniza: false, progresso: null });
  }

  const usuario = await usuarioAtual();
  if (!usuario) {
    return NextResponse.json({ erro: "Não autenticado" }, { status: 401 });
  }

  let local: ProgressoSincronizavel;
  try {
    local = normalizar(await request.json());
  } catch {
    return NextResponse.json({ erro: "Corpo inválido" }, { status: 400 });
  }

  const remoto = (await lerProgressoRemoto(usuario.email)) ?? VAZIO;
  const mesclado = mesclarProgresso(remoto, local);

  const salvou = await salvarProgressoRemoto(usuario.email, mesclado);
  return NextResponse.json({ sincroniza: true, salvou, progresso: mesclado });
}
