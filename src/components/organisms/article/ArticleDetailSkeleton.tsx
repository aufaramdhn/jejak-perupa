import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface ArticleDetailSkeletonProps {
  className?: string;
}

export function ArticleDetailSkeleton({ className }: ArticleDetailSkeletonProps) {
  return (
    <div aria-label="Memuat naskah artikel" className={cn("w-full font-sans", className)}>
      {/* HEADER SECTION SKELETON */}
      <section className="border-b border-jp-gray-300 bg-gradient-to-b from-jp-blue-50/60 via-jp-paper to-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 pt-2">
              <Skeleton className="h-6 w-24 rounded-full bg-jp-blue-100" />
              <Skeleton className="h-6 w-32 rounded-full bg-jp-gray-200" />
            </div>

            {/* Title */}
            <Skeleton className="h-10 w-full rounded bg-jp-gray-300" />
            <Skeleton className="h-10 w-4/5 rounded bg-jp-gray-300" />

            {/* Excerpt */}
            <Skeleton className="mt-4 h-5 w-full rounded" />
            <Skeleton className="h-5 w-3/4 rounded" />

            {/* Author Meta */}
            <div className="flex items-center gap-4 pt-6 border-t border-jp-gray-200">
              <Skeleton variant="circle" className="h-12 w-12" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3.5 w-44 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BODY & SIDEBAR SKELETON */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          {/* Main Article Content */}
          <div className="max-w-3xl space-y-6">
            {/* Featured Image */}
            <Skeleton className="aspect-[16/9] w-full rounded-xl" />

            {/* Paragraph Blocks */}
            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
              <Skeleton className="h-4 w-full rounded" />
            </div>

            <Skeleton className="h-7 w-1/2 rounded pt-2" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-11/12 rounded" />
              <Skeleton className="h-4 w-4/5 rounded" />
            </div>

            {/* Callout Box Skeleton */}
            <div className="rounded-xl border border-jp-blue-200 bg-jp-blue-50/40 p-6 space-y-3">
              <Skeleton className="h-4 w-36 rounded bg-jp-blue-200" />
              <Skeleton className="h-4 w-full rounded bg-jp-blue-200/70" />
              <Skeleton className="h-4 w-3/4 rounded bg-jp-blue-200/70" />
            </div>
          </div>

          {/* Sidebar TOC & Info */}
          <div className="space-y-6">
            <div className="rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs space-y-4">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-6 w-4/5 rounded" />
              <div className="space-y-2.5 pt-2">
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-5/6 rounded" />
                <Skeleton className="h-3.5 w-4/5 rounded" />
              </div>
            </div>

            <div className="rounded-xl border border-jp-lime/40 bg-jp-lime/10 p-6 space-y-3">
              <Skeleton className="h-4 w-20 rounded bg-jp-lime/60" />
              <Skeleton className="h-3.5 w-full rounded bg-jp-lime/40" />
              <Skeleton className="h-3.5 w-4/5 rounded bg-jp-lime/40" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
