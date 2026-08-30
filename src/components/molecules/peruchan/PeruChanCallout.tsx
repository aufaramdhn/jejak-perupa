"use client";

import React, { useState } from "react";
import { Sparkles, Lightbulb, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PeruChanCalloutProps {
  title?: string;
  subtitle?: string;
  theme?: "blue" | "brown" | "lime";
  iconType?: "sparkles" | "lightbulb" | "book";
  imageSrc?: string;
  children: React.ReactNode;
  className?: string;
}

export function PeruChanCallout({
  title = "Tips dari Peru-Chan",
  subtitle,
  theme = "blue",
  iconType = "sparkles",
  imageSrc = "/images/mascot/peruchan-excited.png",
  children,
  className,
}: PeruChanCalloutProps) {
  const [imageError, setImageError] = useState(false);

  const themeStyles = {
    blue: {
      container: "border border-jp-blue-200 bg-jp-blue-50/60",
      label: "text-jp-blue-900 font-semibold",
      avatarBg: "bg-white text-jp-blue-900 border border-jp-blue-200",
    },
    brown: {
      container: "border border-jp-brown-200 bg-jp-brown-50/60",
      label: "text-jp-brown-900 font-semibold",
      avatarBg: "bg-white text-jp-brown-900 border border-jp-brown-200",
    },
    lime: {
      container: "border border-jp-lime/60 bg-jp-lime-muted/30",
      label: "text-jp-ink font-semibold",
      avatarBg: "bg-white text-jp-ink border border-jp-lime/70",
    },
  };

  const currentTheme = themeStyles[theme];

  const renderIcon = () => {
    switch (iconType) {
      case "lightbulb":
        return <Lightbulb className="h-5 w-5" />;
      case "book":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  return (
    <aside
      className={cn(
        "relative rounded-xl border p-6 transition-all duration-300 shadow-xs",
        currentTheme.container,
        className
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex shrink-0 items-start justify-center pt-0.5">
          {imageSrc && !imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt="Peru-Chan"
              width={128}
              height={128}
              loading="lazy"
              decoding="async"
              className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-xl shadow-2xs",
                currentTheme.avatarBg
              )}
            >
              {renderIcon()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className={cn("text-xs font-bold tracking-wide", currentTheme.label)}>
            {title}
          </div>

          {subtitle && (
            <h3 className="mt-1 font-heading text-lg font-bold text-jp-ink">
              {subtitle}
            </h3>
          )}

          <div className="mt-2 max-w-2xl text-sm md:text-base leading-relaxed text-jp-gray-700 space-y-2.5 font-prose">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
