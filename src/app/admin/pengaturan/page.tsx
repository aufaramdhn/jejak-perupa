"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Button } from "@/components/atoms/form/Button";
import { AdminSettingsSkeleton } from "@/components/organisms/admin/AdminSettingsSkeleton";
import { useSiteSettings } from "@/lib/siteContext";
import { useModal } from "@/lib/modalContext";
import {
  MascotSlideItem,
  PeruChanQuoteItem,
  PlatformPillarItem,
} from "@/lib/data/siteSettings";
import {
  MascotSlidesTab,
  QuotesLibraryTab,
  BrandingSettingsTab,
  EditorialSettingsTab,
  PillarsSettingsTab,
} from "@/components/organisms/admin/settings/tabs";
import {
  MascotSlideModal,
  QuoteEditorModal,
  PillarEditorModal,
} from "@/components/organisms/admin/settings/modals";
import { SettingsTabId } from "@/components/organisms/admin/settings/types";
import {
  Sparkles,
  MessageSquareQuote,
  Sliders,
  FileText,
  Layers,
  Save,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetToDefault } = useSiteSettings();
  const { alert, confirm } = useModal();

  const [activeTab, setActiveTab] = useState<SettingsTabId>("slideshow");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
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

  // 1. General & Editorial State
  const [siteName, setSiteName] = useState(settings.siteName);
  const [siteTagline, setSiteTagline] = useState(settings.siteTagline);
  const [logoInitials, setLogoInitials] = useState(settings.logoInitials);
  const [logoImageUrl, setLogoImageUrl] = useState(settings.logoImageUrl || "");
  const [faviconUrl, setFaviconUrl] = useState(settings.faviconUrl || "");
  const [heroHeadline, setHeroHeadline] = useState(settings.heroHeadline);
  const [heroDescription, setHeroDescription] = useState(settings.heroDescription);
  const [aboutVision, setAboutVision] = useState(settings.aboutVision);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);

  useEffect(() => {
    setSiteName(settings.siteName);
    setSiteTagline(settings.siteTagline);
    setLogoInitials(settings.logoInitials);
    setLogoImageUrl(settings.logoImageUrl || "");
    setFaviconUrl(settings.faviconUrl || "");
    setHeroHeadline(settings.heroHeadline);
    setHeroDescription(settings.heroDescription);
    setAboutVision(settings.aboutVision || "");
    setContactEmail(settings.contactEmail);
  }, [settings]);

  // 2. Mascot Slides State & Modal
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [slideTitle, setSlideTitle] = useState("");
  const [slideSubtitle, setSlideSubtitle] = useState("");
  const [slideQuote, setSlideQuote] = useState("");
  const [slideImageUrl, setSlideImageUrl] = useState("");
  const [slideAccent, setSlideAccent] = useState<string>("#182C4A");
  const [slideImageMode, setSlideImageMode] = useState<"official" | "custom">("official");

  const handleOpenAddSlide = () => {
    setEditingSlideId(null);
    setSlideTitle("");
    setSlideSubtitle("CATATAN MASKOT");
    setSlideQuote("");
    setSlideImageUrl("/images/mascot/peruchan-drawing.png");
    setSlideAccent("#182C4A");
    setSlideImageMode("official");
    setIsSlideModalOpen(true);
  };

  const handleOpenEditSlide = (slide: MascotSlideItem) => {
    setEditingSlideId(slide.id);
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle || "");
    setSlideQuote(slide.quote);
    setSlideImageUrl(slide.imageUrl || "/images/mascot/peruchan-drawing.png");
    setSlideAccent(
      slide.accentColor === "lime"
        ? "#8BA846"
        : slide.accentColor === "brown"
        ? "#7C482B"
        : "#182C4A"
    );
    const isOfficial = (slide.imageUrl || "").startsWith("/images/mascot/");
    setSlideImageMode(isOfficial ? "official" : "custom");
    setIsSlideModalOpen(true);
  };

  const handleSaveSlideModal = () => {
    if (!slideTitle.trim() || !slideQuote.trim()) {
      alert({
        type: "warning",
        title: "Kolom Belum Lengkap",
        message: "Harap isi judul pose dan kutipan inspiratif sebelum menyimpan.",
      });
      return;
    }

    const currentSlides = [...settings.mascotSlides];
    const accentMapped: "blue" | "brown" | "lime" =
      slideAccent === "#8BA846" ? "lime" : slideAccent === "#7C482B" ? "brown" : "blue";

    if (editingSlideId) {
      const idx = currentSlides.findIndex((s) => s.id === editingSlideId);
      if (idx !== -1) {
        currentSlides[idx] = {
          ...currentSlides[idx],
          title: slideTitle,
          subtitle: slideSubtitle,
          quote: slideQuote,
          imageUrl: slideImageUrl,
          accentColor: accentMapped,
        };
      }
    } else {
      currentSlides.push({
        id: `slide-${Date.now()}`,
        title: slideTitle,
        subtitle: slideSubtitle,
        quote: slideQuote,
        imageUrl: slideImageUrl || "/images/mascot/peruchan-drawing.png",
        accentColor: accentMapped,
        isActive: true,
        order: currentSlides.length + 1,
      });
    }

    updateSettings({ mascotSlides: currentSlides });
    setIsSlideModalOpen(false);
    alert({
      type: "success",
      title: editingSlideId ? "Slide Diperbarui" : "Slide Ditambahkan",
      message: `Slide pose "${slideTitle}" berhasil disimpan ke galeri hero.`,
    });
  };

  const handleDeleteSlide = async (id: string, title: string) => {
    if (settings.mascotSlides.length <= 1) {
      alert({
        type: "error",
        title: "Tidak Dapat Menghapus",
        message: "Minimal harus ada 1 slide pose karakter aktif untuk tampilan hero.",
      });
      return;
    }

    const confirmed = await confirm({
      title: "Hapus Slide Pose?",
      message: `Slide "${title}" akan dihapus permanen dari rotasi hero beranda.`,
      confirmLabel: "Hapus",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      const updated = settings.mascotSlides.filter((s) => s.id !== id);
      updateSettings({ mascotSlides: updated });
      alert({
        type: "info",
        title: "Slide Dihapus",
        message: "Slide pose karakter telah dihapus.",
      });
    }
  };

  // 3. Quotes Library State & Modal
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [editingQuoteId, setEditingQuoteId] = useState<string | null>(null);
  const [quoteText, setQuoteText] = useState("");
  const [quoteCategoryBadge, setQuoteCategoryBadge] = useState("Catatan Santai Peru-Chan");
  const [quoteImageSrc, setQuoteImageSrc] = useState("/images/mascot/peruchan-drawing.png");
  const [quoteIsActive, setQuoteIsActive] = useState(true);
  const [quoteImageMode, setQuoteImageMode] = useState<"official" | "custom">("official");

  const handleOpenAddQuote = () => {
    setEditingQuoteId(null);
    setQuoteText("");
    setQuoteCategoryBadge("Catatan Santai Peru-Chan");
    setQuoteImageSrc("/images/mascot/peruchan-drawing.png");
    setQuoteIsActive(true);
    setQuoteImageMode("official");
    setIsQuoteModalOpen(true);
  };

  const handleOpenEditQuote = (quote: PeruChanQuoteItem) => {
    setEditingQuoteId(quote.id);
    setQuoteText(quote.quoteText);
    setQuoteCategoryBadge(quote.categoryBadge);
    setQuoteImageSrc(quote.imageSrc || "/images/mascot/peruchan-drawing.png");
    setQuoteIsActive(quote.isActive);
    const isOfficial = (quote.imageSrc || "").startsWith("/images/mascot/");
    setQuoteImageMode(isOfficial ? "official" : "custom");
    setIsQuoteModalOpen(true);
  };

  const handleSaveQuoteModal = () => {
    if (!quoteText.trim()) {
      alert({
        type: "warning",
        title: "Teks Kutipan Kosong",
        message: "Silakan masukkan kalimat kutipan sebelum menyimpan.",
      });
      return;
    }

    const currentQuotes = [...(settings.quotes || [])];

    if (editingQuoteId) {
      const idx = currentQuotes.findIndex((q) => q.id === editingQuoteId);
      if (idx !== -1) {
        currentQuotes[idx] = {
          ...currentQuotes[idx],
          quoteText,
          categoryBadge: quoteCategoryBadge,
          imageSrc: quoteImageSrc,
          isActive: quoteIsActive,
        };
      }
    } else {
      currentQuotes.push({
        id: `quote-${Date.now()}`,
        quoteText,
        categoryBadge: quoteCategoryBadge || "Catatan Santai Peru-Chan",
        imageSrc: quoteImageSrc || "/images/mascot/peruchan-drawing.png",
        isActive: quoteIsActive,
        order: currentQuotes.length + 1,
      });
    }

    updateSettings({ quotes: currentQuotes });
    setIsQuoteModalOpen(false);
    alert({
      type: "success",
      title: editingQuoteId ? "Kutipan Diperbarui" : "Kutipan Ditambahkan",
      message: "Kutipan tips kuratorial berhasil disimpan ke library.",
    });
  };

  const handleDeleteQuote = async (id: string, text: string) => {
    const currentQuotes = settings.quotes || [];
    if (currentQuotes.length <= 1) {
      alert({
        type: "error",
        title: "Tidak Dapat Menghapus",
        message: "Minimal harus ada 1 kutipan aktif dalam library tips.",
      });
      return;
    }

    const confirmed = await confirm({
      title: "Hapus Kutipan?",
      message: `Kutipan "${text.substring(0, 40)}..." akan dihapus permanen.`,
      confirmLabel: "Hapus",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      const updated = currentQuotes.filter((q) => q.id !== id);
      updateSettings({ quotes: updated });
      alert({
        type: "info",
        title: "Kutipan Dihapus",
        message: "Kutipan telah dihapus dari library.",
      });
    }
  };

  const handleToggleQuoteActive = (id: string) => {
    const updated = (settings.quotes || []).map((q) =>
      q.id === id ? { ...q, isActive: !q.isActive } : q
    );
    updateSettings({ quotes: updated });
  };

  // 4. Pillars State & Modal
  const [isPillarModalOpen, setIsPillarModalOpen] = useState(false);
  const [editingPillarId, setEditingPillarId] = useState<string | null>(null);
  const [pillarNumber, setPillarNumber] = useState("01");
  const [pillarIconName, setPillarIconName] = useState<any>("book-open");
  const [pillarTitle, setPillarTitle] = useState("");
  const [pillarDesc, setPillarDesc] = useState("");

  const handleOpenAddPillar = () => {
    setEditingPillarId(null);
    const nextNum = String((settings.aboutPillars?.length || 0) + 1).padStart(2, "0");
    setPillarNumber(nextNum);
    setPillarIconName("book-open");
    setPillarTitle("");
    setPillarDesc("");
    setIsPillarModalOpen(true);
  };

  const handleOpenEditPillar = (p: PlatformPillarItem) => {
    setEditingPillarId(p.id);
    setPillarNumber(p.number);
    setPillarIconName(p.iconName);
    setPillarTitle(p.title);
    setPillarDesc(p.desc);
    setIsPillarModalOpen(true);
  };

  const handleSavePillarModal = () => {
    if (!pillarTitle.trim() || !pillarDesc.trim()) {
      alert({
        type: "warning",
        title: "Data Belum Lengkap",
        message: "Harap masukkan judul pilar dan deskripsi narasi.",
      });
      return;
    }

    const currentPillars = [...(settings.aboutPillars || [])];

    if (editingPillarId) {
      const idx = currentPillars.findIndex((p) => p.id === editingPillarId);
      if (idx !== -1) {
        currentPillars[idx] = {
          ...currentPillars[idx],
          number: pillarNumber,
          iconName: pillarIconName,
          title: pillarTitle,
          desc: pillarDesc,
        };
      }
    } else {
      currentPillars.push({
        id: `pillar-${Date.now()}`,
        number: pillarNumber,
        iconName: pillarIconName,
        title: pillarTitle,
        desc: pillarDesc,
        order: currentPillars.length + 1,
      });
    }

    updateSettings({ aboutPillars: currentPillars });
    setIsPillarModalOpen(false);
    alert({
      type: "success",
      title: editingPillarId ? "Pilar Diperbarui" : "Pilar Ditambahkan",
      message: `Pilar "${pillarTitle}" berhasil disimpan ke halaman Tentang.`,
    });
  };

  const handleDeletePillar = async (p: PlatformPillarItem) => {
    const currentPillars = settings.aboutPillars || [];
    if (currentPillars.length <= 1) {
      alert({
        type: "error",
        title: "Tidak Dapat Menghapus",
        message: "Minimal harus ada 1 pilar nilai aktif di halaman Tentang.",
      });
      return;
    }

    const confirmed = await confirm({
      title: "Hapus Pilar Nilai?",
      message: `Pilar "${p.title}" akan dihapus permanen.`,
      confirmLabel: "Hapus",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      const updated = currentPillars.filter((item) => item.id !== p.id);
      updateSettings({ aboutPillars: updated });
      alert({
        type: "info",
        title: "Pilar Dihapus",
        message: "Pilar nilai berhasil dihapus dari halaman Tentang.",
      });
    }
  };

  // 5. Global Actions
  const handleSaveGeneralSettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSettings({
      siteName,
      siteTagline,
      logoInitials,
      logoImageUrl,
      faviconUrl,
      heroHeadline,
      heroDescription,
      aboutVision,
      contactEmail,
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
      message:
        "Semua pengaturan nama, tagline, logo, favicon, slide maskot, dan library quotes akan dikembalikan ke setelan awal default.",
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

  const tabs = [
    {
      id: "slideshow" as SettingsTabId,
      label: "Slideshow Karakter",
      icon: <Sparkles className="h-4 w-4" />,
      count: settings.mascotSlides.length,
    },
    {
      id: "quotes" as SettingsTabId,
      label: "Library Quotes Peru-Chan",
      icon: <MessageSquareQuote className="h-4 w-4" />,
      count: (settings.quotes || []).length,
    },
    {
      id: "branding" as SettingsTabId,
      label: "Identitas & Logo",
      icon: <Sliders className="h-4 w-4" />,
    },
    {
      id: "editorial" as SettingsTabId,
      label: "Teks Editorial & Visi",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "pillars" as SettingsTabId,
      label: "Pilar Nilai Platform",
      icon: <Layers className="h-4 w-4" />,
      count: (settings.aboutPillars || []).length,
    },
  ];

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
                      isActive ? "bg-white/20 text-white" : "bg-jp-gray-200 text-jp-gray-700"
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT OR SKELETON */}
        {isLoading ? (
          <AdminSettingsSkeleton activeTab={activeTab as any} />
        ) : (
          <>
            {activeTab === "slideshow" && (
              <MascotSlidesTab
                slides={settings.mascotSlides}
                onOpenAddSlide={handleOpenAddSlide}
                onOpenEditSlide={handleOpenEditSlide}
                onDeleteSlide={handleDeleteSlide}
              />
            )}

            {activeTab === "quotes" && (
              <QuotesLibraryTab
                quotes={settings.quotes || []}
                onOpenAddQuote={handleOpenAddQuote}
                onOpenEditQuote={handleOpenEditQuote}
                onDeleteQuote={handleDeleteQuote}
                onToggleQuoteActive={handleToggleQuoteActive}
              />
            )}

            {activeTab === "branding" && (
              <BrandingSettingsTab
                siteName={siteName}
                setSiteName={setSiteName}
                siteTagline={siteTagline}
                setSiteTagline={setSiteTagline}
                logoInitials={logoInitials}
                setLogoInitials={setLogoInitials}
                logoImageUrl={logoImageUrl}
                setLogoImageUrl={setLogoImageUrl}
                faviconUrl={faviconUrl}
                setFaviconUrl={setFaviconUrl}
                contactEmail={contactEmail}
                setContactEmail={setContactEmail}
                onSave={handleSaveGeneralSettings}
              />
            )}

            {activeTab === "editorial" && (
              <EditorialSettingsTab
                heroHeadline={heroHeadline}
                setHeroHeadline={setHeroHeadline}
                heroDescription={heroDescription}
                setHeroDescription={setHeroDescription}
                aboutVision={aboutVision}
                setAboutVision={setAboutVision}
                onSave={handleSaveGeneralSettings}
              />
            )}

            {activeTab === "pillars" && (
              <PillarsSettingsTab
                pillars={settings.aboutPillars || []}
                onOpenAddPillar={handleOpenAddPillar}
                onOpenEditPillar={handleOpenEditPillar}
                onDeletePillar={handleDeletePillar}
              />
            )}
          </>
        )}

        {/* MODALS */}
        <MascotSlideModal
          isOpen={isSlideModalOpen}
          onClose={() => setIsSlideModalOpen(false)}
          isEditing={Boolean(editingSlideId)}
          slideTitle={slideTitle}
          setSlideTitle={setSlideTitle}
          slideSubtitle={slideSubtitle}
          setSlideSubtitle={setSlideSubtitle}
          slideQuote={slideQuote}
          setSlideQuote={setSlideQuote}
          slideImageUrl={slideImageUrl}
          setSlideImageUrl={setSlideImageUrl}
          slideAccent={slideAccent}
          setSlideAccent={setSlideAccent}
          slideImageMode={slideImageMode}
          setSlideImageMode={setSlideImageMode}
          onSave={handleSaveSlideModal}
        />

        <QuoteEditorModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          isEditing={Boolean(editingQuoteId)}
          quoteText={quoteText}
          setQuoteText={setQuoteText}
          quoteCategoryBadge={quoteCategoryBadge}
          setQuoteCategoryBadge={setQuoteCategoryBadge}
          quoteImageSrc={quoteImageSrc}
          setQuoteImageSrc={setQuoteImageSrc}
          quoteIsActive={quoteIsActive}
          setQuoteIsActive={setQuoteIsActive}
          quoteImageMode={quoteImageMode}
          setQuoteImageMode={setQuoteImageMode}
          onSave={handleSaveQuoteModal}
        />

        <PillarEditorModal
          isOpen={isPillarModalOpen}
          onClose={() => setIsPillarModalOpen(false)}
          isEditing={Boolean(editingPillarId)}
          pillarNumber={pillarNumber}
          setPillarNumber={setPillarNumber}
          pillarIconName={pillarIconName}
          setPillarIconName={setPillarIconName}
          pillarTitle={pillarTitle}
          setPillarTitle={setPillarTitle}
          pillarDesc={pillarDesc}
          setPillarDesc={setPillarDesc}
          onSave={handleSavePillarModal}
        />
      </div>
    </AdminLayout>
  );
}
