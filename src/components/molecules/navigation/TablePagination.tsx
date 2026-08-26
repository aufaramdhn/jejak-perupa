"use client";

import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  itemName?: string;
  className?: string;
}

export function TablePagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  itemName = "data",
  className,
}: TablePaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);

  const startItem = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endItem = Math.min(safeCurrentPage * pageSize, totalItems);

  // Generate visible page numbers with ellipsis
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (safeTotalPages <= maxVisible) {
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i);
      }
    } else {
      if (safeCurrentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", safeTotalPages);
      } else if (safeCurrentPage >= safeTotalPages - 2) {
        pages.push(1, "...", safeTotalPages - 3, safeTotalPages - 2, safeTotalPages - 1, safeTotalPages);
      } else {
        pages.push(1, "...", safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, "...", safeTotalPages);
      }
    }
    return pages;
  }, [safeCurrentPage, safeTotalPages]);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center justify-between gap-4 border-t border-jp-gray-200 bg-jp-paper/50 px-4 py-3.5 rounded-b-xl text-xs font-sans",
        className
      )}
    >
      {/* LEFT: ITEM RANGE & PER-PAGE SELECTOR */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-jp-gray-600">
        <div className="font-mono">
          Menampilkan{" "}
          <span className="font-bold text-jp-ink">
            {startItem} - {endItem}
          </span>{" "}
          dari{" "}
          <span className="font-bold text-jp-ink">{totalItems}</span>{" "}
          {itemName}
        </div>

        <div className="flex items-center gap-1.5 border-l border-jp-gray-300 pl-3">
          <span className="text-jp-gray-500">Tampilkan:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-lg border border-jp-gray-300 bg-white px-2 py-1 font-mono font-bold text-xs text-jp-ink focus:border-jp-blue-700 focus:outline-none cursor-pointer shadow-2xs"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <span className="text-jp-gray-500 font-mono">per halaman</span>
        </div>
      </div>

      {/* RIGHT: PAGINATION NAVIGATION CONTROLS */}
      <div className="flex items-center gap-1">
        {/* FIRST PAGE */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={safeCurrentPage === 1}
          title="Halaman Pertama"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:bg-jp-blue-50 hover:text-jp-blue-900 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer shadow-2xs"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        {/* PREV PAGE */}
        <button
          type="button"
          onClick={() => onPageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          title="Halaman Sebelumnya"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:bg-jp-blue-50 hover:text-jp-blue-900 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* PAGE NUMBERS */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="flex h-8 w-6 items-center justify-center font-mono text-jp-gray-400 font-bold"
                >
                  ...
                </span>
              );
            }

            const pageNum = Number(p);
            const isActive = pageNum === safeCurrentPage;

            return (
              <button
                key={`page-${pageNum}`}
                type="button"
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  "flex h-8 min-w-[32px] px-2 items-center justify-center rounded-lg font-mono text-xs transition cursor-pointer shadow-2xs",
                  isActive
                    ? "bg-jp-blue-900 text-white font-bold shadow-xs"
                    : "border border-jp-gray-200 bg-white text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900"
                )}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* NEXT PAGE */}
        <button
          type="button"
          onClick={() => onPageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage === safeTotalPages}
          title="Halaman Selanjutnya"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:bg-jp-blue-50 hover:text-jp-blue-900 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer shadow-2xs"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* LAST PAGE */}
        <button
          type="button"
          onClick={() => onPageChange(safeTotalPages)}
          disabled={safeCurrentPage === safeTotalPages}
          title="Halaman Terakhir"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:bg-jp-blue-50 hover:text-jp-blue-900 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer shadow-2xs"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
