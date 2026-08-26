"use client";

import React, { useState } from "react";
import { Heading3 } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/atoms/form/Button";
import { PeruChanTipBanner } from "@/components/organisms/peruchan/PeruChanTipBanner";
import { PeruChanQuoteItem } from "@/lib/data/siteSettings";
import { Plus, Trash2, Edit2, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuotesLibraryTabProps {
  quotes: PeruChanQuoteItem[];
  onOpenAddQuote: () => void;
  onOpenEditQuote: (quote: PeruChanQuoteItem) => void;
  onDeleteQuote: (id: string, text: string) => void;
  onToggleQuoteActive: (id: string) => void;
}

export function QuotesLibraryTab({
  quotes,
  onOpenAddQuote,
  onOpenEditQuote,
  onDeleteQuote,
  onToggleQuoteActive,
}: QuotesLibraryTabProps) {
  const [showQuotesPreview, setShowQuotesPreview] = useState(false);

  return (
    <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jp-gray-100 pb-4">
        <div>
          <Heading3 className="text-lg text-jp-ink">
            Library Quotes & Tips Kuratorial Peru-Chan
          </Heading3>
          <p className="mt-1 text-xs text-jp-gray-500 font-prose">
            Koleksi kutipan tips yang tayang berganti otomatis (*game loading screen style*) di bagian bawah beranda.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowQuotesPreview(!showQuotesPreview)}
            className="rounded-lg text-xs font-bold border-jp-blue-300 text-jp-blue-900 hover:bg-jp-blue-50 cursor-pointer"
          >
            {showQuotesPreview ? (
              <>
                <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                Sembunyikan Pratinjau
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5 mr-1.5" />
                Lihat Pratinjau
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onOpenAddQuote}
            className="rounded-lg font-bold text-xs cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Tambah Kutipan Baru
          </Button>
        </div>
      </div>

      {/* QUOTES LIST */}
      <div className="grid gap-4 sm:grid-cols-2">
        {quotes.map((q, idx) => (
          <div
            key={q.id}
            className={cn(
              "relative flex flex-col justify-between rounded-xl border p-5 transition shadow-2xs",
              q.isActive
                ? "border-jp-gray-300 bg-white hover:border-jp-blue-400"
                : "border-jp-gray-200 bg-jp-paper/50 opacity-60"
            )}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-jp-gray-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-jp-blue-900 bg-jp-blue-50 px-2 py-0.5 rounded border border-jp-blue-200">
                    {q.categoryBadge}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleQuoteActive(q.id)}
                  className={cn(
                    "rounded-md px-2 py-0.5 text-[10px] font-bold font-mono transition cursor-pointer border",
                    q.isActive
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-100 text-gray-500 border-gray-200"
                  )}
                >
                  {q.isActive ? "Aktif Tayang" : "Non-Aktif"}
                </button>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-jp-blue-50 border border-jp-blue-100 p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={q.imageSrc || "/images/mascot/peruchan-drawing.png"}
                    alt="Peru-Chan"
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className="max-h-14 object-contain"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-heading text-sm md:text-base italic text-jp-ink leading-relaxed">
                    &ldquo;{q.quoteText}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-jp-gray-100 pt-3 text-xs text-jp-gray-400 font-mono">
              <span>Slot #{idx + 1}</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onOpenEditQuote(q)}
                  title="Edit Kutipan"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition cursor-pointer"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteQuote(q.id, q.quoteText)}
                  title="Hapus Kutipan"
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOGGLEABLE LIVE PREVIEW */}
      {showQuotesPreview && (
        <div className="rounded-xl border border-jp-blue-200 bg-jp-blue-50/50 p-6 space-y-4 animate-in fade-in zoom-in-98 duration-200">
          <div className="flex items-center justify-between border-b border-jp-blue-200/80 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-jp-blue-900 uppercase tracking-wider">
              <Eye className="h-4 w-4" />
              Pratinjau Live Banner Tips Beranda (Auto-Slideshow)
            </div>
            <button
              type="button"
              onClick={() => setShowQuotesPreview(false)}
              className="text-xs font-semibold text-jp-blue-700 hover:text-jp-blue-900 hover:underline cursor-pointer flex items-center gap-1"
            >
              <EyeOff className="h-3.5 w-3.5" />
              Sembunyikan
            </button>
          </div>

          <div className="w-full flex items-center justify-center py-2">
            <PeruChanTipBanner autoPlayInterval={4000} className="w-full shadow-md" />
          </div>
        </div>
      )}
    </div>
  );
}
