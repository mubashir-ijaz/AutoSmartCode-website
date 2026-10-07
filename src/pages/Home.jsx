import { useState } from "react";
import { Link } from "react-router-dom";
import { FAQS } from "../data/content";
import { scraperBySlug } from "../data/scrapers";
import { PRICING, PRICE_COMPARISON, money, priceById } from "../data/pricing";
import { APPS_SCRIPT_URL, CONTACT_EMAIL } from "../config";
import { useSeo } from "../useSeo";
import AuctionPipeline from "../components/AuctionPipeline";
import Photo from "../components/Photo";
import "./Home.css";
import "../components/AuctionPipeline.css";

/* The homepage sells one thing to one buyer: automation and data for the car
   trade. A visitor should understand it from the hero alone — real cars in the
   background, the headline saying what it is, and a watch-list card on the
   right showing what they get back. Everything below is proof and detail. */

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

/* The six jobs. Each card is a photo, a plain sentence and a link to the page
   that explains it properly. */
const JOBS = [
  {
    photo: "auction-yard", icon: "🔨",
    title: "Auction run-list triage",
    text: "Manheim, ADESA, ACV and OPENLANE run lists read overnight. Your filters applied to every car, bad ones dropped, good ones in your watch list by 6 AM.",
    to: "/services/auction-run-list-triage",
  },
  {
    photo: "parked-row", icon: "📄",
    title: "Carfax & AutoCheck in bulk",
    text: "Hundreds of VINs checked at once on your own accounts — accidents, owners, title brands and odometer flags in one sheet instead of 300 tabs.",
    to: "/services/vehicle-history-reports",
  },
  {
    photo: "lot-rows", icon: "📈",
    title: "MMR & market pricing",
    text: "Manheim MMR, retail comps and sold prices pulled for every car, so each one comes with a max bid that still holds your margin.",
    to: "/manheim-mmr-scraper",
  },
  {
    photo: "dealer-forecourt", icon: "🔎",
    title: "Find cars across every site",
    text: "eBay Motors, AutoTrader, CarGurus, Cars.com and Copart searched daily for your buy box. You get an alert when a match lists under your number.",
    to: "/ebay-motors-scraper",
  },
  {
    photo: "suv-lineup", icon: "🧩",
    title: "Custom dealer extension",
    text: "An Autoniq-style browser panel built to your workflow — scan a VIN and history, MMR and your margin show on the listing. Yours to keep, no per-seat fee.",
    to: "/services/dealer-browser-extension",
  },
  {
    photo: "open-road", icon: "🏁",
    title: "Competitor & inventory tracking",
    text: "Watch competitor lots and price drops, days on market by trim, and what's selling in your area — refreshed every night, delivered to a sheet or your DMS.",
    to: "/services/car-auction-automation",
  },
];

const STATS = [
  { n: "5,000 → 800", l: "cars in the sale, cut to the ones worth bidding on" },
  { n: "6 AM", l: "watch list ready, notes written, before you're in" },
  { n: "20+", l: "auctions, report sites and marketplaces automated" },
  { n: "3–7 days", l: "from first email to running every sale day" },
];

const STEPS = [
  { n: "1", title: "Tell me your auctions and buy box", desc: "Which sites you buy on and what a good car looks like — years, mileage, grade, title, margin. Plain English is fine." },
  { n: "2", title: "See one real sale done for you", desc: "Before you pay for a build I run your rules on an actual upcoming sale and send you the list. Wrong calls get fixed then." },
  { n: "3", title: "It runs every sale day", desc: "Overnight, on your own accounts. If an auction site changes, you get an alert the same morning and I fix it." },
];

/* Every platform page, grouped the way a buyer thinks about them. */
const SITE_GROUPS = [
  { title: "Wholesale auctions", slugs: ["manheim-mmr-scraper", "adesa-scraper", "acv-auctions-scraper", "openlane-scraper", "backlotcars-scraper", "edge-pipeline-scraper", "smartauction-scraper", "dealer-marketplace-scraper"] },
  { title: "Salvage auctions", slugs: ["copart-scraper", "iaa-scraper"] },
  { title: "History reports", slugs: ["carfax-scraper", "autocheck-scraper"] },
  { title: "Retail marketplaces", slugs: ["ebay-motors-scraper", "autotrader-scraper", "cars-com-scraper", "cargurus-scraper", "carmax-scraper", "autonation-scraper", "autoscout24-scraper", "carsales-scraper", "otomoto-scraper"] },
];

const TESTIMONIALS = [
  {
    initials: "JR", color: "#34d399", name: "James R.", role: "Used Car Dealer, New York",
    text: "Our buyer used to spend four hours on the run list and still missed cars. Now 5,000 lots get cut to about 800 overnight, every one with notes and a max bid. He walks in and starts bidding.",
  },
  {
    initials: "DK", color: "#60a5fa", name: "Dave K.", role: "Wholesaler, Florida",
    text: "I was paying per seat for a VIN tool and still copying numbers into my own sheet. Sam built the panel I actually wanted — my margin maths right on the listing — for less than four months of what I was renting.",
  },
  {
    initials: "MT", color: "#a78bfa", name: "Marcus T.", role: "Dealer Group, Texas",
    text: "Three auctions, one watch list, no duplicate VINs. The branded titles and the heavy-recon cars are gone before anyone sees the list. That alone changed what we buy.",
  },
];

/* ---------------- Hero watch-list card ---------------- */

function WatchListCard() {
  return (
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
              <span className="price-build">{money(p.build)}</span>
              {p.monthly
                ? <span className="price-monthly">+ {money(p.monthly)}<em>/mo</em></span>
                : <span className="price-monthly one">one-off</span>}
            </div>
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
  "Auction run-list triage & watch list",
  "Carfax / AutoCheck reports in bulk",
  "MMR / market pricing automation",
  "Find cars on eBay Motors, AutoTrader & others",
  "Custom dealer browser extension",
  "Competitor & inventory tracking",
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
      "Automation for car dealers and wholesalers: Manheim, ADESA, Copart and eBay Motors " +
      "scraped, every VIN checked against Carfax, AutoCheck and MMR, watch list ready by 6 AM.",
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
            <span className="hero-eyebrow">🚗 Automation &amp; data scraping for the car trade</span>

            <h1 className="hero-h1">
              Car dealer automation{" "}
              <span className="hero-grad">&amp; auction data scraping</span>
            </h1>

            <p className="hero-desc">
              I pull every car from <strong>Manheim, ADESA, Copart, eBay Motors</strong> and 20+
              other sites, check each VIN against <strong>Carfax, AutoCheck and MMR</strong>, and
              hand you a ranked buy list with notes — before the sale opens.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-blue">Get a Free Quote →</a>
              <a href="#how" className="btn btn-outline">See how it works</a>
            </div>

            <div className="hero-trust">
              <span>⚡ Live in 3–7 days</span>
              <span>🔒 Runs on your own accounts</span>
              <span>💵 From {money(priceById("oneoff").build)}</span>
            </div>
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

      {/* ============ WHAT I AUTOMATE ============ */}
      <section className="section jobs-section" id="services">
        <div className="container">
          <div className="section-head">
            <span className="s-label">What gets automated</span>
            <h2 className="s-title">The work your desk does by hand — done overnight</h2>
            <p className="s-sub">
              Six jobs every dealer and wholesaler repeats each week. Each one runs on a
              schedule and lands in your inbox, a Google Sheet or the auction's own watch list.
            </p>
          </div>

          <div className="jobs-grid">
            {JOBS.map(j => (
              <Link to={j.to} key={j.title} className="job-card">
                <div className="job-photo">
                  <Photo name={j.photo} alt="" />
                  <span className="job-icon">{j.icon}</span>
                </div>
                <div className="job-body">
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                  <span className="job-more">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section how-section" id="how">
        <div className="container">
          <div className="section-head">
            <span className="s-label">How it works</span>
            <h2 className="s-title">What happens to your run list overnight</h2>
            <p className="s-sub">
              Every car pulled, your filters applied, every surviving VIN checked, notes
              written and the watch list ready before anyone is in.
            </p>
          </div>

          <AuctionPipeline />

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
            <h2 className="s-title">Auctions, history reports and marketplaces</h2>
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
            <h2 className="s-title">Fixed prices. No per-seat fees.</h2>
            <p className="s-sub">
              Quoted in 24 hours, and the build belongs to you when it's done. Add a buyer,
              add the whole desk — the price doesn't move.
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
