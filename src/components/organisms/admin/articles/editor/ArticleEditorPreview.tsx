"use client";

import React from "react";
import { Badge } from "@/components/atoms/typography/Badge";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { ChapterItem, ReferenceItem } from "./types";

interface ArticleEditorPreviewProps {
  title: string;
  authorName: string;
  category: string;
  readTime: string;
  excerpt: string;
  headerBgImageUrl?: string;
  headerGradientOpacity?: number;
  headerGradientHeight?: number;
  chapters: ChapterItem[];
  references: ReferenceItem[];
  peruChanTip?: string;
  peruChanTheme?: "blue" | "brown" | "lime";
}

export function ArticleEditorPreview({
  title,
  authorName,
  category,
  readTime,
  excerpt,
  headerBgImageUrl,
  headerGradientOpacity = 85,
  headerGradientHeight = 80,
  chapters,
  references,
  peruChanTip,
  peruChanTheme = "blue",
}: ArticleEditorPreviewProps) {
  return (
    <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-10 shadow-2xs space-y-8 max-w-4xl mx-auto font-sans">
      {/* PREVIEW HEADER */}
      <div className="relative overflow-hidden rounded-xl border border-jp-gray-200 p-6 md:p-8">
        {headerBgImageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${headerBgImageUrl})` }}
          />
        )}
        {headerBgImageUrl ? (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, #FAFAF7 0%, rgba(250, 250, 247, ${headerGradientOpacity / 100}) ${headerGradientHeight}%, rgba(238, 245, 255, 0.45) 100%)`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-b from-jp-blue-50/70 via-jp-paper to-white pointer-events-none" />
        )}

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="blue">{category || "Kategori Naskah"}</Badge>
            <span className="text-xs text-jp-gray-500 font-mono">
              {readTime || "5 menit"}
            </span>
          </div>

          <h1 className="font-heading text-2xl md:text-4xl font-bold text-jp-ink leading-tight">
            {title || "Judul Artikel Anda Akan Tampil di Sini"}
          </h1>

          <div className="flex items-center gap-3 text-xs text-jp-gray-600 font-mono">
            <span>Penulis: {authorName || "Nama Penulis"}</span>
            <span>·</span>
            <span>Diterbitkan Hari Ini</span>
          </div>

          {excerpt && (
            <p className="font-heading text-base md:text-lg italic text-jp-gray-700 leading-relaxed border-l-4 border-jp-blue-900 pl-4 py-1">
              {excerpt}
            </p>
          )}
        </div>
      </div>

      {/* PREVIEW CHAPTERS */}
      <div className="space-y-8">
        {chapters.map((ch, idx) => (
          <div key={ch.id} className="space-y-3">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-jp-ink">
              {idx + 1}. {ch.title || `Bab ${idx + 1}`}
            </h2>
            <div
              className="font-prose text-sm md:text-base leading-relaxed text-jp-gray-800 space-y-3"
              dangerouslySetInnerHTML={{
                __html:
                  ch.content ||
                  "<p class='italic text-jp-gray-400'>Isi uraian bab akan tampil di sini...</p>",
              }}
            />

            {/* PER-CHAPTER PERU-CHAN CALLOUT */}
            {ch.peruChanTip && (
              <div className="pt-2">
                <PeruChanCallout
                  title={`Catatan Peru-Chan : Bab ${idx + 1}`}
                  theme={ch.peruChanTheme || "blue"}
                  iconType="lightbulb"
                >
                  <p>{ch.peruChanTip}</p>
                </PeruChanCallout>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PREVIEW PERU-CHAN CALLOUT */}
      {peruChanTip && (
        <PeruChanCallout
          title="Tips Kuratorial Peru-Chan"
          theme={peruChanTheme}
        >
          <p>{peruChanTip}</p>
        </PeruChanCallout>
      )}

      {/* PREVIEW REFERENCES */}
      {references.length > 0 && (
        <div className="border-t border-jp-gray-200 pt-6 space-y-2">
          <h3 className="font-heading text-base font-bold text-jp-ink">
            Daftar Pustaka & Rujukan
          </h3>
          <ul className="space-y-1 text-xs font-prose text-jp-gray-700 list-disc pl-5">
            {references.map((r) => (
              <li key={r.id}>{r.citation}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
