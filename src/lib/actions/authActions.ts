"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import { checkRateLimit } from "@/lib/rateLimit";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  institution?: string;
  role?: "READER" | "ADMIN";
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    institution?: string | null;
    avatarUrl?: string | null;
    roleLabel: string;
  };
}

/**
 * Server Action: Register a new user with bcrypt password hashing and rate limiting
 */
export async function registerUserAction(input: RegisterInput): Promise<AuthResponse> {
  try {
    const trimmedEmail = input.email.trim().toLowerCase();
    const trimmedName = input.name.trim();

    // Proteksi Rate Limiting (Maksimal 5 pendaftaran per menit per email)
    const rateLimit = checkRateLimit(`register:${trimmedEmail || "global"}`, 5, 60000);
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: `Terlalu banyak percobaan pendaftaran. Silakan coba kembali dalam ${rateLimit.resetInSeconds} detik.`,
      };
    }

    if (!trimmedName || !trimmedEmail || !input.password) {
      return { success: false, error: "Nama, email, dan kata sandi wajib diisi." };
    }

    if (input.password.length < 8) {
      return { success: false, error: "Kata sandi minimal 8 karakter." };
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    if (existing) {
      return { success: false, error: "Alamat email ini sudah terdaftar. Silakan masuk." };
    }

    // Hash password using bcrypt (10 rounds)
    const passwordHash = await bcrypt.hash(input.password, 10);

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        passwordHash: passwordHash,
        institution: input.institution?.trim() || "Pelajar / Penggiat Seni",
        role: input.role === "ADMIN" ? Role.ADMIN : Role.READER,
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(trimmedName)}`,
        bio: `Akun pembelajar seni terdaftar di Jejak Perupa.`,
      },
    });

    return {
      success: true,
      message: "Pendaftaran berhasil! Selamat datang di Jejak Perupa.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        institution: newUser.institution,
        avatarUrl: newUser.avatarUrl,
        roleLabel: newUser.role === Role.ADMIN ? "Kurator Redaksi" : "Pelajar Seni",
      },
    };
  } catch (error) {
    console.error("Galat Server Action registerUserAction:", error);
    return { success: false, error: "Terjadi kendala saat mendaftarkan akun." };
  }
}

/**
 * Server Action: Authenticate user with bcrypt verification and brute-force protection
 */
export async function loginUserAction(input: LoginInput): Promise<AuthResponse> {
  try {
    const trimmedEmail = input.email.trim().toLowerCase();

    // Proteksi Brute-force Rate Limiting (Maksimal 5 percobaan masuk per menit)
    const rateLimit = checkRateLimit(`login:${trimmedEmail || "global"}`, 5, 60000);
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: `Terlalu banyak percobaan masuk yang gagal. Demi keamanan akun Anda, silakan coba kembali dalam ${rateLimit.resetInSeconds} detik.`,
      };
    }

    if (!trimmedEmail || !input.password) {
      return { success: false, error: "Email dan kata sandi wajib diisi." };
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });

    if (!user || !user.passwordHash) {
      return {
        success: false,
        error: "Email atau kata sandi yang Anda masukkan tidak sesuai.",
      };
    }

    // Verify password hash
    const isValid = await bcrypt.compare(input.password, user.passwordHash);

    if (!isValid) {
      return {
        success: false,
        error: "Email atau kata sandi yang Anda masukkan tidak sesuai.",
      };
    }

    return {
      success: true,
      message: `Selamat datang kembali, ${user.name}!`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        institution: user.institution,
        avatarUrl: user.avatarUrl,
        roleLabel: user.role === Role.ADMIN ? "Kurator Redaksi" : "Pelajar Seni",
      },
    };
  } catch (error) {
    console.error("Galat Server Action loginUserAction:", error);
    return { success: false, error: "Terjadi kendala saat proses masuk." };
  }
}
