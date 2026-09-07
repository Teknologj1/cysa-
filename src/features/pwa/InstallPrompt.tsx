"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/Toast";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const CHAVE_DISPENSADO = "cysa:a2hs-dispensado";

function ehIOS(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function jaInstalado(): boolean {
  if (typeof window === "undefined") return false;
  const standalone = window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone =
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
    true;
  return standalone || iosStandalone;
}

/**
 * Convite para instalar o PWA. Usa o evento beforeinstallprompt onde ele
 * existe e, no iOS, mostra a instrução manual de "Adicionar à Tela de Início".
 */
export default function InstallPrompt() {
  const [evento, setEvento] = useState<BeforeInstallPromptEvent | null>(null);
  const [mostrar, setMostrar] = useState(false);
  const [ios, setIos] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (jaInstalado()) return;
    if (window.localStorage.getItem(CHAVE_DISPENSADO)) return;

    const noIOS = ehIOS();
    setIos(noIOS);

    const aoPoderInstalar = (e: Event) => {
      e.preventDefault();
      setEvento(e as BeforeInstallPromptEvent);
      setTimeout(() => setMostrar(true), 4000);
    };

    const aoInstalar = () => {
      setMostrar(false);
      setEvento(null);
      addToast({
        type: "success",
        title: "App instalado",
        message: "O CySA+ Prep está na sua tela de início.",
      });
    };

    window.addEventListener("beforeinstallprompt", aoPoderInstalar);
    window.addEventListener("appinstalled", aoInstalar);

    // iOS não dispara beforeinstallprompt: mostramos a instrução manual.
    let timerIOS: ReturnType<typeof setTimeout> | undefined;
    if (noIOS) {
      timerIOS = setTimeout(() => setMostrar(true), 6000);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", aoPoderInstalar);
      window.removeEventListener("appinstalled", aoInstalar);
      if (timerIOS) clearTimeout(timerIOS);
    };
  }, [addToast]);

  const dispensar = () => {
    setMostrar(false);
    window.localStorage.setItem(CHAVE_DISPENSADO, "1");
  };

  const instalar = async () => {
    if (!evento) return;
    try {
      await evento.prompt();
      const escolha = await evento.userChoice;
      if (escolha.outcome === "dismissed") {
        addToast({
          type: "info",
          title: "Instalação cancelada",
          message: "Você pode instalar depois pelo menu do navegador.",
        });
      }
      setEvento(null);
      setMostrar(false);
    } catch {
      addToast({
        type: "error",
        title: "Não foi possível instalar",
        message: "Tente novamente pelo menu do navegador.",
      });
    }
  };

  if (!mostrar) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-sm md:bottom-6">
      <div className="rounded-2xl border border-border bg-background p-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-lg">
            ⬇
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold">Instale o app</h3>
            <p className="mt-1 text-xs text-mutedFg">
              {ios
                ? "Toque em Compartilhar e escolha “Adicionar à Tela de Início” para estudar offline."
                : "Acesso rápido e estudo offline, direto da sua tela de início."}
            </p>
            <div className="mt-3 flex gap-2">
              {!ios && (
                <button
                  onClick={instalar}
                  className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primaryFg transition hover:opacity-90"
                >
                  Instalar
                </button>
              )}
              <button
                onClick={dispensar}
                className="rounded-lg px-3 py-2 text-xs text-mutedFg transition hover:text-foreground"
              >
                Agora não
              </button>
            </div>
          </div>
          <button
            onClick={dispensar}
            aria-label="Fechar"
            className="shrink-0 text-lg leading-none text-mutedFg transition hover:text-foreground"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
