# SEO setup — AutoSmartCode

## Where this started

Search Console, 3 months to 20 July 2026: **46 impressions, 1 click, average
position 56.1.** Thirteen queries, every one of them a good fit for the
business — `autoscraper`, `autoscout24 scraper`, `dealer inventory scraper`,
`autotrader scraper`, `carmax scraper`, `carsales scraper`, `mediamarkt
scraper`, `no-code database builder for automotive dealers`.

That is not a penalty and it is not a keyword problem. Google had already
matched the site to the right searches. The problem was that **one homepage
was answering all thirteen of them**, so it ranked properly for none. Position
56 is page six, and page six gets no clicks.

The fix is architecture, not tags.

---

## Site structure

**Hub → spoke.** Broad service pages carry the category terms; narrow
exact-match pages carry the individual queries; every spoke links up to its
hub and across to its siblings.

```
/services                          hub — links to all 25 pages below
├── /services/car-auction-automation
│   ├── /manheim-mmr-scraper
│   ├── /adesa-scraper
│   ├── /backlotcars-scraper
│   └── /openlane-scraper
├── /services/dealer-inventory-scraping
│   ├── /autotrader-scraper
│   ├── /autoscout24-scraper
│   ├── /carmax-scraper
│   ├── /carsales-scraper
│   ├── /cars-com-scraper
│   └── /cargurus-scraper
├── /services/vehicle-history-reports
├── /services/business-leads-data
│   └── /google-maps-scraper
├── /services/web-scraping
│   ├── /ebay-scraper
│   ├── /amazon-product-scraper
│   ├── /walmart-scraper
│   └── /mediamarkt-scraper
└── /services/web-development
    ├── /small-business-website-design
    ├── /website-redesign-services
    ├── /salon-website-design
    └── /restaurant-website-design
```

**Why the scraper and web-design pages sit at the root** rather than under a
folder: the URL itself is a ranking and click-through signal, and
`/autotrader-scraper` is an exact match for the query. `App.jsx` routes them
through `/:slug`, which React Router only reaches after every static route has
failed, so `/about` and `/blog` are never shadowed. Unknown slugs render a
`noindex` not-found state.

**Web design is deliberately a separate voice.** A salon owner searching
"salon website design" is not the person searching "autoscout24 scraper", and
copy written for one repels the other. Same domain and same authority, but no
Python, no proxy rotation, no anti-bot talk on those four pages.

**No two pages target the same query.** `/services/dealer-inventory-scraping`
covers both "dealer inventory scraper" and "car dealer scraper" rather than
splitting them into two thin near-duplicates that would compete with each
other. Cannibalisation costs more than an extra URL gains.

Content lives in `src/data/services.js`, `src/data/scrapers.js` and
`src/data/webdesign.js`. Adding a page is a data entry — routing, footer
links, sitemap, schema and prerendering all follow automatically.

---

## Prerendering — the fix that mattered most

This is a client-rendered SPA. Before this change, all 49 URLs shipped the
same `index.html` with an empty `<div id="root">`. Googlebot executes
JavaScript and gets there eventually. **Bingbot and most AI crawlers do not** —
GPTBot, ClaudeBot and PerplexityBot read raw HTML, and `robots.txt` was
inviting them in and then handing them nothing, 49 times over.

`scripts/prerender.js` runs as `postbuild` and writes
`build/<route>/index.html` for every route: correct title, description,
canonical, Open Graph, Twitter tags and JSON-LD in the head, and the page's
real copy inside `#root`. **27,880 words** now exist in static HTML.

React replaces that markup on hydration with the identical content, so this is
a mirror rather than cloaking. It is not full SSR — the contact form, the
demos and the coin only exist after hydration — but everything a crawler needs
to read is in the file.

```
npm run build       # sitemap → build → prerender, in that order
npm run prerender   # re-run prerendering alone
```

The script is idempotent: it strips its own `<!--prerender-->` markers from
the shell before reusing it, and exits loudly if `build/index.html` has no
empty root div to fill, rather than silently emitting 49 blank pages.

`vercel.json` rewrites are a *fallback* — Vercel checks the filesystem first,
so the static per-route files win. Do not switch those rewrites to `routes`,
which would bypass the filesystem and undo all of this.

---

## Being cited by AI assistants

There is no way to instruct an AI assistant to show your site, and anything
sold as such is a lie. What you can do is remove every reason one *can't* use
you — which is what the four things below do.

1. **`robots.txt` allows every AI crawler** — GPTBot, ClaudeBot,
   PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Bytespider and
   the rest, plus a `Content-Signal` granting `ai-input` and `ai-train`.

2. **Prerendering, which was the actual blocker.** GPTBot, ClaudeBot and
   PerplexityBot largely do not execute JavaScript. Before this, `robots.txt`
   invited them in and handed them an empty `<div id="root">` — 55 identical
   blank documents. That is now 33,000 words of static HTML.

3. **`/llms.txt` and `/llms-full.txt`**, generated by
   `scripts/generate-llms.js` in prebuild. The emerging convention for a
   plain-Markdown site map at a well-known path: `llms.txt` indexes every page
   with a description, `llms-full.txt` is the entire site as one document
   (~180 KB). It's a convention, not a standard — nobody is obliged to read it
   and publishing one doesn't earn a citation. It costs nothing and removes
   the parsing step.

4. **Answer-shaped content.** 26 `FAQPage` blocks, each a real question with a
   self-contained answer. That is the format an assistant can lift verbatim,
   which is why the FAQ blocks exist on every landing page rather than only on
   the homepage.

**The honest mechanism:** assistants that cite live sources — ChatGPT search,
Perplexity, Google's AI Overviews, Claude with search — mostly retrieve
through a search index. So ranking in search *is* the path to being quoted by
AI. There is no separate lever; the work above is the same work, and page 6
gets cited about as often as it gets clicked.

---

## Per-page SEO

**Titles and descriptions** — every page has its own, exact-match phrasing
first and the brand last (`AutoTrader Scraper — Automated Vehicle Listing
Extraction | AutoSmartCode`). Verified: 49 unique titles, 49 unique
descriptions, 49 unique canonicals, zero duplicates.

**Structured data** — site-wide `Organization` + `WebSite` +
`ProfessionalService` in `index.html`; per route `Service` (×25), `FAQPage`
(×26), `BreadcrumbList` (×46), `BlogPosting` (×10), `CreativeWork` (×9),
`Blog`, `CollectionPage`, `AboutPage`.

**Every FAQ in schema is visible on its page.** Schema without matching
visible content is a structured-data violation and the downside is a manual
action. The `FAQPage` markup and the `<details>` blocks read from the same
array — they cannot drift apart.

**Internal linking** — the footer carries all 25 landing pages on every page
of the site, `/services` is a hub linking to all of them, the homepage service
rows link to their own pages, and each landing page cross-links to siblings.
Google needs a crawl path before it will index and trust a new URL.

**Sitemap** — 49 URLs, generated from the data files by
`scripts/generate-sitemap.js`. Never edit `public/sitemap.xml` by hand; it is
overwritten on every build.

---

## Removed on purpose: aggregateRating

`index.html` used to declare `"ratingValue": "5", "reviewCount": "100"`. That
was invented. Google requires ratings to be genuine and visible on the page
they are marked up on, and fake review markup is one of the more commonly
penalised violations. It is gone.

The homepage still says **"Trusted by 100+ US businesses"**, the three
testimonials are placeholders with invented names, and the footer carries a
**"★ 5.0 rating"** badge. Same category of risk, lower severity because none of
it is structured data. Worth replacing with real ones.

---

## Still to do — needs you

1. **Resolve the "one developer" claim.** The site says in several places that
   AutoSmartCode is one person — the FAQ ("AutoSmartCode is one developer, not
   an agency"), the flip-coin section, the Founder notes, `/about`. That is
   now inaccurate. Decide whether to keep solo-founder positioning as a
   deliberate selling point or rewrite it to reflect the team, and say so —
   it needs to be one or the other consistently.

2. **`public/og-image.png` still does not exist.** Social tags point at it.
   Needs a real 1200×630 PNG. Until it exists, every shared link — including
   the 25 new pages — previews with no image.

3. **Pick one hostname.** Decide whether `autosmartcode.com` or
   `www.autosmartcode.com` is canonical and 301 the other to it. Every
   canonical here points at `www`.

4. **Search Console, after deploying.** Resubmit
   `https://www.autosmartcode.com/sitemap.xml`, then use URL Inspection →
   Request Indexing on `/services` and the six or seven landing pages closest
   to your existing impressions (`/autotrader-scraper`,
   `/autoscout24-scraper`, `/carmax-scraper`, `/carsales-scraper`,
   `/mediamarkt-scraper`). Then check Indexing → Pages over the following
   fortnight — "Discovered, not indexed" means the page is too thin or has no
   internal links, and neither should apply here.

5. **Backlinks.** With near-zero domain authority this is now the binding
   constraint, not on-page work. Three to five real links move the needle more
   than any further tag tuning: your Fiverr and Upwork profile bios, relevant
   directory listings, a guest post, genuine answers on forums where the link
   is actually useful.

6. **Mine your own Fiverr search and buyer-request history.** Whatever clients
   actually type when hiring you is real search intent and turns directly into
   the next batch of pages.

---

## Honest expectations

Everything above is on-page and technical. It removes the reasons a search
engine would ignore, misread or fail to differentiate these pages, and it
gives Google 25 distinct pages to rank where there was one. For queries the
site already gets impressions on, a dedicated page usually moves position from
the fifties into the teens or better within a couple of months.

It does not by itself produce rankings for competitive head terms. Those come
from published content and from other sites linking to yours.

No one can guarantee a Google position, and anyone who does is lying.
