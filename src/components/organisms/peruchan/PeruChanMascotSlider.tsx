"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSiteSettings } from "@/lib/siteContext";
import { Badge } from "@/components/atoms/typography/Badge";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PeruChanMascotSliderProps {
  className?: string;
  autoPlayInterval?: number;
}

export function PeruChanMascotSlider({
  className,
  autoPlayInterval = 6000,
}: PeruChanMascotSliderProps) {
  const { settings } = useSiteSettings();
  const slides = settings.mascotSlides.filter((s) => s.isActive);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length, autoPlayInterval]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  const getAccentTheme = (color?: string) => {
    const rawColor = color || "blue";
    const lower = rawColor.toLowerCase();

    if (lower === "lime") {
      return {
        wrapperClass: "border-jp-lime-400/80 bg-linear-to-b from-jp-lime-50/50 via-white to-white",
        glowClass: "from-jp-lime-200/30",
        glowStyle: undefined,
        wrapperStyle: undefined,
        badgeVariant: "lime" as const,
        customBadgeStyle: undefined,
      };
    }

    if (lower === "brown") {
      return {
        wrapperClass: "border-jp-brown-300 bg-linear-to-b from-jp-brown-50/50 via-white to-white",
        glowClass: "from-jp-brown-200/30",
        glowStyle: undefined,
        wrapperStyle: undefined,
        badgeVariant: "brown" as const,
        customBadgeStyle: undefined,
      };
    }

    if (lower === "blue") {
      return {
        wrapperClass: "border-jp-blue-300 bg-linear-to-b from-jp-blue-50/60 via-white to-white",
        glowClass: "from-jp-blue-200/30",
        glowStyle: undefined,
        wrapperStyle: undefined,
        badgeVariant: "blue" as const,
        customBadgeStyle: undefined,
      };
    }

    // Custom Hex or extended color
    const hex = rawColor.startsWith("#") ? rawColor : "#182C4A";
    return {
      wrapperClass: "border",
      wrapperStyle: {
        borderColor: `${hex}45`,
        backgroundImage: `linear-gradient(to bottom, ${hex}15 0%, #ffffff 55%, #ffffff 100%)`,
      },
      glowClass: "",
      glowStyle: {
        backgroundColor: `${hex}25`,
      },
      badgeVariant: "outline" as const,
      customBadgeStyle: {
        backgroundColor: `${hex}15`,
        color: hex,
        borderColor: `${hex}40`,
      },
    };
  };

  const theme = getAccentTheme(currentSlide.accentColor);

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 sm:p-6 md:p-7 shadow-lg transition-all duration-300 font-sans group w-full max-w-md",
        theme.wrapperClass,
        className
      )}
      style={theme.wrapperStyle}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* BACKGROUND ACCENT GLOW (CLEAN OPACITY) */}
      <div
        className={cn(
          "pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full opacity-20 transition-colors duration-500",
          theme.glowClass
        )}
        style={theme.glowStyle}
      />

      {/* TOP HEADER: BADGE & CONTROLS */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-jp-gray-200/80 pb-3">
        <Badge
          variant={theme.badgeVariant}
          size="sm"
          style={theme.customBadgeStyle}
        >
          {currentSlide.subtitle}
        </Badge>

        <div className="flex items-center gap-1 font-mono text-[11px] text-jp-gray-500">
          <span>
            {currentIndex + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Jeda Slideshow" : "Lanjutkan Slideshow"}
            aria-label={isPlaying ? "Jeda Slideshow" : "Lanjutkan Slideshow"}
            className="flex min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px] items-center justify-center rounded text-jp-gray-400 hover:text-jp-ink transition cursor-pointer focus:outline-none"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* CENTER: MASCOT ARTWORK & CHARACTER SHOWCASE */}
      <div
        className="relative z-10 py-4 space-y-4 animate-in fade-in zoom-in-98 duration-300"
        key={currentSlide.id}
      >
        {/* CHARACTER ILLUSTRATION DISPLAY */}
        <div className="flex items-center justify-center py-1">
          {currentSlide.imageUrl ? (
            <div className="relative flex h-44 sm:h-56 w-full items-center justify-center">
              <Image
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                fill
                priority={currentIndex === 0}
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 340px, 380px"
                className="object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </div>
          ) : (
            <div className="flex h-36 w-36 items-center justify-center rounded-2xl border border-jp-blue-200 bg-jp-blue-50 text-jp-blue-900 shadow-inner">
              <Sparkles className="h-12 w-12 text-jp-blue-700" />
            </div>
          )}
        </div>

        {/* CHARACTER TITLE */}
        <div className="text-center space-y-0.5">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-jp-ink tracking-tight">
            {currentSlide.title}
          </h2>
          <div className="text-xs font-semibold text-jp-gray-600 font-sans">
            Maskot Resmi & Sahabat Belajar Seni
          </div>
        </div>

        {/* QUOTE SPEECH (BORDERLESS EDITORIAL) */}
        <div className="relative px-2 sm:px-3 py-1 text-center">
          <p className="font-prose text-xs sm:text-sm text-jp-gray-700 leading-relaxed italic">
            &ldquo;{currentSlide.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* FOOTER NAVIGATION: DOTS & ARROW BUTTONS */}
      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-jp-gray-200/80 font-sans">
        {/* DOT INDICATORS (RESPONSIVE TOUCH TARGETS) */}
        <div className="flex items-center -ml-1 sm:-ml-2" role="tablist" aria-label="Pilihan pose maskot Peru-Chan">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={idx === currentIndex}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Buka slide pose ${idx + 1}: ${slide.title}`}
              className="flex min-h-[44px] min-w-[34px] items-center justify-center p-1 sm:p-2 focus:outline-none cursor-pointer group/dot"
            >
              <span
                className={cn(
                  "h-2 sm:h-2.5 rounded-full transition-all duration-200",
                  idx === currentIndex
                    ? "w-6 sm:w-7 bg-jp-blue-900 shadow-2xs"
                    : "w-2 sm:w-2.5 bg-jp-gray-300 group-hover/dot:bg-jp-gray-400"
                )}
              />
            </button>
          ))}
        </div>

        {/* ARROWS */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Tampilkan pose maskot sebelumnya"
            title="Pose Sebelumnya"
            className="flex min-h-[44px] min-w-[44px] sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-jp-gray-300 bg-white text-jp-gray-700 shadow-2xs hover:border-jp-blue-900 hover:text-jp-blue-900 transition cursor-pointer focus:outline-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Tampilkan pose maskot berikutnya"
            title="Pose Berikutnya"
            className="flex min-h-[44px] min-w-[44px] sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-jp-gray-300 bg-white text-jp-gray-700 shadow-2xs hover:border-jp-blue-900 hover:text-jp-blue-900 transition cursor-pointer focus:outline-none"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
