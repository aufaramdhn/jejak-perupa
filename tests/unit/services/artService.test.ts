import { describe, it, expect } from "vitest";
import { artService } from "@/lib/services/artService";

describe("artService Module", () => {
  it("retrieves all articles and finds article by slug", () => {
    const articles = artService.getAllArticles();
    expect(articles.length).toBeGreaterThan(0);

    const firstSlug = articles[0].slug;
    const article = artService.getArticleBySlug(firstSlug);
    expect(article).toBeDefined();
    expect(article?.slug).toBe(firstSlug);
  });

  it("retrieves all artists and finds artist by slug", () => {
    const artists = artService.getAllArtists();
    expect(artists.length).toBeGreaterThan(0);

    const radenSaleh = artService.getArtistBySlug("raden-saleh");
    expect(radenSaleh).toBeDefined();
    expect(radenSaleh?.name).toContain("Raden Saleh");
  });

  it("retrieves learning paths and glossary terms", () => {
    const paths = artService.getAllLearningPaths();
    expect(paths.length).toBeGreaterThan(0);

    const glossary = artService.getAllGlossaryTerms();
    expect(glossary.length).toBeGreaterThan(0);
  });

  it("returns related articles excluding the current article", () => {
    const currentSlug = "seni-rupa-murni";
    const related = artService.getRelatedArticles(currentSlug);

    expect(Array.isArray(related)).toBe(true);
    expect(related.every((a) => a.slug !== currentSlug)).toBe(true);
  });
});
