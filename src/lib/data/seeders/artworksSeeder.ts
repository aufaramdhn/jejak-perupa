import { type ArtworkData } from "@/lib/data/artworks";

export const artworksSeeder: ArtworkData[] = [
  {
    id: "artwork-diponegoro",
    title: "Penangkapan Pangeran Diponegoro",
    slug: "penangkapan-pangeran-diponegoro",
    artistId: "art-raden-saleh",
    artistName: "Raden Saleh",
    yearCreated: 1857,
    mediumMaterial: "Cat Minyak pada Kanvas",
    dimensions: "112 cm × 179 cm",
    currentLocation: "Museum Istana Kepresidenan, Jakarta",
    highResImageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    isFeatured: true,
    description:
      "Mahakarya historis yang menggambarkan peristiwa pengkhianatan Jenderal De Kock saat menangkap Pangeran Diponegoro di Magelang pada 28 Maret 1830. Raden Saleh mengubah komposisi visual untuk menunjukkan keteguhan dan martabat luhur Diponegoro.",
    colorPalette: [
      { hex: "#1D2A44", name: "Deep Navy Blue" },
      { hex: "#8A5A36", name: "Warm Earth Sienna" },
      { hex: "#C79D58", name: "Antique Gold" },
      { hex: "#D6D3C7", name: "Parchment White" },
      { hex: "#1A1918", name: "Shadow Umber" },
    ],
    focalPoints: [
      {
        id: "fp-1",
        xPercent: 48,
        yPercent: 42,
        title: "Sosok Pangeran Diponegoro",
        description:
          "Diponegoro digambarkan berdiri tegak dengan tatapan berwibawa dan tidak tertunduk, mengenakan jubah putih sebagai simbol kesucian perjuangan.",
      },
      {
        id: "fp-2",
        xPercent: 72,
        yPercent: 45,
        title: "Gestur Jenderal De Kock",
        description:
          "De Kock digambarkan dengan postur memerintah yang congkak, namun komposisi kepala para perwira Belanda sengaja dibuat sedikit lebih besar secara proporsi satir.",
      },
      {
        id: "fp-3",
        xPercent: 28,
        yPercent: 68,
        title: "Potret Diri Raden Saleh",
        description:
          "Raden Saleh menyisipkan wajah dirinya di antara para pengikut Diponegoro yang bersujud dalam duka, menandakan keberpihakan emosional pelukis.",
      },
      {
        id: "fp-4",
        xPercent: 88,
        yPercent: 18,
        title: "Pencahayaan Langit Senja Dramatis",
        description:
          "Penggunaan teknik chiaroscuro Romantisisme Barat yang dramatis pada langit fajar menandakan berakhirnya era Perang Jawa.",
      },
    ],
  },
  {
    id: "artwork-affandi-pipa",
    title: "Potret Diri Mengisap Pipa",
    slug: "potret-diri-mengisap-pipa",
    artistId: "art-affandi",
    artistName: "Affandi",
    yearCreated: 1977,
    mediumMaterial: "Cat Minyak pada Kanvas (Teknik Plotot)",
    dimensions: "98 cm × 125 cm",
    currentLocation: "Museum Affandi, Yogyakarta",
    highResImageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1200&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    isFeatured: true,
    description:
      "Eksplorasi emosi mendalam Affandi melalui goresan garis liar dan tekstur tebal impasto. Meremas tube cat langsung ke kanvas dengan sapuan telapak tangan penuh energi kosmik.",
    colorPalette: [
      { hex: "#B83A1B", name: "Vermilion Red" },
      { hex: "#D48B28", name: "Ochre Yellow" },
      { hex: "#2E473B", name: "Forest Dark Green" },
      { hex: "#1F1B18", name: "Charcoal Black" },
    ],
    focalPoints: [
      {
        id: "fp-1",
        xPercent: 52,
        yPercent: 38,
        title: "Tatapan Mata Intens",
        description:
          "Goresan melingkar warna kuning dan merah menyala menonjolkan ekspresi kegelisahan sekaligus kejujuran jiwa sang pelukis.",
      },
      {
        id: "fp-2",
        xPercent: 42,
        yPercent: 62,
        title: "Pipa Cangklong Kayu",
        description:
          "Objek personal yang senantiasa menemani Affandi saat merenung dan mencari ilham berkarya.",
      },
      {
        id: "fp-3",
        xPercent: 78,
        yPercent: 25,
        title: "Simbol Matahari Energi Kosmis",
        description:
          "Affandi kerap menyisipkan motif matahari sebagai metafora sumber kehidupan dan daya cipta manusia di bumi.",
      },
    ],
  },
  {
    id: "artwork-pengantin-revolusi",
    title: "Pengantin Revolusi",
    slug: "pengantin-revolusi",
    artistId: "art-hendra-gunawan",
    artistName: "Hendra Gunawan",
    yearCreated: 1955,
    mediumMaterial: "Cat Minyak pada Kanvas",
    dimensions: "100 cm × 140 cm",
    currentLocation: "Galeri Nasional Indonesia, Jakarta",
    highResImageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
    isFeatured: false,
    description:
      "Penggambaran pernikahan sederhana para pejuang gerilya di tengah hiruk-pikuk revolusi fisik kemerdekaan dengan palet warna cerah khas Hendra Gunawan.",
    colorPalette: [
      { hex: "#6B3FA0", name: "Aubergine Violet" },
      { hex: "#299684", name: "Tropical Teal" },
      { hex: "#E85D75", name: "Bougainvillea Pink" },
      { hex: "#E9B44C", name: "Turmeric Yellow" },
    ],
    focalPoints: [
      {
        id: "fp-1",
        xPercent: 45,
        yPercent: 48,
        title: "Pasangan Mempelai Pejuang",
        description:
          "Ekspresi harapan tulus di tengah ketidakpastian situasi perang kemerdekaan Indonesia.",
      },
    ],
  },
];
