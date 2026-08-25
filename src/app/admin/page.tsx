"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminDashboardTemplate } from "@/components/templates/AdminDashboardTemplate";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/Typography";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { PeruChanCallout } from "@/components/molecules/PeruChanCallout";
import { artService } from "@/lib/services/artService";
import {
  FileText,
  Users,
  BookOpen,
  Clock,
  Plus,
  CheckCircle,
  Eye,
  Sparkles,
  X,
  Send,
  AlertCircle,
} from "lucide-react";
import { useModal } from "@/lib/modalContext";
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

export default function AdminDashboardPage() {
  const { confirm, toast } = useModal();
  const articles = artService.getAllArticles();
  const artists = artService.getAllArtists();
  const terms = artService.getAllGlossaryTerms();
  const events = artService.getAllEvents();

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
      status: "Disetujui",
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

  // Active reviewing submission modal state
  const [selectedSub, setSelectedSub] = useState<SubmissionItem | null>(null);
  const [tipDraft, setTipDraft] = useState("");
  const [themeDraft, setThemeDraft] = useState<"blue" | "brown" | "lime">("blue");

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
      toast({
        type: "success",
        title: "Naskah Berhasil Diterbitkan",
        message: `Artikel "${selectedSub.title}" kini telah aktif dan tayang di publik.`,
      });
    }
  };

  const handleRequestRevision = async () => {
    if (!selectedSub) return;
    const confirmed = await confirm({
      title: "Minta Revisi Kontributor?",
      message: `Status naskah "${selectedSub.title}" akan diubah menjadi "Perlu Revisi" agar kontributor dapat memperbaiki naskahnya.`,
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
      toast({
        type: "info",
        title: "Permintaan Revisi Terkirim",
        message: "Status artikel telah diperbarui ke 'Perlu Revisi'.",
      });
    }
  };

  return (
    <AdminDashboardTemplate activeTab="overview">
      <div className="space-y-10 font-sans">
        {/* STATS OVERVIEW CARDS (ROUNDED-XL) */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500">
                Artikel Edukasi
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-100 text-jp-blue-900">
                <FileText className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 font-heading text-3xl font-extrabold text-jp-ink">
              {articles.length}
            </div>
            <span className="text-xs text-green-700 font-medium">100% Terpublikasi</span>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500">
                Data Seniman
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-brown-100 text-jp-brown-900">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 font-heading text-3xl font-extrabold text-jp-ink">
              {artists.length}
            </div>
            <span className="text-xs text-jp-gray-500">Maestro Terarsip</span>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500">
                Istilah Kamus
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-lime-muted text-jp-ink">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 font-heading text-3xl font-extrabold text-jp-ink">
              {terms.length}
            </div>
            <span className="text-xs text-jp-blue-700 font-medium">Indeks A-Z Lengkap</span>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-jp-gray-500">
                Agenda Pameran
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-paper text-jp-ink border">
                <Clock className="h-4 w-4 text-jp-blue-700" />
              </div>
            </div>
            <div className="mt-3 font-heading text-3xl font-extrabold text-jp-ink">
              {events.length}
            </div>
            <span className="text-xs text-jp-gray-500">Acara Aktif</span>
          </div>
        </div>

        {/* CONTRIBUTOR SUBMISSION QUEUE */}
        <div id="kurasi" className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Heading3 className="text-xl text-jp-ink">Antrean Kurasi Kontributor</Heading3>
              <p className="mt-1 text-xs text-jp-gray-500">
                Draf kiriman dari mahasiswa dan peneliti seni. Tinjau kelayakan isi naskah dan sematkan <strong>Catatan Resmi Peru-Chan</strong> sebelum menerbitkan.
              </p>
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-700 font-mono">
              {submissions.filter((s) => s.status === "Menunggu Kurasi").length} Naskah Perlu Tindakan
            </span>
          </div>

          <div className="space-y-3">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-lg border border-jp-gray-200 bg-jp-paper p-4.5 hover:border-jp-blue-200 transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-jp-ink text-base">
                      {sub.title}
                    </span>
                    <Badge variant={sub.status === "Disetujui" ? "lime" : sub.status === "Perlu Revisi" ? "brown" : "blue"}>
                      {sub.status}
                    </Badge>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-jp-gray-500">
                    <span>Penulis: <strong>{sub.author}</strong></span>
                    <span>•</span>
                    <span>Kategori: {sub.category}</span>
                    <span>•</span>
                    <span className="font-mono">{sub.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => handleOpenReview(sub)}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    Tinjau & Kurasi Naskah
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PUBLISHED ARTICLES TABLE */}
        <div id="artikel" className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Heading3 className="text-xl text-jp-ink">Daftar Artikel Terpublikasi</Heading3>
              <p className="mt-1 text-xs text-jp-gray-500">
                Katalog artikel yang telah tayang aktif di platform publik Jejak Perupa.
              </p>
            </div>
            <Link href="/dashboard/kontribusi">
              <Button variant="outline" size="sm" className="rounded-lg">
                <Plus className="h-4 w-4 mr-1.5" />
                Tulis Naskah Baru
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-jp-gray-200 text-xs font-bold uppercase tracking-wider text-jp-gray-500">
                  <th className="pb-3">Judul Artikel</th>
                  <th className="pb-3">Kategori</th>
                  <th className="pb-3">Waktu Baca</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jp-gray-100">
                {articles.map((art) => (
                  <tr key={art.slug} className="hover:bg-jp-paper/70 transition">
                    <td className="py-3.5 font-medium text-jp-ink max-w-[280px] truncate">
                      {art.title}
                    </td>
                    <td className="py-3.5">
                      <Badge variant={art.categoryVariant}>{art.category}</Badge>
                    </td>
                    <td className="py-3.5 text-xs text-jp-gray-500 font-mono">{art.readTime}</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        Terbit
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <Link href={`/artikel/${art.slug}`}>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Eye className="h-3 w-3 mr-1" />
                          Pratinjau
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CURATOR REVIEW & PERU-CHAN ENDORSEMENT MODAL */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-jp-gray-200 bg-jp-paper px-6 py-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
                  Panel Kurasi Redaksi Editorial
                </span>
                <Heading2 className="text-lg text-jp-ink mt-0.5">
                  Tinjauan Kelayakan Naskah Kontributor
                </Heading2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSub(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-jp-gray-500 hover:bg-white hover:text-jp-ink transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* MODAL SCROLLABLE BODY */}
            <div className="overflow-y-auto p-6 space-y-6">
              {/* SUBMISSION INFO */}
              <div className="rounded-lg border border-jp-gray-200 bg-jp-paper/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="blue">{selectedSub.category}</Badge>
                  <span className="text-xs text-jp-gray-500 font-mono">
                    Diajukan: {selectedSub.date}
                  </span>
                </div>
                <Heading3 className="text-xl text-jp-ink">{selectedSub.title}</Heading3>
                <p className="text-xs text-jp-gray-600">
                  Penulis: <strong>{selectedSub.author}</strong>
                </p>
                <p className="text-sm text-jp-gray-700 leading-relaxed font-prose pt-1">
                  {selectedSub.excerpt}
                </p>
              </div>

              {/* CHAPTERS PREVIEW */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Struktur Bab Naskah ({selectedSub.chapters.length} Bab)
                </div>
                <div className="space-y-3">
                  {selectedSub.chapters.map((ch, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-jp-gray-200 bg-white p-4 space-y-2"
                    >
                      <div className="font-mono text-xs font-bold text-jp-blue-700 uppercase">
                        Bab {idx + 1}: {ch.title}
                      </div>
                      <p className="text-xs leading-relaxed text-jp-gray-700 font-prose">
                        {ch.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* REFERENCES PREVIEW */}
              {selectedSub.references.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                    Daftar Pustaka Kontributor
                  </div>
                  <ul className="space-y-1 text-xs text-jp-gray-600 font-prose">
                    {selectedSub.references.map((ref, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="font-mono text-jp-gray-400">[{idx + 1}]</span>
                        <span>{ref}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* PERU-CHAN CURATION ENDORSEMENT SLOT */}
              <div className="rounded-xl border border-jp-blue-200 bg-gradient-to-r from-jp-blue-50/80 to-white p-5 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jp-blue-900">
                  <Sparkles className="h-4 w-4 text-jp-blue-700" />
                  Sematkan Catatan Editorial Resmi Peru-Chan (Suara Redaksi)
                </div>
                <p className="text-xs text-jp-gray-600">
                  Catatan ini akan tampil di dalam boks maskot Peru-Chan pada artikel resmi untuk mendampingi pembaca.
                </p>

                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={tipDraft}
                    onChange={(e) => setTipDraft(e.target.value)}
                    placeholder="Contoh: Sketsa cepat adalah latihan terbaik untuk melatih kepekaan tangan dan intuisi mata sebelum melukis di kanvas besar!"
                    className="w-full rounded-lg border border-jp-blue-200 bg-white p-3 text-xs text-jp-ink placeholder:text-jp-gray-400 focus:border-jp-blue-700 focus:ring-2 focus:ring-jp-blue-100 outline-none font-prose leading-relaxed"
                  />

                  {/* ACCENT THEME SELECTOR */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-jp-gray-500 uppercase tracking-wider">
                      Aksen Boks Peru-Chan:
                    </span>
                    <div className="flex items-center gap-1.5">
                      {(["blue", "brown", "lime"] as const).map((thm) => (
                        <button
                          key={thm}
                          type="button"
                          onClick={() => setThemeDraft(thm)}
                          className={cn(
                            "rounded-md px-2.5 py-1 text-[11px] font-bold capitalize transition cursor-pointer",
                            themeDraft === thm
                              ? "bg-jp-blue-900 text-white shadow-2xs"
                              : "bg-white border border-jp-gray-300 text-jp-gray-700 hover:bg-jp-paper"
                          )}
                        >
                          {thm === "blue" ? "Biru (Teori)" : thm === "brown" ? "Cokelat (Sejarah)" : "Lime (Studio)"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {tipDraft && (
                  <div className="pt-2">
                    <PeruChanCallout
                      title="Pratinjau Catatan Peru-Chan di Artikel"
                      theme={themeDraft}
                      iconType="sparkles"
                    >
                      <p>{tipDraft}</p>
                    </PeruChanCallout>
                  </div>
                )}
              </div>
            </div>

            {/* MODAL FOOTER ACTIONS */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-jp-gray-200 bg-jp-paper/60 px-6 py-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => setSelectedSub(null)}
              >
                Tutup
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg text-jp-brown-900 border-jp-brown-300 hover:bg-jp-brown-50"
                  onClick={handleRequestRevision}
                >
                  <AlertCircle className="h-3.5 w-3.5 mr-1" />
                  Minta Revisi Penulis
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-lg"
                  onClick={handleApprove}
                >
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Setujui & Terbitkan Naskah
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminDashboardTemplate>
  );
}
