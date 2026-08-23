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
/services                          hub — links to all 34 pages below
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
│   ├── /cargurus-scraper
│   ├── /autonation-scraper
│   └── /otomoto-scraper
├── /services/vehicle-history-reports
│   ├── /autocheck-scraper
│   └── /carfax-scraper
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

This is a client-rendered SPA. Before this change, all 69 URLs shipped the
same `index.html` with an empty `<div id="root">`. Googlebot executes
JavaScript and gets there eventually. **Bingbot and most AI crawlers do not** —
GPTBot, ClaudeBot and PerplexityBot read raw HTML, and `robots.txt` was
inviting them in and then handing them nothing, 69 times over.

`scripts/prerender.js` runs as `postbuild` and writes
`build/<route>/index.html` for every route: correct title, description,
canonical, Open Graph, Twitter tags and JSON-LD in the head, and the page's
real copy inside `#root`. **47,547 words** now exist in static HTML.

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
empty root div to fill, rather than silently emitting 69 blank pages.

`vercel.json` rewrites are a *fallback* — Vercel checks the filesystem first,
so the static per-route files win. Do not switch those rewrites to `routes`,
which would bypass the filesystem and undo all of this.

---

## Images — added August 2026

**Before this the site had seven `<img>` tags in total** — the logo, twice, and
the founder photo. The twenty-one articles had none. The blog cards drew an
emoji on a CSS gradient, which is styling, not an image: invisible to Google
Images, no alt text, and unusable as an `og:image`. All 55 URLs shared one
social preview, so every shared link and every rich-result thumbnail looked
identical no matter which page it was.

`scripts/generate-images.js` now writes a branded 1200x630 hero for every
blog, service, scraper and web-design page — **55 images**, generated from the
same data files as the pages, so adding a page still means adding one data
entry and nothing else.

```
public/img/blog/<slug>.svg        one per article
public/img/scrapers/<slug>.svg    one per per-site scraper page
public/img/services/<slug>.svg    one per service pillar
public/img/webdesign/<slug>.svg   one per web-design page
```

**SVG on the page, PNG for social.** The SVGs are 4 KB each against the
~150 KB a PNG of the same card costs, they stay sharp at any size, and the text
in them is real text. The one thing SVG cannot do is social previews —
Facebook, LinkedIn, X and Slack all refuse it, and Google's article rich
results want a raster at least 1200px wide. So `generate-images.js` also
rasterises each one to PNG via `@resvg/resvg-js`, and `og:image` points at the
PNG while the page renders the SVG.

`@resvg/resvg-js` is an **optional devDependency**, deliberately. If it is
missing the raster pass is skipped, `public/img/manifest.json` records
`hasRaster: false`, and every route falls back to the site-wide
`/og-image.png`. A missing native binary on a deploy host must never break a
build, and a generic preview beats a broken one.

**Alt text is written per article** in `src/data/images.js`, which is the
single source of truth all three consumers read — the React pages, the
prerenderer and the sitemap generator — so they cannot disagree about what a
page's image is or what its alt says. Every alt describes the card that is
actually there. Alt text describing something the image does not show is both
an accessibility failure and, to Google, a spam signal.

**Where the images are declared:**

- On the page, as a real `<img>` with `width`, `height` and `decoding` — the
  hero is `fetchpriority="high"` because it is the LCP element, everything
  below it is `loading="lazy"`
- In `og:image`, `og:image:alt` and `twitter:image`, **per route** rather than
  site-wide
- In the `BlogPosting` / `Service` schema as an `ImageObject` with explicit
  dimensions, which is what qualifies it for an article rich result
- In `sitemap.xml` as `<image:image>` with title and caption. Images found only
  in a page body are discovered whenever Google next renders that page; ones in
  the sitemap are discovered on the next crawl of the sitemap

Articles can also carry inline images now: `![alt](/img/x.svg)` with an
optional `*caption*` on the following line. Both `src/pages/Blog.jsx` and
`scripts/prerender.js` understand the same syntax — **they have to stay in
lockstep**, because the static HTML and the hydrated page must say the same
thing.

---

## The broken-links bug, fixed at the same time

Twenty-two internal links across the articles were written as
`[text](/path)` markdown — and the renderer only ever handled `**bold**`. Every
one of them was rendering **as literal bracket text on the live site**:

```
[vehicle-history-reports service](/services/vehicle-history-reports)
```

So the blog was passing no internal link equity at all, and readers were seeing
raw markdown. `renderContent` in `Blog.jsx` and `inline` in `prerender.js` now
both handle `[text](/path)`; site-relative links go through react-router,
absolute ones get `rel="noopener noreferrer"`.

---

## Cluster linking — the missing direction

Every scraper page linked **up** to its pillar. No pillar linked **down** to
its spokes. A crawler landing on `/services/dealer-inventory-scraping` had no
path to the eight exact-match pages underneath it.

Both service detail pages and their prerendered equivalents now list their own
spokes, derived from `pillar` in `scrapers.js`, so the cluster passes authority
in both directions.

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
   invited them in and handed them an empty `<div id="root">` — 69 identical
   blank documents. That is now 47,500 words of static HTML.

3. **`/llms.txt` and `/llms-full.txt`**, generated by
   `scripts/generate-llms.js` in prebuild. The emerging convention for a
   plain-Markdown site map at a well-known path: `llms.txt` indexes every page
   with a description, `llms-full.txt` is the entire site as one document
   (~180 KB). It's a convention, not a standard — nobody is obliged to read it
   and publishing one doesn't earn a citation. It costs nothing and removes
   the parsing step.

4. **Answer-shaped content.** 35 `FAQPage` blocks, each a real question with a
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
Extraction | AutoSmartCode`). Verified against the build: 69 unique titles, 69
unique canonicals, zero duplicates, and 55 page-specific `og:image` values.

**Structured data** — site-wide `Organization` + `WebSite` +
`ProfessionalService` in `index.html`; per route `Service` (×34), `FAQPage`
(×35), `BreadcrumbList` (×66), `BlogPosting` (×22), `CreativeWork` (×9),
`Blog`, `CollectionPage`, `AboutPage`.

**Every FAQ in schema is visible on its page.** Schema without matching
visible content is a structured-data violation and the downside is a manual
action. The `FAQPage` markup and the `<details>` blocks read from the same
array — they cannot drift apart.

**Internal linking** — the footer carries all 34 landing pages on every page
of the site, `/services` is a hub linking to all of them, the homepage service
rows link to their own pages, and each landing page cross-links to siblings.
Google needs a crawl path before it will index and trust a new URL.

**Sitemap** — 69 URLs plus 55 image entries, generated from the data files by
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

2. ~~**`public/og-image.png` still does not exist.**~~ Done — it exists, and
   as of August 2026 it is only the fallback: all 55 content pages now have
   their own generated 1200×630 preview. See the images section above.

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
   is actually useful. **See `BACKLINKS.md`** — full 8-week execution plan with
   the target list, prewritten profile copy and outreach templates.

6. **Mine your own Fiverr search and buyer-request history.** Whatever clients
   actually type when hiring you is real search intent and turns directly into
   the next batch of pages.

---

## The August 2026 query gaps

Search Console over the preceding period: **~500 impressions, 0 clicks.** Zero
clicks on that many impressions is not a keyword-matching problem — Google had
already matched the site to the right searches. It is a position problem, and
in two cases it was a *page* problem: the highest-impression cluster on the
whole account had no page pointing at it.

**What the impressions were clustered into, and what was done:**

| Cluster | Impressions | Was there a page? | Action |
| --- | --- | --- | --- |
| AutoCheck — `autocheck` (49), `autocheck history reports` (23), `what is an autocheck report` (13), `what is autocheck` (12), `global autocheck report` (10), `what is autocheck report` (10), `autocheck vin report` (4) | **121** | No — only a comparison article and the pillar | New `/blog/what-is-an-autocheck-report` for the informational half, new `/autocheck-scraper` for the commercial half |
| MMR / Manheim — `mmr price` (29), `manheim market report` (7), `manheim mmr` (6), `manheim car valuation` (5), and seven more | **75** | Yes | Left alone; the pages exist and rank |
| Pricing — `custom web scraping services` (23), `cost of price scraper` (8), `web scraping service cost` (5), `web scraping price/prices` (15), `scraping cost` (4) | **~60** | Partly | `/services/web-scraping` retitled to lead with the exact phrase; the cost article de-yeared and its summary rewritten around the query |
| `autoscraper` (34), `auto web scraper` (5), `auto scraping` (4) | **43** | No | New `/blog/autoscraper-python-library-vs-custom-scraper` |
| Carfax — `vin carfax report` (10), `carfax report by vin` (8), `carfax scraper` (6) | **24** | No | New `/carfax-scraper` |
| `otomoto scraper` | 3 | No | New `/otomoto-scraper` |
| Dealer groups — the stated commercial target, not yet earning impressions | — | No | New `/autonation-scraper`, written to cover any large group |

**Two title fixes worth noting.** Both the pricing and the legal article had
`2025` in the title, and the year appeared **nowhere in either body** — it was
CTR bait that had gone stale. Stamping `2026` on unchanged copy would be a
claim the content does not support, so the year came out of both instead. They
will not go stale again.

**Cannibalisation check.** `/services/vehicle-history-reports` previously
carried `carfax report automation` and `autocheck report` in its keywords.
Those queries now belong to the two new spokes, and the pillar was cut back to
capability terms. Two pages chasing one query beat each other.

---

## Honest expectations

Everything above is on-page and technical. It removes the reasons a search
engine would ignore, misread or fail to differentiate these pages, and it
gives Google 34 distinct pages to rank where there was one. For queries the
site already gets impressions on, a dedicated page usually moves position from
the fifties into the teens or better within a couple of months.

It does not by itself produce rankings for competitive head terms. Those come
from published content and from other sites linking to yours.

No one can guarantee a Google position, and anyone who does is lying.
