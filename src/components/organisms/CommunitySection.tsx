import React from "react";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { CommunityDirectory } from "@/components/organisms/CommunityDirectory";
import { PeruChanTipBanner } from "@/components/organisms/PeruChanTipBanner";
import { CommunityData } from "@/lib/data/communities";

export interface CommunitySectionProps {
  communities: CommunityData[];
}

export function CommunitySection({ communities }: CommunitySectionProps) {
  return (
    <MainPublicLayout>
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="space-y-12 font-sans">
          <CommunityDirectory communities={communities} />
          <PeruChanTipBanner tipText="Berjejaring dengan komunitas seni di kotamu membuka ruang kolaborasi, tukar gagasan, dan peluang pameran bersama." />
        </div>
      </section>
    </MainPublicLayout>
  );
}
