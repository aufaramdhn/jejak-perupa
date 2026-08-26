import { spatialArtSeeder } from "@/lib/data/seeders/spatialArtSeeder";

export interface SpatialLocation {
  id: string;
  name: string;
  slug: string;
  category: "Museum" | "Galeri Seni" | "Monumen & Situs" | "Sanggar & Kolektif";
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  associatedArtists?: string[];
  imageUrl?: string;
  websiteUrl?: string;
}

export const spatialLocationsData: SpatialLocation[] = [...spatialArtSeeder];
