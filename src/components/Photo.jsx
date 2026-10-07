/**
 * A car photo from public/img/photos, served as WebP with a JPEG fallback.
 *
 * The photos are from Unsplash (free to use under the Unsplash License) and
 * were resized and recompressed for the site — see public/img/photos/CREDITS.md.
 * Pass `eager` only for the one above-the-fold image on a page.
 */
export default function Photo({ name, alt = "", className = "", eager = false }) {
  const base = process.env.PUBLIC_URL + "/img/photos/" + name;
  return (
    <picture className={className}>
      <source srcSet={base + ".webp"} type="image/webp" />
      <img
        src={base + ".jpg"}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchpriority={eager ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}
