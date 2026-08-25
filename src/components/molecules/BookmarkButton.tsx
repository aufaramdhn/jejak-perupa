"use client";

import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { useAuth } from "@/lib/auth";
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
  const [saved, setSaved] = useState(initialSaved);

  const toggleBookmark = () => {
    requireAuth(() => {
      setSaved((prev) => !prev);
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
