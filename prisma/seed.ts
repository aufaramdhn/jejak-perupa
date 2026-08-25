import { PrismaClient, Role, ArticleStatus, SourceType, TargetLevel, EventType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses seeding data Jejak Perupa...");

  // 1. SEED USERS
  const userStudent = await prisma.user.upsert({
    where: { email: "raden.wijaya@student.ac.id" },
    update: {},
    create: {
      name: "Raden Wijaya",
      email: "raden.wijaya@student.ac.id",
      role: Role.READER,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Mahasiswa Seni Rupa Murni tingkat akhir yang mendalami bahasa rupa dan sejarah seni modern nusantara.",
    },
  });

  const userCurator = await prisma.user.upsert({
    where: { email: "siti.kurator@jejakperupa.id" },
    update: {},
    create: {
      name: "Siti Nurhaliza",
      email: "siti.kurator@jejakperupa.id",
      role: Role.ADMIN,
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      bio: "Kurator editorial dan pengkaji seni rupa nusantara di Jejak Perupa.",
    },
  });

  console.log("✓ Pengguna awal berhasil dibuat:", userStudent.name, "&", userCurator.name);

  // 2. SEED CATEGORIES
  const catPendidikan = await prisma.category.upsert({
    where: { slug: "pendidikan-seni" },
    update: {},
    create: {
      name: "Pendidikan Seni",
      slug: "pendidikan-seni",
      description: "Panduan kurikulum, studio perkuliahan, dan jalur profesi seni.",
      colorHex: "#173B63",
      orderIndex: 1,
    },
  });

  const catTeknik = await prisma.category.upsert({
    where: { slug: "teknik-seni" },
    update: {},
    create: {
      name: "Teknik Seni",
      slug: "teknik-seni",
      description: "Eksplorasi medium cat air, cat minyak, seni grafis, dan keramik.",
      colorHex: "#5B341E",
      orderIndex: 2,
    },
  });

  const catSejarah = await prisma.category.upsert({
    where: { slug: "sejarah-seni" },
    update: {},
    create: {
      name: "Sejarah Seni",
      slug: "sejarah-seni",
      description: "Lini masa pergerakan seni rupa Indonesia dari era perintisan hingga kontemporer.",
      colorHex: "#8DA750",
      orderIndex: 3,
    },
  });

  const catTeori = await prisma.category.upsert({
    where: { slug: "teori-seni" },
    update: {},
    create: {
      name: "Teori Seni",
      slug: "teori-seni",
      description: "Konsep estetika, komposisi, kritik seni, dan filsafat keindahan.",
      colorHex: "#173B63",
      orderIndex: 4,
    },
  });

  console.log("✓ 4 Kategori studi berhasil disiapkan.");

  // 3. SEED ARTISTS
  const artistRadenSaleh = await prisma.artist.upsert({
    where: { slug: "raden-saleh" },
    update: {},
    create: {
      name: "Raden Saleh Sjarif Boestaman",
      slug: "raden-saleh",
      birthYear: 1811,
      deathYear: 1880,
      originCity: "Semarang, Jawa Tengah",
      artMovement: "Romantisisme",
      studioDiscipline: "Seni Lukis (Cat Minyak)",
      shortBio: "Pelopor seni lukis modern Indonesia bergaya Romantisisme dramatis. Perjalanan panjangnya di Eropa dan dedikasinya pada identitas nusantara meninggalkan jejak abadi dalam sejarah seni dunia.",
      fullBiographyMarkdown: "Raden Saleh Sjarif Boestaman (1811 - 1880) diakui secara luas sebagai pionir seni lukis modern Indonesia. Lahir di Terboyo, Semarang, bakat menggambarnya ditemukan oleh pelukis Belgia Antoine Payen.\n\nPada tahun 1829, Saleh bertolak ke Eropa untuk mendalami seni lukis di Belanda, Jerman, dan Prancis di bawah bimbingan Cornelis Kruseman dan Andreas Schelfhout. Saleh menyerap gaya Romantisisme yang menekankan emosi mendalam, dramatisasi alam, dan perlawanan terhadap penindasan kolonial.",
      isFeatured: true,
      timelines: {
        create: [
          { year: 1811, title: "Kelahiran di Terboyo, Semarang", description: "Lahir dalam keluarga bangsawan Jawa terpelajar." },
          { year: 1829, title: "Berlayar ke Eropa", description: "Mendapat beasiswa untuk belajar seni lukis di Belanda." },
          { year: 1857, title: "Menyelesaikan Mahakarya Penangkapan Diponegoro", description: "Melukis respons kritis visual terhadap lukisan Nicolaas Pieneman." },
          { year: 1880, title: "Wafat di Bogor", description: "Meninggalkan warisan seni rupa yang meletakkan fondasi modernitas Indonesia." },
        ],
      },
    },
  });

  const artistAffandi = await prisma.artist.upsert({
    where: { slug: "affandi" },
    update: {},
    create: {
      name: "Affandi Koesoema",
      slug: "affandi",
      birthYear: 1907,
      deathYear: 1990,
      originCity: "Cirebon, Jawa Barat",
      artMovement: "Ekspresionisme",
      studioDiscipline: "Seni Lukis (Teknik Plototan)",
      shortBio: "Maestro seni lukis ekspresionisme Indonesia yang mendunia dengan teknik khas meremas cat langsung dari tube dan membentuk goresan menggunakan jari-jemari tangan.",
      fullBiographyMarkdown: "Affandi (1907 - 1990) adalah figur sentral seni rupa Indonesia abad ke-20. Ia memelopori teknik melukis langsung tanpa kuas, memplototkan cat minyak dari tube ke kanvas dan menyapunya dengan telapak tangan secara ekspresif penuh tenaga hidup (*élan vital*).",
      isFeatured: true,
      timelines: {
        create: [
          { year: 1907, title: "Kelahiran di Cirebon", description: "Lahir dari keluarga juru gambar pabrik gula." },
          { year: 1946, title: "Membuat Poster Boeng, Ajo, Boeng!", description: "Bekerja sama dengan penyair Chairil Anwar dalam gelora revolusi kemerdekaan." },
          { year: 1954, title: "Mewakili Indonesia di Venice Biennale", description: "Mendapat pengakuan internasional di panggung seni rupa global." },
          { year: 1990, title: "Wafat di Yogyakarta", description: "Dimakamkan di kompleks Museum Affandi tepi Sungai Gajahwong." },
        ],
      },
    },
  });

  console.log("✓ Seniman maestro berhasil dibuat:", artistRadenSaleh.name, "&", artistAffandi.name);

  // 4. SEED ARTWORKS
  await prisma.artwork.upsert({
    where: { slug: "penangkapan-pangeran-diponegoro" },
    update: {},
    create: {
      artistId: artistRadenSaleh.id,
      title: "Penangkapan Pangeran Diponegoro",
      slug: "penangkapan-pangeran-diponegoro",
      yearCreated: 1857,
      mediumMaterial: "Cat Minyak di atas Kanvas",
      dimensions: "112 x 178 cm",
      currentLocation: "Museum Istana Kepresidenan Yogyakarta / Jakarta",
      highResImageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80",
      thumbnailUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
      isFeatured: true,
      closeLookingData: {
        focalPoints: [
          { id: "fp-1", title: "Gestur Tegak Pangeran Diponegoro", description: "Berbeda dengan versi Pieneman, Saleh melukis Diponegoro berdiri tegak menatap De Kock dengan wibawa penuh keberanian." },
          { id: "fp-2", title: "Proporsi Kepala Pasukan Belanda", description: "Saleh sengaja melukis kepala perwira Belanda sedikit lebih besar (*over-proportioned*) sebagai simbol sarkasme kekuasaan kolonial." },
        ],
        colorPalette: [
          { hex: "#1A2B4C", name: "Deep Navy Blue" },
          { hex: "#8B263E", name: "Crimson Red" },
          { hex: "#C5A059", name: "Antique Gold" },
        ],
      },
    },
  });

  // 5. SEED ARTICLES
  await prisma.article.upsert({
    where: { slug: "seni-rupa-murni" },
    update: {},
    create: {
      title: "Mengenal Program Studi Seni Rupa Murni",
      slug: "seni-rupa-murni",
      excerpt: "Mengenal Seni Rupa Murni, kehidupan perkuliahannya, 4 studio utama, hingga berbagai kemungkinan profesi setelah lulus.",
      contentMarkdown: "Program studi Seni Rupa Murni (Fine Arts) adalah cabang keilmuan seni yang berfokus pada penciptaan karya sebagai ekspresi gagasan estetis murni tanpa dibatasi oleh fungsi guna pragmatis.\n\nDalam perkuliahan, mahasiswa mendalami 4 konsentrasi studio utama: Studio Seni Lukis, Studio Seni Patung, Studio Seni Grafis, dan Studio Seni Keramik.",
      readTimeMinutes: 8,
      categoryId: catPendidikan.id,
      status: ArticleStatus.PUBLISHED,
      peruChanTip: "Jangan terburu-buru memilih studio spesialisasi di semester awal. Eksplorasi seluruh material dasar terlebih dahulu!",
      references: {
        create: [
          { citation: "Feldman, Edmund Burke. (1967). *Art as Image and Idea*. New Jersey: Prentice-Hall.", sourceType: SourceType.BOOK },
          { citation: "Kartika, Dharsono Sony. (2004). *Pengantar Estetika*. Bandung: Rekayasa Sains.", sourceType: SourceType.BOOK },
        ],
      },
    },
  });

  // 6. SEED GLOSSARY TERMS
  const glossaryList = [
    {
      term: "Afinitas Bentuk",
      slug: "afinitas-bentuk",
      letterGroup: "A",
      category: "Komposisi & Prinsip Rupa",
      definitionShort: "Kedekatan atau kesamaan karakter visual antara dua atau lebih elemen rupa dalam satu kesatuan bidang karya.",
      definitionFullMarkdown: "Afinitas bentuk terjadi saat elemen-elemen rupa memiliki kesamaan ritme, lengkungan garis, atau bobot visual yang saling mengikat.",
    },
    {
      term: "Chiaroscuro",
      slug: "chiaroscuro",
      letterGroup: "C",
      category: "Teknik Pencahayaan",
      phoneticSpelling: "ki-ar-uh-SKYOOR-oh",
      definitionShort: "Teknik kontras tajam antara area terang dan gelap untuk memberikan ilusi kedalaman volume tiga dimensi dan efek dramatis.",
      definitionFullMarkdown: "Chiaroscuro dipopulerkan pada era Renaisans dan Barok oleh seniman seperti Caravaggio dan Rembrandt.",
    },
    {
      term: "Dadaisme",
      slug: "dadaisme",
      letterGroup: "D",
      category: "Aliran & Gerakan Seni",
      definitionShort: "Gerakan seni garda depan awal abad ke-20 yang menolak logika, rasionalitas borjuis, dan konvensi estetika tradisional.",
      definitionFullMarkdown: "Lahir di Zurich pada 1916 sebagai reaksi terhadap Perang Dunia I, Dadaisme menggunakan kolase, photomontage, dan readymade.",
    },
  ];

  for (const g of glossaryList) {
    await prisma.glossaryTerm.upsert({
      where: { slug: g.slug },
      update: {},
      create: g,
    });
  }

  console.log("✓ Istilah kamus seni A-Z berhasil di-seed.");
  console.log("Seeding basis data Jejak Perupa selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error("Galat saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
