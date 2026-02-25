import { useEffect, useMemo, useState } from "react";
import type { RuntimeMessage, ScoredProductPayload } from "../types";

type LoadState = "loading" | "ready" | "empty" | "error";
type ActiveTabContext = {
  url: string;
  title: string;
};

const currencyFormatter = (currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  });

const gradeColor = (grade: string): string => {
  if (grade === "A" || grade === "B") {
    return "bg-emerald-600";
  }

  if (grade === "C" || grade === "D") {
    return "bg-amber-500";
  }

  return "bg-rose-700";
};

const App = () => {
  const [tabId, setTabId] = useState<number | null>(null);
  const [activeTabContext, setActiveTabContext] = useState<ActiveTabContext | null>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [payload, setPayload] = useState<ScoredProductPayload | null>(null);
  const [manualFiberText, setManualFiberText] = useState("");
  const [manualProductName, setManualProductName] = useState("");
  const [manualPrice, setManualPrice] = useState("");
  const [manualSubmitting, setManualSubmitting] = useState(false);
  const [manualError, setManualError] = useState("");

  const loadCurrentTabScore = async () => {
    setLoadState("loading");

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) {
      setLoadState("error");
      return;
    }

    setTabId(tab.id);
    setActiveTabContext({
      url: tab.url ?? "",
      title: tab.title ?? "Manual Product"
    });
    setManualProductName(tab.title ?? "Manual Product");

    const message: RuntimeMessage = {
      type: "UNRAVEL_GET_SCORE_FOR_TAB",
      tabId: tab.id
    };

    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError || !response?.ok) {
        setLoadState("error");
        return;
      }

      if (!response.data) {
        setPayload(null);
        setLoadState("empty");
        return;
      }

      const scorePayload = response.data as ScoredProductPayload;
      setPayload(scorePayload);
      setManualFiberText(scorePayload.product.fiberText || "");
      setManualProductName(scorePayload.product.productName);
      setManualPrice(scorePayload.product.price ? String(scorePayload.product.price) : "");
      setLoadState("ready");
    });
  };

  useEffect(() => {
    void loadCurrentTabScore();
  }, []);

  const scoreWidth = useMemo(() => {
    if (!payload) {
      return "0%";
    }

    return `${Math.max(0, Math.min(100, payload.score.sustainabilityScore.value))}%`;
  }, [payload]);

  const submitManualFiber = () => {
    if (!tabId || !manualFiberText.trim()) {
      return;
    }

    const parsedManualPrice = Number(manualPrice);
    const safeManualPrice = Number.isFinite(parsedManualPrice) ? parsedManualPrice : undefined;

    setManualSubmitting(true);
    setManualError("");

    const message: RuntimeMessage = {
      type: "UNRAVEL_SCORE_MANUAL_FIBERS",
      tabId,
      fiberText: manualFiberText,
      seed: payload
        ? undefined
        : {
            productUrl: activeTabContext?.url ?? "",
            productName: manualProductName || "Manual Product",
            price: safeManualPrice
          }
    };

    chrome.runtime.sendMessage(message, (response) => {
      setManualSubmitting(false);

      if (chrome.runtime.lastError || !response?.ok || !response?.data) {
        setManualError(response?.error ?? "Could not score with manual fiber input.");
        return;
      }

      setPayload(response.data as ScoredProductPayload);
      setLoadState("ready");
    });
  };

  if (loadState === "loading") {
    return <div className="popup-shell">Analyzing this product...</div>;
  }

  if (loadState === "error") {
    return <div className="popup-shell">Could not load product score for this tab.</div>;
  }

  if (!payload) {
    return (
      <div className="popup-shell">
        <h1 className="text-lg font-semibold">Unravel</h1>
        <p className="mt-2 text-sm text-slate-700">
          Auto-extraction has not produced a score yet. You can still score manually from the
          visible composition text.
        </p>
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-slate-600">
          Product Name
        </label>
        <input
          className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
          value={manualProductName}
          onChange={(event) => setManualProductName(event.target.value)}
        />
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-slate-600">
          Price (optional)
        </label>
        <input
          className="mt-1 w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
          inputMode="decimal"
          value={manualPrice}
          onChange={(event) => setManualPrice(event.target.value)}
          placeholder="49.90"
        />
        <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-slate-600">
          Fiber Content
        </label>
        <textarea
          className="mt-1 h-20 w-full resize-none rounded-md border border-slate-300 px-2 py-2 text-xs"
          value={manualFiberText}
          onChange={(event) => setManualFiberText(event.target.value)}
          placeholder="55% linen, 30% cotton, 15% polyester"
        />
        {manualError ? <p className="mt-1 text-xs text-rose-700">{manualError}</p> : null}
        <button
          type="button"
          onClick={submitManualFiber}
          disabled={manualSubmitting || !manualFiberText.trim()}
          className="mt-2 w-full rounded-md border border-slate-400 px-2 py-1.5 text-xs font-semibold"
        >
          {manualSubmitting ? "Scoring..." : "Score with manual fiber input"}
        </button>
      </div>
    );
  }

  const priceDisplay = payload.product.price
    ? currencyFormatter(payload.product.currency).format(payload.product.price)
    : "Price unavailable";

  return (
    <main className="popup-shell">
      <header className="mb-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-unravel-accent">Unravel</p>
        <h1 className="line-clamp-2 text-base font-semibold text-unravel-ink">{payload.product.productName}</h1>
        <p className="text-xs text-slate-600">
          {payload.product.brand} · {priceDisplay}
        </p>
      </header>

      <section className="rounded-xl bg-unravel-card p-3 shadow-card">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">
          Sustainability Score
        </p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-3xl font-bold text-unravel-ink">
            {payload.score.sustainabilityScore.value}
            <span className="ml-1 text-lg">/100</span>
          </p>
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold text-white ${gradeColor(
              payload.score.sustainabilityScore.grade
            )}`}
          >
            Grade {payload.score.sustainabilityScore.grade}
          </span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-slate-200">
          <div className="h-2 rounded-full bg-unravel-accent" style={{ width: scoreWidth }} />
        </div>
        <p className="mt-2 text-xs text-slate-600">
          Fiber {payload.score.sustainabilityScore.featureContributions.fiberComposition.featureValue} ·
          Brand {payload.score.sustainabilityScore.featureContributions.brandReputation.featureValue} ·
          Trend {payload.score.sustainabilityScore.featureContributions.microTrendLongevity.featureValue}
        </p>
      </section>

      <section className="mt-3 grid grid-cols-2 gap-2">
        <article className="rounded-xl bg-unravel-card p-3 shadow-card">
          <p className="text-[11px] uppercase tracking-wide text-slate-600">Trend</p>
          <p className="mt-1 text-base font-semibold text-unravel-ink">{payload.score.trendScore.label}</p>
          <p className="text-xs text-slate-600">~{payload.score.trendScore.lifespanWeeks} weeks</p>
        </article>

        <article className="rounded-xl bg-unravel-card p-3 shadow-card">
          <p className="text-[11px] uppercase tracking-wide text-slate-600">Cost / Wear</p>
          <p className="mt-1 text-base font-semibold text-unravel-ink">
            {currencyFormatter(payload.product.currency).format(payload.score.cpwEstimate.costPerWear)}
          </p>
          <p className="text-xs text-slate-600">
            adj {currencyFormatter(payload.product.currency).format(payload.score.cpwEstimate.trendAdjustedCpw)}
          </p>
        </article>
      </section>

      <section className="mt-3 rounded-xl bg-unravel-card p-3 shadow-card">
        <p className="text-[11px] uppercase tracking-wide text-slate-600">Health</p>
        <p className="mt-1 text-base font-semibold text-unravel-ink">{payload.score.healthScore.label}</p>
        {payload.score.healthScore.flags.length > 0 ? (
          <p className="mt-1 text-xs text-slate-600">Flags: {payload.score.healthScore.flags.join(", ")}</p>
        ) : (
          <p className="mt-1 text-xs text-slate-600">No known concern flags detected.</p>
        )}
      </section>

      <button
        type="button"
        className="mt-3 w-full rounded-lg bg-unravel-accent px-3 py-2 text-sm font-semibold text-white"
        onClick={() => {
          void chrome.tabs.create({ url: payload.score.webAppDeepLink });
        }}
      >
        See Full Trend Analysis
      </button>

      <section className="mt-3 rounded-xl border border-dashed border-slate-300 p-3">
        <p className="text-[11px] uppercase tracking-wide text-slate-600">Manual Fiber Input</p>
        <p className="mt-1 text-xs text-slate-600">
          If extraction is wrong, paste text like: <span className="font-medium">55% linen, 30% cotton, 15% polyester</span>.
        </p>
        <textarea
          className="mt-2 h-20 w-full resize-none rounded-md border border-slate-300 px-2 py-2 text-xs"
          value={manualFiberText}
          onChange={(event) => setManualFiberText(event.target.value)}
        />
        {manualError ? <p className="mt-1 text-xs text-rose-700">{manualError}</p> : null}
        <button
          type="button"
          onClick={submitManualFiber}
          disabled={manualSubmitting}
          className="mt-2 w-full rounded-md border border-slate-400 px-2 py-1.5 text-xs font-semibold"
        >
          {manualSubmitting ? "Scoring..." : "Re-score with manual fiber content"}
        </button>
      </section>
    </main>
  );
};

export default App;
