import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { JsonLd } from "@/components/atoms/meta/JsonLd";
import { EditorialTrustBadge } from "@/components/molecules/article/EditorialTrustBadge";

describe("E-E-A-T Schema & Trust Components", () => {
  it("renders ScholarlyArticle JSON-LD structured data with citations", () => {
    const scholarlySchema = {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: "Membedah Romantisisme Kritis Raden Saleh",
      description: "Analisis mendalam bagaimana Raden Saleh memanfaatkan teknik Romantisisme.",
      inLanguage: "id-ID",
      author: {
        "@type": "Person",
        name: "Kurator Redaksi Jejak Perupa",
      },
      citation: [
        "Kraus, Werner. (2012). Raden Saleh: Kehidupan dan Karyanya. KPG.",
        "Carey, Peter. (2014). Takdir: Riwayat Pangeran Diponegoro 1785-1855. Kompas.",
      ],
    };

    const { container } = render(<JsonLd data={scholarlySchema} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).not.toBeNull();
    const json = JSON.parse(script?.textContent || "{}");
    expect(json["@type"]).toBe("ScholarlyArticle");
    expect(json.inLanguage).toBe("id-ID");
    expect(json.citation.length).toBe(2);
    expect(json.author.name).toBe("Kurator Redaksi Jejak Perupa");
  });

  it("renders VisualArtist JSON-LD structured data properly", () => {
    const artistSchema = {
      "@context": "https://schema.org",
      "@type": ["Person", "VisualArtist"],
      name: "Raden Saleh",
      jobTitle: "Maestro Seni Rupa Indonesia",
      knowsAbout: ["Romantisisme", "Lukis Cat Minyak", "Seni Rupa Modern Indonesia"],
    };

    const { container } = render(<JsonLd data={artistSchema} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).not.toBeNull();
    const json = JSON.parse(script?.textContent || "{}");
    expect(json["@type"]).toContain("VisualArtist");
    expect(json.knowsAbout).toContain("Seni Rupa Modern Indonesia");
  });

  it("renders EditorialTrustBadge with verification details", () => {
    const { container } = render(
      <EditorialTrustBadge authorName="Dewan Kurator Jejak Perupa" />
    );

    expect(container.textContent).toContain("Jaminan Kualitas Wacana");
    expect(container.textContent).toContain("Naskah Terkurasi & Terverifikasi Akademik");
    expect(container.textContent).toContain("Standar E-E-A-T Edukasi Seni");
    expect(container.textContent).toContain("Kajian Pustaka Terakreditasi");
    expect(container.textContent).toContain("Dewan Kurator Jejak Perupa");
  });
});
