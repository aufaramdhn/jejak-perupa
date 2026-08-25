"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Galat Kritis Global:", error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-[#191918] p-6 text-center font-sans">
        <div className="max-w-md w-full space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DCEBFF] text-[#173B63]">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <div>
            <h1 className="text-2xl font-bold font-serif text-[#173B63]">
              Terjadi Gangguan pada Sistem
            </h1>
            <p className="mt-2 text-sm text-[#73736D]">
              Aplikasi mengalami kendala tak terduga. Silakan muat ulang halaman.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-lg bg-[#173B63] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#285A91] transition cursor-pointer"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Muat Ulang Halaman
          </button>
        </div>
      </body>
    </html>
  );
}
