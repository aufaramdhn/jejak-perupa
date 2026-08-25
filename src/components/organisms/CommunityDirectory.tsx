"use client";

import React, { useState } from "react";
import { CommunityCard, type CommunityCardProps } from "@/components/molecules/CommunityCard";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Heading2, SectionLabel } from "@/components/atoms/Typography";
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

  const filteredCommunities = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.focusArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel>{sectionLabel}</SectionLabel>
          <Heading2 className="mt-2 text-jp-ink">{title}</Heading2>
          <p className="mt-2 text-sm text-jp-gray-700 max-w-xl">
            Basis data kolektif seni, ruang alternatif, dan museum seni rupa di berbagai daerah di Indonesia.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            placeholder="Cari komunitas atau kota..."
            onSearch={(q) => setSearchQuery(q)}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCommunities.map((comm) => (
          <CommunityCard key={comm.name} {...comm} />
        ))}
      </div>
    </div>
  );
}
