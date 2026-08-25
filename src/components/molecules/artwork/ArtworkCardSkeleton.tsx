import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface ArtworkCardSkeletonProps {
  className?: string;
}

export function ArtworkCardSkeleton({ className }: ArtworkCardSkeletonProps) {
  return (
    <div
      aria-label="Memuat kartu karya seni"
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xs",
        className
      )}
    >
      {/* Thumbnail Aspect Ratio 4:3 */}
      <Skeleton className="aspect-[4/3] w-full bg-jp-gray-200" />

      <div className="flex flex-1 flex-col p-6 font-sans">
        {/* Year and Material Info */}
        <div className="flex items-center gap-2">
          <Skeleton variant="circle" className="h-3.5 w-3.5" />
          <Skeleton className="h-3.5 w-12 rounded" />
          <Skeleton className="h-3.5 w-20 rounded" />
        </div>

        {/* Title */}
        <Skeleton className="mt-3 h-6 w-3/4 rounded" />

        {/* Artist Name */}
        <Skeleton className="mt-2 h-4 w-1/2 rounded" />

        {/* Location Info */}
        <div className="mt-4 flex items-center gap-2 border-t border-jp-gray-100 pt-3">
          <Skeleton variant="circle" className="h-3.5 w-3.5" />
          <Skeleton className="h-3.5 w-32 rounded" />
        </div>

        {/* Action Button */}
        <Skeleton className="mt-5 h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}
