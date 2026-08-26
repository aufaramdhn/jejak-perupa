import { articlesSeeder } from "@/lib/data/seeders/articlesSeeder";

export interface ArticleReferenceItem {
  citation: string;
  sourceType: string;
  externalUrl?: string;
}

export interface ArticleFullData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categoryId: string;
  categoryVariant: "lime" | "blue" | "brown" | "gray";
  readTime: string;
  readTimeMinutes: number;
  publishedDate: string;
  authorName: string;
  coverImageUrl?: string;
  headerBgImageUrl?: string;
  headerGradientOpacity?: number;
  headerGradientHeight?: number;
  featuredArtistSlug?: string;
  peruChanTip?: string;
  peruChanTipTitle?: string;
  tocItems: { id: string; title: string; number?: string }[];
  contentSections: {
    id: string;
    number?: string;
    heading: string;
    paragraphs: string[];
    peruChanTip?: string;
    peruChanTheme?: "blue" | "brown" | "lime";
  }[];
  references: ArticleReferenceItem[];
  relatedSlugs: string[];
}

export const articlesData: ArticleFullData[] = [...articlesSeeder];
