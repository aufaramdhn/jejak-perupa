import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface EventCardSkeletonProps {
  className?: string;
}

export function EventCardSkeleton({ className }: EventCardSkeletonProps) {
  return (
    <div
      aria-label="Memuat agenda acara seni"
      className={cn(
        "flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs font-sans",
        className
      )}
    >
      <div className="space-y-3">
        {/* Badge & Date placeholder */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full bg-jp-blue-100" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>

        {/* Event Title */}
        <Skeleton className="h-6 w-4/5 rounded bg-jp-gray-300" />

        {/* Organizer info */}
        <Skeleton className="h-4 w-1/2 rounded" />

        {/* Description */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-5/6 rounded" />
        </div>
      </div>

      {/* Footer Location & Action */}
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-jp-gray-100">
        <Skeleton className="h-4 w-36 rounded" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
}
