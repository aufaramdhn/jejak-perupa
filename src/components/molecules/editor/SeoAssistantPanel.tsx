"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/atoms/typography/Badge";
import {
  Search,
  Share2,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Laptop,
  ChevronDown,
  ChevronUp,
  Globe,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SeoAssistantPanelProps {
  title: string;
  excerpt: string;
  category: string;
  authorName: string;
  coverImageUrl?: string;
  chapters: { title: string; content: string }[];
  references: { citation: string }[];
  focusKeyword: string;
  setFocusKeyword: (val: string) => void;
  siteUrl?: string;
  className?: string;
}

export function SeoAssistantPanel({
  title,
  excerpt,
  category,
  authorName,
  coverImageUrl,
  chapters,
  references,
  focusKeyword,
  setFocusKeyword,
  siteUrl = "https://jejak-perupa.vercel.app",
  className,
}: SeoAssistantPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [previewTab, setPreviewTab] = useState<"google" | "social">("google");
  const [devicePreview, setDevicePreview] = useState<"desktop" | "mobile">("desktop");

  // Slug preview computation
  const previewSlug = useMemo(() => {
    if (!title.trim()) return "judul-artikel-anda";
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, [title]);

  // Strip HTML tags for word count analysis
  const fullTextContent = useMemo(() => {
    const rawChapters = chapters.map((c) => `${c.title} ${c.content.replace(/<[^>]*>?/gm, " ")}`).join(" ");
    return `${title} ${excerpt} ${rawChapters}`.toLowerCase();
  }, [title, excerpt, chapters]);

  // Word count computation
  const totalWords = useMemo(() => {
    const words = fullTextContent.trim().split(/\s+/).filter(Boolean);
    return words.length;
  }, [fullTextContent]);

  // Focus Keyword Analysis Engine
  const analysis = useMemo(() => {
    const kw = focusKeyword.trim().toLowerCase();
    if (!kw) {
      return {
        keywordSet: false,
        score: 40,
        density: 0,
        occurrences: 0,
        checks: [],
      };
    }

    const titleLower = title.toLowerCase();
    const excerptLower = excerpt.toLowerCase();
    const firstChapterLower = (chapters[0]?.content || "").replace(/<[^>]*>?/gm, " ").toLowerCase();
    const chapterTitlesLower = chapters.map((c) => c.title.toLowerCase()).join(" ");

    // Occurrences count
    const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
    const matches = fullTextContent.match(regex) || [];
    const occurrences = matches.length;

    // Density
    const kwWordCount = kw.split(/\s+/).length;
    const density = totalWords > 0 ? (occurrences * kwWordCount * 100) / totalWords : 0;

    // Checklist rules
    const hasInTitle = titleLower.includes(kw);
    const hasInExcerpt = excerptLower.includes(kw);
    const hasInFirstParagraph = firstChapterLower.includes(kw);
    const hasInHeading = chapterTitlesLower.includes(kw);
    const isDensityOptimal = density >= 0.8 && density <= 2.5;
    const isWordCountGood = totalWords >= 400;
    const isExcerptLengthGood = excerpt.length >= 80 && excerpt.length <= 180;
    const hasCoverImage = Boolean(coverImageUrl && coverImageUrl.trim().length > 0);
    const hasReferences = references.length >= 1;

    const checks = [
      {
        id: "title-kw",
        label: "Kata kunci tercantum dalam Judul Utama (H1)",
        passed: hasInTitle,
        recommendation: hasInTitle ? "Judul memuat kata kunci sasaran." : "Sisipkan kata kunci sasaran di dalam judul utama.",
      },
      {
        id: "excerpt-kw",
        label: "Kata kunci tercantum dalam Ringkasan (Meta Description)",
        passed: hasInExcerpt,
        recommendation: hasInExcerpt ? "Ringkasan memuat kata kunci sasaran." : "Tambahkan kata kunci pada ringkasan artikel.",
      },
      {
        id: "excerpt-len",
        label: `Panjang Ringkasan Ideal (${excerpt.length} / 120-160 karakter)`,
        passed: isExcerptLengthGood,
        recommendation: isExcerptLengthGood ? "Panjang ringkasan proporsional untuk cuplikan Google." : "Usahakan panjang ringkasan antara 80 - 180 karakter.",
      },
      {
        id: "first-para",
        label: "Kata kunci tercantum pada Paragraf Pembuka Bab 1",
        passed: hasInFirstParagraph,
        recommendation: hasInFirstParagraph ? "Kata kunci hadir di awal pembahasan." : "Sebutkan kata kunci sasaran pada 1-2 kalimat awal bab pertama.",
      },
      {
        id: "subheadings",
        label: "Kata kunci tercantum pada Subjudul Bab (H2/H3)",
        passed: hasInHeading,
        recommendation: hasInHeading ? "Subjudul bab memuat variasi kata kunci." : "Gunakan kata kunci atau variasinya pada minimal satu subjudul bab.",
      },
      {
        id: "density",
        label: `Kerapatan Kata Kunci: ${density.toFixed(1)}% (${occurrences} kali muncul)`,
        passed: isDensityOptimal,
        recommendation: isDensityOptimal
          ? "Kerapatan kata kunci seimbang (ideal 0.8% - 2.5%)."
          : density < 0.8
          ? "Kerapatan kata kunci masih rendah. Tambahkan penyebutan alami di dalam teks."
          : "Kerapatan kata kunci terlalu tinggi. Kurangi pengulangan agar tidak terbaca spam.",
      },
      {
        id: "word-count",
        label: `Kedalaman Konten (${totalWords} kata)`,
        passed: isWordCountGood,
        recommendation: isWordCountGood ? "Jumlah kata memadai untuk artikel edukatif." : "Disarankan minimal 400 kata untuk ulasan komprehensif.",
      },
      {
        id: "cover-img",
        label: "Foto Sampul Utama Tersedia",
        passed: hasCoverImage,
        recommendation: hasCoverImage ? "Foto sampul siap disajikan sebagai OpenGraph thumbnail." : "Lengkapi foto sampul untuk meningkatkan rasio klik (CTR).",
      },
      {
        id: "references",
        label: "Daftar Rujukan & Literatur Ilmiah",
        passed: hasReferences,
        recommendation: hasReferences ? "Rujukan akademik memperkuat kredibilitas (E-E-A-T)." : "Cantumkan minimal 1 literatur/buku rujukan kuratorial.",
      },
    ];

    const passedCount = checks.filter((c) => c.passed).length;
    const score = Math.round((passedCount / checks.length) * 100);

    return {
      keywordSet: true,
      score,
      density,
      occurrences,
      checks,
    };
  }, [focusKeyword, title, excerpt, chapters, references, coverImageUrl, totalWords, fullTextContent]);

  return (
    <div className={cn("rounded-xl border border-jp-gray-300 bg-white shadow-2xs font-sans overflow-hidden", className)}>
      {/* PANEL HEADER / ACCORDION TOGGLE */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-jp-paper/70 hover:bg-jp-paper border-b border-jp-gray-200 transition text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-900 text-white shadow-xs">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-sm md:text-base text-jp-ink">
                Asisten Optimasi SEO & Kata Kunci
              </span>
              {analysis.keywordSet && (
                <Badge
                  variant={analysis.score >= 80 ? "lime" : analysis.score >= 50 ? "brown" : "gray"}
                  size="sm"
                >
                  Skor: {analysis.score}/100
                </Badge>
              )}
            </div>
            <p className="text-xs text-jp-gray-600 font-sans">
              Analisis struktur naskah, keterbacaan, dan pratinjau cuplikan mesin pencari Google.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isOpen ? <ChevronUp className="h-5 w-5 text-jp-gray-500" /> : <ChevronDown className="h-5 w-5 text-jp-gray-500" />}
        </div>
      </button>

      {/* PANEL CONTENT */}
      {isOpen && (
        <div className="p-6 md:p-8 space-y-6">
          {/* FOCUS KEYWORD INPUT */}
          <div className="space-y-1.5">
            <label className="flex items-center justify-between text-xs font-bold text-jp-ink">
              <span>Kata Kunci Sasaran (Focus Keyword)</span>
              <span className="text-[11px] font-normal text-jp-gray-500">
                Opsional untuk analisis kualitas penulisan
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="Contoh: lukisan raden saleh, teknik impasto, seni rupa murni"
                className="w-full rounded-lg border border-jp-gray-300 bg-white pl-9 pr-4 py-2 text-xs md:text-sm text-jp-ink outline-none transition focus:border-jp-blue-700"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-jp-gray-400" />
            </div>
          </div>

          {/* CHECKLIST & ANALYSIS */}
          {analysis.keywordSet ? (
            <div className="rounded-xl border border-jp-gray-200 bg-jp-paper/50 p-4 sm:p-5 space-y-3.5">
              <div className="flex items-center justify-between border-b border-jp-gray-200 pb-2.5">
                <div className="font-heading font-bold text-xs uppercase tracking-wider text-jp-ink">
                  Checklist Kesiapan Mesin Pencari
                </div>
                <div className="text-xs font-mono font-semibold text-jp-gray-600">
                  {analysis.checks.filter((c) => c.passed).length} dari {analysis.checks.length} terpenuhi
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {analysis.checks.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-start gap-2.5 rounded-lg border p-2.5 transition text-xs",
                      item.passed
                        ? "border-emerald-200 bg-emerald-50/40 text-emerald-950"
                        : "border-jp-gray-200 bg-white text-jp-gray-700"
                    )}
                  >
                    {item.passed ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-[11px] text-jp-gray-600 leading-tight">
                        {item.recommendation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-jp-gray-300 bg-jp-paper/40 p-4 text-center">
              <p className="text-xs text-jp-gray-600">
                Ketikkan kata kunci sasaran di atas untuk mengaktifkan audit real-time relevansi teks, kerapatan istilah, dan keterbacaan Google.
              </p>
            </div>
          )}

          {/* PREVIEW TABS: GOOGLE SERP vs SOCIAL SHARE */}
          <div className="space-y-3 pt-2 border-t border-jp-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 rounded-lg border border-jp-gray-300 bg-jp-paper p-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPreviewTab("google")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 transition cursor-pointer",
                    previewTab === "google"
                      ? "bg-white text-jp-blue-900 shadow-2xs font-bold"
                      : "text-jp-gray-600 hover:text-jp-ink"
                  )}
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Google Search Preview</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewTab("social")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 transition cursor-pointer",
                    previewTab === "social"
                      ? "bg-white text-jp-blue-900 shadow-2xs font-bold"
                      : "text-jp-gray-600 hover:text-jp-ink"
                  )}
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Social Share Preview</span>
                </button>
              </div>

              {previewTab === "google" && (
                <div className="flex items-center gap-1 rounded-lg border border-jp-gray-300 bg-white p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setDevicePreview("desktop")}
                    className={cn(
                      "p-1.5 rounded transition cursor-pointer",
                      devicePreview === "desktop" ? "bg-jp-blue-50 text-jp-blue-900" : "text-jp-gray-400 hover:text-jp-ink"
                    )}
                    title="Pratinjau Desktop"
                  >
                    <Laptop className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDevicePreview("mobile")}
                    className={cn(
                      "p-1.5 rounded transition cursor-pointer",
                      devicePreview === "mobile" ? "bg-jp-blue-50 text-jp-blue-900" : "text-jp-gray-400 hover:text-jp-ink"
                    )}
                    title="Pratinjau Mobile"
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* PREVIEW CONTAINER */}
            {previewTab === "google" ? (
              <div className="rounded-xl border border-jp-gray-300 bg-white p-4 sm:p-6 shadow-xs font-sans">
                <div className={cn("space-y-1.5", devicePreview === "mobile" ? "max-w-sm" : "max-w-xl")}>
                  {/* BREADCRUMB / URL */}
                  <div className="flex items-center gap-1.5 text-xs text-[#202124]">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-jp-blue-900 text-[10px] font-bold text-white">
                      JP
                    </div>
                    <div className="flex items-center gap-1 truncate text-[12px] text-[#4d5156]">
                      <span>{siteUrl.replace(/^https?:\/\//, "")}</span>
                      <span>›</span>
                      <span>artikel</span>
                      <span>›</span>
                      <span className="truncate">{previewSlug}</span>
                    </div>
                  </div>

                  {/* SERP TITLE */}
                  <div className="font-sans text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug">
                    {title.trim() ? `${title} : Jejak Perupa` : "Judul Artikel : Jejak Perupa"}
                  </div>

                  {/* SERP SNIPPET / EXCERPT */}
                  <p className="text-xs sm:text-[13px] text-[#4d5156] leading-relaxed line-clamp-2">
                    {excerpt.trim()
                      ? excerpt
                      : "Ringkasan artikel kuratorial seni rupa nusantara yang disajikan secara ringkas dan mudah dipahami pembelajar seni..."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-jp-gray-300 bg-white overflow-hidden shadow-xs max-w-md font-sans">
                {/* OPENGRAPH IMAGE MOCKUP */}
                <div className="relative h-44 w-full bg-jp-paper border-b border-jp-gray-200 flex items-center justify-center">
                  {coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={coverImageUrl}
                      alt={title || "Cover Artikel"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-jp-gray-400">
                      <Layers className="h-8 w-8" />
                      <span className="text-xs">Thumbnail OpenGraph Artikel</span>
                    </div>
                  )}
                </div>

                {/* OPENGRAPH TEXT */}
                <div className="p-3.5 space-y-1 bg-jp-paper/30">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-jp-gray-500">
                    {siteUrl.replace(/^https?:\/\//, "").toUpperCase()}
                  </div>
                  <div className="font-heading font-bold text-sm text-jp-ink line-clamp-1">
                    {title.trim() ? title : "Judul Lengkap Artikel Edukasi Seni Rupa"}
                  </div>
                  <p className="text-xs text-jp-gray-600 line-clamp-2 font-prose">
                    {excerpt.trim() ? excerpt : "Deskripsi ringkas yang akan tampil saat dibagikan ke platform perpesanan dan media sosial."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
