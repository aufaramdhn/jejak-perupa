"use client";

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/Typography";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { PeruChanMascotSlider } from "@/components/organisms/PeruChanMascotSlider";
import { useSiteSettings } from "@/lib/siteContext";
import { useModal } from "@/lib/modalContext";
import { MascotSlideItem } from "@/lib/data/siteSettings";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminPengaturanPage() {
  const {
    settings,
    updateSettings,
    addMascotSlide,
    updateMascotSlide,
    deleteMascotSlide,
    resetToDefault,
  } = useSiteSettings();
  const { confirm, toast } = useModal();

  // Local form state
  const [siteName, setSiteName] = useState(settings.siteName);
  const [siteTagline, setSiteTagline] = useState(settings.siteTagline);
  const [logoInitials, setLogoInitials] = useState(settings.logoInitials);
  const [logoImageUrl, setLogoImageUrl] = useState(settings.logoImageUrl);
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
    setLogoImageUrl(settings.logoImageUrl);
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
  const [slideAccent, setSlideAccent] = useState<"blue" | "brown" | "lime">("blue");

  const handleOpenAddSlide = () => {
    setEditingSlideId(null);
    setSlideTitle("Peru-Chan : Ekspresi Baru");
    setSlideSubtitle("CATATAN STUDIO TAMBAHAN");
    setSlideQuote("Setiap goresan kuas menyimpan jejak keberanian untuk berekspresi!");
    setSlideImageUrl("");
    setSlideAccent("blue");
    setIsSlideModalOpen(true);
  };

  const handleOpenEditSlide = (slide: MascotSlideItem) => {
    setEditingSlideId(slide.id);
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle);
    setSlideQuote(slide.quote);
    setSlideImageUrl(slide.imageUrl || "");
    setSlideAccent(slide.accentColor);
    setIsSlideModalOpen(true);
  };

  const handleSaveSlideModal = () => {
    if (!slideTitle.trim() || !slideQuote.trim()) {
      toast({
        type: "warning",
        title: "Data Belum Lengkap",
        message: "Judul dan kutipan karakter wajib diisi.",
      });
      return;
    }

    if (editingSlideId) {
      updateMascotSlide(editingSlideId, {
        title: slideTitle,
        subtitle: slideSubtitle || "MASKOT EDUKASI",
        quote: slideQuote,
        imageUrl: slideImageUrl.trim() || undefined,
        accentColor: slideAccent,
      });
      toast({
        type: "success",
        title: "Slide Diperbarui",
        message: "Perubahan pose karakter Peru-Chan berhasil disimpan.",
      });
    } else {
      addMascotSlide({
        title: slideTitle,
        subtitle: slideSubtitle || "MASKOT EDUKASI",
        quote: slideQuote,
        imageUrl: slideImageUrl.trim() || undefined,
        accentColor: slideAccent,
        isActive: true,
      });
      toast({
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
      toast({
        type: "success",
        title: "Slide Dihapus",
        message: "Slide karakter telah dikeluarkan dari tayangan.",
      });
    }
  };

  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      siteName,
      siteTagline,
      logoInitials,
      logoImageUrl,
      heroEditionBadge,
      heroHeadline,
      heroDescription,
      aboutVision,
      aboutMission,
      aboutPhilosophy,
      contactEmail,
      instagramUrl,
    });
    toast({
      type: "success",
      title: "Pengaturan Disimpan",
      message: "Seluruh konfigurasi identitas situs dan narasi telah diperbarui.",
    });
  };

  const handleResetSettings = async () => {
    const confirmed = await confirm({
      title: "Reset ke Pengaturan Bawaan?",
      message: "Semua pengaturan nama, tagline, dan slide maskot akan dikembalikan ke setelan awal default.",
      confirmLabel: "Ya, Reset",
      cancelLabel: "Batal",
      variant: "warning",
      iconType: "alert",
    });

    if (confirmed) {
      resetToDefault();
      toast({
        type: "info",
        title: "Pengaturan Direset",
        message: "Konfigurasi situs telah dikembalikan ke standar awal.",
      });
    }
  };

  return (
    <AdminLayout
      title="Pengaturan Identitas Situs & Peru-Chan"
      subtitle="Kustomisasi logo, nama platform, narasi beranda, dan kelola galeri ilustrasi karakter secara langsung."
      actionButton={
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetSettings}
            className="rounded-lg"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Reset Bawaan
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={handleSaveGeneralSettings}
            className="rounded-lg"
          >
            <Save className="h-3.5 w-3.5 mr-1.5" />
            Simpan Perubahan
          </Button>
        </div>
      }
    >
      <div className="space-y-10 font-sans">

        {/* 1. KELOLA SLIDESHOW KARAKTER PERU-CHAN */}
        <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jp-gray-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-blue-900 text-white text-xs font-bold">
                  1
                </span>
                <Heading3 className="text-lg text-jp-ink">
                  Galeri Slideshow Karakter Peru-Chan (Beranda & Tentang)
                </Heading3>
              </div>
              <p className="mt-1 text-xs text-jp-gray-500 font-prose pl-8">
                Tambahkan foto ilustrasi pose, kutipan motivasi studio, dan pilih tema aksen warna untuk setiap slide.
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleOpenAddSlide}
              className="rounded-lg"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Tambah Slide Pose Baru
            </Button>
          </div>

          {/* GRID OF CURRENT SLIDES & LIVE PREVIEW */}
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] items-start pt-2">
            {/* SLIDES LIST */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-jp-gray-600">
                Daftar Slide Aktif ({settings.mascotSlides.length} Pose Terdaftar)
              </div>

              <div className="space-y-3">
                {settings.mascotSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-jp-gray-200 bg-jp-paper/40 p-4 transition hover:border-jp-blue-300"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-jp-blue-100 font-mono text-xs font-bold text-jp-blue-900">
                        #{idx + 1}
                      </span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-jp-ink">
                            {slide.title}
                          </span>
                          <Badge variant={slide.accentColor} size="sm">
                            {slide.accentColor.toUpperCase()}
                          </Badge>
                          {!slide.isActive && (
                            <span className="text-[10px] text-red-600 font-bold">
                              (Nonaktif)
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-jp-gray-500 font-mono">
                          {slide.subtitle}
                        </div>
                        <p className="text-xs text-jp-gray-700 italic font-prose max-w-md line-clamp-2">
                          &ldquo;{slide.quote}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEditSlide(slide)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-300 bg-white text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900 transition cursor-pointer"
                        title="Edit Slide"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={settings.mascotSlides.length <= 1}
                        onClick={() => handleDeleteSlide(slide.id, slide.title)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                        title="Hapus Slide"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LIVE PREVIEW COMPONENT */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-jp-gray-600">
                Pratinjau Langsung (Live Preview di Beranda)
              </div>
              <PeruChanMascotSlider className="w-full shadow-md" />
            </div>
          </div>
        </div>

        {/* 2. IDENTITAS & BRANDING SITUS */}
        <form onSubmit={handleSaveGeneralSettings} className="space-y-8">
          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
            <div className="flex items-center gap-2 border-b border-jp-gray-100 pb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-blue-900 text-white text-xs font-bold">
                2
              </span>
              <Heading3 className="text-lg text-jp-ink">
                Identitas Platform & Informasi Kontak Redaksi
              </Heading3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Nama Situs / Brand
                </label>
                <Input
                  type="text"
                  required
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="JEJAK PERUPA"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Tagline / Sub-Identitas
                </label>
                <Input
                  type="text"
                  required
                  value={siteTagline}
                  onChange={(e) => setSiteTagline(e.target.value)}
                  placeholder="Catatan Perjalanan Pelajar Seni Rupa"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Inisial Logo (Avatar / Favicon)
                </label>
                <Input
                  type="text"
                  maxLength={4}
                  value={logoInitials}
                  onChange={(e) => setLogoInitials(e.target.value)}
                  placeholder="JP"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  URL Gambar Logo Kustom (Opsional)
                </label>
                <Input
                  type="url"
                  value={logoImageUrl}
                  onChange={(e) => setLogoImageUrl(e.target.value)}
                  placeholder="https://domain.com/logo.png"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-jp-blue-700" />
                  Email Resmi Redaksi
                </label>
                <Input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="redaksi@jejakperupa.id"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink flex items-center gap-1.5">
                  <Share2 className="h-3.5 w-3.5 text-jp-blue-700" />
                  Tautan Akun Media Sosial (Instagram)
                </label>
                <Input
                  type="url"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  placeholder="https://instagram.com/jejakperupa"
                />
              </div>
            </div>
          </div>

          {/* 3. TEKS HERO & BERANDA */}
          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
            <div className="flex items-center gap-2 border-b border-jp-gray-100 pb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-blue-900 text-white text-xs font-bold">
                3
              </span>
              <Heading3 className="text-lg text-jp-ink">
                Narasi Hero & Sorotan Beranda
              </Heading3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Badge Edisi Tahun Beranda
                </label>
                <Input
                  type="text"
                  value={heroEditionBadge}
                  onChange={(e) => setHeroEditionBadge(e.target.value)}
                  placeholder="Arsip & Wacana Seni Rupa Nusantara : Edisi 2026"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Deskripsi Pengantar Beranda
                </label>
                <textarea
                  rows={3}
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                  className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* 4. NARASI HALAMAN TENTANG KAMI */}
          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
            <div className="flex items-center gap-2 border-b border-jp-gray-100 pb-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-blue-900 text-white text-xs font-bold">
                4
              </span>
              <Heading3 className="text-lg text-jp-ink">
                Narasi Filosofis Halaman Tentang Kami
              </Heading3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Visi Platform
                </label>
                <textarea
                  rows={2}
                  value={aboutVision}
                  onChange={(e) => setAboutVision(e.target.value)}
                  className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Misi Platform
                </label>
                <textarea
                  rows={2}
                  value={aboutMission}
                  onChange={(e) => setAboutMission(e.target.value)}
                  className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Filosofi Edukasi Seni
                </label>
                <textarea
                  rows={2}
                  value={aboutPhilosophy}
                  onChange={(e) => setAboutPhilosophy(e.target.value)}
                  className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose leading-relaxed"
                />
              </div>
            </div>

            {/* SAVE ACTION */}
            <div className="flex justify-end pt-4 border-t border-jp-gray-100">
              <Button type="submit" variant="primary" size="md" className="rounded-lg">
                <Save className="h-4 w-4 mr-2" />
                Simpan Semua Pengaturan
              </Button>
            </div>
          </div>
        </form>

        {/* MODAL EDIT / TAMBAH SLIDE MASCOT */}
        {isSlideModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs font-sans animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xl space-y-5 p-6">
              <div className="flex items-center justify-between border-b border-jp-gray-200 pb-3">
                <Heading3 className="text-lg text-jp-ink">
                  {editingSlideId ? "Edit Pose Karakter Peru-Chan" : "Tambah Pose Karakter Peru-Chan"}
                </Heading3>
                <button
                  type="button"
                  onClick={() => setIsSlideModalOpen(false)}
                  className="text-xs font-bold text-jp-gray-400 hover:text-jp-ink cursor-pointer"
                >
                  Tutup
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Judul Pose / Ekspresi
                  </label>
                  <Input
                    type="text"
                    required
                    value={slideTitle}
                    onChange={(e) => setSlideTitle(e.target.value)}
                    placeholder="Contoh: Peru-Chan : Eksplorasi Sketsa"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Sub-Judul / Label Tag
                  </label>
                  <Input
                    type="text"
                    value={slideSubtitle}
                    onChange={(e) => setSlideSubtitle(e.target.value)}
                    placeholder="Contoh: CATATAN PRAKTIK STUDIO"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Kutipan Motivasi / Tips Maskot
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={slideQuote}
                    onChange={(e) => setSlideQuote(e.target.value)}
                    placeholder="Tuliskan kutipan penyemangat belajar atau tips berkarya..."
                    className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    URL Gambar Ilustrasi (Opsional)
                  </label>
                  <Input
                    type="url"
                    value={slideImageUrl}
                    onChange={(e) => setSlideImageUrl(e.target.value)}
                    placeholder="https://.../peruchan-pose.png"
                  />
                  <span className="text-[11px] text-jp-gray-400">
                    Jika dikosongkan, kartu akan menggunakan ikon maskot kuratorial bawaan.
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Pilihan Aksen Warna
                  </label>
                  <div className="flex gap-2">
                    {(["blue", "brown", "lime"] as const).map((accent) => (
                      <button
                        key={accent}
                        type="button"
                        onClick={() => setSlideAccent(accent)}
                        className={cn(
                          "flex-1 rounded-lg py-2 text-xs font-bold border transition cursor-pointer uppercase",
                          slideAccent === accent
                            ? "border-jp-ink bg-jp-paper text-jp-ink shadow-xs"
                            : "border-jp-gray-200 bg-white text-jp-gray-500 hover:bg-jp-gray-50"
                        )}
                      >
                        {accent}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-jp-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSlideModalOpen(false)}
                  className="rounded-lg"
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleSaveSlideModal}
                  className="rounded-lg"
                >
                  Simpan Slide
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
