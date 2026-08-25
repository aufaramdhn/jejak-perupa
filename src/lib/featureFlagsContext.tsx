"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  FeatureFlagKey,
  featureFlagDefinitions,
  releasePresets,
  ReleasePresetId,
} from "@/lib/data/featureFlags";

const FLAGS_STORAGE_KEY = "jejak_perupa_release_flags_v1";

interface FeatureFlagsContextType {
  flags: Record<FeatureFlagKey, boolean>;
  activePreset: ReleasePresetId | "custom";
  isFeatureEnabled: (key: FeatureFlagKey) => boolean;
  setFeatureEnabled: (key: FeatureFlagKey, enabled: boolean) => void;
  applyPreset: (presetId: ReleasePresetId) => void;
  resetToDefaultPreset: () => void;
  enabledCount: number;
  totalCount: number;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

// Helper to build flags object from a preset
function buildFlagsFromPreset(presetId: ReleasePresetId): Record<FeatureFlagKey, boolean> {
  const preset = releasePresets.find((p) => p.id === presetId) || releasePresets[0];
  const initialFlags: Record<string, boolean> = {};

  featureFlagDefinitions.forEach((def) => {
    initialFlags[def.key] = def.key === "core_platform" ? true : preset.enabledFlags.includes(def.key);
  });

  return initialFlags as Record<FeatureFlagKey, boolean>;
}

export function FeatureFlagsProvider({ children }: { children: React.ReactNode }) {
  // Default to v1.0.0 (MVP) on initial launch
  const [activePreset, setActivePreset] = useState<ReleasePresetId | "custom">("v1.0.0");
  const [flags, setFlags] = useState<Record<FeatureFlagKey, boolean>>(() =>
    buildFlagsFromPreset("v1.0.0")
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FLAGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.flags) {
          setFlags({ ...buildFlagsFromPreset("v1.0.0"), ...parsed.flags, core_platform: true });
        }
        if (parsed.preset) {
          setActivePreset(parsed.preset);
        }
      }
    } catch (e) {
      console.warn("Failed to read feature flags from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  const saveToStorage = useCallback(
    (newFlags: Record<FeatureFlagKey, boolean>, newPreset: ReleasePresetId | "custom") => {
      try {
        localStorage.setItem(
          FLAGS_STORAGE_KEY,
          JSON.stringify({
            preset: newPreset,
            flags: newFlags,
          })
        );
      } catch (e) {
        console.warn("Failed to persist feature flags", e);
      }
    },
    []
  );

  const isFeatureEnabled = useCallback(
    (key: FeatureFlagKey): boolean => {
      if (key === "core_platform") return true;
      return Boolean(flags[key]);
    },
    [flags]
  );

  const setFeatureEnabled = useCallback(
    (key: FeatureFlagKey, enabled: boolean) => {
      if (key === "core_platform") return; // Core cannot be disabled

      setFlags((prev) => {
        const updated = { ...prev, [key]: enabled };
        setActivePreset("custom");
        saveToStorage(updated, "custom");
        return updated;
      });
    },
    [saveToStorage]
  );

  const applyPreset = useCallback(
    (presetId: ReleasePresetId) => {
      const newFlags = buildFlagsFromPreset(presetId);
      setFlags(newFlags);
      setActivePreset(presetId);
      saveToStorage(newFlags, presetId);
    },
    [saveToStorage]
  );

  const resetToDefaultPreset = useCallback(() => {
    applyPreset("v1.0.0");
  }, [applyPreset]);

  const enabledCount = useMemo(() => {
    return Object.values(flags).filter(Boolean).length;
  }, [flags]);

  const totalCount = featureFlagDefinitions.length;

  return (
    <FeatureFlagsContext.Provider
      value={{
        flags,
        activePreset,
        isFeatureEnabled,
        setFeatureEnabled,
        applyPreset,
        resetToDefaultPreset,
        enabledCount,
        totalCount,
      }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error("useFeatureFlags must be used within a FeatureFlagsProvider");
  }
  return context;
}
