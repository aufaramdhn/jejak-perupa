import React from "react";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { cn } from "@/lib/utils";

export interface GlossaryTemplateProps {
  children: React.ReactNode;
  className?: string;
}

export function GlossaryTemplate({
  children,
  className,
}: GlossaryTemplateProps) {
  return (
    <MainPublicLayout>
      <section className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16", className)}>
        {children}
      </section>
    </MainPublicLayout>
  );
}
