import React from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { Heading1, Heading2, Heading3, Paragraph, SectionLabel } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { PeruChanMascotSlider } from "@/components/organisms/PeruChanMascotSlider";
import { Sparkles, BookOpen, Layers, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Tentang Kami & Maskot Peru-Chan : Jejak Perupa",
  description: "Mengenal visi demokratisasi seni rupa platform Jejak Perupa dan profil maskot resmi Peru-Chan.",
};

export default function TentangPage() {
  const values = [
    {
      title: "Edukatif & Berbobot",
      desc: "Menyajikan teori dan kritik seni dengan daftar pustaka akademik valid tanpa terkesan kaku.",
      icon: <BookOpen className="h-5 w-5 text-jp-blue-700" />,
      number: "01",
    },
    {
      title: "Kaya Visual & Eksploratif",
      desc: "Fitur Close Looking dan analisis visual aktif untuk melatih kepekaan membaca karya.",
      icon: <Layers className="h-5 w-5 text-jp-blue-700" />,
      number: "02",
    },
    {
      title: "Ramah & Terbuka",
      desc: "Kehadiran Peru-Chan menyederhanakan konsep rumit menjadi tips santai yang memotivasi.",
      icon: <Sparkles className="h-5 w-5 text-jp-blue-700" />,
      number: "03",
    },
    {
      title: "Dokumentasi Nusantara",
      desc: "Mengarsipkan kiprah maestro dan komunitas seni di berbagai pelosok daerah Indonesia.",
      icon: <HeartHandshake className="h-5 w-5 text-jp-blue-700" />,
      number: "04",
    },
  ];

  return (
    <MainPublicLayout>
      {/* HERO BANNER */}
      <section className="border-b border-jp-gray-300 bg-gradient-to-b from-jp-blue-50/80 via-jp-paper to-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 text-center">
          <SectionLabel>Tentang Platform</SectionLabel>
          <Heading1 className="mt-3 text-jp-ink text-4xl sm:text-5xl">
            Belajar seni, meninggalkan jejak.
          </Heading1>
          <Paragraph className="mt-5 text-base md:text-lg leading-relaxed text-jp-gray-700 max-w-2xl mx-auto">
            Jejak Perupa adalah platform edukasi, dokumentasi arsip, dan
            apresiasi seni rupa yang didedikasikan untuk pelajar, mahasiswa,
            pendidik, dan pecinta seni di seluruh Indonesia.
          </Paragraph>
        </div>
      </section>

      {/* VISI & NILAI UTAMA (SLEEK ARCHITECTURAL CARDS, NO AI SLOP ROUNDED-3XL) */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>Nilai Utama Kami</SectionLabel>
          <Heading2 className="mt-2 text-jp-ink text-3xl">Empat Pilar Jejak Perupa</Heading2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((val) => (
            <div
              key={val.title}
              className="flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-jp-blue-700"
            >
              <div>
                <div className="flex items-center justify-between border-b border-jp-gray-100 pb-3.5">
                  <span className="font-mono text-xs font-bold text-jp-blue-900">
                    PILAR / {val.number}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-jp-blue-50 border border-jp-blue-100">
                    {val.icon}
                  </div>
                </div>

                <Heading3 className="mt-4 text-lg font-bold text-jp-ink">
                  {val.title}
                </Heading3>

                <Paragraph className="mt-2 text-sm text-jp-gray-700 leading-relaxed font-prose">
                  {val.desc}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MASKOT PERU-CHAN SECTION WITH DYNAMIC SLIDER */}
      <section className="border-t border-jp-gray-300 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-[1fr_1fr] items-center">
            <div className="space-y-5">
              <SectionLabel>Karakter Sahabat Belajar</SectionLabel>
              <Heading2 className="text-3xl sm:text-4xl text-jp-ink">
                Mengenal Karakter Peru-Chan
              </Heading2>
              <Paragraph className="text-base text-jp-gray-700 leading-relaxed font-prose">
                Peru-Chan hadir sebagai personifikasi dari antusiasme belajar
                seni rupa yang ceria, penuh rasa ingin tahu, dan tidak kenal
                menyerah. Nama &ldquo;Peru&rdquo; diambil dari kata &ldquo;Perupa&rdquo;.
              </Paragraph>
              <Paragraph className="text-base text-jp-gray-700 leading-relaxed font-prose">
                Di setiap bab materi, Peru-Chan selalu menyisipkan boks catatan kuratorial
                khusus untuk menyederhanakan istilah-istilah seni yang rumit agar
                dapat dipahami secara intuitif oleh pembelajar.
              </Paragraph>
            </div>

            {/* DYNAMIC MASCOT SLIDER */}
            <div>
              <PeruChanMascotSlider className="shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="border-t border-jp-gray-300 bg-jp-paper py-20 text-center">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 space-y-6">
          <Heading2 className="text-3xl sm:text-4xl text-jp-ink">
            Mari Mulai Menjelajah Bersama Kami
          </Heading2>
          <Paragraph className="text-base text-jp-gray-700 max-w-xl mx-auto">
            Pilihlah artikel atau topik seni yang ingin kamu pelajari hari ini
            dan tinggalkan jejak pemikiran kreatifmu.
          </Paragraph>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/artikel">
              <Button variant="primary" size="md">
                Jelajahi Artikel
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/kamus">
              <Button variant="outline" size="md">
                Buka Kamus Seni A-Z
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainPublicLayout>
  );
}
