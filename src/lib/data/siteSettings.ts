import { siteSettingsSeeder } from "@/lib/data/seeders/siteSettingsSeeder";

export interface MascotSlideItem {
  id: string;
  title: string;
  subtitle: string;
  quote: string;
  imageUrl?: string;
  accentColor: string;
  isActive: boolean;
  order: number;
}

export interface PeruChanQuoteItem {
  id: string;
  quoteText: string;
  categoryBadge: string;
  authorNote?: string;
  imageSrc: string;
  accentColor?: string;
  isActive: boolean;
  order: number;
}

export interface PlatformPillarItem {
  id: string;
  number: string;
  title: string;
  desc: string;
  iconName: "book-open" | "layers" | "sparkles" | "heart-handshake" | "compass" | "shield-check" | "palette" | "lightbulb";
  order: number;
}

export interface SiteSettingsData {
  siteName: string;
  siteTagline: string;
  logoInitials: string;
  logoImageUrl: string;
  faviconUrl: string;
  heroEditionBadge: string;
  heroHeadline: string;
  heroDescription: string;
  aboutTitle: string;
  aboutVision: string;
  aboutMission: string;
  aboutPhilosophy: string;
  aboutPillars: PlatformPillarItem[];
  contactEmail: string;
  instagramUrl: string;
  footerDescription: string;
  footerCopyright: string;
  mascotSlides: MascotSlideItem[];
  quotes: PeruChanQuoteItem[];
}

export const defaultSiteSettings: SiteSettingsData = { ...siteSettingsSeeder };
