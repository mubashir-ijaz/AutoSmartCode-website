import { Link, useParams } from "react-router-dom";
import { projects } from "../data/content";
import "./Projects.css";

export function ProjectsPage() {
  return (
    <div className="inner-page">
      <div className="inner-hero">
        <div className="container">
          <span className="s-label">Portfolio</span>
          <h1 className="s-title">All Projects</h1>
          <p className="s-sub">1000+ projects delivered. Here are some of the most impactful ones — each solved a real business problem.</p>
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
      <div className="inner-hero">
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
    </div>
  );
}
