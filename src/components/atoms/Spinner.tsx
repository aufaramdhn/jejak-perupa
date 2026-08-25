import React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "brown" | "lime" | "white";
}

export function Spinner({
  size = "md",
  variant = "primary",
  className,
  ...props
}: SpinnerProps) {
  const sizeStyles = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-3",
  };

  const variantStyles = {
    primary: "border-jp-blue-100 border-t-jp-blue-900",
    brown: "border-jp-brown-100 border-t-jp-brown-900",
    lime: "border-jp-lime-muted border-t-jp-lime",
    white: "border-white/30 border-t-white",
  };

  return (
    <div
      role="status"
      aria-label="Memuat data"
      className={cn(
        "animate-spin rounded-full",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="sr-only">Memuat...</span>
    </div>
  );
}
