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
 *   /img/webdesign/<slug>.svg   one per web-design page
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

/** Hand-written alt for the articles — the pages that carry search traffic. */
const BLOG_ALT = {
  "what-is-web-scraping":
    "Title card for the AutoSmartCode beginner's guide to web scraping — how automated data extraction works",
  "is-web-scraping-legal":
    "Title card for the AutoSmartCode guide to whether web scraping is legal for US businesses",
  "how-much-does-web-scraping-cost":
    "Title card for the AutoSmartCode breakdown of what web scraping costs, by project complexity and volume",
  "automate-manheim-mmr":
    "Title card for the AutoSmartCode guide to automating Manheim MMR lookups for car dealers",
  "scrape-google-maps-leads":
    "Title card for the AutoSmartCode guide to scraping Google Maps for B2B sales leads",
  "python-automation-small-business":
    "Title card for the AutoSmartCode guide to Python automation for small business owners",
  "amazon-product-analysis-ai":
    "Title card for the AutoSmartCode guide to analysing Amazon product and review data with AI",
  "zillow-airbnb-real-estate-scraping":
    "Title card for the AutoSmartCode guide to scraping Zillow and Airbnb real estate data",
  "bypass-captcha-anti-bot-scraping":
    "Title card for the AutoSmartCode technical guide to handling CAPTCHAs and anti-bot systems when scraping",
  "ecommerce-price-monitoring-automation":
    "Title card for the AutoSmartCode guide to automated eCommerce competitor price monitoring",
  "free-vin-decoder-nhtsa-api":
    "Title card for the AutoSmartCode guide to the free NHTSA VIN decoder API for vehicle data",
  "price-used-cars-market-data":
    "Title card for the AutoSmartCode guide to pricing used cars with live market data",
  "ai-parsing-scraped-data":
    "Title card for the AutoSmartCode guide to using AI to parse and clean messy scraped data",
  "self-healing-scrapers-ai":
    "Title card for the AutoSmartCode technical guide to building self-healing scrapers with AI",
  "why-cold-email-lists-bounce":
    "Title card for the AutoSmartCode guide to why cold email lists bounce and how to verify them",
  "slow-website-cost-small-business":
    "Title card for the AutoSmartCode guide to what a slow website costs a small business",
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

/** Web-design page hero. */
export function webdesignImage(page) {
  return {
    src: `/img/webdesign/${page.slug}.svg`,
    alt: `Title card for the AutoSmartCode web development service: ${page.h1 || page.nav}`,
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
