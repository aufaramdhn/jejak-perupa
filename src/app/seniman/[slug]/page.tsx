import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtistProfileTemplate } from "@/components/templates/ArtistProfileTemplate";
import { BreadcrumbNav } from "@/components/molecules/BreadcrumbNav";
import { Badge } from "@/components/atoms/Badge";
import { Heading1, Heading2, Paragraph, SectionLabel } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { TimelineStream } from "@/components/organisms/TimelineStream";
import { ArtworkGalleryViewer } from "@/components/organisms/ArtworkGalleryViewer";
import { PeruChanCallout } from "@/components/molecules/PeruChanCallout";
import { BookmarkButton } from "@/components/molecules/BookmarkButton";
import { JsonLd } from "@/components/atoms/JsonLd";
import { MapPin, Layers, ArrowLeft, Users } from "lucide-react";
import { artService } from "@/lib/services/artService";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jejak-perupa.vercel.app";

export function generateStaticParams() {
  const artists = artService.getAllArtists();
  return artists.map((artist) => ({
    slug: artist.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = artService.getArtistBySlug(slug);

  if (!artist) {
    return {
      title: "Seniman Tidak Ditemukan : Jejak Perupa",
    };
  }

  const artistUrl = `${siteUrl}/seniman/${artist.slug}`;
  const ogImage = artist.photoUrl || `${siteUrl}/images/mascot/peruchan-investigate.png`;

  return {
    title: `Profil & Karya ${artist.name} : Jejak Perupa`,
    description: `${artist.shortBio} Pelajari biografi, lini masa peristiwa, dan galeri karya maestro ${artist.name}.`,
    alternates: {
      canonical: artistUrl,
    },
    openGraph: {
      type: "profile",
      title: `Profil ${artist.name} (${artist.birthYear} - ${artist.deathYear || "Sekarang"}) : Jejak Perupa`,
      description: artist.shortBio,
      url: artistUrl,
      siteName: "Jejak Perupa",
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: `Potret Maestro ${artist.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Profil & Karya ${artist.name}`,
      description: artist.shortBio,
      images: [ogImage],
      creator: "@jejakperupa",
    },
  };
}

export default async function ArtistProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = artService.getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  const artworks = artService.getArtworksByArtist(artist.id);

  const heroContent = (
    <div className="space-y-6 font-sans">
      <BreadcrumbNav
        items={[
          { label: "Seniman", href: "/seniman" },
          { label: artist.name },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="brown" size="md">
          {artist.artMovement}
        </Badge>
        <span className="font-mono text-xs font-semibold text-jp-brown-900">
          {artist.birthYear} - {artist.deathYear || "Kini"}
        </span>
      </div>

      <Heading1 className="max-w-4xl text-jp-ink text-4xl sm:text-5xl">{artist.name}</Heading1>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-jp-gray-700 font-medium">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-jp-blue-700" />
          <span>{artist.originCity}</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-jp-brown-700" />
          <span>{artist.studioDiscipline}</span>
        </div>
      </div>

      <Paragraph className="max-w-3xl text-base md:text-lg leading-relaxed text-jp-gray-700 font-prose">
        {artist.shortBio}
      </Paragraph>

      <div className="flex items-center gap-3 pt-2">
        <BookmarkButton itemId={artist.id} itemType="artist" />
        <Link href="/seniman">
          <Button variant="outline" size="sm" className="rounded-lg">
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            Semua Seniman
          </Button>
        </Link>
      </div>
    </div>
  );

  const biographyContent = (
    <div className="space-y-6 font-sans">
      <SectionLabel>Biografi Mendalam</SectionLabel>
      <Heading2 className="text-2xl text-jp-ink">Riwayat Hidup dan Jejak Artistik</Heading2>

      <div className="space-y-4">
        {artist.fullBiography.map((bio, idx) => (
          <Paragraph key={idx} className="text-base leading-relaxed text-jp-gray-700 font-prose">
            {bio}
          </Paragraph>
        ))}
      </div>

      <PeruChanCallout
        title="Tips Pengamatan dari Peru-Chan"
        subtitle="Melihat karya seniman dalam konteks zamannya."
        theme="brown"
        iconType="book"
      >
        <p>
          Karya-karya seni tidak lahir di ruang hampa. Memahami kondisi sosial
          politik masa hidup seniman akan membuka lapisan makna yang jauh lebih
          kaya dari sekadar estetika visual di atas kanvas.
        </p>
      </PeruChanCallout>
    </div>
  );

  const timelineContent = (
    <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs font-sans">
      <TimelineStream events={artist.timelines} />
    </div>
  );

  const galleryContent = (
    <ArtworkGalleryViewer
      artworks={artworks.map((w) => ({
        id: w.id,
        slug: w.slug,
        title: w.title,
        artistName: w.artistName,
        yearCreated: w.yearCreated,
        mediumMaterial: w.mediumMaterial,
        currentLocation: w.currentLocation,
        imageUrl: w.thumbnailUrl,
        hasCloseLooking: w.focalPoints.length > 0,
      }))}
      title={`Galeri Karya ${artist.name}`}
      sectionLabel="Katalog Karya Seni"
    />
  );

  const relatedContent = (
    <div className="space-y-6 font-sans">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jp-blue-700">
        <Users className="h-4 w-4" />
        Jejak Relasi & Pengaruh Artistik
      </div>
      <Heading2 className="text-2xl text-jp-ink">Seniman Terkait</Heading2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artist.relatedArtists.map((rel) => (
          <div
            key={rel.slug}
            className="rounded-xl border border-jp-gray-300 bg-white p-5 shadow-2xs space-y-2 hover:border-jp-blue-700 transition"
          >
            <Badge variant="blue">{rel.relation}</Badge>
            <div className="font-heading text-lg font-bold text-jp-ink">
              {rel.name}
            </div>
            <Link
              href={`/seniman/${rel.slug}`}
              className="inline-block text-xs font-semibold text-jp-blue-700 hover:underline pt-2 font-sans"
            >
              Lihat profil →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  // Structured Data Schema (Person / VisualArtist & Breadcrumbs)
  const artistSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    jobTitle: "Maestro Seni Rupa Indonesia",
    description: artist.shortBio,
    image: artist.photoUrl || `${siteUrl}/images/mascot/peruchan-investigate.png`,
    birthDate: artist.birthYear,
    deathDate: artist.deathYear,
    birthPlace: artist.originCity,
    nationality: "Indonesian",
    url: `${siteUrl}/seniman/${artist.slug}`,
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
        name: "Direktori Seniman",
        item: `${siteUrl}/seniman`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: artist.name,
        item: `${siteUrl}/seniman/${artist.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[artistSchema, breadcrumbSchema]} />
      <ArtistProfileTemplate
        hero={heroContent}
        biography={biographyContent}
        timeline={timelineContent}
        gallery={galleryContent}
        related={relatedContent}
      />
    </>
  );
}
