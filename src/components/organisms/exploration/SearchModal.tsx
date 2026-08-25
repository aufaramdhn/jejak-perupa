"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/lib/searchContext";
import { artService } from "@/lib/services/artService";
import {
  Search,
  X,
  FileText,
  Users,
  BookOpen,
  Palette,
  MapPin,
  ArrowRight,
  Sparkles,
  CornerDownLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResultItem {
  id: string;
  type: "article" | "artist" | "glossary" | "artwork" | "location";
  typeLabel: string;
  title: string;
  subtitle: string;
  badge?: string;
  href: string;
}

export function SearchModal() {
  const { isOpen, closeSearch, query, setQuery } = useSearch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-focus input & comprehensive scroll lock on open
  useEffect(() => {
    if (isOpen) {
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlTouchAction = document.documentElement.style.touchAction;
      const originalBodyTouchAction = document.body.style.touchAction;

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
      document.body.style.touchAction = "none";

      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);

      return () => {
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.touchAction = originalHtmlTouchAction;
        document.body.style.touchAction = originalBodyTouchAction;
      };
    } else {
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Live search results
  const searchResults = useMemo(() => {
    if (!query.trim()) return null;
    return artService.searchGlobal(query.trim());
  }, [query]);

  // Flattened results for keyboard navigation
  const flatItems: SearchResultItem[] = useMemo(() => {
    if (!searchResults) return [];
    const items: SearchResultItem[] = [];

    searchResults.articles.slice(0, 4).forEach((a) => {
      items.push({
        id: `article-${a.slug}`,
        type: "article",
        typeLabel: "Artikel Edukasi",
        title: a.title,
        subtitle: a.excerpt,
        badge: a.category,
        href: `/artikel/${a.slug}`,
      });
    });

    searchResults.artists.slice(0, 3).forEach((ar) => {
      items.push({
        id: `artist-${ar.slug}`,
        type: "artist",
        typeLabel: "Profil Seniman",
        title: ar.name,
        subtitle: `${ar.artMovement} - ${ar.originCity}`,
        badge: ar.artMovement,
        href: `/seniman/${ar.slug}`,
      });
    });

    searchResults.glossary.slice(0, 4).forEach((g) => {
      items.push({
        id: `glossary-${g.slug}`,
        type: "glossary",
        typeLabel: "Kamus Istilah",
        title: g.term,
        subtitle: g.definitionShort,
        badge: g.category,
        href: `/kamus#${g.slug}`,
      });
    });

    searchResults.artworks.slice(0, 2).forEach((artw) => {
      items.push({
        id: `artwork-${artw.id}`,
        type: "artwork",
        typeLabel: "Karya Seni",
        title: artw.title,
        subtitle: `${artw.artistName} (${artw.yearCreated}) - ${artw.mediumMaterial}`,
        badge: "Karya",
        href: `/karya/${artw.id}/kenali`,
      });
    });

    searchResults.locations.slice(0, 2).forEach((loc) => {
      items.push({
        id: `loc-${loc.id}`,
        type: "location",
        typeLabel: "Peta Seni",
        title: loc.name,
        subtitle: `${loc.city}, ${loc.province}`,
        badge: loc.category,
        href: `/peta-seni`,
      });
    });

    return items;
  }, [searchResults]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Quick suggestions when empty
  const quickSuggestions = [
    { label: "Romantisisme Raden Saleh", q: "Raden Saleh" },
    { label: "Dasar Teknik Cat Air", q: "Cat Air" },
    { label: "Seni Rupa Murni", q: "Murni" },
    { label: "Kamus Istilah: Impasto", q: "Impasto" },
    { label: "Affandi Koesoema", q: "Affandi" },
    { label: "Jalur Belajar Fondasi", q: "Fondasi" },
  ];

  const handleSelect = (href: string) => {
    closeSearch();
    router.push(href);
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (flatItems.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        e.preventDefault();
        closeSearch();
        router.push(`/cari?q=${encodeURIComponent(query.trim())}`);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatItems[selectedIndex]) {
        handleSelect(flatItems[selectedIndex].href);
      }
    }
  };

  const getIcon = (type: SearchResultItem["type"]) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4 text-jp-blue-700 shrink-0" />;
      case "artist":
        return <Users className="h-4 w-4 text-jp-brown-700 shrink-0" />;
      case "glossary":
        return <BookOpen className="h-4 w-4 text-amber-600 shrink-0" />;
      case "artwork":
        return <Palette className="h-4 w-4 text-emerald-600 shrink-0" />;
      case "location":
        return <MapPin className="h-4 w-4 text-purple-600 shrink-0" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-start justify-center p-3 sm:p-6 md:p-10 bg-black/60 animate-in fade-in duration-150 font-sans overscroll-none touch-none select-none"
      onClick={closeSearch}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-jp-gray-300 bg-white shadow-2xl animate-in zoom-in-95 duration-150 mt-2 sm:mt-12 flex flex-col max-h-[85vh] touch-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* TOP SEARCH INPUT BAR */}
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-jp-gray-200 px-3.5 py-3 sm:px-5 sm:py-3.5 bg-white">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-jp-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik topik materi, nama maestro, atau istilah seni..."
            className="flex-1 bg-transparent text-xs sm:text-base font-semibold text-jp-ink placeholder:text-jp-gray-500 outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="flex h-6 w-6 items-center justify-center rounded-md text-jp-gray-400 hover:text-jp-ink hover:bg-jp-gray-100 transition cursor-pointer"
              title="Hapus kata kunci"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* DESKTOP ESC BADGE */}
          <kbd className="hidden md:inline-flex items-center rounded border border-jp-gray-300 bg-jp-gray-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-jp-gray-600">
            Esc
          </kbd>

          {/* DESKTOP & MOBILE CLOSE BUTTON */}
          <button
            type="button"
            onClick={closeSearch}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-jp-paper text-jp-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition cursor-pointer shrink-0"
            title="Tutup Pencarian (Esc)"
            aria-label="Tutup pencarian"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* RESULTS BODY */}
        <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-4 touch-auto">
          {!query.trim() ? (
            /* EMPTY QUERY: QUICK SUGGESTIONS */
            <div className="space-y-4 py-2 px-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-jp-gray-500 font-mono">
                <Sparkles className="h-3.5 w-3.5 text-jp-blue-700" />
                <span>Pencarian Populer & Topik Terpilih</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setQuery(item.q)}
                    className="flex items-center gap-1.5 rounded-lg border border-jp-gray-200 bg-jp-paper px-3 py-1.5 text-xs font-semibold text-jp-ink hover:border-jp-blue-300 hover:bg-jp-blue-50/50 transition cursor-pointer"
                  >
                    <Search className="h-3 w-3 text-jp-gray-500" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : flatItems.length === 0 ? (
            /* NO RESULTS */
            <div className="py-12 text-center space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-jp-gray-100 text-jp-gray-500">
                <Search className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold text-jp-ink">
                Tidak ada hasil untuk &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-jp-gray-500 max-w-sm mx-auto">
                Coba gunakan kata kunci umum seperti nama teknik cat, nama seniman, atau aliran seni.
              </p>
            </div>
          ) : (
            /* LIVE RESULTS LIST */
            <div className="space-y-1">
              {flatItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.href)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition cursor-pointer",
                      isSelected
                        ? "bg-jp-blue-50 text-jp-blue-900 border border-jp-blue-200"
                        : "hover:bg-jp-gray-100/70 border border-transparent"
                    )}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="mt-0.5 p-1 rounded-md bg-white border border-jp-gray-200 shadow-2xs">
                        {getIcon(item.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-sm text-jp-ink truncate">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="shrink-0 rounded bg-jp-gray-200/80 px-1.5 py-0.5 text-[10px] font-bold text-jp-gray-700 font-mono">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-jp-gray-600 truncate font-prose mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-semibold text-jp-gray-500 font-mono hidden sm:inline">
                        {item.typeLabel}
                      </span>
                      {isSelected && (
                        <CornerDownLeft className="h-3.5 w-3.5 text-jp-blue-700" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-jp-gray-200 bg-jp-paper/90 px-4 py-2.5 text-xs text-jp-gray-600">
          <div className="hidden sm:flex items-center gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-white px-1.5 py-0.5 shadow-2xs">↑</kbd>
              <kbd className="rounded border bg-white px-1.5 py-0.5 shadow-2xs">↓</kbd>
              <span>Navigasi</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-white px-1.5 py-0.5 shadow-2xs">↵</kbd>
              <span>Buka</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-white px-1.5 py-0.5 shadow-2xs">Esc</kbd>
              <span>Tutup</span>
            </span>
          </div>

          {query.trim() && (
            <button
              type="button"
              onClick={() => {
                closeSearch();
                router.push(`/cari?q=${encodeURIComponent(query.trim())}`);
              }}
              className="flex items-center gap-1 font-semibold text-jp-blue-900 hover:text-jp-blue-700 ml-auto transition cursor-pointer"
            >
              <span>Buka halaman arsip lengkap untuk &ldquo;{query}&rdquo;</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
