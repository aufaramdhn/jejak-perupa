"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { ArticleCoverPlaceholder } from "@/components/atoms/media/ArticleCoverPlaceholder";
import { artService } from "@/lib/services/artService";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useCategories } from "@/lib/categoryContext";
import { useModal } from "@/lib/modalContext";
import { submissionsSeeder, type SubmissionItem } from "@/lib/data/seeders/submissionsSeeder";
import { type ArticleFullData } from "@/lib/data/articles";
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  User,
  Sparkles,
  BookOpen,
  FileQuestion,
  Plus,
  Trash2,
  Layers,
  Calendar,
  Tag,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChapterReviewItem {
  id: string;
  title: string;
  content: string;
  peruChanTip?: string;
  peruChanTheme?: "blue" | "brown" | "lime";
}

function parseContentToChapters(
  rawContent: string,
  existingChapters?: { title: string; content: string; peruChanTip?: string; peruChanTheme?: "blue" | "brown" | "lime" }[]
): ChapterReviewItem[] {
  if (existingChapters && existingChapters.length > 0) {
    // Check if the single chapter contains markdown headings (##)
    if (existingChapters.length === 1 && existingChapters[0].content.includes("## ")) {
      return splitMarkdownHeadings(existingChapters[0].content);
    }

    return existingChapters.map((ch, idx) => ({
      id: `chap-${idx + 1}`,
      title: ch.title || `Bab ${idx + 1}`,
      content: ch.content || "",
      peruChanTip: ch.peruChanTip || "",
      peruChanTheme: ch.peruChanTheme || "blue",
    }));
  }

  return splitMarkdownHeadings(rawContent);
}

function splitMarkdownHeadings(markdown: string): ChapterReviewItem[] {
  if (!markdown || !markdown.trim()) {
    return [{ id: "chap-1", title: "Pembahasan Naskah", content: "", peruChanTip: "", peruChanTheme: "blue" }];
  }

  // Split by markdown ## heading while preserving sections
  const sections = markdown.split(/\n(?=##\s+)/g).filter((s) => s.trim().length > 0);

  if (sections.length > 1) {
    return sections.map((sec, idx) => {
      const match = sec.match(/^##\s+(.+)$/m);
      const title = match ? match[1].trim() : `Bab ${idx + 1}`;
      const content = sec.replace(/^##\s+.+$/m, "").trim();
      return {
        id: `chap-${idx + 1}`,
        title,
        content,
        peruChanTip: "",
        peruChanTheme: "blue" as const,
      };
    });
  }

  return [
    {
      id: "chap-1",
      title: "Pembahasan Utama",
      content: markdown.replace(/^##\s+.+$/m, "").trim(),
      peruChanTip: "",
      peruChanTheme: "blue" as const,
    },
  ];
}

export default function AdminCurationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : "";
  const subId = decodeURIComponent(rawId);

  const { confirm, alert } = useModal();
  const { categories, updateCategory, addCategory } = useCategories();

  const [isLoading, setIsLoading] = useState(true);
  const [submission, setSubmission] = useState<SubmissionItem | null>(null);
  const [chapters, setChapters] = useState<ChapterReviewItem[]>([]);
  const [references, setReferences] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load submission from Supabase Cloud / Fallback
  useEffect(() => {
    let isMounted = true;

    async function fetchSubmission() {
      if (!subId) return;

      // 1. Check Supabase art_submissions
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from("art_submissions")
            .select("*")
            .eq("id", subId)
            .maybeSingle();

          if (!error && data) {
            const rawChapters = parseContentToChapters(data.content_markdown || "");
            const item: SubmissionItem = {
              id: data.id,
              title: data.title,
              author: data.contributor_name || "Kontributor Seni",
              category: "Wacana Seni",
              date: new Date(data.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              status:
                data.status === "APPROVED"
                  ? "Disetujui"
                  : data.status === "REJECTED"
                  ? "Perlu Revisi"
                  : "Menunggu Kurasi",
              excerpt: (data.content_markdown || "").slice(0, 200),
              coverImageUrl: data.cover_image_url || undefined,
              chapters: rawChapters,
              references: [],
              peruChanTip: "",
              peruChanTheme: "blue",
            };

            if (isMounted) {
              setSubmission(item);
              setChapters(rawChapters);
              setReferences([]);
              setIsLoading(false);
              return;
            }
          }

          // Also check Supabase articles table
          const { data: artData } = await supabase
            .from("articles")
            .select("*")
            .or(`id.eq.${subId},slug.eq.${subId}`)
            .maybeSingle();

          if (artData) {
            const rawChapters = Array.isArray(artData.content_sections)
              ? artData.content_sections.map((s: any, idx: number) => ({
                  id: `chap-${idx + 1}`,
                  title: s.heading,
                  content: Array.isArray(s.paragraphs) ? s.paragraphs.join("\n\n") : "",
                  peruChanTip: s.peruChanTip || s.peru_chan_tip || "",
                  peruChanTheme: s.peruChanTheme || s.peru_chan_theme || "blue",
                }))
              : parseContentToChapters(artData.excerpt || "");

            const parsedRefs = Array.isArray(artData.references)
              ? artData.references.map((r: any) => (typeof r === "string" ? r : r.citation))
              : [];

            const item: SubmissionItem = {
              id: artData.id,
              title: artData.title,
              author: artData.author_name || "Kontributor Seni",
              category: artData.category || "Teori Seni",
              date: artData.published_date || new Date(artData.created_at).toLocaleDateString("id-ID"),
              status:
                artData.status === "PUBLISHED"
                  ? "Disetujui"
                  : "Menunggu Kurasi",
              excerpt: artData.excerpt || "",
              coverImageUrl: artData.cover_image_url || undefined,
              chapters: rawChapters,
              references: parsedRefs,
              peruChanTip: artData.peru_chan_tip || "",
              peruChanTheme: "blue",
            };

            if (isMounted) {
              setSubmission(item);
              setChapters(rawChapters);
              setReferences(parsedRefs);
              setIsLoading(false);
              return;
            }
          }
        } catch (e) {
          console.warn("Supabase single submission fetch exception:", e);
        }
      }

      // 2. Fallback check local storage
      try {
        const stored = localStorage.getItem("jejak_perupa_admin_curation_submissions_v1");
        if (stored) {
          const list: SubmissionItem[] = JSON.parse(stored);
          const found = list.find((s) => s.id === subId || s.title === subId);
          if (found) {
            const rawChapters = parseContentToChapters("", found.chapters);
            if (isMounted) {
              setSubmission(found);
              setChapters(rawChapters);
              setReferences(found.references || []);
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (e) {}

      // 3. Fallback check initial seeder
      const seederFound = submissionsSeeder.find((s) => s.id === subId);
      if (seederFound && isMounted) {
        const rawChapters = parseContentToChapters("", seederFound.chapters);
        setSubmission(seederFound);
        setChapters(rawChapters);
        setReferences(seederFound.references || []);
      }

      if (isMounted) {
        setIsLoading(false);
      }
    }

    fetchSubmission();

    return () => {
      isMounted = false;
    };
  }, [subId]);

  // Handler for updating a specific chapter's Peru-Chan note & theme
  const handleUpdateChapterNote = (
    idx: number,
    tip: string,
    theme?: "blue" | "brown" | "lime"
  ) => {
    setChapters((prev) =>
      prev.map((ch, i) =>
        i === idx
          ? {
              ...ch,
              peruChanTip: tip,
              peruChanTheme: theme ?? ch.peruChanTheme ?? "blue",
            }
          : ch
      )
    );
  };

  const handleToggleChapterNote = (idx: number) => {
    setChapters((prev) =>
      prev.map((ch, i) => {
        if (i === idx) {
          const hasNote = ch.peruChanTip && ch.peruChanTip.trim().length > 0;
          return {
            ...ch,
            peruChanTip: hasNote ? "" : "Tuliskan catatan kuratorial, tips analisis, atau poin penting untuk bab ini...",
            peruChanTheme: ch.peruChanTheme || "blue",
          };
        }
        return ch;
      })
    );
  };

  const handleApprove = async () => {
    if (!submission || isProcessing) return;
    const confirmed = await confirm({
      title: "Terbitkan Naskah Ini?",
      message: `Naskah "${submission.title}" beserta catatan kuratorial Peru-Chan pada setiap bab akan segera dipublikasikan ke katalog artikel publik.`,
      confirmLabel: "Ya, Terbitkan Naskah",
      cancelLabel: "Batal",
      variant: "primary",
      iconType: "help",
    });

    if (!confirmed) return;

    setIsProcessing(true);
    try {
      // 1. Approve category if needed
      const matchedCat = categories.find(
        (c) => c.name.toLowerCase() === submission.category.toLowerCase()
      );
      if (matchedCat && matchedCat.isApproved === false) {
        updateCategory(matchedCat.id, { isApproved: true });
      } else if (!matchedCat) {
        addCategory({ name: submission.category, isApproved: true });
      }

      // 2. Create published article payload
      const slug =
        submission.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-") || `artikel-${Date.now()}`;

      const firstChapterTheme = chapters.find((c) => c.peruChanTip)?.peruChanTheme || "blue";

      const publishedArticle: ArticleFullData = {
        id: submission.id.startsWith("art-") ? submission.id : `art-${Date.now()}`,
        title: submission.title,
        slug,
        excerpt: submission.excerpt,
        coverImageUrl: submission.coverImageUrl,
        category: submission.category,
        categoryId: matchedCat ? matchedCat.id : "cat-sejarah",
        categoryVariant: firstChapterTheme,
        readTime: "7 menit membaca",
        readTimeMinutes: 7,
        publishedDate: new Date().toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        authorName: submission.author,
        peruChanTip: chapters[0]?.peruChanTip || undefined,
        peruChanTipTitle: "Catatan Editorial Peru-Chan",
        tocItems: chapters.map((ch, idx) => ({
          id: `chap-${idx + 1}`,
          title: ch.title,
          number: (idx + 1).toString().padStart(2, "0"),
        })),
        contentSections: chapters.map((ch, idx) => ({
          id: `sec-${idx + 1}`,
          number: (idx + 1).toString().padStart(2, "0"),
          heading: ch.title,
          paragraphs: ch.content.split("\n\n").filter(Boolean),
          peruChanTip: ch.peruChanTip?.trim() || undefined,
          peruChanTheme: ch.peruChanTheme || "blue",
        })),
        references: references.map((r) => ({
          citation: r,
          sourceType: "Akademik",
        })),
        relatedSlugs: [],
      };

      // 3. Publish to Supabase articles & sync
      await artService.addArticle(publishedArticle);

      if (isSupabaseConfigured()) {
        await supabase
          .from("art_submissions")
          .update({ status: "APPROVED" })
          .eq("id", submission.id);

        await supabase
          .from("articles")
          .update({ status: "PUBLISHED" })
          .or(`id.eq.${submission.id},slug.eq.${slug}`);
      }

      await alert({
        title: "Naskah Berhasil Diterbitkan",
        message: `Artikel "${submission.title}" kini telah resmi tayang di katalog publik Jejak Perupa.`,
        type: "success",
      });

      router.push("/admin/kurasi");
    } catch (e) {
      console.error("Curation approval failed:", e);
      await alert({
        title: "Gagal Menerbitkan",
        message: "Terjadi kendala saat menerbitkan naskah. Silakan coba lagi.",
        type: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRequestRevision = async () => {
    if (!submission || isProcessing) return;
    const confirmed = await confirm({
      title: "Minta Revisi Penulis?",
      message: `Status naskah "${submission.title}" akan diubah menjadi "Perlu Revisi" agar penulis dapat menyempurnakan pembahasannya.`,
      confirmLabel: "Minta Revisi",
      cancelLabel: "Batal",
      variant: "warning",
      iconType: "alert",
    });

    if (!confirmed) return;

    setIsProcessing(true);
    try {
      if (isSupabaseConfigured()) {
        await supabase
          .from("art_submissions")
          .update({ status: "REJECTED" })
          .eq("id", submission.id);

        await supabase
          .from("articles")
          .update({ status: "DRAFT" })
          .or(`id.eq.${submission.id},slug.eq.${submission.id}`);
      }

      await alert({
        title: "Permintaan Revisi Terkirim",
        message: "Status naskah telah diperbarui menjadi 'Perlu Revisi'.",
        type: "info",
      });

      router.push("/admin/kurasi");
    } catch (e) {
      console.error("Revision request failed:", e);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout
        title="Memuat Lembar Kurasi..."
        subtitle="Menyiapkan pratinjau lengkap naskah kiriman kontributor..."
      >
        <div className="rounded-lg border border-jp-gray-300 bg-white p-12 text-center space-y-3 font-sans">
          <div className="h-6 w-6 border-2 border-jp-blue-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-jp-gray-500 font-mono">
            Memuat data naskah kurasi...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (!submission) {
    return (
      <AdminLayout
        title="Naskah Tidak Ditemukan"
        subtitle="Naskah dengan ID ini tidak terdaftar di antrean meja kurasi."
      >
        <div className="rounded-lg border border-jp-gray-300 bg-white p-8 text-center space-y-4 max-w-md mx-auto font-sans">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-jp-paper border border-jp-gray-300 mx-auto text-jp-gray-600">
            <FileQuestion className="h-5 w-5 text-jp-gray-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-jp-ink font-heading">
              Naskah Kurasi Tidak Ditemukan
            </h3>
            <p className="text-xs text-jp-gray-600 font-prose">
              Naskah mungkin telah disetujui, dihapus, atau tautan tidak valid.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/admin/kurasi">
              <Button type="button" variant="primary" size="sm" className="rounded-md text-xs">
                <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                Kembali ke Meja Kurasi
              </Button>
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const activeNotesCount = chapters.filter((c) => c.peruChanTip && c.peruChanTip.trim().length > 0).length;
  const isApproved = submission.status === "Disetujui";
  const isRevision = submission.status === "Perlu Revisi";
  const articleSlug =
    submission.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-") || submission.id;

  return (
    <AdminLayout
      title="Lembar Penelaahan & Kurasi Naskah"
      subtitle="Evaluasi naskah lengkap kontributor, sematkan catatan kuratorial resmi Peru-Chan pada setiap bab, dan terbitkan langsung ke publik."
    >
      <div className="space-y-6 font-sans pb-16">
        {/* TOP NAVIGATION & STATUS BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-jp-gray-200 pb-4">
          <Link
            href="/admin/kurasi"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-jp-gray-700 hover:text-jp-blue-900 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Meja Kurasi</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-jp-gray-500">Status:</span>
            <Badge
              variant={
                submission.status === "Disetujui"
                  ? "lime"
                  : submission.status === "Perlu Revisi"
                  ? "brown"
                  : "blue"
              }
              size="sm"
            >
              {submission.status}
            </Badge>
          </div>
        </div>

        {/* EDITORIAL ARTICLE HEADER CARD (CLEAN SHARP STYLING) */}
        <div className="rounded-lg border border-jp-gray-300 bg-white p-6 md:p-8 space-y-5 shadow-2xs">
          {/* COVER IMAGE BANNER */}
          <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-md overflow-hidden border border-jp-gray-200 bg-jp-paper">
            {submission.coverImageUrl ? (
              <img
                src={submission.coverImageUrl}
                alt={submission.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <ArticleCoverPlaceholder
                title={submission.title}
                category={submission.category}
                size="banner"
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="blue">{submission.category}</Badge>
            <div className="flex items-center gap-1.5 text-xs text-jp-gray-500 font-mono">
              <Calendar className="h-3.5 w-3.5" />
              <span>Diterima: {submission.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-jp-gray-500 font-mono">
              <Layers className="h-3.5 w-3.5" />
              <span>{chapters.length} Bab Pembahasan</span>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-serif font-bold text-jp-ink leading-snug">
            {submission.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-jp-gray-600 font-sans border-t border-jp-gray-100 pt-3">
            <User className="h-3.5 w-3.5 text-jp-blue-900" />
            <span>
              Ditulis oleh: <strong className="text-jp-ink font-semibold">{submission.author}</strong>
            </span>
          </div>

          <div className="border-l-2 border-jp-blue-900 bg-jp-paper p-3 rounded-r-md text-xs sm:text-sm text-jp-gray-700 font-prose italic leading-relaxed">
            &ldquo;{submission.excerpt}&rdquo;
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT: CHAPTERS WITH INLINE PERU-CHAN EDITORS + SIDEBAR DECISION */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          {/* MAIN PROSE CHAPTERS */}
          <div className="space-y-6">
            {chapters.map((chap, idx) => {
              const hasNote = Boolean(chap.peruChanTip && chap.peruChanTip.trim().length > 0);

              return (
                <article
                  key={chap.id || idx}
                  className="rounded-lg border border-jp-gray-300 bg-white p-5 sm:p-7 shadow-2xs space-y-5"
                >
                  {/* CHAPTER HEADER */}
                  <div className="flex items-center justify-between border-b border-jp-gray-200 pb-3 gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-jp-blue-900 text-white font-mono text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h2 className="font-heading font-serif text-lg sm:text-xl font-bold text-jp-ink truncate">
                        {chap.title}
                      </h2>
                    </div>

                    {/* TOGGLE PERU-CHAN INLINE NOTE BUTTON */}
                    <button
                      type="button"
                      onClick={() => handleToggleChapterNote(idx)}
                      className={cn(
                        "inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md transition cursor-pointer border shrink-0",
                        hasNote
                          ? "border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
                          : "border-jp-blue-200 text-jp-blue-900 bg-jp-blue-50/70 hover:bg-jp-blue-100"
                      )}
                      title={hasNote ? "Hapus Catatan Peru-Chan untuk Bab ini" : "Sisipkan Catatan Peru-Chan untuk Bab ini"}
                    >
                      {hasNote ? (
                        <>
                          <Trash2 className="h-3 w-3" />
                          <span>Hapus Catatan</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" />
                          <span>+ Sisipkan Catatan Peru-Chan</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* CHAPTER PROSE CONTENT */}
                  <div className="text-sm text-jp-gray-800 font-prose leading-[1.8] whitespace-pre-line space-y-3">
                    {chap.content}
                  </div>

                  {/* INLINE PERU-CHAN EDITOR BOX (INSIDE THIS SPECIFIC CHAPTER) */}
                  {hasNote && (
                    <div className="rounded-md border border-jp-blue-200 bg-jp-blue-50/40 p-4 space-y-3 pt-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-jp-blue-100 pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-jp-blue-900 font-mono uppercase tracking-wide">
                          <Sparkles className="h-3.5 w-3.5 text-jp-blue-700" />
                          <span>Catatan Peru-Chan : Bab {idx + 1}</span>
                        </div>

                        {/* PER-CHAPTER COLOR THEME SELECTOR */}
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-jp-gray-500 font-mono mr-1">Tema:</span>
                          {(
                            [
                              { id: "blue", label: "Biru" },
                              { id: "brown", label: "Cokelat" },
                              { id: "lime", label: "Hijau" },
                            ] as const
                          ).map((thm) => (
                            <button
                              key={thm.id}
                              type="button"
                              onClick={() => handleUpdateChapterNote(idx, chap.peruChanTip || "", thm.id)}
                              className={cn(
                                "px-2 py-0.5 rounded text-[11px] font-bold border transition cursor-pointer",
                                (chap.peruChanTheme || "blue") === thm.id
                                  ? "bg-jp-blue-900 text-white border-jp-blue-900"
                                  : "bg-white text-jp-gray-600 border-jp-gray-300 hover:bg-jp-paper"
                              )}
                            >
                              {thm.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* TEXTAREA INPUT */}
                      <textarea
                        rows={3}
                        value={chap.peruChanTip || ""}
                        onChange={(e) => handleUpdateChapterNote(idx, e.target.value)}
                        placeholder="Tuliskan catatan kuratorial, tips teknis, atau poin wacana penting untuk bab ini..."
                        className="w-full rounded-md border border-jp-gray-300 bg-white p-2.5 text-xs text-jp-ink focus:border-jp-blue-900 focus:ring-1 focus:ring-jp-blue-900 outline-none leading-relaxed font-prose"
                      />

                      {/* LIVE PERU-CHAN PREVIEW INSIDE CHAPTER */}
                      {chap.peruChanTip && chap.peruChanTip.trim().length > 0 && (
                        <div className="pt-1">
                          <div className="text-[10px] font-mono font-bold text-jp-blue-900 uppercase tracking-wider mb-1.5">
                            Pratinjau Tampilan di Artikel Publik :
                          </div>
                          <PeruChanCallout
                            theme={chap.peruChanTheme || "blue"}
                            title={`Catatan Editorial Peru-Chan (Bab ${idx + 1})`}
                          >
                            <p className="text-xs leading-relaxed">{chap.peruChanTip}</p>
                          </PeruChanCallout>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}

            {/* REFERENCES SECTION */}
            {references && references.length > 0 && (
              <div className="rounded-lg border border-jp-gray-300 bg-white p-5 sm:p-7 shadow-2xs space-y-3">
                <h3 className="font-heading font-serif text-base font-bold text-jp-ink flex items-center gap-2 border-b border-jp-gray-200 pb-2">
                  <BookOpen className="h-4 w-4 text-jp-blue-900" />
                  <span>Daftar Pustaka & Rujukan Akademik</span>
                </h3>
                <ul className="list-disc list-inside text-xs text-jp-gray-700 font-prose space-y-1">
                  {references.map((ref, rIdx) => (
                    <li key={rIdx}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* SIDEBAR METADATA & ACTIONS (SHARP CLASSICAL STYLING) */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            {/* ACTION CARD */}
            <div className="rounded-lg border border-jp-gray-300 bg-white p-4 sm:p-5 shadow-2xs space-y-3.5">
              <div className="font-heading font-serif font-bold text-sm text-jp-ink border-b border-jp-gray-200 pb-2.5 flex items-center justify-between">
                <span>Keputusan Kurator</span>
                {activeNotesCount > 0 && (
                  <span className="text-[11px] font-mono text-jp-blue-900 font-bold bg-jp-blue-50 px-2 py-0.5 rounded border border-jp-blue-200">
                    {activeNotesCount} Catatan Tersemat
                  </span>
                )}
              </div>

              {isApproved ? (
                <div className="space-y-3">
                  <div className="rounded-md border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-900 font-sans space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>Naskah Telah Diterbitkan</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 leading-relaxed font-prose">
                      Naskah ini sudah disetujui kurator dan tayang secara aktif di katalog artikel publik Jejak Perupa.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <Link href={`/artikel/${articleSlug}`} target="_blank" className="block">
                      <Button
                        type="button"
                        variant="primary"
                        size="md"
                        className="w-full justify-center py-2 rounded-md font-bold text-xs shadow-2xs cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        Buka Halaman Artikel Publik
                      </Button>
                    </Link>

                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={handleApprove}
                      disabled={isProcessing}
                      className="w-full justify-center py-2 rounded-md font-bold text-xs border-jp-gray-300 text-jp-ink hover:bg-jp-paper cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-1.5 text-jp-blue-700" />
                      {isProcessing ? "Memproses..." : "Perbarui Catatan Kuratorial"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={handleRequestRevision}
                      disabled={isProcessing}
                      className="w-full justify-center py-2 rounded-md font-bold text-xs text-amber-800 border-amber-300 hover:bg-amber-50 cursor-pointer"
                    >
                      <AlertCircle className="h-3.5 w-3.5 mr-1.5 text-amber-700" />
                      Tarik Kembali ke Draf (Revisi)
                    </Button>
                  </div>
                </div>
              ) : isRevision ? (
                <div className="space-y-3">
                  <div className="rounded-md border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900 font-sans space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-800">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span>Status: Perlu Revisi</span>
                    </div>
                    <p className="text-[11px] text-amber-700 leading-relaxed font-prose">
                      Naskah saat ini berstatus perlu revisi dan menunggu perbaikan dari penulis.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={handleApprove}
                      disabled={isProcessing}
                      className="w-full justify-center py-2 rounded-md font-bold text-xs shadow-2xs cursor-pointer"
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                      {isProcessing ? "Memproses..." : "Setujui Ulang & Terbitkan"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-jp-gray-600 font-prose leading-relaxed">
                    Naskah yang disetujui akan langsung diterbitkan ke katalog artikel publik dan basis data Supabase.
                  </p>

                  <div className="space-y-2 pt-1">
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={handleApprove}
                      disabled={isProcessing}
                      className="w-full justify-center py-2 rounded-md font-bold text-xs shadow-2xs cursor-pointer"
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                      {isProcessing ? "Memproses..." : "Setujui & Terbitkan Naskah"}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={handleRequestRevision}
                      disabled={isProcessing}
                      className="w-full justify-center py-2 rounded-md font-bold text-xs text-amber-800 border-amber-300 hover:bg-amber-50 cursor-pointer"
                    >
                      <AlertCircle className="h-3.5 w-3.5 mr-1.5 text-amber-700" />
                      Minta Revisi Penulis
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* CHAPTER NAVIGATION LIST */}
            <div className="rounded-lg border border-jp-gray-300 bg-white p-4 shadow-2xs space-y-2.5">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-jp-gray-600 border-b border-jp-gray-100 pb-1.5">
                Struktur Bab ({chapters.length})
              </div>
              <ul className="space-y-2 text-xs font-medium text-jp-gray-700">
                {chapters.map((ch, idx) => {
                  const hasNote = Boolean(ch.peruChanTip && ch.peruChanTip.trim().length > 0);
                  return (
                    <li key={idx} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-mono text-jp-blue-900 font-bold text-[11px]">#{idx + 1}</span>
                        <span className="truncate text-xs">{ch.title}</span>
                      </div>
                      {hasNote && (
                        <span className="shrink-0 flex h-2 w-2 rounded-full bg-jp-blue-700" title="Catatan Peru-Chan aktif" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </AdminLayout>
  );
}
