"use client";

import React from "react";
import { FeatureFlagKey } from "@/lib/data/featureFlags";
import { useFeatureFlags } from "@/lib/featureFlagsContext";

export interface FeatureGuardProps {
  flag: FeatureFlagKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function FeatureGuard({
  flag,
  children,
  fallback = null,
}: FeatureGuardProps) {
  const { isFeatureEnabled } = useFeatureFlags();

  if (!isFeatureEnabled(flag)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
