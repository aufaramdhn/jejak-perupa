"use client";

import React, { useState, useTransition } from "react";
import { GlossaryCard } from "@/components/molecules/exploration/GlossaryCard";
import { GlossaryCardSkeleton } from "@/components/molecules/exploration/GlossaryCardSkeleton";
import { SearchBar } from "@/components/molecules/navigation/SearchBar";
import { Heading2, SectionLabel } from "@/components/atoms/typography/Typography";
import type { GlossaryData } from "@/lib/data/glossary";
import { cn } from "@/lib/utils";

export interface GlossaryDirectoryProps {
  terms: GlossaryData[];
  className?: string;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function GlossaryDirectory({ terms, className }: GlossaryDirectoryProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleLetterChange = (letter: string | null) => {
    startTransition(() => {
      setSelectedLetter(letter);
    });
  };

  const handleSearchChange = (q: string) => {
    startTransition(() => {
      setSearchQuery(q);
    });
  };

  const availableLetters = Array.from(
    new Set(terms.map((t) => t.letterGroup.toUpperCase()))
  );

  const filteredTerms = terms.filter((term) => {
    const matchesLetter = selectedLetter
      ? term.letterGroup.toUpperCase() === selectedLetter
      : true;
    const matchesSearch = searchQuery
      ? term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definitionShort.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesLetter && matchesSearch;
  });

  return (
    <div className={cn("space-y-10 font-sans", className)}>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel>Ensiklopedia A-Z</SectionLabel>
          <Heading2 className="mt-2 text-jp-ink">Kamus Istilah Seni Rupa</Heading2>
          <p className="mt-2 text-sm text-jp-gray-700 max-w-xl font-prose">
            Kumpulan istilah kunci, konsep estetika, aliran seni, dan teknik berkarya dari masa ke masa.
          </p>
        </div>

        <div className="w-full md:w-80">
          <SearchBar
            placeholder="Cari istilah seni..."
            onSearch={handleSearchChange}
          />
        </div>
      </div>

      {/* ALPHABET FILTER BAR */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-jp-gray-300 bg-white p-3 shadow-2xs">
        <button
          type="button"
          onClick={() => handleLetterChange(null)}
          className={cn(
            "rounded-md px-3 py-1.5 font-mono text-xs font-bold transition-colors cursor-pointer",
            selectedLetter === null
              ? "bg-jp-blue-900 text-white"
              : "text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900"
          )}
        >
          Semua
        </button>

        {ALPHABET.map((letter) => {
          const isAvailable = availableLetters.includes(letter);
          const isSelected = selectedLetter === letter;

          return (
            <button
              key={letter}
              type="button"
              disabled={!isAvailable}
              onClick={() => handleLetterChange(letter)}
              className={cn(
                "h-8 w-8 rounded-md font-mono text-xs font-bold transition-colors",
                isSelected
                  ? "bg-jp-blue-900 text-white ring-2 ring-jp-blue-100"
                  : isAvailable
                  ? "text-jp-ink hover:bg-jp-blue-50 hover:text-jp-blue-900 cursor-pointer"
                  : "text-jp-gray-300 cursor-not-allowed"
              )}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* TERMS GRID WITH IN-SITU SKELETON */}
      {(isLoading || isPending) ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <GlossaryCardSkeleton key={idx} />
          ))}
        </div>
      ) : filteredTerms.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTerms.map((term) => (
            <div key={term.id} id={term.slug}>
              <GlossaryCard {...term} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-12 text-center text-jp-gray-500">
          Tidak ada istilah yang cocok dengan filter yang dipilih.
        </div>
      )}
    </div>
  );
}
