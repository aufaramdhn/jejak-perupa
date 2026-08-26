import React from "react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { cn } from "@/lib/utils";

export interface AdminSettingsSkeletonProps {
  className?: string;
  activeTab?: "slideshow" | "quotes" | "branding" | "editorial";
  hideTabsNav?: boolean;
}

export function AdminSettingsSkeleton({
  className,
  activeTab = "slideshow",
  hideTabsNav = true,
}: AdminSettingsSkeletonProps) {
  return (
    <div
      aria-label="Memuat pengaturan situs"
      className={cn("space-y-6 font-sans", className)}
    >
      {/* OPTIONAL TABS NAVIGATION SKELETON (FOR INITIAL PAGE LOAD) */}
      {!hideTabsNav && (
        <div className="flex flex-wrap items-center gap-2 border-b border-jp-gray-200 pb-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn(
                "h-10 rounded-xl",
                i === 0 ? "w-48 bg-jp-blue-200/80" : "w-36 bg-jp-gray-200/70"
              )}
            />
          ))}
        </div>
      )}

      {/* TAB CONTENT CONTAINER SKELETON */}
      <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6 animate-pulse">
        {/* SECTION HEADER SKELETON */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jp-gray-100 pb-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-64 rounded-md bg-jp-gray-300/80" />
            <Skeleton className="h-3.5 w-96 max-w-full rounded bg-jp-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-28 rounded-lg bg-jp-gray-200" />
            <Skeleton className="h-9 w-36 rounded-lg bg-jp-blue-200/80" />
          </div>
        </div>

        {/* TAB 1: SLIDESHOW KARAKTER (4 MASCOT CARDS) */}
        {activeTab === "slideshow" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-jp-gray-200 bg-jp-paper/40 p-4 space-y-3"
              >
                <div className="space-y-3">
                  {/* IMAGE PLACEHOLDER */}
                  <div className="relative flex h-36 w-full items-center justify-center rounded-lg bg-white border border-jp-gray-200">
                    <Skeleton className="h-24 w-24 rounded-lg bg-jp-gray-200" />
                    <Skeleton className="absolute top-2 left-2 h-4 w-6 rounded bg-jp-gray-300" />
                    <Skeleton className="absolute top-2 right-2 h-4 w-12 rounded bg-jp-gray-300" />
                  </div>

                  {/* METADATA LINES */}
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20 rounded bg-jp-gray-200" />
                    <Skeleton className="h-4 w-36 rounded bg-jp-gray-300" />
                    <Skeleton className="h-3 w-full rounded bg-jp-gray-200" />
                    <Skeleton className="h-3 w-4/5 rounded bg-jp-gray-200" />
                  </div>
                </div>

                {/* CARD ACTION BUTTONS */}
                <div className="flex items-center justify-end gap-1.5 border-t border-jp-gray-200/60 pt-3">
                  <Skeleton className="h-7 w-7 rounded-md bg-jp-gray-200" />
                  <Skeleton className="h-7 w-7 rounded-md bg-jp-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: LIBRARY QUOTES & TIPS */}
        {activeTab === "quotes" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-5 space-y-4 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-jp-gray-100 pb-2.5">
                  <Skeleton className="h-5 w-32 rounded bg-jp-blue-100" />
                  <Skeleton className="h-5 w-20 rounded bg-green-100" />
                </div>
                <div className="flex items-start gap-4">
                  <Skeleton className="h-16 w-16 rounded-lg bg-jp-gray-200 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full rounded bg-jp-gray-300" />
                    <Skeleton className="h-4 w-5/6 rounded bg-jp-gray-200" />
                    <Skeleton className="h-3.5 w-3/4 rounded bg-jp-gray-200" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-jp-gray-100 pt-3">
                  <Skeleton className="h-3 w-16 rounded bg-jp-gray-200" />
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="h-7 w-7 rounded-md bg-jp-gray-200" />
                    <Skeleton className="h-7 w-7 rounded-md bg-jp-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: BRANDING, LOGO, & FAVICON */}
        {activeTab === "branding" && (
          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded bg-jp-gray-300" />
                <Skeleton className="h-10 w-full rounded-lg bg-jp-gray-200" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded bg-jp-gray-300" />
                <Skeleton className="h-10 w-full rounded-lg bg-jp-gray-200" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 pt-2 border-t border-jp-gray-100">
              <div className="space-y-2">
                <Skeleton className="h-4 w-36 rounded bg-jp-gray-300" />
                <Skeleton className="h-32 w-full rounded-xl bg-jp-gray-200" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-36 rounded bg-jp-gray-300" />
                <Skeleton className="h-32 w-full rounded-xl bg-jp-gray-200" />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-jp-gray-100">
              <Skeleton className="h-10 w-44 rounded-lg bg-jp-blue-200/80" />
            </div>
          </div>
        )}

        {/* TAB 4: TEKS EDITORIAL HALAMAN */}
        {activeTab === "editorial" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded bg-jp-gray-300" />
              <Skeleton className="h-10 w-full rounded-lg bg-jp-gray-200" />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded bg-jp-gray-300" />
                <Skeleton className="h-24 w-full rounded-lg bg-jp-gray-200" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded bg-jp-gray-300" />
                <Skeleton className="h-24 w-full rounded-lg bg-jp-gray-200" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-44 rounded bg-jp-gray-300" />
              <Skeleton className="h-24 w-full rounded-lg bg-jp-gray-200" />
            </div>

            <div className="flex justify-end pt-4 border-t border-jp-gray-100">
              <Skeleton className="h-10 w-44 rounded-lg bg-jp-blue-200/80" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
