"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/Typography";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/atoms/Modal";
import { QuickAddCategoryModal } from "@/components/molecules/QuickAddCategoryModal";
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
import { cn } from "@/lib/utils";

export default function AdminKategoriPage() {
  const { categories, addCategory, updateCategory, deleteCategory, resetToDefault } =
    useCategories();
  const { confirm, alert } = useModal();

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit Modal State
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editColor, setEditColor] = useState("#182C4A");

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      return (
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [categories, searchQuery]);

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
      iconType: "trash",
    });

    if (confirmed) {
      deleteCategory(cat.id);
      await alert({
        title: "Kategori Telah Dihapus",
        message: `Kategori "${cat.name}" telah dihapus dari sistem.`,
        type: "info",
      });
    }
  };

  const handleReset = async () => {
    const confirmed = await confirm({
      title: "Reset Daftar Kategori?",
      message: "Kembalikan seluruh kategori ke 5 kategori kuratorial bawaan Jejak Perupa.",
      confirmLabel: "Reset ke Bawaan",
      cancelLabel: "Batal",
      variant: "warning",
      iconType: "alert",
    });

    if (confirmed) {
      resetToDefault();
      await alert({
        title: "Kategori Direset",
        message: "Daftar kategori telah dikembalikan ke standar awal.",
        type: "info",
      });
    }
  };

  return (
    <AdminLayout
      title="Manajemen Kategori Wacana"
      subtitle="Kelola taksonomi bidang kajian, warna aksen kuratorial, dan kelompok artikel edukasi."
      actionButton={
        <div className="flex items-center gap-2">
          <Link href="/admin/artikel">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-lg text-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
              Kembali ke Katalog
            </Button>
          </Link>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="rounded-lg text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Reset
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-lg text-xs"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Tambah Kategori
          </Button>
        </div>
      }
    >
      <div className="space-y-6 font-sans">
        {/* SEARCH BAR */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jp-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama kategori atau deskripsi..."
              className="w-full rounded-lg border border-jp-gray-300 bg-white pl-9 pr-4 py-2 text-xs text-jp-ink focus:border-jp-blue-700 outline-none"
            />
          </div>

          <div className="font-mono text-xs text-jp-gray-500">
            Total {categories.length} Kategori Aktif
          </div>
        </div>

        {/* CATEGORIES DATA TABLE */}
        <div className="overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xs">
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
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat, idx) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-jp-blue-50/30 transition-colors"
                    >
                      <td className="py-4 px-4 font-mono text-center font-bold text-jp-gray-400">
                        {idx + 1}
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3 w-3 rounded-full shrink-0 shadow-2xs"
                            style={{ backgroundColor: cat.colorHex }}
                          />
                          <span className="font-bold text-jp-ink text-sm">
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
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-xs text-jp-gray-500"
                    >
                      Tidak ada kategori yang sesuai dengan kriteria pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-jp-gray-200 bg-jp-paper/40 px-4 py-3 text-xs text-jp-gray-500 font-mono">
            <span>
              Menampilkan {filteredCategories.length} dari {categories.length} kategori wacana
            </span>
            <span>Platform Arsip Jejak Perupa</span>
          </div>
        </div>
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
          maxWidth="md"
        >
          <form
            onSubmit={handleSaveEdit}
            className="p-6 md:p-7 space-y-5 font-sans"
          >
            <div className="flex items-start justify-between gap-4 border-b border-jp-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jp-blue-100 text-jp-blue-900 border border-jp-blue-200 shadow-2xs">
                  <Edit2 className="h-5 w-5" />
                </div>
                <div>
                  <Heading3 className="text-lg font-bold text-jp-ink">
                    Edit Kategori: {editingCategory.name}
                  </Heading3>
                  <p className="text-xs text-jp-gray-500 font-prose">
                    Perubahan nama akan otomatis memperbarui slug URL dan tautan materi terkait.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="text-jp-gray-400 hover:text-jp-ink p-1 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Nama Kategori <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs md:text-sm font-bold text-jp-ink focus:border-jp-blue-700 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Deskripsi Ruang Lingkup
                </label>
                <textarea
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs md:text-sm text-jp-ink focus:border-jp-blue-700 outline-none font-prose"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
                  Kode Warna Aksen
                </label>
                <input
                  type="text"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                  placeholder="#182C4A"
                  className="w-full rounded-lg border border-jp-gray-300 bg-white px-3.5 py-2 text-xs font-mono font-bold text-jp-ink focus:border-jp-blue-700 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-4 border-t border-jp-gray-100 font-sans">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditingCategory(null)}
                className="rounded-lg"
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="rounded-lg"
              >
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
}
