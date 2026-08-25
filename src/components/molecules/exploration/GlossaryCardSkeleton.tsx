import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface GlossaryCardSkeletonProps {
  className?: string;
}

export function GlossaryCardSkeleton({ className }: GlossaryCardSkeletonProps) {
  return (
    <div
      aria-label="Memuat istilah kamus"
      className={cn(
        "h-full flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs font-sans",
        className
      )}
    >
      <div className="flex flex-1 flex-col space-y-3">
        {/* Header Badge & Phonetic placeholder */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full bg-jp-blue-100" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>

        {/* Term Heading */}
        <Skeleton className="h-6 w-3/5 rounded bg-jp-gray-300" />

        {/* Definition Lines */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-11/12 rounded" />
          <Skeleton className="h-3.5 w-4/5 rounded" />
        </div>

        {/* Reference Slot */}
        <div className="pt-2">
          <Skeleton className="h-8 w-full rounded-lg bg-jp-paper" />
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-6 pt-4 border-t border-jp-gray-100">
        <Skeleton className="h-4 w-28 rounded" />
      </div>
    </div>
  );
}
