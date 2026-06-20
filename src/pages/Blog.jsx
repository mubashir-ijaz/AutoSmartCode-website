import { Link, useParams } from "react-router-dom";
import { blogs } from "../data/content";
import "./Blog.css";

export function BlogPage() {
  return (
    <div className="inner-page">
      <div className="inner-hero">
        <div className="container">
          <span className="s-label">Blog & Resources</span>
          <h1 className="s-title">Guides That Actually Help</h1>
          <p className="s-sub">Practical tutorials on web scraping, automation, AI, and tools for US businesses — written from real project experience.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="blog-all-grid">
            {blogs.map(b => (
              <Link to={`/blog/${b.slug}`} key={b.id} className="blog-card-full">
                <div className="blog-card-img" style={{ background: b.color }}>{b.emoji}</div>
                <div className="blog-card-body">
                  <div className="blog-meta-top">
                    <span className="blog-tag-pill">{b.tag}</span>
                    <span className="blog-read-time">{b.readTime}</span>
                  </div>
                  <h2>{b.title}</h2>
                  <p>{b.summary}</p>
                  <div className="blog-footer-row">
                    <span className="blog-date">{b.date}</span>
                    <span className="read-more">Read article →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="cta-strip">
        <div className="container cta-strip-inner">
          <div>
            <h3>Need This Done for Your Business?</h3>
            <p>I don't just write about it — I build it. Get a free quote in 24 hours.</p>
          </div>
          <Link to="/#contact" className="btn btn-blue">Contact Me →</Link>
        </div>
      </div>
    </div>
  );
}

function renderContent(content) {
  const lines = content.trim().split("\n");
  const elements = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) { elements.push(<div key={key++} className="blog-spacer" />); continue; }
    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="blog-content-h2">{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={key++} className="blog-content-h3">{line.slice(4)}</h3>);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(<p key={key++} className="blog-content-bold">{line.slice(2,-2)}</p>);
    } else if (line.startsWith("- ")) {
      const items = [line.slice(2)];
      while (i + 1 < lines.length && lines[i+1].trim().startsWith("- ")) {
        i++;
        items.push(lines[i].trim().slice(2));
      }
      elements.push(
        <ul key={key++} className="blog-content-list">
          {items.map((item, idx) => {
            const parts = item.split(/\*\*(.*?)\*\*/g);
            return <li key={idx}>{parts.map((p, pi) => pi % 2 === 1 ? <strong key={pi}>{p}</strong> : p)}</li>;
          })}
        </ul>
      );
    } else {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      elements.push(
        <p key={key++} className="blog-content-p">
          {parts.map((p, pi) => pi % 2 === 1 ? <strong key={pi}>{p}</strong> : p)}
        </p>
      );
    }
  }
  return elements;
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) return (
    <div className="inner-page not-found">
      <div className="container">
        <h2>Article not found</h2>
        <Link to="/blog" className="btn btn-blue" style={{ marginTop: "1.5rem", display: "inline-flex" }}>← Back to Blog</Link>
      </div>
    </div>
  );

  const related = blogs.filter(b => b.id !== blog.id).slice(0, 3);

  return (
    <div className="inner-page">
      <div className="blog-detail-hero" style={{ background: blog.color }}>
        <div className="container">
          <Link to="/blog" className="back-link">← All Articles</Link>
          <div className="blog-detail-tag">{blog.tag}</div>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-meta">
            <span>{blog.date}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
            <span>·</span>
            <span>By Mubashir Ijaz, AutoSmartCode</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container blog-detail-layout">
          <article className="blog-article">
            <p className="blog-summary-lead">{blog.summary}</p>
            <div className="blog-content">
              {renderContent(blog.content)}
            </div>
          </article>

          <aside className="blog-sidebar">
            <div className="sidebar-card">
              <h3>About the Author</h3>
              <div className="author-block">
                <div className="author-avatar-lg">MI</div>
                <div>
                  <div className="author-name-lg">Mubashir Ijaz</div>
                  <div className="author-title">Founder, AutoSmartCode</div>
                </div>
              </div>
              <p className="author-bio">Python automation and web scraping developer with 1000+ projects delivered for US businesses across automotive, eCommerce, real estate, and lead generation.</p>
            </div>

            <div className="sidebar-card">
              <h3>Need This Done?</h3>
              <p style={{ color: "var(--gray)", fontSize: "0.85rem", lineHeight: "1.7", marginBottom: "1rem" }}>
                Don't want to build it yourself? I'll build exactly what this article describes for your business — and deliver it fast.
              </p>
              <Link to="/#contact" className="btn btn-blue" style={{ width: "100%", justifyContent: "center" }}>
                Get a Free Quote →
              </Link>
            </div>

            <div className="sidebar-card">
              <h3>Services Mentioned</h3>
              <div className="sidebar-service-list">
                {["Web Scraping","Python Automation","AI Analysis","Lead Generation","Web Development"].map(s => (
                  <Link to="/#services" key={s} className="sidebar-service-item">{s} →</Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="container">
          <div className="related-posts">
            <h3>More Articles</h3>
            <div className="related-grid">
              {related.map(b => (
                <Link to={`/blog/${b.slug}`} key={b.id} className="related-card">
                  <div className="related-img" style={{ background: b.color }}>{b.emoji}</div>
                  <div className="related-body">
                    <div className="blog-tag-pill">{b.tag}</div>
                    <div className="related-title">{b.title}</div>
                    <div className="blog-date">{b.date} · {b.readTime}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
