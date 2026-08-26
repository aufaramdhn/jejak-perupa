import { categoriesSeeder } from "./categoriesSeeder";
import { articlesSeeder } from "./articlesSeeder";
import { artistsSeeder } from "./artistsSeeder";
import { artworksSeeder } from "./artworksSeeder";
import { glossarySeeder } from "./glossarySeeder";
import { learningPathsSeeder } from "./learningPathsSeeder";
import { quizzesSeeder } from "./quizzesSeeder";
import { agendaSeeder } from "./agendaSeeder";
import { communitiesSeeder } from "./communitiesSeeder";
import { spatialArtSeeder } from "./spatialArtSeeder";

export {
  categoriesSeeder,
  articlesSeeder,
  artistsSeeder,
  artworksSeeder,
  glossarySeeder,
  learningPathsSeeder,
  quizzesSeeder,
  agendaSeeder,
  communitiesSeeder,
  spatialArtSeeder,
};

export interface MasterSeederPayload {
  categories: typeof categoriesSeeder;
  articles: typeof articlesSeeder;
  artists: typeof artistsSeeder;
  artworks: typeof artworksSeeder;
  glossary: typeof glossarySeeder;
  learningPaths: typeof learningPathsSeeder;
  quizzes: typeof quizzesSeeder;
  agenda: typeof agendaSeeder;
  communities: typeof communitiesSeeder;
  spatialArt: typeof spatialArtSeeder;
}

export function getAllSeederData(): MasterSeederPayload {
  return {
    categories: [...categoriesSeeder],
    articles: [...articlesSeeder],
    artists: [...artistsSeeder],
    artworks: [...artworksSeeder],
    glossary: [...glossarySeeder],
    learningPaths: [...learningPathsSeeder],
    quizzes: [...quizzesSeeder],
    agenda: [...agendaSeeder],
    communities: [...communitiesSeeder],
    spatialArt: [...spatialArtSeeder],
  };
}
