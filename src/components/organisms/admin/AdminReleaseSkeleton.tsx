import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface AdminReleaseSkeletonProps {
  className?: string;
}

export function AdminReleaseSkeleton({ className }: AdminReleaseSkeletonProps) {
  return (
    <div
      aria-label="Memuat manajemen rilis"
      className={cn("space-y-8 font-sans", className)}
    >
      {/* STATUS BANNER SKELETON */}
      <div className="rounded-xl border border-jp-blue-300 bg-gradient-to-r from-jp-blue-900 to-jp-ink p-6 text-white shadow-xs space-y-3">
        <Skeleton className="h-5 w-48 rounded-md bg-white/20" />
        <Skeleton className="h-7 w-80 max-w-full rounded bg-white/30" />
        <Skeleton className="h-4 w-96 max-w-full rounded bg-white/20" />
      </div>

      {/* PRESET SELECTOR GRID SKELETON */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-56 rounded bg-jp-gray-300" />
          <Skeleton className="h-4 w-40 rounded bg-jp-gray-200" />
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-jp-gray-200 bg-white p-4 space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-16 rounded bg-jp-gray-300" />
                <Skeleton className="h-4 w-12 rounded bg-jp-gray-200" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28 rounded bg-jp-gray-300" />
                <Skeleton className="h-3 w-full rounded bg-jp-gray-200" />
                <Skeleton className="h-3 w-4/5 rounded bg-jp-gray-200" />
              </div>
              <Skeleton className="h-8 w-full rounded-lg bg-jp-gray-200" />
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE GROUPS SKELETON */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-jp-gray-200 pb-3">
          <Skeleton className="h-6 w-64 rounded bg-jp-gray-300" />
          <Skeleton className="h-4 w-32 rounded bg-jp-gray-200" />
        </div>

        {Array.from({ length: 3 }).map((_, groupIdx) => (
          <div
            key={groupIdx}
            className="rounded-xl border border-jp-gray-200 bg-white shadow-2xs overflow-hidden"
          >
            {/* GROUP HEADER SKELETON */}
            <div className="flex items-center justify-between p-4 border-b border-jp-gray-100 bg-jp-paper/60">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-lg bg-jp-gray-300" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-44 rounded bg-jp-gray-300" />
                  <Skeleton className="h-3 w-28 rounded bg-jp-gray-200" />
                </div>
              </div>
              <Skeleton className="h-5 w-24 rounded bg-jp-gray-200" />
            </div>

            {/* FEATURE ROWS SKELETON */}
            <div className="divide-y divide-jp-gray-100 p-2">
              {Array.from({ length: 3 }).map((_, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex items-center justify-between p-3.5 gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Skeleton className="h-8 w-8 rounded-lg bg-jp-gray-200 shrink-0" />
                    <div className="space-y-1 min-w-0">
                      <Skeleton className="h-4 w-40 rounded bg-jp-gray-300" />
                      <Skeleton className="h-3 w-64 max-w-full rounded bg-jp-gray-200" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-11 rounded-full bg-jp-gray-300 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
