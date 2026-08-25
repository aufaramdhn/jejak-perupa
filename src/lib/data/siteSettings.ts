export interface MascotSlideItem {
  id: string;
  title: string;
  subtitle: string;
  quote: string;
  imageUrl?: string;
  accentColor: "blue" | "brown" | "lime";
  isActive: boolean;
  order: number;
}

export interface PeruChanQuoteItem {
  id: string;
  quoteText: string;
  categoryBadge: string;
  authorNote?: string;
  imageSrc: string;
  accentColor?: "blue" | "brown" | "lime";
  isActive: boolean;
  order: number;
}

export interface SiteSettingsData {
  siteName: string;
  siteTagline: string;
  logoInitials: string;
  logoImageUrl: string;
  faviconUrl: string;
  heroEditionBadge: string;
  heroHeadline: string;
  heroDescription: string;
  aboutTitle: string;
  aboutVision: string;
  aboutMission: string;
  aboutPhilosophy: string;
  contactEmail: string;
  instagramUrl: string;
  footerDescription: string;
  footerCopyright: string;
  mascotSlides: MascotSlideItem[];
  quotes: PeruChanQuoteItem[];
}

export const defaultSiteSettings: SiteSettingsData = {
  siteName: "JEJAK PERUPA",
  siteTagline: "Catatan Perjalanan Pelajar Seni Rupa",
  logoInitials: "JP",
  logoImageUrl: "",
  faviconUrl: "",
  heroEditionBadge: "Arsip & Wacana Seni Rupa Nusantara : Edisi 2026",
  heroHeadline: "Catatan Perjalanan & Arsip Seni Rupa Nusantara",
  heroDescription:
    "Eksplorasi bahasa rupa, analisis mendalam karya maestro Indonesia, ensiklopedia istilah, serta kurikulum mandiri bagi pelajar, pendidik, dan pengkaji seni.",
  aboutTitle: "Tentang Platform Jejak Perupa",
  aboutVision:
    "Membuka gerbang eksplorasi bahasa rupa, apresiasi karya maestro nusantara, dan dokumentasi kuratorial yang bersahabat bagi pembelajar seni di seluruh Indonesia.",
  aboutMission:
    "Menghadirkan arsip yang hidup, interaktif, dan mudah diakses tanpa mengurangi wibawa akademik dan nilai estetika seni rupa Indonesia.",
  aboutPhilosophy:
    "Seni rupa dipandang bukan hanya sebagai keterampilan teknis menghasilkan bentuk, melainkan medium dialektika pemikiran, catatan zaman, dan ekspresi batin manusia.",
  contactEmail: "redaksi@jejakperupa.id",
  instagramUrl: "https://instagram.com/jejakperupa",
  footerDescription:
    "Platform edukasi terbuka, dokumentasi kuratorial, dan ensiklopedia visual seni rupa Indonesia.",
  footerCopyright: "Hak Cipta © 2026 Jejak Perupa. Seluruh hak cipta dilindungi.",
  mascotSlides: [
    {
      id: "slide-1",
      title: "Peru-Chan : Sahabat Belajar",
      subtitle: "MASKOT EDUKASI RESMI",
      quote: "Siap mendampingi catatan perjalanan belajarmu di setiap bab!",
      imageUrl: "/images/mascot/peruchan-excited.png",
      accentColor: "blue",
      isActive: true,
      order: 1,
    },
    {
      id: "slide-2",
      title: "Peru-Chan : Eksplorasi Studio",
      subtitle: "CATATAN PRAKTIK & PIGMEN",
      quote: "Jangan takut mencoba sapuan kuas baru. Dari eksperimen studio lahir karakter visualmu sendiri!",
      imageUrl: "/images/mascot/peruchan-drawing.png",
      accentColor: "brown",
      isActive: true,
      order: 2,
    },
    {
      id: "slide-3",
      title: "Peru-Chan : Telaah Kuratorial",
      subtitle: "MEMBEDAH KARYA MAESTRO",
      quote: "Gunakan kaca pembesar untuk meneliti komposisi, sapuan impasto, dan getaran emosional karya seni!",
      imageUrl: "/images/mascot/peruchan-investigate.png",
      accentColor: "lime",
      isActive: true,
      order: 3,
    },
    {
      id: "slide-4",
      title: "Peru-Chan : Membaca Sejarah",
      subtitle: "LITERATUR & DIALEKTIKA RUPA",
      quote: "Membaca sejarah seni rupa adalah cara terbaik memahami peradaban dan dialektika zaman para perintis seni.",
      imageUrl: "/images/mascot/peruchan-reading.png",
      accentColor: "blue",
      isActive: true,
      order: 4,
    },
  ],
  quotes: [
    {
      id: "quote-1",
      categoryBadge: "Catatan Santai Peru-Chan",
      quoteText:
        "Jangan takut kalau karya pertamamu belum terlihat bagus. Dalam seni rupa, proses pencarian bentuk adalah bagian tak terpisahkan dari karya itu sendiri.",
      authorNote: "Peru-Chan",
      imageSrc: "/images/mascot/peruchan-drawing.png",
      accentColor: "blue",
      isActive: true,
      order: 1,
    },
    {
      id: "quote-2",
      categoryBadge: "Telaah Kuratorial Maestro",
      quoteText:
        "Menganalisis karya maestro bukan sekadar melihat keindahan permukaan, melainkan membaca bagaimana mereka merespons zaman dan pergolakan batin bangsanya.",
      authorNote: "Peru-Chan",
      imageSrc: "/images/mascot/peruchan-investigate.png",
      accentColor: "lime",
      isActive: true,
      order: 2,
    },
    {
      id: "quote-3",
      categoryBadge: "Laboratorium Studio Seni",
      quoteText:
        "Eksperimen ketebalan pigmen kuas, transparansi cat air, dan goresan arang adalah ruang bermain terbaik seorang calon perupa!",
      authorNote: "Peru-Chan",
      imageSrc: "/images/mascot/peruchan-excited.png",
      accentColor: "brown",
      isActive: true,
      order: 3,
    },
    {
      id: "quote-4",
      categoryBadge: "Dialektika Sejarah Seni",
      quoteText:
        "Membaca sejarah seni rupa adalah cara paling intim memahami cara pandang peradaban masa lalu terhadap keindahan dan kebenaran.",
      authorNote: "Peru-Chan",
      imageSrc: "/images/mascot/peruchan-reading.png",
      accentColor: "blue",
      isActive: true,
      order: 4,
    },
  ],
};
