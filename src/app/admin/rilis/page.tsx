"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import {
  featureFlagDefinitions,
  releasePresets,
  ReleasePresetId,
  FeatureFlagKey,
  FeatureGroupCategory,
} from "@/lib/data/featureFlags";
import { useFeatureFlags } from "@/lib/featureFlagsContext";
import { useModal } from "@/lib/modalContext";
import {
  SlidersHorizontal,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  RotateCcw,
  Eye,
  Check,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Compass,
  BookOpen,
  Users,
  Film,
  Calendar,
  Heart,
  Palette,
  MapPin,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminRilisPage() {
  const {
    flags,
    activePreset,
    isFeatureEnabled,
    setFeatureEnabled,
    applyPreset,
    resetToDefaultPreset,
    enabledCount,
    totalCount,
  } = useFeatureFlags();

  const { confirm, alert } = useModal();

  const handleApplyPreset = async (presetId: ReleasePresetId, name: string) => {
    const confirmed = await confirm({
      title: `Terapkan Preset ${name}?`,
      message: `Konfigurasi seluruh sakelar fitur akan disesuaikan dengan paket versi ${name}. Perubahan langsung aktif di seluruh website.`,
      confirmLabel: "Terapkan Preset",
      cancelLabel: "Batal",
      variant: "primary",
      iconType: "help",
    });

    if (confirmed) {
      applyPreset(presetId);
      alert({
        type: "success",
        title: "Preset Rilis Diterapkan",
        message: `Platform Jejak Perupa kini aktif dalam mode "${name}".`,
      });
    }
  };

  const handleToggle = (key: FeatureFlagKey, label: string) => {
    if (key === "core_platform") return;
    const currentState = isFeatureEnabled(key);
    setFeatureEnabled(key, !currentState);
  };

  // Group definitions by category
  const groups: {
    id: FeatureGroupCategory;
    title: string;
    phaseBadge: string;
    color: string;
    borderClass: string;
    bgClass: string;
  }[] = [
    {
      id: "fase1_core",
      title: "Fondasi Inti (Baseline Core)",
      phaseBadge: "FASE 1 : CORE",
      color: "#182C4A",
      borderClass: "border-jp-ink/20",
      bgClass: "bg-jp-paper/70",
    },
    {
      id: "fase2_visual",
      title: "Visual Studio & Galeri",
      phaseBadge: "FASE 2 : VISUAL",
      color: "#06B6D4",
      borderClass: "border-cyan-200",
      bgClass: "bg-cyan-50/50",
    },
    {
      id: "fase2_personal",
      title: "Koleksi & Ruang Personal",
      phaseBadge: "FASE 2 : PERSONAL",
      color: "#38BDF8",
      borderClass: "border-sky-200",
      bgClass: "bg-sky-50/50",
    },
    {
      id: "fase3_edukasi",
      title: "Kurikulum & Evaluasi Belajar",
      phaseBadge: "FASE 3 : EDUKASI",
      color: "#F59E0B",
      borderClass: "border-amber-200",
      bgClass: "bg-amber-50/50",
    },
    {
      id: "fase3_media",
      title: "Media Audiovisual",
      phaseBadge: "FASE 3 : MEDIA",
      color: "#2563EB",
      borderClass: "border-blue-200",
      bgClass: "bg-blue-50/50",
    },
    {
      id: "fase3_media_seni",
      title: "Wacana & Agenda Pameran",
      phaseBadge: "FASE 3 : MEDIA SENI",
      color: "#F43F5E",
      borderClass: "border-rose-200",
      bgClass: "bg-rose-50/50",
    },
    {
      id: "fase3_komunitas",
      title: "Jejaring Komunitas",
      phaseBadge: "FASE 3 : KOMUNITAS",
      color: "#10B981",
      borderClass: "border-emerald-200",
      bgClass: "bg-emerald-50/50",
    },
    {
      id: "fase4_kontributor",
      title: "Partisipasi Kontributor",
      phaseBadge: "FASE 4 : KONTRIBUTOR",
      color: "#8B5CF6",
      borderClass: "border-purple-200",
      bgClass: "bg-purple-50/50",
    },
    {
      id: "fase4_komunitas",
      title: "Kolektif Komunitas",
      phaseBadge: "FASE 4 : KOMUNITAS",
      color: "#EF4444",
      borderClass: "border-red-200",
      bgClass: "bg-red-50/50",
    },
    {
      id: "fase4_eksplorasi",
      title: "Eksplorasi Spasial Nusantara",
      phaseBadge: "FASE 4 : EKSPLORASI",
      color: "#EC4899",
      borderClass: "border-pink-200",
      bgClass: "bg-pink-50/50",
    },
  ];

  return (
    <AdminLayout
      title="Manajemen Rilis & Feature Flags"
      subtitle="Kontrol tahapan rilis platform, visibilitas menu publik, dan sakelar fitur secara adaptif."
      actionButton={
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleApplyPreset("v1.0.0", "v1.0.0 (MVP Awal)")}
            className="rounded-lg text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Reset ke v1.0.0
          </Button>

          <Link href="/" target="_blank">
            <Button variant="primary" size="sm" className="rounded-lg text-xs">
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              Lihat Live Web
            </Button>
          </Link>
        </div>
      }
    >
      <div className="space-y-8 font-sans">
        {/* CURRENT STATUS BANNER */}
        <div className="rounded-xl border border-jp-blue-300 bg-gradient-to-r from-jp-blue-900 to-jp-ink p-6 text-white shadow-xs flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-white/20 px-2.5 py-0.5 font-mono text-xs font-bold backdrop-blur-xs">
                <ShieldCheck className="h-3.5 w-3.5" />
                Status Rilis Aktif:{" "}
                {activePreset === "custom"
                  ? "Kustom (Custom Override)"
                  : activePreset.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-heading">
              {enabledCount} dari {totalCount} Fitur Platform Aktif Tayang
            </h2>
            <p className="text-xs text-white/80 font-prose max-w-xl">
              Fitur yang berstatus NON-AKTIF otomatis disembunyikan dari menu navigasi navbar, footer, dan beranda tanpa menimbulkan broken link.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-3.5 border border-white/15 text-center font-mono">
              <div className="text-2xl font-bold text-jp-lime-400">
                {enabledCount}
              </div>
              <div className="text-[10px] uppercase text-white/70">Aktif</div>
            </div>
            <div className="rounded-xl bg-white/10 p-3.5 border border-white/15 text-center font-mono">
              <div className="text-2xl font-bold text-amber-300">
                {totalCount - enabledCount}
              </div>
              <div className="text-[10px] uppercase text-white/70">Standby</div>
            </div>
          </div>
        </div>

        {/* 1. PRESET VERSI RILIS (1-KLIK) */}
        <div className="space-y-4">
          <div className="border-b border-jp-gray-200 pb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-jp-blue-700">
              Bagian 1
            </span>
            <Heading3 className="text-lg text-jp-ink">
              Pilihan Preset Versi Rilis Cepat (1-Klik)
            </Heading3>
            <p className="text-xs text-jp-gray-500 font-prose">
              Pilih salah satu preset di bawah untuk menerapkan paket fitur sesuai target peluncuran roadmap.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {releasePresets.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <div
                  key={preset.id}
                  className={cn(
                    "relative flex flex-col justify-between rounded-xl border p-5 transition shadow-2xs",
                    isSelected
                      ? "border-jp-blue-900 bg-jp-blue-50/50 ring-2 ring-jp-blue-900/30"
                      : "border-jp-gray-300 bg-white hover:border-jp-blue-300"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-jp-blue-900 text-white">
                        {preset.versionBadge}
                      </span>
                      {isSelected && (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-green-700 font-mono bg-green-50 px-2 py-0.5 rounded border border-green-200">
                          <CheckCircle2 className="h-3 w-3" />
                          Aktif
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="font-bold text-jp-ink text-sm">
                        {preset.subtitle}
                      </div>
                      <p className="mt-1 text-xs text-jp-gray-600 font-prose leading-relaxed">
                        {preset.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-jp-gray-200/70">
                    <Button
                      type="button"
                      variant={isSelected ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleApplyPreset(preset.id, preset.name)}
                      className={cn(
                        "w-full rounded-lg text-xs",
                        isSelected
                          ? "bg-jp-blue-900 hover:bg-jp-blue-950 text-white"
                          : ""
                      )}
                    >
                      {isSelected ? "Preset Sedang Aktif" : "Terapkan Preset"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. MATRIKS SAKELAR FITUR MANDIRI (GRANULAR OVERRIDE) */}
        <div className="space-y-4">
          <div className="border-b border-jp-gray-200 pb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-jp-blue-700">
                Bagian 2
              </span>
              <Heading3 className="text-lg text-jp-ink">
                Matriks Sakelar Fitur Mandiri (Granular Override)
              </Heading3>
              <p className="text-xs text-jp-gray-500 font-prose">
                Admin bebas mengaktifkan atau menonaktifkan fitur tertentu secara mandiri di luar pilihan preset.
              </p>
            </div>

            <span className="font-mono text-xs text-jp-gray-500">
              Total 19 Fitur Modular
            </span>
          </div>

          <div className="space-y-6">
            {groups.map((grp) => {
              const groupFlags = featureFlagDefinitions.filter(
                (f) => f.group === grp.id
              );

              return (
                <div
                  key={grp.id}
                  className={cn(
                    "rounded-xl border p-5 md:p-6 shadow-2xs space-y-4",
                    grp.borderClass,
                    grp.bgClass
                  )}
                >
                  {/* GROUP HEADER */}
                  <div className="flex items-center justify-between border-b border-jp-gray-200/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-3.5 w-3.5 rounded-full shrink-0 shadow-2xs"
                        style={{ backgroundColor: grp.color }}
                      />
                      <span className="font-mono text-xs font-bold uppercase tracking-wide text-jp-ink">
                        {grp.phaseBadge}
                      </span>
                      <span className="text-xs text-jp-gray-500">·</span>
                      <span className="text-xs font-bold text-jp-gray-700">
                        {grp.title}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] text-jp-gray-500">
                      {groupFlags.filter((f) => isFeatureEnabled(f.key)).length} /{" "}
                      {groupFlags.length} Aktif
                    </span>
                  </div>

                  {/* FLAGS IN GROUP */}
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {groupFlags.map((flag) => {
                      const enabled = isFeatureEnabled(flag.key);
                      const isLockedCore = flag.isCore;

                      return (
                        <div
                          key={flag.key}
                          className={cn(
                            "relative flex flex-col justify-between rounded-lg border p-3.5 transition bg-white shadow-2xs",
                            enabled
                              ? "border-jp-gray-300"
                              : "border-jp-gray-200 opacity-60 bg-jp-paper/40"
                          )}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-xs text-jp-ink">
                                {flag.label}
                              </span>

                              {isLockedCore ? (
                                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-jp-blue-900 bg-jp-blue-50 px-1.5 py-0.5 rounded border border-jp-blue-200">
                                  <Lock className="h-2.5 w-2.5" />
                                  Core
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleToggle(flag.key, flag.label)
                                  }
                                  className={cn(
                                    "flex items-center gap-1 font-mono text-[11px] font-bold px-2 py-0.5 rounded transition cursor-pointer border",
                                    enabled
                                      ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                                      : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"
                                  )}
                                >
                                  {enabled ? "ON" : "OFF"}
                                </button>
                              )}
                            </div>

                            <p className="text-[11px] text-jp-gray-500 font-prose leading-relaxed">
                              {flag.shortDescription}
                            </p>
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-jp-gray-100 flex items-center justify-between text-[10px] font-mono text-jp-gray-400">
                            <span>Key: {flag.key}</span>
                            <span
                              className={cn(
                                "font-bold",
                                enabled ? "text-green-600" : "text-gray-400"
                              )}
                            >
                              {enabled ? "● Tayang" : "○ Disimpan"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
