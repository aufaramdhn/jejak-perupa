"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/atoms/typography/Badge";
import { ArticleCoverPlaceholder } from "@/components/atoms/media/ArticleCoverPlaceholder";
import { cn } from "@/lib/utils";

export interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categoryVariant?: "lime" | "blue" | "brown" | "gray";
  readTime: string;
  imageUrl?: string;
  className?: string;
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  categoryVariant = "blue",
  readTime,
  imageUrl,
  className,
}: ArticleCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={`/artikel/${slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-jp-blue-700 hover:shadow-jp-hover",
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-jp-blue-50">
        {imageUrl && !imageError ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <ArticleCoverPlaceholder
            title={title}
            category={category}
            size="card"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div>
          <Badge variant={categoryVariant}>{category}</Badge>
        </div>

        <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-jp-ink transition-colors duration-200 group-hover:text-jp-blue-900">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-jp-gray-700 flex-1 font-prose">
          {excerpt}
        </p>

        <div className="mt-5 flex items-center gap-1.5 pt-4 border-t border-jp-gray-100 text-xs text-jp-gray-500 font-sans">
          <Clock className="h-3.5 w-3.5" />
          <span>{readTime}</span>
        </div>
      </div>
    </Link>
  );
}
