/**
 * Single source of truth for the markets AutoSmartCode serves.
 *
 * The work is remote and priced in USD, so the served area is every
 * high-income English-friendly market, not just the US. This list feeds the
 * `areaServed` of every Service / ProfessionalService schema block.
 *
 * Used by:
 *   - src/pages/Scraper.jsx, Services.jsx, WebDesign.jsx  (import AREAS_SERVED)
 *   - scripts/prerender.js                                 (loadData → AREAS_SERVED)
 *
 * NOTE: public/index.html is a static file and cannot import — its
 * Organization/ProfessionalService areaServed is kept in sync BY HAND. If you
 * change this list, update index.html too.
 */

/* Country names, in rough priority order. Schema.org Country objects. */
export const AREAS_SERVED = [
  { "@type": "Country", name: "United States" },
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Country", name: "United Arab Emirates" },
  { "@type": "Country", name: "Saudi Arabia" },
  { "@type": "Country", name: "Qatar" },
  { "@type": "Country", name: "Kuwait" },
  { "@type": "Country", name: "Australia" },
  { "@type": "Country", name: "New Zealand" },
  { "@type": "Country", name: "Canada" },
  { "@type": "Country", name: "Germany" },
  { "@type": "Country", name: "Netherlands" },
  { "@type": "Country", name: "Belgium" },
  { "@type": "Country", name: "Norway" },
  { "@type": "Country", name: "Sweden" },
  { "@type": "Country", name: "Denmark" },
  { "@type": "Country", name: "Finland" },
  { "@type": "Country", name: "Switzerland" },
  { "@type": "Country", name: "Ireland" },
  { "@type": "Country", name: "Italy" },
  { "@type": "Country", name: "Singapore" },
];

/* ISO 3166-1 alpha-2 codes — the compact form ContactPoint.areaServed wants. */
export const AREA_CODES = [
  "US", "GB", "AE", "SA", "QA", "KW", "AU", "NZ", "CA", "DE",
  "NL", "BE", "NO", "SE", "DK", "FI", "CH", "IE", "IT", "SG",
];
