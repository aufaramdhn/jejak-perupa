"use client";

import React, { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/templates/admin/AdminLayout";
import { Heading2, Paragraph } from "@/components/atoms/typography/Typography";
import { Badge } from "@/components/atoms/typography/Badge";
import { Button } from "@/components/atoms/form/Button";
import { Input } from "@/components/atoms/form/Input";
import { Select } from "@/components/atoms/form/Select";
import { TablePagination } from "@/components/molecules/navigation/TablePagination";
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
  RotateCcw,
  Palette,
} from "lucide-react";

export default function AdminSenimanPage() {
  const { alert } = useModal();
  const initialArtists = artService.getAllArtists();

  const [artistsList, setArtistsList] = useState(initialArtists);
  const [searchQuery, setSearchQuery] = useState("");
  const [movementFilter, setMovementFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
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
      setCurrentPage(1);
    });
  };

  const handleMovementChange = (val: string) => {
    startTransition(() => {
      setMovementFilter(val);
      setCurrentPage(1);
    });
  };

  const handleResetFilters = () => {
    startTransition(() => {
      setSearchQuery("");
      setMovementFilter("ALL");
      setCurrentPage(1);
    });
  };

  const isFiltered = searchQuery.trim() !== "" || movementFilter !== "ALL";

  const movementOptions = useMemo(() => {
    const movements = Array.from(new Set(artistsList.map((a) => a.artMovement)));
    return [
      { value: "ALL", label: "Semua Aliran Seni" },
      ...movements.map((m) => ({ value: m, label: m })),
    ];
  }, [artistsList]);

  const filteredArtists = useMemo(() => {
    return artistsList.filter((art) => {
      const matchSearch =
        art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.artMovement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.shortBio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.originCity.toLowerCase().includes(searchQuery.toLowerCase());
      const matchMovement =
        movementFilter === "ALL" || art.artMovement.toLowerCase() === movementFilter.toLowerCase();
      return matchSearch && matchMovement;
    });
  }, [artistsList, searchQuery, movementFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredArtists.length / pageSize));

  const paginatedArtists = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArtists.slice(start, start + pageSize);
  }, [filteredArtists, currentPage, pageSize]);

  return (
    <AdminLayout
      title="Direktori Maestro Seni Rupa"
      subtitle="Basis data profil pelopor, biografi sejarah, lini masa peristiwa, dan katalog karya representatif."
      actionButton={
        <Button
          variant="primary"
          size="md"
          onClick={() =>
            alert({
              title: "Tambah Maestro Baru",
              message: "Formulir pendaftaran entri maestro baru sedang dalam pengembangan kuratorial.",
              type: "info",
            })
          }
          className="rounded-lg text-xs sm:text-sm font-bold w-full sm:w-auto py-2.5 px-4 h-10 shadow-xs cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-1.5" />
          Tambah Data Maestro
        </Button>
      }
    >
      <div className="space-y-6 font-sans">
        {/* SEARCH & FILTER TOOLBAR */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jp-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari nama maestro, kota asal, atau aliran seni..."
              className="pl-10 text-xs rounded-lg w-full"
            />
          </div>

          <div className="w-full md:w-56">
            <Select
              options={movementOptions}
              value={movementFilter}
              onChange={handleMovementChange}
              placeholder="Pilih Aliran Seni"
              isSearchable={false}
              className="text-xs"
            />
          </div>

          {isFiltered && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="rounded-lg text-xs font-bold text-red-600 border-red-200 hover:bg-red-50 shrink-0 h-9"
              title="Reset Filter"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset Filter
            </Button>
          )}

          <div className="font-mono text-xs text-jp-gray-500 shrink-0 md:ml-auto">
            {filteredArtists.length} dari {artistsList.length} Maestro
          </div>
        </div>

        {/* ARTISTS LIST WITH SKELETON */}
        {(isLoading || isPending) ? (
          <AdminTableSkeleton rows={5} columns={6} />
        ) : filteredArtists.length === 0 ? (
          <div className="rounded-xl border border-dashed border-jp-gray-300 bg-white p-12 text-center text-jp-gray-500">
            <p className="font-semibold text-sm">Tidak ada profil maestro yang cocok dengan pencarian.</p>
            {isFiltered && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="mt-3 rounded-lg text-xs"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                Reset Filter
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* MOBILE & TABLET CARD VIEW (<= 768px) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {paginatedArtists.map((art, idx) => {
                const globalIdx = (currentPage - 1) * pageSize + idx;
                return (
                  <div
                    key={art.id}
                    className="flex flex-col justify-between rounded-xl border border-jp-gray-300 bg-white p-4 shadow-2xs hover:border-jp-brown-700 transition"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-jp-gray-400 bg-jp-paper px-2 py-0.5 rounded border border-jp-gray-200">
                          #{globalIdx + 1}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap justify-end">
                          <Badge variant="brown" size="sm">
                            {art.artMovement}
                          </Badge>
                          <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 border border-green-200 font-mono">
                            <CheckCircle className="h-2.5 w-2.5" />
                            Terverifikasi
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-jp-ink text-sm leading-snug font-heading">
                          {art.name}
                        </h3>
                        <div className="mt-0.5 font-mono text-[11px] text-jp-gray-500">
                          {art.birthYear} - {art.deathYear || "Sekarang"} · {art.originCity}
                        </div>
                        <p className="mt-2 text-xs text-jp-gray-600 font-prose line-clamp-2 leading-relaxed">
                          {art.shortBio}
                        </p>
                      </div>

                      <div className="text-xs text-jp-gray-500 font-mono">
                        <span className="text-jp-gray-400">Disiplin:</span> {art.studioDiscipline}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-jp-gray-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-jp-gray-400 font-medium">Aksi Profil</span>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/seniman/${art.slug}`}
                          target="_blank"
                          title="Lihat Profil Publik"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            alert({
                              title: "Sunting Profil Maestro",
                              message: `Fitur penyuntingan langsung untuk ${art.name} sedang dalam penyelarasan arsip.`,
                              type: "info",
                            })
                          }
                          title="Sunting Data"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition cursor-pointer"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP FULL TABLE VIEW (> 768px) */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-jp-gray-300 bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-jp-gray-300 bg-jp-paper/80 font-mono text-[11px] font-bold uppercase tracking-wider text-jp-gray-600">
                      <th className="py-3.5 px-4 w-12 text-center">No</th>
                      <th className="py-3.5 px-4">Nama Seniman & Masa Hidup</th>
                      <th className="py-3.5 px-4 min-w-[200px] w-56">Gaya / Aliran</th>
                      <th className="py-3.5 px-4 w-36">Disiplin</th>
                      <th className="py-3.5 px-4 w-28 text-center">Status</th>
                      <th className="py-3.5 px-4 w-28 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-jp-gray-200 text-xs">
                    {paginatedArtists.map((art, idx) => {
                      const globalIdx = (currentPage - 1) * pageSize + idx;
                      return (
                        <tr
                          key={art.id}
                          className="hover:bg-jp-blue-50/30 transition-colors"
                        >
                          <td className="py-4 px-4 font-mono text-center font-bold text-jp-gray-400">
                            {globalIdx + 1}
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-bold text-jp-ink text-sm font-heading">
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
                            <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-700 border border-green-200 font-mono">
                              <CheckCircle className="h-3 w-3" />
                              Terverifikasi
                            </span>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/seniman/${art.slug}`}
                                target="_blank"
                                title="Lihat Profil Publik"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                              <button
                                type="button"
                                onClick={() =>
                                  alert({
                                    title: "Sunting Profil Maestro",
                                    message: `Fitur penyuntingan langsung untuk ${art.name} sedang dalam penyelarasan arsip.`,
                                    type: "info",
                                  })
                                }
                                title="Sunting Data"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-jp-gray-200 bg-white text-jp-gray-600 hover:text-jp-blue-900 hover:border-jp-blue-700 transition cursor-pointer"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* UNIFIED RESPONSIVE PAGINATION */}
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredArtists.length}
              onPageChange={setCurrentPage}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setCurrentPage(1);
              }}
              itemName="maestro"
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
