"use client";

import React, { useState, useMemo, useTransition } from "react";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { TablePagination } from "@/components/molecules/navigation/TablePagination";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { CurationCardSkeleton } from "@/components/organisms/admin/CurationCardSkeleton";
import { useCategories } from "@/lib/categoryContext";
import { useModal } from "@/lib/modalContext";
import {
  Eye,
  CheckCircle,
  Clock,
  Sparkles,
  X,
  Send,
  AlertCircle,
  BookOpen,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmissionItem {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  status: "Menunggu Kurasi" | "Disetujui" | "Perlu Revisi";
  excerpt: string;
  chapters: { title: string; content: string }[];
  references: string[];
  peruChanTip?: string;
  peruChanTheme?: "blue" | "brown" | "lime";
}

export default function AdminKurasiPage() {
  const { confirm, alert } = useModal();

  const [submissions, setSubmissions] = useState<SubmissionItem[]>([
    {
      id: "sub-1",
      title: "Membaca Garis dan Ekspresi dalam Sketsa Revolusi",
      author: "Dian Sastro (Mahasiswa Seni Rupa)",
      category: "Sejarah Seni",
      date: "24 Agustus 2026",
      status: "Menunggu Kurasi",
      excerpt:
        "Telaah kritis mengenai sketsa-sketsa spontan era 1945-1949 karya pelukis pejuang yang menggunakan kertas koran dan jelaga arang.",
      chapters: [
        {
          title: "Sketsa sebagai Catatan Jurnalistik Perjuangan",
          content:
            "Di tengah keterbatasan kanvas dan cat minyak impor pada era revolusi fisik, para pelukis Persagi dan Seniman Indonesia Muda (SIM) turun langsung ke garis depan. Mereka menangkap raut wajah prajurit, pengungsi, dan suasana stasiun kereta api dengan tarikan garis arang yang cepat namun sarat muatan emosional.",
        },
        {
          title: "Karakter Garis Spontan dan Tekstur Kertas Jelaga",
          content:
            "Kekuatan utama sketsa revolusi terletak pada kejujuran bentuk. Tidak ada waktu untuk menghaluskan gradasi warna. Setiap goresan garis tunggal harus mampu mendefinisikan anatomi gerak tubuh dan ketegangan ruang secara instan.",
        },
      ],
      references: [
        "Kusnadi. (1980). *Sejarah Seni Rupa Revolusi Indonesia*. Jakarta: Balai Pustaka.",
        "Sudjojono, S. (1946). *Seni Loekis, Kesenian, dan Seniman*. Jogjakarta: Indonesia Kesenian.",
      ],
      peruChanTip:
        "Sketsa cepat adalah latihan terbaik untuk melatih kepekaan tangan dan intuisi mata sebelum melukis di kanvas besar!",
      peruChanTheme: "brown",
    },
    {
      id: "sub-2",
      title: "Eksplorasi Pigmen Alami Tanah Liat di Studio Keramik",
      author: "Budi Santoso (Pengkaji Kriya)",
      category: "Teknik Seni",
      date: "22 Agustus 2026",
      status: "Menunggu Kurasi",
      excerpt:
        "Metodologi pengolahan tanah liat lokal sebagai glasir dan pewarna organik bersuhu tinggi.",
      chapters: [
        {
          title: "Pengambilan Sampel Mineral Tanah Liat",
          content:
            "Eksplorasi material alami memerlukan pemahaman geologis sederhana mengenai kandungan oksida besi pada tanah liat merah daerah Kasongan.",
        },
      ],
      references: [
        "Gustami, SP. (2000). *Kriya Nusantara: Keramik Tradisi dan Modern*. Yogyakarta: Kanisius.",
      ],
      peruChanTip:
        "Eksperimen pembakaran glasir membutuhkan kesabaran. Catat setiap formula campuran dalam buku jurnal studiomu!",
      peruChanTheme: "lime",
    },
  ]);

  const [selectedSub, setSelectedSub] = useState<SubmissionItem | null>(null);
  const [tipDraft, setTipDraft] = useState("");
  const [themeDraft, setThemeDraft] = useState<"blue" | "brown" | "lime">("blue");

  const { categories, updateCategory, addCategory } = useCategories();

  const handleOpenReview = (sub: SubmissionItem) => {
    setSelectedSub(sub);
    setTipDraft(sub.peruChanTip || "");
    setThemeDraft(sub.peruChanTheme || "blue");
  };

  const handleApprove = async () => {
    if (!selectedSub) return;
    const confirmed = await confirm({
      title: "Terbitkan Naskah Ini?",
      message: `Naskah "${selectedSub.title}" beserta catatan resmi Peru-Chan akan segera dipublikasikan ke katalog artikel publik.`,
      confirmLabel: "Ya, Terbitkan",
      cancelLabel: "Batal",
      variant: "primary",
      iconType: "help",
    });

    if (confirmed) {
      // Approve proposed category if applicable
      const matchedCat = categories.find(
        (c) => c.name.toLowerCase() === selectedSub.category.toLowerCase()
      );
      if (matchedCat && matchedCat.isApproved === false) {
        updateCategory(matchedCat.id, { isApproved: true });
      } else if (!matchedCat) {
        addCategory({ name: selectedSub.category, isApproved: true });
      }

      setSubmissions(
        submissions.map((s) =>
          s.id === selectedSub.id
            ? {
                ...s,
                status: "Disetujui",
                peruChanTip: tipDraft,
                peruChanTheme: themeDraft,
              }
            : s
        )
      );
      setSelectedSub(null);
      await alert({
        title: "Naskah Berhasil Diterbitkan",
        message: `Artikel "${selectedSub.title}" kini telah tayang di katalog publik Jejak Perupa.`,
        type: "success",
      });
    }
  };

  const handleRequestRevision = async () => {
    if (!selectedSub) return;
    const confirmed = await confirm({
      title: "Minta Revisi Penulis?",
      message: `Status naskah "${selectedSub.title}" akan diubah menjadi "Perlu Revisi" agar penulis dapat menyempurnakan naskahnya.`,
      confirmLabel: "Minta Revisi",
      cancelLabel: "Batal",
      variant: "warning",
      iconType: "alert",
    });

    if (confirmed) {
      setSubmissions(
        submissions.map((s) =>
          s.id === selectedSub.id ? { ...s, status: "Perlu Revisi" } : s
        )
      );
      setSelectedSub(null);
      await alert({
        title: "Permintaan Revisi Terkirim",
        message: "Status naskah telah diperbarui menjadi 'Perlu Revisi'.",
        type: "info",
      });
    }
  };

  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = (status: string) => {
    startTransition(() => {
      setStatusFilter(status);
      setCurrentPage(1);
    });
  };

  const filteredSubmissions = useMemo(() => {
    if (statusFilter === "Semua") return submissions;
    return submissions.filter((sub) => sub.status === statusFilter);
  }, [submissions, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredSubmissions.length / pageSize));

  const paginatedSubmissions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSubmissions.slice(start, start + pageSize);
  }, [filteredSubmissions, currentPage, pageSize]);

  return (
    <AdminLayout
      title="Meja Kurasi Editorial Naskah"
      subtitle="Evaluasi naskah kiriman kontributor, telaah rujukan akademik, dan sematkan catatan kuratorial resmi Peru-Chan."
    >
      <div className="space-y-6 font-sans">
        {/* STATUS FILTER TABS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-jp-gray-200 pb-4">
          {["Semua", "Menunggu Kurasi", "Disetujui", "Perlu Revisi"].map((status) => {
            const count =
              status === "Semua"
                ? submissions.length
                : submissions.filter((s) => s.status === status).length;
            const isSelected = statusFilter === status;

            return (
              <button
                key={status}
                type="button"
                onClick={() => handleStatusChange(status)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition cursor-pointer",
                  isSelected
                    ? "bg-jp-blue-900 text-white shadow-2xs"
                    : "bg-white text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900 border border-jp-gray-300"
                )}
              >
                <span>{status}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px] font-mono",
                    isSelected ? "bg-white/20 text-white" : "bg-jp-gray-100 text-jp-gray-600"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* SUBMISSIONS LIST WITH IN-SITU SKELETON */}
        {(isLoading || isPending) ? (
          <CurationCardSkeleton count={3} />
        ) : filteredSubmissions.length > 0 ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:gap-6">
              {paginatedSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-xl border border-jp-gray-300 bg-white p-4 sm:p-6 shadow-2xs space-y-4 hover:border-jp-blue-300 transition"
                >
                  {/* CARD HEADER WITH INTEGRATED METADATA & ACTION */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-jp-gray-200/80 pb-4">
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-jp-ink font-heading">
                          {sub.title}
                        </h3>
                        <Badge
                          variant={
                            sub.status === "Disetujui"
                              ? "lime"
                              : sub.status === "Perlu Revisi"
                              ? "brown"
                              : "blue"
                          }
                          size="sm"
                        >
                          {sub.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-jp-gray-600 font-mono">
                        <div>
                          <span className="text-jp-gray-400">Penulis:</span>{" "}
                          <span className="font-bold text-jp-ink">{sub.author}</span>
                        </div>
                        <span className="text-jp-gray-300 hidden sm:inline">·</span>
                        <div>
                          <span className="text-jp-gray-400">Kategori:</span>{" "}
                          <span className="font-bold text-jp-blue-900">{sub.category}</span>
                        </div>
                        <span className="text-jp-gray-300 hidden sm:inline">·</span>
                        <div>
                          <span className="text-jp-gray-400">Diterima:</span>{" "}
                          <span className="font-bold text-jp-gray-700">{sub.date}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleOpenReview(sub)}
                      className="rounded-lg w-full md:w-auto shrink-0 py-2.5 px-4 h-10 font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
                    >
                      <Eye className="h-4 w-4 mr-1.5" />
                      Buka Lembar Kurasi
                    </Button>
                  </div>

                  <p className="text-xs sm:text-sm text-jp-gray-700 font-prose leading-relaxed border-l-2 border-jp-blue-700 pl-3.5">
                    {sub.excerpt}
                  </p>

                  {sub.peruChanTip && (
                    <div className="rounded-lg border border-jp-blue-100 bg-jp-blue-50/50 p-3 text-xs text-jp-blue-900 font-prose italic">
                      <strong>Catatan Peru-Chan Tersemat:</strong> &ldquo;{sub.peruChanTip}&rdquo;
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* UNIFIED RESPONSIVE PAGINATION */}
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredSubmissions.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
              itemName="naskah"
            />
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-12 text-center text-jp-gray-500">
            Tidak ada naskah dengan status &ldquo;{statusFilter}&rdquo;.
          </div>
        )}

        {/* CURATION MODAL DRAWER */}
        {selectedSub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs font-sans animate-in fade-in duration-150">
            <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xl">
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between border-b border-jp-gray-200 bg-jp-paper px-6 py-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
                    Meja Penelaahan Naskah
                  </div>
                  <h3 className="font-heading text-lg font-bold text-jp-ink truncate max-w-xl">
                    {selectedSub.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSub(null)}
                  className="rounded-lg text-jp-gray-400 hover:text-jp-ink p-1 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* MODAL BODY (SCROLLABLE) */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {/* CHAPTERS REVIEW */}
                <div className="space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-jp-gray-600 font-mono">
                    Struktur Bab Naskah ({selectedSub.chapters.length} Bab)
                  </div>

                  {selectedSub.chapters.map((ch, idx) => (
                    <div
                      key={ch.title}
                      className="rounded-xl border border-jp-gray-200 bg-jp-paper/30 p-5 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 px-2 items-center justify-center rounded-md bg-jp-blue-900 font-mono text-[11px] font-bold text-white">
                          Bab {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-jp-ink">
                          {ch.title}
                        </span>
                      </div>
                      <p className="text-xs text-jp-gray-700 font-prose leading-relaxed whitespace-pre-line">
                        {ch.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CITATIONS REVIEW */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-jp-gray-600 font-mono">
                    Daftar Pustaka & Rujukan
                  </div>
                  <div className="rounded-lg border border-jp-gray-200 bg-jp-paper/30 p-4 space-y-1 text-xs font-prose text-jp-gray-700">
                    {selectedSub.references.map((ref, idx) => (
                      <div key={ref}>
                        [{idx + 1}] {ref}
                      </div>
                    ))}
                  </div>
                </div>

                {/* EDITORIAL PERU-CHAN EMBEDDING BOX */}
                <div className="rounded-xl border border-jp-blue-300 bg-jp-blue-50/60 p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-jp-blue-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-900">
                      Penyematan Catatan Kuratorial Peru-Chan
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-jp-ink">
                      Teks Tips / Refleksi Maskot untuk Akhir Naskah:
                    </label>
                    <textarea
                      rows={3}
                      value={tipDraft}
                      onChange={(e) => setTipDraft(e.target.value)}
                      placeholder="Tuliskan catatan kuratorial yang membangun dan inspiratif..."
                      className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-jp-ink">
                      Pilih Aksen Warna Boks Catatan:
                    </label>
                    <div className="flex gap-2">
                      {(["blue", "brown", "lime"] as const).map((accent) => (
                        <button
                          key={accent}
                          type="button"
                          onClick={() => setThemeDraft(accent)}
                          className={cn(
                            "flex-1 rounded-lg py-1.5 text-xs font-bold border transition cursor-pointer uppercase font-mono",
                            themeDraft === accent
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
              </div>

              {/* MODAL ACTIONS */}
              <div className="flex items-center justify-between border-t border-jp-gray-200 bg-jp-paper px-6 py-4 font-sans">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRequestRevision}
                  className="rounded-lg"
                >
                  Minta Revisi Penulis
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedSub(null)}
                    className="rounded-lg"
                  >
                    Batal
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleApprove}
                    className="rounded-lg"
                  >
                    <CheckCircle className="h-4 w-4 mr-1.5" />
                    Setujui & Terbitkan Naskah
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
