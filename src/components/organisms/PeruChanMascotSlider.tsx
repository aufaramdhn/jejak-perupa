"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSiteSettings } from "@/lib/siteContext";
import { Badge } from "@/components/atoms/Badge";
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

  const getAccentTheme = (color: "blue" | "brown" | "lime") => {
    switch (color) {
      case "lime":
        return {
          wrapper: "border-jp-lime-400/80 bg-linear-to-b from-jp-lime-50/50 via-white to-white",
          glow: "from-jp-lime-200/30",
          badgeVariant: "lime" as const,
          quoteBorder: "border-jp-lime-500",
        };
      case "brown":
        return {
          wrapper: "border-jp-brown-300 bg-linear-to-b from-jp-brown-50/50 via-white to-white",
          glow: "from-jp-brown-200/30",
          badgeVariant: "brown" as const,
          quoteBorder: "border-jp-brown-600",
        };
      case "blue":
      default:
        return {
          wrapper: "border-jp-blue-300 bg-linear-to-b from-jp-blue-50/60 via-white to-white",
          glow: "from-jp-blue-200/30",
          badgeVariant: "blue" as const,
          quoteBorder: "border-jp-blue-700",
        };
    }
  };

  const theme = getAccentTheme(currentSlide.accentColor);

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 md:p-7 shadow-lg transition-all duration-300 font-sans group",
        theme.wrapper,
        className
      )}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* BACKGROUND ACCENT GLOW */}
      <div
        className={cn(
          "pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-radial to-transparent blur-2xl transition-colors duration-500",
          theme.glow
        )}
      />

      {/* TOP HEADER: BADGE & CONTROLS */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-jp-gray-200/80 pb-3">
        <Badge variant={theme.badgeVariant} size="sm">
          {currentSlide.subtitle}
        </Badge>

        <div className="flex items-center gap-2 font-mono text-[11px] text-jp-gray-500">
          <span>
            {currentIndex + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Jeda Slideshow" : "Lanjutkan Slideshow"}
            className="flex h-5 w-5 items-center justify-center rounded text-jp-gray-400 hover:text-jp-ink transition cursor-pointer"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
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
            <div className="relative flex h-48 sm:h-56 w-full items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-102"
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
          <h3 className="font-heading text-xl md:text-2xl font-bold text-jp-ink tracking-tight">
            {currentSlide.title}
          </h3>
          <div className="text-xs font-semibold text-jp-gray-500 uppercase tracking-wider">
            Maskot Resmi & Sahabat Belajar Seni
          </div>
        </div>

        {/* QUOTE SPEECH CARD */}
        <div
          className={cn(
            "relative rounded-xl border border-jp-gray-200 bg-white/90 p-4 shadow-xs backdrop-blur-xs",
            "border-l-4",
            theme.quoteBorder
          )}
        >
          <Quote className="absolute right-3 bottom-3 h-6 w-6 text-jp-gray-200 pointer-events-none" />
          <p className="font-prose text-xs md:text-sm text-jp-gray-700 leading-relaxed italic relative z-10">
            &ldquo;{currentSlide.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* FOOTER NAVIGATION: DOTS & ARROW BUTTONS */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-jp-gray-200/80 font-sans">
        {/* DOT INDICATORS */}
        <div className="flex items-center gap-1.5">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Buka slide ${idx + 1}: ${slide.title}`}
              className={cn(
                "h-2 rounded-full transition-all duration-200 cursor-pointer",
                idx === currentIndex
                  ? "w-6 bg-jp-blue-900"
                  : "w-2 bg-jp-gray-300 hover:bg-jp-gray-400"
              )}
            />
          ))}
        </div>

        {/* ARROWS */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Pose sebelumnya"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-300 bg-white text-jp-gray-700 shadow-2xs hover:border-jp-blue-900 hover:text-jp-blue-900 transition cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Pose berikutnya"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-300 bg-white text-jp-gray-700 shadow-2xs hover:border-jp-blue-900 hover:text-jp-blue-900 transition cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
