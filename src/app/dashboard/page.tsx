import React from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { Heading2, Heading3, Paragraph, SectionLabel } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { ArticleCard } from "@/components/molecules/ArticleCard";
import { PeruChanCallout } from "@/components/molecules/PeruChanCallout";
import { artService } from "@/lib/services/artService";
import { Bookmark, Award, BookOpen, PenTool, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Dashboard Ruang Belajar : Jejak Perupa",
  description: "Dashboard personal pembelajar seni untuk melacak progres belajar, materi tersimpan, dan catatan evaluasi kuis.",
};

export default function UserDashboardOverviewPage() {
  const articles = artService.getAllArticles();
  const savedArticles = articles.slice(0, 2);
  const learningPaths = artService.getAllLearningPaths();

  return (
    <MainPublicLayout>
      {/* HEADER SECTION */}
      <section className="border-b border-jp-gray-300 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <SectionLabel>Ruang Belajar Mandiri</SectionLabel>
              <Heading2 className="mt-2 text-jp-ink text-3xl sm:text-4xl">Halo, Pelajar Seni!</Heading2>
              <Paragraph className="mt-1 text-sm md:text-base text-jp-gray-700 font-sans">
                Lanjutkan perjalanan eksplorasi seni rupamu dan raih pemahaman mendalam.
              </Paragraph>
            </div>

            <div className="flex items-center gap-3 font-sans">
              <Link href="/dashboard/kontribusi">
                <Button variant="outline" size="sm" className="rounded-lg">
                  <PenTool className="h-4 w-4 mr-1.5" />
                  Kirim Tulisan
                </Button>
              </Link>
              <Link href="/jalur-belajar">
                <Button variant="primary" size="sm" className="rounded-lg">
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  Lanjut Belajar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD BODY */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16 space-y-12 font-sans">
        {/* PROGRESS METRICS (ROUNDED-XL) */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500">
                Materi Selesai
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-jp-blue-100 text-jp-blue-900">
                <BookOpen className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-3 font-heading text-3xl font-extrabold text-jp-ink">
              3
            </div>
            <p className="mt-1 text-xs text-jp-gray-500">Dari total 5 modul kurikulum</p>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500">
                Materi Tersimpan
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-jp-brown-100 text-jp-brown-900">
                <Bookmark className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-3 font-heading text-3xl font-extrabold text-jp-ink">
              {savedArticles.length}
            </div>
            <p className="mt-1 text-xs text-jp-gray-500">Artikel & biografi seniman</p>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500">
                Evaluasi Kuis
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-jp-lime-muted text-jp-ink">
                <Award className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-3 font-heading text-3xl font-extrabold text-jp-ink">
              100%
            </div>
            <p className="mt-1 text-xs text-green-700 font-semibold">Tingkat akurasi pemahaman</p>
          </div>
        </div>

        {/* ACTIVE LEARNING PATH IN PROGRESS */}
        <div className="rounded-xl border border-jp-blue-200 bg-gradient-to-r from-jp-blue-50 to-white p-6 md:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
                Kurikulum yang Sedang Diikuti
              </span>
              <Heading3 className="mt-1 text-xl text-jp-blue-900">
                {learningPaths[0]?.title}
              </Heading3>
              <p className="mt-1 text-sm text-jp-gray-700 font-prose">
                {learningPaths[0]?.description}
              </p>
            </div>
            <Link href={`/jalur-belajar/${learningPaths[0]?.slug}`}>
              <Button variant="primary" size="md" className="rounded-lg">
                Lanjutkan Modul
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* PROGRESS BAR */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-semibold text-jp-blue-900">
              <span>Progres Belajar</span>
              <span>60% Selesai</span>
            </div>
            <div className="h-3 w-full rounded-full bg-white overflow-hidden p-0.5 border border-jp-blue-200">
              <div className="h-full rounded-full bg-jp-blue-900 transition-all duration-500 w-[60%]" />
            </div>
          </div>
        </div>

        {/* SAVED ARTICLES / BOOKMARKS PREVIEW */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <SectionLabel>Koleksi Pribadi</SectionLabel>
              <Heading3 className="text-2xl text-jp-ink">Artikel yang Disimpan</Heading3>
            </div>
            <Link href="/artikel" className="inline-flex items-center gap-1 text-xs font-bold text-jp-blue-700 hover:underline">
              Jelajahi Lebih Banyak
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {savedArticles.map((art) => (
              <ArticleCard key={art.slug} {...art} />
            ))}
          </div>
        </div>

        {/* PERU-CHAN MOTIVATION TIP */}
        <PeruChanCallout
          title="Tips Belajar Hari Ini dari Peru-Chan"
          theme="blue"
          iconType="sparkles"
        >
          <p>
            Jangan terburu-buru menghafal seluruh istilah seni sekaligus. Pilihlah
            satu karya untuk dianalisis setiap minggu menggunakan fitur Close Looking!
          </p>
        </PeruChanCallout>
      </section>
    </MainPublicLayout>
  );
}
