/**
 * Builds public/sitemap.xml from the data files so the two can never drift
 * apart. Run with `npm run sitemap` (also runs automatically on build).
 *
 * Sources: src/data/content.js (blogs + projects), src/data/services.js
 * (service landing pages), src/data/scrapers.js (per-site scraper pages).
 */
const fs = require("fs");
const path = require("path");

const ORIGIN = "https://www.autosmartcode.com";
const root = path.join(__dirname, "..");

const read = f => fs.readFileSync(path.join(root, f), "utf8");
const content = read("src/data/content.js");
const servicesSrc = read("src/data/services.js");
const scrapersSrc = read("src/data/scrapers.js");
const webdesignSrc = read("src/data/webdesign.js");

/** Pull every `name: "..."` value out of a source file, in file order. */
function fields(src, name) {
  const out = [];
  const re = new RegExp(name + ':\\s*["\'](.*?)["\']', "g");
  let m;
  while ((m = re.exec(src))) out.push(m[1]);
  return out;
}

const blogSlugs = fields(content, "slug");
const dates = fields(content, "date");
const projectIds = (content.match(/^\s*id:\s*(\d+)/gm) || []).map(s => s.match(/\d+/)[0]);

// content.js lists blogs first, then projects — the trailing ids are the projects.
const projects = projectIds.slice(blogSlugs.length);

const serviceSlugs = fields(servicesSrc, "slug");
const scraperSlugs = fields(scrapersSrc, "slug");
const webdesignSlugs = fields(webdesignSrc, "slug");

const iso = d => {
  const parsed = new Date(d);
  return isNaN(parsed) ? new Date().toISOString().slice(0, 10)
                       : parsed.toISOString().slice(0, 10);
};
const today = new Date().toISOString().slice(0, 10);

const url = (loc, lastmod, changefreq, priority) =>
  `  <url>\n` +
  `    <loc>${ORIGIN}${loc}</loc>\n` +
  `    <lastmod>${lastmod}</lastmod>\n` +
  `    <changefreq>${changefreq}</changefreq>\n` +
  `    <priority>${priority}</priority>\n` +
  `  </url>`;

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  url("/", today, "weekly", "1.0"),
  url("/services", today, "weekly", "0.9"),
  url("/projects", today, "monthly", "0.8"),
  url("/blog", today, "weekly", "0.8"),
  url("/about", today, "monthly", "0.7"),
  "",
  "  <!-- Service landing pages — the commercial-intent pages -->",
  ...serviceSlugs.map(s => url("/services/" + s, today, "weekly", "0.9")),
  "",
  "  <!-- Per-site scraper pages — exact-match to search queries -->",
  ...scraperSlugs.map(s => url("/" + s, today, "weekly", "0.9")),
  "",
  "  <!-- Web design landing pages -->",
  ...webdesignSlugs.map(s => url("/" + s, today, "weekly", "0.9")),
  "",
  "  <!-- Blog articles -->",
  ...blogSlugs.map((s, i) => url("/blog/" + s, iso(dates[i]), "monthly", "0.7")),
  "",
  "  <!-- Project case studies -->",
  ...projects.map(id => url("/projects/" + id, today, "monthly", "0.6")),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(root, "public/sitemap.xml"), xml);

const total = 5 + serviceSlugs.length + scraperSlugs.length + webdesignSlugs.length
            + blogSlugs.length + projects.length;
console.log(
  `sitemap.xml written — 5 core + ${serviceSlugs.length} services + ${scraperSlugs.length} scrapers ` +
  `+ ${webdesignSlugs.length} web design + ${blogSlugs.length} articles + ${projects.length} projects ` +
  `= ${total} URLs`
);
