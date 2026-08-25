"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CatalogGridTemplate } from "@/components/templates/CatalogGridTemplate";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { SearchBar } from "@/components/molecules/SearchBar";
import { PeruChanTipBanner } from "@/components/organisms/PeruChanTipBanner";
import { artService } from "@/lib/services/artService";
import { MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SenimanDirectoryPage() {
  const allArtists = artService.getAllArtists();
  const [selectedMovement, setSelectedMovement] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const movements = ["Semua", "Romantisisme", "Ekspresionisme", "Realisme dan Naturalisme"];

  const filteredArtists = allArtists.filter((artist) => {
    const matchesMovement =
      selectedMovement === "Semua" ||
      artist.artMovement.toLowerCase().includes(selectedMovement.toLowerCase());
    const matchesSearch =
      searchQuery === "" ||
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.originCity.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMovement && matchesSearch;
  });

  const filterSection = (
    <div className="space-y-6 font-sans">
      <div className="max-w-xl">
        <SearchBar
          placeholder="Cari nama seniman, kota, atau aliran..."
          onSearch={(q) => setSearchQuery(q)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {movements.map((mov) => (
          <button
            key={mov}
            type="button"
            onClick={() => setSelectedMovement(mov)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
              selectedMovement === mov
                ? "bg-jp-blue-900 text-white shadow-2xs"
                : "bg-white text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900 border border-jp-gray-300"
            )}
          >
            {mov}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <CatalogGridTemplate
      badgeText="Dokumentasi Tokoh"
      title="Direktori Seniman Seni Rupa Nusantara"
      subtitle="Mengenal riwayat hidup, pemikiran artistik, dan mahakarya para perupa legendaris yang meletakkan fondasi sejarah seni rupa Indonesia."
      filterSection={filterSection}
    >
      <div className="space-y-12 font-sans">
        <div className="grid gap-6 sm:grid-cols-2">
          {filteredArtists.map((artist) => (
            <div
              key={artist.slug}
              className="flex flex-col justify-between overflow-hidden rounded-xl border border-jp-gray-300 bg-white p-6 md:p-7 shadow-2xs transition-all duration-300 hover:border-jp-blue-700 hover:shadow-jp-hover"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="brown">{artist.artMovement}</Badge>
                  <span className="font-mono text-xs text-jp-gray-500 font-semibold">
                    {artist.birthYear} - {artist.deathYear || "Kini"}
                  </span>
                </div>

                <Heading3 className="mt-4 text-xl md:text-2xl text-jp-ink">
                  {artist.name}
                </Heading3>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-jp-gray-500 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-jp-blue-700 shrink-0" />
                  <span>Asal: {artist.originCity}</span>
                  <span>•</span>
                  <span>{artist.studioDiscipline}</span>
                </div>

                <Paragraph className="mt-3.5 text-sm text-jp-gray-700 leading-relaxed font-prose">
                  {artist.shortBio}
                </Paragraph>
              </div>

              <div className="mt-6 pt-4 border-t border-jp-gray-100 flex items-center justify-between">
                <Link href={`/seniman/${artist.slug}`}>
                  <Button variant="primary" size="sm" className="rounded-lg">
                    Buka Profil & Galeri
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </Link>

                <span className="text-xs text-jp-gray-400 font-mono">
                  {artist.timelines.length} Peristiwa Lini Masa
                </span>
              </div>
            </div>
          ))}
        </div>

        <PeruChanTipBanner tipText="Setiap seniman maestro memiliki masa pencarian gaya visualnya sendiri. Mengamati linimasa perjalanan hidup mereka membantu kita memahami proses pembentukan jati diri artistik." />
      </div>
    </CatalogGridTemplate>
  );
}
