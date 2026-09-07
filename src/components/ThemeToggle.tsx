"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  // Antes de montar, o tema resolvido é desconhecido: manter o mesmo valor do
  // servidor evita divergência de hidratação (que deixaria o aria-label errado).
  const escuro = montado && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(escuro ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-mutedFg transition hover:text-foreground"
      aria-label={
        montado
          ? escuro
            ? "Ativar tema claro"
            : "Ativar tema escuro"
          : "Alternar tema"
      }
    >
      {montado ? (escuro ? "☀" : "☾") : ""}
    </button>
  );
}
