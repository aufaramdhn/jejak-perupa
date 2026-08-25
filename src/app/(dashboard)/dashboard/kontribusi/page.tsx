"use client";

import React from "react";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { ArticleEditorForm } from "@/components/organisms/admin/ArticleEditorForm";
import {
  Heading1,
  Paragraph,
  SectionLabel,
} from "@/components/atoms/typography/Typography";

export default function KontribusiArtikelPage() {
  return (
    <MainPublicLayout>
      <div className="bg-jp-paper min-h-screen py-10 lg:py-14">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 space-y-8">
          {/* HEADER INTRO */}
          <div className="border-b border-jp-gray-300 pb-6 space-y-2.5">
            <Heading1 className="text-3xl lg:text-4xl text-jp-ink">
              Tulis & Kirimkan Naskah Wacana Seni Rupa
            </Heading1>
            <Paragraph className="text-sm md:text-base text-jp-gray-700 font-prose max-w-2xl leading-relaxed">
              Bagikan hasil analisis visual, telaah sejarah seni, atau catatan eksperimen studiomu. Setiap naskah yang dikirimkan akan ditinjau secara berkala oleh Kurator Redaksi Jejak Perupa sebelum diterbitkan ke katalog publik.
            </Paragraph>
          </div>

          {/* REUSABLE ARTICLE EDITOR FORM WITH AUTO-SAVE & DRAFT RECOVERY */}
          <ArticleEditorForm
            mode="public-contribute"
            storageKey="jejak_perupa_contributor_draft_v1"
            backUrl="/dashboard"
          />
        </div>
      </div>
    </MainPublicLayout>
  );
}
