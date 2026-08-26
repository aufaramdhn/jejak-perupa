"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  defaultSiteSettings,
  SiteSettingsData,
  MascotSlideItem,
  PeruChanQuoteItem,
  PlatformPillarItem,
} from "@/lib/data/siteSettings";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const SETTINGS_STORAGE_KEY = "jejak_perupa_site_settings_v1";

interface SiteContextType {
  settings: SiteSettingsData;
  updateSettings: (newSettings: Partial<SiteSettingsData>) => void;
  addMascotSlide: (slide: Omit<MascotSlideItem, "id" | "order">) => void;
  updateMascotSlide: (id: string, slide: Partial<MascotSlideItem>) => void;
  deleteMascotSlide: (id: string) => void;
  addQuote: (quote: Omit<PeruChanQuoteItem, "id" | "order">) => void;
  updateQuote: (id: string, quote: Partial<PeruChanQuoteItem>) => void;
  deleteQuote: (id: string) => void;
  toggleQuoteActive: (id: string) => void;
  addPillar: (pillar: Omit<PlatformPillarItem, "id" | "order">) => void;
  updatePillar: (id: string, pillar: Partial<PlatformPillarItem>) => void;
  deletePillar: (id: string) => void;
  resetToDefault: () => void;
}

function mapDBToSiteSettings(row: any): Partial<SiteSettingsData> {
  return {
    siteName: row.site_name,
    siteTagline: row.site_tagline,
    logoInitials: row.logo_initials,
    logoImageUrl: row.logo_image_url || "",
    faviconUrl: row.favicon_url || "",
    heroEditionBadge: row.hero_edition_badge,
    heroHeadline: row.hero_headline,
    heroDescription: row.hero_description,
    aboutTitle: row.about_title,
    aboutVision: row.about_vision,
    aboutMission: row.about_mission,
    aboutPhilosophy: row.about_philosophy,
    aboutPillars: Array.isArray(row.about_pillars) ? row.about_pillars : defaultSiteSettings.aboutPillars,
    contactEmail: row.contact_email,
    instagramUrl: row.instagram_url,
    footerDescription: row.footer_description,
    footerCopyright: row.footer_copyright,
    mascotSlides: Array.isArray(row.mascot_slides) ? row.mascot_slides : defaultSiteSettings.mascotSlides,
    quotes: Array.isArray(row.quotes) ? row.quotes : defaultSiteSettings.quotes,
  };
}

function mapSiteSettingsToDB(s: SiteSettingsData) {
  return {
    id: "primary",
    site_name: s.siteName,
    site_tagline: s.siteTagline,
    logo_initials: s.logoInitials,
    logo_image_url: s.logoImageUrl || "",
    favicon_url: s.faviconUrl || "",
    hero_edition_badge: s.heroEditionBadge,
    hero_headline: s.heroHeadline,
    hero_description: s.heroDescription,
    about_title: s.aboutTitle,
    about_vision: s.aboutVision,
    about_mission: s.aboutMission,
    about_philosophy: s.aboutPhilosophy,
    about_pillars: s.aboutPillars || [],
    contact_email: s.contactEmail,
    instagram_url: s.instagramUrl,
    footer_description: s.footerDescription,
    footer_copyright: s.footerCopyright,
    mascot_slides: s.mascotSlides || [],
    quotes: s.quotes || [],
    updated_at: new Date().toISOString(),
  };
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettingsData>(defaultSiteSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage & Supabase Database on mount
  useEffect(() => {
    // 1. Initial local load
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({
          ...defaultSiteSettings,
          ...parsed,
          quotes:
            parsed.quotes && parsed.quotes.length > 0
              ? parsed.quotes
              : defaultSiteSettings.quotes,
          aboutPillars:
            parsed.aboutPillars && parsed.aboutPillars.length > 0
              ? parsed.aboutPillars
              : defaultSiteSettings.aboutPillars,
        });
      }
    } catch (e) {
      console.warn("Failed to read site settings from localStorage", e);
    } finally {
      setIsLoaded(true);
    }

    // 2. Background sync from Supabase Database
    if (isSupabaseConfigured()) {
      supabase
        .from("site_settings")
        .select("*")
        .eq("id", "primary")
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            const mapped = mapDBToSiteSettings(data);
            setSettings((prev) => {
              const merged = { ...prev, ...mapped };
              try {
                localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
              } catch (e) {}
              return merged;
            });
          }
        }, (e: any) => {
          console.warn("Supabase site_settings sync failed:", e);
        });
    }
  }, []);

  // Save to localStorage and sync to Supabase Database
  const saveToStorage = useCallback((data: SiteSettingsData) => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("Failed to persist site settings to localStorage", e);
    }

    if (isSupabaseConfigured()) {
      const payload = mapSiteSettingsToDB(data);
      supabase
        .from("site_settings")
        .upsert(payload, { onConflict: "id" })
        .then(({ error }) => {
          if (error) {
            console.error("Supabase site_settings upsert error:", error.message);
          }
        }, (e: any) => {
          console.warn("Supabase site_settings upsert exception:", e);
        });
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

  // MASCOT SLIDES
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

  // QUOTES
  const addQuote = useCallback(
    (quote: Omit<PeruChanQuoteItem, "id" | "order">) => {
      setSettings((prev) => {
        const newQuote: PeruChanQuoteItem = {
          ...quote,
          id: `quote-${Date.now()}`,
          order: (prev.quotes || []).length + 1,
        };
        const updated = {
          ...prev,
          quotes: [...(prev.quotes || []), newQuote],
        };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const updateQuote = useCallback(
    (id: string, quoteUpdate: Partial<PeruChanQuoteItem>) => {
      setSettings((prev) => {
        const updatedQuotes = (prev.quotes || []).map((q) =>
          q.id === id ? { ...q, ...quoteUpdate } : q
        );
        const updated = { ...prev, quotes: updatedQuotes };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const deleteQuote = useCallback(
    (id: string) => {
      setSettings((prev) => {
        const updatedQuotes = (prev.quotes || []).filter((q) => q.id !== id);
        const updated = { ...prev, quotes: updatedQuotes };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const toggleQuoteActive = useCallback(
    (id: string) => {
      setSettings((prev) => {
        const updatedQuotes = (prev.quotes || []).map((q) =>
          q.id === id ? { ...q, isActive: !q.isActive } : q
        );
        const updated = { ...prev, quotes: updatedQuotes };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  // PILLARS / VALUES
  const addPillar = useCallback(
    (pillar: Omit<PlatformPillarItem, "id" | "order">) => {
      setSettings((prev) => {
        const currentPillars = prev.aboutPillars || [];
        const newPillar: PlatformPillarItem = {
          ...pillar,
          id: `pillar-${Date.now()}`,
          order: currentPillars.length + 1,
        };
        const updated = {
          ...prev,
          aboutPillars: [...currentPillars, newPillar],
        };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const updatePillar = useCallback(
    (id: string, pillarUpdate: Partial<PlatformPillarItem>) => {
      setSettings((prev) => {
        const updatedPillars = (prev.aboutPillars || []).map((p) =>
          p.id === id ? { ...p, ...pillarUpdate } : p
        );
        const updated = { ...prev, aboutPillars: updatedPillars };
        saveToStorage(updated);
        return updated;
      });
    },
    [saveToStorage]
  );

  const deletePillar = useCallback(
    (id: string) => {
      setSettings((prev) => {
        const updatedPillars = (prev.aboutPillars || []).filter((p) => p.id !== id);
        const updated = { ...prev, aboutPillars: updatedPillars };
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
        addQuote,
        updateQuote,
        deleteQuote,
        toggleQuoteActive,
        addPillar,
        updatePillar,
        deletePillar,
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
