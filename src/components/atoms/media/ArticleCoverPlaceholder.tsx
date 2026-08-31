"use client";

import React from "react";
import { BookOpen, Palette, Feather, Landmark, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArticleCoverPlaceholderProps {
  title?: string;
  category?: string;
  colorHex?: string;
  size?: "compact" | "card" | "banner";
  className?: string;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "teori seni": BookOpen,
  "teknik seni": Palette,
  "sejarah seni": Landmark,
  "pendidikan seni": Feather,
  "profil seniman": Palette,
};

const CATEGORY_PALETTES: Record<string, string> = {
  "teori seni": "#173B63",
  "teknik seni": "#2E5A88",
  "sejarah seni": "#3D2A20",
  "pendidikan seni": "#3A5A40",
  "profil seniman": "#5C3D2E",
  default: "#182C4A",
};

export function ArticleCoverPlaceholder({
  title,
  category = "Wacana Seni",
  colorHex,
  size = "compact",
  className,
}: ArticleCoverPlaceholderProps) {
  const catKey = (category || "").toLowerCase().trim();
  const Icon = CATEGORY_ICONS[catKey] || BookOpen;
  const baseBgColor = colorHex || CATEGORY_PALETTES[catKey] || CATEGORY_PALETTES.default;

  if (size === "compact") {
    return (
      <div
        className={cn(
          "relative h-full w-full flex flex-col items-center justify-between p-2.5 overflow-hidden select-none text-white",
          className
        )}
        style={{ backgroundColor: baseBgColor }}
      >
        {/* SUBTLE TEXTURED PATTERN OVERLAY */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "8px 8px",
          }}
        />

        {/* RADIAL LIGHTING */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/30 pointer-events-none" />

        {/* TOP BRAND MONOGRAM */}
        <div className="relative z-10 w-full flex items-center justify-between">
          <span className="text-[8px] font-mono font-bold tracking-widest text-white/70 uppercase">
            JP
          </span>
          <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </div>

        {/* CENTER ICON & EMBLEM */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-xs border border-white/20 shadow-2xs">
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* BOTTOM CATEGORY LABEL */}
        <div className="relative z-10 w-full text-center">
          <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-white/90 truncate block px-1">
            {category}
          </span>
        </div>
      </div>
    );
  }

  // CARD / BANNER SIZES (FOR PUBLIC CATALOG OR PREVIEWS)
  return (
    <div
      className={cn(
        "relative h-full w-full flex flex-col items-center justify-between p-6 sm:p-8 overflow-hidden select-none text-white",
        className
      )}
      style={{ backgroundColor: baseBgColor }}
    >
      {/* SUBTLE GEOMETRIC GRID */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* RADIAL LIGHTING */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 pointer-events-none" />

      {/* TOP HEADER BRANDING */}
      <div className="relative z-10 w-full flex items-center justify-between border-b border-white/15 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-bold tracking-widest text-white/80 uppercase">
            Jejak Perupa : Arsip Kuratorial
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-white/70 uppercase">
          {category}
        </span>
      </div>

      {/* CENTER MOTIF */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md py-4 space-y-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-xs border border-white/25 shadow-sm">
          <Icon className="h-6 w-6 text-white" />
        </div>
        {title && (
          <div className="font-heading font-bold text-white text-base sm:text-lg line-clamp-2 leading-snug drop-shadow-xs">
            {title}
          </div>
        )}
      </div>

      {/* BOTTOM FOOTER */}
      <div className="relative z-10 w-full flex items-center justify-between text-[9px] font-mono text-white/60 pt-2 border-t border-white/15">
        <span>Naskah Seni Rupa</span>
        <span>Edisi Digital</span>
      </div>
    </div>
  );
}
