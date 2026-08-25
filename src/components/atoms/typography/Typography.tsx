import React from "react";
import { cn } from "@/lib/utils";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement> {
  children: React.ReactNode;
}

export function Heading1({ className, children, ...props }: TypographyProps) {
  return (
    <h1
      className={cn(
        "font-heading text-3xl font-bold tracking-tight text-jp-ink sm:text-4xl md:text-5xl leading-[1.18]",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function Heading2({ className, children, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        "font-heading text-2xl font-bold tracking-tight text-jp-ink md:text-3xl leading-[1.25]",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function Heading3({ className, children, ...props }: TypographyProps) {
  return (
    <h3
      className={cn(
        "font-heading text-xl font-bold text-jp-ink md:text-2xl leading-[1.3]",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function LeadText({ className, children, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        "max-w-2xl font-prose text-base md:text-lg leading-[1.75] text-jp-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function Paragraph({ className, children, ...props }: TypographyProps) {
  return (
    <p
      className={cn(
        "max-w-prose font-prose text-sm md:text-base leading-[1.8] text-jp-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function SectionLabel({ className, children, ...props }: TypographyProps) {
  return (
    <div
      className={cn(
        "text-xs font-mono font-semibold tracking-wider text-jp-blue-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Caption({ className, children, ...props }: TypographyProps) {
  return (
    <span
      className={cn("text-xs text-jp-gray-500 font-sans", className)}
      {...props}
    >
      {children}
    </span>
  );
}
