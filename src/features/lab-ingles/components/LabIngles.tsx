"use client";

import { useEffect, useMemo, useState } from "react";
import { PASSAGENS, TERMOS } from "@/content/lab-ingles";

type Aba = "listening" | "pronuncia";

/** Fala um texto em inglês usando a síntese de voz do próprio navegador. */
function useFala() {
  const [suportado, setSuportado] = useState(true);
  const [falando, setFalando] = useState(false);

  useEffect(() => {
    setSuportado(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function falar(texto: string, velocidade = 0.9) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const fala = new SpeechSynthesisUtterance(texto);
    fala.rate = velocidade;
    fala.lang = "en-US";

    const vozes = window.speechSynthesis.getVoices();
    const vozIngles = vozes.find((v) => v.lang?.startsWith("en"));
    if (vozIngles) fala.voice = vozIngles;

    fala.onend = () => setFalando(false);
    fala.onerror = () => setFalando(false);

    setFalando(true);
    window.speechSynthesis.speak(fala);
  }

  function parar() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setFalando(false);
  }

  return { falar, parar, falando, suportado };
}

export default function LabIngles() {
  const [aba, setAba] = useState<Aba>("listening");
  const [indice, setIndice] = useState(0);
  const [velocidade, setVelocidade] = useState(0.9);
  const [mostrarTranscricao, setMostrarTranscricao] = useState(false);
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const { falar, parar, falando, suportado } = useFala();

  const passagem = useMemo(() => PASSAGENS[indice], [indice]);

  function trocarPassagem(novo: number) {
    parar();
    setIndice(novo);
    setMostrarTranscricao(false);
    setRespostas({});
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">SOC English Lab</h1>
        <p className="mt-3 text-mutedFg">
          O exame é em inglês e a operação também. Aqui você treina o ouvido com
          cenas do dia a dia do SOC e a pronúncia dos termos que mais saem
          errado. As passagens ficam em inglês de propósito.
        </p>
      </header>

      {!suportado && (
        <p className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/[0.06] p-4 text-sm text-mutedFg">
          Este navegador não oferece síntese de voz. As transcrições continuam
          disponíveis para leitura.
        </p>
      )}

      <div
        className="mt-8 inline-flex overflow-hidden rounded-xl border border-border"
        role="tablist"
      >
        {(
          [
            ["listening", "Listening"],
            ["pronuncia", "Pronúncia"],
          ] as const
        ).map(([valor, rotulo]) => (
          <button
            key={valor}
            role="tab"
            aria-selected={aba === valor}
            onClick={() => {
              parar();
              setAba(valor);
            }}
            className={`px-5 py-2.5 text-sm transition ${
              aba === valor
                ? "bg-primary font-semibold text-primaryFg"
                : "text-mutedFg hover:text-foreground"
            }`}
          >
            {rotulo}
          </button>
        ))}
      </div>

      {aba === "listening" ? (
        <section className="mt-6 space-y-4">
          <div className="rounded-2xl border border-border bg-muted/20 p-5">
            <label
              htmlFor="passagem"
              className="text-sm font-medium"
            >
              Passagem
            </label>
            <select
              id="passagem"
              value={indice}
              onChange={(e) => trocarPassagem(Number(e.target.value))}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              {PASSAGENS.map((p, i) => (
                <option key={p.id} value={i}>
                  {p.titulo}
                </option>
              ))}
            </select>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => falar(passagem.texto, velocidade)}
                disabled={!suportado}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primaryFg transition hover:opacity-90 disabled:opacity-50"
              >
                {falando ? "Tocando…" : "▶ Ouvir"}
              </button>
              <button
                type="button"
                onClick={parar}
                className="rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-muted"
              >
                Parar
              </button>
              <button
                type="button"
                onClick={() => setMostrarTranscricao((v) => !v)}
                className="rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-muted"
              >
                {mostrarTranscricao ? "Ocultar transcrição" : "Ver transcrição"}
              </button>

              <label className="flex items-center gap-2 font-mono text-xs text-mutedFg">
                velocidade
                <input
                  type="range"
                  min={0.6}
                  max={1.2}
                  step={0.05}
                  value={velocidade}
                  onChange={(e) => setVelocidade(Number(e.target.value))}
                  className="w-24 accent-cyan-500"
                  aria-label="Velocidade da leitura"
                />
                {velocidade.toFixed(2)}x
              </label>
            </div>

            {mostrarTranscricao && (
              <p className="mt-4 rounded-r-xl border-l-2 border-primary bg-muted/40 px-4 py-3 text-sm text-mutedFg">
                {passagem.texto}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-muted/20 p-5">
            <h2 className="text-sm font-medium">Compreensão</h2>
            <ol className="mt-4 space-y-6">
              {passagem.perguntas.map((pergunta, qi) => {
                const chave = `${passagem.id}-${qi}`;
                const marcada = respostas[chave];
                const respondida = marcada !== undefined;

                return (
                  <li key={chave}>
                    <p className="text-sm">
                      {qi + 1}. {pergunta.pergunta}
                    </p>
                    <div className="mt-3 space-y-2">
                      {pergunta.alternativas.map((alternativa, oi) => {
                        const correta = oi === pergunta.alternativaCerta;
                        const escolhida = marcada === oi;

                        let estilo =
                          "border-border hover:border-primary/40 hover:bg-muted/40";
                        if (respondida && correta) {
                          estilo =
                            "border-emerald-500/60 bg-emerald-500/10 text-emerald-300";
                        } else if (respondida && escolhida) {
                          estilo = "border-red-500/60 bg-red-500/10 text-red-300";
                        }

                        return (
                          <button
                            key={alternativa}
                            type="button"
                            disabled={respondida}
                            onClick={() =>
                              setRespostas((anterior) => ({
                                ...anterior,
                                [chave]: oi,
                              }))
                            }
                            className={`w-full rounded-xl border p-3 text-left text-sm transition disabled:cursor-default ${estilo}`}
                          >
                            {alternativa}
                          </button>
                        );
                      })}
                    </div>
                    {respondida && (
                      <p className="mt-3 border-t border-border pt-3 text-sm text-mutedFg">
                        {pergunta.comentario}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ) : (
        <section className="mt-6 rounded-2xl border border-border bg-muted/20 p-5">
          <h2 className="text-sm font-medium">
            Dez termos que costumam sair errado
          </h2>
          <ul className="mt-4 divide-y divide-border">
            {TERMOS.map((termo) => (
              <li
                key={termo.termo}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium">
                    {termo.termo}{" "}
                    <span className="font-mono text-xs text-mutedFg">
                      {termo.ipa}
                    </span>
                  </p>
                  <p className="mt-0.5 text-sm text-mutedFg">{termo.nota}</p>
                </div>
                <button
                  type="button"
                  onClick={() => falar(termo.termo, 0.85)}
                  disabled={!suportado}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs transition hover:bg-muted disabled:opacity-50"
                  aria-label={`Ouvir a pronúncia de ${termo.termo}`}
                >
                  ▶ Ouvir
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
