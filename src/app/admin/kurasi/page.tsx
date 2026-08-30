"use client";

import React, { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { TablePagination } from "@/components/molecules/navigation/TablePagination";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { CurationCardSkeleton } from "@/components/organisms/admin/CurationCardSkeleton";
import { CurationReviewModal } from "@/components/organisms/admin/curation/CurationReviewModal";
import { useCategories } from "@/lib/categoryContext";
import { useModal } from "@/lib/modalContext";
import {
  Eye,
  CheckCircle,
  Clock,
  Sparkles,
  X,
  Send,
  AlertCircle,
  BookOpen,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { ArticleCoverPlaceholder } from "@/components/atoms/media/ArticleCoverPlaceholder";
import { submissionsSeeder, type SubmissionItem } from "@/lib/data/seeders/submissionsSeeder";
import { artService } from "@/lib/services/artService";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { type ArticleFullData } from "@/lib/data/articles";

const CURATION_STORAGE_KEY = "jejak_perupa_admin_curation_submissions_v1";

export default function AdminKurasiPage() {
  const { confirm, alert } = useModal();

  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [selectedSub, setSelectedSub] = useState<SubmissionItem | null>(null);
  const [tipDraft, setTipDraft] = useState("");
  const [themeDraft, setThemeDraft] = useState<"blue" | "brown" | "lime">("blue");
  const [isLoading, setIsLoading] = useState(true);

  const { categories, updateCategory, addCategory } = useCategories();

  // Load from Supabase Cloud Database on mount
  React.useEffect(() => {
    let isMounted = true;

    async function loadCurationData() {
      let list: SubmissionItem[] = [];

      // 1. Fetch from Supabase cloud table `art_submissions`
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from("art_submissions")
            .select("*")
            .order("created_at", { ascending: false });

          if (!error && data) {
            list = data.map((row: any) => ({
              id: row.id,
              title: row.title,
              author: row.contributor_name || "Kontributor Seni",
              category: "Wacana Seni",
              date: new Date(row.created_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              status:
                row.status === "APPROVED"
                  ? "Disetujui"
                  : row.status === "REJECTED"
                  ? "Perlu Revisi"
                  : "Menunggu Kurasi",
              excerpt: (row.content_markdown || "").slice(0, 160) + "...",
              coverImageUrl: row.cover_image_url || undefined,
              chapters: [
                {
                  title: "Pembahasan Naskah",
                  content: row.content_markdown || "",
                },
              ],
              references: [],
              peruChanTip: "",
              peruChanTheme: "blue",
            }));
          }

          // Also fetch articles with DRAFT status from Supabase articles table
          const { data: draftArticles } = await supabase
            .from("articles")
            .select("*")
            .eq("status", "DRAFT")
            .order("created_at", { ascending: false });

          if (draftArticles && draftArticles.length > 0) {
            const existingIds = new Set(list.map((s) => s.id));
            draftArticles.forEach((art: any) => {
              if (!existingIds.has(art.id) && !existingIds.has(art.slug)) {
                list.push({
                  id: art.id,
                  title: art.title,
                  author: art.author_name || "Kontributor Seni",
                  category: art.category || "Teori Seni",
                  date: art.published_date || new Date(art.created_at).toLocaleDateString("id-ID"),
                  status: "Menunggu Kurasi",
                  excerpt: art.excerpt || "",
                  coverImageUrl: art.cover_image_url || undefined,
                  chapters: Array.isArray(art.content_sections)
                    ? art.content_sections.map((s: any) => ({
                        title: s.heading,
                        content: Array.isArray(s.paragraphs) ? s.paragraphs.join("\n\n") : "",
                      }))
                    : [{ title: "Pembahasan Naskah", content: art.excerpt || "" }],
                  references: Array.isArray(art.references)
                    ? art.references.map((r: any) => (typeof r === "string" ? r : r.citation))
                    : [],
                  peruChanTip: art.peru_chan_tip || "",
                  peruChanTheme: "blue",
                });
              }
            });
          }
        } catch (e) {
          console.warn("Supabase curation fetch exception:", e);
        }
      } else {
        // 2. Offline local fallback only when Supabase is not configured
        try {
          const stored = localStorage.getItem(CURATION_STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              list = parsed;
            }
          } else {
            list = [...submissionsSeeder];
          }
        } catch (e) {}
      }

      if (isMounted) {
        setSubmissions(list);
        setIsLoading(false);
      }
    }

    loadCurationData();

    return () => {
      isMounted = false;
    };
  }, []);

  const saveSubmissions = async (updated: SubmissionItem[]) => {
    setSubmissions(updated);
    try {
      localStorage.setItem(CURATION_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Failed to persist submissions to localStorage", e);
    }
  };

  const handleOpenReview = (sub: SubmissionItem) => {
    setSelectedSub(sub);
    setTipDraft(sub.peruChanTip || "");
    setThemeDraft(sub.peruChanTheme || "blue");
  };

  const handleApprove = async () => {
    if (!selectedSub) return;
    const confirmed = await confirm({
      title: "Terbitkan Naskah Ini?",
      message: `Naskah "${selectedSub.title}" beserta catatan resmi Peru-Chan akan segera dipublikasikan ke katalog artikel publik.`,
      confirmLabel: "Ya, Terbitkan",
      cancelLabel: "Batal",
      variant: "primary",
      iconType: "help",
    });

    if (confirmed) {
      // Approve proposed category if applicable
      const matchedCat = categories.find(
        (c) => c.name.toLowerCase() === selectedSub.category.toLowerCase()
      );
      if (matchedCat && matchedCat.isApproved === false) {
        updateCategory(matchedCat.id, { isApproved: true });
      } else if (!matchedCat) {
        addCategory({ name: selectedSub.category, isApproved: true });
      }

      const updated = submissions.map((s) =>
        s.id === selectedSub.id
          ? {
              ...s,
              status: "Disetujui" as const,
              peruChanTip: tipDraft,
              peruChanTheme: themeDraft,
            }
          : s
      );
      saveSubmissions(updated);

      // Publish into live public catalog (artService)
      const slug =
        selectedSub.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-") || `artikel-${Date.now()}`;

      const publishedArticle: ArticleFullData = {
        id: selectedSub.id.startsWith("art-") ? selectedSub.id : `art-${Date.now()}`,
        title: selectedSub.title,
        slug,
        excerpt: selectedSub.excerpt,
        category: selectedSub.category,
        categoryId: matchedCat ? matchedCat.id : "cat-sejarah",
        categoryVariant:
          themeDraft === "brown"
            ? "brown"
            : themeDraft === "lime"
            ? "lime"
            : "blue",
        readTime: "7 menit membaca",
        readTimeMinutes: 7,
        publishedDate: new Date().toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        authorName: selectedSub.author,
        peruChanTip: tipDraft || selectedSub.peruChanTip,
        peruChanTipTitle: "Catatan Editorial Peru-Chan",
        tocItems: selectedSub.chapters.map((ch, idx) => ({
          id: `chap-${idx + 1}`,
          title: ch.title,
          number: (idx + 1).toString().padStart(2, "0"),
        })),
        contentSections: selectedSub.chapters.map((ch, idx) => ({
          id: `sec-${idx + 1}`,
          number: (idx + 1).toString().padStart(2, "0"),
          heading: ch.title,
          paragraphs: ch.content.split("\n\n").filter(Boolean),
          peruChanTip: idx === 0 ? tipDraft : undefined,
          peruChanTheme: themeDraft,
        })),
        references: selectedSub.references.map((r) => ({
          citation: r,
          sourceType: "Akademik",
        })),
        relatedSlugs: [],
      };

      await artService.addArticle(publishedArticle);

      // Cloud status sync: Update Supabase art_submissions & articles
      if (isSupabaseConfigured()) {
        try {
          await supabase
            .from("art_submissions")
            .update({ status: "APPROVED" })
            .eq("id", selectedSub.id);

          await supabase
            .from("articles")
            .update({ status: "PUBLISHED" })
            .or(`id.eq.${selectedSub.id},slug.eq.${slug}`);
        } catch (e) {
          console.warn("Supabase art_submissions update exception:", e);
        }
      }

      // Also update contributor's personal tracking
      try {
        const storedMyArticles = localStorage.getItem("jejak_perupa_my_articles");
        if (storedMyArticles) {
          const myArticles = JSON.parse(storedMyArticles);
          if (Array.isArray(myArticles)) {
            const updatedMyArticles = myArticles.map((a: any) =>
              a.id === selectedSub.id || a.title === selectedSub.title
                ? { ...a, status: "PUBLISHED" }
                : a
            );
            localStorage.setItem(
              "jejak_perupa_my_articles",
              JSON.stringify(updatedMyArticles)
            );
          }
        }
      } catch (e) {}

      setSelectedSub(null);
      await alert({
        title: "Naskah Berhasil Diterbitkan",
        message: `Artikel "${selectedSub.title}" kini telah tayang secara permanen di katalog publik Jejak Perupa.`,
        type: "success",
      });
    }
  };

  const handleRequestRevision = async () => {
    if (!selectedSub) return;
    const confirmed = await confirm({
      title: "Minta Revisi Penulis?",
      message: `Status naskah "${selectedSub.title}" akan diubah menjadi "Perlu Revisi" agar penulis dapat menyempurnakan naskahnya.`,
      confirmLabel: "Minta Revisi",
      cancelLabel: "Batal",
      variant: "warning",
      iconType: "alert",
    });

    if (confirmed) {
      const updated = submissions.map((s) =>
        s.id === selectedSub.id ? { ...s, status: "Perlu Revisi" as const } : s
      );
      saveSubmissions(updated);

      // Cloud status sync: Update Supabase art_submissions & articles
      if (isSupabaseConfigured()) {
        try {
          await supabase
            .from("art_submissions")
            .update({ status: "REJECTED" })
            .eq("id", selectedSub.id);

          await supabase
            .from("articles")
            .update({ status: "DRAFT" })
            .or(`id.eq.${selectedSub.id},slug.eq.${selectedSub.id}`);
        } catch (e) {
          console.warn("Supabase art_submissions reject exception:", e);
        }
      }

      // Update contributor dashboard tracking
      try {
        const storedMyArticles = localStorage.getItem("jejak_perupa_my_articles");
        if (storedMyArticles) {
          const myArticles = JSON.parse(storedMyArticles);
          if (Array.isArray(myArticles)) {
            const updatedMyArticles = myArticles.map((a: any) =>
              a.id === selectedSub.id || a.title === selectedSub.title
                ? { ...a, status: "DRAFT" }
                : a
            );
            localStorage.setItem(
              "jejak_perupa_my_articles",
              JSON.stringify(updatedMyArticles)
            );
          }
        }
      } catch (e) {}

      setSelectedSub(null);
      await alert({
        title: "Permintaan Revisi Terkirim",
        message: "Status naskah telah diperbarui secara permanen menjadi 'Perlu Revisi'.",
        type: "info",
      });
    }
  };

  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (status: string) => {
    startTransition(() => {
      setStatusFilter(status);
      setCurrentPage(1);
    });
  };

  const filteredSubmissions = useMemo(() => {
    if (statusFilter === "Semua") return submissions;
    return submissions.filter((sub) => sub.status === statusFilter);
  }, [submissions, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / pageSize));

  const paginatedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSubmissions.slice(start, start + pageSize);
  }, [filteredSubmissions, currentPage, pageSize]);

  return (
    <AdminLayout
      title="Meja Kurasi Editorial Naskah"
      subtitle="Evaluasi naskah kiriman kontributor, telaah rujukan akademik, dan sematkan catatan kuratorial resmi Peru-Chan."
    >
      <div className="space-y-6 font-sans">
        {/* STATUS FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-jp-gray-200 pb-4">
          {["Semua", "Menunggu Kurasi", "Disetujui", "Perlu Revisi"].map((status) => {
            const count =
              status === "Semua"
                ? submissions.length
                : submissions.filter((s) => s.status === status).length;
            const isSelected = statusFilter === status;

            return (
              <button
                key={status}
                type="button"
                onClick={() => handleStatusChange(status)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer",
                  isSelected
                    ? "bg-jp-blue-900 text-white shadow-2xs"
                    : "bg-white text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900 border border-jp-gray-300"
                )}
              >
                <span>{status}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px] font-mono",
                    isSelected ? "bg-white/20 text-white" : "bg-jp-gray-100 text-jp-gray-600"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* SUBMISSIONS LIST WITH IN-SITU SKELETON */}
        {(isLoading || isPending) ? (
          <CurationCardSkeleton count={3} />
        ) : filteredSubmissions.length > 0 ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:gap-6">
              {paginatedSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-lg border border-jp-gray-300 bg-white p-4 sm:p-5 shadow-2xs space-y-4 hover:border-jp-blue-300 transition"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* THUMBNAIL COVER OR CUSTOM TYPOGRAPHIC PLACEHOLDER */}
                    <div className="relative w-full md:w-36 h-28 shrink-0 rounded-md overflow-hidden border border-jp-gray-200 bg-jp-paper">
                      {sub.coverImageUrl ? (
                        <img
                          src={sub.coverImageUrl}
                          alt={sub.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ArticleCoverPlaceholder
                          title={sub.title}
                          category={sub.category}
                          size="compact"
                        />
                      )}
                    </div>

                    {/* CONTENT & METADATA */}
                    <div className="flex-1 min-w-0 space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-jp-ink font-heading font-serif">
                              {sub.title}
                            </h3>
                            <Badge
                              variant={
                                sub.status === "Disetujui"
                                  ? "lime"
                                  : sub.status === "Perlu Revisi"
                                  ? "brown"
                                  : "blue"
                              }
                              size="sm"
                            >
                              {sub.status}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-jp-gray-600 font-mono">
                            <div>
                              <span className="text-jp-gray-400">Penulis:</span>{" "}
                              <span className="font-bold text-jp-ink">{sub.author}</span>
                            </div>
                            <span className="text-jp-gray-300 hidden sm:inline">·</span>
                            <div>
                              <span className="text-jp-gray-400">Kategori:</span>{" "}
                              <span className="font-bold text-jp-blue-900">{sub.category}</span>
                            </div>
                            <span className="text-jp-gray-300 hidden sm:inline">·</span>
                            <div>
                              <span className="text-jp-gray-400">Diterima:</span>{" "}
                              <span className="font-bold text-jp-gray-700">{sub.date}</span>
                            </div>
                          </div>
                        </div>

                        <Link href={`/admin/kurasi/${encodeURIComponent(sub.id)}`} className="shrink-0">
                          <Button
                            variant="primary"
                            size="md"
                            className="rounded-md w-full sm:w-auto py-2 px-3.5 h-9 font-bold text-xs cursor-pointer shadow-2xs"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1.5" />
                            Buka Lembar Kurasi
                          </Button>
                        </Link>
                      </div>

                      <p className="text-xs sm:text-sm text-jp-gray-700 font-prose leading-relaxed border-l-2 border-jp-blue-900 pl-3">
                        {sub.excerpt}
                      </p>

                      {sub.peruChanTip && (
                        <div className="rounded-md border border-jp-blue-100 bg-jp-blue-50/50 p-2.5 text-xs text-jp-blue-900 font-prose italic">
                          <strong>Catatan Peru-Chan Tersemat:</strong> &ldquo;{sub.peruChanTip}&rdquo;
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* UNIFIED RESPONSIVE PAGINATION */}
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredSubmissions.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
              itemName="naskah"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-12 text-center text-jp-gray-500">
            Tidak ada naskah dengan status &ldquo;{statusFilter}&rdquo;.
          </div>
        )}

        {/* CURATION MODAL DRAWER */}
        <CurationReviewModal
          submission={selectedSub}
          onClose={() => setSelectedSub(null)}
          tipDraft={tipDraft}
          setTipDraft={setTipDraft}
          themeDraft={themeDraft}
          setThemeDraft={setThemeDraft}
          onApprove={handleApprove}
          onRequestRevision={handleRequestRevision}
        />
      </div>
    </AdminLayout>
  );
}
