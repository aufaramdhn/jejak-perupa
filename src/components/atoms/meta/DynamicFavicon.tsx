"use client";

import { useEffect } from "react";
import { useSiteSettings } from "@/lib/siteContext";

export function DynamicFavicon() {
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (settings.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = settings.faviconUrl;
    }
  }, [settings.faviconUrl]);

  return null;
}
