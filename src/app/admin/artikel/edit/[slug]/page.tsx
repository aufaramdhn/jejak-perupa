import React from "react";
import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { ArticleEditorForm, ChapterItem, ReferenceItem } from "@/components/organisms/ArticleEditorForm";
import { artService } from "@/lib/services/artService";

export function generateStaticParams() {
  const articles = artService.getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function AdminEditArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = artService.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Convert ArticleFullData sections into chapters
  const initialChapters: ChapterItem[] =
    article.contentSections?.map((sec, idx) => ({
      id: sec.id || `sec-${idx}`,
      title: sec.heading,
      content: sec.paragraphs?.map((p) => `<p>${p}</p>`).join("") || "",
    })) || [{ id: "chap-1", title: "", content: "" }];

  const initialReferences: ReferenceItem[] =
    article.references?.map((ref, idx) => ({
      id: `ref-${idx}`,
      citation: ref.citation,
    })) || [];

  const initialData = {
    title: article.title,
    authorName: article.authorName,
    category: article.category,
    readTime: article.readTime,
    excerpt: article.excerpt,
    coverImageUrl: article.coverImageUrl,
    headerBgImageUrl: article.headerBgImageUrl,
    headerGradientOpacity: article.headerGradientOpacity,
    headerGradientHeight: article.headerGradientHeight,
    chapters: initialChapters,
    references: initialReferences,
    peruChanTip: article.peruChanTip,
  };

  return (
    <AdminLayout
      title={`Edit Artikel: ${article.title}`}
      subtitle="Perbarui naskah, ubah susunan bab, dan kelola rujukan pustaka materi resmi."
    >
      <ArticleEditorForm
        mode="admin-edit"
        initialData={initialData}
        storageKey={`jejak_perupa_admin_edit_draft_${slug}`}
        backUrl="/admin/artikel"
      />
    </AdminLayout>
  );
}
