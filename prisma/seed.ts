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

  // 0. KONFIGURASI SUPABASE STORAGE & ROW LEVEL SECURITY (RLS)
  const sqlCommands = [
    `INSERT INTO storage.buckets (id, name, public) VALUES ('jejak-perupa-media', 'jejak-perupa-media', true) ON CONFLICT (id) DO UPDATE SET public = true`,
    `ALTER TABLE IF EXISTS public.articles DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.site_settings DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.categories DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.artists DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.artworks DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.glossary_terms DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.art_communities DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.art_events DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.art_submissions DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.users DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.tags DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.article_tags DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.artist_timelines DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.artist_relations DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.learning_paths DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.learning_nodes DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.quizzes DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.quiz_questions DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.user_progress DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.user_bookmarks DISABLE ROW LEVEL SECURITY`,
    `ALTER TABLE IF EXISTS public.comments DISABLE ROW LEVEL SECURITY`,
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

  for (const cmd of sqlCommands) {
    try {
      await prisma.$executeRawUnsafe(cmd);
    } catch (err: any) {
      console.warn(`Peringatan saat menjalankan SQL: ${err.message}`);
    }
  }
  console.log("✓ Bucket storage & tabel-tabel PostgreSQL berhasil dikonfigurasi.");

  const studentPasswordHash = bcrypt.hashSync("PelajarSeni123!", 10);
  const curatorPasswordHash = bcrypt.hashSync("KuratorSeni123!", 10);

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
      where: { slug: cat.slug },
      update: {
        name: cat.name,
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
      where: { slug: a.slug },
      update: {
        name: a.name,
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
        where: { slug: art.slug },
        update: {
          title: art.title,
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
        where: { slug: article.slug },
        update: {
          title: article.title,
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
      where: { slug: g.slug },
      update: {
        term: g.term,
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
      where: { slug: com.slug },
      update: {
        name: com.name,
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
