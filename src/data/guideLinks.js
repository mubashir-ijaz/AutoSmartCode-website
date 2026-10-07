/**
 * Guide → the commercial pages it supports.
 *
 * Rendered as "Put this to work" at the end of each guide (Blog.jsx and
 * scripts/prerender.js), and in reverse as "Guides on this" on each service
 * page (Services.jsx and prerender.js). Before this, 9 of the 17 guides
 * linked to no service page and none linked to a case study, so the topical
 * connection between a guide and the offer it explains existed only in the
 * reader's head.
 *
 * Paths must be real routes: /services/<slug>, /<platform-slug> or
 * /projects/<id>. Keep it to 2–3 per guide, most relevant first.
 */
export const GUIDE_LINKS = {
  "what-is-web-scraping": ["/services/car-auction-automation", "/services/auction-run-list-triage", "/projects/12"],
  "is-web-scraping-legal": ["/services/auction-run-list-triage", "/services/vehicle-history-reports", "/projects/12"],
  "how-much-does-web-scraping-cost": ["/services/auction-run-list-triage", "/services/dealer-browser-extension", "/projects/10"],
  "automate-manheim-mmr": ["/manheim-mmr-scraper", "/services/auction-run-list-triage", "/projects/10"],
  "bypass-captcha-anti-bot-scraping": ["/services/car-auction-automation", "/dealer-marketplace-scraper", "/projects/1"],
  "free-vin-decoder-nhtsa-api": ["/services/vehicle-history-reports", "/carfax-scraper", "/autocheck-scraper"],
  "price-used-cars-market-data": ["/services/car-auction-automation", "/manheim-mmr-scraper", "/projects/1"],
  "ai-parsing-scraped-data": ["/services/auction-run-list-triage", "/services/vehicle-history-reports", "/projects/10"],
  "self-healing-scrapers-ai": ["/services/car-auction-automation", "/projects/12"],
  "what-is-mmr-manheim-market-report": ["/manheim-mmr-scraper", "/services/auction-run-list-triage", "/projects/10"],
  "automate-car-merchandising-workflow": ["/services/custom-dealer-software", "/projects/1"],
  "autocheck-vs-carfax-vehicle-history": ["/services/vehicle-history-reports", "/projects/10"],
  "what-is-an-autocheck-report": ["/services/vehicle-history-reports", "/autocheck-scraper"],
  "autoscraper-python-library-vs-custom-scraper": ["/services/car-auction-automation", "/projects/12"],
  "fuel-prices-used-vehicle-values": ["/manheim-mmr-scraper", "/services/auction-run-list-triage"],
  "government-off-lease-car-auctions-dealers": ["/services/marketplace-government-lease-sales", "/govdeals-scraper", "/gsa-auctions-scraper"],
  "mmr-carfax-autocheck-on-listing-extension": ["/services/dealer-browser-extension", "/projects/11"],
};
