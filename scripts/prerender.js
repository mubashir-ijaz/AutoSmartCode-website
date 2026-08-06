/**
 * Static prerender — runs after `react-scripts build` (see the `postbuild`
 * npm script).
 *
 * The problem it solves: this is a client-rendered SPA, so every one of the
 * ~49 URLs ships the same index.html with an empty <div id="root">. Googlebot
 * executes JavaScript and eventually sees the real page. Bingbot, and most AI
 * crawlers (GPTBot, ClaudeBot, PerplexityBot), largely do not — they read the
 * raw HTML and find one identical, empty document 49 times over. robots.txt
 * invites them in and then hands them nothing.
 *
 * What this does: writes build/<route>/index.html for every route, with that
 * route's real title, description, canonical, social tags and JSON-LD in the
 * <head>, and the page's actual copy inside #root. React replaces that markup
 * on hydration with the identical content, so this is not cloaking — the
 * static and rendered versions say the same thing.
 *
 * It is not full SSR. The interactive pieces (contact form, demos, coin) only
 * exist after hydration. Everything a crawler needs to read is here.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ORIGIN = "https://www.autosmartcode.com";
const root = path.join(__dirname, "..");
const build = path.join(root, "build");

/* ---------- load the ESM data modules from a CommonJS script ---------- */

function loadData(relPath, names) {
  const src = fs.readFileSync(path.join(root, relPath), "utf8").replace(/^export\s+/gm, "");
  const sandbox = { module: {}, out: null };
  vm.createContext(sandbox);
  vm.runInContext(`${src}\n;out = { ${names.join(", ")} };`, sandbox, { filename: relPath });
  return sandbox.out;
}

const { blogs, projects, FAQS } = loadData("src/data/content.js", ["blogs", "projects", "FAQS"]);
const { services } = loadData("src/data/services.js", ["services"]);
const { scrapers } = loadData("src/data/scrapers.js", ["scrapers"]);
const { webdesign } = loadData("src/data/webdesign.js", ["webdesign"]);

/* ------------------------------- helpers ------------------------------ */

const esc = s => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

/** Inline **bold** only — everything else is already plain text. */
const inline = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

const h1 = t => `<h1>${esc(t)}</h1>`;
const h2 = t => `<h2>${esc(t)}</h2>`;
const h3 = t => `<h3>${esc(t)}</h3>`;
const p = t => `<p>${inline(t)}</p>`;
const ul = items => `<ul>${items.map(i => `<li>${inline(i)}</li>`).join("")}</ul>`;
const a = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;

/** FAQ rendered as real headings + text, matching the <details> on the page. */
const faqBlock = faqs =>
  h2("Frequently asked questions") + faqs.map(f => h3(f.q) + p(f.a)).join("");

const linkList = (title, items) =>
  h2(title) + `<ul>${items.map(([href, text]) => `<li>${a(href, text)}</li>`).join("")}</ul>`;

/** The same minimal markdown subset that Blog.jsx renders. */
function markdown(md) {
  const lines = md.trim().split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith("## ")) out.push(h2(line.slice(3)));
    else if (line.startsWith("### ")) out.push(h3(line.slice(4)));
    else if (line.startsWith("**") && line.endsWith("**")) out.push(p(line.slice(2, -2)));
    else if (line.startsWith("- ")) {
      const items = [line.slice(2)];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith("- ")) items.push(lines[++i].trim().slice(2));
      out.push(ul(items));
    } else out.push(p(line));
  }
  return out.join("");
}

const crumbs = items => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "/"], ...items].map(([name, pth], i) => ({
    "@type": "ListItem", position: i + 1, name, item: ORIGIN + pth,
  })),
});

/* -------------------------- the route table --------------------------- */
/* Each entry mirrors what src/useSeo.js sets at runtime for that route.   */

const routes = [];

routes.push({
  path: "/",
  title: "Web Scraping & Automation Services — US, UK & Worldwide | AutoSmartCode",
  description:
    "We turn any website into clean, structured data. Custom scrapers, lead lists, " +
    "price monitors and auction reports — built in 2–5 days, fixed price, quoted in 24 hours.",
  schema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(f => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  body:
    h1("We turn any website into the data your business runs on") +
    p("Scrapers, auction reports, lead lists and price monitors — built clean, delivered fast. Fixed price, quoted within 24 hours, most projects delivered in 2 to 5 days.") +
    h2("If the data is on a website, I can put it in your spreadsheet") +
    p("Someone on your team is copying that data by hand right now. I write the software that does it instead — on a schedule, at a volume no person can match. You never touch any code.") +
    ul([
      "Works behind logins and on sites that block ordinary tools",
      "Thousands of pages, no blocks, no missed rows",
      "Excel, CSV, Google Sheets, a database, or an API",
    ]) +
    h2("What I build for clients") +
    services.map(s => h3(s.h1) + p(s.hero) + p(a("/services/" + s.slug, "More about " + s.nav))).join("") +
    h2("Four steps from idea to running system") +
    ul([
      "Tell me what you need — the URLs, the fields, how often. Plain English is fine.",
      "I scope it and quote it — a fixed price and a delivery date within 24 hours.",
      "I build and test it — most projects in 2 to 5 days, with sample output early.",
      "You get it running — delivered with alerting so you know if anything breaks.",
    ]) +
    faqBlock(FAQS) +
    linkList("Sites I scrape", scrapers.map(s => ["/" + s.slug, s.h1 || s.site + " Scraper"])) +
    linkList("Websites I build", webdesign.map(w => ["/" + w.slug, w.h1])) +
    linkList("Guides", blogs.map(b => ["/blog/" + b.slug, b.title])),
});

routes.push({
  path: "/services",
  title: "Services — Web Scraping, Automation & Web Development | AutoSmartCode",
  description:
    "Six things I build for businesses in the US, UK and beyond: car auction automation, vehicle history report pipelines, " +
    "dealer inventory data, B2B lead lists, custom web scrapers and web development.",
  schema: crumbs([["Services", "/services"]]),
  body:
    h1("What I Build") +
    // Must match the visible copy in Services.jsx — the static and rendered
    // versions saying different things is exactly what cloaking checks look for.
    p("Six services, one developer. Each one has its own page because each one is a different problem — pick the one that sounds like yours.") +
    services.map(s => h2(s.h1) + p(s.hero) + p(a("/services/" + s.slug, "Read more about " + s.nav))).join("") +
    linkList("Sites I scrape", scrapers.map(s => ["/" + s.slug, s.h1 || s.site + " Scraper"])) +
    linkList("Websites I build", webdesign.map(w => ["/" + w.slug, w.h1])),
});

routes.push({
  path: "/projects",
  title: "Web Scraping & Automation Projects | AutoSmartCode Portfolio",
  description:
    "Real client work — car auction intelligence, Google Maps lead scrapers, Amazon and Walmart data pipelines, price monitors and eCommerce builds.",
  schema: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AutoSmartCode Projects",
    url: ORIGIN + "/projects",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((pr, i) => ({
        "@type": "ListItem", position: i + 1, name: pr.title,
        url: ORIGIN + "/projects/" + pr.id,
      })),
    },
  },
  body:
    h1("All Projects") +
    p("1000+ projects delivered. Here are some of the most impactful ones — each solved a real business problem.") +
    projects.map(pr => h2(pr.title) + p(pr.client) + p(pr.description) + p(a("/projects/" + pr.id, "Read the case study"))).join(""),
});

routes.push({
  path: "/blog",
  title: "Web Scraping & Automation Guides | AutoSmartCode Blog",
  description:
    "Practical guides on web scraping, Python automation, lead generation and AI data analysis — written from real client projects, not theory.",
  schema: {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AutoSmartCode Blog",
    url: ORIGIN + "/blog",
    description: "Guides on web scraping, automation and data for businesses in the US, UK and worldwide.",
    blogPost: blogs.map(b => ({
      "@type": "BlogPosting",
      headline: b.title,
      url: ORIGIN + "/blog/" + b.slug,
      datePublished: new Date(b.date).toISOString().slice(0, 10),
      author: { "@type": "Person", name: "Sam" },
    })),
  },
  body:
    h1("Blog & Guides") +
    p("Practical writing on scraping, automation and data — what things cost, what is legal, and how the builds actually work.") +
    blogs.map(b => h2(b.title) + p(b.summary) + p(a("/blog/" + b.slug, "Read the article"))).join(""),
});

routes.push({
  path: "/about",
  title: "About Sam — Founder & CEO of AutoSmartCode | Web Scraping Expert",
  description:
    "Sam is the founder behind AutoSmartCode — building web scrapers, data pipelines and " +
    "automation systems for US car dealers, eCommerce sellers, agencies and property investors.",
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        url: ORIGIN + "/about",
        name: "About AutoSmartCode",
        mainEntity: { "@id": ORIGIN + "/#org" },
      },
      crumbs([["About", "/about"]]),
    ],
  },
  body:
    h1("About AutoSmartCode") +
    p("AutoSmartCode builds web scrapers, automation systems, data pipelines and websites for businesses across the US, UK, Europe and Australia. Fixed prices, quoted within 24 hours, most projects delivered in 2 to 5 days.") +
    h2("What I do") +
    ul([
      "Scraping engineering — Python, Scrapy, Playwright, Selenium, rotating proxies, session and cookie handling, fingerprint and Cloudflare defences",
      "Data and pipelines — Pandas, deduplication and fuzzy matching, validation rules, MySQL and PostgreSQL, scheduled ETL, delivery to Excel, Google Sheets, a database or a REST endpoint",
      "Automation and bots — cron and queue-driven jobs, Telegram, Slack and email alerting, retry and backoff logic, uptime and freshness monitoring",
      "Product and front end — React, Next.js, Node.js, Vercel, dashboards and admin panels that put the data in front of the people who act on it",
    ]) +
    h2("Who I work with") +
    p("US car dealers and wholesalers, eCommerce sellers, marketing agencies buying leads, real estate investors, and research and analyst teams. Plus local businesses whose website is costing them enquiries they never hear about.") +
    linkList("Services", services.map(s => ["/services/" + s.slug, s.h1])),
});

/* Service landing pages */
for (const s of services) {
  routes.push({
    path: "/services/" + s.slug,
    title: s.metaTitle + " | AutoSmartCode",
    description: s.metaDesc,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": ORIGIN + "/services/" + s.slug + "#service",
          name: s.h1,
          description: s.metaDesc,
          url: ORIGIN + "/services/" + s.slug,
          serviceType: s.nav,
          keywords: s.keywords.join(", "),
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Italy" },
            { "@type": "Country", name: "Germany" },
            { "@type": "Country", name: "Australia" },
            { "@type": "Country", name: "Canada" },
          ],
          provider: { "@id": ORIGIN + "/#org" },
        },
        {
          "@type": "FAQPage",
          "@id": ORIGIN + "/services/" + s.slug + "#faq",
          mainEntity: s.faqs.map(f => ({
            "@type": "Question", name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        crumbs([["Services", "/services"], [s.nav, "/services/" + s.slug]]),
      ],
    },
    body:
      h1(s.h1) + p(s.hero) +
      s.sections.map(sec => h2(sec.h) + sec.p.map(p).join("") + (sec.list ? ul(sec.list) : "")).join("") +
      h2("What you get") + ul(s.deliverables) +
      h2("Sites and platforms") + p(s.platforms.join(", ")) +
      h2("Built with") + p(s.stack.join(", ")) +
      faqBlock(s.faqs) +
      linkList("Related services", s.related.map(r => {
        const o = services.find(x => x.slug === r);
        return o ? ["/services/" + o.slug, o.h1] : null;
      }).filter(Boolean)),
  });
}

/* Per-site scraper pages */
for (const s of scrapers) {
  const heading = s.h1 || s.site + " Scraper";
  routes.push({
    path: "/" + s.slug,
    title: s.metaTitle + " | AutoSmartCode",
    description: s.metaDesc,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": ORIGIN + "/" + s.slug + "#service",
          name: heading,
          alternateName: s.metaTitle,
          description: s.metaDesc,
          url: ORIGIN + "/" + s.slug,
          serviceType: "Web scraping and data extraction",
          keywords: s.keywords.join(", "),
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Italy" },
            { "@type": "Country", name: "Germany" },
            { "@type": "Country", name: "Australia" },
            { "@type": "Country", name: "Canada" },
          ],
          provider: { "@id": ORIGIN + "/#org" },
        },
        {
          "@type": "FAQPage",
          "@id": ORIGIN + "/" + s.slug + "#faq",
          mainEntity: s.faqs.map(f => ({
            "@type": "Question", name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        crumbs([["Services", "/services"], [heading, "/" + s.slug]]),
      ],
    },
    body:
      h1(heading) + p(s.tagline) +
      h2(`What ${s.site} is, and why the data matters`) + p(s.what) + p(s.why) +
      h2(`What the ${s.site} scraper extracts`) + ul(s.fields) +
      h2(`Getting past ${s.site}'s defences`) + p(s.defenses) +
      h2("What people do with it") + ul(s.uses) +
      h2("How you receive the data") +
      p("Excel, CSV, JSON, a Google Sheet that refreshes on a schedule, a direct write into MySQL or Postgres, or a REST endpoint your own tools can query.") +
      faqBlock(s.faqs) +
      linkList("Other sites I scrape", scrapers.filter(o => o.slug !== s.slug)
        .map(o => ["/" + o.slug, o.h1 || o.site + " Scraper"])),
  });
}

/* Web design landing pages */
for (const w of webdesign) {
  routes.push({
    path: "/" + w.slug,
    title: w.metaTitle + " | AutoSmartCode",
    description: w.metaDesc,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": ORIGIN + "/" + w.slug + "#service",
          name: w.h1,
          description: w.metaDesc,
          url: ORIGIN + "/" + w.slug,
          serviceType: "Web design and development",
          keywords: w.keywords.join(", "),
          areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Italy" },
            { "@type": "Country", name: "Germany" },
            { "@type": "Country", name: "Australia" },
            { "@type": "Country", name: "Canada" },
          ],
          provider: { "@id": ORIGIN + "/#org" },
        },
        {
          "@type": "FAQPage",
          "@id": ORIGIN + "/" + w.slug + "#faq",
          mainEntity: w.faqs.map(f => ({
            "@type": "Question", name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        crumbs([["Services", "/services"], [w.nav, "/" + w.slug]]),
      ],
    },
    body:
      h1(w.h1) + p(w.tagline) +
      h2("The situation you're probably in") + p(w.problem) +
      h2("Does any of this sound familiar?") + ul(w.signals) +
      h2("What gets built instead") + p(w.answer) +
      h2("What's included in every build") + ul(w.includes) +
      h2("How it works") + w.process.map(st => h3(st.n + ". " + st.h) + p(st.p)).join("") +
      faqBlock(w.faqs) +
      linkList("Other websites I build", webdesign.filter(o => o.slug !== w.slug).map(o => ["/" + o.slug, o.h1])),
  });
}

/* Blog articles */
for (const b of blogs) {
  const published = new Date(b.date);
  routes.push({
    path: "/blog/" + b.slug,
    title: b.title + " | AutoSmartCode",
    description: b.summary.slice(0, 155),
    type: "article",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          headline: b.title,
          description: b.summary,
          url: ORIGIN + "/blog/" + b.slug,
          datePublished: isNaN(published) ? undefined : published.toISOString().slice(0, 10),
          author: { "@type": "Person", name: "Sam" },
          publisher: { "@id": ORIGIN + "/#org" },
          inLanguage: "en-US",
        },
        crumbs([["Blog", "/blog"], [b.title, "/blog/" + b.slug]]),
      ],
    },
    body: h1(b.title) + p(b.summary) + markdown(b.content),
  });
}

/* Project case studies */
for (const pr of projects) {
  routes.push({
    path: "/projects/" + pr.id,
    title: pr.title + " | AutoSmartCode Case Study",
    description: pr.description.slice(0, 155),
    type: "article",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CreativeWork",
          name: pr.title,
          description: pr.description,
          url: ORIGIN + "/projects/" + pr.id,
          about: pr.type,
          keywords: pr.stack.join(", "),
          inLanguage: "en-US",
          creator: { "@type": "Organization", name: "AutoSmartCode", url: ORIGIN },
        },
        crumbs([["Projects", "/projects"], [pr.title, "/projects/" + pr.id]]),
      ],
    },
    body:
      h1(pr.title) + p(pr.client) +
      h2("Project overview") + p(pr.description) +
      h2("The challenge") + p(pr.challenge) +
      h2("My solution") + p(pr.solution) +
      h2("Result") + p(pr.result) +
      h2("Tech stack") + p(pr.stack.join(", ")) +
      h2("What was built") + ul(pr.details),
  });
}

/* ------------------------------- writing ------------------------------ */

/* The home route overwrites build/index.html, which is also the template. Strip
   any previous injection so running this twice is idempotent rather than
   stamping the homepage's content onto all 49 pages. */
const shell = fs.readFileSync(path.join(build, "index.html"), "utf8")
  .replace(/<script type="application\/ld\+json" id="route-schema">[\s\S]*?<\/script>/, "")
  .replace(/<!--prerender-->[\s\S]*?<!--\/prerender-->/, "");

if (!shell.includes('<div id="root"></div>')) {
  console.error(
    "prerender: build/index.html has no empty <div id=\"root\"></div> to fill.\n" +
    "Run `npm run build` to regenerate it, then prerender again."
  );
  process.exit(1);
}

/** Replace a tag's attribute value in the minified shell, or leave it alone. */
function swap(html, pattern, replacement) {
  return pattern.test(html) ? html.replace(pattern, replacement) : html;
}

function render(route) {
  const url = ORIGIN + (route.path === "/" ? "/" : route.path);
  const title = esc(route.title);
  const desc = esc(route.description);
  let html = shell;

  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = swap(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${desc}"/>`);
  html = swap(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(url)}"/>`);
  html = swap(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}"/>`);
  html = swap(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${desc}"/>`);
  html = swap(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${esc(url)}"/>`);
  html = swap(html, /<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${route.type || "website"}"/>`);
  html = swap(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}"/>`);
  html = swap(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${desc}"/>`);

  if (route.schema) {
    const tag = `<script type="application/ld+json" id="route-schema">${
      JSON.stringify(route.schema).replace(/</g, "\\u003c")
    }</script>`;
    html = html.replace("</head>", tag + "</head>");
  }

  // React clears #root on hydration and re-renders the same content, so this
  // is a static mirror rather than a second version of the page.
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><!--prerender--><div class="container" style="padding:120px 0 60px">${route.body}</div><!--/prerender--></div>`
  );

  return html;
}

let written = 0;
for (const route of routes) {
  const dir = route.path === "/" ? build : path.join(build, route.path);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), render(route));
  written++;
}

console.log(`prerendered ${written} routes to static HTML`);
