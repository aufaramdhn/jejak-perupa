"use client";

import React from "react";
import { Button } from "@/components/atoms/form/Button";
import { ReferenceItem } from "./types";
import { Sparkles, BookOpen, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleReferencesManagerProps {
  peruChanTip?: string;
  setPeruChanTip: (val: string) => void;
  peruChanTheme: "blue" | "brown" | "lime";
  setPeruChanTheme: (val: "blue" | "brown" | "lime") => void;
  references: ReferenceItem[];
  onAddReference: () => void;
  onUpdateReference: (id: string, citation: string) => void;
  onDeleteReference: (id: string) => void;
}

export function ArticleReferencesManager({
  peruChanTip,
  setPeruChanTip,
  peruChanTheme,
  setPeruChanTheme,
  references,
  onAddReference,
  onUpdateReference,
  onDeleteReference,
}: ArticleReferencesManagerProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 items-start font-sans">
      {/* PERU-CHAN EDITORIAL TIP */}
      <div className="rounded-xl border border-jp-blue-200 bg-jp-blue-50/40 p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-jp-blue-200 pb-3">
          <Sparkles className="h-4 w-4 text-jp-blue-700" />
          <span className="font-heading text-sm font-bold text-jp-blue-900">
            Catatan Editorial Peru-Chan (Opsional)
          </span>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-jp-ink">
            Kutipan Tips di Akhir Bacaan:
          </label>
          <textarea
            rows={3}
            value={peruChanTip || ""}
            onChange={(e) => setPeruChanTip(e.target.value)}
            placeholder="Contoh: Selalu perhatikan ketebalan impasto saat menganalisis lukisan era romantisisme!"
            className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-jp-ink">
            Aksen Tema Boks Tips:
          </label>
          <div className="flex gap-2">
            {[
              { id: "blue", label: "Biru Klasik", colorBg: "bg-jp-blue-700" },
              { id: "brown", label: "Cokelat Arsip", colorBg: "bg-jp-brown-700" },
              { id: "lime", label: "Hijau Limau", colorBg: "bg-jp-lime-600" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setPeruChanTheme(t.id as any)}
                className={cn(
                  "flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold border transition cursor-pointer font-sans",
                  peruChanTheme === t.id
                    ? "border-jp-ink bg-white text-jp-ink shadow-2xs font-bold"
                    : "border-jp-gray-300 bg-jp-paper text-jp-gray-600 hover:bg-white"
                )}
              >
                <span className={cn("h-2 w-2 rounded-full", t.colorBg)} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DAFTAR PUSTAKA & RUJUKAN */}
      <div className="rounded-xl border border-jp-gray-300 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-jp-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-jp-gray-600" />
            <span className="font-heading text-sm font-bold text-jp-ink">
              Daftar Pustaka & Rujukan
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddReference}
            className="rounded-lg text-xs py-1 h-7 cursor-pointer"
          >
            <Plus className="h-3 w-3 mr-1" />
            Tambah Rujukan
          </Button>
        </div>

        <div className="space-y-3">
          {references.length > 0 ? (
            references.map((ref, idx) => (
              <div key={ref.id} className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-jp-gray-400 w-6 text-center shrink-0">
                  [{idx + 1}]
                </span>
                <input
                  type="text"
                  value={ref.citation}
                  onChange={(e) => onUpdateReference(ref.id, e.target.value)}
                  placeholder="Contoh: Kusnadi. (1980). Sejarah Seni Rupa Indonesia. Balai Pustaka."
                  className="flex-1 rounded-lg border border-jp-gray-300 bg-white px-3 py-1.5 text-xs text-jp-ink focus:border-jp-blue-700 outline-none font-prose"
                />
                <button
                  type="button"
                  onClick={() => onDeleteReference(ref.id)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-jp-gray-500 font-prose italic py-2">
              Belum ada daftar pustaka ditambahkan (opsional).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
