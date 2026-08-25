"use client";

import React, { useState } from "react";
import {
  MapPin,
  Compass,
  Search,
} from "lucide-react";
import { SpatialLocationCard } from "@/components/molecules/SpatialLocationCard";
import { PeruChanCallout } from "@/components/molecules/PeruChanCallout";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import { Badge } from "@/components/atoms/Badge";
import type { SpatialLocation } from "@/lib/data/spatialArt";
import { cn } from "@/lib/utils";

export interface SpatialArtMapProps {
  locations: SpatialLocation[];
  className?: string;
}

export function SpatialArtMap({ locations, className }: SpatialArtMapProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedProvince, setSelectedProvince] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    locations[0]?.id || null
  );

  const categories = ["Semua", "Museum", "Galeri Seni", "Monumen & Situs", "Sanggar & Kolektif"];

  const provinces = [
    "Semua",
    "DKI Jakarta",
    "Jawa Barat",
    "D.I. Yogyakarta",
    "Bali",
    "Sumatera Barat",
    "Sulawesi Selatan",
  ];

  const filteredLocations = locations.filter((loc) => {
    const matchesCategory =
      selectedCategory === "Semua" || loc.category === selectedCategory;
    const matchesProvince =
      selectedProvince === "Semua" || loc.province === selectedProvince;
    const matchesSearch =
      searchQuery === "" ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesProvince && matchesSearch;
  });

  const activeLocation =
    locations.find((l) => l.id === selectedLocationId) || filteredLocations[0] || null;

  return (
    <div className={cn("space-y-8 font-sans", className)}>
      {/* FILTER CONTROLS BAR (ROUNDED-XL) */}
      <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jp-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama museum, galeri, atau kota..."
              className="w-full rounded-lg border border-jp-gray-300 bg-jp-paper pl-10 pr-4 py-2.5 text-sm text-jp-ink focus:border-jp-blue-700 focus:ring-2 focus:ring-jp-blue-100 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-jp-gray-500 mr-1 uppercase tracking-wider">
              Kategori:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                  selectedCategory === cat
                    ? "bg-jp-blue-900 text-white shadow-2xs"
                    : "bg-jp-paper text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900 border border-jp-gray-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PROVINCE PILLS */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-jp-gray-100">
          <span className="text-xs font-bold text-jp-gray-500 mr-1 uppercase tracking-wider">
            Wilayah:
          </span>
          {provinces.map((prov) => (
            <button
              key={prov}
              type="button"
              onClick={() => setSelectedProvince(prov)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
                selectedProvince === prov
                  ? "bg-jp-brown-900 text-white font-bold"
                  : "bg-jp-paper text-jp-gray-700 hover:bg-jp-gray-200 border border-jp-gray-200"
              )}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* MAP VIEWPORT & DETAILS SPLIT CONTAINER (ROUNDED-XL) */}
      <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
        {/* INTERACTIVE MAP RADAR VIEW */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xs">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-b from-jp-blue-100/40 via-jp-paper to-white p-6 select-none flex flex-col justify-between">
            {/* MAP DECORATIVE GRID LINES */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#173B63_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* TOP MAP OVERLAY BAR */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-jp-blue-900 shadow-2xs backdrop-blur border border-jp-blue-100">
                <Compass className="h-4 w-4 text-jp-blue-700 animate-spin" />
                Peta Koordinat Seni Nusantara
              </div>

              <span className="rounded-lg bg-jp-lime px-3 py-1 text-[11px] font-bold text-jp-ink shadow-2xs">
                {filteredLocations.length} Titik Terdeteksi
              </span>
            </div>

            {/* PIN MARKERS GRID */}
            <div className="relative z-10 my-auto grid grid-cols-2 sm:grid-cols-3 gap-3 p-4">
              {filteredLocations.map((loc) => {
                const isSelected = activeLocation?.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocationId(loc.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg p-2.5 text-left transition-all duration-200 cursor-pointer shadow-2xs",
                      isSelected
                        ? "bg-jp-blue-900 text-white ring-2 ring-jp-blue-300 scale-102"
                        : "bg-white/95 hover:bg-white text-jp-ink border border-jp-gray-300 hover:border-jp-blue-700"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold",
                        isSelected
                          ? "bg-jp-lime text-jp-ink"
                          : "bg-jp-blue-100 text-jp-blue-900"
                      )}
                    >
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-heading text-xs font-bold truncate">
                        {loc.name}
                      </div>
                      <div
                        className={cn(
                          "text-[10px] truncate",
                          isSelected ? "text-jp-blue-100" : "text-jp-gray-500"
                        )}
                      >
                        {loc.city}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* BOTTOM MAP STATUS */}
            <div className="relative z-10 flex items-center justify-between text-xs text-jp-gray-500 pt-2 border-t border-jp-gray-200/60 font-sans">
              <span>Proyeksi Spasial: Indonesia (WGS 84)</span>
              <span>Klik salah satu lokasi untuk melihat detail</span>
            </div>
          </div>

          {/* ACTIVE LOCATION HIGHLIGHT BAR */}
          {activeLocation && (
            <div className="border-t border-jp-gray-200 bg-jp-blue-50/50 p-6 space-y-3 font-sans">
              <div className="flex items-center justify-between">
                <Badge variant="blue">{activeLocation.category}</Badge>
                <span className="font-mono text-xs text-jp-gray-500">
                  Koordinat: {activeLocation.latitude.toFixed(4)}, {activeLocation.longitude.toFixed(4)}
                </span>
              </div>
              <Heading3 className="text-xl text-jp-ink">{activeLocation.name}</Heading3>
              <p className="text-xs text-jp-gray-500">{activeLocation.address}</p>
              <Paragraph className="text-sm text-jp-gray-700 leading-relaxed font-prose">
                {activeLocation.description}
              </Paragraph>
            </div>
          )}
        </div>

        {/* LOCATIONS LIST SIDEBAR */}
        <div className="space-y-4 max-h-[720px] overflow-y-auto pr-1 font-sans">
          <div className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
            Daftar Lokasi Terpilih ({filteredLocations.length})
          </div>

          {filteredLocations.map((loc) => (
            <SpatialLocationCard
              key={loc.id}
              location={loc}
              isSelected={activeLocation?.id === loc.id}
              onSelect={() => setSelectedLocationId(loc.id)}
            />
          ))}

          {filteredLocations.length === 0 && (
            <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-8 text-center text-xs text-jp-gray-500">
              Tidak ada lokasi yang cocok dengan filter.
            </div>
          )}
        </div>
      </div>

      {/* PERU-CHAN SPATIAL TRAVELOGUE CALLOUT */}
      <PeruChanCallout
        title="Tips Jejak Seni dari Peru-Chan"
        subtitle="Menelusuri museum dan ruang alternatif sebagai laboratorium visual."
        theme="brown"
        iconType="book"
      >
        <p>
          Setiap kota di Indonesia memiliki denyut ekosistem seninya sendiri.
          Museum mendokumentasikan mahakarya masa lampau, sedangkan ruang
          alternatif dan sanggar komunitas melahirkan eksperimen visual generasi
          baru!
        </p>
      </PeruChanCallout>
    </div>
  );
}
