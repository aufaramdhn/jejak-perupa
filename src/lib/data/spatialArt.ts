export interface SpatialLocation {
  id: string;
  name: string;
  slug: string;
  category: "Museum" | "Galeri Seni" | "Monumen & Situs" | "Sanggar & Kolektif";
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  associatedArtists?: string[];
  imageUrl?: string;
  websiteUrl?: string;
}

export const spatialLocationsData: SpatialLocation[] = [
  // 1. JAKARTA
  {
    id: "loc-galnas",
    name: "Galeri Nasional Indonesia",
    slug: "galeri-nasional-indonesia",
    category: "Galeri Seni",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    latitude: -6.1777,
    longitude: 106.8336,
    address: "Jl. Medan Merdeka Timur No.14, Gambir, Jakarta Pusat",
    description:
      "Lembaga museum dan pusat seni rupa modern dan kontemporer nasional yang mengoleksi ribuan mahakarya maestro Indonesia dari era Raden Saleh hingga seniman kiwari.",
    associatedArtists: ["Raden Saleh", "Affandi", "Basoeki Abdullah", "Hendra Gunawan"],
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "https://galeri-nasional.or.id",
  },
  {
    id: "loc-basoeki-abdullah",
    name: "Museum Basoeki Abdullah",
    slug: "museum-basoeki-abdullah",
    category: "Museum",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    latitude: -6.2941,
    longitude: 106.7925,
    address: "Jl. Keuangan Raya No.19, Cilandak Barat, Jakarta Selatan",
    description:
      "Museum yang menempati kediaman pribadi mendiang maestro realisme Basoeki Abdullah, menyimpan koleksi lukisan potret, mitologi Jawa, wayang, dan benda seni bernilai sejarah tinggi.",
    associatedArtists: ["Basoeki Abdullah", "Abdullah Suriosubroto"],
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "https://kebudayaan.kemdikbud.go.id/musba/",
  },
  {
    id: "loc-macan",
    name: "Museum MACAN (Modern and Contemporary Art in Nusantara)",
    slug: "museum-macan",
    category: "Museum",
    city: "Jakarta Barat",
    province: "DKI Jakarta",
    latitude: -6.1917,
    longitude: 106.7686,
    address: "AKR Tower Level M, Jl. Perjuangan No.5, Kebon Jeruk, Jakarta Barat",
    description:
      "Museum seni modern dan kontemporer swasta pertama di Indonesia yang menyajikan pameran berskala internasional dan karya instalasi multidisiplin.",
    associatedArtists: ["Raden Saleh", "S. Sudjojono", "Yayoi Kusama"],
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "https://museummacan.org",
  },

  // 2. BANDUNG & JAWA BARAT
  {
    id: "loc-selasar-sunaryo",
    name: "Selasar Sunaryo Art Space",
    slug: "selasar-sunaryo-art-space",
    category: "Galeri Seni",
    city: "Bandung",
    province: "Jawa Barat",
    latitude: -6.8576,
    longitude: 107.6418,
    address: "Jl. Bukit Pakar Timur No.100, Ciburial, Cimenyan, Bandung",
    description:
      "Pusat seni nirlaba yang didirikan oleh pematung Sunaryo pada tahun 1998, aktif menjadi episentrum pameran, residensi seni, dan diskusi kuratorial.",
    associatedArtists: ["Sunaryo", "A.D. Pirous"],
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "https://selasarsunaryo.com",
  },
  {
    id: "loc-nuart",
    name: "NuArt Sculpture Park",
    slug: "nuart-sculpture-park",
    category: "Monumen & Situs",
    city: "Bandung Barat",
    province: "Jawa Barat",
    latitude: -6.8779,
    longitude: 107.5752,
    address: "Jl. Setra Duta Raya No.L6, Ciwaruga, Parongpong, Bandung Barat",
    description:
      "Taman patung seluas 3 hektar karya maestro seni patung modern Nyoman Nuarta, perancang mahakarya Garuda Wisnu Kencana dan Istana Garuda IKN.",
    associatedArtists: ["Nyoman Nuarta"],
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "https://nuartsculpturepark.com",
  },

  // 3. YOGYAKARTA & JAWA TENGAH
  {
    id: "loc-museum-affandi",
    name: "Museum Affandi",
    slug: "museum-affandi",
    category: "Museum",
    city: "Sleman",
    province: "D.I. Yogyakarta",
    latitude: -7.7828,
    longitude: 110.3962,
    address: "Jl. Laksda Adisucipto No.167, Caturtunggal, Depok, Sleman, Yogyakarta",
    description:
      "Kompleks museum berarsitektur unik menyerupai pelepah pisang di tepi Sungai Gajah Wong yang menyimpan lebih dari 300 karya lukis Affandi dan makam sang maestro.",
    associatedArtists: ["Affandi", "Kartika Affandi"],
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "https://affandi.org",
  },
  {
    id: "loc-jnm",
    name: "Jogja National Museum (JNM)",
    slug: "jogja-national-museum",
    category: "Galeri Seni",
    city: "Yogyakarta",
    province: "D.I. Yogyakarta",
    latitude: -7.8016,
    longitude: 110.3541,
    address: "Jl. Prof. DR. Ki Amri Yahya No.1, Pakuncen, Wirobrajan, Yogyakarta",
    description:
      "Bekas kompleks kampus Akademi Seni Rupa Indonesia (ASRI) yang kini bertransformasi menjadi ruang pameran seni kontemporer dan tuan rumah ArtJog.",
    associatedArtists: ["Sudjojono", "Hendra Gunawan", "Fajar Sidik"],
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "https://jogjanationalmuseum.com",
  },
  {
    id: "loc-minggiran",
    name: "Studio Grafis Minggiran",
    slug: "studio-grafis-minggiran",
    category: "Sanggar & Kolektif",
    city: "Yogyakarta",
    province: "D.I. Yogyakarta",
    latitude: -7.8242,
    longitude: 110.3621,
    address: "Minggiran MJ II / 1083, Suryodiningratan, Mantrijeron, Yogyakarta",
    description:
      "Pusat workshop dan sanggar independen yang berdedikasi melestarikan dan mengembangkan teknik cetak tinggi, intaglio, dan litografi di Indonesia.",
    associatedArtists: ["Syahrizal Pahlevi", "Seniman Grafis Muda"],
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "#",
  },

  // 4. BALI
  {
    id: "loc-puri-lukisan",
    name: "Museum Puri Lukisan",
    slug: "museum-puri-lukisan",
    category: "Museum",
    city: "Gianyar (Ubud)",
    province: "Bali",
    latitude: -8.5069,
    longitude: 115.2608,
    address: "Jl. Raya Ubud, Ubud, Kecamatan Ubud, Kabupaten Gianyar, Bali",
    description:
      "Museum seni tertua di Bali yang didirikan pada tahun 1956 oleh Tjokorda Gde Agung Sukawati dan pelukis Rudolf Bonnet untuk melestarikan seni lukis dan ukir Bali tradisional dan modern.",
    associatedArtists: ["Rudolf Bonnet", "Walter Spies", "I Gusti Nyoman Lempad"],
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "https://museumpurilukisan.com",
  },
  {
    id: "loc-neka-museum",
    name: "Museum Seni Neka",
    slug: "museum-seni-neka",
    category: "Museum",
    city: "Gianyar (Ubud)",
    province: "Bali",
    latitude: -8.4975,
    longitude: 115.2505,
    address: "Jl. Raya Sanggingan Campuhan, Kedewatan, Ubud, Gianyar, Bali",
    description:
      "Museum seni terkemuka di Ubud yang mendokumentasikan evolusi seni rupa Bali dari gaya klasik Wayang Kamasan, pita maha, hingga pengaruh pelukis mancanegara.",
    associatedArtists: ["Arie Smit", "Affandi", "Hendra Gunawan", "Nyoman Gunarsa"],
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "https://museumneka.com",
  },

  // 5. SUMATERA & SULAWESI
  {
    id: "loc-rumah-budaya-fadli",
    name: "Rumah Budaya Fadli Zon",
    slug: "rumah-budaya-fadli-zon",
    category: "Museum",
    city: "Tanah Datar",
    province: "Sumatera Barat",
    latitude: -0.4578,
    longitude: 100.4128,
    address: "Jl. Raya Padang Panjang - Bukittinggi KM 6, Aie Angek, Tanah Datar",
    description:
      "Pusat dokumentasi dan pelestarian artefak kebudayaan Minangkabau serta koleksi seni rupa nusantara di kaki Gunung Singgalang.",
    associatedArtists: ["Mochtar Apin", "Wakidi"],
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "#",
  },
  {
    id: "loc-rumata",
    name: "Rumata' Artspace",
    slug: "rumata-artspace",
    category: "Sanggar & Kolektif",
    city: "Makassar",
    province: "Sulawesi Selatan",
    latitude: -5.1612,
    longitude: 119.4312,
    address: "Jl. Bontonompo No.12, Gn. Sari, Kec. Rappocini, Kota Makassar",
    description:
      "Ruang seni independen nirlaba di Indonesia Timur yang didirikan oleh sutradara Riri Riza dan sastrawan Lily Yulianti Farid untuk menghubungkan komunitas seni, pameran visual, dan festival sastra.",
    associatedArtists: ["Riri Riza", "Seniman Visual Makassar"],
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80",
    websiteUrl: "https://rumata.art",
  },
];
