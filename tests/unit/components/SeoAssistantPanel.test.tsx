import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SeoAssistantPanel } from "@/components/molecules/editor/SeoAssistantPanel";

describe("SeoAssistantPanel Component", () => {
  it("renders SEO assistant with prompt when no keyword is provided", () => {
    const setFocusKeyword = vi.fn();
    render(
      <SeoAssistantPanel
        title="Sejarah Seni Rupa Indonesia Modern"
        excerpt="Menelusuri perjalanan panjang perkembangan seni rupa di Indonesia."
        category="Sejarah Seni"
        authorName="Kurator Raden"
        chapters={[
          {
            title: "Prolog Gerakan Mooi Indie",
            content: "<p>Lukisan pemandangan alam Hindia Belanda yang serba molek.</p>",
          },
        ]}
        references={[{ citation: "Holt, Claire. (1967). Art in Indonesia." }]}
        focusKeyword=""
        setFocusKeyword={setFocusKeyword}
      />
    );

    expect(screen.getByText("Asisten Optimasi SEO & Kata Kunci")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/lukisan raden saleh/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Ketikkan kata kunci sasaran di atas untuk mengaktifkan audit real-time/i)
    ).toBeInTheDocument();
  });

  it("calculates score and evaluates checklist when focus keyword is entered", () => {
    const setFocusKeyword = vi.fn();
    render(
      <SeoAssistantPanel
        title="Analisis Teknik Lukis Raden Saleh"
        excerpt="Kajian mendalam mengenai sapuan kuas dan teknik lukis Raden Saleh dalam seni lukis modern."
        category="Analisis Karya"
        authorName="Kurator Raden"
        coverImageUrl="https://example.com/raden-saleh.jpg"
        chapters={[
          {
            title: "Sapuan Kuas dan Karakter Raden Saleh",
            content: "<p>Dalam karya Raden Saleh, teknik lukis berpadu dengan romantisisme dramatis Eropa.</p>",
          },
        ]}
        references={[{ citation: "Kusnadi. (1980). Sejarah Seni Rupa Indonesia." }]}
        focusKeyword="raden saleh"
        setFocusKeyword={setFocusKeyword}
      />
    );

    // Score badge is rendered
    expect(screen.getByText(/Skor:/i)).toBeInTheDocument();

    // Check checklist items
    expect(screen.getByText("Kata kunci tercantum dalam Judul Utama (H1)")).toBeInTheDocument();
    expect(screen.getByText("Kata kunci tercantum dalam Ringkasan (Meta Description)")).toBeInTheDocument();
    expect(screen.getByText("Foto Sampul Utama Tersedia")).toBeInTheDocument();
  });

  it("allows switching between Google SERP and Social Share preview tabs", () => {
    const setFocusKeyword = vi.fn();
    render(
      <SeoAssistantPanel
        title="Eksplorasi Warna Tradisional"
        excerpt="Mengenal pigmen warna alami dalam tradisi lukis klasik nusantara."
        category="Teknik Seni"
        authorName="Kurator Siti"
        chapters={[{ title: "Bab 1", content: "<p>Uraian materi...</p>" }]}
        references={[]}
        focusKeyword="warna tradisional"
        setFocusKeyword={setFocusKeyword}
      />
    );

    // Default tab is Google SERP preview
    expect(screen.getByText("Google Search Preview")).toBeInTheDocument();
    expect(screen.getByText("Eksplorasi Warna Tradisional : Jejak Perupa")).toBeInTheDocument();

    // Switch to Social Share Preview
    const socialTabBtn = screen.getByText("Social Share Preview");
    fireEvent.click(socialTabBtn);

    expect(screen.getByText("Thumbnail OpenGraph Artikel")).toBeInTheDocument();
  });
});
