import React from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { SearchBar } from "@/components/molecules/navigation/SearchBar";
import { ArticleCard } from "@/components/molecules/article/ArticleCard";
import { GlossaryCard } from "@/components/molecules/exploration/GlossaryCard";
import { ArtworkCard } from "@/components/molecules/artwork/ArtworkCard";
import { Heading1, Heading2, Heading3, Paragraph, SectionLabel } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { artService } from "@/lib/services/artService";
import { ArrowRight, Search, FileText, Users, BookOpen, Layers } from "lucide-react";

export const metadata = {
  title: "Pencarian : Jejak Perupa",
  description: "Hasil pencarian materi, seniman, karya seni, dan istilah kamus di Jejak Perupa.",
};

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";
  const results = artService.searchGlobal(query);

  const totalResults =
    results.articles.length +
    results.artists.length +
    results.glossary.length +
    results.artworks.length;

  return (
    <MainPublicLayout>
      {/* HEADER SECTION */}
      <section className="border-b border-jp-gray-300 bg-gradient-to-b from-jp-blue-50/80 via-jp-paper to-white py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 space-y-6">
          <SectionLabel>Hasil Pencarian Global</SectionLabel>
          <Heading1 className="text-jp-ink text-3xl sm:text-4xl lg:text-5xl">
            {query ? (
              <>
                Pencarian untuk: <span className="text-jp-blue-700">&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              "Pencarian Pengetahuan Seni"
            )}
          </Heading1>
          <div className="max-w-2xl font-sans">
            <SearchBar placeholder="Ketik kata kunci pencarian baru..." />
          </div>
          {query && (
            <p className="text-xs font-semibold text-jp-gray-500 font-sans">
              Ditemukan {totalResults} hasil yang relevan.
            </p>
          )}
        </div>
      </section>

      {/* RESULTS LIST */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16 space-y-12 font-sans">
        {totalResults === 0 ? (
          <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-12 text-center space-y-4">
            <Search className="mx-auto h-10 w-10 text-jp-gray-400" />
            <Heading2 className="text-xl text-jp-ink">
              Tidak ada hasil yang cocok dengan &ldquo;{query}&rdquo;
            </Heading2>
            <Paragraph className="max-w-md mx-auto text-sm text-jp-gray-500 font-prose">
              Coba gunakan kata kunci lain yang lebih umum seperti nama teknik,
              aliran seni, atau nama seniman maestro.
            </Paragraph>
          </div>
        ) : (
          <div className="space-y-16">
            {/* ARTIKEL MATCHES */}
            {results.articles.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jp-blue-700">
                  <FileText className="h-4 w-4" />
                  Artikel Edukasi ({results.articles.length})
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.articles.map((art) => (
                    <ArticleCard key={art.slug} {...art} />
                  ))}
                </div>
              </div>
            )}

            {/* SENIMAN MATCHES */}
            {results.artists.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jp-brown-700">
                  <Users className="h-4 w-4" />
                  Profil Seniman ({results.artists.length})
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {results.artists.map((artist) => (
                    <div
                      key={artist.slug}
                      className="flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs hover:border-jp-blue-700 transition"
                    >
                      <div>
                        <Badge variant="brown">{artist.artMovement}</Badge>
                        <Heading3 className="mt-3 text-2xl text-jp-ink">{artist.name}</Heading3>
                        <p className="mt-1.5 text-xs text-jp-gray-500 font-medium">
                          {artist.originCity} • {artist.studioDiscipline}
                        </p>
                        <Paragraph className="mt-3 text-sm text-jp-gray-700 leading-relaxed font-prose">
                          {artist.shortBio}
                        </Paragraph>
                      </div>
                      <div className="mt-6 pt-4 border-t border-jp-gray-100">
                        <Link href={`/seniman/${artist.slug}`}>
                          <Button variant="primary" size="sm" className="rounded-lg">
                            Buka Profil
                            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* KAMUS TERMS MATCHES */}
            {results.glossary.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jp-blue-700">
                  <BookOpen className="h-4 w-4" />
                  Istilah Kamus Seni ({results.glossary.length})
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.glossary.map((term) => (
                    <GlossaryCard key={term.id} {...term} />
                  ))}
                </div>
              </div>
            )}

            {/* ARTWORKS MATCHES */}
            {results.artworks.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jp-blue-700">
                  <Layers className="h-4 w-4" />
                  Karya Seni ({results.artworks.length})
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.artworks.map((artwork) => (
                    <ArtworkCard
                      key={artwork.id}
                      id={artwork.id}
                      slug={artwork.slug}
                      title={artwork.title}
                      artistName={artwork.artistName}
                      yearCreated={artwork.yearCreated}
                      mediumMaterial={artwork.mediumMaterial}
                      currentLocation={artwork.currentLocation}
                      imageUrl={artwork.thumbnailUrl}
                      hasCloseLooking={artwork.focalPoints.length > 0}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </MainPublicLayout>
  );
}
