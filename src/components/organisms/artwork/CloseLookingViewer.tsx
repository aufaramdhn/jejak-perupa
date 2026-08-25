"use client";

import React, { useState } from "react";
import { Palette, Info } from "lucide-react";
import { Heading2, Heading3, Paragraph, SectionLabel } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import type { ArtworkData } from "@/lib/data/artworks";
import { cn } from "@/lib/utils";

export interface CloseLookingViewerProps {
  artwork: ArtworkData;
  className?: string;
}

export function CloseLookingViewer({
  artwork,
  className,
}: CloseLookingViewerProps) {
  const [activeFocalId, setActiveFocalId] = useState<string | null>(
    artwork.focalPoints[0]?.id || null
  );
  const [showColorPalette, setShowColorPalette] = useState(true);

  const activeFocal = artwork.focalPoints.find((f) => f.id === activeFocalId);

  return (
    <div className={cn("space-y-10 font-sans", className)}>
      {/* HEADER INFO */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <SectionLabel>Eksplorasi Mendalam (Close Looking)</SectionLabel>
          <Badge variant="lime">Analisis Visual Interaktif</Badge>
        </div>
        <Heading2 className="mt-2 text-jp-ink text-3xl sm:text-4xl">
          {artwork.title} ({artwork.yearCreated})
        </Heading2>
        <Paragraph className="mt-2 text-base font-semibold text-jp-brown-900 font-sans">
          Karya {artwork.artistName} • {artwork.mediumMaterial} • {artwork.dimensions}
        </Paragraph>
        <p className="mt-1 text-xs text-jp-gray-500 font-mono">
          Lokasi Koleksi: {artwork.currentLocation}
        </p>
      </div>

      {/* INTERACTIVE CANVAS / IMAGE VIEWER WITH FOCAL POINTS (ROUNDED-XL) */}
      <div className="relative overflow-hidden rounded-xl border border-jp-gray-300 bg-jp-ink shadow-2xs">
        <div className="relative aspect-[16/10] w-full select-none overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={artwork.highResImageUrl}
            alt={artwork.title}
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700"
          />

          {/* FOCAL POINT PINS */}
          {artwork.focalPoints.map((focal, idx) => {
            const isActive = focal.id === activeFocalId;
            return (
              <button
                key={focal.id}
                type="button"
                onClick={() => setActiveFocalId(focal.id)}
                style={{
                  top: `${focal.yPercent}%`,
                  left: `${focal.xPercent}%`,
                }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer shadow-lg",
                  isActive
                    ? "h-10 w-10 bg-jp-lime text-jp-ink ring-4 ring-white/90 scale-110 z-20"
                    : "h-7 w-7 bg-jp-blue-900/90 text-white ring-2 ring-white/70 hover:scale-110 hover:bg-jp-blue-700 z-10"
                )}
                aria-label={`Titik fokus: ${focal.title}`}
              >
                <span className="font-mono text-xs font-extrabold">{idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* BOTTOM CONTROLS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-jp-ink/90 p-4 text-white backdrop-blur">
          <div className="flex items-center gap-2 text-xs text-jp-paper/80">
            <Info className="h-4 w-4 text-jp-lime shrink-0" />
            <span>Klik nomor pin pada kanvas untuk membedah detail visual.</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={showColorPalette ? "lime" : "outline"}
              size="sm"
              onClick={() => setShowColorPalette(!showColorPalette)}
              className="text-xs rounded-lg"
            >
              <Palette className="h-3.5 w-3.5 mr-1" />
              {showColorPalette ? "Sembunyikan Palet" : "Lihat Palet Warna"}
            </Button>
          </div>
        </div>
      </div>

      {/* COLOR PALETTE DISPLAY (ROUNDED-XL) */}
      {showColorPalette && (
        <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jp-blue-700">
            <Palette className="h-4 w-4" />
            Ekstraksi Palet Warna Karya
          </div>
          <p className="mt-1 text-xs text-jp-gray-500">
            Kombinasi skema warna utama yang membentuk atmosfer dan dinamika emosi karya.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {artwork.colorPalette.map((color) => (
              <div
                key={color.hex}
                className="flex items-center gap-3 rounded-lg border border-jp-gray-200 p-2.5 bg-jp-paper"
              >
                <div
                  className="h-8 w-8 shrink-0 rounded-md shadow-inner border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-xs font-bold text-jp-ink truncate">
                    {color.hex}
                  </div>
                  <div className="text-[11px] text-jp-gray-500 truncate">
                    {color.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE FOCAL POINT EXPLANATION (ROUNDED-XL) */}
      {activeFocal && (
        <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-jp-blue-900 font-mono text-xs font-bold text-white">
              {artwork.focalPoints.findIndex((f) => f.id === activeFocal.id) + 1}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
              Analisis Titik Fokus
            </span>
          </div>

          <Heading3 className="text-xl text-jp-ink">{activeFocal.title}</Heading3>

          <Paragraph className="text-base leading-relaxed text-jp-gray-700 font-prose">
            {activeFocal.description}
          </Paragraph>
        </div>
      )}

      {/* PERU-CHAN CLOSE LOOKING TIP */}
      <PeruChanCallout
        title="Tips Close Looking dari Peru-Chan"
        subtitle="Membaca karya seni rupa seperti membaca buku bertingkat."
        theme="blue"
        iconType="sparkles"
      >
        <p>
          Mulailah dari pengamatan inderawi pertama (apa objeknya?), lalu amati
          komposisi dan hubungan antar-garis, cermati pilihan warna, dan akhirnya
          hubungkan dengan konteks sejarah saat karya diciptakan.
        </p>
      </PeruChanCallout>
    </div>
  );
}
