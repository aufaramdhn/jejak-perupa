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

export interface SiteSettingsData {
  siteName: string;
  siteTagline: string;
  logoInitials: string;
  logoImageUrl: string;
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
}

export const defaultSiteSettings: SiteSettingsData = {
  siteName: "JEJAK PERUPA",
  siteTagline: "Catatan Perjalanan Pelajar Seni Rupa",
  logoInitials: "JP",
  logoImageUrl: "",
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
};
