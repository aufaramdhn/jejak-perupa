import React from "react";
import { Metadata } from "next";
import { SpatialMapTemplate } from "@/components/templates/SpatialMapTemplate";
import { SpatialArtMap } from "@/components/organisms/SpatialArtMap";
import { FeatureGuard } from "@/components/atoms/FeatureGuard";
import { FeatureComingSoonTemplate } from "@/components/templates/FeatureComingSoonTemplate";
import { artService } from "@/lib/services/artService";

export const metadata: Metadata = {
  title: "Peta Geospasial Seni Nusantara : Jejak Perupa",
  description:
    "Eksplorasi titik sebaran museum seni, galeri independen, monumen bersejarah, dan ruang pameran seni rupa di seluruh Indonesia.",
};

export default function PetaSeniPage() {
  const locations = artService.getAllSpatialLocations();

  return (
    <FeatureGuard
      flag="jejak_seni_daerah"
      fallback={
        <FeatureComingSoonTemplate
          featureName="Peta Geospasial Seni Nusantara"
          phaseLabel="FASE 4 : EKSPLORASI"
          description="Peta interaktif sebaran museum seni, galeri independen, monumen patung bersejarah, dan sanggar se-Indonesia sedang dalam tahap pemetaan titik koordinat digital."
          expectedRelease="Pembaruan Versi 2.0.0"
        />
      }
    >
      <SpatialMapTemplate>
        <SpatialArtMap locations={locations} />
      </SpatialMapTemplate>
    </FeatureGuard>
  );
}
