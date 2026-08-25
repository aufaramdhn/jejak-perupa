import React from "react";
import Link from "next/link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import { Clock, ArrowRight } from "lucide-react";
import { LearningPathData } from "@/lib/data/learningPaths";

export interface LearningPathCardProps {
  path: LearningPathData;
}

export function LearningPathCard({ path }: LearningPathCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-7 shadow-2xs transition-all duration-300 hover:border-jp-blue-700 hover:shadow-jp-hover">
      <div>
        <div className="flex items-center justify-between gap-2">
          <Badge variant={path.level === "Pemula" ? "lime" : "blue"}>
            Tingkat {path.level}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-jp-gray-500 font-medium font-sans">
            <Clock className="h-3.5 w-3.5 text-jp-blue-700" />
            <span>{path.totalHours}</span>
          </div>
        </div>

        <Heading3 className="mt-4 text-xl font-bold text-jp-ink">
          {path.title}
        </Heading3>

        <Paragraph className="mt-2 text-xs leading-relaxed text-jp-gray-600 font-prose">
          {path.description}
        </Paragraph>

        {/* MODUL LIST */}
        <div className="mt-5 space-y-2 border-t border-jp-gray-200 pt-4 font-sans">
          <div className="text-[11px] font-bold uppercase tracking-wider text-jp-gray-400 font-mono">
            Rangkaian Modul ({path.totalModules} Modul)
          </div>
          <ul className="space-y-1.5 text-xs text-jp-gray-700">
            {path.steps.map((m, idx) => (
              <li key={m.id} className="flex items-center gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-jp-blue-50 text-[10px] font-bold text-jp-blue-900 font-mono">
                  {idx + 1}
                </span>
                <span className="truncate">{m.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-jp-gray-200 font-sans">
        <Link href={`/jalur-belajar/${path.slug}`}>
          <Button variant="outline" size="sm" className="w-full justify-between rounded-lg">
            <span>Mulai Belajar</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
