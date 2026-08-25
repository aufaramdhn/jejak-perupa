export interface ArtistTimelineEvent {
  year: number;
  title: string;
  description: string;
}

export interface ArtistData {
  id: string;
  name: string;
  slug: string;
  birthYear: number;
  deathYear?: number;
  originCity: string;
  artMovement: string;
  studioDiscipline: string;
  shortBio: string;
  fullBiography: string[];
  photoUrl?: string;
  isFeatured: boolean;
  timelines: ArtistTimelineEvent[];
  relatedArtists: { name: string; slug: string; relation: string }[];
}

export const artistsData: ArtistData[] = [
  {
    id: "art-raden-saleh",
    name: "Raden Saleh Sjarif Boestaman",
    slug: "raden-saleh",
    birthYear: 1811,
    deathYear: 1880,
    originCity: "Semarang, Jawa Tengah",
    artMovement: "Romantisisme",
    studioDiscipline: "Seni Lukis (Cat Minyak)",
    shortBio:
      "Pelopor seni lukis modern Indonesia bergaya Romantisisme dramatis. Perjalanan panjangnya di Eropa dan dedikasinya pada identitas nusantara meninggalkan jejak abadi dalam sejarah seni dunia.",
    fullBiography: [
      "Raden Saleh lahir di Terboyo, Semarang pada tahun 1811 dalam lingkungan keluarga bangsawan Jawa. Bakat melukisnya diasah sejak dini di bawah bimbingan Antoine Payen, seorang pelukis asal Belgia yang dipekerjakan oleh pemerintah kolonial.",
      "Pada tahun 1829, Raden Saleh bertolak ke Belanda dan kemudian menjelajahi berbagai pusat kebudayaan Eropa termasuk Jerman, Prancis, dan Italia. Di sana ia mempelajari teknik lukis cat minyak kanvas bergaya Romantisisme yang sarat dengan dinamika emosi, ketegangan alam, dan drama visual.",
      "Karyanya yang paling termasyhur, Penangkapan Pangeran Diponegoro (1857), menjadi mahakarya simbolik penentangan terhadap narasi penyerahan diri versi kolonial, menjadikannya tonggak sejarah kesadaran kebangsaan melalui bahasa visual seni rupa.",
    ],
    isFeatured: true,
    timelines: [
      {
        year: 1811,
        title: "Kelahiran di Semarang",
        description: "Lahir dari keluarga bangsawan Jawa di Terboyo, Semarang.",
      },
      {
        year: 1829,
        title: "Perjalanan Studi ke Eropa",
        description: "Berangkat ke Belanda untuk mendalami ilmu seni rupa dan teknik cat minyak Barat.",
      },
      {
        year: 1857,
        title: "Penyelesaian Karya Penangkapan Pangeran Diponegoro",
        description: "Menyelesaikan karya respons historis yang sarat simbol antikolonial.",
      },
      {
        year: 1880,
        title: "Wafat di Bogor",
        description: "Menutup usia di Bogor, Jawa Barat setelah mewariskan fondasi seni rupa modern Indonesia.",
      },
    ],
    relatedArtists: [
      { name: "Antoine Payen", slug: "antoine-payen", relation: "Guru Pertama" },
      { name: "Cornelis Kruseman", slug: "cornelis-kruseman", relation: "Mentor di Belanda" },
      { name: "Basoeki Abdullah", slug: "basoeki-abdullah", relation: "Penerus Tradisi Realisme" },
    ],
  },
  {
    id: "art-affandi",
    name: "Affandi Koesoema",
    slug: "affandi",
    birthYear: 1907,
    deathYear: 1990,
    originCity: "Cirebon, Jawa Barat",
    artMovement: "Ekspresionisme",
    studioDiscipline: "Seni Lukis (Teknik Plototan)",
    shortBio:
      "Maestro seni lukis ekspresionisme Indonesia yang mendunia dengan teknik khas meremas cat langsung dari tube dan membentuk goresan menggunakan jari-jemari tangan.",
    fullBiography: [
      "Affandi lahir di Cirebon pada tahun 1907. Ia belajar seni secara otodidak dan aktif menggerakkan kelompok-kelompok seniman revolusioner pada masa kemerdekaan, seperti Seniman Indonesia Muda (SIM) dan Pelukis Rakyat.",
      "Gaya melukis Affandi berkembang dari realisme humanistik menjadi ekspresionisme murni yang sangat intuitif dan bertenaga. Ia jarang menggunakan kuas konvensional, melainkan langsung memplototkan cat dari tube ke atas kanvas dan menyapunya dengan telapak serta jemari tangannya.",
      "Karya-karyanya banyak mengangkat potret kehidupan rakyat kecil, petani, pengemis, adu ayam, dan potret diri yang menggugah empati kemanusiaan.",
    ],
    isFeatured: true,
    timelines: [
      {
        year: 1907,
        title: "Kelahiran di Cirebon",
        description: "Lahir dari keluarga mantri ukur pabrik gula di Cirebon.",
      },
      {
        year: 1945,
        title: "Aktivisme Poster Kemerdekaan",
        description: "Membuat poster legendaris 'Boeng Ajo Boeng' bersama Chairil Anwar dan Dullah.",
      },
      {
        year: 1954,
        title: "Mewakili Indonesia di Venice Biennale",
        description: "Menjadi pelukis Indonesia pertama yang berpameran resmi di Venice Biennale, Italia.",
      },
      {
        year: 1990,
        title: "Wafat di Yogyakarta",
        description: "Dimakamkan di kompleks Museum Affandi di tepi Sungai Gajah Wong, Yogyakarta.",
      },
    ],
    relatedArtists: [
      { name: "Sudjojono", slug: "s-sudjojono", relation: "Rekan Pendiri Persagi" },
      { name: "Hendra Gunawan", slug: "hendra-gunawan", relation: "Sahabat Seperjuangan Studio" },
    ],
  },
  {
    id: "art-basoeki-abdullah",
    name: "Basoeki Abdullah",
    slug: "basoeki-abdullah",
    birthYear: 1915,
    deathYear: 1993,
    originCity: "Surakarta, Jawa Tengah",
    artMovement: "Realisme dan Naturalisme",
    studioDiscipline: "Seni Lukis Potret & Pemandangan",
    shortBio:
      "Maestro seni lukis realisme dan naturalisme romantik terkemuka, dikenal atas keahlian melukis potret tokoh dunia, keelokan lanskap alam nusantara, dan mitologi Jawa.",
    fullBiography: [
      "Basoeki Abdullah lahir di Surakarta pada tahun 1915, putra dari pelukis Abdullah Suriosubroto. Ia menerima beasiswa seni di Koninklijke Academie van Beeldende Kunsten di Den Haag, Belanda.",
      "Karya Basoeki dicirikan oleh kehalusan teknis tingkat tinggi, pencahayaan dramatis, dan kecenderungan mempercantik subjek (romantisasi). Ia pernah menjadi pelukis resmi Istana Merdeka Indonesia dan melukis kepala negara dari berbagai belahan dunia.",
    ],
    isFeatured: false,
    timelines: [
      {
        year: 1915,
        title: "Kelahiran di Solo",
        description: "Lahir dalam trah keluarga pelukis dan sastrawan Jawa.",
      },
      {
        year: 1933,
        title: "Studi di Den Haag",
        description: "Menempuh pendidikan seni formal di Royal Academy of Fine Arts, Belanda.",
      },
      {
        year: 1993,
        title: "Wafat di Jakarta",
        description: "Kediaman pribadinya di Cilandak dihibahkan menjadi Museum Basoeki Abdullah.",
      },
    ],
    relatedArtists: [
      { name: "Abdullah Suriosubroto", slug: "abdullah-suriosubroto", relation: "Ayah dan Guru Pertama" },
      { name: "Raden Saleh", slug: "raden-saleh", relation: "Inspirasi Romantisisme" },
    ],
  },
  {
    id: "art-hendra-gunawan",
    name: "Hendra Gunawan",
    slug: "hendra-gunawan",
    birthYear: 1918,
    deathYear: 1983,
    originCity: "Bandung, Jawa Barat",
    artMovement: "Ekspresionisme Kerakyatan",
    studioDiscipline: "Seni Lukis dan Patung",
    shortBio:
      "Pelukis kerakyatan yang memadukan ekspresionisme dinamis dengan palet warna berani nusantara: ungu terong, hijau toska, merah muda, dan kuning kunyit.",
    fullBiography: [
      "Hendra Gunawan lahir di Bandung pada tahun 1918. Ia belajar melukis di bawah bimbingan Wahdi Sumanta dan kemudian mendirikan Sanggar Pelukis Rakyat di Yogyakarta.",
      "Karya-karya Hendra sangat dekat dengan denyut kehidupan masyarakat akar rumput: pasar ikan, pengantin desa, penari tradisional, dan perjuangan gerilya. Bentuk tubuh figur yang dilukisnya kerap memanjang dan dinamis dengan warna-warni tropis yang menyala.",
    ],
    isFeatured: false,
    timelines: [
      {
        year: 1918,
        title: "Kelahiran di Bandung",
        description: "Masa muda dihabiskan dengan mengamati kesenian wayang golek dan teater rakyat Sunda.",
      },
      {
        year: 1950,
        title: "Mendirikan Pelukis Rakyat",
        description: "Membentuk sanggar seni komunal di Yogyakarta untuk membina bibit pelukis muda.",
      },
      {
        year: 1983,
        title: "Wafat di Bali",
        description: "Menghabiskan masa senja berkarya penuh vitalitas di Pulau Dewata.",
      },
    ],
    relatedArtists: [
      { name: "Affandi", slug: "affandi", relation: "Rekan Pelukis Rakyat" },
      { name: "Wahdi Sumanta", slug: "wahdi-sumanta", relation: "Guru Pertama di Bandung" },
    ],
  },
];
