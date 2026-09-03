"use client";

import React from "react";
import { Heading2 } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/atoms/form/Button";
import dynamic from "next/dynamic";
import { RichEditorSkeleton } from "@/components/molecules/editor/RichEditorSkeleton";
import { ChapterItem } from "./types";
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const RichTextEditor = dynamic(
  () => import("@/components/molecules/editor/RichTextEditor").then((mod) => mod.RichTextEditor),
  {
    ssr: false,
    loading: () => <RichEditorSkeleton />,
  }
);

interface ArticleChaptersManagerProps {
  chapters: ChapterItem[];
  errors: Record<string, string>;
  onAddChapter: () => void;
  onUpdateChapter: (id: string, fieldOrObj: string | Partial<ChapterItem>, value?: string) => void;
  onDeleteChapter: (id: string, index: number) => void;
  onMoveChapter: (index: number, direction: "up" | "down") => void;
}

export function ArticleChaptersManager({
  chapters,
  errors,
  onAddChapter,
  onUpdateChapter,
  onDeleteChapter,
  onMoveChapter,
}: ArticleChaptersManagerProps) {
  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="font-mono text-xs font-bold text-jp-blue-700">Bagian 3</div>
          <Heading2 className="text-xl text-jp-ink mt-0.5">
            Struktur Bab & Isi Pembahasan
          </Heading2>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAddChapter}
          className="rounded-lg text-xs w-full sm:w-auto justify-center cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Tambah Bab Baru
        </Button>
      </div>

      <div className="space-y-6">
        {chapters.map((ch, idx) => (
          <div
            key={ch.id}
            className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-7 shadow-2xs space-y-4"
          >
            {/* CHAPTER HEADER */}
            <div className="flex items-center justify-between border-b border-jp-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 px-2.5 items-center justify-center rounded-md bg-jp-blue-900 font-mono text-xs font-bold text-white">
                  Bab {idx + 1}
                </span>
                <span className="text-xs font-semibold text-jp-gray-600 font-sans">
                  Subjudul Pembahasan
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onMoveChapter(idx, "up")}
                  disabled={idx === 0}
                  title="Geser Bab ke Atas"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-jp-gray-200 text-jp-gray-600 hover:bg-jp-paper disabled:opacity-30 cursor-pointer"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onMoveChapter(idx, "down")}
                  disabled={idx === chapters.length - 1}
                  title="Geser Bab ke Bawah"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-jp-gray-200 text-jp-gray-600 hover:bg-jp-paper disabled:opacity-30 cursor-pointer"
                >
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteChapter(ch.id, idx)}
                  title="Hapus Bab Ini"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer ml-1"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* CHAPTER TITLE INPUT */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-jp-ink">
                Judul Bab {idx + 1} <span className="text-red-500">*</span>
              </label>
              <input
                id={`chapter_title_${ch.id}`}
                type="text"
                value={ch.title}
                onChange={(e) => onUpdateChapter(ch.id, "title", e.target.value)}
                placeholder="Contoh: Fondasi Estetika & Anatomi Bentuk"
                className={cn(
                  "w-full rounded-lg border bg-white px-3.5 py-2 text-xs md:text-sm font-bold text-jp-ink outline-none transition",
                  errors[`chapter_title_${ch.id}`]
                    ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                    : "border-jp-gray-300 focus:border-jp-blue-700"
                )}
              />
              {errors[`chapter_title_${ch.id}`] && (
                <p className="text-[11px] font-semibold text-red-600 font-sans">
                  {errors[`chapter_title_${ch.id}`]}
                </p>
              )}
            </div>

            {/* CHAPTER RICH TEXT EDITOR */}
            <div className="space-y-1.5" id={`chapter_content_${ch.id}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs font-bold text-jp-ink">
                  Uraian Isi Bab {idx + 1} <span className="text-red-500">*</span>
                </label>

                {/* QUICK COMPONENT INSERTERS WITH HUMAN-READABLE CUSTOM SYNTAX */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      const prefix = ch.content && !ch.content.endsWith("\n") ? "\n\n" : "";
                      const cardTemplate = `${prefix}:::kartu-pilihan\n[kartu]\njudul: Studio / Peminatan 1\ndeskripsi: Tuliskan eksplorasi media dan fokus kajian 1 di sini...\n[/kartu]\n[kartu]\njudul: Studio / Peminatan 2\ndeskripsi: Tuliskan eksplorasi media dan fokus kajian 2 di sini...\n[/kartu]\n:::\n\n`;
                      onUpdateChapter(ch.id, "content", (ch.content || "") + cardTemplate);
                    }}
                    className="rounded-md border border-jp-gray-200 bg-white hover:bg-jp-paper px-2 py-1 text-[11px] font-bold text-jp-ink transition cursor-pointer shadow-2xs"
                    title="Sisipkan Kartu Pilihan / Studio 2 Kolom"
                  >
                    + Kartu Pilihan (2 Kolom)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const prefix = ch.content && !ch.content.endsWith("\n") ? "\n\n" : "";
                      const tableTemplate = `${prefix}:::tabel\nheader: Aspek Komparasi | Peminatan A | Peminatan B\nbaris: Medium Primer | Kanvas & Cat Minyak | Logam, Kayu & Batu\nbaris: Dimensi Rupa | 2 Dimensi (Datar) | 3 Dimensi (Spasial)\n:::\n\n`;
                      onUpdateChapter(ch.id, "content", (ch.content || "") + tableTemplate);
                    }}
                    className="rounded-md border border-jp-gray-200 bg-white hover:bg-jp-paper px-2 py-1 text-[11px] font-bold text-jp-ink transition cursor-pointer shadow-2xs"
                    title="Sisipkan Tabel Komparasi Bersih"
                  >
                    + Tabel Komparasi
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const prefix = ch.content && !ch.content.endsWith("\n") ? "\n\n" : "";
                      const termTemplate = `${prefix}:::istilah\nistilah: Istilah Kunci\npenjelasan: Tuliskan definisi atau penjelasan konsep khusus di sini...\n:::\n\n`;
                      onUpdateChapter(ch.id, "content", (ch.content || "") + termTemplate);
                    }}
                    className="rounded-md border border-jp-blue-200 bg-jp-blue-50/70 hover:bg-jp-blue-100 px-2 py-1 text-[11px] font-bold text-jp-blue-900 transition cursor-pointer shadow-2xs"
                    title="Sisipkan Kotak Istilah / Bubble Box"
                  >
                    + Kotak Istilah
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const prefix = ch.content && !ch.content.endsWith("\n") ? "\n\n" : "";
                      const quoteTemplate = `${prefix}:::kutipan\nkutipan: Tuliskan kutipan wacana penting atau penekanan gagasan di sini...\ntokoh: Nama Tokoh / Sumber\n:::\n\n`;
                      onUpdateChapter(ch.id, "content", (ch.content || "") + quoteTemplate);
                    }}
                    className="rounded-md border border-jp-gray-200 bg-white hover:bg-jp-paper px-2 py-1 text-[11px] font-bold text-jp-ink transition cursor-pointer shadow-2xs"
                    title="Sisipkan Kutipan Wacana"
                  >
                    + Kutipan Wacana
                  </button>
                </div>
              </div>

              <RichTextEditor
                value={ch.content}
                onChange={(val) => onUpdateChapter(ch.id, "content", val)}
                placeholder="Tuliskan uraian kritis, analisis visual, atau catatan teori..."
                rows={8}
              />
              {errors[`chapter_content_${ch.id}`] && (
                <p className="text-[11px] font-semibold text-red-600 font-sans pt-1">
                  {errors[`chapter_content_${ch.id}`]}
                </p>
              )}
            </div>

            {/* CHAPTER PERU-CHAN TIP (PER-BAB INTEGRATION) */}
            <div className="pt-3 border-t border-jp-gray-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-jp-blue-900 font-sans">
                  <Sparkles className="h-3.5 w-3.5 text-jp-blue-700" />
                  <span>Catatan Kuratorial Peru-Chan untuk Bab Ini (Opsional)</span>
                </div>

                {ch.peruChanTip && ch.peruChanTip.trim().length > 0 ? (
                  <button
                    type="button"
                    onClick={() => onUpdateChapter(ch.id, { peruChanTip: "" })}
                    className="text-[11px] font-bold text-red-600 hover:text-red-800 transition cursor-pointer"
                  >
                    Hapus Catatan Bab
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateChapter(ch.id, {
                        peruChanTip: "Tuliskan tips analisis atau poin penting untuk bab ini...",
                        peruChanTheme: ch.peruChanTheme || "blue",
                      })
                    }
                    className="text-[11px] font-bold text-jp-blue-700 hover:text-jp-blue-900 flex items-center gap-1 transition cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    Sisipkan Catatan Peru-Chan
                  </button>
                )}
              </div>

              {ch.peruChanTip !== undefined && ch.peruChanTip.trim().length > 0 && (
                <div className="rounded-xl border border-jp-blue-200 bg-jp-blue-50/50 p-4 space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-jp-blue-900">
                      Teks Catatan / Tips Maskot Bab {idx + 1}
                    </label>
                    <textarea
                      rows={2}
                      value={ch.peruChanTip}
                      onChange={(e) => onUpdateChapter(ch.id, "peruChanTip", e.target.value)}
                      placeholder="Tips visual praktis atau pengingat konsep..."
                      className="w-full rounded-lg border border-jp-blue-300 bg-white px-3 py-2 text-xs text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed shadow-2xs"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-jp-gray-600">Tema Warna Kotak:</span>
                    {(["blue", "brown", "lime"] as const).map((t) => (
                      <label key={t} className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name={`theme_${ch.id}`}
                          value={t}
                          checked={(ch.peruChanTheme || "blue") === t}
                          onChange={() => onUpdateChapter(ch.id, { peruChanTheme: t })}
                          className="accent-jp-blue-900"
                        />
                        <span className="capitalize">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
