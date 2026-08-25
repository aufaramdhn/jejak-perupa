import React from "react";
import { AgendaTemplate } from "@/components/templates/features/AgendaTemplate";
import { EventCalendarGrid } from "@/components/organisms/exploration/EventCalendarGrid";
import { PeruChanTipBanner } from "@/components/organisms/peruchan/PeruChanTipBanner";
import { AgendaEventData } from "@/lib/data/agenda";

export interface AgendaSectionProps {
  events: AgendaEventData[];
}

export function AgendaSection({ events }: AgendaSectionProps) {
  return (
    <AgendaTemplate>
      <div className="space-y-12 font-sans">
        <EventCalendarGrid events={events} />
        <PeruChanTipBanner tipText="Mengunjungi pameran secara langsung memberikan pengalaman visual yang berbeda: kamu dapat mengamati tekstur material, skala ukuran nyata, dan tata pencahayaan ruang galeri." />
      </div>
    </AgendaTemplate>
  );
}
