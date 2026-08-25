export interface GlossaryData {
  id: string;
  term: string;
  slug: string;
  phoneticSpelling?: string;
  letterGroup: string; // A-Z
  category: string;
  definitionShort: string;
  definitionFull: string[];
  exampleArtworkTitle?: string;
  relatedArticleSlug?: string;
}

export const glossaryData: GlossaryData[] = [
  {
    id: "term-afinitas",
    term: "Afinitas Bentuk",
    slug: "afinitas-bentuk",
    letterGroup: "A",
    category: "Komposisi & Prinsip Rupa",
    definitionShort: "Kedekatan atau kesamaan karakter visual antara dua atau lebih elemen rupa dalam satu kesatuan bidang karya.",
    definitionFull: [
      "Afinitas bentuk terjadi ketika elemen-elemen seperti garis, bidang, atau tekstur saling memiliki keselarasan karakteristik visual, sehingga menciptakan harmoni dan kesatuan utuh pada komposisi karya.",
    ],
  },
  {
    id: "term-chiaroscuro",
    term: "Chiaroscuro",
    slug: "chiaroscuro",
    phoneticSpelling: "ki-ar-uh-SKYOOR-oh",
    letterGroup: "C",
    category: "Teknik Pencahayaan",
    definitionShort: "Teknik kontras tajam antara area terang dan gelap untuk memberikan ilusi kedalaman volume tiga dimensi dan efek dramatis.",
    definitionFull: [
      "Berasal dari bahasa Italia (chiaro = terang, scuro = gelap). Teknik ini dipopulerkan oleh pelukis era Renaissance dan Barok seperti Caravaggio dan Rembrandt, serta diadopsi secara mahir oleh Raden Saleh.",
    ],
    exampleArtworkTitle: "Penangkapan Pangeran Diponegoro",
    relatedArticleSlug: "romantisisme-raden-saleh",
  },
  {
    id: "term-dadaisme",
    term: "Dadaisme",
    slug: "dadaisme",
    letterGroup: "D",
    category: "Aliran & Gerakan Seni",
    definitionShort: "Gerakan seni garda depan awal abad ke-20 yang menolak logika, rasionalitas borjuis, dan konvensi estetika tradisional.",
    definitionFull: [
      "Lahir di Zurich pada masa Perang Dunia I sebagai protes terhadap kekejaman perang dan kepongahan peradaban modern. Dadaisme menggunakan teknik kolase, photomontage, dan readymade (objek temuan).",
    ],
  },
  {
    id: "term-dekonstruksi",
    term: "Dekonstruksi",
    slug: "dekonstruksi",
    letterGroup: "D",
    category: "Kritik & Teori Seni",
    definitionShort: "Metode pembacaan kritis terhadap karya seni dengan membongkar oposisi biner dan mempertanyakan asumsi makna yang baku.",
    definitionFull: [
      "Berakar dari pemikiran filsuf Jacques Derrida, dekonstruksi dalam seni rupa mengajak penikmat melihat celah, paradoks, dan lapisan makna tak terduga yang sebelumnya terselubung.",
    ],
  },
  {
    id: "term-estetika",
    term: "Estetika",
    slug: "estetika",
    letterGroup: "E",
    category: "Filsafat Seni",
    definitionShort: "Cabang filsafat yang mempelajari hakikat keindahan, rasa artistik, dan nilai-nilai pengalaman inderawi.",
    definitionFull: [
      "Estetika tidak hanya membahas apa yang elok dipandang, melainkan mengkaji proses batin manusia ketika berhadapan dengan fenomena keindahan alam maupun kreasi karya seni.",
    ],
    relatedArticleSlug: "seni-rupa-murni",
  },
  {
    id: "term-figuratif",
    term: "Figuratif",
    slug: "figuratif",
    letterGroup: "F",
    category: "Gaya Representasi",
    definitionShort: "Karya seni rupa yang secara jelas menggambarkan bentuk-bentuk objek yang dapat dikenali di alam nyata.",
    definitionFull: [
      "Bentuk figuratif mencakup penggambaran figur manusia, hewan, tumbuhan, pemandangan, ataupun benda-benda sekitar, berlawanan dengan seni abstrak murni non-objektif.",
    ],
  },
  {
    id: "term-grafis",
    term: "Grafis (Seni Grafis)",
    slug: "seni-grafis",
    letterGroup: "G",
    category: "Studio Seni",
    definitionShort: "Cabang seni rupa dua dimensi yang proses penciptaannya memanfaatkan teknik cetak-mencetak untuk menghasilkan edisi karya orisinal ganda.",
    definitionFull: [
      "Seni grafis mencakup empat teknik utama: Cetak Tinggi (Woodcut/Linocut), Cetak Dalam (Intaglio/Etching), Cetak Datar (Litografi), dan Cetak Saring (Silkscreen/Serigrafi).",
    ],
    relatedArticleSlug: "seni-rupa-murni",
  },
  {
    id: "term-impasto",
    term: "Impasto",
    slug: "impasto",
    phoneticSpelling: "im-PAHS-toh",
    letterGroup: "I",
    category: "Teknik Aplikasi Cat",
    definitionShort: "Teknik melukis dengan mengoleskan cat sangat tebal pada kanvas sehingga bekas goresan kuas atau pisau palet tampak menonjol dan memiliki tekstur nyata.",
    definitionFull: [
      "Teknik impasto memberikan dimensi fisik dan pantulan cahaya unik pada permukaan kanvas. Di Indonesia, maestro Affandi adalah pelopor utama eksplorasi impasto ekstrem dengan teknik plototan tube.",
    ],
    exampleArtworkTitle: "Potret Diri Mengisap Pipa",
  },
  {
    id: "term-mimesis",
    term: "Mimesis",
    slug: "mimesis",
    letterGroup: "M",
    category: "Teori Estetika Klasik",
    definitionShort: "Konsep dasar estetika Yunani Kuno (Plato dan Aristoteles) yang memandang seni sebagai tiruan atau representasi dari alam semesta.",
    definitionFull: [
      "Menurut Plato, karya seni adalah tiruan dari tiruan (dua kali berjarak dari realitas sejati gagasan). Sedangkan Aristoteles melihat mimesis sebagai proses kreatif manusia untuk memahami esensi kehidupan.",
    ],
  },
  {
    id: "term-romantisisme",
    term: "Romantisisme",
    slug: "romantisisme",
    letterGroup: "R",
    category: "Aliran & Gerakan Seni",
    definitionShort: "Gerakan seni akhir abad ke-18 yang mengedepankan emosi mendalam, ketakjuban alam (sublime), drama kepahlawanan, dan individualitas batin.",
    definitionFull: [
      "Romantisisme menentang rasionalisme dingin era Pencerahan. Di Indonesia, gerakan ini dibawa dan diolah secara orisinal oleh Raden Saleh dalam karya-karya bertema perburuan liar dan peristiwa sejarah bangsa.",
    ],
    exampleArtworkTitle: "Penangkapan Pangeran Diponegoro",
    relatedArticleSlug: "romantisisme-raden-saleh",
  },
  {
    id: "term-surealisme",
    term: "Surealisme",
    slug: "surealisme",
    letterGroup: "S",
    category: "Aliran & Gerakan Seni",
    definitionShort: "Gerakan seni yang mengeksplorasi alam bawah sadar, asosiasi mimpi, dan pertemuan tak terduga antara benda-benda nyata.",
    definitionFull: [
      "Diprakarsai oleh André Breton pada tahun 1924, surealisme berupaya membebaskan daya cipta manusia dari kungkungan logika sadar.",
    ],
  },
];
