import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface ArticleCardSkeletonProps {
  className?: string;
}

export function ArticleCardSkeleton({ className }: ArticleCardSkeletonProps) {
  return (
    <div
      aria-label="Memuat naskah artikel"
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xs",
        className
      )}
    >
      {/* Thumbnail Aspect Ratio 16:10 */}
      <Skeleton className="aspect-[16/10] w-full bg-jp-gray-200" />

      <div className="flex flex-1 flex-col p-6">
        {/* Category Badge */}
        <Skeleton className="h-5 w-20 rounded-full" />

        {/* Title Lines */}
        <Skeleton className="mt-4 h-6 w-5/6 rounded" />
        <Skeleton className="mt-2 h-6 w-3/5 rounded" />

        {/* Excerpt Lines */}
        <Skeleton className="mt-4 h-4 w-full rounded" />
        <Skeleton className="mt-2 h-4 w-4/5 rounded" />

        {/* Footer Info / Read Time */}
        <div className="mt-6 flex items-center gap-2 border-t border-jp-gray-100 pt-4">
          <Skeleton variant="circle" className="h-3.5 w-3.5" />
          <Skeleton className="h-3.5 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}
