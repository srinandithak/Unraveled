import type { ProductContext, ScoreResult } from "../types";

const WEB_APP_ANALYZE_URL = "https://unravel.app/analyze";

export const buildWebAppDeepLink = (
  product: ProductContext,
  score: Pick<ScoreResult, "sustainabilityScore" | "trendScore">
): string => {
  const params = new URLSearchParams({
    source: "extension",
    product_name: product.productName,
    product_url: product.productUrl,
    brand: product.brand,
    sustainability_score: String(score.sustainabilityScore.value),
    sustainability_grade: score.sustainabilityScore.grade,
    trend_label: score.trendScore.label
  });

  return `${WEB_APP_ANALYZE_URL}?${params.toString()}`;
};
