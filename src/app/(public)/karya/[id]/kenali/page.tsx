import React from "react";
import { notFound } from "next/navigation";
import { CloseLookingTemplate } from "@/components/templates/public/CloseLookingTemplate";
import { CloseLookingViewer } from "@/components/organisms/artwork/CloseLookingViewer";
import { artService } from "@/lib/services/artService";

export function generateStaticParams() {
  const artworks = artService.getAllArtworks();
  return artworks.map((artwork) => ({
    id: artwork.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artwork = artService.getArtworkByIdOrSlug(id);

  if (!artwork) {
    return {
      title: "Karya Tidak Ditemukan : Jejak Perupa",
    };
  }

  return {
    title: `Close Looking: ${artwork.title} (${artwork.artistName}) : Jejak Perupa`,
    description: artwork.description,
  };
}

import { JsonLd } from "@/components/atoms/meta/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jejak-perupa.vercel.app";

export default async function CloseLookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artwork = artService.getArtworkByIdOrSlug(id);

  if (!artwork) {
    notFound();
  }

  const artworkSchema = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    description: artwork.description,
    image: artwork.highResImageUrl || artwork.thumbnailUrl,
    artform: "Lukisan Kanvas",
    artMedium: artwork.mediumMaterial,
    creator: {
      "@type": "Person",
      name: artwork.artistName,
    },
    dateCreated: String(artwork.yearCreated),
    locationCreated: {
      "@type": "Place",
      name: "Indonesia",
    },
    contentLocation: {
      "@type": "Place",
      name: artwork.currentLocation,
    },
    url: `${siteUrl}/karya/${artwork.id}/kenali`,
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
        name: "Apresiasi Mahakarya",
        item: `${siteUrl}/karya/${artwork.id}/kenali`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: artwork.title,
        item: `${siteUrl}/karya/${artwork.id}/kenali`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[artworkSchema, breadcrumbSchema]} />
      <CloseLookingTemplate artworkTitle={artwork.title}>
        <CloseLookingViewer artwork={artwork} />
      </CloseLookingTemplate>
    </>
  );
}
