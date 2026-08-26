"use client";

import React, { useState, useMemo, useTransition, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Heading2, Paragraph } from "@/components/atoms/typography/Typography";
import { Input } from "@/components/atoms/form/Input";
import { Select } from "@/components/atoms/form/Select";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { TablePagination } from "@/components/molecules/navigation/TablePagination";
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
  CheckCircle,
  FolderPlus,
  RotateCcw,
  Clock,
} from "lucide-react";

import { articlesData, type ArticleFullData } from "@/lib/data/articles";

export default function AdminArtikelPage() {
  const { confirm, alert } = useModal();
  const { approvedCategories } = useCategories();

  const [articlesList, setArticlesList] = useState<ArticleFullData[]>(articlesData);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("NEWEST");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setMounted(true);
    setArticlesList(artService.getAllArticles());
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (catId: string) => {
    startTransition(() => {
      setSelectedCategory(catId);
      setCurrentPage(1);
    });
  };

  const handleSortChange = (sortVal: string) => {
    startTransition(() => {
      setSortBy(sortVal);
      setCurrentPage(1);
    });
  };

  const handleSearchChange = (query: string) => {
    startTransition(() => {
      setSearchQuery(query);
      setCurrentPage(1);
    });
  };

  const handleResetFilters = () => {
    startTransition(() => {
      setSearchQuery("");
      setSelectedCategory("ALL");
      setSortBy("NEWEST");
      setCurrentPage(1);
    });
  };

  const isFiltered =
    searchQuery.trim() !== "" || selectedCategory !== "ALL" || sortBy !== "NEWEST";

  const categoryOptions = useMemo(() => {
    return [
      { value: "ALL", label: "Semua Kategori" },
      ...approvedCategories.map((c) => ({ value: c.name, label: c.name })),
    ];
  }, [approvedCategories]);

  const sortOptions = [
    { value: "NEWEST", label: "Naskah Terbaru (Default)" },
    { value: "TITLE_AZ", label: "Judul (A - Z)" },
    { value: "READ_TIME", label: "Durasi Singkat" },
  ];

  const filteredArticles = useMemo(() => {
    let result = articlesList.filter((art) => {
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

    if (sortBy === "TITLE_AZ") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "READ_TIME") {
      result = [...result].sort((a, b) => {
        const parseMinutes = (rt: string) => parseInt(rt) || 0;
        return parseMinutes(a.readTime) - parseMinutes(b.readTime);
      });
    }

    return result;
  }, [articlesList, searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, currentPage, pageSize]);

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
      artService.deleteArticle(slug);
      setArticlesList(artService.getAllArticles());
      await alert({
        title: "Artikel Diarsipkan",
        message: `Artikel "${title}" telah dipindahkan ke arsip.`,
        type: "success",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8 font-sans">
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
            <Heading2 className="mt-1 text-2xl sm:text-3xl text-jp-ink font-bold">
              Daftar Naskah Artikel
            </Heading2>
            <Paragraph className="mt-1 text-xs sm:text-sm text-jp-gray-500 font-sans">
              Kelola, sunting, arsipkan, dan publikasikan naskah kurasi seni rupa.
            </Paragraph>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsQuickAddOpen(true)}
              className="rounded-lg text-xs sm:text-sm font-bold w-full sm:w-auto py-2.5 px-4 h-10 cursor-pointer"
            >
              <FolderPlus className="h-4 w-4 mr-1.5 text-jp-blue-700" />
              Tambah Kategori Cepat
            </Button>

            <Link href="/admin/artikel/tulis" className="w-full sm:w-auto block">
              <Button
                variant="primary"
                size="md"
                className="rounded-lg shadow-xs text-xs sm:text-sm font-bold w-full sm:w-auto py-2.5 px-4 h-10 cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Tulis Naskah Baru
              </Button>
            </Link>
          </div>
        </div>

        {/* STATS SUMMARY PILLS */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-jp-gray-300 bg-white p-3.5 sm:p-4 shadow-2xs">
            <div className="text-[11px] sm:text-xs text-jp-gray-500 font-medium">Total Naskah</div>
            <div suppressHydrationWarning className="mt-1 font-heading text-xl sm:text-2xl font-bold text-jp-ink">
              {mounted ? articlesList.length : articlesData.length}
            </div>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-3.5 sm:p-4 shadow-2xs">
            <div className="text-[11px] sm:text-xs text-jp-gray-500 font-medium">Kategori Aktif</div>
            <div suppressHydrationWarning className="mt-1 font-heading text-xl sm:text-2xl font-bold text-jp-blue-900">
              {approvedCategories.length}
            </div>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-3.5 sm:p-4 shadow-2xs">
            <div className="text-[11px] sm:text-xs text-jp-gray-500 font-medium">Status Publikasi</div>
            <div className="mt-1 font-heading text-xl sm:text-2xl font-bold text-green-700">
              100%
            </div>
          </div>

          <div className="rounded-xl border border-jp-gray-300 bg-white p-3.5 sm:p-4 shadow-2xs">
            <div className="text-[11px] sm:text-xs text-jp-gray-500 font-medium">Terfilter Saat Ini</div>
            <div suppressHydrationWarning className="mt-1 font-heading text-xl sm:text-2xl font-bold text-jp-brown-900">
              {mounted ? filteredArticles.length : articlesData.length}
            </div>
          </div>
        </div>

        {/* SEARCH & CUSTOM SELECT FILTER TOOLBAR */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
          {/* SEARCH INPUT */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jp-gray-400" />
            <Input
              type="text"
              placeholder="Cari judul artikel, topik, atau kategori..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 text-xs rounded-lg w-full"
            />
          </div>

          {/* CUSTOM CATEGORY SELECT */}
          <div className="w-full md:w-56">
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder="Pilih Kategori"
              isSearchable={false}
              className="text-xs"
            />
          </div>

          {/* CUSTOM SORTING SELECT */}
          <div className="w-full md:w-56">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={handleSortChange}
              placeholder="Urutkan Naskah"
              isSearchable={false}
              className="text-xs"
            />
          </div>

          {/* DYNAMIC RESET BUTTON */}
          {isFiltered && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="rounded-lg text-xs font-bold text-red-600 border-red-200 hover:bg-red-50 shrink-0 h-9"
              title="Reset Semua Filter"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset Filter
            </Button>
          )}
        </div>

        {/* LOADING SKELETON */}
        {(isLoading || isPending) ? (
          <AdminTableSkeleton rows={5} columns={6} />
        ) : filteredArticles.length === 0 ? (
          <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-12 text-center text-jp-gray-500">
            <p className="font-semibold text-sm">Tidak ada naskah yang cocok dengan kriteria pencarian.</p>
            {isFiltered && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="mt-3 rounded-lg text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                Reset Semua Filter
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* MOBILE & TABLET CARD VIEW (<= 768px) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {paginatedArticles.map((art, idx) => {
                const globalIdx = (currentPage - 1) * pageSize + idx;
                return (
                  <div
                    key={art.id}
                    className="flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs hover:border-jp-blue-700 transition"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-jp-gray-400 bg-jp-paper px-2 py-0.5 rounded border border-jp-gray-200">
                          #{globalIdx + 1}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          <Badge variant="blue" size="sm">
                            {art.category}
                          </Badge>
                          <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 border border-green-200 font-mono">
                            <CheckCircle className="h-2.5 w-2.5" />
                            Tayang
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-jp-ink text-sm leading-snug font-heading">
                          {art.title}
                        </h3>
                        <p className="mt-1 text-xs text-jp-gray-600 font-prose line-clamp-2 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-jp-gray-500 font-mono">
                        <Clock className="h-3.5 w-3.5 text-jp-gray-400" />
                        <span>{art.readTime}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-jp-gray-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-jp-gray-400 font-medium">Aksi Redaksi</span>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/admin/artikel/edit/${art.slug}`}
                          title="Edit Artikel Resmi"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Link>

                        <Link
                          href={`/artikel/${art.slug}`}
                          target="_blank"
                          title="Lihat Pratinjau Publik"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition cursor-pointer"
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
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP FULL TABLE VIEW (> 768px) */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xs">
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
                    {paginatedArticles.map((art, idx) => {
                      const globalIdx = (currentPage - 1) * pageSize + idx;
                      return (
                        <tr
                          key={art.id}
                          className="hover:bg-jp-blue-50/30 transition-colors"
                        >
                          <td className="py-4 px-4 font-mono text-center font-bold text-jp-gray-400">
                            {globalIdx + 1}
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-bold text-jp-ink text-sm font-heading">
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
                            <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-700 border border-green-200 font-mono">
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
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* UNIFIED RESPONSIVE PAGINATION */}
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredArticles.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
              itemName="artikel"
            />
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
