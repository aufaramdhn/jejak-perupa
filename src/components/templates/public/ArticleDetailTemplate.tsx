import React from "react";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { cn } from "@/lib/utils";

export interface ArticleDetailTemplateProps {
  header: React.ReactNode;
  content: React.ReactNode;
  sidebar: React.ReactNode;
  headerBgImageUrl?: string;
  headerBgColor?: string;
  headerGradientOpacity?: number; // 0 - 100 (percentage)
  headerGradientHeight?: number; // 40 - 100 (percentage)
  className?: string;
}

export function ArticleDetailTemplate({
  header,
  content,
  sidebar,
  headerBgImageUrl,
  headerBgColor,
  headerGradientOpacity = 85,
  headerGradientHeight = 80,
  className,
}: ArticleDetailTemplateProps) {
  const opacityFraction = Math.max(0, Math.min(100, headerGradientOpacity)) / 100;
  const heightPercent = Math.max(30, Math.min(100, headerGradientHeight));

  return (
    <MainPublicLayout>
      {/* HEADER SECTION WITH DYNAMIC BACKDROP & EDITORIAL PAPER-BLUE GRADIENT */}
      <section
        className="relative border-b border-jp-gray-300 overflow-hidden py-14 lg:py-20"
        style={{ backgroundColor: headerBgColor || "#FAFAF7" }}
      >
        {/* BACKDROP IMAGE (IF PROVIDED) */}
        {headerBgImageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
            style={{ backgroundImage: `url(${headerBgImageUrl})` }}
          />
        )}

        {/* COLOR TINT ON TOP OF IMAGE */}
        {headerBgImageUrl && headerBgColor && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300 mix-blend-multiply opacity-60"
            style={{ backgroundColor: headerBgColor }}
          />
        )}

        {/* SIGNATURE EDITORIAL PAPER & SOFT GRADIENT OVERLAY */}
        {headerBgImageUrl || headerBgColor ? (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={{
              background: `linear-gradient(to top, #FAFAF7 0%, rgba(250, 250, 247, ${opacityFraction}) ${heightPercent}%, transparent 100%)`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-jp-blue-50/70 via-jp-paper to-white pointer-events-none" />
        )}

        {/* RELATIVE CONTENT CONTAINER FOR HEADER */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {header}
        </div>
      </section>

      {/* CONTENT & SIDEBAR SECTION (CONFINED TO COMFORTABLE 65-75 CHARACTERS PER LINE) */}
      <section className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16", className)}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          {/* MAIN PROSE - LOCKED TO ERGONOMIC READING WIDTH */}
          <article className="min-w-0 max-w-3xl lg:max-w-[720px] font-prose text-lg leading-[1.8] text-jp-gray-700">
            {content}
          </article>

          {/* STICKY SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-28 font-sans">{sidebar}</aside>
        </div>
      </section>
    </MainPublicLayout>
  );
}
