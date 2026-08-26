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
  console.log("Memulai proses seeding data Jejak Perupa melalui Prisma ORM...");

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
  console.log("✓ Site Settings & Pilar Platform berhasil di-seed.");

  // 4. SEED ARTISTS DARI SEEDER
  const artistMap = new Map<string, string>();
  for (const art of artistsSeeder) {
    const fullBioMd = Array.isArray(art.fullBiography)
      ? art.fullBiography.join("\n\n")
      : (art.fullBiography || art.shortBio);

    const created = await prisma.artist.upsert({
      where: { slug: art.slug },
      update: {
        name: art.name,
        birthYear: art.birthYear,
        deathYear: art.deathYear,
        originCity: art.originCity,
        artMovement: art.artMovement,
        studioDiscipline: art.studioDiscipline,
        shortBio: art.shortBio,
        fullBiographyMarkdown: fullBioMd,
        photoUrl: art.photoUrl || (art as any).imageUrl || null,
        isFeatured: art.isFeatured || false,
      },
      create: {
        id: art.id,
        name: art.name,
        slug: art.slug,
        birthYear: art.birthYear,
        deathYear: art.deathYear,
        originCity: art.originCity,
        artMovement: art.artMovement,
        studioDiscipline: art.studioDiscipline,
        shortBio: art.shortBio,
        fullBiographyMarkdown: fullBioMd,
        photoUrl: art.photoUrl || (art as any).imageUrl || null,
        isFeatured: art.isFeatured || false,
      },
    });
    artistMap.set(art.id, created.id);
    artistMap.set(art.slug, created.id);
  }
  console.log(`✓ ${artistsSeeder.length} Maestro Seniman berhasil di-seed.`);

  // 5. SEED ARTWORKS DARI SEEDER
  for (const work of artworksSeeder) {
    const dbArtistId = artistMap.get(work.artistId) || artistMap.get((work as any).artistSlug) || work.artistId;
    const artistExists = await prisma.artist.findUnique({ where: { id: dbArtistId } });
    if (artistExists) {
      const closeLooking = {
        focalPoints: work.focalPoints || [],
        colorPalette: work.colorPalette || [],
        description: work.description || "",
      };

      await prisma.artwork.upsert({
        where: { slug: work.slug },
        update: {
          title: work.title,
          yearCreated: work.yearCreated,
          mediumMaterial: work.mediumMaterial,
          dimensions: work.dimensions,
          currentLocation: work.currentLocation,
          highResImageUrl: work.highResImageUrl,
          thumbnailUrl: work.thumbnailUrl,
          isFeatured: work.isFeatured || false,
          closeLookingData: closeLooking as any,
        },
        create: {
          id: work.id,
          artistId: dbArtistId,
          title: work.title,
          slug: work.slug,
          yearCreated: work.yearCreated,
          mediumMaterial: work.mediumMaterial,
          dimensions: work.dimensions,
          currentLocation: work.currentLocation,
          highResImageUrl: work.highResImageUrl,
          thumbnailUrl: work.thumbnailUrl,
          isFeatured: work.isFeatured || false,
          closeLookingData: closeLooking as any,
        },
      });
    }
  }
  console.log(`✓ ${artworksSeeder.length} Karya Seni representatif berhasil di-seed.`);

  // 6. SEED ARTICLES DARI SEEDER
  for (const article of articlesSeeder) {
    const dbCatId =
      categoryMap.get(article.categoryId) ||
      (await prisma.category.findFirst({ where: { name: article.category } }))?.id ||
      categoryMap.values().next().value;

    if (dbCatId) {
      const contentMd = article.contentSections
        .map((s) => `## ${s.number}. ${s.heading}\n\n${s.paragraphs.join("\n\n")}`)
        .join("\n\n");

      await prisma.article.upsert({
        where: { slug: article.slug },
        update: {
          title: article.title,
          excerpt: article.excerpt,
          contentMarkdown: contentMd,
          authorName: article.authorName,
          coverImageUrl: article.coverImageUrl,
          headerBgImageUrl: article.headerBgImageUrl,
          headerGradientOpacity: article.headerGradientOpacity,
          headerGradientHeight: article.headerGradientHeight,
          readTimeMinutes: article.readTimeMinutes,
          peruChanTip: article.peruChanTip,
          tocItems: article.tocItems as any,
          contentSections: article.contentSections as any,
          relatedSlugs: article.relatedSlugs as any,
          status: ArticleStatus.PUBLISHED,
        },
        create: {
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
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
          tocItems: article.tocItems as any,
          contentSections: article.contentSections as any,
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

  console.log("\n Seluruh data Seeder Jejak Perupa berhasil di-seed ke basis data via Prisma!");
}

main()
  .catch((e) => {
    console.error("Galat saat seeding Prisma:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
