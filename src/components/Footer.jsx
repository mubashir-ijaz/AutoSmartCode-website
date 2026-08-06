import { Link } from "react-router-dom";
import { services } from "../data/services";
import { scrapers } from "../data/scrapers";
import { webdesign } from "../data/webdesign";
import { useFeedback } from "./FeedbackModal";
import "./Footer.css";

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { open: openRate } = useFeedback();

  return (
    <>
      {/* ---------- CTA band ---------- */}
      <section className="footer-cta">
        <div className="container footer-cta-inner">
          <div>
            <h2>Have a project in mind?</h2>
            <p>Describe what you need and get a free, fixed-price quote within 24 hours.</p>
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
                We turn any website into clean, structured, and usable data — plus the
                automation and web development that puts it to work. 1000+ projects
                delivered for businesses across the US, UK, Europe and Australia.
              </p>
              <a href="mailto:sam@autosmartcode.com" className="footer-email">
                ✉ sam@autosmartcode.com
              </a>
              <div className="footer-badges">
                <span className="footer-badge">⚡ 24h quote</span>
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
              <h4>Scrapers</h4>
              <ul>
                {scrapers.map(s => (
                  <li key={s.slug}><Link to={`/${s.slug}`}>{s.site} Scraper</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Websites</h4>
              <ul>
                {webdesign.map(w => (
                  <li key={w.slug}><Link to={`/${w.slug}`}>{w.nav}</Link></li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">All Services</Link></li>
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
              Web Scraping · Automation · AI · Web Development · Serving the USA
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
