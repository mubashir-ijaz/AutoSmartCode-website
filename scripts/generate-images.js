/**
 * Builds a branded hero image for every blog post, scraper page and service
 * page, into public/img/.
 *
 * Why this exists: before it, the site had seven <img> tags in total — the
 * logo and the founder photo — and the nineteen articles had none at all. The
 * blog cards drew an emoji on a CSS gradient, which is styling, not an image:
 * it is invisible to Google Images, carries no alt text, and cannot be an
 * og:image. Every one of the 55 URLs shared a single social preview.
 *
 * These are SVG on purpose. They are 2–4 KB each rather than the 60–150 KB a
 * PNG of the same thing would cost, they stay sharp on any display, they are
 * generated from the same data files as the pages, and the text inside them is
 * real text. Google Images indexes SVG.
 *
 * The one thing SVG cannot do is social previews — Facebook, LinkedIn, X and
 * Slack all refuse it. So `og:image` still points at the raster
 * /og-image.png. If @resvg/resvg-js is installed, this script also writes a
 * 1200x630 PNG next to each SVG and the prerenderer will prefer it; if it is
 * not installed, that step is skipped and the build carries on. It is an
 * optional devDependency for exactly that reason — a missing native binary on
 * a deploy host must never break the build.
 *
 * Run: npm run images   (also runs automatically in prebuild)
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const outRoot = path.join(root, "public", "img");

/* ---------- load the ESM data modules from a CommonJS script ---------- */

function loadData(relPath, names) {
  const src = fs.readFileSync(path.join(root, relPath), "utf8").replace(/^export\s+/gm, "");
  const sandbox = { module: {}, out: null };
  vm.createContext(sandbox);
  vm.runInContext(`${src}\n;out = { ${names.join(", ")} };`, sandbox, { filename: relPath });
  return sandbox.out;
}

const { blogs } = loadData("src/data/content.js", ["blogs"]);
const { services } = loadData("src/data/services.js", ["services"]);
const { scrapers } = loadData("src/data/scrapers.js", ["scrapers"]);

/* ------------------------------- helpers ------------------------------ */

const W = 1200, H = 630;

const esc = s => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&apos;");

/**
 * Greedy wrap on an estimated advance width. There is no font metrics engine
 * here, so this approximates: capitals and wide letters cost more than an `i`.
 * It only has to be close enough that a title never overflows 1200px.
 */
const WIDE = new Set("MWQ@%&".split(""));
const NARROW = new Set("iIljt.,:;'!|( )[]-".split(""));

function advance(ch, size) {
  if (WIDE.has(ch)) return size * 0.86;
  if (NARROW.has(ch)) return size * 0.28;
  if (ch === " ") return size * 0.26;
  if (ch >= "A" && ch <= "Z") return size * 0.66;
  if (ch >= "0" && ch <= "9") return size * 0.58;
  return size * 0.53;
}

const measure = (text, size) =>
  [...text].reduce((w, ch) => w + advance(ch, size), 0);

function wrap(text, size, maxWidth, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? line + " " + word : word;
    if (measure(candidate, size) <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);

  // Ran out of lines with words left over — ellipsise the last one.
  if (lines.length === maxLines) {
    const used = lines.join(" ").split(/\s+/).length;
    if (used < words.length) {
      let last = lines[maxLines - 1];
      while (measure(last + "…", size) > maxWidth && last.includes(" ")) {
        last = last.slice(0, last.lastIndexOf(" "));
      }
      lines[maxLines - 1] = last + "…";
    }
  }
  return lines;
}

/**
 * Fit a title into the card by stepping the font size down until it wraps into
 * `maxLines` or fewer. Long titles get smaller type rather than a clipped box.
 */
function fitTitle(text, { max = 66, min = 38, maxWidth = 980, maxLines = 3 } = {}) {
  for (let size = max; size >= min; size -= 2) {
    const lines = wrap(text, size, maxWidth, maxLines + 1);
    if (lines.length <= maxLines) return { size, lines };
  }
  return { size: min, lines: wrap(text, min, maxWidth, maxLines) };
}

/** Per-category accent, so a category reads as a family at card size. */
const ACCENTS = {
  "Web Scraping":      ["#34d399", "#06b6d4"],
  "Legal Guide":       ["#a78bfa", "#6366f1"],
  "Pricing":           ["#fbbf24", "#f59e0b"],
  "Car Dealers":       ["#60a5fa", "#3b82f6"],
  "Car Auctions":      ["#60a5fa", "#22d3ee"],
  "Dealer Automation": ["#38bdf8", "#0ea5e9"],
  "Vehicle History":   ["#fbbf24", "#fb7185"],
  "Lead Generation":   ["#34d399", "#10b981"],
  "Automation":        ["#22d3ee", "#0891b2"],
  "AI Analysis":       ["#a78bfa", "#c084fc"],
  "Real Estate":       ["#fb7185", "#f43f5e"],
  "Technical":         ["#94a3b8", "#64748b"],
  "eCommerce":         ["#34d399", "#22d3ee"],
  "Web Development":   ["#60a5fa", "#a78bfa"],
  "Market Data":       ["#fbbf24", "#f59e0b"],
  _default:            ["#34d399", "#06b6d4"],
};

const accentFor = tag => ACCENTS[tag] || ACCENTS._default;

/** The logo mark from public/logo.svg, re-drawn at an arbitrary size. */
const logoMark = (x, y, size) => {
  const s = size / 48;
  return `
  <g transform="translate(${x} ${y}) scale(${s.toFixed(4)})">
    <rect width="48" height="48" rx="13" fill="url(#mark)"/>
    <path d="M19 12h-3a4 4 0 0 0-4 4v3.5a4.5 4.5 0 0 1-4.5 4.5A4.5 4.5 0 0 1 12 28.5V32a4 4 0 0 0 4 4h3"
          stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M29 12h3a4 4 0 0 1 4 4v3.5a4.5 4.5 0 0 0 4.5 4.5A4.5 4.5 0 0 0 36 28.5V32a4 4 0 0 1-4 4h-3"
          stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="20.5" cy="16.5" r="1.7" fill="#fff" fill-opacity="0.55"/>
    <circle cx="27.5" cy="16.5" r="1.7" fill="#fff" fill-opacity="0.8"/>
    <circle cx="24" cy="23" r="1.9" fill="#fff"/>
    <rect x="19" y="29.5" width="10" height="3.6" rx="1.8" fill="#fff"/>
  </g>`;
};

const FONT = "'Plus Jakarta Sans','Inter',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif";

/**
 * One hero card. Deliberately not a fake screenshot or a stock photo of a
 * handshake — it says what the page says, in the site's own type and colour,
 * which is the only claim it can make honestly.
 */
function card({ eyebrow, title, kicker, emoji }) {
  const [a1, a2] = accentFor(eyebrow);
  const { size, lines } = fitTitle(title);
  const lineHeight = Math.round(size * 1.16);
  const blockTop = 268 - ((lines.length - 1) * lineHeight) / 2;

  const titleLines = lines.map((ln, i) =>
    `<text x="80" y="${blockTop + i * lineHeight}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="#ffffff" letter-spacing="-1.1">${esc(ln)}</text>`
  ).join("\n    ");

  const eyebrowWidth = Math.round(measure(eyebrow.toUpperCase(), 22) + 46);
  const kickerLines = kicker ? wrap(kicker, 25, 900, 2) : [];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#080f0d"/>
      <stop offset="55%" stop-color="#060a09"/>
      <stop offset="100%" stop-color="#0a1512"/>
    </linearGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#34d399"/><stop offset="55%" stop-color="#10b981"/><stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${a1}"/><stop offset="100%" stop-color="${a2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.16" r="0.62">
      <stop offset="0%" stop-color="${a1}" stop-opacity="0.24"/>
      <stop offset="100%" stop-color="${a1}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" fill-opacity="0.045"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="6" fill="url(#accent)"/>

  <rect x="80" y="86" width="${eyebrowWidth}" height="44" rx="22" fill="${a1}" fill-opacity="0.13" stroke="${a1}" stroke-opacity="0.4"/>
  <text x="${80 + eyebrowWidth / 2}" y="115" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="700" fill="${a1}" letter-spacing="1.6">${esc(eyebrow.toUpperCase())}</text>

  ${emoji ? `<g>
    <rect x="1032" y="62" width="88" height="88" rx="24" fill="${a1}" fill-opacity="0.14" stroke="${a1}" stroke-opacity="0.32"/>
    <!-- fill is ignored by a colour emoji font (browsers, viewing the SVG) and
         honoured by a monochrome one (the build host, rasterising to PNG), so
         the glyph stays legible on the dark card either way. -->
    <text x="1076" y="130" text-anchor="middle" font-size="52" fill="#ffffff" fill-opacity="0.92">${esc(emoji)}</text>
  </g>` : ""}

  ${titleLines}

  ${kickerLines.map((ln, i) =>
    `<text x="80" y="${blockTop + lines.length * lineHeight + 34 + i * 36}" font-family="${FONT}" font-size="25" font-weight="500" fill="#94a3b8">${esc(ln)}</text>`
  ).join("\n  ")}

  <line x1="80" y1="524" x2="1120" y2="524" stroke="#ffffff" stroke-opacity="0.09"/>
  ${logoMark(80, 550, 44)}
  <text x="140" y="571" font-family="${FONT}" font-size="25" font-weight="700" fill="#ffffff">AutoSmartCode</text>
  <text x="140" y="596" font-family="${FONT}" font-size="17" font-weight="500" fill="#64748b">autosmartcode.com</text>
  <text x="1120" y="582" text-anchor="end" font-family="${FONT}" font-size="18" font-weight="600" fill="${a1}">Built by Sam</text>
</svg>
`;
}

/* ------------------------------ diagrams ------------------------------ */

/**
 * Bespoke explanatory diagrams, referenced from article bodies as
 * `![alt](/img/diagrams/<name>.svg)`. Unlike the hero cards these are not
 * generated from a data file — each one says something specific, so each is
 * written by hand here.
 *
 * The rule they follow: a diagram has to carry information the sentence next
 * to it does not. A picture of the words already on the page is decoration,
 * and decoration is not worth the bytes or the alt text.
 */

/** The transmission chain from a pump price move to a repriced lot. */
function fuelLagDiagram() {
  const stages = [
    ["Pump price moves|day 0", "#fbbf24"],
    ["Retail shopping|behaviour shifts|days", "#fb923c"],
    ["Auction / MMR|values follow|2–8 weeks", "#60a5fa"],
    ["Your lot is|repriced|if you are watching", "#34d399"],
  ].map(([spec, colour]) => {
    // "line|line|…|when" — pipe-delimited so the source stays on one line.
    const parts = spec.split("|");
    return { lines: parts.slice(0, -1), when: parts[parts.length - 1], colour };
  });
  const W2 = 1200, H2 = 420, boxW = 236, boxH = 150, gap = 32;
  const startX = (W2 - (stages.length * boxW + (stages.length - 1) * gap)) / 2;
  const y = 150;

  const blocks = stages.map(({ lines, when, colour }, i) => {
    const x = startX + i * (boxW + gap);
    const arrow = i < stages.length - 1
      ? `<path d="M ${x + boxW + 6} ${y + boxH / 2} L ${x + boxW + gap - 6} ${y + boxH / 2}" stroke="#475569" stroke-width="2.5" marker-end="url(#arrow)"/>`
      : "";
    return `
  <rect x="${x}" y="${y}" width="${boxW}" height="${boxH}" rx="16" fill="${colour}" fill-opacity="0.10" stroke="${colour}" stroke-opacity="0.45"/>
  ${lines.map((ln, li) =>
    `<text x="${x + boxW / 2}" y="${y + 58 + li * 30}" text-anchor="middle" font-family="${FONT}" font-size="23" font-weight="700" fill="#ffffff">${esc(ln)}</text>`
  ).join("")}
  <text x="${x + boxW / 2}" y="${y + boxH - 26}" text-anchor="middle" font-family="${FONT}" font-size="18" font-weight="600" fill="${colour}">${esc(when)}</text>
  ${arrow}`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W2}" height="${H2}" viewBox="0 0 ${W2} ${H2}" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${W2}" y2="${H2}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#080f0d"/><stop offset="100%" stop-color="#0a1512"/>
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569"/>
    </marker>
  </defs>
  <rect width="${W2}" height="${H2}" fill="url(#bg)"/>
  <text x="${W2 / 2}" y="72" text-anchor="middle" font-family="${FONT}" font-size="30" font-weight="800" fill="#ffffff" letter-spacing="-0.5">A fuel price move reaches your lot last</text>
  <text x="${W2 / 2}" y="108" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="500" fill="#94a3b8">The gap between the pump and the block is where the money is made or lost</text>
  ${blocks}
  <text x="${W2 / 2}" y="382" text-anchor="middle" font-family="${FONT}" font-size="17" font-weight="500" fill="#64748b">Lag varies by segment and by how far and how fast the price moved — measure it, do not assume it</text>
</svg>
`;
}

const diagrams = [
  {
    file: "diagrams/fuel-price-lag.svg",
    svg: fuelLagDiagram(),
  },
];

/* --------------------------- what gets built -------------------------- */

const targets = [...diagrams];

for (const b of blogs) {
  targets.push({
    file: `blog/${b.slug}.svg`,
    svg: card({ eyebrow: b.tag, title: b.title, kicker: b.summary, emoji: b.emoji }),
  });
}

for (const s of services) {
  targets.push({
    file: `services/${s.slug}.svg`,
    svg: card({ eyebrow: "Service", title: s.h1 || s.nav, kicker: s.hero || s.metaDesc, emoji: s.emoji }),
  });
}

for (const s of scrapers) {
  targets.push({
    file: `scrapers/${s.slug}.svg`,
    svg: card({ eyebrow: s.site, title: s.h1 || `${s.site} Scraper`, kicker: s.tagline, emoji: s.emoji }),
  });
}

/* ------------------------------- write -------------------------------- */

let written = 0;
for (const t of targets) {
  const dest = path.join(outRoot, t.file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, t.svg);
  written++;
}

/* Optional raster pass — social platforms will not render SVG. */
let rasterised = 0;
let resvg = null;
try {
  resvg = require("@resvg/resvg-js");
} catch {
  /* not installed — see the header comment; this is deliberately non-fatal */
}

if (resvg) {
  for (const t of targets) {
    const png = new resvg.Resvg(t.svg, {
      fitTo: { mode: "width", value: W },
      font: { loadSystemFonts: true },
    }).render().asPng();
    fs.writeFileSync(path.join(outRoot, t.file.replace(/\.svg$/, ".png")), png);
    rasterised++;
  }
}

/* A manifest so the app and the prerenderer know whether PNGs exist without
   probing the filesystem at render time. */
fs.writeFileSync(
  path.join(outRoot, "manifest.json"),
  JSON.stringify({ count: written, hasRaster: rasterised > 0 }, null, 2) + "\n"
);

console.log(
  `images: ${written} SVG heroes written to public/img ` +
  `(${blogs.length} blog, ${services.length} service, ${scrapers.length} scraper)` +
  (resvg ? ` — plus ${rasterised} PNG` : " — PNG pass skipped (@resvg/resvg-js not installed)")
);
