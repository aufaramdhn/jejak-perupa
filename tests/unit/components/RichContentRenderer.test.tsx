import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RichContentRenderer } from "@/components/molecules/article/RichContentRenderer";

describe("RichContentRenderer", () => {
  it("renders plain paragraph correctly", () => {
    render(<RichContentRenderer content="Ini adalah uraian teks seni rupa biasa." />);
    expect(screen.getByText("Ini adalah uraian teks seni rupa biasa.")).toBeDefined();
  });

  it("renders bold and italic formatting correctly", () => {
    const { container } = render(
      <RichContentRenderer content="Teks ini memiliki format **tebal utama** dan kata *miring estetika*." />
    );
    const strongEl = container.querySelector("strong");
    const emEl = container.querySelector("em");

    expect(strongEl).not.toBeNull();
    expect(strongEl?.textContent).toBe("tebal utama");
    expect(emEl).not.toBeNull();
    expect(emEl?.textContent).toBe("miring estetika");
  });

  it("renders Markdown headings (## and ###)", () => {
    render(
      <RichContentRenderer content={"## Bab Utama Sejarah\n\n### Subjudul Kritik Seni"} />
    );
    const h2 = screen.getByRole("heading", { level: 2 });
    const h3 = screen.getByRole("heading", { level: 3 });

    expect(h2.textContent).toBe("Bab Utama Sejarah");
    expect(h3.textContent).toBe("Subjudul Kritik Seni");
  });

  it("renders blockquotes correctly", () => {
    const { container } = render(
      <RichContentRenderer content="> Seni adalah manifestasi jiwa yang menemukan bentuknya." />
    );
    const blockquote = container.querySelector("blockquote");
    expect(blockquote).not.toBeNull();
    expect(blockquote?.textContent).toContain("Seni adalah manifestasi jiwa");
  });

  it("renders Markdown tables correctly", () => {
    const markdownTable = [
      "| Unsur Rupa | Karakteristik Visual |",
      "|---|---|",
      "| Garis | Dinamis & Ekspresif |",
      "| Warna | Kontras Primer |",
    ].join("\n");

    const { container } = render(<RichContentRenderer content={markdownTable} />);
    const table = container.querySelector("table");
    const ths = container.querySelectorAll("th");
    const tds = container.querySelectorAll("td");

    expect(table).not.toBeNull();
    expect(ths.length).toBe(2);
    expect(ths[0].textContent).toBe("Unsur Rupa");
    expect(ths[1].textContent).toBe("Karakteristik Visual");
    expect(tds.length).toBe(4);
    expect(tds[0].textContent).toBe("Garis");
    expect(tds[1].textContent).toBe("Dinamis & Ekspresif");
  });

  it("renders list items properly", () => {
    const markdownList = ["- Sapuan kuas impasto", "- Teknik cetak saring", "- Pembakaran glasir"].join("\n");
    const { container } = render(<RichContentRenderer content={markdownList} />);
    const listItems = container.querySelectorAll("li");

    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent).toBe("Sapuan kuas impasto");
  });

  it("renders bold even when input contains leftover HTML p tags", () => {
    const { container } = render(
      <RichContentRenderer content="**<p>Tuliskan pengantar wacana atau pendahuluan topik di sini...</p>asdsadwasdawasdw**" />
    );
    const strongEl = container.querySelector("strong");
    expect(strongEl).not.toBeNull();
    expect(strongEl?.textContent).toBe(
      "Tuliskan pengantar wacana atau pendahuluan topik di sini...asdsadwasdawasdw"
    );
  });

  it("renders adjacent formatting and tables with colons properly", () => {
    const raw = [
      "**teks tebal***teks miring*~~teks dicoret~~`istilah teknik / glosarium`",
      "",
      "| Unsur Rupa | Karakteristik Visual | Analisis Estetika |",
      "|:---|:---|:---|",
      "| Garis | Dinamis & Ekspresif | Memberikan ilusi gerak |",
      "| Warna | Palet Kontras Primer | Menegaskan ketegangan visual |",
    ].join("\n");

    const { container } = render(<RichContentRenderer content={raw} />);

    expect(container.querySelector("strong")?.textContent).toBe("teks tebal");
    expect(container.querySelector("em")?.textContent).toBe("teks miring");
    expect(container.querySelector("del")?.textContent).toBe("teks dicoret");
    expect(container.querySelector("code")?.textContent).toBe("istilah teknik / glosarium");

    const table = container.querySelector("table");
    expect(table).not.toBeNull();
    expect(container.querySelectorAll("th").length).toBe(3);
    expect(container.querySelectorAll("td").length).toBe(6);
  });

  it("renders single-line joined tables with trailing text properly", () => {
    const raw =
      "**teks tebal**Tuliskan pengantar wacana...\n\n| Unsur Rupa | Karakteristik Visual | Analisis Estetika ||:---|:---|:---|| Garis | Dinamis & Ekspresif | Memberikan ilusi gerak || Warna | Palet Kontras Primer | Menegaskan ketegangan visual |* teks sisa";

    const { container } = render(<RichContentRenderer content={raw} />);

    expect(container.querySelector("strong")?.textContent).toBe("teks tebal");
    const table = container.querySelector("table");
    expect(table).not.toBeNull();
    expect(container.querySelectorAll("th").length).toBe(3);
    expect(container.querySelectorAll("td").length).toBe(6);
  });

  it("renders tables that immediately follow paragraph text on the same line", () => {
    const raw =
      "Tabel berikut merangkum karakteristik medium: | Peminatan Studio | Karakteristik Medium | Bahasa Rupa Dominan | Fokus Eksplorasi ||:---|:---|:---|:---|| **Studio Seni Lukis** | Cat minyak | Warna | Eksplorasi 2D || **Studio Seni Patung** | Logam | Volume | Instalasi 3D |";

    const { container } = render(<RichContentRenderer content={raw} />);

    // Harus ada paragraf pengantar
    const p = container.querySelector("p");
    expect(p?.textContent).toContain("Tabel berikut merangkum karakteristik medium:");

    // Harus ada tabel yang terurai dengan 4 kolom dan 2 baris data
    const table = container.querySelector("table");
    expect(table).not.toBeNull();
    expect(container.querySelectorAll("th").length).toBe(4);
    expect(container.querySelectorAll("td").length).toBe(8);

    // Sel tabel harus memformat teks tebal
    const strong = container.querySelector("strong");
    expect(strong?.textContent).toBe("Studio Seni Lukis");
  });

  it("renders HTML grid blocks and mixed markdown properly", () => {
    const raw = [
      "## Peminatan Keahlian",
      '<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6"><div class="card-1">Studio Lukis</div><div class="card-2">Studio Patung</div></div>',
      "Penjelasan lanjutan mengenai studio...",
    ].join("\n\n");

    const { container } = render(<RichContentRenderer content={raw} />);

    const h2 = container.querySelector("h2");
    expect(h2?.textContent).toBe("Peminatan Keahlian");

    const grid = container.querySelector(".grid");
    expect(grid).not.toBeNull();
    expect(grid?.querySelector(".card-1")?.textContent).toBe("Studio Lukis");
  });

  it("renders nested multi-line HTML studio cards without leaking </div> as raw text", () => {
    const raw = [
      "Karya ini kini ditetapkan sebagai Cagar Budaya.",
      '<div class="my-5 grid gap-3 sm:grid-cols-2">\n<div class="rounded-xl border border-jp-gray-200 bg-white p-4 shadow-xs space-y-1">\n<div class="font-bold text-jp-ink text-sm">Studio / Peminatan 1</div>\n<div class="text-xs text-jp-gray-600">[Eksplorasi media 1...]</div>\n</div>\n<div class="rounded-xl border border-jp-gray-200 bg-white p-4 shadow-xs space-y-1">\n<div class="font-bold text-jp-ink text-sm">Studio / Peminatan 2</div>\n<div class="text-xs text-jp-gray-600">[Eksplorasi media 2...]</div>\n</div>\n</div>',
      "Penjelasan lanjutan setelah kartu...",
    ].join("\n\n");

    const { container } = render(<RichContentRenderer content={raw} />);

    // Memastikan tidak ada teks mentah </div> atau </p> di halaman
    expect(container.textContent).not.toContain("</div>");
    expect(container.textContent).not.toContain("</p>");

    // Memastikan kedua kartu ter-render di dalam grid
    const grid = container.querySelector(".grid");
    expect(grid).not.toBeNull();
    expect(container.textContent).toContain("Studio / Peminatan 1");
    expect(container.textContent).toContain("Studio / Peminatan 2");
  });

  it("renders human-readable custom syntax :::kartu-pilihan properly", () => {
    const raw = [
      "Pengantar bab studio...",
      ":::kartu-pilihan",
      "[kartu]",
      "judul: Studio **Seni Lukis**",
      "deskripsi: Eksplorasi kanvas dan teknik `impasto`.",
      "[/kartu]",
      "[kartu]",
      "judul: Studio **Seni Patung**",
      "deskripsi: Eksplorasi media kayu dan logam.",
      "[/kartu]",
      ":::",
      "Penutup materi studio.",
    ].join("\n");

    const { container } = render(<RichContentRenderer content={raw} />);

    expect(container.textContent).toContain("Studio Seni Lukis");
    expect(container.textContent).toContain("Studio Seni Patung");
    expect(container.querySelector("strong")?.textContent).toBe("Seni Lukis");
    expect(container.querySelector("code")?.textContent).toBe("impasto");
    expect(container.textContent).not.toContain(":::");
    expect(container.textContent).not.toContain("[kartu]");
  });

  it("renders human-readable custom syntax :::tabel properly", () => {
    const raw = [
      ":::tabel",
      "header: Aspek Komparasi | Studio Lukis | Studio Patung",
      "baris: Medium Primer | Kanvas & Cat Minyak | Logam & Batu",
      "baris: Dimensi Rupa | 2 Dimensi | 3 Dimensi",
      ":::",
    ].join("\n");

    const { container } = render(<RichContentRenderer content={raw} />);

    const table = container.querySelector("table");
    expect(table).not.toBeNull();
    expect(container.querySelectorAll("th").length).toBe(3);
    expect(container.querySelectorAll("td").length).toBe(6);
    expect(container.textContent).toContain("Medium Primer");
  });

  it("renders human-readable custom syntax :::istilah and :::kutipan properly", () => {
    const raw = [
      ":::istilah",
      "istilah: Chiaroscuro",
      "penjelasan: Teknik kontras pencahayaan dramatis.",
      ":::",
      "",
      ":::kutipan",
      "kutipan: Jiwa ketok adalah cerminan batin seniman.",
      "tokoh: S. Sudjojono",
      ":::",
    ].join("\n");

    const { container } = render(<RichContentRenderer content={raw} />);

    expect(container.textContent).toContain("Istilah Kunci : Chiaroscuro");
    expect(container.textContent).toContain("Teknik kontras pencahayaan dramatis.");
    expect(container.textContent).toContain("Jiwa ketok adalah cerminan batin seniman.");
    expect(container.textContent).toContain("S. Sudjojono");
  });

  it("renders empty content gracefully", () => {
    const { container } = render(<RichContentRenderer content="" />);
    expect(container.firstChild).toBeNull();
  });
});
