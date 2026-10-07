import { Link, useParams } from "react-router-dom";
import { scrapers, scraperBySlug } from "../data/scrapers";
import { serviceBySlug } from "../data/services";
import { AREAS_SERVED } from "../data/geo";
import { scraperImage, socialFor } from "../data/images";
import { useSeo, crumbs, ORIGIN } from "../useSeo";
import "./Services.css";

/**
 * One page per "<site> scraper" query, at a root-level exact-match URL.
 * These are the pages Search Console was already showing impressions for
 * with nothing but the homepage behind them.
 */
export function ScraperPage() {
  const { slug } = useParams();
  const s = scraperBySlug(slug);
  const siblings = scrapers.filter(o => o.slug !== slug);
  const pillar = s && serviceBySlug(s.pillar);
  const hero = s && scraperImage(s);

  useSeo(s ? {
    title: s.metaTitle + " | AutoSmartCode",
    description: s.metaDesc,
    path: "/" + s.slug,
    image: socialFor(hero),
    imageAlt: hero.alt,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": ORIGIN + "/" + s.slug + "#service",
          name: s.h1 || s.site + " Scraper",
          alternateName: s.metaTitle,
          description: s.metaDesc,
          url: ORIGIN + "/" + s.slug,
          serviceType: "Web scraping and data extraction",
          keywords: s.keywords.join(", "),
          areaServed: AREAS_SERVED,
          provider: { "@id": ORIGIN + "/#org" },
        },
        {
          "@type": "FAQPage",
          "@id": ORIGIN + "/" + s.slug + "#faq",
          mainEntity: s.faqs.map(f => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        crumbs([["Services", "/services"], [s.site + " Scraper", "/" + s.slug]]),
      ],
    },
  } : {
    title: "Page not found | AutoSmartCode",
    description: "This page does not exist.",
    path: slug ? "/" + slug : window.location.pathname,
    noindex: true,
  });

  if (!s) return (
    <div className="inner-page not-found">
      <div className="container">
        <h2>Page not found</h2>
        <Link to="/services" className="btn btn-blue" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
          ← All Services
        </Link>
      </div>
    </div>
  );

  return (
    <div className="inner-page svc-page">
      <div className="inner-hero" style={{ "--hero-photo": 'url("/img/photos/auction-yard.webp")' }}>
        <div className="container">
          <Link to="/services" className="back-link">← All Services</Link>
          <div className="svc-detail-type" style={{ color: s.color }}>
            {s.emoji} {s.site} Data Extraction
          </div>
          <h1 className="svc-detail-title">{s.h1 || s.site + " Scraper"}</h1>
          <p className="svc-detail-hero">{s.tagline}</p>
          <div className="svc-detail-actions">
            <Link to="/#contact" className="btn btn-blue">Get a Free Quote →</Link>
            <Link to={`/services/${s.pillar}`} className="btn btn-outline">
              {pillar ? pillar.nav : "All services"}
            </Link>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container svc-body">
          <div className="svc-main">

            <div className="detail-block">
              <h2 className="detail-h">What {s.site} is, and why the data matters</h2>
              <p className="detail-p">{s.what}</p>
              <p className="detail-p">{s.why}</p>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">What the {s.site} scraper extracts</h2>
              <p className="detail-p">
                One row per record, every field below as its own column — parsed and
                typed, not dumped as text you have to clean before you can sort it.
              </p>
              <ul className="svc-bullets">
                {s.fields.map(f => (
                  <li key={f}><span className="check" style={{ color: s.color }}>✓</span>{f}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">Getting past {s.site}'s defences</h2>
              <p className="detail-p">{s.defenses}</p>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">What people do with it</h2>
              <ul className="svc-bullets">
                {s.uses.map(u => (
                  <li key={u}><span className="check" style={{ color: s.color }}>✓</span>{u}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">How you receive the data</h2>
              <p className="detail-p">
                Excel, CSV, JSON, a Google Sheet that refreshes on a schedule, a direct
                write into MySQL or Postgres, or a REST endpoint your own tools can query.
                Most clients take the Google Sheet, because the whole team can open it
                without installing anything.
              </p>
              <p className="detail-p">
                Scheduled runs come with alerting. If {s.site} changes its markup or a run
                fails, you hear it from the system that morning rather than working it out
                from a week of stale numbers — and fixes on systems I built are part of the
                arrangement, not a new project.
              </p>
            </div>

            {pillar && (
              <div className="svc-proof">
                <span className="svc-proof-eyebrow">Part of a bigger build?</span>
                <h3>{pillar.h1}</h3>
                <p>{pillar.hero}</p>
                <Link to={`/services/${pillar.slug}`} className="svc-proof-link">
                  See the full service →
                </Link>
              </div>
            )}
          </div>

          <aside className="svc-side">
            <div className="sidebar-card">
              <h3>At a glance</h3>
              <ul className="detail-list">
                <li><span className="check">✓</span>Built in 2–5 days</li>
                <li><span className="check">✓</span>Fixed price, quoted in 24 hours</li>
                <li><span className="check">✓</span>Daily, hourly or one-off runs</li>
                <li><span className="check">✓</span>Excel, Sheets, database or API</li>
                <li><span className="check">✓</span>Alerting when a run fails</li>
                <li><span className="check">✓</span>Fixes when the site changes</li>
              </ul>
            </div>
            <div className="sidebar-card">
              <h3>Also scraped</h3>
              <div className="sidebar-tags">
                {s.siblings.map(sib => {
                  const o = scraperBySlug(sib);
                  return o ? <Link key={sib} to={"/" + o.slug} className="tag">{o.site}</Link> : null;
                })}
              </div>
            </div>
            <div className="sidebar-cta">
              <p>Tell me the filters and fields you need — you'll have a fixed quote tomorrow.</p>
              <Link to="/#contact" className="btn btn-blue" style={{ width: "100%", justifyContent: "center" }}>
                Start your project →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Visible FAQ — the source of the FAQPage schema above. */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-head">
            <h2 className="s-title">{s.site} scraping — questions I get asked</h2>
          </div>
          <div className="faq-list">
            {s.faqs.map(f => (
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

      <section className="section">
        <div className="container">
          <div className="svc-related">
            <h3>Other sites I scrape</h3>
            <div className="svc-related-grid">
              {siblings.slice(0, 6).map(o => (
                <Link to={"/" + o.slug} key={o.slug} className="svc-related-card">
                  <span style={{ color: o.color }}>{o.emoji} {o.site} Scraper</span>
                  <p>{o.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="cta-strip">
        <div className="container cta-strip-inner">
          <div>
            <h3>Need {s.site} data?</h3>
            <p>Describe the filters and fields in plain English — fixed quote within 24 hours.</p>
          </div>
          <Link to="/#contact" className="btn btn-blue">Get a Free Quote →</Link>
        </div>
      </div>
    </div>
  );
}
