"use client";

import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: "success" | "info" | "warning" | "error";
  duration?: number;
}

export interface ToastProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none font-sans"
    >
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-700" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-700" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-700" />;
      case "info":
      default:
        return <Info className="h-4 w-4 text-jp-blue-700" />;
    }
  };

  const getContainerStyle = () => {
    switch (toast.type) {
      case "success":
        return "border-green-300 bg-white text-jp-ink";
      case "warning":
        return "border-amber-300 bg-white text-jp-ink";
      case "error":
        return "border-red-300 bg-white text-jp-ink";
      case "info":
      default:
        return "border-jp-blue-300 bg-white text-jp-ink";
    }
  };

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg transition-all animate-in slide-in-from-bottom-5 duration-200",
        getContainerStyle()
      )}
    >
      <div className="mt-0.5 shrink-0">{getIcon()}</div>
      <div className="flex-1 space-y-0.5">
        <div className="text-xs font-bold text-jp-ink">{toast.title}</div>
        {toast.message && (
          <div className="text-[11px] text-jp-gray-600 font-prose leading-relaxed">
            {toast.message}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-jp-gray-400 hover:text-jp-ink transition p-0.5 rounded cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
