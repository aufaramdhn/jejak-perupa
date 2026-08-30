"use client";

import React, { useState, useTransition } from "react";
import { CatalogGridTemplate } from "@/components/templates/public/CatalogGridTemplate";
import { ArticleCard } from "@/components/molecules/article/ArticleCard";
import { ArticleCardSkeleton } from "@/components/molecules/article/ArticleCardSkeleton";
import { SearchBar } from "@/components/molecules/navigation/SearchBar";
import { PeruChanTipBanner } from "@/components/organisms/peruchan/PeruChanTipBanner";
import { artService } from "@/lib/services/artService";
import { type ArticleFullData } from "@/lib/data/articles";
import { cn } from "@/lib/utils";

export default function ArtikelCatalogPage() {
  const [allArticles, setAllArticles] = useState<ArticleFullData[]>(() => artService.getAllArticles());
  const allCategories = artService.getAllCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    let isMounted = true;
    artService
      .syncWithDatabase()
      .then((items) => {
        if (isMounted && Array.isArray(items) && items.length > 0) {
          setAllArticles(items);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryChange = (catName: string) => {
    startTransition(() => {
      setSelectedCategory(catName);
    });
  };

  const handleSearchChange = (q: string) => {
    startTransition(() => {
      setSearchQuery(q);
    });
  };

  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "Semua" || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filterSection = (
    <div className="space-y-6 font-sans">
      <div className="max-w-xl">
        <SearchBar
          placeholder="Cari judul artikel atau topik..."
          onSearch={handleSearchChange}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => handleCategoryChange("Semua")}
          className={cn(
            "rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
            selectedCategory === "Semua"
              ? "bg-jp-blue-900 text-white shadow-2xs"
              : "bg-white text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900 border border-jp-gray-300"
          )}
        >
          Semua Kategori
        </button>

        {allCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.name)}
            className={cn(
              "rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
              selectedCategory === cat.name
                ? "bg-jp-blue-900 text-white shadow-2xs"
                : "bg-white text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900 border border-jp-gray-300"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <CatalogGridTemplate
      badgeText="Arsip Pengetahuan"
      title="Katalog Artikel Seni Rupa"
      subtitle="Kumpulan tulisan terkurasi mengenai teori estetika, teknik studio, sejarah pergerakan seni, dan panduan pendidikan seni rupa."
      filterSection={filterSection}
    >
      <div className="space-y-12 font-sans">
        {/* IN-SITU MODULAR GRID LOADING SKELETON */}
        {(isLoading || isPending) ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ArticleCardSkeleton key={idx} />
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-12 text-center text-jp-gray-500">
            Tidak ada artikel yang sesuai dengan filter atau kata kunci pencarian.
          </div>
        )}

        <PeruChanTipBanner tipText="Membaca satu artikel seni setiap hari akan memperluas perbendaharaan visual dan kepekaan estetikamu secara bertahap." />
      </div>
    </CatalogGridTemplate>
  );
}
