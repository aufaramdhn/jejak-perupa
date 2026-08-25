import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureGuard } from "@/components/atoms/FeatureGuard";
import * as featureFlagsModule from "@/lib/featureFlagsContext";

describe("FeatureGuard Component", () => {
  it("renders children when feature flag is enabled", () => {
    vi.spyOn(featureFlagsModule, "useFeatureFlags").mockReturnValue({
      flags: {} as any,
      activePreset: "v2.0.0",
      isFeatureEnabled: vi.fn().mockReturnValue(true),
      setFeatureEnabled: vi.fn(),
      applyPreset: vi.fn(),
      resetToDefaultPreset: vi.fn(),
      enabledCount: 20,
      totalCount: 20,
    });

    render(
      <FeatureGuard flag="progress_belajar" fallback={<div>Coming Soon Fallback</div>}>
        <div data-testid="live-content">Konten Kurikulum Belajar Aktif</div>
      </FeatureGuard>
    );

    expect(screen.getByTestId("live-content")).toBeInTheDocument();
    expect(screen.queryByText("Coming Soon Fallback")).not.toBeInTheDocument();
  });

  it("renders fallback when feature flag is disabled", () => {
    vi.spyOn(featureFlagsModule, "useFeatureFlags").mockReturnValue({
      flags: {} as any,
      activePreset: "v1.0.0",
      isFeatureEnabled: vi.fn().mockReturnValue(false),
      setFeatureEnabled: vi.fn(),
      applyPreset: vi.fn(),
      resetToDefaultPreset: vi.fn(),
      enabledCount: 6,
      totalCount: 20,
    });

    render(
      <FeatureGuard flag="jejak_seni_daerah" fallback={<div data-testid="coming-soon">Fitur Sedang Disiapkan</div>}>
        <div>Konten Peta Geospasial</div>
      </FeatureGuard>
    );

    expect(screen.getByTestId("coming-soon")).toBeInTheDocument();
    expect(screen.queryByText("Konten Peta Geospasial")).not.toBeInTheDocument();
  });
});
