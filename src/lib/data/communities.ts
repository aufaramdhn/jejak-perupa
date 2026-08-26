import { communitiesSeeder } from "@/lib/data/seeders/communitiesSeeder";

export interface CommunityData {
  id: string;
  name: string;
  slug: string;
  city: string;
  province: string;
  description: string;
  focusArea: string;
  websiteUrl?: string;
}

export const communitiesData: CommunityData[] = [...communitiesSeeder];
