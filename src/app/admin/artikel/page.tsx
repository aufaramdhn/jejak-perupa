"use client";

import React, { useState, useMemo, useTransition, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Heading2, Paragraph } from "@/components/atoms/typography/Typography";
import { Input } from "@/components/atoms/form/Input";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { QuickAddCategoryModal } from "@/components/molecules/modals/QuickAddCategoryModal";
import { AdminTableSkeleton } from "@/components/organisms/admin/AdminTableSkeleton";
import { artService } from "@/lib/services/artService";
import { useCategories } from "@/lib/categoryContext";
import { useModal } from "@/lib/modalContext";
import {
  FileText,
  Search,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  FolderPlus,
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
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (catId: string) => {
    startTransition(() => {
      setSelectedCategory(catId);
    });
  };

  const handleSearchChange = (query: string) => {
    startTransition(() => {
      setSearchQuery(query);
    });
  };

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
    <AdminLayout>
      <div className="space-y-8 font-sans">
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-jp-gray-200 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-blue-900 text-white">
                <FileText className="h-3.5 w-3.5" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-jp-blue-700">
                Manajemen Konten
              </span>
            </div>
            <Heading2 className="mt-1 text-2xl sm:text-3xl text-jp-ink">
              Daftar Naskah Artikel
            </Heading2>
            <Paragraph className="mt-1 text-sm text-jp-gray-500 font-sans">
              Kelola, sunting, arsipkan, dan publikasikan naskah kurasi seni rupa.
            </Paragraph>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsQuickAddOpen(true)}
              className="rounded-lg"
            >
              <FolderPlus className="h-4 w-4 mr-1.5 text-jp-blue-700" />
              Tambah Kategori Cepat
            </Button>

            <Link href="/admin/artikel/tulis">
              <Button variant="primary" size="sm" className="rounded-lg shadow-xs">
                <Plus className="h-4 w-4 mr-1.5" />
                Tulis Naskah Baru
              </Button>
            </Link>
          </div>
        </div>

        {/* STATS SUMMARY PILLS */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
            <div className="text-xs text-jp-gray-500 font-medium">Total Naskah</div>
            <div className="mt-1 font-heading text-2xl font-bold text-jp-ink">
              {articlesList.length}
            </div>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
            <div className="text-xs text-jp-gray-500 font-medium">Kategori Aktif</div>
            <div className="mt-1 font-heading text-2xl font-bold text-jp-blue-900">
              {approvedCategories.length}
            </div>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
            <div className="text-xs text-jp-gray-500 font-medium">Status Publikasi</div>
            <div className="mt-1 font-heading text-2xl font-bold text-green-700">
              100%
            </div>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
            <div className="text-xs text-jp-gray-500 font-medium">Terfilter Saat Ini</div>
            <div className="mt-1 font-heading text-2xl font-bold text-jp-brown-900">
              {filteredArticles.length}
            </div>
          </div>
        </div>

        {/* SEARCH & CATEGORY FILTER TOOLBAR */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jp-gray-400" />
            <Input
              type="text"
              placeholder="Cari judul artikel, topik, atau kategori..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 text-xs rounded-lg w-full"
            />
          </div>

          {/* DYNAMIC CATEGORY FILTER PILLS */}
          <div className="flex flex-wrap items-center gap-1.5">
            {dynamicCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
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

        {/* GRANULAR IN-SITU TABLE SKELETON */}
        {(isLoading || isPending) ? (
          <AdminTableSkeleton rows={5} columns={6} />
        ) : (
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
                              title="Lihat Pratinjau Publik"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleArchiveArticle(art.slug, art.title)}
                              title="Arsipkan Naskah"
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
                      <td colSpan={6} className="py-12 text-center text-jp-gray-500">
                        Tidak ada naskah yang cocok dengan kriteria pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL QUICK ADD CATEGORY */}
        <QuickAddCategoryModal
          isOpen={isQuickAddOpen}
          onClose={() => setIsQuickAddOpen(false)}
          onSuccess={(createdName) => {
            setSelectedCategory(createdName);
          }}
        />
      </div>
    </AdminLayout>
  );
}
