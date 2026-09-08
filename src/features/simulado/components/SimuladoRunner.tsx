"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DOMINIOS, getDominio } from "@/content/dominios";
import { EXAME } from "@/content/exame";
import {
  SECOES_COM_CHECKPOINT,
  TOTAL_QUESTOES,
  TOTAL_QUESTOES_GRATIS,
} from "@/content/catalogo";
import type { DominioId } from "@/content/types";
import { useAssinatura } from "@/features/assinatura/AssinaturaProvider";
import { useProgresso } from "@/features/progresso/ProgressoProvider";
import ProgressBar from "@/components/ui/ProgressBar";
import {
  CORTE_APROVACAO,
  type FiltroSimulado,
  type QuestaoDoSimulado,
  calcularResultado,
  desempenhoPorDominio,
} from "../lib/simulado";

type Fase = "config" | "carregando" | "rodando" | "resultado";

const OPCOES_QUANTIDADE = [5, 10, 20];
const CHAVE_CACHE = "cysa:ultimo-simulado";

function formatarTempo(segundos: number): string {
  const m = String(Math.floor(segundos / 60)).padStart(2, "0");
  const s = String(segundos % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function parametrosDoFiltro(filtro: FiltroSimulado, quantidade: number): string {
  const p = new URLSearchParams({ quantidade: String(quantidade) });
  if (filtro.tipo === "dominio") p.set("dominio", filtro.dominio);
  if (filtro.tipo === "secao") p.set("secao", filtro.secaoId);
  if (filtro.tipo === "modoProva") p.set("modo", "prova");
  return p.toString();
}

export default function SimuladoRunner() {
  const parametros = useSearchParams();
  const secaoInicial = parametros.get("secao");
  const dominioInicial = parametros.get("dominio") as DominioId | null;

  const { ativa: assinante, pronto } = useAssinatura();
  const { registrarTentativa } = useProgresso();

  const [fase, setFase] = useState<Fase>("config");
  const [filtro, setFiltro] = useState<FiltroSimulado>(
    secaoInicial
      ? { tipo: "secao", secaoId: secaoInicial }
      : dominioInicial
        ? { tipo: "dominio", dominio: dominioInicial }
        : { tipo: "todos" }
  );
  const [quantidade, setQuantidade] = useState(10);
  const [cronometrado, setCronometrado] = useState(true);
  const [erro, setErro] = useState("");

  const [questoes, setQuestoes] = useState<QuestaoDoSimulado[]>([]);
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [inicio, setInicio] = useState(0);
  const [segundos, setSegundos] = useState(0);

  const modoProva = filtro.tipo === "modoProva";

  useEffect(() => {
    if (fase !== "rodando" || !cronometrado) return;
    const timer = setInterval(
      () => setSegundos(Math.floor((Date.now() - inicio) / 1000)),
      1000
    );
    return () => clearInterval(timer);
  }, [fase, cronometrado, inicio]);

  /**
   * As questões vêm do servidor, que decide o que enviar conforme o direito de
   * acesso. O último simulado carregado fica em cache para continuar
   * funcionando offline.
   */
  const iniciar = useCallback(async () => {
    setErro("");
    setFase("carregando");

    try {
      const resposta = await fetch(
        `/api/simulado?${parametrosDoFiltro(filtro, quantidade)}`,
        { cache: "no-store" }
      );
      if (!resposta.ok) throw new Error("resposta inválida");

      const dado = (await resposta.json()) as { questoes: QuestaoDoSimulado[] };
      if (!dado.questoes?.length) {
        setErro("Nenhuma questão disponível nesta seleção.");
        setFase("config");
        return;
      }

      try {
        window.localStorage.setItem(CHAVE_CACHE, JSON.stringify(dado.questoes));
      } catch {
        // Armazenamento cheio ou bloqueado: seguimos sem cache.
      }

      setQuestoes(dado.questoes);
      setRespostas({});
      setIndice(0);
      setSegundos(0);
      setInicio(Date.now());
      setFase("rodando");
    } catch {
      // Offline: repete o último simulado carregado, se houver.
      try {
        const cache = window.localStorage.getItem(CHAVE_CACHE);
        const guardadas = cache ? (JSON.parse(cache) as QuestaoDoSimulado[]) : [];
        if (guardadas.length > 0) {
          setQuestoes(guardadas);
          setRespostas({});
          setIndice(0);
          setSegundos(0);
          setInicio(Date.now());
          setFase("rodando");
          return;
        }
      } catch {
        // cache inválido
      }
      setErro("Não foi possível carregar as questões. Verifique sua conexão.");
      setFase("config");
    }
  }, [filtro, quantidade]);

  const finalizar = useCallback(() => {
    const decorridos = Math.floor((Date.now() - inicio) / 1000);
    registrarTentativa(calcularResultado(questoes, respostas, decorridos));
    setSegundos(decorridos);
    setFase("resultado");
  }, [inicio, questoes, respostas, registrarTentativa]);

  const porDominio = useMemo(
    () => desempenhoPorDominio(questoes, respostas),
    [questoes, respostas]
  );

  // ---------------------------------------------------------------- config
  if (fase === "config" || fase === "carregando") {
    const carregando = fase === "carregando";

    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Simulado</h1>
        <p className="mt-3 text-mutedFg">
          Questões no estilo do {EXAME.codigo}, com explicação comentada ao
          final e relatório por domínio.
          {pronto && !assinante && (
            <>
              {" "}
              Você está no modo amostra, com {TOTAL_QUESTOES_GRATIS} questões
              liberadas.
            </>
          )}
        </p>

        {pronto && !assinante && (
          <div className="mt-6 rounded-2xl border border-cyan-500/40 bg-cyan-500/[0.06] p-4 text-sm">
            <p>
              Assinantes acessam as {TOTAL_QUESTOES} questões, os checkpoints de
              seção e o simulado em modo prova.{" "}
              <Link href="/planos" className="font-medium text-primary hover:underline">
                Ver planos →
              </Link>
            </p>
          </div>
        )}

        <div className="mt-8 space-y-6 rounded-2xl border border-border bg-muted/20 p-5">
          <fieldset>
            <legend className="text-sm font-medium">O que praticar</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              <BotaoFiltro
                ativo={filtro.tipo === "todos"}
                onClick={() => setFiltro({ tipo: "todos" })}
              >
                Todas as questões
              </BotaoFiltro>

              {DOMINIOS.map((dominio) => (
                <BotaoFiltro
                  key={dominio.id}
                  ativo={filtro.tipo === "dominio" && filtro.dominio === dominio.id}
                  onClick={() => setFiltro({ tipo: "dominio", dominio: dominio.id })}
                >
                  {dominio.codigo} {dominio.nome}
                </BotaoFiltro>
              ))}
            </div>

            {SECOES_COM_CHECKPOINT.length > 0 && (
              <>
                <p className="mt-5 text-sm font-medium">Checkpoint de seção</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SECOES_COM_CHECKPOINT.map((secao) => (
                    <BotaoFiltro
                      key={secao.id}
                      ativo={filtro.tipo === "secao" && filtro.secaoId === secao.id}
                      onClick={() => setFiltro({ tipo: "secao", secaoId: secao.id })}
                    >
                      Seção {secao.numero}
                    </BotaoFiltro>
                  ))}
                </div>
              </>
            )}

            <p className="mt-5 text-sm font-medium">Modo prova</p>
            <div className="mt-3">
              <BotaoFiltro
                ativo={modoProva}
                onClick={() => {
                  setFiltro({ tipo: "modoProva" });
                  setCronometrado(true);
                }}
              >
                {EXAME.questoes} questões ponderadas pelos pesos oficiais
              </BotaoFiltro>
            </div>
          </fieldset>

          {!modoProva && (
            <fieldset>
              <legend className="text-sm font-medium">Número de questões</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {OPCOES_QUANTIDADE.map((n) => (
                  <BotaoFiltro
                    key={n}
                    ativo={quantidade === n}
                    onClick={() => setQuantidade(n)}
                  >
                    {n}
                  </BotaoFiltro>
                ))}
              </div>
            </fieldset>
          )}

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={cronometrado}
              onChange={(e) => setCronometrado(e.target.checked)}
              className="h-4 w-4 accent-cyan-500"
            />
            Cronometrar
          </label>

          {erro && <p className="text-sm text-danger">{erro}</p>}

          <button
            type="button"
            onClick={iniciar}
            disabled={carregando}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primaryFg transition hover:opacity-90 disabled:opacity-60"
          >
            {carregando ? "Preparando…" : "Iniciar simulado"}
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------- rodando
  if (fase === "rodando") {
    const questao = questoes[indice];
    const marcada = respostas[questao.id];
    const dominio = getDominio(questao.dominio);

    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex items-center justify-between text-sm text-mutedFg">
          <span>
            Questão {indice + 1} de {questoes.length}
          </span>
          {cronometrado && (
            <span className="font-mono" aria-label="tempo decorrido">
              {formatarTempo(segundos)}
            </span>
          )}
        </div>
        <ProgressBar
          valor={((indice + 1) / questoes.length) * 100}
          className="mt-3"
          rotulo="Progresso do simulado"
        />

        <div className="mt-8 rounded-2xl border border-border bg-muted/20 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ color: dominio.cor, backgroundColor: `${dominio.cor}1f` }}
            >
              Domínio {dominio.codigo} · {dominio.nome}
            </span>
            {questao.objetivo && (
              <span className="rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] text-mutedFg">
                OBJ {questao.objetivo}
              </span>
            )}
          </div>

          <p className="mt-4 text-base leading-relaxed">{questao.enunciado}</p>

          <div className="mt-5 space-y-2">
            {questao.alternativas.map((alternativa, i) => {
              const selecionada = marcada === i;
              return (
                <button
                  key={alternativa}
                  type="button"
                  onClick={() =>
                    setRespostas((anterior) => ({ ...anterior, [questao.id]: i }))
                  }
                  className={`flex w-full gap-3 rounded-xl border p-3 text-left text-sm transition ${
                    selecionada
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40 hover:bg-muted/40"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-semibold ${
                      selecionada
                        ? "border-primary text-primary"
                        : "border-border text-mutedFg"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{alternativa}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIndice((i) => Math.max(0, i - 1))}
            disabled={indice === 0}
            className="rounded-xl border border-border px-4 py-2.5 text-sm transition hover:bg-muted disabled:opacity-40"
          >
            Anterior
          </button>

          {indice < questoes.length - 1 ? (
            <button
              type="button"
              onClick={() => setIndice((i) => i + 1)}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primaryFg transition hover:opacity-90"
            >
              Próxima
            </button>
          ) : (
            <button
              type="button"
              onClick={finalizar}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primaryFg transition hover:opacity-90"
            >
              Finalizar e ver resultado
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-mutedFg">
          {Object.keys(respostas).length} de {questoes.length} respondidas
        </p>
      </div>
    );
  }

  // ------------------------------------------------------------- resultado
  const acertos = questoes.filter((q) => respostas[q.id] === q.correta).length;
  const percentualAcerto = Math.round((acertos / questoes.length) * 100);
  const aprovado = percentualAcerto >= CORTE_APROVACAO;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div
        className={`rounded-2xl border p-6 text-center ${
          aprovado
            ? "border-emerald-500/40 bg-emerald-500/[0.06]"
            : "border-amber-500/40 bg-amber-500/[0.06]"
        }`}
      >
        <p className="text-sm text-mutedFg">Resultado</p>
        <p className="mt-2 text-4xl font-bold tracking-tight">
          {acertos}/{questoes.length}
        </p>
        <p className="mt-1 text-lg font-medium">{percentualAcerto}% de acerto</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-mutedFg">
          {aprovado
            ? `Acima de ${CORTE_APROVACAO}% — é a faixa em que a aprovação começa a ficar provável. Mantenha o ritmo.`
            : `Abaixo de ${CORTE_APROVACAO}%. Revise os domínios com menor desempenho antes de repetir.`}
        </p>
        {segundos > 0 && (
          <p className="mt-2 text-xs text-mutedFg">
            Tempo: {formatarTempo(segundos)}
          </p>
        )}
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Desempenho por domínio</h2>
        <div className="mt-4 space-y-4">
          {porDominio.map((linha) => (
            <div key={linha.dominio.id}>
              <div className="flex justify-between text-sm">
                <span>
                  {linha.dominio.codigo} {linha.dominio.nome}
                </span>
                <span className="text-mutedFg">
                  {linha.certas}/{linha.total} · {linha.pct}%
                </span>
              </div>
              <ProgressBar
                valor={linha.pct}
                cor={linha.dominio.cor}
                className="mt-2"
                rotulo={`Desempenho no domínio ${linha.dominio.codigo}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Revisão comentada</h2>
        <ol className="mt-4 space-y-4">
          {questoes.map((questao, i) => {
            const marcada = respostas[questao.id];
            const certa = marcada === questao.correta;
            return (
              <li
                key={questao.id}
                className={`rounded-2xl border p-5 ${
                  certa
                    ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                    : "border-red-500/30 bg-red-500/[0.04]"
                }`}
              >
                <p className="text-sm font-medium">
                  {i + 1}. {questao.enunciado}
                </p>
                <p className="mt-3 text-sm">
                  <span className="text-mutedFg">Sua resposta: </span>
                  {marcada === undefined ? (
                    <span className="text-amber-400">em branco</span>
                  ) : (
                    <span className={certa ? "text-emerald-400" : "text-red-400"}>
                      {String.fromCharCode(65 + marcada)}){" "}
                      {questao.alternativas[marcada]}
                    </span>
                  )}
                </p>
                {!certa && (
                  <p className="mt-1 text-sm">
                    <span className="text-mutedFg">Correta: </span>
                    <span className="text-emerald-400">
                      {String.fromCharCode(65 + questao.correta)}){" "}
                      {questao.alternativas[questao.correta]}
                    </span>
                  </p>
                )}
                <p className="mt-3 border-t border-border pt-3 text-sm text-mutedFg">
                  {questao.explicacao}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setFase("config")}
          className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primaryFg transition hover:opacity-90"
        >
          Fazer outro simulado
        </button>
        <Link
          href="/progresso"
          className="flex-1 rounded-xl border border-border px-4 py-3 text-center text-sm font-medium transition hover:bg-muted"
        >
          Ver meu progresso
        </Link>
      </div>
    </div>
  );
}

function BotaoFiltro({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-sm transition ${
        ativo
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-mutedFg hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
