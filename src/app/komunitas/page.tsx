"use client";

import React from "react";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { CommunityDirectory } from "@/components/organisms/CommunityDirectory";
import { PeruChanTipBanner } from "@/components/organisms/PeruChanTipBanner";
import { FeatureGuard } from "@/components/atoms/FeatureGuard";
import { FeatureComingSoonTemplate } from "@/components/templates/FeatureComingSoonTemplate";
import { artService } from "@/lib/services/artService";

export default function KomunitasPage() {
  const communities = artService.getAllCommunities();

  return (
    <FeatureGuard
      flag="direktori_komunitas"
      fallback={
        <FeatureComingSoonTemplate
          featureName="Direktori Komunitas Seni"
          phaseLabel="FASE 3 : KOMUNITAS"
          description="Basis data jejaring kolektif seni rupa, sanggar daerah, dan ruang seni alternatif nusantara sedang dikurasi dan dihimpun."
          expectedRelease="Pembaruan Versi 1.2.0"
        />
      }
    >
      <MainPublicLayout>
        <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
          <div className="space-y-12">
            <CommunityDirectory communities={communities} />
            <PeruChanTipBanner tipText="Berjejaring dengan komunitas seni di kotamu membuka ruang kolaborasi, tukar gagasan, dan peluang pameran bersama." />
          </div>
        </section>
      </MainPublicLayout>
    </FeatureGuard>
  );
}
