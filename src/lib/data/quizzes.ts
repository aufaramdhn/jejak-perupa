export interface QuizQuestionItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  id: string;
  articleSlug: string;
  title: string;
  description: string;
  questions: QuizQuestionItem[];
}

export const quizzesData: QuizData[] = [
  {
    id: "quiz-seni-rupa-murni",
    articleSlug: "seni-rupa-murni",
    title: "Kuis Evaluasi: Mengenal Seni Rupa Murni",
    description: "Uji pemahamanmu seputar pengertian, karakteristik studio, dan profesi Seni Rupa Murni.",
    questions: [
      {
        id: "q1",
        question: "Apa tujuan utama penciptaan karya dalam Seni Rupa Murni (Fine Art)?",
        options: [
          "Fungsi kegunaan praktis sehari-hari",
          "Nilai estetika dan ekspresi artistik murni",
          "Kebutuhan produksi massal industri",
          "Instruksi teknis bangunan arsitektur",
        ],
        correctIndex: 1,
        explanation: "Seni Rupa Murni diciptakan mengutamakan nilai keindahan estetis dan ekspresi gagasan perupa, berbeda dari seni rupa terapan yang mengutamakan fungsi guna.",
      },
      {
        id: "q2",
        question: "Manakah di bawah ini yang BUKAN merupakan salah satu dari 4 studio utama di Seni Rupa Murni?",
        options: [
          "Studio Seni Lukis",
          "Studio Seni Patung",
          "Studio Desain Interior Komersial",
          "Studio Seni Grafis",
        ],
        correctIndex: 2,
        explanation: "Desain Interior merupakan program studi mandiri di rumpun desain, sedangkan 4 studio seni rupa murni umumnya meliputi Lukis, Patung, Grafis, dan Keramik.",
      },
      {
        id: "q3",
        question: "Profesi manakah yang bertugas merancang konsep pameran dan menyeleksi karya seni yang akan ditampilkan ke publik?",
        options: [
          "Kurator Seni Rupa",
          "Kolektor Seni",
          "Model Studio",
          "Apresiator Pasif",
        ],
        correctIndex: 0,
        explanation: "Kurator bertanggung jawab atas penyusunan narasi tematik, pemilihan karya, dan pendampingan apresiasi pameran seni rupa.",
      },
    ],
  },
];
