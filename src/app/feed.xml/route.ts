import { NextResponse } from "next/server";
import { artService } from "@/lib/services/artService";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jejak-perupa.vercel.app";
  const articles = artService.getAllArticles();

  const feedItems = articles
    .map((article) => {
      const articleUrl = `${siteUrl}/artikel/${article.slug}`;
      const pubDate = article.publishedDate
        ? new Date(article.publishedDate).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(articleUrl)}</link>
      <guid isPermaLink="true">${escapeXml(articleUrl)}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      <author>redaksi@jejakperupa.id (${escapeXml(article.authorName || "Kurator Jejak Perupa")})</author>
      <category>${escapeXml(article.category || "Seni Rupa")}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jejak Perupa : Catatan Perjalanan Pelajar Seni Rupa</title>
    <link>${siteUrl}</link>
    <description>Platform edukasi, dokumentasi arsip wacana, dan apresiasi seni rupa Indonesia.</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
