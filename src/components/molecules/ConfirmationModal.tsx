"use client";

import React from "react";
import { Modal } from "@/components/atoms/Modal";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import {
  AlertTriangle,
  LogOut,
  Trash2,
  HelpCircle,
  X,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "primary" | "brown";
  iconType?: "alert" | "logout" | "trash" | "help";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = "Konfirmasi",
  cancelLabel = "Batal",
  variant = "primary",
  iconType = "help",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const getIcon = () => {
    switch (iconType) {
      case "logout":
        return <LogOut className="h-5 w-5 text-red-700" />;
      case "trash":
        return <Trash2 className="h-5 w-5 text-red-700" />;
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-amber-700" />;
      case "help":
      default:
        return <AlertCircle className="h-5 w-5 text-jp-blue-700" />;
    }
  };

  const getIconContainerStyle = () => {
    switch (variant) {
      case "danger":
        return "bg-red-100 border-red-200";
      case "warning":
        return "bg-amber-100 border-amber-200";
      case "brown":
        return "bg-jp-brown-100 border-jp-brown-200";
      case "primary":
      default:
        return "bg-jp-blue-100 border-jp-blue-200";
    }
  };

  const getConfirmButtonVariant = () => {
    switch (variant) {
      case "danger":
        return "outline";
      case "warning":
        return "secondary";
      case "brown":
        return "brown";
      case "primary":
      default:
        return "primary";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel} maxWidth="md">
      <div className="p-6 space-y-5">
        {/* HEADER & ICON */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-2xs",
                getIconContainerStyle()
              )}
            >
              {getIcon()}
            </div>
            <div>
              <Heading3 className="text-lg text-jp-ink">{title}</Heading3>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-jp-gray-400 hover:bg-jp-gray-100 hover:text-jp-ink transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* MESSAGE BODY */}
        <p className="text-xs md:text-sm text-jp-gray-700 leading-relaxed font-prose">
          {message}
        </p>

        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-jp-gray-100 font-sans">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
            className="rounded-lg"
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            variant={getConfirmButtonVariant() as any}
            size="sm"
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "rounded-lg",
              variant === "danger" &&
                "bg-red-600 border-red-600 text-white hover:bg-red-700 hover:border-red-700"
            )}
          >
            {isLoading ? "Memproses..." : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
