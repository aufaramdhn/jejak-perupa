import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface RichEditorSkeletonProps {
  className?: string;
  rows?: number;
}

export function RichEditorSkeleton({ className }: RichEditorSkeletonProps) {
  return (
    <div
      aria-label="Memuat editor teks"
      className={cn(
        "rounded-lg border border-jp-gray-300 bg-white overflow-hidden font-sans",
        className
      )}
    >
      {/* Toolbar Skeleton */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-jp-gray-200 bg-jp-paper/80 p-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-7 rounded-md bg-jp-gray-200" />
        ))}
      </div>

      {/* Editor Body Skeleton */}
      <div className="p-4 space-y-3 bg-white">
        <Skeleton className="h-4 w-3/4 rounded bg-jp-gray-100" />
        <Skeleton className="h-4 w-5/6 rounded bg-jp-gray-100" />
        <Skeleton className="h-4 w-2/3 rounded bg-jp-gray-100" />
        <Skeleton className="h-20 w-full rounded bg-jp-gray-100" />
      </div>
    </div>
  );
}
