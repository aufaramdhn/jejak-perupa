"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/Typography";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import {
  X,
  LogIn,
  UserPlus,
  Lock,
  Mail,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AuthModal() {
  const { modalOpen, modalMsg, closeAuthModal, login, register, loginWithDemo } =
    useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!modalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || "Gagal masuk. Periksa kembali email dan kata sandi.");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    const res = await register(name, email, password, institution);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || "Pendaftaran gagal. Mohon periksa kembali data Anda.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200 font-sans">
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-jp-gray-200 bg-jp-paper px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-jp-blue-900 text-white shadow-2xs">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-jp-blue-700">
                Akses Ruang Belajar Seni
              </span>
              <Heading2 className="text-base text-jp-ink mt-0.5">
                {activeTab === "login" ? "Masuk ke Akun Anda" : "Pendaftaran Akun Baru"}
              </Heading2>
            </div>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-jp-gray-500 hover:bg-white hover:text-jp-ink transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* CONTEXTUAL NOTICE FROM PERU-CHAN */}
        <div className="border-b border-jp-blue-100 bg-jp-blue-50/70 px-6 py-3 text-xs text-jp-blue-900 font-prose leading-relaxed">
          {modalMsg}
        </div>

        {/* TAB SWITCHER */}
        <div className="grid grid-cols-2 border-b border-jp-gray-200 bg-jp-paper/40 p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setErrorMsg("");
            }}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition cursor-pointer",
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
              "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition cursor-pointer",
              activeTab === "register"
                ? "bg-white text-jp-blue-900 shadow-2xs"
                : "text-jp-gray-600 hover:text-jp-ink"
            )}
          >
            <UserPlus className="h-3.5 w-3.5" />
            Daftar Akun
          </button>
        </div>

        {/* FORM BODY */}
        <div className="overflow-y-auto p-6 space-y-5">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

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
                {loading ? "Memproses Masuk..." : "Masuk Sekarang"}
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
                  placeholder="Buat kata sandi minimal 8 karakter..."
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
                {loading ? "Mendaftarkan Akun..." : "Daftar Akun Baru"}
              </Button>
            </form>
          )}

          {/* DEMO ACCOUNTS QUICK SHORTCUT */}
          <div className="pt-4 border-t border-jp-gray-200 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-jp-gray-500 text-center">
              Atau Uji Coba Cepat dengan Akun Demo:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loginWithDemo("pelajar")}
                className="flex items-center justify-center gap-1 rounded-lg border border-jp-blue-200 bg-jp-blue-50/70 p-2 text-xs font-bold text-jp-blue-900 hover:bg-jp-blue-100 transition cursor-pointer"
              >
                <User className="h-3.5 w-3.5 text-jp-blue-700" />
                Demo Pelajar
              </button>
              <button
                type="button"
                onClick={() => loginWithDemo("kurator")}
                className="flex items-center justify-center gap-1 rounded-lg border border-jp-brown-200 bg-jp-brown-50/70 p-2 text-xs font-bold text-jp-brown-900 hover:bg-jp-brown-100 transition cursor-pointer"
              >
                <Building className="h-3.5 w-3.5 text-jp-brown-700" />
                Demo Kurator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
