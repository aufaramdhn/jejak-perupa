export interface AgendaEventData {
  id: string;
  title: string;
  slug: string;
  eventType: "Pameran" | "Workshop" | "Diskusi" | "Open Call";
  organizer: string;
  startDate: string;
  endDate: string;
  venueName: string;
  city: string;
  description: string;
  registrationUrl?: string;
  coverUrl?: string;
}

export const agendaEventsData: AgendaEventData[] = [
  {
    id: "evt-1",
    title: "Retrospeksi Jejak Romantisisme: Dialog Lintas Abad",
    slug: "retrospeksi-jejak-romantisisme",
    eventType: "Pameran",
    organizer: "Galeri Nasional Indonesia",
    startDate: "15 September 2026",
    endDate: "30 Oktober 2026",
    venueName: "Gedung A, Galeri Nasional Indonesia",
    city: "Jakarta Pusat",
    description: "Pameran kuratorial yang mempertemukan arsip mahakarya Raden Saleh dengan respons karya instalasi seniman muda kontemporer.",
    registrationUrl: "https://galeri-nasional.or.id",
  },
  {
    id: "evt-2",
    title: "Lokakarya Cetak Tinggi: Seni Cukil Kayu Nusantara",
    slug: "lokakarya-cetak-tinggi-cukil-kayu",
    eventType: "Workshop",
    organizer: "Studio Grafis Minggiran",
    startDate: "05 Oktober 2026",
    endDate: "06 Oktober 2026",
    venueName: "Studio Grafis Minggiran",
    city: "Yogyakarta",
    description: "Praktik langsung eksplorasi teknik cukil kayu (woodcut) di atas papan MDF bersama pegiat seni grafis senior.",
    registrationUrl: "#",
  },
  {
    id: "evt-3",
    title: "Simposium Terbuka: Membaca Arah Seni Rupa Kontemporer",
    slug: "simposium-terbuka-seni-kontemporer",
    eventType: "Diskusi",
    organizer: "Komunitas Salihara",
    startDate: "20 Oktober 2026",
    endDate: "20 Oktober 2026",
    venueName: "Teater Salihara",
    city: "Jakarta Selatan",
    description: "Diskusi kritis bersama kurator dan akademisi mengenai dampak kecerdasan buatan terhadap orisinalitas proses kreatif perupa.",
    registrationUrl: "#",
  },
];
