"use client";

import React from "react";
import { Heading3 } from "@/components/atoms/typography/Typography";
import { Input } from "@/components/atoms/form/Input";
import { Button } from "@/components/atoms/form/Button";
import { ImageDualInput } from "@/components/molecules/editor/ImageDualInput";
import { Save } from "lucide-react";

interface BrandingSettingsTabProps {
  siteName: string;
  setSiteName: (val: string) => void;
  siteTagline: string;
  setSiteTagline: (val: string) => void;
  logoInitials: string;
  setLogoInitials: (val: string) => void;
  logoImageUrl: string;
  setLogoImageUrl: (val: string) => void;
  faviconUrl: string;
  setFaviconUrl: (val: string) => void;
  contactEmail: string;
  setContactEmail: (val: string) => void;
  onSave: (e?: React.FormEvent) => void;
}

export function BrandingSettingsTab({
  siteName,
  setSiteName,
  siteTagline,
  setSiteTagline,
  logoInitials,
  setLogoInitials,
  logoImageUrl,
  setLogoImageUrl,
  faviconUrl,
  setFaviconUrl,
  contactEmail,
  setContactEmail,
  onSave,
}: BrandingSettingsTabProps) {
  return (
    <form onSubmit={onSave} className="space-y-6 font-sans">
      <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
        <div className="border-b border-jp-gray-100 pb-4">
          <Heading3 className="text-lg text-jp-ink">
            Identitas Brand, Logo, & Favicon Situs
          </Heading3>
          <p className="mt-1 text-xs text-jp-gray-500 font-prose">
            Konfigurasi logo visual, ikon favicon tab browser, nama platform, tagline, dan kontak redaksi resmi.
          </p>
        </div>

        {/* LOGO & FAVICON DUAL INPUT GRID */}
        <div className="grid gap-6 sm:grid-cols-2 p-5 rounded-xl bg-jp-paper/60 border border-jp-gray-200">
          {/* LOGO PLATFORM */}
          <ImageDualInput
            label="Logo Platform (Resmi)"
            value={logoImageUrl}
            onChange={setLogoImageUrl}
            placeholderUrl="https://domain.com/logo-jejak-perupa.png"
            helperGuideline="Rekomendasi rasio 1:1 atau horizontal, resolusi minimal 128×128 px hingga 512×512 px, format PNG transparan atau SVG, ukuran maksimal 2 MB."
            minWidth={128}
            minHeight={128}
            maxSizeBytes={2 * 1024 * 1024}
            maxSizeLabel="2 MB"
            previewObjectFit="contain"
            previewClassName="h-16 w-16 bg-white p-1"
          />

          {/* FAVICON BROWSER */}
          <ImageDualInput
            label="Favicon Browser (Ikon Tab)"
            value={faviconUrl}
            onChange={setFaviconUrl}
            placeholderUrl="https://domain.com/favicon.ico"
            helperGuideline="Rekomendasi rasio 1:1 (persegi), ukuran standar 32×32 px atau 64×64 px, format ICO atau PNG transparan, ukuran maksimal 500 KB."
            minWidth={32}
            minHeight={32}
            maxSizeBytes={512 * 1024}
            maxSizeLabel="500 KB"
            previewObjectFit="contain"
            previewClassName="h-12 w-12 bg-white p-1"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Nama Platform
            </label>
            <Input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Tagline Kuratorial
            </label>
            <Input
              type="text"
              value={siteTagline}
              onChange={(e) => setSiteTagline(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Inisial Logo Avatar (Fallback Jika Logo Kosong)
            </label>
            <Input
              type="text"
              value={logoInitials}
              onChange={(e) => setLogoInitials(e.target.value)}
              maxLength={4}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Email Kontak Redaksi
            </label>
            <Input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
        </div>

        {/* SAVE ACTION */}
        <div className="flex justify-end pt-4 border-t border-jp-gray-100">
          <Button type="submit" variant="primary" size="md" className="rounded-lg">
            <Save className="h-4 w-4 mr-2" />
            Simpan Identitas & Logo
          </Button>
        </div>
      </div>
    </form>
  );
}
