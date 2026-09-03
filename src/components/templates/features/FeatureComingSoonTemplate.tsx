"use client";

import React from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { Heading1, Paragraph, SectionLabel } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/atoms/form/Button";
import { Badge } from "@/components/atoms/typography/Badge";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { ArrowLeft, BookOpen, Sparkles, Clock, Lock } from "lucide-react";

export interface FeatureComingSoonTemplateProps {
  featureName: string;
  phaseLabel: string;
  description: string;
  expectedRelease?: string;
  peruChanNote?: string;
}

export function FeatureComingSoonTemplate({
  featureName,
  phaseLabel = "FASE MENDATANG",
  description,
  expectedRelease = "Pembaruan Versi Selanjutnya",
  peruChanNote = "Tim kurator dan redaksi sedang menyiapkan data arsip terbaik untuk modul ini. Simak artikel dan profil maestro seni kami terlebih dahulu ya!",
}: FeatureComingSoonTemplateProps) {
  return (
    <MainPublicLayout>
      <div className="bg-jp-paper min-h-[75vh] flex items-center py-16 lg:py-24 font-sans">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 text-center space-y-8">
          {/* BADGE HEADER */}
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-jp-blue-50 px-3 py-1 font-mono text-xs font-bold text-jp-blue-900 border border-jp-blue-200">
                <Clock className="h-3.5 w-3.5 text-jp-blue-700" />
                Segera Hadir
              </span>
            </div>

            <SectionLabel>Eksplorasi Kurasi</SectionLabel>

            <Heading1 className="text-3xl sm:text-4xl lg:text-5xl text-jp-ink leading-tight">
              Ruang {featureName} Sedang Disiapkan
            </Heading1>

            <Paragraph className="text-sm md:text-base text-jp-gray-600 font-prose max-w-xl mx-auto leading-relaxed">
              {description}
            </Paragraph>
          </div>

          {/* PERU-CHAN CALLOUT */}
          <div className="max-w-xl mx-auto text-left">
            <PeruChanCallout title="Catatan dari Peru-Chan" theme="blue">
              <p>{peruChanNote}</p>
            </PeruChanCallout>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/">
              <Button variant="primary" size="md" className="rounded-lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </Link>

            <Link href="/artikel">
              <Button variant="outline" size="md" className="rounded-lg">
                <BookOpen className="h-4 w-4 mr-2" />
                Jelajahi Arsip Artikel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainPublicLayout>
  );
}
