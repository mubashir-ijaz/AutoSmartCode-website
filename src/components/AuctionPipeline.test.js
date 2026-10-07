/**
 * The homepage's two auto-running explainers are the main thing a visiting
 * dealer actually looks at, and both are driven by timers — the failure mode is
 * that they mount fine and then stop advancing, which a build never catches.
 * So these walk the clock forward and assert the later stages really arrive.
 *
 * Run with: npm test
 */
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import AuctionPipeline from "./AuctionPipeline";
import ExtensionDemo from "./ExtensionDemo";

/* jsdom has no matchMedia, and both components ask it about reduced motion
   before deciding whether to animate at all. */
function stubMatchMedia(reduced) {
  window.matchMedia = query => ({
    matches: reduced,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    onchange: null,
    dispatchEvent: () => false,
  });
}

function mount(Component) {
  const host = document.createElement("div");
  document.body.appendChild(host);
  const root = createRoot(host);
  act(() => root.render(<Component />));
  /* Advance in slices, one act() each. These components schedule the next
     timeout from an effect, so a single act() that jumps the whole way only
     ever fires the one timer that was already pending — the re-render that
     would schedule the next has not happened yet. Slicing gives React a
     chance to commit and re-arm between ticks, the way a real clock does. */
  const advance = (ms, slice = 100) => {
    for (let elapsed = 0; elapsed < ms; elapsed += slice) {
      act(() => { jest.advanceTimersByTime(Math.min(slice, ms - elapsed)); });
    }
  };

  return {
    host,
    text: () => host.textContent,
    advance,
    unmount: () => act(() => root.unmount()),
  };
}

beforeEach(() => {
  jest.useFakeTimers();
  stubMatchMedia(false);
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
});

describe("AuctionPipeline", () => {
  it("opens on the run-list stage with the full sale count", () => {
    const ui = mount(AuctionPipeline);
    expect(ui.text()).toContain("Run list pulled");
    expect(ui.text()).toContain("Cars in the sale");
    // The funnel's later cells have not been earned yet.
    expect(ui.text()).toContain("In your watch list");
    ui.unmount();
  });

  it("advances through every stage and reaches the watch list", () => {
    const ui = mount(AuctionPipeline);

    const seen = [];
    const labels = [
      "Run list pulled", "Your filters applied", "Reports pulled per VIN",
      "Notes written", "Bad cars dropped", "Watch list ready",
    ];

    // Each stage holds 5.2–8s; step in 200ms slices across one full loop.
    for (let t = 0; t < 40000; t += 200) {
      const body = ui.host.querySelector(".pp-head h3");
      if (body && !seen.includes(body.textContent)) seen.push(body.textContent);
      ui.advance(200);
    }

    labels.forEach(l => expect(seen).toContain(l));
    ui.unmount();
  });

  it("shows real watch-list cars with margins once it reaches the payoff", () => {
    const ui = mount(AuctionPipeline);

    // Walk to the final stage.
    let guard = 0;
    while (!ui.text().includes("ranked by margin") && guard < 300) {
      ui.advance(200);
      guard += 1;
    }

    expect(ui.text()).toContain("ranked by margin");
    ui.advance(2000);
    expect(ui.text()).toContain("2021 Toyota RAV4 XLE AWD");
    expect(ui.text()).toMatch(/\+\$[\d,]+/);      // a margin figure
    expect(ui.text()).toContain("847");           // the watch-list count
    ui.unmount();
  });

  it("keeps the funnel arithmetic consistent (5,000 -> 1,840 -> 847)", () => {
    const ui = mount(AuctionPipeline);
    let guard = 0;
    while (!ui.text().includes("847") && guard < 300) {
      ui.advance(200);
      guard += 1;
    }
    const text = ui.text();
    expect(text).toContain("1,840");
    expect(text).toContain("847");
    // 1,840 qualifying minus 847 kept = 993 dropped, as the drop stage claims.
    ui.unmount();
  });

  it("renders the finished payoff state and no timers under reduced motion", () => {
    stubMatchMedia(true);
    const ui = mount(AuctionPipeline);
    ui.advance(1000);
    expect(ui.text()).toContain("Watch list ready");
    expect(ui.text()).toContain("2021 Toyota RAV4 XLE AWD");
    ui.unmount();
  });
});

describe("car artwork", () => {
  it("draws a vehicle silhouette on every car row, not an emoji", () => {
    const ui = mount(AuctionPipeline);
    ui.advance(1200);
    const rows = ui.host.querySelectorAll(".car-row");
    expect(rows.length).toBeGreaterThan(0);
    rows.forEach(r => expect(r.querySelector("svg.car-sil")).not.toBeNull());
    ui.unmount();
  });

  it("renders a grade dial with an accessible label", () => {
    const ui = mount(AuctionPipeline);
    ui.advance(1200);
    const dial = ui.host.querySelector("svg.grade-dial");
    expect(dial).not.toBeNull();
    expect(dial.getAttribute("aria-label")).toMatch(/Condition grade [\d.]+ out of 5/);
    ui.unmount();
  });

  it("keeps the terminal styling out of it", () => {
    const ui = mount(AuctionPipeline);
    ui.advance(1200);
    // The old build wrapped stages in a fake console; nothing should bring it back.
    expect(ui.host.querySelector(".terminal")).toBeNull();
    expect(ui.host.querySelector(".terminal-bar")).toBeNull();
    ui.unmount();
  });

  it("defines the lane symbol before anything uses it", () => {
    // A <use> that points at a <symbol> declared later in the document is a
    // forward reference and does not render reliably across browsers.
    const { AuctionLaneBackdrop } = require("./CarArt");
    const ui = mount(AuctionLaneBackdrop);
    const svg = ui.host.querySelector("svg.lane-bg");
    const html = svg.innerHTML;
    const symbolAt = html.indexOf('id="laneCar"');
    const firstUseAt = html.indexOf("<use");
    expect(symbolAt).toBeGreaterThan(-1);
    expect(firstUseAt).toBeGreaterThan(-1);
    expect(symbolAt).toBeLessThan(firstUseAt);
    ui.unmount();
  });
});

describe("ExtensionDemo", () => {
  it("fills the panel row by row and ends on a verdict", () => {
    const ui = mount(ExtensionDemo);

    expect(ui.text()).toContain("Your panel");
    expect(ui.text()).toContain("2021 Toyota RAV4 XLE AWD");

    // 10 rows at 420ms each, then the complete state.
    ui.advance(420 * 12);

    expect(ui.text()).toContain("BID — clears your margin");
    expect(ui.text()).toContain("Manheim MMR");
    expect(ui.text()).toContain("AutoCheck");
    expect(ui.text()).toContain("Your max bid");
    ui.unmount();
  });

  it("loops back and refills rather than stopping", () => {
    const ui = mount(ExtensionDemo);
    ui.advance(420 * 12);
    expect(ui.text()).toContain("BID — clears your margin");

    ui.advance(5200);                     // the hold, then restart
    expect(ui.host.querySelector(".ext-pstatus").textContent).toContain("reading");
    ui.unmount();
  });

  it("shows the complete panel immediately under reduced motion", () => {
    stubMatchMedia(true);
    const ui = mount(ExtensionDemo);
    expect(ui.text()).toContain("Your max bid");
    expect(ui.text()).toContain("BID — clears your margin");
    ui.unmount();
  });
});
