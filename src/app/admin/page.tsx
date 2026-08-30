"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { AdminAnalyticsChart } from "@/components/organisms/admin/AdminAnalyticsChart";
import { AdminChartSkeleton } from "@/components/organisms/admin/AdminChartSkeleton";
import { MetricCardSkeleton } from "@/components/organisms/admin/MetricCardSkeleton";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { artService } from "@/lib/services/artService";
import { articlesData, type ArticleFullData } from "@/lib/data/articles";
import { artistsData, type ArtistData } from "@/lib/data/artists";
import { glossaryData, type GlossaryData } from "@/lib/data/glossary";
import { agendaEventsData } from "@/lib/data/agenda";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useModal } from "@/lib/modalContext";
import { useFeatureFlags } from "@/lib/featureFlagsContext";
import {
  FileText,
  Users,
  BookOpen,
  Clock,
  Plus,
  CheckCircle,
  Eye,
  Sparkles,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  ShieldCheck,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PendingSubItem {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
}

export default function AdminOverviewPage() {
  const { alert } = useModal();
  const { activePreset, enabledCount, totalCount } = useFeatureFlags();
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [articles, setArticles] = useState<ArticleFullData[]>([]);
  const [artists, setArtists] = useState<ArtistData[]>([]);
  const [terms, setTerms] = useState<GlossaryData[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubItem[]>([]);

  useEffect(() => {
    let isCurrent = true;
    setMounted(true);

    async function loadDashboardData() {
      // 1. Sync live articles from Supabase
      const remoteArticles = await artService.syncWithDatabase();
      if (isCurrent && remoteArticles) {
        setArticles(remoteArticles);
      }

      // 2. Sync live artists
      const remoteArtists = await artService.getAllArtistsAsync();
      if (isCurrent && remoteArtists) {
        setArtists(remoteArtists);
      }

      // 3. Sync live glossary
      const remoteTerms = await artService.getAllGlossaryTermsAsync();
      if (isCurrent && remoteTerms) {
        setTerms(remoteTerms);
      }

      // 4. Fetch live pending curation submissions
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from("art_submissions")
            .select("*")
            .eq("status", "PENDING")
            .order("created_at", { ascending: false });

          if (!error && data) {
            const mapped: PendingSubItem[] = data.map((row: any) => ({
              id: row.id,
              title: row.title,
              author: row.contributor_name || "Kontributor Seni",
              category: "Wacana Seni",
              date: new Date(row.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
            }));

            if (isCurrent) {
              setPendingSubmissions(mapped);
            }
          }
        } catch (e) {
          console.warn("Supabase pending submissions fetch failed:", e);
        }
      }

      if (isCurrent) {
        setIsLoading(false);
      }
    }

    loadDashboardData();

    return () => {
      isCurrent = false;
    };
  }, []);

  const topArticles = articles.slice(0, 4).map((art) => ({
    title: art.title,
    slug: art.slug,
    category: art.category,
    views: 0,
    readTime: `${art.readTimeMinutes || 7} mnt`,
    trend: "+0%",
  }));

  return (
    <AdminLayout
      title="Ringkasan & Analitik Platform"
      subtitle="Pantau dinamika pembaca, perkembangan artikel kuratorial, dan evaluasi naskah masuk."
      actionButton={
        <Link href="/admin/kurasi" className="w-full sm:w-auto block">
          <Button
            variant="primary"
            size="md"
            className="rounded-lg w-full sm:w-auto py-2.5 px-4 h-10 font-bold text-xs sm:text-sm shadow-xs cursor-pointer"
          >
            <Eye className="h-4 w-4 mr-1.5" />
            Buka Meja Kurasi{pendingSubmissions.length > 0 ? ` (${pendingSubmissions.length})` : ""}
          </Button>
        </Link>
      }
    >
      <div className="space-y-8 font-sans">
        {/* RELEASE PHASE STATUS BAR */}
        <div className="rounded-xl border border-jp-blue-200 bg-jp-blue-50/70 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-jp-blue-900 text-white shadow-2xs">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-jp-ink">
                  Fase Rilis Aktif:{" "}
                  <span className="text-jp-blue-900 font-mono">
                    {activePreset === "custom"
                      ? "Kustom (Custom Override)"
                      : activePreset.toUpperCase()}
                  </span>
                </span>
                <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-jp-blue-200 text-jp-blue-800">
                  {enabledCount}/{totalCount} Fitur Tayang
                </span>
              </div>
              <p className="text-[11px] text-jp-gray-500 font-prose mt-0.5">
                Menu publik dan section beranda otomatis menyesuaikan sakelar fase yang aktif.
              </p>
            </div>
          </div>

          <Link href="/admin/rilis" className="w-full sm:w-auto block shrink-0">
            <Button
              type="button"
              variant="outline"
              size="md"
              className="rounded-lg text-xs sm:text-sm font-bold border-jp-blue-300 bg-white text-jp-blue-900 hover:bg-jp-blue-50 w-full sm:w-auto py-2.5 px-4 h-10 cursor-pointer"
            >
              <SlidersHorizontal className="h-4 w-4 mr-1.5" />
              Kelola Rilis & Sakelar Fitur
            </Button>
          </Link>
        </div>

        {/* 1. KPI SUMMARY METRIC CARDS WITH IN-SITU SKELETON */}
        {isLoading ? (
          <MetricCardSkeleton count={4} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-jp-gray-300 bg-white p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500 font-mono">
                  Artikel Diterbitkan
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-100 text-jp-blue-900">
                  <FileText className="h-4 w-4" />
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span suppressHydrationWarning className="font-mono text-3xl font-extrabold text-jp-ink">
                  {mounted ? articles.length : 0}
                </span>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                  Live Supabase
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-jp-gray-300 bg-white p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500 font-mono">
                  Maestro Terdata
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-brown-100 text-jp-brown-900">
                  <Users className="h-4 w-4" />
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span suppressHydrationWarning className="font-mono text-3xl font-extrabold text-jp-ink">
                  {mounted ? artists.length : 0}
                </span>
                <span className="text-xs font-bold text-jp-brown-800 bg-jp-brown-50 px-2 py-0.5 rounded-md border border-jp-brown-200">
                  Arsip Maestro
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-jp-gray-300 bg-white p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500 font-mono">
                  Kamus Istilah A-Z
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-lime-100 text-jp-lime-900">
                  <BookOpen className="h-4 w-4" />
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span suppressHydrationWarning className="font-mono text-3xl font-extrabold text-jp-ink">
                  {mounted ? terms.length : 0}
                </span>
                <span className="text-xs font-bold text-jp-gray-600 bg-jp-paper px-2 py-0.5 rounded-md border border-jp-gray-200">
                  Entri Glosarium
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-jp-blue-300 bg-linear-to-b from-jp-blue-50 to-white p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-900 font-mono">
                  Antrean Kurasi Naskah
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-900 text-white">
                  <Clock className="h-4 w-4" />
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-3xl font-extrabold text-jp-blue-900">
                  {pendingSubmissions.length}
                </span>
                <Link href="/admin/kurasi" className="text-xs font-bold text-jp-blue-700 hover:underline">
                  Tinjau Naskah →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2. ADVANCED INTERACTIVE ANALYTICS CHART */}
        {isLoading ? <AdminChartSkeleton /> : <AdminAnalyticsChart />}

        {/* 3. TWO-COLUMN SPLIT: TOP PERFORMING ARTICLES & PENDING CURATION QUEUE */}
        {isLoading ? (
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-7 shadow-2xs space-y-4">
              <Skeleton className="h-6 w-1/2 rounded" />
              <div className="space-y-3 pt-2">
                <Skeleton className="h-14 w-full rounded-lg" />
                <Skeleton className="h-14 w-full rounded-lg" />
                <Skeleton className="h-14 w-full rounded-lg" />
              </div>
            </div>
            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-7 shadow-2xs space-y-4">
              <Skeleton className="h-6 w-1/2 rounded" />
              <div className="space-y-3 pt-2">
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 items-start">
            {/* TOP PERFORMING ARTICLES */}
            <div className="rounded-xl border border-jp-gray-300 bg-white p-4 sm:p-6 md:p-7 shadow-2xs space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-jp-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-blue-100 text-jp-blue-900 text-xs font-bold shrink-0">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </span>
                  <Heading3 className="text-base sm:text-lg text-jp-ink font-bold font-serif">
                    Artikel Paling Banyak Dipelajari
                  </Heading3>
                </div>
                <Link
                  href="/admin/artikel"
                  className="text-xs font-bold text-jp-blue-700 hover:underline"
                >
                  Lihat Semua ({articles.length}) →
                </Link>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {topArticles.map((art, idx) => (
                  <Link
                    key={art.slug || art.title}
                    href={`/admin/artikel/edit/${encodeURIComponent(art.slug)}`}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 rounded-lg border border-jp-gray-200 bg-jp-paper/30 p-3 sm:p-3.5 hover:border-jp-blue-400 hover:bg-jp-blue-50/20 transition block"
                  >
                    <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
                      <span className="font-mono text-xs font-bold text-jp-gray-400 w-5 text-center shrink-0 pt-0.5 sm:pt-0">
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-jp-ink line-clamp-1">
                          {art.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-jp-gray-500 font-mono mt-0.5">
                          <span>{art.category}</span>
                          <span>·</span>
                          <span>{art.readTime} baca</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-2 text-right shrink-0 border-t sm:border-t-0 border-jp-gray-100 pt-1.5 sm:pt-0">
                      <div className="font-mono text-xs font-bold text-jp-ink">
                        {art.views.toLocaleString()} tayangan
                      </div>
                      <div className="text-[10px] font-bold text-green-700 font-mono bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                        {art.trend}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* PENDING CURATION QUEUE QUICK CARD */}
            <div className="rounded-xl border border-jp-gray-300 bg-white p-4 sm:p-6 md:p-7 shadow-2xs space-y-4 sm:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-jp-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-brown-100 text-jp-brown-900 text-xs font-bold shrink-0">
                    <Eye className="h-3.5 w-3.5" />
                  </span>
                  <Heading3 className="text-base sm:text-lg text-jp-ink font-bold font-serif">
                    Antrean Kurasi Editorial
                  </Heading3>
                </div>
                <Badge variant={pendingSubmissions.length > 0 ? "brown" : "lime"} size="sm">
                  {pendingSubmissions.length} Menunggu
                </Badge>
              </div>

              {pendingSubmissions.length > 0 ? (
                <div className="space-y-3">
                  {pendingSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="rounded-lg border border-jp-gray-200 bg-jp-paper/40 p-3.5 sm:p-4 space-y-2.5 hover:border-jp-brown-300 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <span className="text-xs font-bold text-jp-ink">
                          {sub.title}
                        </span>
                        <Badge variant="outline" size="sm" className="self-start">
                          {sub.category}
                        </Badge>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-jp-gray-500 font-mono">
                        <span>Penulis: {sub.author}</span>
                        <span>{sub.date}</span>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <Link href={`/admin/kurasi/${encodeURIComponent(sub.id)}`} className="w-full sm:w-auto">
                          <Button variant="outline" size="sm" className="rounded-lg text-xs py-1 h-8 w-full sm:w-auto cursor-pointer">
                            Buka & Tinjau Naskah →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-jp-gray-300 bg-jp-paper/30 p-8 text-center space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-800 mx-auto">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-bold text-jp-ink font-heading">
                    Semua Naskah Telah Ditinjau
                  </div>
                  <p className="text-[11px] text-jp-gray-500 font-prose">
                    Tidak ada antrean naskah kiriman yang menunggu kurasi saat ini.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
