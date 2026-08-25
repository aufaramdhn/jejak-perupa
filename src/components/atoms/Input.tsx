import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-jp-ink placeholder:text-jp-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-jp-blue-700 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-jp-gray-300 hover:border-jp-gray-500",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
