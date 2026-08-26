import { artworksSeeder } from "@/lib/data/seeders/artworksSeeder";

export interface FocalPoint {
  id: string;
  xPercent: number; // 0-100
  yPercent: number; // 0-100
  title: string;
  description: string;
}

export interface ArtworkData {
  id: string;
  title: string;
  slug: string;
  artistId: string;
  artistName: string;
  yearCreated: number;
  mediumMaterial: string;
  dimensions: string;
  currentLocation: string;
  highResImageUrl: string;
  thumbnailUrl: string;
  isFeatured: boolean;
  description: string;
  colorPalette: { hex: string; name: string }[];
  focalPoints: FocalPoint[];
}

export const artworksData: ArtworkData[] = [...artworksSeeder];
