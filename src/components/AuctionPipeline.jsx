import { useEffect, useMemo, useRef, useState } from "react";
import { CarSilhouette, GradeDial } from "./CarArt";

/**
 * The homepage's auto-running explainer: what happens to a run list overnight.
 *
 * A dealer's objection is never "I don't believe software can read a website"
 * — it's "I don't understand what I'd be buying." So this animates the buyer's
 * own morning rather than any code: 5,000 cars in the sale, your filters, the
 * reports pulled per VIN, the notes written, the bad cars dropped, and the
 * watch list ready before anyone reaches the office. The funnel number
 * shrinking across the top is the whole pitch.
 *
 * Deliberately NOT styled as a terminal. An earlier version used mono type and
 * a console frame, which read as "developer tool" to an audience that does not
 * buy developer tools. Everything here is auction furniture instead: lot
 * numbers, lane badges, grade dials, vehicle silhouettes, margin figures.
 *
 * Six stages, looping. All sample data — the caption says so and must keep
 * saying so.
 */

/* The counts every stage reads from, so the funnel maths stays consistent.
   Sized to a mid-week wholesale sale rather than a headline number. */
const TOTAL = 5000;
const AFTER_FILTERS = 1840;
const WATCHLIST = 847;

const STAGES = [
  {
    key: "pull",
    label: "Run list pulled",
    sub: "Every car in the sale",
    detail:
      "The full run list, not the first page. Pulled overnight while the sale is " +
      "still being loaded, so nothing is missing by morning.",
  },
  {
    key: "filter",
    label: "Your filters applied",
    sub: "The buy box you set",
    detail:
      "Year, mileage, grade, make, title status, lane — whatever you told me " +
      "matters. Applied to all 5,000 the same way, with no fatigue on row 4,800.",
  },
  {
    key: "enrich",
    label: "Reports pulled per VIN",
    sub: "Title, history, MMR",
    detail:
      "Each surviving VIN gets the lookups you would do by hand, one at a time, " +
      "nine tabs deep. Pulled through your own accounts, in bulk, overnight.",
  },
  {
    key: "notes",
    label: "Notes written",
    sub: "In your own wording",
    detail:
      "Every car gets the note you would have typed: what is wrong with it, what " +
      "it is worth, what it needs. The same phrasing your desk already uses.",
  },
  {
    key: "drop",
    label: "Bad cars dropped",
    sub: "With the reason kept",
    detail:
      "Branded titles, accident counts, recon over your ceiling, MMR that does not " +
      "work. Dropped — but the reason is logged, so you can audit the call.",
  },
  {
    key: "ready",
    label: "Watch list ready",
    sub: "Before you reach the office",
    detail:
      "The cars worth your morning, already in the auction's own watch list, " +
      "already annotated, ranked by the margin that justifies the bid.",
  },
];

/* ---- stage 1: lots rolling through the lane ---- */
const LOTS = [
  { lot: "A-104", lane: "4", car: "2021 Toyota RAV4 XLE AWD", mi: "41,208", grade: 4.2, body: "suv" },
  { lot: "A-105", lane: "4", car: "2019 Honda CR-V EX", mi: "67,440", grade: 3.8, body: "suv" },
  { lot: "A-106", lane: "2", car: "2018 Ford F-150 XLT 4x4", mi: "88,910", grade: 3.1, body: "truck" },
  { lot: "B-012", lane: "7", car: "2022 Nissan Rogue SV", mi: "28,775", grade: 4.5, body: "suv" },
  { lot: "B-013", lane: "7", car: "2017 Chevrolet Malibu LT", mi: "104,220", grade: 2.4, body: "sedan" },
  { lot: "B-014", lane: "1", car: "2020 Subaru Outback Premium", mi: "52,018", grade: 4.0, body: "suv" },
  { lot: "C-221", lane: "3", car: "2016 Hyundai Sonata SE", mi: "131,660", grade: 1.9, body: "sedan" },
  { lot: "C-222", lane: "3", car: "2021 Mazda CX-5 Touring", mi: "38,402", grade: 4.3, body: "suv" },
];

/* ---- stage 2: the client's own filters, each with what it removes ---- */
const FILTERS = [
  { rule: "Year 2018 or newer", cut: 1418 },
  { rule: "Under 90,000 miles", cut: 942 },
  { rule: "Condition grade 3.0+", cut: 486 },
  { rule: "Clean title only", cut: 221 },
  { rule: "No announced frame damage", cut: 93 },
];

/* ---- stage 3: the lookups done per VIN ---- */
const LOOKUPS = [
  { name: "Title status", src: "state DMV brand check" },
  { name: "Carfax", src: "accidents · owners · service" },
  { name: "AutoCheck", src: "score vs class average" },
  { name: "Manheim MMR", src: "30-day wholesale, adjusted" },
  { name: "Book values", src: "J.D. Power · Galves · KBB" },
  { name: "Announcements", src: "seller disclosures, as-is flags" },
];

/* ---- stage 4: a note being written, exactly as it lands in the watch list ---- */
const NOTE_CAR = { lot: "A-104", car: "2021 Toyota RAV4 XLE AWD", mi: "41,208", grade: 4.2, body: "suv" };
const NOTE_TEXT =
  "Clean title, 1 owner, 0 accidents. AutoCheck 92 (class 78–86). " +
  "MMR 21,850 ± 420. Grade 4.2, no frame. Recon est. 600 — tyres, detail. " +
  "Max bid 17,900 to hold 12% → BID.";

/* ---- stage 5: the drops, with the reason kept ---- */
const DROPS = [
  { lot: "C-118", car: "2019 Jeep Cherokee Latitude", why: "Branded title — flood, Louisiana", body: "suv" },
  { lot: "D-307", car: "2020 Kia Sportage LX", why: "3 accidents on Carfax, 1 with airbag", body: "suv" },
  { lot: "B-241", car: "2018 BMW 330i xDrive", why: "Recon est. $3,400 — over your $1,500 ceiling", body: "sedan" },
  { lot: "A-066", car: "2021 Tesla Model 3 SR+", why: "Bids already $1,100 over MMR", body: "sedan" },
  { lot: "C-409", car: "2019 Ram 1500 Big Horn", why: "Odometer discrepancy declared", body: "truck" },
];

/* ---- stage 6: what is waiting in the watch list ---- */
const READY = [
  {
    lot: "A-104", lane: "4", car: "2021 Toyota RAV4 XLE AWD", mi: "41,208", grade: 4.2, body: "suv",
    margin: "+$3,900", pct: "22.4%", bid: "$17,900",
    note: "Clean · 1 owner · 0 accidents · AutoCheck 92",
  },
  {
    lot: "B-012", lane: "7", car: "2022 Nissan Rogue SV", mi: "28,775", grade: 4.5, body: "suv",
    margin: "+$2,640", pct: "16.1%", bid: "$19,200",
    note: "Clean · 1 owner · recon $350",
  },
  {
    lot: "C-222", lane: "3", car: "2021 Mazda CX-5 Touring", mi: "38,402", grade: 4.3, body: "suv",
    margin: "+$2,180", pct: "14.8%", bid: "$21,400",
    note: "Clean · 2 owners · minor rear bumper",
  },
  {
    lot: "B-014", lane: "1", car: "2020 Subaru Outback Premium", mi: "52,018", grade: 4.0, body: "suv",
    margin: "+$1,910", pct: "12.9%", bid: "$20,050",
    note: "Clean · 1 owner · AWD service done",
  },
];

/* How long each stage holds, in ms. The last holds longest — it is the payoff,
   and the only panel a skim-reader needs to have seen. */
const HOLD = { pull: 5200, filter: 5600, enrich: 5400, notes: 6400, drop: 5400, ready: 8000 };

const fmt = n => n.toLocaleString("en-US");

export default function AuctionPipeline() {
  const [stage, setStage] = useState(0);
  const [tick, setTick] = useState(0);   /* drives the per-stage reveals */
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* Reduced motion gets the finished payoff stage and no loop — the content
       is the point, the animation is decoration. */
    if (reduced.current) { setStage(STAGES.length - 1); setTick(99); }
  }, []);

  useEffect(() => {
    if (reduced.current) return;
    const t = setTimeout(() => {
      setStage(s => (s + 1) % STAGES.length);
      setTick(0);
    }, HOLD[STAGES[stage].key]);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (reduced.current) return;
    const t = setInterval(() => setTick(x => x + 1), 190);
    return () => clearInterval(t);
  }, [stage]);

  const key = STAGES[stage].key;

  const liveTotal = useMemo(
    () => (key === "pull" ? Math.min(TOTAL, Math.round((tick / 22) * TOTAL)) : TOTAL),
    [key, tick]
  );

  const funnel = [
    { label: "Cars in the sale", value: fmt(liveTotal), tone: "neutral", on: true },
    { label: "Match your filters", value: stage >= 1 ? fmt(AFTER_FILTERS) : "—", tone: "cut", on: stage >= 1 },
    { label: "In your watch list", value: stage >= 5 ? fmt(WATCHLIST) : "—", tone: "good", on: stage >= 5 },
  ];

  return (
    <div className="pipe">

      {/* ---------- funnel headline ---------- */}
      <div className="pipe-funnel">
        {funnel.map((f, i) => (
          <div key={f.label} className={`pf-cell ${f.tone} ${f.on ? "on" : ""}`}>
            <div className="pf-value">{f.value}</div>
            <div className="pf-label">{f.label}</div>
            {i < funnel.length - 1 && <span className="pf-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
        <div className="pf-clock">
          <span className={"pf-dot " + (key === "ready" ? "done" : "")} />
          {key === "ready" ? "06:00 — done before you are in" : "Running overnight…"}
        </div>
      </div>

      <div className="pipe-body">

        {/* ---------- stage rail ---------- */}
        <ol className="pipe-rail">
          {STAGES.map((s, i) => (
            <li key={s.key} className={"pr-step " + (i === stage ? "active" : i < stage ? "done" : "")}>
              <span className="pr-mark">{i < stage ? "✓" : String(i + 1).padStart(2, "0")}</span>
              <span className="pr-text">
                <span className="pr-label">{s.label}</span>
                <span className="pr-sub">{s.sub}</span>
              </span>
            </li>
          ))}
        </ol>

        {/* ---------- stage panel ---------- */}
        <div className="pipe-panel" key={key}>
          <div className="pp-head">
            <h3>{STAGES[stage].label}</h3>
            <p>{STAGES[stage].detail}</p>
          </div>

          {key === "pull" && (
            <div className="pp-lots">
              {LOTS.slice(0, Math.max(1, Math.min(LOTS.length, tick))).map(l => (
                <div key={l.lot} className="car-row">
                  <span className="car-thumb"><CarSilhouette body={l.body} /></span>
                  <span className="car-id">
                    <b>{l.lot}</b>
                    <em>Lane {l.lane}</em>
                  </span>
                  <span className="car-name">{l.car}</span>
                  <span className="car-odo">{l.mi} mi</span>
                  <span className="car-grade"><GradeDial grade={l.grade} size={30} /></span>
                </div>
              ))}
              <div className="pp-streaming">
                <span className="lane-pulse" />
                reading lot {fmt(Math.min(TOTAL, liveTotal + 1))} of {fmt(TOTAL)}…
              </div>
            </div>
          )}

          {key === "filter" && (
            <div className="pp-filters">
              <div className="pp-note">Set once by you. Changed any time, without touching code.</div>
              {FILTERS.map((f, i) => (
                <div key={f.rule} className={"pp-filter " + (tick > i ? "on" : "")}>
                  <span className="pp-check">✓</span>
                  <span className="pp-rule">{f.rule}</span>
                  <span className="pp-cut">{tick > i ? "− " + fmt(f.cut) + " cars" : ""}</span>
                </div>
              ))}
              <div className={"pp-total " + (tick > FILTERS.length ? "on" : "")}>
                {fmt(AFTER_FILTERS)} cars left to look at properly
              </div>
            </div>
          )}

          {key === "enrich" && (
            <div className="pp-enrich">
              <div className="pp-vin">
                <span className="car-thumb sm"><CarSilhouette body="suv" /></span>
                <span className="pp-vinwrap">
                  <span className="pp-vinlabel">Working VIN</span>
                  <span className="pp-vinno">2T3W1RFV•••••••M</span>
                </span>
                <span className="pp-vinlot">Lot A-104 · 2021 RAV4 XLE</span>
              </div>
              <div className="pp-lookups">
                {LOOKUPS.map((l, i) => {
                  const done = tick > i + 1;
                  const busy = tick === i + 1;
                  return (
                    <div key={l.name} className={"pp-lookup " + (done ? "done" : busy ? "busy" : "")}>
                      <span className="pp-lmark">{done ? "✓" : busy ? <span className="lane-pulse" /> : "·"}</span>
                      <span className="pp-lname">{l.name}</span>
                      <span className="pp-lsrc">{l.src}</span>
                    </div>
                  );
                })}
              </div>
              <div className="pp-progress">
                <div className="pp-bar"><span style={{ width: Math.min(100, tick * 9) + "%" }} /></div>
                <span className="pp-barlabel">
                  {fmt(Math.min(AFTER_FILTERS, Math.round(tick * 0.09 * AFTER_FILTERS)))} of {fmt(AFTER_FILTERS)} VINs enriched
                </span>
              </div>
            </div>
          )}

          {key === "notes" && (
            <div className="pp-notes">
              <div className="car-row static">
                <span className="car-thumb"><CarSilhouette body={NOTE_CAR.body} /></span>
                <span className="car-id"><b>{NOTE_CAR.lot}</b></span>
                <span className="car-name">{NOTE_CAR.car}</span>
                <span className="car-odo">{NOTE_CAR.mi} mi</span>
                <span className="car-grade"><GradeDial grade={NOTE_CAR.grade} size={30} /></span>
              </div>
              <div className="pp-notepad">
                <span className="pp-notelabel">Note</span>
                <span className="pp-notetext">{NOTE_TEXT.slice(0, Math.round(tick * 9))}</span>
                <span className="caret" />
              </div>
              <div className="pp-noteexplain">
                Written to the format your desk already reads — title, owners, history,
                MMR, grade, recon, then the max bid that holds your margin. Nobody has
                to translate it at 7 AM.
              </div>
            </div>
          )}

          {key === "drop" && (
            <div className="pp-drops">
              {DROPS.map((d, i) => (
                <div key={d.lot} className={"car-row dropped " + (tick > i ? "on" : "")}>
                  <span className="car-thumb"><CarSilhouette body={d.body} /></span>
                  <span className="car-id"><b>{d.lot}</b></span>
                  <span className="car-name">{d.car}</span>
                  <span className="pp-dwhy">{d.why}</span>
                  <span className="pp-dmark" aria-hidden="true">✕</span>
                </div>
              ))}
              <div className={"pp-dropsum " + (tick > DROPS.length ? "on" : "")}>
                {fmt(AFTER_FILTERS - WATCHLIST)} cars dropped — every one with its reason
                kept, so you can check the call rather than trust it.
              </div>
            </div>
          )}

          {key === "ready" && (
            <div className="pp-ready">
              <div className="pp-readyhead">
                <span className="pp-badge">★ Watch list · {fmt(WATCHLIST)} cars</span>
                <span className="pp-readynote">ranked by margin · notes attached · ready at 06:00</span>
              </div>
              {READY.map((r, i) => (
                <div key={r.lot} className={"car-row won " + (tick > i ? "on" : "")}>
                  <span className="car-thumb"><CarSilhouette body={r.body} /></span>
                  <span className="car-id">
                    <b>{r.lot}</b>
                    <em>Lane {r.lane}</em>
                  </span>
                  <span className="car-main">
                    <span className="car-name">{r.car}</span>
                    <span className="car-note">{r.note}</span>
                  </span>
                  <span className="car-grade"><GradeDial grade={r.grade} size={30} /></span>
                  <span className="car-money">
                    <b>{r.margin}</b>
                    <em>{r.pct} · max {r.bid}</em>
                  </span>
                </div>
              ))}
              <div className={"pp-readyfoot " + (tick > READY.length ? "on" : "")}>
                + {fmt(WATCHLIST - READY.length)} more, same treatment — sitting in the
                auction's own watch list, so you log in and they are already there.
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="pipe-caption">
        Sample run — figures are illustrative, not live auction data. Everything is
        pulled through your own dealer accounts.
      </p>
    </div>
  );
}
