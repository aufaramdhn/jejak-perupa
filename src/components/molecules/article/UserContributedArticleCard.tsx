"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { Clock, Eye, Edit3, CheckCircle2, AlertCircle, FileText, Trash2 } from "lucide-react";
import { ArticleCoverPlaceholder } from "@/components/atoms/media/ArticleCoverPlaceholder";
import { renderInlineFormatting, cleanCardExcerpt } from "@/components/molecules/article/RichContentRenderer";
import { cn } from "@/lib/utils";

export interface UserArticleItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryVariant?: "blue" | "brown" | "lime" | "gray";
  excerpt: string;
  readTime?: string;
  publishedDate?: string;
  authorName?: string;
  coverImageUrl?: string;
  headerBgColor?: string;
  status: "PUBLISHED" | "SUBMITTED" | "DRAFT";
  createdAt?: string;
}

export interface UserContributedArticleCardProps {
  article: UserArticleItem;
  onDelete?: (idOrSlug: string) => void;
  className?: string;
}

export function UserContributedArticleCard({
  article,
  onDelete,
  className,
}: UserContributedArticleCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = article.coverImageUrl || "";
  const hasImage = Boolean(imageUrl) && !imageError;

  const statusConfig = {
    PUBLISHED: {
      label: "Diterbitkan",
      badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      icon: CheckCircle2,
    },
    SUBMITTED: {
      label: "Menunggu Kurasi",
      badgeColor: "bg-amber-50 text-amber-900 border-amber-300",
      icon: AlertCircle,
    },
    DRAFT: {
      label: "Draf Tersimpan",
      badgeColor: "bg-jp-gray-100 text-jp-gray-700 border-jp-gray-300",
      icon: FileText,
    },
  };

  const currentStatus = statusConfig[article.status] || statusConfig.SUBMITTED;
  const StatusIcon = currentStatus.icon;

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
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-lg border border-jp-gray-200 bg-jp-paper">
          {hasImage ? (
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 80px, 96px"
              className="object-cover"
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
        </div>

        {/* DETAILS */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono tracking-wide",
                currentStatus.badgeColor
              )}
            >
              <StatusIcon className="h-3 w-3" />
              {currentStatus.label}
            </span>

            <Badge variant={article.categoryVariant || "blue"} size="sm">
              {article.category}
            </Badge>

            {article.readTime && (
              <span className="flex items-center gap-1 text-[11px] font-mono text-jp-gray-500">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </span>
            )}
          </div>

          <h3 className="font-heading text-sm sm:text-base font-bold text-jp-ink group-hover:text-jp-blue-900 transition line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="text-xs text-jp-gray-600 font-prose line-clamp-1 hidden sm:block">
            {renderInlineFormatting(cleanCardExcerpt(article.excerpt))}
          </p>

          <div className="flex items-center gap-2 pt-0.5 text-[11px] text-jp-gray-500 font-sans">
            <span>Dibuat: {article.publishedDate || "Baru saja"}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: ACTION BUTTONS */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-jp-gray-100 shrink-0">
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(article.id || article.slug)}
            title="Hapus naskah"
            aria-label="Hapus naskah"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}

        {article.status === "PUBLISHED" ? (
          <Link href={`/artikel/${article.slug}`}>
            <Button variant="primary" size="sm" className="rounded-lg text-xs h-9 px-3.5">
              <Eye className="h-3.5 w-3.5 mr-1" />
              <span>Lihat Publik</span>
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard/kontribusi">
            <Button variant="outline" size="sm" className="rounded-lg text-xs h-9 px-3.5">
              <Edit3 className="h-3.5 w-3.5 mr-1" />
              <span>Buka Editor</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
