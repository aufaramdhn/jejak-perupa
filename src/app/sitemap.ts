import { MetadataRoute } from "next";
import { artService } from "@/lib/services/artService";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jejak-perupa.vercel.app";
  const currentDate = new Date();

  // 1. Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/seniman`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/jalur-belajar`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/kamus`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agenda`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/peta-seni`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/komunitas`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 2. Dynamic Article Pages (/artikel/[slug])
  const articles = artService.getAllArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/artikel/${article.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // 3. Dynamic Artist Pages (/seniman/[slug])
  const artists = artService.getAllArtists();
  const artistRoutes: MetadataRoute.Sitemap = artists.map((artist) => ({
    url: `${baseUrl}/seniman/${artist.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Dynamic Learning Path Pages (/jalur-belajar/[slug])
  const learningPaths = artService.getAllLearningPaths();
  const learningPathRoutes: MetadataRoute.Sitemap = learningPaths.map((path) => ({
    url: `${baseUrl}/jalur-belajar/${path.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 5. Dynamic Artwork Close Looking Pages (/karya/[id]/kenali)
  const artworks = artService.getAllArtworks();
  const artworkRoutes: MetadataRoute.Sitemap = artworks.map((artwork) => ({
    url: `${baseUrl}/karya/${artwork.id}/kenali`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...artistRoutes,
    ...learningPathRoutes,
    ...artworkRoutes,
  ];
}
