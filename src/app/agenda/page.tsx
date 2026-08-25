import React from "react";
import { AgendaTemplate } from "@/components/templates/AgendaTemplate";
import { EventCalendarGrid } from "@/components/organisms/EventCalendarGrid";
import { PeruChanTipBanner } from "@/components/organisms/PeruChanTipBanner";
import { artService } from "@/lib/services/artService";

export const metadata = {
  title: "Agenda Seni dan Kalender Pameran : Jejak Perupa",
  description: "Jadwal pameran seni rupa, lokakarya studio, diskusi kuratorial, dan pendaftaran open call di Indonesia.",
};

export default function AgendaPage() {
  const events = artService.getAllEvents();

  return (
    <AgendaTemplate>
      <div className="space-y-12">
        <EventCalendarGrid events={events} />
        <PeruChanTipBanner tipText="Mengunjungi pameran secara langsung memberikan pengalaman visual yang berbeda: kamu dapat mengamati tekstur material, skala ukuran nyata, dan tata pencahayaan ruang galeri." />
      </div>
    </AgendaTemplate>
  );
}
