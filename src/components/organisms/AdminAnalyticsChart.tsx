"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  TrendingUp,
  Users,
  Calendar,
  Clock,
  ArrowUpRight,
  Filter,
  Eye,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TimeRangeFilter = "7d" | "30d" | "last_month" | "3m" | "custom";

interface DataPoint {
  label: string;
  fullDate: string;
  readers: number;
  readDurationHours: number;
}

export function AdminAnalyticsChart() {
  const [activeFilter, setActiveFilter] = useState<TimeRangeFilter>("7d");
  const [customStartDate, setCustomStartDate] = useState("2026-08-01");
  const [customEndDate, setCustomEndDate] = useState("2026-08-25");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Generate realistic dataset based on filter
  const chartData: DataPoint[] = useMemo(() => {
    switch (activeFilter) {
      case "7d":
        return [
          { label: "19 Agu", fullDate: "19 Agustus 2026", readers: 480, readDurationHours: 32 },
          { label: "20 Agu", fullDate: "20 Agustus 2026", readers: 620, readDurationHours: 41 },
          { label: "21 Agu", fullDate: "21 Agustus 2026", readers: 540, readDurationHours: 36 },
          { label: "22 Agu", fullDate: "22 Agustus 2026", readers: 790, readDurationHours: 58 },
          { label: "23 Agu", fullDate: "23 Agustus 2026", readers: 920, readDurationHours: 69 },
          { label: "24 Agu", fullDate: "24 Agustus 2026", readers: 870, readDurationHours: 64 },
          { label: "25 Agu", fullDate: "25 Agustus 2026 (Hari Ini)", readers: 1140, readDurationHours: 85 },
        ];

      case "30d":
        return [
          { label: "27 Jul", fullDate: "27 Juli 2026", readers: 320, readDurationHours: 21 },
          { label: "30 Jul", fullDate: "30 Juli 2026", readers: 410, readDurationHours: 28 },
          { label: "03 Agu", fullDate: "03 Agustus 2026", readers: 520, readDurationHours: 35 },
          { label: "06 Agu", fullDate: "06 Agustus 2026", readers: 680, readDurationHours: 46 },
          { label: "09 Agu", fullDate: "09 Agustus 2026", readers: 590, readDurationHours: 40 },
          { label: "12 Agu", fullDate: "12 Agustus 2026", readers: 730, readDurationHours: 51 },
          { label: "15 Agu", fullDate: "15 Agustus 2026", readers: 840, readDurationHours: 60 },
          { label: "18 Agu", fullDate: "18 Agustus 2026", readers: 780, readDurationHours: 55 },
          { label: "21 Agu", fullDate: "21 Agustus 2026", readers: 910, readDurationHours: 67 },
          { label: "25 Agu", fullDate: "25 Agustus 2026", readers: 1140, readDurationHours: 85 },
        ];

      case "last_month":
        return [
          { label: "01 Jul", fullDate: "01 Juli 2026", readers: 280, readDurationHours: 19 },
          { label: "05 Jul", fullDate: "05 Juli 2026", readers: 340, readDurationHours: 23 },
          { label: "10 Jul", fullDate: "10 Juli 2026", readers: 390, readDurationHours: 27 },
          { label: "15 Jul", fullDate: "15 Juli 2026", readers: 460, readDurationHours: 32 },
          { label: "20 Jul", fullDate: "20 Juli 2026", readers: 510, readDurationHours: 36 },
          { label: "25 Jul", fullDate: "25 Juli 2026", readers: 580, readDurationHours: 41 },
          { label: "31 Jul", fullDate: "31 Juli 2026", readers: 630, readDurationHours: 45 },
        ];

      case "3m":
        return [
          { label: "Jun M1", fullDate: "Juni Minggu 1", readers: 1850, readDurationHours: 120 },
          { label: "Jun M2", fullDate: "Juni Minggu 2", readers: 2100, readDurationHours: 145 },
          { label: "Jun M3", fullDate: "Juni Minggu 3", readers: 2450, readDurationHours: 170 },
          { label: "Jun M4", fullDate: "Juni Minggu 4", readers: 2800, readDurationHours: 195 },
          { label: "Jul M1", fullDate: "Juli Minggu 1", readers: 3100, readDurationHours: 215 },
          { label: "Jul M2", fullDate: "Juli Minggu 2", readers: 3400, readDurationHours: 238 },
          { label: "Jul M3", fullDate: "Juli Minggu 3", readers: 3750, readDurationHours: 260 },
          { label: "Jul M4", fullDate: "Juli Minggu 4", readers: 4100, readDurationHours: 290 },
          { label: "Agu M1", fullDate: "Agustus Minggu 1", readers: 4600, readDurationHours: 325 },
          { label: "Agu M2", fullDate: "Agustus Minggu 2", readers: 5200, readDurationHours: 370 },
          { label: "Agu M3", fullDate: "Agustus Minggu 3", readers: 5900, readDurationHours: 420 },
          { label: "Agu M4", fullDate: "Agustus Minggu 4", readers: 6850, readDurationHours: 490 },
        ];

      case "custom":
      default:
        return [
          { label: "01 Agu", fullDate: "01 Agustus 2026", readers: 490, readDurationHours: 34 },
          { label: "07 Agu", fullDate: "07 Agustus 2026", readers: 620, readDurationHours: 44 },
          { label: "14 Agu", fullDate: "14 Agustus 2026", readers: 780, readDurationHours: 56 },
          { label: "21 Agu", fullDate: "21 Agustus 2026", readers: 940, readDurationHours: 68 },
          { label: "25 Agu", fullDate: "25 Agustus 2026", readers: 1140, readDurationHours: 85 },
        ];
    }
  }, [activeFilter]);

  // Max value for scaling
  const maxReaders = useMemo(
    () => Math.max(...chartData.map((d) => d.readers), 100),
    [chartData]
  );

  const totalReadersInPeriod = useMemo(
    () => chartData.reduce((acc, d) => acc + d.readers, 0),
    [chartData]
  );

  const avgReadersPerDay = useMemo(
    () => Math.round(totalReadersInPeriod / chartData.length),
    [totalReadersInPeriod, chartData.length]
  );

  const peakPoint = useMemo(() => {
    let peak = chartData[0];
    chartData.forEach((d) => {
      if (d.readers > peak.readers) peak = d;
    });
    return peak;
  }, [chartData]);

  // SVG Chart Geometry
  const width = 800;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;

  const points = useMemo(() => {
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - paddingY * 2;

    return chartData.map((d, i) => {
      const x = paddingX + (i / (chartData.length - 1)) * usableWidth;
      const y = height - paddingY - (d.readers / (maxReaders * 1.15)) * usableHeight;
      return { ...d, x, y };
    });
  }, [chartData, maxReaders, width, height, paddingX, paddingY]);

  // SVG Path Line
  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((acc, p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      // Smooth cubic curve
      const prev = points[i - 1];
      const cx1 = prev.x + (p.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (p.x - prev.x) / 2;
      const cy2 = p.y;
      return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
    }, "");
  }, [points]);

  // SVG Area Fill
  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    const first = points[0];
    const last = points[points.length - 1];
    return `${linePath} L ${last.x} ${height - paddingY} L ${first.x} ${height - paddingY} Z`;
  }, [linePath, points, height, paddingY]);

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : points[points.length - 1];

  return (
    <div className="rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6 font-sans">
      {/* TOP HEADER & FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-jp-gray-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-blue-900 text-white">
              <TrendingUp className="h-3.5 w-3.5" />
            </span>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-jp-ink">
              Analitik Pembaca & Eksplorasi Wacana
            </h2>
          </div>
          <p className="mt-1 text-xs text-jp-gray-500 font-prose pl-8">
            Pantau intensitas pembaca artikel, durasi telaah karya, dan tren minat studi seni rupa.
          </p>
        </div>

        {/* TIME RANGE FILTER BUTTONS */}
        <div className="flex flex-wrap items-center gap-1.5 bg-jp-paper p-1 rounded-lg border border-jp-gray-200">
          <button
            type="button"
            onClick={() => setActiveFilter("7d")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer",
              activeFilter === "7d"
                ? "bg-jp-blue-900 text-white shadow-2xs"
                : "text-jp-gray-600 hover:text-jp-ink"
            )}
          >
            7 Hari
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("30d")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer",
              activeFilter === "30d"
                ? "bg-jp-blue-900 text-white shadow-2xs"
                : "text-jp-gray-600 hover:text-jp-ink"
            )}
          >
            30 Hari
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("last_month")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer",
              activeFilter === "last_month"
                ? "bg-jp-blue-900 text-white shadow-2xs"
                : "text-jp-gray-600 hover:text-jp-ink"
            )}
          >
            Bulan Lalu
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("3m")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer",
              activeFilter === "3m"
                ? "bg-jp-blue-900 text-white shadow-2xs"
                : "text-jp-gray-600 hover:text-jp-ink"
            )}
          >
            3 Bulan
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("custom")}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded-md transition cursor-pointer",
              activeFilter === "custom"
                ? "bg-jp-blue-900 text-white shadow-2xs"
                : "text-jp-gray-600 hover:text-jp-ink"
            )}
          >
            Kustom
          </button>
        </div>
      </div>

      {/* CUSTOM DATE PICKER ROW (CONDITIONAL) */}
      {activeFilter === "custom" && (
        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-jp-blue-200 bg-jp-blue-50/50 p-4 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-xs font-bold text-jp-blue-900">
            <Calendar className="h-4 w-4" />
            <span>Pilih Rentang Tanggal:</span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="rounded-md border border-jp-gray-300 bg-white px-2.5 py-1 text-xs font-mono font-bold text-jp-ink focus:border-jp-blue-700 outline-none"
            />
            <span className="text-xs text-jp-gray-500 font-bold">s/d</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="rounded-md border border-jp-gray-300 bg-white px-2.5 py-1 text-xs font-mono font-bold text-jp-ink focus:border-jp-blue-700 outline-none"
            />
          </div>

          <span className="text-[11px] text-jp-gray-600 font-prose">
            Menampilkan ringkasan trafik periode kustom.
          </span>
        </div>
      )}

      {/* METRIC SUMMARY STRIP */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-jp-gray-200 bg-jp-paper/40 p-4 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-jp-gray-500 font-mono">
            Rata-Rata Pembaca Harian
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold text-jp-ink">
              {avgReadersPerDay.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-green-700 flex items-center">
              <ArrowUpRight className="h-3.5 w-3.5" /> +18.4%
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-jp-gray-200 bg-jp-paper/40 p-4 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-jp-gray-500 font-mono">
            Puncak Trafik ({peakPoint.label})
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold text-jp-blue-900">
              {peakPoint.readers.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-jp-gray-500">
              pembaca / hari
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-jp-gray-200 bg-jp-paper/40 p-4 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-jp-gray-500 font-mono">
            Total Sesi Telaah Karya
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl font-extrabold text-jp-brown-900">
              {totalReadersInPeriod.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-jp-gray-500">
              kunjungan aktif
            </span>
          </div>
        </div>
      </div>

      {/* SVG INTERACTIVE GRAPH CANVAS */}
      <div className="relative rounded-xl border border-jp-gray-200 bg-jp-paper/30 p-4 pt-6">
        {/* HOVER TOOLTIP CARD */}
        {activePoint && (
          <div className="mb-2 flex items-center justify-between gap-4 border-b border-jp-gray-200/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-jp-blue-900" />
              <span className="text-xs font-bold text-jp-ink">
                {activePoint.fullDate}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-jp-gray-500">Pembaca: </span>
                <span className="font-extrabold text-jp-blue-900">
                  {activePoint.readers.toLocaleString()} orang
                </span>
              </div>
              <div>
                <span className="text-jp-gray-500">Total Durasi: </span>
                <span className="font-extrabold text-jp-brown-800">
                  {activePoint.readDurationHours} Jam
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="relative w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-48 md:h-64 overflow-visible"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#182C4A" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#182C4A" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* HORIZONTAL GRID LINES */}
            {[0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = height - paddingY - (height - paddingY * 2) * ratio;
              return (
                <g key={ratio}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="#E2DCD2"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    textAnchor="end"
                    className="font-mono text-[9px] fill-jp-gray-400"
                  >
                    {Math.round(maxReaders * ratio)}
                  </text>
                </g>
              );
            })}

            {/* GRADIENT AREA */}
            <path d={areaPath} fill="url(#chartGradient)" />

            {/* LINE PATH */}
            <path
              d={linePath}
              fill="none"
              stroke="#182C4A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* DATA POINTS & HOVER HITBOXES */}
            {points.map((p, idx) => (
              <g key={p.label}>
                {/* Data point circle */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIndex === idx ? "5" : "3.5"}
                  className={cn(
                    "transition-all",
                    hoveredIndex === idx
                      ? "fill-jp-blue-900 stroke-white stroke-2"
                      : "fill-white stroke-jp-blue-900 stroke-2"
                  )}
                />

                {/* X-Axis Label */}
                <text
                  x={p.x}
                  y={height - 8}
                  textAnchor="middle"
                  className={cn(
                    "font-mono text-[10px] transition-colors",
                    hoveredIndex === idx ? "font-bold fill-jp-blue-900" : "fill-jp-gray-500"
                  )}
                >
                  {p.label}
                </text>

                {/* Invisible hover hitbox */}
                <rect
                  x={p.x - 20}
                  y={0}
                  width="40"
                  height={height}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
