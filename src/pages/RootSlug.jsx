import { useParams } from "react-router-dom";
import { scraperBySlug } from "../data/scrapers";
import { ScraperPage } from "./Scraper";

/**
 * Per-platform landing pages live at the root so the URL is an exact match for
 * the query ("/manheim-mmr-scraper") rather than buried under a folder.
 *
 * This used to arbitrate between two page types; the web-design cluster is
 * gone, so it is now a single renderer, kept because the route still has to
 * fall through to the scraper page's noindex not-found state for anything
 * unrecognised.
 */
export default function RootSlug() {
  const { slug } = useParams();
  if (scraperBySlug(slug)) return <ScraperPage />;
  return <ScraperPage />;
}
