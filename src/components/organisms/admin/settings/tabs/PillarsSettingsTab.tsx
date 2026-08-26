"use client";

import React from "react";
import { Heading3 } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/atoms/form/Button";
import { PlatformPillarItem } from "@/lib/data/siteSettings";
import {
  Plus,
  Trash2,
  Edit2,
  BookOpen,
  Layers,
  Sparkles,
  HeartHandshake,
  Compass,
  ShieldCheck,
  Palette,
  Lightbulb,
} from "lucide-react";

interface PillarsSettingsTabProps {
  pillars: PlatformPillarItem[];
  onOpenAddPillar: () => void;
  onOpenEditPillar: (pillar: PlatformPillarItem) => void;
  onDeletePillar: (pillar: PlatformPillarItem) => void;
}

export function PillarsSettingsTab({
  pillars,
  onOpenAddPillar,
  onOpenEditPillar,
  onDeletePillar,
}: PillarsSettingsTabProps) {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs">
        <div>
          <Heading3 className="text-lg text-jp-ink">
            Empat Pilar Nilai Platform
          </Heading3>
          <p className="mt-1 text-xs text-jp-gray-500 font-prose">
            Kelola nilai utama dan pilar fondasi Jejak Perupa yang ditampilkan di halaman Tentang Kami.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={onOpenAddPillar}
          className="rounded-lg shrink-0 text-xs font-bold"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Tambah Pilar Nilai
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="rounded-xl border border-jp-gray-300 bg-white p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-jp-blue-700 transition"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-jp-gray-100 pb-3">
                <span className="font-mono text-xs font-bold text-jp-blue-900 bg-jp-paper px-2 py-0.5 rounded border border-jp-gray-200">
                  PILAR / {pillar.number}
                </span>
                <div className="flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenEditPillar(pillar)}
                    className="h-7 w-7 p-0 rounded-md"
                    title="Edit Pilar"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onDeletePillar(pillar)}
                    className="h-7 w-7 p-0 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
                    title="Hapus Pilar"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-jp-blue-50 border border-jp-blue-100 text-jp-blue-900">
                  {pillar.iconName === "book-open" && <BookOpen className="h-4 w-4 text-jp-blue-700" />}
                  {pillar.iconName === "layers" && <Layers className="h-4 w-4 text-jp-blue-700" />}
                  {pillar.iconName === "sparkles" && <Sparkles className="h-4 w-4 text-jp-blue-700" />}
                  {pillar.iconName === "heart-handshake" && <HeartHandshake className="h-4 w-4 text-jp-blue-700" />}
                  {pillar.iconName === "compass" && <Compass className="h-4 w-4 text-jp-blue-700" />}
                  {pillar.iconName === "shield-check" && <ShieldCheck className="h-4 w-4 text-jp-blue-700" />}
                  {pillar.iconName === "palette" && <Palette className="h-4 w-4 text-jp-blue-700" />}
                  {pillar.iconName === "lightbulb" && <Lightbulb className="h-4 w-4 text-jp-blue-700" />}
                </div>
                <div>
                  <Heading3 className="text-sm font-bold text-jp-ink">
                    {pillar.title}
                  </Heading3>
                  <p className="mt-1 text-xs text-jp-gray-600 font-prose leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
