"use client";

import React from "react";
import Link from "next/link";
import { MainPublicLayout } from "@/components/templates/public/MainPublicLayout";
import { Heading1, Heading2, Heading3, Paragraph, SectionLabel } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/atoms/form/Button";
import { PeruChanMascotSlider } from "@/components/organisms/peruchan/PeruChanMascotSlider";
import { useSiteSettings } from "@/lib/siteContext";
import {
  Sparkles,
  BookOpen,
  Layers,
  HeartHandshake,
  ArrowRight,
  Compass,
  ShieldCheck,
  Palette,
  Lightbulb,
} from "lucide-react";

function renderPillarIcon(iconName: string) {
  switch (iconName) {
    case "book-open":
      return <BookOpen className="h-5 w-5 text-jp-blue-700" />;
    case "layers":
      return <Layers className="h-5 w-5 text-jp-blue-700" />;
    case "sparkles":
      return <Sparkles className="h-5 w-5 text-jp-blue-700" />;
    case "heart-handshake":
      return <HeartHandshake className="h-5 w-5 text-jp-blue-700" />;
    case "compass":
      return <Compass className="h-5 w-5 text-jp-blue-700" />;
    case "shield-check":
      return <ShieldCheck className="h-5 w-5 text-jp-blue-700" />;
    case "palette":
      return <Palette className="h-5 w-5 text-jp-blue-700" />;
    case "lightbulb":
      return <Lightbulb className="h-5 w-5 text-jp-blue-700" />;
    default:
      return <Sparkles className="h-5 w-5 text-jp-blue-700" />;
  }
}

import { JsonLd } from "@/components/atoms/meta/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jejak-perupa.vercel.app";

export default function TentangPage() {
  const { settings } = useSiteSettings();
  const pillars = settings.aboutPillars || [];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Tentang Platform Jejak Perupa",
    description: settings.aboutVision || "Platform edukasi, dokumentasi arsip, dan apresiasi seni rupa Indonesia.",
    url: `${siteUrl}/tentang`,
    mainEntity: {
      "@type": "Organization",
      name: "Jejak Perupa",
      url: siteUrl,
      logo: `${siteUrl}/images/mascot/peruchan-drawing.png`,
      description: "Ensiklopedia independen seni rupa nusantara, dokumentasi maestro, dan jalur pembelajaran apresiasi visual.",
      knowsAbout: [
        "Seni Rupa Modern Indonesia",
        "Sejarah Seni Rupa Nusantara",
        "Kurasi & Apresiasi Karya Seni",
        "Teknik & Eksplorasi Studio Seni",
      ],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tentang Kami",
        item: `${siteUrl}/tentang`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[aboutSchema, breadcrumbSchema]} />
      <MainPublicLayout>
        {/* HERO BANNER */}
        <section className="border-b border-jp-gray-300 bg-gradient-to-b from-jp-blue-50/80 via-jp-paper to-white py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 text-center">
            <SectionLabel>Tentang Platform</SectionLabel>
            <Heading1 className="mt-3 text-jp-ink text-4xl sm:text-5xl">
              {settings.siteTagline || "Belajar seni, meninggalkan jejak."}
            </Heading1>
            <Paragraph className="mt-5 text-base md:text-lg leading-relaxed text-jp-gray-700 max-w-2xl mx-auto">
              {settings.aboutVision ||
                "Jejak Perupa adalah platform edukasi, dokumentasi arsip, dan apresiasi seni rupa yang didedikasikan untuk pelajar, mahasiswa, pendidik, dan pecinta seni di seluruh Indonesia."}
            </Paragraph>
          </div>
        </section>

        {/* VISI & NILAI UTAMA */}
        {pillars.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
            <div className="text-center max-w-2xl mx-auto">
              <SectionLabel>Nilai Utama Kami</SectionLabel>
              <Heading2 className="mt-2 text-jp-ink text-3xl">Pilar Fondasi Jejak Perupa</Heading2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((val) => (
                <div
                  key={val.id}
                  className="flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-jp-blue-700 font-sans"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-jp-gray-100 pb-3.5">
                      <span className="font-mono text-xs font-bold text-jp-blue-900">
                        PILAR / {val.number}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-jp-blue-50 border border-jp-blue-100">
                        {renderPillarIcon(val.iconName)}
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
        )}

        {/* STANDAR KURASI & KEBIJAKAN EDITORIAL (E-E-A-T) */}
        <section className="border-t border-jp-gray-300 bg-jp-paper py-16 lg:py-20 font-sans">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <SectionLabel>Standar Integritas &amp; E-E-A-T</SectionLabel>
              <Heading2 className="mt-2 text-3xl text-jp-ink">
                Kebijakan Editorial &amp; Verifikasi Fakta
              </Heading2>
              <Paragraph className="mt-3 text-sm text-jp-gray-600 font-prose leading-relaxed">
                Jejak Perupa berkomitmen menjaga kemurnian wacana dan akurasi sejarah seni rupa melalui tiga pilar kuratorial ketat:
              </Paragraph>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-jp-blue-200 bg-white p-6 shadow-2xs space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jp-blue-900 text-white shadow-2xs">
                  <ShieldCheck className="h-5 w-5 text-jp-lime-400" />
                </div>
                <h4 className="font-heading font-bold text-jp-ink text-lg">
                  1. Rujukan Pustaka Resmi
                </h4>
                <p className="text-xs md:text-sm text-jp-gray-700 leading-relaxed font-prose">
                  Setiap artikel kurasi wajib menyertakan sitasi ilmiah dari buku sejarah seni rupa, monograf maestro, atau jurnal terindeks, bukan klaim tanpa dasar.
                </p>
              </div>

              <div className="rounded-2xl border border-jp-blue-200 bg-white p-6 shadow-2xs space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jp-blue-900 text-white shadow-2xs">
                  <Palette className="h-5 w-5 text-jp-blue-300" />
                </div>
                <h4 className="font-heading font-bold text-jp-ink text-lg">
                  2. Kepekaan Konteks Nusantara
                </h4>
                <p className="text-xs md:text-sm text-jp-gray-700 leading-relaxed font-prose">
                  Materi disusun dengan mempertimbangkan historiografi lokal dan dialektika dekolonisasi agar pembaca memahami seni rupa dari perspektif martabat bangsa.
                </p>
              </div>

              <div className="rounded-2xl border border-jp-blue-200 bg-white p-6 shadow-2xs space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-jp-blue-900 text-white shadow-2xs">
                  <Lightbulb className="h-5 w-5 text-jp-brown-300" />
                </div>
                <h4 className="font-heading font-bold text-jp-ink text-lg">
                  3. Anti-AI Slop &amp; Orisinalitas
                </h4>
                <p className="text-xs md:text-sm text-jp-gray-700 leading-relaxed font-prose">
                  Seluruh naskah ditelaah secara cermat oleh kurator manusia, bebas dari halusinasi teks generik, dan diselaraskan dengan kurikulum seni nasional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MASKOT PERU-CHAN SECTION WITH DYNAMIC SLIDER */}
        <section className="border-t border-jp-gray-300 bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
            <div className="grid gap-12 md:grid-cols-[1fr_1fr] items-center">
              <div className="space-y-5 font-sans">
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
        <section className="border-t border-jp-gray-300 bg-jp-paper py-20 text-center font-sans">
          <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 space-y-6">
            <Heading2 className="text-3xl sm:text-4xl text-jp-ink">
              Mari Mulai Menjelajah Bersama Kami
            </Heading2>
            <Paragraph className="text-base text-jp-gray-700 max-w-xl mx-auto font-prose">
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
    </>
  );
}
