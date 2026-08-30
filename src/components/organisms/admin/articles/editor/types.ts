export interface ChapterItem {
  id: string;
  title: string;
  content: string;
  peruChanTip?: string;
  peruChanTheme?: "blue" | "brown" | "lime";
}

export interface ReferenceItem {
  id: string;
  citation: string;
}

export interface ArticleEditorFormData {
  title: string;
  authorName: string;
  category: string;
  readTime: string;
  excerpt: string;
  coverImageUrl?: string;
  headerBgImageUrl?: string;
  headerBgColor?: string;
  headerGradientOpacity?: number;
  headerGradientHeight?: number;
  chapters: ChapterItem[];
  references: ReferenceItem[];
  focusKeyword?: string;
  peruChanTip?: string;
  peruChanTheme?: "blue" | "brown" | "lime";
}
