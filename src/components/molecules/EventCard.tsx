import React from "react";
import Link from "next/link";
import { Calendar, MapPin, Building, ExternalLink } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface EventCardProps {
  title: string;
  eventType: "Pameran" | "Workshop" | "Diskusi" | "Open Call";
  organizer: string;
  startDate: string;
  endDate: string;
  venueName: string;
  city: string;
  description: string;
  registrationUrl?: string;
  className?: string;
}

export function EventCard({
  title,
  eventType,
  organizer,
  startDate,
  endDate,
  venueName,
  city,
  description,
  registrationUrl,
  className,
}: EventCardProps) {
  const eventBadgeVariant = {
    Pameran: "lime" as const,
    Workshop: "blue" as const,
    Diskusi: "brown" as const,
    "Open Call": "gray" as const,
  }[eventType];

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs transition-all duration-300 hover:border-jp-blue-700 hover:shadow-jp-hover font-sans",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <Badge variant={eventBadgeVariant}>{eventType}</Badge>
          <div className="flex items-center gap-1.5 text-xs text-jp-gray-500 font-medium font-mono">
            <Calendar className="h-3.5 w-3.5 text-jp-blue-700" />
            <span>{startDate} - {endDate}</span>
          </div>
        </div>

        <Heading3 className="mt-3.5 text-xl text-jp-ink">{title}</Heading3>

        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-jp-brown-900">
          <Building className="h-3.5 w-3.5 text-jp-brown-700" />
          <span>Penyelenggara: {organizer}</span>
        </div>

        <Paragraph className="mt-3 text-sm text-jp-gray-700 leading-relaxed font-prose">
          {description}
        </Paragraph>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-jp-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-jp-gray-500">
          <MapPin className="h-3.5 w-3.5 text-jp-blue-700 shrink-0" />
          <span>{venueName}, {city}</span>
        </div>

        {registrationUrl && (
          <Link href={registrationUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="rounded-lg">
              Info Acara
              <ExternalLink className="h-3.5 w-3.5 ml-1" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
