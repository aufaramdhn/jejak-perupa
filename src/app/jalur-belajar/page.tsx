import React from "react";
import Link from "next/link";
import { CatalogGridTemplate } from "@/components/templates/CatalogGridTemplate";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { PeruChanTipBanner } from "@/components/organisms/PeruChanTipBanner";
import { artService } from "@/lib/services/artService";
import { Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Jalur Belajar Seni Rupa Mandiri : Jejak Perupa",
  description: "Kurikulum mandiri berurutan dari tingkat dasar hingga lanjutan untuk mendalami seni rupa secara terstruktur.",
};

export default function JalurBelajarCatalogPage() {
  const learningPaths = artService.getAllLearningPaths();

  return (
    <CatalogGridTemplate
      badgeText="Kurikulum Terstruktur"
      title="Jalur Belajar Seni Rupa"
      subtitle="Panduan langkah demi langkah yang dirancang untuk membimbing proses belajarmu dari fondasi teori dasar hingga analisis seni tingkat lanjut."
    >
      <div className="space-y-12 font-sans">
        <div className="grid gap-6 sm:grid-cols-2">
          {learningPaths.map((path) => (
            <div
              key={path.slug}
              className="flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-7 shadow-2xs transition-all duration-300 hover:border-jp-blue-700 hover:shadow-jp-hover"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={path.level === "Pemula" ? "lime" : "blue"}>
                    Tingkat {path.level}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs text-jp-gray-500 font-medium">
                    <Clock className="h-3.5 w-3.5 text-jp-blue-700" />
                    <span>{path.totalHours}</span>
                  </div>
                </div>

                <Heading3 className="mt-4 text-xl md:text-2xl text-jp-ink">
                  {path.title}
                </Heading3>

                <Paragraph className="mt-2.5 text-sm text-jp-gray-700 leading-relaxed font-prose">
                  {path.description}
                </Paragraph>

                <div className="mt-6 border-t border-jp-gray-100 pt-4 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-jp-gray-500">
                    Materi di Jalur Ini:
                  </div>
                  <ul className="space-y-2 text-xs text-jp-gray-700">
                    {path.steps.map((st, idx) => (
                      <li key={st.id} className="flex items-center gap-2">
                        <span className="flex h-4 w-4 items-center justify-center rounded-md bg-jp-blue-100 text-[10px] font-bold text-jp-blue-900 font-mono">
                          {idx + 1}
                        </span>
                        <span className="truncate font-medium">{st.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-jp-gray-100 flex items-center justify-between">
                <Link href={`/jalur-belajar/${path.slug}`}>
                  <Button variant="primary" size="sm" className="rounded-lg">
                    Mulai Belajar
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </Link>

                <span className="text-xs text-jp-gray-500 font-medium">
                  {path.totalModules} Modul Pembelajaran
                </span>
              </div>
            </div>
          ))}
        </div>

        <PeruChanTipBanner tipText="Belajar mandiri memerlukan konsistensi. Selesaikan satu materi setiap sesi dan uji pemahamanmu dengan kuis evaluasi di akhir bab." />
      </div>
    </CatalogGridTemplate>
  );
}
