"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useModal } from "@/lib/modalContext";
import { useSiteSettings } from "@/lib/siteContext";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  LayoutDashboard,
  FileText,
  Users,
  Eye,
  Sparkles,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Plus,
  Compass,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Layers,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  exact?: boolean;
  badge?: string;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

export function AdminLayout({
  children,
  title,
  subtitle,
  actionButton,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const { confirm, alert } = useModal();
  const { settings } = useSiteSettings();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const confirmed = await confirm({
      title: "Konfirmasi Keluar dari Panel Admin",
      message: "Apakah Anda yakin ingin mengakhiri sesi kurator redaksi saat ini?",
      confirmLabel: "Ya, Keluar",
      cancelLabel: "Batal",
      variant: "danger",
      iconType: "logout",
    });

    if (confirmed) {
      logout();
      await alert({
        title: "Sesi Admin Ditutup",
        message: "Anda telah keluar dari panel editorial Jejak Perupa.",
        type: "info",
      });
      router.push("/");
    }
  };

  const navSections: NavSection[] = [
    {
      group: "Utama",
      items: [
        {
          label: "Ringkasan & Analitik",
          href: "/admin",
          icon: <LayoutDashboard className="h-4 w-4" />,
          exact: true,
        },
        {
          label: "Meja Kurasi Naskah",
          href: "/admin/kurasi",
          icon: <Eye className="h-4 w-4" />,
          badge: "2 Baru",
        },
      ],
    },
    {
      group: "Manajemen Konten",
      items: [
        {
          label: "Katalog Artikel",
          href: "/admin/artikel",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          label: "Direktori Seniman",
          href: "/admin/seniman",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
    {
      group: "Konfigurasi & Sistem",
      items: [
        {
          label: "Pengaturan & Peru-Chan",
          href: "/admin/pengaturan",
          icon: <Sparkles className="h-4 w-4" />,
        },
        {
          label: "Manajemen Rilis",
          href: "/admin/rilis",
          icon: <SlidersHorizontal className="h-4 w-4" />,
        },
      ],
    },
  ];

  const isLinkActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="h-screen w-full bg-jp-paper flex flex-col lg:flex-row font-sans text-jp-ink antialiased overflow-hidden">
      {/* MOBILE TOPBAR */}
      <header className="lg:hidden shrink-0 flex h-16 items-center justify-between border-b border-jp-gray-300 bg-white px-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Buka navigasi admin"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-jp-gray-300 text-jp-ink hover:bg-jp-paper transition cursor-pointer"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-jp-blue-900 font-heading text-xs font-bold text-white">
              {settings.logoInitials || "JP"}
            </div>
            <span className="font-heading text-sm font-bold text-jp-ink">
              Panel Admin
            </span>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-xs font-bold text-jp-blue-700 hover:text-jp-blue-900"
        >
          <span>Web Publik</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </header>

      {/* MOBILE BACKDROP */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* DEDICATED ADMIN SIDEBAR (FIXED TO VIEWPORT HEIGHT) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 flex flex-col justify-between border-r border-jp-gray-300 bg-white transition-transform duration-200",
          "lg:static lg:h-screen lg:shrink-0 lg:translate-x-0",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* SIDEBAR TOP: BRAND IDENTITY & STATUS */}
        <div className="flex flex-col shrink-0">
          <div className="flex h-20 items-center justify-between border-b border-jp-gray-200 px-6">
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-jp-blue-900 font-heading text-sm font-bold text-white shadow-xs transition group-hover:scale-105">
                {settings.logoInitials || "JP"}
              </div>
              <div>
                <div className="font-heading text-sm font-bold tracking-tight text-jp-ink">
                  {settings.siteName || "JEJAK PERUPA"}
                </div>
                <div className="text-[10px] font-mono font-medium text-jp-gray-500 uppercase tracking-wider">
                  Panel Kurasi Redaksi
                </div>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-jp-gray-400 hover:text-jp-ink p-1 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* EDITORIAL STATUS STRIP */}
          <div className="px-6 py-2.5 border-b border-jp-gray-100 bg-jp-paper/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-green-600 animate-pulse" />
              <span className="text-[11px] font-bold text-jp-gray-700">
                Mode Editorial Aktif
              </span>
            </div>
            <Badge variant="blue" size="sm">
              v1.2.0
            </Badge>
          </div>
        </div>

        {/* SIDEBAR SCROLLABLE NAVIGATION LIST */}
        <nav className="flex-1 overflow-y-auto space-y-6 px-4 py-5">
          {navSections.map((section) => (
            <div key={section.group} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-jp-gray-400 font-mono">
                {section.group}
              </div>

              <div className="space-y-1 pt-1">
                {section.items.map((item) => {
                  const active = isLinkActive(item.href, item.exact);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3.5 py-2.5 text-xs font-bold transition-all",
                        active
                          ? "bg-jp-blue-900 text-white shadow-xs"
                          : "text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={cn(active ? "text-white" : "text-jp-gray-500")}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.5 text-[10px] font-mono font-bold",
                            active
                              ? "bg-white text-jp-blue-900"
                              : "bg-jp-blue-100 text-jp-blue-900"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* SIDEBAR FOOTER: PINNED AT BOTTOM */}
        <div className="shrink-0 border-t border-jp-gray-200 p-4 space-y-3 bg-white">
          {/* QUICK PUBLIC LINK */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-lg border border-jp-gray-200 bg-jp-paper/60 px-3 py-2 text-xs font-bold text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900 transition"
          >
            <div className="flex items-center gap-2">
              <Compass className="h-3.5 w-3.5 text-jp-blue-700" />
              <span>Buka Website Publik</span>
            </div>
            <ExternalLink className="h-3 w-3 text-jp-gray-400" />
          </Link>

          {/* ADMIN PROFILE INFO & LOGOUT */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-jp-gray-100">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar
                fallback="SN"
                size="sm"
                className="h-8 w-8 border border-jp-gray-300 ring-1 ring-jp-blue-200"
              />
              <div className="min-w-0">
                <div className="truncate text-xs font-bold text-jp-ink">
                  {currentUser?.name || "Siti Nurhaliza"}
                </div>
                <div className="text-[10px] font-mono text-jp-gray-500">
                  Kurator Redaksi
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Keluar dari Panel Admin"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE CANVAS */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* DESKTOP WORKSPACE TOPBAR */}
        <header className="hidden lg:flex h-16 shrink-0 items-center justify-between border-b border-jp-gray-300 bg-white px-8">
          {/* BREADCRUMB TITLE */}
          <div className="flex items-center gap-2 text-xs text-jp-gray-500">
            <Link href="/admin" className="hover:text-jp-ink font-semibold">
              Panel Admin
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-jp-gray-400" />
            <span className="font-bold text-jp-ink">
              {title || "Ringkasan & Analitik Platform"}
            </span>
          </div>

          {/* RIGHT SHORTCUTS & CTAs */}
          <div className="flex items-center gap-3">
            <Link href="/admin/artikel/tulis">
              <Button variant="outline" size="sm" className="rounded-lg">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Tulis Artikel Baru
              </Button>
            </Link>

            <Link href="/" target="_blank">
              <Button variant="primary" size="sm" className="rounded-lg">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Pratinjau Live Situs
              </Button>
            </Link>
          </div>
        </header>

        {/* WORKSPACE PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 space-y-8">
          {/* OPTIONAL PAGE HEADER BANNER */}
          {(title || actionButton) && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jp-gray-300 pb-5">
              <div>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-jp-ink">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1 text-xs md:text-sm text-jp-gray-600 font-prose">
                    {subtitle}
                  </p>
                )}
              </div>

              {actionButton && <div>{actionButton}</div>}
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
}
