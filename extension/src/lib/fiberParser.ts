import { FIBER_ALIASES } from "../config/fiberData";

const normalizeCandidate = (value: string): string =>
  value.toLowerCase().replace(/[^a-z/\s-]/g, " ").replace(/\s+/g, " ").trim();

const canonicalizeFiber = (value: string): string | null => {
  const normalized = normalizeCandidate(value);

  for (const [canonical, aliases] of Object.entries(FIBER_ALIASES)) {
    for (const alias of aliases) {
      const pattern = new RegExp(
        `\\b${alias
          .replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
          .replace(/\s+/g, "\\\\s+")}\\b`,
        "i"
      );
      if (pattern.test(normalized)) {
        return canonical;
      }
    }
  }

  return null;
};

const clampPct = (value: number): number => {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, value));
};

export const parseFiberComposition = (rawText: string): Record<string, number> => {
  const text = rawText.toLowerCase();
  const segments = text
    .split(/[\n;,|]+/)
    .map((segment) => normalizeCandidate(segment))
    .filter(Boolean);

  const composition: Record<string, number> = {};

  for (const segment of segments) {
    const percentFirst = segment.match(/(\d{1,3}(?:\.\d+)?)\s*%\s*([a-z][a-z\s/-]{1,50})/i);
    const nameFirst = segment.match(/([a-z][a-z\s/-]{1,50})\s*(\d{1,3}(?:\.\d+)?)\s*%/i);

    const value = percentFirst?.[1] ?? nameFirst?.[2];
    const name = percentFirst?.[2] ?? nameFirst?.[1];

    if (!value || !name) {
      continue;
    }

    const canonical = canonicalizeFiber(name);
    if (!canonical) {
      continue;
    }

    const pct = clampPct(Number(value));
    if (!pct) {
      continue;
    }

    composition[canonical] = (composition[canonical] ?? 0) + pct;
  }

  return composition;
};

export const normalizeFiberComposition = (
  composition: Record<string, number>
): Record<string, number> => {
  const entries = Object.entries(composition).filter(([, pct]) => pct > 0);
  const total = entries.reduce((sum, [, pct]) => sum + pct, 0);

  if (!entries.length || total === 0) {
    return {};
  }

  if (total <= 100) {
    return Object.fromEntries(entries.map(([fiber, pct]) => [fiber, Number(pct.toFixed(2))]));
  }

  return Object.fromEntries(
    entries.map(([fiber, pct]) => [fiber, Number(((pct / total) * 100).toFixed(2))])
  );
};
