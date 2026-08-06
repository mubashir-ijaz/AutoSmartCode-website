import { Link, useParams } from "react-router-dom";
import { webdesign, webdesignBySlug } from "../data/webdesign";
import { useSeo, crumbs, ORIGIN } from "../useSeo";
import "./Services.css";

/**
 * Web design landing pages. Deliberately quieter than the scraper pages —
 * this buyer runs a salon, not a data pipeline, and the vocabulary that sells
 * to one is noise to the other.
 */
export function WebDesignPage() {
  const { slug } = useParams();
  const w = webdesignBySlug(slug);

  useSeo(w ? {
    title: w.metaTitle + " | AutoSmartCode",
    description: w.metaDesc,
    path: "/" + w.slug,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": ORIGIN + "/" + w.slug + "#service",
          name: w.h1,
          description: w.metaDesc,
          url: ORIGIN + "/" + w.slug,
          serviceType: "Web design and development",
          keywords: w.keywords.join(", "),
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Italy" },
            { "@type": "Country", name: "Germany" },
            { "@type": "Country", name: "Australia" },
            { "@type": "Country", name: "Canada" },
          ],
          provider: { "@id": ORIGIN + "/#org" },
        },
        {
          "@type": "FAQPage",
          "@id": ORIGIN + "/" + w.slug + "#faq",
          mainEntity: w.faqs.map(f => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        crumbs([["Services", "/services"], [w.nav, "/" + w.slug]]),
      ],
    },
  } : {
    title: "Page not found | AutoSmartCode",
    description: "This page does not exist.",
    path: "/" + slug,
    noindex: true,
  });

  if (!w) return (
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
      <div className="inner-hero">
        <div className="container">
          <Link to="/services/web-development" className="back-link">← Web Development</Link>
          <div className="svc-detail-type" style={{ color: w.color }}>
            {w.emoji} {w.nav}
          </div>
          <h1 className="svc-detail-title">{w.h1}</h1>
          <p className="svc-detail-hero">{w.tagline}</p>
          <div className="svc-detail-actions">
            <Link to="/#contact" className="btn btn-blue">Get a Free Quote →</Link>
            <Link to="/projects" className="btn btn-outline">See the work</Link>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container svc-body">
          <div className="svc-main">

            <div className="detail-block">
              <h2 className="detail-h">The situation you're probably in</h2>
              <p className="detail-p">{w.problem}</p>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">Does any of this sound familiar?</h2>
              <ul className="svc-bullets">
                {w.signals.map(s => (
                  <li key={s}><span className="check" style={{ color: w.color }}>✓</span>{s}</li>
                ))}
              </ul>
              <p className="detail-p" style={{ marginTop: "1.2rem" }}>
                Two or three of those and it's costing you enquiries you'll never
                know about, because the people who leave don't tell you they left.
              </p>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">What gets built instead</h2>
              <p className="detail-p">{w.answer}</p>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">What's included in every build</h2>
              <ul className="svc-bullets">
                {w.includes.map(i => (
                  <li key={i}><span className="check" style={{ color: w.color }}>✓</span>{i}</li>
                ))}
              </ul>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">How it works</h2>
              {w.process.map(step => (
                <div className="wd-step" key={step.n}>
                  <span className="wd-step-n" style={{ color: w.color }}>{step.n}</span>
                  <div>
                    <h3>{step.h}</h3>
                    <p>{step.p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="svc-side">
            <div className="sidebar-card">
              <h3>At a glance</h3>
              <ul className="detail-list">
                <li><span className="check">✓</span>Fixed price, quoted in 24 hours</li>
                <li><span className="check">✓</span>Live in about two weeks</li>
                <li><span className="check">✓</span>No monthly fee to me, ever</li>
                <li><span className="check">✓</span>Domain and hosting in your name</li>
                <li><span className="check">✓</span>You can edit the text yourself</li>
                <li><span className="check">✓</span>Google Business Profile set up</li>
              </ul>
            </div>
            <div className="sidebar-card">
              <h3>Also built here</h3>
              <div className="sidebar-tags">
                {w.siblings.map(sib => {
                  const o = webdesignBySlug(sib);
                  return o ? <Link key={sib} to={"/" + o.slug} className="tag">{o.nav}</Link> : null;
                })}
              </div>
            </div>
            <div className="sidebar-cta">
              <p>Tell me what your business does — you'll have a fixed price tomorrow.</p>
              <Link to="/#contact" className="btn btn-blue" style={{ width: "100%", justifyContent: "center" }}>
                Get a Free Quote →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Visible FAQ — the source of the FAQPage schema above. */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-head">
            <h2 className="s-title">{w.nav} — questions I get asked</h2>
          </div>
          <div className="faq-list">
            {w.faqs.map(f => (
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
            <h3>Other websites I build</h3>
            <div className="svc-related-grid">
              {webdesign.filter(o => o.slug !== w.slug).map(o => (
                <Link to={"/" + o.slug} key={o.slug} className="svc-related-card">
                  <span style={{ color: o.color }}>{o.emoji} {o.nav}</span>
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
            <h3>Ready for a website that works?</h3>
            <p>Describe your business in plain English — fixed price within 24 hours.</p>
          </div>
          <Link to="/#contact" className="btn btn-blue">Get a Free Quote →</Link>
        </div>
      </div>
    </div>
  );
}
