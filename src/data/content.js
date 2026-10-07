export const blogs = [
  {
    id: 1,
    slug: "what-is-web-scraping",
    tag: "Web Scraping",
    emoji: "🕷️",
    color: "linear-gradient(135deg, #0a1f33 0%, #07242c 100%)",
    metaTitle: "What Is Web Scraping? Dealer Guide",
    title: "What Is Web Scraping? A Plain-English Guide for Car Dealers",
    summary: "No code, no jargon. What scraping is, how it turns an auction run list or a listings page into a spreadsheet, and what it can and cannot do for a dealership.",
    keywords: ["what is web scraping", "web scraping explained", "web scraping for dealers", "how does web scraping work", "scraping beginners guide", "data extraction explained"],
    date: "June 10, 2025",
    readTime: "8 min read",
    content: `
## What Is Web Scraping?

Web scraping is the automated process of extracting data from websites. Instead of manually copying information from a webpage, a web scraper (a program or script) visits the page automatically, reads the HTML content, and pulls out the specific data you need — prices, names, emails, listings, reviews, and more.

Think of it like this: if you wanted to know what every 2021 RAV4 within 300 miles was listed at, you could open twenty dealer sites every morning and write the prices down — or you could build a scraper that does it automatically and emails you the list before you get in.

## How Does Web Scraping Work?

The process has three basic steps:

**1. Send a request to the website**
The scraper acts like a browser and visits the URL you want to scrape.

**2. Parse the HTML**
The scraper reads the page's HTML code and identifies the elements that contain the data you want (prices, titles, emails, etc.).

**3. Extract and save the data**
The scraper pulls out the data and saves it as a structured file — Excel, CSV, JSON, or directly into a database.

## What Can Be Scraped?

Almost anything on a public webpage can be scraped:

- **Auction run lists** — Manheim, ADESA, ACV, OPENLANE, private dealer portals
- **Vehicle history data** — Carfax and AutoCheck through your own dealer account
- **Market values** — Manheim MMR, J.D. Power, Galves, Black Book
- **Retail listings** — AutoTrader, CarMax, Cars.com, CarGurus, AutoScout24
- **News and articles** — Any news website
- **Car auction data** — Manheim, BacklotCars, Autoniq
- **Social media data** — Public posts and profiles

## Why Do Businesses Use Web Scraping?

### Working an Auction Run List
A mid-week wholesale sale runs three to five thousand cars and a buyer has about two hours. Software reads the whole list overnight, applies the dealer's filters, and leaves only the cars worth bidding on.

### Vehicle History Reports in Bulk
Pulling Carfax or AutoCheck one VIN at a time is fine for ten cars and impossible for a thousand. Automation runs the whole list through the dealer's own account and returns a spreadsheet instead of a folder of PDFs.

### Pricing Against the Live Market
Book values lag. Dealers pull Manheim MMR, J.D. Power and Galves per VIN and compare them against what cars are actually selling for this week, rather than what a guide printed last month.

### Watching Competitor Inventory
Retail listings on AutoTrader, CarMax, Cars.com and CarGurus are public. Tracking them daily shows what the dealership down the road is asking, what is sitting, and what is moving.

## Is Web Scraping Legal?

Scraping publicly available data is generally legal in most countries. However, there are important rules:

- Never scrape data behind a login without permission
- Always respect a website's robots.txt file
- Don't use scraped data to harm individuals
- Check the website's Terms of Service

## Tools Used for Web Scraping

Professional scrapers use tools like:
- **Python + BeautifulSoup** — for simple static pages
- **Selenium or Playwright** — for pages that load with JavaScript
- **Scrapy** — for large-scale scraping projects
- **undetected-chromedriver** — for bypassing anti-bot systems

## How AutoSmartCode Can Help You

I build scraping and automation systems for car dealers, wholesalers and auction buyers — Manheim, ADESA, ACV, OPENLANE, Carfax, AutoCheck, the retail listing sites, and the private portals nobody outside your region has heard of. Whether it is one sale or every sale, every week, I can build it, test it and deliver clean data on time.

**Ready to automate your data collection?** Contact me and describe what you need — I'll give you a free quote within 24 hours.
    `
  },
  {
    id: 2,
    slug: "is-web-scraping-legal",
    tag: "Legal Guide",
    emoji: "⚖️",
    color: "linear-gradient(135deg, #14183a 0%, #101c33 100%)",
    metaTitle: "Is Scraping Vehicle Data Legal?",
    title: "Is Scraping Auction and Vehicle Data Legal? What Dealers Need to Know",
    summary: "Public data, logged-in auction portals, history reports and terms of service — where the lines actually fall for a dealer automating their own accounts.",
    keywords: ["is web scraping legal", "is scraping auction data legal", "car data scraping legal", "scraping terms of service", "legal to scrape vehicle data", "dealer data scraping law"],
    date: "July 2, 2025",
    readTime: "9 min read",
    content: `
## The Short Answer

Scraping **publicly available data** — information any visitor can see without logging in — is generally legal in the United States. Scraping data behind a login, ignoring explicit legal notices, or collecting personal data without a lawful basis is where businesses get into trouble.

This article is a practical guide, not legal advice. For a specific project with real money on the line, talk to an attorney. But after 1000+ scraping projects for US clients, I can tell you where the lines usually sit.

## What the Courts Have Actually Said

### hiQ Labs v. LinkedIn

This is the case everyone cites. hiQ scraped public LinkedIn profiles; LinkedIn tried to block them under the Computer Fraud and Abuse Act (CFAA), the US anti-hacking law.

The courts sided largely with hiQ: scraping data that is **publicly visible without authentication** does not count as "unauthorized access" under the CFAA. You cannot hack into something that has no lock on it.

### Van Buren v. United States

The Supreme Court narrowed the CFAA further, holding that the law targets people who access areas of a system they are not entitled to enter — not people who misuse data they were allowed to see.

**The practical takeaway:** no login wall, no CFAA problem in most cases.

## The Four Things That Actually Create Risk

### 1. Scraping behind a login

The moment you create an account, accept Terms of Service, and then scrape, you have entered a contract and may be breaching it. This shifts the analysis from "hacking law" to "contract law" — and contract claims are much easier to win.

### 2. Personal data

Names, emails, phone numbers, and addresses of **individuals** are regulated by GDPR (if any EU residents are involved), CCPA/CPRA (California), and a growing list of US state laws. Business contact data is treated more leniently than consumer data, but "publicly available" does not automatically mean "free to process however you like."

### 3. Copyrighted content

Facts are not copyrightable. Prices, addresses, ratings, specifications — these are facts. But republishing whole articles, photos, or creative descriptions verbatim is a copyright issue regardless of how you obtained them.

### 4. Server load

Hammering a site with thousands of requests per second can cause real damage, and damage is what turns a civil dispute into something worse. Responsible scrapers rate-limit.

## What Responsible Scraping Looks Like

- **Respect robots.txt** — it is not legally binding in most jurisdictions, but ignoring it undermines any good-faith argument you might need later
- **Rate limit every request** — a few requests per second, not a few hundred
- **Identify your scraper** where practical, with a real user agent
- **Only collect what you need** — do not hoover up personal fields you have no use for
- **Store data securely** and delete it when the project ends
- **Never scrape behind a paywall or login** without written permission from the site owner
- **Do not resell scraped personal data** without a compliance review

## Industry-by-Industry Reality Check

**Competitor inventory tracking** — Very well established. Published asking prices on a dealer's own website are public facts. Low risk.

**Auction portals behind a login** — A different case, because you agreed terms to get the account. The workable position is automating your own licensed account at a sane request rate, doing what you are already entitled to do. Moderate risk, and it rests on the account being genuinely yours.

**Retail vehicle listings** — Public listing data is widely scraped. The dealer's own photos and written descriptions are the copyrighted parts; stick to the facts — VIN, price, mileage, trim, days listed.

**Auction and wholesale platforms** — Almost always behind a login. This is the one area where you genuinely need your own credentials and, ideally, permission. Many dealers scrape platforms they personally pay for, which is a very different posture from scraping someone else's account.

**Social media** — Highest risk category. Aggressive Terms of Service, heavy personal data, active enforcement.

## How I Handle This With Clients

Every project I take on starts with three questions:

1. Is this data publicly accessible without a login? If not, do you have your own authorized account?
2. Does the data include personal information about individuals, or only businesses?
3. What will the data actually be used for?

If the answers point somewhere uncomfortable, I say so before we start rather than after. A scraper that gets you sued is not a good scraper, no matter how clean the output.

## Get a Straight Answer About Your Project

Describe what you want to collect and what you plan to do with it. I will tell you honestly whether it is a straightforward build, whether it needs care, or whether you should not do it at all.

[Send me a message](/#contact) for a free assessment within 24 hours.
    `
  },
  {
    id: 3,
    slug: "how-much-does-web-scraping-cost",
    tag: "Pricing",
    emoji: "💰",
    color: "linear-gradient(135deg, #2b1e08 0%, #2a1608 100%)",
    metaTitle: "What Dealer Data Automation Costs",
    title: "What Auction and Dealer Data Automation Actually Costs in 2026",
    summary: "Real prices for run-list triage, bulk history reports, custom VIN extensions and inventory feeds. What drives the number up, and what a fair quote looks like.",
    keywords: ["web scraping cost", "car auction data cost", "dealer automation pricing", "how much does a scraper cost", "custom scraper price", "auction software cost dealers"],
    date: "June 24, 2025",
    readTime: "8 min read",
    content: `
## Why Nobody Gives You a Straight Price

Ask five developers what a scraper costs and you will get five wildly different answers, because "web scraping" covers everything from a 40-line script that pulls one table to a distributed system that processes millions of pages a day behind rotating proxies.

So instead of a single number, here is the honest breakdown of what drives cost — and realistic ranges for each tier.

## The Four Things That Set the Price

### 1. How hard is the site to access?

This is the single biggest cost driver.

- **Static HTML, no protection** — cheapest. The data is right there in the page source.
- **JavaScript-rendered** — needs a real browser (Selenium/Playwright), which is slower and heavier.
- **Anti-bot protected** — Cloudflare, PerimeterX, DataDome. Needs stealth browsers, proxy rotation, and ongoing maintenance.
- **Login required** — needs session and cookie management, plus a plan for when sessions expire.

### 2. How much data?

Scraping 500 products is a script. Scraping 5 million is an architecture — concurrency, retry queues, deduplication, storage, and error recovery all become real engineering problems.

### 3. One-time or ongoing?

A one-time data pull is a fixed deliverable. An ongoing system needs hosting, scheduling, monitoring, and repair whenever the target site changes its layout — which it will.

### 4. What shape does the output need to be in?

A raw CSV dump is free. A cleaned, deduplicated, validated Excel file with calculated fields, or a live API your team can query, is real additional work.

## Realistic Price Ranges

### Tier 1 — Simple one-time scrape: $80 – $300
A single site, static or lightly dynamic, a few thousand records, delivered as Excel or CSV. Turnaround: 1–2 days.

*Example: 3,000 product listings with title, price, rating and URL from a single category.*

### Tier 2 — Standard project: $300 – $1,000
Multiple pages or categories, JavaScript rendering, moderate anti-bot handling, cleaning and deduplication included. Turnaround: 2–5 days.

*Example: one auction sale of ~5,000 lots triaged against your buy box, with Carfax, AutoCheck and MMR pulled on every surviving VIN.*

### Tier 3 — Complex or automated system: $1,000 – $5,000
Heavy anti-bot protection, login sessions, large volumes, scheduled runs, email or dashboard delivery, error alerting. Turnaround: 1–3 weeks.

*Example: a daily car auction pipeline that scrapes four platforms, looks up MMR values, calculates margins, and emails a ranked deal list every morning.*

### Tier 4 — Enterprise scale: $5,000+
Millions of records, distributed infrastructure, proxy budgets, database integration, SLAs. Scoped individually.

### Ongoing maintenance: $50 – $400 / month
Websites change. A scraper that worked perfectly in March breaks in June because a class name changed. Maintenance covers monitoring, fixes, and hosting.

## The Costs Nobody Mentions Upfront

**Proxies.** Serious scraping at volume needs residential proxies, which are billed per gigabyte. This can quietly become the largest line item on a large project — budget $50–$500/month depending on scale.

**CAPTCHA solving.** Automated solving services cost roughly $1–$3 per thousand solves. Small on a small job, meaningful at scale.

**Hosting.** A scheduled scraper needs to run somewhere. A small VPS is $5–$20/month; heavier browser-based jobs need more.

**Re-runs.** If the data needs to be fresh weekly, that is 52 runs a year, not one.

## Buy vs Build vs Hire

**No-code tools** ($50–$200/month) work well for simple, unprotected sites and small volumes. They fall over on anti-bot systems and awkward pagination, and you are still the one operating them.

**Hiring in-house** costs a US developer salary and only makes sense if scraping is core to your product.

**Hiring a specialist** gets you a working system for a fixed price, without hiring, and without you learning Selenium. This is the right answer for most small and mid-sized businesses.

## How to Get an Accurate Quote Fast

Send these four things and any competent developer can price your job in a day:

1. The exact URLs you want scraped
2. The specific fields you need from each page
3. Roughly how many records
4. One-time, or how often it should re-run

Vague requests get vague quotes. Specific requests get accurate ones.

## Get Your Free Quote

Send me your URLs and field list. I will tell you which tier your project falls into, what it will cost, and how long it will take — usually within 24 hours, with no obligation.

[Send me a message](/#contact) to get started.
    `
  },
  {
    id: 4,
    slug: "automate-manheim-mmr",
    tag: "Car Dealers",
    emoji: "🚗",
    color: "linear-gradient(135deg, #062a1f 0%, #062629 100%)",
    metaTitle: "How to Automate Manheim MMR Checks",
    title: "How to Automate Manheim MMR Price Checks (Without Breaking Your Account)",
    summary: "Checking MMR one VIN at a time does not scale past a few dozen cars. How to pull Manheim Market Report values in bulk, safely, through your own dealer login.",
    keywords: ["automate manheim mmr", "manheim mmr lookup", "bulk mmr check", "mmr automation dealers", "manheim market report api", "mmr price check tool", "automate mmr lookups"],
    date: "May 22, 2025",
    readTime: "7 min read",
    content: `
## The Problem Every Used Car Dealer Faces

If you're a used car dealer, you know the pain: checking Manheim MMR prices manually for dozens of vehicles every day is exhausting, time-consuming, and means you're always reacting instead of getting ahead of deals.

The dealers making the most money right now are the ones who find profitable vehicles **before** their competitors — and that requires automation.

## What Is Manheim MMR?

Manheim Market Report (MMR) is the industry standard for wholesale vehicle valuation. It shows you what similar vehicles are actually selling for at auction right now — not what the sticker price says, but the real transaction price.

When you find a vehicle at auction priced **below** its MMR value, that's a profit opportunity. The challenge is finding those deals fast, across hundreds of listings, every single day.

## What Automation Looks Like

An automated car dealer system does the following every morning without any manual work:

1. **Scrapes active auction listings** from BacklotCars, Autoniq, ADESA, and other platforms
2. **Looks up the MMR value** for each vehicle automatically
3. **Calculates the profit margin** (MMR value minus auction price)
4. **Filters out low-margin vehicles** based on your minimum threshold
5. **Sends you an email** with only the profitable vehicles, sorted by highest margin first

By the time you drink your morning coffee, your inbox has a clean list of today's best deals — ready to bid on.

## Real Results From a Client

I built this exact system for a used car dealer in New York. Before automation, their team spent 3–4 hours every morning manually checking prices on multiple platforms. They were constantly missing deals because competitors were faster.

After the automation:
- **Time saved: 8+ hours per week**
- **Deals found: 3x more profitable vehicles spotted**
- **Response time: From hours to minutes**
- **ROI: Paid for itself in the first week**

## What Platforms Can Be Automated?

- **Manheim MMR** — live market valuations
- **BacklotCars** — active auction listings
- **Autoniq** — vehicle history and pricing
- **ADESA** — auction inventory
- **EdgePipeline** — dealer-to-dealer marketplace
- **CarMax** — retail pricing reference
- **Facebook Marketplace** — private seller vehicles

## A Note on Accounts and Access

These platforms sit behind a login, which means automation runs on **your own dealer credentials** — the same account you already pay for and log into by hand today. The system simply does the clicking for you. It does not create accounts, share access, or reach anything you are not already entitled to see.

## How to Get Started

You don't need to know how to code. You just need to tell me:

1. Which platforms you use
2. What vehicle types you focus on (year, make, model ranges)
3. Your minimum profit margin threshold
4. How you want to receive alerts (email, text, dashboard)

I build the system, test it, and hand it to you running. Most setups take 3–5 days.

[Send me a message](/#contact) and let's talk about automating your dealership's sourcing process.
    `
  },
  {
    id: 9,
    slug: "bypass-captcha-anti-bot-scraping",
    tag: "Technical",
    emoji: "🛡️",
    color: "linear-gradient(135deg, #0a1f33 0%, #14183a 100%)",
    metaTitle: "Why Your Scraper Keeps Getting Blocked",
    title: "Why Your Auction Scraper Keeps Getting Blocked (And How to Fix It)",
    summary: "Rate limits, fingerprinting, session expiry and CAPTCHA walls are why overnight jobs die quietly. What actually causes blocks, and what fixes them.",
    keywords: ["scraper getting blocked", "bypass anti bot scraping", "scraper captcha problem", "auction site blocking scraper", "scraping rate limits", "session expiry scraper"],
    date: "May 5, 2025",
    readTime: "10 min read",
    content: `
## Your Scraper Worked on Monday. It's Blocked on Thursday.

This is the single most common message I get. Someone builds a scraper with Requests or Selenium, it runs beautifully for a few days, and then it starts returning CAPTCHAs, empty pages, or 403 errors.

The site did not necessarily change. Your scraper simply accumulated enough signals for the detection system to make up its mind.

Here is what those signals actually are, in rough order of how often they cause the problem.

## 1. Request Rate and Rhythm

Humans browse irregularly. They read a page for eleven seconds, then four, then ninety. A default scraper fires requests every 0.4 seconds, forever, with machine precision.

**The fix:** randomised delays with a realistic distribution — not "sleep(1)" but "sleep(uniform(2, 7))", plus occasional longer pauses. Slower scraping that finishes is infinitely faster than aggressive scraping that gets banned on page 300.

## 2. Browser Fingerprinting

Modern anti-bot systems run JavaScript in your browser and collect dozens of properties: canvas rendering output, WebGL vendor strings, installed fonts, screen dimensions, timezone, hardware concurrency, and audio context behaviour.

Plain Selenium leaks its identity immediately — most notably through the "navigator.webdriver" flag, which is set to "true" by default and is the first thing every detection script checks.

**The fix:** stealth-patched browsers. "undetected-chromedriver" for Python, or "playwright-stealth", patch the most obvious tells. They are not magic, but they clear the low bar that catches 80% of naive scrapers.

## 3. TLS Fingerprinting (the one nobody expects)

Before a single byte of HTTP is exchanged, your client performs a TLS handshake — and the exact order of cipher suites and extensions it offers forms a fingerprint (often called a JA3 hash).

Python's "requests" library has a JA3 signature that looks nothing like Chrome's. You can set a perfect Chrome User-Agent header and still be identified as a Python script before the server even reads your headers.

**The fix:** use "curl_cffi" or a similar library that impersonates real browser TLS stacks, or drive an actual browser.

## 4. IP Reputation

Datacenter IP ranges — AWS, DigitalOcean, Hetzner — are catalogued and scored. Some sites block them outright regardless of behaviour.

**The fix, in ascending order of cost:**
- **Datacenter proxies** — cheap, easily detected, fine for unprotected sites
- **Residential proxies** — real consumer IPs, billed per GB, the standard for serious work
- **Mobile proxies** — highest trust, highest cost, reserved for the hardest targets

Rotate sensibly. A single IP making 10,000 requests is obvious; so is an IP that changes on every single request while carrying the same session cookie.

## 5. Header Consistency

Real browsers send a specific, ordered set of headers: "Accept", "Accept-Language", "Accept-Encoding", "Sec-Fetch-*", and "sec-ch-ua" client hints. They are internally consistent — a Chrome 120 User-Agent comes with Chrome 120's exact header set.

Scrapers frequently send a Chrome User-Agent with three headers and no client hints. That mismatch is trivially detectable.

**The fix:** copy the complete header set from real browser DevTools, and keep it consistent with the User-Agent you claim.

## 6. Behavioural Signals

Advanced systems watch what happens *after* the page loads. Did the mouse move? Was there any scrolling? Did focus events fire? Did the visitor request the CSS and images, or only the HTML?

**The fix:** for the hardest targets, simulate movement and scroll before interacting, and let the page load its resources rather than blocking them all for speed.

## What About Solving CAPTCHAs?

Solving services exist and cost roughly $1–$3 per thousand solves. They work.

But a CAPTCHA is a **symptom**, not the disease. If you are solving thousands of them, your scraper has already been flagged and you are paying a tax on bad fingerprinting. Fix the signals above and the CAPTCHAs largely stop appearing.

## The Practical Escalation Ladder

Start cheap and only climb when you have to:

1. Plain HTTP requests with realistic headers and rate limiting
2. Add "curl_cffi" for TLS impersonation
3. Add rotating residential proxies
4. Switch to a stealth-patched real browser
5. Add behavioural simulation
6. Add CAPTCHA solving as a last resort

Most projects never need to go past step three. Teams get into trouble by starting at step four, burning money on browser infrastructure for a site that would have accepted plain requests with a two-second delay.

## Build It Right the First Time

Anti-bot work is not a one-time fix — protections update, and a scraper that is unmaintained is a scraper that will eventually break. Every system I build includes failure alerting, so you find out from an email rather than from a silently empty spreadsheet.

[Send me a message](/#contact) and tell me which site is blocking you. I'll tell you what it will take to get through it reliably.
    `
  },
  {
    id: 11,
    slug: "free-vin-decoder-nhtsa-api",
    tag: "Car Dealers",
    emoji: "🔧",
    color: "linear-gradient(135deg, #062a1f 0%, #0a1f33 100%)",
    metaTitle: "Free VIN Decoder — NHTSA vPIC API",
    title: "Free VIN Decoding with NHTSA vPIC: What You Get, and What You Still Have to Buy",
    summary: "NHTSA vPIC decodes any VIN free and unlimited. What it returns, what it will never tell you, and how to use it to cut your paid lookup bill on a run list.",
    keywords: ["free vin decoder", "nhtsa vpic api", "vin decoder api free", "bulk vin decode", "free vin lookup api", "decode vin programmatically", "vin decoder for dealers"],
    date: "February 12, 2026",
    readTime: "7 min read",
    content: `
## The most underused free data source in the car business

The US National Highway Traffic Safety Administration runs a database called vPIC — Vehicle Product Information Catalog. It decodes any VIN sold in the United States, it is free, it requires no API key, it has no published rate limit, and because it is a US government work it carries no licensing restriction on what you do with the output.

Almost every dealer I have built for was paying a vendor for at least part of what vPIC returns for nothing.

## What a VIN decode actually returns

Feed vPIC a 17-character VIN and it gives you back the manufacturer's own declaration of what that vehicle is. Not an estimate, not a lookup against a third-party table — the decoded content of the VIN itself plus the manufacturer's filing.

- Make, model, model year and series
- Trim level and body class
- Engine — displacement, cylinder count, configuration, fuel type, horsepower
- Drive type, transmission style and speed count
- Plant city, state and country of manufacture
- Gross vehicle weight rating class
- Restraint system type and airbag locations
- Number of doors and seat rows
- Electrification level for hybrids and EVs

For a dealer, the useful part is trim and engine. Two cars with the same year, make and model can differ by several thousand dollars on trim alone, and auction run lists are notoriously vague about it. Decoding the VIN settles it.

## What it does not give you

This is the part vendors are actually selling, and it is worth being clear about.

vPIC tells you **what the car is**. It does not tell you **what happened to it**. No accident history, no title brands, no odometer readings, no ownership count, no service records. That information comes from Carfax, AutoCheck, or an NMVTIS-approved provider, and it is licensed data you pay for.

So the honest framing is not "vPIC replaces Carfax". It is: decode everything for free, then spend your paid report credits only on the cars where history actually changes the decision.

## The other free NHTSA endpoints

vPIC is the best known but not the only one.

- **Recalls by VIN** — open safety recalls that have not been remedied. Worth checking before any car hits your lot.
- **Recalls by make, model and year** — the broader campaign data.
- **Safety ratings** — NHTSA's own crash test results, which are a genuine selling point on a listing.
- **Complaints** — owner-filed complaints by model, useful for spotting a trim with a known transmission problem before you buy fifteen of them.

## Doing it at volume

One VIN in a browser is easy. The reason this becomes a build rather than a bookmark is volume and shape.

vPIC has a batch endpoint that accepts multiple VINs in a single POST, which is how you decode a four-hundred-car run list without four hundred requests. The response is verbose — well over a hundred fields per vehicle, most of them empty for any given car — so the real work is selecting the twelve fields you care about, normalising the values, and joining the result onto whatever you already have.

That last part is where the value is. A decoded VIN sitting on its own is trivia. A decoded VIN joined onto an auction run list, so every lot on tomorrow's sale arrives with its true trim and engine attached, changes what you bid on.

## What I build with it

The typical shape: a pipeline reads your run lists or inventory feed, batch-decodes every VIN through vPIC, checks each one for open recalls, and writes the enriched rows into a sheet or database. Paid history reports are pulled afterwards, through your own dealer account, only for the cars that survived the first filter.

The dealers who run this stop paying for reports on cars they were never going to buy.

## Get it built

Send me where your VINs come from — an auction platform, a DMS export, a spreadsheet — and what you want on each row. Free decoding plus recall checks is usually a two to three day build.

[Send me a message](/#contact) for a free quote within 24 hours.
    `
  },
  {
    id: 12,
    slug: "price-used-cars-market-data",
    tag: "Car Dealers",
    emoji: "📊",
    color: "linear-gradient(135deg, #062629 0%, #06262e 100%)",
    metaTitle: "How to Price Used Cars vs the Market",
    title: "How to Price Used Cars Against the Live Market, Not a Book Value",
    summary: "Book values lag the market by weeks. How to price used cars against live wholesale and retail data instead, and what to do when the two disagree.",
    keywords: ["price used cars", "used car pricing tool", "wholesale car pricing", "live market pricing cars", "used car market data", "price cars against mmr", "car pricing data dealers"],
    date: "March 18, 2026",
    readTime: "8 min read",
    content: `
## Book value versus asking price

Every dealer has a book value source — MMR, Black Book, J.D. Power, Galves. They are good at what they do, which is telling you roughly what a car is worth wholesale, nationally, on average.

None of those three qualifiers matches how you actually sell a car. You sell retail, in one market, today. And the number your customer is comparing you against is not a book value they have never heard of — it is the twenty listings they just scrolled through on their phone.

Pricing against live listings closes that gap. It is not a replacement for book value; it is the other half of the picture.

## What the comparable set should contain

A comp is not "same year, make, model". That is how you end up pricing a base trim against a loaded one and wondering why the car sat for ninety days.

A usable comparable set matches on:

- Year, make, model **and trim** — decoded from the VIN, not read off the listing title
- Mileage within a sensible band, not an arbitrary one
- Drivetrain and transmission
- Geography — a radius that reflects how far your buyers actually travel
- Condition signals where published — accident-free flags, owner count, certified status

Then it records, per listing: asking price, days on market, dealer identity, and every price change observed since first capture.

## Days on market is the number nobody tracks

Asking price alone is half the story, and it is the half that lies. A car listed at 24,000 dollars that has sat for eighty days is not telling you the market value is 24,000. It is telling you the market value is somewhere below that, and the dealer has not worked it out yet.

Once you are capturing listings daily, days-on-market comes for free — you know when each listing first appeared because you were there. Pair it with price-change history and the picture sharpens considerably:

- Trims that clear in under three weeks at asking price are under-supplied. Buy more, price at the top of the range.
- Trims sitting past sixty days with two price cuts are over-supplied. Either skip them or buy at a price that assumes you will be cutting too.
- A competitor who cuts price on day fourteen every single time has a floorplan problem you can plan around.

## Where the data comes from

The listing sites your buyers actually use — AutoTrader, Cars.com, CarGurus, CarMax, and increasingly Facebook Marketplace for private-party. Individual dealer websites matter more than people expect, because they update the moment a car is repriced, often days before the aggregators catch up.

Each of those has its own defences and its own quirks, which is why this tends to be a build rather than a subscription. I have written separately about the individual sites — the [AutoTrader](/autotrader-scraper), [CarMax](/carmax-scraper) and [Cars.com](/cars-com-scraper) pages go into what each one publishes and what gets in the way.

## Turning listings into a price

The output that actually gets used is not a spreadsheet of every comp. It is a single recommendation per car with the workings attached:

- The comparable set size, so you know whether to trust it
- Median and percentile asking prices across that set
- Your position within the range if you list at a given number
- Estimated days to sell at each price point, from observed history
- The spread against MMR or your landed cost

Twelve comps says something. Three comps says almost nothing, and the system should tell you that rather than quietly averaging them into a confident-looking number.

## What changes when you have it

The dealers I have built this for describe the same shift. Pricing meetings stop being arguments about instinct and start being five-minute reviews of a list. Cars stop sitting because somebody priced from memory. And the reprice decision — the one that actually costs money when it comes late — gets made on day twenty instead of day fifty.

## Get it built

Tell me your market, the segments you stock, and which sites your buyers shop. Most pricing feeds are running within a week.

[Send me a message](/#contact) for a free quote within 24 hours.
    `
  },
  {
    id: 13,
    slug: "ai-parsing-scraped-data",
    tag: "AI Analysis",
    emoji: "🧠",
    color: "linear-gradient(135deg, #1d1640 0%, #2a1038 100%)",
    metaTitle: "Using AI to Clean Vehicle Data",
    title: "Using AI to Clean Messy Vehicle Data (And When Not To)",
    summary: "Condition reports and free-text announcements parse well with an LLM. VINs, prices and mileage do not. Where AI earns its place, and where it costs you.",
    keywords: ["ai parsing scraped data", "llm data cleaning", "parse condition reports ai", "ai vehicle data extraction", "clean messy data ai", "llm structured extraction"],
    date: "April 9, 2026",
    readTime: "9 min read",
    content: `
## The problem regex was always bad at

Extraction gets you the raw text. The work that decides whether the dataset is usable is what happens next, and it is usually messier than the scraping.

Consider a single field — the price — as it actually appears across a few hundred sites:

- 1,299.00 and 1.299,00 and 1 299 kr
- From 49 dollars a month
- Was 89, now 59
- Call for pricing
- 24.99 per unit, minimum order 12

A regex handles the first two variants. By the fifth you are writing special cases, and by the fiftieth you have a thousand lines of parsing code that nobody can safely change.

This is exactly the shape of problem language models are good at: high variety, low volume per variant, and a clear notion of what the right answer looks like.

## What to hand to a model

The rule I use: **if you can write the rule down, write the rule.** Use a model where the rule would be "you know it when you see it".

Good candidates:

- Splitting an address blob into components across inconsistent international formats
- Deciding whether two differently-spelled business names are the same company
- Classifying free-text product descriptions into your own category tree
- Extracting structured attributes from prose specs — "brushed stainless, 18 inch, dishwasher safe"
- Normalising job titles into levels so "VP Eng" and "Vice President of Engineering" collapse together
- Reading sentiment and specific complaints out of review text at volume

Bad candidates, where a model is slower, costlier and less reliable than five lines of code:

- Anything with a fixed format — ISO dates, phone numbers in one country, currency with a known symbol
- Deduplication on an exact key
- Arithmetic
- Validation you can express as a rule

## Structure the output, do not parse it

The mistake I see most often is asking a model for JSON in the prompt and then parsing whatever comes back. That works until it does not, and it fails silently in the middle of a large batch.

Every current Claude model supports structured outputs — you supply a JSON Schema and the response is constrained to match it. That turns "usually valid JSON" into "valid JSON or an explicit error", which is the difference between a pipeline you can leave running and one you have to babysit.

Define the schema tightly. Enumerate the values you will accept for a category field rather than leaving it as a free string, and include an explicit "unknown" option — a model given no way to say it does not know will invent something.

## Cost, honestly

This is where people either overspend badly or dismiss the approach on bad arithmetic.

The current Claude lineup, priced per million tokens of input and output:

- **Claude Haiku 4.5** — 1 dollar in, 5 dollars out
- **Claude Sonnet 5** — 3 dollars in, 15 dollars out
- **Claude Opus 4.8** — 5 dollars in, 25 dollars out

A short parsing task — a messy product record in, a clean structured record out — runs somewhere around 400 tokens in and 150 out. On Haiku that is roughly 0.0011 dollars per record, so about 1.10 dollars for a thousand records. Ten thousand product records cleaned for around eleven dollars is cheap against any amount of engineering time.

Two things make the difference between that number and a bill ten times larger:

**Use the smallest model that passes your evaluation.** Parsing and classification are exactly the tasks the cheaper models handle well. Reach for a larger model when the task needs genuine reasoning, not when it needs careful pattern matching. Test the cheap one first; if it passes, you are done.

**Batch, and cache the instructions.** If you send the same long system prompt with every record, you pay for it every time. Prompt caching makes repeated prefixes read at roughly a tenth of the input price, which matters enormously when the instructions are long and the records are short. Send records in batches rather than one at a time and the per-record overhead collapses.

## Always validate the output

A model that returns a confidently wrong answer is worse than one that errors, because you will not notice.

Every AI parsing step I build ships with deterministic checks behind it:

- Does the parsed price fall within a plausible range for this category?
- Does the extracted date exist, and is it not in 1970 or 2087?
- Does the normalised category appear in the allowed list?
- What percentage of this batch came back as unknown, and is that percentage stable against yesterday?

That last one is the alarm that matters. A parsing step that quietly starts returning unknown for a third of records has broken, and the null rate catches it long before anyone notices the numbers look odd.

## Where this sits in a real pipeline

Deterministic first, model second, validation third. Extract the raw values with code. Handle everything with a knowable rule using that code. Route only the leftovers — the genuinely ambiguous ones — to a model. Then validate everything that comes back with rules again.

Done that way, the AI step usually touches ten to twenty percent of records, which keeps both the cost and the blast radius small.

## Get it built

If you have a dataset that is technically complete and practically unusable, that is the job. Send me a sample of the mess and what you want the clean version to look like.

[Send me a message](/#contact) for a free quote within 24 hours.
    `
  },
  {
    id: 14,
    slug: "self-healing-scrapers-ai",
    tag: "Technical",
    emoji: "🩹",
    color: "linear-gradient(135deg, #14183a 0%, #1d1640 100%)",
    metaTitle: "Self-Healing Scrapers: What AI Fixes",
    title: "Self-Healing Scrapers: What AI Fixes When an Auction Site Changes",
    summary: "A renamed CSS class an LLM can recover from. A new login flow it cannot. An honest account of what self-healing scraping fixes, and what still wakes you up.",
    keywords: ["self healing scrapers", "ai scraper maintenance", "scraper breaks site change", "resilient web scraping", "automatic scraper repair", "llm scraper fixing"],
    date: "May 21, 2026",
    readTime: "8 min read",
    content: `
## Why scrapers break

Not because they were written badly. Because the site changed, and it was always going to.

A scraper is a contract with a page structure that the other party never agreed to and can rewrite whenever they like. A class name goes from product-price to price-display. A value that was in the HTML moves into a JavaScript payload. A single-column layout becomes a grid. None of that is malicious and none of it is unusual — it is just what shipping a website looks like from the other side.

The question is not whether your scraper breaks. It is how long it takes you to find out, and how much wrong data you acted on in the meantime.

## The two failure modes, and only one is obvious

**Loud failures** are fine. The selector matches nothing, the parser throws, the run exits non-zero, an alert fires. You know within minutes.

**Silent failures** are the expensive ones. The selector still matches something — just the wrong thing. Now your price column contains the shipping cost. The run succeeds. The row count looks normal. The alert never fires, and you make decisions on that data for three weeks before somebody notices the margins look strange.

Everything below is really about catching the second kind.

## Where AI genuinely helps

Give a model the old page structure, the field definitions, and the new page HTML, and ask it to locate the same fields again. This works well, and it works because it is a recognition problem rather than a rule-following one — the price still looks like a price, it has just moved.

A repair loop I have had good results with:

1. The run fails validation — nulls spike, or a value falls outside its expected range
2. The system snapshots the page that failed
3. A model is given that snapshot, the field list, and examples of previously-correct values
4. It proposes new selectors
5. **The proposal is tested against a stored set of pages with known-correct answers**
6. If it passes, the selectors are updated and the run retries; a human is notified either way

Step five is the entire load-bearing part. Without it you have replaced a broken scraper with a confidently wrong one.

## Where it does not help

Be clear-eyed about the limits.

- **A login flow that changed** — this is a sequence of actions, not a structure to recognise. It needs a person.
- **New anti-bot defences** — if the site deployed a challenge, no amount of selector repair gets you past it, and you should not want a system that tries to route around a defence automatically.
- **Data that genuinely moved behind a paywall** — the field is gone. That is a business decision, not a bug.
- **Semantic changes** — the site now shows price excluding tax where it used to include it. The scraper works perfectly and your dataset is wrong. No structural check catches this; only a human who knows the domain will.

That last one is worth sitting with. It is the failure mode that no amount of automation addresses, and it is the reason I do not sell "set and forget".

## Validation is what makes any of this work

The repair loop only ever triggers because validation caught something. So the validation is the real system:

- **Null rate per field**, compared against the rolling average rather than against zero
- **Range checks** — a used car priced at 40 dollars or 4 million is a parse error, not a bargain
- **Type checks** — a price field returning text
- **Row count** against expectation, catching pagination that silently stopped early
- **Cross-field consistency** — a sale price above the list price
- **Distribution drift** — the shape of today's values against last week's, which catches the subtle ones

A pipeline with these checks and no AI at all is far more trustworthy than one with automatic repair and no checks.

## What I actually ship

Honest version: most systems I build do not repair themselves. They detect and they shout.

The reason is that on a well-scoped pipeline, breakages are rare enough that a same-morning alert plus a fix from me is faster and safer than an automated repair I have to verify anyway. Automated repair earns its place when you are running against many sites at once and manual response does not scale.

What every delivered system does have: validation on every run, alerting the moment a check fails, a stored snapshot of the page that broke so diagnosis does not start from scratch, and fixes from the person who wrote it.

Sites change and scrapers break. Anyone who tells you otherwise is selling something. The measure of a good build is not that it never breaks — it is that you find out from the system rather than from a bad decision three weeks later.

## Get it built

If you have a scraper that keeps failing quietly, or you are about to build something you need to trust for months, that is the conversation.

[Send me a message](/#contact) for a free quote within 24 hours.
    `
  },
  {
    id: 17,
    slug: "what-is-mmr-manheim-market-report",
    tag: "Car Auctions",
    emoji: "📊",
    color: "linear-gradient(135deg, #14183a 0%, #101c33 100%)",
    metaTitle: "What Is MMR? Manheim Market Report",
    title: "What Is MMR? The Manheim Market Report Explained for Dealers",
    summary: "What MMR actually measures, why it moves, how far to trust it against a specific car, and where it quietly misleads you. Written for dealers who bid on it.",
    keywords: ["what is mmr", "manheim market report", "mmr meaning cars", "mmr value explained", "manheim market report dealers", "how is mmr calculated", "mmr vs book value"],
    date: "July 21, 2026",
    readTime: "7 min read",
    content: `
## What MMR stands for

MMR is the **Manheim Market Report** — Manheim's estimate of what a specific vehicle is worth at wholesale, right now, based on what cars just like it have actually sold for at auction.

That last part is what makes it different from a book value. Kelley Blue Book and NADA/J.D. Power are built partly on retail asking prices and surveys. MMR is built on **completed wholesale transactions** — real hammer prices from real lanes, both physical and online, updated as new sales land. When a dealer says "what's the MMR on it," they mean: what is the market paying for this car among people who buy and sell for a living.

## What the number actually measures

An MMR value is tied to a precise configuration, not a vague "2019 Camry." It reflects:

- **Year, make, model and trim** — an SE and an XLE are different cars with different numbers
- **Mileage** — MMR adjusts up or down from the base for odometer
- **Region** — the same truck is worth more in one part of the country than another
- **Condition** — expressed as a grade, because a clean unit and a rough one are not the same asset
- **Recency** — it is a rolling figure, weighted toward the most recent sales, so it moves with the market instead of lagging it

So "the MMR" is really a base value plus a set of adjustments. Two cars that look identical on paper can carry different MMRs once mileage, region and condition are applied.

## MMR value vs the adjusted number

This trips people up. When you look a car up, you will often see a base MMR **and** an adjusted MMR. The base is the raw model-level figure; the adjusted figure accounts for that specific car's mileage and condition grade. The adjusted number is the one that actually matters for a buy or sell decision — it is the like-for-like comparison to the unit in front of you.

You will also see a range and an average, not a single point. Wholesale is a spread, not a fixed price, and the report shows you where the middle sits and how wide the band is.

## How dealers use it

Three jobs, mostly:

**Buying.** Before bidding, you check MMR to know your ceiling. Buy meaningfully under MMR and you have built-in margin before the car ever hits your lot. This is the whole game at auction — knowing the market number faster and more accurately than the person bidding against you.

**Appraising trade-ins.** MMR gives you a defensible wholesale floor. Whatever you cannot retail, you can move at auction near that number, so it anchors what you can safely put into a trade.

**Pricing to sell.** If you need to wholesale a unit, MMR tells you what it will realistically bring and whether it is worth running through the lane this week or holding.

## Where MMR stops being enough

MMR is a wholesale number. It is not a retail price, and it is not a substitute for the two things that sit either side of it:

- **What the car actually is.** MMR assumes the trim and equipment are what the listing claims. Decode the VIN and you price the real car, not the one somebody typed in. (More on that in [pricing used cars against the live market](/blog/price-used-cars-market-data) and [free VIN decoding with NHTSA](/blog/free-vin-decoder-nhtsa-api).)
- **What happened to the car.** MMR does not know about the accident, the branded title or the odometer discrepancy. That comes from a [history report](/services/vehicle-history-reports), and it can move a car's real value by thousands versus its clean MMR.

MMR tells you what the market pays for a clean example of this car. History and an accurate spec tell you whether the car in front of you is that car.

## The speed problem

None of this is hard to look up once. The problem is doing it across a whole run — hundreds of units across multiple sales — before the cars sell. By the time a person has checked MMR on the fiftieth vehicle by hand, the good ones from the top of the list are gone.

That is exactly the work I automate. A pipeline pulls each unit's [MMR from Manheim](/manheim-mmr-scraper) using your own dealer login, compares it against the auction ask, decodes the VIN for the true trim, filters by the margin you set, and emails you a ranked short-list before the lane opens — the full [car-auction automation](/services/car-auction-automation) loop. It reads exactly what you would read; it just does it to the whole run in minutes instead of hours. I wrote up the mechanics in [automating Manheim MMR checks](/blog/automate-manheim-mmr).

## The honest caveat

MMR is licensed data behind your Manheim account. Automating it means running on **credentials you already pay for and are entitled to use** — the system does the clicking you would do anyway. It does not create accounts, share access, or reach anything you could not open yourself. Anyone offering you "free MMR data" scraped from someone else's account is selling you a liability, not a tool.

[Send me a message](/#contact) and tell me which platforms you buy on. I will tell you honestly what a same-morning deal-finder would take to build.
    `
  },
  {
    id: 18,
    slug: "automate-car-merchandising-workflow",
    tag: "Dealer Automation",
    emoji: "🚗",
    color: "linear-gradient(135deg, #06262e 0%, #0a1f33 100%)",
    metaTitle: "Automate Used-Car Merchandising",
    title: "How to Automate Your Used-Car Merchandising Workflow",
    summary: "From auction win to live listing: photos, descriptions, pricing and syndication. Which merchandising steps automate cleanly, and which still need a person.",
    keywords: ["automate car merchandising", "used car merchandising workflow", "dealer photo automation", "vehicle description generator", "inventory syndication automation", "car listing automation"],
    date: "July 28, 2026",
    readTime: "8 min read",
    content: `
## What "merchandising" actually covers

Merchandising is everything between winning a car and having it live, findable and priced across every place a buyer might look. For most used-car operations that is a surprisingly long chain:

1. Pull the VIN and decode the real trim and equipment
2. Pull a history report and note anything that affects value or disclosure
3. Photograph the car, clean up the images, apply a consistent background
4. Write the description and equipment list
5. Set a price against the live market
6. Publish to your DMS, your own site, and every marketplace — AutoTrader, Cars.com, CarGurus, Facebook
7. Keep all of that in sync as the price changes or the car sells

Every one of those steps is where a car can sit for an extra day. Multiply an extra day across a whole lot and that is real floor-plan cost and real lost first-page time on the marketplaces, where freshness matters.

## What genuinely automates, and what does not

Be honest about this up front, because the tools that overpromise here are the ones that disappoint.

**Photography and image editing — partly.** This is what a tool like **Spyne** does: you shoot the car, and AI handles background replacement, cleanup and a consistent studio look at scale. That solves the *editing* bottleneck. It does not hold the camera — someone still has to walk the car and shoot it. Treat image AI as removing the edit step, not the shoot step.

**The data steps — almost entirely.** VIN decoding, history-report pulls, market pricing, and pushing listings to multiple channels are structured, repeatable, rule-based tasks. This is the part most lots are still doing by hand and the part that automates cleanest.

**The description — mostly, with a human check.** Equipment lists and factual blurbs generate reliably from decoded VIN data. The one line that actually sells the car is still worth a human touch.

**The judgement calls — no.** What to recondition, when to drop a price, which unit to wholesale. Automation should hand a person a clean decision, not make it for them.

## The pipeline I build

The merchandising work that pays back fastest is the data spine that every other step hangs off. A single pipeline that, for each new unit:

- **Decodes the VIN** to the true year/make/model/trim and factory equipment, so the listing describes the real car rather than what someone typed
- **Pulls the [history report](/services/vehicle-history-reports)** and flags anything that needs disclosure or changes the price
- **Prices it against the live market** — comparable listings and the wholesale [MMR number](/blog/what-is-mmr-manheim-market-report), not a stale book value ([how that pricing works](/blog/price-used-cars-market-data))
- **Assembles a complete, structured listing** — specs, equipment, price, photo set — in one record
- **Publishes and syncs** that record to your site and the marketplaces, and updates or removes it automatically when the price moves or the car sells

Image editing from a tool like Spyne slots straight into step four: it produces the photo set, the pipeline attaches it. The pieces cooperate — you do not have to choose one tool for everything.

## Where the time actually comes back

The saving is not really the minutes on any one task. It is **consistency and speed across the whole lot.** Every car gets the full treatment — decoded, history-checked, priced, fully photographed, live on every channel — within hours of hitting the ground, without depending on which staff member had time that day. Cars go live faster, listings are complete instead of half-filled, and nothing sits in a half-merchandised limbo because someone got busy.

Faster to live means more days on the first page of the marketplaces, where freshness is a ranking signal, and fewer days of floor-plan interest on a car that is technically in stock but not yet findable.

## Start with the bottleneck, not the whole thing

You do not automate all of this at once. You find the step where cars actually pile up — for most lots it is the data-and-publish work, not the photos — and you automate that first. The [data and pricing side](/services/car-auction-automation) usually pays for itself before you touch anything else.

Then the pipeline connects to whatever you already use — your DMS, your photo tool, your marketplace accounts — using **your own logins and your own accounts.** It removes the manual clicking between systems; it does not replace the systems you have chosen.

[Send me a message](/#contact). Tell me where cars get stuck between winning them and having them live, and I will map out what part of that chain is worth automating first and what it would take.
    `
  },
  {
    id: 19,
    slug: "autocheck-vs-carfax-vehicle-history",
    tag: "Vehicle History",
    emoji: "📋",
    color: "linear-gradient(135deg, #2b1e08 0%, #2a1608 100%)",
    metaTitle: "AutoCheck vs Carfax for Dealers",
    title: "AutoCheck vs Carfax: Which Report to Trust, and How to Pull Both in Bulk",
    summary: "The two reports disagree more often than dealers expect. Where each is strong, where each goes blind, and how to pull both per VIN without two tabs a car.",
    keywords: ["autocheck vs carfax", "carfax or autocheck", "which vehicle history report", "compare carfax autocheck", "bulk vehicle history reports", "carfax autocheck difference"],
    date: "August 4, 2026",
    readTime: "8 min read",
    content: `
## Why there are two at all

AutoCheck and Carfax both sell vehicle history reports, and they do not always agree, because they pull from **overlapping but different sources.** A record that appears on one can be missing from the other. That is not a bug — it is why dealers who run at any volume tend to check both rather than trusting either alone.

They also frame the same information differently, and each has a genuine strength.

## What AutoCheck is better at

AutoCheck is owned by Experian and is the report built into the auction world — it is what you see inside Manheim and ADESA. Two things stand out:

- **Auction and title-history depth.** Because it is wired into the auction ecosystem, its coverage of auction announcements, title events and prior wholesale history is strong. If you buy at auction, this is the report already in front of you.
- **The AutoCheck Score.** It condenses a car's history into a single number and a range for comparable vehicles, which makes it fast to sort a run of cars by relative risk. It is a triage tool — good for "which of these fifty do I look at harder."

## What Carfax is better at

Carfax has the stronger consumer brand and, often, deeper **service-record and dealer-maintenance history** — the routine dealer and shop records that tell you a car was actually looked after. Buyers know the name and ask for it, so a clean Carfax also carries retail weight that a clean AutoCheck does not, simply because the public recognises it.

## The practical answer

For most dealers it is not "which one" — it is **AutoCheck to buy, Carfax to sell.** AutoCheck (usually already in the auction platform) to screen and appraise at acquisition; Carfax to reassure the retail buyer and back your listing. At volume, cross-checking both catches records one missed, and a discrepancy between them is itself a signal worth a closer look.

Whichever you rely on, remember what neither replaces: a history report tells you **what happened to the car**, not **what the car is.** For the exact spec you still decode the VIN — the [free NHTSA vPIC decoder](/blog/free-vin-decoder-nhtsa-api) gives you the factory build — and for what it is worth you still price it against the [live market and MMR](/blog/what-is-mmr-manheim-market-report). History, spec and value are three separate questions.

## Where the manual pain is

Both reports live behind your paid subscription, and both are built for pulling **one VIN at a time.** That is fine for a single car. It falls apart across a whole acquisition run or a full lot, where someone ends up copy-pasting VINs into a portal for an hour and then hand-copying the flags into a spreadsheet — slow, and easy to fumble on the fiftieth car.

## What automating it looks like

Run on **your own AutoCheck and/or Carfax subscription** — the account you already pay for — a pipeline can:

- Take a batch of VINs from your DMS export, an auction run, or a spreadsheet
- Pull the report for each one through your authorised access
- Extract the fields that actually drive a decision — accident count, title brands, odometer flags, owner count, the score
- Drop it all into one clean sheet, ranked so the cars that need a human look sort to the top

An hour of copy-paste becomes a batch that runs while you do something else, and the output is consistent instead of depending on who ran it. It reads exactly what you would read in the portal — it just does it to the whole list. This is the core of the [vehicle-history-reports service](/services/vehicle-history-reports), and it drops straight into the [run-list triage](/services/auction-run-list-triage) flow.

There is a page for each half of it: [AutoCheck report automation](/autocheck-scraper) and [Carfax report automation](/carfax-scraper), with the fields each one returns and what the build costs. If you want the report itself explained before any of that — what the Score means, what the comparison range is for, where the coverage stops — start with [what an AutoCheck report actually is](/blog/what-is-an-autocheck-report).

## The line that matters

This only works on **credentials you own and are entitled to use.** History data is licensed, and automating access you pay for is a different thing entirely from scraping someone else's account or reselling report data — which the providers' terms forbid and which I will not build. The point is to save your team the manual clicking on data you already have the right to pull, nothing more.

[Send me a message](/#contact). Tell me which report you subscribe to and where your VINs come from, and I will scope a batch puller for you — usually a two-to-three-day build.
    `
  },
  {
    id: 20,
    slug: "what-is-an-autocheck-report",
    tag: "Vehicle History",
    emoji: "🔎",
    color: "linear-gradient(135deg, #2b1e08 0%, #2a1608 100%)",
    metaTitle: "What Is an AutoCheck Report?",
    title: "What Is an AutoCheck Report? The Score, the History, and How to Read One",
    summary: "What the AutoCheck score means, how it is built, what it covers that Carfax does not, and the blind spots nobody mentions. How to read one properly.",
    keywords: ["what is an autocheck report", "autocheck score explained", "autocheck report meaning", "how to read autocheck", "autocheck vehicle history", "autocheck score range"],
    date: "August 23, 2026",
    readTime: "9 min read",
    content: `
## The short answer

**An AutoCheck report is a vehicle history report sold by Experian.** You give it a VIN, it gives you back everything it has recorded against that VIN over the car's life: title events, odometer readings, auction announcements, reported accidents, use type, and how many owners it has passed through.

Its distinguishing feature is the **AutoCheck Score** — a single number, with a comparison range for similar vehicles. No other mainstream history report condenses a car's past into one comparable figure, and that is the whole reason the auction world uses it.

If you have ever bought a car through Manheim or ADESA, you have already read one. AutoCheck is the report embedded in those platforms.

## What is actually in the report

An AutoCheck report is organised around the events it has managed to collect against a VIN. In practice that means:

- **Title records** — each state title issued, with date and state, so you can see the car's path across the country
- **Title brands** — salvage, flood, junk, lemon, rebuilt, odometer discrepancy. This is the section that kills deals, and rightly
- **Odometer readings** — captured at recorded events, which is what lets a rollback show up as an impossible sequence
- **Accident records** — where an accident was reported to a source AutoCheck receives data from
- **Use type** — personal, lease, rental, fleet, taxi, police or government
- **Auction announcements** — what was declared in the lane when the car ran, including structural and frame announcements
- **Number of owners** — inferred from title transfers, not from a register of people
- **The AutoCheck Score** — the summary number, plus the range for comparable vehicles

The auction announcements section is the part dealers care about most, and it is where Experian's ownership shows: its data relationships run deep into the wholesale market.

## What the AutoCheck Score actually means

This is the most misread number in the used car business, so it is worth being precise.

**The Score is a relative risk indicator, not a condition grade.** It estimates how this vehicle compares with others of the same class, age and mileage, computed from the events in its history — brands, accidents, use type, ownership pattern. It comes with a **comparison range**, which is the band most similar vehicles fall into.

The range is the important half, and it is the half people skip. A score of 82 means nothing on its own. A score of 82 where similar cars run 79 to 89 is unremarkable. A score of 82 where similar cars run 90 to 96 is a car with something in its history worth finding.

What the Score is **not**:

- It is not a mechanical inspection. It knows nothing about the transmission
- It is not a value or a price. It does not tell you what to bid
- It is not a guarantee. Events that were never reported to anyone cannot be in it
- It is not a pass or fail. There is no threshold at which a car becomes a good buy

Treat it as triage. It is very good at telling you which ten cars out of a hundred deserve a closer look, and it is not designed to make the final call on any one of them.

## How to get an AutoCheck report on a VIN

Three routes, suiting very different people.

**Buy a single report or a short-term package** from AutoCheck directly. This is the right answer for someone buying one car — a bundle valid for a limited period covers a whole shopping trip.

**Use the one already in front of you.** If you are bidding at Manheim, ADESA or most other wholesale platforms, the AutoCheck report is included in the listing. You are already paying for it in your auction fees. Dealers routinely buy a separate subscription without realising they get it in the lane.

**Hold a dealer subscription** if you run volume. Experian sells dealer plans with a report allowance, which is what makes checking a whole run list affordable rather than punitive at retail rates.

## Where AutoCheck goes quiet

Every history report has blind spots, and being straight about them is more useful than a feature list.

**It only knows what was reported.** An accident repaired privately, paid in cash, never claimed on insurance and never taken to a shop that reports data, does not exist as far as any history report is concerned. This is common, and it is the biggest limitation of the entire category.

**Service history is thin.** AutoCheck's coverage of routine maintenance records is weaker than Carfax's. If a documented service history is what you are trying to verify, this is the wrong report to lean on.

**Reporting lags.** An event from three weeks ago may not have reached the file yet. On a fresh trade or a recent auction run, a clean report is weaker evidence than it looks.

**Imported vehicles are poorly covered.** AutoCheck is built on North American data — US and Canadian title systems, US insurance and auction feeds. A car that spent part of its life outside that system has a gap in its record, and a gap is not the same thing as a clean record. If you are looking at an import, the report cannot tell you about the years it was elsewhere, and reading it harder will not fix that.

## AutoCheck or Carfax?

The honest answer for anyone buying one car is: whichever one the seller has not already shown you.

They pull from **overlapping but different sources**, so a record on one can be missing from the other. That is precisely why running both is standard practice at volume, and why "it has a clean Carfax" is a weaker statement than it sounds.

Roughly:

- **AutoCheck** is stronger on auction announcements, title history depth and cross-state title movement, and it is the only one with a single comparable score
- **Carfax** is stronger on service and maintenance records, and its consumer branding carries more weight with retail buyers

There is a longer breakdown in [AutoCheck vs Carfax](/blog/autocheck-vs-carfax-vehicle-history), including which one to show a customer and which one to buy on.

## Reading a hundred of them

Everything above assumes one car. The moment you are appraising a run list, the format works against you.

A report is designed to be read by a person, one at a time, as prose. There is no view that puts four hundred VINs in a table with a title-brand column, a score column and a comparison-range column, sorted so the outliers rise to the top. So buyers do the obvious thing — check the ten cars they already liked and skip the rest. The cars nobody checked are where the surprises live.

That is a data-shape problem, not a report problem. What fixes it is pulling the reports **through your own AutoCheck dealer account, within the allowance you already pay for**, parsing each one into fields, and writing the whole run list into one sheet. One row per VIN. Score, comparison range, brand flags, owner count, announcement text and odometer sequence as columns you can sort and filter, joined against the auction data you are already pulling.

The account is yours and the credits get spent on the same cars they would have been spent on anyway. What changes is that the answer arrives as a table before the sale rather than as forty browser tabs during it. That is what [AutoCheck report automation](/autocheck-scraper) is.

**Tell me how many VINs you run in a typical week and which platforms you buy on** through [the contact form](/#contact), and I will tell you what it would take. Free VIN data comes first in every build — [the NHTSA vPIC decoder](/blog/free-vin-decoder-nhtsa-api) covers a surprising amount at no cost, so paid report credits only get spent where they add something.
    `
  },
  {
    id: 21,
    slug: "autoscraper-python-library-vs-custom-scraper",
    tag: "Technical",
    emoji: "🐍",
    color: "linear-gradient(135deg, #14183a 0%, #101c33 100%)",
    metaTitle: "AutoScraper vs a Custom Scraper",
    title: "AutoScraper vs a Custom Build: What the Python Library Can and Cannot Do",
    summary: "AutoScraper learns patterns from an example and works on simple pages. Where it stops, logins, pagination, anti-bot, scheduling, and what you need instead.",
    keywords: ["autoscraper python", "autoscraper library", "autoscraper vs custom scraper", "python scraping library", "autoscraper tutorial", "when autoscraper fails"],
    date: "August 23, 2026",
    readTime: "9 min read",
    content: `
## What AutoScraper actually is

**AutoScraper is an open-source Python library that builds a scraper from an example rather than from a CSS selector.** You give it a URL and a sample of what you want — a price, a product name — and it works out the rule that finds that value, then applies the same rule to any similar page.

The appeal is obvious. There is no selector to write, no DevTools inspection, and it will find the *other* items on the page that match the same pattern, which is often exactly the list you wanted. For a static page with a repeating structure, you can go from nothing to a working extractor in a handful of lines and about two minutes.

It is worth being clear about what the "auto" means. It is automatic **rule inference** — the library figures out where your example sits in the HTML tree and generalises from it. It is not an AI that understands the page, and it is not a service. It is a small, focused library with no browser, no proxy layer, no scheduler and no anti-bot handling.

## Where it genuinely wins

Be fair to it, because for a real set of jobs it is the correct tool:

- **A one-off extract from a static site.** You need this data once, the page is server-rendered HTML, and writing selectors would take longer than the scrape saves
- **Pages whose markup you do not want to learn.** Auto-generated class names, deeply nested wrappers, a structure that would take twenty minutes to read
- **Prototyping.** Finding out whether a site's data is shaped the way you assumed, before committing to a real build
- **Similar pages across one site.** Learn from one product page, run across a thousand of the same template

If that describes your problem, use it. It is free, it is quick, and paying someone to write what you can do in ten lines is a waste of your money.

## The four things that break it

Every one of these is the same underlying issue: AutoScraper solves extraction, and extraction is usually the easy part.

### 1. JavaScript-rendered pages

AutoScraper fetches HTML over HTTP. It does not run a browser and it does not execute JavaScript. Anything a modern site loads *after* the initial document — infinite-scroll listings, prices fetched from an internal API, anything rendered client-side — is simply not in the HTML it receives.

This is the single most common reason it "does not work" on a site. The library is fine; the data was never in the document. Most vehicle marketplaces, most large retailers and most listing sites fall into this category, and that is precisely why [a real browser engine is the baseline for those builds](/blog/what-is-web-scraping).

### 2. Anything that blocks you

There is no proxy rotation, no session management, no TLS fingerprint handling, no CAPTCHA path and no retry-with-backoff. A site with serious bot detection will start returning challenges or blocks after a modest number of requests, and the library has no answer to that because answering it was never its job. [Getting past anti-bot systems](/blog/bypass-captcha-anti-bot-scraping) is a separate discipline from parsing.

### 3. Structural drift

The learned rules are tied to the structure of the page at the moment you taught it. A redesign, an A/B test, or a component moved one level up the tree, and the rule stops matching — usually silently, returning an empty list rather than an error. That is the failure mode that costs the most, because a scraper that returns nothing looks the same as a market with nothing in it until someone checks. Production pipelines need [validation and self-healing](/blog/self-healing-scrapers-ai) around whatever does the extracting.

### 4. Everything after extraction

This is the part people underestimate most. A working extractor is maybe a fifth of a production data pipeline. The rest is: scheduling and reliable re-runs, deduplication across runs, change detection so you know what moved, normalisation so fields are joinable, storage, alerting when a run comes back wrong, and delivery into whatever your team actually opens. None of that is in scope for a parsing library, nor should it be.

## Which side of the line are you on?

A short and fairly reliable test. **If you can answer yes to all of these, use the library:**

- Is the data present in the raw HTML — view-source, not DevTools Elements?
- Do you need this once, or rarely, rather than on a schedule?
- Does it matter little if a run silently returns nothing one day?
- Is the volume low enough that nobody will rate-limit you?

**If any answer is no, the library is the wrong shape** — not because it is bad, but because the thing that is hard about your job is not the thing it solves. You would spend your time rebuilding a browser layer, a proxy layer and a monitoring layer around it, which is a much larger project than it looks from the outside.

## What "auto scraping" usually means in practice

A lot of people searching for an automatic web scraper are not really after a Python library. They want the *outcome*: data arriving on its own, in a spreadsheet, without anyone opening a browser. That is a pipeline, and the extractor inside it — AutoScraper, BeautifulSoup, a Playwright routine, an API where one exists — is an implementation detail that matters far less than the parts around it.

What that pipeline actually needs is roughly:

- A fetch layer that can render JavaScript when the page requires it
- Request pacing and session handling that keep you welcome on the site
- Extraction, whichever way is most robust for that page
- Validation, so an empty or malformed run is caught instead of shipped
- Normalisation, so today's rows join to yesterday's and to your other sources
- A schedule, storage and a delivery format someone will actually open
- An alert when something breaks, because eventually something breaks

AutoScraper is a good answer to exactly one of those seven lines.

## The honest summary

Use AutoScraper when the page is static, the job is small, and a silent failure would cost you nothing. It is a genuinely clever library and for that job it is faster than anything you would commission.

When the data is rendered by JavaScript, when the site pushes back, when the result has to be trustworthy on a schedule, or when the output has to join cleanly to something else — the library is not the bottleneck you are trying to remove, and building the other six layers around it yourself is the actual project.

**That is the part I get hired for.** If you are not sure which side of the line you are on, [send me a message](/#contact) with the URL and what you want out of it, and I will tell you straight — including telling you to use the free library, which happens often enough that it is worth asking. If it does need a build, you get a fixed price within 24 hours; [what these projects typically cost](/blog/how-much-does-web-scraping-cost) is written up in full, and [the auction automation service](/services/car-auction-automation) covers what a build includes.
    `
  },
  {
    id: 22,
    slug: "fuel-prices-used-vehicle-values",
    tag: "Market Data",
    emoji: "⛽",
    color: "linear-gradient(135deg, #2b1e08 0%, #2a1608 100%)",
    metaTitle: "Fuel Prices and Used Vehicle Values",
    title: "How Fuel Prices Move Used Vehicle Values — and How to Track It in MMR",
    summary: "Fuel prices move truck and hybrid values on a predictable lag. How the lag works, how big it gets, and how to track it in MMR before the repricing hits.",
    keywords: ["fuel prices used car values", "gas prices truck values", "fuel price car depreciation", "mmr segment trends", "used truck values fuel", "hybrid resale value fuel prices"],
    date: "August 23, 2026",
    readTime: "9 min read",
    content: `
## The relationship is real, and almost everyone models it wrong

When fuel gets expensive, big thirsty vehicles get cheaper. Everybody in the business knows this. The 2008 spike and the 2022 spike both demonstrated it clearly enough that nobody argues about the direction.

What people get wrong is everything else: **how big the move is, which vehicles it touches, how long it takes, and whether it comes back.** Those four are where money is actually made or lost, and none of them is intuitive.

This is not a piece about what fuel costs today. It is about the mechanism, because the mechanism is stable and the price is not — and because the only number that matters for your lot is the one you measure in your own segments, not one you read in an article.

## Nothing happens on the day

The single most expensive mistake is treating a pump price move as though it reprices inventory that week. It does not. There is a chain, and each link takes time.

![Diagram of the lag between a fuel price move and used vehicle values: pump price moves on day zero, retail shopping behaviour shifts within days, auction and MMR values follow over two to eight weeks, and dealer inventory is repriced last](/img/diagrams/fuel-price-lag.svg)

*The gap between the pump and the block is the whole opportunity — and the whole risk.*

**Retail intent moves first, and fast.** Shoppers change what they search for within days. A household that was cross-shopping a full-size truck starts looking at a mid-size one. Nothing has been bought yet, and no published value has changed.

**Retail transactions follow.** People who were already in-market complete or abandon purchases over the following weeks. Days-to-turn on the affected segments starts drifting before any price does.

**Wholesale follows retail.** Dealers who are struggling to move a segment stop buying it, and the ones holding too much of it start dumping. Only now do auction values move — and published market values are backward-looking by construction, because they are built from sales that already happened.

**Your lot moves last**, unless you were watching the earlier links.

That ordering is the actionable part. By the time a segment's published value has visibly dropped, the repricing has already happened to you. The dealers who come out ahead are reading days-to-turn and retail asking prices, which move first, rather than waiting for the value guide to confirm what it can only tell them late.

## What actually moves, and what does not

"Fuel-thirsty vehicles drop" is too coarse to trade on. The response is concentrated and very uneven.

**Most sensitive** — full-size SUVs and half-ton and larger trucks bought for personal use, plus performance vehicles with poor economy. These are the ones where a monthly fuel bill is a real share of the cost of ownership and where a buyer has an obvious cheaper substitute.

**Barely sensitive** — work trucks. This is the one that surprises people. A contractor who needs a three-quarter-ton to tow does not have a substitute. Demand is close to inelastic, and the values behave far more like a commercial equipment market than a consumer one. Discounting a work truck because fuel got expensive is leaving money on the table.

**Moves the other way** — hybrids and efficient compacts, which get bid up. The gain here is usually smaller in dollar terms than the loss on the truck side, but on a percentage basis it can be sharp, because the supply of used hybrids cannot expand quickly.

**Complicated** — EVs. The naive read is that expensive fuel helps EV values, and directionally it does. But EV pricing is dominated by other forces — new-model price cuts, incentive changes, battery warranty age, charging access — that routinely swamp the fuel effect entirely. Do not attribute an EV price move to fuel without ruling those out first.

**Segment matters more than the headline.** Two vehicles with similar fuel economy can behave completely differently depending on whether their buyers have a substitute. Substitutability is the real variable; fuel economy is just a proxy for it.

## The asymmetry nobody prices in

Values fall faster on the way up than they recover on the way down.

When fuel spikes, dealers who are long the wrong segment sell into a market that has already turned, and the drop is quick. When fuel falls back, buyers do not return at the same speed — the memory of the spike lingers, and anyone who just got burned on a fuel bill is slower to commit than they were to flee.

**The practical consequence:** a segment that dropped sharply may take substantially longer to come back than it took to fall, and holding through the dip in expectation of a fast recovery ties up floor plan for longer than the model in your head says. That is a financing cost, and at anything above trivial interest rates it is not a small one.

## Rules of thumb are worse than no rule

You will hear numbers like "a dollar at the pump is worth X percent on big SUVs." Ignore them, for three reasons:

- **The elasticity is not constant.** A move from a low base is absorbed. The same absolute move from an already-high base, when it is straining household budgets, produces a much larger response
- **Direction matters** — see the asymmetry above. A single coefficient cannot represent both directions
- **It is regional.** Fuel prices, commute distances and vehicle mix vary enormously by state. A national average describes almost nobody's actual market

Which is why the answer is not a better rule of thumb. It is measuring your own segments, in your own region, from data you already have access to.

## The four numbers worth tracking

If you want to see this coming rather than discovering it in an appraisal, these are the ones that matter, roughly in the order they move:

**1. Retail asking prices by segment, in your region.** The earliest signal, because a dealer changing an asking price is expressing a view before any transaction confirms it. Pulled from the marketplaces and dealer sites you compete against — that is part of what [car auction automation](/services/car-auction-automation) is for.

**2. Days-to-turn by body style.** Listing appearance and disappearance dates give you this. It moves before price does, because dealers hold before they cut. A widening days-to-turn on one segment while the rest of the lot is stable is the clearest early warning there is.

**3. Wholesale values by segment, week over week.** [MMR from Manheim](/manheim-mmr-scraper) is the standard reference, and the useful form is not a snapshot but a trend line per segment, so you can see the slope rather than a number. If you are not clear on what MMR represents and what it does not, [start here](/blog/what-is-mmr-manheim-market-report).

**4. The spread between retail asking and wholesale.** This is the one almost nobody tracks and it is the most informative of the four, because it tells you whether a segment's move is a genuine demand shift or a temporary supply glut. A widening spread means retail has not yet followed wholesale down — which is either an opportunity or a warning depending on which side of the trade you are on.

None of that is exotic data. It is all in sources you either already subscribe to or can read publicly. The work is not obtaining it — it is getting it into one table, weekly, with the segments defined the way *your* lot is segmented rather than the way a national report segments it.

## What that looks like built

A pipeline that runs weekly and produces one sheet:

- Row per segment, defined by you — not "SUV" but "full-size SUV, 2019–2022, under 80k"
- Wholesale value this week, last week, four weeks ago, and the slope
- Median retail asking price across your competitive set, and its slope
- Median days-to-turn, and its slope
- The retail-to-wholesale spread and whether it is widening or narrowing
- A flag when any segment's slope changes sign

That last line is the point of the entire exercise. You are not trying to read a dashboard every morning. You are trying to be told, once, when something you own has started behaving differently — and to be told in week two rather than week eight.

That is the same machinery as [car auction automation](/services/car-auction-automation): the data sources are ones you already have, and the build is the part that turns them into a table and an alert. It sits alongside [pricing used cars against live market data](/blog/price-used-cars-market-data), which covers the appraisal side of the same problem.

## The honest limits

**Fuel is one input among several, and often not the largest.** Interest rates, off-lease supply volumes, new vehicle availability, tariffs, incentive changes and plain seasonality all move used values, sometimes hard enough to hide a fuel effect completely or to look exactly like one. A model that attributes every move in a truck segment to fuel prices will be confidently wrong on a regular basis.

**This will not predict a fuel price.** Nothing does, reliably, and anyone selling you a system that claims to is selling you something else. What it does is shorten your reaction time from weeks to days once a move has started — which is a smaller claim and an achievable one.

**Correlation in your own data is still correlation.** If trucks softened the same month fuel rose, rates also moved and so did off-lease volume. Treat the numbers as an early warning to look harder, not as an explanation.

[Send me a message](/#contact) if you want this built. Tell me the segments you actually stock, the region you buy and sell in, and which data you already subscribe to — MMR, an inventory feed, an auction account. I will tell you what is worth pulling, what you already have that you are not using, and what it would cost. Fixed price, quoted within 24 hours.
    `
  },
  {
    id: 23,
    slug: "government-off-lease-car-auctions-dealers",
    tag: "Sourcing",
    emoji: "🏛️",
    color: "linear-gradient(135deg, #0b2418 0%, #0a1d2a 100%)",
    metaTitle: "Government & Off-Lease Car Auctions for Dealers",
    title: "Government and Off-Lease Car Auctions: Where Dealers Find Them and How to Watch Them Daily",
    summary: "GSA Auctions, GovDeals, police and municipal sales, and the off-lease closed-sale chain — where the cars come from, what makes them good buys, and how to monitor them without checking ten sites a day.",
    keywords: ["government car auctions for dealers", "off lease vehicle auctions", "gsa auctions vehicles", "govdeals cars", "lease return car sales", "fleet vehicle auctions", "where do dealers buy cars"],
    date: "October 7, 2026",
    readTime: "8 min read",
    content: `
## Not every good car goes through a Tuesday lane

Most dealers buy most of their cars at wholesale auctions, and for good reason — that is where the volume is. But every other buyer is in the same lane looking at the same run list, and the competition shows up in the price.

Two other supply channels are worth a regular look because fewer dealers work them properly: **government and fleet sales**, and **off-lease and lease-return sales**. Neither is hidden. Both are simply awkward to watch, which is exactly why the cars in them are sometimes cheaper.

## Government vehicle auctions

Government agencies retire vehicles constantly — by age, by mileage, or when a fleet contract changes. Those vehicles are sold online through a handful of platforms:

- **GSA Auctions** — the US General Services Administration's sale for surplus federal property, including retired federal fleet cars, trucks and SUVs.
- **GovDeals** — a marketplace used by thousands of state and local agencies: cities, counties, school districts, utilities and police departments.
- **Public Surplus** and similar sites — used by many local agencies and universities.
- **Police and municipal auctions** — impounds, seized vehicles and retired patrol units, often run locally or through a regional auction house.

### Why dealers like them

Fleet vehicles are usually maintained on a schedule, have one owner, and are retired on predictable rules. Pickups, vans and sedans from city and utility fleets are common. Listings often include mileage, condition notes, photos and sometimes the VIN.

### What to watch for

Condition varies more than the paperwork suggests. Police units carry high idle hours that the odometer does not show. Utility trucks may have upfits that help or hurt resale. Some lots are sold strictly as-is with limited inspection. Treat a government listing like any other wholesale car: **run the VIN through Carfax, AutoCheck and MMR before you bid, and set a max that holds your margin after recon and transport.**

### Why most dealers do not work them

The supply is spread across thousands of agencies and locations, each lot closes on its own schedule, and the search tools were built for public compliance rather than for a buyer with a margin target. Checking them every day by hand is a chore nobody keeps up.

## Off-lease and lease-return sales

When a lease ends, the car usually goes through a sequence before it reaches the open market:

1. **The grounding dealer** — the dealer where it is returned often gets the first option to buy it.
2. **A closed or captive sale** — if the grounding dealer passes, the finance company typically offers it to its own franchise dealers through an online closed sale.
3. **The open sale** — whatever is left goes to a wholesale auction where any dealer can bid.

Every step widens the pool of buyers. If you have access to a closed sale for a brand, seeing a car there — before it reaches the open lane — is where the better price usually is. Off-lease cars are also attractive stock in themselves: typically two to four years old, mileage within the lease limit, and often with service history.

The difficulty is the same as with government sales: closed-sale inventory turns over daily, sits behind separate logins, and is easy to miss.

## How to monitor all of it without ten tabs a day

The fix is not more discipline. It is a monitor that does the checking for you:

- **One buy box, applied everywhere** — years, makes and models, mileage, price ceiling, distance from your store, title rules.
- **Only new listings** — compared against what was seen yesterday, so the morning list is short.
- **Every VIN checked** — Carfax, AutoCheck and MMR on your own accounts, with a margin calculated from your recon and transport numbers.
- **Closing times highlighted** — so government lots ending today are at the top.
- **One morning email** — ranked by margin, with a Google Sheet holding the history.

Government sites are public and can be read at a gentle pace. Closed lease sales, fleet portals and OPENLANE run on your own account. Nothing is bid on automatically — the monitor finds and checks, and your buyer decides.

## Where this fits

For most dealers this is not a replacement for auction buying. It is a second channel that runs in the background and occasionally hands you a car the lane would have made more expensive. Combined with an [overnight auction watch list](/services/auction-run-list-triage) and [daily marketplace monitoring](/services/marketplace-government-lease-sales), it means the morning starts with every source already checked.

[Send me a message](/#contact) with the sources you buy on — or want to — and your buy box. I will tell you which are worth monitoring and what it would cost. Fixed price, quoted within 24 hours.
    `
  },
  {
    id: 24,
    slug: "mmr-carfax-autocheck-on-listing-extension",
    tag: "Dealer Tools",
    emoji: "🧩",
    color: "linear-gradient(135deg, #1a1033 0%, #0a1d2a 100%)",
    metaTitle: "See MMR, Carfax & AutoCheck on the Listing",
    title: "Stop Copying VINs: See MMR, Carfax and AutoCheck on the Auction Listing Itself",
    summary: "The copy-VIN, open-tab, paste, come-back loop costs a buyer hours a week. How a custom browser extension reads the VIN off the page and shows MMR, history and your margin on the same screen.",
    keywords: ["mmr carfax autocheck extension", "vin scanner extension for dealers", "autoniq alternative", "see mmr on auction listing", "dealer chrome extension", "auction vin lookup tool", "carfax autocheck same screen"],
    date: "October 7, 2026",
    readTime: "6 min read",
    content: `
## The loop every buyer knows

You are on an auction listing. The car looks right. Now you need to know whether it is.

You copy the VIN. Open Carfax in a new tab, paste, wait. Open AutoCheck, paste, wait. Open Manheim MMR, paste, adjust mileage and grade, wait. Open your margin sheet and type the numbers in. Then go back to the listing — and do it again for the next car.

Call it two minutes a car, done carefully. Fifty cars on a busy morning is well over an hour and a half of copying and pasting, and that is before a single decision is made. Worse, the friction means some cars never get checked at all.

## What an extension does instead

A browser extension sits inside the page you are already looking at. When you open a listing it:

1. **Reads the VIN straight off the page** — no copying.
2. **Fetches the reports you already pay for** — Carfax, AutoCheck, Manheim MMR and book values — through your own logged-in accounts.
3. **Shows them in one panel on the same screen** — title, owners, accidents, MMR and its range, next to the photos and condition report.
4. **Runs your numbers** — your recon estimate, auction fees, transport from that location and your margin floor — and ends on a **max bid**.

Nothing to paste, nothing to come back to. The buyer reads one panel and decides.

## Why not just use Autoniq or a similar tool?

Tools like Autoniq exist because this workflow is obvious, and they are good at it. Two things push dealers toward a custom build:

- **They do not know your business.** A rented panel shows what the car is. It does not know your recon rates, your transport cost from that auction or your margin floor — so the last and most important step still happens in a spreadsheet.
- **Price.** A custom extension is $50 to $100 a month with no setup fee, depending on which data sources it shows — and updates when a site changes are included.

There is also coverage: many dealers buy on a regional or private portal that off-the-shelf tools do not support. A custom extension is built for the sites you actually use — Manheim, ADESA, ACV, OPENLANE, a private dealer marketplace or your own portal.

## What it needs from you

- Your existing accounts — Carfax, AutoCheck, Manheim and any book-value service. The extension uses your access; it does not provide its own.
- The list of sites you buy on.
- How you work out a max bid today — even if it lives in your head.

## What it does not do

It does not bid. Automated bidding is prohibited on most auction platforms and a bug would mean owning a car nobody chose. It also does not share data or credentials between dealers. The extension reads, fetches, calculates and shows — your buyer decides.

## Pair it with an overnight watch list

The extension makes each car fast. An [overnight run-list triage](/services/auction-run-list-triage) makes sure the right cars are in front of you in the first place — the sale read while you sleep, filtered, checked and in your watch list by morning. Together, the buyer walks in, opens the watch list, and every listing already shows its numbers.

See [how custom dealer extensions work](/services/dealer-browser-extension), or [send me a message](/#contact) with the sites you buy on. Fixed quote within 24 hours.
    `
  },
];

export const projects = [
  {
    id: 12,
    type: "Wholesale",
    emoji: "📈",
    color: "#34d399",
    title: "Major Auto Sales — From 15 Cars to 200 as a Wholesaler",
    client: "Ricky, Major Auto Sales — New York, USA",
    description: "Daily auction and marketplace automation for a New York wholesaler. Every auction sale and the marketplaces he buys from are worked overnight, every car checked against his buy box with history and MMR, and the watch list is ready when he walks into the office at 6 AM. Inventory grew from 10–15 cars to 150–200.",
    challenge: "Ricky was running a small operation with 10 to 15 cars in inventory. Sourcing meant working auction run lists and marketplaces by hand, one car at a time, so the number of cars he could find and check was capped by the hours in his morning — and the business could not grow past what one person could look at.",
    solution: "Set up overnight automation across the auctions and marketplaces he buys on. Each sale is read in full, his buy box is applied to every car, VINs are checked for history and market value, cars that fail his rules are dropped, and the rest go into his watch list with a note and a max bid. The same daily routine runs on the marketplaces he uses, so new matches are waiting with everything else. All of it runs on his own accounts and is ready before he arrives.",
    result: "Ricky walks into the office at 6 AM and the work is already done — auctions checked, marketplaces checked, watch list ready. With sourcing no longer limited by his own hours, Major Auto Sales grew from 10–15 cars in inventory to 150–200 cars as a wholesaler.",
    stack: ["Python", "Playwright", "Selenium", "Pandas", "Scheduling", "Email reports"],
    details: ["Daily auction run lists", "Daily marketplace monitoring", "Buy box applied to every car", "History and MMR per VIN", "Notes and max bid per car", "Watch list ready by 6 AM", "Runs on the client's own accounts", "Inventory grew from 10–15 to 150–200 cars"]
  },
  {
    id: 1,
    type: "Automotive",
    emoji: "🚗",
    color: "#34d399",
    title: "Car Auction Intelligence System",
    client: "Used Car Dealership, New York",
    description: "Full automation pipeline that scrapes live auction listings from Manheim MMR, BacklotCars, Autoniq, and ADESA daily. Compares each vehicle's auction price against its MMR market value, filters by profit margin, and sends formatted HTML email alerts to the dealer team every morning.",
    challenge: "The dealer's team was spending 3–4 hours every morning manually checking prices across multiple platforms and still missing profitable deals because competitors were faster.",
    solution: "Built a fully automated Python pipeline with cookie management, proxy rotation, and scheduled execution. The system runs at 6 AM daily, processes hundreds of listings, and delivers a prioritized deal list by email before the team starts work.",
    result: "Saves 8+ hours per week. Client finds 3x more profitable vehicles. Deals are spotted within minutes instead of hours.",
    stack: ["Python", "Selenium", "Pandas", "Gmail SMTP", "Cookie Management", "Scheduling"],
    details: ["Manheim MMR live pricing", "BacklotCars auction scraper", "Autoniq data integration", "ADESA listings", "HTML email alerts", "Profit margin calculation", "Chrome remote debugging"]
  },
  {
    id: 7,
    type: "Sourcing",
    emoji: "🔍",
    color: "#fbbf24",
    title: "Facebook Marketplace Vehicle Scraper",
    client: "Car Dealer, Florida",
    description: "Automated scraper collecting vehicle listings from Facebook Marketplace across multiple US cities — make, model, year, price, mileage, seller contact info, and photos. Built for dealer private-party sourcing.",
    challenge: "Dealer wanted to source vehicles from private sellers on Facebook Marketplace but browsing manually across 10+ cities was taking hours with inconsistent results.",
    solution: "Built a cookie-authenticated Selenium scraper that navigates Facebook Marketplace, applies filters (vehicle category, location radius, price range), and extracts all listing data including seller contact information.",
    result: "Dealers find and contact private sellers 5x faster. Found vehicles priced 15–30% below retail value consistently.",
    stack: ["Python", "Selenium", "Cookie management", "JSON", "Excel", "Multi-city"],
    details: ["Facebook authentication", "Multi-city search", "Vehicle filter support", "Photo URL extraction", "Seller contact info", "Price and mileage data"]
  },
  {
    id: 10,
    type: "Automotive",
    emoji: "📋",
    color: "#34d399",
    title: "Run-List Triage — 5,000 Cars Cut to a Working Watch List",
    client: "Used Car Dealer, Southeast US",
    description: "Overnight triage of a full auction run list. Every lot in the sale is pulled, the dealer's own buy box is applied, each surviving VIN is enriched with title status, Carfax, AutoCheck, MMR and book values, a note is written per car, failing cars are dropped with their reason logged, and the rest are pushed into the auction's own watch list ranked by margin — all before the desk opens.",
    challenge: "A typical sale ran four to five thousand lots and the buyer had under two hours before the first lane. He worked the list top-down until the sale started, which meant roughly the last eighty percent of it was never looked at. The profitable cars were not politely waiting in the first four hundred rows. On top of that, every car he did reach needed three more tabs — Carfax, AutoCheck, an MMR lookup — and a note typed by hand, so the deeper he went the slower he got.",
    solution: "Built a scheduled overnight pipeline against the dealer's own auction accounts. Stage one reads the complete run list rather than a sample. Stage two applies the buy box as configuration, not code — year bands, mileage ceilings by make, a condition-grade floor, clean-title-only, no announced frame — which on a typical sale removed about two thirds of it. Stage three enriches every surviving VIN with the lookups the buyer was doing by hand, at a request rate that does not hammer the accounts. Stage four writes a note per car in the desk's existing wording, ending with the maximum bid that holds their margin after recon and fees. Stage five drops cars that fail the margin or history rules, logging the reason for each so the calls can be audited rather than trusted. Stage six pushes the survivors into the auction platform's own watch list and emails a ranked copy.",
    result: "A 5,000-lot sale now arrives as roughly 800 cars, each annotated with a max bid, in the watch list by 6 AM. The buyer starts the day bidding instead of reading. Cars from the back half of the run list — previously invisible — now account for a meaningful share of what gets bought.",
    stack: ["Python", "Selenium", "Playwright", "Pandas", "Cookie management", "Cron scheduling", "SMTP"],
    details: ["Full run list, not a sample", "Buy box as configuration", "Per-VIN title, Carfax, AutoCheck, MMR", "Auto-written notes in the desk's format", "Max bid per car after recon and fees", "Dropped-car reason log", "Push into the auction's own watch list", "Failure alerting so silence never means no cars"]
  },
  {
    id: 11,
    type: "Automotive",
    emoji: "🧩",
    color: "#a78bfa",
    title: "Custom VIN Panel Extension — An Autoniq Alternative, Built to Spec",
    client: "Wholesaler, Florida",
    description: "A Chrome extension that injects a data panel into the auction listing page. It reads the VIN off the page, decodes it, pulls title status, Carfax, AutoCheck, MMR and book values through the client's own subscriptions, then runs the client's own recon rates, fees and margin floor on top and ends on a maximum bid and a plain BID or PASS.",
    challenge: "The client was paying a per-seat monthly subscription for a VIN-scanning tool and still finishing every car in his own spreadsheet, because the tool showed him what the car was but not whether to buy it — it had no idea what his recon rates, transport cost or margin floor were. Two buyers meant two subscriptions, and growing the desk meant growing the bill. He also bought on a private dealer marketplace the tool did not support at all, so on those cars he was back to nine tabs.",
    solution: "Built a Manifest V3 extension targeting the four portals he actually buys on, including the private marketplace. It detects the VIN on the listing, fetches each report through his own logged-in sessions and subscriptions, and renders one normalised panel so the layout reads identically whichever site the car is on. The arithmetic he had been doing in a spreadsheet — recon by his own labour and parts rates, auction fees, transport from that location, floor plan, then his margin floor — was moved into the panel, so it ends on the number he actually needed. The source was handed over with the build.",
    result: "Nine tabs down to one. Installed across the whole desk at no extra cost, since there is no per-seat licence, and the build cost less than four months of the subscription it replaced. Coverage now includes the private marketplace that no off-the-shelf tool supported.",
    stack: ["JavaScript", "Manifest V3", "Chrome Extension APIs", "Python", "REST APIs", "Playwright"],
    details: ["VIN read from the listing or scanned", "Full VIN decode with trim and drivetrain", "Title, Carfax and AutoCheck in one panel", "MMR and book values side by side", "Client's own recon and fee maths", "Max bid and BID / PASS verdict", "Four portals, one normalised layout", "Source code owned by the client"]
  }
];

export const platforms = [
  { name: "Manheim MMR", emoji: "🔨", cat: "Wholesale auction" },
  { name: "ADESA", emoji: "🏦", cat: "Wholesale auction" },
  { name: "ACV Auctions", emoji: "📱", cat: "Wholesale auction" },
  { name: "OPENLANE", emoji: "🛣️", cat: "Wholesale auction" },
  { name: "BacklotCars", emoji: "🔗", cat: "Wholesale auction" },
  { name: "SmartAuction", emoji: "🏷️", cat: "Wholesale auction" },
  { name: "EDGE Pipeline", emoji: "⚡", cat: "Wholesale auction" },
  { name: "Copart", emoji: "🔧", cat: "Salvage" },
  { name: "IAA", emoji: "🚧", cat: "Salvage" },
  { name: "Carfax", emoji: "📄", cat: "History report" },
  { name: "AutoCheck", emoji: "📋", cat: "History report" },
  { name: "NHTSA vPIC", emoji: "🔎", cat: "History report" },
  { name: "Autoniq", emoji: "📊", cat: "Dealer tool" },
  { name: "AutoTrader", emoji: "🚘", cat: "Retail listings" },
  { name: "CarMax", emoji: "🚗", cat: "Retail listings" },
  { name: "Cars.com", emoji: "🅿️", cat: "Retail listings" },
  { name: "CarGurus", emoji: "📈", cat: "Retail listings" },
  { name: "AutoScout24", emoji: "🌍", cat: "Retail listings" },
];


/* Homepage FAQ — rendered on the page, emitted as FAQPage schema, and read
   by scripts/prerender.js. One source so the three can never disagree. */
export const FAQS = [
  {
    q: "Can you build an extension that shows MMR, Carfax and AutoCheck right on the listing?",
    a: "Yes — that is one of the main things I build. A custom browser extension reads the VIN straight off the auction or marketplace page, pulls Manheim MMR, Carfax, AutoCheck and book values through your own accounts, and shows them in one panel on the same screen, with your recon and margin maths ending on a max bid. No copying the VIN, no opening five tabs, no coming back to the car page. It works on Manheim, ADESA, ACV, OPENLANE and the private portals you buy on, and it costs $50 to $100 a month with no setup fee.",
  },
  {
    q: "Besides wholesale auctions, which marketplaces and sales can you watch?",
    a: "OPENLANE, Facebook Marketplace, eBay Motors, Craigslist and private-party listings, plus government sales like GSA Auctions, GovDeals, Public Surplus and police or municipal auctions, and the off-lease, lease-return, fleet and repo sales you have access to. Each one is checked daily against your buy box, and only new matches reach you — ranked by margin in a morning email, with instant alerts for fast-moving private-party cars.",
  },
  {
    q: "Can you connect Manheim, Carfax, AutoCheck and Autoniq into one system?",
    a: "Yes. Custom dealer software puts the subscriptions you already pay for to work together: cars from every source in one dashboard, history, MMR and book values pulled per VIN automatically, your buying rules applied, and bought cars handed to your DMS. It is built in stages at a fixed price each, and you own the code.",
  },
  {
    q: "How do you get through 5,000 cars when my buyer can't?",
    a: "Because it runs overnight and it does not get tired. The run list itself is read in minutes. Your filters then remove most of the sale before anything expensive happens — on a typical five-thousand-lot sale that is around two thirds gone. Only what survives gets the per-VIN lookups, and those run through the night at a rate that does not hammer your accounts. By 6 AM the work your buyer could not finish in two hours is done.",
  },
  {
    q: "What filters can I set?",
    a: "Whatever you actually buy on, because it is configuration rather than a fixed feature list. Year bands, mileage ceilings that differ by make, a condition-grade floor, clean-title-only or specific brands you will accept, announced frame or odometer flags, accident and owner ceilings from the history report, a recon estimate ceiling at your own rates, a minimum margin against MMR, specific makes, models and trims, lane, location and transport distance. You tell me the rule in plain English and it applies from the next sale — no revision fee, no logging into anything.",
  },
  {
    q: "Do the notes actually get written for me?",
    a: "Yes, one per car, in the format your desk already reads: title and owner count, what the history report said, the MMR and its range, the grade and whether frame was announced, the recon estimate, and then the maximum bid that still holds your margin. Written the same way every time, which also means that when a car turns out badly the note says what was known before the bid.",
  },
  {
    q: "Can it put the cars into my watch list on the auction site?",
    a: "Yes, on any platform that has a watch list, using your own logged-in account. That is the version most dealers want — your buyer logs in and the cars are already flagged, rather than having a spreadsheet to work from. You get the ranked email or Google Sheet as the readable copy alongside it.",
  },
  {
    q: "How much does this cost?",
    a: "Overnight auction triage is $500 a month per auction site, covering every sale on that site Monday to Friday — three sales a day is fifteen a week, all included, with no per-car charge. The custom extension that shows MMR, Carfax and AutoCheck on the car page is $50 to $100 a month with no setup fee. A one-off pull of a single sale is $150, credited to your first month. Marketplace monitoring and custom software are quoted at a fixed price within 24 hours.",
  },
  {
    q: "Can I see it work before I pay for a build?",
    a: "That is the normal way in. Tell me the auction and what a good car looks like to you, and I will triage one real upcoming sale and send you the watch list it produces. If the calls look wrong, we fix the rules then — before you have committed to anything. That trial run is the $150 one-off pull, credited to your first month if you go ahead.",
  },
  {
    q: "The portal I buy on isn't one of the big names. Can you still do it?",
    a: "Almost certainly, and this is the most common reason a dealer wrongly assumes this is not for them. Manheim, ADESA and ACV are the platforms that get written about, but most of the trade buys on something nobody outside their region has heard of — a closed dealer-only marketplace, a regional auction's own site, a lender's repo portal, an in-house system with a listings module bolted on. The mechanics do not change with the logo, and an obscure portal is usually easier because nobody has ever bothered to defend it. Send me the name and a screenshot or two of the screens your buyer uses and you will have a straight answer within a day — including if the answer is that it is not worth doing.",
  },
  {
    q: "Do I need my own auction and report accounts?",
    a: "Yes. Everything runs through the accounts you already hold and are licensed to use — your auction logins, your Carfax, your AutoCheck, your Manheim access. I do not resell auction data, share credentials between clients, or create access you do not have. If you are not subscribed to something, no tool of mine or anyone else's can conjure it, and I will say so before you pay rather than after.",
  },
  {
    q: "Will it bid for me?",
    a: "No, and I will not build that. Most auction platforms prohibit automated bidding outright, and the failure mode of a bug in a bidding bot is that you own a car nobody chose. The system finds, checks, annotates and ranks. Your buyer bids.",
  },
  {
    q: "What happens when an auction site changes and it breaks?",
    a: "It will break eventually — every scraper does, and anyone who tells you otherwise is selling something. The difference is that you hear about it from an alert the same morning rather than from three quiet days of an empty watch list. Fixes on systems I built are covered by the monthly, not quoted as a new project.",
  },
  {
    q: "How long until it is running?",
    a: "Most triage builds are live in 3 to 7 days; extensions take 5 to 10 depending on how many portals and report sources are involved. You see output from your real buy box in the first couple of days, so any disagreement about what counts as a good car gets settled before the full build.",
  },
  {
    q: "Who will I actually be working with?",
    a: "Me. AutoSmartCode is one developer, not an agency — the person who writes your code is the person who answers your emails, and already knows what MMR, a grade 3.1 and an announced frame mean. No account managers, no handoffs, no sales rep in between.",
  },
];


/* Lookups must stay unfiltered — see note above. */
export const blogBySlug  = slug => blogs.find(b => b.slug === slug);
