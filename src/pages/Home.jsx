import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { blogs, projects, platforms } from "../data/content";
import "./Home.css";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx1DhN7geGDBV4tDP5HZghupYO1ENmFF4vOJSYm0lvXPHZz7YRt3BBtUb9ytNde1T1KGA/exec";

const MARQUEE_ITEMS = [
  "Amazon","eBay","Walmart","Google Maps","Facebook Marketplace",
  "Zillow","Airbnb","Manheim MMR","BacklotCars","Autoniq",
  "ADESA","CarMax","LinkedIn","Redfin","EdgePipeline","AutoTrader","Etsy","Yelp"
];

const SERVICES = [
  { icon:"🕷️", title:"Web Scraping", desc:"Extract any data from any website at scale — products, prices, leads, listings, reviews. Clean structured output as Excel, CSV, or JSON.", tags:["Python","Selenium","Playwright","Anti-bot bypass"] },
  { icon:"⚙️", title:"Process Automation", desc:"Automate repetitive tasks — data entry, report generation, email alerts, file processing. Runs 24/7 without manual effort.", tags:["Python","Scheduling","SMTP","Workflows"] },
  { icon:"🤖", title:"AI & Data Analysis", desc:"AI-powered analysis of business data — sales trends, market intelligence, price prediction, review sentiment with visual reports.", tags:["OpenAI GPT-4","Pandas","NLP","Reports"] },
  { icon:"🚗", title:"Car Dealer Automation", desc:"Live MMR lookups, auction data from Manheim, BacklotCars, Autoniq, ADESA — all in one profit alert system delivered to your inbox.", tags:["Manheim","BacklotCars","Autoniq","ADESA"] },
  { icon:"📋", title:"Lead Generation", desc:"Build targeted lead lists from Google Maps, LinkedIn, Facebook, Yelp, and directories. Name, email, phone — ready to contact.", tags:["Google Maps","LinkedIn","Facebook","Email finder"] },
  { icon:"🌐", title:"Web Development", desc:"Fast, modern websites and web apps — eCommerce stores, portfolios, SaaS dashboards built with React and Next.js.", tags:["React","Next.js","Tailwind","Node.js"] },
  { icon:"📊", title:"Product Analysis", desc:"Deep product research for Amazon, eBay, Walmart sellers — pricing trends, competitor analysis, review mining, keyword data.", tags:["Amazon","eBay","Walmart","Price tracking"] },
  { icon:"💬", title:"Automation Bots", desc:"Custom bots for any platform — price monitors, inventory watchers, auto-responders, Telegram/Discord notification bots.", tags:["Telegram Bot","Discord","Monitor","Alerts"] },
  { icon:"🏠", title:"Real Estate Data", desc:"Scrape Zillow, Redfin, Airbnb for property listings, rental prices, market trends, and investment opportunity analysis.", tags:["Zillow","Redfin","Airbnb","Market data"] },
];

const TESTIMONIALS = [
  { initials:"JR", color:"#2563eb", name:"James R.", role:"Used Car Dealer, New York", text:"Built our entire auction automation system from scratch. Pulls live data from Manheim, BacklotCars, and Autoniq every morning and emails us the best deals. Saves 10+ hours a week." },
  { initials:"MT", color:"#7c3aed", name:"Mike T.", role:"eCommerce Seller, California", text:"Incredible Walmart scraper — handles thousands of products across hundreds of keywords, avoids detection completely, and outputs perfect Excel files. Delivered in 3 days." },
  { initials:"SM", color:"#059669", name:"Sarah M.", role:"Marketing Agency, Texas", text:"The Google Maps lead scraper paid for itself 10x over. Generated 5,000 verified business leads for our outreach campaign in under 24 hours." },
  { initials:"DK", color:"#dc2626", name:"David K.", role:"SaaS Founder, Florida", text:"Built our Next.js review workflow app on Vercel. Professional, communicates clearly, fixed every issue fast. Will hire again for all future projects." },
  { initials:"AL", color:"#d97706", name:"Alex L.", role:"Amazon Seller, Ohio", text:"The AI review analyzer changed our Amazon strategy completely. Found exactly what customers hated about competitor products — we fixed those issues and sales jumped 34%." },
  { initials:"RC", color:"#0891b2", name:"Robert C.", role:"Real Estate Investor, Arizona", text:"Fast and reliable. Built our Zillow scraper in 48 hours, runs every week automatically, and the Excel reports are exactly what our investors need." },
];

function ContactForm() {
  const [form, setForm] = useState({ name:"", email:"", company:"", service:"", budget:"", message:"" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = k => e => setForm(f => ({...f, [k]: e.target.value}));

  async function submit() {
    if (!form.name || !form.email || !form.service || !form.message) {
      setStatus({ type:"error", text:"Please fill in all required fields." });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const date = new Date().toLocaleString("en-US", { timeZone:"America/New_York" });
      const params = new URLSearchParams({ ...form, date });
      await fetch(APPS_SCRIPT_URL + "?" + params.toString(), { method:"GET", mode:"no-cors" });
      setStatus({ type:"success", text:"Message sent! I'll email you at " + form.email + " within 24 hours." });
      setForm({ name:"", email:"", company:"", service:"", budget:"", message:"" });
    } catch(err) {
      window.location.href = "mailto:sam@autosmartcode.com?subject=Project from " + form.name + "&body=Name: " + form.name + "%0AEmail: " + form.email + "%0AService: " + form.service + "%0A%0A" + encodeURIComponent(form.message);
      setStatus({ type:"success", text:"Opening your email client..." });
    }
    setLoading(false);
  }
  useEffect(() => {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  let frame = 0;

  const particles = Array.from({length: 60}, () => ({
    x: Math.random() * w, y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4, vy: -Math.random() * 0.5 - 0.2,
    r: Math.random() * 1.5 + 0.5, life: Math.random()
  }));

  const lines = Array.from({length: 8}, (_,i) => ({
    x: (i / 7) * w, speed: Math.random() * 0.3 + 0.1, offset: Math.random() * h
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    frame++;

    // Grid
    ctx.strokeStyle = "rgba(37,99,235,0.05)";
    ctx.lineWidth = 0.5;
    const gs = 55;
    for (let x = 0; x < w; x += gs) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += gs) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Vertical light beams
    lines.forEach(l => {
      const y = (l.offset + frame * l.speed) % h;
      const grad = ctx.createLinearGradient(0, y - 80, 0, y + 80);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(37,99,235,0.06)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(l.x - 1, y - 80, 2, 160);
    });

    // Floating particles
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life += 0.003;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      const alpha = Math.sin(p.life * Math.PI) * 0.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34,211,238,${alpha})`;
      ctx.fill();
    });

    // Connection lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.strokeStyle = `rgba(37,99,235,${0.08 * (1 - dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  return () => window.removeEventListener("resize", resize);
}, []);

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
            {["Web Scraping","Process Automation","AI & Data Analysis","Car Dealer Automation","Lead Generation","Web Development","Product Analysis","Automation Bot","Real Estate Data","Other / Multiple"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Budget Range</label>
        <select value={form.budget} onChange={set("budget")}>
          <option value="">Select budget...</option>
          {["Under $100","$100 – $500","$500 – $1,000","$1,000 – $5,000","$5,000+"].map(b => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Project Details *</label>
        <textarea value={form.message} onChange={set("message")} rows={5} placeholder="What website? What data do you need? Any deadlines..." />
      </div>
      <button className="form-btn" onClick={submit} disabled={loading}>
        {loading ? "Sending..." : "Send Message — I'll Reply Within 24hrs →"}
      </button>
      {status && <div className={"form-msg " + status.type}>{status.type==="success" ? "✅" : "⚠️"} {status.text}</div>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="home">

    <section className="hero">
      <canvas className="hero-canvas-3d" id="heroCanvas" />
    <div className="hero-overlay" />
  
    <div className="container">
    <div className="hero-center">

      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Available for US Projects — Fast Delivery
      </div>

      <h1 className="hero-h1">
        Data Scraping, Automation<br />
        &amp; <span className="hero-grad">AI Solutions</span>
      </h1>

      <p className="hero-desc">
        Trusted by <strong>100+ US businesses</strong> — Amazon, eBay, Walmart,
        Zillow, Manheim &amp; 50+ platforms.
      </p>

      <div className="hero-actions">
        <a href="#contact" className="btn btn-blue">Start Your Project →</a>
        <Link to="/projects" className="btn btn-outline">See My Work</Link>
      </div>

      <div className="hero-stats">
        {[["1000+","Projects"],["100+","US Clients"],["50+","Platforms"],["5★","Rating"]].map(([n,l])=>(
          <div key={l} className="hero-stat">
            <span className="hero-stat-n">{n}</span>
            <span className="hero-stat-l">{l}</span>
          </div>
        ))}
      </div>

      <div className="hero-service-pills">
        {["🕷️ Web Scraping","🚗 Car Dealers","🏠 Real Estate","🤖 AI Analysis","🗺️ Lead Gen","⚙️ Automation","🛒 Amazon","🌐 Web Dev"].map(s=>(
          <span key={s} className="hero-pill">{s}</span>
        ))}
          </div>

          </div>
        </div>
      </section>
      

      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((m,i) => (
            <span key={i} className="marquee-item">{m}</span>
          ))}
        </div>
      </div>

      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-head">
            <span className="s-label">What I Do</span>
            <h2 className="s-title">Full-Stack Tech Services<br />for Real Business Problems</h2>
            <p className="s-sub">From scraping a single site to building full AI-powered systems — I deliver clean, reliable solutions on time.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map(s => (
              <div key={s.title} className="svc-card">
                <div className="svc-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="tag-row">
                  {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section platforms-section" id="platforms">
        <div className="container">
          <div className="section-head">
            <span className="s-label">Platform Experience</span>
            <h2 className="s-title">50+ Platforms Scraped<br />&amp; Automated</h2>
            <p className="s-sub">Every major platform has unique protections. I've built proven solutions for all of them.</p>
          </div>
          <div className="platforms-grid">
            {platforms.map(p => (
              <div key={p.name} className="plat-card">
                <div className="plat-icon">{p.emoji}</div>
                <div className="plat-name">{p.name}</div>
                <div className="plat-cat">{p.cat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section projects-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="s-label">Recent Work</span>
              <h2 className="s-title">Projects That Made<br />a Real Difference</h2>
            </div>
            <Link to="/projects" className="btn btn-outline">View All Projects →</Link>
          </div>
          <div className="projects-grid">
            {projects.slice(0,6).map(p => (
              <Link to={"/projects/" + p.id} key={p.id} className="proj-card">
                <div className="proj-type" style={{ color: p.color }}>{p.emoji} {p.type}</div>
                <h3>{p.title}</h3>
                <p>{p.description.slice(0,130)}...</p>
                <div className="tag-row">
                  {p.stack.slice(0,3).map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="proj-result">{p.result}</div>
              </Link>
            ))}
          </div>
          <div className="view-all-row">
            <Link to="/projects" className="btn btn-blue">See All 9 Projects →</Link>
          </div>
        </div>
      </section>

      <div className="stats-banner">
        <div className="container stats-inner">
          {[["1000+","Projects Completed"],["100+","US Clients Served"],["50+","eCommerce Stores"],["50+","Platforms Mastered"],["5★","Client Rating"]].map(([n,l]) => (
            <div key={l} className="stat-item">
              <div className="stat-n">{n}</div>
              <div className="stat-l">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="s-label">Client Reviews</span>
            <h2 className="s-title">Trusted by 100+ US Businesses</h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="testi-card">
                <div className="stars">★★★★★</div>
                <p className="testi-text">"{t.text}"</p>
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

      <section className="section blog-section">
        <div className="container">
          <div className="section-head-row">
            <div>
              <span className="s-label">Blog & Resources</span>
              <h2 className="s-title">Guides That Actually Help</h2>
            </div>
            <Link to="/blog" className="btn btn-outline">View All Posts →</Link>
          </div>
          <div className="blog-grid">
            {blogs.slice(0,3).map(b => (
              <Link to={"/blog/" + b.slug} key={b.id} className="blog-card">
                <div className="blog-img" style={{ background: b.color }}>{b.emoji}</div>
                <div className="blog-body">
                  <div className="blog-tag">{b.tag}</div>
                  <h3>{b.title}</h3>
                  <p>{b.summary}</p>
                  <div className="blog-meta">{b.date} · {b.readTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="contact-wrap">
            <div className="contact-info">
              <span className="s-label">Get In Touch</span>
              <h2 className="s-title">Let's Build Something<br />That Works for You</h2>
              <p className="contact-desc">I'm the founder and sole developer at AutoSmartCode. You talk directly to me — no middlemen, no account managers. Fast, clear communication and quality work every time.</p>
              <div className="contact-details">
                {[
                  { icon:"📧", label:"Email — replies within 24hrs", val:"sam@autosmartcode.com" },
                  { icon:"🌍", label:"Serving US clients from Pakistan", val:"Available Mon–Sat, all US time zones" },
                  { icon:"⚡", label:"Fast turnaround", val:"Most projects start within 24 hours" },
                  { icon:"🔒", label:"Confidentiality", val:"NDA available on request" },
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
