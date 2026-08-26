"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, Check } from "lucide-react";
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

  // Custom Select Dropdown State
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
      {/* LEFT: ITEM RANGE & CUSTOM PER-PAGE SELECTOR */}
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

        <div className="flex items-center gap-2 border-l border-jp-gray-300 pl-3">
          <span className="text-jp-gray-500">Tampilkan:</span>

          {/* CUSTOM DROPDOWN BUTTON & POPUP (NO NATIVE OS BLUE HIGHLIGHT) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border bg-white px-2.5 py-1 font-mono font-bold text-xs text-jp-ink transition cursor-pointer shadow-2xs",
                isOpen
                  ? "border-jp-blue-700 ring-2 ring-jp-blue-500/20"
                  : "border-jp-gray-300 hover:border-jp-blue-700"
              )}
            >
              <span>{pageSize}</span>
              <ChevronDown
                className={cn(
                  "h-3 w-3 text-jp-gray-500 transition-transform",
                  isOpen && "rotate-180 text-jp-blue-900"
                )}
              />
            </button>

            {/* CUSTOM DROPDOWN OPTIONS MENU */}
            {isOpen && (
              <div className="absolute bottom-full mb-1 left-0 z-50 min-w-[5rem] overflow-hidden rounded-xl border border-jp-gray-200 bg-white p-1 shadow-lg animate-in fade-in zoom-in-95 duration-150">
                {pageSizeOptions.map((opt) => {
                  const isSelected = opt === pageSize;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        onPageSizeChange(opt);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 font-mono text-xs font-bold transition cursor-pointer text-left",
                        isSelected
                          ? "bg-jp-blue-900 text-white"
                          : "text-jp-gray-700 hover:bg-jp-paper hover:text-jp-ink"
                      )}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

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
                  "flex h-8 min-w-[2rem] px-2 items-center justify-center rounded-lg font-mono text-xs font-bold transition cursor-pointer shadow-2xs",
                  isActive
                    ? "bg-jp-blue-900 text-white shadow-xs"
                    : "border border-jp-gray-200 bg-white text-jp-gray-700 hover:border-jp-blue-600 hover:text-jp-ink"
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
