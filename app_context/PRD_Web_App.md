# Product Requirements Document: Unravel — Web Application (Micro-Trend Death Clock)

**Product Name:** Unravel Web App — Micro-Trend Death Clock
**Team:** Digital Arts and Media Build Team — Fashion Sustainability Subteam
**Document Version:** 1.0
**Date:** 2026-02-21
**Author:** @DudeUnoob

---

## 1. Executive Summary

The Unravel Web App is a standalone web application centered around the **Micro-Trend Death Clock** — a tool that predicts the lifespan of fashion trends and shows shoppers the *real* cost of buying into a trend that's about to die. Users can enter a product name, description, or image, and the app pulls trend velocity data, fits a decay curve, and outputs a **Trend Lifespan Score** with projected cost-per-wear accounting for style obsolescence.

At the core of the scoring system is a **ML-based Sustainability Score** — a trained Gradient Boosted Regressor that synthesizes three input features into a single 0–100 score: fiber composition (material quality and environmental impact), brand sustainability reputation (sourced from Good On You, B Corp, and the Fashion Transparency Index), and micro-trend longevity (how long the item will realistically be worn before style obsolescence). This moves beyond a simple fiber lookup and captures the full lifecycle sustainability picture of a garment.

The web app serves as the **deep analysis companion** to the Unravel Chrome Extension. Users arriving from the extension receive pre-populated product data and see richer visualizations, historical trend curves, sustainability score breakdowns, and alternative comparisons that don't fit in a browser extension popup.

---

## 2. Problem Statement

Shoppers have no way to know whether an item they're looking at is a timeless staple or a micro-trend with a 3-week lifespan — which directly determines real cost per wear and whether the purchase is wasteful.

**The cost of ignorance:**
- A $45 trendy top worn 4 times before the trend dies = **$11.25/wear**
- A $45 classic top worn 40 times over 2 years = **$1.13/wear**
- The "cheap" trendy piece is actually **10x more expensive** per use

---

## 3. Vision & Strategic Context

### 3.1 Product Vision
> "See the expiration date on every trend — before you buy into it."

The Micro-Trend Death Clock transforms abstract fashion intuition ("I think this might be trendy") into **quantified projections** backed by real data from social media, search trends, and time-series modeling.

### 3.2 Relationship to Chrome Extension
The web app is the **destination** that the Chrome extension points to. Together, they form a complete purchase decision workflow:

```
┌─────────────────────────────────────────────────────────────┐
│                    USER SHOPPING JOURNEY                      │
│                                                               │
│  1. BROWSE          2. QUICK SCORE        3. DEEP ANALYSIS   │
│  ┌──────────┐      ┌──────────────┐      ┌────────────────┐ │
│  │ Shopping  │ ──►  │   Chrome     │ ──►  │   Web App      │ │
│  │ Page      │      │   Extension  │      │   Micro-Trend  │ │
│  │           │      │   Popup      │      │   Death Clock  │ │
│  │           │      │              │      │                │ │
│  │           │      │ Sust: 68/C   │      │ Trend Curve 📈 │ │
│  │           │      │ Trend: ⚡    │      │ Decay Model    │ │
│  │           │      │ CPW: $1.11   │      │ Full CPW Math  │ │
│  │           │      │              │      │ Sust. Breakdown│ │
│  │           │      │ [Full →]     │      │ Brand Profile  │ │
│  └──────────┘      └──────────────┘      └────────────────┘ │
│                                                               │
│  4. DIRECT ACCESS (no extension)                             │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  User goes directly to unravel.app                    │    │
│  │  Enters product name, description, or uploads image   │    │
│  │  Gets full trend analysis + scoring                   │    │
│  └──────────────────────────────────────────────────────┘    │
└────���────────────────────────────────────────────────────────┘
```

### 3.3 Entry Points to Web App

| Entry Point | Context Passed | Experience |
|-------------|---------------|------------|
| Chrome Extension CTA | Product name, URL, fiber data, scores, product ID | Pre-populated analysis page; instant deep results |
| Direct URL (organic/social) | None | Landing page → manual input (product name, description, or image upload) |
| Shared Analysis Link | Analysis ID | View a previously generated analysis (shareable results) |

---

## 4. Target Users

### 4.1 Primary Persona: The Conscious Browser (Extension User)
- **Arrives from:** Chrome extension "See Full Analysis →" CTA
- **Goal:** Understand *how long* this trend will last and whether the real CPW justifies the purchase
- **Expectation:** Sees their specific product already analyzed; wants the trend curve and comparison data

### 4.2 Secondary Persona: The Trend-Curious Researcher
- **Arrives from:** Direct navigation, social media, word of mouth
- **Goal:** Explore whether a style/trend they're considering is worth investing in
- **Behavior:** Enters style keywords like "barrel leg jeans" or "butter yellow" to see trend status
- **Expectation:** Dashboard-style output with clear verdict

### 4.3 Tertiary Persona: The Content Creator / Fashion Writer
- **Arrives from:** Direct navigation
- **Goal:** Get data-backed trend projections for content creation
- **Behavior:** Runs multiple queries; wants shareable/embeddable results

---

## 5. Core Features

### 5.1 Feature Map

| ID | Feature | Description | Priority | Stage |
|----|---------|-------------|----------|-------|
| W-1.1 | Landing Page | Marketing page explaining Unravel's value prop; CTA to try the analyzer or install extension | P0 | 1 |
| W-1.2 | Trend Analyzer Input | Multi-modal input: text (product name/description), URL (product page link), or image upload | P0 | 1 |
| W-1.3 | Trend Velocity Engine | Pull trend data from Google Trends, TikTok API, Pinterest Trends for the given style/keyword | P0 | 1 |
| W-1.4 | Trend Decay Curve Model | Time-series model that fits a growth/decay curve to the trend data; projects peak and decline | P0 | 1 |
| W-1.5 | Trend Lifespan Score | Output classification: Timeless → Trending → Fading → Dead, with estimated weeks remaining | P0 | 1 |
| W-1.6 | CPW Projection | Calculate cost-per-wear accounting for trend lifespan: CPW = Price ÷ (Estimated Wears Before Trend Death) | P0 | 1 |
| W-1.7 | Comparison Callout | Show side-by-side: "This trendy item: $11.25/wear vs. Classic equivalent: $2.25/wear" | P0 | 1 |
| W-1.8 | Trend Decay Visualization | Animated chart showing the trend curve (past data + projected future) with peak/death markers | P0 | 1 |
| W-1.9 | Extension Deep Link Handler | Accept URL params from Chrome extension; pre-populate analysis with product data including sustainability score breakdown | P0 | 1 |
| W-1.10 | Sustainability Score Display | Show the ML-generated sustainability score (0–100) with a full feature breakdown: fiber composition contribution, brand reputation contribution, and micro-trend longevity penalty | P0 | 1 |
| W-2.1 | Alternative Suggestions | Show 2–5 comparable items with better scores; powered by CLIP visual similarity + fiber filtering | P0 | 2 |
| W-2.2 | Image Analysis (CLIP) | Process uploaded product images to identify style attributes for trend matching and alternative search | P0 | 2 |
| W-2.3 | Shareable Results | Generate a unique URL for each analysis that can be shared on social media | P1 | 1 |
| W-2.4 | Historical Trend Gallery | Browse past trend analyses; see which trends the model correctly predicted as dying | P1 | 2 |
| W-3.1 | Brand Sustainability Profile | Dedicated brand page with aggregated sustainability data, sourced from company pages and third-party ratings | P2 | 3 |
| W-3.2 | User Accounts | Sign up/login to save analyses, track purchase decisions, build a "wardrobe scorecard" | P2 | 2 |
| W-3.3 | Wardrobe CPW Tracker | Logged-in users can track items they've bought and see running CPW as they log wears | P3 | 2+ |

---

## 6. Trend Analysis Engine — Technical Detail

### 6.1 Data Sources

| Source | Data Type | API / Method | Refresh Rate |
|--------|-----------|-------------|--------------|
| Google Trends | Search interest over time (0–100 index) | PyTrends (unofficial) or SerpAPI | Every 6 hours (cached) |
| TikTok | Hashtag view counts, growth rate | TikTok Research API / scraping | Every 12 hours |
| Pinterest | Pin volume, trending searches | Pinterest Trends API | Every 12 hours |
| Instagram (optional) | Hashtag post volume | Meta Graph API | Every 24 hours |

### 6.2 Trend Decay Model

```
Input: Time-series of trend interest (weekly data points, 12–52 weeks)

Step 1: Normalize all data sources to a 0–100 scale
Step 2: Compute composite trend index (weighted average across sources)
Step 3: Fit a modified logistic decay curve:
         I(t) = K / (1 + e^(-r(t - t_peak))) for growth phase
         I(t) = K × e^(-λ(t - t_peak)) for decay phase

Where:
  K = peak interest level
  r = growth rate
  t_peak = estimated peak time
  λ = decay rate

Step 4: Project future values using fitted parameters
Step 5: Define "trend death" as I(t) < 15% of peak value
Step 6: Calculate weeks_until_death = t_death - t_now

Output:
  - trend_phase: "Rising" | "Peaking" | "Declining" | "Dead"
  - trend_lifespan_label: "Timeless" | "Trending" | "Fading" | "Dead"
  - weeks_until_peak: int (if still rising)
  - weeks_until_death: int (projected)
  - confidence: float (model R² on historical fit)
  - velocity: float (rate of change per week)
```

### 6.3 Trend Lifespan Classification

| Label | Criteria | Color |
|-------|----------|-------|
| **Timeless** | No significant decay pattern detected; stable interest over 52+ weeks | 🟢 Green |
| **Trending** | Currently rising or at peak; projected lifespan > 12 weeks remaining | 🟡 Yellow |
| **Fading** | Past peak; 4–12 weeks of relevance remaining | 🟠 Orange |
| **Dead** | < 4 weeks remaining OR already below 15% of peak | 🔴 Red |

### 6.4 CPW Calculation (Trend-Adjusted)

```
Standard CPW:
  cpw_standard = price / estimated_total_wears
  (estimated_total_wears based on fiber durability: e.g., polyester tee = 30, linen shirt = 80)

Trend-Adjusted CPW:
  wears_before_trend_death = wears_per_week × weeks_until_death
  cpw_trend_adjusted = price / min(estimated_total_wears, wears_before_trend_death)

Example:
  Item: Mesh ballet flat, $89
  Fiber durability estimate: 60 wears
  Trend lifespan: 8 weeks remaining
  Wears per week (avg): 2
  Wears before trend death: 16
  
  Standard CPW: $89 / 60 = $1.48/wear
  Trend-Adjusted CPW: $89 / 16 = $5.56/wear ← This is the real cost

  Comparison classic:
  Classic leather ballet flat, $95
  Trend lifespan: Timeless (no decay)
  Wears: 60 (full durability)
  CPW: $95 / 60 = $1.58/wear ← 3.5x cheaper per wear
```

### 6.5 ML Sustainability Scoring Model

The Sustainability Score is the single most important output for garment evaluation. It replaces a naive fiber-only weighted average with a trained ML model that captures the full lifecycle sustainability picture of an item.

#### Model Architecture

```
Model Type: Gradient Boosted Regressor (scikit-learn GradientBoostingRegressor or XGBoost)
Output:     Sustainability Score — continuous 0–100 (mapped to grade A–F)
Training:   Labeled garment dataset (y = known sustainability rating from Good On You + expert annotation)
```

#### Input Features

**Feature 1 — Fiber Composition** (~50% model weight)

Preprocessed from raw fiber content into a single 0–1 numeric feature:

```
fiber_feature = Σ (fiber_percentage_i × fiber_rank_i) / 100

Fiber rank lookup:
  Organic Linen:        0.95    Hemp:                 0.92
  Organic Cotton:       0.90    Tencel/Lyocell:       0.88
  Recycled Wool:        0.85    Conventional Cotton:  0.65
  Recycled Polyester:   0.60    Viscose/Rayon:        0.45
  Nylon/Spandex blend:  0.30    Conventional Polyester: 0.25
  Acrylic:              0.20
```

**Feature 2 — Brand Sustainability Reputation** (~30% model weight)

Normalized 0–1 brand score aggregated from third-party data sources stored in Supabase:

```
Sources:
  - Good On You (1–5 star rating → normalized 0–1)
  - B Corp Certification (binary: 1.0 if certified, 0.5 if pending, 0.0 if not)
  - Fashion Transparency Index (0–100% → normalized)
  - Remake Fashion Accountability Report (0–100 → normalized)
  - Scraped brand sustainability page signals (certifications, pledges → heuristic 0–1)

brand_feature = normalize(weighted_avg(good_on_you × 0.35, bcorp × 0.25,
                                       fti × 0.25, remake × 0.10, scrape × 0.05))
```

Brand data is refreshed weekly and cached in Supabase. Unknown brands default to a mid-range prior (0.40) with a displayed "Brand data unavailable" notice.

**Feature 3 — Micro-Trend Longevity** (~20% model weight)

Sustainability penalty for items that will be worn rarely before trend obsolescence. Derived from the Trend Decay Model output:

```
trend_feature mapping (from Trend Lifespan Score):
  Timeless  → 1.00  (full longevity — no wear cycle penalty)
  Trending  → 0.75  (minor penalty — trend healthy but finite)
  Fading    → 0.40  (significant penalty — near end of cycle)
  Dead      → 0.10  (severe penalty — essentially obsolete)
```

#### Model Pipeline

```
Stage 1 MVP — Weighted Ensemble (before sufficient labeled data):
  sustainability_score = (
      fiber_feature  × 0.50 +
      brand_feature  × 0.30 +
      trend_feature  × 0.20
  ) × 100

Stage 1+ — Supervised Model (once 500+ labeled garment samples collected):
  X = [fiber_feature, brand_feature, trend_feature,
       category_encoded, price_tier, n_fibers]   ← additional engineered features
  y = sustainability_label  (sourced from Good On You + expert review panel)

  model = GradientBoostingRegressor(n_estimators=200, max_depth=4, learning_rate=0.05)
  model.fit(X_train, y)
  sustainability_score = model.predict(X_new) * 100
```

#### Training Data Sources

| Source | Volume (estimated) | Label Type |
|--------|-------------------|------------|
| Good On You brand database | ~3,000 brands | Brand + material ratings |
| Fashion Transparency Index | ~250 major brands/year | Transparency score |
| B Corp brand registry | ~9,000 certified companies | Binary certification |
| Remake Accountability Report | ~50 major brands/year | Labor + environment score |
| Internal expert annotation | ~500 garments (seed set) | Direct sustainability score |

#### Score Grade Mapping

| Score | Grade | Label |
|-------|-------|-------|
| 90–100 | A | Excellent |
| 75–89 | B | Good |
| 50–74 | C | Average |
| 25–49 | D | Poor |
| 0–24 | F | Avoid |

---

## 7. User Experience

### 7.1 Page Structure

```
Route Map:
/                       → Landing page (marketing + CTA)
/analyze                → Trend analyzer tool (main feature)
/analyze/[id]           → Specific analysis result (shareable)
/extension-redirect     → Handler for extension deep links (redirects to /analyze with params)
/brands/[slug]          → Brand sustainability profile (Stage 3)
/about                  → About the project / methodology
/dashboard              → User dashboard (Stage 2+ — logged in users)
```

### 7.2 Landing Page (`/`)

```
┌─────────────────────��────────────────────────────────────────┐
│  🧵 UNRAVEL                                    [Try It] [⬇ Extension]│
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│           The sustainability of your clothes,                │
│                    UNRAVELED.                                │
│                                                              │
│    See the expiration date on any trend.                     │
│    Know the real cost before you buy.                        │
│                                                              │
│    ┌──────────────────────────────────────────┐              │
│    │  Enter a product, trend, or style...     │              │
│    │  [🔍 Analyze]     or   [📷 Upload Image] │              │
│    └──────────────────────────────────────────┘              │
│                                                              │
│    ── HOW IT WORKS ────────────────────────────              │
│    1. Enter a product or trend                               │
│    2. We pull data from TikTok, Pinterest, Google            │
│    3. Our model predicts when the trend dies                 │
│    4. See the REAL cost per wear                             │
│                                                              │
│    ── EXAMPLE ─────────────────────────────────              │
│    "This silhouette peaked 6 weeks ago.                      │
│     Projected 8 wears before trend death → $11.25/wear.     │
│     A comparable classic cut: projected 40 wears →           │
│     $2.25/wear."                                             │
│                                                              │
│    ── GET THE EXTENSION ───────────────────────              │
│    [Chrome Web Store Badge] Score items while you shop →     │
│                                                              │
│    ── FOOTER ──────────────────────────────────              │
│    About | Methodology | Privacy | GitHub                    │
└──────────────────────────────────────────────────────────────┘
```

### 7.3 Analyzer Page (`/analyze`)

```
┌──────────────────────────────────────────────────────────────────────┐
│  🧵 UNRAVEL — Micro-Trend Death Clock                               │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐      │
│  │  What are you looking at?                                   │      │
│  │  [Mesh ballet flats                              ] [Analyze]│      │
│  │  Or: [Paste product URL] | [📷 Upload image]               │      │
│  └────────────────────────────────────────────────────────────┘      │
│                                                                      │
│  ═══════════════════════════════════════════════════════════════      │
│                                                                      │
│  ┌─── TREND LIFESPAN ──────────────────────────────────────┐        │
│  │                                                          │        │
│  │   ●━━━━━━━━━━━━━━●━━━━━━━━●━━━━━━━━━○                   │        │
│  │   Timeless    Trending   ▲Fading     Dead                │        │
│  │                       YOU ARE HERE                        │        │
│  │                                                          │        │
│  │   Status: FADING 🟠                                      │        │
│  │   Peaked: ~6 weeks ago                                   │        │
│  │   Estimated weeks remaining: 8                           │        │
│  │   Confidence: 78%                                        │        │
│  └──────────────────────────────────────────────────────────┘        │
│                                                                      │
│  ┌─── TREND DECAY CURVE ───────────────────────────────────┐        │
│  │     📈 Interest Over Time                                │        │
│  │   100│         ╱╲                                        ���        │
│  │    80│        ╱  ╲                                       │        │
│  │    60│      ╱╱    ╲╲     ← You are here                  │        │
│  │    40│    ╱╱        ╲╲                                    │        │
│  │    20│  ╱╱           ╲╲╲╲╲╲ (projected)                  │        │
│  │     0│╱╱                  ╲╲╲───── trend death            │        │
│  │      └──────────────────────────────                     │        │
│  │       -26w  -18w  -10w  Now  +4w  +8w  +12w             │        │
│  │                                                          │        │
│  │   Data sources: Google Trends · TikTok · Pinterest       │        │
│  └──────────────────────────────────────────────────────────┘        │
│                                                                      │
│  ┌─── COST PER WEAR ──────────────────────────────────────┐         │
│  │                                                         │         │
│  │  If you buy this item at $89:                           │         │
│  │                                                         │         │
│  │   TRENDY VERSION              CLASSIC EQUIVALENT        │         │
│  │   ┌──────────────┐           ┌──────────────┐          │         │
│  │   │ Mesh Ballet   │           │ Leather Ballet│          │         │
│  │   │ Flat   $89    │           │ Flat    $95   │          │         │
│  │   │               │           │               │          │         │
│  │   │ Wears: ~16    │           │ Wears: ~60    │          │         │
│  │   │ CPW: $5.56 🔴│           │ CPW: $1.58 🟢│          │         │
│  │   └──────────────┘           └──────────────┘          │         │
│  │                                                         │         │
│  │   ⚠️ The trendy version costs 3.5x more per wear       │         │
│  └─────────────────────────────────────────────────────────┘         │
│                                                                      │
│  ┌─── SUSTAINABILITY SCORE ───────────────────────────────┐          │
│  │  (Shown when product URL provided or extension data)    │          │
│  │                                                         │          │
│  │   68 / C  🟡  ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░    │          │
│  │                                                         │          │
│  │  ┌─ Feature Breakdown ──────────────────────────────┐  │          │
│  │  │ 🧵 Fiber Composition      0.72  ×50%  → 36 pts  │  │          │
│  │  │    55% Linen · 30% Cotton · 15% Polyester        │  │          │
│  │  │ 🏷 Brand Reputation       0.55  ×30%  → 16 pts  │  │          │
│  │  │    Good On You: 3/5 · FTI: 42% · Not B-Corp      │  │          │
│  │  │ 📉 Trend Longevity        0.75  ×20%  → 15 pts  │  │          │
│  │  │    Status: Trending (~14 wks remaining)           │  │          │
│  │  └──────────────────────────────────────────────────┘  │          │
│  │  Health: ✅ Safe  |  Fiber Durability: ~45 wears        │          │
│  └─────────────────────────────────────────────────────────┘         │
│                                                                      │
│  ┌─── BETTER ALTERNATIVES (Stage 2) ──────────────────────┐         │
│  │  Similar styles, better scores:                         │         │
│  │  ┌─────┐ ┌─────┐ ┌─────┐                               │         │
│  │  │ 📷  │ │ 📷  │ │ 📷  │                               │         │
│  │  │$58  │ │$72  │ │$45  │                               │         │
│  │  │A/91 │ │B/85 │ │B/79 │                               │         │
│  │  │$0.97│ │$1.20│ │$1.13│ /wear                         │         │
│  │  └─────┘ └─────┘ └─────┘                               │         │
│  └─────────────────────────────────────────────────────────┘         │
│                                                                      │
│  [📋 Share this analysis]  [🧵 Get the Chrome Extension]            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### 7.4 Design System

| Element | Specification |
|---------|--------------|
| Framework | shadcn/ui components (Cards, Badges, Sliders, Tooltips) |
| Typography | Inter (body), Space Grotesk (headings/scores) |
| Color Palette | Sage green (primary), warm cream (background), coral (alerts), charcoal (text) |
| Score Colors | 🟢 #22C55E (Timeless/A), 🟡 #EAB308 (Trending/B-C), 🟠 #F97316 (Fading/D), 🔴 #EF4444 (Dead/F) |
| Animations | Framer Motion for: Trend gauge animation, curve drawing, score counter, card transitions |
| Responsive | Mobile-first; fully functional on phone screens (secondary use case) |
| Dark Mode | Supported via Tailwind `dark:` variants; default follows system preference |

---

## 8. Technical Architecture

### 8.1 System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                              │
│                                                                    │
│  ┌──────────────────────┐       ┌──────────────────────────────┐ │
│  │   Chrome Extension    │       │        Next.js Web App       │ │
│  │   (React + Vite)      │       │    (App Router + RSC)        │ │
│  │                       │       │                              │ │
│  │   Content Script      │       │  /           Landing         │ │
│  │   Popup Panel         │──────►│  /analyze    Analyzer        │ │
│  │   Service Worker      │ link  │  /analyze/id Results         │ │
│  │                       │       │  /brands     Brand profiles  │ │
│  └───────────┬───────────┘       └──────────────┬───────────────┘ │
│              │                                   │                  │
└──────────────┼───────────────────────────────────┼──────────────────┘
               │                                   │
               │         HTTPS / REST              │
               ▼                                   ▼
┌──────────────────────────────────────────────────────────────────┐
│                        API LAYER                                  │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                  FastAPI (Python)                          │    │
│  │                                                            │    │
│  │  POST /api/v1/score          — ML sustainability scoring    │    │
│  │  POST /api/v1/trend          — Trend analysis              │    │
│  │  POST /api/v1/trend/image    — Image-based trend lookup    │    │
│  │  POST /api/v1/alternatives   — Similar item suggestions    │    │
│  │  GET  /api/v1/analysis/:id   — Retrieve saved analysis     │    │
│  │  GET  /api/v1/brands/:slug   — Brand sustainability data   │    │
│  │                                                            │    │
│  │  Middleware: Rate limiting, CORS, Auth (optional)          │    │
│  └──────────────────────┬───────────────────────────────────┘    │
│                          │                                        │
└──────────────────────────┼────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────────┐
│  Supabase    │  │  Redis       │  │  External APIs   │
│  PostgreSQL  │  │  (Upstash)   │  │                  │
│              │  │              │  │  Google Trends    │
│  - Fiber DB  │  │  - Trend     │  │  Google Trends    │
│  - Brand     │  │    cache     │  │  TikTok API      │
│    Ratings   │  │  - Sust.     │  │  Pinterest API   │
│  - Analyses  │  │    score     │  │  Good On You     │
│  - Users     │  │    cache     │  │  (SerpAPI)       │
│  - Brands    │  │              │  │                  │
│  - pgvector  │  │              │  │                  │
│    embeddings│  │              │  │                  │
└──────────────┘  └──────────────┘  └──────────────────┘
```

### 8.2 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 16+ (App Router) | SSR for landing page SEO; server components for fast initial load; API routes for BFF pattern |
| Language | TypeScript | Type safety across the full frontend |
| Styling | Tailwind CSS + shadcn/ui | Rapid development with pre-built accessible components |
| Animation | Framer Motion | Smooth trend gauge, curve animations; essential for "demo wow factor" |
| Charts | Recharts or D3.js | Trend decay curve visualization |
| State Management | React Server Components + `nuqs` (URL state) | Analyses should be URL-driven for shareability |
| Image Upload | Supabase Storage + presigned URLs | For CLIP analysis in Stage 2 |
| Auth (Stage 2+) | Supabase Auth | User accounts for saved analyses |
| Deployment | Vercel | Native Next.js hosting; edge functions for API routes |
| Analytics | PostHog or Plausible | Privacy-friendly analytics |

### 8.3 Backend (Shared with Extension)

| Service | Purpose |
|---------|---------|
| FastAPI (Python) | All ML/scoring/trend logic |
| Pydantic v2 | Request/response schemas |
| Uvicorn | ASGI server |
| Supabase PostgreSQL | Persistent data storage |
| pgvector | Vector similarity for alternatives |
| Redis (Upstash) | Trend data caching (6-hour TTL) |
| PyTrends / SerpAPI | Google Trends data |
| CLIP (OpenAI) | Image embedding for visual similarity |
| statsmodels / scipy | Time-series curve fitting for trend decay model |
| scikit-learn | ML Sustainability Score model (GradientBoostingRegressor); feature preprocessing pipelines |
| XGBoost | Drop-in GBR replacement post-MVP once labeled dataset is large enough |
| pandas / numpy | Feature engineering; brand rating aggregation; training data management |
| joblib | Model serialization and loading for inference |

---

## 9. API Contract (Web App ↔ Backend)

### 9.1 Analyze Trend

```
POST /api/v1/trend

Request Body:
{
  "query": "mesh ballet flats",           // text query
  "product_url": null,                     // optional: product page URL
  "image_url": null,                       // optional: uploaded image URL
  "price": 89.00,                          // optional: for CPW calculation
  "currency": "USD",
  "source": "web_app"                      // or "extension"
}

Response:
{
  "analysis_id": "trend_a1b2c3d4",
  "query_normalized": "mesh ballet flats",
  "trend_lifespan": {
    "label": "Fading",
    "color": "orange",
    "score": 35,                           // 0 (Dead) – 100 (Timeless)
    "peaked_weeks_ago": 6,
    "weeks_remaining": 8,
    "confidence": 0.78,
    "velocity": -3.2                       // interest change per week
  },
  "trend_curve": {
    "data_points": [
      { "week": "2025-W40", "interest": 22, "source": "composite" },
      { "week": "2025-W41", "interest": 35, "source": "composite" },
      // ... weekly data points
      { "week": "2026-W08", "interest": 58, "source": "composite" },
      // ... projected future
      { "week": "2026-W12", "interest": 40, "projected": true },
      { "week": "2026-W16", "interest": 18, "projected": true },
      { "week": "2026-W20", "interest": 8, "projected": true }
    ],
    "peak_week": "2026-W02",
    "death_week": "2026-W18",
    "model_type": "logistic_decay",
    "r_squared": 0.82
  },
  "cpw_analysis": {
    "provided_price": 89.00,
    "standard_cpw": 1.48,
    "standard_wears": 60,
    "trend_adjusted_cpw": 5.56,
    "trend_adjusted_wears": 16,
    "wears_per_week_assumed": 2,
    "classic_comparison": {
      "description": "Classic leather ballet flat",
      "price": 95.00,
      "cpw": 1.58,
      "wears": 60,
      "multiplier": 3.5                   // trendy is 3.5x more expensive per wear
    }
  },
  "data_sources": {
    "google_trends": { "available": true, "last_updated": "2026-02-21T08:00:00Z" },
    "tiktok": { "available": true, "last_updated": "2026-02-21T06:00:00Z" },
    "pinterest": { "available": true, "last_updated": "2026-02-21T04:00:00Z" }
  },
  "shareable_url": "https://unravel.app/analyze/trend_a1b2c3d4",
  "web_app_deep_link": "https://unravel.app/analyze?id=trend_a1b2c3d4"
}
```

### 9.2 Extension Deep Link Handler

```
GET /extension-redirect?pid={product_id}&name={encoded_name}&url={encoded_url}&sustainability_score={score}&source=extension

→ Redirects to: /analyze?pid={product_id}&source=extension
→ Pre-populates analyzer with extension data
→ Triggers trend analysis automatically
```

### 9.3 Get Saved Analysis

```
GET /api/v1/analysis/{analysis_id}

Response: Same as POST /api/v1/trend response (cached result)
```

---

## 10. Non-Functional Requirements

| Requirement | Target | Notes |
|-------------|--------|-------|
| Landing Page Load (LCP) | < 1.5s | Use Next.js Server Components; static marketing content |
| Analysis Result Time | < 4s total | 1s API call + 1s model computation + 2s animation reveal |
| Trend Data Freshness | < 6 hours | Redis cache TTL; background refresh jobs |
| Concurrent Users | 500 simultaneous | Uvicorn workers + Vercel edge |
| Uptime | 99.5% | Vercel + managed Supabase |
| SEO | Lighthouse SEO > 95 | Landing page statically rendered; meta tags for shared analyses |
| Mobile Responsive | Fully functional on 375px+ | Primary desktop; secondary mobile |
| Accessibility | WCAG 2.1 AA | All charts must have alt text / data table fallback |
| Data Privacy | GDPR-ready | No PII stored without consent; analyses deletable |
| Rate Limiting | 30 analyses/hour per IP (unauthenticated) | Prevent abuse of trend API calls |
| Shareable Links | Analyses persist for 90 days (unauthenticated) | Authenticated users: indefinite |

---

## 11. Analytics & Success Metrics

### 11.1 Key Metrics

| Metric | Definition | Target (3 months) |
|--------|-----------|-------------------|
| Monthly Active Users (MAU) | Unique users who complete ≥1 analysis/month | 10,000 |
| Analyses per User per Session | Average number of trend queries per visit | 2.5 |
| Extension → Web App Conversion | % of extension users who visit the web app | 15% |
| Social Shares | Number of shared analysis links per month | 500 |
| Bounce Rate (Landing) | % of landing page visitors who leave without interacting | < 50% |
| Analysis Completion Rate | % of users who enter a query and wait for results (don't abandon) | > 80% |
| Extension Install Rate | % of web app users who install the Chrome extension | 8% |
| Return Rate (Week 4) | % of users who return within 4 weeks | 25% |

### 11.2 Events to Track

| Event | Payload |
|-------|---------|
| `page_view` | route, referrer, source (extension/direct/social) |
| `analysis_started` | input_type (text/url/image), query_text |
| `analysis_completed` | analysis_id, trend_label, cpw, duration_ms |
| `analysis_abandoned` | input_type, time_before_abandon |
| `share_clicked` | analysis_id, share_method (copy_link/twitter/etc) |
| `alternative_clicked` | analysis_id, alternative_brand, price_delta |
| `extension_cta_clicked` | page, position |
| `extension_deeplink_arrived` | product_id, retailer |
| `account_created` | source (web/extension) |

---

## 12. Content & Copywriting Requirements

### 12.1 Tone & Voice
- **Authoritative but accessible:** Data-driven insights without academic jargon
- **Slightly provocative:** "This trend has 3 weeks to live" — create urgency without fear-mongering
- **Empowering:** Frame every insight as giving the user power over their purchase decisions
- **Never preachy:** Don't guilt-trip; show the numbers and let users decide

### 12.2 Key Messaging

| Context | Message |
|---------|---------|
| Headline | "See the expiration date on every trend" |
| Subheadline | "Know the real cost per wear before you buy" |
| Fading Trend Alert | "This silhouette peaked 6 weeks ago. Projected 8 wears before trend death → $11.25/wear." |
| Classic Comparison | "A comparable classic cut: projected 40 wears → $2.25/wear." |
| Dead Trend | "⚰️ This trend flatlined 4 weeks ago. You'll get maybe 2 wears before it feels dated." |
| Timeless | "🌿 This style has been consistent for 3+ years. Buy with confidence." |

---

## 13. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Trend API rate limits (Google Trends, TikTok) | High | High | Aggressive Redis caching (6hr TTL); batch queries; SerpAPI as paid fallback for Google Trends |
| Trend model accuracy | Medium | High | Start with conservative confidence thresholds; show confidence score to users; collect feedback to improve model; backtest against known dead trends |
| Low query diversity (users all search same trends) | Medium | Low | Cache benefits: popular queries are pre-cached; expand trend database with automated daily crawls |
| User confusion about CPW concept | Medium | Medium | Inline explainer tooltips; "What is Cost Per Wear?" modal; visual comparison as primary output |
| Cold start (no users, no data) | High | Medium | Pre-seed with 50+ analyzed trends; create "Trend Graveyard" content marketing; partner with fashion influencers for launch |
| Legal concerns with scraping trend data | Medium | High | Use official APIs where available; PyTrends is rate-limited but not TOS-violating for personal use; SerpAPI for production |
| Image analysis cost (CLIP inference) | Medium | Medium | Batch process; use cached embeddings; consider on-device inference for common styles |

---

## 14. Release Plan

| Milestone | Target Date | Scope |
|-----------|------------|-------|
| Design Sprint | TBD | Wireframes, brand identity, design system in Figma |
| Alpha (Internal) | TBD | Landing page + text-based trend analyzer; Google Trends only; team testing |
| Beta (Closed) | TBD | + TikTok/Pinterest data; + fiber score display; + extension deep links; 50 beta users |
| Stage 1 GA | TBD | Full trend analyzer; 3 data sources; shareable links; extension integration live |
| Stage 2 Launch | TBD | + Alternative suggestions; + image upload; + CLIP similarity; + user accounts |
| Stage 3 Exploration | TBD | + Brand sustainability profiles |

---

## 15. Integration Contract: Extension ↔ Web App

This section defines the precise handoff protocol between the two products.

### 15.1 Extension → Web App (Deep Link)

```
URL Format:
https://unravel.app/extension-redirect
  ?pid={product_id}
  &name={url_encoded_product