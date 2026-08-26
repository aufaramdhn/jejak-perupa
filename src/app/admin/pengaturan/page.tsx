"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { Input } from "@/components/atoms/form/Input";
import { Button } from "@/components/atoms/form/Button";
import { ColorPicker } from "@/components/atoms/form/ColorPicker";
import { Badge } from "@/components/atoms/typography/Badge";
import { Modal } from "@/components/atoms/feedback/Modal";
import { ImageDualInput } from "@/components/molecules/editor/ImageDualInput";
import { PeruChanMascotSlider } from "@/components/organisms/peruchan/PeruChanMascotSlider";
import { PeruChanTipBanner } from "@/components/organisms/peruchan/PeruChanTipBanner";
import { AdminSettingsSkeleton } from "@/components/organisms/admin/AdminSettingsSkeleton";
import { useSiteSettings } from "@/lib/siteContext";
import { useModal } from "@/lib/modalContext";
import { MascotSlideItem, PeruChanQuoteItem } from "@/lib/data/siteSettings";
import {
  Sparkles,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Image as ImageIcon,
  Edit2,
  Globe,
  Mail,
  Share2,
  CheckCircle,
  Eye,
  EyeOff,
  MessageSquareQuote,
  Check,
  X,
  Shuffle,
  Layers,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsTabId = "slideshow" | "quotes" | "branding" | "editorial";

export default function AdminPengaturanPage() {
  const {
    settings,
    updateSettings,
    addMascotSlide,
    updateMascotSlide,
    deleteMascotSlide,
    addQuote,
    updateQuote,
    deleteQuote,
    toggleQuoteActive,
    resetToDefault,
  } = useSiteSettings();
  const { confirm, alert } = useModal();

  // Active topbar sub-nav tab state
  const [activeTab, setActiveTab] = useState<SettingsTabId>("slideshow");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tabId: SettingsTabId) => {
    if (tabId === activeTab) return;
    setIsLoading(true);
    setActiveTab(tabId);
    setTimeout(() => {
      setIsLoading(false);
    }, 250);
  };

  // Local form state for Site Info
  const [siteName, setSiteName] = useState(settings.siteName);
  const [siteTagline, setSiteTagline] = useState(settings.siteTagline);
  const [logoInitials, setLogoInitials] = useState(settings.logoInitials);
  const [logoImageUrl, setLogoImageUrl] = useState(settings.logoImageUrl || "");
  const [faviconUrl, setFaviconUrl] = useState(settings.faviconUrl || "");
  const [heroEditionBadge, setHeroEditionBadge] = useState(settings.heroEditionBadge);
  const [heroHeadline, setHeroHeadline] = useState(settings.heroHeadline);
  const [heroDescription, setHeroDescription] = useState(settings.heroDescription);
  const [aboutVision, setAboutVision] = useState(settings.aboutVision);
  const [aboutMission, setAboutMission] = useState(settings.aboutMission);
  const [aboutPhilosophy, setAboutPhilosophy] = useState(settings.aboutPhilosophy);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl);

  // Sync state when settings loaded
  useEffect(() => {
    setSiteName(settings.siteName);
    setSiteTagline(settings.siteTagline);
    setLogoInitials(settings.logoInitials);
    setLogoImageUrl(settings.logoImageUrl || "");
    setFaviconUrl(settings.faviconUrl || "");
    setHeroEditionBadge(settings.heroEditionBadge);
    setHeroHeadline(settings.heroHeadline);
    setHeroDescription(settings.heroDescription);
    setAboutVision(settings.aboutVision);
    setAboutMission(settings.aboutMission);
    setAboutPhilosophy(settings.aboutPhilosophy);
    setContactEmail(settings.contactEmail);
    setInstagramUrl(settings.instagramUrl);
  }, [settings]);

  // Mascot slide modal/form state
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [slideTitle, setSlideTitle] = useState("");
  const [slideSubtitle, setSlideSubtitle] = useState("");
  const [slideQuote, setSlideQuote] = useState("");
  const [slideImageUrl, setSlideImageUrl] = useState("");
  const [slideAccent, setSlideAccent] = useState<string>("#182C4A");
  const [slideImageMode, setSlideImageMode] = useState<"official" | "custom">("official");

  // Quotes Library modal/form state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [quoteText, setQuoteText] = useState("");
  const [quoteCategoryBadge, setQuoteCategoryBadge] = useState("Catatan Santai Peru-Chan");
  const [quoteImageSrc, setQuoteImageSrc] = useState("/images/mascot/peruchan-drawing.png");
  const [quoteIsActive, setQuoteIsActive] = useState(true);
  const [quoteImageMode, setQuoteImageMode] = useState<"official" | "custom">("official");

  // Toggle preview visibility states
  const [showSlideshowPreview, setShowSlideshowPreview] = useState(false);
  const [showQuotesPreview, setShowQuotesPreview] = useState(false);

  // 4 Official Mascot Poses
  const officialMascotPoses = [
    {
      src: "/images/mascot/peruchan-drawing.png",
      label: "Menggambar & Praktik Studio",
      shortLabel: "Drawing",
    },
    {
      src: "/images/mascot/peruchan-investigate.png",
      label: "Meneliti & Telaah Kuratorial",
      shortLabel: "Investigate",
    },
    {
      src: "/images/mascot/peruchan-reading.png",
      label: "Membaca & Sejarah Seni",
      shortLabel: "Reading",
    },
    {
      src: "/images/mascot/peruchan-excited.png",
      label: "Semangat & Motivasi Belajar",
      shortLabel: "Excited",
    },
  ];

  // Preset Quote Categories
  const quoteCategoryPresets = [
    "Catatan Santai Peru-Chan",
    "Telaah Kuratorial Maestro",
    "Laboratorium Studio Seni",
    "Dialektika Sejarah Seni",
    "Tips Apresiasi Karya",
    "Fakta Menarik Seni Rupa",
  ];

  // Navigation Tabs Configuration
  const tabs: {
    id: SettingsTabId;
    label: string;
    icon: React.ReactNode;
    count?: number;
  }[] = [
    {
      id: "slideshow",
      label: "Slideshow Karakter Peru-Chan",
      icon: <Sparkles className="h-4 w-4" />,
      count: settings.mascotSlides.length,
    },
    {
      id: "quotes",
      label: "Library Quotes & Tips",
      icon: <MessageSquareQuote className="h-4 w-4" />,
      count: settings.quotes?.length || 0,
    },
    {
      id: "branding",
      label: "Identitas, Logo, & Favicon",
      icon: <ImageIcon className="h-4 w-4" />,
    },
    {
      id: "editorial",
      label: "Teks Editorial Halaman",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  // MASCOT SLIDES HANDLERS
  const handleOpenAddSlide = () => {
    setEditingSlideId(null);
    setSlideTitle("");
    setSlideSubtitle("");
    setSlideQuote("");
    setSlideImageUrl("/images/mascot/peruchan-excited.png");
    setSlideAccent("#182C4A");
    setSlideImageMode("official");
    setIsSlideModalOpen(true);
  };

  const handleOpenEditSlide = (slide: MascotSlideItem) => {
    setEditingSlideId(slide.id);
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle);
    setSlideQuote(slide.quote);
    setSlideImageUrl(slide.imageUrl || "");
    setSlideAccent(slide.accentColor || "#182C4A");

    const isOfficial = officialMascotPoses.some((p) => p.src === slide.imageUrl);
    setSlideImageMode(isOfficial ? "official" : "custom");
    setIsSlideModalOpen(true);
  };

  const handleSaveSlideModal = () => {
    if (!slideTitle || !slideQuote) return;

    if (editingSlideId) {
      updateMascotSlide(editingSlideId, {
        title: slideTitle,
        subtitle: slideSubtitle,
        quote: slideQuote,
        imageUrl: slideImageUrl,
        accentColor: slideAccent,
      });
      alert({
        type: "success",
        title: "Slide Diperbarui",
        message: "Perubahan pose slide karakter berhasil disimpan.",
      });
    } else {
      addMascotSlide({
        title: slideTitle,
        subtitle: slideSubtitle,
        quote: slideQuote,
        imageUrl: slideImageUrl,
        accentColor: slideAccent,
        isActive: true,
      });
      alert({
        type: "success",
        title: "Slide Ditambahkan",
        message: "Pose karakter Peru-Chan baru berhasil ditambahkan ke slideshow.",
      });
    }
    setIsSlideModalOpen(false);
  };

  const handleDeleteSlide = async (id: string, title: string) => {
    const confirmed = await confirm({
      title: "Hapus Slide Karakter Ini?",
      message: `Slide "${title}" akan dihapus dari daftar tayang karakter Peru-Chan.`,
      confirmLabel: "Hapus Slide",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      deleteMascotSlide(id);
      alert({
        type: "success",
        title: "Slide Dihapus",
        message: "Slide karakter telah dikeluarkan dari tayangan.",
      });
    }
  };

  // QUOTES LIBRARY HANDLERS
  const handleOpenAddQuote = () => {
    setEditingQuoteId(null);
    setQuoteText("");
    setQuoteCategoryBadge("Catatan Santai Peru-Chan");
    setQuoteImageSrc("/images/mascot/peruchan-drawing.png");
    setQuoteIsActive(true);
    setQuoteImageMode("official");
    setIsQuoteModalOpen(true);
  };

  const handleOpenEditQuote = (q: PeruChanQuoteItem) => {
    setEditingQuoteId(q.id);
    setQuoteText(q.quoteText);
    setQuoteCategoryBadge(q.categoryBadge);
    setQuoteImageSrc(q.imageSrc || "/images/mascot/peruchan-drawing.png");
    setQuoteIsActive(q.isActive);

    const isOfficial = officialMascotPoses.some((p) => p.src === q.imageSrc);
    setQuoteImageMode(isOfficial ? "official" : "custom");
    setIsQuoteModalOpen(true);
  };

  const handleSaveQuoteModal = () => {
    if (!quoteText.trim()) return;

    if (editingQuoteId) {
      updateQuote(editingQuoteId, {
        quoteText: quoteText.trim(),
        categoryBadge: quoteCategoryBadge.trim(),
        imageSrc: quoteImageSrc,
        isActive: quoteIsActive,
      });
      alert({
        type: "success",
        title: "Kutipan Diperbarui",
        message: "Perubahan kutipan tips Peru-Chan berhasil disimpan.",
      });
    } else {
      addQuote({
        quoteText: quoteText.trim(),
        categoryBadge: quoteCategoryBadge.trim(),
        imageSrc: quoteImageSrc,
        isActive: quoteIsActive,
      });
      alert({
        type: "success",
        title: "Kutipan Ditambahkan",
        message: "Kutipan tips baru berhasil ditambahkan ke library tayangan beranda.",
      });
    }
    setIsQuoteModalOpen(false);
  };

  const handleDeleteQuote = async (id: string, text: string) => {
    const confirmed = await confirm({
      title: "Hapus Kutipan Tips Ini?",
      message: `Kutipan "${text.slice(0, 60)}..." akan dihapus secara permanen dari tayangan beranda.`,
      confirmLabel: "Hapus Kutipan",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      deleteQuote(id);
      alert({
        type: "info",
        title: "Kutipan Dihapus",
        message: "Kutipan telah dihapus dari library tayangan.",
      });
    }
  };

  const handleSaveGeneralSettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSettings({
      siteName,
      siteTagline,
      logoInitials,
      logoImageUrl,
      faviconUrl,
      heroEditionBadge,
      heroHeadline,
      heroDescription,
      aboutVision,
      aboutMission,
      aboutPhilosophy,
      contactEmail,
      instagramUrl,
    });
    alert({
      type: "success",
      title: "Pengaturan Disimpan",
      message: "Seluruh konfigurasi identitas situs, logo, favicon, dan narasi telah diperbarui.",
    });
  };

  const handleResetSettings = async () => {
    const confirmed = await confirm({
      title: "Reset ke Pengaturan Bawaan?",
      message: "Semua pengaturan nama, tagline, logo, favicon, slide maskot, dan library quotes akan dikembalikan ke setelan awal default.",
      confirmLabel: "Ya, Reset",
      cancelLabel: "Batal",
      variant: "warning",
      iconType: "alert",
    });

    if (confirmed) {
      resetToDefault();
      alert({
        type: "info",
        title: "Pengaturan Direset",
        message: "Konfigurasi situs telah dikembalikan ke standar awal.",
      });
    }
  };

  return (
    <AdminLayout
      title="Pengaturan Identitas Situs & Peru-Chan"
      subtitle="Kustomisasi logo, favicon, nama platform, narasi beranda, dan kelola galeri ilustrasi karakter serta quotes secara langsung."
      actionButton={
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetSettings}
            className="rounded-lg text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Reset Bawaan
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => handleSaveGeneralSettings()}
            className="rounded-lg text-xs"
          >
            <Save className="h-3.5 w-3.5 mr-1.5" />
            Simpan Perubahan
          </Button>
        </div>
      }
    >
      <div className="space-y-6 font-sans">
        {/* TOPBAR SUB-NAVIGATION TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs md:text-sm font-bold transition whitespace-nowrap cursor-pointer",
                  isActive
                    ? "bg-jp-blue-900 text-white shadow-2xs"
                    : "text-jp-gray-600 hover:text-jp-ink hover:bg-white border border-transparent hover:border-jp-gray-200"
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={cn(
                      "font-mono text-[10px] px-1.5 py-0.5 rounded-md font-bold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-jp-gray-200 text-jp-gray-700"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* LOADING SKELETON OR TAB CONTENT */}
        {isLoading ? (
          <AdminSettingsSkeleton activeTab={activeTab} />
        ) : (
          <>
            {/* TAB CONTENT 1: SLIDESHOW KARAKTER PERU-CHAN */}
            {activeTab === "slideshow" && (
          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jp-gray-100 pb-4">
              <div>
                <Heading3 className="text-lg text-jp-ink">
                  Galeri Slideshow Karakter Peru-Chan (Hero & Tentang)
                </Heading3>
                <p className="mt-1 text-xs text-jp-gray-500 font-prose">
                  Kelola pose ilustrasi, kutipan motivasi studio, dan tema aksen warna pada hero beranda.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSlideshowPreview(!showSlideshowPreview)}
                  className="rounded-lg text-xs font-bold border-jp-blue-300 text-jp-blue-900 hover:bg-jp-blue-50 cursor-pointer"
                >
                  {showSlideshowPreview ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                      Sembunyikan Pratinjau
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      Lihat Pratinjau
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleOpenAddSlide}
                  className="rounded-lg font-bold text-xs cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Tambah Slide Pose Baru
                </Button>
              </div>
            </div>

            {/* SLIDES GRID */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {settings.mascotSlides.map((slide, idx) => (
                <div
                  key={slide.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-jp-gray-200 bg-jp-paper/40 p-4 transition hover:border-jp-blue-300 hover:shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-lg bg-white border border-jp-gray-200">
                      {slide.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={slide.imageUrl}
                          alt={slide.title}
                          width={128}
                          height={128}
                          loading="lazy"
                          decoding="async"
                          className="max-h-32 object-contain transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-jp-blue-50 text-jp-blue-900">
                          <Sparkles className="h-6 w-6" />
                        </div>
                      )}
                      <span className="absolute top-2 left-2 rounded-md bg-jp-ink/80 px-2 py-0.5 font-mono text-[10px] font-bold text-white backdrop-blur-xs">
                        #{idx + 1}
                      </span>
                      <span className="absolute top-2 right-2">
                        <Badge
                          variant={
                            slide.accentColor === "lime"
                              ? "lime"
                              : slide.accentColor === "brown"
                              ? "brown"
                              : "blue"
                          }
                          size="sm"
                        >
                          {slide.accentColor}
                        </Badge>
                      </span>
                    </div>

                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-jp-gray-400">
                        {slide.subtitle || "CATATAN MASKOT"}
                      </div>
                      <div className="font-bold text-jp-ink text-sm truncate">
                        {slide.title}
                      </div>
                      <p className="mt-1 font-prose text-xs italic text-jp-gray-600 line-clamp-2">
                        &ldquo;{slide.quote}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-1.5 border-t border-jp-gray-200/60 pt-3">
                    <button
                      type="button"
                      onClick={() => handleOpenEditSlide(slide)}
                      title="Edit Slide"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(slide.id, slide.title)}
                      title="Hapus Slide"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TOGGLEABLE LIVE PREVIEW SLIDER */}
            {showSlideshowPreview && (
              <div className="rounded-xl border border-jp-blue-200 bg-jp-blue-50/50 p-6 space-y-4 animate-in fade-in zoom-in-98 duration-200">
                <div className="flex items-center justify-between border-b border-jp-blue-200/80 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-jp-blue-900 uppercase tracking-wider">
                    <Eye className="h-4 w-4" />
                    Pratinjau Langsung Slideshow Peru-Chan (1:1)
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSlideshowPreview(false)}
                    className="text-xs font-semibold text-jp-blue-700 hover:text-jp-blue-900 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <EyeOff className="h-3.5 w-3.5" />
                    Sembunyikan
                  </button>
                </div>

                <div className="w-full flex items-center justify-center py-2">
                  <PeruChanMascotSlider autoPlayInterval={5000} className="mx-auto shadow-md" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT 2: LIBRARY QUOTES & TIPS */}
        {activeTab === "quotes" && (
          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jp-gray-100 pb-4">
              <div>
                <Heading3 className="text-lg text-jp-ink">
                  Library Quotes & Tips Kuratorial Peru-Chan
                </Heading3>
                <p className="mt-1 text-xs text-jp-gray-500 font-prose">
                  Koleksi kutipan tips yang tayang berganti otomatis (*game loading screen style*) di bagian bawah beranda.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQuotesPreview(!showQuotesPreview)}
                  className="rounded-lg text-xs font-bold border-jp-blue-300 text-jp-blue-900 hover:bg-jp-blue-50 cursor-pointer"
                >
                  {showQuotesPreview ? (
                    <>
                      <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                      Sembunyikan Pratinjau
                    </>
                  ) : (
                    <>
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      Lihat Pratinjau
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleOpenAddQuote}
                  className="rounded-lg font-bold text-xs cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Tambah Kutipan Baru
                </Button>
              </div>
            </div>

            {/* QUOTES LIST */}
            <div className="grid gap-4 sm:grid-cols-2">
              {(settings.quotes || []).map((q, idx) => (
                <div
                  key={q.id}
                  className={cn(
                    "relative flex flex-col justify-between rounded-xl border p-5 transition shadow-2xs",
                    q.isActive
                      ? "border-jp-gray-300 bg-white hover:border-jp-blue-400"
                      : "border-jp-gray-200 bg-jp-paper/50 opacity-60"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 border-b border-jp-gray-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-jp-blue-900 bg-jp-blue-50 px-2 py-0.5 rounded border border-jp-blue-200">
                          {q.categoryBadge}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleQuoteActive(q.id)}
                        className={cn(
                          "rounded-md px-2 py-0.5 text-[10px] font-bold font-mono transition cursor-pointer border",
                          q.isActive
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-500 border-gray-200"
                        )}
                      >
                        {q.isActive ? "Aktif Tayang" : "Non-Aktif"}
                      </button>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-jp-blue-50 border border-jp-blue-100 p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={q.imageSrc || "/images/mascot/peruchan-drawing.png"}
                          alt="Peru-Chan"
                          width={56}
                          height={56}
                          loading="lazy"
                          decoding="async"
                          className="max-h-14 object-contain"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="font-heading text-sm md:text-base italic text-jp-ink leading-relaxed">
                          &ldquo;{q.quoteText}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-jp-gray-100 pt-3 text-xs text-jp-gray-400 font-mono">
                    <span>Slot #{idx + 1}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditQuote(q)}
                        title="Edit Kutipan"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteQuote(q.id, q.quoteText)}
                        title="Hapus Kutipan"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* TOGGLEABLE LIVE PREVIEW OF GAME TIPS SLIDESHOW */}
            {showQuotesPreview && (
              <div className="rounded-xl border border-jp-blue-200 bg-jp-blue-50/50 p-6 space-y-4 animate-in fade-in zoom-in-98 duration-200">
                <div className="flex items-center justify-between border-b border-jp-blue-200/80 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-jp-blue-900 uppercase tracking-wider">
                    <Eye className="h-4 w-4" />
                    Pratinjau Live Banner Tips Beranda (Auto-Slideshow)
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowQuotesPreview(false)}
                    className="text-xs font-semibold text-jp-blue-700 hover:text-jp-blue-900 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <EyeOff className="h-3.5 w-3.5" />
                    Sembunyikan
                  </button>
                </div>

                <div className="w-full flex items-center justify-center py-2">
                  <div className="w-full max-w-4xl">
                    <PeruChanTipBanner
                      autoPlayInterval={4000}
                      className="px-0 sm:px-0 lg:px-0 pb-0 lg:pb-0 mx-auto"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT 3: IDENTITAS, LOGO, & FAVICON */}
        {activeTab === "branding" && (
          <form onSubmit={handleSaveGeneralSettings} className="space-y-6">
            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
              <div className="border-b border-jp-gray-100 pb-4">
                <Heading3 className="text-lg text-jp-ink">
                  Identitas Brand, Logo, & Favicon Situs
                </Heading3>
                <p className="mt-1 text-xs text-jp-gray-500 font-prose">
                  Konfigurasi logo visual, ikon favicon tab browser, nama platform, tagline, dan kontak redaksi resmi.
                </p>
              </div>

              {/* LOGO & FAVICON DUAL INPUT GRID */}
              <div className="grid gap-6 sm:grid-cols-2 p-5 rounded-xl bg-jp-paper/60 border border-jp-gray-200">
                {/* LOGO PLATFORM */}
                <ImageDualInput
                  label="Logo Platform (Resmi)"
                  value={logoImageUrl}
                  onChange={setLogoImageUrl}
                  placeholderUrl="https://domain.com/logo-jejak-perupa.png"
                  helperGuideline="Rekomendasi rasio 1:1 atau horizontal, resolusi minimal 128×128 px hingga 512×512 px, format PNG transparan atau SVG, ukuran maksimal 2 MB."
                  minWidth={128}
                  minHeight={128}
                  maxSizeBytes={2 * 1024 * 1024}
                  maxSizeLabel="2 MB"
                  previewObjectFit="contain"
                  previewClassName="h-16 w-16 bg-white p-1"
                />

                {/* FAVICON BROWSER */}
                <ImageDualInput
                  label="Favicon Browser (Ikon Tab)"
                  value={faviconUrl}
                  onChange={setFaviconUrl}
                  placeholderUrl="https://domain.com/favicon.ico"
                  helperGuideline="Rekomendasi rasio 1:1 (persegi), ukuran standar 32×32 px atau 64×64 px, format ICO atau PNG transparan, ukuran maksimal 500 KB."
                  minWidth={32}
                  minHeight={32}
                  maxSizeBytes={512 * 1024}
                  maxSizeLabel="500 KB"
                  previewObjectFit="contain"
                  previewClassName="h-12 w-12 bg-white p-1"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Nama Platform
                  </label>
                  <Input
                    type="text"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Tagline Kuratorial
                  </label>
                  <Input
                    type="text"
                    value={siteTagline}
                    onChange={(e) => setSiteTagline(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Inisial Logo Avatar (Fallback Jika Logo Kosong)
                  </label>
                  <Input
                    type="text"
                    value={logoInitials}
                    onChange={(e) => setLogoInitials(e.target.value)}
                    maxLength={4}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Email Kontak Redaksi
                  </label>
                  <Input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* SAVE ACTION */}
              <div className="flex justify-end pt-4 border-t border-jp-gray-100">
                <Button type="submit" variant="primary" size="md" className="rounded-lg">
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Identitas & Logo
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* TAB CONTENT 4: TEKS EDITORIAL */}
        {activeTab === "editorial" && (
          <form onSubmit={handleSaveGeneralSettings} className="space-y-6">
            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
              <div className="border-b border-jp-gray-100 pb-4">
                <Heading3 className="text-lg text-jp-ink">
                  Teks Editorial Beranda & Halaman Tentang
                </Heading3>
                <p className="mt-1 text-xs text-jp-gray-500 font-prose">
                  Narasi filosofi, visi kuratorial, dan deskripsi pembuka yang tampil di halaman beranda dan tentang kami.
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Headline Utama Beranda
                  </label>
                  <Input
                    type="text"
                    value={heroHeadline}
                    onChange={(e) => setHeroHeadline(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Deskripsi Narasi Hero
                  </label>
                  <textarea
                    rows={3}
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Visi Platform
                  </label>
                  <textarea
                    rows={3}
                    value={aboutVision}
                    onChange={(e) => setAboutVision(e.target.value)}
                    className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed"
                  />
                </div>
              </div>

              {/* SAVE ACTION */}
              <div className="flex justify-end pt-4 border-t border-jp-gray-100">
                <Button type="submit" variant="primary" size="md" className="rounded-lg">
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Teks Editorial
                </Button>
              </div>
            </div>
          </form>
        )}
          </>
        )}

        {/* MODAL EDIT / TAMBAH SLIDE MASCOT (2-COLUMN RESPONSIVE LAYOUT) */}
        {isSlideModalOpen && (
          <Modal isOpen={true} onClose={() => setIsSlideModalOpen(false)} maxWidth="3xl">
            {/* STICKY MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-jp-gray-200 bg-jp-paper/80 px-6 py-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-900 text-white shadow-2xs">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <Heading3 className="text-base sm:text-lg text-jp-ink font-heading font-bold">
                    {editingSlideId ? "Edit Pose Karakter Peru-Chan" : "Tambah Pose Karakter Peru-Chan"}
                  </Heading3>
                  <p className="text-[11px] text-jp-gray-500 font-sans">
                    Konfigurasi naskah motivasi dan pose visual untuk hero beranda.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSlideModalOpen(false)}
                className="rounded-lg p-1.5 text-jp-gray-400 hover:bg-jp-gray-100 hover:text-jp-ink transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* SCROLLABLE 2-COLUMN MODAL BODY */}
            <div className="flex-1 overflow-y-auto p-6 md:p-7 space-y-6 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* LEFT COLUMN: TEXT CONTENT & COLOR SELECTION */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                      Judul Pose / Ekspresi <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      value={slideTitle}
                      onChange={(e) => setSlideTitle(e.target.value)}
                      placeholder="Contoh: Peru-Chan : Eksplorasi Sketsa"
                      className="text-xs rounded-lg w-full"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                      Sub-Judul / Label Tag
                    </label>
                    <Input
                      type="text"
                      value={slideSubtitle}
                      onChange={(e) => setSlideSubtitle(e.target.value)}
                      placeholder="Contoh: CATATAN PRAKTIK STUDIO"
                      className="text-xs rounded-lg w-full"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                      Kutipan Motivasi / Tips Maskot <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={slideQuote}
                      onChange={(e) => setSlideQuote(e.target.value)}
                      placeholder="Tuliskan kutipan penyemangat belajar atau tips berkarya..."
                      className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed shadow-2xs"
                    />
                  </div>

                  {/* CUSTOM COLOR PICKER */}
                  <div className="space-y-1.5 pt-1">
                    <ColorPicker
                      label="Pilihan Aksen Warna (Kuratorial & Kustom)"
                      value={slideAccent}
                      onChange={(newHex) => setSlideAccent(newHex)}
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: MASCOT POSE SELECTION / UPLOAD */}
                <div className="space-y-4 border-t md:border-t-0 md:border-l border-jp-gray-200 pt-4 md:pt-0 md:pl-6">
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                      Sumber Gambar Pose Karakter
                    </label>
                    <div className="grid grid-cols-2 gap-1 rounded-lg bg-jp-paper p-1 border border-jp-gray-200 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setSlideImageMode("official")}
                        className={cn(
                          "rounded-md py-1.5 text-center text-xs font-bold font-mono transition cursor-pointer",
                          slideImageMode === "official"
                            ? "bg-jp-blue-900 text-white shadow-2xs"
                            : "text-jp-gray-600 hover:text-jp-ink"
                        )}
                      >
                        Pose Resmi
                      </button>
                      <button
                        type="button"
                        onClick={() => setSlideImageMode("custom")}
                        className={cn(
                          "rounded-md py-1.5 text-center text-xs font-bold font-mono transition cursor-pointer",
                          slideImageMode === "custom"
                            ? "bg-jp-blue-900 text-white shadow-2xs"
                            : "text-jp-gray-600 hover:text-jp-ink"
                        )}
                      >
                        + Pose Kustom / Unggah
                      </button>
                    </div>

                    {slideImageMode === "official" ? (
                      <div className="space-y-2.5">
                        <div className="grid grid-cols-2 gap-2.5">
                          {officialMascotPoses.map((pose) => {
                            const isSelected = slideImageUrl === pose.src;
                            return (
                              <button
                                key={pose.src}
                                type="button"
                                onClick={() => setSlideImageUrl(pose.src)}
                                className={cn(
                                  "flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition cursor-pointer shadow-2xs",
                                  isSelected
                                    ? "border-jp-blue-900 bg-jp-blue-50/70 ring-2 ring-jp-blue-900/30"
                                    : "border-jp-gray-200 bg-white hover:bg-jp-paper"
                                )}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={pose.src}
                                  alt={pose.shortLabel}
                                  width={72}
                                  height={72}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-16 w-16 object-contain"
                                />
                                <span className="text-[11px] font-bold text-jp-ink font-mono">
                                  {pose.shortLabel}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <ImageDualInput
                        label="Unggah atau Masukkan URL Pose Peru-Chan Baru"
                        value={slideImageUrl}
                        onChange={setSlideImageUrl}
                        placeholderUrl="https://domain.com/peruchan-pose-baru.png"
                        helperGuideline="Format PNG transparan sangat direkomendasikan, resolusi minimal 300×300 px, ukuran maksimal 2 MB."
                        minWidth={200}
                        minHeight={200}
                        maxSizeBytes={2 * 1024 * 1024}
                        maxSizeLabel="2 MB"
                        previewObjectFit="contain"
                        previewClassName="h-16 w-16 bg-white p-1"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* STICKY MODAL FOOTER */}
            <div className="flex items-center justify-end gap-2.5 border-t border-jp-gray-200 bg-jp-paper/80 px-6 py-3.5 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsSlideModalOpen(false)}
                className="rounded-lg text-xs font-bold cursor-pointer"
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleSaveSlideModal}
                className="rounded-lg font-bold text-xs cursor-pointer shadow-xs"
              >
                Simpan Slide
              </Button>
            </div>
          </Modal>
        )}

        {/* MODAL EDIT / TAMBAH QUOTE TIPS (2-COLUMN RESPONSIVE LAYOUT) */}
        {isQuoteModalOpen && (
          <Modal isOpen={true} onClose={() => setIsQuoteModalOpen(false)} maxWidth="3xl">
            {/* STICKY MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-jp-gray-200 bg-jp-paper/80 px-6 py-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-100 text-jp-blue-900 shadow-2xs">
                  <MessageSquareQuote className="h-4 w-4" />
                </div>
                <div>
                  <Heading3 className="text-base sm:text-lg text-jp-ink font-heading font-bold">
                    {editingQuoteId ? "Edit Kutipan Tips Peru-Chan" : "Tambah Kutipan Tips Baru"}
                  </Heading3>
                  <p className="text-[11px] text-jp-gray-500 font-sans">
                    Kutipan motivasi dan tips belajar seni beranda.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(false)}
                className="rounded-lg p-1.5 text-jp-gray-400 hover:bg-jp-gray-100 hover:text-jp-ink transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* SCROLLABLE 2-COLUMN MODAL BODY */}
            <div className="flex-1 overflow-y-auto p-6 md:p-7 space-y-6 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* LEFT COLUMN: TEXT CONTENT */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                      Teks Kutipan / Tips <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={quoteText}
                      onChange={(e) => setQuoteText(e.target.value)}
                      placeholder="Contoh: Jangan takut mencoba warna kontras di kanvasmu. Keberanian eksperimen adalah awal karakter rupa!"
                      className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-heading italic leading-relaxed shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                      Label Kategori Tips
                    </label>
                    <Input
                      type="text"
                      value={quoteCategoryBadge}
                      onChange={(e) => setQuoteCategoryBadge(e.target.value)}
                      placeholder="Contoh: Catatan Santai Peru-Chan"
                      className="text-xs rounded-lg w-full"
                    />
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {quoteCategoryPresets.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setQuoteCategoryBadge(preset)}
                          className={cn(
                            "rounded-md px-2 py-0.5 text-[10px] font-bold font-mono transition cursor-pointer border",
                            quoteCategoryBadge === preset
                              ? "bg-jp-blue-900 text-white border-jp-blue-900 shadow-2xs"
                              : "bg-jp-paper text-jp-gray-600 border-jp-gray-200 hover:bg-white"
                          )}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ACTIVE STATUS TOGGLE */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="quoteActiveCheck"
                      checked={quoteIsActive}
                      onChange={(e) => setQuoteIsActive(e.target.checked)}
                      className="h-4 w-4 rounded border-jp-gray-300 text-jp-blue-900 focus:ring-jp-blue-700 cursor-pointer"
                    />
                    <label
                      htmlFor="quoteActiveCheck"
                      className="text-xs font-bold text-jp-ink cursor-pointer font-sans"
                    >
                      Aktifkan kutipan ini dalam tayangan beranda
                    </label>
                  </div>
                </div>

                {/* RIGHT COLUMN: MASCOT POSE SELECTION */}
                <div className="space-y-4 border-t md:border-t-0 md:border-l border-jp-gray-200 pt-4 md:pt-0 md:pl-6">
                  <div className="space-y-2.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
                      Pilih Pose Karakter Peru-Chan
                    </label>
                    <div className="grid grid-cols-2 gap-1 rounded-lg bg-jp-paper p-1 border border-jp-gray-200 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setQuoteImageMode("official")}
                        className={cn(
                          "rounded-md py-1.5 text-center text-xs font-bold font-mono transition cursor-pointer",
                          quoteImageMode === "official"
                            ? "bg-jp-blue-900 text-white shadow-2xs"
                            : "text-jp-gray-600 hover:text-jp-ink"
                        )}
                      >
                        Pose Resmi
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuoteImageMode("custom")}
                        className={cn(
                          "rounded-md py-1.5 text-center text-xs font-bold font-mono transition cursor-pointer",
                          quoteImageMode === "custom"
                            ? "bg-jp-blue-900 text-white shadow-2xs"
                            : "text-jp-gray-600 hover:text-jp-ink"
                        )}
                      >
                        + Pose Kustom / Unggah
                      </button>
                    </div>

                    {quoteImageMode === "official" ? (
                      <div className="grid grid-cols-2 gap-2.5">
                        {officialMascotPoses.map((pose) => {
                          const isSelected = quoteImageSrc === pose.src;
                          return (
                            <button
                              key={pose.src}
                              type="button"
                              onClick={() => setQuoteImageSrc(pose.src)}
                              className={cn(
                                "flex flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition cursor-pointer shadow-2xs",
                                isSelected
                                  ? "border-jp-blue-900 bg-jp-blue-50/70 ring-2 ring-jp-blue-900/30"
                                  : "border-jp-gray-200 bg-white hover:bg-jp-paper"
                              )}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={pose.src}
                                alt={pose.shortLabel}
                                width={64}
                                height={64}
                                loading="lazy"
                                decoding="async"
                                className="h-16 w-16 object-contain"
                              />
                              <span className="text-[11px] font-bold text-jp-ink font-mono">
                                {pose.shortLabel}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <ImageDualInput
                        label="Unggah atau Masukkan URL Pose Peru-Chan"
                        value={quoteImageSrc}
                        onChange={setQuoteImageSrc}
                        placeholderUrl="https://domain.com/peruchan-pose.png"
                        helperGuideline="Format PNG transparan sangat direkomendasikan, resolusi minimal 200×200 px, ukuran maksimal 2 MB."
                        minWidth={128}
                        minHeight={128}
                        maxSizeBytes={2 * 1024 * 1024}
                        maxSizeLabel="2 MB"
                        previewObjectFit="contain"
                        previewClassName="h-16 w-16 bg-white p-1"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* STICKY MODAL FOOTER */}
            <div className="flex items-center justify-end gap-2.5 border-t border-jp-gray-200 bg-jp-paper/80 px-6 py-3.5 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsQuoteModalOpen(false)}
                className="rounded-lg text-xs font-bold cursor-pointer"
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleSaveQuoteModal}
                className="rounded-lg font-bold text-xs cursor-pointer shadow-xs"
              >
                Simpan Kutipan
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
}
