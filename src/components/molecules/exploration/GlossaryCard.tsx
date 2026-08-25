import React from "react";
import Link from "next/link";
import { Badge } from "@/components/atoms/typography/Badge";
import { Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { ArrowRight, Volume2, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GlossaryCardProps {
  term: string;
  slug: string;
  category: string;
  definitionShort: string;
  phoneticSpelling?: string;
  exampleArtworkTitle?: string;
  className?: string;
}

export function GlossaryCard({
  term,
  slug,
  category,
  definitionShort,
  phoneticSpelling,
  exampleArtworkTitle,
  className,
}: GlossaryCardProps) {
  return (
    <div
      className={cn(
        "h-full flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-jp-blue-700 hover:shadow-jp-hover",
        className
      )}
    >
      <div className="flex flex-1 flex-col">
        {/* HEADER BADGE & PHONETIC */}
        <div className="flex items-center justify-between gap-2 min-h-[28px]">
          <Badge variant="blue">{category}</Badge>
          {phoneticSpelling ? (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-jp-gray-500 font-medium">
              <Volume2 className="h-3.5 w-3.5 text-jp-blue-700 shrink-0" />
              /{phoneticSpelling}/
            </span>
          ) : (
            <span />
          )}
        </div>

        {/* TERM HEADING */}
        <Heading3 className="mt-3 text-xl font-bold text-jp-ink tracking-tight">
          {term}
        </Heading3>

        {/* DEFINITION SHORT (FLEX GROW) */}
        <Paragraph className="mt-2 text-sm text-jp-gray-700 leading-relaxed flex-1 font-prose">
          {definitionShort}
        </Paragraph>

        {/* CLEAN INLINE REFERENCE (NO NESTED BORDER) */}
        <div className="mt-4 pt-2 min-h-[36px] flex items-center text-xs text-jp-gray-600 font-sans">
          {exampleArtworkTitle ? (
            <div className="flex items-center gap-1.5 truncate text-jp-gray-700">
              <BookOpen className="h-3.5 w-3.5 text-jp-blue-700 shrink-0" />
              <span className="text-jp-blue-900 font-semibold">Rujukan:</span>
              <em className="truncate text-jp-ink font-serif">{exampleArtworkTitle}</em>
            </div>
          ) : (
            <span className="text-xs text-jp-gray-400 italic">
              Konsep Teori Umum
            </span>
          )}
        </div>
      </div>

      {/* PINNED BOTTOM ACTION LINK */}
      <div className="mt-6 pt-4 border-t border-jp-gray-100 flex items-center justify-between">
        <Link
          href={`/kamus#${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-jp-blue-700 hover:text-jp-blue-900 transition-colors font-sans"
        >
          <span>Lihat selengkapnya</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
