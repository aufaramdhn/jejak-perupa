import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "lime" | "blue" | "brown" | "gray" | "outline";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "blue",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium tracking-wide rounded-md transition-colors font-sans whitespace-nowrap shrink-0";

  const variantStyles = {
    lime: "bg-jp-lime text-jp-ink font-semibold",
    blue: "bg-jp-blue-50 text-jp-blue-900 border border-jp-blue-200/80 font-medium",
    brown: "bg-jp-brown-50 text-jp-brown-900 border border-jp-brown-200/80 font-medium",
    gray: "bg-jp-paper text-jp-gray-700 border border-jp-gray-300 font-medium",
    outline: "border border-jp-gray-300 bg-white text-jp-gray-700 font-medium",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
