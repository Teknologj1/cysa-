import { NextResponse } from "next/server";
import { acessoDoUsuario } from "@/server/auth/sessao";
import { diasDeAssinatura } from "@/lib/liberacao";
import { EXAME } from "@/content/exame";
import type { DominioId } from "@/content/types";
import type { FiltroSimulado } from "@/features/simulado/lib/simulado";
import {
  aplicarFiltro,
  contarDisponiveis,
  paraQuestaoDoSimulado,
  questoesDisponiveis,
  sortearQuestoes,
  type EstadoDoAluno,
} from "@/server/simulado/selecao";
import type { AcessoDoUsuario } from "@/server/auth/sessao";

/**
 * Sem contas configuradas o app volta ao modo anterior e tudo fica disponível
 * — inclusive as seções em carência, já que não há assinatura para datar.
 */
function estadoDoAluno(acesso: AcessoDoUsuario): EstadoDoAluno {
  if (!acesso.contasAtivas) {
    return { assinante: true, diasDecorridos: null, cortesia: true };
  }

  return {
    assinante: acesso.liberado,
    diasDecorridos: diasDeAssinatura(acesso.assinatura?.criadaEm ?? null),
    cortesia: acesso.cortesia,
  };
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const QUANTIDADE_MAXIMA = 120;

function lerFiltro(parametros: URLSearchParams): FiltroSimulado {
  const secao = parametros.get("secao");
  const dominio = parametros.get("dominio");

  if (parametros.get("modo") === "prova") return { tipo: "modoProva" };
  if (secao) return { tipo: "secao", secaoId: secao };
  if (dominio) return { tipo: "dominio", dominio: dominio as DominioId };
  return { tipo: "todos" };
}

/**
 * Entrega as questões do simulado.
 *
 * Quem não tem assinatura recebe apenas a amostra gratuita — o banco completo
 * nunca sai daqui para um navegador sem direito de acesso. Enquanto as contas
 * não estiverem configuradas, vale o modo anterior e todas ficam disponíveis.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const acesso = await acessoDoUsuario();

  const estado = estadoDoAluno(acesso);
  const assinante = estado.assinante;
  const filtro = lerFiltro(searchParams);

  const quantidadePedida = Number(searchParams.get("quantidade"));
  const quantidade =
    filtro.tipo === "modoProva"
      ? EXAME.questoes
      : Math.min(
          Number.isFinite(quantidadePedida) && quantidadePedida > 0
            ? quantidadePedida
            : 10,
          QUANTIDADE_MAXIMA
        );

  const elegiveis = aplicarFiltro(questoesDisponiveis(estado), filtro);
  const sorteadas = sortearQuestoes(elegiveis, filtro, quantidade);

  return NextResponse.json(
    {
      questoes: sorteadas.map(paraQuestaoDoSimulado),
      disponiveis: elegiveis.length,
      assinante,
      contasAtivas: acesso.contasAtivas,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

/** Quantas questões existem para cada filtro, para montar a tela de escolha. */
export async function POST(request: Request) {
  const acesso = await acessoDoUsuario();
  const estado = estadoDoAluno(acesso);
  const assinante = estado.assinante;

  let filtros: FiltroSimulado[] = [];
  try {
    const corpo = (await request.json()) as { filtros?: FiltroSimulado[] };
    filtros = Array.isArray(corpo.filtros) ? corpo.filtros.slice(0, 20) : [];
  } catch {
    return NextResponse.json({ erro: "Corpo inválido" }, { status: 400 });
  }

  return NextResponse.json({
    assinante,
    contagens: filtros.map((filtro) => contarDisponiveis(estado, filtro)),
  });
}
