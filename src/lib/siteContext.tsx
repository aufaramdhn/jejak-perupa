"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  defaultSiteSettings,
  SiteSettingsData,
  MascotSlideItem,
} from "@/lib/data/siteSettings";

const SETTINGS_STORAGE_KEY = "jejak_perupa_site_settings_v1";

interface SiteContextType {
  settings: SiteSettingsData;
  updateSettings: (newSettings: Partial<SiteSettingsData>) => void;
  addMascotSlide: (slide: Omit<MascotSlideItem, "id" | "order">) => void;
  updateMascotSlide: (id: string, slide: Partial<MascotSlideItem>) => void;
  deleteMascotSlide: (id: string) => void;
  resetToDefault: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettingsData>(defaultSiteSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...defaultSiteSettings, ...parsed });
      }
    } catch (e) {
      console.warn("Failed to read site settings from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  const saveToStorage = useCallback((data: SiteSettingsData) => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to persist site settings to localStorage", e);
    }
  }, []);

  const updateSettings = useCallback(
    (newSettings: Partial<SiteSettingsData>) => {
      setSettings((prev) => {
        const updated = { ...prev, ...newSettings };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const addMascotSlide = useCallback(
    (slide: Omit<MascotSlideItem, "id" | "order">) => {
      setSettings((prev) => {
        const newSlide: MascotSlideItem = {
          ...slide,
          id: `slide-${Date.now()}`,
          order: prev.mascotSlides.length + 1,
        };
        const updated = {
          ...prev,
          mascotSlides: [...prev.mascotSlides, newSlide],
        };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const updateMascotSlide = useCallback(
    (id: string, slideUpdate: Partial<MascotSlideItem>) => {
      setSettings((prev) => {
        const updatedSlides = prev.mascotSlides.map((s) =>
          s.id === id ? { ...s, ...slideUpdate } : s
        );
        const updated = { ...prev, mascotSlides: updatedSlides };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const deleteMascotSlide = useCallback(
    (id: string) => {
      setSettings((prev) => {
        const updatedSlides = prev.mascotSlides.filter((s) => s.id !== id);
        const updated = { ...prev, mascotSlides: updatedSlides };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const resetToDefault = useCallback(() => {
    setSettings(defaultSiteSettings);
    saveToStorage(defaultSiteSettings);
  }, [saveToStorage]);

  return (
    <SiteContext.Provider
      value={{
        settings,
        updateSettings,
        addMascotSlide,
        updateMascotSlide,
        deleteMascotSlide,
        resetToDefault,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteProvider");
  }
  return context;
}
