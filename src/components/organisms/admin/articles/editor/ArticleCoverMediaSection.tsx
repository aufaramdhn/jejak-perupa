"use client";

import React from "react";
import { ImageDualInput } from "@/components/molecules/editor/ImageDualInput";
import { Sparkles, Eye } from "lucide-react";

interface ArticleCoverMediaSectionProps {
  coverImageUrl?: string;
  setCoverImageUrl: (val: string) => void;
  headerBgImageUrl?: string;
  setHeaderBgImageUrl: (val: string) => void;
  headerGradientOpacity: number;
  setHeaderGradientOpacity: (val: number) => void;
  headerGradientHeight: number;
  setHeaderGradientHeight: (val: number) => void;
}

export function ArticleCoverMediaSection({
  coverImageUrl,
  setCoverImageUrl,
  headerBgImageUrl,
  setHeaderBgImageUrl,
  headerGradientOpacity,
  setHeaderGradientOpacity,
  headerGradientHeight,
  setHeaderGradientHeight,
}: ArticleCoverMediaSectionProps) {
  return (
    <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6 font-sans">
      <div className="border-b border-jp-gray-200 pb-3">
        <div className="font-mono text-xs font-bold text-jp-blue-700">Bagian 2</div>
        <h2 className="text-xl font-heading font-bold text-jp-ink mt-0.5">
          Media Visual & Header Banner
        </h2>
      </div>

      <div className="space-y-6">
        {/* COVER IMAGE DUAL INPUT */}
        <div className="space-y-1.5">
          <ImageDualInput
            label="Gambar Sampul Artikel (Thumbnail Utama)"
            value={coverImageUrl || ""}
            onChange={setCoverImageUrl}
            placeholderUrl="https://domain.com/gambar-sampul.jpg"
            helperGuideline="Rekomendasi rasio 16:9 (minimal 1200×675 px), format JPG, PNG, atau WebP, ukuran maksimal 3 MB."
            minWidth={600}
            minHeight={338}
            maxSizeBytes={3 * 1024 * 1024}
            maxSizeLabel="3 MB"
            previewClassName="h-20 w-32"
          />
        </div>

        {/* HEADER PHOTO & GRADIENT OVERLAY (OPTIONAL CUSTOM HEADER) */}
        <div className="space-y-4 pt-6 border-t border-jp-gray-200">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-jp-blue-900" />
            <h3 className="font-heading text-sm md:text-base font-bold text-jp-ink">
              Foto Latar Belakang & Gradasi Header Artikel (Opsional)
            </h3>
          </div>

          <ImageDualInput
            label="Foto Latar Belakang Header"
            value={headerBgImageUrl || ""}
            onChange={setHeaderBgImageUrl}
            placeholderUrl="https://domain.com/foto-header-panorama.jpg"
            helperGuideline="Rekomendasi rasio horizontal panorama (21:9 atau 16:9), resolusi minimal 1600×600 px hingga 1920×800 px, format JPG, PNG, atau WebP berkualitas tinggi, ukuran maksimal 3 MB."
            minWidth={1200}
            minHeight={400}
            maxSizeBytes={3 * 1024 * 1024}
            maxSizeLabel="3 MB"
            previewClassName="h-20 w-44"
          />

          {headerBgImageUrl && (
            <div className="grid gap-6 sm:grid-cols-2 pt-3 border-t border-jp-gray-200">
              {/* SLIDE BAR 1: OPACITY */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-jp-ink">
                    Intensitas Gradasi Putih Pelindung Teks
                  </label>
                  <span className="font-mono text-xs font-bold bg-jp-blue-900 text-white px-2 py-0.5 rounded">
                    {headerGradientOpacity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  step="5"
                  value={headerGradientOpacity}
                  onChange={(e) => setHeaderGradientOpacity(Number(e.target.value))}
                  className="w-full accent-jp-blue-900 cursor-pointer h-2 bg-jp-gray-300 rounded-lg"
                />
                <p className="text-[11px] text-jp-gray-500 font-prose">
                  Semakin tinggi nilai persentase, semakin pekat lapisan putih pelindung teks di atas gambar.
                </p>
              </div>

              {/* SLIDE BAR 2: HEIGHT SPREAD */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-jp-ink">
                    Ketinggian Sebaran Gradasi
                  </label>
                  <span className="font-mono text-xs font-bold bg-jp-blue-900 text-white px-2 py-0.5 rounded">
                    {headerGradientHeight}%
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={headerGradientHeight}
                  onChange={(e) => setHeaderGradientHeight(Number(e.target.value))}
                  className="w-full accent-jp-blue-900 cursor-pointer h-2 bg-jp-gray-300 rounded-lg"
                />
                <p className="text-[11px] text-jp-gray-500 font-prose">
                  Mengatur ketinggian titik peralihan kabut gradasi putih dari bawah menuju foto asli di atas.
                </p>
              </div>

              {/* LIVE HEADER PREVIEW MOCKUP */}
              <div className="sm:col-span-2 space-y-2 pt-2">
                <div className="text-xs font-bold font-mono text-jp-blue-900 flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  Pratinjau Langsung Efek Gradasi Header
                </div>
                <div className="relative rounded-xl border border-jp-gray-300 overflow-hidden shadow-xs bg-jp-paper">
                  {/* IMAGE BACKDROP */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
                    style={{ backgroundImage: `url(${headerBgImageUrl})` }}
                  />
                  {/* GRADIENT OVERLAY */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-all duration-300"
                    style={{
                      background: `linear-gradient(to top, #FAFAF7 0%, rgba(250, 250, 247, ${headerGradientOpacity / 100}) ${headerGradientHeight}%, rgba(238, 245, 255, 0.45) 100%)`,
                    }}
                  />
                  {/* SAMPLE CONTENT */}
                  <div className="relative z-10 p-6 md:p-8 space-y-3">
                    <span className="font-mono text-[10px] font-bold text-jp-blue-900 bg-jp-blue-100/80 px-2 py-0.5 rounded">
                      CONTOH TAMPILAN HEADER
                    </span>
                    <h4 className="font-heading text-lg md:text-xl font-bold text-jp-ink">
                      Judul Artikel Kurasi dengan Perlindungan Keterbacaan Optimal
                    </h4>
                    <p className="text-xs text-jp-gray-600 font-prose max-w-xl">
                      Teks di atas akan selalu terbaca dengan kontras tajam di berbagai resolusi layar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
