# Jejak Perupa : Platform Pembelajaran Seni Rupa

Platform edukasi, dokumentasi arsip, dan apresiasi seni rupa Indonesia dengan maskot resmi Peru-Chan ("Belajar seni, meninggalkan jejak.").

---

## Struktur Direktori

```text
.
├── docs/                        # Dokumentasi Perencanaan, Arsitektur, Keamanan, dan Pelacakan Tugas
│   ├── prd.md                   # Product Requirements Document (Visi, Personas, Roadmap Fase 1-4, KPIs)
│   ├── system-design.md         # System Design (Next.js 16, ERD Database, Atomic Design, ISR, FTS)
│   ├── tech.md                  # Spesifikasi dan Komparasi Tech Stack (Next.js 16, Vercel, Supabase)
│   ├── setup.md                 # Panduan Setup Lokal, Database Migration, dan Deploy Vercel
│   ├── rules.md                 # Standar Rekayasa Perangkat Lunak dan Struktur Atomic Design
│   ├── security.md              # Spesifikasi Arsitektur Keamanan dan Standar OWASP 2025/2026
│   └── task.md                  # Matriks Ceklis Tugas dan Status Progres Pengerjaan
├── prototype/                   # Desain Prototype HTML dan Styling Awal
│   ├── index.html               # Halaman Beranda (Landing Page)
│   └── artikel/
│       └── seni-rupa-murni.html # Halaman Detail Artikel
├── src/
│   ├── app/                     # Rute Next.js 16 App Router (Artikel, Seniman, Kamus, Jalur Belajar, Agenda, Komunitas, Admin, Dashboard)
│   ├── components/              # Komponen Reusable Atomic Design (Atoms, Molecules, Organisms, Templates)
│   └── lib/                     # Utilitas, Data Repository, dan Art Service Layer
├── prisma/
│   └── schema.prisma            # Skema Relasional Basis Data (16 Model Entitas)
├── AGENTS.md                    # Aturan AI dan Konvensi Kode Proyek
├── GEMINI.md                    # Aturan Konfigurasi Gemini / IDE
└── README.md
```

---

## Akses Dokumen

- [Product Requirements Document (PRD)](docs/prd.md)
- [System Design and Database Schema](docs/system-design.md)
- [Tech Stack and Brainstorming Guide](docs/tech.md)
- [Setup and Deployment Guide](docs/setup.md)
- [Engineering Rules and Atomic Design Standards](docs/rules.md)
- [Security Architecture and OWASP Standards](docs/security.md)
- [Matriks Tugas dan Ceklis Progres](docs/task.md)
- [Prototype Preview (HTML)](prototype/index.html)
