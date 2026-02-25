import selectorConfig from "../config/retailerSelectors.json";
import type { RetailerSelectorConfig } from "../types";

const KNOWN_CATEGORIES: Array<{ category: string; keywords: string[] }> = [
  { category: "tops", keywords: ["top", "shirt", "tee", "blouse", "tank"] },
  { category: "bottoms", keywords: ["jeans", "pants", "trouser", "skirt", "shorts"] },
  { category: "dresses", keywords: ["dress", "gown"] },
  { category: "outerwear", keywords: ["jacket", "coat", "hoodie", "sweater", "cardigan"] },
  { category: "shoes", keywords: ["shoe", "sneaker", "boot", "loafer", "heel"] }
];

const retailerEntries = Object.entries(
  selectorConfig as Record<string, RetailerSelectorConfig>
);

export const getRetailerConfigByHostname = (
  hostname: string
): { domain: string; config: RetailerSelectorConfig } | null => {
  const normalizedHost = hostname.toLowerCase();

  for (const [domain, config] of retailerEntries) {
    if (normalizedHost.endsWith(domain)) {
      return { domain, config };
    }
  }

  return null;
};

export const inferCategory = (source: string): string => {
  const normalized = source.toLowerCase();

  for (const entry of KNOWN_CATEGORIES) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.category;
    }
  }

  return "apparel";
};

export const looksLikeProductPath = (
  pathname: string,
  patterns: string[]
): boolean => {
  const normalized = pathname.toLowerCase();
  return patterns.some((pattern) => normalized.includes(pattern.toLowerCase()));
};
