"use client";

import React from "react";
import { Modal } from "@/components/atoms/Modal";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { CheckCircle2, AlertTriangle, AlertOctagon, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: "success" | "info" | "warning" | "error";
  buttonLabel?: string;
  onClose: () => void;
}

export function AlertModal({
  isOpen,
  title,
  message,
  type = "info",
  buttonLabel = "Mengerti",
  onClose,
}: AlertModalProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-6 w-6 text-green-700" />;
      case "warning":
        return <AlertTriangle className="h-6 w-6 text-amber-700" />;
      case "error":
        return <AlertOctagon className="h-6 w-6 text-red-700" />;
      case "info":
      default:
        return <Info className="h-6 w-6 text-jp-blue-700" />;
    }
  };

  const getContainerStyle = () => {
    switch (type) {
      case "success":
        return {
          iconBox: "bg-green-100 border-green-200",
          buttonVariant: "primary" as const,
        };
      case "warning":
        return {
          iconBox: "bg-amber-100 border-amber-200",
          buttonVariant: "secondary" as const,
        };
      case "error":
        return {
          iconBox: "bg-red-100 border-red-200",
          buttonVariant: "outline" as const,
        };
      case "info":
      default:
        return {
          iconBox: "bg-jp-blue-100 border-jp-blue-200",
          buttonVariant: "primary" as const,
        };
    }
  };

  const currentStyle = getContainerStyle();

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="p-6 md:p-7 space-y-5 text-center sm:text-left font-sans">
        {/* TOP: ICON & CLOSE BUTTON */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-2xs",
                currentStyle.iconBox
              )}
            >
              {getIcon()}
            </div>
            <div>
              <Heading3 className="text-lg md:text-xl font-bold text-jp-ink leading-snug">
                {title}
              </Heading3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pemberitahuan"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-jp-gray-400 hover:bg-jp-gray-100 hover:text-jp-ink transition cursor-pointer shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* MESSAGE BODY */}
        <p className="text-xs md:text-sm text-jp-gray-700 leading-relaxed font-prose whitespace-pre-line pl-1">
          {message}
        </p>

        {/* FOOTER ACTIONS */}
        <div className="flex justify-end pt-3 border-t border-jp-gray-100 font-sans">
          <Button
            type="button"
            variant={currentStyle.buttonVariant}
            size="sm"
            onClick={onClose}
            className="rounded-lg px-6 w-full sm:w-auto"
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
