"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface SelectProps {
  options: (string | SelectOption)[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  isSearchable?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Pilih opsi...",
  label,
  isSearchable = true,
  disabled = false,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Normalize options to SelectOption format
  const normalizedOptions: SelectOption[] = useMemo(() => {
    return options.map((opt) =>
      typeof opt === "string" ? { value: opt, label: opt } : opt
    );
  }, [options]);

  // Selected option label
  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Filtered options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return normalizedOptions;
    const query = searchQuery.toLowerCase();
    return normalizedOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        (opt.description && opt.description.toLowerCase().includes(query))
    );
  }, [normalizedOptions, searchQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
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

  // Auto focus search input when opening
  useEffect(() => {
    if (isOpen && isSearchable) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen, isSearchable]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative w-full font-sans", className)} ref={containerRef}>
      {label && (
        <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-jp-ink">
          {label}
        </label>
      )}

      {/* TRIGGER BUTTON */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-jp-gray-300 bg-white px-4 py-2.5 text-left text-sm transition-colors cursor-pointer",
          isOpen
            ? "border-jp-blue-700 ring-2 ring-jp-blue-100 shadow-2xs"
            : "hover:border-jp-gray-400",
          disabled && "cursor-not-allowed bg-jp-paper opacity-60"
        )}
      >
        <span
          className={cn(
            "truncate font-medium",
            selectedOption ? "text-jp-ink" : "text-jp-gray-400"
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-jp-gray-500 transition-transform duration-200 shrink-0 ml-2",
            isOpen && "rotate-180 text-jp-blue-700"
          )}
        />
      </button>

      {/* DROPDOWN MENU (VIRTUALIZED / MAX 5 VISIBLE ITEMS AT ONCE) */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg border border-jp-gray-300 bg-white shadow-lg animate-in fade-in-50 duration-150">
          {/* SEARCH BOX IF SEARCHABLE OR OPTIONS > 4 */}
          {(isSearchable || normalizedOptions.length > 4) && (
            <div className="border-b border-jp-gray-200 p-2 bg-jp-paper/60">
              <div className="relative flex items-center">
                <Search className="absolute left-2.5 h-3.5 w-3.5 text-jp-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik untuk mencari..."
                  className="w-full rounded-md border border-jp-gray-300 bg-white pl-8 pr-3 py-1.5 text-xs text-jp-ink placeholder:text-jp-gray-400 focus:border-jp-blue-700 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* OPTIONS LIST CONTAINER (5 items visible: 5 * 40px = 200px max height) */}
          <div className="max-h-[200px] overflow-y-auto p-1 divide-y divide-jp-gray-50 scrollbar-thin">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs transition-colors cursor-pointer",
                      isSelected
                        ? "bg-jp-blue-50 text-jp-blue-900 font-bold"
                        : "text-jp-gray-700 hover:bg-jp-paper hover:text-jp-ink"
                    )}
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="truncate">{opt.label}</div>
                      {opt.description && (
                        <div className="text-[10px] text-jp-gray-400 truncate">
                          {opt.description}
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 text-jp-blue-700 shrink-0" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-3 text-center text-xs text-jp-gray-400">
                Tidak ada opsi yang cocok.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
