import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { Heading2, Heading3, Paragraph, SectionLabel } from "@/components/atoms/typography/Typography";
import type { LearningPathData } from "@/lib/data/learningPaths";
import { cn } from "@/lib/utils";

export interface LearningPathStepperProps {
  learningPath: LearningPathData;
  className?: string;
}

export function LearningPathStepper({
  learningPath,
  className,
}: LearningPathStepperProps) {
  return (
    <div className={cn("space-y-10 font-sans", className)}>
      <div className="rounded-xl border border-jp-blue-200 bg-gradient-to-r from-jp-blue-50 to-white p-6 md:p-8 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <SectionLabel>Kurikulum Mandiri</SectionLabel>
          <Badge variant="lime">Tingkat {learningPath.level}</Badge>
        </div>

        <Heading2 className="mt-3 text-jp-blue-900 text-2xl md:text-3xl">{learningPath.title}</Heading2>
        <Paragraph className="mt-2.5 text-base text-jp-gray-700 max-w-2xl font-prose">
          {learningPath.description}
        </Paragraph>

        <div className="mt-6 flex flex-wrap items-center gap-5 text-xs font-semibold text-jp-blue-700 border-t border-jp-blue-100 pt-4">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>{learningPath.totalModules} Modul Belajar</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>Estimasi {learningPath.totalHours}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
          Urutan Pembelajaran
        </div>

        <div className="space-y-4">
          {learningPath.steps.map((step, idx) => (
            <div
              key={step.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-6 shadow-2xs transition-all hover:border-jp-blue-700 hover:shadow-jp-hover"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-jp-blue-900 font-mono text-xs font-bold text-white">
                  {idx + 1}
                </div>
                <div>
                  <Heading3 className="text-base md:text-lg text-jp-ink">
                    {step.title}
                  </Heading3>
                  <Paragraph className="mt-1 text-sm text-jp-gray-700 font-prose">
                    {step.description}
                  </Paragraph>
                  <div className="mt-2 flex items-center gap-1 text-xs text-jp-gray-500 font-mono">
                    <Clock className="h-3.5 w-3.5 text-jp-blue-700" />
                    <span>{step.estimatedMinutes} menit estimasi baca</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 pt-2 sm:pt-0">
                <Link href={`/artikel/${step.articleSlug}`}>
                  <Button variant="primary" size="sm" className="rounded-lg">
                    Buka Materi
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
