import React from "react";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { cn } from "@/lib/utils";

export interface ArtistProfileTemplateProps {
  hero: React.ReactNode;
  biography: React.ReactNode;
  timeline: React.ReactNode;
  gallery: React.ReactNode;
  related: React.ReactNode;
  className?: string;
}

export function ArtistProfileTemplate({
  hero,
  biography,
  timeline,
  gallery,
  related,
  className,
}: ArtistProfileTemplateProps) {
  return (
    <MainPublicLayout>
      {/* ARTIST HERO BANNER */}
      <section className="border-b border-jp-gray-300 bg-gradient-to-b from-jp-brown-50/90 via-jp-paper to-white py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">{hero}</div>
      </section>

      {/* BIOGRAPHY & TIMELINE SECTION */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-14 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-12">{biography}</div>
          <aside className="space-y-8 lg:sticky lg:top-24">{timeline}</aside>
        </div>
      </section>

      {/* ARTWORKS GALLERY SECTION */}
      <section className="border-t border-jp-gray-300 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">{gallery}</div>
      </section>

      {/* RELATED ARTISTS & INFLUENCES */}
      <section className="border-t border-jp-gray-300 bg-jp-paper py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">{related}</div>
      </section>
    </MainPublicLayout>
  );
}
