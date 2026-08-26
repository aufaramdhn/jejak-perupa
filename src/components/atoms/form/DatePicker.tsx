"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value: string; // ISO date format: YYYY-MM-DD
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  className?: string;
}

const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Pilih tanggal...",
  minDate,
  maxDate,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial date or default to current date
  const parsedDate = useMemo(() => {
    if (!value) return new Date();
    const [year, month, day] = value.split("-").map(Number);
    if (!year || !month || !day) return new Date();
    return new Date(year, month - 1, day);
  }, [value]);

  const [viewYear, setViewYear] = useState(parsedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsedDate.getMonth());

  // Sync view when value changes externally
  useEffect(() => {
    if (value) {
      const [year, month] = value.split("-").map(Number);
      if (year && month) {
        setViewYear(year);
        setViewMonth(month - 1);
      }
    }
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Format display string
  const displayFormattedDate = useMemo(() => {
    if (!value) return "";
    const [year, month, day] = value.split("-");
    if (!year || !month || !day) return value;
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  }, [value]);

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    const days: {
      dayNumber: number;
      isCurrentMonth: boolean;
      dateString: string;
      isToday: boolean;
      isSelected: boolean;
      isDisabled: boolean;
    }[] = [];

    const todayStr = new Date().toISOString().split("T")[0];

    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({
        dayNumber: d,
        isCurrentMonth: false,
        dateString: dateStr,
        isToday: dateStr === todayStr,
        isSelected: dateStr === value,
        isDisabled: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({
        dayNumber: d,
        isCurrentMonth: true,
        dateString: dateStr,
        isToday: dateStr === todayStr,
        isSelected: dateStr === value,
        isDisabled: false,
      });
    }

    // Next month filler days to complete grid (42 cells = 6 rows)
    const remainingDays = 42 - days.length;
    for (let d = 1; d <= remainingDays; d++) {
      const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
      const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({
        dayNumber: d,
        isCurrentMonth: false,
        dateString: dateStr,
        isToday: dateStr === todayStr,
        isSelected: dateStr === value,
        isDisabled: false,
      });
    }

    return days;
  }, [viewYear, viewMonth, value]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (dateStr: string) => {
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;
    setViewYear(yyyy);
    setViewMonth(today.getMonth());
    onChange(todayStr);
    setIsOpen(false);
  };

  // Year options generation (2020 - 2030)
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;
    const years: number[] = [];
    for (let y = startYear; y <= endYear; y++) {
      years.push(y);
    }
    return years;
  }, []);

  return (
    <div ref={containerRef} className={cn("relative inline-block font-sans", className)}>
      {label && (
        <label className="block text-xs font-bold text-jp-ink mb-1">
          {label}
        </label>
      )}

      {/* INPUT TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex items-center justify-between gap-2.5 rounded-lg border bg-white px-3 py-2 text-xs font-mono font-bold transition cursor-pointer min-w-[135px]",
          isOpen
            ? "border-jp-blue-700 ring-2 ring-jp-blue-500/20 text-jp-blue-900"
            : "border-jp-gray-300 text-jp-ink hover:border-jp-blue-600 hover:bg-jp-blue-50/20"
        )}
      >
        <span className={value ? "text-jp-ink font-mono font-bold" : "text-jp-gray-400 font-sans"}>
          {displayFormattedDate || placeholder}
        </span>
        <CalendarIcon className="h-3.5 w-3.5 text-jp-gray-500 shrink-0" />
      </button>

      {/* CUSTOM CALENDAR POPOVER */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-72 rounded-xl border border-jp-gray-300 bg-white p-3.5 shadow-xl animate-in fade-in zoom-in-98 duration-150 font-sans">
          {/* HEADER: MONTH & YEAR SELECTORS WITH CHEVRONS */}
          <div className="flex items-center justify-between gap-1.5 border-b border-jp-gray-200 pb-2.5">
            <button
              type="button"
              onClick={handlePrevMonth}
              title="Bulan Sebelumnya"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-jp-gray-200 text-jp-gray-600 hover:bg-jp-blue-50 hover:text-jp-blue-900 transition cursor-pointer shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* MONTH & YEAR DROPDOWNS */}
            <div className="flex items-center gap-1.5">
              <select
                value={viewMonth}
                onChange={(e) => setViewMonth(Number(e.target.value))}
                className="rounded-md border border-jp-gray-200 bg-jp-paper/60 px-1.5 py-1 text-xs font-bold text-jp-ink cursor-pointer focus:border-jp-blue-700 focus:outline-none"
              >
                {MONTH_NAMES.map((name, idx) => (
                  <option key={name} value={idx}>
                    {name}
                  </option>
                ))}
              </select>

              <select
                value={viewYear}
                onChange={(e) => setViewYear(Number(e.target.value))}
                className="rounded-md border border-jp-gray-200 bg-jp-paper/60 px-1.5 py-1 text-xs font-mono font-bold text-jp-ink cursor-pointer focus:border-jp-blue-700 focus:outline-none"
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              title="Bulan Selanjutnya"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-jp-gray-200 text-jp-gray-600 hover:bg-jp-blue-50 hover:text-jp-blue-900 transition cursor-pointer shrink-0"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* DAY OF WEEK LABELS */}
          <div className="mt-2.5 grid grid-cols-7 gap-1 text-center font-mono text-[10px] font-bold text-jp-gray-400">
            {DAY_NAMES.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* DAYS GRID */}
          <div className="mt-1 grid grid-cols-7 gap-1">
            {calendarDays.map((item, idx) => (
              <button
                key={`${item.dateString}-${idx}`}
                type="button"
                onClick={() => handleSelectDay(item.dateString)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg font-mono text-xs transition cursor-pointer mx-auto",
                  item.isSelected
                    ? "bg-jp-blue-900 text-white font-bold shadow-xs"
                    : item.isToday
                    ? "border border-jp-blue-600 font-bold text-jp-blue-900 bg-jp-blue-50/50"
                    : item.isCurrentMonth
                    ? "text-jp-ink hover:bg-jp-blue-50 hover:text-jp-blue-900"
                    : "text-jp-gray-300 hover:bg-jp-paper hover:text-jp-gray-500"
                )}
              >
                {item.dayNumber}
              </button>
            ))}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="mt-3 flex items-center justify-between border-t border-jp-gray-200 pt-2.5 text-xs">
            <button
              type="button"
              onClick={handleSelectToday}
              className="font-bold text-jp-blue-700 hover:text-jp-blue-900 hover:underline cursor-pointer"
            >
              Hari Ini
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="font-semibold text-jp-gray-500 hover:text-jp-ink cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
