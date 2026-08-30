"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heading2, Heading3, Paragraph, SectionLabel } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/atoms/form/Button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArtistHeroCardProps {
  artistName: string;
  lifespan: string;
  bio: string;
  photoUrl?: string;
  profileHref?: string;
  sectionLabel?: string;
  title?: string;
  className?: string;
}

export function ArtistHeroCard({
  artistName,
  lifespan,
  bio,
  photoUrl,
  profileHref = "/seniman/raden-saleh",
  sectionLabel = "Mengenal Perupa",
  title = "Seniman Pilihan",
  className,
}: ArtistHeroCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-20", className)}>
      <div className="flex items-end justify-between">
        <div>
          <SectionLabel className="text-jp-brown-900">{sectionLabel}</SectionLabel>
          <Heading2 className="mt-2 text-2xl sm:text-3xl text-jp-ink">{title}</Heading2>
        </div>

        {profileHref && (
          <Link
            href="/seniman"
            className="inline-flex items-center gap-1 text-sm font-bold text-jp-blue-700 hover:text-jp-blue-900 transition-colors font-sans"
          >
            Lihat semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[320px_1fr]">
        {/* FOTO */}
        <div className="relative overflow-hidden rounded-xl bg-jp-brown-100/70 border border-jp-gray-300 shadow-2xs min-h-[300px] h-full w-full">
          {photoUrl && !imageError ? (
            <Image
              src={photoUrl}
              alt={artistName}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full min-h-[300px] w-full items-center justify-center bg-jp-brown-100 font-heading font-bold text-jp-brown-900 text-2xl">
              {artistName}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-center rounded-xl border border-jp-brown-200 bg-jp-brown-50 p-8 md:p-10 shadow-2xs">
          <SectionLabel className="text-jp-brown-700">Jejak Tokoh</SectionLabel>

          <Heading3 className="mt-3 text-2xl sm:text-3xl text-jp-ink">
            {artistName} ({lifespan})
          </Heading3>

          <Paragraph className="mt-4 text-base md:text-lg text-jp-gray-700 leading-relaxed font-prose">
            {bio}
          </Paragraph>

          <div className="mt-8 font-sans">
            <Link href={profileHref}>
              <Button variant="brown" size="md">
                Baca Profil Lengkap
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
