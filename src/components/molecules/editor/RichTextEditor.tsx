"use client";

import React, { useRef } from "react";
import {
  Bold,
  Italic,
  Heading,
  List,
  ListOrdered,
  Quote,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const TOOLBAR_BUTTONS = [
  {
    label: "Tebal (Bold)",
    icon: Bold,
    prefix: "**",
    suffix: "**",
  },
  {
    label: "Miring (Italic)",
    icon: Italic,
    prefix: "*",
    suffix: "*",
  },
  {
    label: "Subjudul (H3)",
    icon: Heading,
    prefix: "\n\n### ",
    suffix: "\n",
  },
  {
    label: "Daftar Poin (Bullet List)",
    icon: List,
    prefix: "\n- ",
    suffix: "\n- Item 2\n- Item 3",
  },
  {
    label: "Daftar Nomor",
    icon: ListOrdered,
    prefix: "\n1. ",
    suffix: "\n2. Item 2\n3. Item 3",
  },
  {
    label: "Kutipan Estetika",
    icon: Quote,
    prefix: "\n> ",
    suffix: "\n",
  },
  {
    label: "Boks Tips Peru-Chan",
    icon: Sparkles,
    prefix: "\n> [Catatan Peru-Chan]: ",
    suffix: "\nTuliskan tips studio atau pesan penting di sini.\n",
  },
  {
    label: "Tautan Rujukan",
    icon: LinkIcon,
    prefix: "[",
    suffix: "](https://)",
  },
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis isi bab tulisan...",
  rows = 7,
  className,
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormat = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = prefix + (selectedText || "teks") + suffix;

    const newValue =
      value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText.length || 4)
      );
    }, 10);
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-jp-gray-300 bg-white overflow-hidden focus-within:border-jp-blue-700 focus-within:ring-2 focus-within:ring-jp-blue-100 transition-all font-sans",
        className
      )}
    >
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 border-b border-jp-gray-200 bg-jp-paper/80 p-2 text-jp-gray-700">
        {TOOLBAR_BUTTONS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              title={item.label}
              onClick={() => insertFormat(item.prefix, item.suffix)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-jp-gray-600 hover:bg-white hover:text-jp-blue-900 hover:shadow-2xs transition-colors cursor-pointer"
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          );
        })}
      </div>

      {/* TEXTAREA INPUT */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full p-4 text-xs font-sans text-jp-ink placeholder:text-jp-gray-400 focus:outline-none resize-y leading-relaxed"
      />
    </div>
  );
}
