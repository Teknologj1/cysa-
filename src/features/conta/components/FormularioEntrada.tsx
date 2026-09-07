"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseNavegador } from "../lib/supabase-browser";

type Estado = "formulario" | "enviando" | "enviado" | "erro";

/**
 * Entrada por link mágico: o aluno informa o e-mail e recebe um link de
 * acesso. É o mesmo e-mail usado no checkout, e é isso que liga a compra à
 * conta — sem exigir cadastro antes de pagar.
 */
export default function FormularioEntrada({
  proximo = "/curso",
}: {
  proximo?: string;
}) {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<Estado>("formulario");
  const [mensagemErro, setMensagemErro] = useState("");

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    const supabase = getSupabaseNavegador();
    if (!supabase) return;

    setEstado("enviando");
    const destino = `${window.location.origin}/auth/callback?proximo=${encodeURIComponent(proximo)}`;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: destino },
    });

    if (error) {
      setMensagemErro(error.message);
      setEstado("erro");
      return;
    }
    setEstado("enviado");
  }

  if (estado === "enviado") {
    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.06] p-6 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-lg">
          ✉
        </div>
        <h2 className="mt-4 text-lg font-semibold">Link enviado</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-mutedFg">
          Abra o e-mail que acabamos de mandar para{" "}
          <strong className="text-foreground">{email}</strong> e clique no link
          de acesso. Ele vale por uma hora.
        </p>
        <button
          type="button"
          onClick={() => setEstado("formulario")}
          className="mt-5 text-sm text-primary hover:underline"
        >
          Usar outro e-mail
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={enviar}
      className="rounded-2xl border border-border bg-muted/20 p-6"
    >
      <label htmlFor="email" className="text-sm font-medium">
        Seu e-mail
      </label>
      <p className="mt-1 text-xs text-mutedFg">
        Use o mesmo e-mail da compra para o acesso ser reconhecido.
      </p>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="voce@exemplo.com"
        className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
      />

      {estado === "erro" && (
        <p className="mt-3 text-sm text-danger">{mensagemErro}</p>
      )}

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="mt-4 w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primaryFg transition hover:opacity-90 disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Receber link de acesso"}
      </button>

      <p className="mt-4 text-xs text-mutedFg">
        Sem senha para criar ou esquecer. Ainda não assinou?{" "}
        <Link href="/planos" className="text-primary hover:underline">
          Ver planos
        </Link>
      </p>
    </form>
  );
}
