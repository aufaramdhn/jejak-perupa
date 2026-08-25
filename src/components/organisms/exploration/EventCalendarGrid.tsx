"use client";

import React, { useState, useTransition } from "react";
import { EventCard, type EventCardProps } from "@/components/molecules/exploration/EventCard";
import { EventCardSkeleton } from "@/components/molecules/exploration/EventCardSkeleton";
import { Heading2, SectionLabel } from "@/components/atoms/typography/Typography";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const eventTypes = ["Semua", "Pameran", "Workshop", "Diskusi", "Open Call"];

  const handleTypeChange = (type: string) => {
    startTransition(() => {
      setSelectedType(type);
    });
  };

  const filteredEvents =
    selectedType === "Semua"
      ? events
      : events.filter((e) => e.eventType === selectedType);

  return (
    <div className={cn("space-y-8 font-sans", className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel>{sectionLabel}</SectionLabel>
          <Heading2 className="mt-2 text-jp-ink">{title}</Heading2>
          <p className="mt-2 text-sm text-jp-gray-700 max-w-xl font-prose">
            Jadwal pameran retrospeksi, lokakarya studio, diskusi kuratorial, dan ajang seni rupa di berbagai kota.
          </p>
        </div>

        {/* EVENT TYPE TABS */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-jp-gray-300 bg-white p-1.5 shadow-2xs">
          {eventTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                selectedType === type
                  ? "bg-jp-blue-900 text-white shadow-2xs"
                  : "text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* EVENT GRID WITH IN-SITU SKELETON */}
      {(isLoading || isPending) ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <EventCardSkeleton key={idx} />
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-12 text-center text-jp-gray-500">
          Tidak ada agenda acara seni untuk kategori ini.
        </div>
      )}
    </div>
  );
}
