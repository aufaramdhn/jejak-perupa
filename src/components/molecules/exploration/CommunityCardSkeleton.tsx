import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface CommunityCardSkeletonProps {
  className?: string;
}

export function CommunityCardSkeleton({ className }: CommunityCardSkeletonProps) {
  return (
    <div
      aria-label="Memuat kartu komunitas seni"
      className={cn(
        "flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs font-sans",
        className
      )}
    >
      <div className="space-y-4">
        {/* Badge & City placeholder */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24 rounded-full bg-jp-brown-100" />
          <Skeleton className="h-4 w-20 rounded" />
        </div>

        {/* Icon & Name Header */}
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" className="h-9 w-9 rounded-lg" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-5 w-4/5 rounded bg-jp-gray-300" />
            <Skeleton className="h-3 w-1/3 rounded" />
          </div>
        </div>

        {/* Description Lines */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-5/6 rounded" />
        </div>
      </div>

      {/* Button placeholder */}
      <div className="mt-6 pt-4 border-t border-jp-gray-100">
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    </div>
  );
}
