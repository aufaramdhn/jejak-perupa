import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangle" | "circle" | "text" | "rounded";
  animate?: boolean;
}

export function Skeleton({
  className,
  variant = "rectangle",
  animate = true,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rectangle: "rounded-none",
    circle: "rounded-full",
    text: "h-4 rounded-sm",
    rounded: "rounded-lg",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-jp-gray-200/80",
        animate && "animate-pulse",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
