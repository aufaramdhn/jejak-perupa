import React from "react";
import { TimelineItem, type TimelineItemProps } from "@/components/molecules/exploration/TimelineItem";
import { Heading2, SectionLabel } from "@/components/atoms/typography/Typography";
import { cn } from "@/lib/utils";

export interface TimelineStreamProps {
  events: Omit<TimelineItemProps, "isLast">[];
  title?: string;
  sectionLabel?: string;
  className?: string;
}

export function TimelineStream({
  events,
  title = "Garis Waktu Perjalanan Artistik",
  sectionLabel = "Lini Masa",
  className,
}: TimelineStreamProps) {
  return (
    <section className={cn("space-y-8", className)}>
      <div>
        <SectionLabel>{sectionLabel}</SectionLabel>
        <Heading2 className="mt-2 text-jp-ink">{title}</Heading2>
      </div>

      <div className="mt-6">
        {events.map((event, idx) => (
          <TimelineItem
            key={event.year + "-" + idx}
            {...event}
            isLast={idx === events.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
