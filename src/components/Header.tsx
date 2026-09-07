"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useApp } from "./AppStateProvider";

const LINKS = [
  { href: "/curso", rotulo: "Curso" },
  { href: "/simulado", rotulo: "Simulado" },
  { href: "/progresso", rotulo: "Progresso" },
  { href: "/planos", rotulo: "Planos" },
];

export default function Header() {
  const pathname = usePathname();
  const { assinatura, pronto } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span
            aria-hidden
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primaryFg"
          >
            C+
          </span>
          <span className="tracking-tight">CySA+ Prep</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const ativo = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  ativo
                    ? "bg-muted text-foreground"
                    : "text-mutedFg hover:text-foreground"
                }`}
              >
                {link.rotulo}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          {pronto && assinatura.ativa ? (
            <Link
              href="/conta"
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400"
            >
              Assinatura ativa
            </Link>
          ) : (
            <Link
              href="/planos"
              className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primaryFg transition hover:opacity-90"
            >
              Assinar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
