import { Link } from "react-router-dom";
import "./Founder.css";

/**
 * The flipping coin — Sam's photo on one face, the logo on the other.
 * Everything scales off --coin-size, so the same disc works at 64px in a
 * page header and at 260px as a section centrepiece.
 */
export function FlipCoin({ size = 260, shadow = true }) {
  return (
    <div className="coin-stage" style={{ "--coin-size": size + "px" }} aria-hidden="true">
      <div className="coin">
        <div className="coin-face coin-front">
          <picture>
            <source srcSet={process.env.PUBLIC_URL + "/sam.webp"} type="image/webp" />
            <img
              src={process.env.PUBLIC_URL + "/sam.jpg"}
              alt=""
              width={size}
              height={size}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div className="coin-face coin-back">
          <img src={process.env.PUBLIC_URL + "/logo.svg"} alt="" width="110" height="110" />
          {size >= 150 && <span className="coin-back-name">AutoSmartCode</span>}
        </div>
      </div>
      {shadow && <div className="coin-shadow" />}
    </div>
  );
}

/** Page heading on the left, the coin and a one-line credit on the right. */
export function FounderHeader({ title, sub, line }) {
  return (
    <div className="founder-header">
      <div className="fh-text">
        <h1 className="s-title">{title}</h1>
        <p className="s-sub">{sub}</p>
      </div>
      <div className="fh-credit">
        <FlipCoin size={124} shadow={false} />
        <span className="fh-line"><strong>Sam</strong> · {line}</span>
      </div>
    </div>
  );
}

/**
 * Closing "about me" band. Each page passes its own copy — the same three
 * paragraphs repeated site-wide would be duplicate content, and would read
 * like boilerplate to anyone who visits more than one page.
 */
export function FounderNote({ eyebrow, title, children, cta = "Start your project →" }) {
  return (
    <section className="founder-note">
      <div className="container founder-note-wrap">
        <FlipCoin size={190} />

        <div className="fn-copy">
          <span className="fn-eyebrow">{eyebrow}</span>
          <h2 className="s-title">{title}</h2>
          {children}

          <div className="fn-sign">
            <div className="fn-sign-name">Sam</div>
            <div className="fn-sign-role">Founder &amp; CEO, AutoSmartCode</div>
          </div>

          <div className="fn-actions">
            <Link to="/#contact" className="btn btn-blue">{cta}</Link>
            <Link to="/about" className="btn btn-outline">More about me</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
