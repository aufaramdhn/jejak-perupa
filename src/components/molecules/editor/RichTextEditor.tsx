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
  Eye,
  Edit3,
  Columns,
} from "lucide-react";
import { RichContentRenderer } from "@/components/molecules/article/RichContentRenderer";
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
        label: "Kutipan Wacana (Quote)",
        icon: Quote,
        prefix: "\n\n:::kutipan\nkutipan: ",
        suffix: "\ntokoh: S. Sudjojono\n:::\n\n",
        placeholder: "Tuliskan pernyataan wacana kritis...",
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
        label: "Tabel Analisis Komparasi",
        icon: TableIcon,
        prefix: "\n\n:::tabel\nheader: Aspek Komparasi | Studio Lukis | Studio Patung\nbaris: Medium Primer | Kanvas & Cat Minyak | Logam, Kayu & Batu\nbaris: Dimensi Rupa | 2 Dimensi (Datar) | 3 Dimensi (Spasial)\n:::\n\n",
        suffix: "",
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
  const [viewMode, setViewMode] = useState<"write" | "preview" | "split">("write");

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;
  const estimatedReadMinutes = Math.max(1, Math.ceil(wordCount / 180));

  const insertFormat = (prefix: string, suffix: string = "", defaultText: string = "") => {
    // If user is in preview mode, switch back to write mode first so they can see and edit
    if (viewMode === "preview") {
      setViewMode("write");
    }

    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + prefix + defaultText + suffix);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || defaultText;

    const prefixAdjusted =
      prefix.startsWith("\n") && start > 0 && !value.substring(0, start).endsWith("\n")
        ? "\n" + prefix
        : prefix;

    const replacement = prefixAdjusted + textToInsert + suffix;

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
      {/* EXPANDED RICH TEXT TOOLBAR WITH VIEW MODE TOGGLE */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-jp-gray-200 bg-jp-paper/90 px-3 py-2 text-jp-gray-700">
        <div className="flex flex-wrap items-center gap-1">
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
        </div>

        {/* RIGHT CONTROLS: VIEW MODE SWITCHER & CHEATSHEET */}
        <div className="flex items-center gap-2">
          {/* VIEW MODE TOGGLE (TULIS vs VISUAL vs SPLIT) */}
          <div className="flex items-center gap-1 rounded-lg bg-jp-gray-200/80 p-0.5 border border-jp-gray-300/70 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode("write")}
              title="Mode Tulis Kode Markdown"
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded transition cursor-pointer font-sans",
                viewMode === "write"
                  ? "bg-white text-jp-blue-900 shadow-2xs"
                  : "text-jp-gray-600 hover:text-jp-ink"
              )}
            >
              <Edit3 className="h-3 w-3" />
              <span>Tulis</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("preview")}
              title="Lihat Tampilan Visual & Tabel Terformat"
              className={cn(
                "flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded transition cursor-pointer font-sans",
                viewMode === "preview"
                  ? "bg-white text-jp-blue-900 shadow-2xs"
                  : "text-jp-gray-600 hover:text-jp-ink"
              )}
            >
              <Eye className="h-3 w-3" />
              <span>Visual</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("split")}
              title="Mode Berdampingan (Editor di Kiri, Visual di Kanan)"
              className={cn(
                "hidden sm:flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded transition cursor-pointer font-sans",
                viewMode === "split"
                  ? "bg-white text-jp-blue-900 shadow-2xs"
                  : "text-jp-gray-600 hover:text-jp-ink"
              )}
            >
              <Columns className="h-3 w-3" />
              <span>Split</span>
            </button>
          </div>

          {/* CHEAT SHEET TOGGLE */}
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
            <span className="hidden lg:inline">Panduan</span>
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
              <p>~~coret~~ → <del>coret</del></p>
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

      {/* EDITOR & LIVE RENDERED VIEW AREA */}
      {viewMode === "write" && (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={rows}
          placeholder={placeholder}
          className="w-full p-4 text-xs md:text-sm font-prose text-jp-ink placeholder:text-jp-gray-400 focus:outline-none resize-y leading-relaxed bg-white"
        />
      )}

      {viewMode === "preview" && (
        <div className="w-full p-4 md:p-6 min-h-[180px] bg-white overflow-y-auto max-h-[500px]">
          {value.trim() ? (
            <RichContentRenderer content={value} />
          ) : (
            <div className="py-8 text-center text-xs text-jp-gray-400 font-prose italic">
              Belum ada teks yang ditulis. Beralih ke tab <strong>Tulis</strong> untuk mulai menyusun naskah.
            </div>
          )}
        </div>
      )}

      {viewMode === "split" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-jp-gray-200 bg-white">
          <div className="flex flex-col">
            <div className="bg-jp-paper/60 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-jp-gray-500 border-b border-jp-gray-200">
              Editor Markdown
            </div>
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={rows}
              placeholder={placeholder}
              className="w-full p-4 text-xs md:text-sm font-prose text-jp-ink placeholder:text-jp-gray-400 focus:outline-none resize-y leading-relaxed flex-1"
            />
          </div>

          <div className="flex flex-col bg-jp-paper/20">
            <div className="bg-jp-blue-50/60 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-jp-blue-800 border-b border-jp-blue-100 flex items-center justify-between">
              <span>Hasil Visual Langsung</span>
              <span className="text-[10px] text-green-700 font-sans font-semibold">● Sinkron Real-time</span>
            </div>
            <div className="p-4 md:p-5 overflow-y-auto max-h-[420px] flex-1">
              {value.trim() ? (
                <RichContentRenderer content={value} />
              ) : (
                <div className="py-8 text-center text-xs text-jp-gray-400 font-prose italic">
                  Pratinjau visual akan tampil secara langsung saat Anda mengetik...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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

        <span className="text-jp-gray-400 hidden sm:inline">
          Mode {viewMode === "write" ? "Tulis Markdown" : viewMode === "preview" ? "Visual Rendered" : "Split Live Preview"} Aktif
        </span>
      </div>
    </div>
  );
}

