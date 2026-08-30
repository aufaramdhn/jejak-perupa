import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface MetricCardSkeletonProps {
  count?: number;
  className?: string;
}

export function MetricCardSkeleton({ count = 3, className }: MetricCardSkeletonProps) {
  const gridColsClass =
    count === 3
      ? "grid gap-6 sm:grid-cols-3 font-sans"
      : count === 2
      ? "grid gap-6 sm:grid-cols-2 font-sans"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4 font-sans";

  return (
    <div className={cn(gridColsClass, className)}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-9 w-9 rounded-lg" />
          </div>
          <Skeleton className="mt-3 h-8 w-16 rounded-md" />
          <Skeleton className="mt-1.5 h-3.5 w-40 rounded-sm" />
        </div>
      ))}
    </div>
  );
}
