import React from "react";
import { cn } from "@/lib/utils";

export interface IconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "blue" | "brown" | "lime" | "gray" | "paper";
  children: React.ReactNode;
}

export function IconWrapper({
  size = "md",
  variant = "paper",
  children,
  className,
  ...props
}: IconWrapperProps) {
  const sizeStyles = {
    sm: "h-8 w-8 rounded-lg",
    md: "h-11 w-11 rounded-xl",
    lg: "h-14 w-14 rounded-2xl",
  };

  const variantStyles = {
    blue: "bg-jp-blue-100 text-jp-blue-900 border border-jp-blue-200",
    brown: "bg-jp-brown-100 text-jp-brown-900 border border-jp-brown-200",
    lime: "bg-jp-lime text-jp-ink border border-jp-lime",
    gray: "bg-jp-gray-100 text-jp-gray-700 border border-jp-gray-300",
    paper: "bg-white text-jp-ink border border-jp-gray-300 shadow-xs",
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center transition-colors",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
