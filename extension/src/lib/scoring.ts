import brandRatings from "../config/brandRatings.json";
import {
  DEFAULT_DURABILITY_WEARS,
  DEFAULT_FIBER_FEATURE,
  FIBER_DURABILITY_WEARS,
  FIBER_RANKS,
  HEALTH_HAZARD_PATTERNS,
  TREND_FEATURE_MAP,
  TREND_LIFESPAN_WEEKS,
  TREND_WEAR_MULTIPLIER
} from "../config/fiberData";
import { buildWebAppDeepLink } from "./deeplink";
import type {
  ProductContext,
  ScoreResult,
  SustainabilityGrade,
  TrendLabel
} from "../types";

interface BrandRating {
  goodOnYou: number;
  bcorpCertified: boolean;
  fashionTransparencyIndex: number;
  remake: number;
  scrapeSignals: number;
}

const typedBrandRatings = brandRatings as Record<string, BrandRating>;

const TREND_KEYWORDS: Record<TrendLabel, string[]> = {
  Timeless: [
    "classic",
    "essential",
    "tailored",
    "straight",
    "minimal",
    "crew neck",
    "button-down",
    "oxford"
  ],
  Trending: [
    "oversized",
    "cargo",
    "coquette",
    "y2k",
    "barbiecore",
    "micro",
    "streetwear",
    "statement",
    "cutout"
  ],
  Fading: [
    "neon",
    "cold shoulder",
    "distressed",
    "peplum",
    "slouchy",
    "logo mania"
  ],
  Dead: ["chevron", "bodycon bandage", "jeggings", "mustache print", "galaxy print"]
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const round = (value: number, digits = 2): number =>
  Number(value.toFixed(digits));

const gradeFromScore = (score: number): SustainabilityGrade => {
  if (score >= 90) {
    return "A";
  }
  if (score >= 75) {
    return "B";
  }
  if (score >= 50) {
    return "C";
  }
  if (score >= 25) {
    return "D";
  }
  return "F";
};

const resolveBrandRating = (brand: string): BrandRating => {
  const normalized = brand.toLowerCase();
  return typedBrandRatings[normalized] ?? typedBrandRatings.default;
};

const scoreFiberFeature = (
  fiberContent: Record<string, number>
): {
  featureValue: number;
  breakdown: Array<{ fiber: string; pct: number; rank: number; weighted: number }>;
} => {
  const entries = Object.entries(fiberContent);
  if (!entries.length) {
    return {
      featureValue: DEFAULT_FIBER_FEATURE,
      breakdown: []
    };
  }

  const breakdown = entries.map(([fiber, pct]) => {
    const rank = FIBER_RANKS[fiber] ?? DEFAULT_FIBER_FEATURE;
    return {
      fiber,
      pct: round(pct, 2),
      rank: round(rank, 2),
      weighted: round((pct * rank), 2)
    };
  });

  const weightedTotal = breakdown.reduce((sum, row) => sum + row.weighted, 0);
  return {
    featureValue: round(clamp(weightedTotal / 100, 0, 1), 4),
    breakdown
  };
};

const scoreBrandFeature = (brand: string): {
  featureValue: number;
  sources: {
    goodOnYou: string;
    bcorpCertified: boolean;
    ftiScore: string;
    remakeScore: string;
    scrapeSignals: string;
  };
} => {
  const rating = resolveBrandRating(brand);
  const goodOnYouNorm = clamp(rating.goodOnYou / 5, 0, 1);
  const bcorpNorm = rating.bcorpCertified ? 1 : 0;
  const ftiNorm = clamp(rating.fashionTransparencyIndex / 100, 0, 1);
  const remakeNorm = clamp(rating.remake / 100, 0, 1);
  const scrapeNorm = clamp(rating.scrapeSignals, 0, 1);

  const featureValue = round(
    (goodOnYouNorm + bcorpNorm + ftiNorm + remakeNorm + scrapeNorm) / 5,
    4
  );

  return {
    featureValue,
    sources: {
      goodOnYou: `${round(rating.goodOnYou, 1)}/5`,
      bcorpCertified: rating.bcorpCertified,
      ftiScore: `${round(rating.fashionTransparencyIndex, 0)}%`,
      remakeScore: `${round(rating.remake, 0)}%`,
      scrapeSignals: String(round(scrapeNorm, 2))
    }
  };
};

const classifyTrend = (product: ProductContext): {
  label: TrendLabel;
  confidence: number;
} => {
  const corpus = `${product.productName} ${product.descriptionText}`.toLowerCase();

  const scores = Object.entries(TREND_KEYWORDS).map(([label, keywords]) => {
    const hits = keywords.reduce((count, keyword) => {
      return count + (corpus.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);

    return { label: label as TrendLabel, hits };
  });

  scores.sort((a, b) => b.hits - a.hits);

  const top = scores[0];
  if (top.hits === 0) {
    return { label: "Trending", confidence: 0.45 };
  }

  const totalHits = scores.reduce((sum, row) => sum + row.hits, 0);
  const confidence = clamp(top.hits / Math.max(totalHits, 1), 0.4, 0.95);

  return {
    label: top.label,
    confidence: round(confidence, 2)
  };
};

const scoreHealth = (product: ProductContext): { label: "Safe" | "Caution" | "Avoid"; flags: string[] } => {
  const corpus = `${product.fiberText} ${product.descriptionText} ${Object.keys(product.fiberContent).join(" ")}`;

  const avoidFlags = HEALTH_HAZARD_PATTERNS.avoid
    .filter((pattern) => pattern.test(corpus))
    .map((pattern) => pattern.source.replace(/[\\^$.*+?()[\]{}|]/g, ""));

  if (avoidFlags.length > 0) {
    return {
      label: "Avoid",
      flags: [...new Set(avoidFlags)]
    };
  }

  const cautionFlags = HEALTH_HAZARD_PATTERNS.caution
    .filter((pattern) => pattern.test(corpus))
    .map((pattern) => pattern.source.replace(/[\\^$.*+?()[\]{}|]/g, ""));

  if (cautionFlags.length > 0) {
    return {
      label: "Caution",
      flags: [...new Set(cautionFlags)]
    };
  }

  return {
    label: "Safe",
    flags: []
  };
};

const estimateDurabilityWears = (fiberContent: Record<string, number>): number => {
  const entries = Object.entries(fiberContent);
  if (!entries.length) {
    return DEFAULT_DURABILITY_WEARS;
  }

  const weighted = entries.reduce((sum, [fiber, pct]) => {
    const wears = FIBER_DURABILITY_WEARS[fiber] ?? DEFAULT_DURABILITY_WEARS;
    return sum + (wears * pct) / 100;
  }, 0);

  return Math.round(clamp(weighted, 10, 130));
};

const estimateCpw = (
  price: number | undefined,
  estimatedWears: number,
  trend: TrendLabel
): {
  estimatedWears: number;
  costPerWear: number;
  trendAdjustedWears: number;
  trendAdjustedCpw: number;
} => {
  const safePrice = typeof price === "number" ? price : 0;
  const trendAdjustedWears = Math.max(
    1,
    Math.round(estimatedWears * TREND_WEAR_MULTIPLIER[trend])
  );

  return {
    estimatedWears,
    costPerWear: round(safePrice / Math.max(estimatedWears, 1), 2),
    trendAdjustedWears,
    trendAdjustedCpw: round(safePrice / trendAdjustedWears, 2)
  };
};

export const scoreProductLocally = (product: ProductContext): ScoreResult => {
  const fiber = scoreFiberFeature(product.fiberContent);
  const brand = scoreBrandFeature(product.brand);
  const trend = classifyTrend(product);

  const trendFeature = TREND_FEATURE_MAP[trend.label];
  const sustainabilityRaw =
    (fiber.featureValue * 0.5 + brand.featureValue * 0.3 + trendFeature * 0.2) * 100;

  const sustainabilityValue = Math.round(clamp(sustainabilityRaw, 0, 100));
  const sustainabilityGrade = gradeFromScore(sustainabilityValue);

  const healthScore = scoreHealth(product);
  const estimatedWears = estimateDurabilityWears(product.fiberContent);
  const cpwEstimate = estimateCpw(product.price, estimatedWears, trend.label);

  const sustainabilityScore = {
    value: sustainabilityValue,
    grade: sustainabilityGrade,
    modelVersion: "v1.0-weighted-mvp",
    featureContributions: {
      fiberComposition: {
        featureValue: fiber.featureValue,
        modelWeight: 0.5,
        breakdown: fiber.breakdown
      },
      brandReputation: {
        featureValue: brand.featureValue,
        modelWeight: 0.3,
        sources: brand.sources
      },
      microTrendLongevity: {
        featureValue: trendFeature,
        modelWeight: 0.2,
        trendLabel: trend.label
      }
    }
  };

  const trendScore = {
    label: trend.label,
    lifespanWeeks: TREND_LIFESPAN_WEEKS[trend.label],
    confidence: trend.confidence
  };

  const webAppDeepLink = buildWebAppDeepLink(product, {
    sustainabilityScore,
    trendScore
  });

  return {
    sustainabilityScore,
    trendScore,
    healthScore,
    cpwEstimate,
    webAppDeepLink
  };
};
