import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningPathTemplate } from "@/components/templates/features/LearningPathTemplate";
import { BreadcrumbNav } from "@/components/molecules/navigation/BreadcrumbNav";
import { LearningPathStepper } from "@/components/organisms/exploration/LearningPathStepper";
import { QuizContainer } from "@/components/organisms/exploration/QuizContainer";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { Button } from "@/components/atoms/form/Button";
import { ArrowLeft } from "lucide-react";
import { artService } from "@/lib/services/artService";

export function generateStaticParams() {
  const paths = artService.getAllLearningPaths();
  return paths.map((path) => ({
    slug: path.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = artService.getLearningPathBySlug(slug);

  if (!path) {
    return {
      title: "Jalur Belajar Tidak Ditemukan : Jejak Perupa",
    };
  }

  return {
    title: `${path.title} : Jalur Belajar Jejak Perupa`,
    description: path.description,
  };
}

export default async function LearningPathDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = artService.getLearningPathBySlug(slug);

  if (!path) {
    notFound();
  }

  // Ambil kuis terkait materi pertama di jalur ini jika ada
  const firstArticleSlug = path.steps[0]?.articleSlug || "";
  const quiz = artService.getQuizByArticleSlug(firstArticleSlug);

  return (
    <LearningPathTemplate>
      <div className="space-y-10">
        <BreadcrumbNav
          items={[
            { label: "Jalur Belajar", href: "/jalur-belajar" },
            { label: path.title },
          ]}
        />

        <LearningPathStepper learningPath={path} />

        {/* QUIZ SECTION (IF AVAILABLE) */}
        {quiz && (
          <div className="pt-8 border-t border-jp-gray-300">
            <QuizContainer quiz={quiz} />
          </div>
        )}

        <PeruChanCallout
          title="Semangat Belajar dari Peru-Chan"
          theme="blue"
          iconType="sparkles"
        >
          <p>
            Mencatat hal-hal penting di buku sketsa atau jurnal pribadimu akan
            sangat membantu ingatan visual dan mempertajam daya analisismu!
          </p>
        </PeruChanCallout>

        <div className="pt-4">
          <Link href="/jalur-belajar">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Semua Jalur Belajar
            </Button>
          </Link>
        </div>
      </div>
    </LearningPathTemplate>
  );
}
