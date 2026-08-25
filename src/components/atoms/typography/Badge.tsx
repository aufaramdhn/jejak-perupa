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
    "inline-flex items-center uppercase tracking-wider font-bold rounded-md transition-colors font-sans";

  const variantStyles = {
    lime: "bg-jp-lime text-jp-ink",
    blue: "bg-jp-blue-100 text-jp-blue-900 border border-jp-blue-200",
    brown: "bg-jp-brown-100 text-jp-brown-900 border border-jp-brown-200",
    gray: "bg-jp-gray-100 text-jp-gray-700 border border-jp-gray-200",
    outline: "border border-jp-gray-300 bg-white text-jp-gray-700",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
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
