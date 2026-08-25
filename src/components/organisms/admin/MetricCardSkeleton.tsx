import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface MetricCardSkeletonProps {
  count?: number;
  className?: string;
}

export function MetricCardSkeleton({ count = 4, className }: MetricCardSkeletonProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-sans", className)}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-jp-gray-300 bg-white p-5 shadow-2xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton variant="circle" className="h-8 w-8" />
          </div>
          <Skeleton className="h-8 w-16 rounded bg-jp-gray-300" />
          <Skeleton className="h-3.5 w-32 rounded" />
        </div>
      ))}
    </div>
  );
}
