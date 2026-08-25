import React from "react";
import Link from "next/link";
import { ArticleCard, type ArticleCardProps } from "@/components/molecules/article/ArticleCard";
import { Heading2, SectionLabel } from "@/components/atoms/typography/Typography";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ArticleGridProps {
  articles: ArticleCardProps[];
  title?: string;
  sectionLabel?: string;
  viewAllHref?: string;
  className?: string;
}

export function ArticleGrid({
  articles,
  title = "Artikel Terbaru",
  sectionLabel,
  viewAllHref,
  className,
}: ArticleGridProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-20", className)}>
      <div className="flex items-end justify-between">
        <div>
          {sectionLabel && <SectionLabel>{sectionLabel}</SectionLabel>}
          <Heading2 className={cn("text-2xl sm:text-3xl text-jp-ink", sectionLabel ? "mt-2" : "")}>
            {title}
          </Heading2>
        </div>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 text-sm font-bold text-jp-blue-700 hover:text-jp-blue-900 transition-colors"
          >
            Lihat semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </section>
  );
}
