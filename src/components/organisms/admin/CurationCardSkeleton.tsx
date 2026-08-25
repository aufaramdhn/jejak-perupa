import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface CurationCardSkeletonProps {
  count?: number;
  className?: string;
}

export function CurationCardSkeleton({ count = 2, className }: CurationCardSkeletonProps) {
  return (
    <div className={cn("space-y-4 font-sans", className)}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          aria-label="Memuat antrean kurasi naskah"
          className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-3/5 rounded bg-jp-gray-300" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-28 rounded" />
                <Skeleton className="h-3.5 w-20 rounded" />
                <Skeleton className="h-3.5 w-24 rounded" />
              </div>
            </div>
            <Skeleton className="h-9 w-36 rounded-lg" />
          </div>

          <div className="space-y-2 border-l-2 border-jp-gray-200 pl-3">
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-5/6 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
