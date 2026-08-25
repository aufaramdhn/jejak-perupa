"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ArticleStatus, Role } from "@prisma/client";

export interface CreateArticleInput {
  title: string;
  authorName: string;
  authorEmail?: string;
  categorySlug: string;
  readTimeMinutes: number;
  excerpt: string;
  chapters: { title: string; content: string }[];
  references: string[];
}

export interface CurateArticleInput {
  articleId: string;
  status: "PUBLISHED" | "ARCHIVED" | "DRAFT";
  peruChanTip?: string;
  reviewerNotes?: string;
}

/**
 * Server Action: Submit contributor draft
 */
export async function submitArticleAction(input: CreateArticleInput) {
  try {
    // Generate slug from title
    const slug = input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .concat(`-${Date.now().toString().slice(-4)}`);

    // Find category
    const category = await prisma.category.findFirst({
      where: {
        OR: [
          { slug: input.categorySlug },
          { name: { contains: input.categorySlug, mode: "insensitive" } },
        ],
      },
    });

    if (!category) {
      return {
        success: false,
        error: `Kategori '${input.categorySlug}' tidak ditemukan.`,
      };
    }

    // Format content markdown from chapters
    const combinedContent = input.chapters
      .map((ch, idx) => `## Bab ${idx + 1}: ${ch.title}\n\n${ch.content}`)
      .join("\n\n---\n\n");

    // Create article in database with DRAFT status (pending review)
    const newArticle = await prisma.article.create({
      data: {
        title: input.title,
        slug: slug,
        excerpt: input.excerpt,
        contentMarkdown: combinedContent,
        readTimeMinutes: input.readTimeMinutes || 5,
        status: ArticleStatus.DRAFT,
        categoryId: category.id,
        references: {
          create: input.references
            .filter((r) => r.trim().length > 0)
            .map((refText, idx) => ({
              citation: refText,
              orderIndex: idx + 1,
            })),
        },
      },
    });

    revalidatePath("/admin");
    revalidatePath("/artikel");
    revalidatePath("/dashboard");

    return {
      success: true,
      articleId: newArticle.id,
      slug: newArticle.slug,
    };
  } catch (error) {
    console.error("Galat Server Action submitArticleAction:", error);
    return {
      success: false,
      error: "Terjadi kendala saat menyimpan draf naskah.",
    };
  }
}

/**
 * Server Action: Curate and publish article with Peru-Chan endorsement
 */
export async function curateArticleAction(input: CurateArticleInput) {
  try {
    const updatedArticle = await prisma.article.update({
      where: { id: input.articleId },
      data: {
        status:
          input.status === "PUBLISHED"
            ? ArticleStatus.PUBLISHED
            : ArticleStatus.ARCHIVED,
        peruChanTip: input.peruChanTip || null,
        publishedAt: input.status === "PUBLISHED" ? new Date() : undefined,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/artikel");
    revalidatePath(`/artikel/${updatedArticle.slug}`);

    return {
      success: true,
      article: updatedArticle,
    };
  } catch (error) {
    console.error("Galat Server Action curateArticleAction:", error);
    return {
      success: false,
      error: "Gagal memperbarui status kurasi artikel.",
    };
  }
}
