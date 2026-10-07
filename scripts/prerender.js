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

const { blogs, projects, FAQS } =
  loadData("src/data/content.js", ["blogs", "projects", "FAQS"]);
const { services } = loadData("src/data/services.js", ["services"]);
const { AREAS_SERVED } = loadData("src/data/geo.js", ["AREAS_SERVED"]);
const { scrapers } = loadData("src/data/scrapers.js", ["scrapers"]);
const { PRICING, priceLine } = loadData("src/data/pricing.js", ["PRICING", "priceLine"]);
const { blogImage, scraperImage, serviceImage, socialImage, dimsFor, IMG_W, IMG_H } =
  loadData("src/data/images.js",
    ["blogImage", "scraperImage", "serviceImage", "socialImage", "dimsFor", "IMG_W", "IMG_H"]);

/**
 * Whether scripts/generate-images.js managed to rasterise the SVG heroes to
 * PNG this build. Social platforms will not render SVG, so when the optional
 * @resvg/resvg-js step was skipped every route falls back to the site-wide
 * /og-image.png rather than emitting a preview that renders as nothing.
 */
const HAS_RASTER = (() => {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, "public/img/manifest.json"), "utf8")).hasRaster === true;
  } catch {
    return false;
  }
})();

/* ------------------------------- helpers ------------------------------ */

const esc = s => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

/**
 * Inline `**bold**` and `[text](/path)`.
 *
 * esc() runs first, and it only touches & < > ", so the brackets and
 * parentheses the link syntax needs survive it intact. Anything not starting
 * with "/" is treated as an outbound link and gets rel="noopener" — the same
 * rule src/pages/Blog.jsx applies, because the static HTML and the hydrated
 * page have to say the same thing.
 */
const inline = s => esc(s)
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) =>
    href.startsWith("/")
      ? `<a href="${href}">${label}</a>`
      : `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`);

const h1 = t => `<h1>${esc(t)}</h1>`;
const h2 = t => `<h2>${esc(t)}</h2>`;
const h3 = t => `<h3>${esc(t)}</h3>`;
const p = t => `<p>${inline(t)}</p>`;
const ul = items => `<ul>${items.map(i => `<li>${inline(i)}</li>`).join("")}</ul>`;
const a = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;

/** Hero image. width/height are always emitted so the box is reserved before
 *  the file arrives — a missing pair is the usual cause of layout shift. */
const img = (src, alt, { eager = false } = {}) => {
  // Emitting a width/height pair that does not match the file is worse than
  // emitting none — the browser reserves the wrong box and the page jumps when
  // the real image arrives. dimsFor returns null for anything unrecognised.
  const d = dimsFor(src);
  return `<img src="${esc(src)}" alt="${esc(alt)}"` +
    (d ? ` width="${d.width}" height="${d.height}"` : "") +
    (eager ? ` fetchpriority="high"` : ` loading="lazy"`) + ` decoding="async"/>`;
};

/** `eager` is for the one image above the fold on a page — the hero. Lazy is
 *  right for everything below it, and wrong for the LCP element. */
const figure = (src, alt, caption, opts = {}) =>
  `<figure>${img(src, alt, opts)}` +
  (caption ? `<figcaption>${inline(caption)}</figcaption>` : "") + `</figure>`;

const heroFigure = (src, alt) => figure(src, alt, null, { eager: true });

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
    const image = line.match(/^!\[(.*?)\]\((.+?)\)$/);
    if (image) {
      const [, alt, src] = image;
      // Markdown normally separates block elements with a blank line, so the
      // caption lookahead has to step over them. Matches Blog.jsx.
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      const next = (lines[j] || "").trim();
      const caption = /^\*[^*].*\*$/.test(next) ? next.slice(1, -1) : null;
      if (caption) i = j;
      out.push(figure(src, alt, caption));
      continue;
    }
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

/**
 * The site-wide nav, mirrored into every prerendered page.
 *
 * Without this the static HTML carried only the page body, which meant the
 * four hub pages — /services, /projects, /blog, /about — had no inbound
 * internal link anywhere a crawler reading raw HTML could follow. They were
 * reachable only through the sitemap, which gets them indexed but gives them
 * none of the internal-link signal every other page on the site passes around.
 *
 * These are the same destinations the real <Navbar> and <Footer> render, so
 * the static mirror and the hydrated page agree — which is the rule the rest
 * of this file follows for body copy too.
 */
const NAV = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/projects", "Projects"],
  ["/blog", "Blog & Guides"],
  ["/about", "About"],
];

const siteNav = current =>
  `<nav aria-label="Site"><ul>${
    NAV.filter(([href]) => href !== current)
       .map(([href, text]) => `<li>${a(href, text)}</li>`)
       .join("")
  }</ul></nav>`;

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
  title: "Car Dealer Automation & Auction Data Scraping | AutoSmartCode",
  description:
    "Car dealer automation: extensions showing MMR, Carfax & AutoCheck on the listing, " +
    "overnight auction watch lists, and daily marketplace, government & lease sale alerts.",
  schema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(f => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  // Must match the visible copy in Home.jsx.
  body:
    h1("Car dealer automation that works while you sleep.") +
    p("For dealers, wholesalers and auction buyers — running on your own Manheim, Carfax, AutoCheck and Autoniq accounts.") +
    ul([
      "MMR, Carfax & AutoCheck right on the car page — $50–$100/mo",
      "A clean auction watch list waiting every morning — $500/mo per site",
      "Daily deals from marketplaces, government & lease sales",
    ]) +
    h2("From 15 cars to 200 — without working the list by hand") +
    p("“I walk into the office at 6 AM and the work is already done. Every auction has been gone through, the marketplaces are checked, and my watch list is sitting there with notes and max bids — I just sit down and start buying. When we started, we had 10 to 15 cars in inventory. Today we run 150 to 200 cars as a wholesaler. It changed how we run the business, and I'm happy with it every single day.” — Ricky, Major Auto Sales, New York, USA") +
    p("[Read the Major Auto Sales case study](/projects/12)") +
    h2("Four ways I take the busywork off your desk") +
    ul([
      "[Scan the car, see everything on the same screen](/services/dealer-browser-extension) — a custom extension reads the VIN off the listing and shows MMR, Carfax, AutoCheck and your max bid right there.",
      "[A clean watch list when you reach the office](/services/auction-run-list-triage) — while you sleep, the whole run list is read, filtered, checked and noted.",
      "[Marketplaces, government & lease sales, every day](/services/marketplace-government-lease-sales) — OPENLANE, Facebook Marketplace, eBay Motors, GovDeals, GSA Auctions and off-lease sales checked daily for your buy box.",
      "[Manheim, Carfax & Autoniq working as one system](/services/custom-dealer-software) — software designed around how you buy, your accounts connected into one dashboard.",
    ]) +
    h2("Stop copying VINs. See MMR, Carfax & AutoCheck on the car page.") +
    p("I build a browser extension for your desk that scans the car automatically and shows real-time data on the same screen — an Autoniq-style panel built around your margin, from $50 to $100 a month with no setup fee.") +
    h2("I work while you sleep. You walk into a clean watch list.") +
    ul([
      "10:00 PM — run lists pulled from Manheim, ADESA, ACV and OPENLANE",
      "11:30 PM — your buy box applied",
      "1:00 AM — every VIN checked against Carfax, AutoCheck, MMR and book values",
      "3:30 AM — marketplaces and government sales checked for new matches",
      "5:00 AM — notes and max bids written",
      "6:00 AM — watch list ready and a ranked email in your inbox",
    ]) +
    h2("Good cars outside the lanes — found for you every day") +
    p("OPENLANE, eBay Motors, Facebook Marketplace, Craigslist, GSA Auctions, GovDeals, Public Surplus, police and municipal auctions, off-lease and lease-return sales, captive, bank, repo and fleet portals.") +
    h2("Your Manheim, Carfax & Autoniq — working as one smart system") +
    p("I design software around how your business buys and sells: the accounts you already pay for connected into one dashboard, your rules built in, and your team working from the same list.") +
    h2("Simple monthly prices. No setup fees.") +
    ul(PRICING.map(pr => pr.name + " — " + priceLine(pr))) +
    faqBlock(FAQS) +
    linkList("Auctions, marketplaces, government sales and history reports", scrapers.map(s => ["/" + s.slug, s.h1 || s.site + " Scraper"])) +
    linkList("Services", services.map(s => ["/services/" + s.slug, s.h1])) +
    linkList("Guides", blogs.map(b => ["/blog/" + b.slug, b.title])),
});

routes.push({
  path: "/services",
  title: "Services — Auction Data, History Reports & Dealer Tools | AutoSmartCode",
  description:
    "What I build for the car trade: auction run-list triage and watch lists, custom dealer browser extensions, " +
    "vehicle history report pipelines, MMR automation and dealer inventory data.",
  schema: crumbs([["Services", "/services"]]),
  body:
    h1("What I Build for the Car Trade") +
    // Must match the visible copy in Services.jsx — the static and rendered
    // versions saying different things is exactly what cloaking checks look for.
    p("One developer, one industry. Each service has its own page because each one is a different problem — pick the one that sounds like your morning.") +
    services.map(s => h2(s.h1) + p(s.hero) + p("[Read more about " + s.nav + "](/services/" + s.slug + ")")).join("") +
    linkList("Auctions and marketplaces I pull from", scrapers.map(s => ["/" + s.slug, s.h1 || s.site + " Scraper"])),
});

routes.push({
  path: "/projects",
  title: "Car Auction & Dealer Data Projects | AutoSmartCode Portfolio",
  description:
    "Real client work for the car trade — run-list triage and watch lists, custom VIN panel extensions, auction intelligence pipelines and private-party sourcing.",
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
    h1("Dealer Projects") +
    p("Real builds for dealers, wholesalers and auction buyers — each one replaced a morning somebody was spending by hand.") +
    projects.map(pr => h2(pr.title) + p(pr.client) + p(pr.description) + p("[Read the case study](/projects/" + pr.id + ")")).join(""),
});

routes.push({
  path: "/blog",
  title: "Car Auction & Dealer Data Guides | AutoSmartCode Blog",
  description:
    "Practical guides for dealers and wholesalers — MMR, Carfax and AutoCheck, VIN decoding, auction automation and pricing against the live market.",
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
      datePublished: new Date(b.date).toISOString().slice(0, 10),
      author: { "@type": "Person", name: "Sam" },
      image: ORIGIN + socialImage(blogImage(b), HAS_RASTER),
    })),
  },
  body:
    h1("Blog & Guides") +
    p("MMR, Carfax and AutoCheck, VIN decoding, auction automation and pricing against the live market — written from real dealer projects, not theory.") +
    blogs.map(b => {
      const hero = blogImage(b);
      return h2(b.title) + img(hero.src, hero.alt) + p(b.summary) +
             p("[Read the article](/blog/" + b.slug + ")");
    }).join(""),
});

routes.push({
  path: "/about",
  title: "About Sam — Founder & CEO of AutoSmartCode | Car Auction Data",
  description:
    "Sam is the founder behind AutoSmartCode — building auction data pipelines, history report " +
    "automation and custom dealer tools for car dealers, wholesalers and auction buyers.",
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
    p("AutoSmartCode builds auction data pipelines, vehicle history report automation and custom dealer tools for the car trade across the US, UK, the Gulf, Europe and Australia. Fixed prices, quoted within 24 hours, most builds delivered in 3 to 7 days.") +
    h2("What I do") +
    ul([
      "Scraping engineering — Python, Scrapy, Playwright, Selenium, rotating proxies, session and cookie handling, fingerprint and Cloudflare defences",
      "Data and pipelines — Pandas, deduplication and fuzzy matching, validation rules, MySQL and PostgreSQL, scheduled ETL, delivery to Excel, Google Sheets, a database or a REST endpoint",
      "Automation and bots — cron and queue-driven jobs, Telegram, Slack and email alerting, retry and backoff logic, uptime and freshness monitoring",
      "Dealer tools and front end — Chrome and Edge extensions, Manifest V3, React, Node.js, the VIN panel on the listing and the dashboards your desk reads in the morning",
    ]) +
    h2("Who I work with") +
    p("Auction buyers, independent car dealers, wholesalers, dealer groups and fleet, lease and repo remarketers — in the US, UK, the Gulf, Europe and Australia.") +
    linkList("Services", services.map(s => ["/services/" + s.slug, s.h1])),
});

/* Service landing pages */
for (const s of services) {
  const hero = serviceImage(s);
  const spokes = scrapers.filter(sp => sp.pillar === s.slug);
  routes.push({
    path: "/services/" + s.slug,
    title: s.metaTitle + " | AutoSmartCode",
    description: s.metaDesc,
    image: socialImage(hero, HAS_RASTER),
    imageAlt: hero.alt,
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
          areaServed: AREAS_SERVED,
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
      // The cluster's downward links — see the matching block in
      // src/pages/Services.jsx. Without these a crawler landing on a pillar
      // has no path to the exact-match pages underneath it.
      (spokes.length
        ? linkList(s.nav + " — the individual pages",
            spokes.map(sp => ["/" + sp.slug, sp.h1 || sp.site + " Scraper"]))
        : "") +
      linkList("Related services", s.related.map(r => {
        const o = services.find(x => x.slug === r);
        return o ? ["/services/" + o.slug, o.h1] : null;
      }).filter(Boolean)),
  });
}

/* Per-site scraper pages */
for (const s of scrapers) {
  const heading = s.h1 || s.site + " Scraper";
  const hero = scraperImage(s);
  routes.push({
    path: "/" + s.slug,
    title: s.metaTitle + " | AutoSmartCode",
    description: s.metaDesc,
    image: socialImage(hero, HAS_RASTER),
    imageAlt: hero.alt,
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
          areaServed: AREAS_SERVED,
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
      linkList("Other platforms I pull from",
        scrapers.filter(o => o.slug !== s.slug)
          .map(o => ["/" + o.slug, o.h1 || o.site + " Scraper"])),
  });
}


/* Blog articles */
for (const b of blogs) {
  const published = new Date(b.date);
  const iso = isNaN(published) ? undefined : published.toISOString().slice(0, 10);
  const hero = blogImage(b);
  const social = socialImage(hero, HAS_RASTER);

  routes.push({
    path: "/blog/" + b.slug,
    /* metaTitle is the short SERP form; title is the long on-page H1.
       Must match what Blog.jsx sets at runtime. */
    title: (b.metaTitle || b.title) + " | AutoSmartCode",
    description: b.summary.slice(0, 155),
    type: "article",
    image: social,
    imageAlt: hero.alt,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          headline: b.title,
          description: b.summary,
          url: ORIGIN + "/blog/" + b.slug,
          datePublished: iso,
          // Was missing here while Blog.jsx emitted it, so the static HTML a
          // crawler reads carried weaker markup than the hydrated page. These
          // four now match src/pages/Blog.jsx field for field.
          dateModified: iso,
          wordCount: b.content.trim().split(/\s+/).length,
          articleSection: b.tag,
          mainEntityOfPage: { "@type": "WebPage", "@id": ORIGIN + "/blog/" + b.slug },
          image: {
            "@type": "ImageObject",
            url: ORIGIN + social,
            width: IMG_W,
            height: IMG_H,
            caption: hero.alt,
          },
          author: { "@type": "Person", name: "Sam", url: ORIGIN },
          publisher: { "@id": ORIGIN + "/#org" },
          inLanguage: "en-US",
        },
        crumbs([["Blog", "/blog"], [b.title, "/blog/" + b.slug]]),
      ],
    },
    body:
      h1(b.title) +
      heroFigure(hero.src, hero.alt) +
      p(b.summary) +
      markdown(b.content),
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

  // Before this, all 55 URLs shared one og:image, so every shared link and
  // every search result thumbnail looked identical regardless of the page.
  if (route.image) {
    const abs = esc(ORIGIN + route.image);
    const alt = esc(route.imageAlt || route.title);
    html = swap(html, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${abs}"/>`);
    html = swap(html, /<meta property="og:image:alt" content="[^"]*"\s*\/?>/, `<meta property="og:image:alt" content="${alt}"/>`);
    html = swap(html, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${abs}"/>`);
  }

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
    `<div id="root"><!--prerender--><div class="container" style="padding:120px 0 60px">${route.body}${siteNav(route.path)}</div><!--/prerender--></div>`
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
