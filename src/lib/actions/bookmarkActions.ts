"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function toggleBookmarkAction(userId: string, articleId: string) {
  try {
    const existing = await prisma.userBookmark.findUnique({
      where: {
        userId_articleId: {
          userId,
          articleId,
        },
      },
    });

    if (existing) {
      await prisma.userBookmark.delete({
        where: {
          id: existing.id,
        },
      });
      revalidatePath("/dashboard");
      return { success: true, bookmarked: false };
    } else {
      await prisma.userBookmark.create({
        data: {
          userId,
          articleId,
        },
      });
      revalidatePath("/dashboard");
      return { success: true, bookmarked: true };
    }
  } catch (error) {
    console.error("Galat Server Action toggleBookmarkAction:", error);
    return { success: false, error: "Gagal memperbarui status bookmark." };
  }
}
