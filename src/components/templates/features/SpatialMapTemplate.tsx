import React from "react";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { Heading1, LeadText, SectionLabel } from "@/components/atoms/typography/Typography";
import { cn } from "@/lib/utils";

export interface SpatialMapTemplateProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  children: React.ReactNode;
  className?: string;
}

export function SpatialMapTemplate({
  title = "Peta Geospasial Jejak Seni Nusantara",
  subtitle = "Telusuri koordinat museum, galeri seni, taman patung, dan sanggar komunitas seni rupa di berbagai penjuru Indonesia.",
  badgeText = "Jejak Spasial",
  children,
  className,
}: SpatialMapTemplateProps) {
  return (
    <MainPublicLayout>
      {/* HERO SECTION */}
      <section className="border-b border-jp-gray-300 bg-gradient-to-b from-jp-blue-50/80 via-jp-paper to-white py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionLabel>{badgeText}</SectionLabel>
          <Heading1 className="mt-3 max-w-3xl text-jp-ink text-3xl sm:text-4xl lg:text-5xl">{title}</Heading1>
          <LeadText className="mt-4 max-w-2xl text-jp-gray-700">{subtitle}</LeadText>
        </div>
      </section>

      {/* MAP VIEW CONTAINER */}
      <section className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16", className)}>
        {children}
      </section>
    </MainPublicLayout>
  );
}
