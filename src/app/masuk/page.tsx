"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { Heading1, Heading2, Paragraph, SectionLabel } from "@/components/atoms/Typography";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { PeruChanCallout } from "@/components/molecules/PeruChanCallout";
import { useAuth } from "@/lib/auth";
import { ArrowRight, UserCheck, ShieldCheck, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login("pelajar");
    router.push("/dashboard");
  };

  const handleDemoLogin = (userKey: "pelajar" | "kurator") => {
    login(userKey);
    if (userKey === "kurator") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <MainPublicLayout>
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_440px] items-center">
          {/* LEFT EDITORIAL HERO */}
          <div className="space-y-6">
            <SectionLabel>Portal Masuk Pembelajar & Kurator</SectionLabel>

            <Heading1 className="text-4xl sm:text-5xl text-jp-ink leading-tight">
              Selamat Datang di
              <br />
              <span className="text-jp-blue-900">Jejak Perupa</span>
            </Heading1>

            <Paragraph className="max-w-xl text-base md:text-lg text-jp-gray-700 leading-relaxed font-prose">
              Masuk untuk menyimpan artikel pilihan, melacak progres jalur belajar
              mandiri, mengakses evaluasi kuis, atau mengirimkan draf tulisan
              seni ke meja redaksi.
            </Paragraph>

            <div className="pt-4 max-w-lg">
              <PeruChanCallout
                title="Catatan dari Peru-Chan"
                theme="blue"
                iconType="sparkles"
              >
                <p>
                  Belajar seni rupa itu tentang konsistensi. Akun belajarmu akan
                  menyimpan seluruh catatan dan bookmark karya agar mudah diakses
                  kapan saja!
                </p>
              </PeruChanCallout>
            </div>
          </div>

          {/* RIGHT LOGIN CARD (ROUNDED-XL) */}
          <div className="rounded-xl border border-jp-gray-300 bg-white p-8 md:p-10 shadow-2xs space-y-8 font-sans">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-jp-blue-900 font-heading font-extrabold text-white text-sm">
                JP
              </div>
              <Heading2 className="mt-4 text-2xl text-jp-ink">Masuk ke Akun</Heading2>
              <p className="mt-1 text-xs text-jp-gray-500">
                Pilih metode masuk yang kamu kehendaki di bawah ini.
              </p>
            </div>

            {/* QUICK DEMO SWITCHER */}
            <div className="space-y-3 rounded-lg border border-jp-blue-100 bg-jp-blue-50/60 p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-jp-blue-700">
                Akses Cepat (Akun Demo Interaktif):
              </span>

              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin("pelajar")}
                  className="flex items-center justify-between rounded-lg bg-white p-3 text-left border border-jp-blue-200 hover:border-jp-blue-700 hover:shadow-xs transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <UserCheck className="h-4 w-4 text-jp-blue-700" />
                    <div>
                      <div className="text-xs font-bold text-jp-ink group-hover:text-jp-blue-900">
                        Raden Wijaya
                      </div>
                      <div className="text-[10px] text-jp-gray-500">
                        Pelajar Seni Murni (ISI)
                      </div>
                    </div>
                  </div>
                  <Badge variant="blue" size="sm">Masuk →</Badge>
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin("kurator")}
                  className="flex items-center justify-between rounded-lg bg-white p-3 text-left border border-jp-brown-200 hover:border-jp-brown-700 hover:shadow-xs transition cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-jp-brown-700" />
                    <div>
                      <div className="text-xs font-bold text-jp-ink group-hover:text-jp-brown-900">
                        Siti Nurhaliza
                      </div>
                      <div className="text-[10px] text-jp-gray-500">
                        Kurator Editorial (Admin)
                      </div>
                    </div>
                  </div>
                  <Badge variant="brown" size="sm">Masuk →</Badge>
                </button>
              </div>
            </div>

            {/* SEPARATOR */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-jp-gray-200" />
              <span className="absolute bg-white px-3 text-xs text-jp-gray-400 font-medium uppercase">
                atau via email
              </span>
            </div>

            {/* EMAIL FORM */}
            <form onSubmit={handleCustomLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-jp-gray-700">
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jp-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full rounded-lg border border-jp-gray-300 bg-jp-paper pl-10 pr-4 py-2.5 text-sm text-jp-ink focus:border-jp-blue-700 focus:ring-2 focus:ring-jp-blue-100 outline-none"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="md" className="w-full rounded-lg">
                Kirim Tautan Masuk Ajaib (Magic Link)
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </form>

            <div className="text-center text-xs text-jp-gray-500">
              Belum memiliki akun? Masuk melalui salah satu akun demo di atas untuk langsung menjelajah fitur.
            </div>
          </div>
        </div>
      </section>
    </MainPublicLayout>
  );
}
