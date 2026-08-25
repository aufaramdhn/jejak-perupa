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

export const artService = {
  // ARTIKEL
  getAllArticles(): ArticleFullData[] {
    return articlesData;
  },

  getArticleBySlug(slug: string): ArticleFullData | undefined {
    return articlesData.find((a) => a.slug === slug);
  },

  getArticlesByCategory(categoryId: string): ArticleFullData[] {
    return articlesData.filter((a) => a.categoryId === categoryId);
  },

  getRelatedArticles(currentSlug: string): ArticleFullData[] {
    const current = this.getArticleBySlug(currentSlug);
    if (!current) return articlesData.slice(0, 3);
    return articlesData
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
  getQuizByArticleSlug(articleSlug: string): QuizData | undefined {
    return quizzesData.find((q) => q.articleSlug === articleSlug);
  },

  // AGENDA & KOMUNITAS
  getAllEvents(): AgendaEventData[] {
    return agendaEventsData;
  },

  getAllCommunities(): CommunityData[] {
    return communitiesData;
  },

  // PETA SPASIAL JEJAK SENI
  getAllSpatialLocations(): SpatialLocation[] {
    return spatialLocationsData;
  },

  getSpatialLocationBySlug(slug: string): SpatialLocation | undefined {
    return spatialLocationsData.find((l) => l.slug === slug);
  },

  getSpatialLocationsByCategory(category: string): SpatialLocation[] {
    return spatialLocationsData.filter((l) => l.category === category);
  },

  getSpatialLocationsByProvince(province: string): SpatialLocation[] {
    return spatialLocationsData.filter((l) => l.province === province);
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

    const matchedArticles = articlesData.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );

    const matchedArtists = artistsData.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.artMovement.toLowerCase().includes(q) ||
        a.originCity.toLowerCase().includes(q)
    );

    const matchedGlossary = glossaryData.filter(
      (g) =>
        g.term.toLowerCase().includes(q) ||
        g.definitionShort.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    );

    const matchedArtworks = artworksData.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.artistName.toLowerCase().includes(q) ||
        w.mediumMaterial.toLowerCase().includes(q)
    );

    const matchedLocations = spatialLocationsData.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.province.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q)
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
