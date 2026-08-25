import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LearningPathCard } from "@/components/molecules/exploration/LearningPathCard";
import { LearningPathData } from "@/lib/data/learningPaths";

const mockPath: LearningPathData = {
  id: "path-test",
  title: "Fondasi Bahasa Rupa dan Dasar Berkarya",
  slug: "fondasi-bahasa-rupa",
  level: "Pemula",
  description: "Kurikulum esensial bagi pemula untuk memahami unsur rupa.",
  iconName: "book-open",
  totalModules: 2,
  totalHours: "1.5 Jam",
  steps: [
    {
      id: "step-1",
      title: "Mengenal Seni Rupa Murni",
      description: "Pengenalan karakter studi",
      articleSlug: "seni-rupa-murni",
      estimatedMinutes: 10,
    },
    {
      id: "step-2",
      title: "Prinsip Garis dan Bidang",
      description: "Fondasi menggambar bentuk",
      articleSlug: "dasar-teknik-cat-air",
      estimatedMinutes: 15,
    },
  ],
};

describe("LearningPathCard Component", () => {
  it("renders path title, level badge, total hours, and step list correctly", () => {
    render(<LearningPathCard path={mockPath} />);

    expect(screen.getByText("Fondasi Bahasa Rupa dan Dasar Berkarya")).toBeInTheDocument();
    expect(screen.getByText("Tingkat Pemula")).toBeInTheDocument();
    expect(screen.getByText("1.5 Jam")).toBeInTheDocument();
    expect(screen.getByText("Mengenal Seni Rupa Murni")).toBeInTheDocument();
    expect(screen.getByText("Prinsip Garis dan Bidang")).toBeInTheDocument();
    expect(screen.getByText("Mulai Belajar")).toBeInTheDocument();
  });
});
