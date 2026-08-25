import React from "react";
import Link from "next/link";
import { ArticleDetailTemplate } from "@/components/templates/ArticleDetailTemplate";
import { BreadcrumbNav } from "@/components/molecules/BreadcrumbNav";
import { Badge } from "@/components/atoms/Badge";
import { AuthorMeta } from "@/components/molecules/AuthorMeta";
import { TableOfContents } from "@/components/molecules/TableOfContents";
import { PeruChanCallout } from "@/components/molecules/PeruChanCallout";
import { StudioCard } from "@/components/molecules/StudioCard";
import { Heading1, Heading2, LeadText, Paragraph } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";

export const metadata = {
  title: "Mengenal Program Studi Seni Rupa Murni : Jejak Perupa",
  description:
    "Mengenal Program Studi Seni Rupa Murni: pengertian, pengalaman kuliah, studio, modal belajar, dan berbagai kemungkinan profesinya.",
};

export default function SeniRupaMurniArticlePage() {
  const tocItems = [
    { id: "berkenalan", title: "Berkenalan dengan Seni Rupa Murni", number: "01" },
    { id: "kuliahnya", title: "Kuliahnya bagaimana?", number: "02" },
    { id: "modal", title: "Modalnya apa?", number: "03" },
    { id: "asiknya", title: "Asiknya kuliah seni rupa murni?", number: "04" },
    { id: "studio", title: "Denger-denger ada perpecahan kuliah?", number: "05" },
    { id: "profesi", title: "Mau Jadi Apa Kamu, Kuliah Seni Rupa Murni?", number: "06" },
    { id: "kesimpulan", title: "Kesimpulannya?", number: "07" },
  ];

  const professions = [
    "01. Seni Rupawan Profesional (di bidang Lukis, Patung, Grafis, Keramik, dan Media Baru)",
    "02. Kurator Seni Rupa",
    "03. Kurator Seni Multimedia",
    "04. Kritikus Seni",
    "05. Peneliti / Pengkaji Seni Rupa",
    "06. Penulis / Wartawan Seni Rupa di Berbagai Media",
    "07. Pengelola / Manajerial Museum dan Galeri Seni Rupa",
    "08. Perancang dan Pelaksana Elemen Estetis Ruang",
    "09. Art Director / Creative Manager",
    "10. Tenaga Pendidik (Guru Seni Budaya, Dosen Seni Rupa)",
    "11. Wirausaha Industri Kreatif",
  ];

  const headerContent = (
    <div>
      <div className="mb-4">
        <BreadcrumbNav
          items={[
            { label: "Artikel", href: "/artikel" },
            { label: "Pendidikan Seni" },
          ]}
        />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Badge variant="lime" size="md">
          Pendidikan Seni
        </Badge>
        <span className="text-xs font-semibold text-jp-gray-500">
          Arsip Jejak Perupa
        </span>
      </div>

      <Heading1 className="max-w-4xl text-jp-ink">
        Mengenal Program Studi:{" "}
        <span className="text-jp-blue-900">Seni Rupa Murni</span>
      </Heading1>

      <LeadText className="mt-5">
        Sebuah pengantar santai untuk mengenal Seni Rupa Murni, kehidupan
        perkuliahannya, studio yang dapat dipilih, hingga berbagai kemungkinan
        profesi setelah lulus.
      </LeadText>

      <div className="mt-6 border-t border-jp-gray-300/80 pt-5">
        <AuthorMeta
          authorName="Jejak Perupa"
          publishDate="Arsip 2017"
          readTime="8 menit membaca"
          versionLabel="Versi arsip"
        />
      </div>
    </div>
  );

  const mainContent = (
    <div className="space-y-12">
      {/* EDITORIAL NOTE */}
      <PeruChanCallout
        title="Catatan dari Jejak Perupa"
        theme="blue"
        iconType="sparkles"
      >
        <p>Halo semuanya.</p>
        <p>
          Jejak Perupa sudah cukup lama tidak diperbarui karena mulanya dibuat
          untuk kepentingan tugas. Namun karena tingginya minat pembaca di rumah
          kelahiran Jejak Perupa ini, kami hadir kembali menyajikan arsip
          terbaik.
        </p>
        <p className="font-semibold text-jp-blue-900">
          Berikut adalah rujukan penting: Penjelasan tentang Program Studi Seni
          Rupa Murni.
        </p>
      </PeruChanCallout>

      {/* MOBILE TOC */}
      <div className="block lg:hidden">
        <TableOfContents items={tocItems} />
      </div>

      {/* BAB 01 */}
      <section id="berkenalan" className="scroll-mt-28 space-y-4">
        <span className="font-mono text-xs font-bold text-jp-blue-900 tracking-wider">
          BAB / 01
        </span>
        <Heading2>Berkenalan dengan Seni Rupa Murni</Heading2>
        <Paragraph>
          Pengertian Seni Rupa Murni atau dikenal juga sebagai <em>Fine Art</em>{" "}
          adalah suatu bentuk seni yang diciptakan dengan tujuan untuk nilai
          estetika dan artistik murni. Tujuan tersebut lebih ditekankan daripada
          nilai fungsi terapan pragmatis.
        </Paragraph>
        <Paragraph>
          Seni Rupa Murni merupakan fondasi bagi cabang seni lainnya, sehingga
          ilmu yang dipelajari sering memiliki irisian erat dengan desain
          komunikasi visual, desain interior, kriya, maupun seni pertunjukan.
        </Paragraph>
        <Paragraph>
          Di bangku kuliah, seni rupa murni didominasi oleh kerja studio dan
          eksplorasi material, namun tetap diperkuat oleh kajian teori estetika,
          sejarah seni, dan kritik seni untuk mempertanggungjawabkan konsep karya
          secara akademik.
        </Paragraph>
      </section>

      {/* CALLOUT TIP PERU-CHAN */}
      <PeruChanCallout
        title="Catatan Kuratorial Peru-Chan"
        subtitle="Kuliah seni bukan cuma soal membuat karya fisik."
        theme="brown"
        iconType="lightbulb"
      >
        <p>
          Wawasan teoritis, kepekaan lingkungan, perluasan jejaring, dan proses
          berpikir kritis adalah bagian tak terpisahkan dari perjalanan belajar
          seni rupa.
        </p>
      </PeruChanCallout>

      {/* BAB 02 */}
      <section id="kuliahnya" className="scroll-mt-28 space-y-4">
        <span className="font-mono text-xs font-bold text-jp-blue-900 tracking-wider">
          BAB / 02
        </span>
        <Heading2>Kuliahnya bagaimana?</Heading2>
        <Paragraph>
          Kuliah di Seni Rupa Murni bukan sekadar diajari teknik melukis atau
          memahat secara kaku seperti menghafal rumus. Di sini, mahasiswa
          didorong untuk mengeksplorasi dan membentuk karakter visual serta gaya
          pribadi masing-masing.
        </Paragraph>
        <Paragraph>
          Dosen berperan sebagai fasilitator, pemantik diskusi, dan kurator yang
          memberikan masukan konseptual. Pertukaran gagasan dengan rekan studio
          dan kakak tingkat menjadi ruang belajar yang sangat kaya.
        </Paragraph>
      </section>

      {/* BAB 03 */}
      <section id="modal" className="scroll-mt-28 space-y-4">
        <span className="font-mono text-xs font-bold text-jp-blue-900 tracking-wider">
          BAB / 03
        </span>
        <Heading2>Modalnya apa?</Heading2>
        <Paragraph>
          Modal utama masuk Seni Rupa Murni adalah rasa ingin tahu yang besar,
          keberanian bereksperimen, kemauan untuk terus berproses, serta
          kesenangan dalam mengamati keindahan visual di sekitar.
        </Paragraph>
        <Paragraph>
          Keterampilan teknis dasar tentu sangat membantu dalam proses seleksi
          masuk (portofolio SBMPTN / SNBP / Ujian Mandiri), namun ketekunan dan
          daya tahan eksplorasi studio adalah kunci utama keberhasilan studi.
        </Paragraph>
      </section>

      {/* BAB 04 */}
      <section id="asiknya" className="scroll-mt-28 space-y-4">
        <span className="font-mono text-xs font-bold text-jp-blue-900 tracking-wider">
          BAB / 04
        </span>
        <Heading2>Asiknya kuliah seni rupa murni?</Heading2>
        <Paragraph>
          Mendalami seni rupa memberikan kebanggaan tersendiri karena
          mengembangkan cara pandang unik yang tidak dimiliki semua orang.
          Lingkungan studionya majemuk dan terbuka terhadap berbagai gagasan
          kreatif.
        </Paragraph>
        <Paragraph>
          Proses berkarya memberikan kepuasan mendalam ketika gagasan abstrak
          berhasil diwujudkan menjadi karya fisik atau instalasi yang dapat
          diapresiasi publik dalam pameran berkala.
        </Paragraph>
      </section>

      {/* BAB 05 */}
      <section id="studio" className="scroll-mt-28 space-y-4">
        <span className="font-mono text-xs font-bold text-jp-blue-900 tracking-wider">
          BAB / 05
        </span>
        <Heading2>Studio Pilihan di Seni Rupa Murni</Heading2>
        <Paragraph>
          Pada umumnya, di semester lanjutan mahasiswa memilih fokus peminatan
          atau konsentrasi studio:
        </Paragraph>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 font-sans">
          <StudioCard
            title="Studio Seni Lukis"
            discipline="lukis"
            description="Eksplorasi kanvas, cat minyak, akrilik, drawing, dan bahasa rupa 2 dimensi."
          />
          <StudioCard
            title="Studio Seni Patung"
            discipline="patung"
            description="Eksplorasi bentuk 3 dimensi, media kayu, batu, logam, resin, dan seni instalasi."
          />
          <StudioCard
            title="Studio Seni Grafis"
            discipline="grafis"
            description="Eksplorasi teknik cetak tinggi (cukil kayu), intaglio, sablon serigrafi, dan litografi."
          />
          <StudioCard
            title="Studio Seni Keramik"
            discipline="keramik"
            description="Eksplorasi medium lempung, pembakaran suhu tinggi, glasir, dan bentuk kriya artistik."
          />
        </div>
      </section>

      {/* BAB 06 */}
      <section id="profesi" className="scroll-mt-28 space-y-4">
        <span className="font-mono text-xs font-bold text-jp-blue-900 tracking-wider">
          BAB / 06
        </span>
        <Heading2>Mau Jadi Apa Setelah Lulus?</Heading2>
        <Paragraph>
          Peluang profesi lulusan Seni Rupa Murni sangat luas seiring dengan
          berkembangnya ekosistem industri kreatif dan kebudayaan:
        </Paragraph>

        <div className="mt-6 space-y-2.5 font-sans">
          {professions.map((prof, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-jp-gray-300 bg-jp-paper p-3.5 text-sm font-medium text-jp-gray-700 shadow-2xs"
            >
              {prof}
            </div>
          ))}
        </div>
      </section>

      {/* BAB 07 */}
      <section id="kesimpulan" className="scroll-mt-28 space-y-4">
        <span className="font-mono text-xs font-bold text-jp-blue-900 tracking-wider">
          BAB / 07
        </span>
        <Heading2>Kesimpulannya?</Heading2>
        <Paragraph>
          Jika kamu memiliki minat mendalam dan panggilan hati di Seni Rupa
          Murni, jangan ragu untuk menekuninya dengan sungguh-sungguh.
          Keahlian berpikir kreatif, kepekaan estetika, dan kemampuan
          mewujudkan gagasan adalah kompetensi berharga di era modern.
        </Paragraph>

        <blockquote className="my-8 border-l-4 border-jp-brown-700 bg-jp-brown-50 p-6 rounded-r-2xl font-prose text-lg italic text-jp-brown-900 leading-relaxed shadow-xs">
          &ldquo;Yakinlah, tidak ada ilmu yang tidak bermanfaat. Hanya kitalah yang
          menjadi faktor penentu apakah ilmu itu bermanfaat atau tidak.&rdquo;
          <footer className="mt-3 text-sm font-sans font-semibold text-jp-brown-700 not-italic">
            - Aad Abdillah -
          </footer>
        </blockquote>
      </section>
    </div>
  );

  const sidebarContent = (
    <div className="space-y-6 font-sans">
      {/* DESKTOP TOC */}
      <div className="hidden lg:block">
        <TableOfContents items={tocItems} />
      </div>

      {/* ARTICLE SUMMARY WIDGET */}
      <div className="rounded-2xl border border-jp-gray-300 bg-white p-6 shadow-jp-card space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-jp-blue-700">
          Ringkasan Topik
        </div>
        <p className="text-sm leading-relaxed text-jp-gray-700">
          Panduan pengantar komprehensif bagi calon mahasiswa mengenai realitas
          studi, 4 studio utama, dan prospek karier Seni Rupa Murni.
        </p>

        <div className="flex items-center gap-2 pt-2 border-t border-jp-gray-100">
          <Button variant="outline" size="sm" className="flex-1">
            <Bookmark className="h-3.5 w-3.5 mr-1 text-jp-blue-700" />
            Simpan
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Share2 className="h-3.5 w-3.5 mr-1 text-jp-blue-700" />
            Bagikan
          </Button>
        </div>

        <Link href="/artikel" className="block pt-2">
          <Button variant="primary" size="sm" className="w-full">
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            Kembali ke Artikel
          </Button>
        </Link>
      </div>

      {/* ARCHIVE NOTICE WIDGET */}
      <div className="rounded-2xl border border-jp-lime/60 bg-jp-lime-muted/30 p-5">
        <div className="text-xs font-bold text-jp-ink">
          Catatan Kuratorial
        </div>
        <p className="mt-2 text-xs leading-relaxed text-jp-gray-700">
          Artikel ini merupakan arsip tulisan Jejak Perupa tahun 2017 yang telah
          diselaraskan dengan standar tata rupa dan metadata terbaru.
        </p>
      </div>
    </div>
  );

  return (
    <ArticleDetailTemplate
      header={headerContent}
      content={mainContent}
      sidebar={sidebarContent}
    />
  );
}
