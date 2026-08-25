import React from "react";
import Link from "next/link";
import { Badge } from "@/components/atoms/typography/Badge";
import { Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { ArrowRight, Volume2 } from "lucide-react";
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
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-jp-gray-500">
              <Volume2 className="h-3 w-3 text-jp-blue-700 shrink-0" />
              /{phoneticSpelling}/
            </span>
          ) : (
            <span />
          )}
        </div>

        {/* TERM HEADING */}
        <Heading3 className="mt-3 text-xl font-bold text-jp-ink">{term}</Heading3>

        {/* DEFINITION SHORT (FLEX GROW) */}
        <Paragraph className="mt-2 text-sm text-jp-gray-700 leading-relaxed flex-1 font-prose">
          {definitionShort}
        </Paragraph>

        {/* STANDARDIZED REFERENCE SLOT */}
        <div className="mt-4 pt-2 min-h-[44px]">
          {exampleArtworkTitle ? (
            <div className="rounded-lg bg-jp-paper px-3 py-1.5 text-xs text-jp-gray-700 border border-jp-gray-200 truncate">
              <span className="font-semibold text-jp-blue-900">Rujukan: </span>
              <em>{exampleArtworkTitle}</em>
            </div>
          ) : (
            <div className="text-[11px] text-jp-gray-400 italic py-1">
              Konsep Teori Umum
            </div>
          )}
        </div>
      </div>

      {/* PINNED BOTTOM ACTION LINK */}
      <div className="mt-6 pt-4 border-t border-jp-gray-100 flex items-center justify-between">
        <Link
          href={`/kamus#${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-jp-blue-700 hover:text-jp-blue-900 transition-colors"
        >
          Lihat Selengkapnya
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
