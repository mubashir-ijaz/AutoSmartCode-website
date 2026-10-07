/**
 * ============================================================
 *  THE ONLY FILE WITH PRICES IN IT — EDIT THE NUMBERS HERE
 * ============================================================
 *
 * Every price shown anywhere on the site comes from this file: the homepage
 * pricing band, the service pages, the extension page and the FAQ answers.
 * Change a number here and it changes everywhere, so the site can never
 * quote a dealer one figure and a different one two clicks later.
 *
 * These are starting figures written to undercut the per-seat subscription
 * tools dealers already pay for. They are deliberately low because that is
 * the pitch. Replace any of them with your real numbers.
 *
 *   build    one-off build fee — what they pay to get it working
 *   monthly  what it costs to keep running (hosting, fixes, site changes)
 *   note     the qualifier shown under the price, in the buyer's language
 */

export const PRICING = [
  {
    id: "watchlist",
    emoji: "📋",
    accent: "green",
    name: "Auction Run-List Triage",
    blurb:
      "The whole run list read overnight, the bad cars dropped, the good ones " +
      "sitting in your watch list with notes before you reach the office.",
    build: 450,
    monthly: 149,
    note: "per auction platform · unlimited cars per sale",
    includes: [
      "Every car in the sale pulled, not a sample",
      "Your filters — year, mileage, grade, make, title status",
      "Carfax / AutoCheck / MMR pulled per car",
      "Notes written automatically in your own wording",
      "Watch list built for you before the lane opens",
    ],
    popular: true,
  },
  {
    id: "extension",
    emoji: "🧩",
    accent: "violet",
    name: "Custom Dealer Extension",
    blurb:
      "An Autoniq-style browser extension built to your workflow — scan a VIN " +
      "and every report you pay for opens in the same tab, not nine of them.",
    build: 600,
    monthly: 39,
    note: "one-time build · yours to keep, no per-seat fee",
    includes: [
      "VIN read straight off the auction page",
      "Title, history, MMR and book values in one panel",
      "Your margin maths shown on the car, live",
      "Works on the portals you actually buy on",
      "Installs for your whole desk — seats are free",
    ],
  },
  {
    id: "oneoff",
    emoji: "📄",
    accent: "blue",
    name: "One-Off Data Pull",
    blurb:
      "A single sale, a single market, a single spreadsheet. No subscription, " +
      "no commitment — useful for seeing whether any of this is for you.",
    build: 150,
    monthly: null,
    note: "one sale or one market · delivered in 48 hours",
    includes: [
      "One auction sale or one market scraped in full",
      "Delivered as Excel, CSV or a Google Sheet",
      "History reports and MMR included per car",
      "No account, no subscription, no lock-in",
      "Credited against a full build if you go ahead",
    ],
  },
];

/* Shown next to the pricing band — what a dealer is paying today for less. */
export const PRICE_COMPARISON = {
  claim: "Per-seat tools charge every buyer on your desk, every month, forever.",
  detail:
    "A custom build is paid for once and belongs to you. Add a third buyer, " +
    "a fourth, the whole desk — the price does not move.",
};

export const money = n => "$" + n.toLocaleString("en-US");

/** "$450 build + $149/mo" — the one-line form used in body copy and FAQs. */
export const priceLine = p =>
  p.monthly ? `${money(p.build)} build + ${money(p.monthly)}/mo` : `${money(p.build)} one-off`;

export const priceById = id => PRICING.find(p => p.id === id);
