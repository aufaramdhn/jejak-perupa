"use client";

import React, { useState } from "react";
import { Modal } from "@/components/atoms/feedback/Modal";
import { Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { Input } from "@/components/atoms/form/Input";
import { Button } from "@/components/atoms/form/Button";
import { useCategories } from "@/lib/categoryContext";
import { useModal } from "@/lib/modalContext";
import { FolderPlus, Sparkles, X, Check } from "lucide-react";
import { ColorPicker } from "@/components/atoms/form/ColorPicker";
import { cn } from "@/lib/utils";

export interface QuickAddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (createdCategoryName: string) => void;
  isPublicSuggestion?: boolean;
}

export function QuickAddCategoryModal({
  isOpen,
  onClose,
  onSuccess,
  isPublicSuggestion = false,
}: QuickAddCategoryModalProps) {
  const { addCategory } = useCategories();
  const { alert } = useModal();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("#182C4A");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length < 3) {
      setError("Nama kategori minimal 3 karakter.");
      return;
    }

    const created = addCategory({
      name: name.trim(),
      description: description.trim(),
      colorHex: selectedColor,
      isApproved: !isPublicSuggestion,
    });

    setName("");
    setDescription("");
    setError("");
    onClose();

    if (onSuccess) {
      onSuccess(created.name);
    }

    alert({
      title: isPublicSuggestion
        ? "Usulan Kategori Terkirim"
        : "Kategori Berhasil Ditambahkan",
      message: isPublicSuggestion
        ? `Usulan kategori "${created.name}" telah dilampirkan dan akan ditinjau oleh Kurator Redaksi saat kurasi artikel.`
        : `Kategori "${created.name}" kini telah aktif dan dapat langsung digunakan pada seluruh artikel.`,
      type: "success",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <form onSubmit={handleSubmit} className="p-6 md:p-7 space-y-5 font-sans">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4 border-b border-jp-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jp-blue-100 text-jp-blue-900 border border-jp-blue-200 shadow-2xs">
              <FolderPlus className="h-5 w-5" />
            </div>
            <div>
              <Heading3 className="text-lg font-bold text-jp-ink">
                {isPublicSuggestion
                  ? "Usulkan Kategori Baru"
                  : "Tambah Kategori Wacana Baru"}
              </Heading3>
              <p className="text-xs text-jp-gray-500 font-prose">
                {isPublicSuggestion
                  ? "Usulan kategori akan dievaluasi oleh Kurator Redaksi bersamaan dengan naskah."
                  : "Buat taksonomi wacana baru untuk mengelompokkan artikel dan studi seni."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-jp-gray-400 hover:bg-jp-gray-100 hover:text-jp-ink transition cursor-pointer shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* INPUTS */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Nama Kategori <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Contoh: Eksplorasi Media / Kritik Seni"
              className={cn(
                "w-full rounded-lg border bg-white px-3.5 py-2 text-xs md:text-sm font-bold text-jp-ink outline-none transition",
                error
                  ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                  : "border-jp-gray-300 focus:border-jp-blue-700"
              )}
            />
            {error && (
              <p className="text-[11px] font-semibold text-red-600">{error}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Deskripsi Singkat (Opsional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan ruang lingkup materi yang masuk dalam kategori ini..."
              className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose"
            />
          </div>

          <div className="space-y-1.5 pt-1">
            <ColorPicker
              label="Pilihan Aksen Warna (Kuratorial & Kustom)"
              value={selectedColor}
              onChange={setSelectedColor}
            />
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex justify-end gap-2.5 pt-4 border-t border-jp-gray-100 font-sans">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-lg"
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="rounded-lg"
          >
            <FolderPlus className="h-4 w-4 mr-1.5" />
            {isPublicSuggestion ? "Kirimkan Usulan" : "Simpan Kategori"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
