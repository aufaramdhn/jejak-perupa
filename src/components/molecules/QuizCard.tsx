"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Heading3, Paragraph } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface QuizCardProps {
  questionNumber: number;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  onAnswer?: (isCorrect: boolean) => void;
  className?: string;
}

export function QuizCard({
  questionNumber,
  questionText,
  options,
  correctIndex,
  explanation,
  onAnswer,
  className,
}: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedIndex(index);
  };

  const handleCheck = () => {
    if (selectedIndex === null) return;
    setIsSubmitted(true);
    if (onAnswer) {
      onAnswer(selectedIndex === correctIndex);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-jp-gray-300 bg-white p-6 md:p-8 shadow-2xs space-y-6 font-sans",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-jp-blue-100 font-mono text-xs font-bold text-jp-blue-900">
          {questionNumber}
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
          Pertanyaan Evaluasi
        </span>
      </div>

      <Heading3 className="text-lg md:text-xl text-jp-ink leading-snug">
        {questionText}
      </Heading3>

      <div className="space-y-2.5">
        {options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === correctIndex;

          let optionStyle =
            "border-jp-gray-300 bg-jp-paper hover:border-jp-blue-700 text-jp-ink";

          if (isSelected && !isSubmitted) {
            optionStyle =
              "border-jp-blue-700 bg-jp-blue-50 text-jp-blue-900 ring-2 ring-jp-blue-100 font-semibold";
          }

          if (isSubmitted) {
            if (isCorrect) {
              optionStyle =
                "border-green-600 bg-green-50 text-green-900 font-semibold";
            } else if (isSelected && !isCorrect) {
              optionStyle =
                "border-red-500 bg-red-50 text-red-900 line-through";
            } else {
              optionStyle = "border-jp-gray-200 bg-gray-50 text-jp-gray-400";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={cn(
                "flex w-full items-center justify-between rounded-lg border p-3.5 text-left text-sm transition-all duration-150 cursor-pointer disabled:cursor-default",
                optionStyle
              )}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-current font-mono text-xs font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {isSubmitted && isCorrect && (
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <XCircle className="h-5 w-5 text-red-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {!isSubmitted ? (
        <div className="pt-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleCheck}
            disabled={selectedIndex === null}
            className="rounded-lg"
          >
            Kunci Jawaban
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-jp-blue-100 bg-jp-blue-50/70 p-4 space-y-1.5">
          <div className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
            Penjelasan Materi
          </div>
          <Paragraph className="text-sm text-jp-gray-700 font-prose">
            {explanation}
          </Paragraph>
        </div>
      )}
    </div>
  );
}
