# SEO setup — AutoSmartCode

## What's in place

**robots.txt** — allows everything, for every crawler. Search engines, AI
assistants and AI training bots are all explicitly permitted, and
`Content-Signal` grants `search`, `ai-input`, `ai-train` and `use=full`.
The previous file blocked GPTBot, ClaudeBot, Google-Extended, CCBot,
Applebot-Extended, Amazonbot, Bytespider and meta-externalagent — those
`Disallow` lines are gone.

**sitemap.xml** — 22 URLs (home, /projects, /blog, 10 articles, 9 case
studies) with `<lastmod>`. It is **generated**, not hand-edited:

```
npm run sitemap      # regenerate
npm run build        # regenerates automatically first (prebuild)
```

`scripts/generate-sitemap.js` reads slugs, ids and dates straight out of
`src/data/content.js`, so adding a blog post updates the sitemap on the next
build. Don't edit `public/sitemap.xml` by hand — it gets overwritten.

**Per-page meta** (`src/useSeo.js`) — this is a client-rendered SPA, so every
route used to serve the homepage's `<title>`, description and canonical.
22 URLs claiming to be the same page is a duplicate-content problem. Each
route now sets its own title, description, canonical, Open Graph and Twitter
tags, and its own JSON-LD. Missing articles/projects return `noindex, follow`.

**Structured data** — site-wide `Organization` + `WebSite` +
`ProfessionalService` in `index.html`; per route: `Blog`, `BlogPosting` +
`BreadcrumbList`, `CollectionPage`, `CreativeWork` + `BreadcrumbList`, and
`FAQPage` on the homepage.

**FAQ section** — eight real questions (price, timeline, legality, formats,
anti-bot, no-code, breakage, who you deal with) on the homepage, matching the
`FAQPage` schema. This is the kind of content AI assistants quote directly.

---

## Removed on purpose: aggregateRating

`index.html` used to declare `"ratingValue": "5", "reviewCount": "100"`.

That was invented. Google's structured-data policy requires ratings to be
genuine and **visible on the page** they're marked up on, and there is no
review system behind that number. Fake review markup is one of the more
commonly penalised violations — the downside is a manual action, which is
the opposite of ranking. It's gone.

To get it back legitimately: collect real reviews through the Rate Us popup,
display them on the page, then mark up the true count.

The homepage also still says **"Trusted by 100+ US businesses"** and the three
testimonials are placeholders with invented names. Same category of risk,
lower severity because it isn't structured data. Worth replacing with real
ones.

---

## Still to do — needs you

1. **`public/og-image.png` does not exist yet.** Social tags point at it.
   Needs to be a real 1200×630 PNG — `logo.svg` was being used before, and
   most platforms won't render SVG link previews at all. Until this file
   exists, shared links show no image.

2. **Google Search Console** — verify the domain, submit
   `https://www.autosmartcode.com/sitemap.xml`, and use "Request indexing"
   for the homepage. Nothing else on this list matters until Google knows the
   site exists. Same for Bing Webmaster Tools.

3. **Pick one hostname.** Decide whether `autosmartcode.com` or
   `www.autosmartcode.com` is canonical and 301 the other to it. All the
   canonicals here point at `www`.

4. **Prerendering — the biggest remaining win.** Googlebot executes
   JavaScript, so it will see the per-route meta above. Bingbot, and most AI
   crawlers, largely **do not**. They fetch the raw HTML, which is an empty
   `<div id="root">`. That means the AI crawlers you just allowed in can't
   read anything.

   Fixing it means prerendering to static HTML at build time (`react-snap` is
   the smallest change; migrating to Next.js is the thorough one). Ask and I
   can wire up `react-snap` — it's roughly a dependency, a build script change
   and swapping `render` for `hydrate`.

---

## Honest expectations

Everything above is *technical* SEO — it removes the reasons a search engine
would ignore or misread the site. It does not by itself produce rankings.
For competitive terms like "web scraping service", ranking comes from
published content that answers real questions, and from other sites linking
to yours. The ten articles are a good start; publishing consistently and
getting listed in a few relevant directories will move the needle far more
than any further tag tuning.

No one can guarantee a Google position, and anyone who does is lying.
