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

  return (
    <CloseLookingTemplate artworkTitle={artwork.title}>
      <CloseLookingViewer artwork={artwork} />
    </CloseLookingTemplate>
  );
}
