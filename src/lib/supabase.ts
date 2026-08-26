import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      supabaseUrl.startsWith("http") &&
      !supabaseUrl.includes("your-project")
  );
};

export const supabase = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

export const DEFAULT_MEDIA_BUCKET = "jejak-perupa-media";

/**
 * Mengunggah file gambar ke Supabase Storage dan mengembalikan URL publik permanen.
 * @param file Berkas gambar File dari input browser
 * @param folder Subfolder penyimpanan (misal: "branding", "articles", "artworks", "mascot")
 * @param bucket Nama bucket Supabase Storage (default: "jejak-perupa-media")
 * @returns Promise<string> URL publik CDN gambar
 */
export async function uploadImageToSupabase(
  file: File,
  folder: string = "uploads",
  bucket: string = DEFAULT_MEDIA_BUCKET
): Promise<string> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase belum dikonfigurasi. Harap isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY pada file .env.local atau Vercel Environment Variables."
    );
  }

  const cleanFileName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, "-")
    .replace(/-+/g, "-");
  const fileExt = cleanFileName.split(".").pop() || "png";
  const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  const filePath = `${folder}/${uniqueId}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "31536000",
      upsert: false,
    });

  if (uploadError) {
    console.error("Supabase Storage Upload Error:", uploadError);
    throw new Error(`Gagal mengunggah gambar ke Supabase: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  if (!data?.publicUrl) {
    throw new Error("Gagal memperoleh URL publik gambar dari Supabase Storage.");
  }

  return data.publicUrl;
}
