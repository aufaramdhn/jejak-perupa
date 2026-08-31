import React from "react";
import dynamic from "next/dynamic";
import { NavbarHeader } from "@/components/organisms/layout/NavbarHeader";
import { FooterSection } from "@/components/organisms/layout/FooterSection";
import { ScrollToTopFab } from "@/components/molecules/navigation/ScrollToTopFab";
import { cn } from "@/lib/utils";

import { GlobalModalsContainer } from "@/components/organisms/exploration/GlobalModalsContainer";

export interface MainPublicLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainPublicLayout({
  children,
  className,
}: MainPublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-jp-paper text-jp-ink overflow-x-hidden w-full max-w-full relative">
      <NavbarHeader />
      <main className={cn("flex-1 w-full max-w-full", className)}>{children}</main>
      <FooterSection />
      <GlobalModalsContainer />
      <ScrollToTopFab />
    </div>
  );
}
