import React from "react";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { BreadcrumbNav } from "@/components/molecules/BreadcrumbNav";
import { cn } from "@/lib/utils";

export interface CloseLookingTemplateProps {
  artworkTitle: string;
  children: React.ReactNode;
  className?: string;
}

export function CloseLookingTemplate({
  artworkTitle,
  children,
  className,
}: CloseLookingTemplateProps) {
  return (
    <MainPublicLayout>
      <div className="border-b border-jp-gray-300 bg-white py-5">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <BreadcrumbNav
            items={[
              { label: "Seniman", href: "/seniman" },
              { label: "Close Looking" },
              { label: artworkTitle },
            ]}
          />
        </div>
      </div>

      <section className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10 lg:py-16", className)}>
        {children}
      </section>
    </MainPublicLayout>
  );
}
