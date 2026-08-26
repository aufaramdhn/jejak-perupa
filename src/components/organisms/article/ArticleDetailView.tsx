"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArticleDetailTemplate } from "@/components/templates/public/ArticleDetailTemplate";
import { BreadcrumbNav } from "@/components/molecules/navigation/BreadcrumbNav";
import { Badge } from "@/components/atoms/typography/Badge";
import { AuthorMeta } from "@/components/molecules/article/AuthorMeta";
import { TableOfContents } from "@/components/molecules/article/TableOfContents";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { ArticleCard } from "@/components/molecules/article/ArticleCard";
import { StudioCard } from "@/components/molecules/article/StudioCard";
import { Heading1, Heading2, LeadText, Paragraph, SectionLabel } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/atoms/form/Button";
import { BookmarkButton } from "@/components/molecules/article/BookmarkButton";
import { ArrowLeft, BookOpen, Share2, HelpCircle, FileQuestion } from "lucide-react";
import { artService } from "@/lib/services/artService";
import { type ArticleFullData } from "@/lib/data/articles";

export interface ArticleDetailViewProps {
  slug: string;
  initialArticle?: ArticleFullData;
  siteUrl?: string;
}

export function ArticleDetailView({
  slug,
  initialArticle,
}: ArticleDetailViewProps) {
  const [article, setArticle] = useState<ArticleFullData | undefined>(initialArticle);
  const [isLoading, setIsLoading] = useState(!initialArticle);

  useEffect(() => {
    if (!initialArticle && slug) {
      const found = artService.getArticleBySlug(slug);
      setArticle(found);
      setIsLoading(false);
    }
  }, [slug, initialArticle]);

  if (isLoading) {
    return (
      <div className="py-24 text-center space-y-4 font-sans">
        <div className="h-8 w-8 border-2 border-jp-blue-700 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-jp-gray-500 font-mono">Memuat artikel kuratorial...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center font-sans">
        <div className="max-w-md w-full rounded-2xl border border-jp-gray-300 bg-white p-8 shadow-sm space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-jp-blue-50 text-jp-blue-900 border border-jp-blue-100 mx-auto">
            <FileQuestion className="h-7 w-7 text-jp-blue-700" />
          </div>
          <div className="space-y-1.5">
            <span className="font-mono text-xs font-bold text-jp-blue-900">Galat 404 : Halaman Belum Terpetakan</span>
            <h1 className="text-2xl font-bold font-heading text-jp-ink">Jejak yang Kamu Cari Tidak Ditemukan</h1>
            <p className="text-xs text-jp-gray-600 font-prose leading-relaxed">
              Halaman, artikel, atau karya seni yang kamu tuju belum terdaftar atau telah dipindahkan.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="primary" size="sm" className="w-full text-xs">
                Kembali ke Beranda
              </Button>
            </Link>
            <Link href="/artikel" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Jelajahi Artikel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedArticles = artService.getRelatedArticles(article.slug);
  const quiz = artService.getQuizByArticleSlug(article.slug);

  const headerContent = (
    <div>
      <div className="mb-4">
        <BreadcrumbNav
          items={[
            { label: "Artikel", href: "/artikel" },
            { label: article.category },
            { label: article.title },
          ]}
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Badge variant={article.categoryVariant} size="md">
          {article.category}
        </Badge>
        <span className="text-xs font-semibold text-jp-gray-500">
          Arsip Jejak Perupa
        </span>
      </div>

      <Heading1 className="max-w-4xl text-jp-ink">{article.title}</Heading1>

      <LeadText className="mt-5">{article.excerpt}</LeadText>

      <div className="mt-6 border-t border-jp-gray-300/80 pt-5">
        <AuthorMeta
          authorName={article.authorName}
          publishDate={article.publishedDate}
          readTime={article.readTime}
          versionLabel="Arsip Terkurasi"
        />
      </div>
    </div>
  );

  const mainContent = (
    <div className="space-y-12">
      {/* MOBILE TOC */}
      {article.tocItems.length > 0 && (
        <div className="block lg:hidden">
          <TableOfContents items={article.tocItems} />
        </div>
      )}

      {/* CONTENT SECTIONS */}
      {article.contentSections.map((sec) => (
        <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-4">
          {sec.number && (
            <span className="font-mono text-xs font-bold text-jp-blue-900 tracking-wider">
              BAB / {sec.number}
            </span>
          )}
          <Heading2>{sec.heading}</Heading2>
          {sec.paragraphs.map((p, pIdx) => (
            <Paragraph key={pIdx}>{p}</Paragraph>
          ))}

          {/* PER-CHAPTER PERU-CHAN CALLOUT */}
          {sec.peruChanTip && (
            <div className="pt-2">
              <PeruChanCallout
                title={`Catatan Peru-Chan : ${sec.heading}`}
                theme={sec.peruChanTheme || "blue"}
                iconType="lightbulb"
              >
                <p>{sec.peruChanTip}</p>
              </PeruChanCallout>
            </div>
          )}

          {/* IF THIS IS STUDIO SECTION ON SENI RUPA MURNI */}
          {sec.id === "studio" && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <StudioCard
                title="Studio Seni Lukis"
                discipline="lukis"
                description="Eksplorasi kanvas, cat minyak, akrilik, drawing, dan bahasa rupa 2 dimensi."
              />
              <StudioCard
                title="Studio Seni Patung"
                discipline="patung"
                description="Eksplorasi bentuk 3 dimensi, media kayu, batu, logam, resin, dan seni instalasi."
              />
              <StudioCard
                title="Studio Seni Grafis"
                discipline="grafis"
                description="Eksplorasi teknik cetak tinggi (cukil kayu), intaglio, sablon serigrafi, dan litografi."
              />
              <StudioCard
                title="Studio Seni Keramik"
                discipline="keramik"
                description="Eksplorasi medium lempung, pembakaran suhu tinggi, glasir, dan bentuk kriya artistik."
              />
            </div>
          )}
        </section>
      ))}

      {/* PERU-CHAN TIP CALLOUT */}
      {article.peruChanTip && (
        <PeruChanCallout
          title={article.peruChanTipTitle || "Catatan Kuratorial Peru-Chan"}
          theme="brown"
          iconType="lightbulb"
        >
          <p>{article.peruChanTip}</p>
        </PeruChanCallout>
      )}

      {/* ACADEMIC REFERENCES */}
      {article.references.length > 0 && (
        <section className="rounded-2xl border border-jp-gray-300 bg-white p-6 md:p-8 space-y-4 font-sans">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jp-blue-700">
            <BookOpen className="h-4 w-4" />
            Daftar Pustaka & Rujukan Akademik
          </div>

          <ul className="space-y-2 text-xs md:text-sm text-jp-gray-700">
            {article.references.map((ref, idx) => (
              <li key={idx} className="border-b border-jp-gray-100 pb-2 last:border-0 last:pb-0">
                <span className="font-semibold text-jp-ink">[{ref.sourceType}] </span>
                {ref.citation}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* QUIZ EVALUATION CTA (IF AVAILABLE) */}
      {quiz && (
        <div className="rounded-3xl border-2 border-jp-blue-100 bg-jp-blue-50/70 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
              Evaluasi Pemahaman
            </span>
            <Heading2 className="mt-1 text-xl text-jp-blue-900">{quiz.title}</Heading2>
            <p className="mt-1 text-xs text-jp-gray-700">{quiz.description}</p>
          </div>
          <Link href={`/jalur-belajar#${article.slug}`}>
            <Button variant="primary" size="md">
              <HelpCircle className="h-4 w-4 mr-2" />
              Ikuti Kuis Materi
            </Button>
          </Link>
        </div>
      )}

      {/* RELATED ARTICLES */}
      {relatedArticles.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-jp-gray-300 font-sans">
          <SectionLabel>Eksplorasi Lanjutan</SectionLabel>
          <Heading2 className="text-xl">Artikel Terkait</Heading2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.slug} {...rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const sidebarContent = (
    <div className="space-y-6">
      {/* DESKTOP TOC */}
      {article.tocItems.length > 0 && (
        <div className="hidden lg:block">
          <TableOfContents items={article.tocItems} />
        </div>
      )}

      {/* ARTICLE ACTION WIDGET */}
      <div className="rounded-2xl border border-jp-gray-300 bg-white p-6 shadow-jp-card space-y-4 font-sans">
        <div className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
          Aksi Pembaca
        </div>
        <p className="text-xs leading-relaxed text-jp-gray-500">
          Simpan artikel ini ke koleksi belajarmu atau bagikan ke rekan studi.
        </p>

        <div className="flex items-center gap-2 pt-2 border-t border-jp-gray-100">
          <BookmarkButton itemId={article.id} className="flex-1" />
          <Button variant="outline" size="sm" className="flex-1">
            <Share2 className="h-3.5 w-3.5 mr-1 text-jp-blue-700" />
            Bagikan
          </Button>
        </div>

        <Link href="/artikel" className="block pt-2">
          <Button variant="outline" size="sm" className="w-full">
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Kembali ke Katalog
          </Button>
        </Link>
      </div>

      {/* CURATION ARCHIVE NOTICE */}
      <div className="rounded-2xl border border-jp-lime/60 bg-jp-lime-muted/30 p-5 font-sans">
        <div className="text-xs font-bold text-jp-ink">
          Catatan Kuratorial
        </div>
        <p className="mt-2 text-xs leading-relaxed text-jp-gray-700">
          Artikel ini telah melalui kurasi standar keilmuan seni rupa dengan
          penyampaian bahasa yang bersahabat untuk mempermudah pemahaman.
        </p>
      </div>
    </div>
  );

  return (
    <ArticleDetailTemplate
      header={headerContent}
      content={mainContent}
      sidebar={sidebarContent}
      headerBgImageUrl={article.headerBgImageUrl}
      headerGradientOpacity={article.headerGradientOpacity}
      headerGradientHeight={article.headerGradientHeight}
    />
  );
}
