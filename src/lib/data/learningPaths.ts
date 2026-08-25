export interface LearningStep {
  id: string;
  title: string;
  description: string;
  articleSlug: string;
  estimatedMinutes: number;
}

export interface LearningPathData {
  id: string;
  title: string;
  slug: string;
  level: "Pemula" | "Menengah" | "Lanjutan";
  description: string;
  iconName: string;
  totalModules: number;
  totalHours: string;
  steps: LearningStep[];
}

export const learningPathsData: LearningPathData[] = [
  {
    id: "path-pemula",
    title: "Fondasi Bahasa Rupa dan Dasar Berkarya",
    slug: "fondasi-bahasa-rupa",
    level: "Pemula",
    description:
      "Kurikulum esensial bagi pemula untuk memahami unsur-unsur dasar rupa (titik, garis, bidang, warna, tekstur), prinsip komposisi, serta pengenalan studio seni.",
    iconName: "book-open",
    totalModules: 3,
    totalHours: "1.5 Jam",
    steps: [
      {
        id: "step-1",
        title: "Mengenal Program Studi Seni Rupa Murni",
        description: "Pengenalan karakter studi, dinamika perkuliahan, dan peminatan 4 studio utama.",
        articleSlug: "seni-rupa-murni",
        estimatedMinutes: 8,
      },
      {
        id: "step-2",
        title: "Mengenal Dasar Teknik Cat Air",
        description: "Memahami prinsip transparansi pigmen dan latihan aplikasi basah-pada-kering.",
        articleSlug: "dasar-teknik-cat-air",
        estimatedMinutes: 6,
      },
      {
        id: "step-3",
        title: "Mengapa Kita Perlu Belajar Sejarah Seni?",
        description: "Membuka paradigma bahwa sejarah seni adalah rekaman evolusi gagasan manusia.",
        articleSlug: "mengapa-belajar-sejarah-seni",
        estimatedMinutes: 7,
      },
    ],
  },
  {
    id: "path-menengah",
    title: "Sejarah dan Diskursus Seni Rupa Indonesia",
    slug: "sejarah-seni-indonesia",
    level: "Menengah",
    description:
      "Menelusuri perjalanan seni rupa modern nusantara dari era perintisan Raden Saleh, masa revolusi Persagi dan Pelukis Rakyat, hingga era kontemporer.",
    iconName: "landmark",
    totalModules: 2,
    totalHours: "2 Jam",
    steps: [
      {
        id: "step-1",
        title: "Mengapa Kita Perlu Belajar Sejarah Seni?",
        description: "Konteks sosial dan pembentukan bahasa visual identitas bangsa.",
        articleSlug: "mengapa-belajar-sejarah-seni",
        estimatedMinutes: 7,
      },
      {
        id: "step-2",
        title: "Membedah Romantisisme Kritis Raden Saleh",
        description: "Analisis makna simbolik di balik karya Penangkapan Pangeran Diponegoro.",
        articleSlug: "romantisisme-raden-saleh",
        estimatedMinutes: 9,
      },
    ],
  },
];
