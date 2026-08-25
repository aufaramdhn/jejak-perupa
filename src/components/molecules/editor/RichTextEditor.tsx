"use client";

import React, { useRef, useState } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Highlighter,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Sparkles,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  Link as LinkIcon,
  BookMarked,
  HelpCircle,
  Clock,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

interface ToolbarAction {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  prefix: string;
  suffix?: string;
  placeholder?: string;
}

interface ToolbarGroup {
  name: string;
  actions: ToolbarAction[];
}

const TOOLBAR_GROUPS: ToolbarGroup[] = [
  {
    name: "Gaya Teks",
    actions: [
      {
        id: "bold",
        label: "Tebal (Bold)",
        shortcut: "Ctrl+B",
        icon: Bold,
        prefix: "**",
        suffix: "**",
        placeholder: "teks tebal",
      },
      {
        id: "italic",
        label: "Miring (Italic)",
        shortcut: "Ctrl+I",
        icon: Italic,
        prefix: "*",
        suffix: "*",
        placeholder: "teks miring",
      },
      {
        id: "strikethrough",
        label: "Coret (Strikethrough)",
        icon: Strikethrough,
        prefix: "~~",
        suffix: "~~",
        placeholder: "teks dicoret",
      },
      {
        id: "code",
        label: "Glosarium / Istilah Monospace",
        icon: Code,
        prefix: "`",
        suffix: "`",
        placeholder: "istilah teknik / glosarium",
      },
      {
        id: "highlight",
        label: "Sorot Teks (Highlight)",
        icon: Highlighter,
        prefix: "<mark>",
        suffix: "</mark>",
        placeholder: "analisis penting",
      },
    ],
  },
  {
    name: "Struktur & Judul",
    actions: [
      {
        id: "h2",
        label: "Subjudul Utama (H2)",
        icon: Heading2,
        prefix: "\n\n## ",
        suffix: "\n",
        placeholder: "Subjudul Utama",
      },
      {
        id: "h3",
        label: "Sub-bab Penjelas (H3)",
        icon: Heading3,
        prefix: "\n\n### ",
        suffix: "\n",
        placeholder: "Sub-bab Penjelas",
      },
    ],
  },
  {
    name: "Daftar & Butir",
    actions: [
      {
        id: "bullet-list",
        label: "Daftar Butir (Bullet List)",
        icon: List,
        prefix: "\n- ",
        suffix: "\n- Butir kedua\n- Butir ketiga\n",
        placeholder: "Butir pertama",
      },
      {
        id: "ordered-list",
        label: "Daftar Bernomor (Numbered List)",
        icon: ListOrdered,
        prefix: "\n1. ",
        suffix: "\n2. Langkah kedua\n3. Langkah ketiga\n",
        placeholder: "Langkah pertama",
      },
      {
        id: "task-list",
        label: "Daftar Periksa (Checklist)",
        icon: CheckSquare,
        prefix: "\n- [ ] ",
        suffix: "\n- [ ] Tugas kedua\n- [x] Tugas selesai\n",
        placeholder: "Tugas telaah seni",
      },
    ],
  },
  {
    name: "Kutipan & Rubrik",
    actions: [
      {
        id: "blockquote",
        label: "Kutipan Kuratorial (Blockquote)",
        icon: Quote,
        prefix: "\n> ",
        suffix: "\n",
        placeholder: "Kutipan teori atau pernyataan kritis...",
      },
      {
        id: "peruchan-tip",
        label: "Boks Tips Peru-Chan",
        icon: Sparkles,
        prefix: "\n> **[Catatan Peru-Chan]**: ",
        suffix: "\nTuliskan tips studio atau panduan analisis di sini.\n",
        placeholder: "Sorotan Utama",
      },
    ],
  },
  {
    name: "Media & Tabel",
    actions: [
      {
        id: "image",
        label: "Sisipkan Gambar Karya & Keterangan",
        icon: ImageIcon,
        prefix: "\n![",
        suffix: "](https://domain.com/karya.jpg)\n*Keterangan karya: Judul, Tahun, Medium, Koleksi arsip.*\n",
        placeholder: "Judul Karya, Tahun, Medium",
      },
      {
        id: "table",
        label: "Tabel Analisis Perbandingan",
        icon: TableIcon,
        prefix: "\n\n| Unsur Rupa | Karakteristik Visual | Analisis Estetika |\n| :--- | :--- | :--- |\n| Garis | Dinamis & Ekspresif | Memberikan ilusi gerak |\n| Warna | Palet Kontras Primer | Menegaskan ketegangan visual |\n",
        suffix: "\n",
        placeholder: "",
      },
      {
        id: "divider",
        label: "Garis Pembatas Bagian (Divider)",
        icon: Minus,
        prefix: "\n\n---\n\n",
        suffix: "",
        placeholder: "",
      },
    ],
  },
  {
    name: "Tautan & Rujukan",
    actions: [
      {
        id: "link",
        label: "Tautan Rujukan (Link)",
        shortcut: "Ctrl+K",
        icon: LinkIcon,
        prefix: "[",
        suffix: "](https://tautan-rujukan.com)",
        placeholder: "Teks Tautan",
      },
      {
        id: "footnote",
        label: "Catatan Kaki Akademik (Footnote)",
        icon: BookMarked,
        prefix: "[^1]\n\n[^1]: ",
        suffix: "Penulis, *Judul Buku/Jurnal*, Penerbit, Tahun, hlm. 45.\n",
        placeholder: "Rujukan",
      },
    ],
  },
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis isi bab tulisan...",
  rows = 8,
  className,
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;
  const estimatedReadMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const insertFormat = (prefix: string, suffix: string = "", defaultText: string = "teks") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || defaultText;
    const replacement = prefix + textToInsert + suffix;

    const newValue =
      value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(
          start + prefix.length,
          start + prefix.length + selectedText.length
        );
      } else {
        textarea.setSelectionRange(
          start + prefix.length,
          start + prefix.length + textToInsert.length
        );
      }
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+B / Cmd+B for Bold
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      insertFormat("**", "**", "teks tebal");
    }
    // Ctrl+I / Cmd+I for Italic
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      insertFormat("*", "*", "teks miring");
    }
    // Ctrl+K / Cmd+K for Link
    else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      insertFormat("[", "](https://tautan-rujukan.com)", "Teks Tautan");
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-jp-gray-300 bg-white overflow-hidden focus-within:border-jp-blue-700 focus-within:ring-2 focus-within:ring-jp-blue-100 transition-all font-sans shadow-2xs",
        className
      )}
    >
      {/* EXPANDED RICH TEXT TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 border-b border-jp-gray-200 bg-jp-paper/90 px-3 py-2 text-jp-gray-700">
        {TOOLBAR_GROUPS.map((group, gIdx) => (
          <React.Fragment key={group.name}>
            {gIdx > 0 && (
              <div className="h-4 w-px bg-jp-gray-300 mx-1 shrink-0" aria-hidden="true" />
            )}
            <div className="flex items-center gap-0.5">
              {group.actions.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.shortcut ? `${item.label} (${item.shortcut})` : item.label}
                    aria-label={item.label}
                    onClick={() => insertFormat(item.prefix, item.suffix || "", item.placeholder || "teks")}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-jp-gray-600 hover:bg-white hover:text-jp-blue-900 hover:shadow-2xs transition-colors cursor-pointer"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        ))}

        {/* CHEAT SHEET TOGGLE */}
        <div className="ml-auto flex items-center">
          <button
            type="button"
            onClick={() => setShowCheatSheet(!showCheatSheet)}
            title="Bantuan Format Markdown & Panduan Menulis"
            className={cn(
              "flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded transition cursor-pointer font-sans",
              showCheatSheet
                ? "bg-jp-blue-900 text-white"
                : "text-jp-gray-500 hover:text-jp-blue-900 hover:bg-white"
            )}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Panduan Format</span>
          </button>
        </div>
      </div>

      {/* QUICK CHEATSHEET ACCORDION */}
      {showCheatSheet && (
        <div className="bg-jp-blue-50/70 border-b border-jp-blue-200 p-4 text-xs font-sans text-jp-ink space-y-2">
          <div className="flex items-center justify-between font-bold text-jp-blue-900">
            <span>Panduan Singkat Penulisan Esai Seni</span>
            <span className="text-[11px] font-mono text-jp-gray-500 font-normal">
              Pintasan: Ctrl+B (Tebal), Ctrl+I (Miring), Ctrl+K (Tautan)
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 text-jp-gray-700 text-[11px] font-mono">
            <div>
              <span className="font-bold text-jp-ink font-sans block">Format Teks:</span>
              <p>**tebal** → <strong>tebal</strong></p>
              <p>*miring* → <em>miring</em></p>
              <p>`istilah` → kode glosarium</p>
              <p>&lt;mark&gt;sorot&lt;/mark&gt; → teks highlight</p>
            </div>
            <div>
              <span className="font-bold text-jp-ink font-sans block">Struktur & Kutipan:</span>
              <p>## Subjudul Bab</p>
              <p>### Sub-bab Penjelas</p>
              <p>&gt; Kutipan Kuratorial</p>
              <p>--- (Garis Pembatas)</p>
            </div>
            <div>
              <span className="font-bold text-jp-ink font-sans block">Daftar & Media:</span>
              <p>- Poin butir</p>
              <p>1. Langkah bernomor</p>
              <p>[Teks Tautan](https://...)</p>
              <p>![Judul Karya](https://...)</p>
            </div>
          </div>
        </div>
      )}

      {/* TEXTAREA INPUT */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={rows}
        placeholder={placeholder}
        className="w-full p-4 text-xs md:text-sm font-prose text-jp-ink placeholder:text-jp-gray-400 focus:outline-none resize-y leading-relaxed"
      />

      {/* FOOTER METRICS BAR */}
      <div className="flex items-center justify-between border-t border-jp-gray-100 bg-jp-paper/40 px-4 py-2 text-[11px] font-mono text-jp-gray-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3 text-jp-blue-700" />
            {wordCount} kata ({charCount} karakter)
          </span>
          <span className="hidden sm:inline text-jp-gray-300">|</span>
          <span className="hidden sm:flex items-center gap-1">
            <Clock className="h-3 w-3 text-jp-blue-700" />
            ~{estimatedReadMinutes} mnt baca
          </span>
        </div>

        <span className="text-jp-gray-400">
          Mendukung Sintaks Markdown Lengkap
        </span>
      </div>
    </div>
  );
}
