/**
 * Pure helpers to rank spec strings and compare selected configurations.
 * No side-effects, no React – suitable for server or client.
 */

import type { ComparisonConfig } from "@/types/domain";

// ---------------------------------------------------------------------------
// Parsers
// ---------------------------------------------------------------------------

/** Extract GB from a RAM string like "16GB DDR5" → 16. Returns 0 on failure. */
export function parseRamGB(spec: string): number {
  const m = spec.match(/(\d+)\s*GB/i);
  if (!m) {
    const m2 = spec.match(/(\d+)\s*TB/i);
    if (m2) return parseFloat(m2[1]) * 1024;
    return 0;
  }
  return parseFloat(m[1]) || 0;
}

/** Extract GB from storage strings like "512GB NVMe", "1TB SSD" → total GB. */
export function parseStorageGB(spec: string): number {
  let total = 0;
  // match sequences of number+unit
  const pattern = /(\d+(?:\.\d+)?)\s*(TB|GB|MB)/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(spec)) !== null) {
    const value = parseFloat(match[1]);
    if (match[2].toUpperCase() === "TB") total += value * 1024;
    else if (match[2].toUpperCase() === "GB") total += value;
    else if (match[2].toUpperCase() === "MB") total += value / 1024;
  }
  return total || 0;
}

/** Normalised GPU tier: 0 = integrated, 1 = low, … 7 = top. */
export function parseGpuTier(spec: string): number {
  const s = spec.toLowerCase();

  // Integrated first
  if (
    s.includes("integrated") ||
    s.includes("intel uhd") ||
    s.includes("iris xe") ||
    s.includes("radeon graphics") ||
    s.includes("arc graphics")
  )
    return 0;

  // Known tiers
  const known: Record<string, number> = {
    "gtx 1650": 1,
    "gtx 1660": 1,
    "rtx 2050": 2,
    "rtx 3050": 2,
    "rtx 4050": 3,
    "rtx 3060": 4,
    "rtx 4060": 4,
    "rtx 3070": 5,
    "rtx 4070": 5,
    "rtx 3080": 6,
    "rtx 4080": 6,
    "rtx 4090": 7,
  };

  for (const [key, tier] of Object.entries(known)) {
    if (s.includes(key)) return tier;
  }

  // Fallback: try to extract number from RTX 4xxx etc.
  const rtxMatch = s.match(/rtx\s*(\d{4})/);
  if (rtxMatch) {
    const num = parseInt(rtxMatch[1], 10);
    if (num >= 3000 && num <= 3990) return Math.min(num / 100 - 30 + 4, 7);
    if (num >= 4000) return Math.min(num / 100 - 40 + 6, 7);
  }

  // Unknown dedicated GPU => low tier
  return 1;
}

/** CPU suffix tier: higher = more performance-oriented. */
export function parseCpuTier(spec: string): number {
  const s = spec.toLowerCase();
  if (s.includes("hx")) return 4;
  if (s.includes("hs")) return 2;
  if (s.includes("h")) return 3;
  if (s.includes("u")) return 1;
  return 0;
}

// ---------------------------------------------------------------------------
// Comparison helpers
// ---------------------------------------------------------------------------

/**
 * Result for a single spec row across selected configs.
 */
export interface SpecRowComparison {
  /** Whether all selected configurations have exactly the same text/value. */
  allIdentical: boolean;
  /** Index of the single-best config (highest numeric rank), or null if tie. */
  bestIndex: number | null;
}

/**
 * Compare one spec row across already selected profiles.
 * @param key   Which spec field to compare (cpu, ram, gpu, storage).
 * @param items The selected ComparisonConfig objects.
 */
export function compareSpecRow(
  key: "cpu" | "ram" | "gpu" | "storage",
  items: ComparisonConfig[]
): SpecRowComparison {
  if (items.length === 0) return { allIdentical: true, bestIndex: null };

  const values = items.map((c) => c.profile[key]);

  // 1. Text identity (fast path)
  const uniqueValues = new Set(values);
  if (uniqueValues.size === 1) {
    return { allIdentical: true, bestIndex: null };
  }

  // 2. Numeric ranking
  const parser =
    key === "ram"
      ? parseRamGB
      : key === "storage"
      ? parseStorageGB
      : key === "gpu"
      ? parseGpuTier
      : parseCpuTier;

  const scores = values.map((v) => parser(v));
  const maxScore = Math.max(...scores);

  // Ties → no single best
  const bestIndices = scores
    .map((s, i) => (s === maxScore ? i : -1))
    .filter((i) => i !== -1);

  return {
    allIdentical: false, // we already know they differ
    bestIndex: bestIndices.length === 1 ? bestIndices[0] : null,
  };
}
