import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  function handleContact(e) {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#contact";
    }
  }

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <img src="/logo.svg" alt="AutoSmartCode logo" className="nav-logo-img" />
          Auto<span>Smart</span>Code
        </Link>
        <ul className={`nav-links ${open ? "open" : ""}`}>
          {[{to:"/",label:"Home"},{to:"/projects",label:"Projects"},{to:"/blog",label:"Blog"}].map(l => (
            <li key={l.to}><Link to={l.to} className={location.pathname===l.to?"active":""}>{l.label}</Link></li>
          ))}
          <li><a href="/#contact" onClick={handleContact}>Contact</a></li>
        </ul>
        <a href="/#contact" className="nav-cta" onClick={handleContact}>Get Free Quote</a>
        <button className="nav-burger" onClick={()=>setOpen(!open)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  );
}
