import React from "react";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { CommunityDirectory } from "@/components/organisms/CommunityDirectory";
import { PeruChanTipBanner } from "@/components/organisms/PeruChanTipBanner";
import { artService } from "@/lib/services/artService";

export const metadata = {
  title: "Direktori Komunitas dan Ruang Seni Nusantara : Jejak Perupa",
  description: "Basis data kolektif seni, ruang seni alternatif (art space), dan museum seni rupa di berbagai kota di Indonesia.",
};

export default function KomunitasPage() {
  const communities = artService.getAllCommunities();

  return (
    <MainPublicLayout>
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="space-y-12">
          <CommunityDirectory communities={communities} />
          <PeruChanTipBanner tipText="Berjejaring dengan komunitas seni di kotamu membuka ruang kolaborasi, tukar gagasan, dan peluang pameran bersama." />
        </div>
      </section>
    </MainPublicLayout>
  );
}
