import { Link } from "react-router-dom";
import { services } from "../data/services";
import { scrapers } from "../data/scrapers";
import { useFeedback } from "./FeedbackModal";
import "./Footer.css";

const YEAR = new Date().getFullYear();

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
                Car dealer automation and auction data scraping. Manheim, ADESA, Copart and
                eBay Motors read overnight, Carfax, AutoCheck and MMR pulled per VIN, and a
                ranked watch list ready before the lane opens — for dealers, wholesalers and
                buyers in the US, UK, the Gulf, Europe and Australia.
              </p>
              <a href="mailto:sam@autosmartcode.com" className="footer-email">
                ✉ sam@autosmartcode.com
              </a>
              <div className="footer-badges">
                <span className="footer-badge">⚡ 24h quote</span>
                <span className="footer-badge">🔨 Built for dealers</span>
                <span className="footer-badge">🔒 NDA available</span>
                <span className="footer-badge">★ 5.0 rating</span>
              </div>
            </div>

            {/* Every service and every scraper page is reachable from every
                page on the site — that's the crawl path Google needs before it
                will index and trust a new URL. */}
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                {services.map(s => (
                  <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.nav}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Auctions &amp; Marketplaces</h4>
              <ul>
                {scrapers.map(s => (
                  <li key={s.slug}><Link to={`/${s.slug}`}>{s.site} Scraper</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">All Services</Link></li>
                <li><Link to="/#pricing">Pricing</Link></li>
                <li><Link to="/projects">All Projects</Link></li>
                <li><Link to="/blog">Blog & Guides</Link></li>
                <li><Link to="/about">About Sam</Link></li>
                <li><button className="footer-link-btn" onClick={openRate}>Leave Feedback</button></li>
                <li><Link to="/#contact">Contact</Link></li>
                <li><a href="/sitemap.xml">Sitemap</a></li>
              </ul>
            </div>

          </div>

          <div className="footer-bottom">
            <span>© {YEAR} AutoSmartCode — Sam. All rights reserved.</span>
            <span className="footer-bottom-tags">
              Auction Run-List Triage · Vehicle History Reports · MMR Automation · Custom Dealer Extensions · Serving dealers in the USA, UK, Europe, the Gulf &amp; Australia
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
