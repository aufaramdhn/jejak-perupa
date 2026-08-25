"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/Typography";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { RichTextEditor } from "@/components/molecules/RichTextEditor";
import { PeruChanCallout } from "@/components/molecules/PeruChanCallout";
import { QuickAddCategoryModal } from "@/components/molecules/QuickAddCategoryModal";
import { ImageDualInput } from "@/components/molecules/ImageDualInput";
import { useCategories } from "@/lib/categoryContext";
import { useModal } from "@/lib/modalContext";
import { useAuth } from "@/lib/auth";
import {
  Send,
  CheckCircle,
  ArrowLeft,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  Edit3,
  BookOpen,
  Clock,
  FileText,
  RotateCcw,
  Sparkles,
  Save,
  AlertTriangle,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChapterItem {
  id: string;
  title: string;
  content: string;
}

export interface ReferenceItem {
  id: string;
  citation: string;
}

export interface ArticleEditorFormData {
  title: string;
  authorName: string;
  category: string;
  readTime: string;
  excerpt: string;
  coverImageUrl?: string;
  chapters: ChapterItem[];
  references: ReferenceItem[];
  peruChanTip?: string;
  peruChanTheme?: "blue" | "brown" | "lime";
}

export interface ArticleEditorFormProps {
  mode: "admin-create" | "admin-edit" | "public-contribute";
  initialData?: Partial<ArticleEditorFormData>;
  storageKey: string;
  backUrl: string;
  onSave?: (data: ArticleEditorFormData, isDraft: boolean) => Promise<void> | void;
}

export function ArticleEditorForm({
  mode,
  initialData,
  storageKey,
  backUrl,
  onSave,
}: ArticleEditorFormProps) {
  const router = useRouter();
  const { currentUser } = useAuth();
  const { confirm, alert } = useModal();

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Form Fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [authorName, setAuthorName] = useState(
    initialData?.authorName ||
      (currentUser ? `${currentUser.name} (${currentUser.institution || currentUser.roleLabel})` : "")
  );
  const [category, setCategory] = useState(initialData?.category || "Pendidikan Seni");
  const [readTime, setReadTime] = useState(initialData?.readTime || "6 menit membaca");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl || "");
  const [chapters, setChapters] = useState<ChapterItem[]>(
    initialData?.chapters && initialData.chapters.length > 0
      ? initialData.chapters
      : [{ id: "chap-1", title: "", content: "" }]
  );
  const [references, setReferences] = useState<ReferenceItem[]>(
    initialData?.references || []
  );
  const [peruChanTip, setPeruChanTip] = useState(initialData?.peruChanTip || "");
  const [peruChanTheme, setPeruChanTheme] = useState<"blue" | "brown" | "lime">(
    initialData?.peruChanTheme || "blue"
  );

  const { approvedCategories } = useCategories();

  // Auto-Save & Recovery State
  const [draftDetected, setDraftDetected] = useState<boolean>(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState<string | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const isInitialMount = useRef(true);

  // Validation Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Category Options from Context
  const categoryOptions = useMemo(() => {
    return approvedCategories.map((c) => ({
      value: c.name,
      label: c.name,
    }));
  }, [approvedCategories]);

  // 1. CHECK FOR SAVED DRAFT ON MOUNT
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data && (parsed.data.title || parsed.data.excerpt || parsed.data.chapters?.some((c: any) => c.title || c.content))) {
          // If we are creating or if the draft has different data
          setDraftDetected(true);
          setDraftSavedAt(parsed.savedAt || "Sesi Sebelumnya");
        }
      }
    } catch (e) {
      console.warn("Failed to check draft", e);
    }
  }, [storageKey]);

  // 2. AUTO-SAVE TO LOCALSTORAGE AS USER TYPES
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      try {
        const payload = {
          savedAt: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          data: {
            title,
            authorName,
            category,
            readTime,
            excerpt,
            coverImageUrl,
            chapters,
            references,
            peruChanTip,
            peruChanTheme,
          },
        };
        localStorage.setItem(storageKey, JSON.stringify(payload));
        setLastAutoSaveTime(payload.savedAt);
      } catch (e) {
        console.warn("Auto-save failed", e);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [
    title,
    authorName,
    category,
    readTime,
    excerpt,
    coverImageUrl,
    chapters,
    references,
    peruChanTip,
    peruChanTheme,
    storageKey,
  ]);

  // RESTORE DRAFT ACTION
  const handleRestoreDraft = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data) {
          setTitle(parsed.data.title || "");
          setAuthorName(parsed.data.authorName || "");
          setCategory(parsed.data.category || "Pendidikan Seni");
          setReadTime(parsed.data.readTime || "6 menit membaca");
          setExcerpt(parsed.data.excerpt || "");
          setCoverImageUrl(parsed.data.coverImageUrl || "");
          if (parsed.data.chapters && parsed.data.chapters.length > 0) {
            setChapters(parsed.data.chapters);
          }
          if (parsed.data.references) {
            setReferences(parsed.data.references);
          }
          setPeruChanTip(parsed.data.peruChanTip || "");
          setPeruChanTheme(parsed.data.peruChanTheme || "blue");
          setDraftDetected(false);
          setErrors({});
          alert({
            title: "Draf Berhasil Dipulihkan",
            message: `Seluruh tulisan dari sesi ${draftSavedAt} telah dimuat kembali ke lembar editor.`,
            type: "success",
          });
        }
      }
    } catch (e) {
      console.warn("Failed to restore draft", e);
    }
  };

  // DISCARD DRAFT ACTION
  const handleDiscardDraft = async () => {
    const confirmed = await confirm({
      title: "Buang Draf Sebelumnya?",
      message: "Draf yang tersimpan di memori peramban akan dihapus secara permanen.",
      confirmLabel: "Ya, Buang Draf",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      localStorage.removeItem(storageKey);
      setDraftDetected(false);
      setDraftSavedAt(null);
    }
  };

  // CLEAR ALL FORM FIELDS
  const handleClearForm = async () => {
    const confirmed = await confirm({
      title: "Bersihkan Seluruh Lembar Kerja?",
      message: "Semua isian judul, bab, dan rujukan akan dikosongkan kembali.",
      confirmLabel: "Bersihkan",
      cancelLabel: "Batal",
      variant: "warning",
      iconType: "trash",
    });

    if (confirmed) {
      setTitle("");
      setExcerpt("");
      setCoverImageUrl("");
      setChapters([{ id: `chap-${Date.now()}`, title: "", content: "" }]);
      setReferences([]);
      setPeruChanTip("");
      setErrors({});
      localStorage.removeItem(storageKey);
      setLastAutoSaveTime(null);
    }
  };

  // CHAPTER MANAGEMENT
  const handleAddChapter = () => {
    const newChap: ChapterItem = {
      id: `chap-${Date.now()}`,
      title: "",
      content: "",
    };
    setChapters([...chapters, newChap]);
  };

  const handleUpdateChapter = (
    id: string,
    field: "title" | "content",
    val: string
  ) => {
    setChapters(
      chapters.map((ch) => (ch.id === id ? { ...ch, [field]: val } : ch))
    );
    // Clear specific error if typing
    if (errors[`chapter_${field}_${id}`]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[`chapter_${field}_${id}`];
        return copy;
      });
    }
  };

  const handleDeleteChapter = async (id: string, idx: number) => {
    if (chapters.length <= 1) {
      alert({
        title: "Tidak Dapat Menghapus",
        message: "Naskah artikel minimal harus memiliki 1 bab pembahasan.",
        type: "warning",
      });
      return;
    }

    const confirmed = await confirm({
      title: `Hapus Bab ${idx + 1}?`,
      message: "Isi teks dan judul bab ini akan dihapus dari lembar kerja.",
      confirmLabel: "Hapus Bab",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      setChapters(chapters.filter((ch) => ch.id !== id));
    }
  };

  const handleMoveChapter = (idx: number, dir: "up" | "down") => {
    if (
      (dir === "up" && idx === 0) ||
      (dir === "down" && idx === chapters.length - 1)
    )
      return;
    const targetIdx = dir === "up" ? idx - 1 : idx + 1;
    const reordered = [...chapters];
    const temp = reordered[idx];
    reordered[idx] = reordered[targetIdx];
    reordered[targetIdx] = temp;
    setChapters(reordered);
  };

  // REFERENCE MANAGEMENT
  const handleAddReference = () => {
    setReferences([...references, { id: `ref-${Date.now()}`, citation: "" }]);
  };

  const handleUpdateReference = (id: string, val: string) => {
    setReferences(
      references.map((r) => (r.id === id ? { ...r, citation: val } : r))
    );
  };

  const handleDeleteReference = (id: string) => {
    setReferences(references.filter((r) => r.id !== id));
  };

  // VALIDATION LOGIC WITH AUTO-FOCUS AND SCROLL
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim() || title.trim().length < 5) {
      newErrors["field-title"] = "Judul artikel wajib diisi minimal 5 karakter.";
    }

    if (!authorName.trim()) {
      newErrors["field-author"] = "Nama penulis / afiliasi wajib diisi.";
    }

    if (!excerpt.trim() || excerpt.trim().length < 15) {
      newErrors["field-excerpt"] = "Ringkasan / ekserp wajib diisi minimal 15 karakter.";
    }

    if (!readTime.trim()) {
      newErrors["field-readtime"] = "Estimasi durasi baca wajib ditentukan.";
    }

    chapters.forEach((ch, idx) => {
      if (!ch.title.trim()) {
        newErrors[`chapter_title_${ch.id}`] = `Judul Bab ${idx + 1} belum diisi.`;
      }
      if (!ch.content.trim() || ch.content.trim().length < 20) {
        newErrors[`chapter_content_${ch.id}`] = `Isi uraian Bab ${idx + 1} minimal 20 karakter.`;
      }
    });

    setErrors(newErrors);

    const errorKeys = Object.keys(newErrors);
    if (errorKeys.length > 0) {
      // Auto-focus first error field
      const firstErrorId = errorKeys[0];
      const element = document.getElementById(firstErrorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        if ("focus" in element) {
          (element as HTMLElement).focus();
        }
      }

      alert({
        title: "Formulir Belum Lengkap",
        message: "Mohon lengkapi bagian yang ditandai garis merah sebelum menyimpan atau menerbitkan naskah.",
        type: "warning",
      });
      return false;
    }

    return true;
  };

  // SUBMIT / PUBLISH ACTION
  const handleSubmit = async (isDraft: boolean = false) => {
    if (!isDraft) {
      const isValid = validateForm();
      if (!isValid) return;
    }

    setIsSubmitting(true);

    const formData: ArticleEditorFormData = {
      title,
      authorName,
      category,
      readTime,
      excerpt,
      coverImageUrl,
      chapters,
      references: references.filter((r) => r.citation.trim().length > 0),
      peruChanTip,
      peruChanTheme,
    };

    if (onSave) {
      await onSave(formData, isDraft);
    } else {
      // Default success action
      localStorage.removeItem(storageKey);
      await alert({
        title: isDraft ? "Draf Berhasil Disimpan" : "Naskah Berhasil Disimpan",
        message: isDraft
          ? "Naskah Anda telah disimpan ke dalam draf sistem."
          : mode === "public-contribute"
          ? "Naskah telah berhasil dikirimkan ke Meja Redaksi Kurator Jejak Perupa untuk proses penelaahan."
          : "Artikel resmi telah berhasil diterbitkan dan masuk ke katalog publik.",
        type: "success",
      });
      router.push(backUrl);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. DRAFT RECOVERY ALERT BANNER (IF UNSAVED DRAFT DETECTED) */}
      {draftDetected && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 md:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800 border border-amber-200">
              <History className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Draf Belum Tersimpan Ditemukan
              </div>
              <p className="text-xs text-amber-800 font-prose mt-0.5">
                Ada rekaman ketikan naskah dari sesi sebelumnya (pukul {draftSavedAt}). Apakah Anda ingin memulihkan draf ini?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDiscardDraft}
              className="border-amber-300 bg-white text-amber-900 hover:bg-amber-100 rounded-lg text-xs"
            >
              Buang Draf
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleRestoreDraft}
              className="rounded-lg text-xs bg-amber-700 hover:bg-amber-800 text-white"
            >
              Pulihkan Draf
            </Button>
          </div>
        </div>
      )}

      {/* 2. TOP ACTION HEADER & AUTO-SAVE INDICATOR */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <Link href={backUrl}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Kembali
            </Button>
          </Link>

          {lastAutoSaveTime && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-200">
              <CheckCircle className="h-3 w-3" />
              <span>Tersimpan otomatis ({lastAutoSaveTime})</span>
            </div>
          )}
        </div>

        {/* TAB TOGGLE: TULIS vs PRATINJAU */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-jp-gray-200 bg-jp-paper p-1">
            <button
              type="button"
              onClick={() => setActiveTab("write")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer",
                activeTab === "write"
                  ? "bg-jp-blue-900 text-white shadow-2xs"
                  : "text-jp-gray-600 hover:text-jp-ink"
              )}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Tulis Naskah</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer",
                activeTab === "preview"
                  ? "bg-jp-blue-900 text-white shadow-2xs"
                  : "text-jp-gray-600 hover:text-jp-ink"
              )}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Pratinjau Pembaca</span>
            </button>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClearForm}
            className="rounded-lg text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            Reset
          </Button>

          {mode !== "public-contribute" && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleSubmit(true)}
              className="rounded-lg text-xs"
            >
              <Save className="h-3.5 w-3.5 mr-1" />
              Simpan Draf
            </Button>
          )}

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => handleSubmit(false)}
            className="rounded-lg text-xs"
          >
            {mode === "public-contribute" ? (
              <>
                <Send className="h-3.5 w-3.5 mr-1.5" />
                Kirim Naskah
              </>
            ) : (
              <>
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                Terbitkan Artikel
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 3. MAIN EDITOR CONTENT CANVAS */}
      {activeTab === "write" ? (
        <div className="space-y-8">
          {/* SECTION A: METADATA UTAMA ARTIKEL */}
          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
            <div className="border-b border-jp-gray-200 pb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-jp-blue-700 font-mono">
                Bagian 1
              </div>
              <Heading3 className="text-lg text-jp-ink">
                Metadata & Identitas Naskah
              </Heading3>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* JUDUL ARTIKEL */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Judul Artikel <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-title"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors["field-title"]) {
                      setErrors((prev) => {
                        const copy = { ...prev };
                        delete copy["field-title"];
                        return copy;
                      });
                    }
                  }}
                  placeholder="Contoh: Mengapa Kita Perlu Belajar Sejarah Seni Rupa?"
                  className={cn(
                    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm md:text-base font-bold text-jp-ink outline-none transition",
                    errors["field-title"]
                      ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                      : "border-jp-gray-300 focus:border-jp-blue-700"
                  )}
                />
                {errors["field-title"] && (
                  <p className="text-[11px] font-semibold text-red-600 font-sans">
                    {errors["field-title"]}
                  </p>
                )}
              </div>

              {/* PENULIS / AFILIASI */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Nama Penulis & Lembaga <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-author"
                  type="text"
                  value={authorName}
                  onChange={(e) => {
                    setAuthorName(e.target.value);
                    if (errors["field-author"]) {
                      setErrors((prev) => {
                        const copy = { ...prev };
                        delete copy["field-author"];
                        return copy;
                      });
                    }
                  }}
                  placeholder="Nama Lengkap (Institusi / Komunitas)"
                  className={cn(
                    "w-full rounded-lg border bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink outline-none transition",
                    errors["field-author"]
                      ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                      : "border-jp-gray-300 focus:border-jp-blue-700"
                  )}
                />
                {errors["field-author"] && (
                  <p className="text-[11px] font-semibold text-red-600 font-sans">
                    {errors["field-author"]}
                  </p>
                )}
              </div>

              {/* KATEGORI ARTIKEL */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Kategori Wacana <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="text-[11px] font-bold text-jp-blue-700 hover:text-jp-blue-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3 w-3" />
                    {mode === "public-contribute"
                      ? "Usulkan Kategori"
                      : "+ Kategori Baru"}
                  </button>
                </div>
                <Select
                  options={categoryOptions}
                  value={category}
                  onChange={(val) => setCategory(val)}
                  placeholder="Pilih Kategori..."
                />
              </div>

              {/* ESTIMASI WAKTU BACA */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-jp-gray-500" />
                  Estimasi Durasi Baca <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-readtime"
                  type="text"
                  value={readTime}
                  onChange={(e) => {
                    setReadTime(e.target.value);
                    if (errors["field-readtime"]) {
                      setErrors((prev) => {
                        const copy = { ...prev };
                        delete copy["field-readtime"];
                        return copy;
                      });
                    }
                  }}
                  placeholder="Contoh: 7 menit membaca"
                  className={cn(
                    "w-full rounded-lg border bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink outline-none transition",
                    errors["field-readtime"]
                      ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                      : "border-jp-gray-300 focus:border-jp-blue-700"
                  )}
                />
                {errors["field-readtime"] && (
                  <p className="text-[11px] font-semibold text-red-600 font-sans">
                    {errors["field-readtime"]}
                  </p>
                )}
              </div>

              {/* COVER IMAGE DUAL INPUT */}
              <div className="space-y-1.5 sm:col-span-2">
                <ImageDualInput
                  label="Gambar Sampul Artikel (Opsional)"
                  value={coverImageUrl}
                  onChange={setCoverImageUrl}
                  placeholderUrl="https://domain.com/gambar-sampul.jpg"
                  helperGuideline="Rekomendasi rasio 16:9 (minimal 1200×675 px), format JPG, PNG, atau WebP, ukuran maksimal 3 MB."
                  minWidth={600}
                  minHeight={338}
                  maxSizeBytes={3 * 1024 * 1024}
                  maxSizeLabel="3 MB"
                  previewClassName="h-20 w-32"
                />
              </div>

              {/* EKSERP / RINGKASAN */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Ekserp / Ringkasan Pembuka <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="field-excerpt"
                  rows={2}
                  value={excerpt}
                  onChange={(e) => {
                    setExcerpt(e.target.value);
                    if (errors["field-excerpt"]) {
                      setErrors((prev) => {
                        const copy = { ...prev };
                        delete copy["field-excerpt"];
                        return copy;
                      });
                    }
                  }}
                  placeholder="Tuliskan 1-2 kalimat ringkasan yang memikat pembaca mengenai artikel ini..."
                  className={cn(
                    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-xs md:text-sm text-jp-ink outline-none transition font-prose",
                    errors["field-excerpt"]
                      ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                      : "border-jp-gray-300 focus:border-jp-blue-700"
                  )}
                />
                {errors["field-excerpt"] && (
                  <p className="text-[11px] font-semibold text-red-600 font-sans">
                    {errors["field-excerpt"]}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* SECTION B: BAB-BAB PEMBAHASAN NARASI */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-700 font-mono">
                  Bagian 2
                </span>
                <Heading3 className="text-lg text-jp-ink">
                  Struktur Bab & Isi Pembahasan
                </Heading3>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddChapter}
                className="rounded-lg text-xs"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Tambah Bab Baru
              </Button>
            </div>

            <div className="space-y-6">
              {chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-7 shadow-2xs space-y-4"
                >
                  {/* CHAPTER HEADER */}
                  <div className="flex items-center justify-between border-b border-jp-gray-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 px-2.5 items-center justify-center rounded-md bg-jp-blue-900 font-mono text-xs font-bold text-white">
                        Bab {idx + 1}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500 font-mono">
                        Subjudul Pembahasan
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMoveChapter(idx, "up")}
                        disabled={idx === 0}
                        title="Geser Bab ke Atas"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-jp-gray-200 text-jp-gray-600 hover:bg-jp-paper disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveChapter(idx, "down")}
                        disabled={idx === chapters.length - 1}
                        title="Geser Bab ke Bawah"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-jp-gray-200 text-jp-gray-600 hover:bg-jp-paper disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteChapter(ch.id, idx)}
                        title="Hapus Bab Ini"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer ml-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* CHAPTER TITLE INPUT */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-jp-ink">
                      Judul Bab {idx + 1} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id={`chapter_title_${ch.id}`}
                      type="text"
                      value={ch.title}
                      onChange={(e) =>
                        handleUpdateChapter(ch.id, "title", e.target.value)
                      }
                      placeholder={`Contoh: Fondasi Estetika & Anatomi Bentuk`}
                      className={cn(
                        "w-full rounded-lg border bg-white px-3.5 py-2 text-xs md:text-sm font-bold text-jp-ink outline-none transition",
                        errors[`chapter_title_${ch.id}`]
                          ? "border-red-500 ring-2 ring-red-400/50 bg-red-50/20"
                          : "border-jp-gray-300 focus:border-jp-blue-700"
                      )}
                    />
                    {errors[`chapter_title_${ch.id}`] && (
                      <p className="text-[11px] font-semibold text-red-600 font-sans">
                        {errors[`chapter_title_${ch.id}`]}
                      </p>
                    )}
                  </div>

                  {/* CHAPTER RICH TEXT EDITOR */}
                  <div className="space-y-1" id={`chapter_content_${ch.id}`}>
                    <label className="text-xs font-bold text-jp-ink">
                      Uraian Isi Bab {idx + 1} <span className="text-red-500">*</span>
                    </label>
                    <RichTextEditor
                      value={ch.content}
                      onChange={(val) =>
                        handleUpdateChapter(ch.id, "content", val)
                      }
                      placeholder="Tuliskan uraian kritis, analisis visual, atau catatan teori..."
                      rows={8}
                    />
                    {errors[`chapter_content_${ch.id}`] && (
                      <p className="text-[11px] font-semibold text-red-600 font-sans pt-1">
                        {errors[`chapter_content_${ch.id}`]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION C: CATATAN MASKOT PERU-CHAN & DAFTAR PUSTAKA */}
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            {/* PERU-CHAN EDITORIAL TIP */}
            <div className="rounded-xl border border-jp-blue-300 bg-jp-blue-50/50 p-6 space-y-4">
              <div className="flex items-center gap-2 border-b border-jp-blue-200 pb-3">
                <Sparkles className="h-4 w-4 text-jp-blue-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-900">
                  Catatan Editorial Peru-Chan (Opsional)
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-jp-ink">
                  Kutipan Tips di Akhir Bacaan:
                </label>
                <textarea
                  rows={3}
                  value={peruChanTip}
                  onChange={(e) => setPeruChanTip(e.target.value)}
                  placeholder="Contoh: Selalu perhatikan ketebalan impasto saat menganalisis lukisan era romantisisme!"
                  className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-jp-ink">
                  Aksen Tema Boks Tips:
                </label>
                <div className="flex gap-2">
                  {(["blue", "brown", "lime"] as const).map((accent) => (
                    <button
                      key={accent}
                      type="button"
                      onClick={() => setPeruChanTheme(accent)}
                      className={cn(
                        "flex-1 rounded-lg py-1.5 text-xs font-bold border transition cursor-pointer uppercase font-mono",
                        peruChanTheme === accent
                          ? "border-jp-ink bg-white text-jp-ink shadow-xs"
                          : "border-jp-gray-200 bg-jp-paper text-jp-gray-500 hover:bg-white"
                      )}
                    >
                      {accent}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* DAFTAR PUSTAKA & RUJUKAN */}
            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-jp-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-jp-gray-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Daftar Pustaka & Rujukan
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddReference}
                  className="rounded-lg text-xs py-1 h-7"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Tambah Rujukan
                </Button>
              </div>

              <div className="space-y-3">
                {references.length > 0 ? (
                  references.map((ref, idx) => (
                    <div key={ref.id} className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-jp-gray-400 w-6 text-center shrink-0">
                        [{idx + 1}]
                      </span>
                      <input
                        type="text"
                        value={ref.citation}
                        onChange={(e) =>
                          handleUpdateReference(ref.id, e.target.value)
                        }
                        placeholder="Contoh: Kusnadi. (1980). Sejarah Seni Rupa Indonesia. Balai Pustaka."
                        className="flex-1 rounded-lg border border-jp-gray-300 bg-white px-3 py-1.5 text-xs text-jp-ink focus:border-jp-blue-700 outline-none font-prose"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteReference(ref.id)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-jp-gray-500 font-prose italic py-2">
                    Belum ada daftar pustaka ditambahkan (opsional).
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 4. LIVE PREVIEW TAB (1:1 PUBLIC RENDERING) */
        <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-10 shadow-2xs space-y-8 max-w-4xl mx-auto">
          {/* PREVIEW HEADER */}
          <div className="border-b border-jp-gray-200 pb-6 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="blue">{category}</Badge>
              <span className="text-xs text-jp-gray-500 font-mono">
                {readTime}
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
              <h3 className="font-heading text-sm font-bold text-jp-ink uppercase tracking-wider">
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
      )}

      {/* QUICK ADD CATEGORY MODAL */}
      <QuickAddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSuccess={(newCat) => setCategory(newCat)}
        isPublicSuggestion={mode === "public-contribute"}
      />
    </div>
  );
}
