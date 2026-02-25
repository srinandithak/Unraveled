export type TrendLabel = "Timeless" | "Trending" | "Fading" | "Dead";
export type HealthLabel = "Safe" | "Caution" | "Avoid";
export type SustainabilityGrade = "A" | "B" | "C" | "D" | "F";

export interface ProductContext {
  productUrl: string;
  productName: string;
  brand: string;
  category: string;
  currency: string;
  retailerDomain: string;
  descriptionText: string;
  fiberText: string;
  fiberContent: Record<string, number>;
  price?: number;
  imageUrl?: string;
}

export interface RetailerSelectorConfig {
  retailer: string;
  productUrlPatterns: string[];
  nameSelectors: string[];
  priceSelectors: string[];
  materialSelectors: string[];
  descriptionSelectors: string[];
  imageSelectors: string[];
}

export interface SustainabilityScore {
  value: number;
  grade: SustainabilityGrade;
  modelVersion: string;
  featureContributions: {
    fiberComposition: {
      featureValue: number;
      modelWeight: number;
      breakdown: Array<{
        fiber: string;
        pct: number;
        rank: number;
        weighted: number;
      }>;
    };
    brandReputation: {
      featureValue: number;
      modelWeight: number;
      sources: {
        goodOnYou: string;
        bcorpCertified: boolean;
        ftiScore: string;
        remakeScore: string;
        scrapeSignals: string;
      };
    };
    microTrendLongevity: {
      featureValue: number;
      modelWeight: number;
      trendLabel: TrendLabel;
    };
  };
}

export interface ScoreResult {
  sustainabilityScore: SustainabilityScore;
  trendScore: {
    label: TrendLabel;
    lifespanWeeks: number;
    confidence: number;
  };
  healthScore: {
    label: HealthLabel;
    flags: string[];
  };
  cpwEstimate: {
    estimatedWears: number;
    costPerWear: number;
    trendAdjustedWears: number;
    trendAdjustedCpw: number;
  };
  webAppDeepLink: string;
}

export interface ScoredProductPayload {
  product: ProductContext;
  score: ScoreResult;
  scoredAt: string;
}

export interface ManualSeedContext {
  productUrl: string;
  productName: string;
  brand?: string;
  category?: string;
  currency?: string;
  retailerDomain?: string;
  price?: number;
}

export type RuntimeMessage =
  | { type: "UNRAVEL_PRODUCT_DETECTED"; payload: ProductContext }
  | { type: "UNRAVEL_GET_SCORE_FOR_TAB"; tabId: number }
  | {
      type: "UNRAVEL_SCORE_MANUAL_FIBERS";
      tabId: number;
      fiberText: string;
      seed?: ManualSeedContext;
    };
