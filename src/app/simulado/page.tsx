import type { Metadata } from "next";
import { Suspense } from "react";
import SimuladoRunner from "@/components/SimuladoRunner";

export const metadata: Metadata = {
  title: "Simulados",
  description:
    "Simulados cronometrados do CySA+ CS0-003 com correção comentada e relatório por domínio.",
};

export default function SimuladoPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="h-64 animate-pulse rounded-2xl border border-border bg-muted/40" />
        </div>
      }
    >
      <SimuladoRunner />
    </Suspense>
  );
}
