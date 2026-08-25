import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface AdminChartSkeletonProps {
  className?: string;
}

export function AdminChartSkeleton({ className }: AdminChartSkeletonProps) {
  return (
    <div
      aria-label="Memuat grafik analitik"
      className={cn("space-y-6 font-sans", className)}
    >
      {/* 2 MINI SUMMARY METRICS SKELETON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-jp-gray-200 bg-jp-paper/40 p-4 space-y-2">
          <Skeleton className="h-3 w-36 rounded" />
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-8 w-24 rounded bg-jp-blue-100" />
            <Skeleton className="h-3.5 w-20 rounded" />
          </div>
        </div>

        <div className="rounded-lg border border-jp-gray-200 bg-jp-paper/40 p-4 space-y-2">
          <Skeleton className="h-3 w-40 rounded" />
          <div className="flex items-baseline gap-2">
            <Skeleton className="h-8 w-24 rounded bg-jp-brown-100" />
            <Skeleton className="h-3.5 w-20 rounded" />
          </div>
        </div>
      </div>

      {/* SVG CANVAS PLACEHOLDER SKELETON */}
      <div className="rounded-xl border border-jp-gray-200 bg-jp-paper/30 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-jp-gray-200/80 pb-3">
          <Skeleton className="h-4 w-32 rounded" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
        </div>

        <div className="h-48 md:h-64 flex flex-col justify-between py-2">
          <Skeleton className="h-1 w-full rounded bg-jp-gray-200/60" />
          <Skeleton className="h-1 w-full rounded bg-jp-gray-200/60" />
          <Skeleton className="h-1 w-full rounded bg-jp-gray-200/60" />
          <Skeleton className="h-1 w-full rounded bg-jp-gray-200/60" />
          <div className="flex justify-between pt-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-10 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
