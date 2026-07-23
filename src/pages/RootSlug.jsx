import { useParams } from "react-router-dom";
import { scraperBySlug } from "../data/scrapers";
import { webdesignBySlug } from "../data/webdesign";
import { ScraperPage } from "./Scraper";
import { WebDesignPage } from "./WebDesign";

/**
 * Landing pages live at the root so the URL is an exact match for the query
 * ("/autotrader-scraper", "/salon-website-design") rather than buried under a
 * folder. Two different page types share that namespace, so this picks the
 * right renderer — and falls through to the scraper page's noindex
 * not-found state for anything unrecognised.
 */
export default function RootSlug() {
  const { slug } = useParams();
  if (webdesignBySlug(slug)) return <WebDesignPage />;
  if (scraperBySlug(slug)) return <ScraperPage />;
  return <ScraperPage />;
}
