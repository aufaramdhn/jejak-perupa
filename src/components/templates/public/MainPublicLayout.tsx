import React from "react";
import dynamic from "next/dynamic";
import { NavbarHeader } from "@/components/organisms/layout/NavbarHeader";
import { FooterSection } from "@/components/organisms/layout/FooterSection";
import { ScrollToTopFab } from "@/components/molecules/navigation/ScrollToTopFab";
import { cn } from "@/lib/utils";

// Code-split heavy interactive dialogs to reduce initial JS payload on mobile
const AuthModal = dynamic(
  () =>
    import("@/components/organisms/exploration/AuthModal").then(
      (mod) => mod.AuthModal
    )
);

const SearchModal = dynamic(
  () =>
    import("@/components/organisms/exploration/SearchModal").then(
      (mod) => mod.SearchModal
    )
);

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
