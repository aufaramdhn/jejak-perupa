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
  const article = artService.getArticleBySlug(slug);

  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: article.title,
        description: article.excerpt,
        image: article.coverImageUrl || article.headerBgImageUrl || `${siteUrl}/images/mascot/peruchan-excited.png`,
        datePublished: article.publishedDate,
        author: {
          "@type": "Person",
          name: article.authorName,
        },
        publisher: {
          "@type": "Organization",
          name: "Jejak Perupa",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/images/mascot/peruchan-drawing.png`,
          },
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

  return (
    <>
      <JsonLd data={([articleSchema, breadcrumbSchema].filter(Boolean) as unknown as Record<string, unknown>[])} />
      <ArticleDetailView slug={slug} initialArticle={article} siteUrl={siteUrl} />
    </>
  );
}
