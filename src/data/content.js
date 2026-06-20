export const blogs = [
  {
    id: 1,
    slug: "what-is-web-scraping",
    tag: "Web Scraping",
    emoji: "🕷️",
    color: "rgba(37,99,235,0.25)",
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
    slug: "automate-manheim-mmr",
    tag: "Car Dealers",
    emoji: "🚗",
    color: "rgba(34,197,94,0.2)",
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
    id: 3,
    slug: "scrape-google-maps-leads",
    tag: "Lead Generation",
    emoji: "🗺️",
    color: "rgba(245,158,11,0.2)",
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

## Getting Your Lead List

Tell me your target niche, locations, and how many leads you need. I'll build the scraper, run it, clean the data, and deliver your lead list. Most orders are delivered within 24–48 hours.

**Contact me at sam@autosmartcode.com** to get started.
    `
  },
  {
    id: 4,
    slug: "python-automation-small-business",
    tag: "Automation",
    emoji: "⚙️",
    color: "rgba(139,92,246,0.2)",
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

## How to Get Started

You don't need to hire a full-time developer. Most of these automations can be built in 1–3 days and maintained for a small monthly fee.

**Contact me at sam@autosmartcode.com** and describe which of these would help your business most. I'll give you a free quote within 24 hours.
    `
  },
  {
    id: 5,
    slug: "amazon-product-analysis-ai",
    tag: "AI Analysis",
    emoji: "🤖",
    color: "rgba(139,92,246,0.25)",
    title: "How to Use AI to Analyze Amazon Reviews and Beat Competitors",
    summary: "Use GPT-powered review analysis to find exactly what customers hate about competitor products — then fix those things in yours.",
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
    id: 6,
    slug: "zillow-airbnb-real-estate-scraping",
    tag: "Real Estate",
    emoji: "🏠",
    color: "rgba(6,214,247,0.15)",
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

## What I Can Build for You

Whether you need a one-time data pull or a weekly automated report — I can build the right solution for your real estate research needs.

**Contact me at sam@autosmartcode.com** and describe what markets and data you need. I'll respond with a plan and quote within 24 hours.
    `
  }
];

export const projects = [
  {
    id: 1,
    type: "Automotive",
    emoji: "🚗",
    color: "#22c55e",
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
    color: "#3b82f6",
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
    color: "#f59e0b",
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
    color: "#8b5cf6",
    title: "Amazon Review AI Sentiment Analyzer",
    client: "Amazon Seller, Ohio",
    description: "Scrapes thousands of Amazon product reviews for any ASIN, processes them through GPT-4 for sentiment analysis, and extracts the top complaints, praises, and feature requests. Delivers a competitive intelligence report for sellers.",
    challenge: "Client needed to understand why competitor products had mixed reviews and what changes would make their own product more competitive — but reading thousands of reviews manually was impossible.",
    solution: "Built a two-part system: a review scraper that collects all reviews for target ASINs, and an AI analysis pipeline that categorizes sentiment, extracts recurring themes, and generates a structured report with actionable recommendations.",
    result: "Client improved product based on top complaints found. Amazon listing conversion rate increased 34%. Sales grew significantly in 60 days.",
    stack: ["Python", "OpenAI GPT-4", "Selenium", "Pandas", "NLP", "Excel reports"],
    details: ["Amazon review scraper", "GPT-4 sentiment analysis", "Theme extraction", "Complaint ranking", "Competitor comparison", "Actionable insights report"]
  },
  {
    id: 6,
    type: "Web Development",
    emoji: "🌐",
    color: "#3b82f6",
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
    color: "#f59e0b",
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
    color: "#8b5cf6",
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
