"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Menu,
  X,
  User,
  ChevronDown,
  LogOut,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function NavbarHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const exploreRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { currentUser, isAuthenticated, logout } = useAuth();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/cari?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        exploreRef.current &&
        !exploreRef.current.contains(event.target as Node)
      ) {
        setExploreDropdownOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Active link detection
  const isBerandaActive = pathname === "/";
  const isArtikelActive = pathname.startsWith("/artikel");
  const isSenimanActive = pathname.startsWith("/seniman");
  const isTentangActive = pathname.startsWith("/tentang");
  const isJelajahActive =
    pathname.startsWith("/kamus") ||
    pathname.startsWith("/jalur-belajar") ||
    pathname.startsWith("/peta-seni") ||
    pathname.startsWith("/agenda") ||
    pathname.startsWith("/komunitas");

  // Clean feature list without AI slop icons
  const exploreFeatures = [
    {
      title: "Kamus Istilah Seni A-Z",
      desc: "Ensiklopedia istilah, konsep estetika, dan teknik seni rupa.",
      href: "/kamus",
      active: pathname.startsWith("/kamus"),
    },
    {
      title: "Jalur Belajar Mandiri",
      desc: "Kurikulum bertahap dari pemula hingga analisis seni tingkat lanjut.",
      href: "/jalur-belajar",
      active: pathname.startsWith("/jalur-belajar"),
    },
    {
      title: "Peta Geospasial Seni",
      desc: "Koordinat museum, galeri, monumen, dan sanggar se-Indonesia.",
      href: "/peta-seni",
      active: pathname.startsWith("/peta-seni"),
    },
    {
      title: "Agenda & Pameran Seni",
      desc: "Jadwal pameran, lokakarya, diskusi, dan pendaftaran open call.",
      href: "/agenda",
      active: pathname.startsWith("/agenda"),
    },
    {
      title: "Direktori Komunitas",
      desc: "Basis data kolektif seni dan ruang seni alternatif nusantara.",
      href: "/komunitas",
      active: pathname.startsWith("/komunitas"),
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-jp-gray-300 bg-jp-paper/95 backdrop-blur transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        {/* LOGO IDENTITAS */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-jp-blue-900 font-heading text-sm font-extrabold text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            JP
          </div>

          <div>
            <div className="font-heading text-base font-extrabold tracking-tight text-jp-ink">
              JEJAK PERUPA
            </div>
            <div className="hidden text-[11px] font-medium text-jp-gray-500 sm:block">
              Catatan Perjalanan Pelajar Seni Rupa
            </div>
          </div>
        </Link>

        {/* DESKTOP LEGA NAVIGATION WITH ACTIVE STATES */}
        <nav className="hidden h-full items-center gap-8 lg:gap-10 md:flex">
          {/* BERANDA */}
          <Link
            href="/"
            className={cn(
              "relative flex h-full items-center text-sm font-semibold transition-colors whitespace-nowrap",
              isBerandaActive
                ? "text-jp-blue-900 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-jp-blue-900"
                : "text-jp-gray-700 hover:text-jp-blue-900"
            )}
          >
            Beranda
          </Link>

          {/* ARTIKEL */}
          <Link
            href="/artikel"
            className={cn(
              "relative flex h-full items-center text-sm font-semibold transition-colors whitespace-nowrap",
              isArtikelActive
                ? "text-jp-blue-900 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-jp-blue-900"
                : "text-jp-gray-700 hover:text-jp-blue-900"
            )}
          >
            Artikel
          </Link>

          {/* SENIMAN */}
          <Link
            href="/seniman"
            className={cn(
              "relative flex h-full items-center text-sm font-semibold transition-colors whitespace-nowrap",
              isSenimanActive
                ? "text-jp-blue-900 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-jp-blue-900"
                : "text-jp-gray-700 hover:text-jp-blue-900"
            )}
          >
            Seniman
          </Link>

          {/* JELAJAH FITUR DROPDOWN (FLUSH TO NAVBAR BOTTOM, NO ROUNDED, NO ICONS) */}
          <div className="relative flex h-full items-center" ref={exploreRef}>
            <button
              type="button"
              onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
              className={cn(
                "relative flex h-full items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap",
                isJelajahActive || exploreDropdownOpen
                  ? "text-jp-blue-900 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-jp-blue-900"
                  : "text-jp-gray-700 hover:text-jp-blue-900"
              )}
            >
              <span>Jelajah Fitur</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  exploreDropdownOpen ? "rotate-180 text-jp-blue-900" : "text-jp-gray-400"
                )}
              />
            </button>

            {/* DROPDOWN MENU: FLUSH AT BOTTOM OF NAVBAR, NO ROUNDED, SHARP EDITORIAL STYLE */}
            {exploreDropdownOpen && (
              <div className="absolute left-0 top-full w-72 border border-t-0 border-jp-gray-300 bg-white shadow-xl z-50 rounded-none animate-in fade-in duration-100 divide-y divide-jp-gray-100">
                {exploreFeatures.map((feat) => (
                  <Link
                    key={feat.href}
                    href={feat.href}
                    onClick={() => setExploreDropdownOpen(false)}
                    className={cn(
                      "block px-5 py-3 transition",
                      feat.active
                        ? "bg-jp-blue-50/80 border-l-3 border-jp-blue-900 font-bold"
                        : "hover:bg-jp-paper"
                    )}
                  >
                    <div className="font-heading text-xs font-bold text-jp-ink">
                      {feat.title}
                    </div>
                    <div className="mt-0.5 text-[11px] text-jp-gray-500 line-clamp-1">
                      {feat.desc}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* TENTANG */}
          <Link
            href="/tentang"
            className={cn(
              "relative flex h-full items-center text-sm font-semibold transition-colors whitespace-nowrap",
              isTentangActive
                ? "text-jp-blue-900 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-jp-blue-900"
                : "text-jp-gray-700 hover:text-jp-blue-900"
            )}
          >
            Tentang
          </Link>
        </nav>

        {/* ACTIONS & PROFILE AVATAR */}
        <div className="flex items-center gap-3.5">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Buka pencarian"
            className="h-10 w-10 rounded-full border-jp-gray-300 hover:border-jp-blue-700"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* CIRCULAR PROFILE AVATAR WITH DROPDOWN (FLUSH AT BOTTOM OF NAVBAR, NO ROUNDED) */}
          {isAuthenticated && currentUser ? (
            <div className="relative flex h-full items-center" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="group flex items-center gap-2 rounded-full p-0.5 transition hover:ring-2 hover:ring-jp-blue-700 focus:outline-none cursor-pointer"
                aria-label="Buka menu profil"
              >
                <Avatar
                  src={currentUser.avatarUrl}
                  fallback={currentUser.name.slice(0, 2).toUpperCase()}
                  size="md"
                  className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-jp-gray-300"
                />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-4 w-64 border border-jp-gray-300 bg-white shadow-xl z-50 rounded-none animate-in fade-in duration-100 divide-y divide-jp-gray-100">
                  {/* USER INFO HEADER */}
                  <div className="bg-jp-paper px-4 py-3.5">
                    <div className="font-heading font-bold text-jp-ink text-sm">
                      {currentUser.name}
                    </div>
                    <div className="text-xs text-jp-gray-500 truncate">
                      {currentUser.email}
                    </div>
                    <div className="mt-1.5">
                      <Badge
                        variant={currentUser.role === "ADMIN" ? "brown" : "blue"}
                        size="sm"
                      >
                        {currentUser.roleLabel}
                      </Badge>
                    </div>
                  </div>

                  {/* USER MENU LINKS */}
                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-semibold text-jp-gray-700 hover:bg-jp-paper transition"
                    >
                      Dashboard Belajar
                    </Link>

                    <Link
                      href="/jalur-belajar"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-semibold text-jp-gray-700 hover:bg-jp-paper transition"
                    >
                      Progres Jalur Belajar
                    </Link>

                    <Link
                      href="/dashboard/kontribusi"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-xs font-semibold text-jp-gray-700 hover:bg-jp-paper transition"
                    >
                      Kirim Tulisan Opini
                    </Link>

                    {currentUser.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-bold text-jp-brown-900 bg-jp-brown-50 hover:bg-jp-brown-100 transition"
                      >
                        Panel Kurasi Redaksi
                      </Link>
                    )}
                  </div>

                  {/* LOGOUT */}
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      <span>Keluar (Logout)</span>
                      <LogOut className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/masuk">
              <Button variant="primary" size="sm" className="rounded-full px-5">
                <LogIn className="h-3.5 w-3.5 mr-1.5" />
                Masuk
              </Button>
            </Link>
          )}

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-jp-gray-300 text-jp-ink transition hover:border-jp-blue-700 md:hidden"
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* QUICK SEARCH BAR OVERLAY */}
      {searchOpen && (
        <div className="border-b border-jp-gray-300 bg-white px-6 py-4 shadow-sm">
          <div className="mx-auto max-w-7xl">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul artikel, teori seni, nama seniman, istilah kamus, atau lokasi peta..."
                className="flex-1 rounded-none border border-jp-gray-300 px-4 py-2.5 text-sm text-jp-ink outline-none focus:border-jp-blue-700 focus:ring-2 focus:ring-jp-blue-100"
              />
              <Button type="submit" variant="primary" size="md" className="rounded-none">
                Cari
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="md"
                className="rounded-none"
                onClick={() => setSearchOpen(false)}
              >
                Tutup
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="border-b border-jp-gray-300 bg-white px-6 py-5 md:hidden space-y-4">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-semibold py-2 border-b border-jp-gray-100",
                isBerandaActive ? "text-jp-blue-900 font-bold" : "text-jp-ink"
              )}
            >
              Beranda
            </Link>
            <Link
              href="/artikel"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-semibold py-2 border-b border-jp-gray-100",
                isArtikelActive ? "text-jp-blue-900 font-bold" : "text-jp-ink"
              )}
            >
              Artikel Edukasi
            </Link>
            <Link
              href="/seniman"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-semibold py-2 border-b border-jp-gray-100",
                isSenimanActive ? "text-jp-blue-900 font-bold" : "text-jp-ink"
              )}
            >
              Direktori Seniman
            </Link>
            <Link
              href="/kamus"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-jp-ink py-2 border-b border-jp-gray-100"
            >
              Kamus Istilah Seni A-Z
            </Link>
            <Link
              href="/jalur-belajar"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-jp-ink py-2 border-b border-jp-gray-100"
            >
              Jalur Belajar
            </Link>
            <Link
              href="/peta-seni"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-jp-ink py-2 border-b border-jp-gray-100"
            >
              Peta Seni Nusantara
            </Link>
            <Link
              href="/agenda"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-jp-ink py-2 border-b border-jp-gray-100"
            >
              Agenda & Pameran
            </Link>
            <Link
              href="/komunitas"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-jp-ink py-2 border-b border-jp-gray-100"
            >
              Direktori Komunitas
            </Link>
            <Link
              href="/tentang"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-sm font-semibold py-2 border-b border-jp-gray-100",
                isTentangActive ? "text-jp-blue-900 font-bold" : "text-jp-ink"
              )}
            >
              Tentang Kami & Peru-Chan
            </Link>
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-jp-blue-900 py-2.5"
              >
                Dashboard Profil ({currentUser?.name}) →
              </Link>
            ) : (
              <Link
                href="/masuk"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-jp-blue-900 py-2.5"
              >
                Masuk ke Akun →
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
