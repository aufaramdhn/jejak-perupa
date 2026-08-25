import React from "react";
import { Metadata } from "next";
import { FeatureGuard } from "@/components/atoms/FeatureGuard";
import { FeatureComingSoonTemplate } from "@/components/templates/FeatureComingSoonTemplate";
import { AgendaSection } from "@/components/organisms/AgendaSection";
import { artService } from "@/lib/services/artService";

export const metadata: Metadata = {
  title: "Agenda & Pameran Seni Rupa : Jejak Perupa",
  description:
    "Kalender kurasi pameran seni rupa, lokakarya, diskusi kuratorial, dan agenda seni terkini di berbagai kota di Indonesia.",
};

export default function AgendaPage() {
  const events = artService.getAllEvents();

  return (
    <FeatureGuard
      flag="agenda_seni"
      fallback={
        <FeatureComingSoonTemplate
          featureName="Agenda & Pameran Seni"
          phaseLabel="FASE 3 : MEDIA SENI"
          description="Kalender jadwal pameran seni rupa, lokakarya studio, diskusi kuratorial, dan pendaftaran open call se-Indonesia sedang dalam tahap kurasi dan verifikasi tanggal."
          expectedRelease="Pembaruan Versi 1.2.0"
        />
      }
    >
      <AgendaSection events={events} />
    </FeatureGuard>
  );
}
