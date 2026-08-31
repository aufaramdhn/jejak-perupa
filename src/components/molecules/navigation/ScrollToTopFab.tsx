"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ScrollToTopFabProps {
  threshold?: number;
  className?: string;
}

export function ScrollToTopFab({
  threshold = 300,
  className,
}: ScrollToTopFabProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke bagian atas halaman"
      title="Kembali ke atas"
      className={cn(
        "fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-jp-blue-900 text-white shadow-xl ring-2 ring-white/80 transition-all duration-200 hover:bg-jp-blue-700 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer animate-in fade-in zoom-in-75",
        className
      )}
    >
      <ArrowUp className="h-5 w-5 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
