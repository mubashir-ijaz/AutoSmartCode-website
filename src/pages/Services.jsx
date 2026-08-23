import { Link, useParams } from "react-router-dom";
import { services, serviceBySlug } from "../data/services";
import { scrapers } from "../data/scrapers";
import { webdesign } from "../data/webdesign";
import { projects } from "../data/content";
import { AREAS_SERVED } from "../data/geo";
import { serviceImage, socialFor } from "../data/images";
import { useSeo, crumbs, ORIGIN } from "../useSeo";
import { FounderHeader, FounderNote } from "../components/Founder";
import "./Services.css";

/* ================================ INDEX ================================ */

export function ServicesPage() {
  useSeo({
    title: "Services — Web Scraping, Automation & Web Development | AutoSmartCode",
    description:
      "Six things I build for businesses in the US, UK and beyond: car auction automation, vehicle history report pipelines, " +
      "dealer inventory data, B2B lead lists, custom web scrapers and web development.",
    path: "/services",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          name: "AutoSmartCode Services",
          url: ORIGIN + "/services",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.h1,
              url: ORIGIN + "/services/" + s.slug,
            })),
          },
        },
        crumbs([["Services", "/services"]]),
      ],
    },
  });

  return (
    <div className="inner-page">
      <div className="inner-hero">
        <div className="container">
          <FounderHeader
            title="What I Build"
            sub="Six services, one developer. Each one has its own page because each one is a different problem — pick the one that sounds like yours."
            line="every service on this page, delivered by me"
          />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="svc-index-grid">
            {services.map(s => (
              <Link to={`/services/${s.slug}`} key={s.slug} className="svc-index-card">
                <span className="svc-index-icon" style={{ background: s.color + "18", borderColor: s.color + "33" }}>
                  {s.emoji}
                </span>
                <h2 style={{ color: s.color }}>{s.nav}</h2>
                <p>{s.hero}</p>
                <div className="tag-row">
                  {s.platforms.slice(0, 4).map(p => <span key={p} className="tag">{p}</span>)}
                </div>
                <span className="svc-index-more">Read more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hub → spoke. Every landing page is one click from here, which is what
          makes this page the one Google can rank for the broader terms. */}
      <section className="section">
        <div className="container">
          <div className="svc-related">
            <h3>Sites I scrape</h3>
            <p className="s-sub" style={{ marginBottom: "1.4rem" }}>
              Each of these has its own page — what it extracts, what gets in the way,
              and what it costs.
            </p>
            <div className="svc-related-grid">
              {scrapers.map(s => (
                <Link to={`/${s.slug}`} key={s.slug} className="svc-related-card">
                  <span style={{ color: s.color }}>{s.emoji} {s.h1 || s.site + " Scraper"}</span>
                  <p>{s.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="svc-related">
            <h3>Websites I build</h3>
            <p className="s-sub" style={{ marginBottom: "1.4rem" }}>
              A different kind of client entirely — businesses whose website is costing
              them enquiries they never hear about.
            </p>
            <div className="svc-related-grid">
              {webdesign.map(w => (
                <Link to={`/${w.slug}`} key={w.slug} className="svc-related-card">
                  <span style={{ color: w.color }}>{w.emoji} {w.h1}</span>
                  <p>{w.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FounderNote
        eyebrow="Not sure which one?"
        title={<>Describe the problem,<br />not the service</>}
        cta="Tell me what you need →"
      >
        <p>
          Most people arrive describing a job rather than a category — "my buyers waste
          three hours every morning", "I need 5,000 contractors in Texas", "I want to know
          when a competitor cuts a price". Those map onto the pages above, but you don't
          have to do the mapping yourself.
        </p>
        <p>
          Send the problem in plain English and you'll get back a scope, a fixed price and
          a date within 24 hours — <strong>or an honest "that's not worth building"</strong>,
          which happens more often than you'd expect from someone selling builds.
        </p>
      </FounderNote>
    </div>
  );
}

/* =============================== DETAIL =============================== */

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = serviceBySlug(slug);
  const proof = service && projects.find(p => p.id === service.caseStudy);
  const hero = service && serviceImage(service);
  /* The per-site pages that roll up to this pillar. Web development's spokes
     live in webdesign.js rather than scrapers.js, so both are checked. */
  const spokes = service
    ? [
        ...scrapers.filter(sp => sp.pillar === service.slug),
        ...(service.slug === "web-development" ? webdesign : []),
      ]
    : [];

  useSeo(service ? {
    title: service.metaTitle + " | AutoSmartCode",
    description: service.metaDesc,
    path: "/services/" + service.slug,
    image: socialFor(hero),
    imageAlt: hero.alt,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": ORIGIN + "/services/" + service.slug + "#service",
          name: service.h1,
          description: service.metaDesc,
          url: ORIGIN + "/services/" + service.slug,
          serviceType: service.nav,
          keywords: service.keywords.join(", "),
          areaServed: AREAS_SERVED,
          provider: { "@id": ORIGIN + "/#org" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: service.nav + " deliverables",
            itemListElement: service.deliverables.map(d => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: d },
            })),
          },
        },
        {
          "@type": "FAQPage",
          "@id": ORIGIN + "/services/" + service.slug + "#faq",
          mainEntity: service.faqs.map(f => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        crumbs([["Services", "/services"], [service.nav, "/services/" + service.slug]]),
      ],
    },
  } : {
    title: "Service not found | AutoSmartCode",
    description: "This service page does not exist.",
    path: "/services/" + slug,
    noindex: true,
  });

  if (!service) return (
    <div className="inner-page not-found">
      <div className="container">
        <h2>Service not found</h2>
        <Link to="/services" className="btn btn-blue" style={{ marginTop: "1.5rem", display: "inline-flex" }}>
          ← All Services
        </Link>
      </div>
    </div>
  );

  return (
    <div className="inner-page svc-page">
      <div className="inner-hero">
        <div className="container">
          <Link to="/services" className="back-link">← All Services</Link>
          <div className="svc-detail-type" style={{ color: service.color }}>
            {service.emoji} {service.nav}
          </div>
          <h1 className="svc-detail-title">{service.h1}</h1>
          <p className="svc-detail-hero">{service.hero}</p>
          <figure className="svc-hero-figure">
            <img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height}
                 fetchpriority="high" decoding="async" />
          </figure>
          <div className="svc-detail-actions">
            <Link to="/#contact" className="btn btn-blue">Get a Free Quote →</Link>
            <Link to="/projects" className="btn btn-outline">See the work</Link>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container svc-body">

          <div className="svc-main">
            {service.sections.map(sec => (
              <div className="detail-block" key={sec.h}>
                <h2 className="detail-h">{sec.h}</h2>
                {sec.p.map(text => <p className="detail-p" key={text.slice(0, 40)}>{text}</p>)}
                {sec.list && (
                  <ul className="svc-bullets">
                    {sec.list.map(item => (
                      <li key={item}><span className="check" style={{ color: service.color }}>✓</span>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {proof && (
              <div className="svc-proof">
                <span className="svc-proof-eyebrow">Real client work</span>
                <h3>{proof.title}</h3>
                <p>{proof.description}</p>
                <p className="svc-proof-result">✅ {proof.result}</p>
                <Link to={`/projects/${proof.id}`} className="svc-proof-link">Read the full case study →</Link>
              </div>
            )}
          </div>

          <aside className="svc-side">
            <div className="sidebar-card">
              <h3>What you get</h3>
              <ul className="detail-list">
                {service.deliverables.map(d => (
                  <li key={d}><span className="check">✓</span>{d}</li>
                ))}
              </ul>
            </div>
            <div className="sidebar-card">
              <h3>Sites &amp; platforms</h3>
              <div className="sidebar-tags">
                {service.platforms.map(p => <span key={p} className="tag">{p}</span>)}
              </div>
            </div>
            <div className="sidebar-card">
              <h3>Built with</h3>
              <div className="sidebar-tags">
                {service.stack.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="sidebar-cta">
              <p>Fixed price, quoted within 24 hours.</p>
              <Link to="/#contact" className="btn btn-blue" style={{ width: "100%", justifyContent: "center" }}>
                Start your project →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ — visible on the page, and the source of the FAQPage schema above.
          Schema without matching visible content is a structured-data violation. */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-head">
            <h2 className="s-title">{service.nav} — questions I get asked</h2>
          </div>
          <div className="faq-list">
            {service.faqs.map(f => (
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

      {/* The cluster's downward link. Every scraper page points up at its
          pillar, but until this existed the pillar pointed at none of them, so
          a crawler arriving at /services/<pillar> had no path to the twenty
          exact-match pages underneath it. A cluster needs both directions. */}
      {spokes.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="svc-related">
              <h3>{service.nav} — the individual pages</h3>
              <p className="svc-related-lead">
                This page covers the capability. These cover the specific sites and
                reports, one page each, with the fields, the obstacles and the price.
              </p>
              <div className="svc-related-grid">
                {spokes.map(sp => (
                  <Link to={`/${sp.slug}`} key={sp.slug} className="svc-related-card">
                    <span style={{ color: sp.color }}>{sp.emoji} {sp.h1 || sp.site + " Scraper"}</span>
                    <p>{sp.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="svc-related">
            <h3>Related services</h3>
            <div className="svc-related-grid">
              {service.related.map(rs => {
                const r = serviceBySlug(rs);
                return r ? (
                  <Link to={`/services/${r.slug}`} key={r.slug} className="svc-related-card">
                    <span style={{ color: r.color }}>{r.emoji} {r.nav}</span>
                    <p>{r.hero}</p>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="cta-strip">
        <div className="container cta-strip-inner">
          <div>
            <h3>Need this for your business?</h3>
            <p>Describe it in plain English — you'll get a fixed quote within 24 hours.</p>
          </div>
          <Link to="/#contact" className="btn btn-blue">Get a Free Quote →</Link>
        </div>
      </div>
    </div>
  );
}
