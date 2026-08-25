import type { Metadata } from "next";
import { Newsreader, Lora, Inter, JetBrains_Mono } from "next/font/google";
import { ModalProvider } from "@/lib/modalContext";
import { SiteProvider } from "@/lib/siteContext";
import { CategoryProvider } from "@/lib/categoryContext";
import { FeatureFlagsProvider } from "@/lib/featureFlagsContext";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-prose",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jejak Perupa : Catatan Perjalanan Pelajar Seni Rupa",
  description: "Platform edukasi, dokumentasi arsip, dan apresiasi seni rupa Indonesia dengan maskot resmi Peru-Chan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${newsreader.variable} ${lora.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-jp-paper text-jp-ink font-prose antialiased">
        <SiteProvider>
          <CategoryProvider>
            <FeatureFlagsProvider>
              <ModalProvider>{children}</ModalProvider>
            </FeatureFlagsProvider>
          </CategoryProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
