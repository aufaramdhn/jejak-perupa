"use client";

import React, { useState, useMemo, useTransition } from "react";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { TablePagination } from "@/components/molecules/navigation/TablePagination";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { CurationCardSkeleton } from "@/components/organisms/admin/CurationCardSkeleton";
import { CurationReviewModal } from "@/components/organisms/admin/curation/CurationReviewModal";
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

import { submissionsSeeder, type SubmissionItem } from "@/lib/data/seeders/submissionsSeeder";

export default function AdminKurasiPage() {
  const { confirm, alert } = useModal();

  const [submissions, setSubmissions] = useState<SubmissionItem[]>([...submissionsSeeder]);

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
        <CurationReviewModal
          submission={selectedSub}
          onClose={() => setSelectedSub(null)}
          tipDraft={tipDraft}
          setTipDraft={setTipDraft}
          themeDraft={themeDraft}
          setThemeDraft={setThemeDraft}
          onApprove={handleApprove}
          onRequestRevision={handleRequestRevision}
        />
      </div>
    </AdminLayout>
  );
}
