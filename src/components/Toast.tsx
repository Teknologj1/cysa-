"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type TipoToast = "success" | "error" | "warning" | "info";

export type Toast = {
  id: string;
  type: TipoToast;
  title: string;
  message?: string;
  duration?: number;
};

type ToastContextType = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const contexto = useContext(ToastContext);
  if (!contexto) {
    throw new Error("useToast precisa estar dentro de ToastProvider");
  }
  return contexto;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((anteriores) => anteriores.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2, 11);
    setToasts((anteriores) => [
      ...anteriores,
      { id, duration: 5000, ...toast },
    ]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        className="fixed top-4 right-4 z-[60] w-full max-w-sm space-y-2"
        role="status"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const ESTILOS: Record<TipoToast, string> = {
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  error: "border-red-500/40 bg-red-500/10 text-red-200",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-100",
  info: "border-cyan-500/40 bg-cyan-500/10 text-cyan-100",
};

const ICONES: Record<TipoToast, string> = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i",
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisivel(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!toast.duration) return;
    const t = setTimeout(() => onRemove(toast.id), toast.duration);
    return () => clearTimeout(t);
  }, [toast.duration, toast.id, onRemove]);

  return (
    <div
      className={`rounded-xl border p-3 shadow-lg backdrop-blur transition-all duration-300 ${
        ESTILOS[toast.type]
      } ${visivel ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-bold">
          {ICONES[toast.type]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{toast.title}</p>
          {toast.message && (
            <p className="mt-1 text-sm opacity-90">{toast.message}</p>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="shrink-0 text-lg leading-none opacity-60 transition hover:opacity-100"
          aria-label="Fechar notificação"
        >
          ×
        </button>
      </div>
    </div>
  );
}
