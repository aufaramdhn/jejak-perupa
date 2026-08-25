"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import {
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageDualInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholderUrl?: string;
  helperGuideline?: string;
  minWidth?: number;
  minHeight?: number;
  recommendedAspect?: string;
  maxSizeBytes?: number; // default 2MB = 2097152
  maxSizeLabel?: string; // "2 MB"
  acceptedTypes?: string; // default "image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon"
  className?: string;
  previewClassName?: string;
  previewObjectFit?: "contain" | "cover";
}

export function ImageDualInput({
  label,
  value,
  onChange,
  placeholderUrl = "https://domain.com/gambar.jpg",
  helperGuideline,
  minWidth,
  minHeight,
  recommendedAspect,
  maxSizeBytes = 2 * 1024 * 1024,
  maxSizeLabel = "2 MB",
  acceptedTypes = "image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon,image/vnd.microsoft.icon",
  className,
  previewClassName,
  previewObjectFit = "cover",
}: ImageDualInputProps) {
  // Mode: "file" | "url"
  const [activeTab, setActiveTab] = useState<"file" | "url">("file");
  const [urlInput, setUrlInput] = useState(value && !value.startsWith("data:") ? value : "");
  const [dragOver, setDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationWarning, setValidationWarning] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<{ width: number; height: number; sizeKb?: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync external value
  useEffect(() => {
    if (value && !value.startsWith("data:")) {
      setUrlInput(value);
    }
  }, [value]);

  // Read dimensions when value changes
  useEffect(() => {
    if (!value) {
      setImageMeta(null);
      setValidationError(null);
      setValidationWarning(null);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImageMeta((prev) => ({
        width: img.naturalWidth,
        height: img.naturalHeight,
        sizeKb: prev?.sizeKb,
      }));

      // Validate min dimensions
      if (minWidth && img.naturalWidth < minWidth) {
        setValidationWarning(
          `Lebar gambar (${img.naturalWidth}px) lebih kecil dari rekomendasi minimal (${minWidth}px).`
        );
      } else if (minHeight && img.naturalHeight < minHeight) {
        setValidationWarning(
          `Tinggi gambar (${img.naturalHeight}px) lebih kecil dari rekomendasi minimal (${minHeight}px).`
        );
      } else {
        setValidationWarning(null);
      }
      setValidationError(null);
    };

    img.onerror = () => {
      if (value.startsWith("http")) {
        setValidationError("Gagal memuat gambar dari URL. Pastikan tautan valid dan dapat diakses.");
      }
    };

    img.src = value;
  }, [value, minWidth, minHeight]);

  const handleFileProcess = (file: File) => {
    setValidationError(null);
    setValidationWarning(null);

    // Validate size
    if (file.size > maxSizeBytes) {
      setValidationError(
        `Ukuran berkas (${(file.size / (1024 * 1024)).toFixed(2)} MB) melebihi batas maksimal ${maxSizeLabel}.`
      );
      return;
    }

    // Validate type
    const validExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico"];
    const fileExt = "." + file.name.split(".").pop()?.toLowerCase();
    const isValidType =
      file.type.startsWith("image/") || validExtensions.includes(fileExt);

    if (!isValidType) {
      setValidationError(
        "Format berkas tidak didukung. Harap gunakan format PNG, JPG, WebP, SVG, atau ICO."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImageMeta({
        width: 0,
        height: 0,
        sizeKb: Math.round(file.size / 1024),
      });
      onChange(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleUrlApply = () => {
    if (!urlInput.trim()) {
      onChange("");
      return;
    }
    onChange(urlInput.trim());
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    setValidationError(null);
    setValidationWarning(null);
    setImageMeta(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2.5 font-sans", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-jp-ink">
            {label}
          </label>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1 text-[11px] text-red-600 hover:text-red-700 font-mono transition cursor-pointer"
            >
              <X className="h-3 w-3" />
              Hapus Gambar
            </button>
          )}
        </div>
      )}

      {/* DUAL MODE TABS */}
      <div className="flex items-center gap-1.5 rounded-lg bg-jp-paper p-1 border border-jp-gray-200 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("file")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold transition cursor-pointer",
            activeTab === "file"
              ? "bg-white text-jp-blue-900 shadow-2xs border border-jp-gray-200/80"
              : "text-jp-gray-500 hover:text-jp-ink"
          )}
        >
          <Upload className="h-3.5 w-3.5" />
          Unggah Berkas
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold transition cursor-pointer",
            activeTab === "url"
              ? "bg-white text-jp-blue-900 shadow-2xs border border-jp-gray-200/80"
              : "text-jp-gray-500 hover:text-jp-ink"
          )}
        >
          <LinkIcon className="h-3.5 w-3.5" />
          Tautan URL
        </button>
      </div>

      {/* INPUT AREA ACCORDING TO TAB */}
      {activeTab === "file" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center transition cursor-pointer",
            dragOver
              ? "border-jp-blue-900 bg-jp-blue-50/70"
              : "border-jp-gray-300 bg-white hover:border-jp-blue-400 hover:bg-jp-paper/30"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-jp-blue-50 text-jp-blue-900 mb-2">
            <Upload className="h-5 w-5" />
          </div>

          <div className="text-xs font-bold text-jp-ink">
            Klik untuk memilih berkas atau seret gambar ke sini
          </div>
          <p className="mt-1 text-[11px] text-jp-gray-400 font-mono">
            PNG, JPG, WebP, SVG, atau ICO (Maks. {maxSizeLabel})
          </p>
        </div>
      ) : (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={placeholderUrl}
              className="text-xs"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleUrlApply();
                }
              }}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleUrlApply}
            className="rounded-lg text-xs shrink-0"
          >
            Terapkan URL
          </Button>
        </div>
      )}

      {/* GUIDELINE HELPER TEXT */}
      {helperGuideline && (
        <div className="flex items-start gap-1.5 text-[11px] text-jp-gray-500 font-prose bg-jp-paper/50 rounded-lg p-2 border border-jp-gray-200">
          <Info className="h-3.5 w-3.5 text-jp-blue-700 shrink-0 mt-0.5" />
          <span>{helperGuideline}</span>
        </div>
      )}

      {/* VALIDATION WARNING / ERROR */}
      {validationError && (
        <div className="flex items-start gap-1.5 text-xs text-red-600 font-sans bg-red-50 rounded-lg p-2.5 border border-red-200">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{validationError}</span>
        </div>
      )}

      {validationWarning && !validationError && (
        <div className="flex items-start gap-1.5 text-xs text-amber-700 font-sans bg-amber-50 rounded-lg p-2.5 border border-amber-200">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{validationWarning}</span>
        </div>
      )}

      {/* LIVE THUMBNAIL PREVIEW */}
      {value && !validationError && (
        <div className="relative rounded-xl border border-jp-gray-200 bg-white p-3 shadow-2xs flex items-center gap-3.5">
          <div
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-jp-paper border border-jp-gray-200 flex items-center justify-center",
              previewClassName
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Pratinjau"
              className={cn(
                "h-full w-full",
                previewObjectFit === "contain" ? "object-contain p-1" : "object-cover"
              )}
            />
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-jp-ink">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
              <span>Gambar Siap Digunakan</span>
            </div>

            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-jp-gray-500">
              {imageMeta?.width && imageMeta?.height ? (
                <span className="bg-jp-paper px-1.5 py-0.5 rounded border border-jp-gray-200">
                  {imageMeta.width} × {imageMeta.height} px
                </span>
              ) : null}
              {imageMeta?.sizeKb ? (
                <span className="bg-jp-paper px-1.5 py-0.5 rounded border border-jp-gray-200">
                  {imageMeta.sizeKb} KB
                </span>
              ) : null}
              {value.startsWith("data:") ? (
                <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                  Berkas Lokal
                </span>
              ) : (
                <span className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded border border-purple-200 truncate max-w-[200px]">
                  Tautan URL
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
            title="Hapus gambar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
