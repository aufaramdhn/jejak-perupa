"use client";

import React from "react";
import { Heading2 } from "@/components/atoms/typography/Typography";
import { Select } from "@/components/atoms/form/Select";
import { Clock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleGeneralMetaSectionProps {
  title: string;
  setTitle: (val: string) => void;
  authorName: string;
  setAuthorName: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  categoryOptions: { label: string; value: string }[];
  readTime: string;
  setReadTime: (val: string) => void;
  excerpt: string;
  setExcerpt: (val: string) => void;
  errors: Record<string, string>;
  onClearError: (fieldId: string) => void;
  onOpenCategoryModal: () => void;
  mode?: "admin-create" | "admin-edit" | "public-contribute";
}

export function ArticleGeneralMetaSection({
  title,
  setTitle,
  authorName,
  setAuthorName,
  category,
  setCategory,
  categoryOptions,
  readTime,
  setReadTime,
  excerpt,
  setExcerpt,
  errors,
  onClearError,
  onOpenCategoryModal,
  mode,
}: ArticleGeneralMetaSectionProps) {
  return (
    <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6 font-sans">
      <div className="border-b border-jp-gray-200 pb-3">
        <div className="font-mono text-xs font-bold text-jp-blue-700">Bagian 1</div>
        <Heading2 className="text-xl text-jp-ink mt-0.5">
          Metadata & Identitas Naskah
        </Heading2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* JUDUL ARTIKEL */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-jp-ink">
            Judul Artikel <span className="text-red-500">*</span>
          </label>
          <input
            id="field-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors["field-title"]) onClearError("field-title");
            }}
            placeholder="Contoh: Mengapa Kita Perlu Belajar Sejarah Seni Rupa?"
            className={cn(
              "w-full rounded-lg border bg-white px-4 py-2.5 text-sm md:text-base font-bold text-jp-ink outline-none transition",
              errors["field-title"]
                ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                : "border-jp-gray-300 focus:border-jp-blue-700"
            )}
          />
          {errors["field-title"] && (
            <p className="text-[11px] font-semibold text-red-600 font-sans">
              {errors["field-title"]}
            </p>
          )}
        </div>

        {/* PENULIS / AFILIASI */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-jp-ink">
            Nama Penulis & Lembaga <span className="text-red-500">*</span>
          </label>
          <input
            id="field-author"
            type="text"
            value={authorName}
            onChange={(e) => {
              setAuthorName(e.target.value);
              if (errors["field-author"]) onClearError("field-author");
            }}
            placeholder="Nama Lengkap (Institusi / Komunitas)"
            className={cn(
              "w-full rounded-lg border bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink outline-none transition",
              errors["field-author"]
                ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                : "border-jp-gray-300 focus:border-jp-blue-700"
            )}
          />
          {errors["field-author"] && (
            <p className="text-[11px] font-semibold text-red-600 font-sans">
              {errors["field-author"]}
            </p>
          )}
        </div>

        {/* KATEGORI ARTIKEL */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-jp-ink">
              Kategori Wacana <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={onOpenCategoryModal}
              className="text-[11px] font-bold text-jp-blue-700 hover:text-jp-blue-900 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              {mode === "public-contribute" ? "Usulkan Kategori" : "+ Kategori Baru"}
            </button>
          </div>
          <Select
            options={categoryOptions}
            value={category}
            onChange={(val) => setCategory(val)}
            placeholder="Pilih Kategori..."
          />
        </div>

        {/* ESTIMASI WAKTU BACA */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-jp-ink flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-jp-gray-500" />
            Estimasi Durasi Baca <span className="text-red-500">*</span>
          </label>
          <input
            id="field-readtime"
            type="text"
            value={readTime}
            onChange={(e) => {
              setReadTime(e.target.value);
              if (errors["field-readtime"]) onClearError("field-readtime");
            }}
            placeholder="Contoh: 7 menit membaca"
            className={cn(
              "w-full rounded-lg border bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink outline-none transition",
              errors["field-readtime"]
                ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                : "border-jp-gray-300 focus:border-jp-blue-700"
            )}
          />
          {errors["field-readtime"] && (
            <p className="text-[11px] font-semibold text-red-600 font-sans">
              {errors["field-readtime"]}
            </p>
          )}
        </div>

        {/* RINGKASAN EKSEKUTIF / EXCERPT */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-jp-ink">
            Ringkasan Eksekutif (Excerpt / Sinopsis Naskah) <span className="text-red-500">*</span>
          </label>
          <textarea
            id="field-excerpt"
            rows={2}
            value={excerpt}
            onChange={(e) => {
              setExcerpt(e.target.value);
              if (errors["field-excerpt"]) onClearError("field-excerpt");
            }}
            placeholder="Tuliskan 1-2 kalimat pengantar ringkas yang merangkum esensi tulisan..."
            className={cn(
              "w-full rounded-lg border bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink outline-none transition font-prose leading-relaxed",
              errors["field-excerpt"]
                ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                : "border-jp-gray-300 focus:border-jp-blue-700"
            )}
          />
          {errors["field-excerpt"] && (
            <p className="text-[11px] font-semibold text-red-600 font-sans">
              {errors["field-excerpt"]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
