"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSearch } from "@/lib/searchContext";
import { Button } from "@/components/atoms/form/Button";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  placeholder?: string;
  mobilePlaceholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SearchBar({
  placeholder = "Cari materi teori seni, teknik studio, maestro lukis...",
  mobilePlaceholder = "Cari materi seni, istilah, seniman...",
  onSearch,
  className,
  size = "md",
}: SearchBarProps) {
  const { openSearch } = useSearch();
  const [query] = useState("");

  const containerSizes = {
    sm: "py-1 pl-3 pr-1",
    md: "py-1.5 pl-3.5 sm:pl-4 pr-1.5",
    lg: "py-2 pl-3.5 sm:pl-5 pr-2",
  };

  const inputSizes = {
    sm: "text-xs",
    md: "text-xs sm:text-sm",
    lg: "text-xs sm:text-base",
  };

  const handleOpen = () => {
    if (onSearch) {
      onSearch(query);
    } else {
      openSearch(query);
    }
  };

  return (
    <div
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpen();
        }
      }}
      className={cn(
        "flex w-full items-center justify-between overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-jp-card transition hover:border-jp-blue-400 focus-within:border-jp-blue-700 focus-within:ring-2 focus-within:ring-jp-blue-100 cursor-pointer group select-none",
        containerSizes[size],
        className
      )}
    >
      {/* LEFT: SEARCH ICON & RESPONSIVE PLACEHOLDER */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0 pr-2">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-jp-gray-400 group-hover:text-jp-blue-700 transition" />
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-jp-gray-500 font-sans",
            inputSizes[size]
          )}
        >
          {query ? (
            query
          ) : (
            <>
              <span className="hidden sm:inline truncate">{placeholder}</span>
              <span className="sm:hidden truncate">{mobilePlaceholder}</span>
            </>
          )}
        </span>
      </div>

      {/* RIGHT: SHORTCUT BADGE & COMPACT CARI BUTTON */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <kbd className="hidden md:inline-flex items-center gap-0.5 rounded-md border border-jp-gray-200 bg-jp-gray-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-jp-gray-600 shadow-2xs">
          <span>Ctrl</span>
          <span>K</span>
        </kbd>

        <Button
          type="button"
          variant="primary"
          size={size === "lg" ? "md" : "sm"}
          className="shrink-0 font-bold px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          Cari
        </Button>
      </div>
    </div>
  );
}
