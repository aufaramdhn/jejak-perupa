"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SearchBar({
  placeholder = "Cari teori, teknik, atau seniman...",
  onSearch,
  className,
  size = "md",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const containerSizes = {
    sm: "py-1 pl-3 pr-1",
    md: "py-1.5 pl-4 pr-1.5",
    lg: "py-2 pl-5 pr-2",
  };

  const inputSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full items-center overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-jp-card transition focus-within:border-jp-blue-700 focus-within:ring-2 focus-within:ring-jp-blue-100",
        containerSizes[size],
        className
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-jp-gray-500 mr-2" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-jp-ink placeholder:text-jp-gray-500 outline-none",
          inputSizes[size]
        )}
      />
      <Button
        type="submit"
        variant="primary"
        size={size === "lg" ? "md" : "sm"}
        className="shrink-0"
      >
        Cari
      </Button>
    </form>
  );
}
