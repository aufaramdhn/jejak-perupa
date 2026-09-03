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

  it("renders empty content gracefully", () => {
    const { container } = render(<RichContentRenderer content="" />);
    expect(container.firstChild).toBeNull();
  });
});
