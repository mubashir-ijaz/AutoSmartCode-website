/**
 * The single source of truth for page imagery — used by the React pages, the
 * prerenderer and the sitemap generator, so all three can never disagree about
 * what a page's image is or what its alt text says.
 *
 * The files themselves are written by `scripts/generate-images.js` (npm run
 * images, also part of prebuild). Nothing here reads the filesystem; it just
 * agrees on the naming convention:
 *
 *   /img/blog/<slug>.svg        one per article
 *   /img/scrapers/<slug>.svg    one per per-site scraper page
 *   /img/services/<slug>.svg    one per service pillar
 *
 * On alt text: every alt below is a description of the card that is actually
 * there — a title card in the site's own colours — not a keyword list. Alt
 * text that describes something the image does not show is both an
 * accessibility failure and, to Google, a spam signal. The keywords in these
 * strings are there because they are genuinely the subject of the image, and
 * the sentence still reads as a description when a screen reader speaks it.
 */

export const IMG_W = 1200;
export const IMG_H = 630;

/**
 * Intrinsic size of any image an article references inline as
 * `![alt](/img/...)`. The hero cards are all 1200x630 and need no entry; the
 * bespoke diagrams in /img/diagrams are whatever shape suits the diagram.
 *
 * This exists so `width` and `height` on the tag match the file. Emitting the
 * wrong pair is worse than emitting none — the browser reserves a box at the
 * wrong aspect ratio and the page visibly jumps when the real image lands.
 * Anything not listed here falls back to no dimensions at all and is sized by
 * CSS, which is safe if not ideal.
 *
 * Keep in step with the `diagrams` array in scripts/generate-images.js.
 */
export const INLINE_DIMS = {
  "/img/diagrams/fuel-price-lag.svg": { width: 1200, height: 420 },
};

/** Intrinsic size for an inline image src, or null when it is not known. */
export const dimsFor = src =>
  INLINE_DIMS[src] || (/^\/img\/(blog|scrapers|services)\//.test(src)
    ? { width: IMG_W, height: IMG_H }
    : null);

/** Hand-written alt for the articles — the pages that carry search traffic. */
const BLOG_ALT = {
  "what-is-web-scraping":
    "Title card for the AutoSmartCode plain-English guide to web scraping for car dealers",
  "is-web-scraping-legal":
    "Title card for the AutoSmartCode guide to whether scraping auction and vehicle data is legal for dealers",
  "how-much-does-web-scraping-cost":
    "Title card for the AutoSmartCode breakdown of what auction and dealer data automation costs",
  "automate-manheim-mmr":
    "Title card for the AutoSmartCode guide to automating Manheim MMR lookups for car dealers",
  "bypass-captcha-anti-bot-scraping":
    "Title card for the AutoSmartCode guide to why auction scrapers get blocked and how to fix it",
  "free-vin-decoder-nhtsa-api":
    "Title card for the AutoSmartCode guide to the free NHTSA VIN decoder API for vehicle data",
  "price-used-cars-market-data":
    "Title card for the AutoSmartCode guide to pricing used cars with live market data",
  "ai-parsing-scraped-data":
    "Title card for the AutoSmartCode guide to using AI to clean messy vehicle data",
  "self-healing-scrapers-ai":
    "Title card for the AutoSmartCode guide to self-healing scrapers when an auction site changes",
  "what-is-mmr-manheim-market-report":
    "Title card for the AutoSmartCode guide explaining MMR, the Manheim Market Report used car value",
  "automate-car-merchandising-workflow":
    "Title card for the AutoSmartCode guide to automating the car merchandising workflow for dealers",
  "autocheck-vs-carfax-vehicle-history":
    "Title card for the AutoSmartCode comparison of AutoCheck and Carfax vehicle history reports",
  "what-is-an-autocheck-report":
    "Title card for the AutoSmartCode guide to what an AutoCheck report is and how to read the AutoCheck Score",
  "autoscraper-python-library-vs-custom-scraper":
    "Title card for the AutoSmartCode guide to the AutoScraper Python library and when a custom scraper is needed instead",
  "fuel-prices-used-vehicle-values":
    "Title card for the AutoSmartCode guide to how fuel prices move used vehicle values and how to track it in MMR",
};

/**
 * Article hero. Falls back to a generated description for any post added
 * without an entry above, so a new blog is never shipped with an empty alt.
 */
export function blogImage(blog) {
  return {
    src: `/img/blog/${blog.slug}.svg`,
    alt: BLOG_ALT[blog.slug] ||
      `Title card for the AutoSmartCode article "${blog.title}"`,
    width: IMG_W,
    height: IMG_H,
  };
}

/** Per-site scraper page hero — "<Site> scraper" is the query these answer. */
export function scraperImage(scraper) {
  return {
    src: `/img/scrapers/${scraper.slug}.svg`,
    alt: `Title card for the AutoSmartCode ${scraper.site} scraper — automated ${scraper.site} data extraction`,
    width: IMG_W,
    height: IMG_H,
  };
}

/** Service pillar hero. */
export function serviceImage(service) {
  return {
    src: `/img/services/${service.slug}.svg`,
    alt: `Title card for the AutoSmartCode service page: ${service.h1 || service.nav}`,
    width: IMG_W,
    height: IMG_H,
  };
}

/**
 * What goes in og:image and in schema.org `image`.
 *
 * SVG is deliberately NOT used here. Facebook, LinkedIn, X and Slack all
 * refuse to render an SVG preview, and Google's article rich results want a
 * raster at least 1200px wide. The PNG pass in generate-images.js writes a
 * .png beside every .svg for exactly this.
 *
 * Two entry points, because the two callers know different things:
 *
 * - `socialFor` is what the React app uses. It assumes the PNG is there,
 *   which prebuild guarantees. This path is close to cosmetic anyway —
 *   social crawlers do not execute JavaScript, so what they read is the
 *   prerendered HTML, never this.
 *
 * - `socialImage` is what scripts/prerender.js uses. It runs in Node, so it
 *   can check public/img/manifest.json and fall back to the site-wide
 *   /og-image.png when the optional raster step was skipped. A generic
 *   preview beats a broken one.
 */
export const socialFor = hero => hero.src.replace(/\.svg$/, ".png");

export function socialImage(hero, hasRaster) {
  if (hero && hasRaster) return socialFor(hero);
  return "/og-image.png";
}
