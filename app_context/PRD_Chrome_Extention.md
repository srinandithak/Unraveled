# Product Requirements Document: Unravel — Chrome Extension

**Product Name:** Unravel Chrome Extension
**Team:** Digital Arts and Media Build Team — Fashion Sustainability Subteam
**Document Version:** 1.0
**Date:** 2026-02-21
**Author:** @DudeUnoob

---

## 1. Executive Summary

Unravel is a Chrome extension that empowers online clothing shoppers to make informed purchasing decisions by surfacing real-time sustainability, quality, and cost-per-wear data directly on the product pages they're already browsing. The extension injects a scoring overlay into supported e-commerce sites, evaluating items on fiber composition, trendiness, health impact, and projected longevity — all without the shopper ever leaving the page.

The extension serves as the **primary entry point** into the Unravel ecosystem. For deeper analysis (trend decay modeling, trend lifespan projections), the extension links the user to the **Unravel Web App**, creating a seamless research flow.

---

## 2. Problem Statement

Clothing shoppers have no reliable way to assess whether an item is truly worth buying — not just in price, but in sustainability, quality, and staying power. Without knowing if a piece is a timeless staple or a micro-trend with a 3-week lifespan, shoppers can't make informed decisions about real cost per wear, leading to wasteful purchases that hurt both their wallet and the environment.

---

## 3. Vision & Strategic Context

### 3.1 Product Vision
> "The sustainability of your clothes, UNRAVELED — right where you shop."

The Chrome extension is the **lightweight, always-present companion** that meets users in their natural shopping flow. It provides instant, glanceable scores while shopping online and acts as a **gateway to the full Unravel web experience** for users who want deeper analysis.

### 3.2 Relationship to Web App
| Dimension | Chrome Extension | Web App |
|---|---|---|
| **Context** | Embedded in the shopping page | Standalone destination |
| **Depth** | Snapshot scores & quick verdicts | Full trend decay modeling, CPW projections, historical data |
| **Trigger** | Passive (auto-detects product pages) + click popup | Active (user navigates to site) |
| **CTA Flow** | "See full trend analysis →" links to web app with product context pre-filled | Can receive product context from extension via URL params or shared session |

### 3.3 User Flow: Extension → Web App
```
1. User browses a product page on a supported retailer
2. Extension content script detects the product and extracts metadata
3. Extension popup/side panel displays: Sustainability Score (ML), Trend Score, Health Score, CPW Estimate
4. User clicks "See Full Analysis →"
5. Browser opens Unravel Web App with product data pre-populated (via URL params or auth-linked session)
6. Web App displays: Trend Decay Curve, Detailed CPW Breakdown, Alternative Suggestions (Stage 2+)
```

---

## 4. Target Users

### 4.1 Primary Persona: The Conscious Browser
- **Age:** 18–35
- **Behavior:** Shops online 2–5x/month; interested in sustainability but lacks time/knowledge to research every item
- **Pain Point:** Wants to buy better but doesn't know *how* to evaluate quality or sustainability at point of purchase
- **Device:** Primarily laptop/desktop for online shopping (Chrome browser)

### 4.2 Secondary Persona: The Budget-Conscious Student
- **Age:** 18–24
- **Behavior:** Price-sensitive; buys fast fashion by default but would switch if shown equivalent-cost alternatives
- **Pain Point:** Assumes sustainable = expensive; doesn't realize cheap items have high real cost-per-wear

---

## 5. MVP Staging & Scope

### 5.1 Stage 1: Fiber-Based Scoring Engine (MVP)
**Goal:** Score clothing items based on fiber/material content and surface actionable insights.

#### Core Features

| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| E-1.1 | Product Page Detection | Content script auto-detects when user is on a supported product page (e.g., Zara, H&M, ASOS, Shein, Amazon Fashion) | P0 |
| E-1.2 | Fiber Content Extraction | Scrape/parse fiber composition from the product page DOM (materials section, description, spec table) | P0 |
| E-1.3 | ML Sustainability Score | Trained ML model producing a composite 0–100 sustainability score from three input features: fiber composition, brand sustainability reputation, and micro-trend longevity classification | P0 |
| E-1.4 | Brand Reputation Lookup | Query a pre-populated brand ratings database (Good On You, B Corp registry, Fashion Transparency Index) to produce a normalized brand score (0–1) used as an ML model input feature | P0 |
| E-1.5 | Trendiness Score | Binary/tiered classification: Timeless · Trending · Fading · Dead. Based on product name/description keyword matching against trend data from backend; also feeds into the ML sustainability model as micro-trend feature | P0 |
| E-1.6 | Health Impact Score | Flag known harmful fibers/chemicals (e.g., formaldehyde-releasing finishes, PFAS-treated fabrics). Simple tier: Safe · Caution · Avoid | P0 |
| E-1.7 | Cost Per Wear (CPW) Estimate | Calculate estimated CPW = Price ÷ Estimated Wears. Estimated wears derived from fiber durability data + trend lifespan | P0 |
| E-1.8 | Popup/Side Panel UI | React-based panel showing all scores in a clean, glanceable card layout | P0 |
| E-1.9 | "See Full Analysis" CTA | Deep link to Unravel Web App with product context (name, URL, sustainability score breakdown) passed via URL parameters | P0 |
| E-1.10 | Extension Icon Badge | Show a color-coded badge on the extension icon (green/yellow/red) when on a supported product page | P1 |
| E-1.11 | Unsupported Site Fallback | Show a "Paste fiber content manually" input if auto-extraction fails | P1 |

#### ML Sustainability Scoring Model

The Sustainability Score (0–100) is produced by a trained ML model (Gradient Boosted Regressor via scikit-learn / XGBoost) that ingests three input feature groups. The model is trained on labeled garment sustainability data sourced from Good On You, B Corp registries, and expert review.

**Feature 1 — Fiber Composition (~50% model weight)**

Preprocessed into a single numeric feature (0–1) via a weighted average of fiber sustainability ranks:

```
fiber_feature = Σ (fiber_percentage_i × fiber_rank_i) / 100

Fiber rank lookup (normalized 0–1):
  Organic Linen:        0.95    Hemp:                 0.92
  Organic Cotton:       0.90    Tencel/Lyocell:       0.88
  Recycled Wool:        0.85    Conventional Cotton:  0.65
  Recycled Polyester:   0.60    Viscose/Rayon:        0.45
  Nylon/Spandex blend:  0.30    Conventional Polyester: 0.25
  Acrylic:              0.20
```

**Feature 2 — Brand Sustainability Reputation (~30% model weight)**

Normalized brand score (0–1) aggregated from third-party sources stored in the brand ratings database:

```
Sources (weighted equally at MVP, tuned post-training):
  - Good On You rating       (1–5 scale → normalized)
  - B Corp certification     (binary: certified = 1.0)
  - Fashion Transparency Index score  (0–100% → normalized)
  - Remake Fashion Accountability Report  (0–100 → normalized)
  - Scraped brand page signals (certifications, sustainability pledges → heuristic score)

brand_feature = normalize(weighted_avg(good_on_you, bcorp, fti, remake, scrape_signals))
```

**Feature 3 — Micro-Trend Longevity (~20% model weight)**

Sustainability penalty derived from trend lifespan. Items bought as micro-trends will be worn fewer times, increasing their per-wear environmental footprint:

```
trend_feature mapping:
  Timeless  → 1.00  (no penalty — item will be worn long-term)
  Trending  → 0.75  (minor penalty — trend may fade within a year)
  Fading    → 0.40  (moderate penalty — near end of trend cycle)
  Dead      → 0.10  (heavy penalty — already obsolete)
```

**Model Output:**

```
# Stage 1 MVP — weighted ensemble (before sufficient labeled training data):
sustainability_score = (
    fiber_feature  × 0.50 +
    brand_feature  × 0.30 +
    trend_feature  × 0.20
) × 100

# Post-MVP — supervised model trained on labeled garment sustainability data:
model = GradientBoostingRegressor(n_estimators=200, max_depth=4, learning_rate=0.05)
model.fit(X_train, y_sustainability)   # y labels from Good On You + expert annotation
sustainability_score = model.predict([fiber_feature, brand_feature, trend_feature]) × 100

Final score mapped to grade:
  90–100: A (Excellent)
  75–89:  B (Good)
  50–74:  C (Average)
  25–49:  D (Poor)
  0–24:   F (Avoid)
```

### 5.2 Stage 2: Alternative Suggestions
**Goal:** Suggest similar clothing items with better fiber composition and/or lower CPW.

| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| E-2.1 | Visual Similarity Engine | Use CLIP embeddings to find visually similar items across partner/scraped catalogs | P0 |
| E-2.2 | Image Analysis Pipeline | Extract product image from current page → send to backend → get embedding → query pgvector for nearest neighbors | P0 |
| E-2.3 | Alternative Cards | Show 2–3 alternative items in the extension panel with: image thumbnail, price, fiber score, projected CPW | P0 |
| E-2.4 | Cross-Site Scraping | Backend scrapes and indexes product catalogs from sustainable brands (Everlane, Patagonia, Reformation, etc.) | P0 |
| E-2.5 | Price Filter | User can set a max price; alternatives filtered to be within budget | P1 |
| E-2.6 | "Compare" View | Side-by-side comparison of current item vs. best alternative | P1 |

### 5.3 Stage 3: Deep Brand Sustainability Profiles (Potential)

> **Note:** A basic brand reputation score (from Good On You, B Corp, FTI) is already a **Stage 1 ML input feature** (E-1.4). Stage 3 expands this into a richer consumer-facing brand profile — not a prerequisite for the sustainability score, but a deeper research surface.

| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| E-3.1 | Brand Profile Page | Dedicated in-extension brand view showing full sustainability breakdown: labor practices, environmental certifications, transparency score, and trend over time | P2 |
| E-3.2 | Brand Badge | Show a brand sustainability tier badge in the extension overlay (e.g., "🟢 B-Corp Certified", "🔴 Low Transparency") derived from the ML brand feature score | P2 |
| E-3.3 | Live Brand Scraping | Augment static ratings with scraped signals from the brand's own sustainability/about pages to keep scores current beyond static databases | P2 |

### 5.4 Stage 4: Mobile Scanner (Potential)
| ID | Feature | Description | Priority |
|----|---------|-------------|----------|
| E-4.1 | Mobile App (React Native or PWA) | Camera-based barcode/tag scanner for in-store shopping | P3 |
| E-4.2 | OCR Fiber Extraction | Read fiber content from clothing tags via camera | P3 |

---

## 6. Technical Architecture

### 6.1 Extension Architecture (Manifest V3)

```
┌─────────────────────────────────────────────────┐
│                  Chrome Browser                   │
│                                                   │
│  ┌─────────────────┐    ┌──────────────────────┐ │
│  │  Content Script  │    │   Popup / Side Panel │ │
│  │  (Injected into  │◄──►│   (React + TS UI)    │ │
│  │   product page)  │    │                      │ │
│  │                  │    │  - Sust. Score Card   │ │
│  │  Responsibilities│    │  - Trend Score Card   │ │
│  │  - DOM parsing   │    │  - Health Score Card  │ │
│  │  - Fiber extract │    │  - CPW Estimate       │ │
│  │  - Product meta  │    │  - Alternatives (S2)  │ │
│  │  - Image URL     │    │  - "Full Analysis" →  │ │
│  └────────┬─────────┘    └──────────┬───────────┘ │
│           │                         │              │
│  ┌────────▼─────────────────────────▼───────────┐ │
│  │           Service Worker (Background)         │ │
│  │  - API calls to FastAPI backend               │ │
│  │  - Chrome storage for cached scores           │ │
│  │  - Badge color management                     │ │
│  └──────────────────┬───────────────────────────┘ │
└─────────────────────┼───────────────────────────────┘
                      │ HTTPS
                      ▼
         ┌────────────────────────┐
         │   FastAPI Backend       │
         │   (Scoring + ML APIs)   │
         └────────────────────────┘
```

### 6.2 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Extension Standard | Manifest V3 | Required for Chrome Web Store submission |
| Popup/Panel UI | React 18+ + TypeScript | Component-based UI for dynamic scoring panels |
| Styling | Tailwind CSS | Rapid styling; consistent with web app design system |
| Build Tool | Vite | Fast HMR; superior DX over Webpack for extensions |
| Content Script | Vanilla TS (lightweight) | Injected into third-party DOMs; must be minimal footprint |
| Background | Service Worker (MV3) | Handles API communication, caching, badge updates |
| API Communication | REST (fetch) to FastAPI backend | All scoring logic lives server-side |
| Local Storage | Chrome Storage API | Cache recent scores for offline/quick re-display |

### 6.3 Backend Dependencies (Shared with Web App)

| Service | Purpose |
|---------|---------|
| FastAPI (Python) | Scoring endpoints, fiber analysis, trend data aggregation |
| Supabase PostgreSQL | Fiber lookup table, brand ratings, cached scores |
| Supabase pgvector | Stage 2 — visual similarity search via CLIP embeddings |
| Supabase Auth | Optional user accounts (save history, sync with web app) |
| Redis (Upstash) | Cache trend query results (refresh every few hours) |
| Pydantic v2 | Request/response validation |
| Uvicorn | ASGI server |

---

## 7. API Contract (Extension ↔ Backend)

### 7.1 Score Product

```
POST /api/v1/score

Request Body:
{
  "product_url": "https://www.zara.com/us/en/linen-blend-shirt-p04886520.html",
  "product_name": "Linen Blend Shirt",
  "fiber_content": {          // extracted by content script
    "linen": 55,
    "cotton": 30,
    "polyester": 15
  },
  "price": 49.90,
  "currency": "USD",
  "image_url": "https://...",
  "brand": "Zara",
  "category": "tops"          // inferred from page
}

Response:
{
  "sustainability_score": {
    "value": 68,
    "grade": "C",
    "model_version": "v1.0-gbr",
    "feature_contributions": {
      "fiber_composition": {
        "feature_value": 0.72,
        "model_weight": 0.50,
        "breakdown": [
          { "fiber": "linen",     "pct": 55, "rank": 0.80, "weighted": 44.0 },
          { "fiber": "cotton",    "pct": 30, "rank": 0.65, "weighted": 19.5 },
          { "fiber": "polyester", "pct": 15, "rank": 0.25, "weighted": 3.75 }
        ]
      },
      "brand_reputation": {
        "feature_value": 0.55,
        "model_weight": 0.30,
        "sources": {
          "good_on_you": "3/5",
          "bcorp_certified": false,
          "fti_score": "42%"
        }
      },
      "micro_trend_longevity": {
        "feature_value": 0.75,
        "model_weight": 0.20,
        "trend_label": "Trending"
      }
    }
  },
  "trend_score": {
    "label": "Trending",
    "lifespan_weeks": 14,
    "confidence": 0.78
  },
  "health_score": {
    "label": "Safe",
    "flags": []
  },
  "cpw_estimate": {
    "estimated_wears": 45,
    "cost_per_wear": 1.11,
    "trend_adjusted_wears": 30,
    "trend_adjusted_cpw": 1.66
  },
  "web_app_deep_link": "https://unravel.app/analyze?pid=abc123&source=extension"
}
```

### 7.2 Get Alternatives (Stage 2)

```
POST /api/v1/alternatives

Request Body:
{
  "product_embedding_id": "abc123",  // from previous score response
  "image_url": "https://...",
  "max_price": 60.00,
  "currency": "USD",
  "limit": 3
}

Response:
{
  "alternatives": [
    {
      "product_name": "Organic Linen Camp Shirt",
      "brand": "Everlane",
      "price": 58.00,
      "sustainability_score": 91,
      "cpw_estimate": 0.97,
      "product_url": "https://...",
      "image_url": "https://...",
      "similarity": 0.89
    }
  ]
}
```

---

## 8. Supported Retailers (Stage 1 Launch)

| Retailer | DOM Parsing Strategy | Priority |
|----------|---------------------|----------|
| Zara | Spec table under "MATERIALS" | P0 |
| H&M | "Composition" section in product details | P0 |
| ASOS | "About Me" product detail tab | P0 |
| Shein | "Description" tab — fiber content line | P0 |
| Amazon Fashion | "Product Information" table | P0 |
| Uniqlo | "Materials" tab | P1 |
| Nordstrom | "Product Details" section | P1 |
| Urban Outfitters | "Details & Care" section | P1 |
| Reformation | "Sustainability" details section | P2 |
| Everlane | "Materials" section | P2 |

> **Note:** Each retailer requires a site-specific DOM selector config. These should be maintained in a JSON config file for easy updates without code changes.

---

## 9. User Experience

### 9.1 Extension Popup Layout

```
┌──────────────────────────────────┐
│  🧵 UNRAVEL                      │
│  ─────────────────────────────── │
│  Linen Blend Shirt — Zara        │
│  $49.90                          │
│                                  │
│  ┌───────────────────────────┐   │
│  │ SUSTAINABILITY SCORE      │   │
│  │         68 / C  🟡        │   │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░  │   │
│  │ Fiber: 0.72 · Brand: 0.55│   │
│  │ Trend Longevity: 0.75     │   │
│  └───────────────────────────┘   │
│  ┌──────────┐  ┌──────────┐     │
│  │ TREND    │  │ COST/    │     │
│  │ Score    │  │ WEAR     │     │
│  │ Trending │  │  $1.11   │     │
│  │ ~14 wks  │  │(adj $1.66)│    │
│  └──────────┘  └──────────┘     │
│  ┌──────────────────────────┐    │
│  │ HEALTH  ✅ Safe           │    │
│  └──────────────────────────┘    │
│                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  💡 A classic linen shirt lasts  │
│  ~80 wears at $0.62/wear        │
│                                  │
│  [🔍 See Full Trend Analysis →]  │ ← Opens Web App
│  [👕 See Better Alternatives →]  │ ← Stage 2
│                                  │
│  ─────────────────────────────── │
│  Powered by Unravel | Settings ⚙│
└──────────────────────────────────┘
```

### 9.2 Content Script Overlay (On-Page Badge)

A small, non-intrusive floating badge appears near the product price on supported pages:

```
┌─────────────────────────┐
│ 🧵 Sust: 68/C  $1.11/w │
│     Click for details   │
└─────────────────────────┘
```

Clicking it opens the full extension side panel.

### 9.3 Design Principles
- **Non-intrusive:** Never block the shopping experience; badge is dismissible
- **Glanceable:** Scores are immediately readable without interaction
- **Actionable:** Every score has a one-line "so what" explanation
- **Connected:** Clear pathways to the web app for deeper analysis

---

## 10. Non-Functional Requirements

| Requirement | Target | Notes |
|-------------|--------|-------|
| Extension Load Time | < 500ms popup render | Pre-fetch scores when product page detected |
| API Response Time | < 1.5s for /score endpoint | Use Redis cache for repeat queries |
| Extension Size | < 2MB packed | Minimize dependencies in content script |
| Browser Support | Chrome 120+ | Manifest V3 baseline |
| Offline Behavior | Show cached scores if available | Graceful fallback: "Connect to score this item" |
| Privacy | No PII collected without consent | Only product data sent to backend; user browsing history never stored |
| Accessibility | WCAG 2.1 AA | Popup must be keyboard-navigable; screen reader labels on all scores |
| Retailer Resilience | DOM selectors versioned per retailer | Alert system when extraction success rate drops below 80% for a retailer |

---

## 11. Analytics & Success Metrics

### 11.1 Key Metrics

| Metric | Definition | Target (3 months post-launch) |
|--------|-----------|-------------------------------|
| Weekly Active Users (WAU) | Unique users who open the extension popup ≥1x/week | 5,000 |
| Score Views / User / Week | Average number of product scores viewed per user per week | 8 |
| Web App Click-Through Rate | % of extension users who click "See Full Analysis →" | 15% |
| Alternative Click-Through (S2) | % of users who click on a suggested alternative | 10% |
| Retailer Coverage Success | % of product pages where fiber content is successfully extracted | > 85% |
| Retention (Week 4) | % of installers still active after 4 weeks | 30% |

### 11.2 Events to Track

| Event | Payload |
|-------|---------|
| `extension_installed` | version, browser_version |
| `product_page_detected` | retailer, product_category |
| `score_displayed` | retailer, sustainability_score, sustainability_grade, trend_score, health_score, cpw |
| `extraction_failed` | retailer, failure_reason |
| `popup_opened` | retailer, time_on_page_before_open |
| `web_app_cta_clicked` | retailer, product_id |
| `alternative_clicked` | alternative_brand, price_delta, score_delta |
| `manual_fiber_input` | retailer (unsupported) |

---

## 12. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Retailers change DOM structure | High | High | Version DOM selectors per retailer in a config file; automated health checks; community-reported breakage alerts |
| Fiber content not on product page | Medium | High | Fallback to manual input; Stage 2 can infer from product name/category |
| Chrome Web Store rejection | Low | High | Follow MV3 best practices; justify host permissions in listing; minimize requested permissions |
| API rate limiting (trend data sources) | Medium | Medium | Redis caching layer; batch trend queries; degrade gracefully (show fiber score without trend score) |
| User trust / data privacy concerns | Medium | High | Transparent privacy policy; no browsing history collection; open-source scoring algorithm |

---

## 13. Release Plan

| Milestone | Target Date | Scope |
|-----------|------------|-------|
| Alpha (Internal) | TBD | Fiber scoring on 3 retailers; popup UI; team testing |
| Beta (Closed) | TBD | 5 retailers; trend scoring; 50 beta users from user interviews |
| Stage 1 GA | TBD | 8+ retailers; all 4 scores; Chrome Web Store listing |
| Stage 2 Launch | TBD | Alternative suggestions; image similarity |
| Stage 3 Exploration | TBD | Brand sustainability profiles |

---

## 14. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | What is the minimum viable set of retailers for launch? | Product | Open |
| 2 | Should we require user accounts in Stage 1 or keep it anonymous? | Product/Eng | Open |
| 3 | How do we handle mixed-fiber garments where percentages aren't listed (e.g., "Cotton/Polyester blend")? | Engineering | Open |
| 4 | What is the legal exposure for scraping retailer product pages? | Legal | Open |
| 5 | Should the trend score in the extension be a simplified version of the web app's trend decay model? | Data/Product | Open |
| 6 | How do we handle currency conversion for international users? | Engineering | Open |

---

## 15. Appendix

### A. Fiber Health Impact Reference

| Fiber / Treatment | Health Concern | Score |
|-------------------|---------------|-------|
| Organic Cotton | None known | ✅ Safe |
| Conventional Cotton | Pesticide residues (minimal on finished garment) | ✅ Safe |
| Linen | None known | ✅ Safe |
| Polyester | Microplastic shedding; skin irritation in some individuals | ⚠️ Caution |
| Acrylic | Microplastic shedding; VOC off-gassing potential | ⚠️ Caution |
| Formaldehyde-treated (wrinkle-free finishes) | Skin irritation, carcinogen classification | 🔴 Avoid |
| PFAS-treated (water/stain resistant) | Endocrine disruption, environmental persistence | 🔴 Avoid |

### B. Extension Permissions Required

```json
{
  "permissions": [
    "activeTab",
    "storage",
    "sidePanel"
  ],
  "host_permissions": [
    "https://www.zara.com/*",
    "https://www2.hm.com/*",
    "https://www.asos.com/*",
    "https://www.shein.com/*",
    "https://www.amazon.com/*"
  ]
}
```