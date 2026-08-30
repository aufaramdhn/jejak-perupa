export interface SubmissionItem {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  status: "Menunggu Kurasi" | "Disetujui" | "Perlu Revisi";
  excerpt: string;
  chapters: { title: string; content: string }[];
  references: string[];
  coverImageUrl?: string;
  peruChanTip?: string;
  peruChanTheme?: "blue" | "brown" | "lime";
}

export const submissionsSeeder: SubmissionItem[] = [
  {
    id: "sub-1",
    title: "Membaca Garis dan Ekspresi dalam Sketsa Revolusi",
    author: "Dian Sastro (Mahasiswa Seni Rupa)",
    category: "Sejarah Seni",
    date: "24 Agustus 2026",
    status: "Menunggu Kurasi",
    excerpt:
      "Telaah kritis mengenai sketsa-sketsa spontan era 1945-1949 karya pelukis pejuang yang menggunakan kertas koran dan jelaga arang.",
    chapters: [
      {
        title: "Sketsa sebagai Catatan Jurnalistik Perjuangan",
        content:
          "Di tengah keterbatasan kanvas dan cat minyak impor pada era revolusi fisik, para pelukis Persagi dan Seniman Indonesia Muda (SIM) turun langsung ke garis depan. Mereka menangkap raut wajah prajurit, pengungsi, dan suasana stasiun kereta api dengan tarikan garis arang yang cepat namun sarat muatan emosional.",
      },
      {
        title: "Karakter Garis Spontan dan Tekstur Kertas Jelaga",
        content:
          "Kekuatan utama sketsa revolusi terletak pada kejujuran bentuk. Tidak ada waktu untuk menghaluskan gradasi warna. Setiap goresan garis tunggal harus mampu mendefinisikan anatomi gerak tubuh dan ketegangan ruang secara instan.",
      },
    ],
    references: [
      "Kusnadi. (1980). Sejarah Seni Rupa Revolusi Indonesia. Jakarta: Balai Pustaka.",
      "Sudjojono, S. (1946). Seni Loekis, Kesenian, dan Seniman. Jogjakarta: Indonesia Kesenian.",
    ],
    peruChanTip:
      "Sketsa cepat adalah latihan terbaik untuk melatih kepekaan tangan dan intuisi mata sebelum melukis di kanvas besar!",
    peruChanTheme: "brown",
  },
  {
    id: "sub-2",
    title: "Eksplorasi Pigmen Alami Tanah Liat di Studio Keramik",
    author: "Budi Santoso (Pengkaji Kriya)",
    category: "Teknik Seni",
    date: "22 Agustus 2026",
    status: "Menunggu Kurasi",
    excerpt:
      "Metodologi pengolahan tanah liat lokal sebagai glasir dan pewarna organik bersuhu tinggi.",
    chapters: [
      {
        title: "Pengambilan Sampel Mineral Tanah Liat",
        content:
          "Eksplorasi material alami memerlukan pemahaman geologis sederhana mengenai kandungan oksida besi pada tanah liat merah daerah Kasongan.",
      },
    ],
    references: [
      "Gustami, SP. (2000). Kriya Nusantara: Keramik Tradisi dan Modern. Yogyakarta: Kanisius.",
    ],
    peruChanTip:
      "Eksperimen pembakaran glasir membutuhkan kesabaran. Catat setiap formula campuran dalam buku jurnal studiomu!",
    peruChanTheme: "lime",
  },
];
