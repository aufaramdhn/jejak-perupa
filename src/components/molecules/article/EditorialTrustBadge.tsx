import React from "react";
import { ShieldCheck, BookOpenCheck, Scale, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EditorialTrustBadgeProps {
  authorName?: string;
  className?: string;
}

export function EditorialTrustBadge({
  authorName = "Kurator Redaksi Jejak Perupa",
  className,
}: EditorialTrustBadgeProps) {
  return (
    <div
      className={cn(
        "my-8 rounded-2xl border border-jp-blue-200 bg-gradient-to-br from-jp-blue-50/80 via-white to-jp-paper p-5 md:p-6 shadow-2xs font-sans",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-jp-blue-100/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-jp-blue-900 text-white shadow-2xs">
            <ShieldCheck className="h-5 w-5 text-jp-lime-400" />
          </div>
          <div>
            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-jp-blue-700">
              Jaminan Kualitas Wacana
            </span>
            <h4 className="font-heading font-bold text-jp-ink text-sm md:text-base">
              Naskah Terkurasi &amp; Terverifikasi Akademik
            </h4>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-jp-blue-300 bg-jp-blue-100/60 px-3 py-1 font-mono text-[11px] font-bold text-jp-blue-900">
          <Award className="h-3.5 w-3.5 text-jp-blue-700" />
          <span>Standar E-E-A-T Edukasi Seni</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-jp-gray-700">
        <div className="flex items-start gap-2">
          <BookOpenCheck className="h-4 w-4 text-jp-blue-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-jp-ink font-semibold">Kajian Pustaka Terakreditasi:</strong> Disusun dan diverifikasi berdasarkan buku sejarah seni rupa, monograf maestro, dan dokumen arsip museum.
          </p>
        </div>
        <div className="flex items-start gap-2">
          <Scale className="h-4 w-4 text-jp-blue-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-jp-ink font-semibold">Integritas Redaksional:</strong> Ditelaah oleh {authorName} bebas dari intervensi komersial dan telah diselaraskan dengan kurikulum seni nasional.
          </p>
        </div>
      </div>
    </div>
  );
}
