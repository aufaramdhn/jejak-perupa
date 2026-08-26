export interface MascotPoseOption {
  src: string;
  label: string;
  shortLabel: string;
}

export const officialMascotPoses: MascotPoseOption[] = [
  {
    src: "/images/mascot/peruchan-drawing.png",
    label: "Menggambar & Praktik Studio",
    shortLabel: "Drawing",
  },
  {
    src: "/images/mascot/peruchan-investigate.png",
    label: "Meneliti & Telaah Kuratorial",
    shortLabel: "Investigate",
  },
  {
    src: "/images/mascot/peruchan-reading.png",
    label: "Membaca & Sejarah Seni",
    shortLabel: "Reading",
  },
  {
    src: "/images/mascot/peruchan-excited.png",
    label: "Semangat & Motivasi Belajar",
    shortLabel: "Excited",
  },
];

export const quoteCategoryPresets: string[] = [
  "Catatan Santai Peru-Chan",
  "Telaah Kuratorial Maestro",
  "Laboratorium Studio Seni",
  "Dialektika Sejarah Seni",
  "Tips Apresiasi Karya",
  "Fakta Menarik Seni Rupa",
];

export type SettingsTabId = "slideshow" | "quotes" | "branding" | "editorial" | "pillars";
