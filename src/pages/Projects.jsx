import { Link, useParams } from "react-router-dom";
import { projects } from "../data/content";
import { services } from "../data/services";
import { useSeo, crumbs, ORIGIN } from "../useSeo";
import { FounderHeader, FounderNote } from "../components/Founder";
import "./Projects.css";

export function ProjectsPage() {
  useSeo({
    title: "Car Auction & Dealer Data Projects | AutoSmartCode Portfolio",
    description: "Real client work for the car trade — run-list triage and watch lists, custom VIN panel extensions, auction intelligence pipelines and private-party sourcing.",
    path: "/projects",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "AutoSmartCode Projects",
      url: ORIGIN + "/projects",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          url: ORIGIN + "/projects/" + p.id,
        })),
      },
    },
  });

  return (
    <div className="inner-page">
      <div className="inner-hero" style={{ "--hero-photo": 'url("/img/photos/lot-rows.webp")' }}>
        <div className="container">
          <FounderHeader
            title="Dealer Projects"
            sub="Real builds for dealers, wholesalers and auction buyers — each one replaced a morning somebody was spending by hand."
            line="every project on this page, built by me"
          />
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="all-projects-grid">
            {projects.map(p => (
              <Link to={`/projects/${p.id}`} key={p.id} className="proj-card-full">
                <div className="proj-card-top">
                  <div className="proj-type-badge" style={{ color: p.color, borderColor: p.color + "33", background: p.color + "12" }}>
                    {p.emoji} {p.type}
                  </div>
                  <div className="proj-arrow">→</div>
                </div>
                <h3>{p.title}</h3>
                <p className="proj-client">👤 {p.client}</p>
                <p className="proj-desc">{p.description.slice(0, 140)}...</p>
                <div className="tag-row" style={{ marginTop: "1rem" }}>
                  {p.stack.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="proj-result-strip">{p.result}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FounderNote
        eyebrow="Who built these"
        title={<>No two of these were the same job</>}
        cta="Tell me about yours →"
      >
        <p>
          There's no template behind this list. An auction system that reconciles
          Carfax against MMR has nothing in common with a Google Maps scraper that
          verifies 5,000 phone numbers — different sites, different defences,
          different definitions of "correct". I wrote each one from scratch.
        </p>
        <p>
          What they do share is the part clients never see: <strong>the handling for
          when it goes wrong</strong>. Retries when a page half-loads, alerts when a
          site changes its markup, checks that catch a price field quietly returning
          empty. That's the difference between a script that worked once and a system
          you can leave running.
        </p>
      </FounderNote>

      <div className="cta-strip">
        <div className="container cta-strip-inner">
          <div>
            <h3>Need Something Similar?</h3>
            <p>Tell me your project — I'll give you a free quote within 24 hours.</p>
          </div>
          <Link to="/#contact" className="btn btn-blue">Get a Free Quote →</Link>
        </div>
      </div>
    </div>
  );
}

export function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  useSeo(project ? {
    title: project.title + " | AutoSmartCode Case Study",
    description: project.description.slice(0, 155),
    path: "/projects/" + project.id,
    type: "article",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: ORIGIN + "/projects/" + project.id,
          about: project.type,
          keywords: project.stack.join(", "),
          inLanguage: "en-US",
          creator: { "@type": "Organization", name: "AutoSmartCode", url: ORIGIN },
        },
        crumbs([["Projects", "/projects"], [project.title, "/projects/" + project.id]]),
      ],
    },
  } : {
    title: "Project not found | AutoSmartCode",
    description: "This project does not exist.",
    path: "/projects/" + id,
    noindex: true,
  });

  if (!project) return (
    <div className="inner-page not-found">
      <div className="container">
        <h2>Project not found</h2>
        <Link to="/projects" className="btn btn-blue" style={{ marginTop: "1.5rem", display: "inline-flex" }}>← Back to Projects</Link>
      </div>
    </div>
  );

  return (
    <div className="inner-page">
      <div className="inner-hero" style={{ "--hero-photo": 'url("/img/photos/lot-rows.webp")' }}>
        <div className="container">
          <Link to="/projects" className="back-link">← All Projects</Link>
          <div className="proj-detail-type" style={{ color: project.color }}>
            {project.emoji} {project.type}
          </div>
          <h1 className="proj-detail-title">{project.title}</h1>
          <p className="proj-detail-client">👤 {project.client}</p>
        </div>
      </div>

      <section className="section">
        <div className="container proj-detail-body">
          <div className="proj-detail-main">

            <div className="detail-block">
              <h2 className="detail-h">Project Overview</h2>
              <p className="detail-p">{project.description}</p>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">The Challenge</h2>
              <div className="detail-callout challenge">
                <span className="callout-icon">⚠️</span>
                <p>{project.challenge}</p>
              </div>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">My Solution</h2>
              <div className="detail-callout solution">
                <span className="callout-icon">⚡</span>
                <p>{project.solution}</p>
              </div>
            </div>

            <div className="detail-block">
              <h2 className="detail-h">Result</h2>
              <div className="detail-callout result">
                <span className="callout-icon">✅</span>
                <p>{project.result}</p>
              </div>
            </div>

          </div>

          <div className="proj-detail-sidebar">
            <div className="sidebar-card">
              <h3>Tech Stack</h3>
              <div className="sidebar-tags">
                {project.stack.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="sidebar-card">
              <h3>What Was Built</h3>
              <ul className="detail-list">
                {project.details.map(d => <li key={d}><span className="check">✓</span>{d}</li>)}
              </ul>
            </div>
            {/* Case study → service: the reverse of the proof block on each
                service page. Mirrored in scripts/prerender.js. */}
            {services.some(s => s.caseStudy === project.id) && (
              <div className="sidebar-card">
                <h3>The Service Behind It</h3>
                <div className="sidebar-service-list">
                  {services.filter(s => s.caseStudy === project.id).map(s => (
                    <Link to={`/services/${s.slug}`} key={s.slug} className="sidebar-service-item">{s.nav} →</Link>
                  ))}
                </div>
              </div>
            )}
            <div className="sidebar-cta">
              <p>Need something similar for your business?</p>
              <Link to="/#contact" className="btn btn-blue" style={{ width: "100%", justifyContent: "center" }}>
                Get a Free Quote →
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="more-projects">
            <h3>More Projects</h3>
            <div className="more-proj-grid">
              {projects.filter(p => p.id !== project.id).slice(0, 3).map(p => (
                <Link to={`/projects/${p.id}`} key={p.id} className="mini-proj">
                  <div className="mini-proj-type" style={{ color: p.color }}>{p.emoji} {p.type}</div>
                  <div className="mini-proj-title">{p.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FounderNote
        eyebrow="About the developer"
        title={<>The person who built this<br />is the person you'd email</>}
        cta="Discuss a build like this →"
      >
        <p>
          I'm Sam — I run AutoSmartCode, and I wrote this system myself. Not a team, not
          a subcontractor: one developer who scoped it, built it, tested it against the
          live site, and handed it over with alerting so the client would know before I
          did if it ever stopped behaving.
        </p>
        <p>
          That matters most <strong>after</strong> delivery. Sites redesign, defences
          change, a field moves — and when they do, you're not filing a ticket with
          someone who's never seen the code. You're emailing the person who wrote it.
        </p>
      </FounderNote>
    </div>
  );
}
