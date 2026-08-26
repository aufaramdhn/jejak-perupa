"use client";

import React, { useState } from "react";
import { Heading3 } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { PeruChanMascotSlider } from "@/components/organisms/peruchan/PeruChanMascotSlider";
import { MascotSlideItem } from "@/lib/data/siteSettings";
import { Sparkles, Plus, Trash2, Edit2, Eye, EyeOff } from "lucide-react";

interface MascotSlidesTabProps {
  slides: MascotSlideItem[];
  onOpenAddSlide: () => void;
  onOpenEditSlide: (slide: MascotSlideItem) => void;
  onDeleteSlide: (id: string, title: string) => void;
}

export function MascotSlidesTab({
  slides,
  onOpenAddSlide,
  onOpenEditSlide,
  onDeleteSlide,
}: MascotSlidesTabProps) {
  const [showSlideshowPreview, setShowSlideshowPreview] = useState(false);

  return (
    <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jp-gray-100 pb-4">
        <div>
          <Heading3 className="text-lg text-jp-ink">
            Galeri Slideshow Karakter Peru-Chan (Hero & Tentang)
          </Heading3>
          <p className="mt-1 text-xs text-jp-gray-500 font-prose">
            Kelola pose ilustrasi, kutipan motivasi studio, dan tema aksen warna pada hero beranda.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowSlideshowPreview(!showSlideshowPreview)}
            className="rounded-lg text-xs font-bold border-jp-blue-300 text-jp-blue-900 hover:bg-jp-blue-50 cursor-pointer"
          >
            {showSlideshowPreview ? (
              <>
                <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                Sembunyikan Pratinjau
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5 mr-1.5" />
                Lihat Pratinjau
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onOpenAddSlide}
            className="rounded-lg font-bold text-xs cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Tambah Slide Pose Baru
          </Button>
        </div>
      </div>

      {/* SLIDES GRID */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-jp-gray-200 bg-jp-paper/40 p-4 transition hover:border-jp-blue-300 hover:shadow-xs"
          >
            <div className="space-y-3">
              <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-lg bg-white border border-jp-gray-200">
                {slide.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    width={128}
                    height={128}
                    loading="lazy"
                    decoding="async"
                    className="max-h-32 object-contain transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-jp-blue-50 text-jp-blue-900">
                    <Sparkles className="h-6 w-6" />
                  </div>
                )}
                <span className="absolute top-2 left-2 rounded-md bg-jp-ink/80 px-2 py-0.5 font-mono text-[10px] font-bold text-white backdrop-blur-xs">
                  #{idx + 1}
                </span>
                <span className="absolute top-2 right-2">
                  <Badge
                    variant={
                      slide.accentColor === "lime"
                        ? "lime"
                        : slide.accentColor === "brown"
                        ? "brown"
                        : "blue"
                    }
                    size="sm"
                  >
                    {slide.accentColor}
                  </Badge>
                </span>
              </div>

              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-jp-gray-400">
                  {slide.subtitle || "CATATAN MASKOT"}
                </div>
                <div className="font-bold text-jp-ink text-sm truncate">
                  {slide.title}
                </div>
                <p className="mt-1 font-prose text-xs italic text-jp-gray-600 line-clamp-2">
                  &ldquo;{slide.quote}&rdquo;
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-1.5 border-t border-jp-gray-200/60 pt-3">
              <button
                type="button"
                onClick={() => onOpenEditSlide(slide)}
                title="Edit Slide"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition cursor-pointer"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDeleteSlide(slide.id, slide.title)}
                title="Hapus Slide"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TOGGLEABLE LIVE PREVIEW SLIDER */}
      {showSlideshowPreview && (
        <div className="rounded-xl border border-jp-blue-200 bg-jp-blue-50/50 p-6 space-y-4 animate-in fade-in zoom-in-98 duration-200">
          <div className="flex items-center justify-between border-b border-jp-blue-200/80 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-jp-blue-900 uppercase tracking-wider">
              <Eye className="h-4 w-4" />
              Pratinjau Langsung Slideshow Peru-Chan (1:1)
            </div>
            <button
              type="button"
              onClick={() => setShowSlideshowPreview(false)}
              className="text-xs font-semibold text-jp-blue-700 hover:text-jp-blue-900 hover:underline cursor-pointer flex items-center gap-1"
            >
              <EyeOff className="h-3.5 w-3.5" />
              Sembunyikan
            </button>
          </div>

          <div className="w-full flex items-center justify-center py-2">
            <PeruChanMascotSlider autoPlayInterval={5000} className="mx-auto shadow-md" />
          </div>
        </div>
      )}
    </div>
  );
}
