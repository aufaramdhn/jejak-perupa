import React from "react";
import { GlossaryTemplate } from "@/components/templates/GlossaryTemplate";
import { GlossaryDirectory } from "@/components/organisms/GlossaryDirectory";
import { PeruChanTipBanner } from "@/components/organisms/PeruChanTipBanner";
import { artService } from "@/lib/services/artService";

export const metadata = {
  title: "Kamus Istilah Seni Rupa A-Z : Jejak Perupa",
  description: "Ensiklopedia istilah seni rupa, konsep estetika, aliran seni, dan teknik studio A sampai Z.",
};

export default function KamusPage() {
  const terms = artService.getAllGlossaryTerms();

  return (
    <GlossaryTemplate>
      <div className="space-y-12">
        <GlossaryDirectory terms={terms} />
        <PeruChanTipBanner tipText="Mengetahui istilah seni yang tepat membuatmu lebih percaya diri saat menulis catatan kritik seni maupun berdiskusi di studio." />
      </div>
    </GlossaryTemplate>
  );
}
