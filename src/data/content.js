export const blogs = [
  {
    id: 1,
    slug: "what-is-web-scraping",
    tag: "Web Scraping",
    emoji: "🕷️",
    color: "linear-gradient(135deg, #0a1f33 0%, #07242c 100%)",
    title: "What Is Web Scraping? A Complete Beginner's Guide",
    summary: "Everything you need to know about web scraping — what it is, how it works, and how businesses use it to get a competitive edge.",
    date: "June 10, 2025",
    readTime: "8 min read",
    content: `
## What Is Web Scraping?

Web scraping is the automated process of extracting data from websites. Instead of manually copying information from a webpage, a web scraper (a program or script) visits the page automatically, reads the HTML content, and pulls out the specific data you need — prices, names, emails, listings, reviews, and more.

Think of it like this: if you wanted to track the price of a product on Amazon every day, you could either visit the page manually every day and write the price down — or you could build a scraper that does it automatically and sends you an email when the price drops.

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

- **Product prices and listings** — Amazon, eBay, Walmart
- **Business leads** — Google Maps, Yelp, LinkedIn
- **Real estate data** — Zillow, Redfin, Airbnb
- **Job listings** — Indeed, LinkedIn, Glassdoor
- **News and articles** — Any news website
- **Car auction data** — Manheim, BacklotCars, Autoniq
- **Social media data** — Public posts and profiles

## Why Do Businesses Use Web Scraping?

### Competitor Price Monitoring
eCommerce businesses scrape competitor websites to see their pricing in real time, then adjust their own prices to stay competitive automatically.

### Lead Generation
Marketing agencies scrape Google Maps and LinkedIn to build lists of potential customers — business names, phone numbers, emails — all structured and ready for outreach.

### Market Research
Investors and analysts scrape financial data, property listings, and market trends to make smarter decisions faster than their competitors.

### Car Dealer Automation
Used car dealers scrape auction platforms like Manheim MMR and BacklotCars to find vehicles priced below market value — then get instant email alerts so they can bid first.

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

I've built 1000+ scraping projects for US businesses across Amazon, eBay, Walmart, Zillow, Airbnb, Google Maps, and 50+ other platforms. Whether you need 1,000 leads or 1 million product prices — I can build it, test it, and deliver clean data on time.

**Ready to automate your data collection?** Contact me and describe what you need — I'll give you a free quote within 24 hours.
    `
  },
  {
    id: 2,
    slug: "is-web-scraping-legal",
    tag: "Legal Guide",
    emoji: "⚖️",
    color: "linear-gradient(135deg, #14183a 0%, #101c33 100%)",
    title: "Is Web Scraping Legal? What US Businesses Need to Know",
    summary: "A plain-English guide to the rules around scraping — what courts have actually decided, what's clearly safe, what's risky, and how to stay on the right side of the line.",
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

**eCommerce price monitoring** — Very well established. Competitor prices are public facts. Low risk.

**Google Maps / business directory leads** — Business names, phones and addresses are business data, not consumer data. Common practice, moderate risk, and outreach must still follow CAN-SPAM and TCPA rules.

**Real estate listings** — Public listing data is widely scraped. Photos and agent-written descriptions are the copyrighted parts; stick to the facts.

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

**Contact me at sam@autosmartcode.com** for a free assessment within 24 hours.
    `
  },
  {
    id: 3,
    slug: "how-much-does-web-scraping-cost",
    tag: "Pricing",
    emoji: "💰",
    color: "linear-gradient(135deg, #2b1e08 0%, #2a1608 100%)",
    title: "How Much Does Web Scraping Cost? Real Prices for Custom Scrapers",
    summary: "What a web scraping service actually costs — by complexity, volume and delivery model — with real price bands, plus the hidden costs nobody quotes you upfront.",
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

*Example: 5,000 Google Maps business leads across 6 cities, with emails found from each business website.*

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

**Contact me at sam@autosmartcode.com** to get started.
    `
  },
  {
    id: 4,
    slug: "automate-manheim-mmr",
    tag: "Car Dealers",
    emoji: "🚗",
    color: "linear-gradient(135deg, #062a1f 0%, #062629 100%)",
    title: "How Car Dealers Can Automate Manheim MMR Price Checks",
    summary: "Stop checking MMR prices manually. Here's how to build an automated system that pulls live auction data and emails you profitable deals every morning.",
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

**Contact me at sam@autosmartcode.com** and let's talk about automating your dealership's sourcing process.
    `
  },
  {
    id: 5,
    slug: "scrape-google-maps-leads",
    tag: "Lead Generation",
    emoji: "🗺️",
    color: "linear-gradient(135deg, #2b1e08 0%, #2e2409 100%)",
    title: "How to Scrape 5,000 Business Leads from Google Maps",
    summary: "A practical guide to extracting business names, phone numbers, emails, and addresses from Google Maps for any niche and location.",
    date: "April 15, 2025",
    readTime: "6 min read",
    content: `
## Why Google Maps Is a Goldmine for Leads

Google Maps has over 200 million business listings. For any niche — plumbers, dentists, car dealers, restaurants, law firms — you can find thousands of potential customers in any US city, complete with their name, phone number, website, address, and reviews.

This makes Google Maps one of the most powerful and underused lead generation tools available.

## What Data Can You Extract?

For each business listing on Google Maps, you can extract:

- **Business name**
- **Phone number**
- **Website URL**
- **Physical address**
- **Star rating and review count**
- **Business category**
- **Hours of operation**
- **Email address** (from their website)

## The Process: How It Works

**Step 1: Define your search**
You start with a search term and location. For example: "used car dealer New York" or "plumber Los Angeles" or "real estate agent Texas".

**Step 2: Scraper collects all listings**
The scraper automatically scrolls through all search results, collecting every business listing that matches your search — not just the first 20 results, but all of them.

**Step 3: Visit each business profile**
For each listing, the scraper visits the full business profile and extracts all available contact information.

**Step 4: Find emails**
The scraper then visits each business's website and looks for email addresses in the contact page, footer, or about page.

**Step 5: Clean and deliver**
All data is cleaned, deduplicated, and delivered as a clean Excel or CSV file — ready for your sales team.

## Real Campaign Results

A marketing agency I worked with used this system to target HVAC companies across 5 US states. Results:

- **5,200 verified business contacts** extracted in under 2 hours
- **3,800 had valid phone numbers**
- **2,100 had business email addresses**
- **Campaign response rate: 4.2%** (industry average is 1-2%)

## What Niches Work Best?

Google Maps lead scraping works for virtually any local business niche:

- Car dealerships
- Law firms
- Medical practices
- Real estate agencies
- Restaurants and food businesses
- Home services (plumbers, electricians, HVAC)
- Gyms and fitness studios
- eCommerce suppliers and wholesalers

## Before You Send: Outreach Rules That Matter

Collecting business contact data is the easy part. Contacting people legally is where campaigns get into trouble.

- **CAN-SPAM** requires a real physical address, a working unsubscribe link, and honest subject lines on every commercial email
- **TCPA** governs cold calling and texting — check numbers against the National Do Not Call Registry before dialling
- **Business contacts only** — target the company, not an individual's personal mobile or private inbox

A clean list plus compliant outreach beats a huge list plus a complaint every time.

## Getting Your Lead List

Tell me your target niche, locations, and how many leads you need. I'll build the scraper, run it, clean the data, and deliver your lead list. Most orders are delivered within 24–48 hours.

**Contact me at sam@autosmartcode.com** to get started.
    `
  },
  {
    id: 6,
    slug: "python-automation-small-business",
    tag: "Automation",
    emoji: "⚙️",
    color: "linear-gradient(135deg, #1d1640 0%, #101c33 100%)",
    title: "5 Python Automations Every Small Business Should Have",
    summary: "The most impactful automation projects for US small businesses — each one saves at least 5 hours per week and pays for itself quickly.",
    date: "March 8, 2025",
    readTime: "5 min read",
    content: `
## Why Automation Is the Biggest ROI for Small Businesses

The biggest advantage large companies have over small businesses isn't money — it's that they automate everything. Their pricing updates automatically. Their email campaigns trigger automatically. Their reports generate automatically.

The good news: the same automation is now accessible to small businesses for a fraction of the cost. Here are the 5 automations I build most often for US clients — and the time each one saves.

## 1. Automated Price Monitoring

**What it does:** Watches competitor websites, Amazon, or supplier sites 24/7 and alerts you when prices change.

**Who needs it:** eCommerce sellers, retailers, wholesale buyers

**Time saved:** 5–10 hours per week

Instead of manually checking competitor prices daily, a price monitor runs in the background and emails you the moment a price drops or a competitor changes their pricing. You react in minutes instead of days.

## 2. Automated Lead Extraction

**What it does:** Automatically collects business leads from Google Maps, Yelp, or LinkedIn on a schedule.

**Who needs it:** Sales teams, marketing agencies, B2B businesses

**Time saved:** 8–15 hours per week

Instead of manually searching for prospects and copying their details into a spreadsheet, the system runs a search every week and adds fresh leads to your list automatically — sorted, cleaned, and ready to contact.

## 3. Automated Email Reporting

**What it does:** Pulls data from multiple sources and sends a formatted summary email on a schedule.

**Who needs it:** Any business owner who needs regular reports

**Time saved:** 3–5 hours per week

Instead of manually compiling weekly or daily reports from spreadsheets and platforms, the automation collects all your data, formats it into a clean HTML email, and sends it to your team automatically every Monday morning.

## 4. Automated Inventory Alerts

**What it does:** Monitors your inventory or supplier stock levels and alerts you when items are running low or become available.

**Who needs it:** eCommerce stores, retailers, Amazon sellers

**Time saved:** 4–6 hours per week

Never run out of stock unexpectedly again, and never miss a restocking opportunity. The system watches stock levels and sends alerts before you run out — or when a supplier finally restocks an item you've been waiting for.

## 5. Automated Data Cleaning & Processing

**What it does:** Takes raw data files (from exports, forms, or scrapers) and automatically cleans, formats, and organizes them.

**Who needs it:** Any business that deals with data in spreadsheets

**Time saved:** 5–12 hours per week

If your team spends hours fixing formatting issues, removing duplicates, filling in missing data, or reformatting exports — this automation handles all of it automatically. Drop a raw file in, get a clean file out.

## How to Choose Which One to Build First

Pick the task that is **repetitive, rule-based, and currently done by a person you are paying**. Those three conditions together are what make automation pay for itself quickly.

A useful test: if you can write down the steps someone follows, and those steps do not change based on judgement, it can almost certainly be automated.

## How to Get Started

You don't need to hire a full-time developer. Most of these automations can be built in 1–3 days and maintained for a small monthly fee.

**Contact me at sam@autosmartcode.com** and describe which of these would help your business most. I'll give you a free quote within 24 hours.
    `
  },
  {
    id: 7,
    slug: "amazon-product-analysis-ai",
    tag: "AI Analysis",
    emoji: "🤖",
    color: "linear-gradient(135deg, #1d1640 0%, #2a1038 100%)",
    title: "How to Use AI to Analyze Amazon Reviews and Beat Competitors",
    summary: "Use AI-powered review analysis to find exactly what customers hate about competitor products — then fix those things in yours.",
    date: "February 20, 2025",
    readTime: "9 min read",
    content: `
## The Competitive Intelligence Hidden in Reviews

Every Amazon product has thousands of customer reviews. Inside those reviews is a goldmine of intelligence: what customers love, what they hate, what features they wish existed, and what problems they keep experiencing.

Most sellers read a few reviews manually and make guesses. The sellers crushing their competition are using AI to analyze thousands of reviews at once and get precise, actionable insights in minutes.

## What AI Review Analysis Finds

When you run 5,000 Amazon reviews through an AI analysis system, you discover:

**The exact language customers use** to describe problems — which you can use in your own listing copy to speak directly to their pain points.

**The top 10 complaints** about competitor products — which tells you exactly what to fix or avoid in your own product.

**The top 10 praise points** — so you know what features actually matter to buyers and should be highlighted in your listing.

**Sentiment trends over time** — if a product's reviews are getting worse recently, that's your window to capture market share.

**Feature gaps** — things multiple reviewers wish the product had but doesn't. Build those features and you have a differentiated product.

## A Real Example: Kitchen Products

I ran this analysis for a client selling kitchen storage containers. After analyzing 8,000 competitor reviews across 12 products, we found:

- **847 reviews** mentioned lids that don't seal properly
- **632 reviews** complained about staining from tomato-based foods
- **1,240 reviews** praised airtight seals on competing products

The client redesigned their lid mechanism, used stain-resistant materials, and led their listing with "guaranteed airtight seal." Their conversion rate increased by 28% in the first month.

## How the AI Analysis Works

**Step 1: Scrape the reviews**
I scrape all reviews for your target products — competitor products, your own product, or both. Thousands of reviews, collected automatically.

**Step 2: Clean and structure the data**
Reviews are cleaned, deduplicated, and organized by date, rating, and product.

**Step 3: AI sentiment analysis**
Each review is processed through an AI model that categorizes it as positive, negative, or neutral, and extracts the specific topics mentioned.

**Step 4: Pattern identification**
The AI finds the most common complaints and praises across all reviews, ranked by frequency.

**Step 5: Competitive intelligence report**
You receive a clean report showing exactly what to fix, what to highlight, and what opportunities exist in the market.

## Why AI Beats Manual Reading

A person can read maybe 200 reviews before their judgement blurs and they start pattern-matching on whatever they read most recently. An AI pipeline processes 8,000 reviews with the same criteria applied to review number 8,000 as to review number one.

More importantly, it **counts**. "A lot of people mention the lid" is an impression. "847 of 8,000 reviews mention lid sealing, and 61% of those are 1- or 2-star" is a decision you can act on.

## What You Get

- Full sentiment breakdown (positive / neutral / negative percentages)
- Top 10 complaints (ranked by frequency)
- Top 10 praise points (ranked by frequency)
- Direct customer quotes for each finding
- Recommended listing copy changes
- Market opportunity gaps

## Get Your Competitive Analysis

Send me the Amazon URLs of your top 3–5 competitors and your own product page. I'll run the full AI analysis and deliver your competitive intelligence report within 48 hours.

**Contact me at sam@autosmartcode.com** to get started.
    `
  },
  {
    id: 8,
    slug: "zillow-airbnb-real-estate-scraping",
    tag: "Real Estate",
    emoji: "🏠",
    color: "linear-gradient(135deg, #06262e 0%, #0a1f33 100%)",
    title: "How Real Estate Investors Use Scraping to Find Better Deals",
    summary: "Scraping Zillow, Redfin, and Airbnb gives real estate investors data their competitors don't have — here's how it works.",
    date: "January 12, 2025",
    readTime: "7 min read",
    content: `
## Data Is the Real Estate Investor's Biggest Advantage

The difference between a good real estate investor and a great one is data. Knowing which markets are heating up, which neighborhoods are undervalued, and what rental income a property can realistically generate — that's what separates profitable investments from average ones.

The problem: most of this data is sitting on Zillow, Redfin, and Airbnb — and manually collecting it is impossible at scale.

## What Real Estate Scrapers Collect

**From Zillow:**
- Property listings with prices, square footage, beds/baths
- Price history (when the price was reduced and by how much)
- Days on market (longer = more negotiating power)
- Zestimate (Zillow's estimated value)
- Neighborhood price trends over 1, 3, and 5 years

**From Airbnb:**
- Active rental listings by neighborhood
- Nightly rates by property type and size
- Occupancy rates (estimated from availability calendars)
- Host revenue estimates
- Review counts and ratings

**From Redfin:**
- Sold prices vs listing prices
- How quickly homes are selling
- Price per square foot by neighborhood
- School ratings and walkability scores

## How Investors Use This Data

### Finding Undervalued Markets
By scraping price trends across hundreds of zip codes, investors can spot neighborhoods where prices are rising faster than average — before the mainstream media covers it.

### Calculating Real Rental Income
Instead of guessing what rent an Airbnb could generate, investors scrape active listings in the same neighborhood with similar specs and calculate actual revenue potential based on real listings.

### Negotiation Leverage
When you know that 73 similar properties in the area have reduced their price by an average of 8% after 45 days on market — you have real negotiating power backed by data.

### Market Timing
By tracking how quickly inventory is selling over time, investors can identify when a market is shifting from a seller's market to a buyer's market — and time their purchases accordingly.

## A Client Example

I built a weekly Zillow and Airbnb analysis tool for a real estate investor in Arizona. Every Monday morning, they receive an Excel report showing:

- New price reductions in their target zip codes
- Estimated Airbnb revenue for any property they're considering
- Comparison of listing price vs estimated actual value
- Days on market trends by neighborhood

**Result:** They identified an undervalued neighborhood 4 months before prices jumped 18%. That single data insight generated significant returns on two properties they purchased.

## One Important Caveat

Listing facts — price, beds, square footage, days on market — are data. Listing **photos and agent-written descriptions** are copyrighted work belonging to the brokerage or photographer.

Collect the numbers, build your analysis on the numbers, and do not republish someone else's photos or listing copy. Every system I build is designed around this distinction from day one.

## What I Can Build for You

Whether you need a one-time data pull or a weekly automated report — I can build the right solution for your real estate research needs.

**Contact me at sam@autosmartcode.com** and describe what markets and data you need. I'll respond with a plan and quote within 24 hours.
    `
  },
  {
    id: 9,
    slug: "bypass-captcha-anti-bot-scraping",
    tag: "Technical",
    emoji: "🛡️",
    color: "linear-gradient(135deg, #0a1f33 0%, #14183a 100%)",
    title: "Why Your Scraper Keeps Getting Blocked (And How to Fix It)",
    summary: "The real reasons sites detect scrapers — browser fingerprints, request patterns, TLS signatures — and the practical fixes that actually work.",
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

**Contact me at sam@autosmartcode.com** and tell me which site is blocking you. I'll tell you what it will take to get through it reliably.
    `
  },
  {
    id: 10,
    slug: "ecommerce-price-monitoring-automation",
    tag: "eCommerce",
    emoji: "📈",
    color: "linear-gradient(135deg, #062a1f 0%, #0a1f33 100%)",
    title: "Competitor Price Monitoring: The Complete Setup Guide",
    summary: "How online sellers track competitor pricing automatically, react within minutes instead of days, and stop leaving margin on the table.",
    date: "April 2, 2025",
    readTime: "8 min read",
    content: `
## Pricing Is the Fastest Lever You Have

You can spend months improving a product, weeks building a campaign, or five minutes changing a price. Of those three, the price change hits your margin immediately.

The problem is knowing **when** to change it. Most sellers find out a competitor undercut them when their sales drop — which is days late and thousands of dollars into the mistake.

Automated price monitoring closes that gap from days to minutes.

## What a Price Monitoring System Actually Does

A complete system runs continuously and handles four jobs:

**1. Tracks** a defined list of competitor product URLs, or matches products automatically by title, brand, UPC or model number.

**2. Records** price, shipping cost, stock status, seller name, and Buy Box ownership at fixed intervals.

**3. Compares** each reading against your own price and against the previous reading.

**4. Alerts** you — or updates your prices directly — when a rule you defined is triggered.

## The Metrics Worth Tracking

Price alone is not enough. The readings that actually drive decisions:

- **Landed price** — item price plus shipping. A $2 cheaper item with $8 shipping is not cheaper.
- **Stock status** — a competitor going out of stock is a window to raise your price, not lower it
- **Buy Box ownership** — on Amazon, who holds the Buy Box matters more than the listed price
- **Price velocity** — how often a competitor changes price tells you whether they are running a repricer
- **Promotion flags** — a temporary coupon is not a structural price cut and should not trigger a permanent response

## Setting Rules That Do Not Destroy Your Margin

The classic mistake is "always be $0.01 cheaper than the lowest competitor." Two sellers running that rule will race each other to zero within a day.

Better rule structures:

**Floor-protected matching** — match the lowest competitor, but never below your minimum acceptable margin. This single constraint prevents almost all repricing disasters.

**Tiered response** — undercut by 2% when you are out of the Buy Box, hold price when you already have it.

**Stock-aware pricing** — when the two cheapest competitors are out of stock, raise price rather than matching the third.

**Alert-only for big moves** — if a competitor drops more than 15%, notify a human instead of matching automatically. That size of move is usually a pricing error, a clearance, or a trap.

## Realistic Check Frequencies

More frequent is not automatically better — it costs proxy bandwidth and increases block risk.

- **Fast-moving marketplaces** (Amazon, eBay top listings): every 15–30 minutes
- **Standard eCommerce competitors**: every 2–6 hours
- **Wholesale and supplier catalogues**: daily
- **Long-tail catalogue items**: weekly

Match the interval to how fast the price actually moves. Checking a slow supplier catalogue every 15 minutes is pure cost with no signal.

## How Alerts Should Reach You

The best system in the world is useless if the alert lands in an inbox nobody reads.

- **Email digest** for daily summaries and trend reports
- **Telegram or Slack** for instant, high-priority alerts — these get read in minutes
- **Dashboard** for the weekly review, where you look at trends rather than events
- **Direct API push** into your store when you trust the rules enough to skip the human

I usually recommend starting alert-only for the first two weeks. Watch what the system would have done before you let it do it.

## A Real Client Setup

An eCommerce business in Michigan monitors competitor and supplier pages across Amazon, eBay, and four direct competitor sites. The system checks every 15 minutes, logs every reading to a database, and fires a Telegram alert when a tracked price crosses a threshold.

**Results:** alerts arrive under five minutes after a price change. In the first month they caught three restocking opportunities that would have been missed entirely, and stopped two products from being undercut for a full weekend.

## What It Takes to Build

For most sellers this is a Tier 2 or Tier 3 project — a few days of work, a small monthly hosting and proxy cost, and ongoing maintenance when a target site changes its layout.

The build includes the scraper, the comparison rules, the alert channel, price history storage, and monitoring so you know when something breaks.

## Get Your Price Monitor Built

Send me the products or competitors you want to track and how fast you need to know about changes. I'll scope it, quote it, and have you receiving alerts within a week.

**Contact me at sam@autosmartcode.com** for a free quote within 24 hours.
    `
  },
  {
    id: 11,
    slug: "free-vin-decoder-nhtsa-api",
    tag: "Car Dealers",
    emoji: "🔧",
    color: "linear-gradient(135deg, #062a1f 0%, #0a1f33 100%)",
    title: "Free VIN Decoding: What NHTSA's vPIC API Actually Gives You",
    summary: "There is a US government API that decodes any VIN for free, with no key, no rate limit and no licensing. Most dealers are paying for data they could get from it.",
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

**Contact me at sam@autosmartcode.com** for a free quote within 24 hours.
    `
  },
  {
    id: 12,
    slug: "price-used-cars-market-data",
    tag: "Car Dealers",
    emoji: "📊",
    color: "linear-gradient(135deg, #062629 0%, #06262e 100%)",
    title: "How to Price Used Cars Against the Live Market, Not a Book Value",
    summary: "Book values tell you what a car was worth. Live listing data tells you what buyers in your market are being asked to pay for it today. Here is how to build the second one.",
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

**Contact me at sam@autosmartcode.com** for a free quote within 24 hours.
    `
  },
  {
    id: 13,
    slug: "ai-parsing-scraped-data",
    tag: "AI Analysis",
    emoji: "🧠",
    color: "linear-gradient(135deg, #1d1640 0%, #2a1038 100%)",
    title: "Using AI to Clean Up Messy Scraped Data (And When Not To)",
    summary: "Language models are very good at the parsing problems that used to need a hundred regexes — and a bad, expensive choice for the ones a regex already solves.",
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

**Contact me at sam@autosmartcode.com** for a free quote within 24 hours.
    `
  },
  {
    id: 14,
    slug: "self-healing-scrapers-ai",
    tag: "Technical",
    emoji: "🩹",
    color: "linear-gradient(135deg, #14183a 0%, #1d1640 100%)",
    title: "Self-Healing Scrapers: What AI Fixes When a Site Changes, and What It Doesn't",
    summary: "Every scraper eventually breaks because a site redesigns. AI can genuinely repair some of those breaks automatically — and pretending it fixes all of them is how you end up with silently wrong data.",
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

**Contact me at sam@autosmartcode.com** for a free quote within 24 hours.
    `
  },
  {
    id: 15,
    slug: "why-cold-email-lists-bounce",
    tag: "Lead Generation",
    emoji: "📬",
    color: "linear-gradient(135deg, #2b1e08 0%, #2a1608 100%)",
    title: "Why Your Cold Email List Bounces (And What It Costs You)",
    summary: "A 30% bounce rate does not just waste 30% of your list. It damages your sending domain in ways that outlast the campaign — often permanently.",
    date: "June 16, 2026",
    readTime: "7 min read",
    content: `
## The damage is not the wasted sends

Most people think of a bad list as a volume problem. You bought 10,000 contacts, 3,000 bounced, so you got 7,000 sends. Annoying, but survivable.

That is not what happened. What happened is that mailbox providers watched your domain send thousands of messages to addresses that do not exist, concluded you are either buying lists or guessing addresses, and adjusted how they treat everything you send from now on.

The 7,000 that did not bounce increasingly land in spam. Then your invoices start landing in spam. Then your password resets. Recovering a burned sending domain takes months of careful low-volume sending, and sometimes the practical answer is to buy a new one.

## Where the bad addresses come from

Four sources, in rough order of how much damage they do.

**Guessed patterns.** A tool takes a name and a domain and generates firstname@, f.lastname@, firstname.lastname@ and sends to all of them hoping one lands. This is the worst thing you can do. It is what spam filters are specifically built to detect, and hitting a spam trap this way can get you blocklisted outright.

**Stale databases.** Someone scraped a directory in 2023 and has been reselling it since. Business email churn runs somewhere around a quarter to a third per year — people leave, companies rebrand, domains lapse. A three-year-old list is mostly fiction.

**Role addresses.** info@, sales@, contact@. These are real addresses, so they do not bounce, which makes them look like list quality. In practice they go to a shared inbox nobody reads, they convert at close to nothing, and a high proportion of complaints come from them.

**Spam traps.** Addresses that were real, went dead, and were then reactivated by a provider specifically to catch senders using old data. Hitting one is a strong negative signal, and you cannot tell them apart from ordinary addresses by looking.

## What verification actually checks

Four layers, each catching something the previous one cannot.

- **Syntax** — is it a structurally valid address. Catches typos and junk.
- **Domain** — does the domain resolve. Catches dead companies and misspelled domains.
- **MX record** — does the domain accept mail at all. A domain with no mail server cannot receive anything.
- **Mailbox** — does this specific address exist on that server, checked without sending anything.

Only the fourth catches the individual dead address at a live company, which is the majority of the problem. Anything sold as "verified" that stops at the first three is not verified in the sense that matters.

**Catch-all domains** are the honest complication. Some mail servers accept every address at the domain rather than revealing which exist, so mailbox verification cannot return a definitive answer. A good list marks these as risky rather than pretending they passed. What you do with them is a judgement call — send at low volume, or set them aside.

## Fresh beats big, every time

The single most reliable way to avoid all of this is not to buy a list at all.

A list built the week you need it, from live public sources, against your actual criteria, does not have the stale-data problem because there is no elapsed time for the data to go stale in. Every business on it was trading when it was collected. Every address was verified against a live server days ago rather than years ago.

That is what I build. Google Maps and industry directories for the businesses, a pass over each company website for the contact details, then full verification before anything is delivered. Typical outcome is a verified email on somewhere between 40 and 70 percent of a list — lower for trades, higher for professional services.

## The number that matters

When someone quotes you a list size, ask what the verified count is, and ask what happened to the difference.

I would rather hand over 600 verified contacts and tell you the other 400 could not be confirmed than hand over 1,000 and let you find out through your bounce rate. A smaller honest list outperforms a bigger dirty one on every measure that matters, and it does not cost you your domain.

## Get it built

Tell me who you sell to — industry, geography, size, whatever else defines a good fit — and I will build the list against those criteria and verify it before you see it.

**Contact me at sam@autosmartcode.com** for a free quote within 24 hours.
    `
  },
  {
    id: 16,
    slug: "slow-website-cost-small-business",
    tag: "Web Development",
    emoji: "⏱️",
    color: "linear-gradient(135deg, #06262e 0%, #0a1f33 100%)",
    title: "What a Slow Website Actually Costs a Small Business",
    summary: "Every second your site takes to load, a share of your visitors leave — and they never tell you they were there. Here is where the time goes and what it is worth fixing.",
    date: "July 14, 2026",
    readTime: "6 min read",
    content: `
## The customers you never hear about

When a website is slow, nobody complains. They just leave, go back to the search results, and click the next business down. You never see the enquiry, you never get the call, and nothing in your inbox tells you it happened.

That is what makes site speed easy to ignore for years. The cost is entirely invisible, and it is entirely real.

## Where the seconds actually go

Almost always the same handful of causes, roughly in order of how much time they waste.

**Unoptimised images.** Someone uploaded a 4 MB photo straight off a phone and the page displays it at 400 pixels wide. The browser downloads all 4 MB anyway. On a phone on mobile data this alone can be five seconds. It is also the single easiest thing to fix.

**Page builder bloat.** A drag-and-drop theme that loads a full animation library, three icon fonts and a slider script on a page with no animations, icons or sliders. Very common, and largely invisible because the page looks fine on the desktop it was built on.

**Too many plugins.** Every plugin adds its own scripts and styles to every page, whether that page uses it or not. Twenty plugins is twenty sets of overhead on your contact page.

**Cheap shared hosting.** The server itself takes a second or more to respond before anything else can begin. Nothing you do on the page fixes a slow server.

**No caching.** Every visitor triggers a full rebuild of a page whose content has not changed in eight months.

## What "fast" means in practice

Google measures three things and uses them in ranking. Stripped of the jargon:

- **How long until the main content appears** — target is under 2.5 seconds
- **How quickly the page responds when someone taps** — target is under 200 milliseconds
- **How much the layout jumps around while loading** — the thing that makes you tap the wrong link when an ad loads late

The layout-shift one is worth calling out because it is a conversion problem more than a speed one. If your call button moves 300 milliseconds after it appears, a real share of people tap the wrong thing and give up.

## The compounding part

Speed does not just cost you the visitors who leave. It costs you the visitors who never arrive.

Slow sites rank lower. Ranking lower means fewer people see you. Fewer visitors means less of the engagement that search engines read as a positive signal. It is a slow spiral, and it is why a site that was fine five years ago can quietly stop producing enquiries without anything visibly breaking.

## What actually fixes it

In descending order of value per hour spent:

1. **Compress and resize every image**, and serve modern formats. Often halves page weight on its own.
2. **Remove what you are not using** — plugins, scripts, fonts, entire libraries loaded for one component.
3. **Get real caching in place** so returning visitors and repeat pages are near-instant.
4. **Move off oversold shared hosting.** Modern hosting for a small business site is usually cheaper than what you are on.
5. **Reserve space for images and embeds** so nothing jumps as the page loads.
6. **Rebuild if the foundation is the problem.** Past a certain amount of page-builder overhead, optimising is more work than replacing.

## How to know where you stand

Run your site through Google's PageSpeed Insights. It is free, it takes thirty seconds, and it gives you both scores and a specific list of what is costing you time. Test the mobile score, not the desktop one — that is where most of your visitors are and where the gap is widest.

If mobile comes back under 50, you are losing enquiries you do not know about.

## Get it fixed

I build [small business websites](/small-business-website-design) that load fast because there is nothing extra in them, and I do [redesigns](/website-redesign-services) that keep the Google ranking you already have rather than resetting it. Either way you own everything at the end, and there is no monthly fee to me.

**Contact me at sam@autosmartcode.com** for a free quote within 24 hours.
    `
  },
  {
    id: 17,
    slug: "what-is-mmr-manheim-market-report",
    tag: "Car Auctions",
    emoji: "📊",
    color: "linear-gradient(135deg, #14183a 0%, #101c33 100%)",
    title: "What Is MMR? The Manheim Market Report Explained for Dealers",
    summary: "MMR is the number the whole wholesale market quietly agrees a car is worth. Here is what it actually measures, how to read it, and where it stops being enough on its own.",
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

**Contact me at sam@autosmartcode.com** and tell me which platforms you buy on. I will tell you honestly what a same-morning deal-finder would take to build.
    `
  },
  {
    id: 18,
    slug: "automate-car-merchandising-workflow",
    tag: "Dealer Automation",
    emoji: "🚗",
    color: "linear-gradient(135deg, #06262e 0%, #0a1f33 100%)",
    title: "How to Automate Your Used-Car Merchandising Workflow",
    summary: "From auction win to a live, priced, photographed listing is a dozen manual steps most dealers still do by hand. Here is which parts genuinely automate, which do not, and where tools like Spyne fit.",
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

You do not automate all of this at once. You find the step where cars actually pile up — for most lots it is the data-and-publish work, not the photos — and you automate that first. The [inventory and listing side](/services/dealer-inventory-scraping) usually pays for itself before you touch anything else.

Then the pipeline connects to whatever you already use — your DMS, your photo tool, your marketplace accounts — using **your own logins and your own accounts.** It removes the manual clicking between systems; it does not replace the systems you have chosen.

**Contact me at sam@autosmartcode.com.** Tell me where cars get stuck between winning them and having them live, and I will map out what part of that chain is worth automating first and what it would take.
    `
  },
  {
    id: 19,
    slug: "autocheck-vs-carfax-vehicle-history",
    tag: "Vehicle History",
    emoji: "📋",
    color: "linear-gradient(135deg, #2b1e08 0%, #2a1608 100%)",
    title: "AutoCheck vs Carfax: Which History Report, and How to Automate Both",
    summary: "Two reports, two different pictures of the same car, and dealers who run at volume usually need both. What each one is actually better at — and how to pull them without a person doing it VIN by VIN.",
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

An hour of copy-paste becomes a batch that runs while you do something else, and the output is consistent instead of depending on who ran it. It reads exactly what you would read in the portal — it just does it to the whole list. This is the core of the [vehicle-history-reports service](/services/vehicle-history-reports), and it drops straight into the [dealer inventory and merchandising](/services/dealer-inventory-scraping) flow.

There is a page for each half of it: [AutoCheck report automation](/autocheck-scraper) and [Carfax report automation](/carfax-scraper), with the fields each one returns and what the build costs. If you want the report itself explained before any of that — what the Score means, what the comparison range is for, where the coverage stops — start with [what an AutoCheck report actually is](/blog/what-is-an-autocheck-report).

## The line that matters

This only works on **credentials you own and are entitled to use.** History data is licensed, and automating access you pay for is a different thing entirely from scraping someone else's account or reselling report data — which the providers' terms forbid and which I will not build. The point is to save your team the manual clicking on data you already have the right to pull, nothing more.

**Contact me at sam@autosmartcode.com.** Tell me which report you subscribe to and where your VINs come from, and I will scope a batch puller for you — usually a two-to-three-day build.
    `
  },
  {
    id: 20,
    slug: "what-is-an-autocheck-report",
    tag: "Vehicle History",
    emoji: "🔎",
    color: "linear-gradient(135deg, #2b1e08 0%, #2a1608 100%)",
    title: "What Is an AutoCheck Report? The Score, the History, and How to Read One",
    summary: "AutoCheck is the vehicle history report built into the auction lanes — and the only one that gives a car a single comparable number. What is actually in it, what the AutoCheck Score does and does not mean, and where it goes quiet.",
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

**Tell me how many VINs you run in a typical week and which platforms you buy on**, at sam@autosmartcode.com, and I will tell you what it would take. Free VIN data comes first in every build — [the NHTSA vPIC decoder](/blog/free-vin-decoder-nhtsa-api) covers a surprising amount at no cost, so paid report credits only get spent where they add something.
    `
  },
  {
    id: 21,
    slug: "autoscraper-python-library-vs-custom-scraper",
    tag: "Technical",
    emoji: "🐍",
    color: "linear-gradient(135deg, #14183a 0%, #101c33 100%)",
    title: "AutoScraper: What the Python Library Does, and When It Is Not Enough",
    summary: "AutoScraper learns a page's structure from an example instead of a selector, and for the right job it is genuinely the fastest way to get data out of a site. Here is what it does well, the four things that break it, and how to tell which side of that line you are on.",
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

**That is the part I get hired for.** If you are not sure which side of the line you are on, email sam@autosmartcode.com with the URL and what you want out of it, and I will tell you straight — including telling you to use the free library, which happens often enough that it is worth asking. If it does need a build, you get a fixed price within 24 hours; [what these projects typically cost](/blog/how-much-does-web-scraping-cost) is written up in full, and [the custom scraping service](/services/web-scraping) covers what a build includes.
    `
  },
];

export const projects = [
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
    id: 2,
    type: "eCommerce",
    emoji: "🛒",
    color: "#60a5fa",
    title: "Walmart Multi-Keyword Parallel Scraper",
    client: "eCommerce Seller, California",
    description: "Multi-window parallel scraper for Walmart seller data across hundreds of keywords simultaneously. Handles CAPTCHA challenges, deduplicates against existing CSV files, and outputs clean structured Excel files per keyword category.",
    challenge: "Client needed product data for 200+ keyword categories from Walmart but manual collection was impossible. Single-threaded scrapers were too slow and kept getting blocked.",
    solution: "Built a multi-threaded architecture using undetected-chromedriver with separate browser windows per keyword group. Added intelligent deduplication, CAPTCHA detection and retry logic, and column-preserving CSV merging.",
    result: "10,000+ products scraped daily across 200+ keywords. Zero duplicates. Clean Excel output ready for analysis.",
    stack: ["Python", "undetected-chromedriver", "Threading", "Pandas", "Excel", "CAPTCHA handling"],
    details: ["Multi-window parallel execution", "Anti-detection measures", "CAPTCHA auto-retry", "CSV deduplication", "Column preservation", "Keyword-based organization"]
  },
  {
    id: 3,
    type: "Lead Generation",
    emoji: "🗺️",
    color: "#fbbf24",
    title: "Google Maps Business Lead Scraper",
    client: "Marketing Agency, Texas",
    description: "Automated lead extraction from Google Maps for any niche and US location. Scrapes business name, phone, website, address, rating, and review count. Then visits each website to find contact email addresses.",
    challenge: "Agency needed thousands of verified business contacts across multiple US cities for cold outreach campaigns. Manual research was costing 20+ hours per campaign.",
    solution: "Built a two-stage scraper: first stage collects all business listings from Maps results, second stage visits each business website to extract emails. Results cleaned and delivered as structured Excel.",
    result: "5,000+ verified leads extracted per campaign. Agencies report 4x return on investment from outreach using these lists.",
    stack: ["Python", "Selenium", "BeautifulSoup", "Requests", "Excel", "Email extraction"],
    details: ["Google Maps full result pagination", "Business profile extraction", "Email finder from websites", "Phone number validation", "Deduplication", "Multi-city support"]
  },
  {
    id: 4,
    type: "Real Estate",
    emoji: "🏠",
    color: "#22d3ee",
    title: "Zillow & Airbnb Market Analysis Tool",
    client: "Real Estate Investor, Arizona",
    description: "Weekly automated report pulling property listings, price reductions, days-on-market data from Zillow and estimated rental income from Airbnb. Generates formatted Excel reports with charts for investment decision making.",
    challenge: "Investor was manually checking multiple zip codes on Zillow and Airbnb — a 6-hour weekly process that still produced incomplete data.",
    solution: "Built an automated pipeline that runs every Sunday night, scrapes all relevant data, calculates rental yield estimates using Airbnb comparable listings, and emails a complete investment analysis report by Monday morning.",
    result: "Client identified an undervalued market 4 months early. Properties purchased performed 18% above average market return.",
    stack: ["Python", "BeautifulSoup", "Pandas", "Matplotlib", "Excel", "Scheduling"],
    details: ["Zillow listing scraper", "Price reduction tracking", "Airbnb revenue estimation", "Comparable property analysis", "Weekly automated reports", "Excel with charts"]
  },
  {
    id: 5,
    type: "AI Analysis",
    emoji: "🤖",
    color: "#a78bfa",
    title: "Amazon Review AI Sentiment Analyzer",
    client: "Amazon Seller, Ohio",
    description: "Scrapes thousands of Amazon product reviews for any ASIN, processes them through a large language model for sentiment analysis, and extracts the top complaints, praises, and feature requests. Delivers a competitive intelligence report for sellers.",
    challenge: "Client needed to understand why competitor products had mixed reviews and what changes would make their own product more competitive — but reading thousands of reviews manually was impossible.",
    solution: "Built a two-part system: a review scraper that collects all reviews for target ASINs, and an AI analysis pipeline that categorizes sentiment, extracts recurring themes, and generates a structured report with actionable recommendations.",
    result: "Client improved product based on top complaints found. Amazon listing conversion rate increased 34%. Sales grew significantly in 60 days.",
    stack: ["Python", "LLM API", "Selenium", "Pandas", "NLP", "Excel reports"],
    details: ["Amazon review scraper", "AI sentiment analysis", "Theme extraction", "Complaint ranking", "Competitor comparison", "Actionable insights report"]
  },
  {
    id: 6,
    type: "Web Development",
    emoji: "🌐",
    color: "#60a5fa",
    title: "50+ eCommerce Stores & Portfolio Sites",
    client: "Multiple US Clients",
    description: "Full-stack web development for US businesses — Shopify stores, React portfolio sites, Next.js web apps with admin dashboards, payment integrations, and complete SEO setup. From design to deployment.",
    challenge: "Each client needed a professional online presence that converts visitors to customers, is fast on mobile, and ranks on Google — without a bloated agency budget.",
    solution: "Built clean, conversion-focused websites using React and Next.js. Each site includes SEO optimization, mobile responsiveness, fast load times via Vercel CDN, and integration with payment or booking systems as needed.",
    result: "50+ live stores actively generating revenue. Average site load time under 2 seconds. Multiple clients ranking on Google page 1 within 3 months.",
    stack: ["React", "Next.js", "Tailwind CSS", "Node.js", "Shopify", "Vercel"],
    details: ["eCommerce development", "Portfolio websites", "Admin dashboards", "Payment integration", "SEO optimization", "Vercel deployment"]
  },
  {
    id: 7,
    type: "Lead Generation",
    emoji: "👥",
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
    id: 8,
    type: "Automation Bot",
    emoji: "⚡",
    color: "#22d3ee",
    title: "Real-Time Price Monitor & Alert Bot",
    client: "eCommerce Business, Michigan",
    description: "Real-time price monitoring bot that watches Amazon, eBay, and competitor websites 24/7. Sends instant Telegram and email alerts when prices drop below a set threshold or when competitor prices change.",
    challenge: "Client was missing price drops and restocking opportunities on key products because manual checking was only possible a few times per day.",
    solution: "Built a lightweight monitoring service that checks target URLs every 15 minutes, compares prices against stored baselines, and fires instant alerts via Telegram bot and email when thresholds are crossed.",
    result: "Sub-5 minute alert delivery on all price changes. Client captured 3 major restocking opportunities in first month that would have been missed manually.",
    stack: ["Python", "Telegram Bot API", "SMTP", "Scheduling", "SQLite", "BeautifulSoup"],
    details: ["15-minute check intervals", "Telegram instant alerts", "Email notifications", "Price history logging", "Multi-product support", "Custom threshold per product"]
  },
  {
    id: 9,
    type: "Data Analysis",
    emoji: "📊",
    color: "#a78bfa",
    title: "ACCA Global Firm Directory Scraper",
    client: "Financial Research Firm",
    description: "Complete scrape of ACCA's global professional firm directory using letter-based navigation and multi-page pagination. Extracted firm names, locations, contact details, and specializations for all countries.",
    challenge: "Client needed a complete database of ACCA-registered firms worldwide for market research. The directory had complex pagination with letter-based navigation that standard scrapers couldn't handle.",
    solution: "Built a custom scraper that navigates through A–Z letter tabs, handles multi-page pagination within each letter, and extracts structured contact data. Added retry logic for failed requests and progress tracking.",
    result: "10,000+ firms extracted across all countries in one automated run. Clean structured CSV delivered in 24 hours.",
    stack: ["Python", "Requests", "BeautifulSoup", "CSV", "Retry logic", "Progress tracking"],
    details: ["Letter-based navigation (A-Z)", "Multi-page pagination", "International data", "Contact extraction", "Retry on failure", "Progress tracking"]
  }
];

export const platforms = [
  { name: "Amazon", emoji: "🛒", cat: "eCommerce" },
  { name: "eBay", emoji: "🛍️", cat: "eCommerce" },
  { name: "Walmart", emoji: "🏪", cat: "eCommerce" },
  { name: "Etsy", emoji: "📦", cat: "eCommerce" },
  { name: "Google Maps", emoji: "🗺️", cat: "Lead Gen" },
  { name: "Facebook", emoji: "👥", cat: "Lead Gen" },
  { name: "LinkedIn", emoji: "💼", cat: "Lead Gen" },
  { name: "Yelp", emoji: "⭐", cat: "Lead Gen" },
  { name: "Zillow", emoji: "🏠", cat: "Real Estate" },
  { name: "Airbnb", emoji: "🏡", cat: "Real Estate" },
  { name: "Redfin", emoji: "🏘️", cat: "Real Estate" },
  { name: "Manheim MMR", emoji: "🔨", cat: "Automotive" },
  { name: "BacklotCars", emoji: "🔗", cat: "Automotive" },
  { name: "Autoniq", emoji: "📊", cat: "Automotive" },
  { name: "ADESA", emoji: "🏦", cat: "Automotive" },
  { name: "CarMax", emoji: "🚗", cat: "Automotive" },
  { name: "EdgePipeline", emoji: "⚡", cat: "Automotive" },
  { name: "AutoTrader", emoji: "🚘", cat: "Automotive" },
];


/* Homepage FAQ — rendered on the page, emitted as FAQPage schema, and read
   by scripts/prerender.js. One source so the three can never disagree. */
export const FAQS = [
  {
    q: "How much does a web scraper cost?",
    a: "Most one-off scraping jobs land between $150 and $800 depending on how many sites, how many fields and how much anti-bot protection is involved. Recurring systems that run daily are quoted as a build fee plus a small monthly amount. You get a fixed price up front — never an hourly meter.",
  },
  {
    q: "How long does it take?",
    a: "Most projects are built and delivered in 2 to 5 days. You get a scope, a fixed price and a delivery date within 24 hours of describing what you need, and you see sample output early so nothing is a surprise at the end.",
  },
  {
    q: "Is web scraping legal?",
    a: "Scraping publicly accessible data is generally legal in the United States, and US courts have repeatedly upheld that. What matters is what you collect and how you use it — I avoid personal data behind logins, respect terms where they bind, and will tell you plainly if a request looks like a problem rather than take the money.",
  },
  {
    q: "What format do I get the data in?",
    a: "Excel (.xlsx), CSV, JSON, Google Sheets, a direct database write (MySQL or Postgres), or a REST API endpoint — whatever slots into what you already use. Most clients take Excel or a Google Sheet that refreshes on a schedule.",
  },
  {
    q: "Can you scrape sites that block bots or need a login?",
    a: "Yes. Sites with rate limiting, fingerprinting, JavaScript rendering or an account wall are routine work here. Where a login is involved I use credentials you own and are entitled to use.",
  },
  {
    q: "The auction or marketplace I use isn't one you list. Can you still do it?",
    a: "Almost certainly. Manheim, ADESA and ACV are the platforms that get written about, but most dealers and wholesalers buy on a portal nobody outside their region has heard of — a private dealer-only marketplace, a regional auction's own site, a lender's repo portal, an in-house system with a listings module bolted on. The mechanics do not change with the logo, and an obscure portal is usually easier to work with than a famous one because nobody has ever bothered to defend it. Send me the name and a screenshot or two of the screens you use, and you will have a straight answer within a day — including if the answer is that it is not worth doing.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. You describe the website and the details you want in plain English. You get back a finished file, or a system that emails you a fresh one every morning. You never open a terminal or touch a line of code.",
  },
  {
    q: "What happens if the website changes and the scraper breaks?",
    a: "Sites do change, and scrapers do break — anyone who tells you otherwise is selling something. Delivered systems include alerting so you know immediately rather than finding out from stale data, and I fix breakages on systems I built.",
  },
  {
    q: "Do you work with clients outside the US?",
    a: "Yes — I work with businesses across every major market. Most clients are in the United States, but I regularly deliver for the UK and Ireland, the Gulf and Middle East (UAE/Dubai, Saudi Arabia, Qatar), the Nordics (Norway, Sweden, Denmark, Finland), the Netherlands, Belgium, Germany, Switzerland, Italy, Australia, New Zealand, Canada and Singapore. The work is remote, priced in USD, and delivered the same way wherever you are. Because I scrape international marketplaces like AutoScout24, Carsales, Otomoto and MediaMarkt, non-US projects are routine rather than the exception. Time zones are not a problem; I reply within 24 hours regardless of where you are.",
  },
  {
    q: "Who will I actually be working with?",
    a: "Me. AutoSmartCode is one developer, not an agency — the person who writes your code is the person who answers your emails. No account managers, no handoffs.",
  },
];
