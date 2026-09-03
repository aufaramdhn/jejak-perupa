"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface RichContentRendererProps {
  content: string;
  className?: string;
}

/**
 * RichContentRenderer
 * Komponen Molekul untuk menerjemahkan sintaks Markdown & HTML kaya menjadi elemen visual yang estetis dan responsif:
 * - Format Teks: Bold (**teks**), Italic (*teks*), Strikethrough (~~teks~~), Monospace (`kode`)
 * - Subjudul: Heading 2 (## Judul), Heading 3 (### Subjudul)
 * - Kutipan: Blockquote (> kutipan)
 * - Tabel Editorial: Markdown Table (| Kolom 1 | Kolom 2 |)
 * - Kartu Grid 2 Kolom: Box istilah / peminatan studio
 * - Daftar berbutir dan bernomor (- item, 1. item)
 */
export function RichContentRenderer({
  content,
  className,
}: RichContentRendererProps) {
  if (!content || content.trim() === "") {
    return null;
  }

  // Jika konten berupa HTML yang sudah memiliki tag kontainer khusus (misal grid kartu 2 kolom atau table HTML)
  // dan tidak mengandung markdown mentah yang belum diparsing, kita render secara aman.
  const containsRawMarkdown =
    content.includes("###") ||
    content.includes("##") ||
    content.includes("**") ||
    content.includes("|---") ||
    (content.startsWith(">") || content.includes("\n>"));

  if (!containsRawMarkdown && (content.includes("<div") || content.includes("<table") || content.includes("<blockquote"))) {
    return (
      <div
        className={cn("rich-content prose-jp font-prose space-y-4 text-jp-gray-800 leading-relaxed", className)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Parse blok konten Markdown menjadi potongan elemen yang terstruktur
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className={cn("rich-content space-y-5 font-prose text-jp-gray-800 leading-relaxed", className)}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={idx}
                className="font-heading text-2xl md:text-3xl font-bold text-jp-ink tracking-tight pt-4 pb-1 border-b border-jp-gray-200"
              >
                {renderInlineFormatting(block.content)}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={idx}
                className="font-heading text-lg md:text-xl font-bold text-jp-blue-900 tracking-tight pt-2"
              >
                {renderInlineFormatting(block.content)}
              </h3>
            );
          case "h4":
            return (
              <h4
                key={idx}
                className="font-heading text-base md:text-lg font-bold text-jp-ink pt-1"
              >
                {renderInlineFormatting(block.content)}
              </h4>
            );
          case "card-grid":
            return (
              <div key={idx} className="my-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
                {block.cards?.map((card, cIdx) => (
                  <div
                    key={cIdx}
                    className="group rounded-2xl border border-jp-gray-300 bg-white p-5 shadow-2xs hover:shadow-sm hover:border-jp-blue-400 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <h4 className="font-heading font-bold text-jp-ink text-base md:text-lg group-hover:text-jp-blue-900 transition-colors">
                        {renderInlineFormatting(card.title)}
                      </h4>
                      <div className="text-xs md:text-sm text-jp-gray-600 font-sans leading-relaxed">
                        {renderInlineFormatting(card.description)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          case "term-box":
            return (
              <div
                key={idx}
                className="my-5 rounded-2xl border border-jp-blue-200 bg-jp-blue-50/70 p-4 md:p-5 shadow-2xs space-y-1.5"
              >
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-jp-blue-900">
                  <span className="inline-block h-2 w-2 rounded-full bg-jp-blue-600" />
                  Istilah Kunci : {block.termData?.term ? renderInlineFormatting(block.termData.term) : "Glosarium"}
                </div>
                <div className="text-xs md:text-sm text-jp-gray-700 font-sans leading-relaxed">
                  {block.termData?.explanation ? renderInlineFormatting(block.termData.explanation) : ""}
                </div>
              </div>
            );
          case "custom-quote":
            return (
              <blockquote
                key={idx}
                className="relative my-5 rounded-r-2xl border-l-4 border-jp-blue-900 bg-jp-paper p-4 md:p-6 italic text-jp-gray-800 font-heading text-base md:text-lg leading-relaxed shadow-2xs"
              >
                <div className="font-sans text-[11px] font-bold uppercase tracking-wider text-jp-blue-700 not-italic mb-2">
                  Kutipan Wacana
                </div>
                <div className="not-italic font-heading italic text-jp-ink">
                  &ldquo;{renderInlineFormatting(block.quoteData?.quote || block.content)}&rdquo;
                </div>
                {block.quoteData?.author && (
                  <div className="mt-2 text-right font-sans text-xs font-bold text-jp-gray-600 not-italic">
                    - {renderInlineFormatting(block.quoteData.author)}
                  </div>
                )}
              </blockquote>
            );
          case "blockquote":
            return (
              <blockquote
                key={idx}
                className="relative my-4 rounded-r-2xl border-l-4 border-jp-blue-900 bg-jp-paper p-4 md:p-5 italic text-jp-gray-700 font-heading text-base md:text-lg leading-relaxed shadow-2xs"
              >
                <div className="font-sans text-[10px] font-bold uppercase tracking-wider text-jp-blue-700 not-italic mb-1">
                  Kutipan Wacana
                </div>
                {renderInlineFormatting(block.content)}
              </blockquote>
            );
          case "table":
            return (
              <div key={idx} className="my-5 overflow-x-auto rounded-xl border border-jp-gray-300 bg-white shadow-2xs">
                <table className="w-full text-left border-collapse font-sans text-xs md:text-sm">
                  {block.tableHeaders && block.tableHeaders.length > 0 && (
                    <thead>
                      <tr className="border-b border-jp-gray-300 bg-jp-paper/90 font-mono text-[11px] font-bold uppercase tracking-wider text-jp-blue-900">
                        {block.tableHeaders.map((th, thIdx) => (
                          <th key={thIdx} className="py-3 px-4">
                            {renderInlineFormatting(th)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody className="divide-y divide-jp-gray-200">
                    {block.tableRows?.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-jp-blue-50/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-3 px-4 text-jp-gray-700">
                            {renderInlineFormatting(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "html-block":
            return (
              <div
                key={idx}
                className="my-4 font-sans"
                dangerouslySetInnerHTML={{ __html: block.content }}
              />
            );
          case "list":
            return (
              <ul key={idx} className="my-3 list-disc space-y-1.5 pl-6 font-prose text-sm md:text-base text-jp-gray-700">
                {block.listItems?.map((item, lIdx) => (
                  <li key={lIdx}>{renderInlineFormatting(item)}</li>
                ))}
              </ul>
            );
          case "paragraph":
          default:
            return (
              <p key={idx} className="text-base md:text-lg leading-relaxed text-jp-gray-700">
                {renderInlineFormatting(block.content)}
              </p>
            );
        }
      })}
    </div>
  );
}

// Interface blok Markdown
interface ContentBlock {
  type:
    | "paragraph"
    | "h2"
    | "h3"
    | "h4"
    | "blockquote"
    | "table"
    | "html-block"
    | "list"
    | "card-grid"
    | "term-box"
    | "custom-quote";
  content: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  listItems?: string[];
  cards?: { title: string; description: string }[];
  termData?: { term: string; explanation: string };
  quoteData?: { quote: string; author?: string };
}

/**
 * Parser Baris Markdown ke Blok Data Terstruktur
 */
function parseMarkdownBlocks(rawText: string): ContentBlock[] {
  if (!rawText) return [];

  // 1. Normalisasi tag paragraf HTML sisa editor ke baris Markdown bersih
  let normalizedText = rawText
    .replace(/<\/p>\s*<p>/gi, "\n\n")
    .replace(/<\/?p>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n");

  // Pisahkan heading markdown atau garis pembatas yang menempel setelah teks biasa
  normalizedText = normalizedText
    .replace(/([^\r\n])\s*(#{2,6}\s+[^\r\n]+)/g, "$1\n\n$2")
    .replace(/([^\r\n])\s*(---|\*\*\*|___)\s*$/gm, "$1\n\n$2");

  // 2. Normalisasi tabel yang diawali teks non-tabel pada baris yang sama (misal: "Teks pengantar: | Kolom 1 | Kolom 2 |")
  normalizedText = normalizedText.replace(/^(?!(?:header|baris|row|kolom):)([^|\r\n]+?)[ \t]*(\|[ \t]*[A-Za-z0-9_*`~<])/gim, "$1\n\n$2");

  // 3. Pisahkan baris tabel yang bersambung langsung (||) atau bersambung spasi (| |)
  normalizedText = normalizedText
    .replace(/\|[ \t]*\|/g, "|\n|")
    .replace(/(\|)[ \t]+(\|)/g, "$1\n$2");

  // 4. Pisahkan teks non-tabel yang menempel di ujung baris tabel (| Kolom |teks sisa -> | Kolom |\n\nteks sisa)
  normalizedText = normalizedText.replace(/^(\|[^\r\n]*\|)[ \t]*([^|\r\n]+)$/gm, "$1\n\n$2");

  const blocks: ContentBlock[] = [];
  const lines = normalizedText.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Lewati baris kosong
    if (!trimmed) {
      i++;
      continue;
    }

    // 2. Blok HTML mentah kompleks (misal <div ...>...</div> atau <table>...</table> atau <blockquote>...</blockquote>)
    if (
      (trimmed.startsWith("<div") && !trimmed.startsWith("<div class=\"inline")) ||
      trimmed.startsWith("<table") ||
      (trimmed.startsWith("<blockquote") && !trimmed.startsWith(">"))
    ) {
      const tagName = trimmed.startsWith("<div")
        ? "div"
        : trimmed.startsWith("<table")
        ? "table"
        : "blockquote";

      const openRegex = new RegExp(`<${tagName}\\b`, "gi");
      const closeRegex = new RegExp(`</${tagName}>`, "gi");

      let htmlContent = line;
      let openCount = (line.match(openRegex) || []).length;
      let closeCount = (line.match(closeRegex) || []).length;

      while (i + 1 < lines.length && openCount > closeCount) {
        i++;
        htmlContent += "\n" + lines[i];
        openCount += (lines[i].match(openRegex) || []).length;
        closeCount += (lines[i].match(closeRegex) || []).length;
      }

      blocks.push({ type: "html-block", content: htmlContent });
      i++;
      continue;
    }

    // 2A. Blok Kartu Pilihan (:::kartu-pilihan ... ::: atau :::kartu ... :::)
    if (trimmed.startsWith(":::kartu-pilihan") || trimmed.startsWith(":::kartu") || trimmed.startsWith(":::cards")) {
      const cardLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        cardLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith(":::")) {
        i++;
      }

      const cardsText = cardLines.join("\n");
      const cardChunks = cardsText.split(/\[\/?kartu\]|\[\/?card\]/i).filter((c) => c.trim().length > 0);
      const parsedCards: { title: string; description: string }[] = [];

      for (const chunk of cardChunks) {
        const titleMatch = chunk.match(/(?:judul|title):\s*([^\r\n]+)/i);
        const descMatch = chunk.match(/(?:deskripsi|description|isi):\s*([\s\S]+)/i);

        const title = titleMatch ? titleMatch[1].trim() : "";
        let description = descMatch ? descMatch[1].trim() : "";

        if (!descMatch && titleMatch) {
          description = chunk.replace(/(?:judul|title):\s*[^\r\n]+/i, "").trim();
        }

        if (title || description) {
          parsedCards.push({
            title: title || "Peminatan / Pilihan",
            description: description || "Uraian materi...",
          });
        }
      }

      if (parsedCards.length > 0) {
        blocks.push({
          type: "card-grid",
          content: "",
          cards: parsedCards,
        });
        continue;
      }
    }

    // 2B. Blok Tabel Bersih (:::tabel ... ::: atau :::table ... :::)
    if (trimmed.startsWith(":::tabel") || trimmed.startsWith(":::table")) {
      const tableBlockLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        tableBlockLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith(":::")) {
        i++;
      }

      let headers: string[] = [];
      const contentRows: string[][] = [];

      for (const tLine of tableBlockLines) {
        const lTrim = tLine.trim();
        if (!lTrim) continue;

        if (lTrim.toLowerCase().startsWith("header:")) {
          const rawHeader = lTrim.replace(/^header:\s*/i, "");
          headers = rawHeader.split("|").map((h) => h.trim());
        } else if (lTrim.toLowerCase().startsWith("baris:") || lTrim.toLowerCase().startsWith("row:")) {
          const rawRow = lTrim.replace(/^(?:baris|row):\s*/i, "");
          const cells = rawRow.split("|").map((c) => c.trim());
          contentRows.push(cells);
        } else if (lTrim.startsWith("|") && lTrim.endsWith("|")) {
          const cells = lTrim.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
          if (headers.length === 0) {
            headers = cells;
          } else if (!cells.some((c) => c.includes("---"))) {
            contentRows.push(cells);
          }
        }
      }

      if (headers.length > 0 || contentRows.length > 0) {
        blocks.push({
          type: "table",
          content: "",
          tableHeaders: headers,
          tableRows: contentRows,
        });
        continue;
      }
    }

    // 2C. Blok Kotak Istilah (:::istilah ... ::: atau :::kotak-istilah ... :::)
    if (trimmed.startsWith(":::istilah") || trimmed.startsWith(":::kotak-istilah") || trimmed.startsWith(":::term")) {
      const termLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        termLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith(":::")) {
        i++;
      }

      const termText = termLines.join("\n");
      const termMatch = termText.match(/(?:istilah|term|kunci):\s*([^\r\n]+)/i);
      const explMatch = termText.match(/(?:penjelasan|definisi|arti|deskripsi):\s*([\s\S]+)/i);

      const term = termMatch ? termMatch[1].trim() : "Istilah Kunci";
      const explanation = explMatch
        ? explMatch[1].trim()
        : termText.replace(/(?:istilah|term|kunci):\s*[^\r\n]+/i, "").trim();

      blocks.push({
        type: "term-box",
        content: "",
        termData: {
          term,
          explanation: explanation || "Penjelasan konsep...",
        },
      });
      continue;
    }

    // 2D. Blok Kutipan Wacana (:::kutipan ... ::: atau :::quote ... :::)
    if (trimmed.startsWith(":::kutipan") || trimmed.startsWith(":::kutipan-wacana") || trimmed.startsWith(":::quote")) {
      const quoteLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        quoteLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith(":::")) {
        i++;
      }

      const quoteText = quoteLines.join("\n");
      const quoteMatch = quoteText.match(/(?:kutipan|quote|isi):\s*([^\r\n]+)/i);
      const authorMatch = quoteText.match(/(?:tokoh|penulis|author|sumber):\s*([^\r\n]+)/i);

      const quote = quoteMatch ? quoteMatch[1].trim() : quoteText.replace(/(?:tokoh|penulis|author|sumber):\s*[^\r\n]+/i, "").trim();
      const author = authorMatch ? authorMatch[1].trim() : undefined;

      blocks.push({
        type: "custom-quote",
        content: quote,
        quoteData: {
          quote,
          author,
        },
      });
      continue;
    }

    // 3. Tabel Markdown (| Kolom 1 | Kolom 2 |)
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headers = tableLines[0]
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim());

        const isSeparator = tableLines[1].includes("-");
        const rawRows = isSeparator ? tableLines.slice(2) : tableLines.slice(1);

        const contentRows = rawRows.map((rowLine) =>
          rowLine
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim())
        );

        blocks.push({
          type: "table",
          content: "",
          tableHeaders: headers,
          tableRows: contentRows,
        });
        continue;
      }
    }

    // 4. Heading 2 (## Judul)
    if (trimmed.startsWith("## ")) {
      blocks.push({
        type: "h2",
        content: trimmed.replace(/^##\s+/, ""),
      });
      i++;
      continue;
    }

    // 5. Heading 3 (### Subjudul atau **### Subjudul**)
    if (trimmed.startsWith("### ") || (trimmed.startsWith("**### ") && trimmed.endsWith("**"))) {
      const cleanHeading = trimmed
        .replace(/^\*\*/, "")
        .replace(/\*\*$/, "")
        .replace(/^###\s+/, "")
        .trim();
      blocks.push({
        type: "h3",
        content: cleanHeading,
      });
      i++;
      continue;
    }

    // 6. Heading 4 (#### Subjudul)
    if (trimmed.startsWith("#### ")) {
      blocks.push({
        type: "h4",
        content: trimmed.replace(/^####\s+/, ""),
      });
      i++;
      continue;
    }

    // 7. Blockquote (> Kutipan)
    if (trimmed.startsWith(">")) {
      let quoteText = trimmed.replace(/^>\s*/, "");
      i++;
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteText += " " + lines[i].trim().replace(/^>\s*/, "");
        i++;
      }
      blocks.push({
        type: "blockquote",
        content: quoteText,
      });
      continue;
    }

    // 8. List Items (- item atau * item)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        listItems.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({
        type: "list",
        content: "",
        listItems,
      });
      continue;
    }

    // 9. Paragraf biasa (kumpulkan sampai baris kosong atau blok baru)
    let paragraphText = trimmed;
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("|") &&
      !lines[i].trim().startsWith(":::") &&
      !lines[i].trim().startsWith("<div") &&
      !lines[i].trim().startsWith("<table") &&
      !lines[i].trim().startsWith("<blockquote")
    ) {
      paragraphText += " " + lines[i].trim();
      i++;
    }

    // Bersihkan tag penutup HTML liar (stray orphan closing tags seperti </div> atau </p>)
    const sanitizedParagraph = paragraphText
      .replace(/^(\s*<\/(?:div|p|span|blockquote|table|section)>\s*)+$/gi, "")
      .replace(/<\/(?:div|p|span|blockquote|table|section)>/gi, "")
      .trim();

    if (sanitizedParagraph.length > 0) {
      blocks.push({
        type: "paragraph",
        content: sanitizedParagraph,
      });
    }
  }

  return blocks;
}

/**
 * Pembersih teks kutipan kartu (menghilangkan sisa subjudul ## dan potongan tabel)
 */
export function cleanCardExcerpt(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/^##\s+[^\n]+/gm, "")
    .split("|")[0]
    .replace(/^["'“](.*)["'”]$/, "$1")
    .trim();
}

/**
 * Parser Format Inline (Bold, Italic, Strikethrough, Code, Mark, HTML Tag)
 */
export function renderInlineFormatting(text: string): React.ReactNode {
  if (!text) return null;

  // Bersihkan tag pembungkus HTML sisa sebelum tokenisasi
  const cleanText = text
    .replace(/<\/?p>/gi, "")
    .replace(/<br\s*\/?>/gi, " ");

  // Regex pemecah token format Markdown & HTML inline
  // 1. **bold** atau <strong>bold</strong> atau <b>bold</b>
  // 2. *italic* atau <em>italic</em> atau <i>italic</i>
  // 3. ~~strikethrough~~ atau <del>strike</del>
  // 4. `code` atau <code>code</code>
  // 5. <mark>highlight</mark>
  const parts: React.ReactNode[] = [];
  const tokenRegex = /(\*\*[^*]+?\*\*|<strong>[\s\S]+?<\/strong>|<b>[\s\S]+?<\/b>|\*[^*]+?\*|<em>[\s\S]+?<\/em>|<i>[\s\S]+?<\/i>|~~[^~]+?~~|<del>[\s\S]+?<\/del>|`[^`]+?`|<code>[\s\S]+?<\/code>|<mark>[\s\S]+?<\/mark>)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(cleanText)) !== null) {
    const matchIndex = match.index;
    const matchedStr = match[0];

    // Tambahkan teks sebelum match
    if (matchIndex > lastIndex) {
      parts.push(cleanText.substring(lastIndex, matchIndex));
    }

    // Render token
    if (matchedStr.startsWith("**") && matchedStr.endsWith("**")) {
      parts.push(
        <strong key={matchIndex} className="font-bold text-jp-ink">
          {matchedStr.slice(2, -2)}
        </strong>
      );
    } else if (matchedStr.startsWith("<strong>") && matchedStr.endsWith("</strong>")) {
      parts.push(
        <strong key={matchIndex} className="font-bold text-jp-ink">
          {matchedStr.slice(8, -9)}
        </strong>
      );
    } else if (matchedStr.startsWith("<b>") && matchedStr.endsWith("</b>")) {
      parts.push(
        <strong key={matchIndex} className="font-bold text-jp-ink">
          {matchedStr.slice(3, -4)}
        </strong>
      );
    } else if (matchedStr.startsWith("*") && matchedStr.endsWith("*")) {
      parts.push(
        <em key={matchIndex} className="italic">
          {matchedStr.slice(1, -1)}
        </em>
      );
    } else if (matchedStr.startsWith("<em>") && matchedStr.endsWith("</em>")) {
      parts.push(
        <em key={matchIndex} className="italic">
          {matchedStr.slice(4, -5)}
        </em>
      );
    } else if (matchedStr.startsWith("<i>") && matchedStr.endsWith("</i>")) {
      parts.push(
        <em key={matchIndex} className="italic">
          {matchedStr.slice(3, -4)}
        </em>
      );
    } else if (matchedStr.startsWith("~~") && matchedStr.endsWith("~~")) {
      parts.push(
        <del key={matchIndex} className="line-through text-jp-gray-500">
          {matchedStr.slice(2, -2)}
        </del>
      );
    } else if (matchedStr.startsWith("<del>") && matchedStr.endsWith("</del>")) {
      parts.push(
        <del key={matchIndex} className="line-through text-jp-gray-500">
          {matchedStr.slice(5, -6)}
        </del>
      );
    } else if (matchedStr.startsWith("`") && matchedStr.endsWith("`")) {
      parts.push(
        <code
          key={matchIndex}
          className="rounded-md bg-jp-paper px-1.5 py-0.5 font-mono text-xs font-bold text-jp-blue-900 border border-jp-gray-300"
        >
          {matchedStr.slice(1, -1)}
        </code>
      );
    } else if (matchedStr.startsWith("<code>") && matchedStr.endsWith("</code>")) {
      parts.push(
        <code
          key={matchIndex}
          className="rounded-md bg-jp-paper px-1.5 py-0.5 font-mono text-xs font-bold text-jp-blue-900 border border-jp-gray-300"
        >
          {matchedStr.slice(6, -7)}
        </code>
      );
    } else if (matchedStr.startsWith("<mark>") && matchedStr.endsWith("</mark>")) {
      parts.push(
        <mark key={matchIndex} className="rounded bg-jp-lime-100 px-1 text-jp-ink font-medium">
          {matchedStr.slice(6, -7)}
        </mark>
      );
    }

    lastIndex = matchIndex + matchedStr.length;
  }

  // Sisa teks setelah match terakhir
  if (lastIndex < cleanText.length) {
    parts.push(cleanText.substring(lastIndex));
  }

  return <>{parts}</>;
}
