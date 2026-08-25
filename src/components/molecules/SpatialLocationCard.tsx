import React from "react";
import { MapPin, Globe, Navigation, Users } from "lucide-react";
import { Badge } from "@/components/atoms/Badge";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import type { SpatialLocation } from "@/lib/data/spatialArt";
import { cn } from "@/lib/utils";

export interface SpatialLocationCardProps {
  location: SpatialLocation;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function SpatialLocationCard({
  location,
  isSelected = false,
  onSelect,
  className,
}: SpatialLocationCardProps) {
  const categoryVariant = {
    Museum: "lime" as const,
    "Galeri Seni": "blue" as const,
    "Monumen & Situs": "brown" as const,
    "Sanggar & Kolektif": "gray" as const,
  }[location.category];

  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex flex-col justify-between rounded-xl border bg-white p-5 shadow-2xs transition-all duration-200 cursor-pointer font-sans",
        isSelected
          ? "border-jp-blue-900 ring-2 ring-jp-blue-100 shadow-sm"
          : "border-jp-gray-300 hover:border-jp-blue-700 hover:shadow-jp-hover",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <Badge variant={categoryVariant}>{location.category}</Badge>
          <div className="flex items-center gap-1 font-mono text-[11px] text-jp-gray-500 font-medium">
            <MapPin className="h-3 w-3 text-jp-blue-700" />
            <span>{location.city}</span>
          </div>
        </div>

        <Heading3 className="mt-3 text-base md:text-lg text-jp-ink leading-snug">
          {location.name}
        </Heading3>

        <p className="mt-1 text-xs text-jp-gray-500 truncate font-mono">
          {location.address}
        </p>

        <Paragraph className="mt-3 line-clamp-3 text-xs md:text-sm text-jp-gray-700 leading-relaxed font-prose">
          {location.description}
        </Paragraph>

        {location.associatedArtists && location.associatedArtists.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-jp-gray-100 font-sans">
            <Users className="h-3.5 w-3.5 text-jp-brown-700 shrink-0 mr-1" />
            <span className="text-[11px] font-semibold text-jp-gray-500">Tokoh:</span>
            {location.associatedArtists.map((artist) => (
              <span
                key={artist}
                className="rounded-md bg-jp-paper px-2 py-0.5 text-[10px] font-semibold text-jp-ink border border-jp-gray-200"
              >
                {artist}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 pt-3 border-t border-jp-gray-100 font-sans">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-semibold text-jp-blue-700 hover:underline"
        >
          <Navigation className="h-3.5 w-3.5" />
          Buka di Google Maps
        </a>

        {location.websiteUrl && location.websiteUrl !== "#" && (
          <a
            href={location.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-jp-gray-500 hover:text-jp-blue-700 flex items-center gap-1"
          >
            <Globe className="h-3.5 w-3.5" />
            Situs Web
          </a>
        )}
      </div>
    </div>
  );
}
