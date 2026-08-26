"use client";

import React from "react";
import { Modal } from "@/components/atoms/feedback/Modal";
import { Heading3 } from "@/components/atoms/typography/Typography";
import { Input } from "@/components/atoms/form/Input";
import { Button } from "@/components/atoms/form/Button";
import { ColorPicker } from "@/components/atoms/form/ColorPicker";
import { ImageDualInput } from "@/components/molecules/editor/ImageDualInput";
import { officialMascotPoses } from "../types";
import { Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MascotSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  slideTitle: string;
  setSlideTitle: (val: string) => void;
  slideSubtitle: string;
  setSlideSubtitle: (val: string) => void;
  slideQuote: string;
  setSlideQuote: (val: string) => void;
  slideImageUrl: string;
  setSlideImageUrl: (val: string) => void;
  slideAccent: string;
  setSlideAccent: (val: string) => void;
  slideImageMode: "official" | "custom";
  setSlideImageMode: (val: "official" | "custom") => void;
  onSave: () => void;
}

export function MascotSlideModal({
  isOpen,
  onClose,
  isEditing,
  slideTitle,
  setSlideTitle,
  slideSubtitle,
  setSlideSubtitle,
  slideQuote,
  setSlideQuote,
  slideImageUrl,
  setSlideImageUrl,
  slideAccent,
  setSlideAccent,
  slideImageMode,
  setSlideImageMode,
  onSave,
}: MascotSlideModalProps) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={true} onClose={onClose} maxWidth="3xl">
      {/* STICKY MODAL HEADER */}
      <div className="flex items-center justify-between border-b border-jp-gray-200 bg-jp-paper/80 px-6 py-4 shrink-0 font-sans">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-900 text-white shadow-2xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <Heading3 className="text-base sm:text-lg text-jp-ink font-heading font-bold">
              {isEditing ? "Edit Pose Karakter Peru-Chan" : "Tambah Pose Karakter Peru-Chan"}
            </Heading3>
            <p className="text-[11px] text-jp-gray-500 font-sans">
              Konfigurasi naskah motivasi dan pose visual untuk hero beranda.
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
          {/* LEFT COLUMN: TEXT CONTENT & COLOR SELECTION */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                Judul Pose / Ekspresi <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                required
                value={slideTitle}
                onChange={(e) => setSlideTitle(e.target.value)}
                placeholder="Contoh: Peru-Chan : Eksplorasi Sketsa"
                className="text-xs rounded-lg w-full"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                Sub-Judul / Label Tag
              </label>
              <Input
                type="text"
                value={slideSubtitle}
                onChange={(e) => setSlideSubtitle(e.target.value)}
                placeholder="Contoh: CATATAN PRAKTIK STUDIO"
                className="text-xs rounded-lg w-full"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                Kutipan Motivasi / Tips Maskot <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={slideQuote}
                onChange={(e) => setSlideQuote(e.target.value)}
                placeholder="Tuliskan kutipan penyemangat belajar atau tips berkarya..."
                className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed shadow-2xs"
              />
            </div>

            {/* CUSTOM COLOR PICKER */}
            <div className="space-y-1.5 pt-1">
              <ColorPicker
                label="Pilihan Aksen Warna (Kuratorial & Kustom)"
                value={slideAccent}
                onChange={(newHex) => setSlideAccent(newHex)}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: MASCOT POSE SELECTION / UPLOAD */}
          <div className="space-y-4 border-t md:border-t-0 md:border-l border-jp-gray-200 pt-4 md:pt-0 md:pl-6">
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                Sumber Gambar Pose Karakter
              </label>
              <div className="grid grid-cols-2 gap-1 rounded-lg bg-jp-paper p-1 border border-jp-gray-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setSlideImageMode("official")}
                  className={cn(
                    "rounded-md py-1.5 text-center text-xs font-bold font-mono transition cursor-pointer",
                    slideImageMode === "official"
                      ? "bg-jp-blue-900 text-white shadow-2xs"
                      : "text-jp-gray-600 hover:text-jp-ink"
                  )}
                >
                  Pose Resmi
                </button>
                <button
                  type="button"
                  onClick={() => setSlideImageMode("custom")}
                  className={cn(
                    "rounded-md py-1.5 text-center text-xs font-bold font-mono transition cursor-pointer",
                    slideImageMode === "custom"
                      ? "bg-jp-blue-900 text-white shadow-2xs"
                      : "text-jp-gray-600 hover:text-jp-ink"
                  )}
                >
                  + Pose Kustom / Unggah
                </button>
              </div>

              {slideImageMode === "official" ? (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    {officialMascotPoses.map((pose) => {
                      const isSelected = slideImageUrl === pose.src;
                      return (
                        <button
                          key={pose.src}
                          type="button"
                          onClick={() => setSlideImageUrl(pose.src)}
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
                            width={72}
                            height={72}
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
                  label="Unggah atau Masukkan URL Pose Peru-Chan Baru"
                  value={slideImageUrl}
                  onChange={setSlideImageUrl}
                  placeholderUrl="https://domain.com/peruchan-pose-baru.png"
                  helperGuideline="Format PNG transparan sangat direkomendasikan, resolusi minimal 300×300 px, ukuran maksimal 2 MB."
                  minWidth={200}
                  minHeight={200}
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
          Simpan Slide
        </Button>
      </div>
    </Modal>
  );
}
