"use client";

import React, { useState, useMemo, useTransition } from "react";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { DatePicker } from "@/components/atoms/form/DatePicker";
import { AdminChartSkeleton } from "@/components/organisms/admin/AdminChartSkeleton";
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
  const [customStartDate, setCustomStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  });
  const [customEndDate, setCustomEndDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (filter: TimeRangeFilter) => {
    startTransition(() => {
      setActiveFilter(filter);
    });
  };

  const handleCustomDateChange = (start: string, end: string) => {
    startTransition(() => {
      setCustomStartDate(start);
      setCustomEndDate(end);
    });
  };

  // Generate dynamic calendar dataset based on filter (Initialized to 0 for real-time tracking)
  const chartData: DataPoint[] = useMemo(() => {
    const now = new Date();

    switch (activeFilter) {
      case "7d": {
        const points: DataPoint[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const label = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
          const fullDate = d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
          points.push({
            label,
            fullDate: i === 0 ? `${fullDate} (Hari Ini)` : fullDate,
            readers: 0,
            readDurationHours: 0,
          });
        }
        return points;
      }

      case "30d": {
        const points: DataPoint[] = [];
        for (let i = 9; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - Math.round(i * 3.3));
          const label = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
          const fullDate = d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
          points.push({
            label,
            fullDate,
            readers: 0,
            readDurationHours: 0,
          });
        }
        return points;
      }

      case "last_month": {
        const points: DataPoint[] = [];
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthName = lastMonth.toLocaleDateString("id-ID", { month: "long" });
        const intervals = [1, 5, 10, 15, 20, 25, 28];
        intervals.forEach((day) => {
          const d = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), day);
          points.push({
            label: d.toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
            fullDate: `${day} ${lastMonthName} ${d.getFullYear()}`,
            readers: 0,
            readDurationHours: 0,
          });
        });
        return points;
      }

      case "3m": {
        const points: DataPoint[] = [];
        for (let i = 11; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i * 7);
          const monthShort = d.toLocaleDateString("id-ID", { month: "short" });
          const monthFull = d.toLocaleDateString("id-ID", { month: "long" });
          const weekNum = Math.min(4, Math.floor(d.getDate() / 7) + 1);
          points.push({
            label: `${monthShort} M${weekNum}`,
            fullDate: `${monthFull} Minggu ${weekNum} (${d.getFullYear()})`,
            readers: 0,
            readDurationHours: 0,
          });
        }
        return points;
      }

      case "custom":
      default: {
        const start = new Date(customStartDate || "2026-01-01");
        const end = new Date(customEndDate || now);
        const diffMs = Math.max(1000 * 60 * 60 * 24, end.getTime() - start.getTime());
        const diffDays = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
        const steps = Math.min(diffDays, 6);
        const points: DataPoint[] = [];
        for (let i = 0; i <= steps; i++) {
          const d = new Date(start.getTime() + (diffDays * (i / Math.max(1, steps))) * (1000 * 60 * 60 * 24));
          const label = d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
          const fullDate = d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
          points.push({
            label,
            fullDate,
            readers: 0,
            readDurationHours: 0,
          });
        }
        return points;
      }
    }
  }, [activeFilter, customStartDate, customEndDate]);

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
            onClick={() => handleFilterChange("7d")}
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
            onClick={() => handleFilterChange("30d")}
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
            onClick={() => handleFilterChange("last_month")}
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
            onClick={() => handleFilterChange("3m")}
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
            onClick={() => handleFilterChange("custom")}
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

          <div className="flex items-center gap-2 flex-wrap">
            <DatePicker
              value={customStartDate}
              onChange={(val) => handleCustomDateChange(val, customEndDate)}
              placeholder="Tanggal Mulai"
            />
            <span className="text-xs text-jp-gray-500 font-bold">s/d</span>
            <DatePicker
              value={customEndDate}
              onChange={(val) => handleCustomDateChange(customStartDate, val)}
              placeholder="Tanggal Akhir"
            />
          </div>

          <span className="text-[11px] text-jp-gray-600 font-prose">
            Menampilkan ringkasan trafik periode kustom.
          </span>
        </div>
      )}

      {/* IN-SITU GRAPH & METRIC SKELETON */}
      {isPending ? (
        <AdminChartSkeleton />
      ) : (
        <>
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
            <span className="text-[11px] font-bold text-jp-gray-500 font-mono bg-jp-paper px-1.5 py-0.5 rounded border border-jp-gray-200">
              0% (Awal Periode)
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
      </>
      )}
    </div>
  );
}
