"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITENS = [
  { href: "/", rotulo: "Início", icone: "◉" },
  { href: "/curso", rotulo: "Curso", icone: "▤" },
  { href: "/simulado", rotulo: "Simulado", icone: "◈" },
  { href: "/lab-ingles", rotulo: "Inglês", icone: "◍" },
  { href: "/progresso", rotulo: "Progresso", icone: "▲" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 backdrop-blur md:hidden">
      <div className="grid grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        {ITENS.map((item) => {
          const ativo =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={ativo ? "page" : undefined}
              className={`flex flex-col items-center gap-1 py-2 text-xs transition-colors ${
                ativo ? "text-primary" : "text-mutedFg hover:text-foreground"
              }`}
            >
              <span aria-hidden className="text-base leading-none">
                {item.icone}
              </span>
              <span>{item.rotulo}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
