import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rateLimit";

describe("Rate Limiting Utility", () => {
  it("allows requests within the defined threshold", () => {
    const key = `test-user-${Date.now()}`;
    const res1 = checkRateLimit(key, 3, 10000);
    expect(res1.allowed).toBe(true);
    expect(res1.remaining).toBe(2);

    const res2 = checkRateLimit(key, 3, 10000);
    expect(res2.allowed).toBe(true);
    expect(res2.remaining).toBe(1);

    const res3 = checkRateLimit(key, 3, 10000);
    expect(res3.allowed).toBe(true);
    expect(res3.remaining).toBe(0);
  });

  it("blocks requests that exceed the limit", () => {
    const key = `test-blocked-${Date.now()}`;

    // Fill up quota
    checkRateLimit(key, 2, 10000);
    checkRateLimit(key, 2, 10000);

    // 3rd attempt should be blocked
    const res = checkRateLimit(key, 2, 10000);
    expect(res.allowed).toBe(false);
    expect(res.remaining).toBe(0);
    expect(res.resetInSeconds).toBeGreaterThan(0);
  });
});
