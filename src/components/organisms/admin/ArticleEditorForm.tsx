"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { QuickAddCategoryModal } from "@/components/molecules/modals/QuickAddCategoryModal";
import { useCategories } from "@/lib/categoryContext";
import { useModal } from "@/lib/modalContext";
import { useAuth } from "@/lib/auth";
import { History, Save, Send } from "lucide-react";
import { Button } from "@/components/atoms/form/Button";
import { artService } from "@/lib/services/artService";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { type ArticleFullData } from "@/lib/data/articles";

import {
  ChapterItem,
  ReferenceItem,
  ArticleEditorFormData,
  ArticleGeneralMetaSection,
  ArticleCoverMediaSection,
  ArticleChaptersManager,
  ArticleReferencesManager,
  ArticleEditorStickyBar,
  ArticleEditorPreview,
} from "./articles/editor";
import { SeoAssistantPanel } from "@/components/molecules/editor/SeoAssistantPanel";

export type { ChapterItem, ReferenceItem, ArticleEditorFormData };

export interface ArticleEditorFormProps {
  mode: "admin-create" | "admin-edit" | "public-contribute";
  initialData?: Partial<ArticleEditorFormData>;
  storageKey: string;
  backUrl: string;
  onSave?: (data: ArticleEditorFormData, isDraft: boolean) => Promise<void> | void;
}

const DUMMY_ARTICLES_POOL = [
  {
    title: "Dinamika Estetika Seni Rupa Modern Indonesia: Antara Tradisi dan Emansipasi",
    excerpt: "Menelusuri lintasan dialektika seni rupa modern Indonesia, transformasi gaya lukisan pasca-kolonial, serta rekonstruksi identitas kebudayaan nusantara.",
    authorPrefix: "Kurator Riset",
    category: "Sejarah Seni",
    readTime: "7 menit membaca",
    coverImageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    headerBgImageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&auto=format&fit=crop&q=80",
    peruChanTip: "Pelajari struktur karya seni rupa secara menyeluruh dari goresan sketsa hingga narasi kuratorialnya!",
    peruChanTheme: "blue" as const,
    chapters: [
      {
        title: "Prolog: Jejak Awal Bahasa Rupa Nusantara",
        content: "<p>Seni rupa modern di Indonesia tidak lahir dari ruang hampa, melainkan bertumpu pada sedimentasi visual tradisi yang kaya. Dari ornamen candi hingga seni wayang, prinsip komposisi ruang selalu mencerminkan kosmologi masyarakat pemiliknya.</p><p>Perjumpaan dengan teknik akademis Barat pada abad ke-19 memantik dialektika baru yang mempertemukan sensibilitas lokal dengan perspektif linier.</p>",
        peruChanTip: "Cermati bagaimana seniman nusantara menggabungkan bidang datar dekoratif dengan ilusi kedalaman ruang tiga dimensi!",
        peruChanTheme: "blue" as const,
      },
      {
        title: "Gerakan Romantisisme & Raden Saleh",
        content: "<p>Raden Saleh Syarif Bustaman menjadi figur perintis yang mengintegrasikan teknik cat minyak akademis Eropa dengan jiwa perlawanan Timur. Sapuan kuasnya yang dramatis dalam lukisan perburuan dan peristiwa sejarah menjadi tonggak emansipasi visual.</p><p>Melalui kepekaan pencahayaan chiaroscuro dan dinamika komposisi diagonal, karya-karyanya melampaui sekadar representasi realisme visual.</p>",
        peruChanTip: "Perhatikan ketebalan impasto dan kontras cahaya chiaroscuro pada bagian figur utama untuk menangkap letupan emosi karya!",
        peruChanTheme: "brown" as const,
      },
      {
        title: "Epilog: Menemukan Kembali Identitas Visual",
        content: "<p>Memasuki era kontemporer, tantangan perupa muda adalah bagaimana mendefinisikan kembali identitas lokal tanpa terjebak dalam eksotisme semu. Eksplorasi medium baru, instalasi spasial, dan keterlibatan komunitas membuka horizon baru pembelajaran seni.</p>",
        peruChanTip: "Selalu berani bereksperimen dengan percampuran medium dan jangan takut membuat sapuan kuas pertama yang ekspresif!",
        peruChanTheme: "lime" as const,
      },
    ],
    references: [
      "Soekmono, R. (1973). Pengantar Sejarah Kebudayaan Indonesia 2. Kanisius.",
      "Holt, Claire. (1967). Art in Indonesia: Continuities and Change. Cornell University Press.",
      "Kusnadi. (1980). Sejarah Seni Rupa Indonesia. Balai Pustaka.",
    ],
  },
  {
    title: "Mendalami Teknik Impasto & Ekspresionisme Murni Bersama Maestro Affandi",
    excerpt: "Membedah teknik melukis langsung dari tube cat, sapuan plototan jari yang dinamis, dan letupan energi spiritual dalam karya maestro seni lukis Indonesia.",
    authorPrefix: "Eksplorasi Studio",
    category: "Teknik & Eksplorasi",
    readTime: "6 menit membaca",
    coverImageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80",
    headerBgImageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1600&auto=format&fit=crop&q=80",
    peruChanTip: "Ekspresionisme menuntut keberanian intuisi dan kepekaan ritme gerak tubuh saat menggoreskan warna!",
    peruChanTheme: "brown" as const,
    chapters: [
      {
        title: "Karakter Garis dan Tubuh yang Menyatu",
        content: "<p>Bagi Affandi, proses melukis adalah kerja kinetik yang melibatkan seluruh energi raga. Menggantikan kuas dengan telapak tangan dan remasan jemari langsung di atas kanvas basah menghasilkan tekstur impasto bergelombang yang khas.</p><p>Garis-garis meliuk yang tercipta bukan sekadar kontur visual, melainkan jejak getaran emosi sang pelukis saat berhadapan langsung dengan objek hidup.</p>",
        peruChanTip: "Gunakan pasta tekstur atau cat akrilik tebal jika ingin melatih teknik impasto tanpa merusak kuas halus!",
        peruChanTheme: "brown" as const,
      },
      {
        title: "Simbol Matahari, Kaki, dan Tangan",
        content: "<p>Dalam repertoar visual Affandi, matahari menjadi personifikasi daya hidup semesta, tangan melambangkan daya cipta berkarya, dan kaki merefleksikan pijakan kerakyatan yang kokoh.</p><p>Trinitas simbolik ini berulang kali hadir dalam potret diri maupun pemandangan alam perdesaan nusantara.</p>",
        peruChanTip: "Kembangkan simbol personal dalam karya seni Anda sebagai penanda narasi autentik perjalanan berkarya!",
        peruChanTheme: "lime" as const,
      },
    ],
    references: [
      "Affandi. (1987). Catatan Seorang Pelukis. Yayasan Affandi.",
      "Spanjaard, Helena. (2000). Exploring Modern Indonesian Art. KIT Publishers.",
    ],
  },
];

export function ArticleEditorForm({
  mode,
  initialData,
  storageKey,
  backUrl,
  onSave,
}: ArticleEditorFormProps) {
  const router = useRouter();
  const { alert, confirm } = useModal();
  const { categories } = useCategories();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 1. Form States
  const [title, setTitle] = useState(initialData?.title || "");
  const [authorName, setAuthorName] = useState(
    initialData?.authorName || currentUser?.name || "Kurator Redaksi Jejak Perupa"
  );
  const [category, setCategory] = useState(initialData?.category || "Pendidikan Seni");
  const [readTime, setReadTime] = useState(initialData?.readTime || "5 menit membaca");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImageUrl || "");
  const [headerBgImageUrl, setHeaderBgImageUrl] = useState(initialData?.headerBgImageUrl || "");
  const [headerBgColor, setHeaderBgColor] = useState(initialData?.headerBgColor || "#182C4A");
  const [headerGradientOpacity, setHeaderGradientOpacity] = useState<number>(
    initialData?.headerGradientOpacity ?? 85
  );
  const [headerGradientHeight, setHeaderGradientHeight] = useState<number>(
    initialData?.headerGradientHeight ?? 80
  );

  const [chapters, setChapters] = useState<ChapterItem[]>(
    initialData?.chapters && initialData.chapters.length > 0
      ? initialData.chapters
      : [
          {
            id: "chap-init-1",
            title: "Pengantar & Latar Belakang",
            content: "<p>Tuliskan pengantar wacana atau pendahuluan topik di sini...</p>",
          },
        ]
  );

  const [references, setReferences] = useState<ReferenceItem[]>(
    initialData?.references || []
  );

  const [peruChanTip, setPeruChanTip] = useState(initialData?.peruChanTip || "");
  const [peruChanTheme, setPeruChanTheme] = useState<"blue" | "brown" | "lime">("blue");
  const [focusKeyword, setFocusKeyword] = useState(initialData?.focusKeyword || "");

  // 2. Draft Autosave & Recovery
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState<string | null>(null);
  const [draftDetected, setDraftDetected] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.title || (parsed.chapters && parsed.chapters.length > 0))) {
          if (!initialData?.title) {
            setDraftDetected(true);
            setDraftSavedAt(parsed.savedAt || "Sesi Sebelumnya");
          }
        }
      }
    } catch (e) {
      console.warn("Gagal memeriksa draf lokal", e);
    }
  }, [storageKey, initialData]);

  // Debounced auto-save
  useEffect(() => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    autoSaveTimerRef.current = setTimeout(() => {
      if (title.trim() || excerpt.trim()) {
        try {
          const now = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
          const payload = {
            title,
            authorName,
            category,
            readTime,
            excerpt,
            coverImageUrl,
            headerBgImageUrl,
            headerBgColor,
            headerGradientOpacity,
            headerGradientHeight,
            chapters,
            references,
            focusKeyword,
            peruChanTip,
            peruChanTheme,
            savedAt: now,
          };
          localStorage.setItem(storageKey, JSON.stringify(payload));
          setLastAutoSaveTime(now);
        } catch (e) {
          console.warn("Gagal menyimpan draf otomatis", e);
        }
      }
    }, 1500);

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [
    title,
    authorName,
    category,
    readTime,
    excerpt,
    coverImageUrl,
    headerBgImageUrl,
    headerBgColor,
    headerGradientOpacity,
    headerGradientHeight,
    chapters,
    references,
    focusKeyword,
    peruChanTip,
    peruChanTheme,
    storageKey,
  ]);

  const handleRestoreDraft = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.authorName) setAuthorName(parsed.authorName);
        if (parsed.category) setCategory(parsed.category);
        if (parsed.readTime) setReadTime(parsed.readTime);
        if (parsed.excerpt) setExcerpt(parsed.excerpt);
        if (parsed.coverImageUrl) setCoverImageUrl(parsed.coverImageUrl);
        if (parsed.headerBgImageUrl) setHeaderBgImageUrl(parsed.headerBgImageUrl);
        if (parsed.headerBgColor) setHeaderBgColor(parsed.headerBgColor);
        if (parsed.headerGradientOpacity !== undefined) setHeaderGradientOpacity(parsed.headerGradientOpacity);
        if (parsed.headerGradientHeight !== undefined) setHeaderGradientHeight(parsed.headerGradientHeight);
        if (parsed.chapters) setChapters(parsed.chapters);
        if (parsed.references) setReferences(parsed.references);
        if (parsed.focusKeyword) setFocusKeyword(parsed.focusKeyword);
        if (parsed.peruChanTip) setPeruChanTip(parsed.peruChanTip);
        if (parsed.peruChanTheme) setPeruChanTheme(parsed.peruChanTheme);

        setDraftDetected(false);
        alert({
          title: "Draf Dipulihkan",
          message: "Data naskah Anda dari sesi sebelumnya berhasil dimuat kembali.",
          type: "success",
        });
      }
    } catch (e) {
      console.warn("Gagal memulihkan draf", e);
    }
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(storageKey);
    setDraftDetected(false);
  };

  // 3. Quick Fill Dev Feature
  const handleQuickFillDev = () => {
    const randomTopic = DUMMY_ARTICLES_POOL[Math.floor(Math.random() * DUMMY_ARTICLES_POOL.length)];
    const randomAuthor = `${randomTopic.authorPrefix} ${currentUser?.name || "Redaksi Jejak Perupa"}`;

    setTitle(randomTopic.title);
    setAuthorName(randomAuthor);
    setCategory(randomTopic.category);
    setReadTime(randomTopic.readTime);
    setExcerpt(randomTopic.excerpt);
    setCoverImageUrl(randomTopic.coverImageUrl);
    setHeaderBgImageUrl(randomTopic.headerBgImageUrl);
    setHeaderGradientOpacity(85);
    setHeaderGradientHeight(80);
    setFocusKeyword(randomTopic.title.split(":")[0].toLowerCase().trim());
    setPeruChanTip(randomTopic.peruChanTip);
    setPeruChanTheme(randomTopic.peruChanTheme);

    const mappedChapters: ChapterItem[] = randomTopic.chapters.map((ch, idx) => ({
      id: `chap-${Date.now()}-${idx + 1}`,
      title: ch.title,
      content: ch.content,
      peruChanTip: ch.peruChanTip,
      peruChanTheme: ch.peruChanTheme,
    }));
    setChapters(mappedChapters);

    const mappedRefs: ReferenceItem[] = randomTopic.references.map((r, idx) => ({
      id: `ref-${Date.now()}-${idx + 1}`,
      citation: r,
    }));
    setReferences(mappedRefs);

    setErrors({});
    alert({
      title: "Data Naskah Berhasil Diisi!",
      message: `Form terisi otomatis dengan materi kuratorial "${randomTopic.title}".`,
      type: "success",
    });
  };

  const handleClearForm = async () => {
    const confirmed = await confirm({
      title: "Kosongkan Formulir?",
      message: "Seluruh isian naskah dan bab akan dikosongkan. Tindakan ini tidak dapat dibatalkan.",
      confirmLabel: "Kosongkan",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      localStorage.removeItem(storageKey);
      setTitle("");
      setExcerpt("");
      setCoverImageUrl("");
      setHeaderBgImageUrl("");
      setChapters([
        {
          id: `chap-${Date.now()}-1`,
          title: "Pengantar & Latar Belakang",
          content: "<p>Tuliskan pengantar naskah...</p>",
        },
      ]);
      setReferences([]);
      setPeruChanTip("");
      setFocusKeyword("");
      setErrors({});
    }
  };

  // 4. Chapter Management
  const handleAddChapter = () => {
    const newIdx = chapters.length + 1;
    setChapters((prev) => [
      ...prev,
      {
        id: `chap-${Date.now()}-${newIdx}`,
        title: `Bab ${newIdx}: Subjudul Pembahasan`,
        content: "<p>Tuliskan uraian pembahasan bab ini di sini...</p>",
      },
    ]);
  };

  const handleUpdateChapter = (
    id: string,
    fieldOrObj: string | Partial<ChapterItem>,
    value?: string
  ) => {
    setChapters((prev) =>
      prev.map((ch) => {
        if (ch.id !== id) return ch;
        if (typeof fieldOrObj === "string" && value !== undefined) {
          return { ...ch, [fieldOrObj]: value };
        } else if (typeof fieldOrObj === "object") {
          return { ...ch, ...fieldOrObj };
        }
        return ch;
      })
    );
  };

  const handleDeleteChapter = async (id: string, idx: number) => {
    if (chapters.length <= 1) {
      alert({
        title: "Tidak Dapat Menghapus",
        message: "Naskah minimal harus memiliki 1 bab pembahasan.",
        type: "error",
      });
      return;
    }

    const confirmed = await confirm({
      title: "Hapus Bab Ini?",
      message: `Bab ${idx + 1} dan seluruh isinya akan dihapus dari naskah.`,
      confirmLabel: "Hapus Bab",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      setChapters((prev) => prev.filter((ch) => ch.id !== id));
    }
  };

  const handleMoveChapter = (idx: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= chapters.length) return;

    setChapters((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  // 5. Reference Management
  const handleAddReference = () => {
    setReferences((prev) => [
      ...prev,
      {
        id: `ref-${Date.now()}-${prev.length + 1}`,
        citation: "",
      },
    ]);
  };

  const handleUpdateReference = (id: string, citation: string) => {
    setReferences((prev) =>
      prev.map((r) => (r.id === id ? { ...r, citation } : r))
    );
  };

  const handleDeleteReference = (id: string) => {
    setReferences((prev) => prev.filter((r) => r.id !== id));
  };

  // 6. Validation & Submit
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors["field-title"] = "Judul artikel wajib diisi.";
    if (!authorName.trim()) newErrors["field-author"] = "Nama penulis wajib diisi.";
    if (!excerpt.trim()) newErrors["field-excerpt"] = "Ringkasan eksekutif wajib diisi.";
    if (!readTime.trim()) newErrors["field-readtime"] = "Estimasi waktu baca wajib diisi.";

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
        message: "Mohon lengkapi bagian yang ditandai garis merah sebelum menyimpan naskah.",
        type: "warning",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (isDraft: boolean = false) => {
    if (!isDraft) {
      const isValid = validateForm();
      if (!isValid) return;
    }

    setIsSubmitting(true);

    const slug =
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-") || `artikel-${Date.now()}`;

    const selectedCatObj = categories.find(
      (c) =>
        c.name.toLowerCase() === category.toLowerCase() ||
        c.slug.toLowerCase() === category.toLowerCase() ||
        c.id.toLowerCase() === category.toLowerCase()
    );
    const resolvedCategoryId = selectedCatObj ? selectedCatObj.id : (categories[0]?.id || "cat-pendidikan");

    const newArticleData: ArticleFullData = {
      id: initialData?.title
        ? artService.getArticleBySlug(slug)?.id || `art-${Date.now()}`
        : `art-${Date.now()}`,
      title,
      slug,
      excerpt,
      category: selectedCatObj ? selectedCatObj.name : category,
      categoryId: resolvedCategoryId,
      categoryVariant: "lime",
      readTime,
      readTimeMinutes: parseInt(readTime) || 7,
      publishedDate: new Date().toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      authorName: authorName || (currentUser?.name ? `${currentUser.name}` : "Kurator Jejak Perupa"),
      coverImageUrl,
      headerBgImageUrl,
      headerBgColor,
      headerGradientOpacity,
      headerGradientHeight,
      peruChanTip,
      peruChanTipTitle: "Catatan Editorial Peru-Chan",
      tocItems: chapters.map((ch, idx) => ({
        id: ch.id,
        title: ch.title,
        number: (idx + 1).toString().padStart(2, "0"),
      })),
      contentSections: chapters.map((ch, idx) => ({
        id: ch.id,
        number: (idx + 1).toString().padStart(2, "0"),
        heading: ch.title,
        paragraphs: ch.content
          .replace(/<p>/g, "")
          .split("</p>")
          .map((p) => p.replace(/<[^>]*>/g, "").trim())
          .filter((p) => p.length > 0),
        peruChanTip: ch.peruChanTip,
        peruChanTheme: ch.peruChanTheme,
      })),
      references: references
        .filter((r) => r.citation.trim().length > 0)
        .map((r) => ({
          citation: r.citation,
          sourceType: "Akademik",
        })),
      relatedSlugs: [],
    };

    if (mode === "admin-create" || mode === "public-contribute") {
      await artService.addArticle(newArticleData);

      // Cloud submission sync: Insert into Supabase art_submissions
      if (isSupabaseConfigured() && mode === "public-contribute") {
        try {
          await supabase.from("art_submissions").upsert(
            {
              id: newArticleData.id,
              contributor_name: newArticleData.authorName || "Kontributor Seni",
              contributor_email: "kontributor@jejakperupa.id",
              title: newArticleData.title,
              content_markdown:
                newArticleData.contentSections
                  ?.map(
                    (s) =>
                      `## ${s.heading}\n\n${(s.paragraphs || []).join("\n\n")}`
                  )
                  .join("\n\n") || newArticleData.excerpt,
              status: isDraft ? "PENDING" : "PENDING",
            },
            { onConflict: "id" }
          );
        } catch (e) {
          console.warn("Supabase art_submissions insert exception:", e);
        }
      }

      // Track into user's personal articles list
      try {
        const storedMyArticles = localStorage.getItem("jejak_perupa_my_articles");
        const list = storedMyArticles ? JSON.parse(storedMyArticles) : [];
        const newRecord = {
          id: newArticleData.id,
          slug: newArticleData.slug,
          title: newArticleData.title,
          category: newArticleData.category,
          categoryVariant: newArticleData.categoryVariant,
          excerpt: newArticleData.excerpt,
          readTime: newArticleData.readTime,
          publishedDate: newArticleData.publishedDate,
          authorName: newArticleData.authorName,
          coverImageUrl: newArticleData.coverImageUrl,
          headerBgColor: newArticleData.headerBgColor,
          status: isDraft ? "DRAFT" : mode === "public-contribute" ? "SUBMITTED" : "PUBLISHED",
          createdAt: new Date().toISOString(),
        };
        const updatedList = [
          newRecord,
          ...list.filter((item: any) => item.slug !== newArticleData.slug && item.id !== newArticleData.id),
        ];
        localStorage.setItem("jejak_perupa_my_articles", JSON.stringify(updatedList));
      } catch (e) {}
    } else if (mode === "admin-edit") {
      await artService.updateArticle(slug, newArticleData);
    }

    const formData: ArticleEditorFormData = {
      title,
      authorName,
      category,
      readTime,
      excerpt,
      coverImageUrl,
      headerBgImageUrl,
      headerBgColor,
      headerGradientOpacity,
      headerGradientHeight,
      chapters,
      references: references.filter((r) => r.citation.trim().length > 0),
      focusKeyword,
      peruChanTip,
      peruChanTheme,
    };

    if (onSave) {
      await onSave(formData, isDraft);
    } else {
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

  const categoryOptions = useMemo(() => {
    return categories.map((c) => ({
      label: c.name,
      value: c.name,
    }));
  }, [categories]);

  return (
    <div className="space-y-6 font-sans">
      {/* 1. DRAFT RECOVERY ALERT BANNER */}
      {draftDetected && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 md:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800 border border-amber-200">
              <History className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900 font-sans">
                Draf Belum Tersimpan Ditemukan
              </div>
              <p className="text-xs text-amber-800 font-prose mt-0.5">
                Ada rekaman ketikan naskah dari sesi sebelumnya (pukul {draftSavedAt}). Apakah Anda ingin memulihkan draf ini?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="border border-amber-300 bg-white text-amber-900 hover:bg-amber-100 rounded-lg text-xs px-3 py-1.5 font-semibold cursor-pointer"
            >
              Buang Draf
            </button>
            <button
              type="button"
              onClick={handleRestoreDraft}
              className="rounded-lg text-xs bg-amber-700 hover:bg-amber-800 text-white px-3 py-1.5 font-semibold cursor-pointer shadow-2xs"
            >
              Pulihkan Draf
            </button>
          </div>
        </div>
      )}

      {/* 2. TOP ACTION HEADER & STICKY CONTROLS */}
      <ArticleEditorStickyBar
        backUrl={backUrl}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lastAutoSaveTime={lastAutoSaveTime}
        mode={mode}
        onQuickFillDev={handleQuickFillDev}
        onClearForm={handleClearForm}
        onSubmit={handleSubmit}
      />

      {/* 3. MAIN EDITOR CONTENT OR PREVIEW */}
      {activeTab === "write" ? (
        <div className="space-y-8">
          <ArticleGeneralMetaSection
            title={title}
            setTitle={setTitle}
            authorName={authorName}
            setAuthorName={setAuthorName}
            category={category}
            setCategory={setCategory}
            categoryOptions={categoryOptions}
            readTime={readTime}
            setReadTime={setReadTime}
            excerpt={excerpt}
            setExcerpt={setExcerpt}
            errors={errors}
            onClearError={(fieldId) => {
              setErrors((prev) => {
                const copy = { ...prev };
                delete copy[fieldId];
                return copy;
              });
            }}
            onOpenCategoryModal={() => setIsCategoryModalOpen(true)}
            mode={mode}
          />

          <ArticleCoverMediaSection
            coverImageUrl={coverImageUrl}
            setCoverImageUrl={setCoverImageUrl}
            headerBgImageUrl={headerBgImageUrl}
            setHeaderBgImageUrl={setHeaderBgImageUrl}
            headerBgColor={headerBgColor}
            setHeaderBgColor={setHeaderBgColor}
            headerGradientOpacity={headerGradientOpacity}
            setHeaderGradientOpacity={setHeaderGradientOpacity}
            headerGradientHeight={headerGradientHeight}
            setHeaderGradientHeight={setHeaderGradientHeight}
          />

          {/* ASISTEN SEO & KATA KUNCI */}
          <SeoAssistantPanel
            title={title}
            excerpt={excerpt}
            category={category}
            authorName={authorName}
            coverImageUrl={coverImageUrl}
            chapters={chapters}
            references={references}
            focusKeyword={focusKeyword}
            setFocusKeyword={setFocusKeyword}
          />

          <ArticleChaptersManager
            chapters={chapters}
            errors={errors}
            onAddChapter={handleAddChapter}
            onUpdateChapter={handleUpdateChapter}
            onDeleteChapter={handleDeleteChapter}
            onMoveChapter={handleMoveChapter}
          />

          <ArticleReferencesManager
            peruChanTip={peruChanTip}
            setPeruChanTip={setPeruChanTip}
            peruChanTheme={peruChanTheme}
            setPeruChanTheme={setPeruChanTheme}
            references={references}
            onAddReference={handleAddReference}
            onUpdateReference={handleUpdateReference}
            onDeleteReference={handleDeleteReference}
          />
        </div>
      ) : (
        <ArticleEditorPreview
          title={title}
          authorName={authorName}
          category={category}
          readTime={readTime}
          excerpt={excerpt}
          headerBgImageUrl={headerBgImageUrl}
          headerBgColor={headerBgColor}
          headerGradientOpacity={headerGradientOpacity}
          headerGradientHeight={headerGradientHeight}
          chapters={chapters}
          references={references}
          peruChanTip={peruChanTip}
          peruChanTheme={peruChanTheme}
        />
      )}

      {/* BOTTOM ACTION & SUBMISSION BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs font-sans">
        <div className="text-xs text-jp-gray-600 font-prose text-center sm:text-left">
          {mode === "public-contribute"
            ? "Pastikan seluruh bagian naskah opini seni telah Anda isi dengan teliti sebelum dikirimkan ke meja kurasi redaksi."
            : "Naskah yang diterbitkan akan langsung dapat diakses publik pada katalog wacana dan arsip seni rupa."}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {mode !== "public-contribute" && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => handleSubmit(true)}
              disabled={isSubmitting}
              className="rounded-lg text-xs font-semibold cursor-pointer w-full sm:w-auto"
            >
              <Save className="h-4 w-4 mr-1.5" />
              Simpan Draf
            </Button>
          )}
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="rounded-lg text-xs font-bold shadow-xs cursor-pointer w-full sm:w-auto"
          >
            <Send className="h-4 w-4 mr-2" />
            {mode === "public-contribute" ? "Kirim Naskah" : "Terbitkan Artikel"}
          </Button>
        </div>
      </div>

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
