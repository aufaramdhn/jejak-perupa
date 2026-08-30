"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/atoms/form/Button";
import { useAuth } from "@/lib/auth";
import { useModal } from "@/lib/modalContext";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export interface BookmarkButtonProps {
  itemId: string;
  itemType?: "article" | "artwork" | "artist";
  initialSaved?: boolean;
  className?: string;
}

export function BookmarkButton({
  itemId,
  itemType = "article",
  initialSaved = false,
  className,
}: BookmarkButtonProps) {
  const { requireAuth, currentUser } = useAuth();
  const { toast } = useModal();
  const [saved, setSaved] = useState(initialSaved);

  React.useEffect(() => {
    let isMounted = true;

    // Check from Supabase Cloud first
    if (isSupabaseConfigured() && currentUser?.id) {
      supabase
        .from("user_bookmarks")
        .select("article_id")
        .eq("user_id", currentUser.id)
        .eq("article_id", itemId)
        .maybeSingle()
        .then(({ data }) => {
          if (isMounted && data) {
            setSaved(true);
          }
        });
    }

    // Fallback local check
    try {
      const stored = localStorage.getItem("jejak_perupa_saved_bookmarks");
      if (stored) {
        const ids: string[] = JSON.parse(stored);
        if (Array.isArray(ids)) {
          if (ids.includes(itemId)) setSaved(true);
        }
      }
    } catch (e) {}

    return () => {
      isMounted = false;
    };
  }, [itemId, currentUser]);

  const toggleBookmark = () => {
    requireAuth(() => {
      const next = !saved;
      setSaved(next);

      // Cloud Database Sync
      if (isSupabaseConfigured() && currentUser?.id) {
        if (next) {
          supabase
            .from("user_bookmarks")
            .upsert({ user_id: currentUser.id, article_id: itemId })
            .then(() => {}, () => {});
        } else {
          supabase
            .from("user_bookmarks")
            .delete()
            .match({ user_id: currentUser.id, article_id: itemId })
            .then(() => {}, () => {});
        }
      }

      // Local storage fallback
      try {
        const stored = localStorage.getItem("jejak_perupa_saved_bookmarks");
        let ids: string[] = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(ids)) ids = [];
        if (next) {
          if (!ids.includes(itemId)) ids.push(itemId);
        } else {
          ids = ids.filter((id) => id !== itemId);
        }
        localStorage.setItem("jejak_perupa_saved_bookmarks", JSON.stringify(ids));
      } catch (e) {}

      if (next) {
        toast({
          type: "success",
          title: "Materi Tersimpan",
          message: "Materi berhasil ditambahkan ke koleksi ruang belajarmu.",
        });
      } else {
        toast({
          type: "info",
          title: "Dihapus dari Simpanan",
          message: "Materi telah dikeluarkan dari daftar bookmark.",
        });
      }
    }, "Masuk atau daftar akun terlebih dahulu untuk menyimpan materi ini ke ruang belajarmu.");
  };

  return (
    <Button
      variant={saved ? "primary" : "outline"}
      size="sm"
      onClick={toggleBookmark}
      className={cn("transition-all duration-200 rounded-lg", className)}
      aria-label={saved ? "Hapus dari simpanan" : "Simpan materi"}
    >
      <Bookmark
        className={cn(
          "h-3.5 w-3.5 mr-1.5",
          saved ? "fill-current text-white" : "text-jp-blue-700"
        )}
      />
      <span>{saved ? "Tersimpan" : "Simpan"}</span>
    </Button>
  );
}
