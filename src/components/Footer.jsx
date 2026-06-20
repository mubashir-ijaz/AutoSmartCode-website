import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">Auto<span>Smart</span>Code</Link>
            <p>Professional web scraping, automation, AI analysis, and web development for US businesses. 1000+ projects. Direct founder contact.</p>
            <a href="mailto:sam@autosmartcode.com" className="footer-email">
              sam@autosmartcode.com
            </a>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link to="/#services">Web Scraping</Link></li>
              <li><Link to="/#services">Automation</Link></li>
              <li><Link to="/#services">AI Analysis</Link></li>
              <li><Link to="/#services">Car Dealer Tools</Link></li>
              <li><Link to="/#services">Lead Generation</Link></li>
              <li><Link to="/#services">Web Development</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Platforms</h4>
            <ul>
              <li><Link to="/#platforms">Amazon & eBay</Link></li>
              <li><Link to="/#platforms">Walmart & Etsy</Link></li>
              <li><Link to="/#platforms">Zillow & Airbnb</Link></li>
              <li><Link to="/#platforms">Google Maps</Link></li>
              <li><Link to="/#platforms">Manheim & ADESA</Link></li>
              <li><Link to="/#platforms">Facebook & LinkedIn</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/projects">All Projects</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
              <li><a href="mailto:sam@autosmartcode.com">Email Me</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 AutoSmartCode — Mubashir Ijaz. All rights reserved.</span>
          <span>Web Scraping · Automation · AI · Web Development · USA</span>
        </div>
      </div>
    </footer>
  );
}
