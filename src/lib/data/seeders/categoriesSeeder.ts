import { type CategoryData } from "@/lib/data/categories";

export const categoriesSeeder: CategoryData[] = [
  {
    id: "cat-teori",
    name: "Teori Seni",
    slug: "teori-seni",
    description: "Estetika, kritik seni, filsafat keindahan, dan diskursus pemikiran seni rupa.",
    iconName: "book-open",
    colorHex: "#173B63",
    articleCount: 12,
  },
  {
    id: "cat-teknik",
    name: "Teknik Seni",
    slug: "teknik-seni",
    description: "Mengenal medium, teknik sapuan kuas, material studio, dan proses berkarya nyata.",
    iconName: "palette",
    colorHex: "#4B82C3",
    articleCount: 18,
  },
  {
    id: "cat-sejarah",
    name: "Sejarah Seni",
    slug: "sejarah-seni",
    description: "Perjalanan gagasan, gerakan seni rupa nusantara dan dunia, serta dinamika zaman.",
    iconName: "landmark",
    colorHex: "#3D2A20",
    articleCount: 24,
  },
  {
    id: "cat-pendidikan",
    name: "Pendidikan Seni",
    slug: "pendidikan-seni",
    description: "Panduan studi, kehidupan studio perkuliahan, dan peta karier bagi calon mahasiswa seni.",
    iconName: "graduation-cap",
    colorHex: "#C9E64A",
    articleCount: 9,
  },
  {
    id: "cat-profil",
    name: "Profil Seniman",
    slug: "profil-seniman",
    description: "Dokumentasi biografi, kiprah artistik, dan warisan visual para maestro perupa.",
    iconName: "user",
    colorHex: "#624431",
    articleCount: 15,
  },
];
