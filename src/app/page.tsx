import React from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { SearchBar } from "@/components/molecules/SearchBar";
import { ArticleGrid } from "@/components/organisms/ArticleGrid";
import { CategorySection } from "@/components/organisms/CategorySection";
import { ArtistHeroCard } from "@/components/organisms/ArtistHeroCard";
import { PeruChanTipBanner } from "@/components/organisms/PeruChanTipBanner";
import { Heading1, Heading2, Paragraph } from "@/components/atoms/Typography";
import { Sparkles, ArrowRight } from "lucide-react";

export default function HomePage() {
  const latestArticles = [
    {
      title: "Mengenal Program Studi Seni Rupa Murni",
      slug: "seni-rupa-murni",
      excerpt:
        "Mengenal Seni Rupa Murni, kehidupan perkuliahannya, 4 studio utama, hingga berbagai kemungkinan profesi setelah lulus.",
      category: "Pendidikan",
      categoryVariant: "lime" as const,
      readTime: "8 menit membaca",
    },
    {
      title: "Mengenal Dasar Teknik Cat Air",
      slug: "dasar-teknik-cat-air",
      excerpt:
        "Prinsip dasar yang penting dipelajari sebelum bereksperimen dengan transparansi pigmen dan basah-pada-kering.",
      category: "Teknik",
      categoryVariant: "blue" as const,
      readTime: "6 menit membaca",
    },
    {
      title: "Mengapa Kita Perlu Belajar Sejarah Seni?",
      slug: "mengapa-belajar-sejarah-seni",
      excerpt:
        "Sejarah bukan sekadar menghafal tahun dan nama tokoh, melainkan membaca evolusi gagasan dan peradaban manusia.",
      category: "Sejarah",
      categoryVariant: "brown" as const,
      readTime: "7 menit membaca",
    },
  ];

  return (
    <MainPublicLayout>
      {/* HERO SECTION */}
      <section className="overflow-hidden border-b border-jp-gray-300 bg-gradient-to-b from-jp-blue-50/90 via-jp-paper to-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:gap-16 px-6 sm:px-8 lg:px-12 lg:grid-cols-[1.25fr_380px]">
          <div>
            {/* Clean editorial introduction without generic AI pill badge */}
            <div className="mb-4 text-xs font-semibold tracking-wider text-jp-blue-700 uppercase">
              Platform Arsip & Pembelajaran Seni Rupa Indonesia
            </div>

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

          {/* PERU-CHAN MASCOT HERO CARD (ROUNDED-XL) */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-1.5 rounded-xl bg-jp-blue-100/60 blur-md" />

            <div className="relative z-10 w-full max-w-sm flex flex-col items-center justify-center rounded-xl border border-jp-blue-200 bg-white/95 p-8 text-center shadow-xs backdrop-blur">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-jp-blue-50 text-jp-blue-900 border border-jp-blue-200 shadow-2xs">
                <Sparkles className="h-10 w-10 text-jp-blue-700" />
              </div>
              <span className="mt-4 font-heading text-2xl font-bold text-jp-blue-900">
                Peru-Chan
              </span>
              <span className="mt-1 text-xs font-semibold text-jp-gray-500 uppercase tracking-wider font-sans">
                Maskot Edukasi Jejak Perupa
              </span>
              <p className="mt-3 text-xs md:text-sm leading-relaxed text-jp-gray-700 font-prose">
                Siap mendampingi catatan perjalanan belajarmu di setiap bab!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ARTIKEL TERBARU */}
      <div id="artikel">
        <ArticleGrid
          articles={latestArticles}
          title="Tulisan Pilihan Minggu Ini"
          sectionLabel="Eksplorasi Terbaru"
          viewAllHref="/artikel"
        />
      </div>

      {/* KATEGORI BELAJAR */}
      <CategorySection />

      {/* SENIMAN UNGGULAN */}
      <div id="seniman">
        <ArtistHeroCard
          artistName="Raden Saleh"
          lifespan="1811 - 1880"
          bio="Pelopor seni lukis modern Indonesia dengan gaya Romantisisme dramatis. Perjalanan panjangnya di Eropa dan dedikasinya pada identitas nusantara meninggalkan jejak abadi dalam sejarah seni rupa dunia."
          profileHref="/seniman/raden-saleh"
        />
      </div>

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
