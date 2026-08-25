import React from "react";
import Link from "next/link";
import { BookOpen, Palette, Landmark, ArrowRight } from "lucide-react";
import { Heading2, Heading3, Paragraph, SectionLabel } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface CategoryItem {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  tag: string;
}

export interface CategorySectionProps {
  categories?: CategoryItem[];
  sectionLabel?: string;
  title?: string;
  className?: string;
}

const defaultCategories: CategoryItem[] = [
  {
    id: "teori-seni",
    number: "01",
    title: "Teori & Filsafat Seni",
    description: "Kajian estetika, kritik seni, filsafat keindahan, dan pemikiran konseptual karya rupa.",
    href: "/artikel",
    icon: <BookOpen className="h-5 w-5 text-jp-blue-700" />,
    tag: "Fondasi Konseptual",
  },
  {
    id: "teknik-seni",
    number: "02",
    title: "Praktik & Teknik Studio",
    description: "Eksplorasi medium cat minyak, akrilik, seni cetak grafis, lempung keramik, dan material rupa.",
    href: "/artikel",
    icon: <Palette className="h-5 w-5 text-jp-brown-700" />,
    tag: "Keterampilan Media",
  },
  {
    id: "sejarah-seni",
    number: "03",
    title: "Sejarah Seni Nusantara",
    description: "Perjalanan lini masa pergerakan seni dari era perintis modern, masa revolusi, hingga seni kiwari.",
    href: "/artikel",
    icon: <Landmark className="h-5 w-5 text-jp-blue-900" />,
    tag: "Konteks Zaman",
  },
];

export function CategorySection({
  categories = defaultCategories,
  sectionLabel = "Ruang Lingkup",
  title = "Pilar Pembelajaran Seni Rupa",
  className,
}: CategorySectionProps) {
  return (
    <section
      className={cn(
        "border-y border-jp-gray-300 bg-white py-16 lg:py-20 transition-colors",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <SectionLabel>{sectionLabel}</SectionLabel>
          <Heading2 className="mt-2 text-2xl sm:text-3xl text-jp-ink">{title}</Heading2>
        </div>

        {/* ARTISTIC REDESIGNED CATEGORY CARDS (ROUNDED-XL) */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-jp-paper/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-jp-blue-700 hover:bg-white hover:shadow-jp-hover"
            >
              <div>
                {/* Clean header with studio number & tag */}
                <div className="flex items-center justify-between border-b border-jp-gray-200/80 pb-3.5">
                  <span className="font-mono text-xs font-bold text-jp-blue-900">
                    STUDIO / {cat.number}
                  </span>
                  <span className="text-[11px] font-semibold text-jp-gray-500 font-sans">
                    {cat.tag}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-jp-gray-200 shadow-2xs group-hover:border-jp-blue-700 transition-colors">
                    {cat.icon}
                  </div>
                  <Heading3 className="text-xl text-jp-ink group-hover:text-jp-blue-900 transition-colors">
                    {cat.title}
                  </Heading3>
                </div>

                <Paragraph className="mt-3 text-sm text-jp-gray-700 leading-relaxed font-prose">
                  {cat.description}
                </Paragraph>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-jp-gray-200/60 pt-3.5 text-xs font-bold text-jp-blue-700 group-hover:text-jp-blue-900 font-sans">
                <span>Eksplorasi modul</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
