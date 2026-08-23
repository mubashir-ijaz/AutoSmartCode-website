import { Link } from "react-router-dom";
import { projects } from "../data/content";
import { CONTACT_EMAIL } from "../config";
import { useSeo, ORIGIN, crumbs } from "../useSeo";
import "./About.css";

const SKILLS = [
  {
    icon: "🕷️", accent: "blue",
    k: "Scraping engineering",
    v: "Python · Scrapy · Playwright · Selenium · rotating proxies · session and cookie handling · fingerprint and Cloudflare defences · CAPTCHA-aware flows",
  },
  {
    icon: "🗄️", accent: "green",
    k: "Data & pipelines",
    v: "Pandas · deduplication and fuzzy matching · validation rules · MySQL / PostgreSQL · scheduled ETL · delivery to Excel, Google Sheets, a database or a REST endpoint",
  },
  {
    icon: "⚙️", accent: "amber",
    k: "Automation & bots",
    v: "Cron and queue-driven jobs · Telegram / Slack / email alerting · retry, backoff and self-healing logic · uptime and freshness monitoring",
  },
  {
    icon: "🌐", accent: "cyan",
    k: "Product & front end",
    v: "React · Next.js · Node.js · Vercel · dashboards and admin panels that put the data in front of the people who act on it",
  },
  {
    icon: "🤖", accent: "violet",
    k: "AI on top of the data",
    v: "LLM APIs for classification, sentiment and summarisation · competitor, pricing and market intelligence reports built from your own scraped data",
  },
];

const INDUSTRIES = [
  {
    icon: "🚗",
    name: "Car wholesalers & dealers",
    text: "Auction inventory priced against Carfax, AutoCheck, MMR, J.D. Power and Galves — branded titles and accident histories filtered out before a ranked deal list lands in your inbox each morning.",
  },
  {
    icon: "🛒",
    name: "eCommerce sellers",
    text: "Full catalogue capture across Amazon, Walmart and eBay — titles, ASINs, images, stock, list price and Buy Box ownership, tracked over time so you see a competitor move the hour it happens.",
  },
  {
    icon: "📋",
    name: "Agencies & sales teams",
    text: "Lead lists built from Google Maps, LinkedIn, Facebook, Yelp and trade directories, then verified — so your outreach runs on contacts that exist, not on scraped noise.",
  },
  {
    icon: "🏠",
    name: "Real estate investors",
    text: "Zillow, Redfin and Airbnb listings joined into one model — price history, days on market, nightly rates and occupancy turned into yield and cap rate per property.",
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "You talk to the person writing the code",
    text: "AutoSmartCode is one developer. There is no account manager between you and the build, and nothing gets handed to a junior once you've signed. If you email at 9am about an edge case, the person who answers is the person who wrote the parser.",
  },
  {
    n: "02",
    title: "Fixed price, quoted before I start",
    text: "You get a scope, a fixed price and a delivery date within 24 hours of describing the job. No hourly meter, no scope creep invoices. If I misjudge the effort, that's my problem, not a change order.",
  },
  {
    n: "03",
    title: "Systems that fail loudly",
    text: "Websites change and scrapers break — anyone who promises otherwise is selling something. Everything I hand over monitors itself and tells you the moment output stops looking right, so you never find out from stale data three weeks later.",
  },
  {
    n: "04",
    title: "I'll tell you when the answer is no",
    text: "Scraping public data is generally legal, and I'll say so plainly. But if a request means personal data behind a login, or a site where the terms actually bind you, I'll tell you that instead of taking the money and letting you carry the risk.",
  },
];

/* Three tiers of the same story, each labelled for what it actually counts —
   1000+ projects, 100+ businesses, 15+ direct clients. Stated together they
   explain each other; stated apart they read as contradictory. */
const STATS = [
  { n: "1000+", l: "projects delivered" },
  { n: "15+", l: "direct US & UK clients" },
  { n: "5+ yrs", l: "building automation" },
  { n: "2–5 days", l: "typical delivery" },
];

export default function About() {
  useSeo({
    title: "About Sam — Founder & CEO of AutoSmartCode | Web Scraping Expert",
    description:
      "Sam is the founder and sole developer behind AutoSmartCode — building web scrapers, " +
      "data pipelines and automation systems for US car dealers, eCommerce sellers, agencies " +
      "and property investors.",
    path: "/about",
    type: "profile",
    image: ORIGIN + "/sam.jpg",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": ORIGIN + "/about#sam",
          name: "Sam",
          jobTitle: "Founder & CEO",
          email: "mailto:" + CONTACT_EMAIL,
          image: ORIGIN + "/sam.jpg",
          url: ORIGIN + "/about",
          worksFor: { "@type": "Organization", name: "AutoSmartCode", url: ORIGIN },
          knowsAbout: [
            "Web scraping",
            "Data extraction",
            "Process automation",
            "Lead generation",
            "Python",
            "React",
          ],
        },
        crumbs([["About", "/about"]]),
      ],
    },
  });

  return (
    <div className="about-page">

      {/* ============ INTRO ============ */}
      <section className="ab-hero">
        <div className="ab-hero-bg" aria-hidden="true">
          <span className="ab-orb ab-orb-1" />
          <span className="ab-orb ab-orb-2" />
        </div>

        <div className="container ab-hero-wrap">
          <div className="ab-hero-copy">
            <span className="ab-eyebrow">About me</span>
            <h1 className="ab-h1">
              Hi, I'm Sam — founder &amp; CEO of{" "}
              <span className="ab-grad">AutoSmartCode</span>
            </h1>
            <p className="ab-lead">
              I build the software that does the copying and pasting, so nobody on your
              team has to. Scrapers, data pipelines, monitoring bots and the dashboards
              around them — delivered by one developer who stays reachable after the
              invoice is paid.
            </p>

            <div className="ab-stats">
              {STATS.map(s => (
                <div key={s.l} className="ab-stat">
                  <strong>{s.n}</strong>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>

            <div className="ab-actions">
              <Link to="/#contact" className="btn btn-blue">Start your project →</Link>
              <Link to="/projects" className="btn btn-outline">See my work</Link>
            </div>
          </div>

          {/* Same edge-fade treatment as the homepage hero — the studio backdrop
              dissolves into the page instead of sitting on it as a disc. */}
          <div className="ab-portrait">
            <picture>
              <source srcSet={process.env.PUBLIC_URL + "/sam.webp"} type="image/webp" />
              <img
                src={process.env.PUBLIC_URL + "/sam.jpg"}
                alt="Sam — Founder and CEO of AutoSmartCode"
                width="440"
                height="440"
                fetchpriority="high"
                decoding="async"
              />
            </picture>
            <div className="ab-badge">
              <span className="ab-dot" />
              Available for new projects
            </div>
          </div>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="section ab-story-section">
        <div className="container ab-story">
          <div className="ab-story-main">
            <h2 className="s-title">How AutoSmartCode started</h2>
            <p>
              I kept meeting business owners who were paying people to copy and paste
              data all day — a dealer's assistant pulling auction listings into a
              spreadsheet every morning, an agency intern typing addresses off Google
              Maps, a seller checking competitor prices by hand across four tabs. That's
              not a staffing problem. It's a software problem, and it has been solved for
              years by people who write code.
            </p>
            <p>
              So I started AutoSmartCode to do exactly that, one client at a time. The
              first system I built pulled auction inventory for a used car dealer in New
              York and emailed him a ranked list of the best margins before he'd finished
              his coffee. It replaced about ten hours a week of someone's job. He's still
              running it.
            </p>
            <p>
              Since then I've built well over a hundred of these systems for businesses
              across the United States. Some are one-off exports — a clean spreadsheet,
              delivered once, job done. Others have been running unattended every morning
              for years, quietly doing work that nobody has to think about anymore. Both
              are good outcomes.
            </p>

            <h2 className="s-title ab-h2-spaced">Where my depth actually is</h2>
            <p>
              Anyone can pull a table off a simple page. What people hire me for is{" "}
              <strong>the sites that don't want to be read</strong> — rotating proxies
              and session handling, browser fingerprinting and Cloudflare defences,
              JavaScript-rendered content, pagination that hides half the catalogue, and
              login walls where the credentials are yours to use.
            </p>
            <p>
              The other half of the job is everything after extraction. Deduplicating
              records that don't quite match, validating that a price is a price,
              catching the schema drift that quietly breaks a scraper three weeks after
              launch. I write these systems to fail loudly and recover on their own,
              because data you can't trust is worse than no data at all.
            </p>
          </div>

          <aside className="ab-aside">
            <div className="ab-aside-card">
              <h3>At a glance</h3>
              <ul>
                <li><strong>Role</strong> Founder, CEO and sole developer</li>
                <li><strong>Based</strong> Working with clients across the US, UK, the Gulf, Europe and Australia</li>
                <li><strong>Hours</strong> Monday–Saturday, replies within 24 hours</li>
                <li><strong>Engagements</strong> One-off builds and ongoing systems</li>
                <li><strong>Pricing</strong> Fixed price, quoted before work starts</li>
                <li><strong>Confidentiality</strong> NDA available on request</li>
              </ul>
              <a href={"mailto:" + CONTACT_EMAIL} className="ab-aside-mail">
                {CONTACT_EMAIL}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ SKILLS ============ */}
      <section className="section ab-skills-section">
        <div className="container">
          <div className="section-head">
            <h2 className="s-title">What I work with</h2>
            <p className="s-sub">
              The stack behind every project — listed plainly, so you can judge whether
              it fits what you need rather than take my word for it.
            </p>
          </div>

          <div className="ab-skills">
            {SKILLS.map(s => (
              <div key={s.k} className={"ab-skill accent-" + s.accent}>
                <span className="ab-skill-icon">{s.icon}</span>
                <div>
                  <h3>{s.k}</h3>
                  <p>{s.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="section ab-industries-section">
        <div className="container">
          <div className="section-head">
            <h2 className="s-title">Four industries I know unusually well</h2>
            <p className="s-sub">
              I've written enough systems in these markets to know what the data means,
              not just how to fetch it — which is usually the difference between a scraper
              and something you can make decisions on.
            </p>
          </div>

          <div className="ab-industries">
            {INDUSTRIES.map(i => (
              <div key={i.name} className="ab-industry">
                <span className="ab-ind-icon">{i.icon}</span>
                <h3>{i.name}</h3>
                <p>{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRINCIPLES ============ */}
      <section className="section ab-principles-section">
        <div className="container">
          <div className="section-head">
            <h2 className="s-title">How I work</h2>
          </div>

          <div className="ab-principles">
            {PRINCIPLES.map(p => (
              <div key={p.n} className="ab-principle">
                <div className="ab-p-n">{p.n}</div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section ab-cta-section">
        <div className="container">
          <div className="ab-cta">
            <div className="ab-sign">
              <div className="ab-sign-name">Sam</div>
              <div className="ab-sign-role">Founder &amp; CEO, AutoSmartCode</div>
            </div>
            <h2 className="s-title">Tell me what you're trying to get out of a website</h2>
            <p>
              Plain English is fine — the URLs, the fields you want, and how often you
              need them. You'll have a scope, a fixed price and a delivery date back from
              me within 24 hours.
            </p>
            <div className="ab-actions">
              <Link to="/#contact" className="btn btn-blue">Start your project →</Link>
              <Link to="/projects" className="btn btn-outline">
                Browse all {projects.length} projects
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
