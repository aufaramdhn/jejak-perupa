import React from "react";
import { ArticleDetailView } from "@/components/organisms/article/ArticleDetailView";
import { JsonLd } from "@/components/atoms/meta/JsonLd";
import { artService } from "@/lib/services/artService";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jejak-perupa.vercel.app";

export function generateStaticParams() {
  const articles = artService.getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = artService.getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Materi : Jejak Perupa",
      description: "Baca artikel dan materi pembelajaran kuratorial seni rupa nusantara di Jejak Perupa.",
    };
  }

  const articleUrl = `${siteUrl}/artikel/${article.slug}`;
  const ogImage = article.coverImageUrl || article.headerBgImageUrl || `${siteUrl}/images/mascot/peruchan-excited.png`;

  return {
    title: `${article.title} : Jejak Perupa`,
    description: article.excerpt,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: "article",
      title: `${article.title} : Jejak Perupa`,
      description: article.excerpt,
      url: articleUrl,
      siteName: "Jejak Perupa",
      publishedTime: article.publishedDate,
      authors: [article.authorName],
      section: article.category,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} : Jejak Perupa`,
      description: article.excerpt,
      images: [ogImage],
      creator: "@jejakperupa",
    },
  };
}

export default async function DynamicArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await artService.getArticleBySlugAsync(slug);

  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: article.title,
        description: article.excerpt,
        inLanguage: "id-ID",
        genre: article.category,
        articleSection: article.category,
        image: article.coverImageUrl || article.headerBgImageUrl || `${siteUrl}/images/mascot/peruchan-excited.png`,
        datePublished: article.publishedDate,
        dateModified: new Date().toISOString().split("T")[0],
        author: {
          "@type": "Person",
          name: article.authorName,
          jobTitle: "Kurator Redaksi Wacana Seni",
          worksFor: {
            "@type": "Organization",
            name: "Jejak Perupa",
          },
        },
        publisher: {
          "@type": "Organization",
          name: "Jejak Perupa",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/images/mascot/peruchan-drawing.png`,
          },
        },
        isPartOf: {
          "@type": "Periodical",
          name: "Jejak Perupa : Ensiklopedia & Wacana Seni Rupa Nusantara",
          url: siteUrl,
        },
        citation:
          article.references && article.references.length > 0
            ? article.references.map((r) => r.citation)
            : [
                "Soedarso Sp. (2006). Trilogi Seni: Penciptaan, Eksistensi, dan Kegunaan Seni. BP ISI Yogyakarta.",
              ],
        about: article.featuredArtistSlug
          ? {
              "@type": "Person",
              name: article.featuredArtistSlug.replace(/-/g, " "),
            }
          : {
              "@type": "Thing",
              name: article.category,
            },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}/artikel/${article.slug}`,
        },
      }
    : null;

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
        name: "Artikel",
        item: `${siteUrl}/artikel`,
      },
      ...(article
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: article.title,
              item: `${siteUrl}/artikel/${article.slug}`,
            },
          ]
        : []),
    ],
  };

  const related = article ? artService.getRelatedArticles(slug) : [];

  return (
    <>
      <JsonLd data={([articleSchema, breadcrumbSchema].filter(Boolean) as unknown as Record<string, unknown>[])} />
      <ArticleDetailView
        slug={slug}
        initialArticle={article}
        initialRelatedArticles={related}
        siteUrl={siteUrl}
      />
    </>
  );
}
