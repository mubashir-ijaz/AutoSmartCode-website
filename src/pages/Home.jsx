import { useState } from "react";
import { Link } from "react-router-dom";
import { FAQS } from "../data/content";
import { scraperBySlug } from "../data/scrapers";
import { PRICING, PRICE_COMPARISON, priceById } from "../data/pricing";
import { APPS_SCRIPT_URL, CONTACT_EMAIL } from "../config";
import { useSeo } from "../useSeo";
import AuctionPipeline from "../components/AuctionPipeline";
import Photo from "../components/Photo";
import ExtensionDemo from "../components/ExtensionDemo";
import "./Home.css";
import "../components/AuctionPipeline.css";
import "../components/ExtensionDemo.css";

/* The homepage sells one thing to one buyer: automation and data for the car
   trade. A visitor should understand it from the hero alone — real cars in the
   background, the headline saying what it is, and a watch-list card on the
   right showing what they get back. Everything below is proof and detail. */

/* The three promises in the hero, each with its price so nobody has to scroll
   to find out what it costs. Prices come from pricing.js. */
const HERO_POINTS = [
  { text: "MMR, Carfax & AutoCheck right on the car page", price: priceById("extension").price + "/mo" },
  { text: "A clean auction watch list waiting every morning", price: priceById("watchlist").price + "/mo per site" },
  { text: "Daily deals from marketplaces, government & lease sales", price: null },
];

/* Scrolling strip under the hero — the names a dealer recognises instantly. */
const PLATFORMS = [
  "Manheim", "ADESA", "ACV Auctions", "OPENLANE", "Copart", "IAA", "Carfax",
  "AutoCheck", "Manheim MMR", "eBay Motors", "AutoTrader", "Cars.com",
  "CarGurus", "CarMax", "BacklotCars", "EDGE Pipeline", "SmartAuction",
  "AutoScout24", "Carsales", "NHTSA vPIC",
];

/* What the hero card shows — one sale, three cars, two kept and one dropped. */
const DEMO_CARS = [
  { car: "2021 Toyota RAV4 XLE", meta: "38k mi · Grade 4.2 · Clean title · 1 owner", mmr: "$24,900", max: "$22,100", keep: true },
  { car: "2019 Ford F-150 XLT", meta: "71k mi · Frame damage announced", mmr: "$27,300", max: "—", keep: false },
  { car: "2020 Honda Accord Sport", meta: "44k mi · Grade 3.9 · Clean Carfax", mmr: "$19,750", max: "$17,400", keep: true },
];

/* The four things AutoSmartCode does, in the order a dealer meets them. Each
   is a photo card linking to the page that explains it properly. */
const OFFERS = [
  {
    photo: "suv-lineup", icon: "🧩", tag: "Browser extension",
    title: "Scan the car, see everything on the same screen",
    text: "A custom extension reads the VIN off the listing and shows MMR, Carfax, AutoCheck and your max bid right there — no copying VINs, no five tabs, no coming back.",
    to: "/services/dealer-browser-extension", anchor: "#extension",
  },
  {
    photo: "auction-yard", icon: "🌙", tag: "Overnight auction triage",
    title: "A clean watch list when you reach the office",
    text: "While you sleep, the whole run list is read, filtered, checked and noted. By 6 AM the cars worth bidding on are in your watch list, ranked by margin.",
    to: "/services/auction-run-list-triage", anchor: "#overnight",
  },
  {
    photo: "dealer-forecourt", icon: "📡", tag: "Daily marketplace monitoring",
    title: "Marketplaces, government & lease sales, every day",
    text: "OPENLANE, Facebook Marketplace, eBay Motors, GovDeals, GSA Auctions and off-lease sales checked daily for your buy box. Only new matches reach you.",
    to: "/services/marketplace-government-lease-sales", anchor: "#marketplaces",
  },
  {
    photo: "showroom", icon: "🛠️", tag: "Custom dealer software",
    title: "Manheim, Carfax & Autoniq working as one system",
    text: "Software designed around how you buy — your accounts connected into one dashboard with your rules built in, so the business grows without more tabs.",
    to: "/services/custom-dealer-software", anchor: "#software",
  },
];

/* The extension section's before/after — the loop every buyer recognises. */
const OLD_WAY = [
  "Copy the VIN off the listing",
  "Open Carfax, paste, wait",
  "Open AutoCheck, paste, wait",
  "Open MMR, paste, adjust mileage",
  "Type it all into your margin sheet",
  "Go back to the car — next one",
];
const NEW_WAY = [
  "Open the listing",
  "MMR, Carfax & AutoCheck appear on the page",
  "Your recon, fees & margin already worked out",
  "Max bid and BID / PASS — decide and move on",
];

/* What happens overnight, by the clock. */
const NIGHT = [
  { t: "10:00 PM", h: "Run lists pulled", d: "Every car in tomorrow's Manheim, ADESA, ACV and OPENLANE sales." },
  { t: "11:30 PM", h: "Your buy box applied", d: "Years, mileage, grade, title and margin rules — most of the sale drops out." },
  { t: "1:00 AM", h: "Every VIN checked", d: "Carfax, AutoCheck, MMR and book values pulled on your own accounts." },
  { t: "3:30 AM", h: "Marketplaces & gov sales", d: "Facebook, eBay, GovDeals, GSA and lease sales checked for new matches." },
  { t: "5:00 AM", h: "Notes & max bids written", d: "One note per car in your wording, ending on the bid that holds your margin." },
  { t: "6:00 AM", h: "Watch list ready", d: "Cars in the auction's watch list and a ranked email in your inbox." },
];

/* Where marketplace monitoring looks, grouped for the band. */
const SOURCES = [
  { title: "Online & dealer marketplaces", items: ["OPENLANE", "eBay Motors", "Facebook Marketplace", "Craigslist", "AutoTrader private", "Cars.com private"] },
  { title: "Government & fleet sales", items: ["GSA Auctions", "GovDeals", "Public Surplus", "Police & municipal", "Fleet & rental portals"] },
  { title: "Lease & repo sales", items: ["Off-lease closed sales", "Lease-return sales", "Captive & bank sales", "Repo & lender portals"] },
];

/* The custom-software diagram: what plugs into the hub, and what comes out. */
const HUB_IN = ["Manheim", "MMR", "Carfax", "AutoCheck", "Autoniq", "OPENLANE / ACV"];
const HUB_OUT = ["Ranked buy list", "Max bid per car", "Team dashboard", "DMS hand-off", "SMS & email alerts", "Buy / pass reports"];

const STATS = [
  { n: "5,000 → 800", l: "cars in the sale, cut to the ones worth bidding on" },
  { n: "6 AM", l: "watch list ready, notes written, before you're in" },
  { n: "25+", l: "auctions, marketplaces and government sales automated" },
  { n: "0", l: "VINs copied by hand with a custom extension" },
];

const STEPS = [
  { n: "1", title: "Tell me how you buy", desc: "Which auctions and marketplaces you use and what a good car looks like — years, mileage, grade, title, margin. Plain English is fine." },
  { n: "2", title: "See it work first", desc: "Before you pay for a build I run your rules on a real upcoming sale and send you the list. Wrong calls get fixed then." },
  { n: "3", title: "It runs every day", desc: "On your own accounts, while you sleep. If a site changes, you get an alert the same morning and I fix it." },
];

/* Every platform page, grouped the way a buyer thinks about them. */
const SITE_GROUPS = [
  { title: "Wholesale auctions", slugs: ["manheim-mmr-scraper", "adesa-scraper", "acv-auctions-scraper", "openlane-scraper", "backlotcars-scraper", "edge-pipeline-scraper", "smartauction-scraper", "dealer-marketplace-scraper"] },
  { title: "Marketplaces", slugs: ["facebook-marketplace-car-scraper", "ebay-motors-scraper", "autotrader-scraper", "cars-com-scraper", "cargurus-scraper", "carmax-scraper", "autonation-scraper"] },
  { title: "Government & salvage", slugs: ["govdeals-scraper", "gsa-auctions-scraper", "copart-scraper", "iaa-scraper"] },
  { title: "History reports", slugs: ["carfax-scraper", "autocheck-scraper"] },
  { title: "International", slugs: ["autoscout24-scraper", "carsales-scraper", "otomoto-scraper"] },
];

/* The featured client. Real result, supplied by the owner: daily auctions and
   marketplaces handled, watch list ready when he arrives at 6 AM, and the
   business grew from 10-15 cars in stock to 150-200 as a wholesaler. */
const RICKY = {
  name: "Ricky",
  company: "Major Auto Sales",
  place: "New York, USA",
  short: "I walk in at 6 AM and my watch list is already done.",
  quote:
    "I walk into the office at 6 AM and the work is already done. Every auction has been gone through, the marketplaces are checked, and my watch list is sitting there with notes and max bids — I just sit down and start buying. When we started, we had 10 to 15 cars in inventory. Today we run 150 to 200 cars as a wholesaler. It changed how we run the business, and I'm happy with it every single day.",
  stats: [
    { from: "10–15", to: "150–200", l: "cars in inventory" },
    { from: "", to: "6 AM", l: "watch list ready, every sale day" },
    { from: "", to: "Daily", l: "auctions + marketplaces handled" },
  ],
};

const TESTIMONIALS = [
  {
    initials: "JR", color: "#34d399", name: "James R.", role: "Used Car Dealer, New York",
    text: "Our buyer used to spend four hours on the run list and still missed cars. Now 5,000 lots get cut to about 800 overnight, every one with notes and a max bid. He walks in and starts bidding.",
  },
  {
    initials: "DK", color: "#60a5fa", name: "Dave K.", role: "Wholesaler, Florida",
    text: "I was paying per seat for a VIN tool and still copying numbers into my own sheet. Sam built the panel I actually wanted — my margin maths right on the listing — for a fraction of what I was renting.",
  },
  {
    initials: "MT", color: "#a78bfa", name: "Marcus T.", role: "Dealer Group, Texas",
    text: "Three auctions, one watch list, no duplicate VINs. The branded titles and the heavy-recon cars are gone before anyone sees the list. That alone changed what we buy.",
  },
];

/* ---------------- Hero watch-list card ---------------- */

function WatchListCard() {
  return (
    <div className="wl-wrap">
    <span className="wl-float wl-float-top">☕ Ready at 6:00 AM</span>
    <div className="wl-card" aria-label="Example: an auction sale triaged overnight">
      <div className="wl-head">
        <span className="wl-dot" />
        <span className="wl-title">Manheim · Tuesday sale</span>
        <span className="wl-time">05:52 AM</span>
      </div>
      <div className="wl-funnel">
        <div><strong>5,214</strong><span>cars in sale</span></div>
        <span className="wl-arrow">→</span>
        <div><strong>812</strong><span>pass your rules</span></div>
        <span className="wl-arrow">→</span>
        <div className="wl-hot"><strong>47</strong><span>in watch list</span></div>
      </div>
      <ul className="wl-list">
        {DEMO_CARS.map(c => (
          <li key={c.car} className={c.keep ? "keep" : "drop"}>
            <span className="wl-badge">{c.keep ? "✓" : "✕"}</span>
            <div className="wl-car">
              <strong>{c.car}</strong>
              <span>{c.meta}</span>
            </div>
            <div className="wl-nums">
              <span>MMR {c.mmr}</span>
              <strong>{c.keep ? "Max " + c.max : "Dropped"}</strong>
            </div>
          </li>
        ))}
      </ul>
      <div className="wl-foot">Carfax ✓ · AutoCheck ✓ · MMR ✓ · notes written</div>
    </div>
    <span className="wl-float wl-float-bottom">🌙 Built while you slept</span>
    </div>
  );
}

/* ---------------- Pricing band ---------------- */

function PricingBand() {
  return (
    <div className="price-wrap">
      <div className="price-grid">
        {PRICING.map(p => (
          <div key={p.id} className={"price-card accent-" + p.accent + (p.popular ? " popular" : "")}>
            {p.popular && <span className="price-flag">Most dealers start here</span>}
            <div className="price-emoji">{p.emoji}</div>
            <h3>{p.name}</h3>
            <p className="price-blurb">{p.blurb}</p>

            <div className="price-figure">
              <span className="price-build">{p.price}</span>
              {p.per && <span className="price-monthly"><em>{p.per}</em></span>}
            </div>
            <div className="price-unit">{p.unit}</div>
            <div className="price-note">{p.note}</div>

            <ul className="price-includes">
              {p.includes.map(i => <li key={i}>{i}</li>)}
            </ul>

            <a href="#contact" className={"price-btn " + (p.popular ? "solid" : "")}>
              Get a fixed quote →
            </a>
          </div>
        ))}
      </div>

      <div className="price-compare">
        <strong>{PRICE_COMPARISON.claim}</strong> {PRICE_COMPARISON.detail}
      </div>
    </div>
  );
}

/* ---------------- Contact form ---------------- */

const NEEDS = [
  "Extension — MMR, Carfax & AutoCheck on the listing",
  "Overnight auction watch list",
  "Marketplace, government & lease sale alerts",
  "Custom software — connect Manheim, Carfax, Autoniq",
  "Carfax / AutoCheck reports in bulk",
  "One-off data pull (one sale)",
  "Something else / not sure",
];

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function submit() {
    if (!form.name || !form.email || !form.service || !form.message) {
      setStatus({ type: "error", text: "Please fill in all required fields." });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const date = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
      const params = new URLSearchParams({ ...form, date });
      await fetch(APPS_SCRIPT_URL + "?" + params.toString(), { method: "GET", mode: "no-cors" });
      setStatus({ type: "success", text: "Message sent! I'll email you at " + form.email + " within 24 hours." });
      setForm({ name: "", email: "", company: "", service: "", budget: "", message: "" });
    } catch (err) {
      window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=Project from " + form.name + "&body=Name: " + form.name + "%0AEmail: " + form.email + "%0AService: " + form.service + "%0A%0A" + encodeURIComponent(form.message);
      setStatus({ type: "success", text: "Opening your email client..." });
    }
    setLoading(false);
  }

  return (
    <div className="contact-form-card">
      <div className="form-head">
        <div className="form-head-title">Tell me what you want automated</div>
        <div className="form-head-sub">Which sites you use and what a good car looks like to you. I reply personally within 24 hours.</div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Your Name *</label>
          <input value={form.name} onChange={set("name")} placeholder="John Smith" />
        </div>
        <div className="form-group">
          <label>Email Address *</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="john@dealership.com" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Dealership / Company</label>
          <input value={form.company} onChange={set("company")} placeholder="Your dealership" />
        </div>
        <div className="form-group">
          <label>What You Need *</label>
          <select value={form.service} onChange={set("service")}>
            <option value="">Select...</option>
            {NEEDS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Which sites do you buy or sell on?</label>
        <input value={form.budget} onChange={set("budget")} placeholder="Manheim, ADESA, Copart, eBay Motors, a private dealer portal..." />
      </div>
      <div className="form-group">
        <label>Your buy box or the job — years, mileage, grade, margin *</label>
        <textarea value={form.message} onChange={set("message")} rows={5} placeholder="e.g. 2018+, under 90k miles, grade 3+, clean title only, need 12% margin after $1,500 recon..." />
      </div>
      <button className="form-btn" onClick={submit} disabled={loading}>
        {loading ? "Sending..." : "Send — I'll Reply Within 24hrs →"}
      </button>
      {status && <div className={"form-msg " + status.type}>{status.type === "success" ? "✅" : "⚠️"} {status.text}</div>}
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function Home() {
  useSeo({
    title: "Car Dealer Automation & Auction Data Scraping | AutoSmartCode",
    description:
      "Car dealer automation: extensions showing MMR, Carfax & AutoCheck on the listing, " +
      "overnight auction watch lists, and daily marketplace, government & lease sale alerts.",
    path: "/",
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  });

  return (
    <div className="home">

      {/* ============ HERO ============ */}
      <section className="hero">
        <Photo name="hero-dealer-lot" className="hero-photo" eager
               alt="Rows of used cars lined up on a dealer lot" />
        <div className="hero-shade" aria-hidden="true" />

        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="hero-eyebrow">Car dealer automation &amp; auction data scraping</span>

            <h1 className="hero-h1">
              Car dealer automation{" "}
              <span className="hero-grad">that works while you sleep.</span>
            </h1>

            <p className="hero-desc">
              For dealers, wholesalers and auction buyers — running on your own Manheim,
              Carfax, AutoCheck and Autoniq accounts.
            </p>

            <ul className="hero-points">
              {HERO_POINTS.map(h => (
                <li key={h.text}>
                  <span className="hp-tick" aria-hidden="true">✓</span>
                  <span className="hp-text">{h.text}</span>
                  {h.price && <span className="hp-price">{h.price}</span>}
                </li>
              ))}
            </ul>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-blue">Get a Free Quote →</a>
              <a href="#services" className="btn btn-outline">See what I build</a>
            </div>

            <a href="#results" className="hero-proof">
              <span className="hp-avatar" aria-hidden="true">R</span>
              <span className="hp-proof-text">
                <span className="hp-stars" aria-label="5 stars">★★★★★</span>
                “{RICKY.short}”
                <em>{RICKY.name} · {RICKY.company}, {RICKY.place}</em>
              </span>
            </a>
          </div>

          <WatchListCard />
        </div>

        <div className="ticker" aria-label="Platforms automated">
          <div className="ticker-track">
            {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
              <span key={i} aria-hidden={i >= PLATFORMS.length ? "true" : undefined}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOUR OFFERS ============ */}
      <section className="section offers-section" id="services">
        <div className="container">
          <div className="section-head">
            <span className="s-label">What I build for dealers</span>
            <h2 className="s-title">Four ways I take the busywork off your desk</h2>
            <p className="s-sub">
              Built for car dealers, wholesalers and auction buyers. Each one runs on your own
              accounts and pays for itself in hours saved and cars you would have missed.
            </p>
          </div>

          <div className="offers-grid">
            {OFFERS.map((o, i) => (
              <Link to={o.to} key={o.title} className="offer-card">
                <div className="offer-photo">
                  <Photo name={o.photo} alt="" />
                  <span className="offer-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="offer-body">
                  <span className="offer-tag">{o.icon} {o.tag}</span>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                  <span className="job-more">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED RESULT ============ */}
      <section className="section result-section" id="results">
        <Photo name="lot-rows" className="band-photo" alt="" />
        <div className="band-shade heavy" aria-hidden="true" />
        <div className="container result-wrap">
          <div className="result-copy">
            <span className="s-label">Client result · {RICKY.company}</span>
            <h2 className="s-title">From 15 cars to 200 — without working the list by hand</h2>
            <blockquote className="result-quote">
              <span className="hp-stars" aria-label="5 stars">★★★★★</span>
              <p>“{RICKY.quote}”</p>
              <footer>
                <span className="hp-avatar lg" aria-hidden="true">R</span>
                <span>
                  <strong>{RICKY.name}</strong>
                  <em>{RICKY.company} · {RICKY.place}</em>
                </span>
              </footer>
            </blockquote>
          </div>

          <div className="result-stats">
            {RICKY.stats.map(st => (
              <div key={st.l} className="result-stat">
                {st.from && <span className="rs-from">from {st.from} →</span>}
                <strong>{st.to}</strong>
                <span className="rs-l">{st.l}</span>
              </div>
            ))}
            <Link to="/projects/12" className="btn btn-blue result-btn">Read the case study →</Link>
          </div>
        </div>
      </section>

      {/* ============ 1 · EXTENSION ============ */}
      <section className="section ext-section" id="extension">
        <div className="container">
          <div className="section-head">
            <span className="s-label">01 · Custom VIN extension</span>
            <h2 className="s-title">Stop copying VINs. See MMR, Carfax &amp; AutoCheck on the car page.</h2>
            <p className="s-sub">
              I build a browser extension for your desk that scans the car automatically and
              shows real-time data on the same screen — an Autoniq-style panel built around
              your margin, from $50 to $100 a month with no setup fee.
            </p>
          </div>

          <div className="ba-grid">
            <div className="ba-card ba-old">
              <div className="ba-head"><span>✕</span> The way it works today</div>
              <ol>{OLD_WAY.map(s => <li key={s}>{s}</li>)}</ol>
              <div className="ba-foot">≈ 2 minutes a car · 50 cars = 1.5+ hours</div>
            </div>
            <div className="ba-card ba-new">
              <div className="ba-head"><span>✓</span> With your own extension</div>
              <ol>{NEW_WAY.map(s => <li key={s}>{s}</li>)}</ol>
              <div className="ba-foot">A few seconds a car · nothing to paste</div>
            </div>
          </div>

          <div className="ext-demo-wrap">
            <ExtensionDemo />
          </div>

          <div className="section-ctas">
            <Link to="/services/dealer-browser-extension" className="btn btn-blue">How the extension works →</Link>
            <span className="cta-note">Works on Manheim, ADESA, ACV, OPENLANE &amp; private portals · {priceById("extension").price}/month, no setup fee</span>
          </div>
        </div>
      </section>

      {/* ============ 2 · OVERNIGHT ============ */}
      <section className="section how-section" id="overnight">
        <div className="container">
          <div className="section-head">
            <span className="s-label">02 · Overnight auction triage</span>
            <h2 className="s-title">I work while you sleep. You walk into a clean watch list.</h2>
            <p className="s-sub">
              The whole sale is read, filtered, checked and noted overnight. When you reach the
              office the cars worth bidding on are already in your watch list.
            </p>
          </div>

          <ol className="night-line">
            {NIGHT.map(n => (
              <li key={n.t}>
                <span className="night-t">{n.t}</span>
                <strong>{n.h}</strong>
                <p>{n.d}</p>
              </li>
            ))}
          </ol>

          <AuctionPipeline />

          <div className="section-ctas">
            <Link to="/services/auction-run-list-triage" className="btn btn-blue">See auction triage →</Link>
            <span className="cta-note">{priceById("watchlist").price}/month per auction site · every sale, Mon–Fri</span>
          </div>
        </div>
      </section>

      {/* ============ 3 · MARKETPLACES / GOV / LEASE ============ */}
      <section className="section src-band" id="marketplaces">
        <Photo name="dealer-forecourt" className="band-photo" alt="" />
        <div className="band-shade" aria-hidden="true" />
        <div className="container">
          <div className="section-head">
            <span className="s-label">03 · Daily marketplace monitoring</span>
            <h2 className="s-title">Good cars outside the lanes — found for you every day</h2>
            <p className="s-sub">
              Private-party, government, fleet and off-lease cars are often cheaper because fewer
              dealers watch for them. Your buy box is checked against all of these daily.
            </p>
          </div>

          <div className="src-grid">
            {SOURCES.map(g => (
              <div key={g.title} className="src-col">
                <h3>{g.title}</h3>
                <div className="src-chips">
                  {g.items.map(i => <span key={i}>{i}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="section-ctas">
            <Link to="/services/marketplace-government-lease-sales" className="btn btn-blue">See marketplace monitoring →</Link>
            <Link to="/blog/government-off-lease-car-auctions-dealers" className="btn btn-outline">Guide: government &amp; off-lease auctions</Link>
          </div>
        </div>
      </section>

      {/* ============ 4 · CUSTOM SOFTWARE ============ */}
      <section className="section sw-section" id="software">
        <div className="container sw-wrap">
          <div className="sw-copy">
            <span className="s-label">04 · Custom dealer software</span>
            <h2 className="s-title">Your Manheim, Carfax &amp; Autoniq — working as one smart system</h2>
            <p className="s-sub">
              I design software around how your business buys and sells: the accounts you already
              pay for connected into one dashboard, your rules built in, and your team working
              from the same list. Built in stages, fixed price each, and you own the code.
            </p>
            <div className="section-ctas left">
              <Link to="/services/custom-dealer-software" className="btn btn-blue">Custom software →</Link>
              <a href="#contact" className="btn btn-outline">Talk about your idea</a>
            </div>
          </div>

          <div className="hub" aria-label="Your accounts feed one dashboard, which produces buy lists, max bids and alerts">
            <div className="hub-col">
              {HUB_IN.map(h => <span key={h} className="hub-in">{h}</span>)}
            </div>
            <div className="hub-core">
              <span className="hub-logo">⚙️</span>
              <strong>Your dashboard</strong>
              <em>your rules · your data</em>
            </div>
            <div className="hub-col">
              {HUB_OUT.map(h => <span key={h} className="hub-out">{h}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STEPS ============ */}
      <section className="section steps-section">
        <div className="container">
          <div className="section-head">
            <span className="s-label">How we start</span>
            <h2 className="s-title">Three steps, and you see it work before you pay</h2>
          </div>
          <div className="steps-grid">
            {STEPS.map(s => (
              <div key={s.n} className="step-card">
                <div className="step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATS BAND ============ */}
      <section className="stats-band">
        <Photo name="lot-rows" className="band-photo" alt="" />
        <div className="band-shade" aria-hidden="true" />
        <div className="container stats-grid">
          {STATS.map(s => (
            <div key={s.n} className="stat">
              <strong>{s.n}</strong>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SITES ============ */}
      <section className="section sites-section" id="sites">
        <div className="container">
          <div className="section-head">
            <span className="s-label">Sites I automate</span>
            <h2 className="s-title">Auctions, marketplaces, government sales &amp; history reports</h2>
            <p className="s-sub">
              Each one has its own page with the exact fields you get back. Buying on a
              portal that isn't listed? That's normal — <a href="#contact">send me the name</a>.
            </p>
          </div>

          <div className="sites-grid">
            {SITE_GROUPS.map(g => (
              <div key={g.title} className="sites-col">
                <h3>{g.title}</h3>
                <ul>
                  {g.slugs.map(slug => {
                    const s = scraperBySlug(slug);
                    if (!s) return null;
                    return (
                      <li key={slug}>
                        <Link to={"/" + slug}>
                          <span className="site-emoji">{s.emoji}</span>
                          {s.site}
                          <span className="site-arrow">→</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section testi-section">
        <div className="container">
          <div className="section-head">
            <span className="s-label">Dealers, wholesalers &amp; buyers</span>
            <h2 className="s-title">They stopped working the list by hand</h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="testi-card">
                <div className="stars">★★★★★</div>
                <p className="testi-text">“{t.text}”</p>
                <div className="testi-author">
                  <div className="avatar" style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="section pricing-section" id="pricing">
        <div className="container">
          <div className="section-head">
            <span className="s-label">Pricing</span>
            <h2 className="s-title">Simple monthly prices. No setup fees.</h2>
            <p className="s-sub">
              Updates when an auction site changes are always
              included, and you can try one sale for $150 before you sign up.
            </p>
          </div>

          <PricingBand />
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-head">
            <span className="s-label">FAQ</span>
            <h2 className="s-title">Questions dealers ask first</h2>
          </div>

          <div className="faq-list">
            {FAQS.map(f => (
              <details key={f.q} className="faq-item">
                <summary>
                  <span>{f.q}</span>
                  <span className="faq-mark" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="section contact-section" id="contact">
        <Photo name="showroom" className="band-photo" alt="" />
        <div className="band-shade heavy" aria-hidden="true" />
        <div className="container">
          <div className="contact-wrap">
            <div className="contact-info">
              <span className="s-label">Free quote in 24 hours</span>
              <h2 className="s-title">Send me one sale.<br />See what comes back.</h2>
              <p className="contact-desc">
                Tell me which auctions or sites you use and what a good car looks like to
                you. I'll run a real upcoming sale so you can judge the results before you
                commit to anything. You talk to me directly — no middlemen.
              </p>
              <div className="contact-details">
                {[
                  { icon: "📧", label: "Email — replies within 24hrs", val: CONTACT_EMAIL },
                  { icon: "🔨", label: "Sites covered", val: "Manheim, ADESA, ACV, Copart, IAA, eBay Motors & more" },
                  { icon: "⚡", label: "Live in 3–7 days", val: "You see one real sale done first" },
                  { icon: "🔒", label: "Your accounts, your data", val: "Never shared between clients · NDA on request" },
                ].map(d => (
                  <div key={d.val} className="c-detail">
                    <div className="c-icon">{d.icon}</div>
                    <div>
                      <div className="c-val">{d.val}</div>
                      <div className="c-label">{d.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  );
}
