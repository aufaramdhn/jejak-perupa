import React from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { Heading2, Paragraph, SectionLabel } from "@/components/atoms/Typography";
import { LayoutDashboard, FileText, Users, Eye, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminDashboardTemplateProps {
  children: React.ReactNode;
  activeTab?: "overview" | "articles" | "artists" | "submissions" | "settings";
  className?: string;
}

export function AdminDashboardTemplate({
  children,
  activeTab = "overview",
  className,
}: AdminDashboardTemplateProps) {
  const navItems = [
    { id: "overview", label: "Ringkasan", icon: <LayoutDashboard className="h-4 w-4" />, href: "/admin" },
    { id: "submissions", label: "Meja Kurasi Naskah", icon: <Eye className="h-4 w-4" />, href: "/admin#kurasi" },
    { id: "articles", label: "Katalog Artikel", icon: <FileText className="h-4 w-4" />, href: "/admin#artikel" },
    { id: "settings", label: "Pengaturan Situs & Peru-Chan", icon: <Sparkles className="h-4 w-4" />, href: "/admin/pengaturan" },
  ];

  return (
    <MainPublicLayout>
      <div className="border-b border-jp-gray-300 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionLabel>Panel Editorial</SectionLabel>
          <Heading2 className="mt-2 text-jp-ink text-3xl">Dashboard Kurasi & Manajemen Konten</Heading2>
          <Paragraph className="mt-1 text-sm text-jp-gray-700">
            Pusat pengelolaan artikel edukasi, data seniman, dan evaluasi draf kiriman kontributor.
          </Paragraph>

          <div className="mt-6 flex flex-wrap gap-2.5 border-t border-jp-gray-200 pt-5">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors",
                  activeTab === item.id
                    ? "bg-jp-blue-900 text-white shadow-xs"
                    : "bg-jp-paper text-jp-gray-700 hover:bg-jp-blue-50 hover:text-jp-blue-900 border border-jp-gray-300"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className={cn("mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 lg:py-16", className)}>
        {children}
      </section>
    </MainPublicLayout>
  );
}
