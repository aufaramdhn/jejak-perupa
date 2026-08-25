import React from "react";
import { NavbarHeader } from "@/components/organisms/NavbarHeader";
import { FooterSection } from "@/components/organisms/FooterSection";
import { AuthModal } from "@/components/organisms/AuthModal";
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
    <div className="flex min-h-screen flex-col bg-jp-paper text-jp-ink">
      <NavbarHeader />
      <main className={cn("flex-1", className)}>{children}</main>
      <FooterSection />
      <AuthModal />
    </div>
  );
}
