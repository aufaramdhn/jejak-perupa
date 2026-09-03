"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import {
  ArticleEditorForm,
  ChapterItem,
  ReferenceItem,
} from "@/components/organisms/admin/ArticleEditorForm";
import { artService } from "@/lib/services/artService";
import { Button } from "@/components/atoms/form/Button";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function AdminEditArtikelPage() {
  const params = useParams();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
      ? params.slug[0]
      : "";

  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(() => artService.getArticleBySlug(slug));

  useEffect(() => {
    if (slug) {
      artService.getArticleBySlugAsync(slug).then((found) => {
        setArticle(found);
        setIsLoading(false);
      });
    }
  }, [slug]);

  if (isLoading) {
    return (
      <AdminLayout
        title="Memuat Lembar Editor..."
        subtitle="Menyiapkan data naskah materi kuratorial..."
      >
        <div className="rounded-xl border border-jp-gray-200 bg-white p-12 text-center space-y-3 font-sans">
          <div className="h-6 w-6 border-2 border-jp-blue-700 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-jp-gray-500 font-mono">
            Memuat draf dan konten artikel...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (!article) {
    return (
      <AdminLayout
        title="Artikel Tidak Ditemukan"
        subtitle="Naskah dengan tautan slug ini tidak terdaftar di sistem penyimpanan lokal atau resmi."
      >
        <div className="rounded-xl border border-jp-gray-200 bg-white p-10 text-center space-y-4 max-w-md mx-auto font-sans">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-jp-paper border border-jp-gray-200 mx-auto text-jp-gray-600">
            <FileQuestion className="h-6 w-6 text-jp-gray-500" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-jp-ink font-heading">
              Naskah Tidak Ditemukan
            </h3>
            <p className="text-xs text-jp-gray-600 font-prose">
              Artikel dengan slug{" "}
              <code className="font-mono bg-jp-paper px-1.5 py-0.5 rounded border text-jp-blue-900 font-bold">
                {slug}
              </code>{" "}
              belum pernah disimpan atau telah dihapus.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/admin/artikel">
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="rounded-lg text-xs"
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Kembali ke Daftar Artikel
              </Button>
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  // Convert ArticleFullData sections into chapters
  const initialChapters: ChapterItem[] =
    article.contentSections?.map((sec, idx) => ({
      id: sec.id || `sec-${idx}`,
      title: sec.heading,
      content: sec.paragraphs?.join("\n\n") || "",
      peruChanTip: sec.peruChanTip || "",
      peruChanTheme: sec.peruChanTheme || "blue",
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
    headerBgColor: article.headerBgColor,
    headerGradientOpacity: article.headerGradientOpacity,
    headerGradientHeight: article.headerGradientHeight,
    chapters: initialChapters,
    references: initialReferences,
    originalSlug: slug,
    articleId: article.id,
    peruChanTip: article.peruChanTip,
    peruChanTheme: article.categoryVariant === "brown" ? ("brown" as const) : ("blue" as const),
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
