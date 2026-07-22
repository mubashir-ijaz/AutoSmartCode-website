/**
 * Builds public/sitemap.xml from src/data/content.js so the two can never
 * drift apart. Run with `npm run sitemap` (also runs automatically on build).
 */
const fs = require("fs");
const path = require("path");

const ORIGIN = "https://www.autosmartcode.com";
const root = path.join(__dirname, "..");
const content = fs.readFileSync(path.join(root, "src/data/content.js"), "utf8");

/** Pull every `slug: "..."` and `date: "..."` pair, in file order. */
function fields(name) {
  const out = [];
  const re = new RegExp(name + ':\\s*["\'](.*?)["\']', "g");
  let m;
  while ((m = re.exec(content))) out.push(m[1]);
  return out;
}

const slugs = fields("slug");
const dates = fields("date");
const projectIds = (content.match(/^\s*id:\s*(\d+)/gm) || [])
  .map(s => s.match(/\d+/)[0]);

// content.js lists blogs first, then projects — the trailing ids are the projects.
const projects = projectIds.slice(slugs.length);

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
  url("/projects", today, "monthly", "0.9"),
  url("/blog", today, "weekly", "0.9"),
  url("/about", today, "monthly", "0.8"),
  "",
  "  <!-- Blog articles -->",
  ...slugs.map((s, i) => url("/blog/" + s, iso(dates[i]), "monthly", "0.8")),
  "",
  "  <!-- Project case studies -->",
  ...projects.map(id => url("/projects/" + id, today, "monthly", "0.7")),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(root, "public/sitemap.xml"), xml);
console.log(
  `sitemap.xml written — 4 core + ${slugs.length} articles + ${projects.length} projects ` +
  `= ${4 + slugs.length + projects.length} URLs`
);
