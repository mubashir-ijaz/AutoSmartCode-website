import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/content";
import { APPS_SCRIPT_URL, CONTACT_EMAIL } from "../config";
import { useSeo, ORIGIN } from "../useSeo";
import "./Home.css";

const SERVICES = [
  {
    icon: "🕷️", accent: "blue",
    title: "Web Scraping & Data Extraction",
    desc: "Pull any data from any website at scale — products, prices, leads, listings, reviews. Delivered clean and structured as Excel, CSV, JSON, or straight into your database.",
    tags: ["Python", "Selenium", "Playwright", "Anti-bot bypass"]
  },
  {
    icon: "⚙️", accent: "green",
    title: "Process Automation",
    desc: "Automate the repetitive work — data entry, report generation, email alerts, file processing. Set it up once, then it runs every day without anyone touching it.",
    tags: ["Python", "Scheduling", "Email/SMTP", "Workflows"]
  },
  {
    icon: "🌐", accent: "cyan",
    title: "Web Development",
    desc: "Fast, modern websites and web apps that convert — eCommerce stores, portfolios, SaaS dashboards and admin panels built with React and Next.js.",
    tags: ["React", "Next.js", "Node.js", "Vercel"]
  },
  {
    icon: "🤖", accent: "violet",
    title: "AI & Data Analysis",
    desc: "AI-powered analysis of your business data — market intelligence, review sentiment, pricing trends and competitor research, delivered as reports you can act on.",
    tags: ["LLM APIs", "Pandas", "NLP", "Reports"]
  },
  {
    icon: "📋", accent: "amber",
    title: "Lead Generation",
    desc: "Targeted lead lists built from Google Maps, LinkedIn, Facebook, Yelp and industry directories. Name, email, phone, address — verified and ready to contact.",
    tags: ["Google Maps", "LinkedIn", "Email finder", "Verification"]
  },
  {
    icon: "🔔", accent: "rose",
    title: "Monitoring & Alert Bots",
    desc: "Custom bots that watch prices, stock levels, listings or auctions around the clock and message you the moment something changes worth knowing about.",
    tags: ["Telegram", "Slack", "Email alerts", "24/7 monitoring"]
  },
];

const STEPS = [
  { n: "01", title: "Tell me what you need", desc: "Send the URLs, the fields you want, and how often you need it. No technical spec required — plain English is fine." },
  { n: "02", title: "I scope it and quote it", desc: "You get a clear plan, a fixed price, and a delivery date within 24 hours. No hourly surprises, no vague estimates." },
  { n: "03", title: "I build and test it", desc: "Most projects are built in 2–5 days. You see sample output early so we catch any misunderstanding before the full run." },
  { n: "04", title: "You get it running", desc: "Clean data delivered, or a live system handed over with alerting so you know immediately if anything ever breaks." },
];

const TESTIMONIALS = [
  { initials: "JR", color: "#3b82f6", name: "James R.", role: "Used Car Dealer, New York", text: "Built our entire auction automation system from scratch. Pulls live data from Manheim, BacklotCars, and Autoniq every morning and emails us the best deals. Saves 10+ hours a week." },
  { initials: "SM", color: "#10b981", name: "Sarah M.", role: "Marketing Agency, Texas", text: "The Google Maps lead scraper paid for itself 10x over. Generated 5,000 verified business leads for our outreach campaign in under 24 hours." },
  { initials: "MT", color: "#8b5cf6", name: "Mike T.", role: "eCommerce Seller, California", text: "Incredible Walmart scraper — handles thousands of products across hundreds of keywords, avoids detection completely, and outputs perfect Excel files. Delivered in 3 days." },
];

/* Answers real prospects ask. Rendered on the page AND emitted as FAQPage
   structured data — schema without matching visible content is a violation. */
const FAQS = [
  {
    q: "How much does a web scraper cost?",
    a: "Most one-off scraping jobs land between $150 and $800 depending on how many sites, how many fields and how much anti-bot protection is involved. Recurring systems that run daily are quoted as a build fee plus a small monthly amount. You get a fixed price up front — never an hourly meter.",
  },
  {
    q: "How long does it take?",
    a: "Most projects are built and delivered in 2 to 5 days. You get a scope, a fixed price and a delivery date within 24 hours of describing what you need, and you see sample output early so nothing is a surprise at the end.",
  },
  {
    q: "Is web scraping legal?",
    a: "Scraping publicly accessible data is generally legal in the United States, and US courts have repeatedly upheld that. What matters is what you collect and how you use it — I avoid personal data behind logins, respect terms where they bind, and will tell you plainly if a request looks like a problem rather than take the money.",
  },
  {
    q: "What format do I get the data in?",
    a: "Excel (.xlsx), CSV, JSON, Google Sheets, a direct database write (MySQL or Postgres), or a REST API endpoint — whatever slots into what you already use. Most clients take Excel or a Google Sheet that refreshes on a schedule.",
  },
  {
    q: "Can you scrape sites that block bots or need a login?",
    a: "Yes. Sites with rate limiting, fingerprinting, JavaScript rendering or an account wall are routine work here. Where a login is involved I use credentials you own and are entitled to use.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. You describe the website and the details you want in plain English. You get back a finished file, or a system that emails you a fresh one every morning. You never open a terminal or touch a line of code.",
  },
  {
    q: "What happens if the website changes and the scraper breaks?",
    a: "Sites do change, and scrapers do break — anyone who tells you otherwise is selling something. Delivered systems include alerting so you know immediately rather than finding out from stale data, and I fix breakages on systems I built.",
  },
  {
    q: "Who will I actually be working with?",
    a: "Me. AutoSmartCode is one developer, not an agency — the person who writes your code is the person who answers your emails. No account managers, no handoffs.",
  },
];

/* ---------------- Live demos (typed terminal + output) ---------------- */

const DEMOS = [
  {
    id: "leads",
    tab: "🗺️ Lead Scraping",
    file: "scrape_leads.py",
    blurb: "Any niche, any US city — turned into a contact list your sales team can call today.",
    lines: [
      { text: '$ python scrape_leads.py --niche "car dealers" --city "Dallas, TX"', cls: "cmd" },
      { text: "→ scanning Google Maps results, page 1 of 21…", cls: "dim" },
      { text: "✓ 412 businesses found", cls: "ok" },
      { text: "✓ 388 phone numbers verified", cls: "ok" },
      { text: "✓ 240 emails pulled from company websites", cls: "ok" },
      { text: "✓ 96 owner names matched from public profiles", cls: "ok" },
      { text: "✓ 17 duplicates removed", cls: "ok" },
      { text: "✓ exported → dallas_car_dealers.xlsx", cls: "file" },
    ],
    output: {
      kind: "table",
      name: "📄 dallas_car_dealers.xlsx",
      count: "412 rows × 9 columns",
      headers: ["Business", "Owner", "Phone", "Email", "Website", "Rating", "Reviews", "City", "Category"],
      rows: [
        ["Metroplex Auto Group", "R. Alvarez", "(214) 555-0142", "sales@metroplexauto.example", "metroplexauto.example", "4.6", "312", "Dallas, TX", "Used car dealer"],
        ["Lone Star Motors", "K. Whitfield", "(972) 555-0188", "info@lonestarmotors.example", "lonestarmotors.example", "4.3", "198", "Plano, TX", "Auto wholesaler"],
        ["DFW Fleet Wholesale", "M. Okafor", "(469) 555-0207", "buying@dfwfleet.example", "dfwfleet.example", "4.8", "87", "Irving, TX", "Fleet sales"],
      ],
      more: "+ 409 more rows…",
    },
  },
  {
    id: "auction",
    tab: "🚗 Car Auction Reports",
    file: "auction_scout.py",
    blurb: "Every listing checked against Carfax, AutoCheck, J.D. Power and Galves — then ranked by real margin.",
    lines: [
      { text: "$ python auction_scout.py --source backlotcars --max-bid 18000", cls: "cmd" },
      { text: "→ pulling 1,284 active auction listings…", cls: "dim" },
      { text: "✓ VIN decoded — year, trim, drivetrain, options", cls: "ok" },
      { text: "✓ Carfax — accident count, title brand, owners, service history", cls: "ok" },
      { text: "✓ AutoCheck scores retrieved", cls: "ok" },
      { text: "✓ market value matched — J.D. Power, Galves, MMR", cls: "ok" },
      { text: "⚠ 61 vehicles rejected — branded title or 2+ accidents", cls: "warn" },
      { text: "✓ 38 vehicles clear your 12% margin threshold", cls: "ok" },
      { text: "✓ ranked report emailed → todays_best_deals.html", cls: "file" },
    ],
    output: {
      kind: "vehicle",
      name: "🏆 todays_best_deals.html",
      count: "38 qualifying vehicles",
      badge: "Best margin — 1 of 38 matches",
      title: "2021 Toyota RAV4 XLE AWD",
      sub: "41,208 mi · VIN 2T3W1RFV•••••••M · Lane 4 · Dallas, TX",
      profit: "+$3,900",
      profitLabel: "est. margin 22.4%",
      sources: [
        { src: "Auction price", val: "$17,400", note: "BacklotCars, closes 4:15pm" },
        { src: "Market value (MMR)", val: "$21,850", note: "last 30 days, ±$420" },
        { src: "J.D. Power clean", val: "$22,150", note: "clean trade +$1,100" },
        { src: "Galves", val: "$21,300", note: "wholesale average" },
        { src: "Title status", val: "Clean", note: "no salvage, flood or lemon brand", ok: true },
        { src: "Accidents", val: "0 reported", note: "Carfax, full 5-year history", ok: true },
        { src: "Owners", val: "1 owner", note: "personal use · 14 service records", ok: true },
        { src: "AutoCheck score", val: "92 / 100", note: "above class average (78–86)", ok: true },
      ],
    },
  },
  {
    id: "ecom",
    tab: "🛒 eCommerce Data",
    file: "price_watch.py",
    blurb: "Amazon, Walmart, eBay and any storefront — full catalogue data plus who owns the Buy Box.",
    lines: [
      { text: "$ python price_watch.py --sites amazon,walmart --keywords 240", cls: "cmd" },
      { text: "→ crawling 240 keywords across 2 marketplaces…", cls: "dim" },
      { text: "✓ 18,640 products captured", cls: "ok" },
      { text: "✓ title, ASIN, SKU, brand and category parsed", cls: "ok" },
      { text: "✓ 111,840 image URLs collected (6 per product)", cls: "ok" },
      { text: "✓ price, list price, Buy Box seller and stock recorded", cls: "ok" },
      { text: "⚠ 3 competitors dropped price in the last hour", cls: "warn" },
      { text: "✓ written → catalog.xlsx · catalog.json · products table", cls: "file" },
    ],
    output: {
      kind: "product",
      name: "📦 catalog.xlsx · catalog.json",
      count: "18,640 products × 22 fields",
      hero: "🔋",
      thumbs: ["📐", "📦", "🔌", "📊", "🎁"],
      imageNote: "6 image URLs captured per product",
      fields: [
        { k: "Title", v: "20,000mAh USB-C Power Bank, 65W PD Fast Charge" },
        { k: "ASIN", v: "B0C7K2M9QT" },
        { k: "SKU", v: "PB-20K-65W-BLK" },
        { k: "Brand", v: "Brand A" },
        { k: "Price", v: "$109.99", hot: true },
        { k: "List price", v: "$139.99  (−21%)" },
        { k: "Buy Box", v: "Brand direct (1P)" },
        { k: "Stock", v: "In stock · 42 units" },
        { k: "Rating", v: "4.7 ★  ·  8,412 reviews" },
        { k: "Category", v: "Electronics › Chargers › Power Banks" },
        { k: "Δ 24h", v: "▼ $8.00", down: true },
        { k: "URL", v: "amazon.com/dp/B0C7K2M9QT" },
      ],
      more: "+ 18,639 more products in this run",
    },
  },
  {
    id: "property",
    tab: "🏠 Property & Research",
    file: "market_research.py",
    blurb: "Zillow, Redfin, Airbnb — or any site an analyst needs. Listings, rents and trends turned into a model you can decide on.",
    lines: [
      { text: '$ python market_research.py --market "Phoenix, AZ" --beds 3+', cls: "cmd" },
      { text: "→ pulling Zillow + Redfin listings across 14 zip codes…", cls: "dim" },
      { text: "✓ 2,417 active listings captured", cls: "ok" },
      { text: "✓ price history and days-on-market parsed", cls: "ok" },
      { text: "✓ Airbnb comps matched — nightly rate and occupancy", cls: "ok" },
      { text: "✓ rental yield and cap rate calculated per property", cls: "ok" },
      { text: "✓ 26 properties beat your 8% cap-rate target", cls: "ok" },
      { text: "✓ exported → phoenix_market_report.xlsx", cls: "file" },
    ],
    output: {
      kind: "table",
      name: "📄 phoenix_market_report.xlsx",
      count: "2,417 rows × 14 columns",
      headers: ["Address", "Zip", "Bed/Bath", "Sqft", "List price", "Δ price", "Days on mkt", "Airbnb /night", "Occupancy", "Est. yield", "Cap rate"],
      rows: [
        ["1420 E Palm Ln", "85006", "3 / 2", "1,640", "$412,000", "▼ 4.2%", "58", "$189", "71%", "9.4%", "8.8%"],
        ["908 W Encanto Blvd", "85007", "4 / 2", "2,110", "$528,500", "▼ 2.0%", "31", "$246", "68%", "8.7%", "8.1%"],
        ["3377 N 39th St", "85018", "3 / 2", "1,780", "$465,000", "—", "12", "$212", "74%", "8.2%", "7.6%"],
      ],
      more: "+ 2,414 more properties…",
    },
  },
];

const FORMATS = ["Excel .xlsx", "CSV", "JSON", "Google Sheets", "MySQL / Postgres", "REST API"];

function ScrapeDemo() {
  const [active, setActive] = useState(0);
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  const demo = DEMOS[active];
  const finished = line >= demo.lines.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLine(demo.lines.length);
      return;
    }

    // Finished a full pass — hold the result, then move to the next demo.
    if (finished) {
      const next = setTimeout(() => {
        setActive(a => (a + 1) % DEMOS.length);
        setLine(0);
        setChars(0);
      }, 6500);
      return () => clearTimeout(next);
    }

    const current = demo.lines[line].text;

    // Still typing this line.
    if (chars < current.length) {
      const speed = demo.lines[line].cls === "cmd" ? 22 : 10;
      const t = setTimeout(() => setChars(c => c + 1), speed);
      return () => clearTimeout(t);
    }

    // Line complete — pause, then start the next one.
    const t = setTimeout(() => { setLine(l => l + 1); setChars(0); }, 360);
    return () => clearTimeout(t);
  }, [line, chars, finished, demo]);

  function pick(i) {
    setActive(i);
    setLine(0);
    setChars(0);
  }

  const out = demo.output;

  return (
    <div className="demo-wrap">

      <div className="demo-tabs" role="tablist">
        {DEMOS.map((d, i) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={i === active}
            className={"demo-tab " + (i === active ? "active" : "")}
            onClick={() => pick(i)}
          >
            {d.tab}
          </button>
        ))}
      </div>

      <p className="demo-blurb">{demo.blurb}</p>

      {/* Script on the left, the file it produces on the right — they run together */}
      <div className="demo-stage">

        <div className="stage-col">
          <div className="stage-label">
            <span className={"stage-dot " + (finished ? "done" : "live")} />
            {finished ? "Run complete" : "Running the script"}
          </div>

          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="terminal-title">{demo.file} — AutoSmartCode</span>
            </div>

            <div className="terminal-body">
              {demo.lines.slice(0, line).map((l, i) => (
                <div key={i} className={"term-line " + l.cls}>{l.text}</div>
              ))}
              {!finished && (
                <div className={"term-line " + demo.lines[line].cls}>
                  {demo.lines[line].text.slice(0, chars)}
                  <span className="caret" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="stage-col">
          <div className="stage-label">
            <span className={"stage-dot " + (finished ? "done" : "live")} />
            {finished ? "Your file — ready to download" : "Preview — building your file…"}
          </div>

          {/* Placeholder keeps the column filled while the script is still typing */}
          {!finished && (
            <div className="result-preview" aria-hidden="true">
              <div className="sheet-head">
                <span className="sheet-name">{out.name}</span>
                <span className="sheet-count preview">writing rows…</span>
              </div>
              <div className="skeleton-body">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="skel-row" style={{ animationDelay: i * 0.12 + "s" }}>
                    <span className="skel-cell w-30" />
                    <span className="skel-cell w-20" />
                    <span className="skel-cell w-25" />
                    <span className="skel-cell w-15" />
                  </div>
                ))}
              </div>
              <div className="preview-note">
                <span className="spinner" /> {line + 1} of {demo.lines.length} steps complete
              </div>
            </div>
          )}

          {finished && (
      <div className="result-sheet show">
        <div className="sheet-head">
          <span className="sheet-name">{out.name}</span>
          <span className="sheet-count">{out.count}</span>
        </div>

        {out.kind === "product" ? (
          <div className="product-record">
            <div className="pr-media">
              <div className="pr-img main">{out.hero}</div>
              <div className="pr-thumbs">
                {out.thumbs.map((t, i) => <div key={i} className="pr-img">{t}</div>)}
              </div>
              <div className="pr-imgnote">{out.imageNote}</div>
            </div>
            <div className="pr-fields">
              {out.fields.map(f => (
                <div key={f.k} className="pr-row">
                  <span className="pr-k">{f.k}</span>
                  <span className={"pr-v" + (f.hot ? " hot" : "") + (f.down ? " down" : "")}>{f.v}</span>
                </div>
              ))}
            </div>
          </div>
        ) : out.kind === "table" ? (
          <div className="sheet-scroll">
            <table className="sheet-table">
              <thead>
                <tr>{out.headers.map(h => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {out.rows.map(r => (
                  <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="vehicle-card">
            <div className="vehicle-head">
              <div>
                <span className="vehicle-badge">★ {out.badge}</span>
                <h4>{out.title}</h4>
                <div className="vehicle-sub">{out.sub}</div>
              </div>
              <div className="vehicle-profit">
                <span className="vp-n">{out.profit}</span>
                <span className="vp-l">{out.profitLabel}</span>
              </div>
            </div>

            <div className="vehicle-grid">
              {out.sources.map(s => (
                <div key={s.src} className={"vsrc " + (s.ok ? "clean" : "")}>
                  <div className="vsrc-label">{s.src}</div>
                  <div className="vsrc-val">{s.val}</div>
                  <div className="vsrc-note">{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
          )}

          {out.more && finished && <div className="demo-more show">{out.more}</div>}
        </div>

      </div>

      <div className={"format-row " + (finished ? "show" : "")}>
        <span className="format-label">Delivered in any format you need</span>
        <div className="format-chips">
          {FORMATS.map(f => <span key={f} className="format-chip">{f}</span>)}
        </div>
      </div>

      <p className="demo-caption">
        Sample output — figures shown are illustrative, not live market data.
      </p>
    </div>
  );
}

/* ---------------- Contact form ---------------- */

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
        <div className="form-head-title">Send a Message</div>
        <div className="form-head-sub">Fill this out — I'll reply personally within 24 hours.</div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Your Name *</label>
          <input value={form.name} onChange={set("name")} placeholder="John Smith" />
        </div>
        <div className="form-group">
          <label>Email Address *</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="john@company.com" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Company / Business</label>
          <input value={form.company} onChange={set("company")} placeholder="Your company" />
        </div>
        <div className="form-group">
          <label>Service Needed *</label>
          <select value={form.service} onChange={set("service")}>
            <option value="">Select a service...</option>
            {["Web Scraping", "Process Automation", "Web Development", "AI & Data Analysis", "Lead Generation", "Monitoring & Alert Bot", "Car Dealer Automation", "Real Estate Data", "Other / Multiple"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Budget Range</label>
        <select value={form.budget} onChange={set("budget")}>
          <option value="">Select budget...</option>
          {["Under $100", "$100 – $500", "$500 – $1,000", "$1,000 – $5,000", "$5,000+"].map(b => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Project Details *</label>
        <textarea value={form.message} onChange={set("message")} rows={5} placeholder="What website? What data do you need? Any deadlines..." />
      </div>
      <button className="form-btn" onClick={submit} disabled={loading}>
        {loading ? "Sending..." : "Send Message — I'll Reply Within 24hrs →"}
      </button>
      {status && <div className={"form-msg " + status.type}>{status.type === "success" ? "✅" : "⚠️"} {status.text}</div>}
    </div>
  );
}

/* ---------------- Page ---------------- */

export default function Home() {
  useSeo({
    title: "Web Scraping & Automation Services for US Businesses | AutoSmartCode",
    description:
      "We turn any website into clean, structured data. Custom scrapers, lead lists, " +
      "price monitors and auction reports — built in 2–5 days, fixed price, quoted in 24 hours.",
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
        <div className="hero-bg" aria-hidden="true">
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
          <span className="hero-grid" />
        </div>

        <div className="container hero-layout">
          <div className="hero-center">

            <h1 className="hero-h1">
              We turn any website into{" "}
              <span className="hero-grad">the data your business runs on</span>
            </h1>

            <p className="hero-desc">
              Scrapers, auction reports, lead lists and price monitors —
              <strong> built clean, delivered fast.</strong>
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-blue">Start Your Project →</a>
              <Link to="/projects" className="btn btn-outline">See My Work</Link>
            </div>

          </div>

          {/* The face behind the business — above the fold, so it's eager, not lazy.
              The studio backdrop is masked out at the edges so the photo dissolves
              into the hero background instead of sitting on it as a disc. */}
          <div className="hero-portrait">
            <picture>
              <source srcSet={process.env.PUBLIC_URL + "/sam.webp"} type="image/webp" />
              <img
                src={process.env.PUBLIC_URL + "/sam.jpg"}
                alt="Sam — Founder and CEO of AutoSmartCode"
                width="420"
                height="420"
                fetchpriority="high"
                decoding="async"
              />
            </picture>

            <div className="hp-card">
              <div className="hp-name">Sam</div>
              <div className="hp-role">Founder &amp; CEO · AutoSmartCode</div>
              <Link to="/about" className="hp-link">More about me →</Link>
            </div>
          </div>

        </div>
      </section>

      {/* ============ WHAT I DO / PROOF BAND ============ */}
      <section className="proof-band">

        {/* -- plain-English explainer + code -- */}
        <div className="container proof-explain">
          <div className="proof-copy">
            <h2>
              If the data is on a website,<br />
              I can put it in your spreadsheet.
            </h2>
            <p>
              Someone on your team is copying that data by hand right now. I write the
              software that does it instead — on a schedule, at a volume no person can
              match. <strong>You never touch any code.</strong>
            </p>
            <ul className="proof-points">
              <li>Works behind logins and on sites that block ordinary tools</li>
              <li>Thousands of pages, no blocks, no missed rows</li>
              <li>Excel, CSV, Google Sheets, a database, or an API</li>
            </ul>
          </div>

          <div className="code-window">
            <div className="code-bar">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="code-title">scraper.py</span>
            </div>
            <pre className="code-body">
<span className="c-com"># every product page → one clean row</span>{"\n"}
<span className="c-kw">for</span> page <span className="c-kw">in</span> <span className="c-fn">catalog</span>.pages():{"\n"}
{"    "}item = page.<span className="c-fn">extract</span>({"\n"}
{"        "}title = <span className="c-str">"h1.product-title"</span>,{"\n"}
{"        "}price = <span className="c-str">"span.price"</span>,{"\n"}
{"        "}stock = <span className="c-str">"div.availability"</span>,{"\n"}
{"    "}){"\n"}
{"    "}sheet.<span className="c-fn">append</span>(item)   <span className="c-com"># → products.xlsx</span>
            </pre>
          </div>
        </div>

        {/* -- live demo -- */}
        <div className="container proof-demo">
          <div className="demo-head">
            <h2>See exactly what you get</h2>
            <p>
              Four real jobs I run for clients — lead lists, car auction reports,
              eCommerce catalogue data, and property research. Watch each one run, then
              look at the file it hands you at the end.
            </p>
          </div>

          <ScrapeDemo />

          <div className="proof-audience">
            <div className="audience-row">
              {[
                "🚗 Car wholesalers & dealers",
                "🛒 eCommerce sellers",
                "📋 Agencies buying leads",
                "🏠 Real estate investors",
                "📊 Research & analyst teams",
              ].map(a => <span key={a} className="audience-chip">{a}</span>)}
            </div>
          </div>
        </div>

      </section>

      {/* ============ SERVICES ============ */}
      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-head">
            <h2 className="s-title">What I build for clients</h2>
            <p className="s-sub">
              Scraping, automation, and the websites and dashboards built around them.
              One developer from start to finish — you always talk to the person writing
              the code, never a sales rep.
            </p>
          </div>

          <div className="svc-list">
            {SERVICES.map((s, i) => (
              <a href="#contact" key={s.title} className={"svc-row accent-" + s.accent}>
                <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="svc-icon">{s.icon}</span>
                <div className="svc-main">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                <div className="svc-tags">
                  {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <span className="svc-arrow">→</span>
              </a>
            ))}
          </div>

          <div className="svc-footnote">
            Need something that isn't on this list? It probably still fits —{" "}
            <a href="#contact">just ask</a>.
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="section steps-section">
        <div className="container">
          <div className="section-head">
            <h2 className="s-title">Four steps from idea to running system</h2>
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

      {/* ============ FEATURED PROJECTS (3) ============ */}
      <section className="section projects-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <h2 className="s-title">Projects that made<br />a real difference</h2>
            </div>
            <Link to="/projects" className="btn btn-outline">View all projects →</Link>
          </div>

          <div className="projects-grid">
            {projects.slice(0, 3).map(p => (
              <Link to={"/projects/" + p.id} key={p.id} className="proj-card">
                <div className="proj-type" style={{ color: p.color, background: p.color + "14" }}>
                  {p.emoji} {p.type}
                </div>
                <h3>{p.title}</h3>
                <p>{p.description.slice(0, 130)}…</p>
                <div className="tag-row">
                  {p.stack.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="proj-result">{p.result}</div>
              </Link>
            ))}
          </div>

          <div className="view-all-row">
            <Link to="/projects" className="btn btn-blue">See all {projects.length} projects →</Link>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="s-title">Trusted by 100+ US businesses</h2>
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

      {/* ============ FAQ ============ */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-head">
            <h2 className="s-title">Questions I get asked</h2>
            <p className="s-sub">
              Straight answers on price, timelines and what's actually legal — before you email.
            </p>
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

      {/* ============ FLIP COIN — the person and the business, same thing ============ */}
      <section className="section coin-section">
        <div className="container coin-wrap">

          <div className="coin-stage" aria-hidden="true">
            <div className="coin">
              <div className="coin-face coin-front">
                <picture>
                  <source srcSet={process.env.PUBLIC_URL + "/sam.webp"} type="image/webp" />
                  <img
                    src={process.env.PUBLIC_URL + "/sam.jpg"}
                    alt=""
                    width="260"
                    height="260"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="coin-face coin-back">
                <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="" width="110" height="110" />
                <span className="coin-back-name">AutoSmartCode</span>
              </div>
            </div>
            <div className="coin-shadow" />
          </div>

          <div className="coin-copy">
            <span className="coin-eyebrow">Got a project in mind?</span>
            <h2 className="s-title">The developer and the company<br />are the same person</h2>
            <p>
              Flip it either way and you get me. No account manager forwarding your email,
              no junior picking up the build after you've signed — just the person who
              writes your code, answering your questions and staying reachable long after
              the invoice is paid.
            </p>
            <div className="coin-actions">
              <a href="#contact" className="btn btn-blue">Start your project →</a>
              <Link to="/about" className="btn btn-outline">More about me</Link>
            </div>
          </div>

        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="contact-wrap">
            <div className="contact-info">
              <h2 className="s-title">Let's build something<br />that works for you</h2>
              <p className="contact-desc">
                I'm the founder and sole developer at AutoSmartCode. You talk directly to
                me — no middlemen, no account managers. Clear communication, honest
                timelines, and work that keeps running after it's delivered.
              </p>
              <div className="contact-details">
                {[
                  { icon: "📧", label: "Email — replies within 24hrs", val: "sam@autosmartcode.com" },
                  { icon: "🌍", label: "Serving US clients worldwide", val: "Available Mon–Sat, all US time zones" },
                  { icon: "⚡", label: "Fast turnaround", val: "Most projects start within 24 hours" },
                  { icon: "🔒", label: "Confidentiality", val: "NDA available on request" },
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
