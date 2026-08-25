import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "@/components/atoms/feedback/Skeleton";
import { ArticleCardSkeleton } from "@/components/molecules/article/ArticleCardSkeleton";
import { ArtworkCardSkeleton } from "@/components/molecules/artwork/ArtworkCardSkeleton";
import { ArtistCardSkeleton } from "@/components/molecules/artwork/ArtistCardSkeleton";
import { GlossaryCardSkeleton } from "@/components/molecules/exploration/GlossaryCardSkeleton";
import { EventCardSkeleton } from "@/components/molecules/exploration/EventCardSkeleton";
import { CommunityCardSkeleton } from "@/components/molecules/exploration/CommunityCardSkeleton";
import { PeruChanTipSkeleton } from "@/components/molecules/peruchan/PeruChanTipSkeleton";
import { RichEditorSkeleton } from "@/components/molecules/editor/RichEditorSkeleton";
import { AdminTableSkeleton } from "@/components/organisms/admin/AdminTableSkeleton";
import { AdminChartSkeleton } from "@/components/organisms/admin/AdminChartSkeleton";
import { CurationCardSkeleton } from "@/components/organisms/admin/CurationCardSkeleton";
import { MetricCardSkeleton } from "@/components/organisms/admin/MetricCardSkeleton";

describe("Skeleton Atom Component", () => {
  it("renders with default rectangle variant and pulse animation", () => {
    const { container } = render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass("animate-pulse");
    expect(el).toHaveClass("rounded-none");
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("renders circle variant correctly", () => {
    render(<Skeleton data-testid="skeleton-circle" variant="circle" />);
    const el = screen.getByTestId("skeleton-circle");
    expect(el).toHaveClass("rounded-full");
  });

  it("renders text variant correctly", () => {
    render(<Skeleton data-testid="skeleton-text" variant="text" />);
    const el = screen.getByTestId("skeleton-text");
    expect(el).toHaveClass("h-4");
  });

  it("supports disabling animation", () => {
    render(<Skeleton data-testid="skeleton-static" animate={false} />);
    const el = screen.getByTestId("skeleton-static");
    expect(el).not.toHaveClass("animate-pulse");
  });
});

describe("Skeleton Molecules", () => {
  it("renders ArticleCardSkeleton with aria-label", () => {
    render(<ArticleCardSkeleton />);
    expect(screen.getByLabelText("Memuat naskah artikel")).toBeInTheDocument();
  });

  it("renders ArtworkCardSkeleton with aria-label", () => {
    render(<ArtworkCardSkeleton />);
    expect(screen.getByLabelText("Memuat kartu karya seni")).toBeInTheDocument();
  });

  it("renders ArtistCardSkeleton with aria-label", () => {
    render(<ArtistCardSkeleton />);
    expect(screen.getByLabelText("Memuat profil seniman")).toBeInTheDocument();
  });

  it("renders GlossaryCardSkeleton with aria-label", () => {
    render(<GlossaryCardSkeleton />);
    expect(screen.getByLabelText("Memuat istilah kamus")).toBeInTheDocument();
  });

  it("renders EventCardSkeleton with aria-label", () => {
    render(<EventCardSkeleton />);
    expect(screen.getByLabelText("Memuat agenda acara seni")).toBeInTheDocument();
  });

  it("renders CommunityCardSkeleton with aria-label", () => {
    render(<CommunityCardSkeleton />);
    expect(screen.getByLabelText("Memuat kartu komunitas seni")).toBeInTheDocument();
  });

  it("renders PeruChanTipSkeleton with aria-label", () => {
    render(<PeruChanTipSkeleton />);
    expect(screen.getByLabelText("Memuat tips Peru-Chan")).toBeInTheDocument();
  });

  it("renders RichEditorSkeleton with aria-label", () => {
    render(<RichEditorSkeleton />);
    expect(screen.getByLabelText("Memuat editor teks")).toBeInTheDocument();
  });
});

describe("Granular Admin Skeletons", () => {
  it("renders AdminTableSkeleton with custom rows and aria-label", () => {
    render(<AdminTableSkeleton rows={3} columns={4} />);
    expect(screen.getByLabelText("Memuat tabel data")).toBeInTheDocument();
  });

  it("renders AdminChartSkeleton with aria-label", () => {
    render(<AdminChartSkeleton />);
    expect(screen.getByLabelText("Memuat grafik analitik")).toBeInTheDocument();
  });

  it("renders CurationCardSkeleton with custom count", () => {
    const { container } = render(<CurationCardSkeleton count={3} />);
    expect(container.querySelectorAll(".rounded-xl").length).toBe(3);
  });

  it("renders MetricCardSkeleton with correct count", () => {
    const { container } = render(<MetricCardSkeleton count={4} />);
    expect(container.querySelectorAll(".rounded-xl").length).toBe(4);
  });
});
