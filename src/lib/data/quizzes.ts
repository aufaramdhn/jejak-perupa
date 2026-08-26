import { quizzesSeeder } from "@/lib/data/seeders/quizzesSeeder";

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  id: string;
  articleSlug: string;
  title: string;
  description: string;
  questions: QuizQuestionItem[];
}

export const quizzesData: QuizData[] = [...quizzesSeeder];
