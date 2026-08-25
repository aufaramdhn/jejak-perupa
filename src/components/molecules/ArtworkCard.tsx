"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

export interface ArtworkCardProps {
  id: string;
  slug: string;
  title: string;
  artistName: string;
  yearCreated: number;
  mediumMaterial: string;
  currentLocation: string;
  imageUrl: string;
  hasCloseLooking?: boolean;
  className?: string;
}

export function ArtworkCard({
  id,
  title,
  artistName,
  yearCreated,
  mediumMaterial,
  currentLocation,
  imageUrl,
  hasCloseLooking = true,
  className,
}: ArtworkCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xs transition-all duration-300 hover:border-jp-blue-700 hover:shadow-jp-hover",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-jp-paper">
        {!imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-jp-paper text-jp-gray-500 font-heading font-semibold text-sm">
            {title}
          </div>
        )}

        {hasCloseLooking && (
          <div className="absolute top-3 right-3">
            <Link href={`/karya/${id}/kenali`}>
              <span className="inline-flex items-center gap-1 rounded-md bg-jp-blue-900/90 backdrop-blur px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-jp-blue-700 font-sans">
                <Eye className="h-3 w-3" />
                Bedah Karya
              </span>
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 font-sans">
        <div className="flex items-center gap-2 text-xs text-jp-gray-500 font-medium">
          <Calendar className="h-3.5 w-3.5" />
          <span className="font-mono">{yearCreated}</span>
          <span>•</span>
          <span className="truncate">{mediumMaterial}</span>
        </div>

        <h3 className="mt-2 font-heading text-lg font-bold text-jp-ink group-hover:text-jp-blue-900 transition-colors">
          {title}
        </h3>

        <p className="mt-1 text-sm font-semibold text-jp-brown-900 font-sans">
          Oleh {artistName}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-jp-gray-500 pt-3 border-t border-jp-gray-100">
          <MapPin className="h-3.5 w-3.5 text-jp-blue-700 shrink-0" />
          <span className="truncate">{currentLocation}</span>
        </div>

        {hasCloseLooking && (
          <div className="mt-5 pt-2">
            <Link href={`/karya/${id}/kenali`} className="block">
              <Button variant="secondary" size="sm" className="w-full rounded-lg">
                <Eye className="h-3.5 w-3.5 mr-1.5" />
                Kenali Lebih Dekat (Close Looking)
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
