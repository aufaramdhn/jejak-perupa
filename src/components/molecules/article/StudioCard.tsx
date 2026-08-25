import React from "react";
import { Palette, Box, Layers, Disc } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudioCardProps {
  title: string;
  description?: string;
  discipline?: "lukis" | "patung" | "grafis" | "keramik" | "custom";
  customIcon?: React.ReactNode;
  className?: string;
}

export function StudioCard({
  title,
  description,
  discipline = "lukis",
  customIcon,
  className,
}: StudioCardProps) {
  const renderIcon = () => {
    if (customIcon) return customIcon;
    switch (discipline) {
      case "patung":
        return <Box className="h-5 w-5 text-jp-brown-700" />;
      case "grafis":
        return <Layers className="h-5 w-5 text-jp-blue-700" />;
      case "keramik":
        return <Disc className="h-5 w-5 text-jp-brown-900" />;
      default:
        return <Palette className="h-5 w-5 text-jp-blue-900" />;
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3.5 rounded-xl border border-jp-gray-300 bg-white p-4.5 shadow-2xs transition-all duration-200 hover:border-jp-blue-700 hover:shadow-jp-hover",
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-jp-paper border border-jp-gray-300/80">
        {renderIcon()}
      </div>
      <div>
        <h3 className="font-heading text-base font-bold text-jp-ink">{title}</h3>
        {description && (
          <p className="mt-1 text-xs leading-relaxed text-jp-gray-700 font-prose">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
