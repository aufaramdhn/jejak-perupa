/**
 * In-Memory Sliding Window Rate Limiter
 * Digunakan untuk membatasi frekuensi percobaan aksi kritis (Login, Register, Submit Form, API)
 * guna mencegah brute-force dan DoS abuse.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Bersihkan rekaman yang sudah kedaluwarsa secara berkala
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      const validTimestamps = record.timestamps.filter((t) => now - t < 120000);
      if (validTimestamps.length === 0) {
        rateLimitStore.delete(key);
      } else {
        record.timestamps = validTimestamps;
      }
    }
  }, 60000);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInSeconds: number;
}

/**
 * Memeriksa apakah sebuah aksi diizinkan berdasarkan kunci identifikasi (IP / Email / Action ID)
 *
 * @param key Kunci unik (contoh: "login:user@email.com" atau "ip:127.0.0.1")
 * @param limit Jumlah batas percobaan maksimal dalam kurun waktu tertentu
 * @param windowMs Durasi jendela waktu dalam milidetik (default: 60 detik)
 */
export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 60000
): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(key) || { timestamps: [] };

  // Filter hanya timestamp yang masih berada dalam windowMs
  const validTimestamps = record.timestamps.filter((t) => now - t < windowMs);

  if (validTimestamps.length >= limit) {
    const oldestTimestamp = validTimestamps[0];
    const resetInSeconds = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1000));

    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
    };
  }

  // Tambahkan timestamp saat ini
  validTimestamps.push(now);
  rateLimitStore.set(key, { timestamps: validTimestamps });

  return {
    allowed: true,
    remaining: limit - validTimestamps.length,
    resetInSeconds: Math.ceil(windowMs / 1000),
  };
}
