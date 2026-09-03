"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { Heading1, Heading2, Paragraph, SectionLabel } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/atoms/form/Button";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { CompactArticleCard } from "@/components/molecules/article/CompactArticleCard";
import { UserContributedArticleCard, type UserArticleItem } from "@/components/molecules/article/UserContributedArticleCard";
import { MetricCardSkeleton } from "@/components/organisms/admin/MetricCardSkeleton";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { artService } from "@/lib/services/artService";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { useFeatureFlags } from "@/lib/featureFlagsContext";
import { Bookmark, Award, BookOpen, PenTool, ArrowRight, LogIn, Lock, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserDashboardOverviewPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"saved" | "contributions">("saved");
  const [savedBookmarkIds, setSavedBookmarkIds] = useState<string[]>([]);
  const [myArticles, setMyArticles] = useState<UserArticleItem[]>([]);
  const [allArticlesList, setAllArticlesList] = useState(() => artService.getAllArticles());
  const { currentUser, isMounted } = useAuth();
  const { isFeatureEnabled } = useFeatureFlags();

  useEffect(() => {
    let mounted = true;

    async function loadDashboardData() {
      // 1. Sync live articles from Supabase Cloud
      const latestArticles = await artService.syncWithDatabase();
      if (mounted) {
        setAllArticlesList(latestArticles);
      }

      // 2. Load Bookmarks (Cloud + Local fallback)
      let bookmarkIds: string[] = [];
      if (isSupabaseConfigured() && currentUser?.id) {
        try {
          const { data } = await supabase
            .from("user_bookmarks")
            .select("article_id")
            .eq("user_id", currentUser.id);
          if (data && data.length > 0) {
            bookmarkIds = data.map((b: any) => b.article_id);
          }
        } catch (e) {}
      }

      if (bookmarkIds.length === 0) {
        try {
          const stored = localStorage.getItem("jejak_perupa_saved_bookmarks");
          if (stored) {
            const ids = JSON.parse(stored);
            if (Array.isArray(ids)) bookmarkIds = ids;
          }
        } catch (e) {}
      }

      if (mounted) {
        setSavedBookmarkIds(bookmarkIds);
      }

      // 3. Load User Contributions (Cloud + Local fallback)
      let userArticlesList: UserArticleItem[] = [];

      if (isSupabaseConfigured() && currentUser?.name) {
        try {
          // Fetch from Supabase articles
          const { data: remoteArticles } = await supabase
            .from("articles")
            .select("*")
            .ilike("author_name", `%${currentUser.name}%`);

          if (remoteArticles && remoteArticles.length > 0) {
            userArticlesList = remoteArticles.map((a: any) => ({
              id: a.id,
              slug: a.slug,
              title: a.title,
              category: a.category || "Teori Seni",
              categoryVariant: a.category_variant || "blue",
              excerpt: a.excerpt || "",
              readTime: a.read_time || "5 menit membaca",
              publishedDate: a.published_date || "Terbaru",
              authorName: a.author_name || currentUser.name,
              coverImageUrl: a.cover_image_url,
              headerBgColor: a.header_bg_color,
              status: (a.status || "PUBLISHED") as any,
            }));
          }

          // Also fetch from Supabase art_submissions
          const { data: remoteSubmissions } = await supabase
            .from("art_submissions")
            .select("*")
            .ilike("contributor_name", `%${currentUser.name}%`);

          if (remoteSubmissions && remoteSubmissions.length > 0) {
            const existingSlugs = new Set(userArticlesList.map((i) => i.id));
            remoteSubmissions.forEach((sub: any) => {
              if (!existingSlugs.has(sub.id)) {
                userArticlesList.push({
                  id: sub.id,
                  slug: sub.id,
                  title: sub.title,
                  category: "Wacana Seni",
                  categoryVariant: "blue",
                  excerpt:
                    (sub.content_markdown || "")
                      .replace(/^##\s+[^\n]+/gm, "")
                      .replace(/^\|.*\|$/gm, "")
                      .replace(/\|\s*:?---.*$/gm, "")
                      .replace(/[\n\r]+/g, " ")
                      .trim()
                      .slice(0, 150) + "...",
                  readTime: "5 menit membaca",
                  publishedDate: new Date(sub.created_at).toLocaleDateString("id-ID"),
                  authorName: sub.contributor_name,
                  status: sub.status === "APPROVED" ? "PUBLISHED" : sub.status === "REJECTED" ? "DRAFT" : "SUBMITTED",
                });
              }
            });
          }
        } catch (e) {
          console.warn("Supabase user articles fetch exception:", e);
        }
      }

      // Fallback merge with local list
      try {
        const storedMyArticles = localStorage.getItem("jejak_perupa_my_articles");
        if (storedMyArticles) {
          const parsed = JSON.parse(storedMyArticles);
          if (Array.isArray(parsed)) {
            const existingIds = new Set(userArticlesList.map((i) => i.slug || i.id));
            parsed.forEach((p: any) => {
              if (!existingIds.has(p.slug || p.id)) {
                userArticlesList.push(p);
              }
            });
          }
        }
      } catch (e) {}

      if (mounted) {
        setMyArticles(userArticlesList);
        setIsLoading(false);
      }
    }

    loadDashboardData();

    return () => {
      mounted = false;
    };
  }, [currentUser]);

  const savedArticles = allArticlesList.filter((art) => savedBookmarkIds.includes(art.id));
  const learningPaths = artService.getAllLearningPaths();

  const handleRemoveBookmark = async (id: string) => {
    const updated = savedBookmarkIds.filter((bId) => bId !== id);
    setSavedBookmarkIds(updated);

    if (isSupabaseConfigured() && currentUser?.id) {
      try {
        await supabase
          .from("user_bookmarks")
          .delete()
          .match({ user_id: currentUser.id, article_id: id });
      } catch (e) {}
    }

    try {
      localStorage.setItem("jejak_perupa_saved_bookmarks", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleDeleteMyArticle = async (idOrSlug: string) => {
    const updated = myArticles.filter((a) => a.id !== idOrSlug && a.slug !== idOrSlug);
    setMyArticles(updated);

    if (isSupabaseConfigured()) {
      try {
        await supabase.from("articles").delete().or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
        await supabase.from("art_submissions").delete().eq("id", idOrSlug);
      } catch (e) {}
    }

    try {
      localStorage.setItem("jejak_perupa_my_articles", JSON.stringify(updated));
    } catch (e) {}
  };

  if (isMounted && !currentUser) {
    return (
      <MainPublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center px-6 py-20 font-sans">
          <div className="max-w-md w-full rounded-2xl border border-jp-gray-300 bg-white p-8 text-center space-y-5 shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-jp-blue-50 text-jp-blue-900 border border-jp-blue-100 mx-auto">
              <Lock className="h-7 w-7 text-jp-blue-700" />
            </div>
            <div className="space-y-2">
              <div className="font-mono text-xs font-bold text-jp-blue-900">
                Akses Terbatas : Ruang Belajar
              </div>
              <h1 className="font-heading text-2xl font-bold text-jp-ink">
                Masuk untuk Mengakses Dashboard
              </h1>
              <p className="text-xs text-jp-gray-600 font-prose leading-relaxed">
                Silakan masuk atau buat akun Jejak Perupa untuk melihat progres belajar, artikel tersimpan, dan modul evaluasi mandiri Anda.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/masuk" className="w-full">
                <Button variant="primary" size="md" className="w-full rounded-lg">
                  <LogIn className="h-4 w-4 mr-2" />
                  Masuk Sekarang
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" size="md" className="w-full rounded-lg">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </MainPublicLayout>
    );
  }

  return (
    <MainPublicLayout>
      {/* HEADER SECTION */}
      <section className="border-b border-jp-gray-300 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <SectionLabel>Ruang Belajar Mandiri</SectionLabel>
              <Heading1 className="mt-2 text-jp-ink text-3xl sm:text-4xl">
                Halo, {currentUser?.name || "Pelajar Seni"}!
              </Heading1>
              <Paragraph className="mt-1 text-sm md:text-base text-jp-gray-700 font-prose max-w-2xl">
                Lanjutkan perjalanan eksplorasi seni rupamu dan raih pemahaman mendalam.
              </Paragraph>
            </div>

            <div className="flex items-center gap-3 font-sans">
              <Link href="/dashboard/kontribusi">
                <Button variant="outline" size="sm" className="rounded-lg">
                  <PenTool className="h-4 w-4 mr-1.5" />
                  Kirim Tulisan
                </Button>
              </Link>
              {isFeatureEnabled("progress_belajar") && (
                <Link href="/jalur-belajar">
                  <Button variant="primary" size="sm" className="rounded-lg">
                    <BookOpen className="h-4 w-4 mr-1.5" />
                    Lanjut Belajar
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD BODY */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16 space-y-12 font-sans">
        {/* PROGRESS METRICS (ROUNDED-XL) */}
        {isLoading ? (
          <MetricCardSkeleton count={3} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-jp-gray-600 font-sans">
                  Materi Selesai
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-jp-blue-50 text-jp-blue-900 border border-jp-blue-100">
                  <BookOpen className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-3 font-heading text-3xl font-bold text-jp-ink font-mono">
                {isFeatureEnabled("progress_belajar") ? "3" : "0"}
              </div>
              <p className="mt-1 text-xs text-jp-gray-500 font-prose">
                {isFeatureEnabled("progress_belajar") ? "Dari total 5 modul kurikulum" : "Modul kurikulum wacana"}
              </p>
            </div>

            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-jp-gray-600 font-sans">
                  Materi Tersimpan
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-jp-brown-50 text-jp-brown-900 border border-jp-brown-100">
                  <Bookmark className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-3 font-heading text-3xl font-bold text-jp-ink font-mono">
                {savedArticles.length}
              </div>
              <p className="mt-1 text-xs text-jp-gray-500 font-prose">Artikel & biografi tersimpan</p>
            </div>

            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-jp-gray-600 font-sans">
                  Karya Tulis Saya
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-jp-lime-muted text-jp-ink border border-jp-lime/60">
                  <PenTool className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-3 font-heading text-3xl font-bold text-jp-ink font-mono">
                {myArticles.length}
              </div>
              <p className="mt-1 text-xs text-green-700 font-semibold font-prose">
                Naskah wacana & kontribusi
              </p>
            </div>
          </div>
        )}

        {/* ACTIVE LEARNING PATH IN PROGRESS (ONLY IF FEATURE IS ENABLED) */}
        {isFeatureEnabled("progress_belajar") && (
          isLoading ? (
            <div className="rounded-xl border border-jp-blue-200 bg-jp-blue-50/50 p-6 md:p-8 space-y-4 shadow-xs">
              <Skeleton className="h-4 w-40 rounded" />
              <Skeleton className="h-6 w-3/5 rounded bg-jp-blue-900/20" />
              <Skeleton className="h-4 w-4/5 rounded" />
              <Skeleton className="h-3 w-full rounded-full pt-2" />
            </div>
          ) : (
            <div className="rounded-xl border border-jp-blue-200 bg-gradient-to-r from-jp-blue-50 to-white p-6 md:p-8 space-y-6 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-3xl">
                  <div className="font-mono text-xs font-bold text-jp-blue-700">
                    Kurikulum yang Sedang Diikuti
                  </div>
                  <Heading2 className="mt-1 text-xl md:text-2xl text-jp-blue-900">
                    {learningPaths[0]?.title}
                  </Heading2>
                  <p className="mt-2 text-sm md:text-base text-jp-gray-700 font-prose max-w-2xl leading-relaxed">
                    {learningPaths[0]?.description}
                  </p>
                </div>
                <Link href={`/jalur-belajar/${learningPaths[0]?.slug}`}>
                  <Button variant="primary" size="md" className="rounded-lg">
                    Lanjutkan Modul
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* PROGRESS BAR */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-semibold text-jp-blue-900">
                  <span>Progres Belajar</span>
                  <span className="font-mono font-bold">60% Selesai</span>
                </div>
                <div className="h-3 w-full rounded-full bg-white overflow-hidden p-0.5 border border-jp-blue-200">
                  <div className="h-full rounded-full bg-jp-blue-900 transition-all duration-500 w-[60%]" />
                </div>
              </div>
            </div>
          )
        )}

        {/* INTEGRATED TAB SECTION: SAVED ARTICLES & MY CONTRIBUTIONS */}
        <div className="space-y-6">
          {/* TAB SWITCHER & HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-jp-gray-200 pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-sans",
                  activeTab === "saved"
                    ? "bg-jp-blue-900 text-white shadow-2xs"
                    : "bg-jp-gray-100 text-jp-gray-600 hover:bg-jp-gray-200 hover:text-jp-ink"
                )}
              >
                <Bookmark className="h-4 w-4" />
                <span>Artikel Tersimpan</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold",
                    activeTab === "saved"
                      ? "bg-white/20 text-white"
                      : "bg-jp-gray-200 text-jp-gray-700"
                  )}
                >
                  {savedArticles.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("contributions")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-sans",
                  activeTab === "contributions"
                    ? "bg-jp-blue-900 text-white shadow-2xs"
                    : "bg-jp-gray-100 text-jp-gray-600 hover:bg-jp-gray-200 hover:text-jp-ink"
                )}
              >
                <PenTool className="h-4 w-4" />
                <span>Karya Tulis Saya</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold",
                    activeTab === "contributions"
                      ? "bg-white/20 text-white"
                      : "bg-jp-gray-200 text-jp-gray-700"
                  )}
                >
                  {myArticles.length}
                </span>
              </button>
            </div>

            {activeTab === "saved" ? (
              <Link
                href="/artikel"
                className="inline-flex items-center gap-1 text-xs font-bold text-jp-blue-700 hover:text-jp-blue-900 transition-colors"
              >
                <span>Jelajahi katalog artikel</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <Link href="/dashboard/kontribusi">
                <Button variant="primary" size="sm" className="rounded-lg text-xs h-9 px-3.5">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  <span>Tulis Naskah Baru</span>
                </Button>
              </Link>
            )}
          </div>

          {/* TAB CONTENT */}
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-4 sm:p-5 shadow-2xs"
                >
                  <div className="flex items-start gap-4 min-w-0 flex-1 w-full">
                    <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-lg" />
                    <div className="min-w-0 flex-1 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-20 rounded-md" />
                        <Skeleton className="h-3 w-16 rounded-md" />
                      </div>
                      <Skeleton className="h-5 w-3/4 rounded-md" />
                      <Skeleton className="h-3.5 w-1/2 rounded-md hidden sm:block" />
                      <Skeleton className="h-3 w-28 rounded-md" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-jp-gray-100 shrink-0">
                    <Skeleton className="h-9 w-9 rounded-lg" />
                    <Skeleton className="h-9 w-20 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === "saved" ? (
            /* TAB 1: SAVED ARTICLES */
            savedArticles.length > 0 ? (
              <div className="space-y-3">
                {savedArticles.map((art) => (
                  <CompactArticleCard
                    key={art.slug}
                    article={art}
                    onRemoveBookmark={handleRemoveBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-jp-gray-300 bg-white p-8 sm:p-12 text-center space-y-3 shadow-2xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-jp-paper border border-jp-gray-200 text-jp-gray-400 mx-auto">
                  <Bookmark className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="font-heading font-bold text-jp-ink text-base">
                    Belum Ada Artikel yang Disimpan
                  </div>
                  <p className="text-xs text-jp-gray-500 font-prose max-w-md mx-auto leading-relaxed">
                    Koleksi bacaan Anda saat ini masih kosong. Klik tombol Simpan pada artikel mana pun untuk menyimpannya ke ruang belajar ini.
                  </p>
                </div>
                <div className="pt-2">
                  <Link href="/artikel">
                    <Button variant="outline" size="sm" className="rounded-lg text-xs">
                      Mulai Jelajahi Artikel
                    </Button>
                  </Link>
                </div>
              </div>
            )
          ) : (
            /* TAB 2: MY CONTRIBUTIONS */
            myArticles.length > 0 ? (
              <div className="space-y-3">
                {myArticles.map((art) => (
                  <UserContributedArticleCard
                    key={art.slug}
                    article={art}
                    onDelete={handleDeleteMyArticle}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-jp-gray-300 bg-white p-8 sm:p-12 text-center space-y-4 shadow-2xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-jp-blue-50 border border-jp-blue-100 text-jp-blue-700 mx-auto">
                  <PenTool className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <div className="font-heading font-bold text-jp-ink text-base">
                    Belum Ada Naskah yang Anda Buat
                  </div>
                  <p className="text-xs text-jp-gray-500 font-prose max-w-md mx-auto leading-relaxed">
                    Punya wacana, kritik, atau catatan eksperimen seni rupa yang ingin dibagikan? Kirimkan naskah tulisan Anda ke meja redaksi kami sekarang!
                  </p>
                </div>
                <div className="pt-1">
                  <Link href="/dashboard/kontribusi">
                    <Button variant="primary" size="sm" className="rounded-lg text-xs">
                      <PenTool className="h-3.5 w-3.5 mr-1.5" />
                      Mulai Tulis Naskah
                    </Button>
                  </Link>
                </div>
              </div>
            )
          )}
        </div>

        {/* PERU-CHAN MOTIVATION TIP */}
        <PeruChanCallout
          title="Tips Belajar Hari Ini dari Peru-Chan"
          theme="blue"
          iconType="sparkles"
        >
          <p>
            Jangan terburu-buru menghafal seluruh istilah seni sekaligus. Pilihlah
            satu karya untuk dianalisis setiap minggu menggunakan fitur Close Looking!
          </p>
        </PeruChanCallout>
      </section>
    </MainPublicLayout>
  );
}
