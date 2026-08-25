import React from "react";
import { ArticleCardSkeleton } from "@/components/molecules/article/ArticleCardSkeleton";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface ArticleGridSkeletonProps {
  count?: number;
  showTitle?: boolean;
  className?: string;
}

export function ArticleGridSkeleton({
  count = 6,
  showTitle = true,
  className,
}: ArticleGridSkeletonProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-20", className)}>
      {showTitle && (
        <div className="flex items-end justify-between border-b border-jp-gray-200 pb-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-sm bg-jp-blue-100" />
            <Skeleton className="h-8 w-56 rounded bg-jp-gray-200" />
          </div>
          <Skeleton className="h-5 w-24 rounded bg-jp-gray-200" />
        </div>
      )}

      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
