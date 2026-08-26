"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Check, ChevronDown, ChevronUp, Palette, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ColorPickerProps {
  value: string; // Hex code or preset name (e.g. "#182C4A" or "blue")
  onChange: (colorHex: string) => void;
  label?: string;
  className?: string;
  showPresets?: boolean;
}

export interface ColorPreset {
  id: string;
  name: string;
  hex: string;
}

export const ART_COLOR_PRESETS: ColorPreset[] = [
  { id: "blue", name: "Biru Indigo", hex: "#182C4A" },
  { id: "brown", name: "Cokelat Tanah", hex: "#8C4A2F" },
  { id: "lime", name: "Hijau Zaitun", hex: "#849324" },
  { id: "amber", name: "Kuning Emas", hex: "#D97706" },
  { id: "crimson", name: "Merah Marun", hex: "#DC2626" },
  { id: "teal", name: "Biru Pirus", hex: "#0D9488" },
  { id: "purple", name: "Ungu Lembayung", hex: "#7C3AED" },
  { id: "rose", name: "Merah Mawar", hex: "#E11D48" },
  { id: "emerald", name: "Hijau Zamrud", hex: "#059669" },
  { id: "ochre", name: "Kuning Oker", hex: "#B45309" },
  { id: "slate", name: "Abu Arang", hex: "#475569" },
  { id: "navy", name: "Biru Samudra", hex: "#0F172A" },
];

// Helper: Normalize value to hex code
export function normalizeToHex(val: string): string {
  if (!val) return "#182C4A";
  if (val.startsWith("#")) return val.toUpperCase();
  const preset = ART_COLOR_PRESETS.find((p) => p.id === val.toLowerCase());
  return preset ? preset.hex : "#182C4A";
}

// Convert Hex to HSV
function hexToHsv(hex: string): { h: number; s: number; v: number } {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255 || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255 || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255 || 0;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

// Convert HSV to Hex
function hsvToHex(h: number, s: number, v: number): string {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const vNorm = v / 100;

  const i = Math.floor(hNorm * 6);
  const f = hNorm * 6 - i;
  const p = vNorm * (1 - sNorm);
  const q = vNorm * (1 - f * sNorm);
  const t = vNorm * (1 - (1 - f) * sNorm);

  let r = 0,
    g = 0,
    b = 0;

  switch (i % 6) {
    case 0:
      r = vNorm;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = vNorm;
      b = p;
      break;
    case 2:
      r = p;
      g = vNorm;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = vNorm;
      break;
    case 4:
      r = t;
      g = p;
      b = vNorm;
      break;
    case 5:
      r = vNorm;
      g = p;
      b = q;
      break;
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function ColorPicker({
  value,
  onChange,
  label,
  className,
  showPresets = true,
}: ColorPickerProps) {
  const currentHex = useMemo(() => normalizeToHex(value), [value]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hexInput, setHexInput] = useState(currentHex);

  const hsv = useMemo(() => hexToHsv(currentHex), [currentHex]);
  const [hue, setHue] = useState(hsv.h);
  const [sat, setSat] = useState(hsv.s);
  const [val, setVal] = useState(hsv.v);

  const spectrumRef = useRef<HTMLDivElement>(null);
  const [isDraggingSpectrum, setIsDraggingSpectrum] = useState(false);

  // Sync internal state when external value changes
  useEffect(() => {
    const normalized = normalizeToHex(value);
    setHexInput(normalized);
    const parsedHsv = hexToHsv(normalized);
    setHue(parsedHsv.h);
    setSat(parsedHsv.s);
    setVal(parsedHsv.v);
  }, [value]);

  // Spectrum 2D drag / click handler
  const handleSpectrumMove = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!spectrumRef.current) return;
      const rect = spectrumRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

      const newSat = Math.round((x / rect.width) * 100);
      const newVal = Math.round((1 - y / rect.height) * 100);

      setSat(newSat);
      setVal(newVal);

      const newHex = hsvToHex(hue, newSat, newVal);
      setHexInput(newHex);
      onChange(newHex);
    },
    [hue, onChange]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDraggingSpectrum) {
        handleSpectrumMove(e);
      }
    };
    const onMouseUp = () => {
      setIsDraggingSpectrum(false);
    };

    if (isDraggingSpectrum) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDraggingSpectrum, handleSpectrumMove]);

  const handleHueChange = (newHue: number) => {
    setHue(newHue);
    const newHex = hsvToHex(newHue, sat, val);
    setHexInput(newHex);
    onChange(newHex);
  };

  const handleHexInputChange = (raw: string) => {
    let clean = raw.trim();
    if (!clean.startsWith("#")) clean = "#" + clean;
    setHexInput(clean);

    if (/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      const upper = clean.toUpperCase();
      onChange(upper);
      const newHsv = hexToHsv(upper);
      setHue(newHsv.h);
      setSat(newHsv.s);
      setVal(newHsv.v);
    }
  };

  const currentPresetName = useMemo(() => {
    const match = ART_COLOR_PRESETS.find((p) => p.hex.toLowerCase() === currentHex.toLowerCase());
    return match ? match.name : "Kustom";
  }, [currentHex]);

  return (
    <div className={cn("space-y-2 font-sans", className)}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-jp-ink font-sans">
          {label}
        </label>
      )}

      {/* COMPACT TRIGGER / SUMMARY BAR */}
      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-xl border bg-white p-2.5 transition shadow-2xs",
          isExpanded
            ? "border-jp-blue-700 ring-2 ring-jp-blue-500/20"
            : "border-jp-gray-300 hover:border-jp-blue-600 hover:bg-jp-paper/40"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="h-6 w-6 rounded-lg border border-black/10 shadow-xs shrink-0"
            style={{ backgroundColor: currentHex }}
          />
          <div className="min-w-0">
            <div className="font-mono text-xs text-jp-ink font-bold leading-tight">
              {currentHex}
            </div>
            <div className="text-[11px] text-jp-gray-500 font-sans truncate">
              {currentPresetName}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold font-sans transition cursor-pointer border",
            isExpanded
              ? "bg-jp-blue-900 text-white border-jp-blue-900 shadow-2xs"
              : "bg-jp-paper text-jp-blue-900 border-jp-gray-300 hover:bg-white"
          )}
        >
          <Palette className="h-3.5 w-3.5" />
          <span>{isExpanded ? "Tutup Panel" : "Ubah Warna"}</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* INLINE EXPANDABLE COLOR PANEL (NATURAL FORM FLOW) */}
      {isExpanded && (
        <div className="rounded-xl border border-jp-blue-200 bg-jp-paper/60 p-4 space-y-3.5 animate-in fade-in duration-200">
          {/* 1. CURATED PRESET SWATCHES */}
          {showPresets && (
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-jp-gray-500">
                Pilihan Palet Standar Seni Rupa
              </div>
              <div className="grid grid-cols-6 gap-2">
                {ART_COLOR_PRESETS.map((preset) => {
                  const isSelected = currentHex.toLowerCase() === preset.hex.toLowerCase();
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        onChange(preset.hex);
                        setHexInput(preset.hex);
                        const newHsv = hexToHsv(preset.hex);
                        setHue(newHsv.h);
                        setSat(newHsv.s);
                        setVal(newHsv.v);
                      }}
                      title={`${preset.name} (${preset.hex})`}
                      className={cn(
                        "relative h-7 w-full rounded-lg transition-transform cursor-pointer flex items-center justify-center shadow-2xs",
                        isSelected
                          ? "ring-2 ring-jp-blue-900 ring-offset-2 scale-105"
                          : "hover:scale-105"
                      )}
                      style={{ backgroundColor: preset.hex }}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5 text-white drop-shadow-md" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. INTERACTIVE 2D COLOR SPECTRUM BOX */}
          <div className="space-y-2.5 pt-2 border-t border-jp-gray-200/80">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-jp-gray-500">
              Spektrum Warna Bebas
            </div>

            {/* SATURATION / VALUE 2D CANVAS */}
            <div
              ref={spectrumRef}
              onMouseDown={(e) => {
                setIsDraggingSpectrum(true);
                handleSpectrumMove(e);
              }}
              className="relative h-24 w-full rounded-xl cursor-crosshair overflow-hidden border border-jp-gray-300 select-none shadow-inner"
              style={{
                backgroundColor: `hsl(${hue}, 100%, 50%)`,
                backgroundImage:
                  "linear-gradient(to right, #fff, transparent), linear-gradient(to top, #000, transparent)",
              }}
            >
              {/* SPECTRUM POINTER */}
              <div
                className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md pointer-events-none"
                style={{
                  left: `${sat}%`,
                  top: `${100 - val}%`,
                  backgroundColor: currentHex,
                }}
              />
            </div>

            {/* HUE SLIDER */}
            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={(e) => handleHueChange(Number(e.target.value))}
                className="h-3 w-full appearance-none rounded-lg cursor-pointer outline-none shadow-inner"
                style={{
                  background:
                    "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
                }}
              />
            </div>

            {/* HEX INPUT & CURRENT COLOR PREVIEW */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleHexInputChange(e.target.value)}
                  maxLength={7}
                  placeholder="#182C4A"
                  className="w-full rounded-lg border border-jp-gray-300 bg-white px-3 py-1.5 font-mono text-xs font-bold text-jp-ink focus:border-jp-blue-700 outline-none shadow-2xs"
                />
              </div>

              <div
                className="h-8 w-10 rounded-lg border border-jp-gray-300 shadow-2xs shrink-0"
                style={{ backgroundColor: currentHex }}
              />

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="rounded-lg bg-jp-blue-900 px-3 py-1.5 font-bold text-xs text-white hover:bg-jp-blue-800 transition cursor-pointer shadow-2xs"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
