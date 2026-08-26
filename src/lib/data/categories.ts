import { categoriesSeeder } from "@/lib/data/seeders/categoriesSeeder";

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  colorHex: string;
  articleCount: number;
}

export const categoriesData: CategoryData[] = [...categoriesSeeder];
