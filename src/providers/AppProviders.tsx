"use client";

import ThemeProvider from "./ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import AssinaturaProvider from "@/features/assinatura/AssinaturaProvider";
import ProgressoProvider from "@/features/progresso/ProgressoProvider";

/** Composição única dos providers do app, consumida pelo layout raiz. */
export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AssinaturaProvider>
          <ProgressoProvider>{children}</ProgressoProvider>
        </AssinaturaProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
