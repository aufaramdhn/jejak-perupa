import React from "react";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { cn } from "@/lib/utils";

export interface ArticleDetailTemplateProps {
  header: React.ReactNode;
  content: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string;
}

export function ArticleDetailTemplate({
  header,
  content,
  sidebar,
  className,
}: ArticleDetailTemplateProps) {
  return (
    <MainPublicLayout>
      {/* HEADER SECTION */}
      <section className="border-b border-jp-gray-300 bg-gradient-to-b from-jp-blue-50/70 via-jp-paper to-white py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">{header}</div>
      </section>

      {/* CONTENT & SIDEBAR SECTION (CONFINED TO COMFORTABLE 65-75 CHARACTERS PER LINE) */}
      <section className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16", className)}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          {/* MAIN PROSE - LOCKED TO ERGONOMIC READING WIDTH */}
          <article className="min-w-0 max-w-3xl lg:max-w-[720px] font-prose text-lg leading-[1.8] text-jp-gray-700">
            {content}
          </article>

          {/* STICKY SIDEBAR */}
          <aside className="space-y-6 lg:sticky lg:top-28 font-sans">{sidebar}</aside>
        </div>
      </section>
    </MainPublicLayout>
  );
}
