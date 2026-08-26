"use client";

import React from "react";
import { Modal } from "@/components/atoms/feedback/Modal";
import { Heading3 } from "@/components/atoms/typography/Typography";
import { Input } from "@/components/atoms/form/Input";
import { Button } from "@/components/atoms/form/Button";
import { ImageDualInput } from "@/components/molecules/editor/ImageDualInput";
import { officialMascotPoses, quoteCategoryPresets } from "../types";
import { MessageSquareQuote, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuoteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  quoteText: string;
  setQuoteText: (val: string) => void;
  quoteCategoryBadge: string;
  setQuoteCategoryBadge: (val: string) => void;
  quoteImageSrc: string;
  setQuoteImageSrc: (val: string) => void;
  quoteIsActive: boolean;
  setQuoteIsActive: (val: boolean) => void;
  quoteImageMode: "official" | "custom";
  setQuoteImageMode: (val: "official" | "custom") => void;
  onSave: () => void;
}

export function QuoteEditorModal({
  isOpen,
  onClose,
  isEditing,
  quoteText,
  setQuoteText,
  quoteCategoryBadge,
  setQuoteCategoryBadge,
  quoteImageSrc,
  setQuoteImageSrc,
  quoteIsActive,
  setQuoteIsActive,
  quoteImageMode,
  setQuoteImageMode,
  onSave,
}: QuoteEditorModalProps) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={true} onClose={onClose} maxWidth="3xl">
      {/* STICKY MODAL HEADER */}
      <div className="flex items-center justify-between border-b border-jp-gray-200 bg-jp-paper/80 px-6 py-4 shrink-0 font-sans">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-100 text-jp-blue-900 shadow-2xs">
            <MessageSquareQuote className="h-4 w-4" />
          </div>
          <div>
            <Heading3 className="text-base sm:text-lg text-jp-ink font-heading font-bold">
              {isEditing ? "Edit Kutipan Tips Peru-Chan" : "Tambah Kutipan Tips Baru"}
            </Heading3>
            <p className="text-[11px] text-jp-gray-500 font-sans">
              Kutipan motivasi dan tips belajar seni beranda.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-jp-gray-400 hover:bg-jp-gray-100 hover:text-jp-ink transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* SCROLLABLE 2-COLUMN MODAL BODY */}
      <div className="flex-1 overflow-y-auto p-6 md:p-7 space-y-6 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* LEFT COLUMN: TEXT CONTENT */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                Teks Kutipan / Tips <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                placeholder="Contoh: Jangan takut mencoba warna kontras di kanvasmu. Keberanian eksperimen adalah awal karakter rupa!"
                className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-heading italic leading-relaxed shadow-2xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                Label Kategori Tips
              </label>
              <Input
                type="text"
                value={quoteCategoryBadge}
                onChange={(e) => setQuoteCategoryBadge(e.target.value)}
                placeholder="Contoh: Catatan Santai Peru-Chan"
                className="text-xs rounded-lg w-full"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quoteCategoryPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuoteCategoryBadge(preset)}
                    className={cn(
                      "rounded-md px-2 py-0.5 text-[10px] font-bold font-mono transition cursor-pointer border",
                      quoteCategoryBadge === preset
                        ? "bg-jp-blue-900 text-white border-jp-blue-900 shadow-2xs"
                        : "bg-jp-paper text-jp-gray-600 border-jp-gray-200 hover:bg-white"
                    )}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* ACTIVE STATUS TOGGLE */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="quoteActiveCheck"
                checked={quoteIsActive}
                onChange={(e) => setQuoteIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-jp-gray-300 text-jp-blue-900 focus:ring-jp-blue-700 cursor-pointer"
              />
              <label
                htmlFor="quoteActiveCheck"
                className="text-xs font-bold text-jp-ink cursor-pointer font-sans"
              >
                Aktifkan kutipan ini dalam tayangan beranda
              </label>
            </div>
          </div>

          {/* RIGHT COLUMN: MASCOT POSE SELECTION */}
          <div className="space-y-4 border-t md:border-t-0 md:border-l border-jp-gray-200 pt-4 md:pt-0 md:pl-6">
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                Pilih Pose Karakter Peru-Chan
              </label>
              <div className="grid grid-cols-2 gap-1 rounded-lg bg-jp-paper p-1 border border-jp-gray-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuoteImageMode("official")}
                  className={cn(
                    "rounded-md py-1.5 text-center text-xs font-bold font-mono transition cursor-pointer",
                    quoteImageMode === "official"
                      ? "bg-jp-blue-900 text-white shadow-2xs"
                      : "text-jp-gray-600 hover:text-jp-ink"
                  )}
                >
                  Pose Resmi
                </button>
                <button
                  type="button"
                  onClick={() => setQuoteImageMode("custom")}
                  className={cn(
                    "rounded-md py-1.5 text-center text-xs font-bold font-mono transition cursor-pointer",
                    quoteImageMode === "custom"
                      ? "bg-jp-blue-900 text-white shadow-2xs"
                      : "text-jp-gray-600 hover:text-jp-ink"
                  )}
                >
                  + Pose Kustom / Unggah
                </button>
              </div>

              {quoteImageMode === "official" ? (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    {officialMascotPoses.map((pose) => {
                      const isSelected = quoteImageSrc === pose.src;
                      return (
                        <button
                          key={pose.src}
                          type="button"
                          onClick={() => setQuoteImageSrc(pose.src)}
                          className={cn(
                            "flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition cursor-pointer shadow-2xs",
                            isSelected
                              ? "border-jp-blue-900 bg-jp-blue-50/70 ring-2 ring-jp-blue-900/30"
                              : "border-jp-gray-200 bg-white hover:bg-jp-paper"
                          )}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={pose.src}
                            alt={pose.shortLabel}
                            width={64}
                            height={64}
                            loading="lazy"
                            decoding="async"
                            className="h-16 w-16 object-contain"
                          />
                          <span className="text-[11px] font-bold text-jp-ink font-mono">
                            {pose.shortLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <ImageDualInput
                  label="Unggah atau Masukkan URL Pose Peru-Chan"
                  value={quoteImageSrc}
                  onChange={setQuoteImageSrc}
                  placeholderUrl="https://domain.com/peruchan-pose.png"
                  helperGuideline="Format PNG transparan sangat direkomendasikan, resolusi minimal 200×200 px, ukuran maksimal 2 MB."
                  minWidth={128}
                  minHeight={128}
                  maxSizeBytes={2 * 1024 * 1024}
                  maxSizeLabel="2 MB"
                  previewObjectFit="contain"
                  previewClassName="h-16 w-16 bg-white p-1"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STICKY MODAL FOOTER */}
      <div className="flex items-center justify-end gap-2.5 border-t border-jp-gray-200 bg-jp-paper/80 px-6 py-3.5 shrink-0 font-sans">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClose}
          className="rounded-lg text-xs font-bold cursor-pointer"
        >
          Batal
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onSave}
          className="rounded-lg font-bold text-xs cursor-pointer shadow-xs"
        >
          Simpan Kutipan
        </Button>
      </div>
    </Modal>
  );
}
