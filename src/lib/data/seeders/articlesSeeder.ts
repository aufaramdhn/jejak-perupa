import { type ArticleFullData } from "@/lib/data/articles";

export const articlesSeeder: ArticleFullData[] = [
  {
    id: "art-1",
    title: "Mengenal Program Studi Seni Rupa Murni",
    slug: "seni-rupa-murni",
    excerpt:
      "Mengenal Seni Rupa Murni, kehidupan perkuliahannya, 4 studio utama, hingga berbagai kemungkinan profesi setelah lulus.",
    category: "Pendidikan Seni",
    categoryId: "cat-pendidikan",
    categoryVariant: "lime",
    readTime: "8 menit membaca",
    readTimeMinutes: 8,
    publishedDate: "2017 (Arsip Terkurasi)",
    authorName: "Jejak Perupa",
    coverImageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    headerBgImageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&auto=format&fit=crop&q=80",
    headerGradientOpacity: 85,
    headerGradientHeight: 80,
    peruChanTipTitle: "Tips dari Peru-Chan",
    peruChanTip:
      "Wawasan teoritis, kepekaan lingkungan, perluasan jejaring, dan proses berpikir kritis adalah bagian tak terpisahkan dari perjalanan belajar seni rupa.",
    tocItems: [
      { id: "berkenalan", title: "Berkenalan dengan Seni Rupa Murni", number: "01" },
      { id: "kuliahnya", title: "Kuliahnya bagaimana?", number: "02" },
      { id: "modal", title: "Modalnya apa?", number: "03" },
      { id: "asiknya", title: "Asiknya kuliah seni rupa murni?", number: "04" },
      { id: "studio", title: "Studio Pilihan di Seni Rupa Murni", number: "05" },
      { id: "profesi", title: "Mau Jadi Apa Setelah Lulus?", number: "06" },
      { id: "kesimpulan", title: "Kesimpulannya?", number: "07" },
    ],
    contentSections: [
      {
        id: "berkenalan",
        number: "01",
        heading: "Berkenalan dengan Seni Rupa Murni",
        paragraphs: [
          "Pengertian Seni Rupa Murni atau dikenal juga sebagai Fine Art adalah suatu bentuk seni yang diciptakan dengan tujuan untuk nilai estetika dan artistik murni. Tujuan tersebut lebih ditekankan daripada nilai fungsi terapan pragmatis.",
          "Seni Rupa Murni merupakan fondasi bagi cabang seni lainnya, sehingga ilmu yang dipelajari sering memiliki irisan erat dengan desain komunikasi visual, desain interior, kriya, maupun seni pertunjukan.",
          "Di bangku kuliah, seni rupa murni didominasi oleh kerja studio dan eksplorasi material, namun tetap diperkuat oleh kajian teori estetika, sejarah seni, dan kritik seni untuk mempertanggungjawabkan konsep karya secara akademik.",
        ],
      },
      {
        id: "kuliahnya",
        number: "02",
        heading: "Kuliahnya bagaimana?",
        paragraphs: [
          "Kuliah di Seni Rupa Murni bukan sekadar diajari teknik melukis atau memahat secara kaku seperti menghafal rumus. Di sini, mahasiswa didorong untuk mengeksplorasi dan membentuk karakter visual serta gaya pribadi masing-masing.",
          "Dosen berperan sebagai fasilitator, pemantik diskusi, dan kurator yang memberikan masukan konseptual. Pertukaran gagasan dengan rekan studio dan kakak tingkat menjadi ruang belajar yang sangat kaya.",
        ],
      },
      {
        id: "modal",
        number: "03",
        heading: "Modalnya apa?",
        paragraphs: [
          "Modal utama masuk Seni Rupa Murni adalah rasa ingin tahu yang besar, keberanian bereksperimen, kemauan untuk terus berproses, serta kesenangan dalam mengamati keindahan visual di sekitar.",
          "Keterampilan teknis dasar tentu sangat membantu dalam proses seleksi masuk, namun ketekunan dan daya tahan eksplorasi studio adalah kunci utama keberhasilan studi.",
        ],
      },
      {
        id: "asiknya",
        number: "04",
        heading: "Asiknya kuliah seni rupa murni?",
        paragraphs: [
          "Mendalami seni rupa memberikan kebanggaan tersendiri karena mengembangkan cara pandang unik yang tidak dimiliki semua orang. Lingkungan studionya majemuk dan terbuka terhadap berbagai gagasan kreatif.",
          "Proses berkarya memberikan kepuasan mendalam ketika gagasan abstrak berhasil diwujudkan menjadi karya fisik atau instalasi yang dapat diapresiasi publik dalam pameran berkala.",
        ],
      },
      {
        id: "studio",
        number: "05",
        heading: "Studio Pilihan di Seni Rupa Murni",
        paragraphs: [
          "Pada umumnya, di semester lanjutan mahasiswa memilih fokus peminatan atau konsentrasi studio: Studio Seni Lukis, Studio Seni Patung, Studio Seni Grafis, dan Studio Seni Keramik.",
        ],
      },
      {
        id: "profesi",
        number: "06",
        heading: "Mau Jadi Apa Setelah Lulus?",
        paragraphs: [
          "Peluang profesi lulusan Seni Rupa Murni sangat luas: Seniman Profesional, Kurator Seni Rupa, Kritikus Seni, Pengkaji Seni, Art Director, Tenaga Pendidik, Pengelola Galeri/Museum, hingga Wirausaha Kreatif.",
        ],
      },
      {
        id: "kesimpulan",
        number: "07",
        heading: "Kesimpulannya?",
        paragraphs: [
          "Jika kamu memiliki minat mendalam dan panggilan hati di Seni Rupa Murni, jangan ragu untuk menekuninya dengan sungguh-sungguh. Keahlian berpikir kreatif dan kepekaan estetika adalah modal berharga di era modern.",
        ],
      },
    ],
    references: [
      {
        citation: "Feldman, E. B. (1994). Practical Art Criticism. Prentice Hall.",
        sourceType: "Buku",
      },
      {
        citation: "Soedarso Sp. (2006). Trilogi Seni: Penciptaan, Eksistensi, dan Kegunaan Seni. BP ISI Yogyakarta.",
        sourceType: "Buku",
      },
    ],
    relatedSlugs: ["dasar-teknik-cat-air", "mengapa-belajar-sejarah-seni"],
  },
  {
    id: "art-2",
    title: "Mengenal Dasar Teknik Cat Air",
    slug: "dasar-teknik-cat-air",
    excerpt:
      "Prinsip dasar yang penting dipelajari sebelum bereksperimen dengan transparansi pigmen, wet-on-wet, dan basah pada kering.",
    category: "Teknik Seni",
    categoryId: "cat-teknik",
    categoryVariant: "blue",
    readTime: "6 menit membaca",
    readTimeMinutes: 6,
    publishedDate: "2026",
    authorName: "Jejak Perupa",
    coverImageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80",
    peruChanTipTitle: "Tips dari Peru-Chan",
    peruChanTip:
      "Kunci utama cat air adalah kesabaran menanti lapisan kering (glazing) dan keberanian membiarkan air mengalir bebas saat teknik basah-pada-basah.",
    tocItems: [
      { id: "karakteristik", title: "Karakteristik Transparansi Cat Air", number: "01" },
      { id: "teknik-dasar", title: "Dua Teknik Utama: Basah dan Kering", number: "02" },
      { id: "kertas-dan-kuas", title: "Memilih Kertas Cat Air yang Tepat", number: "03" },
    ],
    contentSections: [
      {
        id: "karakteristik",
        number: "01",
        heading: "Karakteristik Transparansi Cat Air",
        paragraphs: [
          "Cat air (watercolor) adalah medium berbasis air dengan sifat transparan alami. Berbeda dengan cat minyak atau akrilik yang bersifat opak dan dapat ditimpa dari gelap ke terang, cat air menuntut perupa bekerja dari warna paling terang menuju warna paling gelap.",
          "Cahaya putih pada lukisan cat air tidak diperoleh dari cat putih, melainkan dari membiarkan putihnya serat kertas tetap bersih tanpa sapuan pigmen.",
        ],
      },
      {
        id: "teknik-dasar",
        number: "02",
        heading: "Dua Teknik Utama: Basah dan Kering",
        paragraphs: [
          "Teknik Basah pada Basah (Wet-on-Wet): Menyapu kuas basah berpigmen ke atas kertas yang sudah dibasahi air terlebih dahulu. Hasilnya berupa gradasi lembut dan efek kabut spontan.",
          "Teknik Basah pada Kering (Wet-on-Dry): Menyapu kuas basah ke atas kertas yang kering. Teknik ini menghasilkan tepi garis tegas dan cocok untuk detail objek akhir.",
        ],
      },
      {
        id: "kertas-dan-kuas",
        number: "03",
        heading: "Memilih Kertas Cat Air yang Tepat",
        paragraphs: [
          "Gunakan kertas khusus watercolor dengan ketebalan minimal 300 gsm agar kertas tidak melengkung atau rusak saat menampung volume air yang banyak.",
        ],
      },
    ],
    references: [
      {
        citation: "Smith, Ray. (2003). The Artist's Handbook. DK Publishing.",
        sourceType: "Buku",
      },
    ],
    relatedSlugs: ["seni-rupa-murni", "mengapa-belajar-sejarah-seni"],
  },
  {
    id: "art-3",
    title: "Mengapa Kita Perlu Belajar Sejarah Seni?",
    slug: "mengapa-belajar-sejarah-seni",
    excerpt:
      "Sejarah bukan sekadar menghafal tahun dan nama tokoh, melainkan membaca evolusi gagasan dan peradaban manusia.",
    category: "Sejarah Seni",
    categoryId: "cat-sejarah",
    categoryVariant: "brown",
    readTime: "7 menit membaca",
    readTimeMinutes: 7,
    publishedDate: "2026",
    authorName: "Jejak Perupa",
    coverImageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
    peruChanTipTitle: "Tips dari Peru-Chan",
    peruChanTip:
      "Mempelajari karya masa lampau memberi kita kompas agar tidak mengulang gagasan yang sudah usang, sekaligus menemukan inspirasi segar untuk konteks masa kini.",
    tocItems: [
      { id: "sejarah-bukan-hafalan", title: "Sejarah Sebagai Peta Gagasan", number: "01" },
      { id: "konteks-sosial", title: "Karya Seni Sebagai Rekaman Zaman", number: "02" },
      { id: "relevansi-kini", title: "Menemukan Bahasa Rupa Kontemporer", number: "03" },
    ],
    contentSections: [
      {
        id: "sejarah-bukan-hafalan",
        number: "01",
        heading: "Sejarah Sebagai Peta Gagasan",
        paragraphs: [
          "Banyak orang menganggap sejarah seni membosankan karena disajikan sebagai daftar kronologis tahun dan nama pelukis. Padahal, setiap era seni lahir sebagai respons kritis terhadap era sebelumnya.",
          "Realisme lahir mendobrak Romantisisme yang terlalu melankolis, Impresionisme lahir mendobrak kemonotonan studio akademis, dan Kubisme lahir mendekonstruksi sudut pandang tunggal Renaissance.",
        ],
      },
      {
        id: "konteks-sosial",
        number: "02",
        heading: "Karya Seni Sebagai Rekaman Zaman",
        paragraphs: [
          "Mempelajari seni rupa nusantara dari masa Raden Saleh, Persagi (Sudjojono), Pelukis Rakyat (Hendra Gunawan & Affandi), hingga Gerakan Seni Rupa Baru (GSRB 1975) memperlihatkan bagaimana seniman Indonesia merespons kolonialisme, revolusi fisik, dan modernisasi.",
        ],
      },
      {
        id: "relevansi-kini",
        number: "03",
        heading: "Menemukan Bahasa Rupa Kontemporer",
        paragraphs: [
          "Seniman masa kini yang memahami sejarah memiliki kedalaman konsep yang kokoh. Mereka mampu melakukan dialog lintas zaman dalam karyanya.",
        ],
      },
    ],
    references: [
      {
        citation: "Holt, Claire. (1967). Art in Indonesia: Continuities and Change. Cornell University Press.",
        sourceType: "Buku",
      },
      {
        citation: "Sanento Yuliman. (2001). Dua Seni Rupa: Sepilihan Tulisan Sanento Yuliman. Yayasan Kalam.",
        sourceType: "Buku",
      },
    ],
    relatedSlugs: ["seni-rupa-murni", "romantisisme-raden-saleh"],
  },
  {
    id: "art-4",
    title: "Membedah Romantisisme Kritis Raden Saleh",
    slug: "romantisisme-raden-saleh",
    excerpt:
      "Bagaimana Raden Saleh menggunakan gaya visual Romantisisme Eropa untuk menyuarakan kritik antikolonial yang tajam.",
    category: "Profil Seniman",
    categoryId: "cat-profil",
    categoryVariant: "brown",
    readTime: "9 menit membaca",
    readTimeMinutes: 9,
    publishedDate: "2026",
    authorName: "Jejak Perupa",
    featuredArtistSlug: "raden-saleh",
    coverImageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    peruChanTipTitle: "Tips dari Peru-Chan",
    peruChanTip:
      "Perhatikan bagaimana Raden Saleh menggunakan komposisi pencahayaan fajar untuk melambangkan terbitnya harapan baru, bukan kekalahan.",
    tocItems: [
      { id: "latar-belakang", title: "Romantisisme dalam Bingkai Timur", number: "01" },
      { id: "simbolisme-karya", title: "Simbolisme Penangkapan Diponegoro", number: "02" },
      { id: "warisan-kebangsaan", title: "Warisan Kesadaran Nasional", number: "03" },
    ],
    contentSections: [
      {
        id: "latar-belakang",
        number: "01",
        heading: "Romantisisme dalam Bingkai Timur",
        paragraphs: [
          "Raden Saleh menyerap kehebatan teknik Romantisisme Eropa seperti yang dipelopori Eugène Delacroix dan Théodore Géricault. Namun, ia tidak sekadar meniru eksotisme orientalis, melainkan menyuntikkan narasi kedaulatan tanah kelahirannya.",
        ],
      },
      {
        id: "simbolisme-karya",
        number: "02",
        heading: "Simbolisme Penangkapan Diponegoro",
        paragraphs: [
          "Karya Penangkapan Pangeran Diponegoro (1857) merupakan bantahan visual atas lukisan pelukis Belanda Nicolaas Pieneman yang berjudul 'Penyerahan Diri Diponegoro'. Raden Saleh secara sengaja menggambarkan Diponegoro dengan kepala tegak dan sikap ksatria yang tidak gentar.",
        ],
      },
      {
        id: "warisan-kebangsaan",
        number: "03",
        heading: "Warisan Kesadaran Nasional",
        paragraphs: [
          "Lukisan tersebut kini menjadi Cagar Budaya Nasional Indonesia dan rujukan utama keberanian intelektual seniman dalam memperjuangkan martabat bangsanya.",
        ],
      },
    ],
    references: [
      {
        citation: "Kraus, Werner. (2012). Raden Saleh: Kehidupan dan Karyanya. Kepustakaan Populer Gramedia.",
        sourceType: "Buku",
      },
    ],
    relatedSlugs: ["mengapa-belajar-sejarah-seni", "seni-rupa-murni"],
  },
];
