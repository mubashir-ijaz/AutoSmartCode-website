import { useEffect, useRef, useState } from "react";
import Photo from "./Photo";

/**
 * The extension pitch, shown rather than described.
 *
 * Dealers already know this shape of tool — they pay per seat, per month, for
 * something that reads the VIN off the auction page and drops the reports next
 * to it. The thing they do not know is that the same panel can be built once,
 * to their own workflow, with their own margin maths on it, and belong to them.
 *
 * So: a mock auction listing on the left, the panel filling in on the right,
 * one row at a time, in the order a buyer actually wants them. It loops.
 * All sample data — the caption says so and must keep saying so.
 */

const PANEL_ROWS = [
  { k: "VIN", v: "2T3W1RFV•••••••M", t: "mono" },
  { k: "Decoded", v: "2021 Toyota RAV4 XLE AWD 2.5L" },
  { k: "Title", v: "Clean — no brand", t: "ok" },
  { k: "Carfax", v: "0 accidents · 1 owner · 14 services", t: "ok" },
  { k: "AutoCheck", v: "92 / 100 — above class (78–86)", t: "ok" },
  { k: "Manheim MMR", v: "$21,850  ±$420", t: "num" },
  { k: "J.D. Power", v: "$22,150 clean trade", t: "num" },
  { k: "Galves", v: "$21,300 wholesale avg", t: "num" },
  { k: "Recon est.", v: "$600 — tyres, detail", t: "warn" },
  { k: "Your max bid", v: "$17,900 to hold 12%", t: "big" },
];

/* What the buyer would otherwise have open. Each one is a tab this closes. */
const TABS_REPLACED = [
  "Auction listing", "VIN decoder", "Carfax", "AutoCheck",
  "MMR lookup", "J.D. Power", "Galves", "Your margin sheet", "Notes doc",
];

export default function ExtensionDemo() {
  const [shown, setShown] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) setShown(PANEL_ROWS.length);
  }, []);

  useEffect(() => {
    if (reduced.current) return;
    /* Fill the panel, hold the complete state, then start over. */
    const done = shown >= PANEL_ROWS.length;
    const t = setTimeout(() => setShown(s => (done ? 0 : s + 1)), done ? 5000 : 420);
    return () => clearTimeout(t);
  }, [shown]);

  const complete = shown >= PANEL_ROWS.length;

  return (
    <div className="ext">
      <div className="ext-browser">

        {/* chrome */}
        <div className="ext-bar">
          <span className="ext-dots"><i /><i /><i /></span>
          <span className="ext-url">
            <span className="ext-lock">🔒</span>
            your-auction-portal.com/lot/A-104
          </span>
          <span className={"ext-icon " + (complete ? "lit" : "")} title="Your extension">🧩</span>
        </div>

        <div className="ext-stage">

          {/* the auction page underneath — deliberately plain, it's the backdrop */}
          <div className="ext-page">
            <Photo name="suv-lineup" className="ext-photo" alt="" />
            <div className="ext-lot">LOT A-104 · LANE 4 · 4:15 PM</div>
            <h4 className="ext-title">2021 Toyota RAV4 XLE AWD</h4>
            <div className="ext-specs">
              <span>41,208 mi</span><span>Grade 4.2</span><span>Dallas, TX</span>
            </div>
            <div className="ext-bid">
              <span className="ext-bidlabel">Current bid</span>
              <span className="ext-bidval">$17,400</span>
            </div>
            <div className="ext-plain">
              This is all the listing tells you. Everything else is in eight other tabs.
            </div>
          </div>

          {/* the panel the extension injects */}
          <div className="ext-panel">
            <div className="ext-phead">
              <span className="ext-pname">Your panel</span>
              <span className={"ext-pstatus " + (complete ? "done" : "")}>
                {complete ? "✓ complete" : "reading…"}
              </span>
            </div>

            <div className="ext-rows">
              {PANEL_ROWS.map((r, i) => (
                <div key={r.k} className={"ext-row " + (i < shown ? "on " : "") + (r.t || "")}>
                  <span className="ext-k">{r.k}</span>
                  <span className="ext-v">{i < shown ? r.v : <span className="ext-skel" />}</span>
                </div>
              ))}
            </div>

            <div className={"ext-verdict " + (complete ? "on" : "")}>
              {complete ? "BID — clears your margin" : " "}
            </div>
          </div>
        </div>
      </div>

      <div className="ext-side">
        <h3>One tab instead of nine</h3>
        <p>
          Scan or land on a car and the panel fills itself — VIN decoded, title checked,
          history pulled, every book value fetched, your own recon and margin maths run
          on top. The decision is on the screen you were already looking at.
        </p>

        <div className="ext-tabs">
          <span className="ext-tabslabel">Tabs this closes</span>
          <div className="ext-tablist">
            {TABS_REPLACED.map((t, i) => (
              <span key={t} className={"ext-tab " + (i === 0 ? "keep" : "cut")}>
                {i === 0 ? t : <s>{t}</s>}
              </span>
            ))}
          </div>
        </div>

        <ul className="ext-points">
          <li><strong>Built to your workflow</strong> — your fields, your order, your wording</li>
          <li><strong>Your own accounts</strong> — it uses the subscriptions you already pay for</li>
          <li><strong>No setup fee</strong> — $50 to $100 a month</li>
          <li><strong>Real time</strong> — data appears as you open each car, nothing to paste</li>
        </ul>
      </div>

      <p className="ext-caption">
        Sample panel — illustrative figures, not live data. Reports are pulled through
        your own dealer subscriptions.
      </p>
    </div>
  );
}
