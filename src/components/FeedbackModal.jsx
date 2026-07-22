import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { APPS_SCRIPT_URL, CONTACT_EMAIL } from "../config";
import "./FeedbackModal.css";

/* Any component can open the rate-us popup via useFeedback().open() */
const FeedbackContext = createContext({ open: () => {} });
export const useFeedback = () => useContext(FeedbackContext);

const STAR_WORDS = ["", "Not good", "Could be better", "Decent", "Really good", "Excellent"];

function RateForm({ onDone }) {
  const [form, setForm] = useState({ name: "", company: "", role: "", email: "", message: "" });
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  async function submit() {
    if (!form.name || !form.message) {
      setStatus({ type: "error", text: "Please add your name and your feedback." });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const date = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
      // formType lets the Apps Script route this to the Feedback sheet
      const params = new URLSearchParams({ ...form, rating: String(rating), formType: "feedback", date });
      await fetch(APPS_SCRIPT_URL + "?" + params.toString(), { method: "GET", mode: "no-cors" });
      setStatus({ type: "success", text: "Thank you — your feedback came through. I read every one personally." });
      setForm({ name: "", company: "", role: "", email: "", message: "" });
      setRating(5);
      setTimeout(onDone, 1800);
    } catch (err) {
      window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=Feedback from " + form.name +
        "&body=" + encodeURIComponent(form.message);
      setStatus({ type: "success", text: "Opening your email client..." });
    }
    setLoading(false);
  }

  return (
    <>
      <div className="form-group">
        <label>How was the experience?</label>
        <div className="star-row" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={n + " star" + (n > 1 ? "s" : "")}
              className={"star " + (n <= (hover || rating) ? "on" : "")}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </button>
          ))}
          <span className="star-count">{STAR_WORDS[hover || rating]}</span>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Your Name *</label>
          <input value={form.name} onChange={set("name")} placeholder="John Smith" />
        </div>
        <div className="form-group">
          <label>Company / Business</label>
          <input value={form.company} onChange={set("company")} placeholder="Your company" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Role &amp; Location</label>
          <input value={form.role} onChange={set("role")} placeholder="Car Dealer, Texas" />
        </div>
        <div className="form-group">
          <label>Email (not published)</label>
          <input type="email" value={form.email} onChange={set("email")} placeholder="you@company.com" />
        </div>
      </div>

      <div className="form-group">
        <label>Your Feedback *</label>
        <textarea
          value={form.message}
          onChange={set("message")}
          rows={4}
          placeholder="What did I build for you, and how is it working out?"
        />
      </div>

      <button className="form-btn" onClick={submit} disabled={loading}>
        {loading ? "Sending..." : "Submit Feedback ★"}
      </button>

      {status && <div className={"form-msg " + status.type}>{status.type === "success" ? "✅" : "⚠️"} {status.text}</div>}

      <p className="form-consent">
        By submitting, you're happy for your first name, role and comment to be shown
        on this site. Your email is never published — it goes to {CONTACT_EMAIL}.
      </p>
    </>
  );
}

export function FeedbackProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock the page behind the modal and let Esc dismiss it.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = e => { if (e.key === "Escape") close(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <FeedbackContext.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div className="rate-overlay" onClick={close} role="presentation">
          <div
            className="rate-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Rate AutoSmartCode"
            onClick={e => e.stopPropagation()}
          >
            <button className="rate-close" onClick={close} aria-label="Close">×</button>
            <div className="rate-head">
              <h3>How did it go?</h3>
              <p>Takes about 30 seconds and comes straight to me — nothing automated.</p>
            </div>
            <div className="rate-body">
              <RateForm onDone={close} />
            </div>
          </div>
        </div>
      )}
    </FeedbackContext.Provider>
  );
}
