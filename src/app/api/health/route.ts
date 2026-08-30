import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

/**
 * Enterprise-Hardened Health Check Endpoint
 * - Menjaga ketersediaan uptime monitor (Vercel, UptimeRobot, Pingdom)
 * - Zero Information Disclosure di mode produksi untuk mencegah reconnaissance
 * - Diagnostik internal hanya terbuka di mode development atau dengan Secret Token
 */
export async function GET(request: NextRequest) {
  // 1. Rate limiting untuk mencegah abuse / DDoS scraping
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "client-health-check";

  const rateLimit = checkRateLimit(`health:${clientIp}`, 60, 60000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too Many Requests" },
      {
        status: 429,
        headers: {
          "Retry-After": `${rateLimit.resetInSeconds}`,
          "Cache-Control": "no-store",
        },
      }
    );
  }

  // 2. Ping pemeriksaan konektivitas database
  const startTime = Date.now();
  let isDbHealthy = false;
  let dbLatencyMs = 0;

  try {
    const dbStart = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    dbLatencyMs = Date.now() - dbStart;
    isDbHealthy = true;
  } catch {
    isDbHealthy = false;
  }

  const isProduction = process.env.NODE_ENV === "production";
  const healthSecret = process.env.HEALTH_CHECK_SECRET;

  const authHeader = request.headers.get("authorization");
  const tokenHeader = request.headers.get("x-health-token");
  const tokenQuery = request.nextUrl.searchParams.get("token");

  const isAuthorized =
    Boolean(healthSecret) &&
    (tokenHeader === healthSecret ||
      tokenQuery === healthSecret ||
      authHeader === `Bearer ${healthSecret}`);

  // 3. Mode Produksi Publik: Zero Data Disclosure (Hanya status "ok" tanpa detail memori/server)
  if (isProduction && !isAuthorized) {
    if (!isDbHealthy) {
      return NextResponse.json(
        { status: "degraded" },
        {
          status: 503,
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate",
          },
        }
      );
    }

    return NextResponse.json(
      { status: "ok" },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }

  // 4. Mode Development atau Internal Authorized: Tampilkan diagnostik lengkap
  const memoryUsage = process.memoryUsage ? process.memoryUsage() : null;

  return NextResponse.json(
    {
      status: isDbHealthy ? "healthy" : "degraded",
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
      responseTimeMs: Date.now() - startTime,
      database: {
        status: isDbHealthy ? "connected" : "disconnected",
        latencyMs: dbLatencyMs,
      },
      system: {
        uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
        heapUsedMb: memoryUsage ? Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100 : null,
      },
    },
    {
      status: isDbHealthy ? 200 : 503,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
