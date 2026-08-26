import React from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { SearchBar } from "@/components/molecules/navigation/SearchBar";
import { ArticleGrid } from "@/components/organisms/article/ArticleGrid";
import { CategorySection } from "@/components/organisms/exploration/CategorySection";
import { ArtistHeroCard } from "@/components/organisms/artwork/ArtistHeroCard";
import { PeruChanTipBanner } from "@/components/organisms/peruchan/PeruChanTipBanner";
import { PeruChanMascotSlider } from "@/components/organisms/peruchan/PeruChanMascotSlider";
import { Heading1, Heading2, Paragraph } from "@/components/atoms/typography/Typography";
import { artService } from "@/lib/services/artService";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const allArticles = artService.getAllArticles();
  const latestArticles = allArticles.slice(0, 3);
  const featuredArtist = artService.getFeaturedArtists()[0] || artService.getAllArtists()[0];

  return (
    <MainPublicLayout>
      {/* HERO SECTION */}
      <section className="relative border-b border-jp-gray-300 bg-linear-to-b from-jp-blue-50/40 via-jp-paper to-jp-paper py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 grid gap-10 lg:gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          {/* HERO LEFT COPY */}
          <div>
            <Heading1 className="text-4xl sm:text-5xl lg:text-6xl text-jp-blue-900 leading-[1.15]">
              Belajar seni,
              <br />
              meninggalkan jejak.
            </Heading1>

            <Paragraph className="mt-6 max-w-2xl text-base md:text-lg text-jp-gray-700 leading-relaxed font-prose">
              Ruang belajar dan dokumentasi arsip seni rupa bagi pelajar,
              mahasiswa, pendidik, dan siapa saja yang ingin mengenal dunia seni
              secara terstruktur, kaya visual, dan bersahabat.
            </Paragraph>

            <div className="mt-8 max-w-2xl font-sans">
              <SearchBar size="lg" placeholder="Cari materi teori seni, teknik studio, maestro lukis, atau istilah kamus..." />
            </div>
          </div>

          {/* PERU-CHAN DYNAMIC SLIDER (ROUNDED-XL) */}
          <div className="flex justify-center lg:justify-end">
            <PeruChanMascotSlider className="w-full max-w-md shadow-md" />
          </div>
        </div>
      </section>

      {/* ARTIKEL TERBARU */}
      <div id="artikel">
        <ArticleGrid
          articles={latestArticles}
          title="Tulisan Pilihan Minggu Ini"
          viewAllHref="/artikel"
        />
      </div>

      {/* KATEGORI BELAJAR */}
      <CategorySection />

      {/* SENIMAN UNGGULAN */}
      {featuredArtist && (
        <div id="seniman">
          <ArtistHeroCard
            artistName={featuredArtist.name}
            lifespan={`${featuredArtist.birthYear} - ${featuredArtist.deathYear || "Sekarang"}`}
            bio={featuredArtist.shortBio}
            profileHref={`/seniman/${featuredArtist.slug}`}
          />
        </div>
      )}

      {/* TIPS PERU-CHAN BANNER */}
      <PeruChanTipBanner
        tipText="Jangan takut kalau karya pertamamu belum terlihat bagus. Dalam seni rupa, proses pencarian bentuk adalah bagian tak terpisahkan dari karya itu sendiri."
      />

      {/* TENTANG JEJAK PERUPA */}
      <section
        id="tentang"
        className="border-t border-jp-gray-300 bg-white py-20 text-center"
      >
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
            Tentang Jejak Perupa
          </div>

          <Heading2 className="mt-3 text-jp-ink text-3xl sm:text-4xl">
            Sebuah ruang kecil untuk belajar seni.
          </Heading2>

          <Paragraph className="mt-5 text-base md:text-lg leading-relaxed text-jp-gray-700 max-w-2xl mx-auto font-prose">
            Jejak Perupa hadir sebagai ruang belajar mandiri dan dokumentasi arsip seni
            rupa yang dapat diakses oleh pelajar, mahasiswa, pengkaji, maupun
            masyarakat umum yang ingin mengenal dunia seni secara mendalam.
          </Paragraph>

          <div className="mt-8 flex justify-center font-sans">
            <Link
              href="/tentang"
              className="inline-flex items-center gap-2 rounded-lg bg-jp-blue-900 px-6 py-3 text-sm font-bold text-white shadow-xs hover:bg-jp-blue-700 transition"
            >
              Selengkapnya tentang Jejak Perupa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </MainPublicLayout>
  );
}
