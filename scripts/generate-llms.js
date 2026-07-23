/**
 * Generates public/llms.txt and public/llms-full.txt.
 *
 * These are the emerging convention for making a site legible to AI
 * assistants — a plain-Markdown map of what the site covers, at a fixed
 * well-known path, with none of the navigation, styling or scripting an
 * assistant has to strip out of HTML first.
 *
 * It is a convention, not a standard: no assistant is obliged to read it, and
 * publishing one does not make anybody cite you. What it does is remove the
 * work between "this site is relevant" and "here is the answer" — which is
 * the same argument as the prerendering in scripts/prerender.js, one layer up.
 *
 * llms.txt      — the index. Every page, one line each, with a description.
 * llms-full.txt — the whole site as one Markdown document, for assistants
 *                 that would rather ingest once than crawl 49 URLs.
 *
 * Runs in prebuild so the files land in public/ and get copied into build/.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ORIGIN = "https://www.autosmartcode.com";
const root = path.join(__dirname, "..");

function loadData(relPath, names) {
  const src = fs.readFileSync(path.join(root, relPath), "utf8").replace(/^export\s+/gm, "");
  const sandbox = { out: null };
  vm.createContext(sandbox);
  vm.runInContext(`${src}\n;out = { ${names.join(", ")} };`, sandbox, { filename: relPath });
  return sandbox.out;
}

const { blogs, projects, FAQS } = loadData("src/data/content.js", ["blogs", "projects", "FAQS"]);
const { services } = loadData("src/data/services.js", ["services"]);
const { scrapers } = loadData("src/data/scrapers.js", ["scrapers"]);
const { webdesign } = loadData("src/data/webdesign.js", ["webdesign"]);

const link = (title, url, desc) => `- [${title}](${ORIGIN}${url})${desc ? ": " + desc : ""}`;

/* ------------------------------- llms.txt ------------------------------ */

const index = [
  "# AutoSmartCode",
  "",
  "> Web scraping, automation, data pipelines and web development for US",
  "> businesses. Run by Sam. Fixed prices quoted within 24 hours, most projects",
  "> delivered in 2–5 days. Contact: sam@autosmartcode.com",
  "",
  "AutoSmartCode builds custom software rather than selling a product: scrapers",
  "written against specific target sites, automation pipelines for car dealers and",
  "wholesalers, verified B2B lead lists, and websites for small businesses. Every",
  "build is quoted at a fixed price before work starts.",
  "",
  "## Services",
  "",
  ...services.map(s => link(s.h1, "/services/" + s.slug, s.metaDesc)),
  "",
  "## Sites scraped (one page per platform)",
  "",
  ...scrapers.map(s => link(s.h1 || s.site + " Scraper", "/" + s.slug, s.metaDesc)),
  "",
  "## Web design",
  "",
  ...webdesign.map(w => link(w.h1, "/" + w.slug, w.metaDesc)),
  "",
  "## Guides",
  "",
  ...blogs.map(b => link(b.title, "/blog/" + b.slug, b.summary)),
  "",
  "## Case studies",
  "",
  ...projects.map(p => link(p.title, "/projects/" + p.id, p.description.slice(0, 140))),
  "",
  "## Optional",
  "",
  link("Full site content as one document", "/llms-full.txt", "every page above, in full"),
  link("Sitemap", "/sitemap.xml"),
  "",
].join("\n");

fs.writeFileSync(path.join(root, "public/llms.txt"), index);

/* ---------------------------- llms-full.txt ---------------------------- */

const section = (title, body) => `\n\n---\n\n## ${title}\n\n${body}`;

const full = [
  "# AutoSmartCode — full site content",
  "",
  `Source: ${ORIGIN}`,
  `Generated: ${new Date().toISOString().slice(0, 10)}`,
  "",
  "Web scraping, automation, data pipelines and web development for US",
  "businesses. One developer-led studio. Contact: sam@autosmartcode.com",
  "",
  "## Frequently asked questions",
  "",
  ...FAQS.map(f => `### ${f.q}\n\n${f.a}\n`),

  ...services.map(s => section(s.h1, [
    `URL: ${ORIGIN}/services/${s.slug}`,
    `Keywords: ${s.keywords.join(", ")}`,
    "",
    s.hero,
    "",
    ...s.sections.map(sec =>
      `### ${sec.h}\n\n${sec.p.join("\n\n")}${sec.list ? "\n\n" + sec.list.map(i => "- " + i).join("\n") : ""}`),
    "",
    "### What you get",
    "",
    s.deliverables.map(d => "- " + d).join("\n"),
    "",
    "### Questions",
    "",
    s.faqs.map(f => `**${f.q}**\n\n${f.a}`).join("\n\n"),
  ].join("\n"))),

  ...scrapers.map(s => section(s.h1 || s.site + " Scraper", [
    `URL: ${ORIGIN}/${s.slug}`,
    `Keywords: ${s.keywords.join(", ")}`,
    "",
    s.tagline,
    "",
    `### What ${s.site} is, and why the data matters`,
    "",
    s.what,
    "",
    s.why,
    "",
    "### Fields extracted",
    "",
    s.fields.map(f => "- " + f).join("\n"),
    "",
    `### Getting past ${s.site}'s defences`,
    "",
    s.defenses,
    "",
    "### Uses",
    "",
    s.uses.map(u => "- " + u).join("\n"),
    "",
    "### Questions",
    "",
    s.faqs.map(f => `**${f.q}**\n\n${f.a}`).join("\n\n"),
  ].join("\n"))),

  ...webdesign.map(w => section(w.h1, [
    `URL: ${ORIGIN}/${w.slug}`,
    `Keywords: ${w.keywords.join(", ")}`,
    "",
    w.tagline,
    "",
    "### The problem",
    "",
    w.problem,
    "",
    "### Signals",
    "",
    w.signals.map(s => "- " + s).join("\n"),
    "",
    "### What gets built",
    "",
    w.answer,
    "",
    "### Included",
    "",
    w.includes.map(i => "- " + i).join("\n"),
    "",
    "### Questions",
    "",
    w.faqs.map(f => `**${f.q}**\n\n${f.a}`).join("\n\n"),
  ].join("\n"))),

  ...blogs.map(b => section(b.title, [
    `URL: ${ORIGIN}/blog/${b.slug}`,
    `Published: ${b.date}`,
    "",
    b.summary,
    "",
    b.content.trim(),
  ].join("\n"))),

  ...projects.map(p => section(p.title + " (case study)", [
    `URL: ${ORIGIN}/projects/${p.id}`,
    `Client: ${p.client}`,
    "",
    p.description,
    "",
    `**Challenge:** ${p.challenge}`,
    "",
    `**Solution:** ${p.solution}`,
    "",
    `**Result:** ${p.result}`,
    "",
    `**Stack:** ${p.stack.join(", ")}`,
  ].join("\n"))),

  "",
].join("\n");

fs.writeFileSync(path.join(root, "public/llms-full.txt"), full);

const kb = n => (n / 1024).toFixed(0) + " KB";
console.log(
  `llms.txt written — ${services.length} services + ${scrapers.length} scrapers + ` +
  `${webdesign.length} web design + ${blogs.length} guides + ${projects.length} case studies ` +
  `(${kb(index.length)} index, ${kb(full.length)} full)`
);
