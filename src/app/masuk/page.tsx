"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MainPublicLayout } from "@/components/templates/MainPublicLayout";
import { Heading1, Heading2, Paragraph, SectionLabel } from "@/components/atoms/Typography";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { PeruChanCallout } from "@/components/molecules/PeruChanCallout";
import { useAuth } from "@/lib/auth";
import {
  ArrowRight,
  UserCheck,
  ShieldCheck,
  Mail,
  Lock,
  User,
  Building,
  AlertCircle,
  LogIn,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, loginWithDemo } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      if (res.user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      setErrorMsg(res.error || "Gagal masuk. Periksa kembali email dan kata sandi.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    const res = await register(name, email, password, institution);
    setLoading(false);
    if (res.success) {
      router.push("/dashboard");
    } else {
      setErrorMsg(res.error || "Pendaftaran gagal. Periksa data yang Anda masukkan.");
    }
  };

  const handleDemoLogin = (userKey: "pelajar" | "kurator") => {
    loginWithDemo(userKey);
    if (userKey === "kurator") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <MainPublicLayout>
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 lg:py-24 font-sans">
        <div className="grid gap-12 lg:grid-cols-[1fr_460px] items-center">
          {/* LEFT EDITORIAL HERO */}
          <div className="space-y-6">
            <SectionLabel>Portal Autentikasi Jejak Perupa</SectionLabel>

            <Heading1 className="text-4xl sm:text-5xl text-jp-ink leading-tight">
              Selamat Datang di
              <br />
              <span className="text-jp-blue-900">Jejak Perupa</span>
            </Heading1>

            <Paragraph className="max-w-xl text-base md:text-lg text-jp-gray-700 leading-relaxed font-prose">
              Masuk untuk menyimpan artikel pilihan, melacak progres jalur belajar
              mandiri, mengakses evaluasi kuis, atau mengirimkan draf naskah bab
              ke meja redaksi kurator.
            </Paragraph>

            <div className="pt-4 max-w-lg">
              <PeruChanCallout
                title="Catatan dari Peru-Chan"
                theme="blue"
                iconType="sparkles"
              >
                <p>
                  Belajar seni rupa itu tentang ketekunan dan apresiasi. Dengan memiliki akun, seluruh catatan riset dan bookmark karyamu akan tersimpan rapi!
                </p>
              </PeruChanCallout>
            </div>
          </div>

          {/* RIGHT LOGIN / REGISTER CARD (ROUNDED-XL) */}
          <div className="rounded-xl border border-jp-gray-300 bg-white p-8 md:p-10 shadow-2xs space-y-6">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-jp-blue-900 font-heading font-extrabold text-white text-sm shadow-2xs">
                JP
              </div>
              <Heading2 className="mt-4 text-2xl text-jp-ink">
                {activeTab === "login" ? "Masuk ke Akun" : "Daftar Akun Baru"}
              </Heading2>
              <p className="mt-1 text-xs text-jp-gray-500 font-prose">
                {activeTab === "login"
                  ? "Masukkan email dan kata sandi yang telah terdaftar."
                  : "Buat akun gratis untuk mulai menyimpan riwayat belajar seni."}
              </p>
            </div>

            {/* TAB SWITCHER */}
            <div className="grid grid-cols-2 rounded-lg border border-jp-gray-200 bg-jp-paper p-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setErrorMsg("");
                }}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-bold transition cursor-pointer",
                  activeTab === "login"
                    ? "bg-white text-jp-blue-900 shadow-2xs"
                    : "text-jp-gray-600 hover:text-jp-ink"
                )}
              >
                <LogIn className="h-3.5 w-3.5" />
                Masuk
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("register");
                  setErrorMsg("");
                }}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-md py-2 text-xs font-bold transition cursor-pointer",
                  activeTab === "register"
                    ? "bg-white text-jp-blue-900 shadow-2xs"
                    : "text-jp-gray-600 hover:text-jp-ink"
                )}
              >
                <UserPlus className="h-3.5 w-3.5" />
                Daftar Akun
              </button>
            </div>

            {/* ERROR NOTIFICATION */}
            {errorMsg && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* FORM BODY */}
            {activeTab === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-jp-blue-700" />
                    Alamat Email
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-jp-blue-700" />
                    Kata Sandi
                  </label>
                  <Input
                    type="password"
                    required
                    placeholder="Masukkan kata sandi..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-2.5 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Memverifikasi..." : "Masuk Sekarang"}
                  {!loading && <ArrowRight className="h-4 w-4 ml-1.5" />}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-jp-blue-700" />
                    Nama Lengkap
                  </label>
                  <Input
                    type="text"
                    required
                    placeholder="Contoh: Raden Ayu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-jp-blue-700" />
                    Alamat Email
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-jp-blue-700" />
                    Institusi / Status (Opsional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Contoh: Mahasiswa ISI Yogyakarta / Umum"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-jp-ink flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-jp-blue-700" />
                    Kata Sandi (Minimal 8 Karakter)
                  </label>
                  <Input
                    type="password"
                    required
                    placeholder="Minimal 8 karakter..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-2.5 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Mendaftarkan..." : "Daftar Akun Baru"}
                  {!loading && <ArrowRight className="h-4 w-4 ml-1.5" />}
                </Button>
              </form>
            )}

            {/* SEPARATOR */}
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-jp-gray-200" />
              <span className="absolute bg-white px-3 text-[11px] text-jp-gray-400 font-bold uppercase tracking-wider">
                atau akses uji coba
              </span>
            </div>

            {/* QUICK DEMO SWITCHER */}
            <div className="space-y-2 rounded-lg border border-jp-blue-100 bg-jp-blue-50/60 p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-jp-blue-700">
                1-Klik Akun Uji Coba Pembelajar:
              </span>

              <button
                type="button"
                onClick={() => handleDemoLogin("pelajar")}
                className="w-full flex items-center justify-between rounded-lg bg-white p-3 text-left border border-jp-blue-200 hover:border-jp-blue-700 hover:shadow-xs transition cursor-pointer group"
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
                <Badge variant="blue" size="sm">Coba Masuk →</Badge>
              </button>
            </div>
          </div>
        </div>
      </section>
    </MainPublicLayout>
  );
}
