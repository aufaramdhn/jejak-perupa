import { articlesData, type ArticleFullData } from "@/lib/data/articles";
import { artistsData, type ArtistData } from "@/lib/data/artists";
import { artworksData, type ArtworkData } from "@/lib/data/artworks";
import { categoriesData, type CategoryData } from "@/lib/data/categories";
import { glossaryData, type GlossaryData } from "@/lib/data/glossary";
import { learningPathsData, type LearningPathData } from "@/lib/data/learningPaths";
import { quizzesData, type QuizData } from "@/lib/data/quizzes";
import { agendaEventsData, type AgendaEventData } from "@/lib/data/agenda";
import { communitiesData, type CommunityData } from "@/lib/data/communities";
import { spatialLocationsData, type SpatialLocation } from "@/lib/data/spatialArt";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

let inMemoryArticles: ArticleFullData[] = [...articlesData];
let hasSyncedWithDB = false;

function mapDBToArticle(row: any): ArticleFullData {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    category: row.category,
    categoryId: row.category_id,
    categoryVariant: row.category_variant || "blue",
    readTime: row.read_time,
    readTimeMinutes: row.read_time_minutes || 5,
    publishedDate: row.published_date,
    authorName: row.author_name,
    coverImageUrl: row.cover_image_url || undefined,
    headerBgImageUrl: row.header_bg_image_url || undefined,
    headerGradientOpacity: row.header_gradient_opacity ?? 85,
    headerGradientHeight: row.header_gradient_height ?? 80,
    featuredArtistSlug: row.featured_artist_slug || undefined,
    peruChanTip: row.peru_chan_tip || undefined,
    peruChanTipTitle: row.peru_chan_tip_title || undefined,
    tocItems: Array.isArray(row.toc_items) ? row.toc_items : [],
    contentSections: Array.isArray(row.content_sections) ? row.content_sections : [],
    references: Array.isArray(row.references) ? row.references : [],
    relatedSlugs: Array.isArray(row.related_slugs) ? row.related_slugs : [],
  };
}

function mapArticleToDB(art: ArticleFullData) {
  return {
    id: art.id,
    title: art.title,
    slug: art.slug,
    excerpt: art.excerpt,
    category: art.category,
    category_id: art.categoryId,
    category_variant: art.categoryVariant || "blue",
    read_time: art.readTime,
    read_time_minutes: art.readTimeMinutes || 5,
    published_date: art.publishedDate,
    author_name: art.authorName,
    cover_image_url: art.coverImageUrl || null,
    header_bg_image_url: art.headerBgImageUrl || null,
    header_gradient_opacity: art.headerGradientOpacity ?? 85,
    header_gradient_height: art.headerGradientHeight ?? 80,
    featured_artist_slug: art.featuredArtistSlug || null,
    peru_chan_tip: art.peruChanTip || null,
    peru_chan_tip_title: art.peruChanTipTitle || null,
    toc_items: art.tocItems || [],
    content_sections: art.contentSections || [],
    references: art.references || [],
    related_slugs: art.relatedSlugs || [],
    updated_at: new Date().toISOString(),
  };
}

function getStoredArticles(): ArticleFullData[] {
  if (typeof window === "undefined") return inMemoryArticles;

  // Trigger non-blocking database fetch once on client
  if (!hasSyncedWithDB && isSupabaseConfigured()) {
    hasSyncedWithDB = true;
    artService.syncWithDatabase().catch((e) => {
      console.warn("Supabase auto-sync failed:", e);
    });
  }

  try {
    const saved = localStorage.getItem("jejak_perupa_custom_articles_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryArticles = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load articles from storage", e);
  }
  return inMemoryArticles;
}

function saveStoredArticles(articles: ArticleFullData[]) {
  inMemoryArticles = articles;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("jejak_perupa_custom_articles_v1", JSON.stringify(articles));
    } catch (e) {
      console.warn("Failed to save articles to storage", e);
    }
  }
}

export const artService = {
  // DATABASE SYNCHRONIZATION
  async syncWithDatabase(): Promise<ArticleFullData[]> {
    if (!isSupabaseConfigured()) return getStoredArticles();

    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase articles fetch error:", error.message);
        return getStoredArticles();
      }

      if (data && data.length > 0) {
        const remoteArticles = data.map(mapDBToArticle);
        saveStoredArticles(remoteArticles);
        return remoteArticles;
      }
    } catch (e) {
      console.warn("Supabase articles sync exception:", e);
    }
    return getStoredArticles();
  },

  // ARTIKEL (READ)
  getAllArticles(): ArticleFullData[] {
    return getStoredArticles();
  },

  getArticleBySlug(slug: string): ArticleFullData | undefined {
    return getStoredArticles().find((a) => a.slug === slug);
  },

  // ARTIKEL (WRITE & SYNC)
  async addArticle(article: ArticleFullData): Promise<void> {
    const list = getStoredArticles();
    const updated = [article, ...list.filter((a) => a.id !== article.id && a.slug !== article.slug)];
    saveStoredArticles(updated);

    if (isSupabaseConfigured()) {
      try {
        const payload = mapArticleToDB(article);
        const { error } = await supabase.from("articles").upsert(payload, { onConflict: "slug" });
        if (error) {
          console.error("Supabase addArticle error:", error.message);
        }
      } catch (e) {
        console.warn("Supabase insert error:", e);
      }
    }
  },

  async updateArticle(slug: string, updatedData: Partial<ArticleFullData>): Promise<void> {
    const list = getStoredArticles();
    const index = list.findIndex((a) => a.slug === slug);
    if (index !== -1) {
      const updatedArticle = { ...list[index], ...updatedData };
      list[index] = updatedArticle;
      saveStoredArticles([...list]);

      if (isSupabaseConfigured()) {
        try {
          const payload = mapArticleToDB(updatedArticle);
          const { error } = await supabase
            .from("articles")
            .update(payload)
            .eq("slug", slug);
          if (error) {
            console.error("Supabase updateArticle error:", error.message);
          }
        } catch (e) {
          console.warn("Supabase update error:", e);
        }
      }
    }
  },

  async deleteArticle(slug: string): Promise<void> {
    const list = getStoredArticles();
    const updated = list.filter((a) => a.slug !== slug);
    saveStoredArticles(updated);

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from("articles").delete().eq("slug", slug);
        if (error) {
          console.error("Supabase deleteArticle error:", error.message);
        }
      } catch (e) {
        console.warn("Supabase delete error:", e);
      }
    }
  },

  resetArticlesToSeeder(): void {
    saveStoredArticles([...articlesData]);
  },

  getArticlesByCategory(categoryId: string): ArticleFullData[] {
    return getStoredArticles().filter((a) => a.categoryId === categoryId);
  },

  getRelatedArticles(currentSlug: string): ArticleFullData[] {
    const current = this.getArticleBySlug(currentSlug);
    const list = getStoredArticles();
    if (!current) return list.slice(0, 3);
    return list
      .filter((a) => a.slug !== currentSlug)
      .filter(
        (a) =>
          current.relatedSlugs?.includes(a.slug) ||
          a.categoryId === current.categoryId
      )
      .slice(0, 3);
  },

  // KATEGORI
  getAllCategories(): CategoryData[] {
    return categoriesData;
  },

  getCategoryBySlug(slug: string): CategoryData | undefined {
    return categoriesData.find((c) => c.slug === slug);
  },

  // SENIMAN
  getAllArtists(): ArtistData[] {
    return artistsData;
  },

  getFeaturedArtists(): ArtistData[] {
    return artistsData.filter((a) => a.isFeatured);
  },

  getArtistBySlug(slug: string): ArtistData | undefined {
    return artistsData.find((a) => a.slug === slug);
  },

  // KARYA SENI
  getAllArtworks(): ArtworkData[] {
    return artworksData;
  },

  getArtworkByIdOrSlug(idOrSlug: string): ArtworkData | undefined {
    return artworksData.find((a) => a.id === idOrSlug || a.slug === idOrSlug);
  },

  getArtworksByArtist(artistId: string): ArtworkData[] {
    return artworksData.filter((a) => a.artistId === artistId);
  },

  // GLOSARIUM
  getAllGlossaryTerms(): GlossaryData[] {
    return glossaryData.sort((a, b) => a.term.localeCompare(b.term));
  },

  getGlossaryTermBySlug(slug: string): GlossaryData | undefined {
    return glossaryData.find((g) => g.slug === slug);
  },

  getGlossaryByLetter(letter: string): GlossaryData[] {
    return glossaryData.filter(
      (g) => g.letterGroup.toUpperCase() === letter.toUpperCase()
    );
  },

  // JALUR BELAJAR
  getAllLearningPaths(): LearningPathData[] {
    return learningPathsData;
  },

  getLearningPathBySlug(slug: string): LearningPathData | undefined {
    return learningPathsData.find((p) => p.slug === slug);
  },

  // KUIS
  getAllQuizzes(): QuizData[] {
    return quizzesData;
  },

  getQuizByArticleSlug(articleSlug: string): QuizData | undefined {
    return quizzesData.find((q) => q.articleSlug === articleSlug);
  },

  // AGENDA & EVENT
  getAllEvents(): AgendaEventData[] {
    return agendaEventsData;
  },

  getEventBySlug(slug: string): AgendaEventData | undefined {
    return agendaEventsData.find((e) => e.slug === slug);
  },

  // KOMUNITAS & RUANG SENI
  getAllCommunities(): CommunityData[] {
    return communitiesData;
  },

  getCommunityBySlug(slug: string): CommunityData | undefined {
    return communitiesData.find((c) => c.slug === slug);
  },

  // PETA SENI & LOKASI SPASIAL
  getAllSpatialLocations(): SpatialLocation[] {
    return spatialLocationsData;
  },

  getSpatialLocationBySlug(slug: string): SpatialLocation | undefined {
    return spatialLocationsData.find((l) => l.slug === slug);
  },

  getLocationsByCategory(category: SpatialLocation["category"]): SpatialLocation[] {
    return spatialLocationsData.filter((l) => l.category === category);
  },

  getLocationsByProvince(province: string): SpatialLocation[] {
    return spatialLocationsData.filter(
      (l) => l.province.toLowerCase() === province.toLowerCase()
    );
  },

  // PENCARIAN GLOBAL
  searchGlobal(query: string) {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        articles: [],
        artists: [],
        glossary: [],
        artworks: [],
        locations: [],
      };
    }

    const matchedArticles = getStoredArticles().filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );

    const matchedArtists = artistsData.filter(
      (ar) =>
        ar.name.toLowerCase().includes(q) ||
        ar.artMovement.toLowerCase().includes(q) ||
        ar.shortBio.toLowerCase().includes(q)
    );

    const matchedGlossary = glossaryData.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.definitionShort.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    );

    const matchedArtworks = artworksData.filter(
      (artw) =>
        artw.title.toLowerCase().includes(q) ||
        artw.artistName.toLowerCase().includes(q) ||
        artw.mediumMaterial.toLowerCase().includes(q)
    );

    const matchedLocations = spatialLocationsData.filter(
      (loc) =>
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.province.toLowerCase().includes(q)
    );

    return {
      articles: matchedArticles,
      artists: matchedArtists,
      glossary: matchedGlossary,
      artworks: matchedArtworks,
      locations: matchedLocations,
    };
  },
};

