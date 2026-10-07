/**
 * The site's car artwork, drawn rather than photographed.
 *
 * There are no licensed vehicle photos in this project and stock imagery for
 * a dealer site is both expensive and generic. These are inline SVG instead:
 * a few KB, sharp at any size, recoloured from the CSS custom properties the
 * rest of the site already uses, and theme-correct for free.
 *
 * Every shape here is `currentColor` or a token so a caller can drop one into
 * any surface and have it inherit. Nothing has a hard-coded hex.
 *
 * If real photography arrives later, each of these is one component swap —
 * the callers only ever ask for "a car silhouette of this body style".
 */

/* Four body styles, because a run list is mostly these four and a buyer reads
   the shape faster than the words. Paths are drawn on a 160x64 box. */
const BODIES = {
  suv:
    "M8 44h4a10 10 0 0 1 20 0h96a10 10 0 0 1 20 0h4v-9c0-4-2-7-6-8l-18-4-14-13c-3-3-7-4-11-4H56c-5 0-9 2-12 5L30 24 12 29c-3 1-4 3-4 6v9Z",
  sedan:
    "M6 46h6a10 10 0 0 1 20 0h96a10 10 0 0 1 20 0h6v-8c0-4-3-7-7-8l-20-3-16-12c-3-2-6-3-10-3H58c-4 0-8 1-11 4L33 27l-22 4c-3 1-5 3-5 7v8Z",
  truck:
    "M4 44h6a10 10 0 0 1 20 0h100a10 10 0 0 1 20 0h6V28c0-3-2-5-5-5h-48l-12-14c-2-2-5-4-8-4H44c-4 0-7 2-9 5L22 26 8 30c-3 1-4 3-4 6v8Z",
  coupe:
    "M6 46h6a10 10 0 0 1 20 0h96a10 10 0 0 1 20 0h6v-9c0-4-3-7-7-8l-24-4-20-13c-3-2-6-3-9-3H60c-4 0-8 2-11 5L34 27l-23 5c-3 1-5 3-5 6v8Z",
};

/**
 * A vehicle silhouette. `body` picks the shape; everything else inherits.
 * Decorative by default — pass a `label` only when the shape carries meaning
 * the surrounding text does not already give.
 */
export function CarSilhouette({ body = "suv", className = "", label }) {
  const d = BODIES[body] || BODIES.suv;
  return (
    <svg
      className={"car-sil " + className}
      viewBox="0 0 160 64"
      fill="none"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
      focusable="false"
    >
      <path d={d} fill="currentColor" opacity="0.9" />
      {/* glass */}
      <path
        d="M52 22h50l10 9H44l8-9Z"
        fill="var(--bg, #060a09)"
        opacity="0.55"
      />
      {/* wheels — drawn over the body so the arches read */}
      <circle cx="42" cy="46" r="9" fill="var(--bg, #060a09)" />
      <circle cx="42" cy="46" r="5" fill="currentColor" opacity="0.65" />
      <circle cx="128" cy="46" r="9" fill="var(--bg, #060a09)" />
      <circle cx="128" cy="46" r="5" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

/**
 * The hero backdrop: an auction lane in perspective, with lot markers
 * receding toward a vanishing point and a row of cars on each side.
 *
 * Purely decorative, so it is aria-hidden and carries no text. It sits behind
 * content, so everything is low-opacity and the gradient fades it out before
 * it reaches the headline.
 */
export function AuctionLaneBackdrop({ className = "" }) {
  return (
    <svg
      className={"lane-bg " + className}
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Fades the whole drawing out toward the top so the headline never
            competes with it. */}
        <linearGradient id="laneFade" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="laneMask">
          <rect width="1200" height="520" fill="url(#laneFade)" />
        </mask>
        <linearGradient id="laneFloor" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>

        {/* Declared in <defs> so every <use> below is a backward reference.
            A forward reference to a <symbol> later in the document renders
            inconsistently across browsers. */}
        <symbol id="laneCar" viewBox="0 0 160 64">
          <path d={BODIES.suv} fill="var(--accent-bright)" />
          <circle cx="42" cy="46" r="9" fill="var(--bg)" />
          <circle cx="128" cy="46" r="9" fill="var(--bg)" />
        </symbol>
      </defs>

      <g mask="url(#laneMask)">
        {/* lane floor */}
        <path d="M600 150 L1200 520 L0 520 Z" fill="url(#laneFloor)" />

        {/* centre line, dashed, receding */}
        <path
          d="M600 160 L600 520"
          stroke="var(--accent-bright)"
          strokeOpacity="0.35"
          strokeWidth="3"
          strokeDasharray="16 22"
        />

        {/* lane edges */}
        <path d="M600 152 L1140 520" stroke="var(--accent-line)" strokeWidth="2" fill="none" />
        <path d="M600 152 L60 520" stroke="var(--accent-line)" strokeWidth="2" fill="none" />

        {/* lot markers across the floor, spacing widening toward the viewer */}
        {[
          [196, 0.1], [238, 0.14], [292, 0.2], [360, 0.26],
          [446, 0.32], [556, 0.38],
        ].map(([y, o]) => {
          const half = ((y - 150) / 370) * 560;
          return (
            <line
              key={y}
              x1={600 - half} y1={y} x2={600 + half} y2={y}
              stroke="var(--accent-bright)" strokeOpacity={o} strokeWidth="2"
            />
          );
        })}

        {/* cars parked down each side, smaller and fainter as they recede */}
        {[
          [78, 430, 1.0, 0.30], [196, 356, 0.76, 0.24], [280, 306, 0.58, 0.18],
          [340, 272, 0.44, 0.13], [384, 248, 0.34, 0.10],
        ].map(([x, y, s, o]) => (
          <g key={"l" + x} transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
            <use href="#laneCar" width="160" height="64" />
          </g>
        ))}
        {[
          [962, 430, 1.0, 0.30], [884, 356, 0.76, 0.24], [828, 306, 0.58, 0.18],
          [792, 272, 0.44, 0.13], [768, 248, 0.34, 0.10],
        ].map(([x, y, s, o]) => (
          <g key={"r" + x} transform={`translate(${x} ${y}) scale(${s})`} opacity={o}>
            <use href="#laneCar" width="160" height="64" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/**
 * A condition grade dial, 0–5, as auctions score cars. Used on the vehicle
 * cards so a grade reads at a glance instead of as another number in a row.
 */
export function GradeDial({ grade = 4.2, size = 34 }) {
  const pct = Math.max(0, Math.min(1, grade / 5));
  const r = 14;
  const circ = 2 * Math.PI * r;
  return (
    <svg
      className="grade-dial"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      role="img"
      aria-label={`Condition grade ${grade} out of 5`}
    >
      <circle cx="18" cy="18" r={r} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
      <circle
        cx="18" cy="18" r={r} fill="none"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round"
        strokeDasharray={`${circ * pct} ${circ}`}
        transform="rotate(-90 18 18)"
      />
      <text
        x="18" y="18" textAnchor="middle" dominantBaseline="central"
        fontSize="11" fontWeight="700" fill="currentColor"
      >
        {grade}
      </text>
    </svg>
  );
}
