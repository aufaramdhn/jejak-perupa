import React from "react";
import { NavbarHeader } from "@/components/organisms/layout/NavbarHeader";
import { FooterSection } from "@/components/organisms/layout/FooterSection";
import { AuthModal } from "@/components/organisms/exploration/AuthModal";
import { SearchModal } from "@/components/organisms/exploration/SearchModal";
import { ScrollToTopFab } from "@/components/molecules/navigation/ScrollToTopFab";
import { cn } from "@/lib/utils";

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
      <AuthModal />
      <SearchModal />
      <ScrollToTopFab />
    </div>
  );
}
