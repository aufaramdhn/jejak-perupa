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
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

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

  const toolbarActions = [
    {
      label: "Tebal (Bold)",
      icon: Bold,
      action: () => insertFormat("**", "**"),
    },
    {
      label: "Miring (Italic)",
      icon: Italic,
      action: () => insertFormat("*", "*"),
    },
    {
      label: "Subjudul (H3)",
      icon: Heading,
      action: () => insertFormat("\n\n### ", "\n"),
    },
    {
      label: "Daftar Poin (Bullet List)",
      icon: List,
      action: () => insertFormat("\n- ", "\n- Item 2\n- Item 3"),
    },
    {
      label: "Daftar Nomor",
      icon: ListOrdered,
      action: () => insertFormat("\n1. ", "\n2. Item 2\n3. Item 3"),
    },
    {
      label: "Kutipan Estetika",
      icon: Quote,
      action: () => insertFormat("\n> ", "\n"),
    },
    {
      label: "Boks Tips Peru-Chan",
      icon: Sparkles,
      action: () =>
        insertFormat(
          "\n> [Catatan Peru-Chan]: ",
          "\nTuliskan tips studio atau pesan penting di sini.\n"
        ),
    },
    {
      label: "Tautan Rujukan",
      icon: LinkIcon,
      action: () => insertFormat("[", "](https://)"),
    },
  ];

  return (
    <div
      className={cn(
        "rounded-lg border border-jp-gray-300 bg-white overflow-hidden focus-within:border-jp-blue-700 focus-within:ring-2 focus-within:ring-jp-blue-100 transition-all font-sans",
        className
      )}
    >
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 border-b border-jp-gray-200 bg-jp-paper/80 p-2 text-jp-gray-700">
        {toolbarActions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              type="button"
              title={item.label}
              onClick={item.action}
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
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-y bg-white p-3.5 text-sm text-jp-ink placeholder:text-jp-gray-400 focus:outline-none font-prose leading-relaxed"
      />
    </div>
  );
}
