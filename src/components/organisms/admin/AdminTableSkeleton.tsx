import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface AdminTableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function AdminTableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: AdminTableSkeletonProps) {
  return (
    <div
      aria-label="Memuat tabel data"
      className={cn("w-full overflow-hidden rounded-xl border border-jp-gray-300 bg-white font-sans", className)}
    >
      {/* Table Header Skeleton */}
      <div className="flex items-center gap-4 border-b border-jp-gray-200 bg-jp-paper p-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1 rounded bg-jp-gray-300/80" />
        ))}
      </div>

      {/* Table Rows Skeleton */}
      <div className="divide-y divide-jp-gray-100">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex items-center gap-4 p-4">
            {Array.from({ length: columns }).map((_, colIdx) => (
              <Skeleton
                key={colIdx}
                className={cn(
                  "h-4 flex-1 rounded",
                  colIdx === 0 ? "h-5 w-1/3 flex-none" : "bg-jp-gray-200"
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
