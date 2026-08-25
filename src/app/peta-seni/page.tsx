import React from "react";
import { SpatialMapTemplate } from "@/components/templates/SpatialMapTemplate";
import { SpatialArtMap } from "@/components/organisms/SpatialArtMap";
import { artService } from "@/lib/services/artService";

export const metadata = {
  title: "Peta Jejak Seni Nusantara : Jejak Perupa",
  description:
    "Eksplorasi geospasial museum, galeri seni rupa, taman patung, dan sanggar komunitas di seluruh Indonesia.",
};

export default function PetaSeniPage() {
  const locations = artService.getAllSpatialLocations();

  return (
    <SpatialMapTemplate>
      <SpatialArtMap locations={locations} />
    </SpatialMapTemplate>
  );
}
