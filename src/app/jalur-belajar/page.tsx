import React from "react";
import { Metadata } from "next";
import { FeatureGuard } from "@/components/atoms/FeatureGuard";
import { FeatureComingSoonTemplate } from "@/components/templates/FeatureComingSoonTemplate";
import { LearningPathSection } from "@/components/organisms/LearningPathSection";
import { artService } from "@/lib/services/artService";

export const metadata: Metadata = {
  title: "Jalur Belajar Seni Rupa : Jejak Perupa",
  description:
    "Kurikulum terstruktur belajar seni rupa Indonesia mandiri dari fondasi bahasa rupa, teori studio, hingga kritik seni rupa tingkat lanjut.",
};

export default function JalurBelajarCatalogPage() {
  const learningPaths = artService.getAllLearningPaths();

  return (
    <FeatureGuard
      flag="progress_belajar"
      fallback={
        <FeatureComingSoonTemplate
          featureName="Jalur Belajar Mandiri"
          phaseLabel="FASE 3 : EDUKASI"
          description="Silabus kurikulum bertingkat dari fondasi bahasa rupa, teori studio, hingga kritik seni rupa tingkat lanjut sedang disusun bersama modul evaluasi mandiri."
          expectedRelease="Pembaruan Versi 1.2.0"
        />
      }
    >
      <LearningPathSection learningPaths={learningPaths} />
    </FeatureGuard>
  );
}
