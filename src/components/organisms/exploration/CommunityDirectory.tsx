"use client";

import React, { useState, useTransition } from "react";
import { CommunityCard, type CommunityCardProps } from "@/components/molecules/exploration/CommunityCard";
import { CommunityCardSkeleton } from "@/components/molecules/exploration/CommunityCardSkeleton";
import { SearchBar } from "@/components/molecules/navigation/SearchBar";
import { Heading2, SectionLabel } from "@/components/atoms/typography/Typography";
import { cn } from "@/lib/utils";

export interface CommunityDirectoryProps {
  communities: CommunityCardProps[];
  title?: string;
  sectionLabel?: string;
  className?: string;
}

export function CommunityDirectory({
  communities,
  title = "Direktori Komunitas Seni",
  sectionLabel = "Ekosistem & Ruang Seni",
  className,
}: CommunityDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (q: string) => {
    startTransition(() => {
      setSearchQuery(q);
    });
  };

  const filteredCommunities = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.focusArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("space-y-8 font-sans", className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel>{sectionLabel}</SectionLabel>
          <Heading2 className="mt-2 text-jp-ink">{title}</Heading2>
          <p className="mt-2 text-sm text-jp-gray-700 max-w-xl font-prose">
            Basis data kolektif seni, ruang alternatif, dan museum seni rupa di berbagai daerah di Indonesia.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            placeholder="Cari komunitas atau kota..."
            onSearch={handleSearchChange}
          />
        </div>
      </div>

      {/* COMMUNITY GRID WITH IN-SITU SKELETON */}
      {(isLoading || isPending) ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CommunityCardSkeleton key={idx} />
          ))}
        </div>
      ) : filteredCommunities.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCommunities.map((comm) => (
            <CommunityCard key={comm.name} {...comm} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-12 text-center text-jp-gray-500">
          Tidak ada komunitas yang cocok dengan kriteria pencarian.
        </div>
      )}
    </div>
  );
}
