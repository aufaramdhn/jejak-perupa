"use client";

import React, { useState } from "react";
import { Award, RefreshCw } from "lucide-react";
import { QuizCard } from "@/components/molecules/QuizCard";
import { PeruChanCallout } from "@/components/molecules/PeruChanCallout";
import { Heading2, Paragraph, SectionLabel } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import type { QuizData } from "@/lib/data/quizzes";
import { cn } from "@/lib/utils";

export interface QuizContainerProps {
  quiz: QuizData;
  className?: string;
}

export function QuizContainer({ quiz, className }: QuizContainerProps) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});

  const handleAnswer = (questionIndex: number, isCorrect: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: isCorrect,
    }));
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.values(answers).filter(Boolean).length;
  const isCompleted = answeredCount === quiz.questions.length;

  const handleReset = () => {
    setAnswers({});
  };

  return (
    <div className={cn("space-y-8 font-sans", className)}>
      <div className="rounded-xl border border-jp-blue-200 bg-gradient-to-r from-jp-blue-50 to-white p-6 md:p-8 shadow-xs">
        <SectionLabel>Uji Pemahaman Mandiri</SectionLabel>
        <Heading2 className="mt-2 text-jp-blue-900 text-2xl md:text-3xl">{quiz.title}</Heading2>
        <Paragraph className="mt-2 text-jp-gray-700 font-prose">{quiz.description}</Paragraph>

        <div className="mt-5 flex items-center gap-4 text-xs font-semibold text-jp-blue-700 font-mono">
          <span>Total Pertanyaan: {quiz.questions.length}</span>
          <span>•</span>
          <span>
            Progres: {answeredCount} dari {quiz.questions.length} dijawab
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, idx) => (
          <QuizCard
            key={question.id}
            questionNumber={idx + 1}
            questionText={question.question}
            options={question.options}
            correctIndex={question.correctIndex}
            explanation={question.explanation}
            onAnswer={(isCorrect) => handleAnswer(idx, isCorrect)}
          />
        ))}
      </div>

      {isCompleted && (
        <div className="rounded-xl border-2 border-jp-lime bg-white p-8 shadow-2xs space-y-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-jp-lime text-jp-ink shadow-2xs">
            <Award className="h-7 w-7" />
          </div>

          <div>
            <div className="font-heading text-2xl font-bold text-jp-ink">
              Kuis Selesai! Skor Kamu: {correctCount} / {quiz.questions.length}
            </div>
            <p className="mt-2 text-sm text-jp-gray-700 font-prose">
              {correctCount === quiz.questions.length
                ? "Luar biasa! Kamu memahami seluruh konsep materi ini dengan sangat mendalam."
                : "Kerja bagus! Terus asah pemahamanmu dengan membaca kembali bagian-bagian yang perlu didalami."}
            </p>
          </div>

          <PeruChanCallout
            title="Catatan Peru-Chan"
            theme="lime"
            iconType="sparkles"
            className="text-left"
          >
            <p>
              Nilai kuis bukanlah ukuran mutlak bakat senimu, melainkan sarana
              pengingat agar wawasan teorimu semakin kaya dan berbobot!
            </p>
          </PeruChanCallout>

          <Button variant="outline" size="sm" onClick={handleReset} className="rounded-lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Ulangi Kuis
          </Button>
        </div>
      )}
    </div>
  );
}
