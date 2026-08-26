import { learningPathsSeeder } from "@/lib/data/seeders/learningPathsSeeder";

export interface LearningStep {
  id: string;
  title: string;
  description: string;
  articleSlug: string;
  estimatedMinutes: number;
}

export interface LearningPathData {
  id: string;
  title: string;
  slug: string;
  level: "Pemula" | "Menengah" | "Lanjutan";
  description: string;
  iconName: string;
  totalModules: number;
  totalHours: string;
  steps: LearningStep[];
}

export const learningPathsData: LearningPathData[] = [...learningPathsSeeder];
