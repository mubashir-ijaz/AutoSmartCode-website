/**
 * Builds public/sitemap.xml from the data files so the two can never drift
 * apart. Run with `npm run sitemap` (also runs automatically on build).
 *
 * Sources: src/data/content.js (blogs + projects), src/data/services.js
 * (service landing pages), src/data/scrapers.js (per-site scraper pages),
 * src/data/images.js (the hero image
 * and alt text belonging to each of those).
 *
 * This used to pull slugs out with a regex over the file text. It now
 * evaluates the modules the same way scripts/prerender.js does, because the
 * image entries need each page's real object — its title and its alt text —
 * not just the slug string.
 *
 * The <image:image> entries matter more than they look. Every page carries a
 * generated hero now (scripts/generate-images.js); an image URL that appears
 * only inside a page body is discovered whenever Google next renders that
 * page, whereas one declared here is discovered on the next crawl of the
 * sitemap. For a site with no image presence at all, that is the difference
 * between Google Images knowing about 49 images and knowing about none.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ORIGIN = "https://www.autosmartcode.com";
const root = path.join(__dirname, "..");

/* ---------- load the ESM data modules from a CommonJS script ---------- */

function loadData(relPath, names) {
  const src = fs.readFileSync(path.join(root, relPath), "utf8").replace(/^export\s+/gm, "");
  const sandbox = { module: {}, out: null };
  vm.createContext(sandbox);
  vm.runInContext(`${src}\n;out = { ${names.join(", ")} };`, sandbox, { filename: relPath });
  return sandbox.out;
}

const { blogs, projects } = loadData("src/data/content.js", ["blogs", "projects"]);
const { services } = loadData("src/data/services.js", ["services"]);
const { scrapers } = loadData("src/data/scrapers.js", ["scrapers"]);
const { blogImage, scraperImage, serviceImage } =
  loadData("src/data/images.js",
    ["blogImage", "scraperImage", "serviceImage"]);

/* ------------------------------- helpers ------------------------------ */

const xmlEsc = s => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const iso = d => {
  const parsed = new Date(d + " UTC"); // "June 10, 2025" is local midnight otherwise, a day early east of UTC
  return isNaN(parsed) ? new Date().toISOString().slice(0, 10)
                       : parsed.toISOString().slice(0, 10);
};
const today = new Date().toISOString().slice(0, 10);

/**
 * When a page's source last changed, from git. Stamping every URL with the
 * build date told Google that every page changes on every deploy; once
 * lastmod is shown to be wrong, Google ignores it for the whole site.
 * Falls back to today outside a git checkout (e.g. a zip upload).
 */
const { execSync } = require("child_process");
const gitDate = (...files) => {
  const dates = files.map(file => {
    try {
      return execSync(`git log -1 --format=%cs -- "${file}"`, { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
        .toString().trim();
    } catch { return ""; }
  }).filter(Boolean).sort();
  return dates.length ? dates[dates.length - 1] : today;
};
const SERVICES_DATE = gitDate("src/data/services.js", "src/pages/Services.jsx");
const SCRAPERS_DATE = gitDate("src/data/scrapers.js", "src/pages/Scraper.jsx");
const PROJECTS_DATE = gitDate("src/data/content.js", "src/pages/Projects.jsx");
const HOME_DATE = gitDate("src/pages/Home.jsx", "src/data/pricing.js", "src/data/content.js");


/** `image` is {src, alt} from src/data/images.js, or null for pages without one. */
const imageTag = (image, title) => image
  ? `    <image:image>\n` +
    `      <image:loc>${ORIGIN}${xmlEsc(image.src)}</image:loc>\n` +
    `      <image:title>${xmlEsc(title)}</image:title>\n` +
    `      <image:caption>${xmlEsc(image.alt)}</image:caption>\n` +
    `    </image:image>\n`
  : "";

const url = (loc, lastmod, changefreq, priority, image, title) =>
  `  <url>\n` +
  `    <loc>${ORIGIN}${loc}</loc>\n` +
  `    <lastmod>${lastmod}</lastmod>\n` +
  `    <changefreq>${changefreq}</changefreq>\n` +
  `    <priority>${priority}</priority>\n` +
  imageTag(image, title) +
  `  </url>`;

/* -------------------------------- build ------------------------------- */

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  url("/", HOME_DATE, "weekly", "1.0"),
  url("/services", SERVICES_DATE, "weekly", "0.9"),
  url("/projects", PROJECTS_DATE, "monthly", "0.8"),
  url("/blog", blogs.map(b => iso(b.date)).sort().pop(), "weekly", "0.8"),
  url("/about", gitDate("src/pages/About.jsx"), "monthly", "0.7"),
  "",
  "  <!-- Service landing pages — the commercial-intent pages -->",
  ...services.map(s =>
    url("/services/" + s.slug, SERVICES_DATE, "weekly", "0.9", serviceImage(s), s.h1)),
  "",
  "  <!-- Per-site scraper pages — exact-match to search queries -->",
  ...scrapers.map(s =>
    url("/" + s.slug, SCRAPERS_DATE, "weekly", "0.9", scraperImage(s), s.h1 || s.site + " Scraper")),
  "",
  "  <!-- Blog articles -->",
  ...blogs.map(b =>
    url("/blog/" + b.slug, iso(b.date), "monthly", "0.7", blogImage(b), b.title)),
  "",
  "  <!-- Project case studies -->",
  ...projects.map(pr =>
    url("/projects/" + pr.id, PROJECTS_DATE, "monthly", "0.6")),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(root, "public/sitemap.xml"), xml);

const total = 5 + services.length + scrapers.length + blogs.length + projects.length;
const images = services.length + scrapers.length + blogs.length;
console.log(
  `sitemap.xml written — 5 core + ${services.length} services + ${scrapers.length} scrapers ` +
  `+ ${blogs.length} articles + ${projects.length} projects ` +
  `= ${total} URLs, ${images} images`
);
