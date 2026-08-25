"use client";

import React from "react";
import { Modal } from "@/components/atoms/Modal";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
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
        return <CheckCircle className="h-5 w-5 text-green-700" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-700" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-700" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-jp-blue-700" />;
    }
  };

  const getIconContainerStyle = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-200";
      case "warning":
        return "bg-amber-100 border-amber-200";
      case "error":
        return "bg-red-100 border-red-200";
      case "info":
      default:
        return "bg-jp-blue-100 border-jp-blue-200";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="p-6 space-y-5">
        {/* HEADER */}
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
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-jp-gray-400 hover:bg-jp-gray-100 hover:text-jp-ink transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* MESSAGE BODY */}
        <p className="text-xs md:text-sm text-jp-gray-700 leading-relaxed font-prose whitespace-pre-line">
          {message}
        </p>

        {/* FOOTER */}
        <div className="flex justify-end pt-3 border-t border-jp-gray-100 font-sans">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onClose}
            className="rounded-lg px-5"
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
