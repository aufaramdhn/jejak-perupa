import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={cn(
        "flex items-center space-x-2 text-xs font-medium text-jp-gray-500",
        className
      )}
    >
      <Link
        href="/"
        className="flex items-center hover:text-jp-blue-700 transition-colors"
      >
        <Home className="h-3.5 w-3.5 mr-1" />
        <span>Beranda</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3.5 w-3.5 text-jp-gray-400 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-semibold text-jp-blue-900 truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-jp-blue-700 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
