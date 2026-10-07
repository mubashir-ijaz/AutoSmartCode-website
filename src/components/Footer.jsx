import { Link } from "react-router-dom";
import { services } from "../data/services";
import { scraperBySlug } from "../data/scrapers";
import { useFeedback } from "./FeedbackModal";
import "./Footer.css";

const YEAR = new Date().getFullYear();

/* Two short, grouped platform columns instead of all 24 pages in one list.
   Every platform page is still linked from the homepage "Sites I automate"
   grid and from its own service page, so nothing loses its crawl path. */
const FOOTER_GROUPS = [
  { title: "Auctions", slugs: [
    "manheim-mmr-scraper", "adesa-scraper", "acv-auctions-scraper", "openlane-scraper",
    "backlotcars-scraper", "smartauction-scraper", "edge-pipeline-scraper", "copart-scraper", "iaa-scraper",
  ] },
  { title: "Data & Marketplaces", slugs: [
    "carfax-scraper", "autocheck-scraper", "facebook-marketplace-car-scraper",
    "ebay-motors-scraper", "govdeals-scraper", "gsa-auctions-scraper",
  ] },
];

export default function Footer() {
  const { open: openRate } = useFeedback();

  return (
    <>
      {/* ---------- CTA band ---------- */}
      <section className="footer-cta" style={{ "--cta-photo": 'url("/img/photos/open-road.webp")' }}>
        <div className="container footer-cta-inner">
          <div>
            <h2>Ready to automate your car business?</h2>
            <p>Tell me the auctions and sites you use — free, fixed-price quote within 24 hours.</p>
          </div>
          <div className="footer-cta-actions">
            <Link to="/#contact" className="btn footer-cta-btn">Get a Free Quote →</Link>
            <a href="mailto:sam@autosmartcode.com" className="btn footer-cta-btn ghost">Email Me</a>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">

            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <img src="/logo.svg" alt="AutoSmartCode logo" width="34" height="34" />
                Auto<span>Smart</span>Code
              </Link>
              <p>
                Auction run lists, history reports and MMR automated for car dealers,
                wholesalers and auction buyers, running on your own accounts.
              </p>
              <a href="mailto:sam@autosmartcode.com" className="footer-email">
                sam@autosmartcode.com
              </a>
              <p className="footer-note">Fixed-price quote within 24 hours.</p>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                {services.map(s => (
                  <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.nav}</Link></li>
                ))}
              </ul>
            </div>

            {FOOTER_GROUPS.map(g => (
              <div className="footer-col" key={g.title}>
                <h4>{g.title}</h4>
                <ul>
                  {g.slugs.map(scraperBySlug).filter(Boolean).map(s => (
                    <li key={s.slug}><Link to={`/${s.slug}`}>{s.site}</Link></li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Case Studies</Link></li>
                <li><Link to="/blog">Guides</Link></li>
                <li><Link to="/#pricing">Pricing</Link></li>
                <li><Link to="/#contact">Contact</Link></li>
                <li><button className="footer-link-btn" onClick={openRate}>Leave Feedback</button></li>
              </ul>
            </div>

          </div>

          <div className="footer-bottom">
            <span>© {YEAR} AutoSmartCode. All rights reserved.</span>
            <span className="footer-bottom-tags">
              Serving dealers in the US, UK, Europe, the Gulf &amp; Australia · <a href="/sitemap.xml">Sitemap</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
