import React from "react";
import { User, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AuthorMetaProps {
  authorName?: string;
  publishDate?: string;
  readTime?: string;
  versionLabel?: string;
  className?: string;
}

export function AuthorMeta({
  authorName = "Jejak Perupa",
  publishDate = "Arsip 2017",
  readTime = "8 menit membaca",
  versionLabel = "Versi arsip",
  className,
}: AuthorMetaProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-jp-gray-500",
        className
      )}
    >
      <div className="flex items-center gap-1.5 font-medium text-jp-gray-700">
        <User className="h-3.5 w-3.5 text-jp-blue-700" />
        <span>{authorName}</span>
      </div>
      <span>•</span>
      <div className="flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5" />
        <span>{publishDate}</span>
      </div>
      <span>•</span>
      <div className="flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" />
        <span>{readTime}</span>
      </div>
      {versionLabel && (
        <>
          <span>•</span>
          <span className="rounded bg-jp-gray-100 px-2 py-0.5 font-mono text-[10px]">
            {versionLabel}
          </span>
        </>
      )}
    </div>
  );
}
