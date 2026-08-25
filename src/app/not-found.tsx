import React from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { Heading1, Paragraph, SectionLabel } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/atoms/form/Button";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { Compass, Home, BookOpen } from "lucide-react";

export const metadata = {
  title: "404 : Halaman Tidak Ditemukan : Jejak Perupa",
  description: "Halaman atau catatan arsip seni rupa yang kamu cari tidak ditemukan.",
};

export default function NotFoundPage() {
  return (
    <MainPublicLayout>
      <section className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 py-16 text-center lg:py-24 space-y-8 font-sans">
        {/* BADGE & ERROR CODE */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-jp-blue-100 text-jp-blue-900 border border-jp-blue-200 shadow-2xs">
          <Compass className="h-8 w-8 text-jp-blue-700 animate-pulse" />
        </div>

        <div>
          <SectionLabel>Galat 404 : Halaman Belum Terpetakan</SectionLabel>
          <Heading1 className="mt-3 text-jp-ink">
            Jejak yang Kamu Cari Tidak Ditemukan
          </Heading1>
          <Paragraph className="mt-4 max-w-xl mx-auto text-base text-jp-gray-700 leading-relaxed font-prose">
            Halaman, artikel, atau karya seni yang kamu tuju mungkin telah
            dipindahkan, dihapus, atau tautan yang kamu masukkan kurang tepat.
          </Paragraph>
        </div>

        {/* PERU-CHAN CALLOUT */}
        <div className="max-w-xl mx-auto text-left">
          <PeruChanCallout
            title="Catatan dari Peru-Chan"
            theme="blue"
            iconType="sparkles"
          >
            <p>
              Terkadang dalam perjalanan berseni kita bisa salah melangkah. Jangan
              khawatir, kamu selalu bisa kembali ke beranda atau mencari istilah
              lain di katalog pengetahuan kami!
            </p>
          </PeruChanCallout>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link href="/">
            <Button variant="primary" size="md" className="rounded-lg">
              <Home className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Link href="/artikel">
            <Button variant="outline" size="md" className="rounded-lg">
              <BookOpen className="h-4 w-4 mr-2" />
              Jelajahi Artikel
            </Button>
          </Link>
        </div>
      </section>
    </MainPublicLayout>
  );
}
