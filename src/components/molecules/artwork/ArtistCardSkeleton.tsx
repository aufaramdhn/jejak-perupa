import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface ArtistCardSkeletonProps {
  className?: string;
}

export function ArtistCardSkeleton({ className }: ArtistCardSkeletonProps) {
  return (
    <div
      aria-label="Memuat profil seniman"
      className={cn(
        "flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs font-sans",
        className
      )}
    >
      <div className="space-y-3">
        {/* Movement Badge */}
        <Skeleton className="h-5 w-24 rounded-full bg-jp-brown-100" />

        {/* Artist Name */}
        <Skeleton className="h-7 w-3/4 rounded bg-jp-gray-300" />

        {/* Origin City and Discipline */}
        <Skeleton className="h-3.5 w-1/2 rounded" />

        {/* Short Bio Lines */}
        <div className="space-y-2 pt-2">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-5/6 rounded" />
          <Skeleton className="h-3.5 w-4/5 rounded" />
        </div>
      </div>

      {/* Action Button Skeleton */}
      <div className="mt-6 pt-4 border-t border-jp-gray-100">
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>
    </div>
  );
}
