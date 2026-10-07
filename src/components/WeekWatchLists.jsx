import { useEffect, useState } from "react";
import "./WeekWatchLists.css";

/**
 * Hero card: a week of auction sales, each one cut down to the cars worth
 * bidding on. A visitor reads it in two seconds — big famous sale on the left,
 * the short list it became on the right.
 *
 * Figures are an example week (labelled as such), not live data.
 *
 * Motion: rows slide in one after another while their numbers count up, then
 * a highlight walks down the week every few seconds. Under reduced motion
 * everything renders in its final state and nothing moves.
 */

export const WEEK = [
  { day: "MON", site: "CarMax Auctions", total: 6000, kept: 800, tag: "good cars" },
  { day: "TUE", site: "Manheim", total: 5000, kept: 1200, tag: "good cars" },
  { day: "WED", site: "EDGE Pipeline", total: 1800, kept: 350, tag: "under MMR" },
  { day: "THU", site: "ACV Auctions", total: 3200, kept: 600, tag: "grade 3.5+" },
  { day: "FRI", site: "ADESA", total: 2500, kept: 500, tag: "clean title" },
];

const fmt = n => Math.round(n).toLocaleString("en-US");

function reducedMotion() {
  return typeof window !== "undefined" &&
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Counts 0 → 1 over `ms`, starting after `delay`. */
function useProgress(ms, delay) {
  const [t, setT] = useState(() => (reducedMotion() ? 1 : 0));
  useEffect(() => {
    if (reducedMotion()) return;
    let raf, start;
    const timer = setTimeout(() => {
      const step = now => {
        if (start === undefined) start = now;
        const k = Math.min(1, (now - start) / ms);
        setT(1 - Math.pow(1 - k, 3)); // ease-out
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    // Animation frames pause in background tabs and some renderers; make sure
    // the real numbers always land even if the count-up never runs.
    const settle = setTimeout(() => setT(1), delay + ms + 400);
    return () => { clearTimeout(timer); clearTimeout(settle); cancelAnimationFrame(raf); };
  }, [ms, delay]);
  return t;
}

function Row({ s, i, active }) {
  const t = useProgress(1100, 300 + i * 180);
  const pct = (s.kept / s.total) * 100;
  return (
    <li className={"wk-row" + (active ? " active" : "")} style={{ "--i": i }}>
      <span className="wk-day">{s.day}</span>
      <div className="wk-site">
        <strong>{s.site}</strong>
        <span>{fmt(s.total * t)} cars in sale</span>
        <div className="wk-bar" aria-hidden="true">
          <i style={{ width: pct * t + "%" }} />
        </div>
      </div>
      <div className="wk-kept">
        <strong>{fmt(s.kept * t)}</strong>
        <span>{s.tag}</span>
      </div>
      <span className="wk-ok" aria-hidden="true">✓</span>
    </li>
  );
}

export default function WeekWatchLists() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (reducedMotion()) return;
    const id = setInterval(() => setActive(a => (a + 1) % WEEK.length), 2600);
    return () => clearInterval(id);
  }, []);

  const total = WEEK.reduce((n, s) => n + s.total, 0);
  const kept = WEEK.reduce((n, s) => n + s.kept, 0);

  return (
    <div className="wk-card" aria-label={
      "Example week: " + WEEK.map(s => `${s.site} ${fmt(s.total)} cars, ${fmt(s.kept)} in your watch list`).join("; ")
    }>
      <div className="wk-head">
        <div>
          <span className="wk-eyebrow">Example week</span>
          <strong className="wk-title">Your watch lists, ready by 6 AM</strong>
        </div>
        <span className="wk-live"><span className="wk-dot" />Ready</span>
      </div>

      <div className="wk-cols" aria-hidden="true">
        <span>Sale</span>
        <span>In your watch list</span>
      </div>

      <ul className="wk-list">
        {WEEK.map((s, i) => <Row key={s.site} s={s} i={i} active={i === active} />)}
      </ul>

      <div className="wk-foot">
        <span><strong>{fmt(total)}</strong> cars read this week</span>
        <span className="wk-arrow">→</span>
        <span><strong className="wk-green">{fmt(kept)}</strong> worth bidding on</span>
      </div>
      <div className="wk-checks">Carfax ✓ · AutoCheck ✓ · MMR ✓ · notes &amp; max bid on every car</div>
    </div>
  );
}
