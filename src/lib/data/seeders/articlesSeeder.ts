import { type ArticleFullData } from "@/lib/data/articles";

export const articlesSeeder: ArticleFullData[] = [
  {
    id: "art-1",
    title: "Mengenal Program Studi Seni Rupa Murni",
    slug: "seni-rupa-murni",
    excerpt:
      "Panduan komprehensif mendalami keilmuan Seni Rupa Murni, dinamika perkuliahan studio, perbandingan 4 peminatan utama, hingga prospek karier kuratorial.",
    category: "Pendidikan Seni",
    categoryId: "cat-pendidikan",
    categoryVariant: "lime",
    readTime: "8 menit membaca",
    readTimeMinutes: 8,
    publishedDate: "2026 (Arsip Terkurasi)",
    authorName: "Kurator Redaksi Jejak Perupa",
    coverImageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    headerBgImageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&auto=format&fit=crop&q=80",
    headerGradientOpacity: 85,
    headerGradientHeight: 80,
    peruChanTipTitle: "Tips dari Peru-Chan",
    peruChanTip:
      "Wawasan teoritis, kepekaan lingkungan, perluasan jejaring, dan proses berpikir kritis adalah fondasi tak terpisahkan dari perjalanan belajar seni rupa.",
    tocItems: [
      { id: "berkenalan", title: "Berkenalan dengan Seni Rupa Murni", number: "01" },
      { id: "kuliahnya", title: "Dinamika Proses Belajar di Studio", number: "02" },
      { id: "modal", title: "Fondasi & Modal Pembelajaran", number: "03" },
      { id: "studio-komparasi", title: "Perbandingan Karakteristik 4 Studio Utama", number: "04" },
      { id: "profesi", title: "Peluang Karier & Ekosistem Seni", number: "05" },
      { id: "kesimpulan", title: "Refleksi & Kesimpulan", number: "06" },
    ],
    contentSections: [
      {
        id: "berkenalan",
        number: "01",
        heading: "Berkenalan dengan Seni Rupa Murni",
        paragraphs: [
          "Pengertian **Seni Rupa Murni** (dikenal secara internasional sebagai *Fine Art*) adalah cabang seni yang diciptakan untuk mengekspresikan nilai **estetika, kepekaan indrawi, dan diskursus intelektual murni**, di mana nilai estetika diutamakan di atas fungsi guna pragmatis.",
          "Seni Rupa Murni bertindak sebagai `fondasi ontologis` bagi seluruh cabang visual lainnya. Konsep dasar komposisi, teori warna, dan kepekaan bentuk di sini menjadi rujukan primer dalam bidang desain komunikasi visual, seni kriya, hingga arsitektur spasial.",
          "Di bangku perkuliahan akademik, mahasiswa tidak hanya dilatih mengasah kemahiran teknik tangan, melainkan dituntut mempertanggungjawabkan konsep karyanya secara kritis melalui kajian *sejarah seni*, *filsafat estetika*, dan *semiotika visual*.",
        ],
        peruChanTip: "Seni rupa murni melatih cara pandang kritis dalam membaca tanda-tanda visual di sekitar kita!",
        peruChanTheme: "blue",
      },
      {
        id: "kuliahnya",
        number: "02",
        heading: "Dinamika Proses Belajar di Studio",
        paragraphs: [
          "Proses belajar di Seni Rupa Murni berpusat pada **kerja studio intensif**. Alih-alih menghafal teori kaku di ruang kelas, mahasiswa belajar melalui eksperimen material berulang, asistensi berkala dengan kurator pengampu, serta tradisi `evaluasi karya terbuka (critique session)`.",
          "Dalam sesi kritik karya, perupa muda mempresentasikan karya di hadapan dosen dan rekan sejawat untuk menguji kekuatan konsep, ketepatan medium, serta resonansi estetika yang terpancar dari karya tersebut.",
        ],
        peruChanTip: "Jadikan kritik seni sebagai bahan bakar untuk mempertajam narasi dan kematangan visual karya!",
        peruChanTheme: "brown",
      },
      {
        id: "modal",
        number: "03",
        heading: "Fondasi & Modal Pembelajaran",
        paragraphs: [
          "Modal utama menempuh pendidikan seni adalah **daya observasi yang tajam**, *keberanian bereksperimen*, dan ketahanan proses (*grit*). Kemahiran teknik dasar drawing adalah instrumen pengantar, namun kedalaman rasa dan gagasan personal adalah faktor penentu orisinalitas.",
        ],
      },
      {
        id: "studio-komparasi",
        number: "04",
        heading: "Perbandingan Karakteristik 4 Studio Utama",
        paragraphs: [
          "Pada semester lanjutan, mahasiswa diarahkan memilih konsentrasi studio keahlian. Tabel berikut merangkum karakteristik medium, bahasa rupa dominan, dan fokus eksplorasi dari keempat studio utama:",
          "| Peminatan Studio | Karakteristik Medium | Bahasa Rupa Dominan | Fokus Eksplorasi |\n| :--- | :--- | :--- | :--- |\n| **Studio Seni Lukis** | Cat minyak, cat akrilik, kanvas, linen | Warna, garis ekspresif, tekstur `impasto` | Eksplorasi 2D, representasi naratif & abstraksi murni |\n| **Studio Seni Patung** | Logam, resin, kayu, batu, keramik, perunggu | Volume, massa padat, ruang 3D, kinetik | Instalasi spasial, monumen publik & seni situs spesifik |\n| **Studio Seni Grafis** | Etsa, cukil kayu (`woodcut`), cetak saring, litografi | Presisi matriks, repetisi cetak, cetak tinggi/dalam | Karya cetak edisi terbatas (*limited printmaking*) |\n| **Studio Seni Keramik** | Tanah liat stoneware, porselen, glasir suhu tinggi | Plastisitas material, bentuk putar, kimiawi glasir | Patung keramik kontemporer & kriya seni murni |",
          "Setiap studio menuntut disiplin penguasaan alat serta kepekaan material yang berbeda, namun semuanya bermuara pada orisinalitas ungkapan batin perupa.",
        ],
        peruChanTip: "Pilihlah studio yang mediumnya paling resonan dengan kepribadian dan gaya visualmu!",
        peruChanTheme: "lime",
      },
      {
        id: "profesi",
        number: "05",
        heading: "Peluang Karier & Ekosistem Seni",
        paragraphs: [
          "Lulusan Seni Rupa Murni memiliki lintasan karier yang sangat dinamis dalam ekosistem industri kreatif dan budaya:",
          "- **Seniman Profesional / Perupa Mandiri**: Menghasilkan karya untuk pameran tunggal/bersama, residensi seni internasional, dan biennale.\n- **Kurator Seni Rupa**: Merancang konsep kuratorial pameran, menyusun naskah telaah kritis, dan mengelola koleksi museum.\n- **Pengkaji & Kritikus Seni**: Menulis ulasan seni di jurnal akademik, media massa, dan penerbitan kuratorial.\n- **Art Director & Konseptor Visual**: Mengarahkan estetika visual untuk industri film, teater, panggung, dan media interaktif.\n- **Pengelola Galeri & Balai Lelang**: Mengorganisasi tata kelola pasar seni (*art market*), konservasi karya, dan hubungan kolektor.",
        ],
      },
      {
        id: "kesimpulan",
        number: "06",
        heading: "Refleksi & Kesimpulan",
        paragraphs: [
          "Menekuni **Seni Rupa Murni** adalah perjalanan intelektual dan spiritual untuk menafsirkan zaman. Di era disrupsi digital saat ini, kepekaan rasa (*human sensibility*) dan kemampuan berpikir kreatif orisinal seniman adalah kekayaan peradaban yang tidak tergantikan.",
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
      {
        citation: "Yuliman, Sanento. (2001). Dua Seni Rupa: Sepilihan Tulisan Sanento Yuliman. Yayasan Kalam.",
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
      "Eksplorasi prinsip dasar transparansi pigmen, wet-on-wet, wet-on-dry, hingga tabel kontrol kelembapan kertas untuk perupa pemula.",
    category: "Teknik Seni",
    categoryId: "cat-teknik",
    categoryVariant: "blue",
    readTime: "6 menit membaca",
    readTimeMinutes: 6,
    publishedDate: "2026",
    authorName: "Kurator Redaksi Jejak Perupa",
    coverImageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80",
    peruChanTipTitle: "Tips dari Peru-Chan",
    peruChanTip:
      "Kunci utama cat air adalah kesabaran menanti lapisan kering (glazing) dan keberanian membiarkan air mengalir bebas saat teknik basah-pada-basah.",
    tocItems: [
      { id: "karakteristik", title: "Karakteristik Transparansi Cat Air", number: "01" },
      { id: "teknik-dasar", title: "Dua Teknik Utama: Basah dan Kering", number: "02" },
      { id: "tabel-kelembapan", title: "Tabel Kontrol Kelembapan & Hasil Sapuan", number: "03" },
      { id: "kertas-dan-kuas", title: "Memilih Kertas & Kuas Berkualitas", number: "04" },
    ],
    contentSections: [
      {
        id: "karakteristik",
        number: "01",
        heading: "Karakteristik Transparansi Cat Air",
        paragraphs: [
          "Cat air (*watercolor*) adalah medium berbasis air dengan sifat **transparansi alami (luminosity)** yang mempesona. Berbeda dengan cat minyak atau akrilik yang bersifat opak dan dapat ditimpa dari warna gelap ke terang, cat air menuntut perupa bekerja terencana dari **warna paling terang menuju warna paling gelap**.",
          "Cahaya putih pada lukisan cat air tidak diperoleh dari cat putih sintetis, melainkan dari membiarkan serat putih kertas tetap bersih tanpa tersentuh pigmen (`preserve the whites`).",
        ],
        peruChanTip: "Hindari penggunaan cat putih untuk highlight cat air, manfaatkan warna putih alami kertas!",
        peruChanTheme: "blue",
      },
      {
        id: "teknik-dasar",
        number: "02",
        heading: "Dua Teknik Utama: Basah dan Kering",
        paragraphs: [
          "Terdapat dua metode dasar yang menjadi pilar manipulasi cat air di atas kertas:",
          "- **Teknik Basah pada Basah (`Wet-on-Wet`)**: Menyapu kuas basah berpigmen ke atas bidang kertas yang telah dilembapkan air jernih. Menghasilkan gradasi lembut, efek kabut puitis, dan percampuran warna spontan.\n- **Teknik Basah pada Kering (`Wet-on-Dry`)**: Menyapu kuas basah berpigmen ke atas permukaan kertas yang kering sempurna. Menghasilkan kontur tepi tegas (*hard edge*) yang sangat ideal untuk melukis detail figur, bayangan tajam, dan anatomi objek.",
        ],
      },
      {
        id: "tabel-kelembapan",
        number: "03",
        heading: "Tabel Kontrol Kelembapan & Hasil Sapuan",
        paragraphs: [
          "Keberhasilan sapuan cat air sangat ditentukan oleh rasio perbandingan air pada kuas terhadap tingkat kebasahan kertas. Simak matriks berikut:",
          "| Kondisi Kertas | Kondisi Kuas | Karakter Tepi Sapuan | Kegunaan Visual Terbaik |\n| :--- | :--- | :--- | :--- |\n| **Kertas Basah Berkilau** | Kuas Sangat Basah | Sangat Baur & Melebar Luas | Langit fajar, latar belakang atmosferik, bayangan air |\n| **Kertas Lembap (Damp)** | Kuas Kental (Pigmen Tinggi) | Baur Halus Terkendali | Siluet pegunungan jauh, tekstur dedaunan lembut |\n| **Kertas Kering Sempurna** | Kuas Basah Sedang | Garis Tegas & Rata (*Flat Wash*) | Bidang arsitektur, kelopak bunga, busana utama |\n| **Kertas Kering Bertekstur** | Kuas Setengah Kering (`Dry Brush`) | Tekstur Pecah Bergerigi | Percikan buih ombak, serat batang kayu, kilau cahaya danau |",
        ],
        peruChanTip: "Gunakan kertas uji coba (test strip) di samping karya utama untuk mengecek kepekatan warna sebelum diaplikasikan!",
        peruChanTheme: "brown",
      },
      {
        id: "kertas-dan-kuas",
        number: "04",
        heading: "Memilih Kertas & Kuas Berkualitas",
        paragraphs: [
          "Gunakan kertas khusus cat air dengan berat minimal `300 gsm` berbahan **100% serat katun (cotton rag)** agar kertas tidak melengkung (*buckling*) saat menampung volume air yang melimpah.",
          "Untuk kuas, sediakan kuas bulat (*round brush*) nomor 4, 8, dan kuas pelipat lebar (*mop/hake brush*) dari bulu alami atau sintetis bermutu tinggi yang memiliki daya lentur (*snap*) presisi.",
        ],
      },
    ],
    references: [
      {
        citation: "Smith, Ray. (2003). The Artist's Handbook. DK Publishing.",
        sourceType: "Buku",
      },
      {
        citation: "Couch, Tony. (1988). Watercolor: You Can Do It!. North Light Books.",
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
      "Sejarah seni bukan sekadar menghafal tahun dan tokoh, melainkan membaca evolusi gagasan, dialektika budaya, dan kesadaran estetik peradaban manusia.",
    category: "Sejarah Seni",
    categoryId: "cat-sejarah",
    categoryVariant: "brown",
    readTime: "7 menit membaca",
    readTimeMinutes: 7,
    publishedDate: "2026",
    authorName: "Kurator Redaksi Jejak Perupa",
    coverImageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
    peruChanTipTitle: "Tips dari Peru-Chan",
    peruChanTip:
      "Mempelajari karya masa lampau memberi kita kompas agar tidak mengulang gagasan yang sudah usang, sekaligus menemukan inspirasi segar untuk konteks masa kini.",
    tocItems: [
      { id: "sejarah-peta-gagasan", title: "Sejarah Sebagai Peta Gagasan", number: "01" },
      { id: "tabel-lintasan-aliran", title: "Lintasan Dialektika Gerakan Seni Rupa", number: "02" },
      { id: "konteks-sosial-nusantara", title: "Seni Rupa Sebagai Rekaman Sejarah Bangsa", number: "03" },
      { id: "relevansi-seniman-muda", title: "Relevansi Bagi Seniman Kontemporer", number: "04" },
    ],
    contentSections: [
      {
        id: "sejarah-peta-gagasan",
        number: "01",
        heading: "Sejarah Sebagai Peta Gagasan",
        paragraphs: [
          "Banyak orang beranggapan bahwa belajar sejarah seni itu membosankan karena disajikan sebatas kronologi tahun dan nama pelukis. Padahal, **setiap gerakan seni rupa lahir sebagai respons kritis terhadap era sebelumnya**.",
          "Karya seni tidak pernah hadir di ruang hampa; ia merupakan sintesis estetika dari pergulatan sosial, politik, spiritual, dan teknologi di zamannya.",
        ],
        peruChanTip: "Pahami 'alasan di balik karya' ketimbang sekadar menghafal tanggal pembuatannya!",
        peruChanTheme: "blue",
      },
      {
        id: "tabel-lintasan-aliran",
        number: "02",
        heading: "Lintasan Dialektika Gerakan Seni Rupa",
        paragraphs: [
          "Tabel berikut mengilustrasikan bagaimana gerakan seni rupa berevolusi melalui perlawanan terhadap dogma estetik masa lampau:",
          "| Periode & Aliran | Tokoh Pelopor Utama | Karakteristik Bahasa Rupa | Gugatan & Wacana Estetika |\n| :--- | :--- | :--- | :--- |\n| **Romantisisme** (Abad ke-19) | Raden Saleh, Eugène Delacroix | Dramatisasi cahaya `chiaroscuro`, emosi emosional, alam liar | Menggugat rasionalisme kaku Neoklasik demi kebebasan jiwa |\n| **Realisme** (Pertengahan Abad 19) | Gustave Courbet, Sudjojono | Kejujuran realitas sosial, rakyat jelata, tanpa polesan idealis | Menolak mitologi borjuis dan keindahan semu kaum elit |\n| **Impresionisme** (Akhir Abad 19) | Claude Monet, Pierre-Auguste Renoir | Sapuan kuas cepat, menangkap impresi cahaya alami *plein air* | Mendobrak kemonotonan studio lukis dan tradisi akademis formal |\n| **Ekspresionisme** (Awal Abad 20) | Affandi, Edvard Munch | Deformasi bentuk, garis bergelombang kinetik, warna simbolik | Mengekspresikan pergolakan psikologis batin sang seniman |\n| **Gerakan Seni Rupa Baru** (1975) | Jim Supangkat, FX Harsono | Seni instalasi, medium bebas, kritik sosial-politik tajam | Meruntuhkan batas elitis antara seni tinggi (*high art*) dan seni rakyat |",
        ],
      },
      {
        id: "konteks-sosial-nusantara",
        number: "03",
        heading: "Seni Rupa Sebagai Rekaman Sejarah Bangsa",
        paragraphs: [
          "Mempelajari seni rupa modern Indonesia memperlihatkan bagaimana perupa nusantara memposisikan diri dalam pergerakan kemerdekaan:",
          "- Dari perlawanan simbolik **Raden Saleh** melawan kolonialisme Belanda;\n- Semangat `Jiwa Ketok` kelompok **Persagi** yang digelorakan S. Sudjojono;\n- Letupan heroisme perang kemerdekaan dalam lukisan **Hendra Gunawan** dan **Affandi** di sanggar Pelukis Rakyat;\n- Hingga keberanian seniman kontemporer mengawal demokrasi reformasi.",
        ],
        peruChanTip: "Lukisan sejarah nusantara adalah dokumen visual autentik kemartabatan bangsa kita!",
        peruChanTheme: "brown",
      },
      {
        id: "relevansi-seniman-muda",
        number: "04",
        heading: "Relevansi Bagi Seniman Kontemporer",
        paragraphs: [
          "Perupa masa kini yang menguasai sejarah seni memiliki **landasan konseptual yang kokoh**. Mereka tidak akan mudah terjebak meniru gaya lama yang sudah basi, melainkan mampu melakukan dialog kritis lintas zaman dalam karya kontemporernya.",
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
      {
        citation: "Supangkat, Jim. (1979). Gerakan Seni Rupa Baru Indonesia. Gramedia.",
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
      "Analisis mendalam bagaimana Raden Saleh memanfaatkan teknik Romantisisme Eropa untuk menyuarakan kritik antikolonial dan kedaulatan bangsa.",
    category: "Profil Seniman",
    categoryId: "cat-profil",
    categoryVariant: "brown",
    readTime: "9 menit membaca",
    readTimeMinutes: 9,
    publishedDate: "2026",
    authorName: "Kurator Redaksi Jejak Perupa",
    featuredArtistSlug: "raden-saleh",
    coverImageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    peruChanTipTitle: "Tips dari Peru-Chan",
    peruChanTip:
      "Perhatikan bagaimana Raden Saleh menggunakan komposisi pencahayaan fajar untuk melambangkan terbitnya fajar harapan bangsa, bukan ratapan kekalahan.",
    tocItems: [
      { id: "latar-belakang", title: "Romantisisme dalam Bingkai Nusantara", number: "01" },
      { id: "komparasi-diponegoro", title: "Tabel Analisis Komparasi Lukisan Diponegoro", number: "02" },
      { id: "simbolisme-dan-tata-cahaya", title: "Simbolisme Tata Cahaya Chiaroscuro", number: "03" },
      { id: "warisan-kebangsaan", title: "Warisan Kesadaran Nasional", number: "04" },
    ],
    contentSections: [
      {
        id: "latar-belakang",
        number: "01",
        heading: "Romantisisme dalam Bingkai Nusantara",
        paragraphs: [
          "**Raden Saleh Syarif Bustaman** (1811 - 1880) adalah pelopor seni rupa modern Indonesia yang berhasil menguasai teknik cat minyak akademis di istana-istana Eropa. Namun alih-alih larut dalam eksotisme kolonial, ia secara brilian menyuntikkan narasi perlawanan politik tanah air.",
        ],
        peruChanTip: "Cermati bagaimana Raden Saleh menempatkan potret dirinya di tengah kerumunan pengikut Diponegoro sebagai bentuk solidaritas kultural!",
        peruChanTheme: "blue",
      },
      {
        id: "komparasi-diponegoro",
        number: "02",
        heading: "Tabel Analisis Komparasi Lukisan Diponegoro",
        paragraphs: [
          "Lukisan masterpiece *'Penangkapan Pangeran Diponegoro'* (1857) dibuat Raden Saleh sebagai **bantahan visual telak** terhadap lukisan pelukis Belanda Nicolaas Pieneman yang berjudul *'Penyerahan Diri Diponegoro'* (1835):",
          "| Elemen Komposisi | Versi Nicolaas Pieneman (1835) | Versi Raden Saleh (1857) | Makna Wacana Simbolik |\n| :--- | :--- | :--- | :--- |\n| **Judul Karya** | *Penyerahan Diri Diponegoro* | *Penangkapan Pangeran Diponegoro* | Dari narasi ketundukan (*surrender*) menjadi peristiwa pengkhianatan licik Belanda |\n| **Postur Diponegoro** | Berdiri di undakan bawah, wajah lesu & pasrah | Berdiri tegap sejajar Jenderal De Kock, dagu terangkat gagah | Menegaskan martabat ksatria pejuang yang tidak pernah tunduk |\n| **Bendera Belanda** | Berkibar megah di atas gedung keresidenan | Dihilangkan sepenuhnya oleh Raden Saleh | Menolak legitimasi supremasi kekuasaan kolonial di tanah Jawa |\n| **Pengikut Jawa** | Digambarkan menangis histeris & meletakkan senjata | Berdiri tegap mendampingi, sebagian menahan amarah | Menggambarkan rakyat yang setia dan siap melanjutkan perjuangan |\n| **Proporsi Kepala Belanda** | Proporsional, berwibawa & terhormat | Sedikit lebih besar dan terkesan kaku (*rigid*) | Kritik satir visual terhadap keangkuhan militer kolonial |",
        ],
        peruChanTip: "Bantahan visual Raden Saleh ini adalah manifesto dekolonisasi pertama dalam sejarah seni rupa modern Asia!",
        peruChanTheme: "brown",
      },
      {
        id: "simbolisme-dan-tata-cahaya",
        number: "03",
        heading: "Simbolisme Tata Cahaya Chiaroscuro",
        paragraphs: [
          "Raden Saleh menerapkan keahlian tata cahaya dramatis `chiaroscuro`. Sinar matahari fajar menyinari wajah Pangeran Diponegoro yang mengenakan jubah putih bersih dan surban hijau, melambangkan **kesucian perjuangan dan terbitnya fajar kesadaran nasional**.",
        ],
      },
      {
        id: "warisan-kebangsaan",
        number: "04",
        heading: "Warisan Kesadaran Nasional",
        paragraphs: [
          "Karya ini kini ditetapkan sebagai **Cagar Budaya Nasional Indonesia** dan disimpan di Istana Kepresidenan Yogyakarta, menjadi bukti autentik keberanian intelektual seniman nusantara di panggung dunia.",
        ],
      },
    ],
    references: [
      {
        citation: "Kraus, Werner. (2012). Raden Saleh: Kehidupan dan Karyanya. Kepustakaan Populer Gramedia.",
        sourceType: "Buku",
      },
      {
        citation: "Carey, Peter. (2014). Takdir: Riwayat Pangeran Diponegoro 1785-1855. Kompas.",
        sourceType: "Buku",
      },
    ],
    relatedSlugs: ["mengapa-belajar-sejarah-seni", "seni-rupa-murni"],
  },
];
