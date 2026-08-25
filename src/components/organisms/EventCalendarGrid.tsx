"use client";

import React, { useState } from "react";
import { EventCard, type EventCardProps } from "@/components/molecules/EventCard";
import { Heading2, SectionLabel } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface EventCalendarGridProps {
  events: EventCardProps[];
  title?: string;
  sectionLabel?: string;
  className?: string;
}

export function EventCalendarGrid({
  events,
  title = "Agenda Seni dan Pameran",
  sectionLabel = "Kalender Seni Rupa",
  className,
}: EventCalendarGridProps) {
  const [selectedType, setSelectedType] = useState<string>("Semua");

  const eventTypes = ["Semua", "Pameran", "Workshop", "Diskusi", "Open Call"];

  const filteredEvents =
    selectedType === "Semua"
      ? events
      : events.filter((e) => e.eventType === selectedType);

  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel>{sectionLabel}</SectionLabel>
          <Heading2 className="mt-2 text-jp-ink">{title}</Heading2>
          <p className="mt-2 text-sm text-jp-gray-700 max-w-xl">
            Jadwal pameran retrospeksi, lokakarya studio, diskusi kuratorial, dan ajang seni rupa di berbagai kota.
          </p>
        </div>

        {/* EVENT TYPE TABS */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-jp-gray-300 bg-white p-1.5 shadow-sm">
          {eventTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                selectedType === type
                  ? "bg-jp-blue-900 text-white"
                  : "text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </div>
    </div>
  );
}
