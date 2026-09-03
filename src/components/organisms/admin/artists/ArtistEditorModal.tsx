"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/atoms/feedback/Modal";
import { Input } from "@/components/atoms/form/Input";
import { Select } from "@/components/atoms/form/Select";
import { Button } from "@/components/atoms/form/Button";
import { ImageDualInput } from "@/components/molecules/editor/ImageDualInput";
import { ArtistData } from "@/lib/data/artists";
import { Palette, User, MapPin, Calendar, BookOpen, Sparkles, Save } from "lucide-react";

export interface ArtistEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  artist?: ArtistData | null;
  onSave: (artistData: ArtistData) => void;
}

const COMMON_MOVEMENTS = [
  "Romantisisme",
  "Ekspresionisme",
  "Realisme Baru",
  "Persagi & Revolusi",
  "Modernisme Indonesia",
  "Kubisme Nusantara",
  "Surealisme",
  "Seni Kontemporer & Kiwari",
];

const COMMON_DISCIPLINES = [
  "Seni Lukis & Cat Minyak",
  "Seni Lukis Impasto",
  "Seni Lukis Realis",
  "Seni Patung & Instalasi",
  "Seni Grafis & Cukil Kayu",
  "Seni Keramik Studio",
  "Eksplorasi Media Campuran",
];

export function ArtistEditorModal({
  isOpen,
  onClose,
  artist,
  onSave,
}: ArtistEditorModalProps) {
  const isEditing = Boolean(artist);

  const [name, setName] = useState("");
  const [artMovement, setArtMovement] = useState("Ekspresionisme");
  const [studioDiscipline, setStudioDiscipline] = useState("Seni Lukis & Cat Minyak");
  const [originCity, setOriginCity] = useState("");
  const [birthYear, setBirthYear] = useState<number>(1920);
  const [deathYear, setDeathYear] = useState<string>("");
  const [shortBio, setShortBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (artist) {
      setName(artist.name);
      setArtMovement(artist.artMovement || "Ekspresionisme");
      setStudioDiscipline(artist.studioDiscipline || "Seni Lukis & Cat Minyak");
      setOriginCity(artist.originCity || "");
      setBirthYear(artist.birthYear || 1920);
      setDeathYear(artist.deathYear ? artist.deathYear.toString() : "");
      setShortBio(artist.shortBio || "");
      setPhotoUrl(artist.photoUrl || "");
      setIsFeatured(artist.isFeatured || false);
    } else {
      setName("");
      setArtMovement("Ekspresionisme");
      setStudioDiscipline("Seni Lukis & Cat Minyak");
      setOriginCity("");
      setBirthYear(1920);
      setDeathYear("");
      setShortBio("");
      setPhotoUrl("");
      setIsFeatured(false);
    }
    setErrors({});
  }, [artist, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Nama seniman wajib diisi.";
    if (!originCity.trim()) newErrors.originCity = "Kota asal wajib diisi.";
    if (!shortBio.trim()) newErrors.shortBio = "Biografi ringkas wajib diisi.";
    if (!birthYear || birthYear < 1500) newErrors.birthYear = "Tahun lahir tidak valid.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const slug =
      artist?.slug ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-") ||
      `seniman-${Date.now()}`;

    const parsedDeath = deathYear.trim() !== "" ? parseInt(deathYear) : undefined;

    const payload: ArtistData = {
      id: artist?.id || `art-${Date.now()}`,
      name: name.trim(),
      slug,
      birthYear: Number(birthYear),
      deathYear: parsedDeath,
      originCity: originCity.trim(),
      artMovement,
      studioDiscipline,
      shortBio: shortBio.trim(),
      fullBiography: artist?.fullBiography || [shortBio.trim()],
      photoUrl: photoUrl.trim() || undefined,
      isFeatured,
      timelines: artist?.timelines || [],
      relatedArtists: artist?.relatedArtists || [],
    };

    onSave(payload);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
    >
      <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[85vh]">
        <div className="border-b border-jp-gray-200 pb-4">
          <h3 className="text-lg font-bold text-jp-ink font-heading">
            {isEditing ? `Sunting Maestro: ${artist?.name}` : "Tambah Profil Maestro Seni Rupa"}
          </h3>
          <p className="mt-1 text-xs text-jp-gray-500 font-prose">
            Lengkapi data kuratorial pelopor, aliran seni, asal daerah, serta biografi ringkas maestro.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 font-sans">
          <div className="space-y-4">
          {/* NAMA LENGKAP */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-jp-ink block uppercase tracking-wider">
              Nama Seniman / Maestro <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Contoh: Raden Saleh Sjarif Boestaman"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(errors.name)}
            />
            {errors.name && (
              <p className="text-[11px] text-red-600 font-sans">{errors.name}</p>
            )}
          </div>

          {/* ALIRAN SENI & DISIPLIN STUDIO */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-jp-ink block uppercase tracking-wider">
                Aliran / Gaya Seni
              </label>
              <Select
                value={artMovement}
                onChange={(val) => setArtMovement(val)}
                options={COMMON_MOVEMENTS.map((m) => ({ value: m, label: m }))}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-jp-ink block uppercase tracking-wider">
                Disiplin Studio
              </label>
              <Select
                value={studioDiscipline}
                onChange={(val) => setStudioDiscipline(val)}
                options={COMMON_DISCIPLINES.map((d) => ({ value: d, label: d }))}
              />
            </div>
          </div>

          {/* KOTA ASAL, TAHUN LAHIR & WAFAT */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-jp-ink block uppercase tracking-wider">
                Kota / Daerah Asal <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="Contoh: Semarang, Jawa Tengah"
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
                error={Boolean(errors.originCity)}
              />
              {errors.originCity && (
                <p className="text-[11px] text-red-600 font-sans">{errors.originCity}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-jp-ink block uppercase tracking-wider">
                Tahun Lahir <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                placeholder="1907"
                value={birthYear}
                onChange={(e) => setBirthYear(parseInt(e.target.value) || 1900)}
                error={Boolean(errors.birthYear)}
              />
              {errors.birthYear && (
                <p className="text-[11px] text-red-600 font-sans">{errors.birthYear}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-jp-ink block uppercase tracking-wider">
                Tahun Wafat (Opsional)
              </label>
              <Input
                type="number"
                placeholder="Kosongkan jika aktif"
                value={deathYear}
                onChange={(e) => setDeathYear(e.target.value)}
              />
            </div>
          </div>

          {/* FOTO PROFIL MAESTRO */}
          <div className="pt-2">
            <ImageDualInput
              label="Foto Potret Maestro"
              value={photoUrl}
              onChange={setPhotoUrl}
              placeholderUrl="https://images.unsplash.com/... atau URL foto"
              helperGuideline="Format PNG atau JPG dengan rasio potret 3:4 atau 1:1, ukuran maksimal 2 MB."
              previewClassName="h-20 w-20 rounded-xl"
            />
          </div>

          {/* BIOGRAFI RINGKAS */}
          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-jp-ink block uppercase tracking-wider">
              Biografi Ringkas & Kontribusi Seni <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan secara singkat kontribusi penting, bahasa rupa, serta pengaruh maestro dalam sejarah seni rupa Indonesia..."
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              className="w-full rounded-xl border border-jp-gray-300 p-3 text-xs md:text-sm font-prose text-jp-ink focus:border-jp-blue-700 focus:outline-none shadow-2xs"
            />
            {errors.shortBio && (
              <p className="text-[11px] text-red-600 font-sans">{errors.shortBio}</p>
            )}
          </div>

          {/* TOGGLE FEATURED */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-jp-gray-300 text-jp-blue-900 focus:ring-jp-blue-700"
            />
            <label htmlFor="isFeatured" className="text-xs font-semibold text-jp-ink cursor-pointer">
              Tampilkan sebagai Tokoh Maestro Unggulan di Beranda
            </label>
          </div>
        </div>

        {/* BUTTON ACTIONS */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-jp-gray-200">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="rounded-lg text-xs"
          >
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="rounded-lg text-xs font-bold"
          >
            <Save className="h-4 w-4 mr-1.5" />
            {isEditing ? "Simpan Perubahan Maestro" : "Tambah Maestro Baru"}
          </Button>
        </div>
      </form>
      </div>
    </Modal>
  );
}
