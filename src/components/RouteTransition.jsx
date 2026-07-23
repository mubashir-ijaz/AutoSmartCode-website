import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./RouteTransition.css";

/**
 * Page-to-page transition.
 *
 * Navigation in this app is genuinely instant — every route is in the same
 * bundle and nothing fetches on mount — so there is nothing to "load" between
 * pages. A spinner here would be theatre: it would sit on screen for a fixed
 * delay that exists only because we put it there, making a fast site feel
 * slower than it is.
 *
 * So: a progress bar that completes as quickly as the navigation actually
 * does, plus a short fade-and-rise on the incoming page. That's what reads as
 * premium — the polish is in the motion, not in the waiting.
 */
export function RouteProgress() {
  const { pathname } = useLocation();
  const [phase, setPhase] = useState("idle");  // idle | running | done
  const first = useRef(true);
  const timers = useRef([]);

  useEffect(() => {
    // Don't run on the very first render — that's the splash's job.
    if (first.current) { first.current = false; return; }

    timers.current.forEach(clearTimeout);
    setPhase("running");
    timers.current = [
      setTimeout(() => setPhase("done"), 240),
      setTimeout(() => setPhase("idle"), 640),
    ];
    return () => timers.current.forEach(clearTimeout);
  }, [pathname]);

  if (phase === "idle") return null;

  return (
    <div className="route-progress" aria-hidden="true">
      <span className={"route-progress-bar " + phase} />
    </div>
  );
}

/**
 * Keyed on pathname so the incoming page always remounts and replays its
 * entrance — including navigation between two pages that share a component,
 * like /autotrader-scraper → /carmax-scraper.
 */
export function RouteFade({ children }) {
  const { pathname } = useLocation();
  return <div className="route-fade" key={pathname}>{children}</div>;
}
