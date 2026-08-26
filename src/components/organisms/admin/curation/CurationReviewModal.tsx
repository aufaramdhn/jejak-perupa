"use client";

import React from "react";
import { Button } from "@/components/atoms/form/Button";
import { SubmissionItem } from "@/lib/data/seeders/submissionsSeeder";
import { X, Sparkles, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurationReviewModalProps {
  submission: SubmissionItem | null;
  onClose: () => void;
  tipDraft: string;
  setTipDraft: (val: string) => void;
  themeDraft: "blue" | "brown" | "lime";
  setThemeDraft: (val: "blue" | "brown" | "lime") => void;
  onApprove: () => void;
  onRequestRevision: () => void;
}

export function CurationReviewModal({
  submission,
  onClose,
  tipDraft,
  setTipDraft,
  themeDraft,
  setThemeDraft,
  onApprove,
  onRequestRevision,
}: CurationReviewModalProps) {
  if (!submission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs font-sans animate-in fade-in duration-150">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xl">
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-jp-gray-200 bg-jp-paper px-6 py-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
              Meja Penelaahan Naskah
            </div>
            <h3 className="font-heading text-lg font-bold text-jp-ink truncate max-w-xl">
              {submission.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg text-jp-gray-400 hover:text-jp-ink p-1 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* CHAPTERS REVIEW */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-jp-gray-600 font-mono">
              Struktur Bab Naskah ({submission.chapters.length} Bab)
            </div>

            {submission.chapters.map((ch, idx) => (
              <div
                key={ch.title}
                className="rounded-xl border border-jp-gray-200 bg-jp-paper/30 p-5 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 px-2 items-center justify-center rounded-md bg-jp-blue-900 font-mono text-[11px] font-bold text-white">
                    Bab {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-jp-ink">
                    {ch.title}
                  </span>
                </div>
                <p className="text-xs text-jp-gray-700 font-prose leading-relaxed whitespace-pre-line">
                  {ch.content}
                </p>
              </div>
            ))}
          </div>

          {/* CITATIONS REVIEW */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-jp-gray-600 font-mono">
              Daftar Pustaka & Rujukan
            </div>
            <div className="rounded-lg border border-jp-gray-200 bg-jp-paper/30 p-4 space-y-1 text-xs font-prose text-jp-gray-700">
              {submission.references.map((ref, idx) => (
                <div key={ref}>
                  [{idx + 1}] {ref}
                </div>
              ))}
            </div>
          </div>

          {/* EDITORIAL PERU-CHAN EMBEDDING BOX */}
          <div className="rounded-xl border border-jp-blue-300 bg-jp-blue-50/60 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-jp-blue-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-900">
                Penyematan Catatan Kuratorial Peru-Chan
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-jp-ink">
                Teks Tips / Refleksi Maskot untuk Akhir Naskah:
              </label>
              <textarea
                rows={3}
                value={tipDraft}
                onChange={(e) => setTipDraft(e.target.value)}
                placeholder="Tuliskan catatan kuratorial yang membangun dan inspiratif..."
                className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-jp-ink">
                Pilih Aksen Warna Boks Catatan:
              </label>
              <div className="flex gap-2">
                {(["blue", "brown", "lime"] as const).map((accent) => (
                  <button
                    key={accent}
                    type="button"
                    onClick={() => setThemeDraft(accent)}
                    className={cn(
                      "flex-1 rounded-lg py-1.5 text-xs font-bold border transition cursor-pointer uppercase font-mono",
                      themeDraft === accent
                        ? "border-jp-ink bg-white text-jp-ink shadow-xs"
                        : "border-jp-gray-200 bg-jp-paper text-jp-gray-500 hover:bg-white"
                    )}
                  >
                    {accent}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MODAL ACTIONS */}
        <div className="flex items-center justify-between border-t border-jp-gray-200 bg-jp-paper px-6 py-4 font-sans">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRequestRevision}
            className="rounded-lg cursor-pointer"
          >
            Minta Revisi Penulis
          </Button>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="rounded-lg cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={onApprove}
              className="rounded-lg cursor-pointer"
            >
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Setujui & Terbitkan Naskah
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
