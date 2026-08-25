import React from "react";
import { ArtworkCard, type ArtworkCardProps } from "@/components/molecules/artwork/ArtworkCard";
import { Heading2, SectionLabel } from "@/components/atoms/typography/Typography";
import { cn } from "@/lib/utils";

export interface ArtworkGalleryViewerProps {
  artworks: ArtworkCardProps[];
  title?: string;
  sectionLabel?: string;
  className?: string;
}

export function ArtworkGalleryViewer({
  artworks,
  title = "Galeri Karya Pilihan",
  sectionLabel = "Koleksi Maestro",
  className,
}: ArtworkGalleryViewerProps) {
  return (
    <section className={cn("space-y-8", className)}>
      <div>
        <SectionLabel>{sectionLabel}</SectionLabel>
        <Heading2 className="mt-2 text-jp-ink">{title}</Heading2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} {...artwork} />
        ))}
      </div>
    </section>
  );
}
