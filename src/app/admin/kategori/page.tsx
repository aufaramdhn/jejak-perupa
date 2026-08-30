"use client";

import React, { useState, useMemo, useTransition, useEffect } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { Modal } from "@/components/atoms/feedback/Modal";
import { TablePagination } from "@/components/molecules/navigation/TablePagination";
import { QuickAddCategoryModal } from "@/components/molecules/modals/QuickAddCategoryModal";
import { AdminTableSkeleton } from "@/components/organisms/admin/AdminTableSkeleton";
import { useCategories, type CategoryItem } from "@/lib/categoryContext";
import { useModal } from "@/lib/modalContext";
import {
  FolderPlus,
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  Plus,
  ArrowLeft,
  Layers,
  Sparkles,
  X,
  FileText,
  RotateCcw,
} from "lucide-react";
import { ColorPicker } from "@/components/atoms/form/ColorPicker";
import { cn } from "@/lib/utils";

export default function AdminKategoriPage() {
  const { categories, addCategory, updateCategory, deleteCategory, resetToDefault } =
    useCategories();
  const { confirm, alert } = useModal();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Edit Modal State
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editColor, setEditColor] = useState("#182C4A");

  const handleSearchChange = (q: string) => {
    startTransition(() => {
      setSearchQuery(q);
      setCurrentPage(1);
    });
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      return (
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [categories, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / pageSize));

  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCategories.slice(start, start + pageSize);
  }, [filteredCategories, currentPage, pageSize]);

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setEditName(cat.name);
    setEditDescription(cat.description);
    setEditColor(cat.colorHex || "#182C4A");
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editName.trim()) return;

    updateCategory(editingCategory.id, {
      name: editName.trim(),
      description: editDescription.trim(),
      colorHex: editColor,
    });

    setEditingCategory(null);
    alert({
      title: "Kategori Berhasil Diperbarui",
      message: `Perubahan pada kategori "${editName}" telah tersimpan secara global.`,
      type: "success",
    });
  };

  const handleDelete = async (cat: CategoryItem) => {
    const confirmed = await confirm({
      title: `Hapus Kategori "${cat.name}"?`,
      message: `Kategori ini akan dihapus dari daftar taksonomi aktif. Artikel yang telah bernaung di bawah kategori ini tetap tersimpan.`,
      confirmLabel: "Ya, Hapus Kategori",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "alert",
    });

    if (confirmed) {
      deleteCategory(cat.id);
      await alert({
        title: "Kategori Dihapus",
        message: `Kategori "${cat.name}" telah berhasil dihapus.`,
        type: "info",
      });
    }
  };

  const handleReset = async () => {
    const confirmed = await confirm({
      title: "Kembalikan Kategori Default?",
      message:
        "Semua penyesuaian kategori buatan Anda akan direset kembali ke susunan bawaan sistem Jejak Perupa.",
      confirmLabel: "Reset ke Default",
      cancelLabel: "Batal",
      variant: "warning",
      iconType: "alert",
    });

    if (confirmed) {
      resetToDefault();
      await alert({
        title: "Kategori Direset",
        message: "Daftar kategori wacana telah dikembalikan ke pengaturan awal sistem.",
        type: "success",
      });
    }
  };

  return (
    <AdminLayout
      title="Manajemen Kategori Wacana"
      subtitle="Kelola taksonomi bidang kajian, warna aksen kuratorial, dan kelompok artikel edukasi."
      actionButton={
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <Link href="/admin/artikel" className="w-full sm:w-auto block">
            <Button
              type="button"
              variant="outline"
              size="md"
              className="rounded-lg text-xs sm:text-sm font-bold w-full sm:w-auto py-2.5 px-4 h-10 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Kembali ke Katalog
            </Button>
          </Link>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleReset}
            className="rounded-lg text-xs sm:text-sm font-bold w-full sm:w-auto py-2.5 px-4 h-10 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Reset
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-lg text-xs sm:text-sm font-bold w-full sm:w-auto py-2.5 px-4 h-10 shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Tambah Kategori
          </Button>
        </div>
      }
    >
      <div className="space-y-6 font-sans">
        {/* SEARCH & FILTER TOOLBAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jp-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari nama kategori atau deskripsi..."
              className="w-full rounded-lg border border-jp-gray-300 bg-white pl-9 pr-4 py-2 text-xs text-jp-ink focus:border-jp-blue-700 outline-none"
            />
          </div>

          <div className="font-mono text-xs text-jp-gray-500">
            Total {categories.length} Kategori Aktif
          </div>
        </div>

        {/* CATEGORIES DATA TABLE WITH IN-SITU SKELETON */}
        {(isLoading || isPending) ? (
          <AdminTableSkeleton rows={5} columns={7} />
        ) : filteredCategories.length === 0 ? (
          <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-12 text-center text-xs text-jp-gray-500">
            Tidak ada kategori yang sesuai dengan kriteria pencarian.
          </div>
        ) : (
          <div className="space-y-4">
            {/* MOBILE & TABLET CARD VIEW (<= 768px) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {paginatedCategories.map((cat, idx) => {
                const globalIdx = (currentPage - 1) * pageSize + idx;
                return (
                  <div
                    key={cat.id}
                    className="flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs hover:border-jp-blue-700 transition"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-jp-gray-400 bg-jp-paper px-2 py-0.5 rounded border border-jp-gray-200">
                          #{globalIdx + 1}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          <Badge
                            variant={cat.isCustom ? "brown" : "blue"}
                            size="sm"
                          >
                            {cat.isCustom ? "Kustom" : "Sistem"}
                          </Badge>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded-md border border-jp-gray-200 bg-jp-paper">
                            {cat.colorHex}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full shrink-0 shadow-2xs"
                            style={{ backgroundColor: cat.colorHex }}
                          />
                          <h3 className="font-bold text-jp-ink text-sm leading-snug font-heading">
                            {cat.name}
                          </h3>
                        </div>
                        <div className="mt-0.5 font-mono text-[11px] text-jp-gray-500">
                          /{cat.slug}
                        </div>
                        <p className="mt-2 text-xs text-jp-gray-600 font-prose line-clamp-2 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-jp-gray-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-jp-gray-400 font-medium">Aksi Kategori</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cat)}
                          title="Edit Kategori"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(cat)}
                          title="Hapus Kategori"
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
                      <th className="py-3.5 px-4 w-48">Nama Kategori</th>
                      <th className="py-3.5 px-4 w-40">Slug URL</th>
                      <th className="py-3.5 px-4">Deskripsi Ruang Lingkup</th>
                      <th className="py-3.5 px-4 w-32">Warna Aksen</th>
                      <th className="py-3.5 px-4 w-28 text-center">Tipe</th>
                      <th className="py-3.5 px-4 w-28 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-jp-gray-200 text-xs">
                    {paginatedCategories.map((cat, idx) => {
                      const globalIdx = (currentPage - 1) * pageSize + idx;
                      return (
                        <tr
                          key={cat.id}
                          className="hover:bg-jp-blue-50/30 transition-colors"
                        >
                          <td className="py-4 px-4 font-mono text-center font-bold text-jp-gray-400">
                            {globalIdx + 1}
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span
                                className="h-3 w-3 rounded-full shrink-0 shadow-2xs"
                                style={{ backgroundColor: cat.colorHex }}
                              />
                              <span className="font-bold text-jp-ink text-sm font-heading">
                                {cat.name}
                              </span>
                            </div>
                          </td>

                          <td className="py-4 px-4 font-mono text-xs text-jp-gray-500">
                            /{cat.slug}
                          </td>

                          <td className="py-4 px-4 text-xs text-jp-gray-700 font-prose">
                            {cat.description}
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-mono text-[11px] px-2 py-0.5 rounded-md border border-jp-gray-200 bg-jp-paper">
                              {cat.colorHex}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-center">
                            <Badge
                              variant={cat.isCustom ? "brown" : "blue"}
                              size="sm"
                            >
                              {cat.isCustom ? "Kustom" : "Sistem"}
                            </Badge>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(cat)}
                                title="Edit Kategori"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition cursor-pointer"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(cat)}
                                title="Hapus Kategori"
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
              totalItems={filteredCategories.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
              itemName="kategori"
            />
          </div>
        )}
      </div>

      {/* QUICK ADD MODAL */}
      <QuickAddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* EDIT MODAL */}
      {editingCategory && (
        <Modal
          isOpen={true}
          onClose={() => setEditingCategory(null)}
        >
          <div className="border-b border-jp-gray-200 pb-3 mb-4 flex items-center justify-between">
            <h3 className="font-heading text-base font-bold text-jp-ink">
              Sunting Kategori Wacana
            </h3>
            <button
              type="button"
              onClick={() => setEditingCategory(null)}
              className="text-jp-gray-400 hover:text-jp-ink transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-jp-gray-700 mb-1">
                Nama Kategori
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="w-full rounded-lg border border-jp-gray-300 p-2.5 text-xs text-jp-ink focus:border-jp-blue-700 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-jp-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-jp-gray-300 p-2.5 text-xs text-jp-ink focus:border-jp-blue-700 outline-none"
              />
            </div>

            <div className="space-y-1.5 pt-1">
              <ColorPicker
                label="Pilihan Aksen Warna (Kuratorial & Kustom)"
                value={editColor}
                onChange={setEditColor}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-jp-gray-200">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditingCategory(null)}
              >
                Batal
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
}
