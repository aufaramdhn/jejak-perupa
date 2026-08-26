"use client";

import React from "react";
import { Heading3 } from "@/components/atoms/typography/Typography";
import { Input } from "@/components/atoms/form/Input";
import { Button } from "@/components/atoms/form/Button";
import { Save } from "lucide-react";

interface EditorialSettingsTabProps {
  heroHeadline: string;
  setHeroHeadline: (val: string) => void;
  heroDescription: string;
  setHeroDescription: (val: string) => void;
  aboutVision: string;
  setAboutVision: (val: string) => void;
  onSave: (e?: React.FormEvent) => void;
}

export function EditorialSettingsTab({
  heroHeadline,
  setHeroHeadline,
  heroDescription,
  setHeroDescription,
  aboutVision,
  setAboutVision,
  onSave,
}: EditorialSettingsTabProps) {
  return (
    <form onSubmit={onSave} className="space-y-6 font-sans">
      <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
        <div className="border-b border-jp-gray-100 pb-4">
          <Heading3 className="text-lg text-jp-ink">
            Teks Editorial Beranda & Halaman Tentang
          </Heading3>
          <p className="mt-1 text-xs text-jp-gray-500 font-prose">
            Narasi filosofi, visi kuratorial, dan deskripsi pembuka yang tampil di halaman beranda dan tentang kami.
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Headline Utama Beranda
            </label>
            <Input
              type="text"
              value={heroHeadline}
              onChange={(e) => setHeroHeadline(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Deskripsi Narasi Hero
            </label>
            <textarea
              rows={3}
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
              Visi Platform
            </label>
            <textarea
              rows={3}
              value={aboutVision}
              onChange={(e) => setAboutVision(e.target.value)}
              className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed"
            />
          </div>
        </div>

        {/* SAVE ACTION */}
        <div className="flex justify-end pt-4 border-t border-jp-gray-100">
          <Button type="submit" variant="primary" size="md" className="rounded-lg">
            <Save className="h-4 w-4 mr-2" />
            Simpan Teks Editorial
          </Button>
        </div>
      </div>
    </form>
  );
}
