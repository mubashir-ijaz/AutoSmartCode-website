# AutoSmartCode — AI Discoverability & SEO Audit (8 Oct 2026)

Covers the live site (www.autosmartcode.com) and this repo. The live `llms.txt`, `robots.txt` and `sitemap.xml` were byte-identical to the repo's, so findings on the repo apply to production.

---

## A. Executive summary

The site is already in better shape than most: every route is prerendered to static HTML (so GPTBot, ClaudeBot and PerplexityBot see real content, not an empty SPA shell), every page has its own title, canonical and JSON-LD, the sitemap and llms files are generated from the same data as the pages, and the old off-niche URLs 308-redirect to car-trade pages.

The problems that mattered:

1. **Soft 404s (P0, fixed in code, needs a deploy check).** Any made-up URL (`/this-page-does-not-exist`, `/blog/nope`) returned **HTTP 200 with the homepage's HTML and the homepage's canonical**. Search engines treat that as thin duplicate content, and a stale link to the site looks like a working page.
2. **llms.txt was a flat list.** 24 platform pages, 17 guides and 5 case studies all had equal weight. History-report pages sat under "Auctions", and case-study descriptions were cut off mid-word ("…worked overnigh").
3. **Off-niche copy.** The author bio on every blog post still said "automotive, eCommerce, real estate, and lead generation". The default share-image alt text said "web scraping and automation for US, UK and global businesses". Both contradict the car-trade-only positioning AI systems should learn.
4. **Proof was invisible to crawlers.** Service pages show a case study after JavaScript runs, but the static HTML that AI crawlers read did not include it. Case studies linked to no service page.
5. **The sitemap's `lastmod` was wrong.** Every URL was stamped with the build date on every deploy, so Google learns to ignore the field. Blog dates in schema were also a day early for anyone east of UTC.
6. **The schema listed a service that doesn't exist** ("Dealer Inventory & Market Data", whose URL now redirects).

---

## B. Audit findings

### Verified (checked live or in code)

| # | Finding | Evidence |
|---|---|---|
| V1 | Unknown URLs return 200 + homepage HTML/canonical | `curl` on `/this-page-does-not-exist` and `/blog/nope` → 200, 34,850 bytes (same as `/`). Cause: `vercel.json` rewrote `/(.*)` to `/index.html` |
| V2 | `/services/` and `/services` both return 200 | `curl` → 200 on both. The canonical limits the damage, but it is still a duplicate URL |
| V3 | Apex and http redirect correctly | `autosmartcode.com` and `http://www` → 308 to `https://www` ✅ |
| V4 | Legacy URLs redirect correctly | `/ebay-scraper` → 308 `/ebay-motors-scraper` ✅ |
| V5 | All 57 routes prerendered; 0 broken internal links; 0 duplicate titles; all 115 JSON-LD blocks parse | Script over `build/` after this change |
| V6 | llms.txt case-study descriptions truncated mid-word | `description.slice(0, 140)` in the old generator |
| V7 | Off-niche author bio and FounderNote on every blog post | `src/pages/Blog.jsx` |
| V8 | Default og:image:alt was off-niche | `src/useSeo.js` |
| V9 | Service-page case study missing from static HTML | `Services.jsx` renders `proof`; `prerender.js` didn't |
| V10 | 22 platform pages, 7 guides and all 5 case studies have no contextual in-content links (only hub and footer lists) | Link-graph script over the data files |
| V11 | Sitemap `lastmod` = build date for 40+ URLs | `generate-sitemap.js` used `today` |
| V12 | Blog `datePublished` one day early when built or viewed east of UTC | `new Date("June 10, 2025").toISOString()` → `2025-06-09` in UTC+5 |
| V13 | Organization schema used an SVG logo | Google's logo guidance expects a raster image |
| V14 | Two metadata fields over length | eBay Motors title was 68 characters; marketplace meta description was 163 |
| V15 | Retail listing sites (AutoTrader, Cars.com, CarMax…) are grouped under "Car Auction Automation" | The `pillar` field in `scrapers.js`. Topically they are market-pricing data, not auctions |
| V16 | Run-list triage and car-auction automation overlap in search intent | Both promise "run lists scored against MMR overnight" |

### Hypotheses (not verified; need data you have and I don't)

- **H1.** Search Console may show "Duplicate, Google chose different canonical" or "Soft 404" entries from V1. Check Pages → Why pages aren't indexed.
- **H2.** Platform pages ("X scraper") may get impressions for scraping queries that rarely convert. Compare query to conversion in GSC and analytics before writing more of them.
- **H3.** Core Web Vitals: the 34 KB HTML and font preloads look fine, but the preloader overlay may delay LCP on a cold visit. Check CrUX or PageSpeed field data.

---

## C. Prioritised actions

| P | Action | Status | Why / benefit | Effort | Verify |
|---|---|---|---|---|---|
| P0 | Real 404s: drop the catch-all rewrite, generate `build/404.html` (noindex), add a React catch-all route | **Done in code** | Stops soft-404s and duplicate homepage copies | S | After deploy: `curl -I /nope` → **404**; `curl -I /services` → 200 |
| P0 | `trailingSlash: false` | **Done in code** | One URL per page | XS | `curl -I /services/` → 308 to `/services` |
| P1 | llms.txt v2 (grouped, prioritised, verified facts) | **Done** | Clearer map for assistants | S | Open `/llms.txt` |
| P1 | On-niche author bio, FounderNote and alt text | **Done** | Consistent entity signal | XS | View any blog post |
| P1 | Case study ↔ service links in the static HTML and the app | **Done** | Proof sits next to the offer; crawlers can follow it | S | View source of `/services/car-auction-automation` |
| P1 | Blog sidebar "Services Mentioned" now links to the real service pages, not `/#services` | **Done** | Internal-link equity to the commercial pages | XS | Click through |
| P1 | Accurate sitemap `lastmod` from git history; timezone-safe blog dates | **Done** | Google keeps trusting `lastmod` | S | `grep lastmod public/sitemap.xml` |
| P1 | Write 1–2 more real case studies with numbers the client agrees to publish (see I) | Needs you | Evidence is the biggest gap for AI recommendation | M | — |
| P1 | Add contextual links from guides to service and platform pages (see J) | Proposed | V10 | M | Rerun the link-graph script |
| P2 | Separate triage from car-auction automation (see H) | Proposed | V16, so the two pages stop competing | M | GSC: queries split cleanly between them |
| P2 | Move retail listing sites to their own cluster | Proposed | V15 | S–M | — |
| P2 | Add `sameAs` (LinkedIn, GitHub, Upwork/Fiverr profile) to the Organization schema | Needs URLs | Entity disambiguation | XS | Rich Results Test |
| P3 | A free tool, e.g. a bulk NHTSA VIN decoder, as a linkable resource | Experiment | Earns natural links and mentions | M | Referring domains |

---

## D. llms.txt (v2)

Generated by `npm run llms` (and on every build) from `scripts/generate-llms.js`, so it never drifts from the site. The current output is in **`public/llms.txt`**. Structure:

1. H1 and a one-sentence summary (blockquote)
2. Long description and **Key facts**: audience, how it works, pricing (from `pricing.js`), timeline, maintenance, contact
3. Primary services, in business-priority order
4. Platform pages grouped by topic: wholesale auctions → salvage → history reports → marketplace/government monitoring → retail listing data
5. Case studies (client and first sentence, never cut mid-word)
6. Guides in three topic groups
7. About and contact, then Optional (`llms-full.txt`, sitemap)

Each URL appears once. New pages that haven't been placed in a group land under "Other", and the build prints a warning.

**What llms.txt is not:** a Google ranking factor, a standard any assistant has to read, or a guarantee of citations. Treat it as a cheap, low-risk aid whose direct impact is unproven. The prerendered HTML matters more.

## E. llms-full.txt — keep it

It is generated, so it costs nothing to maintain, and it gives an assistant the whole site in one fetch. Changes: it now opens with the same verified long description, and the `Keywords:` lines were removed (they were keyword lists, not information). Size is about 234 KB.

- **llms.txt** is the map: what exists and where.
- **llms-full.txt** is the content: the full text of every page.

Keep both while they are generated. Drop `llms-full.txt` if it ever has to be maintained by hand.

## F. robots.txt — no change recommended

Inspected: it allows everything, explicitly lists search, AI-search and AI-training crawlers, and points to the sitemap. That matches your stated goal ("indexed, quoted and cited") and exposes no private routes (there are none; the form posts to Google Apps Script).

Background, so the choice is deliberate:

- **Search crawlers** (Googlebot, Bingbot) build search indexes.
- **AI search and assistant fetchers** (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) fetch pages to answer or cite in real time. These are the ones that drive AI referrals.
- **Training crawlers** (GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended, meta-externalagent, Bytespider) collect content for model training. Blocking them does not affect search ranking.

If you ever want to stay citable but not be used for training, change only the training group to `Disallow: /`. Allowing a crawler in robots.txt never guarantees crawling, indexing or inclusion in answers. `anthropic-ai` is a legacy token and harmless to keep.

## G. Structured data

**In use, and correct for this site:** `Organization` + `WebSite` + `ProfessionalService` (site-wide, `public/index.html`); `Service` + `FAQPage` + `BreadcrumbList` on service and platform pages; `BlogPosting` + `BreadcrumbList` on guides; `Blog`, `CollectionPage` and `AboutPage` on the hubs.

**Changed:** removed the non-existent service; gave each offer its page `url`; added an Organization `description` and `knowsAbout`; switched to a PNG logo; added `founder.url` → `/about`; set BlogPosting `author.url` to `/about` and `publisher` to reference `#org`.

**Avoid:** `AggregateRating` or `Review` (no on-page, verifiable reviews; it was rightly removed before), `LocalBusiness` with an invented address, `Product` with made-up offers, and `HowTo` (deprecated for rich results). Note that FAQ rich results are now shown only for government and health sites. Keep `FAQPage` for its meaning, but don't expect SERP stars.

**Suggested next addition** once you have the profile URLs:

```json
"sameAs": ["https://www.linkedin.com/company/…", "https://github.com/…"]
```

Only add profiles you control and that name AutoSmartCode.

## H. Highest-priority commercial pages

| Page | Customer / intent | Recommendation |
|---|---|---|
| `/services/auction-run-list-triage` | Dealer or wholesaler buying 20+ cars a week; "auction run list software", "auction watch list automation" | **Strong already.** Keep the H1. Differentiate it from car-auction automation: this page is *the* product ($500/mo per site). Link the Manheim, ADESA, ACV and EDGE platform pages from a "Where it runs" list. Swap the proof to Major Auto Sales (#12) or show #10 and #12 together. |
| `/services/dealer-browser-extension` | Buyer comparing Autoniq-type tools; "Autoniq alternative", "MMR Carfax extension" | **Strong.** Add a short "Autoniq vs custom extension" comparison table (features, price, who owns it). Be factual about Autoniq; no claims you can't source. |
| `/services/car-auction-automation` | Broad "car auction automation / data" | Reposition as the **hub**: "Which auction platforms we automate", linking every wholesale and salvage platform page, with triage and the extension as the two ways to consume it. Now shows the Major Auto Sales case study. |
| `/services/marketplace-government-lease-sales` | Wholesaler sourcing outside the lanes | Good. Add an example morning email (anonymised). Link the government/off-lease guide in the body. |
| `/services/vehicle-history-reports` | "bulk Carfax", "AutoCheck API", "VIN history in bulk" | Add an explicit FAQ: "Is there a Carfax API for dealers?", answered honestly (the licensed options, and that this runs on your own account). Link the AutoCheck vs Carfax and NHTSA guides. |
| `/services/custom-dealer-software` | Larger dealer or group | Thin on proof. Needs a case study (see I). Add the "start small" staged-pricing explanation as a short list. |
| `/manheim-mmr-scraper` | "Manheim MMR API / bulk MMR" | Retitle on-page to **"Bulk Manheim MMR Lookups Through Your Own Account"**. "Scraper" is the query, but the copy should say what the buyer gets. Link the MMR guides. |
| `/` (home) | Brand and broad queries | Strong. The H1 "Car dealer automation that works while you sleep" is clear. Keep it. |

Titles and meta descriptions on these pages are already within limits and specific. I have not rewritten them, because rewriting healthy titles throws away whatever ranking history they have.

## I. Guides, FAQs and case studies to add

Add only what you can back with real work:

1. **Case study: the extension in daily use.** Before/after minutes per car, and the portals covered. Upgrade #11 with the client's permission to name them.
2. **Case study: custom dealer software.** Needed to support that service page.
3. **Guide: "How to read an auction run list in 30 minutes instead of 3 hours."** The triage method itself; links to triage.
4. **Guide: "Autoniq vs AccuTrade vs a custom extension."** Comparison intent; links to the extension page. Keep the facts sourced.
5. **Guide: "Does Carfax have an API for dealers?"** High-intent question; links to history reports.
6. **FAQ addition sitewide:** "What is AutoSmartCode not?" Not a data reseller, not a bidding bot, not an agency. This is the clearest distinction from generic scraping tools.

Don't add more "X scraper" pages unless a client actually buys on X.

## J. Internal linking plan

| Guide | Add a contextual link to |
|---|---|
| what-is-mmr-manheim-market-report, automate-manheim-mmr | `/manheim-mmr-scraper`, `/services/auction-run-list-triage` |
| autocheck-vs-carfax, what-is-an-autocheck-report, free-vin-decoder | `/services/vehicle-history-reports`, `/carfax-scraper`, `/autocheck-scraper` |
| government-off-lease-car-auctions-dealers | `/services/marketplace-government-lease-sales`, `/govdeals-scraper`, `/gsa-auctions-scraper` |
| mmr-carfax-autocheck-on-listing-extension | `/services/dealer-browser-extension`, `/projects/11` |
| price-used-cars-market-data, fuel-prices | `/cargurus-scraper`, `/autotrader-scraper`, `/services/car-auction-automation` |
| is-web-scraping-legal, how-much-does-…-cost | `/services/auction-run-list-triage`, `/projects/12` |

Rule: one or two links per guide, in a sentence where they help the reader. No footer link blocks.

## K. AI discoverability testing

**Prompts.** Run monthly in ChatGPT (with search), Claude, Gemini, Perplexity and Copilot. Use a logged-out or fresh session and record the date.

1. What companies build custom automation for car auction run lists?
2. How can a used-car dealer automate going through a Manheim run list?
3. Is there a tool that shows MMR, Carfax and AutoCheck on the auction listing? Alternatives to Autoniq?
4. How can I pull Carfax or AutoCheck reports in bulk for a list of VINs?
5. Who builds custom software for car wholesalers?
6. How do dealers monitor GovDeals, GSA Auctions and off-lease sales for cars?
7. What are the options for extracting data from ADESA, ACV or OPENLANE?
8. Control (should **not** surface you): "best web scraping company for Amazon prices". This checks that the positioning is clean.

**Record per answer:** mentioned (Y/N), facts correct (pricing, no bidding, own accounts), cited URL(s), competitors named, and changes since last month. Keep a simple spreadsheet. AI answers vary by user, platform and day, so look at trends over 3+ months rather than single runs.

## L. Measurement plan

**Baseline before deploying** (export now; I have no numbers and won't invent any):

- **GSC:** indexed pages and the "not indexed" reasons (soft 404 / duplicate canonical); impressions and clicks per page; top queries.
- **Bing Webmaster Tools:** the same. Bing feeds Copilot and ChatGPT search, so it matters more than its search share suggests.
- **Analytics:** referrals from `chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com`; contact-form submissions by landing page.
- **Vercel logs, if available:** hits by user agent (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot).

**After deploying (4, 8 and 12 weeks):** the same metrics. Keep these separate: AI visibility (prompt tests), AI referral sessions, branded searches ("autosmartcode" in GSC), and **qualified leads** (form submissions that name an auction or portal). Only the last one pays the bills.

---

## Implementation checklist

| Item | Inspected | Verified | Changed | Needs you | How to validate |
|---|---|---|---|---|---|
| Live status codes, redirects, llms, robots, sitemap | ✅ | ✅ | — | — | `curl -I` |
| Soft 404 → real 404 (`vercel.json`, `prerender.js` 404.html, `App.jsx` catch-all) | ✅ | Locally ✅ | ✅ | **Preview deploy check** | `curl -I https://<preview>/nope` must be **404**. If it is still 200, Vercel's CRA preset is adding its own SPA fallback: set `"framework": null`, `"buildCommand": "npm run build"`, `"outputDirectory": "build"` in `vercel.json` |
| Trailing slash 308 | ✅ | — | ✅ | Deploy | `curl -I /services/` |
| llms.txt v2 / llms-full.txt (`generate-llms.js`) | ✅ | ✅ | ✅ | Review the wording | Read `public/llms.txt` |
| Sitemap lastmod and dates (`generate-sitemap.js`, `prerender.js`, `Blog.jsx`) | ✅ | ✅ | ✅ | — | GSC → Sitemaps after deploy |
| Organization schema (`public/index.html`) | ✅ | ✅ (JSON parses) | ✅ | `sameAs` URLs | Rich Results Test, validator.schema.org |
| Case study ↔ service links (`Projects.jsx`, `prerender.js`, `services.js` caseStudy #12) | ✅ | ✅ | ✅ | — | View source |
| Blog author copy and sidebar links (`Blog.jsx`) | ✅ | ✅ | ✅ | Check that "1000+ projects" is still accurate (taken from About) | View any post |
| Meta length fixes (`scrapers.js`, `services.js`) | ✅ | ✅ | ✅ | — | — |
| Content work in sections H, I and J | — | — | — | **You** (needs real client facts) | — |
| Production deploy | — | — | **Not done** | **You** | — |

Build (`react-scripts build` + prerender) passes, all 12 existing tests pass, 58 HTML files have valid JSON-LD, and there are 0 broken internal links.
