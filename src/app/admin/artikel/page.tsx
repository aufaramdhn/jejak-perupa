"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/Typography";
import { Input } from "@/components/atoms/Input";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { QuickAddCategoryModal } from "@/components/molecules/QuickAddCategoryModal";
import { artService } from "@/lib/services/artService";
import { useCategories } from "@/lib/categoryContext";
import { useModal } from "@/lib/modalContext";
import {
  FileText,
  Search,
  Filter,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  Layers,
  FolderPlus,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminArtikelPage() {
  const { confirm, alert } = useModal();
  const { approvedCategories } = useCategories();
  const initialArticles = artService.getAllArticles();

  const [articlesList, setArticlesList] = useState(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const dynamicCategories = useMemo(() => {
    return [
      { id: "ALL", name: "Semua Kategori" },
      ...approvedCategories.map((c) => ({ id: c.name, name: c.name })),
    ];
  }, [approvedCategories]);

  const filteredArticles = useMemo(() => {
    return articlesList.filter((art) => {
      const matchSearch =
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat =
        selectedCategory === "ALL" ||
        art.category.toLowerCase() === selectedCategory.toLowerCase() ||
        art.categoryId.toLowerCase() === selectedCategory.toLowerCase();
      return matchSearch && matchCat;
    });
  }, [articlesList, searchQuery, selectedCategory]);

  const handleArchiveArticle = async (slug: string, title: string) => {
    const confirmed = await confirm({
      title: "Arsipkan Artikel Ini?",
      message: `Artikel "${title}" akan diubah statusnya menjadi arsip dan tidak ditampilkan di katalog publik.`,
      confirmLabel: "Ya, Arsipkan",
      cancelLabel: "Batal",
      variant: "warning",
      iconType: "alert",
    });

    if (confirmed) {
      setArticlesList((prev) => prev.filter((a) => a.slug !== slug));
      await alert({
        title: "Artikel Diarsipkan",
        message: `Artikel "${title}" telah dipindahkan ke arsip.`,
        type: "success",
      });
    }
  };

  return (
    <AdminLayout
      title="Manajemen Katalog Artikel"
      subtitle="Kelola seluruh artikel edukasi, status kurasi, dan publikasi materi seni rupa."
      actionButton={
        <Link href="/admin/artikel/tulis">
          <Button variant="primary" size="sm" className="rounded-lg">
            <Plus className="h-4 w-4 mr-1.5" />
            Tulis Artikel Baru
          </Button>
        </Link>
      }
    >
      <div className="space-y-6 font-sans">
        {/* TOP CATEGORY CONTROL BAR (DI ATAS FILTER CARD) */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-4 md:p-5 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-jp-blue-100 text-jp-blue-900 border border-jp-blue-200">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                Taksonomi Bidang Kajian
              </div>
              <p className="text-[11px] text-jp-gray-500 font-mono">
                {approvedCategories.length} Kategori Aktif Terdaftar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/admin/kategori">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg text-xs"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
                Kelola Kategori
              </Button>
            </Link>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsQuickAddOpen(true)}
              className="rounded-lg text-xs"
            >
              <FolderPlus className="h-3.5 w-3.5 mr-1.5" />
              Quick Add Kategori
            </Button>
          </div>
        </div>

        {/* SEARCH & DYNAMIC FILTER PILLS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
          {/* SEARCH INPUT */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jp-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul artikel, kata kunci, atau kategori..."
              className="w-full rounded-lg border border-jp-gray-300 bg-white pl-9 pr-4 py-2 text-xs text-jp-ink focus:border-jp-blue-700 outline-none"
            />
          </div>

          {/* DYNAMIC CATEGORY FILTER PILLS */}
          <div className="flex flex-wrap items-center gap-1.5">
            {dynamicCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-bold transition cursor-pointer",
                  selectedCategory.toLowerCase() === cat.id.toLowerCase()
                    ? "bg-jp-blue-900 text-white shadow-2xs"
                    : "bg-jp-paper border border-jp-gray-200 text-jp-gray-600 hover:text-jp-ink"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* ARTICLES DATA TABLE */}
        <div className="overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-jp-gray-300 bg-jp-paper/80 font-mono text-[11px] font-bold uppercase tracking-wider text-jp-gray-600">
                  <th className="py-3.5 px-4 w-12 text-center">No</th>
                  <th className="py-3.5 px-4">Judul Artikel & Ekserp</th>
                  <th className="py-3.5 px-4 w-36">Kategori</th>
                  <th className="py-3.5 px-4 w-32">Durasi Baca</th>
                  <th className="py-3.5 px-4 w-28 text-center">Status</th>
                  <th className="py-3.5 px-4 w-32 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-jp-gray-200 text-xs">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((art, idx) => (
                    <tr
                      key={art.id}
                      className="hover:bg-jp-blue-50/30 transition-colors"
                    >
                      <td className="py-4 px-4 font-mono text-center font-bold text-jp-gray-400">
                        {idx + 1}
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-bold text-jp-ink text-sm">
                          {art.title}
                        </div>
                        <p className="mt-0.5 text-xs text-jp-gray-500 font-prose line-clamp-1 max-w-xl">
                          {art.excerpt}
                        </p>
                      </td>

                      <td className="py-4 px-4">
                        <Badge variant="blue" size="sm">
                          {art.category}
                        </Badge>
                      </td>

                      <td className="py-4 px-4 font-mono text-jp-gray-600">
                        {art.readTime}
                      </td>

                      <td className="py-4 px-4 text-center">
                        <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-700 border border-green-200">
                          <CheckCircle className="h-3 w-3" />
                          Tayang
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/artikel/edit/${art.slug}`}
                            title="Edit Artikel Resmi"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Link>

                          <Link
                            href={`/artikel/${art.slug}`}
                            target="_blank"
                            title="Buka Halaman Publik"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              handleArchiveArticle(art.slug, art.title)
                            }
                            title="Arsipkan Artikel"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 transition cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-xs text-jp-gray-500"
                    >
                      Tidak ada artikel yang sesuai dengan kriteria pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER SUMMARY */}
          <div className="flex items-center justify-between border-t border-jp-gray-200 bg-jp-paper/40 px-4 py-3 text-xs text-jp-gray-500 font-mono">
            <span>
              Menampilkan {filteredArticles.length} dari {articlesList.length} artikel
            </span>
            <span>Platform Arsip Jejak Perupa</span>
          </div>
        </div>
      </div>

      {/* QUICK ADD CATEGORY MODAL */}
      <QuickAddCategoryModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onSuccess={(newCatName) => setSelectedCategory(newCatName)}
      />
    </AdminLayout>
  );
}
