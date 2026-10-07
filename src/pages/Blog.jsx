import { Link, useParams } from "react-router-dom";
import { blogs, projects } from "../data/content";
import { scraperBySlug } from "../data/scrapers";
import { GUIDE_LINKS } from "../data/guideLinks";
import { services } from "../data/services";
import { blogImage, socialFor, dimsFor, IMG_W, IMG_H } from "../data/images";
import { useSeo, crumbs, ORIGIN } from "../useSeo";
import { FounderHeader, FounderNote } from "../components/Founder";
import "./Blog.css";

/* A guide's "Put this to work" link, resolved to the page's own title and
   a one-word kind. Unknown paths resolve to null and are skipped. */
function resolveLink(to) {
  if (to.startsWith("/services/")) {
    const s = services.find(x => "/services/" + x.slug === to);
    return s && { to, kind: "Service", title: s.h1 };
  }
  if (to.startsWith("/projects/")) {
    const p = projects.find(x => "/projects/" + x.id === to);
    return p && { to, kind: "Case study", title: p.title };
  }
  const sc = scraperBySlug(to.slice(1));
  return sc && { to, kind: "Platform", title: sc.h1 || sc.site + " Scraper" };
}

/* "June 10, 2025" -> "2025-06-10" in every timezone. toISOString() on the
   local-midnight parse gave the day before for anyone east of UTC. */
const isoDate = str => {
  const d = new Date(str);
  return isNaN(d) ? undefined
    : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function BlogPage() {
  useSeo({
    title: "Car Auction & Dealer Data Guides | AutoSmartCode Blog",
    description: "Practical guides for dealers and wholesalers — MMR, Carfax and AutoCheck, VIN decoding, auction automation and pricing against the live market.",
    path: "/blog",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "AutoSmartCode Blog",
      url: ORIGIN + "/blog",
      description: "Guides on auction data, vehicle history reports, MMR and dealer automation for the car trade.",
      blogPost: blogs.map(b => ({
        "@type": "BlogPosting",
        headline: b.title,
        url: ORIGIN + "/blog/" + b.slug,
        datePublished: isoDate(b.date),
        author: { "@type": "Person", name: "Sam" },
        image: ORIGIN + socialFor(blogImage(b)),
      })),
    },
  });

  return (
    <div className="inner-page">
      <div className="inner-hero" style={{ "--hero-photo": 'url("/img/photos/showroom.webp")' }}>
        <div className="container">
          <FounderHeader
            title="Guides That Actually Help"
            sub="MMR, Carfax and AutoCheck, VIN decoding, auction automation and pricing against the live market — written from real dealer projects, not theory."
            line="written by me, from paid client work"
          />
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="blog-all-grid">
            {blogs.map((b, i) => {
              const img = blogImage(b);
              return (
              <Link to={`/blog/${b.slug}`} key={b.id} className="blog-card-full">
                {/* A real <img>, not an emoji on a gradient. The card art is
                    generated from this post's own title and category, so it is
                    indexable in Google Images and carries alt text. The first
                    two are above the fold on most screens, so they load eagerly
                    and the rest defer. */}
                <div className="blog-card-img" style={{ background: b.color }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
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
              );
            })}
          </div>
        </div>
      </section>
      <FounderNote
        eyebrow="Why I write these"
        title={<>Everything here came out of<br />a job somebody paid for</>}
        cta="Have me build it instead →"
      >
        <p>
          I don't write tutorials from documentation. Every guide on this page started as
          a problem a client hit — a site that blocked the obvious approach, a dataset
          that needed cleaning before it meant anything, a nightly job that had to survive
          being left alone for a year.
        </p>
        <p>
          So they include the parts most articles skip: <strong>what breaks, and what it
          costs to fix</strong>. If a technique only works until a site adds rate limiting,
          I say so. You should be able to follow one of these and build the thing — or read
          it, decide it's not worth your week, and hire me instead. Both are fine outcomes.
        </p>
      </FounderNote>

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

/** `![alt](/img/x.svg)`, optionally followed by `*caption text*` on its own
 *  line. Kept to the same tiny markdown subset the prerenderer understands —
 *  the two renderers have to agree character for character or the static HTML
 *  and the hydrated page would differ. */
const IMAGE_RE = /^!\[(.*?)\]\((.+?)\)$/;

/**
 * Inline `**bold**` and `[text](/path)` in one pass.
 *
 * Links were not supported before, so an article could only point at another
 * page by naming it and hoping. Internal links are how a topic cluster passes
 * authority between its pages and how a reader gets from a guide to the page
 * that sells the thing — both worth more than the twenty lines this costs.
 *
 * Site-relative hrefs go through react-router so navigation stays client-side;
 * anything absolute is treated as external and gets the usual rel guards.
 */
const INLINE_RE = /(\*\*.+?\*\*|\[[^\]]+\]\([^)]+\))/g;

function inline(text, keyPrefix) {
  return text.split(INLINE_RE).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={key}>{part.slice(2, -2)}</strong>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("/")
        ? <Link key={key} to={href}>{label}</Link>
        : <a key={key} href={href} target="_blank" rel="noopener noreferrer">{label}</a>;
    }
    return part;
  });
}

function renderContent(content) {
  const lines = content.trim().split("\n");
  const elements = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) { elements.push(<div key={key++} className="blog-spacer" />); continue; }
    const image = line.match(IMAGE_RE);
    if (image) {
      const [, alt, src] = image;
      // Skip blank lines when looking for the caption — markdown is normally
      // written with a blank line between block elements, and requiring the
      // caption to butt up against the image would be a trap.
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      const next = (lines[j] || "").trim();
      const caption = /^\*[^*].*\*$/.test(next) ? next.slice(1, -1) : null;
      if (caption) i = j;
      const dims = dimsFor(src);
      elements.push(
        <figure key={key++} className="blog-figure">
          <img src={src} alt={alt} {...(dims || {})} loading="lazy" decoding="async" />
          {caption && <figcaption>{inline(caption, `cap${key}`)}</figcaption>}
        </figure>
      );
      continue;
    }
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
          {items.map((item, idx) => <li key={idx}>{inline(item, `li${idx}`)}</li>)}
        </ul>
      );
    } else {
      elements.push(
        <p key={key++} className="blog-content-p">{inline(line, `p${key}`)}</p>
      );
    }
  }
  return elements;
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);
  const published = blog ? isoDate(blog.date) : "";
  const hero = blog ? blogImage(blog) : null;

  useSeo(blog ? {
    /* metaTitle is the short SERP form; title is the long on-page H1. */
    title: (blog.metaTitle || blog.title) + " | AutoSmartCode",
    description: blog.summary.slice(0, 155),
    path: "/blog/" + blog.slug,
    type: "article",
    image: socialFor(hero),
    imageAlt: hero.alt,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          headline: blog.title,
          description: blog.summary,
          url: ORIGIN + "/blog/" + blog.slug,
          datePublished: published,
          dateModified: published,
          wordCount: blog.content.split(/\s+/).length,
          articleSection: blog.tag,
          inLanguage: "en-US",
          // Google's article rich results want a raster of at least 1200px
          // wide; ImageObject with explicit dimensions is what qualifies it.
          image: {
            "@type": "ImageObject",
            url: ORIGIN + socialFor(hero),
            width: hero.width,
            height: hero.height,
            caption: hero.alt,
          },
          author: { "@type": "Person", name: "Sam", url: ORIGIN + "/about" },
          publisher: { "@id": ORIGIN + "/#org" },
          mainEntityOfPage: { "@type": "WebPage", "@id": ORIGIN + "/blog/" + blog.slug },
        },
        crumbs([["Blog", "/blog"], [blog.title, "/blog/" + blog.slug]]),
      ],
    },
  } : {
    title: "Article not found | AutoSmartCode",
    description: "This article does not exist.",
    path: "/blog/" + slug,
    noindex: true,
  });

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
            <span>By Sam, AutoSmartCode</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container blog-detail-layout">
          <article className="blog-article">
            {/* The article's own hero. Eager and high priority because it is
                the largest element above the fold — lazy-loading it would make
                it the Largest Contentful Paint and cost the page its score. */}
            <figure className="blog-hero-figure">
              <img
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                fetchpriority="high"
                decoding="async"
              />
            </figure>
            <p className="blog-summary-lead">{blog.summary}</p>
            <div className="blog-content">
              {renderContent(blog.content)}
            </div>
            {(GUIDE_LINKS[blog.slug] || []).length > 0 && (
              <div className="guide-next">
                <h2>Put this to work</h2>
                <ul>
                  {GUIDE_LINKS[blog.slug].map(resolveLink).filter(Boolean).map(l => (
                    <li key={l.to}>
                      <Link to={l.to}><span className="guide-next-kind">{l.kind}</span>{l.title} →</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>

          <aside className="blog-sidebar">
            <div className="sidebar-card">
              <h3>About the Author</h3>
              <div className="author-block">
                <picture>
                  <source srcSet={process.env.PUBLIC_URL + "/sam.webp"} type="image/webp" />
                  <img
                    className="author-avatar-lg"
                    src={process.env.PUBLIC_URL + "/sam.jpg"}
                    alt="Sam, founder of AutoSmartCode"
                    width="56" height="56" loading="lazy" decoding="async"
                  />
                </picture>
                <div>
                  <div className="author-name-lg">Sam</div>
                  <div className="author-title">Founder, AutoSmartCode</div>
                </div>
              </div>
              <p className="author-bio">Builds auction data pipelines, vehicle history report automation and custom browser extensions for car dealers, wholesalers and auction buyers. 1000+ automation projects delivered.</p>
            </div>

            <div className="sidebar-card">
              <h3>Need This Done?</h3>
              <p style={{ color: "var(--body)", fontSize: "0.9rem", lineHeight: "1.75", marginBottom: "1.1rem" }}>
                Don't want to build it yourself? I'll build exactly what this article describes for your business — and deliver it fast.
              </p>
              <Link to="/#contact" className="btn btn-blue" style={{ width: "100%", justifyContent: "center" }}>
                Get a Free Quote →
              </Link>
            </div>

            <div className="sidebar-card">
              <h3>Services Mentioned</h3>
              <div className="sidebar-service-list">
                {services.map(s => (
                  <Link to={`/services/${s.slug}`} key={s.slug} className="sidebar-service-item">{s.nav} →</Link>
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
                  <div className="related-img" style={{ background: b.color }}>
                    <img
                      src={blogImage(b).src}
                      alt={blogImage(b).alt}
                      width={IMG_W}
                      height={IMG_H}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
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

      <FounderNote
        eyebrow="About the author"
        title={<>I build this for a living,<br />which is why I can write about it</>}
        cta="Get this built for you →"
      >
        <p>
          I'm Sam, founder of AutoSmartCode. I've delivered scraping and automation
          systems to over a hundred businesses, and AutoSmartCode now works only for
          the car trade — dealers, wholesalers and auction buyers. The articles here
          are the notes from that work rather than a content plan.
        </p>
        <p>
          If something in this piece doesn't match what you're seeing on your own target
          site, that's worth an email. Half of what I know about a site I only learned
          because someone asked <strong>"why doesn't this work for mine?"</strong>
        </p>
      </FounderNote>
    </div>
  );
}
