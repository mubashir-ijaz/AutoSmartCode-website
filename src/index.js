import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode><App /></React.StrictMode>);

/**
 * Dismiss the splash (public/index.html) as soon as the app has actually
 * painted — never on a timer. The minimum is only long enough for the logo's
 * "scattered data resolves into a row" animation to complete; on a fast
 * connection the app is ready well before that, and on a slow one the splash
 * covers real work rather than padding.
 */
const MIN_VISIBLE = 1150;   // matches the mark's animation in index.html
const EXIT = 500;           // matches .asc-pre-done

const splash = document.getElementById("asc-preloader");
if (splash) {
  const started = window.performance?.now?.() ?? 0;
  const dismiss = () => {
    const elapsed = (window.performance?.now?.() ?? 0) - started;
    window.setTimeout(() => {
      splash.classList.add("asc-pre-done");
      window.setTimeout(() => splash.remove(), EXIT);
    }, Math.max(0, MIN_VISIBLE - elapsed));
  };
  // Two frames after mount: React has committed and the browser has painted.
  requestAnimationFrame(() => requestAnimationFrame(dismiss));
}
