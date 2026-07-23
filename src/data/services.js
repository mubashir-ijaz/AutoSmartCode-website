/**
 * Service landing pages — one page per commercial search term.
 *
 * Search Console showed the site picking up impressions for narrow queries
 * ("dealer inventory scraper", "autoscout24 scraper", "carmax scraper") at
 * position ~56 with nothing but the homepage to rank. A homepage cannot rank
 * for six different services at once; each of these is the page Google gets
 * to put against one intent.
 *
 * Shape:
 *   slug        URL segment under /services/
 *   nav         short label for menus
 *   h1          the visible page heading (carries the primary keyword)
 *   metaTitle   <title> — keep under ~60 chars before the brand
 *   metaDesc    <meta description> — 140–158 chars, written to be clicked
 *   keywords    the query cluster this page is answering (used in schema)
 *   sections    body copy: { h, p[], list? }
 *   deliverables/platforms/stack   the scannable proof columns
 *   faqs        rendered on the page AND emitted as FAQPage schema —
 *               never emit a question that isn't visible on the page
 *   related     slugs of sibling pages, for internal linking
 *   caseStudy   project id in content.js to link as proof
 */

export const services = [
  /* ------------------------------------------------------------------ */
  {
    slug: "car-auction-automation",
    nav: "Car Auction Automation",
    emoji: "🔨",
    accent: "green",
    color: "#34d399",
    h1: "Car Auction Automation for Dealers and Wholesalers",
    metaTitle: "Car Auction Automation — Manheim, ADESA & BacklotCars Data",
    metaDesc:
      "Automated car auction data pipelines for US dealers. Pull live listings from Manheim, ADESA, BacklotCars and Autoniq, score them against MMR, and get the profitable ones emailed before the lane opens.",
    keywords: [
      "car auction automation",
      "manheim mmr automation",
      "adesa auction data",
      "backlotcars scraper",
      "autoniq automation",
      "wholesale car buying software",
      "auction deal finder",
    ],
    hero:
      "Your buyers open six auction tabs every morning and still miss cars. This replaces that hour with an email that already has the answer in it.",
    sections: [
      {
        h: "What car auction automation actually does",
        p: [
          "A car auction automation system logs into the auction platforms you already have accounts on, reads every run list and live listing that matches your buy box, and compares each vehicle against its market value before a person looks at it. What lands in your inbox is not a data dump — it is a ranked list of the cars worth bidding on, with the numbers that justify the bid attached.",
          "The work it removes is the work nobody wants: opening Manheim, then ADESA, then BacklotCars, then Autoniq, filtering each one by hand, copying VINs into a spreadsheet, and pulling condition reports one at a time. That routine takes a buyer three to four hours a day and it still misses cars, because the profitable ones move before anyone gets to the fourth tab.",
        ],
      },
      {
        h: "Auction platforms this covers",
        p: [
          "Every platform below is one I have built against for a paying dealer, using the dealer's own licensed account. Anything not on this list is usually still doable — the pattern is the same, only the login and the page structure change.",
        ],
        list: [
          "Manheim and Manheim MMR — run lists, live pricing, MMR market values",
          "ADESA — listings, condition grades, sale calendars",
          "BacklotCars — inventory, buy-now pricing, offer history",
          "Autoniq — VIN scan data and valuation lookups",
          "EdgePipeline and ACV — listings and condition reports",
          "Copart and IAA — salvage and total-loss listings",
          "Facebook Marketplace, Craigslist and OfferUp — private-party sourcing",
        ],
      },
      {
        h: "The arithmetic it does for you",
        p: [
          "Pulling the listings is the easy half. The half that makes money is the scoring: for each vehicle, the system takes the auction price, adds your transport, recon and fee assumptions, compares that landed cost against MMR or your own retail comps, and drops anything that does not clear the margin you set.",
          "You set the buy box once — years, mileage bands, makes, minimum margin, maximum recon, geography — and the system applies it identically to every car, every day, without the fatigue that makes a human skim the last thirty rows of a run list.",
        ],
      },
      {
        h: "How it reaches you",
        p: [
          "Most dealers take a formatted HTML email at 6 AM, sorted best deal first, with a photo, the key numbers and a direct link to the lane. Others take a Google Sheet the whole desk can open, a Slack or Telegram alert the moment a matching car appears, or a write straight into their DMS or inventory database.",
          "Systems that run unattended need to tell you when they stop working, so every build ships with alerting — if a login expires or a site changes its markup, you hear about it from the system rather than from a quiet inbox.",
        ],
      },
      {
        h: "Access, credentials and what is fair game",
        p: [
          "This runs on accounts you hold and are entitled to use. I do not resell auction data, share credentials between clients, or work around a platform's licensing — a system built on borrowed access is a system that dies the first time somebody audits it, and it takes your account with it.",
          "Where a platform publishes an official API or data feed, that is what the build uses. Where it does not, the system automates the same browser session your buyer would have opened anyway, at a request rate that does not hammer the site.",
        ],
      },
    ],
    deliverables: [
      "Daily ranked deal email before the lane opens",
      "Buy-box filtering you control without touching code",
      "Landed-cost and margin calculation per vehicle",
      "MMR / market-value comparison on every VIN",
      "Google Sheet, Excel, database or DMS delivery",
      "Slack, Telegram or SMS alerts for instant matches",
      "Failure alerting so silence never means 'no deals'",
    ],
    platforms: ["Manheim MMR", "ADESA", "BacklotCars", "Autoniq", "EdgePipeline", "ACV", "Copart", "IAA"],
    stack: ["Python", "Selenium", "Playwright", "Pandas", "Cookie management", "Proxy rotation", "Cron / scheduling", "SMTP"],
    faqs: [
      {
        q: "Do I need my own Manheim or ADESA account?",
        a: "Yes. The system automates the account you already hold and are licensed to use — it does not create access you do not have, and I do not share credentials between clients. If you have a dealer login, that is all it needs.",
      },
      {
        q: "How much does a car auction automation system cost?",
        a: "A single-platform build with daily email delivery typically lands between $600 and $1,500 depending on how many sites and how much scoring logic is involved. Multi-platform pipelines with MMR reconciliation run higher. Recurring systems are quoted as a build fee plus a small monthly amount that covers hosting and fixes.",
      },
      {
        q: "How long before it is running?",
        a: "Most auction builds are live in 3 to 7 days. You see sample output from your real buy box in the first couple of days, so any misunderstanding about what counts as a good car gets caught before the full build.",
      },
      {
        q: "What happens when an auction site changes its layout?",
        a: "It breaks, like every scraper eventually does — the difference is you find out from an alert the same morning rather than from three quiet days of no deals. Fixes on systems I built are part of the arrangement, not a new project.",
      },
      {
        q: "Can it place bids automatically?",
        a: "I do not build automated bidding. Most auction platforms prohibit it outright, and the downside of a bug in a bidding bot is that you own a car you never wanted. The system finds and ranks; a person decides.",
      },
    ],
    related: ["vehicle-history-reports", "dealer-inventory-scraping", "web-scraping"],
    caseStudy: 1,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "vehicle-history-reports",
    nav: "Vehicle History Reports",
    emoji: "📄",
    accent: "violet",
    color: "#a78bfa",
    h1: "Vehicle History Report Automation — Carfax, AutoCheck and VIN Data",
    metaTitle: "Vehicle History Report Automation — Carfax & AutoCheck at Scale",
    metaDesc:
      "Stop pulling car history reports one VIN at a time. Bulk VIN decoding, automated report retrieval through your own Carfax or AutoCheck dealer account, and every result parsed into one spreadsheet.",
    keywords: [
      "carfax report automation",
      "autocheck report",
      "car history report",
      "vehicle history report api",
      "bulk vin decoder",
      "vin lookup automation",
      "vin history data",
    ],
    hero:
      "One VIN at a time is fine for one car. For a 400-car run list it is a lost afternoon — and the reports end up as 400 PDFs nobody can sort.",
    sections: [
      {
        h: "The problem with car history reports at volume",
        p: [
          "Vehicle history reports are built for looking at one car. You paste a VIN, you read a page, you make a call. That model falls apart the moment you are appraising a whole run list or reconciling a hundred-car inventory, because the thing you actually want — accident count, title brand, owner count, odometer rollback flag, service gaps — is buried in prose across a hundred separate documents.",
          "What this service does is turn that into a table. One row per VIN, one column per fact you care about, sortable, filterable, and joinable against your auction data or your inventory feed.",
        ],
      },
      {
        h: "How the reports get pulled",
        p: [
          "Through your own dealer account. Carfax and AutoCheck both sell dealer subscriptions with report allowances, and if you hold one, the automation drives that session the same way your team would — it just does it four hundred times without stopping for lunch, and it parses each result instead of filing a PDF.",
          "Where you hold an official data agreement, the build uses the API instead of the browser, which is faster, cleaner and does not break when a page is redesigned. If you have an enterprise or API-tier arrangement with either provider, say so up front and the build changes shape accordingly.",
        ],
      },
      {
        h: "Free and public VIN data you may not be using",
        p: [
          "A surprising amount of what dealers pay for is available at no cost and no licensing risk, and a good pipeline pulls it first so paid report credits get spent only where they add something.",
        ],
        list: [
          "NHTSA vPIC — full VIN decode: make, model, year, trim, engine, plant, body class, restraint systems",
          "NHTSA recall and complaint data by VIN or by make and model",
          "NHTSA safety ratings and crash test results",
          "NMVTIS-derived title and brand data through an approved provider",
          "Manufacturer window-sticker and build-sheet lookups where published",
        ],
      },
      {
        h: "What you get back",
        p: [
          "A single sheet or database table where each row is a VIN and each column is a decision input: accident count and severity, title brand, number of owners, reported odometer readings with a rollback flag, service record density, use type — personal, fleet, rental, lease — and open recalls.",
          "Because it is structured, it becomes filterable in ways a PDF never is. Show me every car in this run list with a clean title, one owner, no accidents and no open recall. That query takes a second instead of an afternoon, and it is the same query every day.",
        ],
      },
      {
        h: "Where the line is on licensing",
        p: [
          "Carfax and AutoCheck licence their data; their terms restrict redistribution, and I will not build something that republishes their reports to third parties or resells report access you have not paid for. That is not caution for its own sake — it is the difference between a system you can run for years and one that gets your dealer account terminated.",
          "What is squarely fine: automating your own licensed account for your own inventory, decoding VINs against public government data, and structuring the results for your own internal use. That covers what almost every dealer actually wants. If your use case is outside it, I will tell you before you pay, not after.",
        ],
      },
    ],
    deliverables: [
      "Bulk VIN decode — thousands of VINs in one pass",
      "Automated report retrieval via your own dealer account",
      "Every report parsed into structured columns",
      "Accident, title-brand, owner-count and odometer flags",
      "Open recall check against NHTSA per VIN",
      "One spreadsheet, database table or API endpoint",
      "Joins straight onto your auction or inventory data",
    ],
    platforms: ["Carfax (your account)", "AutoCheck (your account)", "NHTSA vPIC", "NHTSA recalls", "NMVTIS providers", "Window sticker lookups"],
    stack: ["Python", "Requests", "Playwright", "Pandas", "PDF parsing", "REST APIs", "PostgreSQL"],
    faqs: [
      {
        q: "Can you get me Carfax reports without a Carfax account?",
        a: "No. Carfax licences its data and its terms prohibit redistribution — a system built on someone else's access gets shut down and takes the account with it. What I automate is your own dealer subscription, which is exactly what most dealers need and is entirely within their agreement.",
      },
      {
        q: "What is the difference between a VIN decode and a history report?",
        a: "A decode tells you what the car is — make, model, year, trim, engine, plant — and comes free from NHTSA's vPIC database with no licensing at all. A history report tells you what happened to the car: accidents, title brands, owners, odometer readings. Most builds use free decoding for everything and spend paid report credits only where a decision depends on history.",
      },
      {
        q: "How many VINs can it process?",
        a: "Decoding runs to tens of thousands per day with no practical ceiling. Paid report retrieval is capped by whatever your subscription allows, not by the software — the automation is built to respect that limit and to prioritise which VINs are worth a credit.",
      },
      {
        q: "Can this feed into my auction deal-finder?",
        a: "That is the usual reason people ask for it. History data joins onto the auction pipeline on VIN, so the morning deal email arrives with accident count and title status already on each row — and cars with a branded title never make the list in the first place.",
      },
      {
        q: "Do you handle AutoCheck as well as Carfax?",
        a: "Yes, and the same rules apply — your own account, your own inventory. Some dealers run both and reconcile them, which is straightforward once each report is parsed into the same set of columns.",
      },
    ],
    related: ["car-auction-automation", "dealer-inventory-scraping", "web-scraping"],
    caseStudy: 1,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "dealer-inventory-scraping",
    nav: "Dealer Inventory Data",
    emoji: "🚘",
    accent: "cyan",
    color: "#22d3ee",
    h1: "Car Dealer Inventory Scraping — AutoTrader, CarMax, Cars.com and More",
    metaTitle: "Dealer Inventory Scraper — AutoTrader, CarMax, AutoScout24",
    metaDesc:
      "Scrape live dealer inventory and vehicle listings from AutoTrader, CarMax, Cars.com, CarGurus, AutoScout24 and Carsales. Every listing, price, VIN and photo in one clean spreadsheet, refreshed daily.",
    keywords: [
      "dealer inventory scraper",
      "autotrader scraper",
      "carmax scraper",
      "autoscout24 scraper",
      "carsales scraper",
      "cars.com data scraping",
      "cargurus scraper",
      "vehicle listing data",
      "automate vehicle listings",
    ],
    hero:
      "Every competitor's price, every listing, every day. What used to be a market feeling becomes a sortable column.",
    sections: [
      {
        h: "Why dealers scrape listing sites",
        p: [
          "Pricing a car against the market means knowing what the market is asking, and the market changes daily. A dealer inventory scraper reads the live listings on the sites your buyers actually shop — AutoTrader, Cars.com, CarGurus, CarMax, and their equivalents outside the US — and hands you the whole comparable set as data rather than as twenty browser tabs.",
          "The uses stack up quickly once the data exists: pricing against genuine local comps instead of a gut number, spotting which competitor just cut $1,200 across their sedans, tracking how long specific trims sit before they move, and finding sourcing opportunities where a market is thin.",
        ],
      },
      {
        h: "Sites this covers",
        p: [
          "US and international listing platforms, marketplaces and individual dealer websites. Individual dealer sites matter more than people expect — a competitor's own inventory page is often the fastest signal that something has been repriced.",
        ],
        list: [
          "AutoTrader — listings, prices, dealer details, days on market",
          "Cars.com and CarGurus — listings, price history, deal ratings",
          "CarMax and Carvana — inventory, pricing, location availability",
          "AutoScout24 and Mobile.de — European listing data",
          "Carsales — Australian listing data",
          "Facebook Marketplace, Craigslist and OfferUp — private-party listings",
          "Any individual dealer website, including DealerSocket, Dealer.com and vAuto-backed sites",
        ],
      },
      {
        h: "What comes out of it",
        p: [
          "One row per listing: VIN, year, make, model, trim, mileage, asking price, previous prices seen, dealer name and location, days listed, photo URLs, and the full option list where the site publishes it. Re-run daily and you get price history for free, because the system remembers what it saw yesterday.",
          "Delivery is whatever fits your workflow — an Excel file, a Google Sheet that refreshes overnight, a Postgres table, or an API endpoint your own tooling can query. Most dealers take the Google Sheet because their whole desk can open it without installing anything.",
        ],
      },
      {
        h: "Sites that fight back",
        p: [
          "Most large listing platforms run bot detection: fingerprinting, rate limiting, JavaScript challenges, and layouts that change without notice. This is routine rather than exotic — the build uses a real browser engine, sensible request pacing, rotating residential exits where the site demands it, and structural selectors that survive a cosmetic redesign.",
          "The pacing part matters and is not just politeness. A scraper that hammers a site gets blocked, and a blocked scraper delivers nothing. Running at a rate the site can absorb is what makes a pipeline last months instead of days.",
        ],
      },
    ],
    deliverables: [
      "Daily refresh of every matching listing",
      "Price-change history built up automatically",
      "VIN, trim, mileage, options and photos per row",
      "Competitor-level and market-level roll-ups",
      "Days-on-market tracking per vehicle",
      "Excel, Google Sheets, Postgres or API delivery",
      "Alerts when a watched vehicle or dealer changes price",
    ],
    platforms: ["AutoTrader", "Cars.com", "CarGurus", "CarMax", "Carvana", "AutoScout24", "Mobile.de", "Carsales", "Facebook Marketplace"],
    stack: ["Python", "Playwright", "Selenium", "Pandas", "Proxy rotation", "PostgreSQL", "Google Sheets API"],
    faqs: [
      {
        q: "Is scraping car listing sites legal?",
        a: "Collecting publicly visible listing data is generally lawful in the United States, and US appellate courts have repeatedly held that scraping public pages is not unauthorised access. What matters is what you collect and what you do with it — I stay off personal data behind logins, keep request rates civil, and will say plainly if a specific request looks like a problem.",
      },
      {
        q: "How fresh is the data?",
        a: "As fresh as you want to pay for. Daily overnight refresh is the common choice and suits pricing work. Hourly or near-real-time is possible for a narrow watch list, and costs more because it means more requests and more infrastructure.",
      },
      {
        q: "Can you scrape a specific dealer's own website?",
        a: "Yes, and it is often the most useful feed. Individual dealer sites usually have lighter defences than the big portals and update the moment a car is repriced, which makes them a faster signal than the aggregators.",
      },
      {
        q: "What about international sites like AutoScout24 or Carsales?",
        a: "Same work, different markup. AutoScout24, Mobile.de and Carsales are all builds I have done. Non-English sites are fine — the field names get normalised into whatever schema you are already using.",
      },
      {
        q: "How much does a listing scraper cost?",
        a: "A single site with daily delivery usually lands between $300 and $900. Multi-site pipelines with price history and roll-ups run higher. You get a fixed quote within 24 hours of describing the sites and fields, not an hourly meter.",
      },
    ],
    related: ["car-auction-automation", "vehicle-history-reports", "web-scraping"],
    caseStudy: 7,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "business-leads-data",
    nav: "Business Leads Data",
    emoji: "📋",
    accent: "amber",
    color: "#fbbf24",
    h1: "Business Leads Data & B2B Lead Scraping Services",
    metaTitle: "Business Leads Data — B2B Lead List Scraping Services",
    metaDesc:
      "Custom B2B lead lists built to your exact criteria from Google Maps, LinkedIn, Yelp and industry directories. Verified emails and phones, no recycled databases, delivered in days.",
    keywords: [
      "business leads data",
      "b2b lead scraping services",
      "lead list building service",
      "google maps lead scraping",
      "linkedin lead generation data",
      "verified business email list",
      "leads data scraping",
    ],
    hero:
      "Not a database somebody else already emailed twice. A list built this week, to your criteria, from sources you can point at.",
    sections: [
      {
        h: "Built to order, not bought off a shelf",
        p: [
          "Most lead lists sold online are the same aggregated database resold to everyone in your industry, months stale, with bounce rates that quietly wreck your sending domain. The alternative is to build the list at the moment you need it, from the sources where the businesses actually are, filtered to the criteria that matter to you rather than to the criteria a vendor happened to store.",
          "That means you get to be specific in ways a stock list never allows. Every HVAC contractor in three named metros with a Google rating above 4.0, at least 25 reviews, a website that has no booking form, and a listed mobile number — that is a build, not a filter on somebody's database.",
        ],
      },
      {
        h: "Where the data comes from",
        p: [
          "Public business listings, professional directories, association member lists, marketplace seller pages and company websites. The right source depends entirely on who you are selling to, which is the first thing worth talking through before anything is built.",
        ],
        list: [
          "Google Maps and Google Business Profiles — by category and geography",
          "Yelp, Yellow Pages and regional directories",
          "LinkedIn company pages and public professional data",
          "Industry association and licensing-board member registers",
          "Trade show and conference exhibitor lists",
          "Marketplace seller directories — Amazon, Etsy, Shopify storefronts",
          "Company websites, for contact pages and technology signals",
        ],
      },
      {
        h: "Fields you can have",
        p: [
          "Business name, category, full address, geo coordinates, phone, website, email, contact name and role where published, rating and review count, opening hours, social profiles, employee-count band, and technology signals scraped from the site — whether they run Shopify, whether they have live chat, whether their booking is online or by phone.",
          "That last category is what turns a list into a campaign. Knowing that 340 of your 900 targets have no online booking gives you the first line of the email, and it is the difference between outreach that gets replies and outreach that gets deleted.",
        ],
      },
      {
        h: "Verification, because a raw list is half a list",
        p: [
          "Every email goes through syntax, domain, MX and mailbox checks before delivery, and anything that fails is either dropped or flagged rather than quietly padding the row count. Phone numbers are format-validated and line-type checked. Duplicates are collapsed across sources so the same business does not arrive three times under three spellings.",
          "You are told the numbers honestly: how many were found, how many survived verification, how many were dropped and why. A smaller verified list beats a big dirty one every time, because deliverability damage from a bad send outlasts the campaign.",
        ],
      },
      {
        h: "Staying on the right side of privacy law",
        p: [
          "This is B2B data from public sources: business contact details, published listings, professional profiles. I do not scrape personal data from behind logins, do not touch consumer PII, and do not build lists designed to circumvent someone's opt-out.",
          "CAN-SPAM, GDPR and CCPA all bear on what you can do with a list once you have it, and the rules differ by where your targets are. If your list includes EU or UK businesses, that changes what a lawful send looks like — I will flag it, though what your lawyer says about your sending practice is a separate question from what the data is.",
        ],
      },
    ],
    deliverables: [
      "Lead list built to your exact filter criteria",
      "Email, phone, address, website and contact name",
      "Ratings, review counts and opening hours",
      "Technology and website signals per business",
      "Full email verification before delivery",
      "Cross-source deduplication",
      "Excel, CSV, Google Sheets or straight into your CRM",
    ],
    platforms: ["Google Maps", "Yelp", "LinkedIn", "Yellow Pages", "Industry directories", "Amazon sellers", "Shopify stores", "Trade registries"],
    stack: ["Python", "Playwright", "Google Places", "Email verification APIs", "Pandas", "Google Sheets API", "CRM webhooks"],
    faqs: [
      {
        q: "How many leads can you deliver and how fast?",
        a: "Five thousand verified business leads in about 24 to 48 hours is a normal run. Larger builds are a question of scale rather than difficulty. The limit is usually how many businesses actually match your criteria — if a niche only contains 800 real targets, you get 800 real targets rather than 5,000 padded ones.",
      },
      {
        q: "What does a lead list cost?",
        a: "Most one-off lists land between $200 and $700 depending on the number of sources, the depth of fields and whether verification is included. Recurring monthly builds are quoted as a lower per-run fee. You get a fixed price up front.",
      },
      {
        q: "How accurate are the emails?",
        a: "Every address is syntax, domain, MX and mailbox verified before it reaches you, which typically puts deliverability in the 90 to 95 percent range. Anything that cannot be verified is flagged rather than silently included, so you always know what you are sending to.",
      },
      {
        q: "Can you find a specific person's email at each company?",
        a: "Where a named contact and role are published — on the company site, in a directory, on a professional profile — yes. What I will not do is guess-and-test private addresses or pull personal data from behind a login. Business contact details from public sources is the line.",
      },
      {
        q: "Can it drop straight into my CRM?",
        a: "Yes. HubSpot, Pipedrive, Salesforce, Close, Airtable and Notion are all straightforward, either as a scheduled push or as a webhook that fires as each verified lead is found.",
      },
    ],
    related: ["web-scraping", "web-development", "dealer-inventory-scraping"],
    caseStudy: 3,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "web-scraping",
    nav: "Web Scraping Services",
    emoji: "🕷️",
    accent: "blue",
    color: "#60a5fa",
    h1: "Web Scraping Services for US Businesses",
    metaTitle: "Web Scraping Services — Custom Data Extraction, Built in Days",
    metaDesc:
      "Custom web scraping and data extraction for any website. Products, prices, listings, leads and reviews delivered as clean Excel, CSV or database rows. Fixed price, quoted in 24 hours.",
    keywords: [
      "web scraping services",
      "data extraction services",
      "custom web scraper development",
      "hire a web scraping developer",
      "price monitoring scraper",
      "ecommerce data scraping",
      "web scraping company usa",
    ],
    hero:
      "If the data is on a website, it can be in your spreadsheet. Usually within the week, always for a price agreed before anything starts.",
    sections: [
      {
        h: "What a custom scraper gets you that a tool does not",
        p: [
          "Off-the-shelf scraping tools work beautifully until the site does something interesting — an infinite scroll, a login wall, a price that only appears after a JavaScript call, a layout that differs on every fifth page. That is where point-and-click products stop and custom work starts, and it is where most of the sites worth scraping actually live.",
          "A custom build is written against your specific target. It handles that site's pagination, that site's defences, that site's inconsistencies, and it produces exactly the columns you asked for rather than a generic dump you have to clean before it is useful.",
        ],
      },
      {
        h: "What people use it for",
        p: [
          "Almost always one of a handful of jobs, wearing different clothes depending on the industry.",
        ],
        list: [
          "Competitor price monitoring — track prices across rival sites daily and get alerted on changes",
          "Product and catalogue data — thousands of SKUs with specs, images, stock and variants",
          "Lead generation — business contact data from directories and listings",
          "Real estate research — listings, rents, sale history and yield analysis",
          "Review and sentiment data — customer reviews at scale for product or market research",
          "Job and hiring data — postings, salary bands and hiring signals by company",
          "Financial and market data — public filings, listings and published rates",
        ],
      },
      {
        h: "Sites that do not want to be read",
        p: [
          "Cloudflare, DataDome, PerimeterX, fingerprinting, rate limits, CAPTCHA challenges, login walls, and single-page apps that render nothing in the raw HTML. These are the normal conditions of the job rather than exceptions to it.",
          "The tooling that gets through is a real browser engine driven properly, request pacing that looks like traffic rather than an attack, residential exits where the site demands them, and session handling that persists. Where a login is involved, it is your credentials, on your account, doing what you are entitled to do.",
        ],
      },
      {
        h: "Clean data, or it is not finished",
        p: [
          "Extraction is the first half. The half that determines whether you can use the output is normalisation: prices parsed to numbers with currency separated, dates in one format, addresses split into components, duplicates collapsed, missing fields marked as missing rather than as an empty string that looks like a zero.",
          "Every delivered dataset gets validated before it reaches you — row counts against expectations, null-rate checks on required fields, and range checks that catch a price column quietly returning empty because a selector moved. Silent data corruption is worse than an outright failure, because you act on it.",
        ],
      },
      {
        h: "How it works, start to finish",
        p: [
          "You send the URLs and the fields you want, in plain English — no technical spec required. Within 24 hours you get a scope, a fixed price and a delivery date. Most builds take 2 to 5 days, and you see sample output early so a misunderstanding about what a field means costs an hour rather than the whole project.",
          "Then you either get a file, or a running system handed over with scheduling and alerting so it keeps delivering without you thinking about it. Either way you are talking to the person writing the code, from the first email to whatever the site does six months later.",
        ],
      },
    ],
    deliverables: [
      "Custom scraper written for your specific target sites",
      "Anti-bot handling, sessions and login support",
      "Scheduled runs — hourly, daily or weekly",
      "Validated, normalised, deduplicated output",
      "Excel, CSV, JSON, Google Sheets, SQL or REST API",
      "Alerting when a run fails or a field goes empty",
      "Fixes when a site changes, on systems I built",
    ],
    platforms: ["Amazon", "eBay", "Walmart", "Etsy", "Zillow", "Airbnb", "Redfin", "Google Maps", "LinkedIn", "Yelp", "Facebook"],
    stack: ["Python", "Playwright", "Selenium", "Scrapy", "BeautifulSoup", "Pandas", "PostgreSQL", "Proxy rotation", "FastAPI"],
    faqs: [
      {
        q: "How much does a web scraper cost?",
        a: "Most one-off jobs land between $150 and $800 depending on how many sites, how many fields and how much anti-bot protection is involved. Recurring systems that run daily are quoted as a build fee plus a small monthly amount. The price is fixed before work starts — never an hourly meter.",
      },
      {
        q: "Is web scraping legal?",
        a: "Scraping publicly accessible data is generally legal in the United States, and US courts have repeatedly upheld that. What matters is what you collect and how you use it — I stay away from personal data behind logins, respect terms where they bind, and will tell you plainly if a request looks like a problem rather than take the money.",
      },
      {
        q: "How long does a project take?",
        a: "Most builds are delivered in 2 to 5 days. You get a scope, a fixed price and a delivery date within 24 hours of describing what you need, and sample output arrives early enough to correct course.",
      },
      {
        q: "What format does the data come in?",
        a: "Excel, CSV, JSON, Google Sheets, a direct write into MySQL or Postgres, or a REST endpoint your own systems can query. Most clients take Excel or a Google Sheet that refreshes on a schedule.",
      },
      {
        q: "Do I need to know anything technical?",
        a: "No. You describe the website and the details you want in plain English and you get back a finished file, or a system that emails you a fresh one every morning. You never open a terminal.",
      },
      {
        q: "What if the site changes and it breaks?",
        a: "Sites change and scrapers break — anyone who tells you otherwise is selling something. Delivered systems include alerting so you know immediately rather than discovering it through stale data, and I fix breakages on systems I built.",
      },
    ],
    related: ["business-leads-data", "dealer-inventory-scraping", "web-development"],
    caseStudy: 2,
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "web-development",
    nav: "Web Development",
    emoji: "🌐",
    accent: "rose",
    color: "#fb7185",
    h1: "Web Development Services — Sites, Stores and Dashboards",
    metaTitle: "Web Development Services — React, Next.js Sites & Dashboards",
    metaDesc:
      "Fast, modern websites, eCommerce stores and internal dashboards built with React and Next.js. Built to load quickly, rank well and convert — by the developer who writes the code.",
    keywords: [
      "web development services",
      "react web development",
      "next.js development services",
      "custom dashboard development",
      "ecommerce website development",
      "hire a web developer usa",
      "internal tools development",
    ],
    hero:
      "The website is the front of the business. It should load instantly, say the right thing, and be findable — three things most templates get wrong.",
    sections: [
      {
        h: "What gets built here",
        p: [
          "Marketing sites and landing pages that load fast and are structured so search engines can actually read them. eCommerce stores on Shopify or custom stacks. Internal dashboards that put a business's own data — often the data from a scraper built alongside it — in front of the people who need to act on it. SaaS front ends, admin panels, and the client portals that sit between the two.",
          "The common thread is that these are built rather than assembled. A page-builder template gets you something that looks fine and carries three hundred kilobytes of JavaScript you did not ask for; written code gets you something that scores well on Core Web Vitals because there is nothing extra in it.",
        ],
      },
      {
        h: "Built for search from the first commit",
        p: [
          "SEO retrofitted onto a finished site is expensive and half-effective. Doing it during the build costs nothing extra and works properly: server rendering or static generation so crawlers get real HTML rather than an empty div, a heading structure that maps to how people search, structured data that matches what is actually on the page, canonical URLs and a sitemap that maintains itself, and image handling that does not sink the largest-contentful-paint score.",
          "This is the same work described across the rest of this site, applied to the site itself. It is why these pages exist as separate URLs with their own titles instead of as tabs on a homepage.",
        ],
      },
      {
        h: "Dashboards and internal tools",
        p: [
          "The most useful thing many businesses can build is not public at all. If a scraper is delivering data daily, somebody has to look at it — and a spreadsheet stops scaling around the point where three people need it at once and one of them keeps sorting the wrong column.",
          "A small internal dashboard fixes that: live data, the filters your team actually uses, alerts on the conditions that matter, exports where people still want Excel, and access control so the right people see the right rows. These are usually week-long builds, not quarter-long ones.",
        ],
      },
      {
        h: "The stack and why",
        p: [
          "React and Next.js for anything with interactivity, because static generation and server rendering are built in rather than bolted on. Node and FastAPI for back ends. Postgres for data. Vercel or a plain VPS for hosting, depending on whether you want zero-maintenance or full control.",
          "None of that is a religious position — if you already run WordPress and need it maintained rather than replaced, that is the honest answer and I will say so instead of quoting a rebuild.",
        ],
      },
    ],
    deliverables: [
      "Marketing sites and landing pages that convert",
      "eCommerce stores — Shopify or custom",
      "Internal dashboards over your own data",
      "SaaS front ends, admin panels and client portals",
      "Technical SEO built in, not bolted on",
      "Core Web Vitals tuned before handover",
      "Deployed, documented and yours to keep",
    ],
    platforms: ["React", "Next.js", "Shopify", "Node.js", "FastAPI", "PostgreSQL", "Vercel", "Tailwind"],
    stack: ["React", "Next.js", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "Vercel", "Stripe"],
    faqs: [
      {
        q: "How much does a website cost?",
        a: "A focused marketing site is typically $800 to $2,500 depending on page count and how much custom design is involved. eCommerce and dashboard builds run higher because there is real logic behind them. You get a fixed price and a delivery date within 24 hours of describing what you need.",
      },
      {
        q: "How long does a build take?",
        a: "A landing page or small marketing site is usually under a week. A store or a dashboard is typically two to four weeks. You see working pages as they are built rather than a reveal at the end.",
      },
      {
        q: "Do you do the design as well as the code?",
        a: "Yes. If you have brand assets or a design, I build to it. If you do not, you get something clean and current that is designed around what the page is meant to make a visitor do.",
      },
      {
        q: "Will the site actually rank?",
        a: "It will be built so nothing technical stands in the way — real HTML for crawlers, correct structure, valid schema, fast loading. Rankings themselves come from content and from other sites linking to yours, and no honest developer will promise you a position. What I can promise is that the site will not be the reason you are invisible.",
      },
      {
        q: "Can you connect the site to a scraper or automation?",
        a: "That is the most common version of this job — a dashboard or portal sitting on top of a data pipeline built at the same time. Having one person write both ends means the handoff between them is not a negotiation.",
      },
      {
        q: "Do I own the code?",
        a: "Entirely. It is deployed to your accounts, the repository is yours, and there is no licence, retainer or hosting arrangement you have to keep paying me for in order to keep your own website.",
      },
    ],
    related: ["web-scraping", "business-leads-data", "car-auction-automation"],
    caseStudy: 6,
  },
];

export const serviceBySlug = slug => services.find(s => s.slug === slug);
