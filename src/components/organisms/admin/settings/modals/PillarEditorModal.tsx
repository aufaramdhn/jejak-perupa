"use client";

import React from "react";
import { Modal } from "@/components/atoms/feedback/Modal";
import { Heading3 } from "@/components/atoms/typography/Typography";
import { Input } from "@/components/atoms/form/Input";
import { Button } from "@/components/atoms/form/Button";
import { Layers, X } from "lucide-react";

interface PillarEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  pillarNumber: string;
  setPillarNumber: (val: string) => void;
  pillarIconName: string;
  setPillarIconName: (val: any) => void;
  pillarTitle: string;
  setPillarTitle: (val: string) => void;
  pillarDesc: string;
  setPillarDesc: (val: string) => void;
  onSave: () => void;
}

export function PillarEditorModal({
  isOpen,
  onClose,
  isEditing,
  pillarNumber,
  setPillarNumber,
  pillarIconName,
  setPillarIconName,
  pillarTitle,
  setPillarTitle,
  pillarDesc,
  setPillarDesc,
  onSave,
}: PillarEditorModalProps) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={true} onClose={onClose} maxWidth="lg">
      <div className="flex items-center justify-between border-b border-jp-gray-200 bg-jp-paper/80 px-6 py-4 shrink-0 font-sans">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-900 text-white shadow-2xs">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <Heading3 className="text-base sm:text-lg text-jp-ink font-heading font-bold">
              {isEditing ? "Edit Pilar Nilai Platform" : "Tambah Pilar Nilai Platform"}
            </Heading3>
            <p className="text-[11px] text-jp-gray-500 font-sans">
              Konfigurasi nomor urut, ikon, judul pilar, dan deskripsi narasi.
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

      <div className="p-6 space-y-4 font-sans">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Nomor Urut Pilar
            </label>
            <Input
              type="text"
              value={pillarNumber}
              onChange={(e) => setPillarNumber(e.target.value)}
              placeholder="01"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Pilihan Ikon
            </label>
            <select
              value={pillarIconName}
              onChange={(e) => setPillarIconName(e.target.value)}
              className="w-full rounded-lg border border-jp-gray-300 bg-white px-3 py-2 text-xs text-jp-ink focus:border-jp-blue-700 outline-none cursor-pointer"
            >
              <option value="book-open">Buku Terbuka (book-open)</option>
              <option value="layers">Lapisan Studio (layers)</option>
              <option value="sparkles">Kilau Kreatif (sparkles)</option>
              <option value="heart-handshake">Kolaborasi Komunal (heart-handshake)</option>
              <option value="compass">Kompas Arah (compass)</option>
              <option value="shield-check">Validitas Terkurasi (shield-check)</option>
              <option value="palette">Palet Rupa (palette)</option>
              <option value="lightbulb">Ide & Tips (lightbulb)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
            Judul Pilar <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={pillarTitle}
            onChange={(e) => setPillarTitle(e.target.value)}
            placeholder="Contoh: Edukatif & Berbobot"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
            Deskripsi Narasi <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={3}
            value={pillarDesc}
            onChange={(e) => setPillarDesc(e.target.value)}
            placeholder="Penjelasan ringkas makna pilar bagi pembelajar..."
            className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed"
            required
          />
        </div>
      </div>

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
          Simpan Pilar
        </Button>
      </div>
    </Modal>
  );
}
