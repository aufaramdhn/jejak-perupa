"use client";

import React from "react";
import Link from "next/link";
import { useSiteSettings } from "@/lib/siteContext";
import { cn } from "@/lib/utils";

export interface FooterSectionProps {
  className?: string;
  copyrightYear?: number;
}

export function FooterSection({
  className,
  copyrightYear = 2026,
}: FooterSectionProps) {
  const { settings } = useSiteSettings();

  return (
    <footer
      className={cn(
        "border-t border-jp-brown-700 bg-jp-brown-900 text-white font-sans",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* IDENTITAS */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              {settings.logoImageUrl ? (
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={settings.logoImageUrl}
                    alt={settings.siteName}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-jp-lime font-heading font-extrabold text-jp-ink text-xs">
                  {settings.logoInitials || "JP"}
                </div>
              )}
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                {settings.siteName}
              </span>
            </div>
            {/* Natural Title Case without all-caps AI slop */}
            <p className="text-xs text-jp-brown-100/70 font-medium">
              {settings.siteTagline}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-jp-brown-100/90 pt-1 font-prose">
              {settings.footerDescription}
            </p>
          </div>

          {/* NAVIGASI MATERI */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-jp-lime">
              Eksplorasi Materi
            </div>
            <ul className="space-y-2 text-sm text-jp-brown-100/90">
              <li>
                <Link href="/artikel" className="hover:text-white transition-colors">
                  Katalog Artikel
                </Link>
              </li>
              <li>
                <Link href="/seniman" className="hover:text-white transition-colors">
                  Direktori Seniman
                </Link>
              </li>
              <li>
                <Link href="/kamus" className="hover:text-white transition-colors">
                  Kamus Istilah Seni A-Z
                </Link>
              </li>
              <li>
                <Link href="/jalur-belajar" className="hover:text-white transition-colors">
                  Jalur Belajar Mandiri
                </Link>
              </li>
            </ul>
          </div>

          {/* EKOSISTEM */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-jp-lime">
              Ekosistem Seni
            </div>
            <ul className="space-y-2 text-sm text-jp-brown-100/90">
              <li>
                <Link href="/peta-seni" className="hover:text-white transition-colors">
                  Peta Seni Nusantara
                </Link>
              </li>
              <li>
                <Link href="/agenda" className="hover:text-white transition-colors">
                  Agenda & Pameran
                </Link>
              </li>
              <li>
                <Link href="/komunitas" className="hover:text-white transition-colors">
                  Komunitas Seni
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard Belajar
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs text-jp-brown-100/70 sm:flex-row sm:items-center">
          <div>
            © {copyrightYear} Jejak Perupa. Seluruh hak cipta dilindungi undang-undang.
          </div>
          <div className="font-semibold text-jp-lime/80">
            Belajar Seni · Meninggalkan Jejak
          </div>
        </div>
      </div>
    </footer>
  );
}
