import { type ArtistData } from "@/lib/data/artists";

export const artistsSeeder: ArtistData[] = [
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
        description: "Menjadi perupa Indonesia pertama yang diundang berpameran di ajang seni rupa paling bergengsi dunia di Venesia, Italia.",
      },
      {
        year: 1990,
        title: "Wafat di Yogyakarta",
        description: "Dimakamkan di kompleks Museum Affandi di tepi Sungai Gajahwong, Yogyakarta.",
      },
    ],
    relatedArtists: [
      { name: "S. Sudjojono", slug: "s-sudjojono", relation: "Rekan Pergerakan SIM" },
      { name: "Hendra Gunawan", slug: "hendra-gunawan", relation: "Sahabat Pelukis Rakyat" },
    ],
  },
  {
    id: "art-basoeki-abdullah",
    name: "Basoeki Abdullah",
    slug: "basoeki-abdullah",
    birthYear: 1915,
    deathYear: 1993,
    originCity: "Surakarta, Jawa Tengah",
    artMovement: "Realisme Naturalistik",
    studioDiscipline: "Seni Lukis (Potret & Mitologi)",
    shortBio:
      "Duta seni rupa Indonesia yang piawai melukis potret tokoh dunia, keelokan bentang alam nusantara, serta epos mitologi pewayangan Jawa dengan keanggunan estetika tinggi.",
    fullBiography: [
      "Basoeki Abdullah lahir di Surakarta pada 27 Januari 1915, putra dari pelukis pemandangan Abdullah Suriosubroto. Sejak usia belia ia telah menguasai anatomi figuratif dan teknik pencahayaan yang sangat presisi.",
      "Ia menempuh pendidikan di Academie van Beeldende Kunsten di Den Haag, Belanda, dan menyerap pengaruh para maestro realisme Eropa.",
      "Basoeki diangkat menjadi pelukis resmi Istana Merdeka pada era Presiden Soekarno dan melukis banyak kepala negara, ratu, serta figur terkemuka dari berbagai benua.",
    ],
    isFeatured: false,
    timelines: [
      {
        year: 1915,
        title: "Kelahiran di Surakarta",
        description: "Lahir di keluarga berdarah seni rupa dan sastra Jawa.",
      },
      {
        year: 1933,
        title: "Studi Seni di Belanda",
        description: "Memperoleh beasiswa di Academie van Beeldende Kunsten Den Haag.",
      },
      {
        year: 1993,
        title: "Wafat di Jakarta",
        description: "Kediaman pribadinya di Cilandak dihibahkan kepada negara menjadi Museum Basoeki Abdullah.",
      },
    ],
    relatedArtists: [
      { name: "Abdullah Suriosubroto", slug: "abdullah-suriosubroto", relation: "Ayahanda & Guru" },
      { name: "Raden Saleh", slug: "raden-saleh", relation: "Inspirasi Realisme Klasik" },
    ],
  },
  {
    id: "art-hendra-gunawan",
    name: "Hendra Gunawan",
    slug: "hendra-gunawan",
    birthYear: 1918,
    deathYear: 1983,
    originCity: "Bandung, Jawa Barat",
    artMovement: "Ekspresionisme Realis Kerakyatan",
    studioDiscipline: "Seni Lukis & Seni Patung",
    shortBio:
      "Pelukis rakyat berjiwa revolusioner dengan ciri khas figur meliuk, warna-warna fovisme tropis yang berani, dan keberpihakan tulus pada denyut keseharian masyarakat bawah.",
    fullBiography: [
      "Hendra Gunawan lahir di Bandung pada tahun 1918. Ia berguru pada pelukis Wahdi Sumanta dan Affandi, serta aktif dalam kelompok teater dan pergerakan gerilya kemerdekaan.",
      "Ia mendirikan kelompok Pelukis Rakyat di Yogyakarta pada tahun 1947 yang melahirkan banyak karya seni monumental, patung publik, dan poster perjuangan.",
      "Gaya visual Hendra sangat khas: figur perempuan berleher jenjang, warna-warna cerah komplementer (ungu, merah muda, toska, kuning kunyit), dan suasana pasar, nelayan, serta tradisi rakyat jelata.",
    ],
    isFeatured: false,
    timelines: [
      {
        year: 1918,
        title: "Kelahiran di Bandung",
        description: "Lahir di Bandung dan tumbuh dengan kecintaan pada seni rakyat Sunda.",
      },
      {
        year: 1947,
        title: "Mendirikan Pelukis Rakyat",
        description: "Membentuk sanggar Pelukis Rakyat di Yogyakarta bersama Affandi dan seniman pejuang.",
      },
      {
        year: 1983,
        title: "Wafat di Bali",
        description: "Menghabiskan masa senja berkarya intensif di Bali hingga akhir hayatnya.",
      },
    ],
    relatedArtists: [
      { name: "Wahdi Sumanta", slug: "wahdi-sumanta", relation: "Guru Pertama" },
      { name: "Affandi", slug: "affandi", relation: "Sahabat Seperjuangan" },
    ],
  },
];
