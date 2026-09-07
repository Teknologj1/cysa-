"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  QUESTOES,
  type Questao,
  embaralhar,
} from "@/content/questions";
import { DOMINIOS, type DominioId, getDominio } from "@/content/curriculum";
import { useApp } from "./AppStateProvider";
import ProgressBar from "./ProgressBar";
import type { TentativaSimulado } from "@/lib/progresso";

type Fase = "config" | "rodando" | "resultado";

const OPCOES_QUANTIDADE = [5, 10, 20];

export default function SimuladoRunner() {
  const parametros = useSearchParams();
  const dominioInicial = parametros.get("dominio") as DominioId | null;

  const { assinatura, pronto, registrarTentativa } = useApp();

  const [fase, setFase] = useState<Fase>("config");
  const [filtroDominio, setFiltroDominio] = useState<DominioId | "todos">(
    dominioInicial ?? "todos"
  );
  const [quantidade, setQuantidade] = useState(10);
  const [cronometrado, setCronometrado] = useState(true);

  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [inicio, setInicio] = useState(0);
  const [segundos, setSegundos] = useState(0);

  const assinante = pronto && assinatura.ativa;

  // Sem assinatura, apenas as questões de amostra ficam disponíveis.
  const disponiveis = useMemo(
    () => (assinante ? QUESTOES : QUESTOES.filter((q) => q.gratis)),
    [assinante]
  );

  const filtradas = useMemo(
    () =>
      filtroDominio === "todos"
        ? disponiveis
        : disponiveis.filter((q) => q.dominio === filtroDominio),
    [disponiveis, filtroDominio]
  );

  // Cronômetro do simulado
  useEffect(() => {
    if (fase !== "rodando" || !cronometrado) return;
    const timer = setInterval(() => {
      setSegundos(Math.floor((Date.now() - inicio) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [fase, cronometrado, inicio]);

  const iniciar = useCallback(() => {
    const selecionadas = embaralhar(filtradas).slice(
      0,
      Math.min(quantidade, filtradas.length)
    );
    if (selecionadas.length === 0) return;
    setQuestoes(selecionadas);
    setRespostas({});
    setIndice(0);
    setSegundos(0);
    setInicio(Date.now());
    setFase("rodando");
  }, [filtradas, quantidade]);

  const finalizar = useCallback(() => {
    const decorridos = Math.floor((Date.now() - inicio) / 1000);
    const porDominio: TentativaSimulado["porDominio"] = {};
    let acertos = 0;

    for (const questao of questoes) {
      const correta = respostas[questao.id] === questao.correta;
      if (correta) acertos += 1;
      const atual = porDominio[questao.dominio] ?? { acertos: 0, total: 0 };
      porDominio[questao.dominio] = {
        acertos: atual.acertos + (correta ? 1 : 0),
        total: atual.total + 1,
      };
    }

    registrarTentativa({
      id: `t${Date.now()}`,
      data: new Date().toISOString(),
      acertos,
      total: questoes.length,
      porDominio,
      segundos: decorridos,
    });

    setSegundos(decorridos);
    setFase("resultado");
  }, [inicio, questoes, respostas, registrarTentativa]);

  // ---------- Configuração ----------
  if (fase === "config") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Simulado</h1>
        <p className="mt-3 text-mutedFg">
          Questões no estilo do CS0-003, com explicação comentada ao final.
          {!assinante && (
            <>
              {" "}
              Você está no modo amostra, com {disponiveis.length} questões
              liberadas.
            </>
          )}
        </p>

        {!assinante && pronto && (
          <div className="mt-6 rounded-2xl border border-cyan-500/40 bg-cyan-500/[0.06] p-4 text-sm">
            <p>
              Assinantes têm acesso a todas as {QUESTOES.length} questões, ao
              relatório por domínio e ao simulado em modo prova.{" "}
              <Link href="/planos" className="font-medium text-primary hover:underline">
                Ver planos →
              </Link>
            </p>
          </div>
        )}

        <div className="mt-8 space-y-6 rounded-2xl border border-border bg-muted/20 p-5">
          <fieldset>
            <legend className="text-sm font-medium">Domínio</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFiltroDominio("todos")}
                className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                  filtroDominio === "todos"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-mutedFg hover:text-foreground"
                }`}
              >
                Todos
              </button>
              {DOMINIOS.filter((d) => d.peso > 0).map((dominio) => (
                <button
                  key={dominio.id}
                  type="button"
                  onClick={() => setFiltroDominio(dominio.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                    filtroDominio === dominio.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-mutedFg hover:text-foreground"
                  }`}
                >
                  {dominio.codigo} {dominio.nome}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium">Número de questões</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {OPCOES_QUANTIDADE.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQuantidade(n)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                    quantidade === n
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-mutedFg hover:text-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-mutedFg">
              {filtradas.length} questões disponíveis neste filtro.
            </p>
          </fieldset>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={cronometrado}
              onChange={(e) => setCronometrado(e.target.checked)}
              className="h-4 w-4 accent-cyan-500"
            />
            Cronometrar (modo prova)
          </label>

          <button
            type="button"
            onClick={iniciar}
            disabled={filtradas.length === 0}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primaryFg transition hover:opacity-90 disabled:opacity-50"
          >
            {filtradas.length === 0
              ? "Nenhuma questão neste filtro"
              : "Iniciar simulado"}
          </button>
        </div>
      </div>
    );
  }

  // ---------- Execução ----------
  if (fase === "rodando") {
    const questao = questoes[indice];
    const marcada = respostas[questao.id];
    const dominio = getDominio(questao.dominio);
    const minutos = String(Math.floor(segundos / 60)).padStart(2, "0");
    const resto = String(segundos % 60).padStart(2, "0");

    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex items-center justify-between text-sm text-mutedFg">
          <span>
            Questão {indice + 1} de {questoes.length}
          </span>
          {cronometrado && (
            <span className="font-mono" aria-label="tempo decorrido">
              {minutos}:{resto}
            </span>
          )}
        </div>
        <ProgressBar
          valor={((indice + 1) / questoes.length) * 100}
          className="mt-3"
          rotulo="Progresso do simulado"
        />

        <div className="mt-8 rounded-2xl border border-border bg-muted/20 p-5">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ color: dominio.cor, backgroundColor: `${dominio.cor}1f` }}
          >
            Domínio {dominio.codigo} · {dominio.nome}
          </span>

          <p className="mt-4 text-base leading-relaxed">{questao.enunciado}</p>

          <div className="mt-5 space-y-2">
            {questao.alternativas.map((alternativa, i) => {
              const selecionada = marcada === i;
              return (
                <button
                  key={alternativa}
                  type="button"
                  onClick={() =>
                    setRespostas((anterior) => ({
                      ...anterior,
                      [questao.id]: i,
                    }))
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

  // ---------- Resultado ----------
  const acertos = questoes.filter(
    (q) => respostas[q.id] === q.correta
  ).length;
  const percentualAcerto = Math.round((acertos / questoes.length) * 100);
  const aprovado = percentualAcerto >= 75;

  const porDominio = DOMINIOS.filter((d) =>
    questoes.some((q) => q.dominio === d.id)
  ).map((dominio) => {
    const doDominio = questoes.filter((q) => q.dominio === dominio.id);
    const certas = doDominio.filter(
      (q) => respostas[q.id] === q.correta
    ).length;
    return {
      dominio,
      certas,
      total: doDominio.length,
      pct: Math.round((certas / doDominio.length) * 100),
    };
  });

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
            ? "Acima de 75% — é a faixa em que a aprovação começa a ficar provável. Continue mantendo o ritmo."
            : "Abaixo de 75%. Revise os domínios com menor desempenho antes de repetir o simulado."}
        </p>
        {segundos > 0 && (
          <p className="mt-2 text-xs text-mutedFg">
            Tempo: {Math.floor(segundos / 60)}min {segundos % 60}s
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
