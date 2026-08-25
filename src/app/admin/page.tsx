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
  AlertCircle,
  Layers,
  SlidersHorizontal,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminOverviewPage() {
  const { alert } = useModal();
  const { activePreset, enabledCount, totalCount } = useFeatureFlags();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const articles = artService.getAllArticles();
  const artists = artService.getAllArtists();
  const terms = artService.getAllGlossaryTerms();
  const events = artService.getAllEvents();

  // Top 5 popular articles
  const topArticles = [
    {
      title: "Mengenal Program Studi Seni Rupa Murni",
      category: "Pendidikan Seni",
      views: 3420,
      readTime: "8 mnt",
      trend: "+24%",
    },
    {
      title: "Romantisisme Raden Saleh: Antara Jawa dan Eropa",
      category: "Sejarah Seni",
      views: 2890,
      readTime: "7 mnt",
      trend: "+19%",
    },
    {
      title: "Mengenal Dasar Teknik Cat Air & Transparansi",
      category: "Teknik Seni",
      views: 2410,
      readTime: "6 mnt",
      trend: "+12%",
    },
    {
      title: "Mengapa Kita Perlu Belajar Sejarah Seni?",
      category: "Teori Seni",
      views: 1980,
      readTime: "7 mnt",
      trend: "+8%",
    },
  ];

  // Quick submissions queue
  const pendingSubmissions = [
    {
      id: "sub-1",
      title: "Membaca Garis dan Ekspresi dalam Sketsa Revolusi",
      author: "Dian Sastro (Mahasiswa Seni Rupa)",
      category: "Sejarah Seni",
      date: "24 Agustus 2026",
    },
    {
      id: "sub-2",
      title: "Eksplorasi Pigmen Alami Tanah Liat di Studio Keramik",
      author: "Budi Santoso (Pengkaji Kriya)",
      category: "Teknik Seni",
      date: "22 Agustus 2026",
    },
  ];

  return (
    <AdminLayout
      title="Ringkasan & Analitik Platform"
      subtitle="Pantau dinamika pembaca, perkembangan artikel kuratorial, dan evaluasi naskah masuk."
      actionButton={
        <Link href="/admin/kurasi">
          <Button variant="primary" size="sm" className="rounded-lg">
            <Eye className="h-4 w-4 mr-1.5" />
            Buka Meja Kurasi (2)
          </Button>
        </Link>
      }
    >
      <div className="space-y-8 font-sans">
        {/* RELEASE PHASE STATUS BAR */}
        <div className="rounded-xl border border-jp-blue-200 bg-jp-blue-50/70 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
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

          <Link href="/admin/rilis">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-lg text-xs border-jp-blue-300 bg-white text-jp-blue-900 hover:bg-jp-blue-50"
            >
              <SlidersHorizontal className="h-3 w-3 mr-1.5" />
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
                <span className="font-mono text-3xl font-extrabold text-jp-ink">
                  {articles.length}
                </span>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                  +4 Bulan Ini
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
                <span className="font-mono text-3xl font-extrabold text-jp-ink">
                  {artists.length}
                </span>
                <span className="text-xs font-bold text-jp-brown-800 bg-jp-brown-50 px-2 py-0.5 rounded-md border border-jp-brown-200">
                  Arsip Lengkap
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
                <span className="font-mono text-3xl font-extrabold text-jp-ink">
                  {terms.length}
                </span>
                <span className="text-xs font-bold text-jp-gray-600 bg-jp-paper px-2 py-0.5 rounded-md border border-jp-gray-200">
                  Entri Bahasa Rupa
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
                  2
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
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* TOP PERFORMING ARTICLES */}
            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-7 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-jp-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-blue-100 text-jp-blue-900 text-xs font-bold">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </span>
                  <Heading3 className="text-lg text-jp-ink">
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

              <div className="space-y-3">
                {topArticles.map((art, idx) => (
                  <div
                    key={art.title}
                    className="flex items-center justify-between gap-3 rounded-lg border border-jp-gray-200 bg-jp-paper/30 p-3.5 hover:border-jp-blue-300 transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-xs font-bold text-jp-gray-400 w-5 text-center shrink-0">
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate text-xs font-bold text-jp-ink">
                          {art.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-jp-gray-500 font-mono">
                          <span>{art.category}</span>
                          <span>·</span>
                          <span>{art.readTime} baca</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono text-xs font-bold text-jp-ink">
                        {art.views.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-bold text-green-700 font-mono">
                        {art.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PENDING CURATION QUEUE QUICK CARD */}
            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-7 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-jp-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-brown-100 text-jp-brown-900 text-xs font-bold">
                    <Eye className="h-3.5 w-3.5" />
                  </span>
                  <Heading3 className="text-lg text-jp-ink">
                    Antrean Kurasi Editorial
                  </Heading3>
                </div>
                <Badge variant="brown" size="sm">
                  2 Menunggu
                </Badge>
              </div>

              <div className="space-y-3">
                {pendingSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-lg border border-jp-gray-200 bg-jp-paper/40 p-4 space-y-2 hover:border-jp-brown-300 transition"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-jp-ink">
                        {sub.title}
                      </span>
                      <Badge variant="outline" size="sm">
                        {sub.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-jp-gray-500 font-mono">
                      <span>Oleh: {sub.author}</span>
                      <span>{sub.date}</span>
                    </div>
                    <div className="pt-2 flex justify-end">
                      <Link href="/admin/kurasi">
                        <Button variant="outline" size="sm" className="rounded-lg text-xs py-1 h-7">
                          Buka & Tinjau Naskah →
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
