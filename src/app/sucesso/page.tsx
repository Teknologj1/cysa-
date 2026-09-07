import type { Metadata } from "next";
import { Suspense } from "react";
import SucessoView from "@/features/assinatura/components/SucessoView";

export const metadata: Metadata = {
  title: "Assinatura confirmada",
  robots: { index: false, follow: false },
};

export default function SucessoPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="h-56 animate-pulse rounded-2xl border border-border bg-muted/40" />
        </div>
      }
    >
      <SucessoView />
    </Suspense>
  );
}
