import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "brown" | "lime" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-jp-blue-700 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-jp-blue-900 text-white hover:bg-jp-blue-700 shadow-sm",
      secondary:
        "bg-jp-blue-100 text-jp-blue-900 hover:bg-jp-blue-700 hover:text-white",
      brown:
        "bg-jp-brown-900 text-white hover:bg-jp-brown-700 shadow-sm",
      lime:
        "bg-jp-lime text-jp-ink font-bold hover:opacity-90",
      outline:
        "border border-jp-gray-300 bg-white text-jp-ink hover:border-jp-blue-700 hover:text-jp-blue-700",
      ghost:
        "bg-transparent text-jp-ink hover:bg-jp-blue-100 hover:text-jp-blue-900",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5",
      icon: "h-9 w-9 p-0 rounded-full",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
