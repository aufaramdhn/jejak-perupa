"use client";

import React from "react";
import { BookOpen, Palette, Feather, Landmark, Sparkles, Compass, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArticleCoverPlaceholderProps {
  title?: string;
  category?: string;
  colorHex?: string;
  size?: "compact" | "card" | "banner";
  className?: string;
}

interface CategoryTheme {
  icon: React.ElementType;
  gradientClass: string;
  accentClass: string;
  motifColor: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  "teori seni": {
    icon: BookOpen,
    gradientClass: "from-[#162d4a] via-[#1e3e66] to-[#102238]",
    accentClass: "bg-blue-400/20 text-blue-200 border-blue-300/30",
    motifColor: "#3b82f6",
  },
  "wacana seni": {
    icon: BookOpen,
    gradientClass: "from-[#162d4a] via-[#1e3e66] to-[#102238]",
    accentClass: "bg-blue-400/20 text-blue-200 border-blue-300/30",
    motifColor: "#3b82f6",
  },
  "sejarah seni": {
    icon: Landmark,
    gradientClass: "from-[#3e271c] via-[#5c3a29] to-[#261710]",
    accentClass: "bg-amber-400/20 text-amber-200 border-amber-300/30",
    motifColor: "#f59e0b",
  },
  "pendidikan seni": {
    icon: Feather,
    gradientClass: "from-[#223d30] via-[#325744] to-[#15271e]",
    accentClass: "bg-emerald-400/20 text-emerald-200 border-emerald-300/30",
    motifColor: "#10b981",
  },
  "teknik seni": {
    icon: Palette,
    gradientClass: "from-[#6b3524] via-[#8c4630] to-[#452014]",
    accentClass: "bg-orange-400/20 text-orange-200 border-orange-300/30",
    motifColor: "#f97316",
  },
  "teknik & eksplorasi": {
    icon: Palette,
    gradientClass: "from-[#6b3524] via-[#8c4630] to-[#452014]",
    accentClass: "bg-orange-400/20 text-orange-200 border-orange-300/30",
    motifColor: "#f97316",
  },
  "profil seniman": {
    icon: Compass,
    gradientClass: "from-[#4a2e1e] via-[#6e442c] to-[#2e1b11]",
    accentClass: "bg-yellow-400/20 text-yellow-200 border-yellow-300/30",
    motifColor: "#eab308",
  },
};

const DEFAULT_THEME: CategoryTheme = {
  icon: Layers,
  gradientClass: "from-[#142338] via-[#1d3352] to-[#0c1624]",
  accentClass: "bg-white/15 text-white/90 border-white/25",
  motifColor: "#60a5fa",
};

export function ArticleCoverPlaceholder({
  title,
  category = "Wacana Seni",
  colorHex,
  size = "card",
  className,
}: ArticleCoverPlaceholderProps) {
  const catKey = (category || "").toLowerCase().trim();
  const theme = CATEGORY_THEMES[catKey] || DEFAULT_THEME;
  const Icon = theme.icon;

  // 1. COMPACT SIZE (THUMBNAILS IN LISTS / SIDEBARS)
  if (size === "compact") {
    return (
      <div
        className={cn(
          "relative h-full w-full flex flex-col items-center justify-center p-2 overflow-hidden select-none bg-gradient-to-br text-white",
          theme.gradientClass,
          className
        )}
        style={colorHex ? { backgroundColor: colorHex } : undefined}
      >
        {/* SUBTLE ORGANIC ART CONTOUR (SVG) */}
        <svg
          className="absolute inset-0 h-full w-full opacity-20 pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,30 Q30,60 60,30 T100,50 L100,100 L0,100 Z"
            fill="white"
            fillOpacity="0.15"
          />
          <path
            d="M0,60 Q40,20 80,60 T100,80 L100,100 L0,100 Z"
            fill="white"
            fillOpacity="0.1"
          />
        </svg>

        {/* CENTER ICON BADGE */}
        <div
          className={cn(
            "relative z-10 flex h-7 w-7 items-center justify-center rounded-lg border backdrop-blur-xs shadow-2xs",
            theme.accentClass
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>
    );
  }

  // 2. BANNER SIZE (EXPANSIVE HERO BANNER ON TOP OF ARTICLE DETAILS)
  if (size === "banner") {
    return (
      <div
        className={cn(
          "relative h-full w-full flex flex-col items-center justify-between p-8 sm:p-12 overflow-hidden select-none bg-gradient-to-br text-white",
          theme.gradientClass,
          className
        )}
        style={colorHex ? { backgroundColor: colorHex } : undefined}
      >
        {/* ARTISTIC CONTOUR WAVES (SVG) */}
        <svg
          className="absolute inset-0 h-full w-full opacity-25 pointer-events-none"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="bannerGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="white" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path
            d="M0,120 C180,60 320,240 500,140 C680,40 740,180 800,120 L800,400 L0,400 Z"
            fill="url(#bannerGrad1)"
          />
          <path
            d="M0,220 C240,160 400,320 620,220 C720,170 780,260 800,240 L800,400 L0,400 Z"
            fill="white"
            fillOpacity="0.08"
          />
        </svg>

        {/* SUBTLE GRAIN / RADIAL GLOW */}
        <div className="absolute inset-0 bg-radial from-white/15 via-transparent to-black/40 pointer-events-none" />

        {/* TOP BRANDING BAR */}
        <div className="relative z-10 w-full flex items-center justify-between font-mono text-xs">
          <span className="font-bold tracking-widest text-white/70 uppercase">
            Jejak Perupa : Arsip Kuratorial
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-[11px] font-bold uppercase tracking-wider">
            {category}
          </span>
        </div>

        {/* CENTER ICON MEDALLION */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl border backdrop-blur-md shadow-lg",
              theme.accentClass
            )}
          >
            <Icon className="h-8 w-8" />
          </div>
        </div>

        {/* BOTTOM METRIC */}
        <div className="relative z-10 w-full flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/10 pt-3">
          <span>Kajian Seni Rupa Nusantara</span>
          <span>Edisi Digital Terkurasi</span>
        </div>
      </div>
    );
  }

  // 3. CARD SIZE (DEFAULT: 16:10 ASPECT RATIO FOR PUBLIC CATALOG AND RELATED CARDS)
  return (
    <div
      className={cn(
        "relative h-full w-full flex flex-col items-center justify-between p-5 overflow-hidden select-none bg-gradient-to-br text-white transition-transform duration-500 group-hover:scale-[1.02]",
        theme.gradientClass,
        className
      )}
      style={colorHex ? { backgroundColor: colorHex } : undefined}
    >
      {/* ARTISTIC CONTOUR LINES (SVG) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30 pointer-events-none"
        viewBox="0 0 400 250"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.25" />
            <stop offset="100%" stopColor="white" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path
          d="M0,80 Q100,160 200,90 T400,110 L400,250 L0,250 Z"
          fill="url(#cardGrad1)"
        />
        <path
          d="M0,150 Q120,80 260,160 T400,180 L400,250 L0,250 Z"
          fill="white"
          fillOpacity="0.08"
        />
        {/* FINE CURVED CONTOUR HAIRLINES */}
        <path
          d="M-20,40 Q150,180 420,50"
          fill="none"
          stroke="white"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <path
          d="M-20,90 Q180,220 420,110"
          fill="none"
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
      </svg>

      {/* RADIAL LIGHT ACCENT */}
      <div className="absolute inset-0 bg-radial from-white/15 via-transparent to-black/30 pointer-events-none" />

      {/* TOP BRAND MONOGRAM & CATEGORY INITIAL */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-mono font-bold tracking-widest text-white/60 uppercase">
            JP
          </span>
          <span className="text-[9px] font-mono text-white/40">/</span>
          <span className="text-[9px] font-mono text-white/60 tracking-wider">
            ARSIP
          </span>
        </div>

        <div className="h-1.5 w-1.5 rounded-full bg-white/40 shadow-xs" />
      </div>

      {/* CENTER FLOATING MEDALLION EMBLEM */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-2">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-md shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
            theme.accentClass
          )}
        >
          <Icon className="h-5 w-5 drop-shadow-xs" />
        </div>
      </div>

      {/* BOTTOM ART GENRE TAG */}
      <div className="relative z-10 w-full flex items-center justify-between text-[9px] font-mono text-white/50 pt-1.5 border-t border-white/10">
        <span className="uppercase tracking-wider truncate font-semibold">
          {category}
        </span>
        <span className="text-white/40">Kajian Seni</span>
      </div>
    </div>
  );
}
