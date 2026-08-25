export type FeatureFlagKey =
  | "core_platform"
  // FASE 2: Visual (Cyan)
  | "galeri_karya"
  | "zoom_karya"
  | "analisis_visual"
  // FASE 2: Personal (Light Blue)
  | "bookmark_artikel"
  | "favorit_seniman"
  // FASE 3: Edukasi (Peach)
  | "quiz_interaktif"
  | "progress_belajar"
  // FASE 3: Media (Blue)
  | "video_media"
  // FASE 3: Media Seni (Coral)
  | "review_pameran"
  | "agenda_seni"
  // FASE 3: Komunitas (Green)
  | "direktori_komunitas"
  | "komentar_diskusi"
  // FASE 4: Kontributor (Lavender)
  | "profil_kontributor"
  | "submit_artikel"
  | "kurasi_editorial"
  // FASE 4: Komunitas (Red)
  | "portofolio_komunitas"
  // FASE 4: Eksplorasi Spasial (Magenta)
  | "jejak_seni_museum"
  | "jejak_seniman_linimasa"
  | "jejak_seni_daerah";

export type FeatureGroupCategory =
  | "fase1_core"
  | "fase2_visual"
  | "fase2_personal"
  | "fase3_edukasi"
  | "fase3_media"
  | "fase3_media_seni"
  | "fase3_komunitas"
  | "fase4_kontributor"
  | "fase4_komunitas"
  | "fase4_eksplorasi";

export interface FeatureFlagDefinition {
  key: FeatureFlagKey;
  label: string;
  shortDescription: string;
  group: FeatureGroupCategory;
  groupLabel: string;
  phaseLabel: string;
  colorVariant: "cyan" | "lightBlue" | "peach" | "blue" | "coral" | "green" | "lavender" | "red" | "magenta" | "navy";
  isCore?: boolean;
}

export type ReleasePresetId = "v1.0.0" | "v1.1.0" | "v1.2.0" | "v2.0.0";

export interface ReleasePresetDefinition {
  id: ReleasePresetId;
  name: string;
  versionBadge: string;
  subtitle: string;
  description: string;
  colorVariant: "blue" | "brown" | "lime" | "emerald";
  enabledFlags: FeatureFlagKey[];
}

export const featureFlagDefinitions: FeatureFlagDefinition[] = [
  // FASE 1: Fondasi Inti
  {
    key: "core_platform",
    label: "Fondasi Inti Arsip & Edukasi",
    shortDescription: "Beranda, katalog artikel, direktori maestro seniman, kamus A-Z, pencarian global, dan panel admin.",
    group: "fase1_core",
    groupLabel: "Fondasi Inti (Baseline Core)",
    phaseLabel: "FASE 1 : CORE",
    colorVariant: "navy",
    isCore: true,
  },

  // FASE 2: Visual (Cyan)
  {
    key: "galeri_karya",
    label: "Galeri Karya Maestro",
    shortDescription: "Etalase galeri visual karya lukis dan seni rupa pada profil seniman.",
    group: "fase2_visual",
    groupLabel: "Visual Studio & Galeri",
    phaseLabel: "FASE 2 : VISUAL",
    colorVariant: "cyan",
  },
  {
    key: "zoom_karya",
    label: "Zoom & Detail Pigmen Karya",
    shortDescription: "Penampil zoom resolusi tinggi untuk mengamati detail sapuan kuas dan tekstur karya.",
    group: "fase2_visual",
    groupLabel: "Visual Studio & Galeri",
    phaseLabel: "FASE 2 : VISUAL",
    colorVariant: "cyan",
  },
  {
    key: "analisis_visual",
    label: "Analisis Visual (Close Looking)",
    shortDescription: "Modul bedah karya interaktif dengan focal point kuratorial dan eksplorasi palet warna.",
    group: "fase2_visual",
    groupLabel: "Visual Studio & Galeri",
    phaseLabel: "FASE 2 : VISUAL",
    colorVariant: "cyan",
  },

  // FASE 2: Personal (Light Blue)
  {
    key: "bookmark_artikel",
    label: "Bookmark / Simpan Artikel",
    shortDescription: "Fitur penyimpanan artikel bacaan ke daftar bacaan pribadi pengguna.",
    group: "fase2_personal",
    groupLabel: "Koleksi & Ruang Personal",
    phaseLabel: "FASE 2 : PERSONAL",
    colorVariant: "lightBlue",
  },
  {
    key: "favorit_seniman",
    label: "Favorit Seniman Maestro",
    shortDescription: "Penanda seniman favorit untuk kurasi preferensi belajar pribadi.",
    group: "fase2_personal",
    groupLabel: "Koleksi & Ruang Personal",
    phaseLabel: "FASE 2 : PERSONAL",
    colorVariant: "lightBlue",
  },

  // FASE 3: Edukasi (Peach)
  {
    key: "quiz_interaktif",
    label: "Quiz & Evaluasi Rupa",
    shortDescription: "Kuis interaktif uji pemahaman teori dan analisis karya bersama Peru-Chan.",
    group: "fase3_edukasi",
    groupLabel: "Kurikulum & Evaluasi Belajar",
    phaseLabel: "FASE 3 : EDUKASI",
    colorVariant: "peach",
  },
  {
    key: "progress_belajar",
    label: "Jalur Belajar & Progres",
    shortDescription: "Silabus kurikulum modul belajar terstruktur dan pelacak capaian bab bacaan.",
    group: "fase3_edukasi",
    groupLabel: "Kurikulum & Evaluasi Belajar",
    phaseLabel: "FASE 3 : EDUKASI",
    colorVariant: "peach",
  },

  // FASE 3: Media (Blue)
  {
    key: "video_media",
    label: "Video & Media Dokumentasi",
    shortDescription: "Pemutar materi audiovisual, dokumentasi studio, dan arsip wawancara seniman.",
    group: "fase3_media",
    groupLabel: "Media Audiovisual",
    phaseLabel: "FASE 3 : MEDIA",
    colorVariant: "blue",
  },

  // FASE 3: Media Seni (Coral)
  {
    key: "review_pameran",
    label: "Review & Ulasan Pameran",
    shortDescription: "Kritik dan ulasan kuratorial mengenai pameran seni yang sedang berlangsung.",
    group: "fase3_media_seni",
    groupLabel: "Wacana & Agenda Pameran",
    phaseLabel: "FASE 3 : MEDIA SENI",
    colorVariant: "coral",
  },
  {
    key: "agenda_seni",
    label: "Agenda Seni & Pameran",
    shortDescription: "Kalender jadwal pameran, workshop, dan agenda seni rupa nusantara.",
    group: "fase3_media_seni",
    groupLabel: "Wacana & Agenda Pameran",
    phaseLabel: "FASE 3 : MEDIA SENI",
    colorVariant: "coral",
  },

  // FASE 3: Komunitas (Green)
  {
    key: "direktori_komunitas",
    label: "Direktori Komunitas Seni",
    shortDescription: "Basis data kolektif seni, ruang alternatif, dan sanggar seni rupa.",
    group: "fase3_komunitas",
    groupLabel: "Jejaring Komunitas",
    phaseLabel: "FASE 3 : KOMUNITAS",
    colorVariant: "green",
  },
  {
    key: "komentar_diskusi",
    label: "Komentar & Diskusi Dialektika",
    shortDescription: "Ruang tanggapan dan dialog apresiasi karya di bawah setiap artikel.",
    group: "fase3_komunitas",
    groupLabel: "Jejaring Komunitas",
    phaseLabel: "FASE 3 : KOMUNITAS",
    colorVariant: "green",
  },

  // FASE 4: Kontributor (Lavender)
  {
    key: "profil_kontributor",
    label: "Profil Penulis Kontributor",
    shortDescription: "Halaman portofolio dan riwayat naskah bagi pembelajar atau penulis luar.",
    group: "fase4_kontributor",
    groupLabel: "Partisipasi Kontributor",
    phaseLabel: "FASE 4 : KONTRIBUTOR",
    colorVariant: "lavender",
  },
  {
    key: "submit_artikel",
    label: "Submit & Kirim Naskah Kontribusi",
    shortDescription: "Formulir modular bagi publik untuk mengirimkan analisis dan catatan studi.",
    group: "fase4_kontributor",
    groupLabel: "Partisipasi Kontributor",
    phaseLabel: "FASE 4 : KONTRIBUTOR",
    colorVariant: "lavender",
  },
  {
    key: "kurasi_editorial",
    label: "Meja Kurasi Redaksi & Peru-Chan",
    shortDescription: "Meja kerja telaah naskah masuk oleh kurator dan penyematan catatan maskot.",
    group: "fase4_kontributor",
    groupLabel: "Partisipasi Kontributor",
    phaseLabel: "FASE 4 : KONTRIBUTOR",
    colorVariant: "lavender",
  },

  // FASE 4: Komunitas (Red)
  {
    key: "portofolio_komunitas",
    label: "Galeri Portofolio Komunitas",
    shortDescription: "Etalase pameran karya kolaboratif komunitas seni rupa dan sanggar.",
    group: "fase4_komunitas",
    groupLabel: "Kolektif Komunitas",
    phaseLabel: "FASE 4 : KOMUNITAS",
    colorVariant: "red",
  },

  // FASE 4: Eksplorasi Spasial (Magenta)
  {
    key: "jejak_seni_museum",
    label: "Jejak Seni (Museum & Galeri)",
    shortDescription: "Direktori spasial museum, galeri seni, dan cagar budaya nusantara.",
    group: "fase4_eksplorasi",
    groupLabel: "Eksplorasi Spasial Nusantara",
    phaseLabel: "FASE 4 : EKSPLORASI",
    colorVariant: "magenta",
  },
  {
    key: "jejak_seniman_linimasa",
    label: "Jejak Langkah & Lini Masa Seniman",
    shortDescription: "Visualisasi peta perjalanan hidup dan perpindahan studio para maestro.",
    group: "fase4_eksplorasi",
    groupLabel: "Eksplorasi Spasial Nusantara",
    phaseLabel: "FASE 4 : EKSPLORASI",
    colorVariant: "magenta",
  },
  {
    key: "jejak_seni_daerah",
    label: "Peta Seni Rupa Nusantara",
    shortDescription: "Peta geospasial interaktif kekayaan seni rupa per provinsi di Indonesia.",
    group: "fase4_eksplorasi",
    groupLabel: "Eksplorasi Spasial Nusantara",
    phaseLabel: "FASE 4 : EKSPLORASI",
    colorVariant: "magenta",
  },
];

export const releasePresets: ReleasePresetDefinition[] = [
  {
    id: "v1.0.0",
    name: "v1.0.0 : Core Foundation (MVP Peluncuran Awal)",
    versionBadge: "v1.0.0 MVP",
    subtitle: "Rilis Publik Minimalis & Fokus Arsip",
    description:
      "Tampilan bersih dan fokus pada materi artikel kuratorial, direktori maestro, kamus istilah seni A-Z, dan maskot Peru-Chan. Seluruh fitur tahap lanjutan disimpan rapi.",
    colorVariant: "blue",
    enabledFlags: ["core_platform"],
  },
  {
    id: "v1.1.0",
    name: "v1.1.0 : Visual Studio & Personal Learner",
    versionBadge: "v1.1.0 Visual",
    subtitle: "Eksplorasi Visual & Ruang Koleksi Pengguna",
    description:
      "Mengaktifkan Galeri Karya Maestro, Zoom Detail Pigmen, Bedah Analisis Visual, Bookmark Artikel, dan Penanda Seniman Favorit.",
    colorVariant: "lime",
    enabledFlags: [
      "core_platform",
      "galeri_karya",
      "zoom_karya",
      "analisis_visual",
      "bookmark_artikel",
      "favorit_seniman",
    ],
  },
  {
    id: "v1.2.0",
    name: "v1.2.0 : Ekosistem Edukasi, Media & Agenda",
    versionBadge: "v1.2.0 Edukasi",
    subtitle: "Kurikulum Mandiri, Video & Kalender Pameran",
    description:
      "Mengaktifkan Jalur Belajar, Kuis Interaktif, Video Media Studio, Kalender Agenda Seni, Review Pameran, dan Direktori Komunitas Seni.",
    colorVariant: "brown",
    enabledFlags: [
      "core_platform",
      "galeri_karya",
      "zoom_karya",
      "analisis_visual",
      "bookmark_artikel",
      "favorit_seniman",
      "quiz_interaktif",
      "progress_belajar",
      "video_media",
      "review_pameran",
      "agenda_seni",
      "direktori_komunitas",
      "komentar_diskusi",
    ],
  },
  {
    id: "v2.0.0",
    name: "v2.0.0 : Full Platform (Kontribusi & Peta Geospasial)",
    versionBadge: "v2.0.0 Lengkap",
    subtitle: "Seluruh Fitur Aktif 100%",
    description:
      "Mengaktifkan seluruh 19 fitur platform secara komprehensif, termasuk Meja Kurasi Kontributor Publik, Portofolio Komunitas, dan Peta Geospasial Seni Nusantara.",
    colorVariant: "emerald",
    enabledFlags: [
      "core_platform",
      "galeri_karya",
      "zoom_karya",
      "analisis_visual",
      "bookmark_artikel",
      "favorit_seniman",
      "quiz_interaktif",
      "progress_belajar",
      "video_media",
      "review_pameran",
      "agenda_seni",
      "direktori_komunitas",
      "komentar_diskusi",
      "profil_kontributor",
      "submit_artikel",
      "kurasi_editorial",
      "portofolio_komunitas",
      "jejak_seni_museum",
      "jejak_seniman_linimasa",
      "jejak_seni_daerah",
    ],
  },
];
