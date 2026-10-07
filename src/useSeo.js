import { useEffect } from "react";

export const ORIGIN = "https://www.autosmartcode.com";

/* Reuse one tag per key instead of appending duplicates on every navigation. */
function setMeta(selector, attr, value) {
  if (!value) return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, name, key] = selector.match(/\[(.+?)="(.+?)"\]/);
    el.setAttribute(name, key);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Per-route title, description, canonical, social tags and JSON-LD.
 *
 * The site is a client-rendered SPA, so without this every URL would serve
 * the homepage's <head> — identical titles and canonicals across 22 pages,
 * which search engines treat as duplicates.
 *
 * `image` is a site-root path ("/img/blog/x.png"), not a full URL — og:image
 * has to be absolute, so it is resolved against ORIGIN here rather than at
 * every call site. `imageAlt` matters more than it looks: it is what a screen
 * reader announces for a shared link, and Twitter drops the card entirely if
 * the image is unreachable, so both travel together.
 *
 * @param {{title:string, description:string, path:string, type?:string,
 *          image?:string, imageAlt?:string, schema?:object, noindex?:boolean}} seo
 */
export function useSeo({ title, description, path, type = "website", image, imageAlt, schema, noindex }) {
  useEffect(() => {
    const url = ORIGIN + path;
    const img = image ? (image.startsWith("http") ? image : ORIGIN + image)
                      : ORIGIN + "/og-image.png";

    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="robots"]', "content",
      noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1");
    setLink("canonical", url);

    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:type"]', "content", type);
    setMeta('meta[property="og:image"]', "content", img);
    setMeta('meta[property="og:image:alt"]', "content",
      imageAlt || "AutoSmartCode — auction data and automation for car dealers, wholesalers and auction buyers");

    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", img);
    setMeta('meta[name="twitter:image:alt"]', "content",
      imageAlt || "AutoSmartCode — auction data and automation for car dealers, wholesalers and auction buyers");

    // Page-level structured data, replaced (not stacked) on each navigation.
    const prev = document.getElementById("route-schema");
    if (prev) prev.remove();
    if (schema) {
      const tag = document.createElement("script");
      tag.type = "application/ld+json";
      tag.id = "route-schema";
      tag.textContent = JSON.stringify(schema);
      document.head.appendChild(tag);
    }
  }, [title, description, path, type, image, imageAlt, schema, noindex]);
}

/** Breadcrumb trail, e.g. crumbs([["Blog","/blog"], ["Article","/blog/x"]]) */
export const crumbs = items => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "/"], ...items].map(([name, p], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: ORIGIN + p,
  })),
});
