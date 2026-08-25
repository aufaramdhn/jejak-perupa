"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  SectionLabel,
} from "@/components/atoms/Typography";
import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { RichTextEditor } from "@/components/molecules/RichTextEditor";
import { PeruChanCallout } from "@/components/molecules/PeruChanCallout";
import { useAuth } from "@/lib/auth";
import { useModal } from "@/lib/modalContext";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChapterItem {
  id: string;
  title: string;
  content: string;
}

interface ReferenceItem {
  id: string;
  citation: string;
}

export default function KontribusiArtikelPage() {
  const { currentUser } = useAuth();
  const { confirm, toast } = useModal();
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  // Metadata form (starts clean and empty)
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("Teori Seni");
  const [readTime, setReadTime] = useState("6 menit membaca");
  const [excerpt, setExcerpt] = useState("");

  // Chapters list (starts with 1 clean initial chapter, no mascot input)
  const [chapters, setChapters] = useState<ChapterItem[]>([
    {
      id: "chap-1",
      title: "",
      content: "",
    },
  ]);

  // References list (starts empty)
  const [references, setReferences] = useState<ReferenceItem[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Sync author name with current logged in user
  useEffect(() => {
    if (currentUser && !authorName) {
      setAuthorName(
        `${currentUser.name} (${currentUser.institution || currentUser.roleLabel})`
      );
    }
  }, [currentUser, authorName]);

  // Category options (searchable & scrollable 5 items at once)
  const categoryOptions = [
    { value: "Teori Seni", label: "Teori Seni", description: "Konsep estetika dan filsafat rupa" },
    { value: "Teknik Seni", label: "Teknik Seni", description: "Praktik studio cat, pahat, kriya" },
    { value: "Sejarah Seni", label: "Sejarah Seni", description: "Lini masa pergerakan maestro" },
    { value: "Pendidikan Seni", label: "Pendidikan Seni", description: "Panduan kurikulum studi seni" },
    { value: "Ulasan Pameran", label: "Ulasan Pameran", description: "Kritik dan apresiasi galeri" },
    { value: "Kritik Seni", label: "Kritik Seni", description: "Analisis diskursus wacana seni" },
    { value: "Estetika Nusantara", label: "Estetika Nusantara", description: "Kearifan rupa tradisi daerah" },
    { value: "Studi Material", label: "Studi Material", description: "Eksplorasi pigmen & medium organik" },
  ];

  // Read time options
  const readTimeOptions = [
    "3 menit membaca",
    "5 menit membaca",
    "6 menit membaca",
    "8 menit membaca",
    "10 menit membaca",
    "12 menit membaca",
    "15 menit membaca",
  ];

  // Load sample demo draft if user wants to see an example
  const handleLoadSampleDraft = () => {
    setTitle("Membaca Dinamika Ruang dan Komposisi Seni Lukis");
    setAuthorName("Raden Wijaya (Mahasiswa Seni Rupa ISI)");
    setCategory("Teori Seni");
    setReadTime("8 menit membaca");
    setExcerpt(
      "Eksplorasi mendalam mengenai bagaimana penataan elemen rupa, kedalaman ruang, dan keseimbangan asimetris menciptakan getaran emosional pada karya lukis maestro nusantara."
    );
    setChapters([
      {
        id: "chap-1",
        title: "Memahami Fondasi Bahasa Rupa dalam Seni Lukis",
        content:
          "Bahasa rupa merupakan jembatan utama antara gagasan batin seniman dan persepsi inderawi penikmat karya. Berbeda dengan bahasa verbal yang mengandalkan untaian kata dan tata bahasa bertingkat, bahasa rupa bekerja melalui resonansi visual: garis, bidang, warna, tekstur, dan ruang kosong.\n\nDalam tradisi seni lukis Indonesia, eksplorasi bahasa rupa sering kali dipengaruhi oleh kepekaan spasial tradisi lokal, di mana bidang dua dimensi diperlakukan bukan sebagai batasan fisik, melainkan hamparan kanvas bernyawa.",
      },
      {
        id: "chap-2",
        title: "Hierarki Visual dan Keseimbangan Komposisi",
        content:
          "Keseimbangan dalam seni lukis tidak selalu harus bersifat simetris geometris. Sebagian besar mahakarya seni modern nusantara justru memanfaatkan **keseimbangan asimetris (*informal balance*)** untuk memicu ketegangan naratif.\n\nBeberapa aspek utama hierarki visual meliputi:\n- **Titik Pusat Perhatian (*Focal Point*):** Area pertama yang menangkap pandangan mata.\n- **Aksen Warna Kontras:** Penempatan pigmen cerah di tengah dominasi warna tanah gelap.\n- **Arah Gerak Garis (*Leading Lines*):** Garis imajiner yang memandu arah pandang pemirsa.",
      },
      {
        id: "chap-3",
        title: "Relevansi Estetika bagi Generasi Pembelajar",
        content:
          "Memahami prinsip ruang dan komposisi membekali kita untuk tidak hanya menjadi penonton yang pasif, melainkan pengkaji kritis yang mampu membaca pesan tersembunyi di balik goresan kuas.\n\nKetika berkarya di studio, cobalah untuk selalu menyisihkan waktu sejenak guna mundur beberapa langkah dari kanvas untuk memeriksa keutuhan komposisimu.",
      },
    ]);
    setReferences([
      {
        id: "ref-1",
        citation:
          "Tabrani, Primadi. (2014). *Bahasa Rupa: Menelusuri Gambar Prasejarah hingga Modern*. Bandung: Kelir.",
      },
      {
        id: "ref-2",
        citation:
          "Holt, Claire. (2000). *Melacak Jejak Perkembangan Seni di Indonesia*. Jakarta: Masyarakat Seni Pertunjukan Indonesia.",
      },
    ]);
    toast({
      type: "info",
      title: "Contoh Draf Dimuat",
      message: "Naskah demonstrasi berhasil dimuat ke formulir.",
    });
  };

  // Reset form to completely empty with confirmation
  const handleResetForm = async () => {
    const confirmed = await confirm({
      title: "Kosongkan Formulir?",
      message: "Seluruh judul, bab materi, dan daftar sitasi yang telah ditulis akan direset kembali ke lembar awal kosong.",
      confirmLabel: "Ya, Kosongkan",
      cancelLabel: "Batal",
      variant: "warning",
      iconType: "alert",
    });

    if (confirmed) {
      setTitle("");
      setExcerpt("");
      setChapters([
        {
          id: `chap-${Date.now()}`,
          title: "",
          content: "",
        },
      ]);
      setReferences([]);
      toast({
        type: "info",
        title: "Formulir Dikosongkan",
        message: "Lembar kerja telah direset.",
      });
    }
  };

  // Chapter handlers
  const handleAddChapter = () => {
    const newChapter: ChapterItem = {
      id: `chap-${Date.now()}`,
      title: "",
      content: "",
    };
    setChapters([...chapters, newChapter]);
    toast({
      type: "info",
      title: "Bab Baru Ditambahkan",
      message: `Bab ${chapters.length + 1} siap ditulis.`,
    });
  };

  const handleUpdateChapter = (id: string, field: keyof ChapterItem, value: string) => {
    setChapters(
      chapters.map((ch) => (ch.id === id ? { ...ch, [field]: value } : ch))
    );
  };

  const handleDeleteChapter = async (id: string, chapterNum: number) => {
    if (chapters.length <= 1) return;
    const confirmed = await confirm({
      title: `Hapus Bab ${chapterNum}?`,
      message: `Seluruh teks isi narasi dan judul pada Bab ${chapterNum} akan dihapus dari draf ini.`,
      confirmLabel: "Ya, Hapus Bab",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      setChapters(chapters.filter((ch) => ch.id !== id));
      toast({
        type: "success",
        title: "Bab Dihapus",
        message: `Bab ${chapterNum} berhasil dihapus.`,
      });
    }
  };

  const handleMoveChapter = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === chapters.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const newChapters = [...chapters];
    const temp = newChapters[index];
    newChapters[index] = newChapters[targetIndex];
    newChapters[targetIndex] = temp;
    setChapters(newChapters);
  };

  // Reference handlers
  const handleAddReference = () => {
    setReferences([
      ...references,
      {
        id: `ref-${Date.now()}`,
        citation: "",
      },
    ]);
  };

  const handleUpdateReference = (id: string, text: string) => {
    setReferences(
      references.map((r) => (r.id === id ? { ...r, citation: text } : r))
    );
  };

  const handleDeleteReference = async (id: string, refNum: number) => {
    const confirmed = await confirm({
      title: `Hapus Sitasi [${refNum}]?`,
      message: "Rujukan kepustakaan ini akan dihapus dari daftar pustaka artikel.",
      confirmLabel: "Hapus",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "trash",
    });

    if (confirmed) {
      setReferences(references.filter((r) => r.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authorName.trim() || chapters.length === 0) return;
    setSubmitted(true);
    toast({
      type: "success",
      title: "Naskah Berhasil Dikirim",
      message: "Draf artikel telah diserahkan ke antrean meja kurasi redaksi.",
    });
  };

  return (
    <MainPublicLayout>
      {/* HEADER SECTION */}
      <section className="border-b border-jp-gray-300 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <SectionLabel>Ruang Kontributor Redaksi</SectionLabel>
            <Heading1 className="mt-2 text-jp-ink text-3xl sm:text-4xl">
              Penyusun Artikel Modular (Chapter Builder)
            </Heading1>
            <Paragraph className="mt-1 text-sm md:text-base text-jp-gray-700 font-sans">
              Tulis artikel edukasi seni terstruktur bab demi bab. Naskahmu akan ditinjau oleh tim kurator redaksi sebelum terbit ke katalog publik.
            </Paragraph>
          </div>

          {/* QUICK CONTROLS & TAB SWITCHER */}
          <div className="flex flex-wrap items-center gap-3 font-sans shrink-0">
            <button
              type="button"
              onClick={handleLoadSampleDraft}
              className="inline-flex items-center gap-1.5 rounded-lg border border-jp-blue-200 bg-jp-blue-50 px-3 py-2 text-xs font-bold text-jp-blue-900 hover:bg-jp-blue-100 transition cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5 text-jp-blue-700" />
              Muat Contoh Draf
            </button>

            <button
              type="button"
              onClick={handleResetForm}
              className="inline-flex items-center gap-1.5 rounded-lg border border-jp-gray-300 bg-white px-3 py-2 text-xs font-semibold text-jp-gray-700 hover:bg-jp-paper transition cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5 text-jp-gray-500" />
              Kosongkan
            </button>

            <div className="flex items-center gap-1 rounded-lg border border-jp-gray-300 bg-jp-paper p-1">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  activeTab === "write"
                    ? "bg-jp-blue-900 text-white shadow-2xs"
                    : "text-jp-gray-700 hover:text-jp-blue-900"
                )}
              >
                <Edit3 className="h-3.5 w-3.5" />
                Editor Tulis
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
                  activeTab === "preview"
                    ? "bg-jp-blue-900 text-white shadow-2xs"
                    : "text-jp-gray-700 hover:text-jp-blue-900"
                )}
              >
                <Eye className="h-3.5 w-3.5" />
                Pratinjau ({chapters.length} Bab)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FORM BODY */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 font-sans">
        {!submitted ? (
          <div>
            {/* WRITE TAB */}
            {activeTab === "write" && (
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* 1. INFORMASI UTAMA & METADATA */}
                <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
                  <div className="flex items-center justify-between border-b border-jp-gray-100 pb-4">
                    <Heading2 className="text-xl text-jp-ink">
                      1. Informasi & Metadata Artikel
                    </Heading2>
                    <span className="text-xs text-jp-gray-400 font-mono">
                      Langkah 1 dari 3
                    </span>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                        Nama Lengkap & Afiliasi Penulis
                      </label>
                      <Input
                        required
                        placeholder="Contoh: Raden Wijaya (Mahasiswa Seni Rupa Murni ISI)"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                        Judul Utama Artikel
                      </label>
                      <Input
                        required
                        placeholder="Contoh: Eksplorasi Bahasa Rupa dalam Seni Lukis Modern"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* CUSTOM SEARCHABLE SELECT FOR CATEGORY */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                        Kategori Studi (Custom Searchable Select)
                      </label>
                      <Select
                        options={categoryOptions}
                        value={category}
                        onChange={(val) => setCategory(val)}
                        placeholder="Pilih kategori studi seni..."
                        isSearchable={true}
                      />
                    </div>

                    {/* CUSTOM SELECT FOR READ TIME */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                        Estimasi Waktu Membaca
                      </label>
                      <Select
                        options={readTimeOptions}
                        value={readTime}
                        onChange={(val) => setReadTime(val)}
                        placeholder="Pilih estimasi durasi..."
                        isSearchable={false}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                      Ringkasan Pembuka (Lead Paragraph / Ekserp)
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tuliskan 2-3 kalimat ringkasan inti pesan artikel untuk ditampilkan di kartu depan..."
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="w-full rounded-lg border border-jp-gray-300 bg-white p-3.5 text-sm text-jp-ink placeholder:text-jp-gray-400 focus:border-jp-blue-700 focus:ring-2 focus:ring-jp-blue-100 outline-none font-prose"
                    />
                  </div>
                </div>

                {/* 2. MODULAR CHAPTER BUILDER */}
                <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jp-gray-100 pb-4">
                    <div>
                      <Heading2 className="text-xl text-jp-ink">
                        2. Modul Bab Tulisan ({chapters.length} Bab Terstruktur)
                      </Heading2>
                      <p className="mt-1 text-xs text-jp-gray-500">
                        Setiap bab akan otomatis membentuk navigasi Daftar Isi di sisi kanan artikel.
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleAddChapter}
                      className="rounded-lg"
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      Tambah Bab Baru
                    </Button>
                  </div>

                  {/* CHAPTERS LIST */}
                  <div className="space-y-8">
                    {chapters.map((chapter, idx) => (
                      <div
                        key={chapter.id}
                        className="rounded-xl border border-jp-gray-300 bg-jp-paper/40 p-6 space-y-5 transition-all"
                      >
                        {/* CHAPTER HEADER */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jp-gray-200/80 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 px-2.5 items-center justify-center rounded-md bg-jp-blue-900 font-mono text-xs font-bold text-white shadow-2xs">
                              Bab {idx + 1}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
                              Struktur Bagian
                            </span>
                          </div>

                          {/* REORDER & DELETE ACTIONS */}
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              title="Pindah ke Atas"
                              disabled={idx === 0}
                              onClick={() => handleMoveChapter(idx, "up")}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-jp-gray-300 bg-white text-jp-gray-600 hover:bg-jp-blue-50 hover:text-jp-blue-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              title="Pindah ke Bawah"
                              disabled={idx === chapters.length - 1}
                              onClick={() => handleMoveChapter(idx, "down")}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-jp-gray-300 bg-white text-jp-gray-600 hover:bg-jp-blue-50 hover:text-jp-blue-900 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              title="Hapus Bab"
                              disabled={chapters.length <= 1}
                              onClick={() => handleDeleteChapter(chapter.id, idx + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-800 disabled:opacity-30 disabled:cursor-not-allowed transition ml-2"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* CHAPTER TITLE INPUT */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                            Judul Bab {idx + 1}
                          </label>
                          <Input
                            required
                            placeholder={`Contoh: Mengenal Empat Studio Utama Seni Rupa`}
                            value={chapter.title}
                            onChange={(e) =>
                              handleUpdateChapter(chapter.id, "title", e.target.value)
                            }
                          />
                        </div>

                        {/* RICH TEXT CONTENT EDITOR */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                              Isi Narasi Bab (Rich Text Toolbar)
                            </label>
                            <span className="text-[11px] text-jp-gray-400">
                              Mendukung Tebal, Miring, Subjudul, Kutipan, Poin
                            </span>
                          </div>
                          <RichTextEditor
                            value={chapter.content}
                            onChange={(val) =>
                              handleUpdateChapter(chapter.id, "content", val)
                            }
                            placeholder="Tuliskan uraian materi bab secara mendalam di sini..."
                            rows={8}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddChapter}
                      className="w-full py-3 rounded-lg border-dashed"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Bab Berikutnya (Bab {chapters.length + 1})
                    </Button>
                  </div>
                </div>

                {/* 3. DAFTAR PUSTAKA & RUJUKAN */}
                <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
                  <div className="flex items-center justify-between border-b border-jp-gray-100 pb-4">
                    <div>
                      <Heading2 className="text-xl text-jp-ink">
                        3. Daftar Pustaka & Rujukan Akademik
                      </Heading2>
                      <p className="mt-1 text-xs text-jp-gray-500">
                        Sitasi literatur buku atau jurnal yang digunakan dalam penyusunan artikel.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddReference}
                      className="rounded-lg"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Tambah Sitasi
                    </Button>
                  </div>

                  {references.length > 0 ? (
                    <div className="space-y-3">
                      {references.map((ref, idx) => (
                        <div key={ref.id} className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-jp-gray-400 shrink-0 w-6 text-center">
                            [{idx + 1}]
                          </span>
                          <input
                            type="text"
                            value={ref.citation}
                            onChange={(e) => handleUpdateReference(ref.id, e.target.value)}
                            placeholder="Contoh: Tabrani, Primadi. (2014). Bahasa Rupa. Bandung: Kelir."
                            className="flex-1 rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs text-jp-ink focus:border-jp-blue-700 outline-none font-prose"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteReference(ref.id, idx + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-jp-gray-200 p-6 text-center text-xs text-jp-gray-400">
                      Belum ada sitasi rujukan. Klik &ldquo;Tambah Sitasi&rdquo; jika mengutip buku atau jurnal.
                    </div>
                  )}

                  {/* EDITORIAL PEER-REVIEW NOTICE */}
                  <div className="rounded-lg border border-jp-blue-100 bg-jp-blue-50/70 p-4 text-xs text-jp-blue-900 leading-relaxed font-sans">
                    <strong>Catatan Alur Editorial:</strong> Setelah naskah dikirimkan, tim Kurator Redaksi Jejak Perupa akan meninjau kelayakan konten dan menyematkan catatan resmi maskot <em>Peru-Chan</em> sebelum diterbitkan ke publik.
                  </div>
                </div>

                {/* FORM ACTIONS */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-jp-gray-200">
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <ArrowLeft className="h-4 w-4 mr-1.5" />
                      Kembali ke Dashboard
                    </Button>
                  </Link>

                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      size="md"
                      onClick={() => setActiveTab("preview")}
                      className="rounded-lg"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Lihat Pratinjau
                    </Button>
                    <Button type="submit" variant="primary" size="md" className="rounded-lg">
                      <Send className="h-4 w-4 mr-2" />
                      Kirim Draf ke Meja Kurator
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* PREVIEW TAB (1:1 ARTICLE READER LAYOUT) */}
            {activeTab === "preview" && (
              <div className="space-y-12">
                {/* PREVIEW CONTROLS BAR */}
                <div className="flex items-center justify-between rounded-xl border border-jp-blue-200 bg-jp-blue-50/70 p-4 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jp-blue-900">
                    <Eye className="h-4 w-4 text-jp-blue-700" />
                    Mode Pratinjau Publik (Tampilan Pembaca)
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActiveTab("write")}
                    className="rounded-lg"
                  >
                    <Edit3 className="h-4 w-4 mr-1.5" />
                    Kembali ke Editor Tulis
                  </Button>
                </div>

                {/* ARTICLE HEADER PREVIEW */}
                <div className="border-b border-jp-gray-200 pb-10 space-y-5 max-w-4xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="blue">{category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-jp-gray-500 font-sans">
                      <Clock className="h-3.5 w-3.5 text-jp-blue-700" />
                      {readTime}
                    </span>
                  </div>

                  <Heading1 className="text-3xl sm:text-4xl lg:text-5xl text-jp-ink leading-[1.2]">
                    {title || "(Judul Belum Diisi)"}
                  </Heading1>

                  <div className="text-xs text-jp-gray-500 font-medium">
                    Ditulis oleh <strong className="text-jp-ink">{authorName || "Penulis Kontributor"}</strong> • Versi Pratinjau
                  </div>

                  <Paragraph className="text-lg text-jp-gray-700 leading-relaxed font-prose bg-jp-paper/60 p-5 rounded-xl border border-jp-gray-200/80">
                    {excerpt || "(Ringkasan pembuka artikel belum diisi)"}
                  </Paragraph>
                </div>

                {/* 2-COLUMN ARTICLE BODY WITH TABLE OF CONTENTS */}
                <div className="grid gap-12 lg:grid-cols-[1fr_300px] items-start">
                  {/* MAIN COLUMN WITH CHAPTERS */}
                  <div className="space-y-12 max-w-[720px]">
                    {chapters.map((chapter, idx) => (
                      <article key={chapter.id} id={`bab-${idx + 1}`} className="space-y-5 scroll-mt-28">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-jp-blue-700">
                          <BookOpen className="h-4 w-4" />
                          Bab {idx + 1}
                        </div>

                        <Heading2 className="text-2xl sm:text-3xl text-jp-ink leading-tight">
                          {chapter.title || `Bab ${idx + 1}: (Judul Bab Belum Diisi)`}
                        </Heading2>

                        <div className="font-prose text-base leading-[1.8] text-jp-gray-800 whitespace-pre-line space-y-4">
                          {chapter.content || "(Belum ada isi materi di bab ini. Tulis narasi pada editor.)"}
                        </div>
                      </article>
                    ))}

                    {/* BIBLIOGRAPHY / DAFTAR PUSTAKA PREVIEW */}
                    {references.length > 0 && (
                      <div className="pt-10 border-t border-jp-gray-200 space-y-4">
                        <Heading3 className="text-xl text-jp-ink">Daftar Pustaka & Rujukan</Heading3>
                        <ul className="space-y-2 font-prose text-xs text-jp-gray-700">
                          {references.map((ref, idx) => (
                            <li key={ref.id} className="flex gap-2">
                              <span className="font-mono text-jp-gray-400 font-bold">[{idx + 1}]</span>
                              <span>{ref.citation || "(Sitasi kosong)"}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* RIGHT STICKY TABLE OF CONTENTS */}
                  <aside className="sticky top-28 hidden lg:block rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-jp-blue-700 border-b border-jp-gray-100 pb-3">
                      Daftar Isi Otomatis
                    </div>
                    <nav className="space-y-2">
                      {chapters.map((ch, idx) => (
                        <a
                          key={ch.id}
                          href={`#bab-${idx + 1}`}
                          className="block text-xs font-medium text-jp-gray-600 hover:text-jp-blue-900 transition truncate"
                        >
                          <span className="font-mono font-bold text-jp-blue-700 mr-1.5">
                            Bab {idx + 1}:
                          </span>
                          {ch.title || `Bab ${idx + 1}`}
                        </a>
                      ))}
                    </nav>
                  </aside>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* SUBMITTED SUCCESS SCREEN */
          <div className="rounded-xl border-2 border-jp-lime bg-white p-10 shadow-2xs text-center space-y-6 max-w-2xl mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-jp-lime text-jp-ink shadow-2xs">
              <CheckCircle className="h-7 w-7" />
            </div>

            <div>
              <Heading2 className="text-2xl sm:text-3xl text-jp-ink">Draf Artikel Berhasil Terkirim!</Heading2>
              <Paragraph className="mt-3 text-sm md:text-base text-jp-gray-700 max-w-lg mx-auto font-prose">
                Terima kasih, <strong>{authorName}</strong>. Naskah artikel berjudul <em>&ldquo;{title}&rdquo;</em> yang terdiri dari <strong>{chapters.length} Bab Pembahasan</strong> telah berhasil diserahkan ke antrean kurasi editorial Jejak Perupa. Tim redaksi akan meninjau dan menyematkan catatan resmi maskot <em>Peru-Chan</em> sebelum diterbitkan.
              </Paragraph>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4 font-sans">
              <Link href="/dashboard">
                <Button variant="primary" className="rounded-lg">
                  Kembali ke Ruang Belajar
                </Button>
              </Link>
              <Button
                variant="outline"
                className="rounded-lg"
                onClick={() => {
                  setSubmitted(false);
                  handleResetForm();
                  setActiveTab("write");
                }}
              >
                Tulis Naskah Baru
              </Button>
            </div>
          </div>
        )}
      </section>
    </MainPublicLayout>
  );
}
