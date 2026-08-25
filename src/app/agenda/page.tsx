"use client";

import React from "react";
import { AgendaTemplate } from "@/components/templates/AgendaTemplate";
import { EventCalendarGrid } from "@/components/organisms/EventCalendarGrid";
import { PeruChanTipBanner } from "@/components/organisms/PeruChanTipBanner";
import { FeatureGuard } from "@/components/atoms/FeatureGuard";
import { FeatureComingSoonTemplate } from "@/components/templates/FeatureComingSoonTemplate";
import { artService } from "@/lib/services/artService";

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
      <AgendaTemplate>
        <div className="space-y-12">
          <EventCalendarGrid events={events} />
          <PeruChanTipBanner tipText="Mengunjungi pameran secara langsung memberikan pengalaman visual yang berbeda: kamu dapat mengamati tekstur material, skala ukuran nyata, dan tata pencahayaan ruang galeri." />
        </div>
      </AgendaTemplate>
    </FeatureGuard>
  );
}
