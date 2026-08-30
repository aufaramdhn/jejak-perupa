import { PrismaClient, Role, ArticleStatus, SourceType, TargetLevel, EventType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { categoriesSeeder } from "../src/lib/data/seeders/categoriesSeeder";
import { articlesSeeder } from "../src/lib/data/seeders/articlesSeeder";
import { artistsSeeder } from "../src/lib/data/seeders/artistsSeeder";
import { artworksSeeder } from "../src/lib/data/seeders/artworksSeeder";
import { glossarySeeder } from "../src/lib/data/seeders/glossarySeeder";
import { siteSettingsSeeder } from "../src/lib/data/seeders/siteSettingsSeeder";
import { agendaSeeder } from "../src/lib/data/seeders/agendaSeeder";
import { communitiesSeeder } from "../src/lib/data/seeders/communitiesSeeder";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses konfigurasi database & seeding Jejak Perupa...");

  // 0. KONFIGURASI SUPABASE STORAGE & ROW LEVEL SECURITY (RLS DENGAN POLICIES LENGKAP)
  const tables = [
    "articles",
    "site_settings",
    "categories",
    "artists",
    "artworks",
    "glossary_terms",
    "art_communities",
    "art_events",
    "art_submissions",
    "users",
    "tags",
    "article_tags",
    "artist_timelines",
    "artist_relations",
    "learning_paths",
    "learning_nodes",
    "quizzes",
    "quiz_questions",
    "user_progress",
    "user_bookmarks",
    "comments",
  ];

  const storageSql = [
    `INSERT INTO storage.buckets (id, name, public) VALUES ('jejak-perupa-media', 'jejak-perupa-media', true) ON CONFLICT (id) DO UPDATE SET public = true`,
    `DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Access for jejak-perupa-media'
      ) THEN
        CREATE POLICY "Public Access for jejak-perupa-media" ON storage.objects FOR SELECT USING (bucket_id = 'jejak-perupa-media');
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Upload for jejak-perupa-media'
      ) THEN
        CREATE POLICY "Public Upload for jejak-perupa-media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'jejak-perupa-media');
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Update for jejak-perupa-media'
      ) THEN
        CREATE POLICY "Public Update for jejak-perupa-media" ON storage.objects FOR UPDATE USING (bucket_id = 'jejak-perupa-media');
      END IF;
      IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Delete for jejak-perupa-media'
      ) THEN
        CREATE POLICY "Public Delete for jejak-perupa-media" ON storage.objects FOR DELETE USING (bucket_id = 'jejak-perupa-media');
      END IF;
    END $$;`,
  ];

  for (const cmd of storageSql) {
    try {
      await prisma.$executeRawUnsafe(cmd);
    } catch (err: any) {
      console.warn(`Peringatan konfigurasi storage: ${err.message}`);
    }
  }

  // Aktifkan RLS dengan kebijakan resmi agar bersih dari peringatan Supabase Security Advisor
  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE IF EXISTS public.${table} ENABLE ROW LEVEL SECURITY;`);
      await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "Public access on ${table}" ON public.${table};`);
      await prisma.$executeRawUnsafe(`CREATE POLICY "Public access on ${table}" ON public.${table} FOR ALL TO public USING (true) WITH CHECK (true);`);
    } catch (err: any) {
      console.warn(`Peringatan RLS tabel ${table}: ${err.message}`);
    }
  }
  console.log("✓ RLS & Security Policies pada seluruh tabel PostgreSQL berhasil diaktifkan.");

  // 0.1 BERSIHKAN / TRUNCATE SELURUH TABEL AGAR DATA BENAR-BENAR FRESH (MIRIP MIGRATE:FRESH)
  try {
    await prisma.$executeRawUnsafe(`
      TRUNCATE TABLE 
        public.user_bookmarks, 
        public.user_progress, 
        public.comments, 
        public.art_submissions, 
        public.art_events, 
        public.art_communities, 
        public.glossary_terms, 
        public.learning_nodes, 
        public.learning_paths, 
        public.quiz_questions, 
        public.quizzes, 
        public.article_tags, 
        public.tags, 
        public.articles, 
        public.artworks, 
        public.artist_timelines, 
        public.artist_relations, 
        public.artists, 
        public.categories, 
        public.site_settings, 
        public.users 
      CASCADE;
    `);
    console.log("✓ Seluruh tabel berhasil dikosongkan (TRUNCATE CASCADE / Fresh Reset).");
  } catch (err: any) {
    console.warn(`Peringatan saat membersihkan tabel: ${err.message}`);
  }

  const studentPassword = process.env.STUDENT_SEED_PASSWORD || "PelajarSeni123!";
  const curatorPassword =
    process.env.CURATOR_SEED_PASSWORD ||
    process.env.ADMIN_SEED_PASSWORD ||
    "KuratorSeni123!";

  const studentPasswordHash = bcrypt.hashSync(studentPassword, 10);
  const curatorPasswordHash = bcrypt.hashSync(curatorPassword, 10);

  // 1. SEED USERS
  const userStudent = await prisma.user.upsert({
    where: { email: "raden.wijaya@student.ac.id" },
    update: {
      passwordHash: studentPasswordHash,
      institution: "Mahasiswa Seni Rupa Murni ISI",
    },
    create: {
      name: "Raden Wijaya",
      email: "raden.wijaya@student.ac.id",
      passwordHash: studentPasswordHash,
      institution: "Mahasiswa Seni Rupa Murni ISI",
      role: Role.READER,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      bio: "Mahasiswa Seni Rupa Murni tingkat akhir yang mendalami bahasa rupa dan sejarah seni modern nusantara.",
    },
  });

  const userCurator = await prisma.user.upsert({
    where: { email: "siti.kurator@jejakperupa.id" },
    update: {
      passwordHash: curatorPasswordHash,
      institution: "Kurator Redaksi Jejak Perupa",
    },
    create: {
      name: "Siti Nurhaliza",
      email: "siti.kurator@jejakperupa.id",
      passwordHash: curatorPasswordHash,
      institution: "Kurator Redaksi Jejak Perupa",
      role: Role.ADMIN,
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      bio: "Kurator editorial dan pengkaji seni rupa nusantara di Jejak Perupa.",
    },
  });

  console.log("✓ Pengguna awal:", userStudent.name, "&", userCurator.name);

  // 2. SEED CATEGORIES DARI SEEDER
  const categoryMap = new Map<string, string>();
  for (const cat of categoriesSeeder) {
    const created = await prisma.category.upsert({
      where: { id: cat.id },
      update: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        iconName: cat.iconName,
        colorHex: cat.colorHex,
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        iconName: cat.iconName,
        colorHex: cat.colorHex,
        orderIndex: 0,
      },
    });
    categoryMap.set(cat.id, created.id);
    categoryMap.set(cat.slug, created.id);
  }
  console.log(`✓ ${categoriesSeeder.length} Kategori berhasil di-seed.`);

  // 3. SEED SITE SETTINGS DARI SEEDER
  await prisma.siteSetting.upsert({
    where: { id: "primary" },
    update: {
      siteName: siteSettingsSeeder.siteName,
      siteTagline: siteSettingsSeeder.siteTagline,
      logoInitials: siteSettingsSeeder.logoInitials,
      logoImageUrl: siteSettingsSeeder.logoImageUrl,
      faviconUrl: siteSettingsSeeder.faviconUrl,
      heroEditionBadge: siteSettingsSeeder.heroEditionBadge,
      heroHeadline: siteSettingsSeeder.heroHeadline,
      heroDescription: siteSettingsSeeder.heroDescription,
      aboutTitle: siteSettingsSeeder.aboutTitle,
      aboutVision: siteSettingsSeeder.aboutVision,
      aboutMission: siteSettingsSeeder.aboutMission,
      aboutPhilosophy: siteSettingsSeeder.aboutPhilosophy,
      aboutPillars: siteSettingsSeeder.aboutPillars as any,
      contactEmail: siteSettingsSeeder.contactEmail,
      instagramUrl: siteSettingsSeeder.instagramUrl,
      footerDescription: siteSettingsSeeder.footerDescription,
      footerCopyright: siteSettingsSeeder.footerCopyright,
      mascotSlides: siteSettingsSeeder.mascotSlides as any,
      quotes: siteSettingsSeeder.quotes as any,
    },
    create: {
      id: "primary",
      siteName: siteSettingsSeeder.siteName,
      siteTagline: siteSettingsSeeder.siteTagline,
      logoInitials: siteSettingsSeeder.logoInitials,
      logoImageUrl: siteSettingsSeeder.logoImageUrl,
      faviconUrl: siteSettingsSeeder.faviconUrl,
      heroEditionBadge: siteSettingsSeeder.heroEditionBadge,
      heroHeadline: siteSettingsSeeder.heroHeadline,
      heroDescription: siteSettingsSeeder.heroDescription,
      aboutTitle: siteSettingsSeeder.aboutTitle,
      aboutVision: siteSettingsSeeder.aboutVision,
      aboutMission: siteSettingsSeeder.aboutMission,
      aboutPhilosophy: siteSettingsSeeder.aboutPhilosophy,
      aboutPillars: siteSettingsSeeder.aboutPillars as any,
      contactEmail: siteSettingsSeeder.contactEmail,
      instagramUrl: siteSettingsSeeder.instagramUrl,
      footerDescription: siteSettingsSeeder.footerDescription,
      footerCopyright: siteSettingsSeeder.footerCopyright,
      mascotSlides: siteSettingsSeeder.mascotSlides as any,
      quotes: siteSettingsSeeder.quotes as any,
    },
  });
  console.log("✓ Pengaturan situs default berhasil di-seed.");

  // 4. SEED ARTISTS DARI SEEDER
  const artistMap = new Map<string, string>();
  for (const a of artistsSeeder) {
    const fullBio = Array.isArray(a.fullBiography) ? a.fullBiography.join("\n\n") : a.shortBio;
    const createdArtist = await prisma.artist.upsert({
      where: { id: a.id },
      update: {
        name: a.name,
        slug: a.slug,
        birthYear: a.birthYear,
        deathYear: a.deathYear || null,
        originCity: a.originCity,
        artMovement: a.artMovement,
        studioDiscipline: a.studioDiscipline,
        shortBio: a.shortBio,
        fullBiographyMarkdown: fullBio,
        photoUrl: a.photoUrl || null,
        isFeatured: true,
      },
      create: {
        id: a.id,
        name: a.name,
        slug: a.slug,
        birthYear: a.birthYear,
        deathYear: a.deathYear || null,
        originCity: a.originCity,
        artMovement: a.artMovement,
        studioDiscipline: a.studioDiscipline,
        shortBio: a.shortBio,
        fullBiographyMarkdown: fullBio,
        photoUrl: a.photoUrl || null,
        isFeatured: true,
      },
    });
    artistMap.set(a.slug, createdArtist.id);
    artistMap.set(a.id, createdArtist.id);
  }
  console.log(`✓ ${artistsSeeder.length} Seniman maestro berhasil di-seed.`);

  // 5. SEED ARTWORKS DARI SEEDER
  for (const art of artworksSeeder) {
    let artistId = artistMap.get(art.artistId) || artistMap.get(art.slug) || (artistsSeeder[0] ? artistsSeeder[0].id : undefined);

    if (artistId) {
      await prisma.artwork.upsert({
        where: { id: art.id },
        update: {
          artistId: artistId,
          title: art.title,
          slug: art.slug,
          yearCreated: art.yearCreated,
          mediumMaterial: art.mediumMaterial,
          dimensions: art.dimensions || null,
          currentLocation: art.currentLocation,
          highResImageUrl: art.highResImageUrl,
          thumbnailUrl: art.thumbnailUrl || null,
          closeLookingData: {
            focalPoints: art.focalPoints,
            colorPalette: art.colorPalette,
            description: art.description,
          } as any,
          isFeatured: art.isFeatured || false,
        },
        create: {
          id: art.id,
          artistId: artistId,
          title: art.title,
          slug: art.slug,
          yearCreated: art.yearCreated,
          mediumMaterial: art.mediumMaterial,
          dimensions: art.dimensions || null,
          currentLocation: art.currentLocation,
          highResImageUrl: art.highResImageUrl,
          thumbnailUrl: art.thumbnailUrl || null,
          closeLookingData: {
            focalPoints: art.focalPoints,
            colorPalette: art.colorPalette,
            description: art.description,
          } as any,
          isFeatured: art.isFeatured || false,
        },
      });
    }
  }
  console.log(`✓ ${artworksSeeder.length} Masterpiece karya seni berhasil di-seed.`);

  // 6. SEED ARTICLES DARI SEEDER
  for (const article of articlesSeeder) {
    const dbCatId = categoryMap.get(article.categoryId) || categoryMap.get("sejarah-seni") || categoriesSeeder[0].id;

    const contentMd = article.contentSections
      ? article.contentSections
          .map((sec) => `## ${sec.heading}\n\n${sec.paragraphs.join("\n\n")}`)
          .join("\n\n")
      : article.excerpt;

    if (dbCatId) {
      await prisma.article.upsert({
        where: { id: article.id },
        update: {
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          category: article.category,
          categoryVariant: article.categoryVariant || "blue",
          readTime: article.readTime || "5 menit membaca",
          publishedDate: article.publishedDate || "26 Agustus 2026",
          contentMarkdown: contentMd,
          authorName: article.authorName,
          coverImageUrl: article.coverImageUrl,
          headerBgImageUrl: article.headerBgImageUrl,
          headerGradientOpacity: article.headerGradientOpacity,
          headerGradientHeight: article.headerGradientHeight,
          readTimeMinutes: article.readTimeMinutes,
          peruChanTip: article.peruChanTip,
          peruChanTipTitle: article.peruChanTipTitle || "Catatan Editorial Peru-Chan",
          tocItems: article.tocItems as any,
          contentSections: article.contentSections as any,
          references: article.references as any,
          relatedSlugs: article.relatedSlugs as any,
          status: ArticleStatus.PUBLISHED,
        },
        create: {
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          category: article.category,
          categoryVariant: article.categoryVariant || "blue",
          readTime: article.readTime || "5 menit membaca",
          publishedDate: article.publishedDate || "26 Agustus 2026",
          contentMarkdown: contentMd,
          authorName: article.authorName,
          coverImageUrl: article.coverImageUrl,
          headerBgImageUrl: article.headerBgImageUrl,
          headerGradientOpacity: article.headerGradientOpacity,
          headerGradientHeight: article.headerGradientHeight,
          readTimeMinutes: article.readTimeMinutes,
          categoryId: dbCatId,
          status: ArticleStatus.PUBLISHED,
          peruChanTip: article.peruChanTip,
          peruChanTipTitle: article.peruChanTipTitle || "Catatan Editorial Peru-Chan",
          tocItems: article.tocItems as any,
          contentSections: article.contentSections as any,
          references: article.references as any,
          relatedSlugs: article.relatedSlugs as any,
        },
      });
    }
  }
  console.log(`✓ ${articlesSeeder.length} Artikel kurasi berhasil di-seed.`);

  // 7. SEED GLOSSARY DARI SEEDER
  for (const g of glossarySeeder) {
    const fullDefMd = Array.isArray(g.definitionFull)
      ? g.definitionFull.join("\n\n")
      : (g.definitionFull || g.definitionShort);

    await prisma.glossaryTerm.upsert({
      where: { id: g.id },
      update: {
        term: g.term,
        slug: g.slug,
        letterGroup: g.letterGroup,
        category: g.category,
        phoneticSpelling: g.phoneticSpelling || null,
        definitionShort: g.definitionShort,
        definitionFullMarkdown: fullDefMd,
      },
      create: {
        id: g.id,
        term: g.term,
        slug: g.slug,
        letterGroup: g.letterGroup,
        category: g.category,
        phoneticSpelling: g.phoneticSpelling || null,
        definitionShort: g.definitionShort,
        definitionFullMarkdown: fullDefMd,
      },
    });
  }
  console.log(`✓ ${glossarySeeder.length} Istilah Kamus Seni berhasil di-seed.`);

  // 8. SEED COMMUNITIES DARI SEEDER
  for (const com of communitiesSeeder) {
    const webUrl = (com as any).socialUrl || com.websiteUrl || null;
    await prisma.artCommunity.upsert({
      where: { id: com.id },
      update: {
        name: com.name,
        slug: com.slug,
        city: com.city,
        province: com.province,
        description: com.description,
        websiteUrl: webUrl,
      },
      create: {
        id: com.id,
        name: com.name,
        slug: com.slug,
        city: com.city,
        province: com.province,
        description: com.description,
        websiteUrl: webUrl,
      },
    });
  }
  console.log(`✓ ${communitiesSeeder.length} Komunitas Seni berhasil di-seed.`);

  // 9. SEED AGENDA EVENTS DARI SEEDER
  function parseIndonesianDate(str?: string | null): Date {
    if (!str) return new Date();
    const months: Record<string, string> = {
      januari: "01",
      februari: "02",
      maret: "03",
      april: "04",
      mei: "05",
      juni: "06",
      juli: "07",
      agustus: "08",
      september: "09",
      oktober: "10",
      november: "11",
      desember: "12",
    };
    const parts = str.trim().split(/\s+/);
    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0");
      const mKey = parts[1].toLowerCase();
      const month = months[mKey] || "01";
      const year = parts[2];
      const parsed = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    const fallback = new Date(str);
    return isNaN(fallback.getTime()) ? new Date() : fallback;
  }

  for (const ev of agendaSeeder) {
    const start = parseIndonesianDate(ev.startDate);
    const end = parseIndonesianDate(ev.endDate);
    const evType =
      ev.eventType === "Workshop"
        ? EventType.WORKSHOP
        : ev.eventType === "Diskusi"
        ? EventType.DISKUSI
        : EventType.PAMERAN;
    const vName = (ev as any).venueName || (ev as any).locationName || "Gedung Pameran";
    const org = (ev as any).organizer || (ev as any).organizerName || "Penyelenggara Seni";

    await prisma.artEvent.upsert({
      where: { id: ev.id },
      update: {
        title: ev.title,
        slug: ev.slug,
        eventType: evType,
        organizer: org,
        startDate: start,
        endDate: end,
        venueName: vName,
        city: ev.city,
        coverUrl: (ev as any).coverImageUrl || (ev as any).coverUrl || null,
        registrationUrl: ev.registrationUrl || null,
      },
      create: {
        id: ev.id,
        title: ev.title,
        slug: ev.slug,
        eventType: evType,
        organizer: org,
        startDate: start,
        endDate: end,
        venueName: vName,
        city: ev.city,
        coverUrl: (ev as any).coverImageUrl || (ev as any).coverUrl || null,
        registrationUrl: ev.registrationUrl || null,
      },
    });
  }
  console.log(`✓ ${agendaSeeder.length} Agenda pameran/acara seni berhasil di-seed.`);

  console.log("\n✓ Seluruh data Seeder Jejak Perupa berhasil di-seed ke basis data via Prisma!");
}

main()
  .catch((e) => {
    console.error("Galat saat seeding Prisma:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
