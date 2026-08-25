"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ConfirmationModal, ConfirmationModalProps } from "@/components/molecules/ConfirmationModal";
import { AlertModal, AlertModalProps } from "@/components/molecules/AlertModal";
import { ToastContainer, ToastItem } from "@/components/molecules/Toast";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "primary" | "brown";
  iconType?: "alert" | "logout" | "trash" | "help";
}

interface AlertOptions {
  title: string;
  message: string;
  type?: "success" | "info" | "warning" | "error";
  buttonLabel?: string;
}

interface ToastOptions {
  title: string;
  message?: string;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
}

interface ModalContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
  alert: (options: AlertOptions) => Promise<void>;
  toast: (options: ToastOptions) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  // Confirm Modal State
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    options: ConfirmOptions;
    resolve?: (val: boolean) => void;
  }>({
    isOpen: false,
    options: { title: "", message: "" },
  });

  // Alert Modal State
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    options: AlertOptions;
    resolve?: () => void;
  }>({
    isOpen: false,
    options: { title: "", message: "" },
  });

  // Toast Items State
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Confirm method returning a Promise
  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({
        isOpen: true,
        options,
        resolve,
      });
    });
  }, []);

  const handleConfirmConfirm = () => {
    confirmState.resolve?.(true);
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirmCancel = () => {
    confirmState.resolve?.(false);
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  };

  // Alert method returning a Promise
  const alert = useCallback((options: AlertOptions): Promise<void> => {
    return new Promise<void>((resolve) => {
      setAlertState({
        isOpen: true,
        options,
        resolve,
      });
    });
  }, []);

  const handleAlertClose = () => {
    alertState.resolve?.();
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };

  // Toast method
  const toast = useCallback((options: ToastOptions) => {
    const newToast: ToastItem = {
      id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: options.title,
      message: options.message,
      type: options.type || "info",
      duration: options.duration || 4000,
    };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const handleDismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ModalContext.Provider value={{ confirm, alert, toast }}>
      {children}

      {/* GLOBAL CONFIRMATION MODAL */}
      <ConfirmationModal
        isOpen={confirmState.isOpen}
        title={confirmState.options.title}
        message={confirmState.options.message}
        confirmLabel={confirmState.options.confirmLabel}
        cancelLabel={confirmState.options.cancelLabel}
        variant={confirmState.options.variant}
        iconType={confirmState.options.iconType}
        onConfirm={handleConfirmConfirm}
        onCancel={handleConfirmCancel}
      />

      {/* GLOBAL ALERT MODAL */}
      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.options.title}
        message={alertState.options.message}
        type={alertState.options.type}
        buttonLabel={alertState.options.buttonLabel}
        onClose={handleAlertClose}
      />

      {/* GLOBAL TOAST CONTAINER */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
