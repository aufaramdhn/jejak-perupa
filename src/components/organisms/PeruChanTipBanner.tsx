"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PeruChanTipBannerProps {
  tipText: string;
  badgeText?: string;
  imageSrc?: string;
  className?: string;
}

export function PeruChanTipBanner({
  tipText,
  badgeText = "Catatan Santai Peru-Chan",
  imageSrc,
  className,
}: PeruChanTipBannerProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className={cn("mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-16 lg:pb-20", className)}>
      <div className="relative overflow-hidden rounded-xl border border-jp-blue-200 bg-gradient-to-r from-jp-blue-50 via-jp-blue-50/80 to-white p-6 md:p-8 shadow-xs">
        <div className="grid items-center gap-6 sm:grid-cols-[100px_1fr]">
          {/* MASKOT */}
          <div className="flex justify-center">
            {imageSrc && !imageError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt="Peru-Chan"
                className="max-h-24 object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-jp-blue-900 border border-jp-blue-200 shadow-2xs">
                <Sparkles className="h-8 w-8 text-jp-blue-700" />
              </div>
            )}
          </div>

          {/* TIP CONTENT */}
          <div>
            <div className="text-xs font-bold text-jp-blue-900 tracking-wide">
              {badgeText}
            </div>

            <p className="mt-1.5 font-heading text-lg md:text-xl font-normal italic leading-relaxed text-jp-ink">
              &ldquo;{tipText}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
