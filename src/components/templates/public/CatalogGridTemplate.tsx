import React from "react";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { Heading1, LeadText, SectionLabel } from "@/components/atoms/typography/Typography";
import { cn } from "@/lib/utils";

export interface CatalogGridTemplateProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  filterSection?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function CatalogGridTemplate({
  title,
  subtitle,
  badgeText,
  filterSection,
  children,
  className,
}: CatalogGridTemplateProps) {
  return (
    <MainPublicLayout>
      {/* HERO HEADER */}
      <section className="border-b border-jp-gray-300 bg-gradient-to-b from-jp-blue-50/80 via-jp-paper to-white py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {badgeText && (
            <div className="mb-3">
              <SectionLabel>{badgeText}</SectionLabel>
            </div>
          )}
          <Heading1 className="max-w-3xl text-jp-ink text-3xl sm:text-4xl lg:text-5xl">{title}</Heading1>
          {subtitle && (
            <LeadText className="mt-4 max-w-2xl text-jp-gray-700">
              {subtitle}
            </LeadText>
          )}
          {filterSection && <div className="mt-8">{filterSection}</div>}
        </div>
      </section>

      {/* CONTENT AREA */}
      <section className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16", className)}>
        {children}
      </section>
    </MainPublicLayout>
  );
}
