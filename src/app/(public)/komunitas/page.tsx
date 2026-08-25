import React from "react";
import { Metadata } from "next";
import { FeatureGuard } from "@/components/atoms/meta/FeatureGuard";
import { FeatureComingSoonTemplate } from "@/components/templates/features/FeatureComingSoonTemplate";
import { CommunitySection } from "@/components/organisms/exploration/CommunitySection";
import { artService } from "@/lib/services/artService";

export const metadata: Metadata = {
  title: "Direktori Komunitas Seni Rupa : Jejak Perupa",
  description:
    "Jejaring kolektif seni rupa, sanggar daerah, ruang seni alternatif, dan perkumpulan pegiat visual di Indonesia.",
};

export default function KomunitasPage() {
  const communities = artService.getAllCommunities();

  return (
    <FeatureGuard
      flag="direktori_komunitas"
      fallback={
        <FeatureComingSoonTemplate
          featureName="Direktori Komunitas Seni"
          phaseLabel="FASE 3 : KOMUNITAS"
          description="Basis data jejaring kolektif seni rupa, sanggar daerah, dan ruang seni alternatif nusantara sedang dikurasi dan dihimpun."
          expectedRelease="Pembaruan Versi 1.2.0"
        />
      }
    >
      <CommunitySection communities={communities} />
    </FeatureGuard>
  );
}
