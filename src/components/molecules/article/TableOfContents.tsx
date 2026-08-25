import React from "react";
import { ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TOCItem {
  id: string;
  title: string;
  number?: string;
}

export interface TableOfContentsProps {
  items: TOCItem[];
  title?: string;
  activeId?: string;
  className?: string;
}

export function TableOfContents({
  items,
  title = "Daftar Isi",
  activeId,
  className,
}: TableOfContentsProps) {
  return (
    <nav
      aria-label="Daftar isi"
      className={cn(
        "rounded-2xl border border-jp-gray-300 bg-white p-6 shadow-jp-card",
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-jp-blue-700">
        <ListOrdered className="h-4 w-4" />
        <span>{title}</span>
      </div>

      <ol className="mt-4 space-y-2 text-sm leading-6">
        {items.map((item, idx) => {
          const itemNumber = item.number || String(idx + 1).padStart(2, "0");
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors duration-150",
                  isActive
                    ? "bg-jp-blue-100 font-semibold text-jp-blue-900"
                    : "text-jp-gray-700 hover:bg-jp-gray-50 hover:text-jp-blue-700"
                )}
              >
                <span className="shrink-0 font-mono text-xs font-bold text-jp-blue-700">
                  {itemNumber}.
                </span>
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
