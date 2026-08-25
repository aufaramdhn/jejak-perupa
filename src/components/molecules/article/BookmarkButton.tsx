"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/atoms/form/Button";
import { useAuth } from "@/lib/auth";
import { useModal } from "@/lib/modalContext";
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
  const { requireAuth } = useAuth();
  const { toast } = useModal();
  const [saved, setSaved] = useState(initialSaved);

  const toggleBookmark = () => {
    requireAuth(() => {
      setSaved((prev) => {
        const next = !prev;
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
        return next;
      });
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
