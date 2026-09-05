import React from "react";
import { GlossaryTemplate } from "@/components/templates/features/GlossaryTemplate";
import { GlossaryDirectory } from "@/components/organisms/exploration/GlossaryDirectory";
import { PeruChanTipBanner } from "@/components/organisms/peruchan/PeruChanTipBanner";
import { artService } from "@/lib/services/artService";

import { JsonLd } from "@/components/atoms/meta/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jejak-perupa.vercel.app";

export const metadata = {
  title: "Kamus Istilah Seni Rupa A-Z : Jejak Perupa",
  description: "Ensiklopedia istilah seni rupa, konsep estetika, aliran seni, dan teknik studio A sampai Z.",
};

export default function KamusPage() {
  const terms = artService.getAllGlossaryTerms();

  const glossarySchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Kamus Istilah & Glosarium Seni Rupa Nusantara",
    description: "Ensiklopedia istilah seni rupa, konsep estetika, aliran seni, dan teknik studio A sampai Z.",
    url: `${siteUrl}/kamus`,
    inLanguage: "id-ID",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definitionShort,
      inDefinedTermSet: `${siteUrl}/kamus`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kamus Seni",
        item: `${siteUrl}/kamus`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[glossarySchema, breadcrumbSchema]} />
      <GlossaryTemplate>
        <div className="space-y-12">
          <GlossaryDirectory terms={terms} />
          <PeruChanTipBanner tipText="Mengetahui istilah seni yang tepat membuatmu lebih percaya diri saat menulis catatan kritik seni maupun berdiskusi di studio." />
        </div>
      </GlossaryTemplate>
    </>
  );
}
