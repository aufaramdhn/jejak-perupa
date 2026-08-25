import { describe, it, expect } from "vitest";
import {
  featureFlagDefinitions,
  releasePresets,
} from "@/lib/data/featureFlags";

describe("FeatureFlags & Release Preset Engine", () => {
  it("defines all 20 feature flags with proper meta attributes", () => {
    expect(featureFlagDefinitions.length).toBe(20);

    featureFlagDefinitions.forEach((flag) => {
      expect(flag.key).toBeDefined();
      expect(flag.label).toBeDefined();
      expect(flag.shortDescription).toBeDefined();
      expect(flag.group).toBeDefined();
      expect(flag.colorVariant).toBeDefined();
    });
  });

  it("contains 4 standard release presets", () => {
    expect(releasePresets.length).toBe(4);

    const presetIds = releasePresets.map((p) => p.id);
    expect(presetIds).toEqual(["v1.0.0", "v1.1.0", "v1.2.0", "v2.0.0"]);
  });

  it("activates all flags when preset v2.0.0 is selected", () => {
    const v2Preset = releasePresets.find((p) => p.id === "v2.0.0");
    expect(v2Preset).toBeDefined();
    expect(v2Preset?.enabledFlags.length).toBe(20);
  });

  it("activates core and MVP flags when preset v1.0.0 is selected", () => {
    const v1Preset = releasePresets.find((p) => p.id === "v1.0.0");
    expect(v1Preset).toBeDefined();
    expect(v1Preset?.enabledFlags).toContain("core_platform");
    expect(v1Preset?.enabledFlags).not.toContain("jejak_seni_daerah");
  });
});
