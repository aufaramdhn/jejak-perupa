import React from "react";
import { CatalogGridTemplate } from "@/components/templates/public/CatalogGridTemplate";
import { LearningPathCard } from "@/components/molecules/exploration/LearningPathCard";
import { PeruChanTipBanner } from "@/components/organisms/peruchan/PeruChanTipBanner";
import { LearningPathData } from "@/lib/data/learningPaths";

export interface LearningPathSectionProps {
  learningPaths: LearningPathData[];
}

export function LearningPathSection({ learningPaths }: LearningPathSectionProps) {
  return (
    <CatalogGridTemplate
      badgeText="Kurikulum Terstruktur"
      title="Jalur Belajar Seni Rupa"
      subtitle="Panduan langkah demi langkah yang dirancang untuk membimbing proses belajarmu dari fondasi teori dasar hingga analisis seni tingkat lanjut."
    >
      <div className="space-y-12 font-sans">
        {/* GRID OF LEARNING PATH CARDS */}
        <div className="grid gap-6 sm:grid-cols-2">
          {learningPaths.map((path) => (
            <LearningPathCard key={path.slug} path={path} />
          ))}
        </div>

        {/* BOTTOM MOTIVATIONAL BANNER */}
        <PeruChanTipBanner tipText="Belajar seni bukan tentang seberapa cepat kamu menyelesaikan modul, melainkan seberapa dalam kamu merenungi dan mempraktikkan setiap gagasan." />
      </div>
    </CatalogGridTemplate>
  );
}
