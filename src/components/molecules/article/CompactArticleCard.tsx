"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { Clock, BookmarkX, ArrowRight, BookOpen, User } from "lucide-react";
import { ArticleCoverPlaceholder } from "@/components/atoms/media/ArticleCoverPlaceholder";
import { renderInlineFormatting, cleanCardExcerpt } from "@/components/molecules/article/RichContentRenderer";
import { type ArticleFullData } from "@/lib/data/articles";
import { cn } from "@/lib/utils";

export interface CompactArticleCardProps {
  article: ArticleFullData;
  onRemoveBookmark?: (id: string) => void;
  className?: string;
}

export function CompactArticleCard({
  article,
  onRemoveBookmark,
  className,
}: CompactArticleCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = article.coverImageUrl || article.headerBgImageUrl || "";
  const hasImage = Boolean(imageUrl) && !imageError;

  return (
    <div
      className={cn(
        "group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-4 sm:p-5 shadow-2xs hover:border-jp-blue-300 hover:shadow-xs transition-all duration-200 font-sans",
        className
      )}
    >
      {/* LEFT: THUMBNAIL & INFO */}
      <div className="flex items-start gap-4 min-w-0 flex-1">
        {/* COMPACT THUMBNAIL */}
        <Link
          href={`/artikel/${article.slug}`}
          className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-lg border border-jp-gray-200 bg-jp-paper block group-hover:opacity-95 transition"
        >
          {hasImage ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 80px, 96px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <ArticleCoverPlaceholder
              title={article.title}
              category={article.category}
              colorHex={article.headerBgColor}
              size="compact"
            />
          )}
        </Link>

        {/* DETAILS */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={article.categoryVariant || "blue"} size="sm">
              {article.category}
            </Badge>
            <span className="flex items-center gap-1 text-[11px] font-mono text-jp-gray-500">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>

          <Link href={`/artikel/${article.slug}`} className="block">
            <h3 className="font-heading text-sm sm:text-base font-bold text-jp-ink group-hover:text-jp-blue-900 transition line-clamp-2 leading-snug">
              {article.title}
            </h3>
          </Link>

          <p className="text-xs text-jp-gray-600 font-prose line-clamp-1 hidden sm:block">
            {renderInlineFormatting(cleanCardExcerpt(article.excerpt))}
          </p>

          <div className="flex items-center gap-2 pt-0.5 text-[11px] text-jp-gray-500 font-sans">
            <span className="flex items-center gap-1 truncate">
              <User className="h-3 w-3 text-jp-gray-400" />
              {article.authorName}
            </span>
            {article.publishedDate && (
              <>
                <span>·</span>
                <span className="truncate">{article.publishedDate}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: ACTION BUTTONS */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-jp-gray-100 shrink-0">
        {onRemoveBookmark && (
          <button
            type="button"
            onClick={() => onRemoveBookmark(article.id)}
            title="Hapus dari simpanan"
            aria-label="Hapus dari simpanan"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
          >
            <BookmarkX className="h-4 w-4" />
          </button>
        )}

        <Link href={`/artikel/${article.slug}`}>
          <Button variant="outline" size="sm" className="rounded-lg text-xs h-9 px-3.5">
            <span>Baca</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
