import React from "react";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface TimelineItemProps {
  year: number;
  title: string;
  description: string;
  isLast?: boolean;
  className?: string;
}

export function TimelineItem({
  year,
  title,
  description,
  isLast = false,
  className,
}: TimelineItemProps) {
  return (
    <div className={cn("relative flex gap-6", className)}>
      {/* TIMELINE STEM */}
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-jp-blue-900 font-heading text-xs font-bold text-white shadow-sm ring-4 ring-jp-blue-100">
          {year}
        </div>
        {!isLast && (
          <div className="w-0.5 grow bg-jp-gray-300 my-2" />
        )}
      </div>

      {/* TIMELINE BODY */}
      <div className="pb-8 min-w-0 flex-1">
        <div className="rounded-2xl border border-jp-gray-300 bg-white p-5 shadow-sm transition-all hover:border-jp-blue-700 hover:shadow-jp-card">
          <span className="font-mono text-xs font-bold text-jp-blue-700 uppercase tracking-widest">
            Tahun {year}
          </span>
          <Heading3 className="mt-1 text-base md:text-lg text-jp-ink">{title}</Heading3>
          <Paragraph className="mt-2 text-sm text-jp-gray-700 leading-relaxed">
            {description}
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
