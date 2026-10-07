/**
 * ============================================================
 *  THE ONLY FILE WITH PRICES IN IT — EDIT THE NUMBERS HERE
 * ============================================================
 *
 * Every price card on the site comes from this file: the homepage pricing
 * band, the hero, the section CTAs and the prerendered HTML. Prices written
 * into FAQ answers (content.js, services.js, scrapers.js) must be kept in
 * step with these by hand.
 *
 *   price    what is shown big — "$500", "$50–$100", "Custom"
 *   per      what follows it — "/month", "one-off"
 *   unit     the line under it — what one price covers
 *   note     the small print, in the buyer's language
 */

export const PRICING = [
  {
    id: "extension",
    emoji: "🧩",
    accent: "violet",
    name: "VIN-Scan Extension",
    blurb:
      "Scans the car for you and shows real-time MMR, Carfax, AutoCheck and your " +
      "max bid on the same screen. No copying VINs, no tabs, no coming back.",
    price: "$50–$100",
    per: "/month",
    unit: "depending on the data sources shown",
    note: "no setup fee · works on your own accounts",
    includes: [
      "VIN read straight off the auction or marketplace page",
      "MMR, Carfax, AutoCheck & Autoniq data in one panel",
      "Uses your own dealer accounts, in real time",
      "Your recon, fees and margin maths — ends on a max bid",
      "Updates when an auction site changes, included",
    ],
  },
  {
    id: "watchlist",
    emoji: "🌙",
    accent: "green",
    name: "Overnight Auction Watch List",
    blurb:
      "The whole run list read while you sleep — bad cars dropped, good ones in " +
      "your watch list with notes and a max bid before you reach the office.",
    price: "$500",
    per: "/month",
    unit: "per auction site · every sale, Mon–Fri",
    note: "e.g. 3 sales a day = 15 sales a week, all included",
    includes: [
      "Every car in every sale, not a sample",
      "Your buy box — year, mileage, grade, title, margin",
      "Carfax, AutoCheck and MMR checked per car",
      "A written note and max bid on every car",
      "Cars in your watch list + ranked email by 6 AM",
    ],
    popular: true,
  },
  {
    id: "custom",
    emoji: "📡",
    accent: "amber",
    name: "Marketplaces & Custom Software",
    blurb:
      "Daily alerts from OPENLANE, Facebook Marketplace, eBay, government and lease " +
      "sales — or a custom system that ties Manheim, Carfax and Autoniq together.",
    price: "Custom",
    per: "",
    unit: "fixed price, quoted in 24 hours",
    note: "you see it working before you commit",
    includes: [
      "Marketplace, government & lease sale monitoring",
      "Only new matches, checked against your buy box",
      "Custom dashboards connecting your accounts",
      "DMS hand-off and team alerts",
      "Built in stages — fixed price each",
    ],
  },
  {
    id: "oneoff",
    emoji: "📄",
    accent: "blue",
    name: "Try One Sale",
    blurb:
      "Send me one upcoming sale and your buy box. You get the watch list it " +
      "produces, so you can judge the calls before you sign up.",
    price: "$150",
    per: "one-off",
    unit: "one sale, delivered in 48 hours",
    note: "credited to your first month if you go ahead",
    includes: [
      "One full auction sale triaged",
      "History and MMR on every kept car",
      "Excel, CSV or Google Sheet",
      "No subscription, no commitment",
    ],
  },
];

/* Shown under the pricing band. */
export const PRICE_COMPARISON = {
  claim: "Every service runs on your own dealer accounts.",
  detail:
    "Your Manheim, MMR, Carfax, AutoCheck and Autoniq logins — nothing shared " +
    "between clients, and nothing bid on automatically.",
};

/** "$500/month — per auction site …" — the one-line form used in prerendered HTML. */
export const priceLine = p =>
  `${p.price}${p.per ? (p.per.startsWith("/") ? p.per : " " + p.per) : ""} — ${p.unit}`;

export const priceById = id => PRICING.find(p => p.id === id);
