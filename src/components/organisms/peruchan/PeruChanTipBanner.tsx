"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useSiteSettings } from "@/lib/siteContext";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PeruChanTipBannerProps {
  tipText?: string;
  badgeText?: string;
  imageSrc?: string;
  className?: string;
  autoPlayInterval?: number;
}

export function PeruChanTipBanner({
  tipText: initialTipText,
  badgeText: initialBadgeText,
  imageSrc: initialImageSrc,
  className,
  autoPlayInterval = 7500,
}: PeruChanTipBannerProps) {
  const { settings } = useSiteSettings();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Active quotes from site settings
  const activeQuotes = useMemo(() => {
    if (settings.quotes && settings.quotes.length > 0) {
      const filtered = settings.quotes.filter((q) => q.isActive);
      if (filtered.length > 0) return filtered;
    }

    // Fallback if settings not yet loaded or empty
    return [
      {
        id: "fallback-1",
        categoryBadge: initialBadgeText || "Catatan Santai Peru-Chan",
        quoteText:
          initialTipText ||
          "Jangan takut kalau karya pertamamu belum terlihat bagus. Dalam seni rupa, proses pencarian bentuk adalah bagian tak terpisahkan dari karya itu sendiri.",
        authorNote: "Peru-Chan",
        imageSrc: initialImageSrc || "/images/mascot/peruchan-drawing.png",
        accentColor: "blue" as const,
        isActive: true,
        order: 1,
      },
    ];
  }, [settings.quotes, initialTipText, initialBadgeText, initialImageSrc]);

  // Ensure currentIndex is in bounds
  const validIndex = currentIndex >= activeQuotes.length ? 0 : currentIndex;
  const currentQuote = activeQuotes[validIndex];

  const changeSlide = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setImageError(false);
    setTimeout(() => {
      setIsAnimating(false);
    }, 250);
  };

  const handleNext = () => {
    const nextIdx = (validIndex + 1) % activeQuotes.length;
    changeSlide(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (validIndex - 1 + activeQuotes.length) % activeQuotes.length;
    changeSlide(prevIdx);
  };

  // Auto-play timer
  useEffect(() => {
    if (activeQuotes.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      const nextIdx = (validIndex + 1) % activeQuotes.length;
      setCurrentIndex(nextIdx);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [activeQuotes.length, isPaused, autoPlayInterval, validIndex]);

  return (
    <section
      className={cn(
        "mx-auto max-w-5xl px-4 sm:px-8 lg:px-12 pb-16 lg:pb-20 font-sans",
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-xl border border-jp-blue-200 bg-gradient-to-r from-jp-blue-50/90 via-jp-blue-50/70 to-white p-4 sm:p-6 md:p-8 shadow-xs transition-all duration-300 hover:border-jp-blue-300 hover:shadow-sm">
        {/* TOP ACCENT LINE */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-jp-blue-900 via-jp-blue-600 to-jp-lime-600" />

        <div className="flex items-center gap-2 sm:gap-6">
          {/* PREVIOUS BUTTON ON LEFT FLANK */}
          {activeQuotes.length > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Kutipan Sebelumnya"
              title="Kutipan Sebelumnya"
              className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border border-jp-blue-200 bg-white/90 text-jp-blue-900 shadow-2xs hover:bg-jp-blue-50 transition cursor-pointer focus:outline-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* CENTER CONTENT: MASCOT + QUOTE */}
          <div className="flex-1 min-w-0 grid items-center gap-4 sm:gap-6 sm:grid-cols-[90px_1fr]">
            {/* MASCOT IMAGE */}
            <div className="flex justify-center items-center shrink-0">
              {currentQuote.imageSrc && !imageError ? (
                <div className="relative h-20 sm:h-24 w-20 sm:w-24">
                  <Image
                    src={currentQuote.imageSrc}
                    alt="Peru-Chan"
                    fill
                    sizes="(max-width: 640px) 80px, 96px"
                    className={cn(
                      "object-contain transition-all duration-300 transform",
                      isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
                    )}
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-white text-jp-blue-900 border border-jp-blue-200 shadow-2xs">
                  <Sparkles className="h-7 w-7 text-jp-blue-700" />
                </div>
              )}
            </div>

            {/* QUOTE TEXT & CATEGORY */}
            <div className="space-y-2 text-center sm:text-left min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 border-b border-jp-blue-100 pb-1.5">
                <span className="text-xs font-bold text-jp-blue-900 tracking-wide font-mono">
                  {currentQuote.categoryBadge || "Catatan Santai Peru-Chan"}
                </span>
                {activeQuotes.length > 1 && (
                  <span className="font-mono text-[10px] text-jp-gray-500 bg-white px-1.5 py-0.5 rounded border border-jp-blue-200">
                    {validIndex + 1}/{activeQuotes.length}
                  </span>
                )}
              </div>

              <p
                className={cn(
                  "font-heading text-sm sm:text-base md:text-lg font-normal italic leading-relaxed text-jp-ink transition-opacity duration-250",
                  isAnimating ? "opacity-30" : "opacity-100"
                )}
              >
                &ldquo;{currentQuote.quoteText}&rdquo;
              </p>
            </div>
          </div>

          {/* NEXT BUTTON ON RIGHT FLANK */}
          {activeQuotes.length > 1 && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Kutipan Selanjutnya"
              title="Kutipan Selanjutnya"
              className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg border border-jp-blue-200 bg-white/90 text-jp-blue-900 shadow-2xs hover:bg-jp-blue-50 transition cursor-pointer focus:outline-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
