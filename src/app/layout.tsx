import type { Metadata } from "next";
import { Newsreader, Lora, Inter, JetBrains_Mono } from "next/font/google";
import { ModalProvider } from "@/lib/modalContext";
import { SearchProvider } from "@/lib/searchContext";
import { SiteProvider } from "@/lib/siteContext";
import { CategoryProvider } from "@/lib/categoryContext";
import { FeatureFlagsProvider } from "@/lib/featureFlagsContext";
import { DynamicFavicon } from "@/components/atoms/meta/DynamicFavicon";
import { JsonLd } from "@/components/atoms/meta/JsonLd";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const lora = Lora({
  variable: "--font-prose",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jejak-perupa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jejak Perupa : Catatan Perjalanan Pelajar Seni Rupa",
    template: "%s | Jejak Perupa",
  },
  description:
    "Platform edukasi, dokumentasi arsip wacana, apresiasi seni rupa Indonesia, dan panduan belajar kuratorial bersama maskot resmi Peru-Chan.",
  keywords: [
    "Seni Rupa Indonesia",
    "Pendidikan Seni Rupa",
    "Raden Saleh",
    "Affandi",
    "Sejarah Seni Rupa",
    "Analisis Karya Seni",
    "Peru-Chan",
    "Jejak Perupa",
    "Kurasi Seni",
    "Kolektif Seni",
  ],
  authors: [{ name: "Tim Kurasi Jejak Perupa" }],
  creator: "Jejak Perupa Editorial",
  publisher: "Jejak Perupa Indonesia",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Jejak Perupa",
    title: "Jejak Perupa : Catatan Perjalanan Pelajar Seni Rupa",
    description:
      "Platform edukasi, dokumentasi arsip wacana, dan apresiasi seni rupa Indonesia dengan maskot resmi Peru-Chan.",
    images: [
      {
        url: "/images/mascot/peruchan-excited.png",
        width: 800,
        height: 800,
        alt: "Jejak Perupa & Maskot Peru-Chan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jejak Perupa : Catatan Perjalanan Pelajar Seni Rupa",
    description:
      "Platform edukasi, dokumentasi arsip wacana, dan apresiasi seni rupa Indonesia.",
    images: ["/images/mascot/peruchan-excited.png"],
    creator: "@jejakperupa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Website & Organization JSON-LD Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jejak Perupa",
    url: siteUrl,
    description:
      "Platform edukasi, dokumentasi arsip wacana, dan apresiasi seni rupa Indonesia.",
    inLanguage: "id-ID",
    publisher: {
      "@type": "Organization",
      name: "Jejak Perupa",
      url: siteUrl,
      logo: `${siteUrl}/images/mascot/peruchan-drawing.png`,
    },
  };

  return (
    <html
      lang="id"
      className={`${newsreader.variable} ${lora.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <JsonLd data={websiteSchema} />
      </head>
      <body className="min-h-screen flex flex-col bg-jp-paper text-jp-ink font-prose antialiased">
        <SiteProvider>
          <DynamicFavicon />
          <CategoryProvider>
            <FeatureFlagsProvider>
              <SearchProvider>
                <ModalProvider>{children}</ModalProvider>
              </SearchProvider>
            </FeatureFlagsProvider>
          </CategoryProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
