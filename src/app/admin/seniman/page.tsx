"use client";

import React, { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Heading2, Heading3, Paragraph } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { AdminTableSkeleton } from "@/components/organisms/admin/AdminTableSkeleton";
import { artService } from "@/lib/services/artService";
import { useModal } from "@/lib/modalContext";
import {
  Users,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle,
  Plus,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSenimanPage() {
  const { alert } = useModal();
  const initialArtists = artService.getAllArtists();

  const [artistsList, setArtistsList] = useState(initialArtists);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (q: string) => {
    startTransition(() => {
      setSearchQuery(q);
    });
  };

  const filteredArtists = useMemo(() => {
    return artistsList.filter((art) => {
      const matchSearch =
        art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.artMovement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.shortBio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.originCity.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
  }, [artistsList, searchQuery]);

  return (
    <AdminLayout
      title="Direktori Maestro Seni Rupa"
      subtitle="Basis data profil pelopor, biografi sejarah, lini masa peristiwa, dan katalog karya representatif."
      actionButton={
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            alert({
              title: "Tambah Maestro Baru",
              message: "Formulir pendaftaran entri maestro baru sedang dalam pengembangan kuratorial.",
              type: "info",
            })
          }
          className="rounded-lg"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Tambah Data Maestro
        </Button>
      }
    >
      <div className="space-y-6 font-sans">
        {/* SEARCH BAR */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jp-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari nama maestro atau aliran seni..."
              className="w-full rounded-lg border border-jp-gray-300 bg-white pl-9 pr-4 py-2 text-xs text-jp-ink focus:border-jp-blue-700 outline-none"
            />
          </div>

          <div className="font-mono text-xs text-jp-gray-500">
            Total {artistsList.length} Maestro Terdata
          </div>
        </div>

        {/* ARTISTS TABLE WITH IN-SITU SKELETON */}
        {(isLoading || isPending) ? (
          <AdminTableSkeleton rows={5} columns={6} />
        ) : (
          <div className="overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-jp-gray-300 bg-jp-paper/80 font-mono text-[11px] font-bold uppercase tracking-wider text-jp-gray-600">
                    <th className="py-3.5 px-4 w-12 text-center">No</th>
                    <th className="py-3.5 px-4">Nama Seniman & Masa Hidup</th>
                    <th className="py-3.5 px-4 w-44">Gaya / Aliran</th>
                    <th className="py-3.5 px-4 w-32">Karya Terdata</th>
                    <th className="py-3.5 px-4 w-28 text-center">Status</th>
                    <th className="py-3.5 px-4 w-28 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-jp-gray-200 text-xs">
                  {filteredArtists.length > 0 ? (
                    filteredArtists.map((art, idx) => (
                      <tr
                        key={art.id}
                        className="hover:bg-jp-blue-50/30 transition-colors"
                      >
                        <td className="py-4 px-4 font-mono text-center font-bold text-jp-gray-400">
                          {idx + 1}
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-jp-ink text-sm">
                            {art.name}
                          </div>
                          <div className="font-mono text-[11px] text-jp-gray-500">
                            {art.birthYear} - {art.deathYear || "Sekarang"} · {art.originCity}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <Badge variant="brown" size="sm">
                            {art.artMovement}
                          </Badge>
                        </td>

                        <td className="py-4 px-4 font-mono text-xs text-jp-gray-700">
                          {art.studioDiscipline}
                        </td>

                        <td className="py-4 px-4 text-center">
                          <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-700 border border-green-200">
                            <CheckCircle className="h-3 w-3" />
                            Terverifikasi
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/seniman/${art.slug}`}
                              target="_blank"
                              title="Buka Profil Publik"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-12 text-center text-xs text-jp-gray-500"
                      >
                        Tidak ada seniman yang sesuai dengan pencarian.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-jp-gray-200 bg-jp-paper/40 px-4 py-3 text-xs text-jp-gray-500 font-mono">
              <span>
                Menampilkan {filteredArtists.length} dari {artistsList.length} maestro
              </span>
              <span>Direktori Seni Rupa Modern Indonesia</span>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
