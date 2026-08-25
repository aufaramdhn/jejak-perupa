"use client";

import React from "react";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { ArticleEditorForm } from "@/components/organisms/ArticleEditorForm";

export default function AdminTulisArtikelPage() {
  return (
    <AdminLayout
      title="Tulis Artikel Resmi Baru"
      subtitle="Susun wacana kuratorial baru dengan auto-save draf, rich-text editor, dan penyematan tips Peru-Chan."
    >
      <ArticleEditorForm
        mode="admin-create"
        storageKey="jejak_perupa_admin_article_draft_v1"
        backUrl="/admin/artikel"
      />
    </AdminLayout>
  );
}
