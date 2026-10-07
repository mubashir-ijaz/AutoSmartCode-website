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
 * llms.txt      — the index. A verified company description and key facts,
 *                 then every page, one line each, grouped by topic and in
 *                 order of commercial importance (see SCRAPER_GROUPS and
 *                 BLOG_GROUPS — new pages land under "Other" until placed).
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

const { blogs, projects, FAQS } =
  loadData("src/data/content.js", ["blogs", "projects", "FAQS"]);
const { services } = loadData("src/data/services.js", ["services"]);
const { scrapers } = loadData("src/data/scrapers.js", ["scrapers"]);
const { PRICING, priceLine } = loadData("src/data/pricing.js", ["PRICING", "priceLine"]);


const link = (title, url, desc) => `- [${title}](${ORIGIN}${url})${desc ? ": " + desc : ""}`;

/* ------------------------- company description ------------------------- */
/* One source for the short and long descriptions, so llms.txt and
   llms-full.txt cannot drift apart. Every claim here is stated elsewhere on
   the site (FAQS in content.js, PRICING, About.jsx) — keep it that way. An
   assistant repeating a claim the site cannot back up costs more trust than
   the citation is worth. */

const SHORT_DESC =
  "A dealer gives AutoSmartCode their buying rules, and AutoSmartCode " +
  "automatically searches, filters, researches and ranks vehicles across " +
  "auctions and marketplaces — with Carfax, AutoCheck and MMR on the dealer's " +
  "own accounts — so the dealer can focus on buying.";

const LONG_DESC = [
  "AutoSmartCode is a one-developer software studio, run by Sam, that works only",
  "for the car trade. It builds and runs custom automation for independent",
  "dealers, wholesalers, dealer groups and auction buyers in the US, UK, the",
  "Gulf, Europe and Australia. The core job: read an entire auction run list",
  "overnight (Manheim, ADESA, ACV, OPENLANE or a private dealer portal), apply",
  "the dealer's own buy box, pull title, Carfax, AutoCheck and Manheim MMR per",
  "VIN, write a note and a max bid per car, and leave the survivors in the",
  "dealer's own watch list by 6 AM. It also builds Chrome and Edge extensions",
  "that show MMR, history and margin on the listing page, daily alerts from",
  "marketplaces and government and off-lease sales, and custom dealer software",
  "that connects those accounts into one system. Everything runs on the",
  "client's own licensed accounts; it does not resell data or build automated",
  "bidding.",
].join("\n");

/* -------------------------- page grouping ------------------------------ */
/* Sections in order of commercial importance. A platform page or guide not
   listed here still appears (under "Other") and the build warns, so adding a
   page to the data files never silently drops it from llms.txt. */

const SCRAPER_GROUPS = [
  ["Wholesale auction platforms (run lists, condition reports, MMR scoring)", [
    "manheim-mmr-scraper", "adesa-scraper", "acv-auctions-scraper", "openlane-scraper",
    "backlotcars-scraper", "smartauction-scraper", "edge-pipeline-scraper", "dealer-marketplace-scraper",
  ]],
  ["Salvage auctions", ["copart-scraper", "iaa-scraper"]],
  ["Vehicle history reports by VIN", ["carfax-scraper", "autocheck-scraper"]],
  ["Marketplace, government and fleet sale monitoring", [
    "facebook-marketplace-car-scraper", "ebay-motors-scraper", "govdeals-scraper", "gsa-auctions-scraper",
  ]],
  ["Retail listing and market pricing data", [
    "autotrader-scraper", "cars-com-scraper", "cargurus-scraper", "carmax-scraper",
    "autonation-scraper", "autoscout24-scraper", "carsales-scraper", "otomoto-scraper",
  ]],
];

const BLOG_GROUPS = [
  ["Guides: MMR, valuation and vehicle history", [
    "what-is-mmr-manheim-market-report", "automate-manheim-mmr", "price-used-cars-market-data",
    "fuel-prices-used-vehicle-values", "autocheck-vs-carfax-vehicle-history",
    "what-is-an-autocheck-report", "free-vin-decoder-nhtsa-api",
  ]],
  ["Guides: sourcing, dealer workflow and buying decisions", [
    "find-good-auction-cars-faster", "mmr-carfax-autocheck-on-listing-extension", "government-off-lease-car-auctions-dealers",
    "automate-car-merchandising-workflow", "how-much-does-web-scraping-cost", "is-web-scraping-legal",
  ]],
  ["Guides: how auction data collection works", [
    "what-is-web-scraping", "bypass-captcha-anti-bot-scraping", "self-healing-scrapers-ai",
    "ai-parsing-scraped-data", "autoscraper-python-library-vs-custom-scraper",
  ]],
];

/** Services in priority order: the two priced, productised offers first. */
const SERVICE_ORDER = [
  "auction-run-list-triage", "dealer-browser-extension", "marketplace-government-lease-sales",
  "vehicle-history-reports", "car-auction-automation", "custom-dealer-software",
];

function grouped(groups, items, keyOf) {
  const used = new Set(groups.flatMap(([, keys]) => keys));
  const out = groups.map(([title, keys]) =>
    [title, keys.map(k => items.find(i => keyOf(i) === k)).filter(Boolean)]);
  for (const k of used)
    if (!items.some(i => keyOf(i) === k)) console.warn("llms.txt: grouped page no longer exists — " + k);
  const rest = items.filter(i => !used.has(keyOf(i)));
  if (rest.length) {
    console.warn("llms.txt: not grouped yet, listed under Other — " + rest.map(keyOf).join(", "));
    out.push(["Other", rest]);
  }
  return out;
}

/** First sentence of a description — never a mid-word cut. */
const firstSentence = t => (t.match(/^.+?[.!?](\s|$)/) || [t])[0].trim();

const orderedServices = [
  ...SERVICE_ORDER.map(slug => services.find(s => s.slug === slug)).filter(Boolean),
  ...services.filter(s => !SERVICE_ORDER.includes(s.slug)),
];

/* ------------------------------- llms.txt ------------------------------ */

const index = [
  "# AutoSmartCode",
  "",
  "> " + SHORT_DESC,
  "",
  LONG_DESC,
  "",
  "Key facts:",
  "",
  "- Who it is for: used-car dealers, wholesalers, dealer groups and auction buyers. Not consumers, and not other industries.",
  "- How it works: built per client and run on the client's own auction, Carfax, AutoCheck and Manheim accounts. No data resale, no shared credentials, no automated bidding.",
  "- Pricing: " + PRICING.map(pr => pr.name + ", " + priceLine(pr)).join("; ") + ".",
  "- Timeline: most run-list triage builds are live in 3 to 7 days; extensions take 5 to 10.",
  "- Maintenance: when an auction site changes and a job breaks, the client hears from an alert the same morning; fixes are covered by the monthly fee.",
  "- Contact: the form at " + ORIGIN + "/#contact (email required, WhatsApp optional). Fixed-price quotes within 24 hours.",
  "",
  "## Primary services",
  "",
  ...orderedServices.map(s => link(s.h1, "/services/" + s.slug, s.metaDesc)),
  "",
  ...grouped(SCRAPER_GROUPS, scrapers, s => s.slug).flatMap(([title, items]) => [
    "## " + title,
    "",
    ...items.map(s => link(s.h1 || s.site + " Scraper", "/" + s.slug, s.metaDesc)),
    "",
  ]),
  "## Case studies (client work)",
  "",
  ...projects.map(p => link(p.title, "/projects/" + p.id, p.client + ". " + firstSentence(p.description))),
  "",
  ...grouped(BLOG_GROUPS, blogs, b => b.slug).flatMap(([title, items]) => [
    "## " + title,
    "",
    ...items.map(b => link(b.title, "/blog/" + b.slug, b.summary)),
    "",
  ]),
  "## About and contact",
  "",
  link("About Sam and AutoSmartCode", "/about", "who builds the software, the technical stack, and the markets served"),
  link("All services", "/services", "every service on one page, with the platform pages under each"),
  link("All case studies", "/projects", "client builds with the problem, the solution and the result"),
  link("Contact and quote", "/#contact", "send the auction or portal name and your buy box; fixed-price quote within 24 hours"),
  "",
  "## Optional",
  "",
  link("Full site content as one Markdown document", "/llms-full.txt", "every service, platform page, guide and case study in full"),
  link("XML sitemap", "/sitemap.xml"),
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
  LONG_DESC,
  "",
  "Contact: " + ORIGIN + "/#contact",
  "",
  "## Frequently asked questions",
  "",
  ...FAQS.map(f => `### ${f.q}\n\n${f.a}\n`),

  ...services.map(s => section(s.h1, [
    `URL: ${ORIGIN}/services/${s.slug}`,
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
  `${blogs.length} guides + ${projects.length} case studies ` +
  `(${kb(index.length)} index, ${kb(full.length)} full)`
);
