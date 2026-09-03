"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/form/Button";
import {
  ArrowLeft,
  CheckCircle,
  Edit3,
  Eye,
  Zap,
  RotateCcw,
  Save,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleEditorStickyBarProps {
  backUrl: string;
  activeTab: "write" | "preview";
  setActiveTab: (tab: "write" | "preview") => void;
  lastAutoSaveTime: string | null;
  mode?: "admin-create" | "admin-edit" | "public-contribute";
  onQuickFillDev: () => void;
  onClearForm: () => void;
  onSubmit: (isDraft: boolean) => void;
}

export function ArticleEditorStickyBar({
  backUrl,
  activeTab,
  setActiveTab,
  lastAutoSaveTime,
  mode,
  onQuickFillDev,
  onClearForm,
  onSubmit,
}: ArticleEditorStickyBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pb-4 border-b border-jp-gray-300 font-sans">
      <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
        <Link href={backUrl}>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-lg text-xs cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Kembali
          </Button>
        </Link>

        {lastAutoSaveTime && (
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-green-800">
            <CheckCircle className="h-3.5 w-3.5 text-green-600" />
            <span>Tersimpan otomatis ({lastAutoSaveTime})</span>
          </div>
        )}
      </div>

      {/* TAB TOGGLE & ACTIONS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between sm:justify-end gap-3 w-full sm:w-auto font-sans">
        {/* TABS (Naskah vs Pratinjau) */}
        <div className="grid grid-cols-2 sm:flex items-center gap-1 rounded-xl bg-jp-gray-200/70 p-1 w-full sm:w-auto shadow-2xs border border-jp-gray-300/60">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={cn(
              "flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer font-sans w-full whitespace-nowrap",
              activeTab === "write"
                ? "bg-white text-jp-blue-900 shadow-2xs font-bold"
                : "text-jp-gray-600 hover:text-jp-ink"
            )}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Naskah</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer font-sans w-full whitespace-nowrap",
              activeTab === "preview"
                ? "bg-white text-jp-blue-900 shadow-2xs font-bold"
                : "text-jp-gray-600 hover:text-jp-ink"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Pratinjau</span>
          </button>
        </div>

        {/* ACTION BUTTONS: RESET ONLY OR CREATE HELPER */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-jp-gray-200 pt-2.5 sm:pt-0 sm:pl-3">
          {mode === "admin-create" && (
            <button
              type="button"
              onClick={onQuickFillDev}
              title="Isi Draf Contoh Lengkap untuk Pengujian Cepat"
              className="flex flex-1 sm:flex-initial items-center justify-center gap-1 rounded-lg border border-jp-blue-200 bg-jp-blue-50/60 px-3 py-2 sm:py-1.5 text-xs font-bold text-jp-blue-900 hover:bg-jp-blue-100 hover:border-jp-blue-300 transition cursor-pointer shadow-2xs h-9"
            >
              <Zap className="h-3.5 w-3.5 text-jp-blue-700" />
              <span>Contoh Draf</span>
            </button>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClearForm}
            className="flex-1 sm:flex-initial rounded-lg text-xs justify-center py-2 sm:py-1.5 h-9 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset Form
          </Button>
        </div>
      </div>
    </div>
  );
}
