import { glossarySeeder } from "@/lib/data/seeders/glossarySeeder";

export interface GlossaryData {
  id: string;
  term: string;
  slug: string;
  phoneticSpelling?: string;
  letterGroup: string; // A-Z
  category: string;
  definitionShort: string;
  definitionFull: string[];
  exampleArtworkTitle?: string;
  relatedArticleSlug?: string;
}

export const glossaryData: GlossaryData[] = [...glossarySeeder];
