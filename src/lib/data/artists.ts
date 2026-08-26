import { artistsSeeder } from "@/lib/data/seeders/artistsSeeder";

export interface ArtistTimelineEvent {
  year: number;
  title: string;
  description: string;
}

export interface ArtistData {
  id: string;
  name: string;
  slug: string;
  birthYear: number;
  deathYear?: number;
  originCity: string;
  artMovement: string;
  studioDiscipline: string;
  shortBio: string;
  fullBiography: string[];
  photoUrl?: string;
  isFeatured: boolean;
  timelines: ArtistTimelineEvent[];
  relatedArtists: { name: string; slug: string; relation: string }[];
}

export const artistsData: ArtistData[] = [...artistsSeeder];
