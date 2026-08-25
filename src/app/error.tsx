"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Heading1, Paragraph, SectionLabel } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/atoms/form/Button";
import { PeruChanCallout } from "@/components/molecules/peruchan/PeruChanCallout";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error secara internal (Audit Logging OWASP A09)
    console.error("Terjadi galat aplikasi:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-jp-paper px-6 py-16 text-center font-sans">
      <div className="max-w-2xl w-full space-y-8">
        {/* ICON */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-jp-brown-100 text-jp-brown-900 border border-jp-brown-200 shadow-2xs">
          <AlertTriangle className="h-8 w-8 text-jp-brown-700" />
        </div>

        <div>
          <SectionLabel className="text-jp-brown-700">
            Galat 500 / 502 : Kendala Komunikasi Server
          </SectionLabel>
          <Heading1 className="mt-3 text-jp-ink">
            Terjadi Kendala Teknis Sementara
          </Heading1>
          <Paragraph className="mt-4 max-w-lg mx-auto text-base text-jp-gray-700 leading-relaxed font-prose">
            Sistem kami sedang mengalami sedikit gangguan saat memproses data.
            Silakan coba muat ulang halaman ini dalam beberapa saat.
          </Paragraph>
          {error.digest && (
            <p className="mt-2 font-mono text-xs text-jp-gray-400">
              Kode Referensi: {error.digest}
            </p>
          )}
        </div>

        {/* PERU-CHAN CALLOUT */}
        <div className="text-left">
          <PeruChanCallout
            title="Catatan dari Peru-Chan"
            theme="brown"
            iconType="lightbulb"
          >
            <p>
              Kuas atau cat kadang bisa tumpah saat berkarya di studio. Tenang,
              tim teknis kami segera merapikan kembali server agar kamu bisa
              melanjutkan belajar!
            </p>
          </PeruChanCallout>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button variant="primary" size="md" className="rounded-lg" onClick={() => reset()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Coba Muat Ulang
          </Button>
          <Link href="/">
            <Button variant="outline" size="md" className="rounded-lg">
              <Home className="h-4 w-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
