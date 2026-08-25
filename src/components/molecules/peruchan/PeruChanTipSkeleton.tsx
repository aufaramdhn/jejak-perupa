import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface PeruChanTipSkeletonProps {
  className?: string;
}

export function PeruChanTipSkeleton({ className }: PeruChanTipSkeletonProps) {
  return (
    <div
      aria-label="Memuat tips Peru-Chan"
      className={cn(
        "mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 pb-16 lg:pb-20 font-sans",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-xl border border-jp-blue-200 bg-jp-blue-50/50 p-6 md:p-8 shadow-xs">
        <div className="grid items-center gap-6 sm:grid-cols-[100px_1fr]">
          {/* Mascot Placeholder */}
          <div className="flex justify-center shrink-0">
            <Skeleton variant="circle" className="h-20 w-20 bg-jp-blue-200" />
          </div>

          {/* Text Lines */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-36 rounded bg-jp-blue-200" />
            <Skeleton className="h-5 w-full rounded bg-jp-blue-200/80" />
            <Skeleton className="h-5 w-4/5 rounded bg-jp-blue-200/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
